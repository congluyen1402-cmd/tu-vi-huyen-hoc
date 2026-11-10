const { chromium, devices } = require('@playwright/test');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ ...devices['iPhone 13'] });
  await page.goto('http://localhost:8080');
  await page.fill('#hoTen', 'Trần Công Luyện');
  await page.selectOption('#gioiTinh', 'nam');
  await page.selectOption('#ngaySinh', '10');
  await page.selectOption('#thangSinh', '4');
  await page.selectOption('#namSinh', '2002');
  await page.selectOption('#gioSinh', '19');
  await page.selectOption('#phutSinh', '30');
  await page.click('#btnSubmit');
  await page.waitForSelector('#laSoPrintArea', { timeout: 10000 });
  await page.waitForTimeout(1000);
  const chartEl = await page.$('#laSoPrintArea');
  const outPath = path.join(__dirname, '..', 'chart_mobile_grid.png');
  await chartEl.screenshot({ path: outPath });
  console.log('Mobile grid screenshot saved to:', outPath);
  await browser.close();
})();
