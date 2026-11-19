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
      tripwirePrice: 29000,
      tripwireOriginalPrice: 99000,
      zaloPhone: ''
    },

    isVipUnlocked: false,
    isTripwireUnlocked: false,
    currentOrderId: '',
    vipAccessToken: '',
    vipOrderCode: '',
    activeChartKey: '',
    currentPackageName: 'Báo Cáo VIP A4 Toàn Thư',
    currentPackagePrice: 49000,

    getChartKey: function (laSoOrInput) {
      if (!laSoOrInput) return '';
      if (typeof laSoOrInput === 'string') return laSoOrInput;
      if (typeof TuViEngine !== 'undefined' && TuViEngine.getChartKey) {
        return TuViEngine.getChartKey(laSoOrInput);
      }
      var inp = laSoOrInput._input || laSoOrInput;
      var rawName = String(laSoOrInput.hoTen || inp.hoTen || '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
      var gStr = String(laSoOrInput.gioiTinh || inp.gioiTinh || 'nam').toLowerCase();
      var gender = (gStr.indexOf('n') !== -1 && !gStr.startsWith('nam') && !gStr.startsWith('1') && !gStr.startsWith('true')) ? 'nu' : 'nam';
      var d = parseInt(inp.ngay || laSoOrInput.ngaySinh || laSoOrInput.ngay || 1, 10);
      var m = parseInt(inp.thang || laSoOrInput.thangSinh || laSoOrInput.thang || 1, 10);
      var y = parseInt(inp.nam || laSoOrInput.namSinh || laSoOrInput.nam || 2000, 10);
      var g = parseInt(inp.gio !== undefined ? inp.gio : (inp.gioIndex !== undefined ? inp.gioIndex : 0), 10);
      var p = parseInt(inp.phut !== undefined ? inp.phut : 0, 10);
      var isL = (inp.isLunar === true || inp.loaiLich === 'am' || laSoOrInput.isLunar === true) ? 1 : 0;
      return 'laso_' + (rawName || 'vodanh') + '_' + gender + '_' + d + '_' + m + '_' + y + '_' + g + '_' + p + '_' + isL;
    },

    getUnlockedCharts: function () {
      try {
        var raw = localStorage.getItem('tvhh_unlocked_charts');
        return raw ? JSON.parse(raw) : {};
      } catch (e) {
        return {};
      }
    },

    saveUnlockedChart: function (chartKey, orderInfo) {
      if (!chartKey) return;
      try {
        var charts = this.getUnlockedCharts();
        charts[chartKey] = Object.assign({
          unlockedAt: new Date().toISOString()
        }, charts[chartKey] || {}, orderInfo || {});
        localStorage.setItem('tvhh_unlocked_charts', JSON.stringify(charts));
      } catch (e) {
        console.warn('Lỗi lưu lá số đã mở khóa:', e);
      }
    },

    getUnlockedChartInfo: function (laSoOrKey) {
      if (!laSoOrKey) return null;
      var key = typeof laSoOrKey === 'string' ? laSoOrKey : this.getChartKey(laSoOrKey);
      if (!key) return null;
      var charts = this.getUnlockedCharts();
      return charts[key] || null;
    },

    isChartUnlocked: function (laSoOrKey) {
      return Boolean(this.getUnlockedChartInfo(laSoOrKey));
    },

    /**
     * GÓI VIP TOÀN THƯ (49.000đ trở lên hoặc tên chứa 'Toàn Thư' / 'VIP' / '12 Cung'):
     * Mở khóa 100% toàn bộ 12 cung, toàn bộ Đại Hạn các thập niên, Tam Phương Tứ Chính,
     * Lưu Niên 2026–2027, Cố Vấn AI và nút Xuất File PDF A4 (TUYỆT ĐỐI không khóa 7 cung còn lại).
     */
    isChartVipToanThu: function (laSoOrKey) {
      var info = this.getUnlockedChartInfo(laSoOrKey);
      if (!info) return false;
      if (info.packageId === 'vip_49k' || info.packageId === 'vip_99k' || info.packageId === 'combo_99k' || info.packageId === 'vip_call' || info.packageId === 'deep_490k') return true;
      var name = String(info.packageName || '').toLowerCase();
      if (name.includes('toàn thư') || name.includes('12 cung') || name.includes('vip') || name.includes('chuyên gia') || name.includes('tham vấn')) return true;
      var amt = Number(info.amount || 0);
      if (amt >= 49000) return true;
      return false;
    },

    isChart99k: function (laSoOrKey) {
      // Giữ alias cho mọi chỗ gọi isChart99k: nay tương đương VIP Toàn Thư (>= 49.000đ)
      return this.isChartVipToanThu(laSoOrKey);
    },

    /**
     * GÓI 29K: Gói Xem Nhanh 3 Cung Tự Chọn (Chỉ mở 3 cung khách tự chọn, KHÔNG có Đại Hạn & Tam Phương)
     * Chỉ áp dụng giới hạn 3 cung khi khách mua gói nhỏ amount === 29000 (hoặc < 49000)
     */
    isChart29k: function (laSoOrKey) {
      var info = this.getUnlockedChartInfo(laSoOrKey);
      if (!info) return false;
      if (this.isChartVipToanThu(laSoOrKey)) return false; // VIP Toàn Thư được mở 100%, không bị giới hạn 3 cung
      if (info.packageId === 'quick_29k' || info.packageId === 'vip_29k') return true;
      if (info.is3Cung || info.isTripwire) return true;
      var amt = Number(info.amount || 0);
      return amt >= 20000 && amt < 49000;
    },

    isChart49k: function (laSoOrKey) {
      // Giữ alias tương thích ngược: các caller kiểm tra gói hạn chế 3 cung sẽ trỏ về isChart29k
      return this.isChart29k(laSoOrKey);
    },

    isChartVip: function (laSoOrKey) {
      return this.isChartVipToanThu(laSoOrKey);
    },

    isChartTripwire: function (laSoOrKey) {
      return this.isChart29k(laSoOrKey);
    },

    /**
     * Lấy danh sách key các cung mà khách đã chọn cho Gói 49k
     * Mệnh & Phụ Mẫu mặc định miễn phí, không chiếm slot.
     */
    getSelectedPalaces: function (laSoOrKey) {
      var info = this.getUnlockedChartInfo(laSoOrKey);
      if (!info) return [];
      if (Array.isArray(info.selectedPalaces)) {
        return info.selectedPalaces;
      }
      return [];
    },

    /**
     * Chuẩn hóa tên cung sang palace key
     */
    normalizePalaceKey: function (rawNameOrKey) {
      if (!rawNameOrKey) return '';
      var s = String(rawNameOrKey).toLowerCase().trim();
      if (s.indexOf('menh') !== -1 || s.indexOf('mệnh') !== -1) return 'menh';
      if (s.indexOf('phu-mau') !== -1 || s.indexOf('phụ mẫu') !== -1) return 'phu-mau';
      if (s.indexOf('phuc-duc') !== -1 || s.indexOf('phúc đức') !== -1) return 'phuc-duc';
      if (s.indexOf('dien-trach') !== -1 || s.indexOf('điền trạch') !== -1) return 'dien-trach';
      if (s.indexOf('quan-loc') !== -1 || s.indexOf('quan lộc') !== -1) return 'quan-loc';
      if (s.indexOf('no-boc') !== -1 || s.indexOf('nô bộc') !== -1) return 'no-boc';
      if (s.indexOf('thien-di') !== -1 || s.indexOf('thiên di') !== -1) return 'thien-di';
      if (s.indexOf('tat-ach') !== -1 || s.indexOf('tật ách') !== -1) return 'tat-ach';
      if (s.indexOf('tai-bach') !== -1 || s.indexOf('tài bạch') !== -1) return 'tai-bach';
      if (s.indexOf('tu-tuc') !== -1 || s.indexOf('tử tức') !== -1) return 'tu-tuc';
      if (s.indexOf('phu-the') !== -1 || s.indexOf('phu thê') !== -1 || s.indexOf('phối') !== -1) return 'phu-the';
      if (s.indexOf('huynh-de') !== -1 || s.indexOf('huynh đệ') !== -1) return 'huynh-de';
      return s;
    },

    /**
     * Tự chọn / Bỏ chọn 1 cung trong Gói 29k (Tối đa 3 cung tự chọn)
     */
    selectPalaceFor29k: function (rawNameOrKey, laSoOrKey) {
      var currentLaSo = (typeof laSoOrKey === 'object' && laSoOrKey) ? laSoOrKey : ((typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) ? TuViChart._currentLaSo : null);
      var key = this.getChartKey(laSoOrKey || currentLaSo);
      if (!key) return false;

      var info = this.getUnlockedChartInfo(key);
      if (!info) {
        if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast('Vui lòng kích hoạt Gói Xem Nhanh 3 Cung Tự Chọn (29.000đ) để bắt đầu chọn cung!', 'warning');
        }
        this.openVipModal('Gói Xem Nhanh 3 Cung', 29000);
        return false;
      }

      var palaceKey = this.normalizePalaceKey(rawNameOrKey);
      if (palaceKey === 'menh' || palaceKey === 'phu-mau') {
        if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast('Cung Mệnh và Phụ Mẫu đã được mở khóa MIỄN PHÍ sẵn, không tính vào 3 lượt chọn!', 'info');
        }
        return true;
      }

      var selected = Array.isArray(info.selectedPalaces) ? info.selectedPalaces.slice() : [];
      var idx = selected.indexOf(palaceKey);

      if (idx !== -1) {
        // Đã chọn -> Khóa cố định, KHÔNG cho phép bỏ chọn hay sửa đổi
        if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast('Cung này đã được chọn và khóa cố định theo gói 29k (không thể sửa đổi).', 'info');
        }
        return true;
      } else {
        // Chưa chọn -> Kiểm tra giới hạn 3 cung hoặc đã khóa
        if (selected.length >= 3 || info.palacesLocked) {
          if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
            TuViApp.showToast('Bạn đã chọn đủ 3 cung cho gói 29k (lựa chọn đã được khóa cố định, không thể sửa đổi)! Nâng cấp VIP Toàn Thư (49k) để mở trọn 12 cung.', 'warning');
          } else if (typeof alert !== 'undefined') {
            alert('Bạn đã chọn đủ 3 cung cho gói 29k và lựa chọn đã được khóa cố định!\nHãy nâng cấp VIP Toàn Thư (49.000đ) để mở toàn bộ 12 cung + Đại Hạn.');
          }
          this.openVipModal('Báo Cáo VIP A4 Toàn Thư', 49000);
          return false;
        }
        selected.push(palaceKey);
        info.selectedPalaces = selected;
        if (selected.length >= 3) {
          info.palacesLocked = true;
        }
        this.saveUnlockedChart(key, info);
        if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast(`Đã chọn thành công [${selected.length}/3 cung]! ${selected.length === 3 ? 'Đã đủ 3 cung và khóa cố định, 7 cung còn lại đã được khóa bảo mật.' : `Còn ${3 - selected.length} lượt chọn.`}`, 'success');
        }
      }

      // Re-render chart để cập nhật trạng thái mở/khóa các ô và accordion
      if (typeof TuViChart !== 'undefined' && currentLaSo) {
        TuViChart.render(currentLaSo);
      }
      return true;
    },

    selectPalaceFor49k: function (rawNameOrKey, laSoOrKey) {
      return this.selectPalaceFor29k(rawNameOrKey, laSoOrKey);
    },

    /**
     * Kiểm tra xem 1 cung cụ thể có được mở khóa toàn diện hay không
     */
    isPalaceUnlocked: function (rawPalaceNameOrKey, laSoOrKey) {
      var palaceKey = this.normalizePalaceKey(rawPalaceNameOrKey);
      // Cung Mệnh & Cung Phụ Mẫu luôn luôn miễn phí!
      if (palaceKey === 'menh' || palaceKey === 'phu-mau') {
        return true;
      }
      // Gói VIP Toàn Thư (>= 49.000đ): Mở khóa trọn bộ 12 cung
      if (this.isChartVipToanThu(laSoOrKey)) {
        return true;
      }
      // Gói Xem Nhanh 3 Cung (29k): Chỉ mở đúng 3 cung khách tự chọn
      if (this.isChart29k(laSoOrKey)) {
        var selected = this.getSelectedPalaces(laSoOrKey);
        return selected.includes(palaceKey);
      }
      return false;
    },

    /**
     * Luận giải Đại Hạn các thập niên (từ 6 đến 75+ tuổi)
     * Quyền lợi của Gói VIP Toàn Thư (>= 49k)
     */
    isDaiHanUnlocked: function (laSoOrKey) {
      return this.isChartVipToanThu(laSoOrKey);
    },

    /**
     * Phân tích ma trận Tam Phương Tứ Chính & Tứ Hóa Phi Tinh
     * Quyền lợi của Gói VIP Toàn Thư (>= 49k)
     */
    isTamPhuongUnlocked: function (laSoOrKey) {
      return this.isChartVipToanThu(laSoOrKey);
    },

    updateActiveChartStatus: function (laSo) {
      if (!laSo) return false;
      var key = this.getChartKey(laSo);
      var info = this.getUnlockedChartInfo(key);

      if (info) {
        var isVip = this.isChartVipToanThu(key);
        var isTripwire = this.isChart29k(key);
        this.isVipUnlocked = isVip;
        this.isTripwireUnlocked = isTripwire;
        this.vipOrderCode = info.orderCode || '';
        this.vipAccessToken = info.vipAccessToken || info.vipToken || '';
        this.activeChartKey = key;
        this.applyVipUI();
        return true;
      } else {
        this.isVipUnlocked = false;
        this.isTripwireUnlocked = false;
        this.vipOrderCode = '';
        this.vipAccessToken = '';
        this.activeChartKey = key;
        this.removeVipUI();
        return false;
      }
    },

    removeVipUI: function () {
      if (typeof document === 'undefined') return;
      document.body.classList.remove('vip-activated');
      var banner = document.getElementById('vipUnlockedBanner');
      if (banner) {
        banner.remove();
      }
      var floatBtn = document.getElementById('floatingVipCta');
      if (floatBtn) {
        floatBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>Mở Khóa VIP (49.000đ)</span>';
        floatBtn.onclick = () => TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư', 49000);
      }
      var vipBtns = document.querySelectorAll('.btn-action-vip');
      vipBtns.forEach(b => {
        b.classList.remove('unlocked');
        b.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Mở Khóa VIP (49.000đ)';
        b.onclick = () => TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư', 49000);
      });
      var toolbarVips = document.querySelectorAll('.btn-toolbar-vip');
      toolbarVips.forEach(b => {
        b.style.background = '';
        b.style.color = '';
        b.style.borderColor = '';
        b.style.fontWeight = '';
        b.onclick = () => TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư', 49000);
      });
      if (typeof TuViChart !== 'undefined' && TuViChart.initStickyBottomCta) {
        TuViChart.initStickyBottomCta(false);
      }
    },

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
        }).catch(() => { });
      } catch (e) { }
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
      } catch (e) { }
    },

    saveConfig: function (newConfig) {
      this.config = Object.assign(this.config, newConfig);
      try {
        localStorage.setItem('tvhh_bank_config', JSON.stringify(this.config));
      } catch (e) { }
    },

    checkVipStatus: async function () {
      try {
        // Dọn dẹp cờ mở khóa toàn cục cũ để đảm bảo mỗi lá số phải thanh toán độc lập
        try {
          localStorage.removeItem('tvhh_vip_unlocked');
          localStorage.removeItem('tvhh_tripwire_unlocked');
        } catch (e) { }

        // 1. Kiểm tra Magic Link trên URL (?vip_code=... hoặc ?vip_token=... hoặc ?order=...)
        if (typeof window !== 'undefined' && window.location && window.location.search) {
          const urlParams = new URLSearchParams(window.location.search);
          const magicToken = (urlParams.get('vip_code') || urlParams.get('code') || urlParams.get('order_code') || urlParams.get('vip_token') || urlParams.get('order') || '').trim();
          if (magicToken) {
            try {
              const res = await fetch(this.getApiUrl('/api/orders/verify-token?token=' + encodeURIComponent(magicToken)));
              if (res.ok) {
                const data = await res.json();
                if (data.success && data.isVip && data.order) {
                  this.unlockVIP(
                    data.order.orderCode,
                    data.order.vipAccessToken || data.order.orderCode,
                    data.order.amount,
                    data.order.packageId
                  );
                  const cKey = data.order.chartKey;
                  if (cKey) {
                    this.saveUnlockedChart(cKey, data.order);
                  }
                  if (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) {
                    this.updateActiveChartStatus(TuViChart._currentLaSo);
                    TuViChart.render(TuViChart._currentLaSo);
                  }
                  if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
                    TuViApp.showToast(`🎉 Chúc mừng! Báo Cáo VIP #${data.order.orderCode} đã được kích hoạt thành công!`, 'success');
                  }
                  return;
                }
              }
            } catch (err) {
              console.warn('Lỗi kiểm tra magic token URL:', err);
            }
          }
        }

        // 2. Kiểm tra token VIP đã lưu để cập nhật vào danh sách lá số đã mua
        const storedToken = localStorage.getItem('tvhh_vip_token') || localStorage.getItem('tvhh_vip_order_code');
        if (storedToken) {
          try {
            const res = await fetch(this.getApiUrl('/api/orders/verify-token?token=' + encodeURIComponent(storedToken)));
            if (res.ok) {
              const data = await res.json();
              if (data.success && data.isVip && data.order && data.order.chartKey) {
                this.saveUnlockedChart(data.order.chartKey, data.order);
              }
            }
          } catch (err) {
            console.warn('Lỗi kiểm tra stored VIP token:', err);
          }
        }

        // 3. Cập nhật quyền theo lá số hiện tại đang hiển thị
        if (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) {
          this.updateActiveChartStatus(TuViChart._currentLaSo);
        } else {
          this.isVipUnlocked = false;
          this.isTripwireUnlocked = false;
          this.vipOrderCode = '';
          this.vipAccessToken = '';
          this.removeVipUI();
        }

        // 4. Phục hồi và kích hoạt quét tự động nếu trước đó có đơn hàng đang chờ
        try {
          const pendingOrder = sessionStorage.getItem('tvhh_pending_order');
          if (pendingOrder && !this.isVipUnlocked) {
            this.currentOrderId = pendingOrder;
            this.startOrderPolling(pendingOrder);
          }
        } catch (e) { }

        // 5. Lắng nghe sự kiện khách quay lại tab (từ app ngân hàng hoặc màn hình khóa)
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
                .catch(() => { });
            }
          };

          document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') checkOnActive();
          });
          window.addEventListener('focus', checkOnActive);
          window.addEventListener('beforeprint', () => {
            const items = document.querySelectorAll('.accordion-item');
            items.forEach(it => {
              it.classList.add('open');
              const toggleIcon = it.querySelector('.toggle-icon');
              if (toggleIcon) toggleIcon.textContent = '▲';
              const btn = it.querySelector('.accordion-header');
              if (btn) btn.setAttribute('aria-expanded', 'true');
            });
            const bodies = document.querySelectorAll('.accordion-body');
            bodies.forEach(b => b.style.display = 'block');
          });
        }
      } catch (err) {
        console.warn('Lỗi checkVipStatus:', err);
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
      } catch (e) { }
      this.currentPackagePrice = (price && price > 0) ? price : this.config.vipPrice;

      this.currentOrderId = 'TV' + Math.floor(100000 + Math.random() * 900000);
      try {
        sessionStorage.setItem('tvhh_pending_order', this.currentOrderId);
        sessionStorage.setItem('tvhh_pending_price', String(this.currentPackagePrice));
      } catch (e) { }

      // Xác định lá số mục tiêu và chartKey để ràng buộc đơn hàng với lá số này
      const activeLaSo = (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) ? TuViChart._currentLaSo : null;
      const activeChartKey = activeLaSo ? this.getChartKey(activeLaSo) : '';
      if (activeChartKey) {
        try {
          sessionStorage.setItem('tvhh_pending_chart_key', activeChartKey);
        } catch (e) { }
      }

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
          chartKey: activeChartKey,
          chartInfo: activeLaSo ? {
            hoTen: activeLaSo.hoTen || (activeLaSo._input && activeLaSo._input.hoTen) || '',
            gioiTinh: activeLaSo.gioiTinh || (activeLaSo._input && activeLaSo._input.gioiTinh) || 'nam',
            ngay: (activeLaSo._input && activeLaSo._input.ngay) || activeLaSo.ngay,
            thang: (activeLaSo._input && activeLaSo._input.thang) || activeLaSo.thang,
            nam: (activeLaSo._input && activeLaSo._input.nam) || activeLaSo.nam,
            gio: (activeLaSo._input && activeLaSo._input.gio) !== undefined ? activeLaSo._input.gio : activeLaSo.gio,
            phut: (activeLaSo._input && activeLaSo._input.phut) !== undefined ? activeLaSo._input.phut : activeLaSo.phut,
            isLunar: Boolean(activeLaSo.isLunar || (activeLaSo._input && activeLaSo._input.isLunar))
          } : null,
          packageId: this.currentPackagePrice >= 400000 ? 'vip_call' : (this.currentPackagePrice >= 40000 ? 'vip_49k' : 'quick_29k'),
          packageName: this.currentPackageName,
          amount: this.currentPackagePrice,
          customerName: currentUser ? currentUser.fullName : (activeLaSo ? activeLaSo.hoTen : 'Đương Số VIP'),
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
            } catch (e) { }
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
      const activeLaSo = (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) ? TuViChart._currentLaSo : null;
      const activeChartKey = activeLaSo ? this.getChartKey(activeLaSo) : '';

      fetch(this.getApiUrl('/api/orders/create'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': 'Bearer ' + token } : {})
        },
        body: JSON.stringify({
          orderCode: this.currentOrderId,
          chartKey: activeChartKey,
          chartInfo: activeLaSo ? {
            hoTen: activeLaSo.hoTen || (activeLaSo._input && activeLaSo._input.hoTen) || '',
            gioiTinh: activeLaSo.gioiTinh || (activeLaSo._input && activeLaSo._input.gioiTinh) || 'nam',
            ngay: (activeLaSo._input && activeLaSo._input.ngay) || activeLaSo.ngay,
            thang: (activeLaSo._input && activeLaSo._input.thang) || activeLaSo.thang,
            nam: (activeLaSo._input && activeLaSo._input.nam) || activeLaSo.nam,
            gio: (activeLaSo._input && activeLaSo._input.gio) !== undefined ? activeLaSo._input.gio : activeLaSo.gio,
            phut: (activeLaSo._input && activeLaSo._input.phut) !== undefined ? activeLaSo._input.phut : activeLaSo.phut,
            isLunar: Boolean(activeLaSo.isLunar || (activeLaSo._input && activeLaSo._input.isLunar))
          } : null,
          packageId: this.currentPackagePrice >= 400000 ? 'vip_call' : (this.currentPackagePrice >= 40000 ? 'vip_49k' : 'quick_29k'),
          packageName: this.currentPackageName,
          amount: this.currentPackagePrice,
          customerName: currentUser ? currentUser.fullName : (activeLaSo ? activeLaSo.hoTen : 'Đương Số VIP'),
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
      } else {
        if (oldPriceEl) oldPriceEl.textContent = '199.000 đ';
        if (discountEl) discountEl.textContent = 'TIẾT KIỆM 67%';
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

      // Cập nhật danh sách quyền lợi thích ứng theo gói đang chọn
      const benefitsEl = document.querySelector('#tuvi-vip-modal .vip-benefits-list');
      if (benefitsEl) {
        if (this.currentPackagePrice <= 30000) {
          benefitsEl.innerHTML = `
            <div class="vip-benefit-item">
              <span class="benefit-icon-check">✓</span>
              <div class="benefit-content">
                <strong>Tự chọn 3 cung yêu thích</strong> luận giải chi tiết (sau khi chọn đủ 3 cung thì các cung còn lại tự động khóa).
              </div>
            </div>
            <div class="vip-benefit-item">
              <span class="benefit-icon-check">✓</span>
              <div class="benefit-content">
                <strong>Phân tích chi tiết chính tinh, cát tinh, sát tinh</strong> &amp; Đạo trị mệnh trong 3 cung đã chọn.
              </div>
            </div>
            <div class="vip-benefit-item">
              <span class="benefit-icon-check">✓</span>
              <div class="benefit-content">
                <strong>Tặng kèm miễn phí Cung Mệnh &amp; Cung Phụ Mẫu</strong> (không tính vào 3 lượt chọn).
              </div>
            </div>
            <div class="vip-benefit-item is-locked">
              <span class="benefit-icon-lock">✗</span>
              <div class="benefit-content">
                <span class="benefit-lock-tag">Khóa:</span> Không bao gồm Luận giải Đại Hạn các thập niên 6 – 75+ tuổi (thuộc Gói VIP Toàn Thư 49k).
              </div>
            </div>
            <div class="vip-benefit-item is-locked">
              <span class="benefit-icon-lock">✗</span>
              <div class="benefit-content">
                <span class="benefit-lock-tag">Khóa:</span> Không bao gồm Tam Phương Tứ Chính &amp; Tứ Hóa Phi Tinh (thuộc Gói VIP Toàn Thư 49k).
              </div>
            </div>
          `;
        } else {
          benefitsEl.innerHTML = `
            <div class="vip-benefit-item">
              <span class="benefit-icon-check">✓</span>
              <div class="benefit-content">
                <strong>Mở khóa toàn bộ 12 cung</strong> luận giải chi tiết (không che mờ).
              </div>
            </div>
            <div class="vip-benefit-item">
              <span class="benefit-icon-check">✓</span>
              <div class="benefit-content">
                <strong>Luận giải Đại Hạn các thập niên (từ 6 đến 75+ tuổi)</strong> &amp; Phương pháp Hóa giải vận hạn.
              </div>
            </div>
            <div class="vip-benefit-item">
              <span class="benefit-icon-check">✓</span>
              <div class="benefit-content">
                <strong>Phân tích Tam Phương Tứ Chính &amp; Tứ Hóa Phi Tinh</strong> (Lộc - Quyền - Khoa - Kỵ).
              </div>
            </div>
            <div class="vip-benefit-item">
              <span class="benefit-icon-check">✓</span>
              <div class="benefit-content">
                <strong>Xuất trọn bộ File PDF VIP A4</strong> đóng dấu mộc phong thủy lưu trữ trọn đời.
              </div>
            </div>
            <div class="vip-benefit-item">
              <span class="benefit-icon-check">✓</span>
              <div class="benefit-content">
                <strong>Tích hợp Cố Vấn Tử Vi AI</strong> giải đáp mở rộng mọi băn khoăn vận mệnh.
              </div>
            </div>
          `;
        }
      }

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
        } catch (e) { }
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
        try { window.history.back(); } catch (e) { }
      }

      if (this.isVipUnlocked || this.isTripwireUnlocked) {
        setTimeout(() => {
          const compVip = document.getElementById('compVipReportSection');
          if (compVip) {
            compVip.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
          const numVip = document.getElementById('numReportSection');
          if (numVip) {
            numVip.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
          const luanGiai = document.getElementById('luanGiaiSection') || document.querySelector('.luan-giai-section');
          if (luanGiai) {
            luanGiai.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
      }

      // NẾU CHƯA MỞ KHÓA VIP: KHÔNG TẮT HẲN POLLING!
      // Vẫn duy trì background watcher mỗi 3.5s để khi khách chuyển khoản xong ở app ngân hàng
      // hoặc đóng modal quay lại lá số thì hệ thống vẫn TỰ ĐỘNG BẬT MÀN HÌNH THÀNH CÔNG!
      // Lưu ý: isTripwireUnlocked (gói 49k) cũng coi như đã thanh toán - không cần poll nữa
      if (!this.isVipUnlocked && !this.isTripwireUnlocked && this.currentOrderId) {
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
          } catch (e) { }
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
      } catch (err) { }
    },

    onPaymentSuccess: function (data) {
      this.stopOrderPolling();
      const rawPkgId = (data && (data.packageId || (data.order && data.order.packageId))) || '';
      const displayAmount = Number((data && (data.amount || (data.order && data.order.amount))) || this.currentPackagePrice || 49000);
      const isFullVip = rawPkgId === 'vip_49k' || rawPkgId === 'vip_99k' || rawPkgId === 'combo_99k' || rawPkgId === 'vip_call' || rawPkgId === 'deep_490k' || displayAmount >= 49000;
      const packageId = isFullVip ? 'vip_49k' : 'quick_29k';
      const isTripwirePkg = !isFullVip;
      const is3Cung = !isFullVip;
      const packageName = (data && (data.packageName || (data.order && data.order.packageName))) || (isFullVip ? 'Báo Cáo VIP A4 Toàn Thư' : 'Gói Xem Nhanh 3 Cung Tự Chọn');
      const orderCode = (data && (data.orderCode || (data.order && data.order.orderCode))) || this.currentOrderId;
      const vipToken = (data && (data.vipToken || data.vipAccessToken || (data.order && data.order.vipAccessToken))) || 'vip_' + Date.now();

      // Xác định lá số tương ứng để mở khóa độc lập
      const currentChart = (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) ? TuViChart._currentLaSo : null;
      let targetChartKey = (data && (data.chartKey || (data.order && data.order.chartKey)));
      if (!targetChartKey) {
        try {
          targetChartKey = sessionStorage.getItem('tvhh_pending_chart_key');
        } catch (e) { }
      }
      if (!targetChartKey && currentChart) {
        targetChartKey = this.getChartKey(currentChart);
      }

      // Lưu quyền mở khóa RIÊNG BIỆT cho lá số này
      if (targetChartKey) {
        const existingInfo = this.getUnlockedChartInfo(targetChartKey) || {};
        this.saveUnlockedChart(targetChartKey, {
          orderCode: orderCode,
          vipAccessToken: vipToken,
          vipToken: vipToken,
          packageId: packageId,
          packageName: packageName,
          amount: displayAmount,
          isTripwire: isTripwirePkg,
          is3Cung: is3Cung,
          selectedPalaces: Array.isArray(existingInfo.selectedPalaces) ? existingInfo.selectedPalaces : [],
          unlockedAt: new Date().toISOString()
        });
      }

      // Cập nhật trạng thái theo lá số đang hiển thị
      if (currentChart) {
        this.updateActiveChartStatus(currentChart);
      } else {
        this.isVipUnlocked = isFullVip;
        this.isTripwireUnlocked = !isFullVip;
        this.vipOrderCode = orderCode;
        this.vipAccessToken = vipToken;
      }

      localStorage.setItem('tvhh_vip_order_code', orderCode);
      localStorage.setItem('tvhh_vip_token', vipToken);
      this.saveCodeToHistory(orderCode, {
        packageName: packageName,
        packageId: packageId,
        amount: displayAmount,
        chartKey: targetChartKey,
        unlockedAt: new Date().toISOString()
      });
      try {
        sessionStorage.removeItem('tvhh_pending_order');
        sessionStorage.removeItem('tvhh_pending_chart_key');
      } catch (e) { }

      // Mở khóa UI ở trang phía sau
      if (this.isVipUnlocked) {
        this.applyVipUI();
      }
      if (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) {
        TuViChart.render(TuViChart._currentLaSo);
      }
      if (typeof TuViNumerology !== 'undefined' && TuViNumerology._lastParams) {
        TuViNumerology.renderResult(TuViNumerology._lastParams.fullName, TuViNumerology._lastParams.birthDate);
      }
      if (typeof TuViCompatibility !== 'undefined' && typeof TuViCompatibility.renderResult === 'function') {
        TuViCompatibility.renderResult();
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

          // Rung nhẹ haptic trên điện thoại di động
          try {
            if (navigator && navigator.vibrate) navigator.vibrate([100, 50, 150]);
          } catch (e) { }

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
          } catch (e) { }

          if (isTripwirePkg) {
            // ========================================================
            // GÓI 49K: HIỆN MÀN HÌNH CHỌN 3 CUNG NGAY SAU THANH TOÁN
            // ========================================================
            this._palace49kChartKey = targetChartKey;
            this._palace49kSelectedTemp = [];
            const SELECTABLE = [
              { key: 'tai-bach', name: 'Tài Bạch', icon: '💰', desc: 'Tiền tài, thu nhập, đầu tư' },
              { key: 'quan-loc', name: 'Quan Lộc', icon: '💼', desc: 'Sự nghiệp, chức vụ, danh vọng' },
              { key: 'phu-the', name: 'Phu Thê', icon: '💍', desc: 'Hôn nhân, tình duyên, vợ chồng' },
              { key: 'phuc-duc', name: 'Phúc Đức', icon: '🌟', desc: 'Phúc phận, tổ tiên, may mắn' },
              { key: 'dien-trach', name: 'Điền Trạch', icon: '🏡', desc: 'Nhà cửa, bất động sản' },
              { key: 'tu-tuc', name: 'Tử Tức', icon: '👶', desc: 'Con cái, học trò, sáng tạo' },
              { key: 'thien-di', name: 'Thiên Di', icon: '✈️', desc: 'Xuất ngoại, di chuyển, giao du' },
              { key: 'tat-ach', name: 'Tật Ách', icon: '🏥', desc: 'Sức khoẻ, tai nạn, bệnh tật' },
              { key: 'no-boc', name: 'Nô Bộc', icon: '🤝', desc: 'Nhân viên, bạn bè, quan hệ' },
              { key: 'huynh-de', name: 'Huynh Đệ', icon: '👥', desc: 'Anh chị em, đồng liêu, đối tác' }
            ];

            const palaceRowsHtml = SELECTABLE.map(p => `
              <label class="palace-select-row" id="psrow-${p.key}" style="display:flex; align-items:center; gap:12px; padding:10px 14px; border:1.5px solid #E5D9B6; border-radius:8px; cursor:pointer; background:#FFFDF8; transition:all 0.15s; margin-bottom:0;">
                <input type="checkbox" class="palace-select-cb" value="${p.key}" style="width:18px; height:18px; accent-color:#991B1B; cursor:pointer; flex-shrink:0;" onchange="TuViMonetize._on49kCheckboxChange(this)">
                <span style="font-size:1.3rem; line-height:1; flex-shrink:0;">${p.icon}</span>
                <span style="flex:1; min-width:0;">
                  <strong style="display:block; color:#1F2937; font-size:0.95rem;">${p.name}</strong>
                  <span style="font-size:0.8rem; color:#6B7280;">${p.desc}</span>
                </span>
                <span class="psrow-check" style="display:none; color:#059669; font-weight:700; font-size:1.1rem; flex-shrink:0;">✓</span>
              </label>
            `).join('');

            card.innerHTML = `
              <button class="tuvi-vip-close" type="button" aria-label="Đóng" onclick="TuViMonetize.closeVipModal()">&times;</button>
              <div class="vip-palace-selector-container" style="padding: 0.5rem 0.25rem;">

                <!-- Header xác nhận thanh toán -->
                <div style="text-align:center; margin-bottom:1.25rem;">
                  <div style="display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:50%; background:#ECFDF5; margin-bottom:0.6rem;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <h2 style="margin:0 0 0.3rem; font-size:1.15rem; color:#991B1B; font-family:var(--font-heading,serif); font-weight:700;">✅ Thanh Toán 29.000đ Thành Công!</h2>
                  <p style="margin:0; font-size:0.86rem; color:#6B7280;">Mã đơn: <strong style="color:#1F2937;">#${orderCode}</strong></p>
                </div>

                <!-- Hướng dẫn chọn cung -->
                <div style="background:linear-gradient(135deg,#FFF7ED,#FEF3C7); border:1.5px solid #D4AF37; border-radius:10px; padding:12px 14px; margin-bottom:1rem;">
                  <p style="margin:0 0 4px; font-weight:700; color:#92400E; font-size:0.95rem;">📋 Bước tiếp theo: Chọn 3 cung bạn muốn xem</p>
                  <p style="margin:0; font-size:0.84rem; color:#78350F; line-height:1.5;">Cung <strong>Mệnh</strong> &amp; <strong>Phụ Mẫu</strong> đã được mở miễn phí. Tick vào đúng 3 cung bạn quan tâm nhất rồi bấm <strong>Xác Nhận</strong> để mở khóa.</p>
                </div>

                <!-- Bộ đếm đã chọn -->
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                  <span style="font-size:0.88rem; color:#1F2937; font-weight:600;">Chọn cung để mở khóa:</span>
                  <span id="palace49kCounter" style="background:#991B1B; color:#fff; font-size:0.82rem; font-weight:700; padding:3px 12px; border-radius:9999px;">ĐÃ CHỌN: 0/3</span>
                </div>

                <!-- Danh sách 10 cung có thể chọn -->
                <div id="palace49kList" style="display:flex; flex-direction:column; gap:8px; max-height:340px; overflow-y:auto; padding-right:2px; margin-bottom:1rem;">
                  ${palaceRowsHtml}
                </div>

                <!-- Nút xác nhận -->
                <button type="button" id="palace49kConfirmBtn"
                  style="width:100%; padding:12px 16px; font-size:1rem; font-weight:700; background:#E5E7EB; color:#9CA3AF; border:none; border-radius:8px; cursor:not-allowed; transition:all 0.2s;"
                  disabled
                  onclick="TuViMonetize.confirmPalaceSelection49k()">
                  Vui lòng chọn đủ 3 cung để xác nhận
                </button>

                <p style="text-align:center; margin:0.75rem 0 0; font-size:0.8rem; color:#9CA3AF;">
                  Sau khi xác nhận, lựa chọn sẽ được <strong>khóa cố định</strong> và 7 cung còn lại sẽ được ẩn.
                </p>
              </div>
            `;

            if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
              TuViApp.showToast('🎉 Thanh toán 29k thành công! Hãy chọn 3 cung bạn muốn xem.', 'success');
            }

          } else {
            // ========================================================
            // GÓI VIP TOÀN THƯ (>= 49K): MÀN HÌNH SUCCESS THÔNG THƯỜNG
            // ========================================================
            const successMagicLink = this.getMagicLink(orderCode);
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

                <!-- KHỐI LƯU MÃ & MAGIC LINK XEM LẠI TRỌN ĐỜI -->
                <div style="background:rgba(212,175,55,0.08); border:1.5px dashed #d4af37; border-radius:10px; padding:12px 14px; margin:1rem 0; text-align:left;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <span style="font-size:0.86rem; color:#d4af37; font-weight:700;">💾 Mã &amp; Magic Link Xem Lại:</span>
                    <span style="font-size:0.75rem; color:#10b981; font-weight:600;">✓ Đã lưu trên máy này</span>
                  </div>
                  <div style="display:flex; gap:6px; margin-bottom:8px; flex-wrap:wrap;">
                    <input type="text" value="${successMagicLink}" readonly style="flex:1; min-width:180px; font-size:0.82rem; padding:6px 8px; background:#14112c; color:#93c5fd; border:1px solid rgba(212,175,55,0.3); border-radius:6px; font-family:monospace;" onclick="this.select()">
                    <button type="button" onclick="TuViMonetize.copyMagicLink('${orderCode}')" style="background:linear-gradient(135deg, #d4af37 0%, #f59e0b 100%); color:#14112c; font-weight:700; font-size:0.78rem; padding:6px 12px; border:none; border-radius:6px; cursor:pointer; white-space:nowrap;">
                      📋 Chép Link
                    </button>
                    <button type="button" onclick="TuViMonetize.copyVipCode('${orderCode}')" style="background:rgba(255,255,255,0.12); color:#fff; font-size:0.78rem; padding:6px 10px; border:1px solid rgba(255,255,255,0.25); border-radius:6px; cursor:pointer; white-space:nowrap;">
                      📋 Chép Mã
                    </button>
                  </div>
                  <p style="font-size:0.76rem; color:var(--text-muted, #9ca3af); margin:0; line-height:1.45;">
                    📌 <em>Mẹo: Hãy bấm <strong>"Chép Link"</strong> gửi vào tin nhắn Zalo hoặc Ghi chú để mở lại bản luận giải trên điện thoại hoặc máy tính khác bất cứ lúc nào!</em>
                  </p>
                </div>

                <div class="vip-success-meta" style="margin-bottom:1rem;">
                  <span>Mã đơn: <strong style="color:var(--gold-light, #d4af37); font-size:1.05rem; letter-spacing:0.5px;">#${orderCode}</strong></span>
                  <span>•</span>
                  <span>Thời gian: <strong>${new Date().toLocaleTimeString('vi-VN')}</strong></span>
                </div>
                <button type="button" class="btn-seal btn-success-dismiss" style="width:100%; font-size:1rem; padding:0.85rem; font-weight:700;" onclick="TuViMonetize.closeVipModal();">
                  ✨ Xem Ngay Bản Luận Giải Đầy Đủ
                </button>
                <p class="vip-auto-close-countdown" style="margin-top:0.75rem;">Cửa sổ sẽ tự động đóng sau <strong id="vipSuccessCountdown">15</strong> giây...</p>
              </div>
            `;

            // Đếm ngược 15 giây tự động đóng modal (để khách có đủ thời gian đọc và chép link)
            let secondsLeft = 15;
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

            if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
              TuViApp.showToast('🎉 Thanh toán thành công! Toàn bộ 12 cung & PDF đã được mở khóa.', 'success');
            }
          }
        }
      } else {
        this.closeVipModal();
      }
    },

    /**
     * Callback khi khách tick / bỏ tick 1 cung trong màn hình chọn cung 49k
     */
    _on49kCheckboxChange: function (checkbox) {
      const MAX = 3;
      const list = document.getElementById('palace49kList');
      if (!list) return;
      const allCbs = list.querySelectorAll('.palace-select-cb');
      const checked = Array.from(allCbs).filter(cb => cb.checked);
      const count = checked.length;

      // Cập nhật style từng hàng
      allCbs.forEach(cb => {
        const row = cb.closest('.palace-select-row');
        const checkMark = row && row.querySelector('.psrow-check');
        if (cb.checked) {
          if (row) {
            row.style.background = '#ECFDF5';
            row.style.borderColor = '#059669';
            row.style.boxShadow = '0 2px 8px rgba(5,150,105,0.15)';
          }
          if (checkMark) checkMark.style.display = 'block';
        } else {
          if (row) {
            if (count >= MAX && !cb.checked) {
              // disabled các ô chưa chọn khi đủ 3
              row.style.background = '#F9FAFB';
              row.style.borderColor = '#E5E7EB';
              row.style.opacity = '0.6';
              cb.disabled = true;
            } else {
              row.style.background = '#FFFDF8';
              row.style.borderColor = '#E5D9B6';
              row.style.opacity = '1';
              cb.disabled = false;
            }
          }
          if (checkMark) checkMark.style.display = 'none';
        }
      });

      // Cập nhật counter
      const counter = document.getElementById('palace49kCounter');
      if (counter) {
        counter.textContent = `ĐÃ CHỌN: ${count}/3`;
        counter.style.background = count === MAX ? '#059669' : '#991B1B';
      }

      // Cập nhật nút xác nhận
      const confirmBtn = document.getElementById('palace49kConfirmBtn');
      if (confirmBtn) {
        if (count === MAX) {
          confirmBtn.disabled = false;
          confirmBtn.style.background = 'linear-gradient(135deg, #B91C1C 0%, #881337 100%)';
          confirmBtn.style.color = '#FFFFFF';
          confirmBtn.style.cursor = 'pointer';
          confirmBtn.style.border = '1px solid #D4AF37';
          confirmBtn.style.boxShadow = '0 4px 14px rgba(185,28,28,0.35)';
          confirmBtn.textContent = '✅ Xác Nhận Mở Khóa 3 Cung Đã Chọn';
        } else {
          confirmBtn.disabled = true;
          confirmBtn.style.background = '#E5E7EB';
          confirmBtn.style.color = '#9CA3AF';
          confirmBtn.style.cursor = 'not-allowed';
          confirmBtn.style.border = 'none';
          confirmBtn.style.boxShadow = 'none';
          confirmBtn.textContent = `Vui lòng chọn đủ 3 cung (còn thiếu ${MAX - count})`;
        }
      }

      // Lưu tạm vào biến internal
      this._palace49kSelectedTemp = checked.map(cb => cb.value);
    },

    /**
     * Xác nhận lựa chọn 3 cung cho gói 49k và mở khóa chính thức
     */
    confirmPalaceSelection49k: function () {
      const selected = this._palace49kSelectedTemp || [];
      if (selected.length !== 3) {
        if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast('Vui lòng tick đúng 3 cung trước khi xác nhận!', 'warning');
        }
        return;
      }

      const chartKey = this._palace49kChartKey || this.activeChartKey || '';
      if (chartKey) {
        const info = this.getUnlockedChartInfo(chartKey) || {};
        info.selectedPalaces = selected.slice();
        info.palacesLocked = true;
        this.saveUnlockedChart(chartKey, info);
      }

      // Cập nhật trạng thái
      if (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) {
        this.updateActiveChartStatus(TuViChart._currentLaSo);
        TuViChart.render(TuViChart._currentLaSo);
      }

      this.applyVipUI();

      // Đóng modal và scroll xuống phần luận giải
      this.closeVipModal();

      if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
        const PALACE_NAMES = {
          'tai-bach': 'Tài Bạch', 'quan-loc': 'Quan Lộc', 'phu-the': 'Phu Thê',
          'phuc-duc': 'Phúc Đức', 'dien-trach': 'Điền Trạch', 'tu-tuc': 'Tử Tức',
          'thien-di': 'Thiên Di', 'tat-ach': 'Tật Ách', 'no-boc': 'Nô Bộc', 'huynh-de': 'Huynh Đệ'
        };
        const names = selected.map(k => PALACE_NAMES[k] || k).join(', ');
        TuViApp.showToast(`🔓 Đã mở khóa thành công: Mệnh, Phụ Mẫu và ${names}!`, 'success');
      }

      // Reset biến tạm
      this._palace49kSelectedTemp = [];
      this._palace49kChartKey = null;
    },

    /**
     * Mở modal chọn 3 cung dạng bảng tick chọn cho gói 49k bất cứ lúc nào
     */
    openPalaceSelectorModal: function (customChartKey) {
      let modal = document.getElementById('tuvi-vip-modal');
      if (!modal) {
        this.createVipModalDOM();
        modal = document.getElementById('tuvi-vip-modal');
      }
      if (!modal) return;

      const currentChart = (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) ? TuViChart._currentLaSo : null;
      const targetKey = customChartKey || (currentChart ? this.getChartKey(currentChart) : (this.activeChartKey || ''));
      if (!targetKey) {
        if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast('Vui lòng lập lá số trước khi chọn cung!', 'warning');
        }
        return;
      }

      const info = this.getUnlockedChartInfo(targetKey) || {};
      const orderCode = info.orderCode || this.vipOrderCode || localStorage.getItem('tvhh_vip_order_code') || 'VIP29K';
      const currentSelected = Array.isArray(info.selectedPalaces) ? info.selectedPalaces : [];

      if (currentSelected.length >= 3 || info.palacesLocked) {
        if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast('Bạn đã chọn đủ 3 cung và lựa chọn đã được khóa cố định (không thể sửa đổi)! Vui lòng nâng cấp VIP Toàn Thư (49k) để xem cả 12 cung.', 'info');
        }
        this.openVipModal('Báo Cáo VIP A4 Toàn Thư', 49000);
        return;
      }

      this._palace49kChartKey = targetKey;
      this._palace49kSelectedTemp = currentSelected.slice();

      const SELECTABLE = [
        { key: 'tai-bach',  name: 'Tài Bạch',  icon: '💰', desc: 'Tiền tài, thu nhập, đầu tư' },
        { key: 'quan-loc',  name: 'Quan Lộc',  icon: '💼', desc: 'Sự nghiệp, chức vụ, danh vọng' },
        { key: 'phu-the',   name: 'Phu Thê',   icon: '💍', desc: 'Hôn nhân, tình duyên, vợ chồng' },
        { key: 'phuc-duc',  name: 'Phúc Đức',  icon: '🌟', desc: 'Phúc phận, tổ tiên, may mắn' },
        { key: 'dien-trach',name: 'Điền Trạch', icon: '🏡', desc: 'Nhà cửa, bất động sản' },
        { key: 'tu-tuc',    name: 'Tử Tức',    icon: '👶', desc: 'Con cái, học trò, sáng tạo' },
        { key: 'thien-di',  name: 'Thiên Di',  icon: '✈️', desc: 'Xuất ngoại, di chuyển, giao du' },
        { key: 'tat-ach',   name: 'Tật Ách',   icon: '🏥', desc: 'Sức khoẻ, tai nạn, bệnh tật' },
        { key: 'no-boc',    name: 'Nô Bộc',    icon: '🤝', desc: 'Nhân viên, bạn bè, quan hệ' },
        { key: 'huynh-de',  name: 'Huynh Đệ',  icon: '👥', desc: 'Anh chị em, đồng liêu, đối tác' }
      ];

      const palaceRowsHtml = SELECTABLE.map(p => {
        const isChecked = currentSelected.includes(p.key);
        return `
          <label class="palace-select-row ${isChecked ? 'checked-row' : ''}" id="psrow-${p.key}" style="display:flex; align-items:center; gap:12px; padding:10px 14px; border:1.5px solid ${isChecked ? '#059669' : '#E5D9B6'}; border-radius:8px; cursor:${isChecked ? 'default' : 'pointer'}; background:${isChecked ? '#ECFDF5' : '#FFFDF8'}; transition:all 0.15s; margin-bottom:0;">
            <input type="checkbox" class="palace-select-cb" value="${p.key}" ${isChecked ? 'checked disabled' : ''} style="width:18px; height:18px; accent-color:#059669; cursor:${isChecked ? 'default' : 'pointer'}; flex-shrink:0;" onchange="TuViMonetize._on49kCheckboxChange(this)">
            <span style="font-size:1.3rem; line-height:1; flex-shrink:0;">${p.icon}</span>
            <span style="flex:1; min-width:0;">
              <strong style="display:block; color:#1F2937; font-size:0.95rem;">${p.name} ${isChecked ? '<span style="font-size:0.75rem; color:#059669; font-weight:700;">(Đã chọn &amp; Khóa cố định)</span>' : ''}</strong>
              <span style="font-size:0.8rem; color:#6B7280;">${p.desc}</span>
            </span>
            <span class="psrow-check" style="display:${isChecked ? 'block' : 'none'}; color:#059669; font-weight:700; font-size:1.1rem; flex-shrink:0;">✓</span>
          </label>
        `;
      }).join('');

      const card = modal.querySelector('.tuvi-vip-card');
      if (card) {
        card.innerHTML = `
          <button class="tuvi-vip-close" type="button" aria-label="Đóng" onclick="TuViMonetize.closeVipModal()">&times;</button>
          <div class="vip-palace-selector-container" style="padding: 0.5rem 0.25rem;">
            <!-- Header -->
            <div style="text-align:center; margin-bottom:1.25rem;">
              <div style="display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:50%; background:#ECFDF5; margin-bottom:0.6rem;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2 style="margin:0 0 0.3rem; font-size:1.15rem; color:#991B1B; font-family:var(--font-heading,serif); font-weight:700;">✅ Bảng Chọn 3 Cung (Gói 29.000đ)</h2>
              <p style="margin:0; font-size:0.86rem; color:#6B7280;">Mã đơn: <strong style="color:#1F2937;">#${orderCode}</strong></p>
            </div>

            <!-- Hướng dẫn chọn cung -->
            <div style="background:linear-gradient(135deg,#FFF7ED,#FEF3C7); border:1.5px solid #D4AF37; border-radius:10px; padding:12px 14px; margin-bottom:1rem;">
              <p style="margin:0 0 4px; font-weight:700; color:#92400E; font-size:0.95rem;">📋 Chọn 3 cung bạn quan tâm nhất</p>
              <p style="margin:0; font-size:0.84rem; color:#78350F; line-height:1.5;">Cung <strong>Mệnh</strong> &amp; <strong>Phụ Mẫu</strong> đã được mở MIỄN PHÍ sẵn. Tick đúng 3 cung rồi bấm <strong>Xác Nhận</strong> để mở khóa luận giải chi tiết.</p>
            </div>

            <!-- Bộ đếm đã chọn -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
              <span style="font-size:0.88rem; color:#1F2937; font-weight:600;">Chọn cung để mở khóa:</span>
              <span id="palace49kCounter" style="background:${currentSelected.length === 3 ? '#059669' : '#991B1B'}; color:#fff; font-size:0.82rem; font-weight:700; padding:3px 12px; border-radius:9999px;">ĐÃ CHỌN: ${currentSelected.length}/3</span>
            </div>

            <!-- Danh sách 10 cung có thể chọn -->
            <div id="palace49kList" style="display:flex; flex-direction:column; gap:8px; max-height:340px; overflow-y:auto; padding-right:2px; margin-bottom:1rem;">
              ${palaceRowsHtml}
            </div>

            <!-- Nút xác nhận -->
            <button type="button" id="palace49kConfirmBtn"
              style="width:100%; padding:12px 16px; font-size:1rem; font-weight:700; ${currentSelected.length === 3 ? 'background:linear-gradient(135deg, #B91C1C 0%, #881337 100%); color:#FFFFFF; cursor:pointer; border:1px solid #D4AF37; box-shadow:0 4px 14px rgba(185,28,28,0.35);' : 'background:#E5E7EB; color:#9CA3AF; cursor:not-allowed; border:none; box-shadow:none;'}"
              ${currentSelected.length === 3 ? '' : 'disabled'}
              onclick="TuViMonetize.confirmPalaceSelection49k()">
              ${currentSelected.length === 3 ? '✅ Xác Nhận Mở Khóa 3 Cung Đã Chọn' : `Vui lòng chọn đủ 3 cung (còn thiếu ${3 - currentSelected.length})`}
            </button>

            <p style="text-align:center; margin:0.75rem 0 0; font-size:0.8rem; color:#9CA3AF;">
              Sau khi xác nhận, 3 cung này sẽ được <strong>khóa cố định vĩnh viễn (không thể sửa đổi)</strong> và 7 cung còn lại sẽ được bảo mật.
            </p>
          </div>
        `;
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    applyVipUI: function () {
      const currentChart = (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) ? TuViChart._currentLaSo : null;
      const chartKey = currentChart ? this.getChartKey(currentChart) : (this.activeChartKey || '');
      const isVip = this.isChartVipToanThu(chartKey);
      const isTripwire = this.isChart29k(chartKey);

      if (!isVip && !isTripwire && !this.isVipUnlocked && !this.isTripwireUnlocked) {
        return;
      }

      const vipBtns = document.querySelectorAll('.btn-action-vip');
      vipBtns.forEach(b => {
        if (isVip || this.isVipUnlocked) {
          b.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Xuất File PDF VIP (Đã Kích Hoạt)';
          b.classList.add('unlocked');
          b.onclick = () => TuViMonetize.printVipReport();
        } else {
          b.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Nâng Cấp VIP Toàn Thư (49.000đ)';
          b.classList.remove('unlocked');
          b.onclick = () => TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư', 49000);
        }
      });

      const toolbarVips = document.querySelectorAll('.btn-toolbar-vip');
      toolbarVips.forEach(b => {
        if (isVip || this.isVipUnlocked) {
          b.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:5px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>📥 Xuất Báo Cáo VIP A4';
          b.style.background = '#10b981';
          b.style.color = '#ffffff';
          b.style.borderColor = '#10b981';
          b.style.fontWeight = '700';
          b.onclick = () => TuViMonetize.printVipReport();
        } else {
          b.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:5px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>👑 Lên VIP Toàn Thư 49k';
          b.style.background = '#8F1D14';
          b.style.color = '#FFE6A3';
          b.style.borderColor = '#C29B38';
          b.style.fontWeight = '700';
          b.onclick = () => TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư', 49000);
        }
      });

      // Mở khóa toàn bộ nhãn VIP
      document.body.classList.add('vip-activated');
      const floatBtn = document.getElementById('floatingVipCta');
      if (floatBtn) {
        if (isVip || this.isVipUnlocked) {
          floatBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>Xuất Báo Cáo VIP A4</span>';
          floatBtn.onclick = () => TuViMonetize.printVipReport();
        } else {
          floatBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>Nâng Cấp VIP (49.000đ)</span>';
          floatBtn.onclick = () => TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư', 49000);
        }
      }

      this.renderVipUnlockedBanner();

      if (typeof TuViCompatibility !== 'undefined' && typeof TuViCompatibility.renderResult === 'function') {
        TuViCompatibility.renderResult();
      }
    },

    renderVipUnlockedBanner: function () {
      if (typeof document === 'undefined' || !document.querySelector) return;
      const currentChart = (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) ? TuViChart._currentLaSo : null;
      const chartKey = currentChart ? this.getChartKey(currentChart) : (this.activeChartKey || '');
      const isVip = this.isChartVipToanThu(chartKey);
      const isTripwire = this.isChart29k(chartKey);

      if (!isVip && !isTripwire && !this.isVipUnlocked && !this.isTripwireUnlocked) return;

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

      if (isVip || this.isVipUnlocked) {
        // GÓI VIP TOÀN THƯ (>= 49K): TOÀN BỘ 12 CUNG & ĐẠI HẠN
        banner.innerHTML = `
          <div class="vip-banner-inner" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
            <div class="vip-banner-headline" style="display:flex; align-items:center; gap:0.85rem;">
              <div class="vip-banner-crown" style="width:44px; height:44px; border-radius:50%; background:radial-gradient(circle, #FFE6A3, #D4AF37, #A67C1A); color:#0B0A1A; display:flex; align-items:center; justify-content:center; font-size:1.4rem; box-shadow:0 0 15px rgba(212, 175, 55, 0.5); flex-shrink:0;">👑</div>
              <div class="vip-banner-text-group">
                <h3 style="color:#FFE6A3 !important; font-family:var(--font-heading, serif); font-size:1.22rem; font-weight:700; margin:0 0 0.25rem 0; text-shadow:0 2px 4px rgba(0,0,0,0.8); letter-spacing:0.4px;">
                  QUYỀN LỢI VIP ĐÃ KÍCH HOẠT · TRỌN BỘ 12 CUNG &amp; ĐẠI HẠN
                </h3>
                <p style="color:#F3ECDD !important; font-size:0.92rem; margin:0; line-height:1.5;">
                  Mã đơn hàng: <strong style="color:#FFD56B !important; font-weight:800; letter-spacing:0.5px;">#${orderDisplay}</strong> — Bạn đang xem phiên bản VIP Toàn Thư 12 Cung &amp; Đại Hạn không giới hạn.
                </p>
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
      } else {
        // GÓI 29K: 3 CUNG TỰ CHỌN
        const selected = this.getSelectedPalaces(chartKey);
        banner.innerHTML = `
          <div class="vip-banner-inner" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
            <div class="vip-banner-headline" style="display:flex; align-items:center; gap:0.85rem;">
              <div class="vip-banner-crown" style="width:44px; height:44px; border-radius:50%; background:radial-gradient(circle, #FFE6A3, #C29B38, #8F6B00); color:#0B0A1A; display:flex; align-items:center; justify-content:center; font-size:1.4rem; box-shadow:0 0 15px rgba(212, 175, 55, 0.4); flex-shrink:0;">✨</div>
              <div class="vip-banner-text-group">
                <h3 style="color:#FFE6A3 !important; font-family:var(--font-heading, serif); font-size:1.18rem; font-weight:700; margin:0 0 0.25rem 0; text-shadow:0 2px 4px rgba(0,0,0,0.8); letter-spacing:0.4px;">
                  GÓI 29K ĐÃ KÍCH HOẠT · TỰ CHỌN 3 CUNG [${selected.length === 3 ? '🔒 ĐÃ KHÓA CỐ ĐỊNH 3/3 CUNG' : `ĐÃ CHỌN: ${selected.length}/3`}]
                </h3>
                <p style="color:#F3ECDD !important; font-size:0.92rem; margin:0; line-height:1.5;">
                  Mã đơn hàng: <strong style="color:#FFD56B !important; font-weight:800; letter-spacing:0.5px;">#${orderDisplay}</strong> — ${selected.length === 3 ? 'Bạn đã chọn đủ 3 cung trọng tâm và lựa chọn đã được khóa cố định (không thể sửa đổi). 7 cung còn lại đã được khóa bảo mật.' : 'Bạn có quyền tự chọn 3 cung yêu thích. Sau khi chọn đủ 3 cung thì lựa chọn sẽ được khóa cố định.'}
                </p>
              </div>
            </div>
            <div class="vip-banner-actions-row">
              ${selected.length < 3 ? `
                <button class="btn-banner-action" style="background:#059669; color:#fff; border:1px solid #10B981; font-weight:700;" type="button" onclick="TuViMonetize.openPalaceSelectorModal()">
                  📋 Chọn Cung (${selected.length}/3)
                </button>
              ` : `
                <span class="btn-banner-action" style="background:#065F46; color:#ECFDF5; border:1px solid #10B981; font-weight:700; cursor:default; display:inline-flex; align-items:center;">
                  🔒 Đã Khóa 3/3 Cung
                </span>
              `}
              <button class="btn-banner-action" style="background:linear-gradient(135deg, #A3281F, #7A1C14); color:#FFE6A3; border:1px solid #D4AF37; font-weight:700;" type="button" onclick="TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư', 49000)">
                👑 Nâng Cấp VIP Toàn Thư (49.000đ)
              </button>
              <button class="btn-banner-action btn-banner-magic" type="button" onclick="TuViMonetize.copyMagicLink()">
                🔗 Sao Chép Link
              </button>
            </div>
          </div>
        `;
      }

      if (typeof window !== 'undefined' && window.lucide) {
        setTimeout(() => window.lucide.createIcons(), 50);
      }
    },

    unlockVIP: function (orderCode, vipToken, amount, packageId) {
      const isFull = (packageId === 'vip_49k' || packageId === 'vip_99k' || packageId === 'combo_99k' || packageId === 'deep_490k' || packageId === 'vip_call' || Number(amount || 0) >= 49000);
      this.isVipUnlocked = isFull;
      this.isTripwireUnlocked = !isFull;
      this.vipOrderCode = orderCode;
      this.vipAccessToken = vipToken || orderCode;

      try {
        localStorage.setItem('tvhh_vip_order_code', orderCode);
        localStorage.setItem('tvhh_vip_token', this.vipAccessToken);
        this.saveCodeToHistory(orderCode, {
          packageId: packageId,
          amount: amount,
          unlockedAt: new Date().toISOString()
        });
      } catch (e) { }

      if (isFull) {
        this.applyVipUI();
      }
    },

    saveCodeToHistory: function (orderCode, meta) {
      if (!orderCode) return;
      try {
        const cleanCode = String(orderCode).trim().toUpperCase();
        let history = [];
        try {
          history = JSON.parse(localStorage.getItem('tvhh_vip_codes_history') || '[]');
        } catch (e) { history = []; }
        if (!Array.isArray(history)) history = [];

        const existingIdx = history.findIndex(item => (typeof item === 'string' ? item : (item && item.code)) === cleanCode);
        const entry = Object.assign({
          code: cleanCode,
          savedAt: new Date().toISOString()
        }, meta || {});

        if (existingIdx !== -1) {
          history[existingIdx] = Object.assign({}, history[existingIdx], entry);
        } else {
          history.unshift(entry);
        }
        localStorage.setItem('tvhh_vip_codes_history', JSON.stringify(history.slice(0, 20)));
      } catch (e) { }
    },

    getSavedVipCodes: function () {
      const list = [];
      const seen = new Set();

      // 1. Mã đơn hiện tại trong localStorage
      try {
        const cur = (localStorage.getItem('tvhh_vip_order_code') || '').trim().toUpperCase();
        if (cur && !seen.has(cur)) {
          seen.add(cur);
          list.push({ code: cur, label: 'Mã VIP hiện tại' });
        }
      } catch (e) { }

      // 2. Danh sách lịch sử mã
      try {
        const hist = JSON.parse(localStorage.getItem('tvhh_vip_codes_history') || '[]');
        if (Array.isArray(hist)) {
          hist.forEach(item => {
            const code = (typeof item === 'string' ? item : (item && item.code ? item.code : '')).trim().toUpperCase();
            if (code && !seen.has(code)) {
              seen.add(code);
              list.push({
                code: code,
                label: (item && item.packageName) || 'Báo Cáo VIP',
                savedAt: item && item.savedAt
              });
            }
          });
        }
      } catch (e) { }

      // 3. Các lá số đã mở khóa trong tvhh_unlocked_charts
      try {
        const charts = JSON.parse(localStorage.getItem('tvhh_unlocked_charts') || '{}');
        Object.keys(charts).forEach(k => {
          const item = charts[k];
          if (item && item.orderCode) {
            const code = String(item.orderCode).trim().toUpperCase();
            if (code && !seen.has(code)) {
              seen.add(code);
              list.push({
                code: code,
                label: item.packageName || 'Lá Số Đã Mở Khóa',
                savedAt: item.unlockedAt
              });
            }
          }
        });
      } catch (e) { }

      return list;
    },

    getMagicLink: function (orderCode) {
      const code = (orderCode || this.vipOrderCode || localStorage.getItem('tvhh_vip_order_code') || this.vipAccessToken || localStorage.getItem('tvhh_vip_token') || '').trim().toUpperCase();
      if (!code) return '';
      const origin = (typeof window !== 'undefined' && window.location && window.location.origin)
        ? (window.location.origin.includes('localhost') ? window.location.origin : 'https://xemtuvihuyenhoc.com')
        : 'https://xemtuvihuyenhoc.com';
      return `${origin}/?vip_code=${encodeURIComponent(code)}`;
    },

    copyMagicLink: function (orderCode) {
      const link = this.getMagicLink(orderCode);
      if (!link) {
        if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast('Chưa có mã đơn VIP để tạo Magic Link', 'error');
        }
        return;
      }

      const onSuccess = () => {
        if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast('🔗 Đã sao chép Magic Link mở khóa VIP! Hãy lưu vào Zalo hoặc ghi chú để xem lại bất cứ lúc nào.', 'success');
        } else {
          alert('Đã sao chép Magic Link VIP:\n' + link);
        }
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(onSuccess).catch(() => {
          this._fallbackCopyText(link, 'Magic Link mở khóa VIP của bạn:');
        });
      } else {
        this._fallbackCopyText(link, 'Magic Link mở khóa VIP của bạn:');
      }
    },

    copyVipCode: function (orderCode) {
      const code = (orderCode || this.vipOrderCode || localStorage.getItem('tvhh_vip_order_code') || '').trim().toUpperCase();
      if (!code) return;
      const onSuccess = () => {
        if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast(`📋 Đã sao chép Mã VIP: ${code}`, 'success');
        } else {
          alert('Đã sao chép Mã VIP: ' + code);
        }
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(onSuccess).catch(() => {
          this._fallbackCopyText(code, 'Mã VIP của bạn:');
        });
      } else {
        this._fallbackCopyText(code, 'Mã VIP của bạn:');
      }
    },

    copyRestoreMagicLink: function () {
      const input = document.getElementById('restoreMagicLinkInput');
      const val = input ? input.value : '';
      if (!val) return;
      this.copyMagicLink(val);
    },

    quickRestoreSavedCode: function (orderCode) {
      const input = document.getElementById('restoreQueryInput');
      if (input) input.value = orderCode;
      this.handleRestoreSubmit();
    },

    _fallbackCopyText: function (text, promptTitle) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        const ok = document.execCommand('copy');
        if (ok && typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast('📋 Đã sao chép thành công!', 'success');
        } else {
          prompt(promptTitle || 'Sao chép nội dung bên dưới:', text);
        }
      } catch (e) {
        prompt(promptTitle || 'Sao chép nội dung bên dưới:', text);
      }
      document.body.removeChild(ta);
    },

    /**
     * Xuất Báo Cáo Tử Vi VIP A4 Hoàng Gia (Chỉ in nội dung báo cáo cốt lõi)
     */
    printVipReport: function () {
      // 1. Kiểm tra lá số đã lập chưa
      const chartSection = document.getElementById('ket-qua');
      if (!chartSection || chartSection.style.display === 'none') {
        if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast('Vui lòng nhập thông tin và bấm LẬP LÁ SỐ trước khi xuất báo cáo.', 'info');
        }
        const formEl = document.getElementById('lap-la-so');
        if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      // 2. Mở bung tất cả 12 cung luận giải để khi in PDF có đầy đủ 100% nội dung
      const items = document.querySelectorAll('.accordion-item');
      items.forEach(it => {
        it.classList.add('open');
        const toggleIcon = it.querySelector('.toggle-icon');
        if (toggleIcon) toggleIcon.textContent = '▲';
        const btn = it.querySelector('.accordion-header');
        if (btn) btn.setAttribute('aria-expanded', 'true');
      });

      const bodies = document.querySelectorAll('.accordion-body');
      bodies.forEach(b => {
        b.style.display = 'block';
      });

      chartSection.style.display = 'block';

      // 3. Kích hoạt hộp thoại in / xuất file PDF A4
      setTimeout(() => {
        window.print();
      }, 100);
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
      } catch (e) { }

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
      }).catch(function (err) { console.warn('Lỗi lưu lịch tư vấn:', err); });

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
      const isUserVip = Boolean(this.isVipUnlocked);
      if (!floatBtn) {
        floatBtn = document.createElement('button');
        floatBtn.id = 'floatingVipCta';
        floatBtn.className = 'floating-vip-cta';
        if (isUserVip) {
          floatBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
            <span>Xuất File PDF VIP A4</span>
          `;
          floatBtn.onclick = () => this.printVipReport();
        } else {
          floatBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Tải Báo Cáo VIP A4 (49k)</span>
          `;
          floatBtn.onclick = () => this.openVipModal();
        }
        document.body.appendChild(floatBtn);
      } else {
        if (isUserVip) {
          floatBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
            <span>Xuất File PDF VIP A4</span>
          `;
          floatBtn.onclick = () => this.printVipReport();
        }
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
      } catch (e) { }
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
              <h3 id="vipModalPackageTitle">MỞ KHÓA BÁO CÁO TỬ VI CHUYÊN SÂU</h3>
              <p class="vip-sub">Quét mã VietQR hoặc chuyển khoản theo thông tin STK dưới đây để hệ thống tự động kích hoạt ngay tức thì</p>
            </div>

            <div class="vip-price-tag">
              <span class="old-price">199.000 đ</span>
              <span class="current-price" id="vipPriceDisplay">49.000 đ</span>
              <span class="discount-badge">TIẾT KIỆM 67%</span>
            </div>

            <!-- BỘ CHUYỂN GÓI: 29K (3 CUNG TỰ CHỌN) HOẶC 49K (VIP TOÀN THƯ) -->
            <div class="modal-package-switcher" style="display:flex; gap:10px; margin: 12px 0 16px; justify-content:center;">
              <button type="button" class="modal-pkg-btn" data-price="29000" onclick="TuViMonetize.switchModalPackage('Gói Xem Nhanh 3 Cung', 29000)" style="position:relative;">
                <span class="pkg-btn-name">3 Cung Tự Chọn</span>
                <span class="pkg-btn-price">29.000đ</span>
              </button>
              <button type="button" class="modal-pkg-btn active" data-price="49000" onclick="TuViMonetize.switchModalPackage('Báo Cáo VIP A4 Toàn Thư', 49000)" style="position:relative;">
                <span class="pkg-btn-tag" style="background:#A3281F; color:#fff; font-size:9px; padding:1px 6px; border-radius:3px; position:absolute; top:-8px; right:6px; font-weight:700;">★ ĐƯỢC CHỌN NHIỀU NHẤT</span>
                <span class="pkg-btn-name">VIP 12 Cung + PDF</span>
                <span class="pkg-btn-price">49.000đ</span>
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
              <div class="vip-benefit-item">
                <span class="benefit-icon-check">✓</span>
                <div class="benefit-content">
                  <strong>Mở khóa toàn bộ 12 cung</strong> luận giải chi tiết (không che mờ).
                </div>
              </div>
              <div class="vip-benefit-item">
                <span class="benefit-icon-check">✓</span>
                <div class="benefit-content">
                  <strong>Luận giải Đại Hạn các thập niên (từ 6 đến 75+ tuổi)</strong> &amp; Phương pháp Hóa giải vận hạn.
                </div>
              </div>
              <div class="vip-benefit-item">
                <span class="benefit-icon-check">✓</span>
                <div class="benefit-content">
                  <strong>Phân tích Tam Phương Tứ Chính &amp; Tứ Hóa Phi Tinh</strong> (Lộc - Quyền - Khoa - Kỵ).
                </div>
              </div>
              <div class="vip-benefit-item">
                <span class="benefit-icon-check">✓</span>
                <div class="benefit-content">
                  <strong>Dự báo Vận Hạn Lưu Niên ${curYear} (${curCanChi}) &amp; ${nextYear} (${nextCanChi})</strong> chi tiết.
                </div>
              </div>
              <div class="vip-benefit-item">
                <span class="benefit-icon-check">✓</span>
                <div class="benefit-content">
                  <strong>Xuất trọn bộ File PDF VIP A4</strong> lưu trữ trọn đời &amp; Cố vấn Tử Vi AI.
                </div>
              </div>
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
          <div class="tuvi-tool-modal-card" style="max-width:520px;">
            <button class="tuvi-tool-modal-close" onclick="TuViMonetize.closeRestoreModal()">&times;</button>
            <h3 style="color:#D4AF37; display:flex; align-items:center; gap:8px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
              Xem Lại Báo Cáo VIP
            </h3>
            <p class="tuvi-tool-modal-desc" style="font-size:0.88rem; line-height:1.5; margin-bottom:1rem;">
              Nhập mã đơn hàng (ví dụ: TV123456) hoặc số điện thoại đã dùng khi thanh toán để mở khóa lại lá số và tải file PDF:
            </p>

            <!-- KHỐI MÃ VIP ĐÃ LƯU TRÊN MÁY NÀY (TỰ ĐỘNG HIỆN NẾU CÓ) -->
            <div id="restoreSavedSection" style="display:none; margin-bottom:1rem;"></div>

            <form id="restoreQueryForm" onsubmit="TuViMonetize.handleRestoreSubmit(event)">
              <div class="tuvi-tool-input-wrap" style="margin-bottom:0.8rem;">
                <label for="restoreQueryInput" style="font-weight:600; font-size:0.85rem; color:#fff;">Mã Đơn Hàng hoặc Số Điện Thoại:</label>
                <input type="text" id="restoreQueryInput" class="tuvi-tool-input" placeholder="Ví dụ: TV216469 hoặc 0988888888" required autocomplete="off" style="text-transform:uppercase; font-weight:700; letter-spacing:0.5px;">
              </div>
              <div id="restoreErrorMsg" class="tuvi-tool-error" style="display:none; margin-bottom:0.8rem;"></div>
              <button type="submit" id="btnRestoreSubmit" class="btn-tool-submit" style="width:100%; padding:0.75rem 1rem; font-weight:700; font-size:0.95rem; background:linear-gradient(135deg, #991b1b 0%, #b91c1c 100%); color:#fff; border:none; border-radius:8px; cursor:pointer;">
                🔍 Xem lại báo cáo
              </button>
            </form>

            <!-- KHỐI KẾT QUẢ KHÔI PHỤC THÀNH CÔNG & MAGIC LINK -->
            <div id="restoreSuccessSection" style="display:none; margin-top:1.1rem; padding:14px; background:rgba(16,185,129,0.08); border:1.5px solid #10b981; border-radius:10px;">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                <span style="width:24px; height:24px; border-radius:50%; background:#10b981; color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.85rem; font-weight:bold;">✓</span>
                <strong style="color:#10b981; font-size:0.95rem;">Khôi Phục Thành Công &amp; Đã Lưu Vào Máy!</strong>
              </div>
              <div style="font-size:0.85rem; color:#e2e8f0; margin-bottom:10px;">
                Mã đơn: <strong id="restoreSuccessCode" style="color:#fbbf24; font-family:monospace; font-size:1.05rem;">—</strong>
                <span style="margin:0 6px; color:#6b7280;">•</span>
                Gói: <span id="restoreSuccessPkg" style="color:#a7f3d0; font-weight:600;">—</span>
              </div>
              
              <!-- Magic Link -->
              <div style="margin-bottom:12px;">
                <label style="display:block; font-size:0.78rem; color:#d4af37; font-weight:700; margin-bottom:4px;">
                  🔗 Magic Link Mở Khóa Trọn Đời (Gửi vào Zalo / Ghi chú):
                </label>
                <div style="display:flex; gap:6px;">
                  <input type="text" id="restoreMagicLinkInput" readonly style="flex:1; font-size:0.8rem; padding:6px 8px; background:#0f0c24; color:#93c5fd; border:1px solid rgba(212,175,55,0.4); border-radius:6px; font-family:monospace;" onclick="this.select()">
                  <button type="button" onclick="TuViMonetize.copyRestoreMagicLink()" style="background:linear-gradient(135deg, #d4af37 0%, #f59e0b 100%); color:#14112c; font-weight:700; font-size:0.78rem; padding:6px 12px; border:none; border-radius:6px; cursor:pointer; white-space:nowrap;">
                    📋 Chép Link
                  </button>
                </div>
                <p style="font-size:0.74rem; color:#9ca3af; margin:5px 0 0 0; line-height:1.4;">
                  💡 Bấm vào link này từ bất kỳ thiết bị nào (điện thoại, máy tính) để mở khóa báo cáo 100% tự động!
                </p>
              </div>

              <div style="display:flex; justify-content:flex-end; gap:8px;">
                <button type="button" class="btn-tool-submit" style="padding:0.55rem 1.2rem; font-size:0.85rem; background:#059669; color:#fff;" onclick="TuViMonetize.closeRestoreModal();">
                  ✨ Xem Bản Luận Giải Ngay
                </button>
              </div>
            </div>
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
      const successSec = document.getElementById('restoreSuccessSection');
      if (successSec) successSec.style.display = 'none';

      const input = document.getElementById('restoreQueryInput');
      const savedSection = document.getElementById('restoreSavedSection');

      // Kiểm tra danh sách mã VIP đã lưu trên thiết bị
      const savedCodes = this.getSavedVipCodes();
      if (savedCodes && savedCodes.length > 0 && savedSection) {
        savedSection.innerHTML = `
          <div style="background:rgba(212,175,55,0.08); border:1px solid rgba(212,175,55,0.35); border-radius:8px; padding:10px 12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:0.8rem; color:#f59e0b; font-weight:700;">✨ Đã tìm thấy mã VIP lưu trên thiết bị này:</span>
              <span style="font-size:0.75rem; color:#10b981; font-weight:600;">● Có sẵn</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:6px;">
              ${savedCodes.slice(0, 3).map(s => `
                <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.25); padding:6px 10px; border-radius:6px; border:1px solid rgba(255,255,255,0.08);">
                  <div>
                    <strong style="color:#fbbf24; font-family:monospace; font-size:1rem; letter-spacing:0.5px;">${s.code}</strong>
                    <span style="font-size:0.75rem; color:#9ca3af; margin-left:6px;">(${s.label || 'Báo Cáo VIP'})</span>
                  </div>
                  <div style="display:flex; gap:6px;">
                    <button type="button" onclick="TuViMonetize.quickRestoreSavedCode('${s.code}')" style="background:#991b1b; color:#fff; font-size:0.75rem; font-weight:600; padding:4px 9px; border:none; border-radius:4px; cursor:pointer;">
                      ⚡ Mở Ngay
                    </button>
                    <button type="button" onclick="TuViMonetize.copyMagicLink('${s.code}')" style="background:rgba(255,255,255,0.12); color:#e5e7eb; font-size:0.75rem; padding:4px 8px; border:1px solid rgba(255,255,255,0.2); border-radius:4px; cursor:pointer;" title="Sao chép Magic Link">
                      🔗 Magic Link
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        savedSection.style.display = 'block';
        if (input && !input.value) {
          input.value = savedCodes[0].code;
        }
      } else if (savedSection) {
        savedSection.style.display = 'none';
        if (input) input.value = '';
      }

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
      const successSec = document.getElementById('restoreSuccessSection');
      const val = (input ? input.value : '').trim();

      if (!val) return;
      if (btn) {
        btn.disabled = true;
        btn.textContent = '⏳ Đang tra cứu dữ liệu...';
      }
      if (errEl) errEl.style.display = 'none';
      if (successSec) successSec.style.display = 'none';

      try {
        const res = await fetch(this.getApiUrl('/api/orders/restore'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: val })
        });
        const data = await res.json();

        if (data.success && data.isVip) {
          const oCode = data.order.orderCode;
          const vTok = data.order.vipAccessToken || data.order.orderCode;
          const cKey = data.order.chartKey;

          this.unlockVIP(
            oCode,
            vTok,
            data.order.amount,
            data.order.packageId
          );

          if (cKey) {
            this.saveUnlockedChart(cKey, data.order);
          }

          // Cập nhật URL hiện tại với ?vip_code=
          try {
            const url = new URL(window.location.href);
            url.searchParams.set('vip_code', oCode);
            window.history.replaceState({}, '', url.toString());
          } catch (e) { }

          // Cập nhật giao diện lá số
          if (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) {
            this.updateActiveChartStatus(TuViChart._currentLaSo);
            TuViChart.render(TuViChart._currentLaSo);
          }

          // Hiển thị phần kết quả thành công và Magic Link trong modal
          if (successSec) {
            const codeEl = document.getElementById('restoreSuccessCode');
            const pkgEl = document.getElementById('restoreSuccessPkg');
            const linkInput = document.getElementById('restoreMagicLinkInput');
            if (codeEl) codeEl.textContent = oCode;
            if (pkgEl) pkgEl.textContent = data.order.packageName || 'Báo Cáo VIP Toàn Thư';
            if (linkInput) linkInput.value = this.getMagicLink(oCode);
            successSec.style.display = 'block';
          } else {
            this.closeRestoreModal();
          }

          if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
            TuViApp.showToast(`🎉 Khôi phục thành công đơn hàng ${oCode}!`, 'success');
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
          btn.innerHTML = `🔍 Xem lại báo cáo`;
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
    },

    /**
     * Render 2 nút bấm đồng bộ trên các khung paywall:
     * - Nút chính nổi bật: 🔓 Mở Khóa Toàn Thư 12 Cung & PDF (49.000đ) — Khuyên Dùng
     * - Nút phụ bên cạnh: Mở Khóa Nhanh 3 Cung (29.000đ)
     */
    getPaywallButtonsHtml: function (customClass) {
      return `
        <div class="paywall-buttons-group ${customClass || ''}" style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; align-items:center; margin-top:12px;">
          <button type="button" class="btn-seal" onclick="TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư', 49000)" style="padding:0.75rem 1.4rem; font-size:0.92rem; font-weight:700; border-radius:6px; cursor:pointer; background:linear-gradient(135deg, #B91C1C 0%, #881337 100%); color:#FFFFFF; border:1px solid #D4AF37; box-shadow:0 3px 10px rgba(185,28,28,0.3);">
            🔓 Mở Khóa Toàn Thư 12 Cung &amp; PDF (49.000đ) — Khuyên Dùng
          </button>
          <button type="button" class="btn-outline-gold" onclick="TuViMonetize.openVipModal('Gói Xem Nhanh 3 Cung', 29000)" style="padding:0.75rem 1.25rem; font-size:0.9rem; border-radius:6px; font-weight:600; cursor:pointer; border:1.5px solid #C29B38; background:#FFFDF8; color:#991B1B;">
            Mở Khóa Nhanh 3 Cung (29.000đ)
          </button>
        </div>
      `;
    }
  };

  global.TuViMonetize = Monetize;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Monetize;
  }
})(typeof window !== 'undefined' ? window : this);
