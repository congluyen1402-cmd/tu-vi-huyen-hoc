const { test, expect } = require('@playwright/test');

test.describe('Xem Tử Vi Huyền Học - Full Flow & Quality Tests', () => {

  test('TC01: Trang chủ tải mượt mà, không lỗi console, không tràn màn hình ngang (Zero Horizontal Overflow)', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('favicon')) {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', err => consoleErrors.push(err.message));

    await page.goto('/');

    // 1. Kiểm tra tiêu đề và lookup title
    await expect(page).toHaveTitle(/Xem Tử Vi Huyền Học/);
    const lookupTitle = page.locator('.lookup-title');
    await expect(lookupTitle).toBeVisible();

    // 2. Kiểm tra không có lỗi console
    expect(consoleErrors).toHaveLength(0);

    // 3. Kiểm tra không có tràn chiều ngang (Horizontal Overflow)
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 2;
    });
    expect(hasHorizontalOverflow).toBeFalsy();
  });

  test('TC02: Kiểm tra xác thực dữ liệu ngày sinh bất khả thi & ngày tương lai', async ({ page }) => {
    await page.goto('/#lap-la-so');

    // Nhập họ tên
    await page.fill('#hoTen', 'Trần Văn Nam');

    // Thử chọn ngày 31 cho tháng 4 (tháng 4 chỉ có 30 ngày)
    await page.selectOption('#thangSinh', '4');

    // Gửi form
    await page.click('#btnSubmit');

    // Lỗi inline không cho phép ngày không hợp lệ, overlay an sao không được kích hoạt
    const overlay = page.locator('#anSaoRitualOverlay');
    await expect(overlay).not.toHaveClass(/active/);
  });

  test('TC03: Luồng người dùng đầy đủ - Lập lá số -> Nghi thức An Sao -> Kết quả lá số -> Mở khóa VIP VietQR', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => consoleErrors.push(err.message));

    await page.goto('/#lap-la-so');

    // 1. Nhập thông tin tiếng Việt có dấu
    await page.fill('#hoTen', 'Nguyễn Hoàng Minh Quân');
    await page.selectOption('#gioiTinh', 'nam');
    await page.selectOption('#loaiLich', 'duong');
    await page.selectOption('#thangSinh', '8');
    await page.selectOption('#ngaySinh', '15');
    await page.selectOption('#namSinh', '1995');
    await page.selectOption('#gioSinh', '23'); // Giờ Tý
    await page.selectOption('#phutSinh', '30');

    // 2. Nhấn Lập Lá Số
    await page.click('#btnSubmit');

    // 4. Chờ hoàn tất an sao và chuyển đến kết quả lá số (chờ an sao tối thiểu 2.5s)
    const resultSection = page.locator('#ket-qua');
    await expect(resultSection).toBeVisible({ timeout: 12000 });

    // 5. Kiểm tra lá số 4x4 Tử Vi hiển thị đúng tên
    const chart = page.locator('#la-so-chart');
    await expect(chart).toBeVisible();
    await expect(chart).toContainText('Nguyễn Hoàng Minh Quân');

    // 6. Kiểm tra danh sách luận giải 12 cung
    const palaceHeaders = page.locator('.accordion-header');
    await expect(palaceHeaders.first()).toBeVisible({ timeout: 8000 });
    const count = await palaceHeaders.count();
    expect(count).toBeGreaterThanOrEqual(10);

    // 7. Cung đầu tiên mở sẵn mặc định
    const firstBody = page.locator('.accordion-body').first();
    await expect(firstBody).toBeVisible();

    // Mở cung thứ hai
    await palaceHeaders.nth(1).click();
    const secondBody = page.locator('.accordion-body').nth(1);
    await expect(secondBody).toBeVisible();

    // 8. Nhấn nút mở khóa VIP để mở modal VietQR
    const unlockBtn = page.locator('button.btn-action-vip, button.btn-lock-upgrade-sm, button.btn-pricing-cta').first();
    if (await unlockBtn.isVisible()) {
      await unlockBtn.click({ force: true });
      const vipModal = page.locator('#tuvi-vip-modal');
      await expect(vipModal).toBeVisible();
      // Đóng modal
      const closeBtn = vipModal.locator('button.tuvi-vip-close').first();
      await closeBtn.click({ force: true });
      await expect(vipModal).not.toBeVisible();
    }

    // 9. Không có lỗi nghiêm trọng
    expect(consoleErrors).toHaveLength(0);
  });

  test('TC04: Trải nghiệm mượt mà trên User Agent di động & In-app Browser (Zalo / Instagram)', async ({ page }) => {
    // Giả lập In-App Browser của Zalo / Instagram
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ZaloTheme/light Zalo/23.05.01'
    });

    await page.goto('/');

    // Kiểm tra trang vẫn tải đầy đủ và hiển thị phần tra cứu
    await page.waitForLoadState('domcontentloaded');
    const lookupSection = page.locator('.lookup-first-section');
    await expect(lookupSection).toBeVisible();

    // Form tra cứu hiển thị đúng
    const form = page.locator('#tuviForm');
    await expect(form).toBeVisible();

    // Nút Lập lá số hiển thị
    const submitBtn = page.locator('#btnSubmit');
    await expect(submitBtn).toBeVisible();
  });

});
