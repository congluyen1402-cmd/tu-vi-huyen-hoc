const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function extractDomStars() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const filePath = 'file:///' + path.resolve('scripts/tuvivn_result.html').replace(/\\/g, '/');
  await page.goto(filePath);

  const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

  const chart = await page.evaluate((DIA_CHI) => {
    const res = [];
    for (let i = 0; i < 12; i++) {
      const cungEl = document.querySelector(`[data-cung]`);
      // Get all stars in sao-tot-i
      const totEl = document.getElementById(`sao-tot-${i}`);
      const totStars = totEl ? Array.from(totEl.querySelectorAll('.text-sao-xau-tot, .text-sao-chinh-tinh, [data-sao-id]')).map(e => e.innerText.trim()).filter(Boolean) : [];

      // Get all stars in sao-xau-i
      const xauEl = document.getElementById(`sao-xau-${i}`);
      const xauStars = xauEl ? Array.from(xauEl.querySelectorAll('.text-sao-xau-tot, [data-sao-id]')).map(e => e.innerText.trim()).filter(Boolean) : [];

      // Get chinh tinh
      const kEl = document.getElementById(`KNH${i}`);
      const parentCell = kEl ? kEl.closest('.cung, .cell-la-so, [class*="cung"]') : null;
      const chinhEls = parentCell ? Array.from(parentCell.querySelectorAll('.text-chinh-chinh')).map(e => e.innerText.trim()).filter(Boolean) : [];

      // Get cung name
      const nameEl = parentCell ? parentCell.querySelector('.text-sao-chinh-tinh[data-cung]') : null;

      // Get dai van
      const dvEl = parentCell ? parentCell.querySelector('.text-dai-van-number') : null;

      // Get trang sinh
      const tsEl = parentCell ? parentCell.querySelector('[data-sao-id="76"], [data-sao-id="111"], [data-sao-id="119"], [data-sao-id="115"], [data-sao-id="145"], [data-sao-id="146"], [data-sao-id="147"], [data-sao-id="148"], [data-sao-id="149"], [data-sao-id="150"], [data-sao-id="151"], [id^="DVT"]') : null;

      res.push({
        chiIndex: i,
        chi: DIA_CHI[i],
        cungName: nameEl ? nameEl.innerText.trim() : '',
        daiVan: dvEl ? dvEl.innerText.trim() : '',
        chinhTinh: chinhEls,
        totStars: Array.from(new Set(totStars)),
        xauStars: Array.from(new Set(xauStars))
      });
    }
    return res;
  }, DIA_CHI);

  fs.writeFileSync('scripts/tuvivn_dom_extracted.json', JSON.stringify(chart, null, 2), 'utf8');
  console.log('Saved to scripts/tuvivn_dom_extracted.json');

  chart.forEach(c => {
    console.log(`\n=== [${c.chi} - ${c.cungName}] ĐV: ${c.daiVan} ===`);
    console.log('  Chính tinh:', c.chinhTinh.join(' | '));
    console.log('  Cát tinh:', c.totStars.join(' | '));
    console.log('  Hung tinh:', c.xauStars.join(' | '));
  });

  await browser.close();
}

extractDomStars().catch(console.error);

