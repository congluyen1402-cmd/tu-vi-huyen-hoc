const fs = require('fs');
global.window = global;
require('../js/tuvi-engine.js');
const TuViEngine = global.window.TuViEngine || global.TuViEngine;

const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

async function fetchTuViVn(c) {
  const params = new URLSearchParams({
    name: c.name || 'Test',
    dayOfDOB: String(c.day),
    monthOfDOB: String(c.month),
    yearOfDOB: String(c.year),
    calendar: c.isLunar ? 'false' : 'true',
    hourOfDOB: String(c.hour),
    minOfDOB: String(c.min),
    gender: c.gender === 'nam' ? 'true' : 'false',
    viewYear: '2026',
    viewMonth: '1'
  });

  const res = await fetch('https://tuvi.vn/la-so', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    },
    body: params.toString()
  });

  return await res.text();
}

function parseTuViVnAccurate(html) {
  const result = [];
  for (let i = 0; i < 12; i++) {
    const kIdx = html.indexOf(`id="KNH${i}"`);
    if (kIdx === -1) {
      result.push({ chiIndex: i, chi: DIA_CHI[i], cungName: '', daiVan: null, chinhTinh: [], phuTinh: [] });
      continue;
    }
    const block = html.slice(kIdx - 2000, kIdx + 3000);

    const cungMatch = block.match(/data-cung=["']([^"']*)["'][^>]*>([\s\S]*?)<\/p>/i);
    const cungName = cungMatch ? cungMatch[2].replace(/<[^>]+>/g, '').trim() : '';

    const dvMatch = block.match(/text-dai-van-number[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);
    const daiVan = dvMatch ? parseInt(dvMatch[1].replace(/<[^>]+>/g, '').trim(), 10) : null;

    const chinhMatches = [...block.matchAll(/class=["'][^"']*text-chinh-chinh[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi)];
    const chinhTinh = chinhMatches.map(m => {
      const clean = m[1].replace(/<[^>]+>/g, '').replace(/[&#43;\-]/g, '').trim();
      return clean.split('(')[0].trim();
    }).filter(Boolean);

    const phuMatches = [...block.matchAll(/class=["'][^"']*text-sao-xau-tot[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)];
    const phuTinh = phuMatches.map(m => {
      const clean = m[1].replace(/<[^>]+>/g, '').trim();
      return clean.split('(')[0].trim();
    }).filter(Boolean);

    result.push({ chiIndex: i, chi: DIA_CHI[i], cungName, daiVan, chinhTinh, phuTinh });
  }
  return result;
}

async function runTestCases() {
  const testCases = [
    { name: 'Case 1 - Nam 2002', day: 10, month: 4, year: 2002, hour: 19, min: 30, gender: 'nam', isLunar: false },
    { name: 'Case 2 - Nu 1995', day: 15, month: 8, year: 1995, hour: 6, min: 15, gender: 'nu', isLunar: false },
    { name: 'Case 3 - Nam 1990', day: 1, month: 1, year: 1990, hour: 12, min: 0, gender: 'nam', isLunar: false },
    { name: 'Case 4 - Nu 1988', day: 20, month: 5, year: 1988, hour: 14, min: 20, gender: 'nu', isLunar: false }
  ];

  for (const tc of testCases) {
    console.log(`\n======================================================`);
    console.log(`KIỂM TRA: ${tc.name} (${tc.day}/${tc.month}/${tc.year} ${tc.hour}:${tc.min} ${tc.gender})`);
    console.log(`======================================================`);

    const html = await fetchTuViVn(tc);
    const tvData = parseTuViVnAccurate(html);

    let h = tc.hour;
    let gioIndex = (h === 23 || h === 0) ? 0 : Math.floor((h + 1) / 2);

    const myChart = TuViEngine.lapLaSo(tc.day, tc.month, tc.year, gioIndex, tc.gender, tc.isLunar, `${tc.hour}:${tc.min}`);

    console.log(`Năm Can Chi: ${myChart.canChiNam} | Cục: ${myChart.cucInfo.name} | Mệnh tại: ${myChart.cungMenh.chi} | Thân tại: ${myChart.cungThan.chi}`);

    let discrepancies = 0;
    for (let i = 0; i < 12; i++) {
      const tvCung = tvData[i];
      const myCung = myChart.cung.find(c => c.chiIndex === i);

      // Compare Dai Van
      const dvMatch = myCung.daiHan.startAge === tvCung.daiVan;

      // Compare Chinh Tinh
      const myChinh = myCung.chinhTinh.map(s => s.name.toUpperCase()).sort();
      const tvChinh = tvCung.chinhTinh.map(s => s.toUpperCase()).sort();
      const chinhMatch = JSON.stringify(myChinh) === JSON.stringify(tvChinh);

      if (!dvMatch || !chinhMatch) {
        discrepancies++;
        console.log(`[LỆCH] Cung ${DIA_CHI[i]} (Index ${i}):`);
        if (!dvMatch) console.log(`   Đại vận lệch: Ta=${myCung.daiHan.startAge} vs TuviVn=${tvCung.daiVan}`);
        if (!chinhMatch) console.log(`   Chính tinh lệch: Ta=[${myChinh.join(', ')}] vs TuviVn=[${tvChinh.join(', ')}]`);
      }
    }

    if (discrepancies === 0) {
      console.log(`=> HOÀN TOÀN KHỚP 100% CẢ 12 CUNG (Đại vận, 14 Chính tinh)!`);
    } else {
      console.log(`=> Có ${discrepancies} cung bị lệch!`);
    }
  }
}

runTestCases();
