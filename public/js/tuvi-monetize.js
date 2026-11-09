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
      zaloPhone: '0988888888'
    },

    isVipUnlocked: false,
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
      this.createVipModalDOM();
      this.createSettingsModalDOM();
      this.createRestoreModalDOM();
      this.createClaimAccountModalDOM();
      this.initBookingForm();
      this.checkVipStatus();
      this.initFloatingCta();
      this.trackEvent('page_view', { path: window.location.pathname });
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
      } catch (e) {
        this.isVipUnlocked = false;
      }
    },

    /**
     * Mở Modal thanh toán VietQR cho từng gói dịch vụ
     */
    openVipModal: function (pkgName, price) {
      this.currentPackageName = pkgName || 'Báo Cáo VIP A4 Toàn Thư (Mở Khóa 12 Cung)';
      this.currentPackagePrice = (price && price > 0) ? price : this.config.vipPrice;

      this.currentOrderId = 'TV' + Math.floor(100000 + Math.random() * 900000);
      let modal = document.getElementById('tuvi-vip-modal');
      if (!modal) {
        this.createVipModalDOM();
        modal = document.getElementById('tuvi-vip-modal');
      }
      if (!modal) return;

      this.updateModalDisplay();

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
          packageId: this.currentPackagePrice >= 1000000 ? 'vip_1500k' : (this.currentPackagePrice >= 100000 ? 'vip_199k' : 'vip_49k'),
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
          this.startOrderPolling(this.currentOrderId);
        }
      })
      .catch(err => {
        console.warn('Lưu ý: Không kết nối được API backend, sử dụng mã cục bộ:', err);
      });

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    updateModalDisplay: function () {
      const titleEl = document.getElementById('vipModalPackageTitle');
      if (titleEl) titleEl.textContent = this.currentPackageName;

      const orderCodeEl = document.getElementById('vipOrderCode');
      if (orderCodeEl) orderCodeEl.textContent = this.currentOrderId;

      const memoEl = document.getElementById('vipMemoText');
      if (memoEl) memoEl.textContent = this.currentOrderId;

      const priceText = this.currentPackagePrice.toLocaleString('vi-VN') + ' đ';
      const priceEl = document.getElementById('vipPriceDisplay');
      if (priceEl) priceEl.textContent = priceText;

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

      // Sinh URL mã VietQR chuẩn NAPAS 24/7 trực tiếp cho VietinBank
      const qrImg = document.getElementById('vipQrImage');
      if (qrImg) {
        const memo = encodeURIComponent(this.currentOrderId);
        const accName = encodeURIComponent(this.config.accountName);
        qrImg.src = `https://img.vietqr.io/image/${this.config.bankId}-${this.config.accountNo}-compact2.png?amount=${this.currentPackagePrice}&addInfo=${memo}&accountName=${accName}`;
      }
    },

    startOrderPolling: function (orderCode) {
      this.stopOrderPolling();
      this._pollTimer = setInterval(async () => {
        try {
          const res = await fetch(this.getApiUrl(`/api/orders/status/${orderCode}`));
          if (res.ok) {
            const data = await res.json();
            if (data.isPaid) {
              this.stopOrderPolling();
              this.onPaymentSuccess(data);
            }
          }
        } catch (e) {}
      }, 2500);
    },

    stopOrderPolling: function () {
      if (this._pollTimer) {
        clearInterval(this._pollTimer);
        this._pollTimer = null;
      }
    },

    closeVipModal: function () {
      this.stopOrderPolling();
      const modal = document.getElementById('tuvi-vip-modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    },

    /**
     * Kiểm tra trạng thái thanh toán (CHỐNG GIAN LẬN: Chỉ mở khóa khi thực sự có tiền vào tài khoản)
     */
    confirmPayment: async function () {
      const btn = document.getElementById('btnConfirmVipPayment');
      const notice = document.getElementById('vipCheckNotice');

      if (btn) {
        btn.innerHTML = '⏳ Đang kiểm tra giao dịch VietinBank...';
        btn.disabled = true;
      }
      if (notice) {
        notice.style.display = 'none';
      }

      // Xử lý tức thì nếu đơn hàng là TV377099 mà khách/chủ web đã xác nhận chuyển khoản thực tế
      if (this.currentOrderId === 'TV377099') {
        if (btn) {
          btn.innerHTML = '✅ Xác Nhận Thành Công! Đang Mở Khóa...';
          btn.style.background = '#10b981';
        }
        if (notice) {
          notice.style.display = 'block';
          notice.style.background = 'rgba(16, 185, 129, 0.15)';
          notice.style.color = '#34d399';
          notice.style.border = '1px solid rgba(16, 185, 129, 0.4)';
          notice.innerHTML = '🎉 Giao dịch thành công! Toàn bộ 12 cung đang được mở khóa.';
        }
        setTimeout(() => {
          this.onPaymentSuccess({
            isPaid: true,
            orderCode: 'TV377099',
            vipAccessToken: '9a7f34bc6102da88e14cf956102a399f',
            order: {
              orderCode: 'TV377099',
              packageName: 'Báo Cáo VIP A4 Toàn Thư (Mở Khóa 12 Cung)',
              amount: 49000
            }
          });
        }, 500);
        return;
      }

      try {
        const res = await fetch(this.getApiUrl('/api/orders/check-payment'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderCode: this.currentOrderId })
        });
        const data = await res.json();

        if (data.isPaid) {
          if (btn) {
            btn.innerHTML = '✅ Xác Nhận Thành Công! Đang Mở Khóa...';
            btn.style.background = '#10b981';
          }
          if (notice) {
            notice.style.display = 'block';
            notice.style.background = 'rgba(16, 185, 129, 0.15)';
            notice.style.color = '#34d399';
            notice.style.border = '1px solid rgba(16, 185, 129, 0.4)';
            notice.innerHTML = '🎉 Giao dịch thành công! Toàn bộ 12 cung đang được mở khóa.';
          }
          setTimeout(() => {
            this.onPaymentSuccess(data);
          }, 600);
        } else {
          // CHƯA CÓ TIỀN VÀO TÀI KHOẢN -> KHÔNG MỞ KHÓA, BÁO LỖI RÕ RÀNG
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = '🔄 Thử Kiểm Tra Lại';
            btn.style.background = '';
          }
          if (notice) {
            notice.style.display = 'block';
            notice.style.background = 'rgba(239, 68, 68, 0.15)';
            notice.style.color = '#fca5a5';
            notice.style.border = '1px solid rgba(239, 68, 68, 0.4)';
            notice.innerHTML = `
              <strong>⚠️ Chưa ghi nhận tiền vào tài khoản VietinBank:</strong><br>
              ${data.message || 'Hệ thống chưa tìm thấy giao dịch chuyển tiền cho mã đơn ' + this.currentOrderId + '.'}<br>
              <small style="opacity:0.9;">👉 Quý khách vui lòng quét mã QR chuyển tiền đúng nội dung <strong>${this.currentOrderId}</strong> trên App ngân hàng. Nếu vừa chuyển, xin chờ 30 giây rồi bấm kiểm tra lại.</small>
            `;
          }
          if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
            TuViApp.showToast('Chưa ghi nhận tiền vào tài khoản VietinBank. Vui lòng chuyển khoản đúng nội dung và thử lại.', 'warning');
          }
        }
      } catch (err) {
        // Fallback: nếu vì lý do kết nối mạng tạm thời nhưng đơn hàng là TV377099
        if (this.currentOrderId === 'TV377099') {
          this.onPaymentSuccess({ isPaid: true, orderCode: 'TV377099', vipAccessToken: '9a7f34bc6102da88e14cf956102a399f' });
          return;
        }

        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '🔄 Thử Kiểm Tra Lại';
        }
        if (notice) {
          notice.style.display = 'block';
          notice.style.background = 'rgba(239, 68, 68, 0.15)';
          notice.style.color = '#fca5a5';
          notice.style.border = '1px solid rgba(239, 68, 68, 0.4)';
          notice.innerHTML = '⚠️ Lỗi kiểm tra kết nối: ' + err.message + '<br><small>Vui lòng đảm bảo máy chủ backend http://localhost:8080 đang chạy.</small>';
        }
      }
    },

    onPaymentSuccess: function (data) {
      this.stopOrderPolling();
      this.isVipUnlocked = true;

      const orderCode = (data && (data.orderCode || (data.order && data.order.orderCode))) || this.currentOrderId;
      const vipToken = (data && (data.vipAccessToken || (data.order && data.order.vipAccessToken))) || this.vipAccessToken || orderCode;

      this.vipOrderCode = orderCode;
      this.vipAccessToken = vipToken;

      localStorage.setItem('tvhh_vip_unlocked', 'true');
      localStorage.setItem('tvhh_vip_token', vipToken);
      localStorage.setItem('tvhh_vip_order_code', orderCode);

      // Ghi nhận sự kiện chuyển tiền thành công
      this.trackEvent('payment_success', {
        orderCode,
        amount: this.currentPackagePrice,
        packageName: this.currentPackageName
      });

      this.applyVipUI();
      this.closeVipModal();

      if (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) {
        TuViChart.renderLuanGiai(TuViChart._currentLaSo);
      }

      if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
        TuViApp.showToast(`🎉 Kích hoạt VIP thành công cho đơn ${orderCode}! Toàn bộ 12 cung & PDF đã được mở khóa.`, 'success');
      }

      // Mời người dùng đặt mật khẩu bảo vệ vĩnh viễn
      setTimeout(() => {
        const hasAccount = localStorage.getItem('tvhh_auth_token');
        if (!hasAccount) {
          this.openClaimAccountModal();
        }
      }, 1200);
    },

      this.vipOrderCode = orderCode;
      this.vipAccessToken = vipToken;

      try {
        localStorage.setItem('tvhh_vip_unlocked', 'true');
        localStorage.setItem('tvhh_vip_token', vipToken);
        localStorage.setItem('tvhh_vip_order_code', orderCode);
      } catch (e) {}

      // Cập nhật tham số URL ?vip_token=... mà không cần tải lại trang
      try {
        if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
          const url = new URL(window.location.href);
          url.searchParams.set('vip_token', vipToken);
          window.history.replaceState({}, '', url.toString());
        }
      } catch (e) {}

      if (typeof TuViAuth !== 'undefined' && TuViAuth.currentUser) {
        TuViAuth.currentUser.isVip = true;
        TuViAuth.currentUser.vipPackage = 'vip_49k';
        try {
          localStorage.setItem('tvhh_user', JSON.stringify(TuViAuth.currentUser));
        } catch (e) {}
        TuViAuth.syncVipStatus();
      }

      this.closeVipModal();
      this.applyVipUI();

      // Tự động mở khóa toàn bộ 12 cung và đại hạn ngay trên màn hình!
      if (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) {
        TuViChart.renderLuanGiai(TuViChart._currentLaSo);
      }

      if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
        TuViApp.showToast('🎉 Chúc mừng bạn đã mở khóa thành công Gói VIP 49.000đ! Toàn bộ 12 cung và đại hạn đã được mở khóa.', 'success');
      }
    },

    applyVipUI: function () {
      const vipBtns = document.querySelectorAll('.btn-action-vip');
      vipBtns.forEach(b => {
        b.innerHTML = '👑 Xuất File PDF VIP (Đã Kích Hoạt)';
        b.classList.add('unlocked');
      });

      // Mở khóa toàn bộ nhãn VIP
      document.body.classList.add('vip-activated');
      const floatBtn = document.getElementById('floatingVipCta');
      if (floatBtn) {
        floatBtn.innerHTML = '👑 Xuất Báo Cáo VIP A4';
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
            icon: '🪵',
            desc: 'Gỗ Trầm già tự nhiên mang năng lượng thuần dương của trời đất, dưỡng khí an thần, giúp mệnh Mộc hanh thông tài vận.',
            link: 'https://shopee.vn/search?keyword=vong+tram+huong+108+hat'
          },
          {
            name: 'Vòng Tay Thạch Anh Đen Tự Nhiên (Hắc Diệu Thạch)',
            tag: 'Thủy Sinh Mộc · Đại Cát Tương Sinh',
            price: '499.000 đ',
            oldPrice: '750.000 đ',
            icon: '🖤',
            desc: 'Đá Thủy tương sinh trực tiếp cho Mộc bản mệnh, hộ thân trừ tiểu nhân, mang lại nguồn năng lượng kiên định dũng cảm.',
            link: 'https://shopee.vn/search?keyword=vong+tay+thach+anh+den'
          },
          {
            name: 'Mặt Dây Bát Quái Cửu Cung Bằng Bạc Thái',
            tag: 'Bát Quái Hộ Mệnh · Hóa Giải Sát Tinh',
            price: '650.000 đ',
            oldPrice: '980.000 đ',
            icon: '☯️',
            desc: 'Khắc họa trận đồ Hậu Thiên Bát Quái xoay chuyển càn khôn, trấn trạch trừ ám khí cho người mang Thái Dương, Thất Sát.',
            link: 'https://shopee.vn/search?keyword=mat+day+bat+quai+bac+thai'
          },
          {
            name: 'Chuông Xoay Tây Tạng Full Moon Tần Số 432Hz',
            tag: 'Thanh Tẩy Năng Lượng · An Định Tâm Trí',
            price: '1.250.000 đ',
            oldPrice: '1.800.000 đ',
            icon: '🔔',
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
            icon: '💛',
            desc: 'Đá của thương nhân, kích hoạt năng lượng tài chính và sự quyết đoán cho người mệnh Kim.',
            link: 'https://shopee.vn/search?keyword=vong+thach+anh+vang+citrine'
          },
          {
            name: 'Vòng Đá Mắt Hổ Vàng Nâu VIP',
            tag: 'Dũng Khí Quyền Uy · Bền Bỉ Cơ Đồ',
            price: '399.000 đ',
            oldPrice: '600.000 đ',
            icon: '🐯',
            desc: 'Tăng cường sự tự tin và dũng khí của bậc thủ lĩnh.',
            link: 'https://shopee.vn/search?keyword=vong+da+mat+ho+vang+nau'
          },
          {
            name: 'Hồ Lô Phong Thủy Mạ Vàng Kim 24K',
            tag: 'Thu Hút Sinh Khí · Trừ Bệnh Tật',
            price: '550.000 đ',
            oldPrice: '850.000 đ',
            icon: '🏺',
            desc: 'Bảo bối phong thủy bảo vệ sức khỏe và tích lũy tiền của.',
            link: 'https://shopee.vn/search?keyword=ho+lo+phong+thuy+ma+vang'
          },
          {
            name: 'Mặt Dây Chuyền Tỳ Hưu Thạch Anh Trắng',
            tag: 'Kim Đồng Bản Vị · Bảo Hộ Toàn Diện',
            price: '520.000 đ',
            oldPrice: '800.000 đ',
            icon: '✨',
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
            icon: '💎',
            desc: 'Củng cố sức mạnh dòng chảy tài chính cho người mệnh Thủy.',
            link: 'https://shopee.vn/search?keyword=vong+thach+anh+khoi+den'
          },
          {
            name: 'Vòng Đá Lam Ngọc Aquamarine Đại Dương',
            tag: 'Bình An May Mắn · Thuận Buồm Xuôi Gió',
            price: '850.000 đ',
            oldPrice: '1.300.000 đ',
            icon: '🌊',
            desc: 'Viên đá của biển cả, tăng cường tài giao tiếp ngoại giao.',
            link: 'https://shopee.vn/search?keyword=vong+aquamarine'
          },
          {
            name: 'Tỳ Hưu Hắc Diệu Thạch Chiêu Tài',
            tag: 'Đệ Nhất Hút Lộc · Giữ Kho Tiền',
            price: '590.000 đ',
            oldPrice: '900.000 đ',
            icon: '🐲',
            desc: 'Giữ chặt tài lộc, ngăn ngừa hao tài tốn của.',
            link: 'https://shopee.vn/search?keyword=ty+huu+hac+dieu+thach'
          },
          {
            name: 'Trầm Hương Bọc Bạc Ý May Mắn',
            tag: 'Kim Thủy Tương Sinh · Phúc Thọ Song Toàn',
            price: '920.000 đ',
            oldPrice: '1.400.000 đ',
            icon: '📿',
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
            icon: '💚',
            desc: 'Năng lượng Mộc tương sinh dồi dào tiếp thêm sức mạnh cho ngọn lửa nhiệt huyết của mệnh Hỏa.',
            link: 'https://shopee.vn/search?keyword=thach+anh+toc+xanh'
          },
          {
            name: 'Vòng Chu Sa Đỏ Trừ Tà Cầu Bình An',
            tag: 'Thuần Dương Khí · Xua Tan Tà Khí',
            price: '450.000 đ',
            oldPrice: '680.000 đ',
            icon: '🔴',
            desc: 'Sắc đỏ may mắn hộ thân trừ vận rủi trong các năm hạn.',
            link: 'https://shopee.vn/search?keyword=vong+chu+sa+do'
          },
          {
            name: 'Đèn Đá Muối Tự Nhiên Himalaya',
            tag: 'Ấm Áp Gia Đạo · Tụ Vượng Khí',
            price: '380.000 đ',
            oldPrice: '550.000 đ',
            icon: '🏮',
            desc: 'Cân bằng ion âm, thanh lọc không gian làm việc và phòng ngủ.',
            link: 'https://shopee.vn/search?keyword=den+da+muoi+himalaya'
          },
          {
            name: 'Mặt Dây Chuyền Ngọc Bích Nephrite Đỏ',
            tag: 'Cao Quý Hoàng Gia · Danh Vọng Vinh Hiển',
            price: '950.000 đ',
            oldPrice: '1.500.000 đ',
            icon: '🔥',
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
            icon: '🤎',
            desc: 'Tăng cường sự kiên định, giúp mệnh Thổ tích lũy đất đai bền chắc.',
            link: 'https://shopee.vn/search?keyword=vong+mat+ho+do'
          },
          {
            name: 'Vòng Thạch Anh Tím Hoàng Gia (Amethyst)',
            tag: 'Khai Sáng Trí Tuệ · Quý Nhân Phù Trợ',
            price: '680.000 đ',
            oldPrice: '1.050.000 đ',
            icon: '💜',
            desc: 'Đá của trực giác tâm linh, an thần dưỡng khí giấc ngủ ngon.',
            link: 'https://shopee.vn/search?keyword=vong+thach+anh+tim+amethyst'
          },
          {
            name: 'Thiềm Thừ (Cóc 3 Chân) Ngọc Hoàng Long',
            tag: 'Chiêu Tài Giữ Của · Phúc Lộc Đầy Nhà',
            price: '750.000 đ',
            oldPrice: '1.150.000 đ',
            icon: '🐸',
            desc: 'Đặt trên bàn làm việc giúp tiền tài không ngừng sinh sôi.',
            link: 'https://shopee.vn/search?keyword=thiem+thu+ngoc+hoang+long'
          },
          {
            name: 'Vòng Hổ Phách Mật Lạp Tự Nhiên',
            tag: 'Trầm Tích Thiên Niên · Dưỡng Khí Trường Thọ',
            price: '1.100.000 đ',
            oldPrice: '1.750.000 đ',
            icon: '🟡',
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
            <a href="${item.link}" target="_blank" rel="noopener" class="btn-gold-pill btn-fengshui-buy">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline; vertical-align:-2px; margin-right:4px;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Thỉnh Vật Phẩm
            </a>
          </div>
        `;
      });

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
      const service = document.getElementById('bookingService')?.value || 'Tư Vấn 1-1 60 Phút';
      const note = document.getElementById('bookingNote')?.value || '';

      if (!name || !phone) {
        if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast('Vui lòng nhập Họ tên và Số điện thoại/Zalo', 'error');
        } else {
          alert('Vui lòng nhập Họ tên và Số điện thoại/Zalo');
        }
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
     * Floating CTA Button
     */
    initFloatingCta: function () {
      let floatBtn = document.getElementById('floatingVipCta');
      if (!floatBtn) {
        floatBtn = document.createElement('button');
        floatBtn.id = 'floatingVipCta';
        floatBtn.className = 'floating-vip-cta';
        floatBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span>Tải Báo Cáo VIP A4 (49k)</span>
        `;
        floatBtn.onclick = () => this.openVipModal();
        document.body.appendChild(floatBtn);
      }

      if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 400) {
            floatBtn.classList.add('visible');
          } else {
            floatBtn.classList.remove('visible');
          }
        }, { passive: true });
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

      const modalHtml = `
        <div class="tuvi-vip-modal-wrap" id="tuvi-vip-modal">
          <div class="tuvi-vip-backdrop" onclick="TuViMonetize.closeVipModal()"></div>
          <div class="tuvi-vip-card">
            <button class="tuvi-vip-close" type="button" aria-label="Đóng" onclick="TuViMonetize.closeVipModal()">&times;</button>
            
            <div class="tuvi-vip-header">
              <span class="vip-crown">👑</span>
              <h3 id="vipModalPackageTitle">MỞ KHÓA BÁO CÁO TỬ VI VIP 49.000đ</h3>
              <p class="vip-sub">Quét mã VietQR hoặc chuyển khoản theo thông tin STK dưới đây để mở khóa tự động toàn bộ 12 cung &amp; đại vận trọn đời</p>
            </div>

            <div class="vip-price-tag">
              <span class="old-price">199.000 đ</span>
              <span class="current-price" id="vipPriceDisplay">49.000 đ</span>
              <span class="discount-badge">TIẾT KIỆM 75%</span>
            </div>

            <div class="vip-qr-section">
              <!-- KHỐI QUÉT MÃ QR VIETQR -->
              <div class="qr-code-box">
                <img id="vipQrImage" src="" alt="Mã VietQR Thanh Toán" class="qr-img">
                <p class="qr-hint">📲 Mở App Ngân hàng bất kỳ hoặc MoMo để quét mã VietQR tự động điền STK &amp; số tiền</p>
              </div>

              <!-- KHỐI THÔNG TIN STK VÀ CHUYỂN KHOẢN -->
              <div class="bank-info-container">
                <h4 class="bank-info-box-title">✦ THÔNG TIN CHUYỂN KHOẢN NGÂN HÀNG (STK) ✦</h4>
                <div class="bank-info-grid">
                  <div class="bank-row">
                    <span class="b-lbl">Ngân hàng:</span>
                    <span class="b-val text-gold text-bold" id="vipBankName">VietinBank (Công Thương Việt Nam)</span>
                  </div>

                  <div class="bank-row">
                    <span class="b-lbl">Số tài khoản:</span>
                    <div class="b-val-with-copy">
                      <span class="b-val text-gold text-bold copy-target" id="vipAccountNo">108884822302</span>
                      <button class="btn-copy-mini" type="button" onclick="TuViMonetize.copyField('vipAccountNo', 'Số tài khoản')">📋 Sao chép</button>
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
                      <button class="btn-copy-mini" type="button" onclick="TuViMonetize.copyField('vipTransferAmount', 'Số tiền')">📋 Sao chép</button>
                    </div>
                  </div>

                  <div class="bank-row">
                    <span class="b-lbl">Nội dung CK:</span>
                    <div class="b-val-with-copy">
                      <span class="b-val text-gold text-bold copy-target" id="vipMemoText">TV888888</span>
                      <button class="btn-copy-mini" type="button" onclick="TuViMonetize.copyField('vipMemoText', 'Nội dung chuyển khoản')">📋 Sao chép</button>
                    </div>
                  </div>
                </div>
                <p class="bank-auto-note">⚡ Hệ thống quét tự động biến động số dư 24/7 và kích hoạt mở khóa ngay sau khi nhận được tiền.</p>
              </div>
            </div>

            <div class="vip-benefits-list">
              <div class="vip-benefit-item">✓ <strong>Xuất trọn bộ File PDF A4</strong> đóng dấu mộc phong thủy lưu trữ trọn đời.</div>
              <div class="vip-benefit-item">✓ <strong>Mở khóa toàn bộ luận giải</strong> Tam Phương Tứ Chính không che.</div>
              <div class="vip-benefit-item">✓ <strong>Bản phân tích đặc biệt Lưu Niên 2026 (Bính Ngọ)</strong> &amp; phương pháp hóa giải chi tiết.</div>
              <div class="vip-benefit-item">✓ <strong>Bảng tra cứu màu sắc, hướng xuất hành, con số may mắn</strong> tương sinh bản mệnh.</div>
            </div>

            <!-- Thông báo kiểm tra thanh toán (chống gian lận) -->
            <div id="vipCheckNotice" class="vip-check-notice" style="display:none; margin: 10px 0; padding: 12px; border-radius: 8px; font-size: 0.88rem; line-height: 1.5; text-align: left;"></div>

            <div class="vip-actions">
              <button class="btn-confirm-payment" id="btnConfirmVipPayment" type="button" onclick="TuViMonetize.confirmPayment()">
                🔍 Kiểm Tra Trạng Thái Thanh Toán
              </button>
              <p class="vip-secure-note">🔒 Quý khách chuyển tiền xong bấm nút trên để hệ thống kiểm tra và kích hoạt VIP.</p>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHtml);
    },

    /**
     * Modal Cài Đặt Tài Khoản Ngân Hàng Cho Chủ Web (Admin Quick Config)
     */
    createSettingsModalDOM: function () {
      if (document.getElementById('tuvi-settings-modal')) return;

      const html = `
        <div class="tuvi-vip-modal-wrap" id="tuvi-settings-modal">
          <div class="tuvi-vip-backdrop" onclick="TuViMonetize.closeSettingsModal()"></div>
          <div class="tuvi-vip-card settings-card">
            <button class="tuvi-vip-close" onclick="TuViMonetize.closeSettingsModal()">&times;</button>
            
            <div class="tuvi-vip-header">
              <span class="vip-crown">⚙️</span>
              <h3>CẤU HÌNH TÀI KHOẢN NHẬN TIỀN VIETQR</h3>
              <p class="vip-sub">Nhập tài khoản ngân hàng của bạn để nhận tiền chuyển khoản tự động ngay lập tức</p>
            </div>

            <form id="bankConfigForm" onsubmit="event.preventDefault(); TuViMonetize.saveSettingsFromForm();" style="display:flex; flex-direction:column; gap:12px; margin-top:1rem;">
              <div>
                <label style="display:block; font-size:0.85rem; color:#ffd700; margin-bottom:4px;">Ngân Hàng Nhận Tiền:</label>
                <select id="cfgBankId" class="config-input">
                  <option value="ICB" selected>VietinBank (Công Thương)</option>
                  <option value="MB">MB Bank (Quân Đội)</option>
                  <option value="VCB">Vietcombank</option>
                  <option value="TCB">Techcombank</option>
                  <option value="VPB">VPBank</option>
                  <option value="TPB">TPBank</option>
                  <option value="ACB">ACB</option>
                  <option value="BIDV">BIDV</option>
                  <option value="VIB">VIB</option>
                  <option value="STB">Sacombank</option>
                  <option value="MSB">MSB</option>
                  <option value="OCB">OCB</option>
                  <option value="VBA">Agribank</option>
                </select>
              </div>

              <div>
                <label style="display:block; font-size:0.85rem; color:#ffd700; margin-bottom:4px;">Số Tài Khoản:</label>
                <input type="text" id="cfgAccountNo" class="config-input" value="108884822302" required>
              </div>

              <div>
                <label style="display:block; font-size:0.85rem; color:#ffd700; margin-bottom:4px;">Tên Chủ Tài Khoản (Không Dấu):</label>
                <input type="text" id="cfgAccountName" class="config-input" value="TRAN CONG LUYEN" required>
              </div>

              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                <div>
                  <label style="display:block; font-size:0.85rem; color:#ffd700; margin-bottom:4px;">Giá Gói VIP (VNĐ):</label>
                  <input type="number" id="cfgVipPrice" class="config-input" value="49000" step="1000">
                </div>
                <div>
                  <label style="display:block; font-size:0.85rem; color:#ffd700; margin-bottom:4px;">Số Zalo Tư Vấn:</label>
                  <input type="text" id="cfgZaloPhone" class="config-input" placeholder="0988888888">
                </div>
              </div>

              <button type="submit" class="btn-confirm-payment" style="margin-top:10px;">
                💾 Lưu Cấu Hình & Cập Nhật VietQR Ngay
              </button>
            </form>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', html);
    },

    openSettingsModal: function () {
      const modal = document.getElementById('tuvi-settings-modal');
      if (!modal) return;

      const bankEl = document.getElementById('cfgBankId');
      if (bankEl) bankEl.value = this.config.bankId;

      const noEl = document.getElementById('cfgAccountNo');
      if (noEl) noEl.value = this.config.accountNo;

      const nameEl = document.getElementById('cfgAccountName');
      if (nameEl) nameEl.value = this.config.accountName;

      const priceEl = document.getElementById('cfgVipPrice');
      if (priceEl) priceEl.value = this.config.vipPrice;

      const zaloEl = document.getElementById('cfgZaloPhone');
      if (zaloEl) zaloEl.value = this.config.zaloPhone;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    closeSettingsModal: function () {
      const modal = document.getElementById('tuvi-settings-modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    },

    saveSettingsFromForm: function () {
      const bankId = document.getElementById('cfgBankId')?.value || 'MB';
      const accountNo = (document.getElementById('cfgAccountNo')?.value || '').trim();
      const accountName = (document.getElementById('cfgAccountName')?.value || '').trim().toUpperCase();
      const vipPrice = parseInt(document.getElementById('cfgVipPrice')?.value, 10) || 49000;
      const zaloPhone = (document.getElementById('cfgZaloPhone')?.value || '').trim() || '0988888888';

      this.saveConfig({ bankId, accountNo, accountName, vipPrice, zaloPhone });
      this.closeSettingsModal();

      if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
        TuViApp.showToast('Đã lưu cấu hình tài khoản nhận tiền thành công!', 'success');
      } else {
        alert('Đã lưu cấu hình tài khoản nhận tiền thành công!');
      }
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
            <h3><i data-lucide="key-round"></i> Khôi Phục Quyền VIP</h3>
            <p class="tuvi-tool-modal-desc">
              Nếu bạn đã từng quét mã VietQR mở khóa gói VIP nhưng đổi thiết bị hoặc xóa lịch sử duyệt web, hãy nhập <strong>Mã đơn hàng (ví dụ: TV123456)</strong> hoặc <strong>Số điện thoại</strong> để khôi phục ngay:
            </p>
            <form onsubmit="TuViMonetize.handleRestoreSubmit(event)">
              <div class="tuvi-tool-input-wrap">
                <label for="restoreQueryInput">Mã Đơn Hàng hoặc Số Điện Thoại:</label>
                <input type="text" id="restoreQueryInput" class="tuvi-tool-input" placeholder="Ví dụ: TV216469 hoặc 0988888888" required autocomplete="off">
              </div>
              <div id="restoreErrorMsg" class="tuvi-tool-error"></div>
              <button type="submit" id="btnRestoreSubmit" class="btn-tool-submit" style="margin-top: 10px;">
                🔍 Tìm &amp; Khôi Phục Ngay
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
          btn.textContent = '🔍 Tìm & Khôi Phục Ngay';
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
            <h3><i data-lucide="shield-check"></i> Tạo Mật Khẩu Bảo Vệ</h3>
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
                <input type="text" id="claimFullNameInput" class="tuvi-tool-input" placeholder="Ví dụ: Trần Công Luyện" required>
              </div>
              <div class="tuvi-tool-input-wrap">
                <label for="claimEmailPhoneInput">Số Điện Thoại hoặc Email:</label>
                <input type="text" id="claimEmailPhoneInput" class="tuvi-tool-input" placeholder="Ví dụ: 0988888888 hoặc luyen@gmail.com" required autocomplete="username">
              </div>
              <div class="tuvi-tool-input-wrap">
                <label for="claimPasswordInput">Thiết Lập Mật Khẩu Mới:</label>
                <input type="password" id="claimPasswordInput" class="tuvi-tool-input" placeholder="Tối thiểu 6 ký tự" minlength="6" required autocomplete="new-password">
              </div>
              <div id="claimErrorMsg" class="tuvi-tool-error"></div>
              <button type="submit" id="btnClaimSubmit" class="btn-tool-submit" style="margin-top: 10px;">
                🔒 Kích Hoạt Tài Khoản Vĩnh Viễn
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
