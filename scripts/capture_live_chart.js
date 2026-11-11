const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1600 } });
  
  await page.goto('http://localhost:8080');
  
  await page.fill('#hoTen', 'Trần Công Luyện');
  await page.selectOption('#gioiTinh', 'nam');
  await page.selectOption('#loaiLich', 'duong');
  await page.selectOption('#namSinh', '2002');
  await page.selectOption('#thangSinh', '4');
  await page.waitForTimeout(200);
  await page.selectOption('#ngaySinh', '10');
  await page.selectOption('#gioSinh', '19');
  await page.selectOption('#phutSinh', '30');
  
  await page.click('#btnSubmit');
  await page.waitForTimeout(3500);

  const printArea = await page.$('#laSoPrintArea');
  if (printArea) {
    await printArea.screenshot({ path: 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262/current_rendered_chart.png' });
    console.log('Saved current_rendered_chart.png successfully!');
  } else {
    console.log('#laSoPrintArea not found');
  }

  await browser.close();
})();

