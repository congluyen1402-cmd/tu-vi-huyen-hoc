/**
 * ============================================================================
 * XEM TỬ VI HUYỀN HỌC - HỆ THỐNG THƯƠNG MẠI HÓA & KIẾM TIỀN TỰ ĐỘNG
 * Gồm:
 *  1. Cổng thanh toán VietQR động mở khóa Báo Cáo VIP (49.000đ, 199.000đ, 1.500.000đ)
 *  2. Trình tạo file in Báo Cáo Tử Vi VIP A4 chuẩn hoàng gia (PDF lưu trữ)
 *  3. Khuyến nghị Vật Phẩm Phong Thủy tự động theo Ngũ Hành Bản Mệnh (Affiliate)
 *  4. Cổng tiếp nhận Đặt Lịch Tư Vấn 1-1 với Chuyên Gia Huyền Học
 *  5. Bảng điều khiển cấu hình Ngân Hàng dành riêng cho Chủ Web (Admin Quick Config)
 * ============================================================================
 */

(function (global) {
  'use strict';

  const Monetize = {
    // Cấu hình tài khoản nhận tiền chính thức (VietinBank - TRAN CONG LUYEN)
    config: {
      bankId: 'ICB', // ICB: VietinBank (Công Thương Việt Nam)
      accountNo: '108884822302',
      accountName: 'TRAN CONG LUYEN',
      bankBranch: 'CN Nam Sài Gòn - PGD Phú Mỹ Hưng',
      vipPrice: 49000,
      vipOriginalPrice: 199000,
      zaloPhone: ''
    },

    isVipUnlocked: false,
    isTripwireUnlocked: false,
    currentOrderId: '',
    vipAccessToken: '',
    vipOrderCode: '',
    currentPackageName: 'Báo Cáo VIP A4 Toàn Thư',
    currentPackagePrice: 49000,

    getApiUrl: function (path) {
      if (typeof window !== 'undefined') {
        if (window.location.protocol === 'file:') {
          return 'http://localhost:8080' + path;
        }
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          if (window.location.port && window.location.port !== '8080') {
            return 'http://' + window.location.hostname + ':8080' + path;
          }
        }
      }
      return path;
    },

    trackEvent: function (eventType, details) {
      try {
        let visitorId = localStorage.getItem('tvhh_visitor_id');
        if (!visitorId) {
          visitorId = 'vis_' + Math.random().toString(36).substring(2, 11);
          localStorage.setItem('tvhh_visitor_id', visitorId);
        }
        const currentUser = typeof TuViAuth !== 'undefined' ? TuViAuth.currentUser : null;
        let customerName = currentUser ? currentUser.fullName : '';
        if (!customerName && typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) {
          customerName = TuViChart._currentLaSo.hoTen;
        }
        if (!customerName) customerName = 'Khách vãng lai';

        fetch(this.getApiUrl('/api/analytics/track'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitorId,
            eventType,
            customerName,
            details: details || {}
          })
        }).catch(() => {});
      } catch (e) {}
    },

    init: function () {
      this.loadConfig();
      window.addEventListener('popstate', (e) => {
        const modal = document.getElementById('tuvi-vip-modal');
        if (modal && modal.classList.contains('active')) {
          TuViMonetize.closeVipModal(true);
        }
      });
      this.initBookingForm();
      this.checkVipStatus();
      this.initFloatingCta();

      // Trì hoãn ghi nhận sự kiện analytics để không cản trở LCP & First Paint
      if (typeof window !== 'undefined') {
        const sendPageView = () => this.trackEvent('page_view', { path: window.location.pathname });
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(sendPageView);
        } else {
          setTimeout(sendPageView, 2000);
        }
      }
      console.log('✦ Hệ thống Thương Mại Hóa Tử Vi Sẵn Sàng ✦');
    },

    loadConfig: function () {
      try {
        const saved = localStorage.getItem('tvhh_bank_config');
        if (saved) {
          const parsed = JSON.parse(saved);
          // Tự động nâng cấp nếu trước đó lưu số tài khoản mẫu cũ
          if (parsed.accountNo === '0988888888') {
            localStorage.removeItem('tvhh_bank_config');
            return;
          }
          this.config = Object.assign(this.config, parsed);
        }
      } catch (e) {}
    },

    saveConfig: function (newConfig) {
      this.config = Object.assign(this.config, newConfig);
      try {
        localStorage.setItem('tvhh_bank_config', JSON.stringify(this.config));
      } catch (e) {}
    },

    checkVipStatus: async function () {
      try {
        if (localStorage.getItem('tvhh_tripwire_unlocked') === 'true') {
          this.isTripwireUnlocked = true;
        }

        // Tự động mở khóa ngay nếu là thiết bị của chủ web vừa thanh toán đơn TV377099
        const savedOrder = localStorage.getItem('tvhh_vip_order_code');
        if (savedOrder === 'TV377099' || localStorage.getItem('tvhh_vip_unlocked') === 'true') {
          this.isVipUnlocked = true;
          this.vipOrderCode = savedOrder || 'TV377099';
          this.vipAccessToken = localStorage.getItem('tvhh_vip_token') || '9a7f34bc6102da88e14cf956102a399f';
          this.applyVipUI();
          return;
        }

        // 1. Kiểm tra Magic Link trên URL (?vip_token=... hoặc ?order=...)
        if (typeof window !== 'undefined' && window.location && window.location.search) {
          const urlParams = new URLSearchParams(window.location.search);
          const magicToken = (urlParams.get('vip_token') || urlParams.get('order') || '').trim();
          if (magicToken) {
            try {
              const res = await fetch(this.getApiUrl('/api/orders/verify-token?token=' + encodeURIComponent(magicToken)));
              if (res.ok) {
                const data = await res.json();
                if (data.success && data.isVip) {
                  this.isVipUnlocked = true;
                  this.vipAccessToken = data.order.vipAccessToken || magicToken;
                  this.vipOrderCode = data.order.orderCode;
                  localStorage.setItem('tvhh_vip_unlocked', 'true');
                  localStorage.setItem('tvhh_vip_token', this.vipAccessToken);
                  localStorage.setItem('tvhh_vip_order_code', this.vipOrderCode);
                  this.applyVipUI();
                  if (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) {
                    TuViChart.renderLuanGiai(TuViChart._currentLaSo);
                  }
                  return;
                }
              }
            } catch (err) {
              console.warn('Lỗi kiểm tra magic token URL:', err);
            }
          }
        }

        // 2. Kiểm tra Token VIP đã lưu trong localStorage (Guest Instant Checkout)
        const storedToken = localStorage.getItem('tvhh_vip_token');
        if (storedToken) {
          try {
            const res = await fetch(this.getApiUrl('/api/orders/verify-token?token=' + encodeURIComponent(storedToken)));
            if (res.ok) {
              const data = await res.json();
              if (data.success && data.isVip) {
                this.isVipUnlocked = true;
                this.vipAccessToken = storedToken;
                this.vipOrderCode = data.order.orderCode || localStorage.getItem('tvhh_vip_order_code') || '';
                this.applyVipUI();
                return;
              }
            }
          } catch (err) {
            console.warn('Lỗi kiểm tra stored VIP token:', err);
          }
        }

        // 3. Kiểm tra tài khoản thành viên đăng nhập truyền thống
        const authToken = localStorage.getItem('tvhh_auth_token');
        const userStr = localStorage.getItem('tvhh_user');
        if (authToken && userStr) {
          const user = JSON.parse(userStr);
          if (user && user.isVip) {
            this.isVipUnlocked = true;
            this.applyVipUI();
            return;
          }
        }

        // 4. Người dùng vãng lai hoặc chưa nâng cấp VIP -> Khóa đúng chuẩn
        this.isVipUnlocked = false;
        localStorage.removeItem('tvhh_vip_unlocked');

        // 5. Phục hồi và kích hoạt quét tự động nếu trước đó có đơn hàng đang chờ
        try {
          const pendingOrder = sessionStorage.getItem('tvhh_pending_order');
          if (pendingOrder && !this.isVipUnlocked) {
            this.currentOrderId = pendingOrder;
            this.startOrderPolling(pendingOrder);
          }
        } catch (e) {}

        // 6. Lắng nghe sự kiện khách quay lại tab (từ app ngân hàng hoặc màn hình khóa)
        if (typeof document !== 'undefined') {
          const checkOnActive = () => {
            const code = this.currentOrderId || (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('tvhh_pending_order') : null);
            if (code && !this.isVipUnlocked) {
              const price = this.currentPackagePrice || (typeof sessionStorage !== 'undefined' ? Number(sessionStorage.getItem('tvhh_pending_price')) : 29000) || 29000;
              fetch(this.getApiUrl(`/api/orders/status/${code}?amount=${price}`))
                .then(r => r.json())
                .then(data => {
                  if (data && (data.isPaid || data.paid || data.status === 'PAID')) {
                    this.stopOrderPolling();
                    this.onPaymentSuccess(data);
                  }
                })
                .catch(() => {});
            }
          };

          document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') checkOnActive();
          });
          window.addEventListener('focus', checkOnActive);
        }
      } catch (e) {
        this.isVipUnlocked = false;
      }
    },

    /**
     * Mở Modal thanh toán VietQR cho từng gói dịch vụ
     */
    openVipModal: function (pkgName, price) {
      this.currentPackageName = pkgName || 'Báo Cáo VIP A4 Toàn Thư (Mở Khóa 12 Cung)';
      try {
        if (window.history && window.history.pushState) {
          window.history.pushState({ tuviVipModal: true }, '');
        }
      } catch (e) {}
      this.currentPackagePrice = (price && price > 0) ? price : this.config.vipPrice;

      this.currentOrderId = 'TV' + Math.floor(100000 + Math.random() * 900000);
      try {
        sessionStorage.setItem('tvhh_pending_order', this.currentOrderId);
        sessionStorage.setItem('tvhh_pending_price', String(this.currentPackagePrice));
      } catch (e) {}

      let modal = document.getElementById('tuvi-vip-modal');
      if (!modal) {
        this.createVipModalDOM();
        modal = document.getElementById('tuvi-vip-modal');
      }
      if (!modal) return;

      this.updateModalDisplay();

      // Bắt đầu quét tự động ngay lập tức (Zero-Click Auto Verification)
      this.startOrderPolling(this.currentOrderId);

      // Ghi nhận hành vi mở modal VIP
      this.trackEvent('open_vip_modal', {
        orderCode: this.currentOrderId,
        packageName: this.currentPackageName,
        amount: this.currentPackagePrice
      });

      // Gọi API Backend tạo đơn hàng chính thức
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
          packageId: this.currentPackagePrice >= 1000000 ? 'vip_call' : (this.currentPackagePrice >= 100000 ? 'vip_149k' : (this.currentPackagePrice >= 40000 ? 'vip_49k' : 'vip_29k')),
          packageName: this.currentPackageName,
          amount: this.currentPackagePrice,
          customerName: currentUser ? currentUser.fullName : (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo ? TuViChart._currentLaSo.hoTen : 'Đương Số VIP'),
          customerPhone: currentUser ? currentUser.emailOrPhone : ''
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          const finalCode = (data.order && data.order.orderCode) || data.orderCode || this.currentOrderId;
          this.currentOrderId = finalCode;
          this.vipAccessToken = (data.order && data.order.vipAccessToken) || data.vipAccessToken || '';
          try {
            sessionStorage.setItem('tvhh_pending_order', this.currentOrderId);
          } catch (e) {}
          this.updateModalDisplay();
          this.startOrderPolling(this.currentOrderId);
        }
      })
      .catch(err => {
        console.warn('Lưu ý: Không kết nối được API backend, sử dụng mã cục bộ:', err);
      });

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    
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
        if (data && data.success) {
          const finalCode = (data.order && data.order.orderCode) || data.orderCode || this.currentOrderId;
          this.currentOrderId = finalCode;
          this.vipAccessToken = (data.order && data.order.vipAccessToken) || data.vipAccessToken || '';
          this.updateModalDisplay();
          this.startOrderPolling(this.currentOrderId);
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
        const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

    updateModalDisplay: function () {
      const titleEl = document.getElementById('vipModalPackageTitle');
      if (titleEl) titleEl.textContent = this.currentPackageName;

      const orderCodeEl = document.getElementById('vipOrderCode');
      if (orderCodeEl) orderCodeEl.textContent = this.currentOrderId;

      // Cú pháp chuẩn SePay VietinBank: Bắt buộc tiền tố SEVQR để kích hoạt Open Banking API
      const orderMemo = `SEVQR ${this.currentOrderId}`;
      const memoEl = document.getElementById('vipMemoText');
      if (memoEl) memoEl.textContent = orderMemo;

      const priceText = this.currentPackagePrice.toLocaleString('vi-VN') + ' đ';
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
      });

      const transferAmountEl = document.getElementById('vipTransferAmount');
      if (transferAmountEl) transferAmountEl.textContent = priceText;

      const bankNameEl = document.getElementById('vipBankName');
      if (bankNameEl) {
        const bankNames = {
          'ICB': 'VietinBank (Ngân Hàng Công Thương)',
          'VCB': 'Vietcombank',
          'MB': 'MB Bank (Quân Đội)',
          'TCB': 'Techcombank',
          'BIDV': 'BIDV',
          'ACB': 'ACB',
          'VPB': 'VPBank'
        };
        const branchSuffix = this.config.bankBranch ? `<br><small style="font-size:0.78rem; opacity:0.8; font-weight:normal;">Chi nhánh: ${this.config.bankBranch}</small>` : '';
        bankNameEl.innerHTML = (bankNames[this.config.bankId] || this.config.bankId) + branchSuffix;
      }

      const accountNoEl = document.getElementById('vipAccountNo');
      if (accountNoEl) accountNoEl.textContent = this.config.accountNo;

      const accountNameEl = document.getElementById('vipAccountName');
      if (accountNameEl) accountNameEl.textContent = this.config.accountName;

      // Sinh URL mã VietQR chuẩn SePay NAPAS 24/7 cho VietinBank
      const qrImg = document.getElementById('vipQrImage');
      if (qrImg) {
        const memo = encodeURIComponent(orderMemo);
        const accName = encodeURIComponent(this.config.accountName);
        qrImg.src = `https://qr.sepay.vn/img?acc=${this.config.accountNo}&bank=VietinBank&amount=${this.currentPackagePrice}&des=${memo}&template=compact`;
        qrImg.onerror = () => {
          qrImg.src = `https://img.vietqr.io/image/${this.config.bankId}-${this.config.accountNo}-compact2.png?amount=${this.currentPackagePrice}&addInfo=${memo}&accountName=${accName}`;
        };
      }
    },

    startOrderPolling: function (orderCode) {
      this.stopOrderPolling();
      const code = orderCode || this.currentOrderId || (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('tvhh_pending_order') : null);
      if (!code) return;

      const checkNow = async () => {
        try {
          const price = this.currentPackagePrice || (typeof sessionStorage !== 'undefined' ? Number(sessionStorage.getItem('tvhh_pending_price')) : 29000) || 29000;
          const res = await fetch(this.getApiUrl(`/api/orders/status/${code}?amount=${price}`));
          if (res.ok) {
            const data = await res.json();
            if (data.isPaid || data.paid || data.status === "PAID") {
              this.stopOrderPolling();
              this.onPaymentSuccess(data);
            }
          }
        } catch (e) {}
      };

      // Quét ngay lập tức 1 lần không chờ độ trễ
      checkNow();

      // Quét tự động định kỳ 1.8 giây siêu tốc
      this._pollTimer = setInterval(checkNow, 1800);
    },

    stopOrderPolling: function () {
      if (this._pollTimer) {
        clearInterval(this._pollTimer);
        this._pollTimer = null;
      }
    },

    closeVipModal: function (fromPopstate) {
      const modal = document.getElementById('tuvi-vip-modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (!fromPopstate && window.history && window.history.state && window.history.state.tuviVipModal) {
        try { window.history.back(); } catch (e) {}
      }

      // NẾU CHƯA MỞ KHÓA VIP: KHÔNG TẮT HẲN POLLING!
      // Vẫn duy trì background watcher mỗi 3.5s để khi khách chuyển khoản xong ở app ngân hàng
      // hoặc đóng modal quay lại lá số thì hệ thống vẫn TỰ ĐỘNG BẬT MÀN HÌNH THÀNH CÔNG!
      if (!this.isVipUnlocked && this.currentOrderId) {
        if (this._pollTimer) clearInterval(this._pollTimer);
        this._pollTimer = setInterval(async () => {
          try {
            const res = await fetch(this.getApiUrl(`/api/orders/status/${this.currentOrderId}?amount=${this.currentPackagePrice}`));
            if (res.ok) {
              const data = await res.json();
              if (data.isPaid || data.paid || data.status === "PAID") {
                this.stopOrderPolling();
                this.onPaymentSuccess(data);
              }
            }
          } catch (e) {}
        }, 3500);
      } else {
        this.stopOrderPolling();
      }
    },

    checkPaymentNow: async function () {
      const code = this.currentOrderId || (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('tvhh_pending_order') : null);
      if (!code) return;
      const btn = document.querySelector('.btn-check-manual-payment');
      if (btn) btn.innerHTML = '<span>⏳ Đang kiểm tra đối soát ngân hàng...</span>';
      try {
        const price = this.currentPackagePrice || 29000;
        const res = await fetch(this.getApiUrl(`/api/orders/status/${code}?amount=${price}&manual=1`));
        if (res.ok) {
          const data = await res.json();
          if (data.isPaid || data.paid || data.status === 'PAID') {
            this.stopOrderPolling();
            this.onPaymentSuccess(data);
            return;
          }
        }
        if (btn) btn.innerHTML = '<span>🔄 Đang chờ ngân hàng gửi thông báo (vui lòng thử lại sau 5s)...</span>';
        setTimeout(() => {
          if (btn) btn.innerHTML = '<span>⚡ Đã chuyển khoản xong? Bấm vào đây để mở khóa ngay</span>';
        }, 4000);
      } catch (e) {
        if (btn) btn.innerHTML = '<span>⚡ Đã chuyển khoản xong? Bấm vào đây để mở khóa ngay</span>';
      }
    },

    openSampleReportGallery: function () {
      const modal = document.getElementById('sampleReportGalleryModal');
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    },

    closeSampleReportGallery: function () {
      const modal = document.getElementById('sampleReportGalleryModal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    },

    /**
     * Kiểm tra trạng thái thanh toán (CHỐNG GIAN LẬN: Chỉ mở khóa khi thực sự có tiền vào tài khoản)
     */
    confirmPayment: async function () {
      try {
        const res = await fetch(this.getApiUrl('/api/orders/check-payment'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderCode: this.currentOrderId, amount: this.currentPackagePrice })
        });
        const data = await res.json();
        if (data.isPaid || data.paid || data.status === 'PAID') {
          this.onPaymentSuccess(data);
        }
      } catch (err) {}
    },

    onPaymentSuccess: function (data) {
      this.stopOrderPolling();
      const isTripwirePkg = (this.currentPackagePrice <= 35000);
      if (isTripwirePkg) {
        this.isTripwireUnlocked = true;
        localStorage.setItem('tvhh_tripwire_unlocked', 'true');
      } else {
        this.isVipUnlocked = true;
        localStorage.setItem('tvhh_vip_unlocked', 'true');
      }

      const orderCode = (data && (data.orderCode || (data.order && data.order.orderCode))) || this.currentOrderId;
      const vipToken = (data && (data.vipToken || data.vipAccessToken || (data.order && data.order.vipAccessToken))) || 'vip_' + Date.now();
      localStorage.setItem('tvhh_vip_order_code', orderCode);
      localStorage.setItem('tvhh_vip_token', vipToken);
      try {
        sessionStorage.removeItem('tvhh_pending_order');
      } catch (e) {}

      // Mở khóa UI ở trang phía sau
      this.applyVipUI();
      if (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) {
        TuViChart.renderLuanGiai(TuViChart._currentLaSo);
      }
      if (typeof TuViNumerology !== 'undefined' && TuViNumerology._lastParams) {
        TuViNumerology.renderResult(TuViNumerology._lastParams.fullName, TuViNumerology._lastParams.birthDate);
      }

      // HIỆN MÀN HÌNH "XÁC NHẬN THANH TOÁN THÀNH CÔNG" TRONG MODAL (TỰ ĐỘNG BẬT NẾU ĐANG ĐÓNG)
      let modal = document.getElementById('tuvi-vip-modal');
      if (!modal) {
        this.createVipModalDOM();
        modal = document.getElementById('tuvi-vip-modal');
      }
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        const card = modal.querySelector('.tuvi-vip-card');
        if (card) {
          const displayAmount = (data && (data.amount || (data.order && data.order.amount))) || this.currentPackagePrice || 29000;
          card.innerHTML = `
            <button class="tuvi-vip-close" type="button" aria-label="Đóng" onclick="TuViMonetize.closeVipModal()">&times;</button>
            <div class="vip-success-container">
              <div class="vip-success-icon-badge">
                <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2 class="vip-success-heading">XÁC NHẬN THANH TOÁN THÀNH CÔNG!</h2>
              <p class="vip-success-message">
                Hệ thống đã nhận đủ <strong>${Number(displayAmount).toLocaleString('vi-VN')} đ</strong> cho mã đơn <strong>#${orderCode}</strong>.<br>
                Toàn bộ luận giải VIP và tính năng xuất PDF A4 của bạn đã được mở khóa tự động!
              </p>
              <div class="vip-success-meta">
                <span>Mã đơn: <strong>#${orderCode}</strong></span>
                <span>•</span>
                <span>Thời gian: <strong>${new Date().toLocaleTimeString('vi-VN')}</strong></span>
              </div>
              <button type="button" class="btn-seal btn-success-dismiss" onclick="TuViMonetize.closeVipModal();">
                ✨ Xem Ngay Bản Luận Giải Đầy Đủ
              </button>
              <p class="vip-auto-close-countdown">Cửa sổ sẽ tự động đóng sau <strong id="vipSuccessCountdown">3</strong> giây...</p>
            </div>
          `;

          // Rung nhẹ haptic trên điện thoại di động
          try {
            if (navigator && navigator.vibrate) navigator.vibrate([100, 50, 150]);
          } catch (e) {}

          // Âm thanh chúc mừng thanh toán thành công (Web Audio API)
          try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
              const ctx = new AudioCtx();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
              osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12); // E5
              osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.24); // G5
              osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.36); // C6
              gain.gain.setValueAtTime(0.18, ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
              osc.start();
              osc.stop(ctx.currentTime + 0.8);
            }
          } catch (e) {}

          // Đếm ngược 3 giây tự động đóng modal
          let secondsLeft = 3;
          if (this._autoCloseTimer) clearInterval(this._autoCloseTimer);
          this._autoCloseTimer = setInterval(() => {
            secondsLeft -= 1;
            const cdEl = document.getElementById('vipSuccessCountdown');
            if (cdEl) cdEl.textContent = secondsLeft;
            if (secondsLeft <= 0) {
              clearInterval(this._autoCloseTimer);
              this._autoCloseTimer = null;
              this.closeVipModal();
            }
          }, 1000);
        }
      } else {
        this.closeVipModal();
      }

      if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
        TuViApp.showToast('🎉 Thanh toán thành công! Toàn bộ 12 cung & PDF đã được mở khóa.', 'success');
      }
    },

    applyVipUI: function () {
      const vipBtns = document.querySelectorAll('.btn-action-vip');
      vipBtns.forEach(b => {
        b.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Xuất File PDF VIP (Đã Kích Hoạt)';
        b.classList.add('unlocked');
      });

      // Mở khóa toàn bộ nhãn VIP
      document.body.classList.add('vip-activated');
      const floatBtn = document.getElementById('floatingVipCta');
      if (floatBtn) {
        floatBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>Xuất Báo Cáo VIP A4</span>';
      }

      this.renderVipUnlockedBanner();
    },

    renderVipUnlockedBanner: function () {
      if (!this.isVipUnlocked) return;
      const resultWrap = document.querySelector('.la-so-outer-wrap');
      const chartEl = document.getElementById('la-so-chart');
      if (!resultWrap || !chartEl) return;

      let banner = document.getElementById('vipUnlockedBanner');
      if (!banner) {
        banner = document.createElement('div');
        banner.id = 'vipUnlockedBanner';
        banner.className = 'vip-unlocked-banner';
        resultWrap.insertBefore(banner, chartEl);
      }

      const orderDisplay = this.vipOrderCode || localStorage.getItem('tvhh_vip_order_code') || 'VIP';

      banner.innerHTML = `
        <div class="vip-banner-inner">
          <div class="vip-banner-headline">
            <div class="vip-banner-crown">👑</div>
            <div class="vip-banner-text-group">
              <h3>QUYỀN LỢI VIP ĐÃ KÍCH HOẠT · TRỌN BỘ 12 CUNG &amp; ĐẠI HẠN</h3>
              <p>Mã đơn hàng: <strong style="color:var(--gold-light);">${orderDisplay}</strong> — Bạn đang xem phiên bản VIP đầy đủ không giới hạn.</p>
            </div>
          </div>
          <div class="vip-banner-actions-row">
            <button class="btn-banner-action btn-banner-pdf" type="button" onclick="TuViMonetize.printVipReport()">
              🖨️ Xuất File PDF VIP A4
            </button>
            <button class="btn-banner-action btn-banner-magic" type="button" onclick="TuViMonetize.copyMagicLink()">
              🔗 Sao Chép Link Xem Lại (Magic Link)
            </button>
            <button class="btn-banner-action btn-banner-claim" type="button" onclick="TuViMonetize.openClaimAccountModal()">
              🛡️ Tạo Mật Khẩu Bảo Vệ (Tùy Chọn)
            </button>
          </div>
        </div>
      `;

      if (typeof window !== 'undefined' && window.lucide) {
        setTimeout(() => window.lucide.createIcons(), 50);
      }
    },

    copyMagicLink: function () {
      const token = this.vipAccessToken || localStorage.getItem('tvhh_vip_token') || this.vipOrderCode || localStorage.getItem('tvhh_vip_order_code') || 'TV';
      const fullUrl = window.location.origin + window.location.pathname + '?vip_token=' + encodeURIComponent(token);

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullUrl).then(() => {
          if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
            TuViApp.showToast('✅ Đã sao chép link VIP vào bộ nhớ tạm! Bạn có thể lưu vào Zalo hoặc ghi chú để xem lại trên bất kỳ thiết bị nào.', 'success');
          } else {
            alert('Đã sao chép Link VIP:\n' + fullUrl);
          }
        }).catch(() => {
          prompt('Link xem lại trọn đời của bạn (hãy sao chép và lưu lại):', fullUrl);
        });
      } else {
        prompt('Link xem lại trọn đời của bạn (hãy sao chép và lưu lại):', fullUrl);
      }
    },

    /**
     * Xuất Báo Cáo Tử Vi VIP A4 Hoàng Gia
     */
    printVipReport: function () {
      // Mở bung tất cả accordion luận giải để khi in file PDF có đầy đủ nội dung
      const items = document.querySelectorAll('.accordion-item');
      items.forEach(it => it.classList.add('open'));

      const chartSection = document.getElementById('ket-qua');
      if (chartSection) chartSection.style.display = 'block';

      // Kích hoạt hộp thoại in / lưu PDF của trình duyệt
      window.print();
    },

    /**
     * Cuộn đến mục Vật Phẩm Phong Thủy
     */
    scrollToFengShui: function () {
      const el = document.getElementById('vat-pham-phong-thuy');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },

    /**
     * Cuộn đến mục Bảng Giá Dịch Vụ
     */
    scrollToPricing: function () {
      const el = document.getElementById('bang-gia-dich-vu');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },

    /**
     * Cuộn đến mục Đặt Lịch Tư Vấn
     */
    scrollToBooking: function () {
      const el = document.getElementById('dat-lich-tu-van');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },

    /**
     * Khuyến nghị Vật Phẩm Phong Thủy theo Ngũ Hành Bản Mệnh (Affiliate Monetization)
     */
    renderFengShuiItems: function (laSo) {
      const container = document.getElementById('fengshuiItemsGrid');
      if (!container || !laSo) return;

      const napAm = laSo.napAm || 'Dương Liễu Mộc';
      let element = 'Mộc';
      if (napAm.includes('Kim')) element = 'Kim';
      else if (napAm.includes('Mộc')) element = 'Mộc';
      else if (napAm.includes('Thủy')) element = 'Thủy';
      else if (napAm.includes('Hỏa')) element = 'Hỏa';
      else if (napAm.includes('Thổ')) element = 'Thổ';

      const elementTitleEl = document.getElementById('fengshuiElementTitle');
      if (elementTitleEl) {
        elementTitleEl.innerHTML = `Vật Phẩm Hộ Thân Tương Sinh Cho Đương Số Mệnh <strong>${laSo.napAm} (Hành ${element})</strong>`;
      }

      const ITEMS_BY_ELEMENT = {
        'Mộc': [
          {
            name: 'Vòng Trầm Hương Tự Nhiên 108 Hạt Vô Ưu',
            tag: 'Mộc Sinh Vượng · Trừ Tà Khí',
            price: '890.000 đ',
            oldPrice: '1.450.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/></svg>',
            desc: 'Gỗ Trầm già tự nhiên mang năng lượng thuần dương của trời đất, dưỡng khí an thần, giúp mệnh Mộc hanh thông tài vận.',
            link: 'https://shopee.vn/search?keyword=vong+tram+huong+108+hat'
          },
          {
            name: 'Vòng Tay Thạch Anh Đen Tự Nhiên (Hắc Diệu Thạch)',
            tag: 'Thủy Sinh Mộc · Đại Cát Tương Sinh',
            price: '499.000 đ',
            oldPrice: '750.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
            desc: 'Đá Thủy tương sinh trực tiếp cho Mộc bản mệnh, hộ thân trừ tiểu nhân, mang lại nguồn năng lượng kiên định dũng cảm.',
            link: 'https://shopee.vn/search?keyword=vong+tay+thach+anh+den'
          },
          {
            name: 'Mặt Dây Bát Quái Cửu Cung Bằng Bạc Thái',
            tag: 'Bát Quái Hộ Mệnh · Hóa Giải Sát Tinh',
            price: '650.000 đ',
            oldPrice: '980.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><circle cx="12" cy="12" r="10"/><path d="M12 2a5 5 0 0 0 0 10 5 5 0 0 1 0 10"/></svg>',
            desc: 'Khắc họa trận đồ Hậu Thiên Bát Quái xoay chuyển càn khôn, trấn trạch trừ ám khí cho người mang Thái Dương, Thất Sát.',
            link: 'https://shopee.vn/search?keyword=mat+day+bat+quai+bac+thai'
          },
          {
            name: 'Chuông Xoay Tây Tạng Full Moon Tần Số 432Hz',
            tag: 'Thanh Tẩy Năng Lượng · An Định Tâm Trí',
            price: '1.250.000 đ',
            oldPrice: '1.800.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
            desc: 'Âm thanh sóng rung 432Hz xua tan năng lượng tiêu cực, tăng cường trực giác và phúc trạch tinh thần.',
            link: 'https://shopee.vn/search?keyword=chuong+xoay+tay+tang+singing+bowl'
          }
        ],
        'Kim': [
          {
            name: 'Vòng Thạch Anh Vàng Hoàng Gia (Citrine)',
            tag: 'Thổ Sinh Kim · Chiêu Tài Hút Lộc',
            price: '680.000 đ',
            oldPrice: '1.100.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>',
            desc: 'Đá của thương nhân, kích hoạt năng lượng tài chính và sự quyết đoán cho người mệnh Kim.',
            link: 'https://shopee.vn/search?keyword=vong+thach+anh+vang+citrine'
          },
          {
            name: 'Vòng Đá Mắt Hổ Vàng Nâu VIP',
            tag: 'Dũng Khí Quyền Uy · Bền Bỉ Cơ Đồ',
            price: '399.000 đ',
            oldPrice: '600.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
            desc: 'Tăng cường sự tự tin và dũng khí của bậc thủ lĩnh.',
            link: 'https://shopee.vn/search?keyword=vong+da+mat+ho+vang+nau'
          },
          {
            name: 'Hồ Lô Phong Thủy Mạ Vàng Kim 24K',
            tag: 'Thu Hút Sinh Khí · Trừ Bệnh Tật',
            price: '550.000 đ',
            oldPrice: '850.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><circle cx="12" cy="12" r="8"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M20 12h2"/><path d="M2 12h2"/></svg>',
            desc: 'Bảo bối phong thủy bảo vệ sức khỏe và tích lũy tiền của.',
            link: 'https://shopee.vn/search?keyword=ho+lo+phong+thuy+ma+vang'
          },
          {
            name: 'Mặt Dây Chuyền Tỳ Hưu Thạch Anh Trắng',
            tag: 'Kim Đồng Bản Vị · Bảo Hộ Toàn Diện',
            price: '520.000 đ',
            oldPrice: '800.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>',
            desc: 'Thanh lọc từ trường, giúp tâm trí hanh thông sáng suốt.',
            link: 'https://shopee.vn/search?keyword=ty+huu+thach+anh+trang'
          }
        ],
        'Thủy': [
          {
            name: 'Vòng Đá Thạch Anh Khói & Đen Hoàng Gia',
            tag: 'Bản Mệnh Đồng Khí · Tụ Tài Khí',
            price: '480.000 đ',
            oldPrice: '750.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>',
            desc: 'Củng cố sức mạnh dòng chảy tài chính cho người mệnh Thủy.',
            link: 'https://shopee.vn/search?keyword=vong+thach+anh+khoi+den'
          },
          {
            name: 'Vòng Đá Lam Ngọc Aquamarine Đại Dương',
            tag: 'Bình An May Mắn · Thuận Buồm Xuôi Gió',
            price: '850.000 đ',
            oldPrice: '1.300.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>',
            desc: 'Viên đá của biển cả, tăng cường tài giao tiếp ngoại giao.',
            link: 'https://shopee.vn/search?keyword=vong+aquamarine'
          },
          {
            name: 'Tỳ Hưu Hắc Diệu Thạch Chiêu Tài',
            tag: 'Đệ Nhất Hút Lộc · Giữ Kho Tiền',
            price: '590.000 đ',
            oldPrice: '900.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
            desc: 'Giữ chặt tài lộc, ngăn ngừa hao tài tốn của.',
            link: 'https://shopee.vn/search?keyword=ty+huu+hac+dieu+thach'
          },
          {
            name: 'Trầm Hương Bọc Bạc Ý May Mắn',
            tag: 'Kim Thủy Tương Sinh · Phúc Thọ Song Toàn',
            price: '920.000 đ',
            oldPrice: '1.400.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><circle cx="12" cy="12" r="10"/><path d="M12 6v12"/></svg>',
            desc: 'Kim sinh Thủy, trợ lực công danh sự nghiệp bền vững.',
            link: 'https://shopee.vn/search?keyword=tram+huong+boc+bac'
          }
        ],
        'Hỏa': [
          {
            name: 'Vòng Thạch Anh Tóc Xanh Tự Nhiên',
            tag: 'Mộc Sinh Hỏa · Phát Quang Đắc Lộc',
            price: '790.000 đ',
            oldPrice: '1.200.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
            desc: 'Năng lượng Mộc tương sinh dồi dào tiếp thêm sức mạnh cho ngọn lửa nhiệt huyết của mệnh Hỏa.',
            link: 'https://shopee.vn/search?keyword=thach+anh+toc+xanh'
          },
          {
            name: 'Vòng Chu Sa Đỏ Trừ Tà Cầu Bình An',
            tag: 'Thuần Dương Khí · Xua Tan Tà Khí',
            price: '450.000 đ',
            oldPrice: '680.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><circle cx="12" cy="12" r="9"/></svg>',
            desc: 'Sắc đỏ may mắn hộ thân trừ vận rủi trong các năm hạn.',
            link: 'https://shopee.vn/search?keyword=vong+chu+sa+do'
          },
          {
            name: 'Đèn Đá Muối Tự Nhiên Himalaya',
            tag: 'Ấm Áp Gia Đạo · Tụ Vượng Khí',
            price: '380.000 đ',
            oldPrice: '550.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
            desc: 'Cân bằng ion âm, thanh lọc không gian làm việc và phòng ngủ.',
            link: 'https://shopee.vn/search?keyword=den+da+muoi+himalaya'
          },
          {
            name: 'Mặt Dây Chuyền Ngọc Bích Nephrite Đỏ',
            tag: 'Cao Quý Hoàng Gia · Danh Vọng Vinh Hiển',
            price: '950.000 đ',
            oldPrice: '1.500.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><circle cx="12" cy="12" r="10"/><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
            desc: 'Gia tăng uy quyền và sức hút trước công chúng.',
            link: 'https://shopee.vn/search?keyword=mat+day+chuyen+ngoc+bich+do'
          }
        ],
        'Thổ': [
          {
            name: 'Vòng Đá Mắt Hổ Đỏ Tự Nhiên',
            tag: 'Hỏa Sinh Thổ · Vững Vàng Điền Sản',
            price: '420.000 đ',
            oldPrice: '650.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>',
            desc: 'Tăng cường sự kiên định, giúp mệnh Thổ tích lũy đất đai bền chắc.',
            link: 'https://shopee.vn/search?keyword=vong+mat+ho+do'
          },
          {
            name: 'Vòng Thạch Anh Tím Hoàng Gia (Amethyst)',
            tag: 'Khai Sáng Trí Tuệ · Quý Nhân Phù Trợ',
            price: '680.000 đ',
            oldPrice: '1.050.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><polygon points="6 2 18 2 22 8 12 22 2 8 6 2"/></svg>',
            desc: 'Đá của trực giác tâm linh, an thần dưỡng khí giấc ngủ ngon.',
            link: 'https://shopee.vn/search?keyword=vong+thach+anh+tim+amethyst'
          },
          {
            name: 'Thiềm Thừ (Cóc 3 Chân) Ngọc Hoàng Long',
            tag: 'Chiêu Tài Giữ Của · Phúc Lộc Đầy Nhà',
            price: '750.000 đ',
            oldPrice: '1.150.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/></svg>',
            desc: 'Đặt trên bàn làm việc giúp tiền tài không ngừng sinh sôi.',
            link: 'https://shopee.vn/search?keyword=thiem+thu+ngoc+hoang+long'
          },
          {
            name: 'Vòng Hổ Phách Mật Lạp Tự Nhiên',
            tag: 'Trầm Tích Thiên Niên · Dưỡng Khí Trường Thọ',
            price: '1.100.000 đ',
            oldPrice: '1.750.000 đ',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/></svg>',
            desc: 'Tinh hoa nhựa cây hóa thạch hàng triệu năm mang lại đại thọ an khang.',
            link: 'https://shopee.vn/search?keyword=vong+ho+phach+mat+lap'
          }
        ]
      };

      const items = ITEMS_BY_ELEMENT[element] || ITEMS_BY_ELEMENT['Mộc'];
      let html = '';

      const elementClass = {
        'Kim': 'elem-kim',
        'Mộc': 'elem-moc',
        'Thủy': 'elem-thuy',
        'Hỏa': 'elem-hoa',
        'Thổ': 'elem-tho'
      }[element] || 'elem-moc';

      items.forEach(item => {
        html += `
          <div class="fengshui-item-card glass-card">
            <div class="fengshui-icon-wrap">${item.icon}</div>
            <div class="fengshui-element-tag ${elementClass}">${item.tag}</div>
            <h4 class="fengshui-name">${item.name}</h4>
            <p class="fengshui-desc">${item.desc}</p>
            <div class="fengshui-price-row">
              <span class="fengshui-price text-seal-red">${item.price}</span>
              <span class="fengshui-old-price">${item.oldPrice}</span>
            </div>
            <a href="${item.link}" target="_blank" rel="noopener" class="btn-seal btn-fengshui-buy">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline; vertical-align:-2px; margin-right:4px;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Thỉnh Vật Phẩm
            </a>
          </div>
        `;
      });

      const supportText = (typeof window.SITE_CONFIG !== 'undefined' && window.SITE_CONFIG.returnsSupportText)
        ? window.SITE_CONFIG.returnsSupportText
        : 'Hỗ trợ kiểm tra hàng khi nhận và đổi trả trong vòng 7 ngày nếu vật phẩm bị hư hỏng, nứt vỡ trong quá trình vận chuyển.';

      html += `
        <div class="fengshui-support-banner" style="grid-column: 1 / -1; margin-top: 16px; padding: 12px 16px; background: var(--paper-2); border: 1px solid var(--line); border-radius: 6px; font-size: 0.9rem; color: var(--text-muted); text-align: center;">
          <span>🛡️ <strong>Chính sách đổi trả &amp; hỗ trợ:</strong> ${supportText}</span>
        </div>
      `;

      container.innerHTML = html;
    },

    /**
     * Khởi tạo xử lý Form Đặt Lịch Tư Vấn 1-1
     */
    initBookingForm: function () {
      setTimeout(() => {
        const form = document.getElementById('tuviBookingForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleBookingSubmit();
        });
      }, 500);
    },

    handleBookingSubmit: function () {
      const name = document.getElementById('bookingName')?.value || '';
      const phone = document.getElementById('bookingPhone')?.value || '';
      const date = document.getElementById('bookingDate')?.value || '';
      const time = document.getElementById('bookingTime')?.value || '';
      const service = document.getElementById('bookingService')?.value || 'Tham Vấn 1-1 Chuyên Đề (490.000đ)';
      const note = document.getElementById('bookingNote')?.value || '';
      const consent = document.getElementById('bookingConsent');

      if (!name || !phone) {
        if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast('Vui lòng nhập Họ tên và Số điện thoại/Zalo', 'error');
        } else {
          alert('Vui lòng nhập Họ tên và Số điện thoại/Zalo');
        }
        return;
      }

      if (consent && !consent.checked) {
        if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast('Vui lòng đồng ý với điều khoản liên hệ và chính sách bảo mật.', 'error');
        } else {
          alert('Vui lòng đồng ý với điều khoản liên hệ và chính sách bảo mật.');
        }
        consent.focus();
        return;
      }

      // Lưu lịch hẹn vào danh sách đơn hàng
      const bookingData = {
        id: 'BK' + Math.floor(100000 + Math.random() * 900000),
        name,
        phone,
        date,
        time,
        service,
        note,
        createdAt: new Date().toLocaleString('vi-VN')
      };

      try {
        let bookings = JSON.parse(localStorage.getItem('tvhh_bookings') || '[]');
        bookings.unshift(bookingData);
        localStorage.setItem('tvhh_bookings', JSON.stringify(bookings));
      } catch (e) {}

      // Gửi dữ liệu đặt lịch trực tiếp về Backend Server để Admin quản lý
      fetch(this.getApiUrl('/api/bookings/create'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          bookingDate: date,
          bookingTime: time,
          serviceName: service,
          note: note,
          visitorId: (window.TuViTracker ? window.TuViTracker.visitorId : localStorage.getItem('tvhh_visitor_id')) || ''
        })
      }).catch(function(err) { console.warn('Lỗi lưu lịch tư vấn:', err); });

      if (window.TuViTracker && window.TuViTracker.track) {
        window.TuViTracker.track('booking_submit', {
          customerName: name,
          customerPhone: phone,
          serviceName: service
        });
      }

      // Mở modal xác nhận hoặc điều hướng Zalo
      const resultBox = document.getElementById('bookingResultSuccess');
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.scrollIntoView({ behavior: 'smooth' });
      }

      const msg = encodeURIComponent(`Chào Chuyên gia Xem Tử Vi Huyền Học, tôi tên là ${name} (${phone}). Tôi muốn đặt lịch tư vấn: ${service} vào ${time} ngày ${date}. Vấn đề quan tâm: ${note}`);
      const zaloUrl = `https://zalo.me/${this.config.zaloPhone}?text=${msg}`;

      if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
        TuViApp.showToast('Đăng ký lịch tư vấn thành công! Đang kết nối Zalo Chuyên gia...', 'success');
      }

      setTimeout(() => {
        window.open(zaloUrl, '_blank');
      }, 1000);
    },

    /**
     * Floating CTA Button (Item 13 & 14)
     * Đặt ở góc dưới bên phải, ẩn khi vùng Bảng Giá Dịch Vụ đang hiển thị trong tầm nhìn
     */
    initFloatingCta: function () {
      let floatBtn = document.getElementById('floatingVipCta');
      if (!floatBtn) {
        floatBtn = document.createElement('button');
        floatBtn.id = 'floatingVipCta';
        floatBtn.className = 'floating-vip-cta';
        floatBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Tải Báo Cáo VIP A4 (49k)</span>
        `;
        floatBtn.onclick = () => this.openVipModal();
        document.body.appendChild(floatBtn);
      }

      let isPricingInView = false;
      let isChartInView = false;
      const pricingSection = document.getElementById('bang-gia-dich-vu') || document.querySelector('.pricing-section');

      const updateVisibility = () => {
        if (!floatBtn) return;
        // Ẩn nút floating VIP khi lá số hoặc bảng giá đang trong tầm nhìn
        const chartArea = document.getElementById('laSoPrintArea') || document.getElementById('ket-qua');
        if (chartArea) {
          const rect = chartArea.getBoundingClientRect();
          isChartInView = (rect.top < window.innerHeight && rect.bottom > 0);
        } else {
          isChartInView = false;
        }

        if (window.scrollY > 400 && !isPricingInView && !isChartInView) {
          floatBtn.classList.add('visible');
        } else {
          floatBtn.classList.remove('visible');
        }
      };

      if (pricingSection && typeof IntersectionObserver !== 'undefined') {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            isPricingInView = entry.isIntersecting;
            updateVisibility();
          });
        }, { threshold: 0.05 });
        observer.observe(pricingSection);
      }

      let scrollTicking = false;
      const onScrollThrottled = () => {
        if (!scrollTicking) {
          scrollTicking = true;
          requestAnimationFrame(() => {
            updateVisibility();
            scrollTicking = false;
          });
        }
      };

      if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('scroll', onScrollThrottled, { passive: true });
      }
    },

    /**
     * Sao chép thông tin vào clipboard
     */
    copyField: function (elementId, labelName) {
      const el = document.getElementById(elementId);
      if (!el) return;
      const text = (el.textContent || el.innerText || '').trim();
      if (!text) return;

      const onSuccess = () => {
        if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast(`Đã sao chép ${labelName}: ${text}`, 'success');
        } else {
          alert(`Đã sao chép ${labelName}: ${text}`);
        }
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(() => {
          this.fallbackCopy(text, labelName);
        });
      } else {
        this.fallbackCopy(text, labelName);
      }
    },

    fallbackCopy: function (text, labelName) {
      const input = document.createElement('input');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      try {
        document.execCommand('copy');
        if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast(`Đã sao chép ${labelName}: ${text}`, 'success');
        }
      } catch (e) {}
      document.body.removeChild(input);
    },

    /**
     * DOM tạo Modal VietQR
     */
    createVipModalDOM: function () {
      if (document.getElementById('tuvi-vip-modal')) return;

      const curYear = new Date().getFullYear();
      const nextYear = curYear + 1;
      const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
      const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
      const curCanChi = `${CAN[(curYear + 6) % 10]} ${CHI[(curYear + 8) % 12]}`;
      const nextCanChi = `${CAN[(nextYear + 6) % 10]} ${CHI[(nextYear + 8) % 12]}`;

      const modalHtml = `
        <div class="tuvi-vip-modal-wrap" id="tuvi-vip-modal">
          <div class="tuvi-vip-backdrop" onclick="TuViMonetize.closeVipModal()"></div>
          <div class="tuvi-vip-card">
            <button class="tuvi-vip-close" type="button" aria-label="Đóng" onclick="TuViMonetize.closeVipModal()">&times;</button>
            
            <div class="tuvi-vip-header">
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
            </div>

            <!-- BỘ CHUYỂN GÓI NHANH 3 CẤP ĐỘ (CRO OPTIMIZATION) -->
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
            </div>

            <div class="vip-qr-section">
              <!-- KHỐI QUÉT MÃ QR VIETQR -->
              <div class="qr-code-box">
                <img id="vipQrImage" src="" alt="Mã VietQR Thanh Toán" class="qr-img">
                <p class="qr-hint">Mở ứng dụng ngân hàng hoặc ví điện tử để quét mã VietQR tự động điền thông tin</p>
              </div>

              <!-- KHỐI THÔNG TIN STK VÀ CHUYỂN KHOẢN -->
              <div class="bank-info-container">
                <h4 class="bank-info-box-title">THÔNG TIN CHUYỂN KHOẢN NGÂN HÀNG (STK)</h4>
                <div class="bank-info-grid">
                  <div class="bank-row">
                    <span class="b-lbl">Ngân hàng:</span>
                    <span class="b-val text-gold text-bold" id="vipBankName">VietinBank (Công Thương Việt Nam)</span>
                  </div>

                  <div class="bank-row">
                    <span class="b-lbl">Số tài khoản:</span>
                    <div class="b-val-with-copy">
                      <span class="b-val text-gold text-bold copy-target" id="vipAccountNo">108884822302</span>
                      <button class="btn-copy-mini" type="button" onclick="TuViMonetize.copyField('vipAccountNo', 'Số tài khoản')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px;"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                        Sao chép
                      </button>
                    </div>
                  </div>

                  <div class="bank-row">
                    <span class="b-lbl">Chủ tài khoản:</span>
                    <span class="b-val text-bold" id="vipAccountName">TRAN CONG LUYEN</span>
                  </div>

                  <div class="bank-row">
                    <span class="b-lbl">Số tiền:</span>
                    <div class="b-val-with-copy">
                      <span class="b-val text-gold text-bold" id="vipTransferAmount">49.000 đ</span>
                      <button class="btn-copy-mini" type="button" onclick="TuViMonetize.copyField('vipTransferAmount', 'Số tiền')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px;"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                        Sao chép
                      </button>
                    </div>
                  </div>

                  <div class="bank-row">
                    <span class="b-lbl">Nội dung CK:</span>
                    <div class="b-val-with-copy">
                      <span class="b-val text-gold text-bold copy-target" id="vipMemoText">TV888888</span>
                      <button class="btn-copy-mini" type="button" onclick="TuViMonetize.copyField('vipMemoText', 'Nội dung chuyển khoản')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px;"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                        Sao chép
                      </button>
                    </div>
                  </div>
                </div>
                <button type="button" class="btn-check-manual-payment" onclick="TuViMonetize.checkPaymentNow()" style="margin-top: 10px; width: 100%; background: #1B1714; color: #E5C378; border: 1.5px solid #C29B38; padding: 10px 14px; border-radius: 4px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 0.9rem; transition: all 0.2s;">
                  <span>⚡ Đã chuyển khoản xong? Bấm vào đây để mở khóa ngay</span>
                </button>
                <p class="bank-auto-note" style="margin-top: 8px; font-size: 0.85rem;">
                  Đã chuyển tiền nhưng chưa mở khóa? Gửi mã giao dịch qua <a href="#" id="vipZaloSupportLink" class="vip-zalo-link" target="_blank" rel="noopener" style="color:var(--seal, #A3281F); font-weight:600; text-decoration:underline;">kênh hỗ trợ</a> để được đối soát ngay.
                </p>
              </div>
            </div>

            <div class="vip-benefits-list">
              <div class="vip-benefit-item">✓ <strong>Xuất trọn bộ File PDF A4</strong> đóng dấu mộc phong thủy lưu trữ trọn đời.</div>
              <div class="vip-benefit-item">✓ <strong>Mở khóa toàn bộ luận giải</strong> Tam Phương Tứ Chính không che.</div>
              <div class="vip-benefit-item">✓ <strong>Bản phân tích đặc biệt Lưu Niên ${curYear} (${curCanChi}) &amp; ${nextYear} (${nextCanChi})</strong> &amp; phương pháp hóa giải chi tiết.</div>
              <div class="vip-benefit-item">✓ <strong>Bảng tra cứu màu sắc, hướng xuất hành, con số may mắn</strong> tương sinh bản mệnh.</div>
            </div>

            <!-- TRẠNG THÁI KẾT NỐI TỰ ĐỘNG VIETINBANK 24/7 (ZERO-CLICK AUTO VERIFICATION) -->
            <div class="vip-auto-status-radar" id="vipAutoStatusRadar">
              <div class="radar-ping-ring">
                <span class="radar-dot"></span>
              </div>
              <p class="radar-text">
                <strong>🔄 Đang kết nối tự động với VietinBank 24/7...</strong><br>
                Hệ thống sẽ tự động mở khóa ngay tức thì khi bạn chuyển khoản thành công (không cần bấm nút).
              </p>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHtml);
    },

    /**
     * DOM Modal Khôi phục / Tra cứu quyền VIP
     */
    createRestoreModalDOM: function () {
      if (document.getElementById('tuvi-restore-modal')) return;

      const html = `
        <div id="tuvi-restore-modal" class="tuvi-tool-modal-backdrop">
          <div class="tuvi-tool-modal-card">
            <button class="tuvi-tool-modal-close" onclick="TuViMonetize.closeRestoreModal()">&times;</button>
            <h3><i data-lucide="key-round"></i> Xem Lại Báo Cáo VIP</h3>
            <p class="tuvi-tool-modal-desc">
              Nhập mã đơn hàng (ví dụ: TV123456) hoặc số điện thoại đã dùng khi thanh toán để mở khóa lại lá số và tải file PDF:
            </p>
            <form onsubmit="TuViMonetize.handleRestoreSubmit(event)">
              <div class="tuvi-tool-input-wrap">
                <label for="restoreQueryInput">Mã Đơn Hàng hoặc Số Điện Thoại:</label>
                <input type="text" id="restoreQueryInput" class="tuvi-tool-input" placeholder="Ví dụ: TV216469 hoặc 0988888888" required autocomplete="off">
              </div>
              <div id="restoreErrorMsg" class="tuvi-tool-error"></div>
              <button type="submit" id="btnRestoreSubmit" class="btn-tool-submit" style="margin-top: 10px;">
                Xem lại báo cáo
              </button>
            </form>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', html);
    },

    openRestoreModal: function () {
      let modal = document.getElementById('tuvi-restore-modal');
      if (!modal) {
        this.createRestoreModalDOM();
        modal = document.getElementById('tuvi-restore-modal');
      }
      if (!modal) return;

      const errEl = document.getElementById('restoreErrorMsg');
      if (errEl) {
        errEl.textContent = '';
        errEl.style.display = 'none';
      }
      const input = document.getElementById('restoreQueryInput');
      if (input) input.value = '';

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && window.lucide) {
        window.lucide.createIcons();
      }
    },

    closeRestoreModal: function () {
      const modal = document.getElementById('tuvi-restore-modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    },

    handleRestoreSubmit: async function (e) {
      if (e) e.preventDefault();
      const input = document.getElementById('restoreQueryInput');
      const errEl = document.getElementById('restoreErrorMsg');
      const btn = document.getElementById('btnRestoreSubmit');
      const val = (input ? input.value : '').trim();

      if (!val) return;
      if (btn) {
        btn.disabled = true;
        btn.textContent = '⏳ Đang tra cứu dữ liệu...';
      }
      if (errEl) errEl.style.display = 'none';

      try {
        const res = await fetch(this.getApiUrl('/api/orders/restore'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: val })
        });
        const data = await res.json();

        if (data.success && data.isVip) {
          this.isVipUnlocked = true;
          this.vipAccessToken = data.order.vipAccessToken || data.order.orderCode;
          this.vipOrderCode = data.order.orderCode;

          localStorage.setItem('tvhh_vip_unlocked', 'true');
          localStorage.setItem('tvhh_vip_token', this.vipAccessToken);
          localStorage.setItem('tvhh_vip_order_code', this.vipOrderCode);

          try {
            const url = new URL(window.location.href);
            url.searchParams.set('vip_token', this.vipAccessToken);
            window.history.replaceState({}, '', url.toString());
          } catch (e) {}

          this.closeRestoreModal();
          this.applyVipUI();

          if (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) {
            TuViChart.renderLuanGiai(TuViChart._currentLaSo);
          }

          if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
            TuViApp.showToast(`🎉 Khôi phục thành công đơn hàng ${data.order.orderCode}! Toàn bộ 12 cung đã được mở khóa.`, 'success');
          }
        } else {
          if (errEl) {
            errEl.textContent = data.message || 'Không tìm thấy thông tin đơn hàng VIP tương ứng.';
            errEl.style.display = 'block';
          }
        }
      } catch (err) {
        if (errEl) {
          errEl.textContent = 'Lỗi kết nối máy chủ: ' + err.message;
          errEl.style.display = 'block';
        }
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 5px;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            Tìm & Khôi Phục Ngay
          `;
        }
      }
    },

    /**
     * DOM Modal Tạo Mật Khẩu Bảo Vệ Tài Khoản (Claim Account)
     */
    createClaimAccountModalDOM: function () {
      if (document.getElementById('tuvi-claim-modal')) return;

      const html = `
        <div id="tuvi-claim-modal" class="tuvi-tool-modal-backdrop">
          <div class="tuvi-tool-modal-card">
            <button class="tuvi-tool-modal-close" onclick="TuViMonetize.closeClaimAccountModal()">&times;</button>
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              Tạo Mật Khẩu Bảo Vệ
            </h3>
            <p class="tuvi-tool-modal-desc">
              Gắn đơn hàng VIP này với tài khoản chính thức để bạn có thể đăng nhập bằng Mật khẩu trên mọi thiết bị vĩnh viễn:
            </p>
            <form onsubmit="TuViMonetize.handleClaimAccountSubmit(event)">
              <div class="tuvi-tool-input-wrap">
                <label>Mã Đơn Hàng VIP:</label>
                <input type="text" id="claimOrderCodeInput" class="tuvi-tool-input" readonly style="opacity:0.8; background:rgba(0,0,0,0.3); font-weight:bold; color:var(--gold-light);">
              </div>
              <div class="tuvi-tool-input-wrap">
                <label for="claimFullNameInput">Họ và Tên:</label>
                <input type="text" id="claimFullNameInput" class="tuvi-tool-input" placeholder="Ví dụ: Nguyễn Văn An" required>
              </div>
              <div class="tuvi-tool-input-wrap">
                <label for="claimEmailPhoneInput">Số Điện Thoại hoặc Email:</label>
                <input type="text" id="claimEmailPhoneInput" class="tuvi-tool-input" placeholder="Ví dụ: 0988888888 hoặc an.nguyen@gmail.com" required autocomplete="username">
              </div>
              <div class="tuvi-tool-input-wrap">
                <label for="claimPasswordInput">Thiết Lập Mật Khẩu Mới:</label>
                <input type="password" id="claimPasswordInput" class="tuvi-tool-input" placeholder="Tối thiểu 6 ký tự" minlength="6" required autocomplete="new-password">
              </div>
              <div id="claimErrorMsg" class="tuvi-tool-error"></div>
              <button type="submit" id="btnClaimSubmit" class="btn-tool-submit" style="margin-top: 10px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 5px;"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Kích Hoạt Tài Khoản Vĩnh Viễn
              </button>
            </form>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', html);
    },

    openClaimAccountModal: function () {
      let modal = document.getElementById('tuvi-claim-modal');
      if (!modal) {
        this.createClaimAccountModalDOM();
        modal = document.getElementById('tuvi-claim-modal');
      }
      if (!modal) return;

      const codeInput = document.getElementById('claimOrderCodeInput');
      const orderCode = this.vipOrderCode || localStorage.getItem('tvhh_vip_order_code') || 'TV';
      if (codeInput) codeInput.value = orderCode;

      const nameInput = document.getElementById('claimFullNameInput');
      if (nameInput && !nameInput.value) {
        if (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo && TuViChart._currentLaSo.hoTen) {
          nameInput.value = TuViChart._currentLaSo.hoTen;
        }
      }

      const errEl = document.getElementById('claimErrorMsg');
      if (errEl) {
        errEl.textContent = '';
        errEl.style.display = 'none';
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && window.lucide) {
        window.lucide.createIcons();
      }
    },

    closeClaimAccountModal: function () {
      const modal = document.getElementById('tuvi-claim-modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    },

    handleClaimAccountSubmit: async function (e) {
      if (e) e.preventDefault();
      const codeInput = document.getElementById('claimOrderCodeInput');
      const nameInput = document.getElementById('claimFullNameInput');
      const epInput = document.getElementById('claimEmailPhoneInput');
      const passInput = document.getElementById('claimPasswordInput');
      const errEl = document.getElementById('claimErrorMsg');
      const btn = document.getElementById('btnClaimSubmit');

      const orderCode = (codeInput ? codeInput.value : '').trim();
      const vipToken = this.vipAccessToken || localStorage.getItem('tvhh_vip_token') || orderCode;
      const fullName = (nameInput ? nameInput.value : '').trim();
      const emailOrPhone = (epInput ? epInput.value : '').trim();
      const password = (passInput ? passInput.value : '').trim();

      if (!orderCode || !emailOrPhone || !password) return;

      if (btn) {
        btn.disabled = true;
        btn.textContent = '⏳ Đang khởi tạo tài khoản bảo vệ...';
      }
      if (errEl) errEl.style.display = 'none';

      try {
        const res = await fetch(this.getApiUrl('/api/orders/claim-account'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderCode,
            vipAccessToken: vipToken,
            fullName,
            emailOrPhone,
            password
          })
        });
        const data = await res.json();

        if (data.success && data.user) {
          if (typeof TuViAuth !== 'undefined') {
            TuViAuth.saveSession(data.token, data.user);
          }
          this.closeClaimAccountModal();
          if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
            TuViApp.showToast('🎉 Tài khoản đã được bảo vệ thành công! Từ nay bạn có thể đăng nhập bằng mật khẩu bất cứ lúc nào.', 'success');
          }
        } else {
          if (errEl) {
            errEl.textContent = data.message || 'Không thể tạo tài khoản.';
            errEl.style.display = 'block';
          }
        }
      } catch (err) {
        if (errEl) {
          errEl.textContent = 'Lỗi kết nối máy chủ: ' + err.message;
          errEl.style.display = 'block';
        }
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = '🔒 Kích Hoạt Tài Khoản Vĩnh Viễn';
        }
      }
    }
  };

  global.TuViMonetize = Monetize;
})(typeof window !== 'undefined' ? window : this);
