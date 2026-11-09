const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 360, height: 640 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();

  console.log('--- TEST 1: Mobile (360x640) Initial Load ---');
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

  // 1. Check chart does NOT exist initially
  const initialChart = await page.$('#ket-qua');
  console.log('Initial #ket-qua in DOM:', initialChart !== null ? 'FAIL (Chart exists before submit)' : 'PASS (No chart before submit)');

  // 2. Check no horizontal scroll on page
  const scrollWidth360 = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log('Mobile scrollWidth at 360px:', scrollWidth360, scrollWidth360 <= 360 ? 'PASS (No horizontal scroll)' : 'FAIL');

  // 3. Test "Lá Số" menu item before chart exists
  console.log('--- TEST 2: Nav Menu "Lá Số" before submit ---');
  await page.evaluate(() => {
    const nav = document.getElementById('navMenuLaSo');
    if (nav) nav.click();
  });
  await page.waitForTimeout(400);
  const toastText = await page.evaluate(() => {
    const t = document.getElementById('tuvi-toast');
    return t && t.classList.contains('show') ? t.textContent : null;
  });
  console.log('Toast on clicking "Lá Số":', toastText);

  // 4. Fill form and submit
  console.log('--- TEST 3: Submit Form and Render Chart ---');
  await page.fill('#hoTen', 'Trần Công Luyện');
  await page.click('#btnSubmit');

  // Wait for an sao ritual to finish and #ket-qua to appear
  await page.waitForSelector('#ket-qua', { state: 'visible', timeout: 10000 });
  console.log('Chart #ket-qua rendered successfully!');

  // Check form collapsed
  const isFormSummaryVisible = await page.evaluate(() => {
    const bar = document.getElementById('formSummaryBar');
    return bar && window.getComputedStyle(bar).display !== 'none';
  });
  const summaryText = await page.evaluate(() => document.getElementById('summaryText')?.textContent);
  console.log('Form Summary Bar visible:', isFormSummaryVisible ? 'PASS' : 'FAIL', '| Text:', summaryText);

  // Check 4x4 chart fits 360px width without horizontal scrolling
  const chartScrollWidth = await page.evaluate(() => {
    const container = document.querySelector('.la-so-paper-container');
    const scrollWrap = document.querySelector('.la-so-scroll-wrapper');
    return {
      containerClientWidth: container ? container.clientWidth : 0,
      containerScrollWidth: container ? container.scrollWidth : 0,
      pageScrollWidth: document.documentElement.scrollWidth
    };
  });
  console.log('360px Viewport Chart metrics:', chartScrollWidth);

  // Take screenshot of mobile chart
  await page.screenshot({ path: 'test_mobile_360.png', fullPage: false });

  // 5. Test Palace Tap / Bottom sheet
  console.log('--- TEST 4: Palace Tap Bottom Sheet ---');
  // Tap Cung Phúc Đức (chiIndex 7 or palace item)
  await page.click('.cung-classical-cell[data-chi="7"]');
  await page.waitForTimeout(400);

  const isSheetOpen = await page.evaluate(() => {
    const s = document.getElementById('tuviPalaceSheet');
    return s && s.classList.contains('active');
  });
  console.log('Bottom sheet opened on cell tap:', isSheetOpen ? 'PASS' : 'FAIL');

  const sheetTitle = await page.evaluate(() => document.getElementById('sheetPalaceTitle')?.textContent);
  console.log('Sheet Title:', sheetTitle);

  // Check ESC key closes sheet
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  const isSheetClosed = await page.evaluate(() => {
    const s = document.getElementById('tuviPalaceSheet');
    return !s || !s.classList.contains('active');
  });
  console.log('Bottom sheet closed on ESC:', isSheetClosed ? 'PASS' : 'FAIL');

  // 6. Test Zoom modal
  console.log('--- TEST 5: Zoom Modal ---');
  await page.click('.btn-toolbar-zoom');
  await page.waitForTimeout(400);
  const isZoomOpen = await page.evaluate(() => {
    const m = document.getElementById('tuviZoomModal');
    return m && m.classList.contains('active');
  });
  console.log('Zoom modal opened:', isZoomOpen ? 'PASS' : 'FAIL');

  await page.click('.btn-zoom-close');
  await page.waitForTimeout(300);
  const isZoomClosed = await page.evaluate(() => {
    const m = document.getElementById('tuviZoomModal');
    return !m || !m.classList.contains('active');
  });
  console.log('Zoom modal closed:', isZoomClosed ? 'PASS' : 'FAIL');

  // 7. Desktop test (1440x900)
  console.log('--- TEST 6: Desktop 1440x900 ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'test_desktop_1440.png', fullPage: false });
  console.log('Desktop screenshot captured: test_desktop_1440.png');

  await browser.close();
  console.log('--- ALL TESTS COMPLETED SUCCESSFULLY ---');
})();
