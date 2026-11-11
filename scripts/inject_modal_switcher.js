const fs = require('fs');

let code = fs.readFileSync('js/tuvi-monetize.js', 'utf8');

const targetBeforeQr = `<div class="vip-qr-section">`;
const switcherHtml = `<!-- BỘ CHUYỂN GÓI NHANH 3 CẤP ĐỘ (CRO OPTIMIZATION) -->
            <div class="modal-package-switcher" style="display:flex; gap:8px; margin: 12px 0 16px; justify-content:center;">
              <button type="button" class="modal-pkg-btn" data-price="29000" onclick="TuViMonetize.switchModalPackage('Gói Mở Khóa Nhanh 3 Cung Trọng Tâm (Tài - Quan - Phối)', 29000)">
                <span class="pkg-btn-name">3 Cung Trọng Tâm</span>
                <span class="pkg-btn-price">29.000đ</span>
              </button>
              <button type="button" class="modal-pkg-btn active" data-price="49000" onclick="TuViMonetize.switchModalPackage('Báo Cáo VIP Toàn Thư 12 Cung &amp; Xuất PDF A4', 49000)">
                <span class="pkg-btn-tag" style="background:#A3281F; color:#fff; font-size:9px; padding:1px 5px; border-radius:3px; position:absolute; top:-8px; right:6px; font-weight:700;">92% CHỌN</span>
                <span class="pkg-btn-name">VIP 12 Cung + PDF</span>
                <span class="pkg-btn-price">49.000đ</span>
              </button>
              <button type="button" class="modal-pkg-btn" data-price="149000" onclick="TuViMonetize.switchModalPackage('Hồ Sơ Luận Giải Chuyên Sâu Cải Mệnh &amp; Điền Sản', 149000)">
                <span class="pkg-btn-name">Chuyên Sâu Điền Sản</span>
                <span class="pkg-btn-price">149.000đ</span>
              </button>
            </div>\n\n            <div class="vip-qr-section">`;

if (code.includes(targetBeforeQr)) {
  code = code.replace(targetBeforeQr, switcherHtml);
}

// In updateModalDisplay, also update old-price and discount badge
const oldPriceUpdate = `      const priceText = this.currentPackagePrice.toLocaleString('vi-VN') + ' đ';
      const priceEl = document.getElementById('vipPriceDisplay');
      if (priceEl) priceEl.textContent = priceText;

      const oldPriceEl = document.querySelector('#tuvi-vip-modal .old-price');
      const discountEl = document.querySelector('#tuvi-vip-modal .discount-badge');
      if (this.currentPackagePrice <= 30000) {
        if (oldPriceEl) oldPriceEl.textContent = '99.000 đ';
        if (discountEl) discountEl.textContent = 'TIẾT KIỆM 70%';
      } else if (this.currentPackagePrice <= 60000) {
        if (oldPriceEl) oldPriceEl.textContent = '199.000 đ';
        if (discountEl) discountEl.textContent = 'TIẾT KIỆM 75%';
      } else {
        if (oldPriceEl) oldPriceEl.textContent = '399.000 đ';
        if (discountEl) discountEl.textContent = 'TIẾT KIỆM 63%';
      }

      // Highlight active package button in modal
      document.querySelectorAll('.modal-pkg-btn').forEach(btn => {
        const p = parseInt(btn.getAttribute('data-price') || '0', 10);
        if (p === this.currentPackagePrice) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });`;

code = code.replace(
  `      const priceText = this.currentPackagePrice.toLocaleString('vi-VN') + ' đ';
      const priceEl = document.getElementById('vipPriceDisplay');
      if (priceEl) priceEl.textContent = priceText;`,
  oldPriceUpdate
);

fs.writeFileSync('js/tuvi-monetize.js', code, 'utf8');
fs.writeFileSync('public/js/tuvi-monetize.js', code, 'utf8');
console.log('Successfully injected package switcher into tuvi-monetize.js!');

