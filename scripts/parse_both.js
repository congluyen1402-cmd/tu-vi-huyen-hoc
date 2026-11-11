const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Test tracuutuvi parsing
  const tracuuHtml = fs.readFileSync('scripts/tracuutuvi_result.html', 'utf8');
  await page.setContent(tracuuHtml);

  // Let's inspect the selectors in tracuutuvi
  const tctvData = await page.evaluate(() => {
    // Find palace elements
    // Try different selectors
    const selectors = ['.cung', '.palace', '.cell', 'td', 'div[class*="cung"]', 'div[class*="palace"]', 'div[class*="cell"]'];
    const counts = {};
    selectors.forEach(s => counts[s] = document.querySelectorAll(s).length);
    return counts;
  });
  console.log('TraCuuTuVi element counts:', tctvData);

  // Test tuvi.vn parsing
  const tuviHtml = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');
  await page.setContent(tuviHtml);

  const tuviData = await page.evaluate(() => {
    // In tuvi.vn, check sao-tot and sao-xau
    const totCounts = [];
    for (let i = 0; i < 12; i++) {
      const el = document.getElementById(`sao-tot-${i}`);
      const xau = document.getElementById(`sao-xau-${i}`);
      totCounts.push({
        chiIndex: i,
        tot: el ? el.innerText.trim().replace(/\n+/g, ', ') : null,
        xau: xau ? xau.innerText.trim().replace(/\n+/g, ', ') : null
      });
    }
    return totCounts;
  });
  console.log('TuVi.vn palace 0-2:');
  console.log(JSON.stringify(tuviData.slice(0, 3), null, 2));

  await browser.close();
})();

