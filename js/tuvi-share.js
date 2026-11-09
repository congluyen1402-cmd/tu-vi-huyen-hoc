/**
 * ============================================================================
 * XEM TỬ VI HUYỀN HỌC - SHAREABLE CARD GENERATOR (Requirement E)
 * Tạo ảnh thẻ phong thủy nghệ thuật chuẩn tỷ lệ Story / Post (1080 x 1350)
 * ============================================================================
 */

(function (global) {
  'use strict';

  const TuViShare = {
    // Trích xuất tên gọi riêng (First Name only - không để lộ tên đầy đủ hay ngày sinh)
    getFirstNameOnly: function (fullName) {
      if (!fullName || typeof fullName !== 'string') return 'Quý Đương Số';
      const parts = fullName.trim().split(/\s+/);
      return parts[parts.length - 1] || 'Quý Đương Số';
    },

    /**
     * Khởi tạo Modal xem trước và chia sẻ ảnh
     */
    initModalDOM: function () {
      if (document.getElementById('shareableCardModal')) return;

      const html = `
        <div id="shareableCardModal" class="share-card-modal">
          <div class="share-modal-backdrop" onclick="TuViShare.closeModal()"></div>
          <div class="share-modal-card">
            <button class="sample-gallery-close" onclick="TuViShare.closeModal()">&times;</button>
            <h3 style="font-family: var(--font-heading); color: var(--gold-light); font-size: 1.35rem; margin-bottom: 0.5rem;">
              ✦ THẺ BẢN MỆNH TỬ VI ✦
            </h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;">
              Lưu giữ hoặc chia sẻ lá số phong thủy tuyệt đẹp chuẩn kích thước 1080x1350
            </p>

            <div id="shareCardPreviewWrap">
              <img id="shareCardImagePreview" src="" alt="Thẻ Bản Mệnh Tử Vi" class="share-canvas-preview">
            </div>

            <div style="display: flex; gap: 10px; justify-content: center; margin-top: 1.2rem; flex-wrap: wrap;">
              <button id="btnDownloadShareCard" class="btn-gold-pill" style="padding: 0.65rem 1.4rem; font-size: 0.9rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="vertical-align: -2px; margin-right: 5px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Tải Ảnh PNG (1080x1350)
              </button>

              <button id="btnNativeShareCard" class="btn-gold-pill" style="padding: 0.65rem 1.4rem; font-size: 0.9rem; background: var(--surface-2); border: 1px solid var(--gold); color: var(--gold-light);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="vertical-align: -2px; margin-right: 5px;"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                Chia Sẻ Ngay
              </button>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', html);
    },

    openModal: function (dataUrl, blob) {
      this.initModalDOM();
      const modal = document.getElementById('shareableCardModal');
      const img = document.getElementById('shareCardImagePreview');
      const downloadBtn = document.getElementById('btnDownloadShareCard');
      const shareBtn = document.getElementById('btnNativeShareCard');

      if (img) img.src = dataUrl;

      if (downloadBtn) {
        downloadBtn.onclick = () => {
          const a = document.createElement('a');
          a.download = `la-so-tu-vi-ban-menh-${Date.now()}.png`;
          a.href = dataUrl;
          a.click();
        };
      }

      if (shareBtn) {
        if (navigator.share && blob) {
          shareBtn.style.display = 'inline-flex';
          shareBtn.onclick = async () => {
            try {
              const file = new File([blob], 'the-ban-menh-tu-vi.png', { type: 'image/png' });
              await navigator.share({
                title: 'Thẻ Bản Mệnh Tử Vi',
                text: 'Tra cứu Tử Vi chính tông cổ truyền tại xemtuvihuyenhoc.com',
                files: [file]
              });
            } catch (err) {
              if (err.name !== 'AbortError') {
                console.log('Native share error:', err);
              }
            }
          };
        } else {
          shareBtn.style.display = 'none';
        }
      }

      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    },

    closeModal: function () {
      const modal = document.getElementById('shareableCardModal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    },

    /**
     * Sinh Thẻ Ảnh 1080x1350 bằng HTML5 Canvas
     */
    generateCard: function (laSo) {
      if (!laSo) return;

      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1350;
      const ctx = canvas.getContext('2d');

      // 1. Nền Deep Indigo & Tinh Vân
      const bgGrad = ctx.createRadialGradient(540, 400, 50, 540, 675, 750);
      bgGrad.addColorStop(0, '#261b4d');
      bgGrad.addColorStop(0.5, '#131130');
      bgGrad.addColorStop(1, '#080714');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1350);

      // Điểm xuyết sao vàng li ti
      for (let i = 0; i < 90; i++) {
        const x = Math.random() * 1080;
        const y = Math.random() * 1350;
        const r = Math.random() * 1.8 + 0.5;
        const a = Math.random() * 0.7 + 0.2;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(243, 217, 139, ${a})`;
        ctx.fill();
      }

      // 2. Viền Vàng Hoàng Gia Kép
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 3;
      ctx.strokeRect(50, 50, 980, 1250);

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(62, 62, 956, 1226);

      // Họa tiết góc cổ kính
      const drawCorner = (x, y, sx, sy) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(sx, sy);
        ctx.strokeStyle = '#F3D98B';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(0, 30);
        ctx.lineTo(0, 0);
        ctx.lineTo(30, 0);
        ctx.stroke();
        ctx.restore();
      };
      drawCorner(75, 75, 1, 1);
      drawCorner(1005, 75, -1, 1);
      drawCorner(75, 1275, 1, -1);
      drawCorner(1005, 1275, -1, -1);

      // 3. Vòng Bát Quái Mờ làm Watermark trung tâm
      ctx.save();
      ctx.translate(540, 680);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.12)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 320, 0, Math.PI * 2);
      ctx.arc(0, 0, 240, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 4. Header Thương Hiệu
      ctx.textAlign = 'center';
      ctx.fillStyle = '#D4AF37';
      ctx.font = 'bold 42px "Times New Roman", Georgia, serif';
      ctx.fillText('☯', 540, 140);

      ctx.fillStyle = '#F3D98B';
      ctx.font = 'bold 36px "Times New Roman", Georgia, serif';
      ctx.fillText('XEM TỬ VI HUYỀN HỌC', 540, 195);

      ctx.fillStyle = 'rgba(245, 239, 224, 0.75)';
      ctx.font = '600 20px "Segoe UI", Arial, sans-serif';
      ctx.fillText('LÁ SỐ TỬ VI CHÍNH TÔNG CỔ TRUYỀN', 540, 230);

      // Đường kẻ phân cách
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(280, 260);
      ctx.lineTo(800, 260);
      ctx.stroke();

      // 5. Thông tin Bản Mệnh (Chỉ hiển thị tên riêng, bảo vệ quyền riêng tư)
      const firstName = this.getFirstNameOnly(laSo.hoTen);
      const napAm = laSo.napAm || 'Chưa rõ';
      const cuc = laSo.cucInfo ? laSo.cucInfo.name : 'Chưa định Cục';
      const chinhTinh = laSo.cungMenh && laSo.cungMenh.chinhTinh && laSo.cungMenh.chinhTinh.length > 0 
        ? laSo.cungMenh.chinhTinh.map(s => `${s.name}${s.dacHam ? ` (${s.dacHam})` : ''}`).join(', ')
        : 'Vô Chính Diệu';
      const cungMenhChi = laSo.cungMenh ? laSo.cungMenh.chi : '';

      ctx.fillStyle = '#F5EFE0';
      ctx.font = '300 24px "Segoe UI", Arial, sans-serif';
      ctx.fillText('THẺ BẢN MỆNH PHONG THỦY', 540, 340);

      ctx.fillStyle = '#F3D98B';
      ctx.font = 'bold 54px "Times New Roman", Georgia, serif';
      ctx.fillText(`ĐƯƠNG SỐ · ${firstName.toUpperCase()}`, 540, 420);

      // Khung chứa thông số chính
      ctx.fillStyle = 'rgba(30, 27, 63, 0.75)';
      ctx.fillRect(180, 480, 720, 360);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctx.lineWidth = 1;
      ctx.strokeRect(180, 480, 720, 360);

      const drawMetaRow = (label, val, y) => {
        ctx.textAlign = 'left';
        ctx.fillStyle = '#B8B2A0';
        ctx.font = '500 24px "Segoe UI", Arial, sans-serif';
        ctx.fillText(label, 220, y);

        ctx.textAlign = 'right';
        ctx.fillStyle = '#FFF6D6';
        ctx.font = 'bold 26px "Times New Roman", Georgia, serif';
        ctx.fillText(val, 860, y);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.beginPath();
        ctx.moveTo(220, y + 20);
        ctx.lineTo(860, y + 20);
        ctx.stroke();
      };

      drawMetaRow('Bản Mệnh:', napAm, 550);
      drawMetaRow('Cục Số:', cuc, 630);
      drawMetaRow('Cung Mệnh:', `Tọa ${cungMenhChi}`, 710);
      drawMetaRow('Chính Tinh:', chinhTinh, 790);

      // 6. Câu Châm Ngôn Triết Đạo
      ctx.textAlign = 'center';
      ctx.fillStyle = '#D4AF37';
      ctx.font = 'italic 28px "Times New Roman", Georgia, serif';
      ctx.fillText('“ Tận nhân lực, tri thiên mệnh ”', 540, 930);

      ctx.fillStyle = '#E2DDD5';
      ctx.font = 'italic 22px "Times New Roman", Georgia, serif';
      ctx.fillText('Tâm sáng tự khắc phúc sinh · Đức dày tải vạn lộc', 540, 975);

      // 7. Con Dấu Mộc Đỏ Hoàng Gia
      ctx.save();
      ctx.fillStyle = '#C8362D';
      ctx.beginPath();
      ctx.arc(840, 1100, 70, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 15px "Times New Roman", serif';
      ctx.fillText('✦ TỬ VI ✦', 840, 1085);
      ctx.fillText('CHÍNH TÔNG', 840, 1105);
      ctx.fillText('HOÀNG GIA', 840, 1125);
      ctx.restore();

      // 8. Chân Trang & Tên Miền
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(212, 175, 55, 0.9)';
      ctx.font = '600 22px "Segoe UI", Arial, sans-serif';
      ctx.fillText('www.xemtuvihuyenhoc.com', 540, 1230);

      // Chuyển sang DataURL & Blob để hiển thị modal
      const dataUrl = canvas.toDataURL('image/png');
      canvas.toBlob((blob) => {
        TuViShare.openModal(dataUrl, blob);
      }, 'image/png');
    }
  };

  global.TuViShare = TuViShare;
})(typeof window !== 'undefined' ? window : this);
