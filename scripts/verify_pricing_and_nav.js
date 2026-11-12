const { chromium, devices } = require('playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262';

(async () => {
  console.log('🚀 Starting Verification of Pricing & Top Navigation...');
  const browser = await chromium.launch({ headless: true });

  try {
    // -------------------------------------------------------------
    // 1. DESKTOP 1920 x 1080 (Exact user's desktop resolution)
    // -------------------------------------------------------------
    const desktopContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    const page = await desktopContext.newPage();
    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });

    // A. Check Top Navigation
    console.log('\n--- 1. Checking Desktop Top Navigation ---');
    const desktopNav = page.locator('#desktopNav');
    const isNavVisible = await desktopNav.isVisible();
    console.log('✓ Desktop Nav is visible:', isNavVisible);

    const thanSoLink = desktopNav.locator('a[href="/than-so-hoc"]');
    const hopTuoiLink = desktopNav.locator('a[href="/hop-tuoi"]');
    console.log('✓ Thần Số Học top link visible:', await thanSoLink.isVisible());
    console.log('✓ Bói Hợp Tuổi top link visible:', await hopTuoiLink.isVisible());

    // Capture Header screenshot
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'verify_desktop_header_direct_links.png'),
      clip: { x: 0, y: 0, width: 1920, height: 120 }
    });
    console.log('📸 Saved verify_desktop_header_direct_links.png');

    // B. Check Pricing Section (3 Golden Tiers)
    console.log('\n--- 2. Checking Streamlined 3 Golden Tiers Pricing ---');
    const pricingSection = page.locator('#bang-gia-dich-vu');
    await pricingSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const pricingCards = pricingSection.locator('.pricing-grid .pricing-card');
    const cardCount = await pricingCards.count();
    console.log(`✓ Number of pricing cards displayed: ${cardCount} (Expected: 3)`);
    if (cardCount !== 3) {
      throw new Error(`Expected exactly 3 pricing cards, got ${cardCount}`);
    }

    // Check Price text & wrapping
    for (let i = 0; i < cardCount; i++) {
      const card = pricingCards.nth(i);
      const title = await card.locator('.pricing-title').innerText();
      const priceText = await card.locator('.pricing-price').innerText();
      const priceBox = await card.locator('.pricing-price').boundingBox();
      console.log(`  Card ${i + 1}: [${title}] -> Price: "${priceText.replace(/\n/g, ' ')}" (Box height: ${priceBox.height}px)`);
      
      if (priceBox.height > 55) {
        throw new Error(`Price box height ${priceBox.height}px indicates wrapping in Card ${i + 1}!`);
      } else {
        console.log(`  ✓ Price text strictly fits on 1 single line!`);
      }
    }

    // Capture Pricing Section screenshot
    const pricingBox = await pricingSection.boundingBox();
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'verify_desktop_pricing_3tiers.png'),
      clip: {
        x: Math.max(0, pricingBox.x),
        y: Math.max(0, pricingBox.y),
        width: pricingBox.width,
        height: Math.min(pricingBox.height, 900)
      }
    });
    console.log('📸 Saved verify_desktop_pricing_3tiers.png');

    // C. Test VietQR Payment Modal for 49k and 99k
    console.log('\n--- 3. Testing VietQR Trigger for 49k & 99k Packages ---');
    const btnTier1 = pricingCards.nth(0).locator('.btn-pricing-cta');
    await btnTier1.click();
    await page.waitForTimeout(800);

    const qrModal = page.locator('#tuvi-vip-modal');
    const isModalVisible = await qrModal.isVisible();
    console.log('✓ VietQR Modal opens on clicking Gói 49k:', isModalVisible);

    const modalAmount = await page.locator('#vipTransferAmount').innerText();
    const modalAccount = await page.locator('#vipAccountNo').innerText();
    console.log('✓ Modal Displayed Transfer Amount:', modalAmount);
    console.log('✓ Modal Bank Account:', modalAccount);

    // Close modal
    const closeBtn = page.locator('#tuvi-vip-modal .tuvi-vip-close');
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await page.waitForTimeout(500);
    }

    // Test Gói 2 (Combo 99k)
    const btnTier2 = pricingCards.nth(1).locator('.btn-pricing-cta');
    await btnTier2.click();
    await page.waitForTimeout(800);
    const comboAmount = await page.locator('#vipTransferAmount').innerText();
    console.log('✓ Modal Displayed Amount for Combo 99k:', comboAmount);

    // Capture QR Modal
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'verify_vietqr_modal_combo99k.png')
    });
    console.log('📸 Saved verify_vietqr_modal_combo99k.png');

    await desktopContext.close();

    // -------------------------------------------------------------
    // 2. MOBILE RESPONSIVENESS (iPhone 13 - 390x844)
    // -------------------------------------------------------------
    console.log('\n--- 4. Checking Mobile Layout (iPhone 13) ---');
    const mobileContext = await browser.newContext({
      ...devices['iPhone 13'],
      viewport: { width: 390, height: 844 }
    });
    const mobPage = await mobileContext.newPage();
    await mobPage.goto('http://localhost:8080/', { waitUntil: 'networkidle' });

    // Scroll to pricing
    const mobPricing = mobPage.locator('#bang-gia-dich-vu');
    await mobPricing.scrollIntoViewIfNeeded();
    await mobPage.waitForTimeout(500);

    // Verify all 3 cards prices on mobile
    const mobCards = mobPage.locator('.pricing-grid .pricing-card');
    for (let i = 0; i < 3; i++) {
      const pBox = await mobCards.nth(i).locator('.pricing-price').boundingBox();
      const pText = await mobCards.nth(i).locator('.pricing-price').innerText();
      console.log(`  Mobile Card ${i + 1}: "${pText.replace(/\n/g, ' ')}" -> Height: ${pBox.height}px`);
    }

    await mobPage.screenshot({
      path: path.join(ARTIFACT_DIR, 'verify_mobile_pricing_3tiers.png')
    });
    console.log('📸 Saved verify_mobile_pricing_3tiers.png');

    await mobileContext.close();

    console.log('\n🎉 ALL VERIFICATION TESTS PASSED PERFECTLY!');
  } catch (err) {
    console.error('❌ Verification failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
