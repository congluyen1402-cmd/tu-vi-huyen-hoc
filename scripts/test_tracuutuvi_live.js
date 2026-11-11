const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('request', req => {
    if (req.method() === 'POST') {
      console.log('POST request URL:', req.url(), req.postData());
    }
  });

  page.on('response', async res => {
    if (res.request().method() === 'POST') {
      console.log('POST response status:', res.status(), res.url());
    }
  });

  console.log('Navigating to https://xem.tracuutuvi.com ...');
  await page.goto('https://xem.tracuutuvi.com', { waitUntil: 'domcontentloaded' });

  // Fill form
  await page.fill('input[name="full_name"]', 'Thamhtrhht');
  await page.selectOption('select[name="gender"]', '1'); // Nam
  await page.selectOption('select[name="lich"]', '1'); // Duong
  await page.selectOption('select[name="day"]', '10');
  await page.selectOption('select[name="month"]', '4');
  await page.fill('input[name="year"]', '2002');
  await page.selectOption('select[name="hour"]', '19');
  await page.selectOption('select[name="minute"]', '30');
  await page.selectOption('select[name="year_view"]', '2026');
  await page.selectOption('select[name="month_view"]', '10');

  console.log('Submitting form...');
  await page.click('button[type="submit"], input[type="submit"]');

  // Wait for navigation or results
  await page.waitForTimeout(5000);
  console.log('Current URL after submit:', page.url());

  const content = await page.content();
  fs.writeFileSync('scripts/tracuutuvi_live.html', content, 'utf8');
  await page.screenshot({ path: 'scripts/tracuutuvi_live.png' });
  console.log('Saved scripts/tracuutuvi_live.html and screenshot');

  await browser.close();
})();

