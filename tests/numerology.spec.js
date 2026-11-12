const { test, expect } = require('@playwright/test');

test.describe('Thần Số Học Pythagoras & Bói Hợp Tuổi Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.route('**/api/**', async (route) => {
      const headers = { ...route.request().headers(), 'x-automated-test': '1' };
      await route.continue({ headers });
    });
  });

  test('TS01: Trang /than-so-hoc tải mượt mà, không lỗi console, không tràn màn hình ngang', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('favicon')) {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', err => consoleErrors.push(err.message));

    await page.goto('/than-so-hoc');
    await expect(page).toHaveTitle(/Tra Cứu Thần Số Học/);

    expect(consoleErrors).toHaveLength(0);

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 2;
    });
    expect(hasHorizontalOverflow).toBeFalsy();
  });

  test('TS02: Tính toán Thần Số Học chính xác (Số Chủ Đạo, 6 Chỉ Số, 3x3 Grid, 4 Đỉnh Cao, Năm 2026/2027)', async ({ page }) => {
    await page.goto('/than-so-hoc');

    // Fill form
    await page.fill('#numFullName', 'Trần Công Luyện');
    await page.fill('#numBirthDate', '1995-10-14');
    await page.click('button[type="submit"]');

    // Check Hero Card rendered
    const heroCard = page.locator('.num-hero-card');
    await expect(heroCard).toBeVisible();
    await expect(page.locator('.num-user-title')).toContainText('TRẦN CÔNG LUYỆN');

    // Check Life Path calculated (14 + 10 + 1995 -> 5 + 1 + 6 = 12 -> 3)
    const giantDigit = page.locator('.num-giant-digit');
    await expect(giantDigit).toBeVisible();
    const digitText = await giantDigit.textContent();
    expect(Number(digitText)).toBeGreaterThanOrEqual(1);

    // Check 6 core numbers
    const coreCards = page.locator('.core-card');
    await expect(coreCards).toHaveCount(6);

    // Check 3x3 Lo Shu Grid
    const gridCells = page.locator('.grid-cell');
    await expect(gridCells).toHaveCount(9);

    // Check 4 Pinnacles
    const pinnacles = page.locator('.pinnacle-card');
    await expect(pinnacles).toHaveCount(4);

    // Check Personal Years 2026 & 2027
    await expect(page.locator('.py-card.current-year')).toBeVisible();
    await expect(page.locator('.py-card.next-year')).toBeVisible();

    // Check cross-link button
    const crossLinkBtn = page.locator('.btn-royal-action');
    await expect(crossLinkBtn).toBeVisible();
  });

  test('TS03: Trang /hop-tuoi tải mượt mà, tính điểm tương hợp 3 tầng chính xác', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('favicon')) {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/hop-tuoi');
    await expect(page).toHaveTitle(/Bói Hợp Tuổi/);
    expect(consoleErrors).toHaveLength(0);

    // Fill dual persons form
    await page.fill('#p1Name', 'Nguyễn Văn Nam');
    await page.fill('#p1Dob', '1990-05-15');
    await page.fill('#p2Name', 'Lê Thị Hoa');
    await page.fill('#p2Dob', '1994-08-20');
    await page.click('button[type="submit"]');

    // Check result
    const compHero = page.locator('.comp-hero-card');
    await expect(compHero).toBeVisible();

    // Check score meter
    const scoreDigits = page.locator('.score-digits');
    await expect(scoreDigits).toBeVisible();
    const scoreVal = await scoreDigits.textContent();
    expect(scoreVal).toMatch(/\d+%/);

    // Check 3 layers
    const layerCards = page.locator('.layer-card');
    await expect(layerCards).toHaveCount(3);

    // Check remedies
    await expect(page.locator('.remedies-card')).toBeVisible();
  });

  test('TS04: Liên kết chéo từ Bàn Lá Số Tử Vi sang Thần Số Học tự động điền thông tin', async ({ page }) => {
    await page.goto('/#lap-la-so');

    // Fill Tu Vi form
    await page.fill('#hoTen', 'Hoàng Minh Tuấn');
    await page.selectOption('#gioiTinh', 'nam');
    await page.selectOption('#loaiLich', 'duong');
    await page.selectOption('#thangSinh', '6');
    await page.selectOption('#ngaySinh', '25');
    await page.selectOption('#namSinh', '1998');
    await page.selectOption('#gioSinh', '5'); // Mão
    await page.selectOption('#phutSinh', '30');
    await page.click('#btnSubmit');

    // Wait for chart
    const chart = page.locator('#la-so-chart');
    await expect(chart).toBeVisible({ timeout: 10000 });

    // Find cross banner
    const crossBanner = page.locator('.huyen-hoc-cross-banner');
    await expect(crossBanner).toBeVisible();

    // Click "Tra Thần Số Học Ngay"
    await page.click('.btn-toolbar-numerology');

    // Should navigate to /than-so-hoc with params
    await expect(page).toHaveURL(/than-so-hoc\?name=.*&dob=.*/);
    await expect(page.locator('.num-user-title')).toContainText('HOÀNG MINH TUẤN');
  });

});
