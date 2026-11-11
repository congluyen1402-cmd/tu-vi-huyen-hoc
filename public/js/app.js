/**
 * ============================================================================
 * XEM TỬ VI HUYỀN HỌC - MAIN APPLICATION SCRIPT (ADAPTIVE & OPTIMIZED)
 * Unified 60fps Animation Hub, Adaptive Quality, Safe Validation & Error Handling
 * ============================================================================
 */

(function (global) {
  'use strict';

  // ==========================================================================
  // 1. UNIFIED ANIMATION & QUALITY CONTROLLER (PHASE 2)
  // ==========================================================================
  const AnimationHub = {
    tasks: new Map(), // id -> { fn, el, isVisible }
    rafId: null,
    isRunning: false,
    isPaused: false,
    quality: 'auto', // 'auto' | 'high' | 'low'
    isLite: false,
    fps: 60,
    frameCount: 0,
    lastTime: performance.now(),
    lastFpsCheck: performance.now(),
    observer: null,

    init: function () {
      // 1. Kiểm tra tham số URL ?quality=high|low
      try {
        const q = new URLSearchParams(window.location.search).get('quality');
        if (q === 'low') this.quality = 'low';
        else if (q === 'high') this.quality = 'high';
      } catch (e) {}

      // 2. Nhận diện phần cứng thiết bị & sở thích người dùng
      const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.innerWidth < 768;
      const isLowMemory = (navigator.deviceMemory && navigator.deviceMemory <= 4);
      const isLowCpu = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (this.quality === 'low' || isLowMemory || isLowCpu || (isTouch && this.quality !== 'high') || prefersReducedMotion) {
        this.enableLiteMode();
      }

      // 3. Tạm dừng mọi animation khi chuyển tab (Phase 2 Item 3)
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.pause();
        } else {
          this.resume();
        }
      });

      // 4. Shared IntersectionObserver: chỉ chạy animation khi phần tử trong tầm nhìn (Phase 2 Item 3)
      if (typeof IntersectionObserver !== 'undefined') {
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const id = entry.target.getAttribute('data-anim-id');
            if (id && this.tasks.has(id)) {
              this.tasks.get(id).isVisible = entry.isIntersecting;
            }
          });
        }, { threshold: 0.05 });
      }

      // 5. Khởi động vòng lặp duy nhất & đo lường FPS liên tục (Phase 2 Item 1 & 4)
      this.startFpsMonitor();
      this.start();
    },

    enableLiteMode: function () {
      if (this.isLite) return;
      this.isLite = true;
      document.documentElement.classList.add('quality-lite');
      console.log('✦ Adaptive Quality: Chuyển sang Chế Độ Tối Ưu Nhẹ (Lite Mode) ✦');
    },

    register: function (id, fn, el) {
      const task = { fn, el: el || null, isVisible: el ? false : true };
      this.tasks.set(id, task);
      if (el) {
        el.setAttribute('data-anim-id', id);
        if (this.observer) {
          this.observer.observe(el);
        } else {
          task.isVisible = true;
        }
      }
    },

    unregister: function (id) {
      if (this.tasks.has(id)) {
        const task = this.tasks.get(id);
        if (task.el && this.observer) {
          this.observer.unobserve(task.el);
        }
        this.tasks.delete(id);
      }
    },

    start: function () {
      if (this.isRunning) return;
      this.isRunning = true;
      this.lastTime = performance.now();

      const loop = (now) => {
        if (!this.isRunning) return;
        const delta = Math.min(now - this.lastTime, 100);
        this.lastTime = now;

        // Giám sát FPS
        this.frameCount++;
        if (now - this.lastFpsCheck >= 1000) {
          this.fps = (this.frameCount * 1000) / (now - this.lastFpsCheck);
          this.frameCount = 0;
          this.lastFpsCheck = now;
          if (this.fps < 45 && !this.isLite && this.quality !== 'high') {
            this.enableLiteMode();
          }
        }

        // Thực thi các tác vụ animation hợp lệ
        if (!this.isPaused) {
          this.tasks.forEach(task => {
            if (task.isVisible) {
              try { task.fn(now, delta); } catch (e) {}
            }
          });
        }

        this.rafId = requestAnimationFrame(loop);
      };

      this.rafId = requestAnimationFrame(loop);
    },

    pause: function () {
      this.isPaused = true;
    },

    resume: function () {
      this.isPaused = false;
      this.lastTime = performance.now();
    },

    startFpsMonitor: function () {
      setTimeout(() => {
        if (this.fps < 45 && !this.isLite && this.quality !== 'high') {
          this.enableLiteMode();
        }
      }, 2000);
    }
  };

  global.AnimationHub = AnimationHub;

  // ==========================================================================
  // 2. MAIN APPLICATION CORE
  // ==========================================================================
  const App = {
    _anSaoTimeoutTimer: null,
    _toastTimer: null,

    init: function () {
      this.initErrorBoundary();
      AnimationHub.init();
      this.initHeaderHeight();
      this.initDynamicYearLabels();
      this.initSiteConfig();
      this.initTrustLine();
      this.initAndroidKeyboardAdapt();
      this.initFormControls();
      this.initNavMenuCheck();
      // this.initHeroStarfield(); (Removed for Muc & Giay)
      // this.initCursorTrail(); (Removed for Muc & Giay)
      // this.initHeroParticles(); (Removed for Muc & Giay)
      this.initScrollReveal();
      this.setDefaultValues();
      this.restoreLastSession();

      if (typeof TuViAuth !== 'undefined') {
        TuViAuth.init();
      }
      if (typeof TuViMonetize !== 'undefined') {
        TuViMonetize.init();
      }

      // Khởi tạo icon Lucide an toàn
      if (typeof window !== 'undefined' && window.lucide) {
        try { window.lucide.createIcons(); } catch (e) {}
      }

      console.log('✦ Xem Tử Vi Huyền Học - Đã Tối Ưu Hóa & Sẵn Sàng ✦');
    },

    initNavMenuCheck: function () {
      const navLaSo = document.getElementById('navMenuLaSo') || document.querySelector('a[href="#ket-qua"]');
      if (navLaSo) {
        navLaSo.addEventListener('click', (e) => {
          const ketQua = document.getElementById('ket-qua');
          const hasChart = ketQua && (typeof TuViChart !== 'undefined') && TuViChart._currentLaSo;
          if (!hasChart) {
            e.preventDefault();
            const formSec = document.getElementById('lap-la-so');
            if (formSec) {
              formSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            this.showToast('Hãy lập lá số trước', 'info');
          }
        });
      }
    },

    collapseForm: function (laSo) {
      const summaryBar = document.getElementById('formSummaryBar');
      const formCard = document.getElementById('tuviForm');
      const summaryText = document.getElementById('summaryText');

      if (summaryText && laSo) {
        const hoTen = laSo.hoTen || 'Đương số';
        const gioi = laSo.gioiTinh === 'nu' ? 'Nữ' : 'Nam';
        const sDate = laSo.solarDate;
        const dStr = sDate ? `${sDate.day < 10 ? '0' + sDate.day : sDate.day}/${sDate.month < 10 ? '0' + sDate.month : sDate.month}/${sDate.year}` : '';
        const tStr = laSo.gioPhutText || '';
        summaryText.textContent = `${hoTen} · ${gioi} · ${dStr} · ${tStr}`;
      }

      if (formCard) formCard.style.display = 'none';
      if (summaryBar) {
        summaryBar.removeAttribute('hidden');
        summaryBar.style.display = 'flex';
      }
      if (typeof window !== 'undefined' && window.lucide) {
        try { window.lucide.createIcons(); } catch (e) {}
      }
    },

    expandForm: function () {
      const summaryBar = document.getElementById('formSummaryBar');
      const formCard = document.getElementById('tuviForm');
      if (summaryBar) {
        summaryBar.setAttribute('hidden', '');
        summaryBar.style.display = 'none';
      }
      if (formCard) formCard.style.display = 'block';
    },

    resetAndExpandForm: function () {
      this.expandForm();
      const formSec = document.getElementById('lap-la-so');
      if (formSec) {
        formSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      const hoTenInput = document.getElementById('hoTen');
      if (hoTenInput) {
        hoTenInput.focus();
        hoTenInput.select();
      }
    },

    /**
     * Phase 4: Global Error Boundary
     */
    initErrorBoundary: function () {
      const showError = (msg) => {
        const boundary = document.getElementById('appErrorBoundary');
        if (boundary) {
          const msgEl = boundary.querySelector('.error-msg');
          if (msgEl) msgEl.textContent = msg || 'Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại.';
          boundary.style.display = 'block';
        }
      };

      window.addEventListener('error', function (e) {
        console.error('Captured Global Error:', e.message);
        if (e.message && e.message.includes('Script error')) return;
        // Chỉ hiện thông báo thân thiện, không làm phiền người dùng với lỗi nhỏ
        if (e.error && e.error.fatal) {
          showError('Có lỗi xảy ra, vui lòng tải lại trang.');
        }
      });

      window.addEventListener('unhandledrejection', function (e) {
        console.error('Unhandled Promise Rejection:', e.reason);
      });
    },

    /**
     * Tự động tính toán và cập nhật năm Dương lịch cùng Can Chi động
     */
    initDynamicYearLabels: function () {
      try {
        const curDate = new Date();
        const curYear = curDate.getFullYear();
        const curMonth = curDate.getMonth() + 1;
        const nextYear = curYear + 1;
        const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
        const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
        const curCanChi = `${CAN[(curYear + 6) % 10]} ${CHI[(curYear + 8) % 12]}`;
        const nextCanChi = `${CAN[(nextYear + 6) % 10]} ${CHI[(nextYear + 8) % 12]}`;

        let yearText = `${curYear} (${curCanChi})`;
        if (curMonth >= 11) {
          yearText = `${curYear} (${curCanChi}) & Đón đầu ${nextYear} (${nextCanChi})`;
        }

        const labels = document.querySelectorAll(".dynamic-luu-nien-label");
        labels.forEach(el => {
          el.textContent = `Luận đoán Vận Hạn Lưu Niên ${yearText}`;
        });

        const copyYearEl = document.getElementById("footerCopyrightYear");
        if (copyYearEl) {
          copyYearEl.textContent = curYear.toString();
        }

        const seasonalTextEl = document.getElementById("pricingSeasonalText");
        if (seasonalTextEl) {
          seasonalTextEl.textContent = `Vận hạn ${yearText} – Định vị cát hung & đại vận trọn đời`;
        }
      } catch (e) {
        console.warn("initDynamicYearLabels error:", e);
      }
    },

    toggleFaq: function (ansId, btnEl) {
      const ans = document.getElementById(ansId);
      if (!ans) return;
      const isExpanded = btnEl.getAttribute("aria-expanded") === "true";
      btnEl.setAttribute("aria-expanded", !isExpanded);
      if (isExpanded) {
        ans.setAttribute("hidden", "");
      } else {
        ans.removeAttribute("hidden");
      }
    },

    initSiteConfig: function () {
      const cfg = window.SITE_CONFIG;
      if (!cfg) return;

      if (cfg.seasonalYearLabel) {
        const seasonalEl = document.getElementById("pricingSeasonalText");
        if (seasonalEl) {
          seasonalEl.textContent = `Vận hạn ${cfg.seasonalYearLabel} – Định vị cát hung & đại vận trọn đời`;
        }
      }

      // Cập nhật link hỗ trợ Zalo / hotline từ config (Vá thông tin ảo)
      const zaloLinks = document.querySelectorAll('.vip-zalo-link');
      const zaloSupportWraps = document.querySelectorAll('.vip-support-note');
      const hasValidZalo = Boolean(cfg.zaloUrl && cfg.zaloUrl.trim() && !cfg.zaloUrl.includes('0988888888'));

      zaloLinks.forEach(link => {
        if (hasValidZalo) {
          link.href = cfg.zaloUrl;
          link.style.display = '';
        } else if (cfg.phone && cfg.phone.trim()) {
          link.href = `tel:${cfg.phone.trim()}`;
          link.textContent = `Hotline ${cfg.phone.trim()}`;
          link.style.display = '';
        } else {
          link.style.display = 'none';
        }
      });

      if (!hasValidZalo && (!cfg.phone || !cfg.phone.trim())) {
        zaloSupportWraps.forEach(wrap => {
          wrap.innerHTML = '<span>Đã chuyển tiền nhưng chưa mở khóa? Hệ thống tự động kích hoạt sau 3 giây. Nếu cần hỗ trợ thêm, xin vui lòng gửi email về ban quản trị.</span>';
        });
      }

      this.renderFooterFromConfig(cfg);
    },

    renderFooterFromConfig: function (cfg) {
      const footerSocial = document.getElementById("footerSocialLinks");
      if (footerSocial) {
        let html = "";
        if (cfg.facebookUrl && cfg.facebookUrl.trim()) {
          html += `<a href="${cfg.facebookUrl}" target="_blank" rel="noopener" class="footer-social-btn" aria-label="Facebook" title="Facebook"><i data-lucide="facebook"></i></a>`;
        }
        if (cfg.instagramUrl && cfg.instagramUrl.trim()) {
          html += `<a href="${cfg.instagramUrl}" target="_blank" rel="noopener" class="footer-social-btn" aria-label="Instagram" title="Instagram"><i data-lucide="instagram"></i></a>`;
        }
        if (cfg.youtubeUrl && cfg.youtubeUrl.trim()) {
          html += `<a href="${cfg.youtubeUrl}" target="_blank" rel="noopener" class="footer-social-btn" aria-label="YouTube" title="YouTube"><i data-lucide="youtube"></i></a>`;
        }
        if (cfg.zaloUrl && cfg.zaloUrl.trim()) {
          html += `<a href="${cfg.zaloUrl}" target="_blank" rel="noopener" class="footer-social-btn" aria-label="Zalo" title="Zalo"><i data-lucide="message-circle"></i></a>`;
        }
        if (cfg.contactEmail && cfg.contactEmail.trim()) {
          html += `<a href="mailto:${cfg.contactEmail}" class="footer-social-btn" aria-label="Email" title="Email"><i data-lucide="mail"></i></a>`;
        }
        footerSocial.innerHTML = html;
        if (window.lucide) {
          try { window.lucide.createIcons({ root: footerSocial }); } catch (e) {}
        }
      }
    },
    initTrustLine: function () {
      const trustText = document.getElementById('heroTrustText');
      if (!trustText) return;

      if (window.CHART_COUNT && String(window.CHART_COUNT).trim()) {
        trustText.textContent = `Lập lá số theo phương pháp Tử Vi cổ truyền · Hơn ${window.CHART_COUNT} lá số đã lập`;
      } else {
        trustText.textContent = 'Lập lá số theo phương pháp Tử Vi cổ truyền';
      }
    },

    /**
     * Đo chiều cao Header động qua ResizeObserver và gán vào --header-h
     */
    initHeaderHeight: function () {
      const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
      if (!navbar) return;

      const updateHeight = () => {
        const h = navbar.offsetHeight;
        if (h > 0) {
          document.documentElement.style.setProperty('--header-h', `${h}px`);
        }
      };

      updateHeight();

      if (window.ResizeObserver) {
        try {
          const ro = new ResizeObserver(() => updateHeight());
          ro.observe(navbar);
        } catch (e) {
          window.addEventListener('resize', updateHeight, { passive: true });
        }
      } else {
        window.addEventListener('resize', updateHeight, { passive: true });
      }
    },

    /**
     * Canvas Starfield tích hợp vào Shared AnimationHub (Phase 2 Item 1, 3, 5)
     */
    initHeroStarfield: function () {},
    initCursorTrail: function () {},
    initHeroParticles: function () {},

    initScrollReveal: function () {
      if (typeof IntersectionObserver === 'undefined') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      document.documentElement.classList.add('js-reveal-ready');

      const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      const targets = document.querySelectorAll('.feature-card, .fengshui-item-card, .pricing-card');
      targets.forEach(el => {
        el.classList.add('reveal-item');
        revealObserver.observe(el);
      });
    },

    /**
     * Phase 4 Item 6: Phục hồi trạng thái phiên làm việc (Session Persistence)
     */
    restoreLastSession: function () {
      try {
        const saved = sessionStorage.getItem('tvhh_last_laso');
        if (saved) {
          const laSo = JSON.parse(saved);
          if (laSo && typeof TuViChart !== 'undefined') {
            TuViChart.render(laSo);
          }
        }
      } catch (e) {
        console.warn('Session restore error:', e);
      }
    },

    /**
     * Khởi tạo giá trị mặc định cho biểu mẫu
     */
    setDefaultValues: function () {
      const hoTenEl = document.getElementById("hoTen");
      const ngayEl = document.getElementById("ngaySinh");
      const thangEl = document.getElementById("thangSinh");
      const namEl = document.getElementById("namSinh");
      const gioEl = document.getElementById("gioSinh");
      const phutEl = document.getElementById("phutSinh");
      const gioiTinhEl = document.getElementById("gioiTinh");
      const loaiLichEl = document.getElementById("loaiLich");

      this.populateYears();
      this.updateDayOptions();

      // Không điền sẵn bất kỳ thông tin nào (Requirement 1: No pre-filled personal data)
      if (hoTenEl) hoTenEl.value = "";
      if (gioiTinhEl) gioiTinhEl.value = "";
      if (loaiLichEl) loaiLichEl.value = "duong";
      if (ngayEl) ngayEl.value = "";
      if (thangEl) thangEl.value = "";
      if (namEl) namEl.value = "";
      if (gioEl) gioEl.value = "";
      if (phutEl) phutEl.value = "";
    },

    populateYears: function () {
      const namEl = document.getElementById("namSinh");
      if (!namEl) return;

      const currentYear = new Date().getFullYear();
      namEl.innerHTML = '<option value="" disabled selected>Năm</option>';
      for (let y = currentYear; y >= 1930; y--) {
        const opt = document.createElement("option");
        opt.value = y.toString();
        opt.textContent = y.toString();
        namEl.appendChild(opt);
      }
    },

    updateDayOptions: function () {
      const ngayEl = document.getElementById("ngaySinh");
      const thangEl = document.getElementById("thangSinh");
      const namEl = document.getElementById("namSinh");
      if (!ngayEl) return;

      const month = parseInt(thangEl ? thangEl.value : NaN, 10);
      const year = parseInt(namEl ? namEl.value : NaN, 10);

      const loaiLich = document.getElementById("loaiLich");
      const isAm = loaiLich ? loaiLich.value === "am" : false;

      let maxDays = 31;
      if (isAm) {
        maxDays = 30;
      } else if (!isNaN(month) && !isNaN(year)) {
        maxDays = new Date(year, month, 0).getDate();
      } else if (!isNaN(month)) {
        maxDays = new Date(2024, month, 0).getDate();
      }

      const prevVal = ngayEl.value;
      ngayEl.innerHTML = '<option value="" disabled' + (!prevVal ? ' selected' : '') + '>Ngày</option>';
      for (let d = 1; d <= maxDays; d++) {
        const opt = document.createElement("option");
        opt.value = d.toString();
        const dStr = d < 10 ? "0" + d : d;
        opt.textContent = dStr.toString();
        if (prevVal && parseInt(prevVal, 10) === d) {
          opt.selected = true;
        }
        ngayEl.appendChild(opt);
      }
    },
    getHourChiIndex: function (hour, minute) {
      if (hour === 23 || hour === 0) return 0;
      return Math.floor((hour + 1) / 2) % 12;
    },

    
    /* Android Virtual Keyboard Listener */
    initAndroidKeyboardAdapt: function () {
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', () => {
          const isKeyboardOpen = window.visualViewport.height < window.innerHeight * 0.75;
          const stickyBar = document.getElementById('stickyBottomCtaBar');
          const floatVip = document.getElementById('floatingVipCtaBtn');
          if (stickyBar) {
            stickyBar.style.display = isKeyboardOpen ? 'none' : '';
          }
          if (floatVip) {
            floatVip.style.display = isKeyboardOpen ? 'none' : '';
          }
        });
      }
    },
    initFormControls: function () {
      const form = document.getElementById('tuviForm');
      const thangEl = document.getElementById('thangSinh');
      const namEl = document.getElementById('namSinh');
      const loaiLich = document.getElementById('loaiLich');

      const gioSinhEl = document.getElementById("gioSinh");
      const gioTyBox = document.getElementById("gioTyChoiceWrap");
      if (gioSinhEl && gioTyBox) {
        gioSinhEl.addEventListener("change", () => {
          if (gioSinhEl.value === "23") {
            gioTyBox.style.display = "block";
          } else {
            gioTyBox.style.display = "none";
          }
        });
      }

      if (thangEl) {
        thangEl.addEventListener('change', () => this.updateDayOptions());
      }
      if (namEl) {
        namEl.addEventListener('change', () => this.updateDayOptions());
      }
      if (loaiLich) {
        loaiLich.addEventListener('change', () => this.updateDayOptions());
      }

      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleFormSubmit();
        });
      }
    },

    /**
     * Phase 4 Item 3: Kiểm tra tính hợp lệ dữ liệu biểu mẫu chặt chẽ
     */
    validateInputs: function (data) {
      const errors = {};
      const currentYear = new Date().getFullYear();

      // Họ tên
      if (!data.hoTen || !data.hoTen.trim()) {
        errors.hoTen = "Vui lòng nhập họ tên đương số.";
      } else if (data.hoTen.length > 80) {
        errors.hoTen = "Họ tên không được vượt quá 80 ký tự.";
      }

      // Giới tính
      if (!data.gioiTinh || !["nam", "nu"].includes(data.gioiTinh)) {
        errors.gioiTinh = "Vui lòng chọn giới tính.";
      }

      // Giờ sinh
      if (data.gio === "" || data.gio === undefined || isNaN(data.gio) || data.gio < 0 || data.gio > 23) {
        errors.gioSinh = "Vui lòng chọn giờ sinh.";
      }

      // Phút sinh
      if (data.phut === "" || data.phut === undefined || isNaN(data.phut) || data.phut < 0 || data.phut > 59) {
        errors.phutSinh = "Vui lòng chọn phút sinh.";
      }

      // Ngày sinh
      if (isNaN(data.ngay) || data.ngay < 1) {
        errors.ngaySinh = "Vui lòng chọn ngày sinh.";
      }

      // Tháng sinh
      if (isNaN(data.thang) || data.thang < 1 || data.thang > 12) {
        errors.thangSinh = "Vui lòng chọn tháng sinh.";
      }

      // Năm sinh
      if (isNaN(data.nam) || data.nam < 1900 || data.nam > currentYear) {
        errors.namSinh = "Vui lòng chọn năm sinh.";
      }

      // Kiểm tra tính hợp lệ ngày theo tháng/năm
      if (!errors.ngaySinh && !errors.thangSinh && !errors.namSinh) {
        if (data.isLunar) {
          if (data.ngay > 30) errors.ngaySinh = "Ngày Âm lịch hợp lệ từ mùng 1 đến 30.";
        } else {
          const isLeap = (data.nam % 4 === 0 && data.nam % 100 !== 0) || (data.nam % 400 === 0);
          let maxDay = 31;
          if (data.thang === 2) maxDay = isLeap ? 29 : 28;
          else if ([4, 6, 9, 11].includes(data.thang)) maxDay = 30;
          if (data.ngay > maxDay) {
            errors.ngaySinh = `Tháng ${data.thang} năm ${data.nam} chỉ có tối đa ${maxDay} ngày.`;
          } else {
            const checkGio = isNaN(data.gio) ? 0 : data.gio;
            const checkPhut = isNaN(data.phut) ? 0 : data.phut;
            const birthDate = new Date(data.nam, data.thang - 1, data.ngay, checkGio, checkPhut);
            if (birthDate > new Date()) {
              errors.ngaySinh = "Thời gian sinh không thể ở tương lai.";
            }
          }
        }
      }

      return errors;
    },
    clearInlineErrors: function () {
      const errNodes = document.querySelectorAll('.form-error-inline');
      errNodes.forEach(node => { node.textContent = ''; node.style.display = 'none'; });
      const invalidInputs = document.querySelectorAll('.is-invalid');
      invalidInputs.forEach(node => node.classList.remove('is-invalid'));
    },

    showInlineErrors: function (errors) {
      this.clearInlineErrors();
      let firstEl = null;

      Object.keys(errors).forEach(key => {
        const inputEl = document.getElementById(key);
        if (inputEl) {
          inputEl.classList.add('is-invalid');
          if (!firstEl) firstEl = inputEl;
        }
        const msgEl = document.getElementById(`error-${key}`);
        if (msgEl) {
          msgEl.textContent = errors[key];
          msgEl.style.display = 'block';
        }
      });

      if (firstEl) {
        firstEl.focus();
      }
    },

    /**
     * Phase 4 Item 2: Hủy nghi thức An sao an toàn
     */
    cancelAnSao: function () {
      clearTimeout(this._anSaoTimeoutTimer);
      const ritualOverlay = document.getElementById('anSaoRitualOverlay');
      if (ritualOverlay) ritualOverlay.classList.remove('active');
      const submitBtn = document.getElementById('btnSubmitForm');
      if (submitBtn) submitBtn.disabled = false;
      this.showToast('Đã dừng tiến trình an sao.', 'info');
    },

    /**
     * Xử lý Tra Cứu Tử Vi & Nghi Thức "Đang An Sao" (Phase 4 Item 2 & 3)
     */
    handleFormSubmit: function () {
      const hoTen = (document.getElementById("hoTen")?.value || "").trim();
      const gioiTinh = document.getElementById("gioiTinh")?.value || "";

      const rawNgay = document.getElementById("ngaySinh")?.value;
      const rawThang = document.getElementById("thangSinh")?.value;
      const rawNam = document.getElementById("namSinh")?.value;
      const rawGio = document.getElementById("gioSinh")?.value;
      const rawPhut = document.getElementById("phutSinh")?.value;

      const ngay = (rawNgay !== "" && rawNgay !== undefined && rawNgay !== null) ? parseInt(rawNgay, 10) : NaN;
      const thang = (rawThang !== "" && rawThang !== undefined && rawThang !== null) ? parseInt(rawThang, 10) : NaN;
      const nam = (rawNam !== "" && rawNam !== undefined && rawNam !== null) ? parseInt(rawNam, 10) : NaN;
      const gio = (rawGio !== "" && rawGio !== undefined && rawGio !== null) ? parseInt(rawGio, 10) : NaN;
      const phut = (rawPhut !== "" && rawPhut !== undefined && rawPhut !== null) ? parseInt(rawPhut, 10) : NaN;

      const loaiLich = document.getElementById("loaiLich")?.value || "duong";
      const isLunar = (loaiLich === "am");

      // 1. Kiểm tra tính hợp lệ dữ liệu
      const formData = { hoTen, gioiTinh, ngay, thang, nam, gio, phut, isLunar };
      const validationErrors = this.validateInputs(formData);
      if (Object.keys(validationErrors).length > 0) {
        this.showInlineErrors(validationErrors);
        return;
      }
      this.clearInlineErrors();

      // 2. Chống gửi kép (Phase 4 Item 4)
      const submitBtn = document.getElementById('btnSubmitForm') || document.querySelector('#tuviForm button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
      }

      const gioIndex = this.getHourChiIndex(gio, phut);
      const gioPhutText = `${gio} giờ ${phut < 10 ? '0' + phut : phut} phút`;

      // Bật Nghi thức An Sao Overlay
      const ritualOverlay = document.getElementById('anSaoRitualOverlay');
      const statusText = document.getElementById('anSaoStatusText');
      const progressBar = document.getElementById('anSaoProgressBar');
      const cancelBtn = document.getElementById('anSaoCancelBtn');

      if (ritualOverlay) {
        ritualOverlay.classList.add('active');
        if (progressBar) progressBar.style.width = '10%';
        if (statusText) statusText.textContent = 'Đang xác định cung Mệnh…';
        if (cancelBtn) cancelBtn.style.display = 'none';
      }

      // Hiện nút Hủy nếu lâu hơn 4s
      setTimeout(() => {
        if (ritualOverlay && ritualOverlay.classList.contains('active') && cancelBtn) {
          cancelBtn.style.display = 'inline-block';
        }
      }, 4000);

      // Phase 4 Item 2: Timeout an toàn 15 giây
      clearTimeout(this._anSaoTimeoutTimer);
      this._anSaoTimeoutTimer = setTimeout(() => {
        this.cancelAnSao();
        this.showToast('Quá trình an định lá số kéo dài hơn dự kiến. Vui lòng thử lại.', 'error');
      }, 15000);

      const startTime = Date.now();

      // Tiến trình 4 câu khẩu quyết an sao
      const ritualSteps = [
        { time: 600, text: 'Đang an sao Tử Vi, Thiên Phủ…', progress: '38%' },
        { time: 1300, text: 'Đang luận Tam Phương Tứ Chính…', progress: '68%' },
        { time: 2000, text: 'Đang tính Đại Hạn & Vận Khí…', progress: '92%' }
      ];

      ritualSteps.forEach(step => {
        setTimeout(() => {
          if (statusText) statusText.textContent = step.text;
          if (progressBar) progressBar.style.width = step.progress;
        }, step.time);
      });

      // Tính toán lá số
      let computedLaSo = null;
      let computeError = null;

      try {
        if (typeof TuViEngine === 'undefined') {
          throw new Error('Hệ thống tính toán Tử Vi đang tải. Vui lòng thử lại sau giây lát.');
        }
        const gioTyOption = document.querySelector('input[name="gioTyOption"]:checked')?.value || 'next_day';
        computedLaSo = TuViEngine.lapLaSo({
          ngay,
          thang,
          nam,
          gioIndex,
          gioiTinh,
          isLunar,
          gioPhutText,
          hoTen,
          gio,
          phut,
          gioTyMode: gioTyOption,
          viewYear: 2026
        });
        computedLaSo.hoTen = hoTen;
      } catch (err) {
        computeError = err;
      }

      const MIN_RITUAL_MS = 2500;
      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, MIN_RITUAL_MS - elapsed);

      setTimeout(() => {
        if (progressBar) progressBar.style.width = '100%';

        setTimeout(() => {
          // Luôn dọn dẹp trong block an toàn (Phase 4 Item 2)
          try {
            clearTimeout(this._anSaoTimeoutTimer);
            if (ritualOverlay) ritualOverlay.classList.remove('active');
            if (submitBtn) submitBtn.disabled = false;

            if (computeError) {
              console.error('Lỗi tính toán:', computeError);
              this.showToast(computeError.message || 'Có lỗi xảy ra khi tra cứu.', 'error');
              return;
            }

            if (computedLaSo && typeof TuViChart !== 'undefined') {
              TuViChart.render(computedLaSo);
              this.collapseForm(computedLaSo);
              this.saveHistory(computedLaSo);

              // Lưu vào sessionStorage (Phase 4 Item 6)
              try {
                sessionStorage.setItem('tvhh_last_laso', JSON.stringify(computedLaSo));
              } catch (e) {}

              this.showToast('Khởi tạo và an định lá số thành công!', 'success');

              const resultEl = document.getElementById('ket-qua');
              if (resultEl) {
                resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }

              if (typeof TuViMonetize !== 'undefined' && TuViMonetize.trackEvent) {
                TuViMonetize.trackEvent('lap_la_so', {
                  hoTen: computedLaSo.hoTen,
                  gioiTinh: computedLaSo.gioiTinh,
                  namSinh: computedLaSo.namDuong,
                  cuc: computedLaSo.cuc,
                  menh: computedLaSo.menh
                });
              }
            }
          } catch (e) {
            console.error('Lỗi hoàn tất an sao:', e);
          } finally {
            if (submitBtn) submitBtn.disabled = false;
          }
        }, 300);
      }, waitTime);
    },

    showToast: function (msg, type) {
      let toast = document.getElementById('tuvi-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'tuvi-toast';
        toast.className = 'tuvi-toast';
        document.body.appendChild(toast);
      }

      toast.innerHTML = `<span class="toast-msg">${msg}</span>`;
      toast.className = `tuvi-toast ${type || 'info'} show`;

      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    },

    saveHistory: function (laSo) {
      try {
        let list = JSON.parse(localStorage.getItem('tuvi_history') || '[]');
        const record = {
          name: laSo.hoTen,
          date: `${laSo.lunarDate.day}/${laSo.lunarDate.month}/${laSo.lunarDate.year}`,
          cuc: laSo.cucInfo ? laSo.cucInfo.name : '',
          canChi: laSo.canChiNam,
          menh: laSo.cungMenh ? laSo.cungMenh.chi : '',
          time: new Date().toLocaleString('vi-VN')
        };
        list.unshift(record);
        if (list.length > 8) list.pop();
        localStorage.setItem('tuvi_history', JSON.stringify(list));
      } catch (e) {}
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }

  global.TuViApp = App;
})(typeof window !== 'undefined' ? window : this);
