const { chromium } = require('@playwright/test');
const fs = require('fs');

async function testPlaywrightTraCuuTuVi() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('Navigating to https://xem.tracuutuvi.com ...');
  await page.goto('https://xem.tracuutuvi.com', { waitUntil: 'networkidle' });

  // Fill form
  await page.fill('input[name="full_name"]', 'Test 2002');
  await page.selectOption('select[name="gender"]', '1'); // Nam
  await page.selectOption('select[name="lich"]', '1'); // Duong
  await page.selectOption('select[name="day"]', '10');
  await page.selectOption('select[name="month"]', '4');
  await page.fill('input[name="year"]', '2002');
  await page.selectOption('select[name="hour"]', '19');
  await page.selectOption('select[name="minute"]', '30');

  console.log('Submitting form...');
  // Click submit button in the form
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 }).catch(e => console.log('Navigation wait timeout or not triggered:', e.message)),
    page.click('button[type="submit"], input[type="submit"]')
  ]);

  console.log('Current URL:', page.url());
  const html = await page.content();
  fs.writeFileSync('scripts/tracuutuvi_submitted.html', html, 'utf8');
  await page.screenshot({ path: 'scripts/tracuutuvi_submitted.png', fullPage: true });
  console.log('Saved submitted content & screenshot.');

  await browser.close();
}

testPlaywrightTraCuuTuVi().catch(console.error);

