const { chromium } = require('playwright');

async function runTest() {
  console.log('=== TEST FRESH LOAD NO DATA & HIDDEN STATES ===');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passed = true;
  function assert(condition, message) {
    if (!condition) {
      console.error('❌ FAIL:', message);
      passed = false;
    } else {
      console.log('✅ PASS:', message);
    }
  }

  try {
    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });

    // 1. Kiểm tra Form bắt đầu trống hoàn toàn, không điền sẵn dữ liệu cá nhân
    const hoTenVal = await page.$eval('#hoTen', el => el.value);
    assert(hoTenVal === '', `hoTen phải rỗng, thực tế: "${hoTenVal}"`);

    const gioiTinhVal = await page.$eval('#gioiTinh', el => el.value);
    assert(gioiTinhVal === '', `gioiTinh phải chưa chọn (value=""), thực tế: "${gioiTinhVal}"`);

    const gioSinhVal = await page.$eval('#gioSinh', el => el.value);
    assert(gioSinhVal === '', `gioSinh phải chưa chọn (value=""), thực tế: "${gioSinhVal}"`);

    const phutSinhVal = await page.$eval('#phutSinh', el => el.value);
    assert(phutSinhVal === '', `phutSinh phải chưa chọn (value=""), thực tế: "${phutSinhVal}"`);

    const ngaySinhVal = await page.$eval('#ngaySinh', el => el.value);
    assert(ngaySinhVal === '', `ngaySinh phải chưa chọn (value=""), thực tế: "${ngaySinhVal}"`);

    const thangSinhVal = await page.$eval('#thangSinh', el => el.value);
    assert(thangSinhVal === '', `thangSinh phải chưa chọn (value=""), thực tế: "${thangSinhVal}"`);

    const namSinhVal = await page.$eval('#namSinh', el => el.value);
    assert(namSinhVal === '', `namSinh phải chưa chọn (value=""), thực tế: "${namSinhVal}"`);

    // 2. Summary bar phải ẩn (có thuộc tính hidden và không hiển thị)
    const summaryBarHidden = await page.$eval('#formSummaryBar', el => el.hasAttribute('hidden') || el.style.display === 'none' || !el.offsetParent);
    assert(summaryBarHidden, 'Summary bar (#formSummaryBar) phải ẩn khi trang tải ban đầu');

    // 3. Error boundary và loading overlays phải ẩn hoàn toàn
    const errBoundaryVisible = await page.$eval('#appErrorBoundary', el => !el.hasAttribute('hidden') && el.style.display !== 'none' && !!el.offsetParent);
    assert(!errBoundaryVisible, 'Error boundary (#appErrorBoundary) phải ẩn');

    const loadingOverlayVisible = await page.$eval('#loadingOverlay', el => !el.hasAttribute('hidden') && el.style.display !== 'none' && !!el.offsetParent);
    assert(!loadingOverlayVisible, 'Loading overlay (#loadingOverlay) phải ẩn');

    const anSaoOverlayVisible = await page.$eval('#anSaoRitualOverlay', el => !el.hasAttribute('hidden') && el.style.display !== 'none' && !!el.offsetParent);
    assert(!anSaoOverlayVisible, 'Nghi thức An Sao overlay (#anSaoRitualOverlay) phải ẩn');

    // 4. Kiểm tra toàn trang: KHÔNG ĐƯỢC chứa dữ liệu test hay thông báo lỗi hiển thị
    const bodyText = await page.innerText('body');

    assert(!bodyText.includes('10/04/2002'), 'Không được hiển thị ngày sinh mẫu 10/04/2002 trên trang');
    assert(!bodyText.includes('Dương Liễu Mộc'), 'Không được hiển thị mệnh mẫu Dương Liễu Mộc trên trang ban đầu');
    assert(!bodyText.includes('Có lỗi xảy ra trong quá trình xử lý'), 'Không được hiển thị thông báo lỗi khi tải trang bình thường');
    assert(!bodyText.includes('Đang tính toán lá số'), 'Không được hiển thị trạng thái đang tính toán khi vừa mở trang');
    assert(!bodyText.includes('Hủy & Thử lại'), 'Nút Hủy & Thử lại không được hiển thị ban đầu');

    // 5. Kiểm tra trạng thái trung tính của khối Phong Thủy
    const fengshuiNeutralVisible = await page.isVisible('.fengshui-neutral-state');
    assert(fengshuiNeutralVisible, 'Khối Phong Thủy phải hiển thị trạng thái trung tính "Lập lá số để xem vật phẩm hợp mệnh"');

    // 6. Kiểm tra lá số chưa được render
    const chartRendered = await page.$('.tuvi-chart-table, .laso-canvas, .cung-card');
    assert(chartRendered === null, 'Lá số không được tồn tại trong DOM trước khi người dùng gửi biểu mẫu');

    // 7. Thử nhấn nút Lập lá số khi chưa điền dữ liệu -> Phải hiển thị lỗi tiếng Việt inline
    await page.click('#btnSubmit');
    await page.waitForTimeout(300);

    const errorHoTen = await page.$eval('#error-hoTen', el => el.textContent.trim());
    assert(errorHoTen.length > 0, `Phải có lỗi inline cho Họ tên khi để trống: "${errorHoTen}"`);

    const errorGioiTinh = await page.$eval('#error-gioiTinh', el => el.textContent.trim());
    assert(errorGioiTinh.length > 0, `Phải có lỗi inline cho Giới tính khi chưa chọn: "${errorGioiTinh}"`);

    const errorGioSinh = await page.$eval('#error-gioSinh', el => el.textContent.trim());
    assert(errorGioSinh.length > 0, `Phải có lỗi inline cho Giờ sinh khi chưa chọn: "${errorGioSinh}"`);

    const errorNgaySinh = await page.$eval('#error-ngaySinh', el => el.textContent.trim());
    assert(errorNgaySinh.length > 0, `Phải có lỗi inline cho Ngày sinh khi chưa chọn: "${errorNgaySinh}"`);

    console.log('\n--- KẾT THÚC KIỂM TRA ---');
    if (!passed) {
      console.error('FAILED: Có ít nhất một điều kiện kiểm tra không đạt.');
      process.exit(1);
    } else {
      console.log('SUCCESS: Tất cả 17 điều kiện kiểm tra đều ĐẠT 100%!');
    }
  } catch (err) {
    console.error('Lỗi thực thi test:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTest();

