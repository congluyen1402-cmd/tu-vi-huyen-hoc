const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('Navigating to https://xem.tracuutuvi.com ...');
  await page.goto('https://xem.tracuutuvi.com', { waitUntil: 'domcontentloaded' });

  // Fill form 0
  await page.fill('input[name="full_name"]', 'Thamhtrhht');
  await page.selectOption('select[name="gender"]', '1'); // Nam
  await page.selectOption('select[name="lich"]', '1'); // Duong
  await page.selectOption('select[name="hour"]', '19');
  await page.selectOption('select[name="minute"]', '30');
  await page.selectOption('select[name="day"]', '10');
  await page.selectOption('select[name="month"]', '4');
  await page.fill('input[name="year"]', '1990');

  console.log('Submitting form...');
  await page.click('button[type="submit"]');

  // Wait for response or navigation
  console.log('Waiting for chart or navigation...');
  await page.waitForTimeout(6000);

  console.log('Current URL after submit:', page.url());
  const content = await page.content();
  fs.writeFileSync('scripts/tracuutuvi_chart_page.html', content, 'utf8');
  await page.screenshot({ path: 'scripts/tracuutuvi_chart_page.png', fullPage: true });
  console.log('Saved scripts/tracuutuvi_chart_page.html and screenshot');

  await browser.close();
})();
