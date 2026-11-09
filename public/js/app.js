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
      this.initTrustLine();
      this.initFormControls();
      this.initNavMenuCheck();
      this.initHeroStarfield();
      this.initCursorTrail();
      this.initHeroParticles();
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
      if (summaryBar) summaryBar.style.display = 'flex';
      if (typeof window !== 'undefined' && window.lucide) {
        try { window.lucide.createIcons(); } catch (e) {}
      }
    },

    expandForm: function () {
      const summaryBar = document.getElementById('formSummaryBar');
      const formCard = document.getElementById('tuviForm');
      if (summaryBar) summaryBar.style.display = 'none';
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
        const curYear = new Date().getFullYear();
        const nextYear = curYear + 1;
        const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
        const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
        const curCanChi = `${CAN[(curYear + 6) % 10]} ${CHI[(curYear + 8) % 12]}`;
        const nextCanChi = `${CAN[(nextYear + 6) % 10]} ${CHI[(nextYear + 8) % 12]}`;

        const labels = document.querySelectorAll('.dynamic-luu-nien-label');
        labels.forEach(el => {
          el.textContent = `Luận đoán Vận Hạn Lưu Niên ${curYear} (${curCanChi}) & ${nextYear} (${nextCanChi})`;
        });

        const copyYearEl = document.getElementById('footerCopyrightYear');
        if (copyYearEl) {
          copyYearEl.textContent = curYear;
        }
      } catch (e) {
        console.warn('initDynamicYearLabels error:', e);
      }
    },

    /**
     * Cập nhật dòng uy tín ở Hero
     */
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
    initHeroStarfield: function () {
      const canvas = document.getElementById('globalStarfield');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let stars = [];
      let width = 0;
      let height = 0;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const resize = () => {
        const parent = canvas.parentElement || document.body;
        width = parent.offsetWidth || window.innerWidth;
        height = parent.offsetHeight || window.innerHeight;

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.scale(dpr, dpr);

        const maxStars = AnimationHub.isLite ? 35 : (width < 768 ? 40 : 90);
        stars = [];
        for (let i = 0; i < maxStars; i++) {
          stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.4 + 0.4,
            alpha: Math.random() * 0.7 + 0.2,
            speed: Math.random() * 0.012 + 0.004,
            dir: Math.random() > 0.5 ? 1 : -1
          });
        }
      };

      // Debounce resize
      let resizeTimer = null;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 100);
      }, { passive: true });

      resize();

      if (prefersReducedMotion) {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(s => {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(243, 217, 139, ${s.alpha})`;
          ctx.fill();
        });
        return;
      }

      // Đăng ký vào AnimationHub
      AnimationHub.register('heroStarfield', (now, delta) => {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.alpha += s.speed * s.dir * (delta / 16);
          if (s.alpha > 0.85) { s.alpha = 0.85; s.dir = -1; }
          if (s.alpha < 0.15) { s.alpha = 0.15; s.dir = 1; }

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(243, 217, 139, ${s.alpha})`;
          ctx.fill();
        }
      }, canvas);
    },

    /**
     * Gold Dust Cursor Trail (Phase 2 Item 1: Desktop pointer: fine only, disabled on touch/lite-mode)
     */
    initCursorTrail: function () {
      const isFinePointer = window.matchMedia('(pointer: fine)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!isFinePointer || prefersReducedMotion || AnimationHub.isLite) return;

      const canvas = document.getElementById('cursorTrailCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let particles = [];
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;

      let resizeTimer = null;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          width = canvas.width = window.innerWidth;
          height = canvas.height = window.innerHeight;
        }, 100);
      }, { passive: true });

      window.addEventListener('mousemove', (e) => {
        if (particles.length > 35 || AnimationHub.isLite) return;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6 - 0.2,
          radius: Math.random() * 1.8 + 0.8,
          life: 1
        });
      }, { passive: true });

      AnimationHub.register('cursorTrail', (now, delta) => {
        if (particles.length === 0) return;
        ctx.clearRect(0, 0, width, height);

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx * (delta / 16);
          p.y += p.vy * (delta / 16);
          p.life -= 0.03 * (delta / 16);

          if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(243, 217, 139, ${Math.max(0, p.life * 0.75)})`;
          ctx.fill();
        }
      });
    },

    /**
     * Hero Particles (Hạt bụi vàng nhẹ nhàng)
     */
    initHeroParticles: function () {
      const container = document.getElementById('heroParticles');
      if (!container) return;
      container.innerHTML = '';

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const count = AnimationHub.isLite ? 10 : 20;
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'gold-particle';
        const size = Math.random() * 2.5 + 1.2;
        p.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: ${Math.random() > 0.4 ? '#F3D98B' : '#D4AF37'};
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          opacity: ${(Math.random() * 0.4 + 0.2).toFixed(2)};
          animation: floatParticle ${(Math.random() * 6 + 5).toFixed(1)}s ease-in-out infinite alternate;
          animation-delay: ${(Math.random() * 4).toFixed(1)}s;
          pointer-events: none;
        `;
        fragment.appendChild(p);
      }
      container.appendChild(fragment);
    },

    /**
     * Phase 2 Item 7: Reveal-on-scroll qua 1 Shared IntersectionObserver
     */
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
      const hoTenEl = document.getElementById('hoTen');
      const ngayEl = document.getElementById('ngaySinh');
      const thangEl = document.getElementById('thangSinh');
      const namEl = document.getElementById('namSinh');
      const gioEl = document.getElementById('gioSinh');
      const phutEl = document.getElementById('phutSinh');
      const gioiTinhEl = document.getElementById('gioiTinh');
      const loaiLichEl = document.getElementById('loaiLich');

      this.populateYears();
      this.updateDayOptions();

      // Không điền sẵn tên người thật
      if (hoTenEl) hoTenEl.value = '';
      if (gioiTinhEl) gioiTinhEl.value = 'nam';
      if (loaiLichEl) loaiLichEl.value = 'duong';
      if (ngayEl) ngayEl.value = '10';
      if (thangEl) thangEl.value = '4';
      if (namEl) namEl.value = '2002';
      if (gioEl) gioEl.value = '19';
      if (phutEl) phutEl.value = '30';
    },

    populateYears: function () {
      const namEl = document.getElementById('namSinh');
      if (!namEl) return;

      const currentYear = new Date().getFullYear();
      namEl.innerHTML = '';
      for (let y = currentYear; y >= 1940; y--) {
        const opt = document.createElement('option');
        opt.value = y.toString();
        opt.textContent = `Năm ${y}`;
        namEl.appendChild(opt);
      }
    },

    updateDayOptions: function () {
      const ngayEl = document.getElementById('ngaySinh');
      const thangEl = document.getElementById('thangSinh');
      const namEl = document.getElementById('namSinh');
      if (!ngayEl) return;

      const currentDay = parseInt(ngayEl.value, 10) || 10;
      const month = parseInt(thangEl ? thangEl.value : 4, 10) || 4;
      const year = parseInt(namEl ? namEl.value : 2002, 10) || 2002;

      const loaiLich = document.getElementById('loaiLich');
      const isAm = loaiLich ? loaiLich.value === 'am' : false;

      let maxDays = 31;
      if (isAm) {
        maxDays = 30;
      } else {
        maxDays = new Date(year, month, 0).getDate();
      }

      const prevVal = ngayEl.value;
      ngayEl.innerHTML = '';
      for (let d = 1; d <= maxDays; d++) {
        const opt = document.createElement('option');
        opt.value = d.toString();
        const dStr = d < 10 ? '0' + d : d;
        opt.textContent = `Ngày ${dStr}`;
        ngayEl.appendChild(opt);
      }

      ngayEl.value = prevVal && parseInt(prevVal, 10) <= maxDays ? prevVal : Math.min(currentDay, maxDays).toString();
    },

    getHourChiIndex: function (hour, minute) {
      if (hour === 23 || hour === 0) return 0;
      return Math.floor((hour + 1) / 2) % 12;
    },

    initFormControls: function () {
      const form = document.getElementById('tuviForm');
      const thangEl = document.getElementById('thangSinh');
      const namEl = document.getElementById('namSinh');
      const loaiLich = document.getElementById('loaiLich');

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
      if (data.hoTen && data.hoTen.length > 80) {
        errors.hoTen = 'Họ tên không được vượt quá 80 ký tự.';
      }

      // Giới tính
      if (!data.gioiTinh || !['nam', 'nu'].includes(data.gioiTinh)) {
        errors.gioiTinh = 'Vui lòng chọn giới tính (Nam hoặc Nữ).';
      }

      // Năm sinh
      if (isNaN(data.nam) || data.nam < 1900 || data.nam > currentYear) {
        errors.namSinh = `Năm sinh phải từ 1900 đến ${currentYear}.`;
      }

      // Tháng sinh
      if (isNaN(data.thang) || data.thang < 1 || data.thang > 12) {
        errors.thangSinh = 'Tháng sinh không hợp lệ (1 - 12).';
      }

      // Ngày sinh
      if (!errors.namSinh && !errors.thangSinh) {
        if (data.isLunar) {
          if (isNaN(data.ngay) || data.ngay < 1 || data.ngay > 30) {
            errors.ngaySinh = 'Ngày Âm lịch hợp lệ từ mùng 1 đến 30.';
          }
        } else {
          const isLeap = (data.nam % 4 === 0 && data.nam % 100 !== 0) || (data.nam % 400 === 0);
          let maxDay = 31;
          if (data.thang === 2) {
            maxDay = isLeap ? 29 : 28;
          } else if ([4, 6, 9, 11].includes(data.thang)) {
            maxDay = 30;
          }

          if (isNaN(data.ngay) || data.ngay < 1 || data.ngay > maxDay) {
            if (data.thang === 2 && !isLeap && data.ngay === 29) {
              errors.ngaySinh = `Năm ${data.nam} không phải năm nhuận, tháng 2 chỉ có 28 ngày.`;
            } else {
              errors.ngaySinh = `Tháng ${data.thang} chỉ có tối đa ${maxDay} ngày.`;
            }
          } else {
            // Kiểm tra ngày tương lai
            const birthDate = new Date(data.nam, data.thang - 1, data.ngay, data.gio, data.phut);
            if (birthDate > new Date()) {
              errors.ngaySinh = 'Thời gian sinh không thể ở tương lai.';
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
      const hoTen = (document.getElementById('hoTen')?.value || '').trim() || 'Nguyễn Văn An';
      const gioiTinh = document.getElementById('gioiTinh')?.value || 'nam';

      const ngay = parseInt(document.getElementById('ngaySinh')?.value, 10) || 10;
      const thang = parseInt(document.getElementById('thangSinh')?.value, 10) || 4;
      const nam = parseInt(document.getElementById('namSinh')?.value, 10) || 2002;

      const gio = parseInt(document.getElementById('gioSinh')?.value, 10) || 19;
      const phut = parseInt(document.getElementById('phutSinh')?.value, 10) || 30;

      const loaiLich = document.getElementById('loaiLich')?.value;
      const isLunar = (loaiLich === 'am');

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
        computedLaSo = TuViEngine.lapLaSo(ngay, thang, nam, gioIndex, gioiTinh, isLunar, gioPhutText);
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

      toast.innerHTML = `<span class="toast-icon">✦</span> <span class="toast-msg">${msg}</span>`;
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
