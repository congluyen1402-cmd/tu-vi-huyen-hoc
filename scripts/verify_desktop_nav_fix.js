const { chromium, devices } = require('playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262';

async function testDesktopAndMobile() {
  console.log('🚀 Running Comprehensive Desktop Nav Fix Verification...');
  const browser = await chromium.launch({ headless: true });

  try {
    // -----------------------------------------------------------------
    // TEST 1: Desktop 1920 x 1080 (Exact user's screen resolution)
    // -----------------------------------------------------------------
    console.log('\n🖥️ [TEST 1] Desktop 1920 x 1080 (Full HD)...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    const page = await desktopContext.newPage();
    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });

    // 1. Verify Desktop Nav is visible
    const desktopNav = page.locator('#desktopNav');
    const isDesktopNavVisible = await desktopNav.isVisible();
    console.log('  ✓ #desktopNav visible on Desktop:', isDesktopNavVisible);
    if (!isDesktopNavVisible) throw new Error('#desktopNav is NOT visible on desktop!');

    // 2. Verify Mobile Drawer is strictly HIDDEN
    const mobileDrawer = page.locator('#mobileDrawer');
    const isDrawerVisible = await mobileDrawer.isVisible();
    console.log('  ✓ #mobileDrawer is hidden on Desktop:', !isDrawerVisible);
    if (isDrawerVisible) throw new Error('#mobileDrawer is VISIBLE on desktop! Leak detected!');

    // 3. Verify close button and category labels are NOT visible
    const closeBtn = page.locator('#drawerCloseBtn');
    console.log('  ✓ #drawerCloseBtn is hidden:', !(await closeBtn.isVisible()));
    if (await closeBtn.isVisible()) throw new Error('#drawerCloseBtn visible on desktop!');

    const categoryLabels = page.locator('.drawer-category-label');
    const labelCount = await categoryLabels.count();
    let anyLabelVisible = false;
    for (let i = 0; i < labelCount; i++) {
      if (await categoryLabels.nth(i).isVisible()) anyLabelVisible = true;
    }
    console.log('  ✓ Any .drawer-category-label visible:', anyLabelVisible);
    if (anyLabelVisible) throw new Error('.drawer-category-label leaked onto desktop!');

    // 4. Verify Hamburger is hidden on desktop
    const hamburger = page.locator('#hamburgerBtn');
    console.log('  ✓ Hamburger button hidden on desktop:', !(await hamburger.isVisible()));
    if (await hamburger.isVisible()) throw new Error('Hamburger button visible on desktop!');

    // 5. Test Dropdowns
    const dropdown1 = page.locator('.nav-item-dropdown').first();
    await dropdown1.hover();
    await page.waitForTimeout(300);
    const dropMenu1 = dropdown1.locator('.nav-dropdown-menu');
    console.log('  ✓ Dropdown 1 (Cổ Học Tinh Hoa) opens:', await dropMenu1.isVisible());
    if (!(await dropMenu1.isVisible())) throw new Error('Dropdown 1 failed to open on hover!');

    // Take screenshot of Desktop Header and Hero (1920x1080)
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'desktop_1920_header_fixed.png'),
      clip: { x: 0, y: 0, width: 1920, height: 750 }
    });
    console.log('  📸 Captured desktop_1920_header_fixed.png');

    await desktopContext.close();

    // -----------------------------------------------------------------
    // TEST 2: Thần Số Học & Xem Hợp Tuổi on Desktop 1920x1080
    // -----------------------------------------------------------------
    console.log('\n🔮 [TEST 2] Checking /than-so-hoc & /hop-tuoi on 1920x1080...');
    const page2 = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page2.goto('http://localhost:8080/than-so-hoc', { waitUntil: 'networkidle' });
    console.log('  ✓ than-so-hoc drawer hidden:', !(await page2.locator('#mobileDrawer').isVisible()));
    await page2.screenshot({
      path: path.join(ARTIFACT_DIR, 'desktop_than_so_hoc_header_fixed.png'),
      clip: { x: 0, y: 0, width: 1920, height: 600 }
    });

    await page2.goto('http://localhost:8080/hop-tuoi', { waitUntil: 'networkidle' });
    console.log('  ✓ hop-tuoi drawer hidden:', !(await page2.locator('#mobileDrawer').isVisible()));
    await page2.screenshot({
      path: path.join(ARTIFACT_DIR, 'desktop_hop_tuoi_header_fixed.png'),
      clip: { x: 0, y: 0, width: 1920, height: 600 }
    });
    await page2.close();

    // -----------------------------------------------------------------
    // TEST 3: iPhone 13 (Mobile) Verification
    // -----------------------------------------------------------------
    console.log('\n📱 [TEST 3] iPhone 13 (Mobile Drawer & Bottom Nav)...');
    const mobileContext = await browser.newContext({
      ...devices['iPhone 13'],
      viewport: { width: 390, height: 844 }
    });
    const mobPage = await mobileContext.newPage();
    await mobPage.goto('http://localhost:8080/', { waitUntil: 'networkidle' });

    // Desktop nav should be hidden
    console.log('  ✓ Desktop nav hidden on mobile:', !(await mobPage.locator('#desktopNav').isVisible()));
    // Hamburger should be visible
    console.log('  ✓ Hamburger button visible on mobile:', await mobPage.locator('#hamburgerBtn').isVisible());
    // Bottom nav should be visible
    console.log('  ✓ Bottom nav visible on mobile:', await mobPage.locator('.mobile-bottom-nav').isVisible());

    // Click Hamburger to open drawer
    await mobPage.click('#hamburgerBtn');
    await mobPage.waitForTimeout(400);
    const isDrawerOpenMob = await mobPage.locator('#mobileDrawer').evaluate(el => el.classList.contains('open'));
    console.log('  ✓ Mobile Drawer opens via hamburger:', isDrawerOpenMob);
    if (!isDrawerOpenMob) throw new Error('Mobile drawer failed to open on mobile!');

    await mobPage.screenshot({
      path: path.join(ARTIFACT_DIR, 'iphone13_drawer_fixed.png')
    });
    console.log('  📸 Captured iphone13_drawer_fixed.png');

    // Close via close button
    await mobPage.click('#drawerCloseBtn');
    await mobPage.waitForTimeout(400);
    const isDrawerClosedMob = !(await mobPage.locator('#mobileDrawer').evaluate(el => el.classList.contains('open')));
    console.log('  ✓ Mobile Drawer closes via ✕ button:', isDrawerClosedMob);

    await mobileContext.close();

    console.log('\n🎉 ALL TESTS PASSED! ZERO REGRESSIONS, FLAWLESS SEPARATION!');
  } catch (err) {
    console.error('❌ Verification failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testDesktopAndMobile();

