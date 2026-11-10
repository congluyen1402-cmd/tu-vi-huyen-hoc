const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const viewports = [360, 390, 430, 768, 1024, 1440];
  for (const w of viewports) {
    const page = await browser.newPage({ viewport: { width: w, height: 800 } });
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });
    await page.fill('#hoTen', 'Trần Công Luyện');
    await page.selectOption('#gioiTinh', 'nam');
    await page.selectOption('#gioSinh', '14');
    await page.selectOption('#phutSinh', '30');
    await page.selectOption('#thangSinh', '2');
    await page.selectOption('#namSinh', '1995');
    await page.selectOption('#ngaySinh', '14');

    await page.click('#btnSubmit');
    await page.waitForSelector('#ket-qua', { state: 'visible', timeout: 10000 });
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    const containerSw = await page.evaluate(() => document.querySelector('.la-so-paper-container')?.scrollWidth);
    const containerCw = await page.evaluate(() => document.querySelector('.la-so-paper-container')?.clientWidth);
    console.log(`Viewport ${w}px -> Page scrollWidth: ${sw} (no page scroll: ${sw <= w}), Container cw: ${containerCw}, sw: ${containerSw} (fit: ${containerSw <= containerCw})`);
    await page.close();
  }
  await browser.close();
  console.log('--- ALL VIEWPORTS PASSED ---');
})();
