/**
 * ============================================================================
 * XEM TỬ VI HUYỀN HỌC - MAIN APPLICATION SCRIPT
 * Trải nghiệm huyền bí cao cấp, nghi thức an sao, starfield & cursor trail
 * ============================================================================
 */

(function () {
  'use strict';

  const App = {
    _starfieldAnimId: null,
    _trailAnimId: null,

    init: function () {
      this.initDynamicYearLabels();
      this.initTrustLine();
      this.initFormControls();
      this.initGlobalStarfield();
      this.initCursorTrail();
      this.initHeroParticles();
      this.setDefaultValues();

      if (typeof TuViAuth !== 'undefined') {
        TuViAuth.init();
      }
      if (typeof TuViMonetize !== 'undefined') {
        TuViMonetize.init();
      }

      this.renderInitialChart();

      if (typeof window !== 'undefined' && window.lucide) {
        window.lucide.createIcons();
      }
      console.log('✦ Xem Tử Vi Huyền Học - Giao Diện Huyền Bí Sẵn Sàng ✦');
    },

    /**
     * Tự động tính toán và cập nhật năm Dương lịch cùng Thiên Can - Địa Chi động (Item 7)
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
     * Cập nhật dòng uy tín ở Hero (Requirement A.2: Chỉ hiển thị window.CHART_COUNT nếu có)
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
     * Global Canvas Starfield (Requirement A.1: Max 120 desktop, 40 mobile, pause when tab hidden)
     */
    initGlobalStarfield: function () {
      const canvas = document.getElementById('globalStarfield');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let stars = [];
      let width = 0;
      let height = 0;

      const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        const maxStars = width < 768 ? 40 : 120;
        stars = [];
        for (let i = 0; i < maxStars; i++) {
          stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.4,
            alpha: Math.random() * 0.7 + 0.2,
            speed: Math.random() * 0.015 + 0.005,
            dir: Math.random() > 0.5 ? 1 : -1
          });
        }
      };

      window.addEventListener('resize', resize, { passive: true });
      resize();

      const drawStatic = () => {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(s => {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(243, 217, 139, ${s.alpha})`;
          ctx.fill();
        });
      };

      if (prefersReducedMotion) {
        drawStatic();
        return;
      }

      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(s => {
          s.alpha += s.speed * s.dir;
          if (s.alpha > 0.85) { s.alpha = 0.85; s.dir = -1; }
          if (s.alpha < 0.15) { s.alpha = 0.15; s.dir = 1; }

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(243, 217, 139, ${s.alpha})`;
          ctx.shadowBlur = 3;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
          ctx.fill();
        });
        App._starfieldAnimId = requestAnimationFrame(animate);
      };

      animate();

      // Dừng vòng lặp khi chuyển tab để bảo vệ pin và hiệu năng thiết bị
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          if (App._starfieldAnimId) {
            cancelAnimationFrame(App._starfieldAnimId);
            App._starfieldAnimId = null;
          }
        } else {
          if (!App._starfieldAnimId && !prefersReducedMotion) {
            animate();
          }
        }
      });
    },

    /**
     * Gold Dust Cursor Trail (Requirement A.3: Desktop pointer: fine only, disabled on touch/reduced-motion)
     */
    initCursorTrail: function () {
      const isFinePointer = window.matchMedia('(pointer: fine)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!isFinePointer || prefersReducedMotion) return;

      const canvas = document.getElementById('cursorTrailCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let particles = [];
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, { passive: true });

      window.addEventListener('mousemove', (e) => {
        if (particles.length > 50) return;
        for (let i = 0; i < 2; i++) {
          particles.push({
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8 - 0.3,
            radius: Math.random() * 2 + 1,
            alpha: 0.8,
            life: 1
          });
        }
      }, { passive: true });

      const renderTrail = () => {
        ctx.clearRect(0, 0, width, height);
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.025;
          p.alpha = Math.max(0, p.life * 0.8);

          if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(243, 217, 139, ${p.alpha})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
          ctx.fill();
        }
        App._trailAnimId = requestAnimationFrame(renderTrail);
      };

      renderTrail();
    },

    initHeroParticles: function () {
      const container = document.getElementById('heroParticles');
      if (!container) return;
      container.innerHTML = '';
      const count = 25;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'gold-particle';
        const size = Math.random() * 3 + 1.5;
        p.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: ${Math.random() > 0.4 ? '#F3D98B' : '#D4AF37'};
          box-shadow: 0 0 ${size * 2}px #D4AF37;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          opacity: ${(Math.random() * 0.5 + 0.2).toFixed(2)};
          animation: floatParticle ${(Math.random() * 6 + 4).toFixed(1)}s ease-in-out infinite alternate;
          animation-delay: ${(Math.random() * 5).toFixed(1)}s;
        `;
        container.appendChild(p);
      }
    },

    /**
     * Dựng sẵn lá số mẫu ban đầu để người dùng thấy ngay khi cuộn xuống
     */
    renderInitialChart: function () {
      try {
        if (typeof TuViEngine !== 'undefined' && typeof TuViChart !== 'undefined') {
          const laSo = TuViEngine.lapLaSo(10, 4, 2002, 10, 'nam', false, '19 giờ 30 phút');
          laSo.hoTen = 'Nguyễn Văn An';
          TuViChart.render(laSo);
        }
      } catch (e) {
        console.warn('Initial chart render:', e);
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
      return Math.floor((hour + 1) / 2);
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
     * Xử lý Tra Cứu Tử Vi & Nghi Thức "Đang An Sao" (Requirement B)
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

      const gioIndex = this.getHourChiIndex(gio, phut);
      const gioPhutText = `${gio} giờ ${phut < 10 ? '0' + phut : phut} phút`;

      // Bật Nghi thức An Sao Overlay
      const ritualOverlay = document.getElementById('anSaoRitualOverlay');
      const statusText = document.getElementById('anSaoStatusText');
      const progressBar = document.getElementById('anSaoProgressBar');

      if (ritualOverlay) {
        ritualOverlay.classList.add('active');
        if (progressBar) progressBar.style.width = '10%';
        if (statusText) statusText.textContent = 'Đang xác định cung Mệnh…';
      }

      const startTime = Date.now();

      // Tiến trình 4 câu khẩu quyết an sao
      const ritualSteps = [
        { time: 700, text: 'Đang an sao Tử Vi, Thiên Phủ…', progress: '38%' },
        { time: 1500, text: 'Đang luận Tam Phương Tứ Chính…', progress: '68%' },
        { time: 2200, text: 'Đang tính Đại Hạn & Vận Khí…', progress: '92%' }
      ];

      ritualSteps.forEach(step => {
        setTimeout(() => {
          if (statusText) statusText.textContent = step.text;
          if (progressBar) progressBar.style.width = step.progress;
        }, step.time);
      });

      // Tính toán song song
      let computedLaSo = null;
      let computeError = null;

      try {
        if (typeof TuViEngine === 'undefined') {
          throw new Error('Bộ tính toán Tử Vi chưa sẵn sàng.');
        }
        computedLaSo = TuViEngine.lapLaSo(ngay, thang, nam, gioIndex, gioiTinh, isLunar, gioPhutText);
        computedLaSo.hoTen = hoTen;
      } catch (err) {
        computeError = err;
      }

      // Đảm bảo nghi thức hiển thị tối thiểu 2.5s - 3.0s rồi chuyển cảnh êm ái
      const MIN_RITUAL_MS = 2800;
      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, MIN_RITUAL_MS - elapsed);

      setTimeout(() => {
        if (progressBar) progressBar.style.width = '100%';

        setTimeout(() => {
          if (ritualOverlay) ritualOverlay.classList.remove('active');

          if (computeError) {
            console.error('Lỗi tính toán:', computeError);
            this.showToast(computeError.message || 'Có lỗi xảy ra khi tra cứu.', 'error');
            return;
          }

          if (computedLaSo && typeof TuViChart !== 'undefined') {
            TuViChart.render(computedLaSo);
            this.saveHistory(computedLaSo);
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
        }, 350);
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
      toast.className = `tuvi-toast ${type} show`;

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
          cuc: laSo.cucInfo.name,
          canChi: laSo.canChiNam,
          menh: laSo.cungMenh.chi,
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

  window.TuViApp = App;
})();
