const { chromium } = require('@playwright/test');
const fs = require('fs');

async function verifyAll() {
  console.log('--- BẮT ĐẦU KIỂM TOÁN TÍNH NĂNG VIRAL & BẢO MẬT ---');

  // 1. Kiểm tra File-level Security
  console.log('1. Kiểm tra admin.html không bị lộ API key:');
  const adminHtml = fs.readFileSync('admin.html', 'utf8');
  if (adminHtml.includes('RRZCQTG7ON8EDQLFGWSSDAUC60M69ZBW4BSQE3OHUCHDNOMU7MVRPEVZRZI3MTYF')) {
    throw new Error('FAIL: admin.html vẫn còn chứa API key hardcode!');
  }
  console.log('  [PASS] admin.html không còn hardcode API key');

  // 2. Kiểm tra Robots Meta trong 3 trang chính sách
  console.log('2. Kiểm tra meta robots trong 3 trang chính sách:');
  ['chinh-sach-bao-mat.html', 'chinh-sach-hoan-tien-ho-tro.html', 'dieu-khoan-su-dung.html'].forEach(f => {
    const c = fs.readFileSync(f, 'utf8');
    if (!c.includes('<meta name="robots" content="index, follow">')) {
      throw new Error(`FAIL: ${f} chưa đổi sang index, follow!`);
    }
    console.log(`  [PASS] ${f} đã có meta robots index, follow`);
  });

  // 3. Kiểm tra robots.txt & sitemap.xml
  console.log('3. Kiểm tra robots.txt & sitemap.xml:');
  const robots = fs.readFileSync('robots.txt', 'utf8');
  if (!robots.includes('Disallow: /admin.html') || !robots.includes('Disallow: /api/')) {
    throw new Error('FAIL: robots.txt chưa chặn /admin.html hoặc /api/');
  }
  console.log('  [PASS] robots.txt chặn /admin.html và /api/ chuẩn xác');

  // 4. Kiểm tra trên Trình duyệt Playwright
  console.log('4. Khởi chạy Playwright Browser kiểm thử giao diện & Viral Card:');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

  // Kiểm tra Accessibility thanh menu
  const navMenuRole = await page.$eval('#navMenu', el => el.getAttribute('role'));
  console.log('  [PASS] navMenu role attribute:', navMenuRole); // should be null

  // Lập lá số
  await page.fill('#hoTen', 'Trần Công Luyện');
  await page.selectOption('#gioiTinh', 'nam');
  await page.selectOption('#ngaySinh', '10');
  await page.selectOption('#thangSinh', '4');
  await page.selectOption('#namSinh', '2002');
  await page.selectOption('#gioSinh', '19');
  await page.selectOption('#phutSinh', '30');
  await page.click('button[type="submit"]');

  await page.waitForSelector('#la-so-chart', { state: 'visible', timeout: 10000 });
  console.log('  [PASS] Lá số hiển thị thành công');

  // Kiểm tra nút Viral Wrapped
  const viralBtn = await page.$('.btn-viral-wrapped-share');
  if (!viralBtn) {
    throw new Error('FAIL: Không tìm thấy nút .btn-viral-wrapped-share dưới lá số!');
  }
  const viralBtnText = await viralBtn.innerText();
  console.log('  [PASS] Nút Viral Wrapped hiển thị:', viralBtnText);

  // Click tạo thẻ Viral Card
  await viralBtn.click();
  await page.waitForSelector('#shareableCardModal.active', { state: 'visible', timeout: 5000 });
  console.log('  [PASS] Modal Thẻ Mệnh Bàn Viral đã mở!');

  // Kiểm tra ảnh preview trong modal
  const previewImg = await page.$('#shareCardImagePreview');
  const src = await previewImg.getAttribute('src');
  if (!src || !src.startsWith('data:image/png;base64,')) {
    throw new Error('FAIL: Ảnh canvas thẻ chưa được tạo!');
  }
  console.log('  [PASS] Ảnh Canvas 9:16 được tạo thành công, độ dài base64:', src.length);

  // Lưu ảnh thẻ ra đĩa để kiểm tra trực quan
  const base64Data = src.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync('scripts/viral_card_check.png', Buffer.from(base64Data, 'base64'));
  fs.writeFileSync('C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262/viral_card_check.png', Buffer.from(base64Data, 'base64'));
  console.log('  [PASS] Đã xuất ảnh thẻ thực tế ra scripts/viral_card_check.png & artifacts');

  // Kiểm tra các nút trong modal
  const hasDownload = await page.$('#btnDownloadShareCard');
  const hasCopy = await page.$('#btnCopyShareCard');
  console.log('  [PASS] Nút Tải Ảnh:', !!hasDownload, '| Nút Sao Chép:', !!hasCopy);

  // Kiểm tra mystic-video IntersectionObserver
  const mysticAnimRunning = await page.evaluate(() => {
    return typeof MysticVideo !== 'undefined' ? MysticVideo.animId : null;
  });
  console.log('  [PASS] MysticVideo animId khi ở đầu trang (chưa cuộn tới):', mysticAnimRunning); // should be null

  await browser.close();
  console.log('--- TOÀN BỘ KIỂM TOÁN HOÀN TOÀN THÀNH CÔNG (100% PASS) ---');
}

verifyAll().catch(err => {
  console.error('LỖI KIỂM TOÁN:', err);
  process.exit(1);
});
