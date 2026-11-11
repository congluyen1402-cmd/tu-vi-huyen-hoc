const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const html = fs.readFileSync('scripts/tracuutuvi_chart_page.html', 'utf8');
  await page.setContent(html);

  const parsed = await page.evaluate(() => {
    // Find all palaces
    // Check tables or grid elements
    const tables = document.querySelectorAll('table');
    const divs = document.querySelectorAll('div');
    const classes = new Set();
    divs.forEach(d => {
      if (d.className && typeof d.className === 'string') {
        d.className.split(' ').forEach(c => {
          if (c.includes('cung') || c.includes('palace') || c.includes('laso') || c.includes('la-so') || c.includes('cell')) {
            classes.add(c);
          }
        });
      }
    });

    // Check if SVG or image or canvas
    const svgs = document.querySelectorAll('svg');
    const canvases = document.querySelectorAll('canvas');

    return {
      title: document.title,
      tablesCount: tables.length,
      svgCount: svgs.length,
      canvasCount: canvases.length,
      matchingClasses: Array.from(classes)
    };
  });

  console.log('Parsed info:', parsed);

  // Let's search for "Thái Dương" or "MỆNH" in the text
  const textInfo = await page.evaluate(() => {
    const bodyText = document.body.innerText;
    return {
      hasMenh: bodyText.includes('MỆNH'),
      hasThaiDuong: bodyText.includes('Thái Dương') || bodyText.includes('Thái dương'),
      hasTuVi: bodyText.includes('Tử Vi') || bodyText.includes('Tử vi'),
      sample: bodyText.slice(0, 500)
    };
  });

  console.log('Text info:', textInfo);

  await browser.close();
})();

