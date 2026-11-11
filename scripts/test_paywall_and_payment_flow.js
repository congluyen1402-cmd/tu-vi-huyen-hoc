const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262';

async function run() {
  const browser = await chromium.launch({ headless: true });
  
  const viewports = [
    { name: 'iphone13', width: 390, height: 844 },
    { name: 'android412', width: 412, height: 915 }
  ];

  for (const vp of viewports) {
    console.log(`\n=== Testing viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
    });
    const page = await context.newPage();

    // 1. Open home page
    await page.goto('http://localhost:8080/#lap-la-so');
    await page.waitForLoadState('networkidle');

    // Fill form to calculate chart
    await page.fill('#hoTen', 'Nguyễn Thị Hương');
    await page.selectOption('#gioiTinh', 'nu');
    await page.selectOption('#ngaySinh', '15');
    await page.selectOption('#thangSinh', '8');
    await page.selectOption('#namSinh', '1995');
    await page.selectOption('#gioSinh', '9');
    await page.selectOption('#phutSinh', '30');

    // Submit form
    await page.click('#btnSubmit');
    await page.waitForSelector('#ket-qua', { state: 'visible', timeout: 15000 });
    await page.waitForTimeout(1000);

    // Click on a teaser accordion item to expand it
    const teaserHeader = page.locator('.accordion-item.item-teaser .accordion-header').first();
    await teaserHeader.scrollIntoViewIfNeeded();
    await teaserHeader.click();
    await page.waitForTimeout(500);

    // 2. Check Paywall Box in reading section
    const paywallOverlay = page.locator('.cliffhanger-paywall-overlay').first();
    await paywallOverlay.waitFor({ state: 'visible', timeout: 10000 });
    await paywallOverlay.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Capture screenshot of paywall
    const paywallBox = await paywallOverlay.boundingBox();
    console.log(`${vp.name} Paywall bounding box:`, paywallBox);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, `${vp.name}_paywall_view.png`),
      clip: {
        x: 0,
        y: Math.max(0, paywallBox.y - 20),
        width: vp.width,
        height: Math.min(paywallBox.height + 40, 750)
      }
    });
    console.log(`Saved screenshot: ${vp.name}_paywall_view.png`);

    // 3. Click Unlock VIP / Mở khóa CTA inside the paywall
    const unlockBtn = paywallOverlay.locator('.btn-cliffhanger-sub, .btn-cliffhanger-main').first();
    if (await unlockBtn.isVisible()) {
      await unlockBtn.click();
    } else {
      console.log('Triggering window.TuViMonetize.openVipModal()');
      await page.evaluate(() => window.TuViMonetize.openVipModal('Gói Mở Khóa Nhanh 3 Cung Trọng Tâm (Tài - Quan - Phối)', 29000));
    }

    // Wait for modal
    const modal = page.locator('#tuvi-vip-modal');
    await modal.waitFor({ state: 'visible', timeout: 5000 });
    await page.waitForTimeout(600);

    // Check modal height & bounding box
    const modalCard = modal.locator('.tuvi-vip-card');
    const modalBox = await modalCard.boundingBox();
    console.log(`${vp.name} Modal card bounding box:`, modalBox);

    // Screenshot of Modal showing radar
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, `${vp.name}_modal_radar_view.png`)
    });
    console.log(`Saved screenshot: ${vp.name}_modal_radar_view.png`);

    // 4. Test Payment Verification Flow
    // Trigger successful payment by calling window.TuViMonetize.onPaymentSuccess
    const orderCode = await page.evaluate(() => window.TuViMonetize.currentOrderCode);
    console.log(`Current order code in modal: ${orderCode}`);

    await page.evaluate((code) => {
      window.TuViMonetize.onPaymentSuccess({
        orderCode: code || 'TV715225',
        packageName: 'Gói Mở Khóa Nhanh 3 Cung Trọng Tâm (Tài - Quan - Phối)',
        amount: 29000,
        vipAccessToken: 'test_token_123'
      });
    }, orderCode);

    await page.waitForTimeout(600);

    // Screenshot of Success confirmation screen
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, `${vp.name}_modal_success_view.png`)
    });
    console.log(`Saved screenshot: ${vp.name}_modal_success_view.png`);

    await context.close();
  }

  await browser.close();
  console.log('\nAll visual tests finished successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
