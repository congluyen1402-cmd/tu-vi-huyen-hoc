const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'test_screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  console.log('=== TEST 1: DESKTOP 1440px ===');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await desktopContext.newPage();
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });

  // 1. Verify Desktop Lookup View
  await page.screenshot({ path: path.join(outDir, 'desktop_1_lookup.png'), fullPage: false });
  console.log('Saved desktop_1_lookup.png');

  // Verify Heading Font
  const headingFont = await page.evaluate(() => {
    const h1 = document.querySelector('.lookup-title');
    return window.getComputedStyle(h1).fontFamily;
  });
  console.log('H1 Font Family:', headingFont);

  // Verify Body Background
  const bodyBg = await page.evaluate(() => {
    return window.getComputedStyle(document.body).backgroundColor;
  });
  console.log('Body Background Color:', bodyBg);

  // 2. Submit form and wait for chart
  await page.fill('#hoTen', 'Trần Công Luyện');
  await page.click('#btnSubmit');

  // Wait for result
  await page.waitForSelector('#la-so-chart', { state: 'visible', timeout: 10000 });
  await page.waitForTimeout(1000); // Allow render to complete

  await page.screenshot({ path: path.join(outDir, 'desktop_2_chart.png'), fullPage: false });
  console.log('Saved desktop_2_chart.png');

  // 3. Scroll to locked palace accordion item
  const lockedItem = await page.$('.accordion-item.item-locked');
  if (lockedItem) {
    await lockedItem.scrollIntoViewIfNeeded();
    // Click to open it
    const headerBtn = await lockedItem.$('.accordion-header');
    if (headerBtn) await headerBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, 'desktop_3_locked_palace.png'), fullPage: false });
    console.log('Saved desktop_3_locked_palace.png');
  }

  // 4. Scroll to Pricing
  const pricingSection = await page.$('#bang-gia-dich-vu');
  if (pricingSection) {
    await pricingSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, 'desktop_4_pricing.png'), fullPage: false });
    console.log('Saved desktop_4_pricing.png');
  }

  // 5. Scroll to Features
  const featuresSection = await page.$('#tinh-nang');
  if (featuresSection) {
    await featuresSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, 'desktop_5_features.png'), fullPage: false });
    console.log('Saved desktop_5_features.png');
  }

  // 6. Scroll to Footer
  const footerEl = await page.$('footer.footer');
  if (footerEl) {
    await footerEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, 'desktop_6_footer.png'), fullPage: false });
    console.log('Saved desktop_6_footer.png');
  }

  // Check horizontal overflow on desktop
  const desktopOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('Desktop has horizontal overflow?:', desktopOverflow);

  await desktopContext.close();

  console.log('\n=== TEST 2: MOBILE 390px (iPhone) ===');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  });
  const mPage = await mobileContext.newPage();
  await mPage.goto('http://localhost:8080/', { waitUntil: 'networkidle' });

  // 1. Mobile Lookup View
  await mPage.screenshot({ path: path.join(outDir, 'mobile_1_lookup.png'), fullPage: false });
  console.log('Saved mobile_1_lookup.png');

  // 2. Submit form
  await mPage.fill('#hoTen', 'Nguyễn Thị Mai');
  await mPage.click('#btnSubmit');

  await mPage.waitForSelector('#la-so-chart', { state: 'visible', timeout: 10000 });
  await mPage.waitForTimeout(1000);

  await mPage.screenshot({ path: path.join(outDir, 'mobile_2_chart.png'), fullPage: false });
  console.log('Saved mobile_2_chart.png');

  // Check mobile chart horizontal overflow
  const mobileChartOverflow = await mPage.evaluate(() => {
    const el = document.getElementById('la-so-chart');
    return {
      windowWidth: window.innerWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      chartWidth: el ? el.offsetWidth : 0,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth
    };
  });
  console.log('Mobile Chart overflow check:', mobileChartOverflow);

  // 3. Mobile Locked Palace
  const mLockedItem = await mPage.$('.accordion-item.item-locked');
  if (mLockedItem) {
    await mLockedItem.scrollIntoViewIfNeeded();
    const mHeaderBtn = await mLockedItem.$('.accordion-header');
    if (mHeaderBtn) await mHeaderBtn.click();
    await mPage.waitForTimeout(500);
    await mPage.screenshot({ path: path.join(outDir, 'mobile_3_locked_palace.png'), fullPage: false });
    console.log('Saved mobile_3_locked_palace.png');
  }

  // 4. Mobile Pricing
  const mPricingSection = await mPage.$('#bang-gia-dich-vu');
  if (mPricingSection) {
    await mPricingSection.scrollIntoViewIfNeeded();
    await mPage.waitForTimeout(500);
    await mPage.screenshot({ path: path.join(outDir, 'mobile_4_pricing.png'), fullPage: false });
    console.log('Saved mobile_4_pricing.png');
  }

  // 5. Mobile Footer
  const mFooterEl = await mPage.$('footer.footer');
  if (mFooterEl) {
    await mFooterEl.scrollIntoViewIfNeeded();
    await mPage.waitForTimeout(500);
    await mPage.screenshot({ path: path.join(outDir, 'mobile_5_footer.png'), fullPage: false });
    console.log('Saved mobile_5_footer.png');
  }

  await mobileContext.close();
  await browser.close();

  console.log('\n=== ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY! ===');
}

run().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

