const fs = require('fs');
const path = require('path');

const casesFile = path.join(__dirname, '../tests/golden/cases.json');
const cases = JSON.parse(fs.readFileSync(casesFile, 'utf8'));

const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

async function fetchAndPopulate() {
  for (let i = 0; i < cases.length; i++) {
    const tc = cases[i];
    const input = tc.input;
    let d, m, y, h, min, isSolar;

    if (input.calendar === 'solar') {
      const parts = input.solarDate.split('-');
      y = parts[0]; m = parts[1]; d = parts[2];
      isSolar = 'true';
    } else {
      const parts = (input.lunarDate || '').split('-');
      y = parts[0]; m = parts[1]; d = parts[2];
      isSolar = 'false';
    }

    const timeParts = (input.time || '00:00').split(':');
    h = timeParts[0]; min = timeParts[1];

    const params = new URLSearchParams({
      name: tc.id,
      dayOfDOB: d,
      monthOfDOB: m,
      yearOfDOB: y,
      calendar: isSolar,
      hourOfDOB: h,
      minOfDOB: min,
      gender: input.gioiTinh === 'nam' ? 'true' : 'false',
      viewYear: '2026',
      viewMonth: '1'
    });

    try {
      const res = await fetch('https://tuvi.vn/la-so', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });
      const html = await res.text();

      // Parse Cục from beginning of data-cuc
      const cucMatch = html.match(/data-cuc=["']([^"']*)["']/i);
      const cucStr = cucMatch ? cucMatch[1].trim() : '';
      let cucVal = 2;
      let cucName = 'Thủy nhị cục';
      if (cucStr.startsWith('Mộc')) { cucVal = 3; cucName = 'Mộc tam cục'; }
      else if (cucStr.startsWith('Kim')) { cucVal = 4; cucName = 'Kim tứ cục'; }
      else if (cucStr.startsWith('Thổ')) { cucVal = 5; cucName = 'Thổ ngũ cục'; }
      else if (cucStr.startsWith('Hỏa')) { cucVal = 6; cucName = 'Hỏa lục cục'; }

      let tuViChi = '';
      let thienPhuChi = '';
      let menhChi = '';
      let thanChi = '';

      for (let c = 0; c < 12; c++) {
        const kIdx = html.indexOf(`id="KNH${c}"`);
        if (kIdx === -1) continue;
        const block = html.slice(kIdx - 2000, kIdx + 3000);
        if (block.includes('data-cung="menh"')) menhChi = DIA_CHI[c];
        if (block.includes('<THÂN>') || block.includes('data-cung-than') || block.includes('data-than="true"') || block.includes('(Thân)')) thanChi = DIA_CHI[c];
        if (block.includes('Tử Vi')) tuViChi = DIA_CHI[c];
        if (block.includes('Thiên Phủ')) thienPhuChi = DIA_CHI[c];
      }

      tc.expected = tc.expected || {};
      tc.expected.cuc = { name: cucName, value: cucVal };
      if (menhChi) tc.expected.menh = menhChi;
      if (thanChi) tc.expected.than = thanChi;
      if (tuViChi) tc.expected.tuVi = tuViChi;
      if (thienPhuChi) tc.expected.thienPhu = thienPhuChi;

      console.log(`Updated ${tc.id}: Cục=${cucName} (${cucVal}), Mệnh=${menhChi}, TửVi=${tuViChi}, ThiênPhủ=${thienPhuChi}`);
    } catch(e) {
      console.error(`Error updating ${tc.id}:`, e.message);
    }
  }

  fs.writeFileSync(casesFile, JSON.stringify(cases, null, 2), 'utf8');
  console.log('Saved updated tests/golden/cases.json');
}

fetchAndPopulate();
