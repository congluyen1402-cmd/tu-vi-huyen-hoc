const { chromium } = require('@playwright/test');

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
  
  await page.click('button[type="submit"]');
  await page.waitForTimeout(4000);
  console.log('URL:', page.url());
  const errorText = await page.evaluate(() => {
    const alerts = document.querySelectorAll('.alert, .error, .toast, .help-block');
    return Array.from(alerts).map(a => a.innerText);
  });
  console.log('Errors:', errorText);
  await browser.close();
})();

