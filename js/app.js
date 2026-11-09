/**
 * ============================================================================
 * XEM TỬ VI HUYỀN HỌC - MAIN APPLICATION SCRIPT
 * Đồng bộ hóa biểu mẫu Tra Cứu Tử Vi & Dựng Lá Số Trống Đồng Đông Sơn
 * ============================================================================
 */

(function () {
  'use strict';

  const App = {
    init: function () {
      this.initFormControls();
      this.initStarfield();
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
      console.log('✦ Tra Cứu Tử Vi Số Mệnh - Hệ Thống Sẵn Sàng ✦');
    },

    initHeroParticles: function () {
      const container = document.getElementById('heroParticles');
      if (!container) return;
      container.innerHTML = '';
      const count = 30;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'gold-particle';
        const size = Math.random() * 3 + 2;
        p.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: ${Math.random() > 0.4 ? '#F3D98B' : '#D4AF37'};
          box-shadow: 0 0 ${size * 2}px #D4AF37;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          opacity: ${(Math.random() * 0.6 + 0.2).toFixed(2)};
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
          laSo.hoTen = 'Trần Công Luyện';
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

      // Mặc định mẫu chuẩn theo PDF Trần Công Luyện: 10/04/2002 19h30
      if (hoTenEl && (!hoTenEl.value || hoTenEl.value === '')) {
        hoTenEl.value = 'Trần Công Luyện';
      }
      if (gioiTinhEl) gioiTinhEl.value = 'nam';
      if (loaiLichEl) loaiLichEl.value = 'duong';
      if (ngayEl) ngayEl.value = '10';
      if (thangEl) thangEl.value = '4';
      if (namEl) namEl.value = '2002';
      if (gioEl) gioEl.value = '19';
      if (phutEl) phutEl.value = '30';
    },

    /**
     * Đổ danh sách năm sinh
     */
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

    /**
     * Cập nhật số ngày linh hoạt theo tháng & năm
     */
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

    /**
     * Quy đổi Giờ & Phút thành Địa Chi của giờ (0-11)
     */
    getHourChiIndex: function (hour, minute) {
      // 23:00 - 00:59: Tý (0)
      // 01:00 - 02:59: Sửu (1)
      // 03:00 - 04:59: Dần (2)
      // 05:00 - 06:59: Mão (3)
      // 07:00 - 08:59: Thìn (4)
      // 09:00 - 10:59: Tỵ (5)
      // 11:00 - 12:59: Ngọ (6)
      // 13:00 - 14:59: Mùi (7)
      // 15:00 - 16:59: Thân (8)
      // 17:00 - 18:59: Dậu (9)
      // 19:00 - 20:59: Tuất (10)
      // 21:00 - 22:59: Hợi (11)
      if (hour === 23 || hour === 0) return 0;
      return Math.floor((hour + 1) / 2);
    },

    /**
     * Khởi tạo Form và các sự kiện
     */
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
     * Xử lý Tra Cứu Tử Vi
     */
    handleFormSubmit: function () {
      const hoTen = (document.getElementById('hoTen')?.value || '').trim() || 'Trần Công Luyện';
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

      this.showLoading(true);

      setTimeout(() => {
        try {
          if (typeof TuViEngine === 'undefined') {
            throw new Error('Bộ tính toán Tử Vi chưa sẵn sàng.');
          }

          // Lập lá số
          const laSo = TuViEngine.lapLaSo(ngay, thang, nam, gioIndex, gioiTinh, isLunar, gioPhutText);
          laSo.hoTen = hoTen;

          // Render Lá Số Trống Đồng Đông Sơn
          if (typeof TuViChart !== 'undefined') {
            TuViChart.render(laSo);
            const resultEl = document.getElementById('ket-qua');
            if (resultEl) {
              resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          } else {
            throw new Error('Bộ hiển thị lá số chưa tải xong.');
          }

          this.saveHistory(laSo);
          this.showToast('Tra cứu lá số thành công!', 'success');

          // Ghi nhận hành vi lập lá số vào Hệ Thống Phân Tích Thông Minh
          if (typeof TuViMonetize !== 'undefined' && TuViMonetize.trackEvent) {
            TuViMonetize.trackEvent('lap_la_so', {
              hoTen: laSo.hoTen,
              gioiTinh: laSo.gioiTinh,
              namSinh: laSo.namDuong,
              cuc: laSo.cuc,
              menh: laSo.menh
            });
          }
        } catch (err) {
          console.error('Lỗi tính toán:', err);
          this.showToast(err.message || 'Có lỗi xảy ra khi tra cứu.', 'error');
        } finally {
          this.showLoading(false);
        }
      }, 400);
    },

    showLoading: function (show) {
      const overlay = document.getElementById('loadingOverlay');
      if (overlay) {
        overlay.classList.toggle('active', show);
      }
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

    initStarfield: function () {
      const hero = document.getElementById('hero');
      if (!hero) return;

      const canvas = document.createElement('canvas');
      canvas.className = 'starfield-canvas';
      canvas.style.position = 'absolute';
      canvas.style.inset = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '0';
      hero.insertBefore(canvas, hero.firstChild);

      const ctx = canvas.getContext('2d');
      let stars = [];
      let width, height;

      const resize = () => {
        width = canvas.width = hero.offsetWidth;
        height = canvas.height = hero.offsetHeight;
        stars = [];
        const count = Math.floor((width * height) / 8000);
        for (let i = 0; i < count; i++) {
          stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.3,
            alpha: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.02 + 0.005,
            dir: Math.random() > 0.5 ? 1 : -1
          });
        }
      };

      window.addEventListener('resize', resize, { passive: true });
      resize();

      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(s => {
          s.alpha += s.speed * s.dir;
          if (s.alpha > 0.9) { s.alpha = 0.9; s.dir = -1; }
          if (s.alpha < 0.15) { s.alpha = 0.15; s.dir = 1; }

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${s.alpha})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
          ctx.fill();
        });
        requestAnimationFrame(animate);
      };
      animate();
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
