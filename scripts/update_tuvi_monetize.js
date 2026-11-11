const fs = require('fs');

let code = fs.readFileSync('js/tuvi-monetize.js', 'utf8');

// 1. Add isTripwireUnlocked in state
code = code.replace(
  "isVipUnlocked: false,",
  "isVipUnlocked: false,\n    isTripwireUnlocked: false,"
);

// 2. Load isTripwireUnlocked in init
code = code.replace(
  "this.isVipUnlocked = Boolean(localStorage.getItem('tvhh_vip_unlocked') === 'true');",
  "this.isVipUnlocked = Boolean(localStorage.getItem('tvhh_vip_unlocked') === 'true');\n      this.isTripwireUnlocked = Boolean(localStorage.getItem('tvhh_tripwire_unlocked') === 'true');"
);

// 3. Update packageId mapping in openVipModal
code = code.replace(
  "packageId: this.currentPackagePrice >= 1000000 ? 'vip_1500k' : (this.currentPackagePrice >= 100000 ? 'vip_199k' : 'vip_49k'),",
  "packageId: this.currentPackagePrice >= 1000000 ? 'vip_call' : (this.currentPackagePrice >= 100000 ? 'vip_149k' : (this.currentPackagePrice >= 40000 ? 'vip_49k' : 'vip_29k')),"
);

// 4. Add switchModalPackage and initCountdownTimer methods
const helperMethods = `
    /**
     * Chuyển đổi gói trực tiếp ngay trong Modal thanh toán
     */
    switchModalPackage: function (pkgName, price) {
      this.currentPackageName = pkgName;
      this.currentPackagePrice = price;

      // Cập nhật tab active
      document.querySelectorAll('.modal-pkg-btn').forEach(btn => {
        const btnPrice = parseInt(btn.getAttribute('data-price') || '0', 10);
        if (btnPrice === price) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      this.updateModalDisplay();

      // Cập nhật lại đơn hàng backend
      const token = localStorage.getItem('tvhh_auth_token');
      const currentUser = typeof TuViAuth !== 'undefined' ? TuViAuth.currentUser : null;
      fetch(this.getApiUrl('/api/orders/create'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': 'Bearer ' + token } : {})
        },
        body: JSON.stringify({
          orderCode: this.currentOrderId,
          packageId: this.currentPackagePrice >= 100000 ? 'vip_149k' : (this.currentPackagePrice >= 40000 ? 'vip_49k' : 'vip_29k'),
          packageName: this.currentPackageName,
          amount: this.currentPackagePrice,
          customerName: currentUser ? currentUser.fullName : (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo ? TuViChart._currentLaSo.hoTen : 'Đương Số VIP'),
          customerPhone: currentUser ? currentUser.emailOrPhone : ''
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.order) {
          this.currentOrderId = data.order.orderCode;
          this.vipAccessToken = data.order.vipAccessToken || '';
          this.updateModalDisplay();
        }
      })
      .catch(e => console.warn('Lỗi đổi gói modal:', e));
    },

    /**
     * Đồng hồ đếm ngược ưu đãi Cliffhanger 15 phút
     */
    initCountdownTimer: function () {
      const key = 'tvhh_cliffhanger_deadline';
      let deadline = sessionStorage.getItem(key);
      if (!deadline) {
        deadline = Date.now() + 15 * 60 * 1000;
        sessionStorage.setItem(key, deadline);
      } else {
        deadline = parseInt(deadline, 10);
        if (deadline < Date.now()) {
          deadline = Date.now() + 15 * 60 * 1000;
          sessionStorage.setItem(key, deadline);
        }
      }

      if (this._countdownTimerInterval) clearInterval(this._countdownTimerInterval);

      const updateClocks = () => {
        const remaining = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
        const mins = Math.floor(remaining / 60);
        const secs = remaining % 60;
        const timeStr = \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
        document.querySelectorAll('.cliffhanger-countdown-clock').forEach(el => {
          el.textContent = timeStr;
        });
        if (remaining <= 0) {
          sessionStorage.setItem(key, Date.now() + 15 * 60 * 1000);
        }
      };
      updateClocks();
      this._countdownTimerInterval = setInterval(updateClocks, 1000);
    },
`;

// Insert helperMethods right before updateModalDisplay
code = code.replace(
  "updateModalDisplay: function () {",
  helperMethods + "\n    updateModalDisplay: function () {"
);

// 5. Update createVipModalDOM with package switcher
const oldHeaderInModal = `            <div class="vip-header">
              <span class="vip-crown">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.735H5.81a1 1 0 0 1-.957-.735L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>
              </span>
              <h3 id="vipModalPackageTitle">MỞ KHÓA BÁO CÁO TỬ VI VIP 49.000đ</h3>
              <p class="vip-sub">Quét mã VietQR hoặc chuyển khoản theo thông tin STK dưới đây để mở khóa tự động toàn bộ 12 cung &amp; đại vận trọn đời</p>
            </div>

            <div class="vip-price-tag">
              <span class="old-price">199.000 đ</span>
              <span class="current-price" id="vipPriceDisplay">49.000 đ</span>
              <span class="discount-badge">TIẾT KIỆM 75%</span>
            </div>`;

// Check what's actually in createVipModalDOM
console.log('Finding old modal header...');
const modalHeaderIndex = code.indexOf('<div class="tuvi-vip-header">');
if (modalHeaderIndex !== -1) {
  const modalHeaderChunk = code.slice(modalHeaderIndex, modalHeaderIndex + 800);
  console.log('Found modalHeaderChunk');
}

// 6. Update onPaymentSuccess
code = code.replace(
  "this.isVipUnlocked = true;\n      localStorage.setItem('tvhh_vip_unlocked', 'true');",
  `if (this.currentPackagePrice < 40000) {
        this.isTripwireUnlocked = true;
        localStorage.setItem('tvhh_tripwire_unlocked', 'true');
      } else {
        this.isVipUnlocked = true;
        this.isTripwireUnlocked = true;
        localStorage.setItem('tvhh_vip_unlocked', 'true');
      }`
);

fs.writeFileSync('js/tuvi-monetize.js', code, 'utf8');
fs.writeFileSync('public/js/tuvi-monetize.js', code, 'utf8');
console.log('Step 1 of monetize update done!');

