const fs = require('fs');
const path = require('path');

const casesFile = path.join(__dirname, '../tests/golden/cases.json');
const cases = JSON.parse(fs.readFileSync(casesFile, 'utf8'));

async function fetchFromTuViVn(tc) {
  const input = tc.input;
  let d, m, y, h, min, isLunar;

  if (input.calendar === 'solar') {
    const parts = input.solarDate.split('-');
    y = parts[0];
    m = parts[1];
    d = parts[2];
    isLunar = 'true'; // calendar=true in tuvi.vn means solar
  } else {
    const parts = (input.lunarDate || '').split('-');
    y = parts[0];
    m = parts[1];
    d = parts[2];
    isLunar = 'false'; // calendar=false in tuvi.vn means lunar
  }

  const timeParts = (input.time || '00:00').split(':');
  h = timeParts[0];
  min = timeParts[1];

  const params = new URLSearchParams({
    name: tc.id,
    dayOfDOB: d,
    monthOfDOB: m,
    yearOfDOB: y,
    calendar: isLunar,
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
    return await res.text();
  } catch (e) {
    console.error(`Error fetching ${tc.id}:`, e.message);
    return null;
  }
}

async function updateGoldenCases() {
  const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

  for (let i = 0; i < cases.length; i++) {
    const tc = cases[i];
    console.log(`Querying tuvi.vn for ${tc.id}...`);
    const html = await fetchFromTuViVn(tc);
    if (!html) continue;

    // Parse lunar info from tuvi.vn
    // Search for thien-ban dia-ban data
    const cucMatch = html.match(/data-cuc=["']([^"']*)["']/i);
    const menhMatch = html.match(/data-menh=["']([^"']*)["']/i);
    const genderMatch = html.match(/data-gender=["']([^"']*)["']/i);

    // Find Cung Menh & Than
    // In tuvi.vn, cung Menh has data-cung="menh"
    let menhChi = '';
    let thanChi = '';
    let tuViChi = '';
    let thienPhuChi = '';

    for (let c = 0; c < 12; c++) {
      const kIdx = html.indexOf(`id="KNH${c}"`);
      if (kIdx === -1) continue;
      const block = html.slice(kIdx - 2000, kIdx + 3000);
      if (block.includes('data-cung="menh"')) menhChi = DIA_CHI[c];
      if (block.includes('<THÂN>') || block.includes('data-cung-than') || block.includes('(Thân)')) thanChi = DIA_CHI[c];
      if (block.includes('Tử Vi')) tuViChi = DIA_CHI[c];
      if (block.includes('Thiên Phủ')) thienPhuChi = DIA_CHI[c];
    }

    console.log(`  -> Cục: ${cucMatch ? cucMatch[1] : 'N/A'}, Mệnh: ${menhChi}, Tử Vi: ${tuViChi}, Thiên Phủ: ${thienPhuChi}`);
  }
}

updateGoldenCases();

