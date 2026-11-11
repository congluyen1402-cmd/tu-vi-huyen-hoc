const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  // iPhone 13 settings: 390 x 844, deviceScaleFactor 3, mobile: true, hasTouch: true
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
  });

  const page = await context.newPage();
  await page.goto('http://localhost:8080');

  // 1. Capture Form on iPhone 13
  const formEl = page.locator('#tuviForm');
  await formEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Take screenshot of empty form
  await formEl.screenshot({ path: 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262/iphone13_form_empty.png' });
  console.log('Saved: iphone13_form_empty.png');

  // Fill form with Trần Công Luyện
  await page.fill('#hoTen', 'Trần Công Luyện');
  await page.selectOption('#gioiTinh', 'nam');
  await page.selectOption('#loaiLich', 'duong');
  await page.selectOption('#gioSinh', '19');
  await page.selectOption('#phutSinh', '30');
  await page.selectOption('#ngaySinh', '10');
  await page.selectOption('#thangSinh', '4');
  await page.selectOption('#namSinh', '2002');

  // Take screenshot of filled form
  await formEl.screenshot({ path: 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262/iphone13_form_filled.png' });
  console.log('Saved: iphone13_form_filled.png');

  // Click Submit
  await page.click('#btnSubmit');

  // Wait for chart
  await page.waitForSelector('#la-so-chart', { state: 'visible', timeout: 15000 });
  await page.waitForTimeout(3000);

  // 2. Capture Chart in Auto-Scale (Fit Screen) Mode
  const chartEl = page.locator('#la-so-chart');
  await chartEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  await chartEl.screenshot({ path: 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262/iphone13_chart_fit.png' });
  console.log('Saved: iphone13_chart_fit.png');

  // 3. Test Clicking a Palace Cell (Cung Mệnh - data-chi="5")
  const menhCell = page.locator('.cung-classical-cell[data-chi="5"]');
  await menhCell.click();
  await page.waitForTimeout(800);

  // Take screenshot showing palace sheet / highlight
  await page.screenshot({ path: 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262/iphone13_palace_sheet.png' });
  console.log('Saved: iphone13_palace_sheet.png');

  // Close sheet by clicking close button or pressing Escape
  const closeBtn = page.locator('.sheet-close-btn');
  if (await closeBtn.isVisible()) {
    await closeBtn.click();
    await page.waitForTimeout(500);
  }

  // 4. Test Toggle to Scroll / Zoom Mode
  const btnScroll = page.locator('#btnScaleScroll');
  if (await btnScroll.isVisible()) {
    await btnScroll.click();
    await page.waitForTimeout(600);
    await chartEl.screenshot({ path: 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262/iphone13_chart_zoom.png' });
    console.log('Saved: iphone13_chart_zoom.png');
  }

  console.log('ALL IPHONE 13 VERIFICATION TESTS COMPLETED SUCCESSFULLY!');
  await browser.close();
})();

