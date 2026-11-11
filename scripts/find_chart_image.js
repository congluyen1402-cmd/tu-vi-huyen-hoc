const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const html = fs.readFileSync('scripts/tracuutuvi_chart_page.html', 'utf8');
  await page.setContent(html);

  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      width: img.width,
      height: img.height,
      className: img.className
    }));
  });
  console.log('Images in tracuutuvi page:');
  console.log(images);

  // Check canvas scripts
  const scripts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('script')).map(s => s.innerHTML).filter(t => t.includes('canvas') || t.includes('draw') || t.includes('la_so') || t.includes('cung'));
  });
  console.log('Scripts mentioning canvas/draw/cung:', scripts.length);
  if (scripts.length > 0) {
    fs.writeFileSync('scripts/tracuutuvi_canvas_script.js', scripts[0], 'utf8');
    console.log('Saved first script to scripts/tracuutuvi_canvas_script.js');
  }

  await browser.close();
})();

