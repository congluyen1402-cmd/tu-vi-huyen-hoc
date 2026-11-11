/**
 * ============================================================================
 * XEM TỬ VI HUYỀN HỌC - MYSTICAL VIDEO & SPIRITUAL MEDITATION
 * Vẽ đồ họa Mandala Bát Quái, Tinh Tú & Âm Thoa 432Hz Thiền Định
 * ============================================================================
 */

(function (global) {
  'use strict';

  const MysticVideo = {
    canvas: null,
    ctx: null,
    mode: 'bagua', // 'bagua', 'stars', 'wave'
    animId: null,
    width: 0,
    height: 0,
    angle: 0,

    // Web Audio Synthesizer
    audioCtx: null,
    isPlayingSound: false,
    oscillators: [],
    gainNodes: [],

    init: function () {
      this.canvas = document.getElementById('mysticVideoCanvas');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.initResize();
      this.initControls();

      // Tối ưu TBT & CPU: CHỈ chạy animation khi #khong-gian-tam-linh lọt vào viewport
      const targetSection = document.getElementById('khong-gian-tam-linh') || this.canvas;
      if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.startAnimation();
            } else {
              this.stopAnimation();
            }
          });
        }, { threshold: 0.05 });
        observer.observe(targetSection);
      } else {
        this.startAnimation();
      }
      console.log('✦ Không Gian Huyền Học Video - Khởi Động Thành Công ✦');
    },

    initResize: function () {
      const screen = document.getElementById('mysticScreen');
      const resize = () => {
        if (!screen) return;
        this.width = this.canvas.width = screen.offsetWidth;
        this.height = this.canvas.height = screen.offsetHeight;
      };
      window.addEventListener('resize', resize, { passive: true });
      resize();
    },

    initControls: function () {
      // Chuyển chế độ video
      const buttons = document.querySelectorAll('.mystic-ctrl-btn[data-mode]');
      buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.mode = btn.getAttribute('data-mode');

          const tag = document.getElementById('hudModeTag');
          if (tag) {
            const modeNames = {
              bagua: '✦ Chế Độ: Bát Quái Khởi Trận',
              stars: '✦ Chế Độ: Bắc Đẩu Tinh Vân',
              wave: '✦ Chế Độ: Sóng Năng Lượng 432Hz'
            };
            tag.textContent = modeNames[this.mode] || '✦ Chế Độ Huyền Học';
          }
        });
      });

      // Âm thanh thiền định 432Hz
      const soundBtn = document.getElementById('btnSoundToggle');
      if (soundBtn) {
        soundBtn.addEventListener('click', () => {
          this.toggleSound();
        });
      }

      // Toàn màn hình
      const fsBtn = document.getElementById('btnFullscreenMystic');
      const screen = document.getElementById('mysticScreen');
      if (fsBtn && screen) {
        fsBtn.addEventListener('click', () => {
          if (!document.fullscreenElement) {
            if (screen.requestFullscreen) screen.requestFullscreen();
            else if (screen.webkitRequestFullscreen) screen.webkitRequestFullscreen();
          } else {
            if (document.exitFullscreen) document.exitFullscreen();
          }
        });
      }
    },

    renderFrame: function () {
      if (!this.canvas || !this.ctx) return;
      this.angle += 0.008;

      if (this.mode === 'bagua') {
        this.drawBaguaScene();
      } else if (this.mode === 'stars') {
        this.drawStarsScene();
      } else if (this.mode === 'wave') {
        this.drawWaveScene();
      }
    },

    startAnimation: function () {
      if (this.animId) return;
      const render = () => {
        this.renderFrame();
        this.animId = requestAnimationFrame(render);
      };
      this.animId = requestAnimationFrame(render);
    },

    stopAnimation: function () {
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
    },

    /**
     * Chế độ 1: Bát Quái Trận Đồ & Thái Cực Đồ
     */
    drawBaguaScene: function () {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.38;

      // Nền không gian sâu thẳm
      ctx.fillStyle = '#060412';
      ctx.fillRect(0, 0, w, h);

      // Quầng sáng tinh vân trung tâm
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius * 1.5);
      grad.addColorStop(0, 'rgba(212, 175, 55, 0.25)');
      grad.addColorStop(0.5, 'rgba(139, 92, 246, 0.15)');
      grad.addColorStop(1, 'rgba(6, 4, 18, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(cx, cy);

      // Các vòng tròn Mandala thần thánh
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(167, 139, 250, 0.25)';
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.85, 0, Math.PI * 2);
      ctx.stroke();

      // Vòng hào quang phát sáng xoay tròn
      ctx.save();
      ctx.rotate(this.angle);

      // 8 Quẻ Bát Quái (Càn, Khảm, Cấn, Chấn, Tốn, Ly, Khôn, Đoài)
      const trigrams = ['☰', '☵', '☶', '☳', '☴', '☲', '☷', '☱'];
      const trigramNames = ['CÀN', 'KHẢM', 'CẤN', 'CHẤN', 'TỐN', 'LY', 'KHÔN', 'ĐOÀI'];
      ctx.fillStyle = '#ffd700';
      ctx.font = `bold ${Math.max(radius * 0.12, 14)}px 'Be Vietnam Pro', serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI * 2) / 8;
        const tx = Math.cos(a) * (radius * 0.92);
        const ty = Math.sin(a) * (radius * 0.92);

        ctx.save();
        ctx.translate(tx, ty);
        ctx.rotate(a + Math.PI / 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
        ctx.fillText(trigrams[i], 0, 0);

        ctx.font = `${Math.max(radius * 0.05, 9)}px 'Be Vietnam Pro', sans-serif`;
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText(trigramNames[i], 0, 14);
        ctx.restore();
      }

      // Tia sáng chiếu từ trung tâm ra 8 hướng
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 16; i++) {
        const a = (i * Math.PI * 2) / 16;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * (radius * 0.35), Math.sin(a) * (radius * 0.35));
        ctx.lineTo(Math.cos(a) * (radius * 0.75), Math.sin(a) * (radius * 0.75));
        ctx.stroke();
      }

      ctx.restore(); // Hết xoay bát quái

      // Thái Cực Âm Dương (Yin-Yang) ở trung tâm (Xoay ngược chiều)
      ctx.save();
      ctx.rotate(-this.angle * 1.5);
      const rYinYang = radius * 0.35;

      // Nửa Đen (Âm)
      ctx.fillStyle = '#0a0a1a';
      ctx.beginPath();
      ctx.arc(0, 0, rYinYang, -Math.PI / 2, Math.PI / 2);
      ctx.arc(0, rYinYang / 2, rYinYang / 2, Math.PI / 2, -Math.PI / 2);
      ctx.arc(0, -rYinYang / 2, rYinYang / 2, Math.PI / 2, -Math.PI / 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.stroke();

      // Nửa Vàng Kim (Dương)
      ctx.fillStyle = '#d4af37';
      ctx.beginPath();
      ctx.arc(0, 0, rYinYang, Math.PI / 2, -Math.PI / 2);
      ctx.arc(0, -rYinYang / 2, rYinYang / 2, -Math.PI / 2, Math.PI / 2);
      ctx.arc(0, rYinYang / 2, rYinYang / 2, -Math.PI / 2, Math.PI / 2, true);
      ctx.closePath();
      ctx.fill();

      // Mắt Dương trong phần Âm
      ctx.fillStyle = '#d4af37';
      ctx.beginPath();
      ctx.arc(0, rYinYang / 2, rYinYang * 0.16, 0, Math.PI * 2);
      ctx.fill();

      // Mắt Âm trong phần Dương
      ctx.fillStyle = '#0a0a1a';
      ctx.beginPath();
      ctx.arc(0, -rYinYang / 2, rYinYang * 0.16, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      ctx.restore();
    },

    /**
     * Chế độ 2: Tinh Vân Bắc Đẩu (Constellations & Cosmic Dust)
     */
    drawStarsScene: function () {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      ctx.fillStyle = '#04030d';
      ctx.fillRect(0, 0, w, h);

      // Chòm sao Bắc Đẩu Thất Tinh tọa độ chuẩn hóa
      const stars = [
        { name: 'Tham Lang', x: w * 0.22, y: h * 0.35, r: 5, color: '#ffd700' },
        { name: 'Cự Môn', x: w * 0.32, y: h * 0.45, r: 4.5, color: '#7dd3fc' },
        { name: 'Lộc Tồn', x: w * 0.45, y: h * 0.48, r: 4.5, color: '#34d399' },
        { name: 'Văn Khúc', x: w * 0.55, y: h * 0.38, r: 4, color: '#c084fc' },
        { name: 'Liêm Trinh', x: w * 0.65, y: h * 0.32, r: 4.5, color: '#f43f5e' },
        { name: 'Vũ Khúc', x: w * 0.75, y: h * 0.42, r: 5, color: '#facc15' },
        { name: 'Phá Quân', x: w * 0.85, y: h * 0.58, r: 5.5, color: '#ef4444' }
      ];

      // Vẽ đường kết nối sao
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let i = 0; i < stars.length; i++) {
        const offset = Math.sin(this.angle + i) * 3;
        if (i === 0) ctx.moveTo(stars[i].x, stars[i].y + offset);
        else ctx.lineTo(stars[i].x, stars[i].y + offset);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Vẽ các vì sao rực sáng
      stars.forEach((s, idx) => {
        const pulse = Math.sin(this.angle * 2 + idx) * 1.5;
        const currentY = s.y + Math.sin(this.angle + idx) * 3;

        // Vầng hào quang
        const rad = ctx.createRadialGradient(s.x, currentY, 0, s.x, currentY, s.r * 5);
        rad.addColorStop(0, s.color);
        rad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = rad;
        ctx.beginPath();
        ctx.arc(s.x, currentY, s.r * 5, 0, Math.PI * 2);
        ctx.fill();

        // Điểm sao sáng
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(s.x, currentY, s.r + pulse, 0, Math.PI * 2);
        ctx.fill();

        // Tên sao
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '11px "Be Vietnam Pro", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(s.name, s.x, currentY + 18);
      });
    },

    /**
     * Chế độ 3: Sóng Năng Lượng Dao Động 432Hz
     */
    drawWaveScene: function () {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      ctx.fillStyle = '#060414';
      ctx.fillRect(0, 0, w, h);

      const lines = 6;
      for (let l = 0; l < lines; l++) {
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `hsla(${40 + l * 35}, 80%, 60%, 0.6)`;

        for (let x = 0; x < w; x += 6) {
          const freq = 0.012 + l * 0.003;
          const y = h / 2 + Math.sin(x * freq + this.angle * (1.5 + l * 0.4)) * (40 + l * 12);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    },

    /**
     * Web Audio API Synthesizer - Âm thoa thiền định 432Hz & Chuông xoay Tây Tạng
     */
    toggleSound: function () {
      if (this.isPlayingSound) {
        this.stopSound();
      } else {
        this.playSound();
      }
    },

    playSound: function () {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!this.audioCtx) {
          this.audioCtx = new AudioContext();
        }
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }

        const now = this.audioCtx.currentTime;
        const freqs = [432, 528, 216]; // Tần số thiền định & chữa lành năng lượng

        this.oscillators = [];
        this.gainNodes = [];

        freqs.forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = idx === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          // Tạo rung nhẹ tự nhiên
          const lfo = this.audioCtx.createOscillator();
          const lfoGain = this.audioCtx.createGain();
          lfo.frequency.value = 0.2 + idx * 0.1;
          lfoGain.gain.value = 1.5;
          lfo.connect(osc.frequency);
          lfo.start();

          // Envelope nhẹ nhàng không chói gắt
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.08 / (idx + 1), now + 3);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now);

          this.oscillators.push(osc);
          this.gainNodes.push(gain);
        });

        this.isPlayingSound = true;
        try { localStorage.setItem('mystic_sound_muted', 'false'); } catch (e) {}
        this.updateSoundBtn(true);
      } catch (err) {
        console.warn('Web Audio error:', err);
      }
    },

    stopSound: function () {
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      this.gainNodes.forEach(g => {
        g.gain.linearRampToValueAtTime(0.001, now + 1.2);
      });
      setTimeout(() => {
        this.oscillators.forEach(o => {
          try { o.stop(); o.disconnect(); } catch (e) {}
        });
        this.oscillators = [];
        this.gainNodes = [];
        this.isPlayingSound = false;
        try { localStorage.setItem('mystic_sound_muted', 'true'); } catch (e) {}
        this.updateSoundBtn(false);
      }, 1250);
    },

    updateSoundBtn: function (playing) {
      const btn = document.getElementById('btnSoundToggle');
      const icon = document.getElementById('soundIcon');
      const text = document.getElementById('soundText');

      if (btn) btn.classList.toggle('playing', playing);
      if (icon) {
        icon.innerHTML = playing
          ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-3px;margin-right:4px;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>'
          : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-3px;margin-right:4px;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
      }
      if (text) text.textContent = playing ? 'Tắt Chuông Thiền 432Hz' : 'Bật Chuông Thiền 432Hz';
    }
  };

  // Khởi chạy khi tài liệu tải xong
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MysticVideo.init());
  } else {
    MysticVideo.init();
  }

  global.MysticVideo = MysticVideo;
})(typeof window !== 'undefined' ? window : this);

