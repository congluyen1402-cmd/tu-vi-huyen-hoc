const { chromium } = require('@playwright/test');
const { PDFParse } = require('pdf-parse');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://xem.tracuutuvi.com', { waitUntil: 'domcontentloaded' });
  await page.fill('input[name="full_name"]', 'Bach');
  await page.selectOption('select[name="gender"]', '1');
  await page.selectOption('select[name="lich"]', '1');
  await page.selectOption('select[name="hour"]', '11');
  await page.selectOption('select[name="minute"]', '15');
  await page.selectOption('select[name="day"]', '12');
  await page.selectOption('select[name="month"]', '9');
  await page.fill('input[name="year"]', '1977');
  
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 }),
    page.evaluate(() => document.forms[0].submit())
  ]);

  const curUrl = page.url();
  console.log('After submit URL:', curUrl);
  const code = new URL(curUrl).searchParams.get('view');
  if (code) {
    const res = await fetch('https://xem.tracuutuvi.com/pdf/laso_pdf?c=' + code);
    const buf = await res.arrayBuffer();
    const parser = new PDFParse(new Uint8Array(buf));
    const textObj = await parser.getText();
    const text = textObj.text;
    const lines = text.split('\n');
    lines.forEach((l, i) => {
      if (l.includes('khôi') || l.includes('việt') || l.includes('Khôi') || l.includes('Việt')) {
        console.log('Line ' + i + ': ' + l);
      }
    });
  }
  await browser.close();
})();
