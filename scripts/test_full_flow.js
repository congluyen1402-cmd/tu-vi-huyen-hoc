const { chromium } = require('playwright');

async function testFullFlow() {
  console.log('=== TEST FULL USER FLOW & NAVIGATION ===');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

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
    // 1. Kiểm tra 3 trang chính sách
    for (const route of ['/chinh-sach-bao-mat', '/dieu-khoan-su-dung', '/chinh-sach-hoan-tien-ho-tro']) {
      const resp = await page.goto(`http://localhost:8080${route}`);
      assert(resp.status() === 200, `Trang ${route} phải phản hồi HTTP 200`);
      const h1Text = await page.innerText('h1');
      assert(h1Text.length > 0, `Trang ${route} phải có tiêu đề H1 hợp lệ: "${h1Text}"`);
    }

    // 2. Vào trang chủ
    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });

    // 3. Kiểm tra FAQ Accordion
    const faqItemCount = await page.$$eval('.faq-item', els => els.length);
    assert(faqItemCount === 8, `Phải có đủ 8 câu hỏi FAQ, thực tế: ${faqItemCount}`);

    // Bấm câu hỏi 1
    const ans1Before = await page.$eval('#faq-a1', el => el.hasAttribute('hidden'));
    assert(ans1Before === true, 'Câu trả lời 1 phải ẩn ban đầu');
    await page.click('#faq-q1');
    await page.waitForTimeout(200);
    const ans1After = await page.$eval('#faq-a1', el => !el.hasAttribute('hidden') && el.offsetParent !== null);
    assert(ans1After === true, 'Câu trả lời 1 phải hiển thị sau khi click');

    // 4. Kiểm tra nhóm bảng giá
    const reportCards = await page.$$eval('.pricing-grid:not(.consultation-pricing-grid) .pricing-card', els => els.length);
    assert(reportCards === 3, `Nhóm 1 Báo cáo PDF phải có 3 gói (Cơ bản, VIP, Luận sâu), thực tế: ${reportCards}`);

    const consultCards = await page.$$eval('.consultation-pricing-grid .pricing-card', els => els.length);
    assert(consultCards === 2, `Nhóm 2 Tư vấn trực tiếp phải có 2 gói (30m, 60m), thực tế: ${consultCards}`);

    // 5. Điền thông tin hợp lệ vào form
    await page.fill('#hoTen', 'Trần Công Luyện');
    await page.selectOption('#gioiTinh', 'nam');
    await page.selectOption('#gioSinh', '14');
    await page.selectOption('#phutSinh', '30');
    await page.selectOption('#thangSinh', '2');
    await page.selectOption('#namSinh', '1995');
    await page.selectOption('#ngaySinh', '14');

    // Submit form
    console.log('Đang gửi biểu mẫu với thông tin hợp lệ...');
    await page.click('#btnSubmit');

    // Chờ quá trình an sao hoàn tất (tối đa 6 giây)
    await page.waitForSelector('#ket-qua', { state: 'attached', timeout: 10000 });
    console.log('Lá số đã được chèn vào DOM thành công!');

    // 6. Kiểm tra Summary Bar đã hiển thị
    const summaryVisible = await page.$eval('#formSummaryBar', el => !el.hasAttribute('hidden') && el.style.display !== 'none');
    assert(summaryVisible, 'Thanh tóm tắt (#formSummaryBar) phải hiển thị sau khi tính toán');

    const summaryText = await page.$eval('#summaryText', el => el.textContent);
    assert(summaryText.includes('Trần Công Luyện'), `Tóm tắt phải chứa tên người dùng: "${summaryText}"`);
    assert(summaryText.includes('14/02/1995'), `Tóm tắt phải chứa ngày sinh: "${summaryText}"`);

    // 7. Kiểm tra Phong thủy đã cập nhật theo lá số thực tế
    const fengshuiTitle = await page.$eval('#fengshuiElementTitle', el => el.textContent);
    assert(fengshuiTitle.includes('Vật Phẩm Hộ Thân Tương Sinh'), `Tiêu đề phong thủy phải cập nhật mệnh: "${fengshuiTitle}"`);
    assert(!fengshuiTitle.includes('Lập lá số để xem'), 'Không còn ở trạng thái trung tính sau khi lập lá số');

    // 8. Kiểm tra liên kết chính sách ở footer
    const footerPrivacyLink = await page.$('footer a[href="/chinh-sach-bao-mat"]');
    assert(footerPrivacyLink !== null, 'Footer phải có liên kết tới /chinh-sach-bao-mat');

    const footerTermsLink = await page.$('footer a[href="/dieu-khoan-su-dung"]');
    assert(footerTermsLink !== null, 'Footer phải có liên kết tới /dieu-khoan-su-dung');

    const footerRefundLink = await page.$('footer a[href="/chinh-sach-hoan-tien-ho-tro"]');
    assert(footerRefundLink !== null, 'Footer phải có liên kết tới /chinh-sach-hoan-tien-ho-tro');

    console.log('\n--- KẾT THÚC TEST FULL FLOW ---');
    if (!passed) {
      console.error('FAILED: Có lỗi trong luồng kiểm tra.');
      process.exit(1);
    } else {
      console.log('SUCCESS: Toàn bộ luồng nghiệp vụ & trang phụ hoạt động hoàn hảo 100%!');
    }
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testFullFlow();
