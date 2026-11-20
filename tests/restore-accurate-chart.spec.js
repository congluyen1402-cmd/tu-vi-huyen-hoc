const { test, expect } = require('@playwright/test');

test.describe('Tra Cứu Xem Lại Báo Cáo VIP - Xuất Đúng Lá Số 100%', () => {

  test('Khi nhập mã TV810357: phải xuất đúng lá số Trần Công Luyện (14/02/1994, Nam)', async ({ page }) => {
    await page.goto('/');

    // 1. Mở modal xem lại báo cáo
    await page.evaluate(() => {
      window.TuViMonetize.openRestoreModal();
    });

    const modal = page.locator('#tuvi-restore-modal');
    await expect(modal).toHaveClass(/active/);

    // 2. Nhập mã TV810357
    await page.fill('#restoreQueryInput', 'TV810357');
    await page.click('#btnRestoreSubmit');

    // Chờ thông báo thành công
    await expect(page.locator('#restoreSuccessSection')).toBeVisible();

    // Bấm xem ngay
    await page.click('#btnRestoreViewNow');

    // Chờ kết quả lá số hiển thị
    await page.waitForSelector('#ket-qua', { state: 'visible', timeout: 8000 });

    // Kiểm tra lá số hiển thị đúng họ tên và thông số bản mệnh của Trần Công Luyện
    const chartContent = await page.locator('#ket-qua').textContent();
    expect(chartContent).toContain('Trần Công Luyện');
    expect(chartContent).toContain('1994');
    expect(chartContent).toContain('Giáp Tuất');
    expect(chartContent).toContain('Sơn Đầu Hỏa');

    // Kiểm tra form cũng được cập nhật đồng bộ
    const hoTenVal = await page.inputValue('#hoTen');
    expect(hoTenVal).toBe('Trần Công Luyện');
    const ngayVal = await page.inputValue('#ngaySinh');
    expect(ngayVal).toBe('14');
    const thangVal = await page.inputValue('#thangSinh');
    expect(thangVal).toBe('2');
    const namVal = await page.inputValue('#namSinh');
    expect(namVal).toBe('1994');

    // Kiểm tra quyền VIP đã kích hoạt
    const isVip = await page.evaluate(() => window.TuViMonetize.isVipUnlocked);
    expect(isVip).toBe(true);
  });

  test('Khi chuyển sang tra cứu mã TV622349: lá số phải lập tức đổi đúng sang Lê Minh Tuấn (15/08/1995)', async ({ page }) => {
    await page.goto('/');

    // Mở modal xem lại báo cáo
    await page.evaluate(() => {
      window.TuViMonetize.openRestoreModal();
    });

    // Nhập mã TV622349
    await page.fill('#restoreQueryInput', 'TV622349');
    await page.click('#btnRestoreSubmit');

    await expect(page.locator('#restoreSuccessSection')).toBeVisible();
    await page.click('#btnRestoreViewNow');

    await page.waitForSelector('#ket-qua', { state: 'visible', timeout: 8000 });

    // Kiểm tra lá số phải đổi sang đúng Lê Minh Tuấn
    const chartContent = await page.locator('#ket-qua').textContent();
    expect(chartContent).toContain('Lê Minh Tuấn');
    expect(chartContent).toContain('1995');
    expect(chartContent).toContain('Ất Hợi');

    // Form cũng đổi sang Lê Minh Tuấn
    const hoTenVal = await page.inputValue('#hoTen');
    expect(hoTenVal).toBe('Lê Minh Tuấn');
    const ngayVal = await page.inputValue('#ngaySinh');
    expect(ngayVal).toBe('15');
    const thangVal = await page.inputValue('#thangSinh');
    expect(thangVal).toBe('8');
    const namVal = await page.inputValue('#namSinh');
    expect(namVal).toBe('1995');
  });

});
