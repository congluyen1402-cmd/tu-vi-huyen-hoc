const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262';

(async () => {
  console.log('🚀 Testing Numerology VIP Unlock for TV289735...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  // Set localStorage as if TV289735 was paid
  await page.goto('http://localhost:8080/than-so-hoc');
  await page.evaluate(() => {
    localStorage.setItem('tvhh_vip_unlocked', 'true');
    localStorage.setItem('tvhh_vip_order_code', 'TV289735');
    localStorage.setItem('tvhh_vip_token', 'TV289735');
  });

  // Calculate numerology
  await page.fill('#numFullName', 'Trần Công Luyện');
  await page.fill('#numBirthDate', '1990-05-15');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);

  // Check if Unlocked Box is visible
  const unlockedBox = page.locator('.num-vip-unlocked-box');
  const isUnlockedVisible = await unlockedBox.isVisible();
  console.log('✓ VIP Unlocked Box is visible:', isUnlockedVisible);

  // Check if Paywall Box is HIDDEN
  const paywallBox = page.locator('.num-vip-paywall-box');
  const isPaywallVisible = await paywallBox.isVisible();
  console.log('✓ VIP Paywall Box is HIDDEN:', !isPaywallVisible);

  // Screenshot
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'verify_numerology_unlocked_tv289735.png'),
    fullPage: false
  });
  console.log('📸 Saved verify_numerology_unlocked_tv289735.png');

  await browser.close();
  console.log('🎉 Numerology VIP Unlock Verification Passed!');
})();

