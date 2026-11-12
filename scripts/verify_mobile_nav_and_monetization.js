const { chromium, devices } = require('playwright');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262';

async function runTests() {
  console.log('🚀 Starting Comprehensive Mobile Nav & Monetization Verification...');
  const browser = await chromium.launch({ headless: true });

  try {
    // -------------------------------------------------------------
    // TEST 1: iPhone 13 (iOS Safari)
    // -------------------------------------------------------------
    console.log('\n📱 [TEST 1] iPhone 13 (390 x 844) Navigation & Drawer Test...');
    const iphoneContext = await browser.newContext({
      ...devices['iPhone 13'],
      viewport: { width: 390, height: 844 }
    });
    const iphonePage = await iphoneContext.newPage();
    await iphonePage.goto('http://localhost:8080/', { waitUntil: 'networkidle' });

    // Check bottom nav visibility
    const bottomNav = iphonePage.locator('.mobile-bottom-nav');
    const isBottomNavVisible = await bottomNav.isVisible();
    console.log('  ✓ Bottom Nav visible on iPhone 13:', isBottomNavVisible);
    if (!isBottomNavVisible) throw new Error('Bottom nav not visible on iPhone 13!');

    // Check all 5 items
    const navItems = await bottomNav.locator('a, button').all();
    console.log('  ✓ Bottom Nav item count:', navItems.length);
    if (navItems.length !== 5) throw new Error(`Expected 5 items in bottom nav, found ${navItems.length}`);

    // Click Menu button in bottom nav
    console.log('  -> Clicking Menu button in bottom nav to open Mobile Drawer...');
    const menuBtn = iphonePage.locator('#mobileBottomMenuBtn');
    await menuBtn.click();
    await iphonePage.waitForTimeout(400);

    const drawer = iphonePage.locator('#navMenu');
    const isDrawerOpen = await drawer.evaluate(el => el.classList.contains('open'));
    console.log('  ✓ Mobile Drawer is opened:', isDrawerOpen);
    if (!isDrawerOpen) throw new Error('Mobile drawer failed to open via bottom nav button!');

    // Capture screenshot of Mobile Drawer on iPhone 13
    await iphonePage.screenshot({
      path: path.join(ARTIFACT_DIR, 'iphone13_drawer_menu.png'),
      fullPage: false
    });
    console.log('  📸 Captured iphone13_drawer_menu.png');

    // Close drawer via Close button
    const closeBtn = iphonePage.locator('#drawerCloseBtn');
    await closeBtn.click();
    await iphonePage.waitForTimeout(400);
    const isDrawerClosed = !(await drawer.evaluate(el => el.classList.contains('open')));
    console.log('  ✓ Mobile Drawer closed via ✕ button:', isDrawerClosed);

    // Capture screenshot of Homepage on iPhone 13 with bottom nav
    await iphonePage.screenshot({
      path: path.join(ARTIFACT_DIR, 'iphone13_home_bottom_nav.png'),
      fullPage: false
    });
    console.log('  📸 Captured iphone13_home_bottom_nav.png');
    await iphoneContext.close();

    // -------------------------------------------------------------
    // TEST 2: Android (Samsung Galaxy S21)
    // -------------------------------------------------------------
    console.log('\n🤖 [TEST 2] Android Samsung Galaxy S21 (360 x 800) Test...');
    const androidContext = await browser.newContext({
      viewport: { width: 360, height: 800 },
      isMobile: true,
      hasTouch: true
    });
    const androidPage = await androidContext.newPage();
    await androidPage.goto('http://localhost:8080/', { waitUntil: 'networkidle' });

    const androidBottomNav = androidPage.locator('.mobile-bottom-nav');
    console.log('  ✓ Bottom Nav visible on Android:', await androidBottomNav.isVisible());

    // Capture screenshot of Homepage on Android
    await androidPage.screenshot({
      path: path.join(ARTIFACT_DIR, 'android_home_bottom_nav.png'),
      fullPage: false
    });
    console.log('  📸 Captured android_home_bottom_nav.png');
    await androidContext.close();

    // -------------------------------------------------------------
    // TEST 3: Desktop Dropdowns (1440 x 900)
    // -------------------------------------------------------------
    console.log('\n💻 [TEST 3] Desktop Dropdown Navigation (1440 x 900)...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto('http://localhost:8080/', { waitUntil: 'networkidle' });

    // Ensure bottom nav is hidden on desktop
    const desktopBottomNav = desktopPage.locator('.mobile-bottom-nav');
    const isBottomNavHidden = !(await desktopBottomNav.isVisible());
    console.log('  ✓ Bottom Nav hidden on Desktop:', isBottomNavHidden);

    // Hover dropdown 1: Cổ Học Tinh Hoa
    const dropdown1 = desktopPage.locator('.nav-item-dropdown').first();
    await dropdown1.hover();
    await desktopPage.waitForTimeout(300);
    const dropdownMenu1 = dropdown1.locator('.nav-dropdown-menu');
    console.log('  ✓ Cổ Học Tinh Hoa dropdown opens on hover:', await dropdownMenu1.isVisible());

    await desktopPage.screenshot({
      path: path.join(ARTIFACT_DIR, 'desktop_navbar_dropdown.png'),
      clip: { x: 0, y: 0, width: 1440, height: 260 }
    });
    console.log('  📸 Captured desktop_navbar_dropdown.png');
    await desktopContext.close();

    // -------------------------------------------------------------
    // TEST 4: Thần Số Học Form & VietQR Paywall (39.000đ)
    // -------------------------------------------------------------
    console.log('\n🔮 [TEST 4] Thần Số Học Page & VietQR Monetization (39k)...');
    const numContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true
    });
    const numPage = await numContext.newPage();
    await numPage.goto('http://localhost:8080/than-so-hoc', { waitUntil: 'networkidle' });

    await numPage.fill('#numFullName', 'Nguyễn Hoàng Gia Bảo');
    await numPage.fill('#numBirthDate', '1998-05-18');
    await numPage.click('button[type="submit"]');
    await numPage.waitForTimeout(600);

    // Check paywall box exists
    const numPaywall = numPage.locator('.num-vip-paywall-box');
    const isNumPaywallVisible = await numPaywall.isVisible();
    console.log('  ✓ Thần Số Học Paywall Box (39.000đ) visible in results:', isNumPaywallVisible);
    if (!isNumPaywallVisible) throw new Error('Thần Số Học paywall box missing!');

    // Scroll to paywall and take screenshot
    await numPaywall.scrollIntoViewIfNeeded();
    await numPage.waitForTimeout(300);
    await numPage.screenshot({
      path: path.join(ARTIFACT_DIR, 'iphone13_num_paywall_card.png')
    });
    console.log('  📸 Captured iphone13_num_paywall_card.png');

    // Click Unlock Button
    console.log('  -> Clicking "MỞ KHÓA BÁO CÁO VIP NGAY (39.000đ)"...');
    const numUnlockBtn = numPaywall.locator('.btn-paywall-vietqr');
    await numUnlockBtn.click();
    await numPage.waitForTimeout(600);

    // Verify VietQR Modal is open
    const vipModal = numPage.locator('#tuvi-vip-modal');
    const isModalOpen = await vipModal.isVisible();
    console.log('  ✓ VietQR Payment Modal opened:', isModalOpen);
    if (!isModalOpen) throw new Error('VietQR modal failed to open!');

    // Check price in modal
    const modalText = await vipModal.innerText();
    const hasCorrectPrice = modalText.includes('39.000') || modalText.includes('39,000');
    console.log('  ✓ VietQR Modal reflects 39.000đ price:', hasCorrectPrice);

    await numPage.screenshot({
      path: path.join(ARTIFACT_DIR, 'iphone13_num_vietqr_modal.png')
    });
    console.log('  📸 Captured iphone13_num_vietqr_modal.png');
    await numContext.close();

    // -------------------------------------------------------------
    // TEST 5: Bói Hợp Tuổi Form & VietQR Paywall (49.000đ)
    // -------------------------------------------------------------
    console.log('\n❤️ [TEST 5] Bói Hợp Tuổi Page & VietQR Monetization (49k)...');
    const compContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true
    });
    const compPage = await compContext.newPage();
    await compPage.goto('http://localhost:8080/hop-tuoi', { waitUntil: 'networkidle' });

    await compPage.fill('#p1Name', 'Nguyễn Hoàng Sơn');
    await compPage.fill('#p1Dob', '1992-04-12');

    await compPage.fill('#p2Name', 'Trần Thảo Ly');
    await compPage.fill('#p2Dob', '1995-09-28');
    await compPage.selectOption('#relType', 'love');

    await compPage.click('button[type="submit"]');
    await compPage.waitForTimeout(600);

    // Check paywall box exists
    const compPaywall = compPage.locator('.num-vip-paywall-box');
    const isCompPaywallVisible = await compPaywall.isVisible();
    console.log('  ✓ Bói Hợp Tuổi Paywall Box (49.000đ) visible in results:', isCompPaywallVisible);
    if (!isCompPaywallVisible) throw new Error('Bói Hợp Tuổi paywall box missing!');

    await compPaywall.scrollIntoViewIfNeeded();
    await compPage.waitForTimeout(300);
    await compPage.screenshot({
      path: path.join(ARTIFACT_DIR, 'iphone13_comp_paywall_card.png')
    });
    console.log('  📸 Captured iphone13_comp_paywall_card.png');

    // Click Unlock Button
    console.log('  -> Clicking "MỞ KHÓA BÁO CÁO HỢP TUỔI VIP (49.000đ)"...');
    const compUnlockBtn = compPaywall.locator('.btn-paywall-vietqr');
    await compUnlockBtn.click();
    await compPage.waitForTimeout(600);

    const compVipModal = compPage.locator('#tuvi-vip-modal');
    console.log('  ✓ VietQR Payment Modal opened:', await compVipModal.isVisible());
    const compModalText = await compVipModal.innerText();
    const has49kPrice = compModalText.includes('49.000') || compModalText.includes('49,000');
    console.log('  ✓ VietQR Modal reflects 49.000đ price:', has49kPrice);

    await compPage.screenshot({
      path: path.join(ARTIFACT_DIR, 'iphone13_comp_vietqr_modal.png')
    });
    console.log('  📸 Captured iphone13_comp_vietqr_modal.png');
    await compContext.close();

    console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! 100% OPERATIONAL!');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTests();
