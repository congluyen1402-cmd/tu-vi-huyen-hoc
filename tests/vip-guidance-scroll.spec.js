const { test, expect } = require('@playwright/test');

test.describe('VIP Post-Payment Guidance & Auto-Scroll Flow', () => {
  test('Kiểm tra chỉ dẫn kéo xuống sau thanh toán & tự động mở bung 12 cung', async ({ page }) => {
    // 1. Truy cập trang chủ
    await page.goto('/');

    // 2. Điền form và bấm lập lá số mẫu để có kết quả
    await page.fill('#hoTen', 'Nguyễn Văn An');
    await page.selectOption('#gioiTinh', 'nam');
    await page.selectOption('#ngaySinh', '15');
    await page.selectOption('#thangSinh', '8');
    await page.selectOption('#namSinh', '1990');
    await page.selectOption('#gioSinh', '8');
    await page.selectOption('#phutSinh', '30');
    await page.click('button[type="submit"]');

    // Chờ kết quả lá số hiển thị
    await page.waitForSelector('#ket-qua', { state: 'visible', timeout: 10000 });

    // 3. Kích hoạt giả lập thanh toán VIP thành công
    await page.evaluate(() => {
      window.TuViMonetize.onPaymentSuccess({
        isPaid: true,
        orderCode: 'TV888999',
        amount: 49000,
        packageId: 'vip_49k',
        serviceName: 'Báo Cáo VIP A4 Toàn Thư'
      });
    });

    // 4. Kiểm tra Modal Thành Công có hộp chỉ dẫn trực quan
    const successModal = page.locator('#tuvi-vip-modal');
    await expect(successModal).toBeVisible();

    const guideBox = successModal.locator('text=Bản Luận Giải Nằm Ngay Phía Dưới Lá Số');
    await expect(guideBox).toBeVisible();

    const scrollBtn = successModal.locator('text=BẤM VÀO ĐÂY ĐỂ CUỘN XUỐNG XEM LUẬN GIẢI');
    await expect(scrollBtn).toBeVisible();

    // 5. Click nút "BẤM VÀO ĐÂY ĐỂ CUỘN XUỐNG XEM LUẬN GIẢI"
    await scrollBtn.click();

    // Modal phải đóng
    await expect(successModal).not.toHaveClass(/active/);

    // 6. Kiểm tra Thẻ chỉ dẫn VIP xuất hiện ở đầu phần luận giải 12 cung
    const vipGuideCard = page.locator('#vipScrollGuideCard');
    await expect(vipGuideCard).toBeVisible();
    await expect(vipGuideCard).toContainText('BẠN ĐANG Ở ĐÚNG NƠI: XEM CHI TIẾT 12 CUNG');

    // 7. Kiểm tra các cung đã được bung mở sẵn sàng (expandAllPalaces)
    const openPalaces = page.locator('#accordionList .accordion-item.open');
    const count = await openPalaces.count();
    expect(count).toBeGreaterThan(0);

    // 8. Kiểm tra nút nổi Mobile Scroll Pill được tạo trong DOM
    const pill = page.locator('#vipMobileScrollPill');
    await expect(pill).toBeAttached();
  });
});
