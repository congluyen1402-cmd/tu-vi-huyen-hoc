const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // Test 1: Android Standard 360x800 (Samsung Galaxy A / Budget Android)
  const context360 = await browser.newContext({
    viewport: { width: 360, height: 800 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-A146P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
  });
  const page360 = await context360.newPage();
  await page360.goto('http://localhost:8080');
  await page360.waitForTimeout(500);

  // Check form
  const formEl = page360.locator('#tuviForm');
  await formEl.scrollIntoViewIfNeeded();
  await formEl.screenshot({ path: 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262/android360_form_empty.png' });

  // Fill form
  await page360.fill('#hoTen', 'Trần Công Luyện');
  await page360.selectOption('#gioiTinh', 'nam');
  await page360.selectOption('#loaiLich', 'duong');
  await page360.selectOption('#gioSinh', '19');
  await page360.selectOption('#phutSinh', '30');
  await page360.selectOption('#ngaySinh', '10');
  await page360.selectOption('#thangSinh', '4');
  await page360.selectOption('#namSinh', '2002');
  await formEl.screenshot({ path: 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262/android360_form_filled.png' });

  // Submit
  await page360.click('#btnSubmit');
  await page360.waitForSelector('#la-so-chart', { state: 'visible', timeout: 15000 });
  await page360.waitForTimeout(2500);

  // Chart fit
  const chartEl = page360.locator('#la-so-chart');
  await chartEl.scrollIntoViewIfNeeded();
  await chartEl.screenshot({ path: 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262/android360_chart_fit.png' });

  // Test toggle button
  const btnScroll = page360.locator('#btnScaleScroll');
  if (await btnScroll.isVisible()) {
    await btnScroll.click();
    await page360.waitForTimeout(600);
    await chartEl.screenshot({ path: 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262/android360_chart_zoom.png' });
    // Switch back to fit
    await page360.click('#btnScaleFit');
    await page360.waitForTimeout(600);
  }

  // Check palace click
  const menhCell = page360.locator('.cung-classical-cell[data-chi="5"]');
  await menhCell.click();
  await page360.waitForTimeout(800);
  await page360.screenshot({ path: 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262/android360_palace_sheet.png' });

  // Check horizontal overflow on 360px
  const overflow = await page360.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('Android 360px horizontal overflow:', overflow);

  // Test 2: Pixel 7 / Samsung Galaxy S23 (412x915)
  const context412 = await browser.newContext({
    viewport: { width: 412, height: 915 },
    deviceScaleFactor: 2.625,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
  });
  const page412 = await context412.newPage();
  await page412.goto('http://localhost:8080');
  await page412.waitForTimeout(500);

  const form412 = page412.locator('#tuviForm');
  await form412.scrollIntoViewIfNeeded();
  await page412.fill('#hoTen', 'Trần Công Luyện');
  await page412.selectOption('#gioiTinh', 'nam');
  await page412.selectOption('#loaiLich', 'duong');
  await page412.selectOption('#gioSinh', '19');
  await page412.selectOption('#phutSinh', '30');
  await page412.selectOption('#ngaySinh', '10');
  await page412.selectOption('#thangSinh', '4');
  await page412.selectOption('#namSinh', '2002');
  await form412.screenshot({ path: 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262/android412_form_filled.png' });

  await page412.click('#btnSubmit');
  await page412.waitForSelector('#la-so-chart', { state: 'visible', timeout: 15000 });
  await page412.waitForTimeout(2500);

  const chart412 = page412.locator('#la-so-chart');
  await chart412.scrollIntoViewIfNeeded();
  await chart412.screenshot({ path: 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262/android412_chart_fit.png' });

  const overflow412 = await page412.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('Android 412px horizontal overflow:', overflow412);

  await browser.close();
  console.log('ALL ANDROID TESTS COMPLETED SUCCESSFULLY!');
})();

