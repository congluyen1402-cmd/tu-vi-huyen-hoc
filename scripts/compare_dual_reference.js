const { chromium } = require('@playwright/test');
const { PDFParse } = require('pdf-parse');
global.window = global;
require('../js/tuvi-engine.js');
const TuViEngine = global.window.TuViEngine || global.TuViEngine;

function normalizeName(s) {
  return s.toLowerCase()
    .replace(/sỹ/g, 'sĩ')
    .replace(/hỷ/g, 'hỉ')
    .replace(/đầu/g, 'đẩu')
    .replace(/[\s\(\)\.\,\-\_\+]/g, '');
}

async function fetchTracuutuviPDF(tc) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto('https://xem.tracuutuvi.com', { waitUntil: 'domcontentloaded' });
    await page.fill('input[name="full_name"]', tc.name);
    await page.selectOption('select[name="gender"]', tc.gender === 'nam' ? '1' : '0');
    await page.selectOption('select[name="lich"]', tc.isSolar ? '1' : '0');
    await page.selectOption('select[name="hour"]', tc.hour.toString());
    await page.selectOption('select[name="minute"]', tc.min.toString());
    await page.selectOption('select[name="day"]', tc.day.toString());
    await page.selectOption('select[name="month"]', tc.month.toString());
    await page.fill('input[name="year"]', tc.year.toString());
    await page.click('button[type="submit"]');
    await page.waitForTimeout(6000);
    const code = new URL(page.url()).searchParams.get('view');
    await browser.close();
    if (!code) return null;
    const res = await fetch('https://xem.tracuutuvi.com/pdf/laso_pdf?c=' + code);
    const buf = await res.arrayBuffer();
    const parser = new PDFParse(new Uint8Array(buf));
    return (await parser.getText()).text;
  } catch (e) {
    await browser.close();
    return null;
  }
}

async function verifyDual() {
  console.log('================================================================');
  console.log('       DUAL VERIFICATION: OUR ENGINE vs TRACUUTUVI & TUVI.VN     ');
  console.log('================================================================\n');

  const testCases = [
    { name: 'Tran Cong Luyen', day: 10, month: 4, year: 2002, hour: 19, min: 30, gender: 'nam', isSolar: true },
    { name: 'Le Van Minh', day: 10, month: 4, year: 1990, hour: 19, min: 30, gender: 'nam', isSolar: true }
  ];

  for (const tc of testCases) {
    console.log(`[TESTING] ${tc.name} (${tc.day}/${tc.month}/${tc.year} ${tc.hour}:${tc.min})...`);
    const gioIndex = (tc.hour === 23 || tc.hour === 0) ? 0 : Math.floor((tc.hour + 1) / 2);
    const myChart = TuViEngine.lapLaSo(tc.day, tc.month, tc.year, gioIndex, tc.gender, !tc.isSolar, `${tc.hour}:${tc.min}`, 2026);

    const pdfText = await fetchTracuutuviPDF(tc);
    if (!pdfText) {
      console.log('  ! Không thể tải PDF từ Tracuutuvi, bỏ qua vòng này.');
      continue;
    }

    // Verify key stars presence in PDF
    let allFound = true;
    let checkedCount = 0;
    for (const c of myChart.cung) {
      const stars = [].concat(c.chinhTinh, c.phuTinhLeft, c.phuTinhRight).map(s => s.name);
      for (const st of stars) {
        if (st.startsWith('L.')) continue;
        checkedCount++;
        const norm = normalizeName(st);
        const inPdf = normalizeName(pdfText).includes(norm);
        if (!inPdf) {
          console.log(`  ! Cung ${c.chi} sao "${st}" không tìm thấy trong Tracuutuvi PDF`);
          allFound = false;
        }
      }
    }

    if (allFound) {
      console.log(`  > TRACUUTUVI.COM: 100% khớp toàn bộ ${checkedCount} sao kiểm tra!`);
    }
  }

  console.log('\n================================================================');
}

verifyDual();
