const { test, expect } = require('@playwright/test');

test.describe('Mobile Viewport: Xem Lại Báo Cáo VIP & Khắc phục kẹt Modal', () => {

  test.use({
    viewport: { width: 390, height: 844 } // Chuẩn kích thước iPhone 12/13/14
  });

  test('Kiểm tra thoát modal tra cứu dễ dàng trên Mobile bằng mọi cách', async ({ page }) => {
    // 1. Mở trang chủ
    await page.goto('/');

    // 2. Mở modal tra cứu
    await page.evaluate(() => {
      TuViMonetize.openRestoreModal();
    });

    const modal = page.locator('#tuvi-restore-modal');
    await expect(modal).toHaveClass(/active/);

    // 3. Kiểm tra kích thước thẻ modal card không bị tràn quá chiều cao viewport
    const cardBox = await page.locator('#tuvi-restore-modal .tuvi-tool-modal-card').boundingBox();
    expect(cardBox.height).toBeLessThanOrEqual(844);

    // 4. Thoát bằng nút 'X' góc trên bên phải
    const closeBtn = page.locator('#tuvi-restore-modal .tuvi-tool-modal-close');
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await expect(modal).not.toHaveClass(/active/);

    // 5. Thoát bằng nút text '✕ Đóng cửa sổ tra cứu' dưới form
    await page.evaluate(() => {
      TuViMonetize.openRestoreModal();
    });
    await expect(modal).toHaveClass(/active/);
    const textCloseBtn = page.locator('#tuvi-restore-modal button:has-text("Đóng cửa sổ tra cứu")').first();
    await expect(textCloseBtn).toBeVisible();
    await textCloseBtn.click();
    await expect(modal).not.toHaveClass(/active/);

    // 6. Thoát bằng cách chạm/click ra ngoài backdrop
    await page.evaluate(() => {
      TuViMonetize.openRestoreModal();
    });
    await expect(modal).toHaveClass(/active/);
    // Click vào góc trên màn hình ngoài modal card
    await page.mouse.click(15, 15);
    await expect(modal).not.toHaveClass(/active/);

    // 7. Thoát bằng phím Escape
    await page.evaluate(() => {
      TuViMonetize.openRestoreModal();
    });
    await expect(modal).toHaveClass(/active/);
    await page.keyboard.press('Escape');
    await expect(modal).not.toHaveClass(/active/);

    // 8. Khi có mã VIP đã lưu trên máy: Bấm "⚡ Mở Ngay" -> Modal tự động đóng tức thì!
    await page.evaluate(() => {
      localStorage.setItem('tvhh_vip_order_code', 'TV622349');
      localStorage.setItem('tvhh_vip_codes_history', JSON.stringify([
        { code: 'TV622349', label: 'Báo Cáo VIP Toàn Thư (49k)' }
      ]));
      TuViMonetize.openRestoreModal();
    });
    await expect(modal).toHaveClass(/active/);

    // Mock API khôi phục
    await page.route('**/api/orders/restore', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          isVip: true,
          order: {
            orderCode: 'TV622349',
            amount: 49000,
            packageId: 'vip_full',
            packageName: 'Báo Cáo VIP Toàn Thư (49k)',
            chartKey: 'nam_1990_10_10_10'
          }
        })
      });
    });

    const quickBtn = page.locator('#tuvi-restore-modal button:has-text("Mở Ngay")').first();
    await expect(quickBtn).toBeVisible();
    await quickBtn.click();

    // Modal phải tự động đóng ngay lập tức
    await expect(modal).not.toHaveClass(/active/);

    // 9. Khi nhập mã thủ công: khối thành công hiển thị có cả nút "Xem Bản Luận Giải Ngay" và nút Đóng
    await page.evaluate(() => {
      TuViMonetize.openRestoreModal();
    });
    await expect(modal).toHaveClass(/active/);
    await page.fill('#restoreQueryInput', 'TV622349');
    await page.click('#btnRestoreSubmit');

    const successSec = page.locator('#restoreSuccessSection');
    await expect(successSec).toBeVisible();

    const viewReportBtn = page.locator('#restoreSuccessSection button:has-text("Xem Bản Luận Giải Ngay")');
    await expect(viewReportBtn).toBeVisible();
    await viewReportBtn.click();

    // Modal đóng ngay sau khi bấm Xem Bản Luận Giải Ngay
    await expect(modal).not.toHaveClass(/active/);
  });
});
