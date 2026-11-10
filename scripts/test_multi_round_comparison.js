const { chromium } = require('@playwright/test');
const fs = require('fs');
global.window = global;
require('../js/tuvi-engine.js');
const TuViEngine = global.window.TuViEngine || global.TuViEngine;

const TEST_CASES = [
  { name: 'Tran Cong Luyen', day: 10, month: 4, year: 2002, hour: 19, min: 30, gender: 'nam', isSolar: true },
  { name: 'Nguyen Thi Mai', day: 15, month: 8, year: 1995, hour: 6, min: 15, gender: 'nu', isSolar: true },
  { name: 'Le Van Minh', day: 1, month: 1, year: 1990, hour: 14, min: 0, gender: 'nam', isSolar: true },
  { name: 'Pham Thu Huong', day: 20, month: 11, year: 1988, hour: 22, min: 30, gender: 'nu', isSolar: true },
  { name: 'Vu Hoang Nam', day: 5, month: 5, year: 1984, hour: 4, min: 30, gender: 'nam', isSolar: true },
  { name: 'Hoang Van Bach', day: 12, month: 9, year: 1977, hour: 11, min: 15, gender: 'nam', isSolar: true },
  { name: 'Do Thi Lan', day: 8, month: 3, year: 2001, hour: 8, min: 45, gender: 'nu', isSolar: true },
  { name: 'Bui Quang Huy', day: 25, month: 12, year: 1999, hour: 23, min: 20, gender: 'nam', isSolar: true },
  { name: 'Ngo Thi Bich', day: 18, month: 7, year: 1982, hour: 16, min: 10, gender: 'nu', isSolar: true },
  { name: 'Trinh Van Phuc', day: 30, month: 6, year: 1993, hour: 2, min: 40, gender: 'nam', isSolar: true }
];

const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

async function fetchTuViVn(tc) {
  const params = new URLSearchParams({
    name: tc.name,
    dayOfDOB: tc.day.toString(),
    monthOfDOB: tc.month.toString(),
    yearOfDOB: tc.year.toString(),
    calendar: tc.isSolar ? 'true' : 'false',
    hourOfDOB: tc.hour.toString(),
    minOfDOB: tc.min.toString(),
    gender: (tc.gender === 'nam') ? 'true' : 'false',
    viewYear: '2026',
    viewMonth: '1'
  });

  const res = await fetch('https://tuvi.vn/la-so', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0'
    },
    body: params.toString()
  });

  return await res.text();
}

function normalizeName(s) {
  return s.toLowerCase()
    .replace(/đầu/g, 'đẩu')
    .replace(/[\s\(\)\.\,\-\_\+]/g, '');
}

async function runMultiRoundTests() {
  console.log('================================================================');
  console.log('      MULTI-ROUND AUTOMATED ACCURACY TEST VS TUVI.VN            ');
  console.log('================================================================\n');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalRounds = TEST_CASES.length;
  let passedRounds = 0;

  for (let idx = 0; idx < TEST_CASES.length; idx++) {
    const tc = TEST_CASES[idx];
    console.log(`[ROUND ${idx + 1}/${totalRounds}] Đang kiểm tra: ${tc.name} (${tc.day}/${tc.month}/${tc.year} ${tc.hour}:${tc.min} ${tc.gender})...`);

    // 1. Calculate from our engine
    const gioIndex = (tc.hour === 23 || tc.hour === 0) ? 0 : Math.floor((tc.hour + 1) / 2);
    const myChart = TuViEngine.lapLaSo(tc.day, tc.month, tc.year, gioIndex, tc.gender, !tc.isSolar, `${tc.hour}:${tc.min}`, 2026);

    // 2. Fetch from tuvi.vn
    let tuviVnData = null;
    try {
      const html = await fetchTuViVn(tc);
      await page.setContent(html);
      tuviVnData = await page.evaluate(() => {
        const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
        const list = [];
        for (let i = 0; i < 12; i++) {
          const totEl = document.getElementById(`sao-tot-${i}`);
          const xauEl = document.getElementById(`sao-xau-${i}`);
          const tot = totEl ? totEl.innerText.split('\n').map(s => s.trim()).filter(Boolean) : [];
          const xau = xauEl ? xauEl.innerText.split('\n').map(s => s.trim()).filter(Boolean) : [];
          list.push({ chiIndex: i, chi: DIA_CHI[i], tot, xau });
        }
        return list;
      });
    } catch (e) {
      console.log(`  ! Không thể kết nối tuvi.vn: ${e.message}`);
      continue;
    }

    // 3. Compare palace by palace
    let matchesCount = 0;
    let totalChecks = 0;
    let mismatches = [];

    const coreTestStars = [
      'lộctồn', 'kìnhdương', 'đàla', 'hỏatinh', 'linhtinh', 'địakhông', 'địakiếp',
      'tháituế', 'tangmôn', 'bạchhổ', 'tảphù', 'hữubật', 'vănxương', 'vănkhúc',
      'thiênkhôi', 'thiênviệt', 'thiênmã', 'đàophoa', 'hồngloan', 'hoacái', 'đẩuquân'
    ];

    for (let i = 0; i < 12; i++) {
      const myCung = myChart.cung.find(c => c.chiIndex === i);
      const tvCung = tuviVnData.find(c => c.chiIndex === i);

      const myAllStars = []
        .concat(myCung.chinhTinh.map(s => s.name))
        .concat(myCung.phuTinhLeft.map(s => s.name))
        .concat(myCung.phuTinhRight.map(s => s.name))
        .filter(s => !s.startsWith('L.') && !s.startsWith('l.'))
        .map(normalizeName);

      const tvAllStars = []
        .concat(tvCung.tot)
        .concat(tvCung.xau)
        .map(s => s.replace(/\(.*?\)/g, '').trim())
        .filter(s => !s.startsWith('L.') && !s.startsWith('l.') && !s.startsWith('ĐV.') && !s.startsWith('đv.'))
        .map(normalizeName);

      coreTestStars.forEach(st => {
        const inMy = myAllStars.some(s => s.includes(st));
        const inTv = tvAllStars.some(s => s.includes(st));
        totalChecks++;
        if (inMy === inTv) {
          matchesCount++;
        } else {
          mismatches.push(`Cung ${DIA_CHI[i]} sao "${st}": web mình=${inMy}, tuvi.vn=${inTv}`);
        }
      });
    }

    const accuracy = ((matchesCount / totalChecks) * 100).toFixed(1);
    console.log(`  > Độ khớp sao cốt lõi: ${matchesCount}/${totalChecks} (${accuracy}%)`);
    if (mismatches.length > 0) {
      console.log(`  > Một số khác biệt nhỏ:`);
      mismatches.slice(0, 3).forEach(m => console.log(`     - ${m}`));
    } else {
      console.log(`  > HOÀN HẢO: 100% khớp tuyệt đối không có sai lệch!`);
    }

    if (parseFloat(accuracy) >= 99.0) {
      passedRounds++;
    }
    console.log('');
  }

  await browser.close();

  console.log(`----------------------------------------------------------------`);
  console.log(`KẾT QUẢ: ${passedRounds}/${totalRounds} vòng kiểm thử đạt 99% - 100% chuẩn xác.`);
  console.log(`================================================================`);
}

runMultiRoundTests();
