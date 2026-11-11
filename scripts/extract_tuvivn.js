const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');
  await page.setContent(html);

  const tuviData = await page.evaluate(() => {
    // In tuvi.vn, chiIndex 0..11
    // Let's inspect the 12 cells
    const palaces = [];
    const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
    for (let i = 0; i < 12; i++) {
      const totEl = document.getElementById(`sao-tot-${i}`);
      const xauEl = document.getElementById(`sao-xau-${i}`);
      
      // Look for palace title and main stars around totEl
      let parent = totEl ? totEl.parentElement : null;
      let cellText = parent ? parent.innerText : '';
      
      palaces.push({
        chiIndex: i,
        chi: DIA_CHI[i],
        tot: totEl ? totEl.innerText.split('\n').map(s => s.trim()).filter(Boolean) : [],
        xau: xauEl ? xauEl.innerText.split('\n').map(s => s.trim()).filter(Boolean) : [],
        cellText: cellText.slice(0, 300)
      });
    }

    return palaces;
  });

  console.log('Parsed TuVi.vn Palaces:');
  console.log(JSON.stringify(tuviData, null, 2));
  fs.writeFileSync('scripts/tuvivn_extracted.json', JSON.stringify(tuviData, null, 2), 'utf8');

  await browser.close();
})();

