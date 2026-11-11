/**
 * ============================================================================
 * XEM TỬ VI HUYỀN HỌC - THẺ TÓM TẮT MỆNH BÀN VIRAL (SPOTIFY WRAPPED STYLE)
 * Tạo ảnh thẻ phong thủy nghệ thuật chuẩn tỷ lệ Story / TikTok (1080 x 1920)
 * ============================================================================
 */

(function (global) {
  'use strict';

  const TuViShare = {
    _cachedBlob: null,
    _cachedDataUrl: '',

    getFirstNameOnly: function (fullName) {
      if (!fullName || typeof fullName !== 'string') return 'Quý Đương Số';
      const parts = fullName.trim().split(/\s+/);
      return parts[parts.length - 1] || 'Quý Đương Số';
    },

    computeKeywords: function (laSo) {
      if (!laSo || !laSo.cung) return ['Nội Tâm Sâu Sắc', 'Hậu Vận Phát Đạt', 'Nhân Duyên Tốt Lành'];
      
      const pMenh = laSo.cung[laSo.cungMenh ? laSo.cungMenh.chiIndex : 0];
      const pThan = laSo.cung[laSo.cungThan ? laSo.cungThan.chiIndex : 0];
      const pPhuThe = laSo.cung.find(c => c.cungName.includes('PHU THÊ')) || pMenh;

      const ctMenh = (pMenh.chinhTinh || []).map(s => s.name).join(' ');
      const ctThan = (pThan.chinhTinh || []).map(s => s.name).join(' ');
      const ptAll = [
        ...(pMenh.phuTinhLeft || []),
        ...(pMenh.phuTinhRight || []),
        ...(pPhuThe.phuTinhLeft || []),
        ...(pPhuThe.phuTinhRight || [])
      ].map(s => s.name).join(' ');

      // Từ khóa 1: Tính cách & Khí chất
      let kw1 = 'Nội Tâm Kiêu Hãnh';
      if (ctMenh.includes('Tử Vi') || ctMenh.includes('Thiên Phủ')) kw1 = 'Khí Chất Đế Vương';
      else if (ctMenh.includes('Thái Dương')) kw1 = 'Nội Tâm Kiêu Hãnh';
      else if (ctMenh.includes('Thái Âm')) kw1 = 'Trực Giác Nhạy Bén';
      else if (ctMenh.includes('Vũ Khúc')) kw1 = 'Ý Chí Gang Thép';
      else if (ctMenh.includes('Thiên Cơ')) kw1 = 'Mưu Lược Thần Sầu';
      else if (ctMenh.includes('Thiên Đồng')) kw1 = 'Tâm Hồn Phúc Hậu';
      else if (ctMenh.includes('Liêm Trinh')) kw1 = 'Nguyên Tắc Thép';
      else if (ctMenh.includes('Tham Lang')) kw1 = 'Đam Mê Bùng Nổ';
      else if (ctMenh.includes('Cự Môn')) kw1 = 'Biện Luận Sắc Bén';
      else if (ctMenh.includes('Thiên Tướng')) kw1 = 'Trọng Nghĩa Khinh Tài';
      else if (ctMenh.includes('Thiên Lương')) kw1 = 'Thanh Cao Tự Tại';
      else if (ctMenh.includes('Thất Sát')) kw1 = 'Bản Lĩnh Tiên Phong';
      else if (ctMenh.includes('Phá Quân')) kw1 = 'Phá Cách Đột Phá';

      // Từ khóa 2: Vận thế & Tài sản
      let kw2 = 'Hậu Vận Phát Tài';
      const thanName = (laSo.thanCu || '').toLowerCase();
      if (thanName.includes('tài')) kw2 = 'Tụ Tài Đắc Lộc';
      else if (thanName.includes('quan')) kw2 = 'Công Danh Hiển Đạt';
      else if (thanName.includes('phúc')) kw2 = 'Âm Đức Trường Tồn';
      else if (thanName.includes('điền')) kw2 = 'Điền Sản Vượng Phát';
      else if (thanName.includes('di')) kw2 = 'Viễn Xứ Đắc Thời';
      else if (ctThan.includes('Vũ Khúc') || ctThan.includes('Thiên Phủ') || ctThan.includes('Hóa Lộc')) kw2 = 'Đại Khí Vãn Thành';
      else if (ctThan.includes('Hóa Quyền') || ctThan.includes('Tử Vi')) kw2 = 'Uy Danh Vững Vàng';
      else kw2 = 'Tiền Bần Hậu Phú';

      // Từ khóa 3: Tình duyên & Quý nhân
      let kw3 = 'Đào Hoa Ngầm';
      if (ptAll.includes('Đào hoa') || ptAll.includes('Hồng loan')) kw3 = 'Đào Hoa Thu Hút';
      else if (ptAll.includes('Hóa Khoa') || ptAll.includes('Văn Xương') || ptAll.includes('Văn Khúc')) kw3 = 'Tài Hoa Xuất Chúng';
      else if (ptAll.includes('Thiên Khôi') || ptAll.includes('Thiên Việt')) kw3 = 'Quý Nhân Phò Trợ';
      else if (ptAll.includes('Hóa Lộc') || ptAll.includes('Lộc Tồn')) kw3 = 'Vượng Khí Tràn Trề';
      else if (ptAll.includes('Cô thần') || ptAll.includes('Quả tú')) kw3 = 'Độc Hành Tự Cường';

      return [kw1, kw2, kw3];
    },

    computeEnergyScores: function (laSo) {
      if (!laSo || !laSo.cung) return { taiLoc: 86, suNghiep: 90, daoHoa: 75 };
      
      const pMenh = laSo.cung[laSo.cungMenh ? laSo.cungMenh.chiIndex : 0];
      const pTai = laSo.cung.find(c => c.cungName.includes('TÀI BẠCH')) || pMenh;
      const pQuan = laSo.cung.find(c => c.cungName.includes('QUAN LỘC')) || pMenh;
      const pPhuThe = laSo.cung.find(c => c.cungName.includes('PHU THÊ')) || pMenh;

      const starsTai = [...(pTai.chinhTinh || []), ...(pTai.phuTinhLeft || []), ...(pTai.phuTinhRight || [])].map(s => s.name);
      const starsQuan = [...(pQuan.chinhTinh || []), ...(pQuan.phuTinhLeft || []), ...(pQuan.phuTinhRight || [])].map(s => s.name);
      const starsPhu = [...(pPhuThe.chinhTinh || []), ...(pPhuThe.phuTinhLeft || []), ...(pPhuThe.phuTinhRight || [])].map(s => s.name);

      let taiLoc = 72;
      if (starsTai.includes('Hóa Lộc')) taiLoc += 14;
      if (starsTai.includes('Lộc tồn')) taiLoc += 12;
      if (starsTai.includes('Thiên Phủ') || starsTai.includes('Vũ Khúc')) taiLoc += 10;
      if (starsTai.includes('Thái Âm')) taiLoc += 8;
      if (starsTai.includes('Địa không') || starsTai.includes('Địa kiếp')) taiLoc -= 8;
      if (starsTai.includes('Đại hao') || starsTai.includes('Tiểu hao')) taiLoc -= 5;
      taiLoc = Math.min(98, Math.max(62, taiLoc));

      let suNghiep = 75;
      if (starsQuan.includes('Hóa Quyền')) suNghiep += 14;
      if (starsQuan.includes('Tử Vi') || starsQuan.includes('Thái Dương')) suNghiep += 12;
      if (starsQuan.includes('Hóa Khoa') || starsQuan.includes('Quốc ấn')) suNghiep += 10;
      if (starsQuan.includes('Tả phù') || starsQuan.includes('Hữu bật')) suNghiep += 8;
      if (starsQuan.includes('Kình dương') || starsQuan.includes('Đà la')) suNghiep -= 7;
      if (starsQuan.includes('Triệt')) suNghiep -= 6;
      suNghiep = Math.min(99, Math.max(65, suNghiep));

      let daoHoa = 68;
      if (starsPhu.includes('Đào hoa') || starsPhu.includes('Hồng loan')) daoHoa += 18;
      if (starsPhu.includes('Thiên hỷ') || starsPhu.includes('Hóa Khoa')) daoHoa += 10;
      if (starsPhu.includes('Văn Xương') || starsPhu.includes('Văn Khúc')) daoHoa += 8;
      if (starsPhu.includes('Tham Lang') || starsPhu.includes('Liêm Trinh')) daoHoa += 8;
      if (starsPhu.includes('Cô thần') || starsPhu.includes('Quả tú')) daoHoa -= 10;
      daoHoa = Math.min(96, Math.max(55, daoHoa));

      return { taiLoc, suNghiep, daoHoa };
    },

    initModalDOM: function () {
      if (document.getElementById('shareableCardModal')) return;

      const html = `
        <div id="shareableCardModal" class="share-card-modal">
          <div class="share-modal-backdrop" onclick="TuViShare.closeModal()"></div>
          <div class="share-modal-card" style="max-width: 480px; width: 92%; max-height: 92vh; overflow-y: auto;">
            <button class="sample-gallery-close" type="button" aria-label="Đóng" onclick="TuViShare.closeModal()">&times;</button>
            <div style="text-align: center; margin-bottom: 0.85rem;">
              <span style="background: rgba(163, 40, 31, 0.1); color: var(--seal, #A3281F); font-size: 0.78rem; font-weight: 700; padding: 2px 10px; border-radius: 4px; text-transform: uppercase;">
                ✨ Spotify Wrapped Style
              </span>
              <h3 style="font-family: var(--font-heading); color: var(--seal, #A3281F); font-size: 1.25rem; margin: 6px 0 3px;">
                THẺ TÓM TẮT MỆNH BÀN 2026
              </h3>
              <p style="font-size: 0.84rem; color: var(--text-muted); margin: 0;">
                Chuẩn kích thước 9:16 sắc nét · Đăng Stories, Threads, TikTok, Facebook
              </p>
            </div>

            <div id="shareCardPreviewWrap" style="text-align: center; background: #000; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.35);">
              <img id="shareCardImagePreview" src="" alt="Thẻ Tóm Tắt Mệnh Bàn 2026" style="width: 100%; max-height: 520px; object-fit: contain; display: block; margin: 0 auto;">
            </div>

            <div style="display: flex; gap: 8px; justify-content: center; margin-top: 1rem; flex-wrap: wrap;">
              <button id="btnDownloadShareCard" class="btn-seal" style="padding: 0.65rem 1.15rem; font-size: 0.88rem; flex: 1; min-width: 140px; display: inline-flex; align-items: center; justify-content: center;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right: 5px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Tải Ảnh Về Máy
              </button>

              <button id="btnCopyShareCard" type="button" class="btn-ghost" style="padding: 0.65rem 1.1rem; font-size: 0.88rem; border: 1.5px solid var(--line, #CFC2A6); color: var(--text); border-radius: 5px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 5px;"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                Sao Chép Ảnh
              </button>

              <button id="btnNativeShareCard" type="button" class="btn-ghost" style="padding: 0.65rem 1.1rem; font-size: 0.88rem; border: 1.5px solid var(--brass, #B08A3E); color: var(--seal); border-radius: 5px; cursor: pointer; display: none; align-items: center; justify-content: center;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 5px;"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                Chia Sẻ Ngay
              </button>
            </div>
            
            <p style="text-align: center; font-size: 0.76rem; color: var(--text-muted); margin: 0.75rem 0 0;">
              ⚡ Mẹo: Nhấn <strong>"Sao Chép Ảnh"</strong> để dán trực tiếp vào Story Instagram, Threads hoặc Zalo mà không cần lưu vào thư viện!
            </p>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', html);
    },

    openModal: function (dataUrl, blob) {
      this._cachedBlob = blob;
      this._cachedDataUrl = dataUrl;

      this.initModalDOM();
      const modal = document.getElementById('shareableCardModal');
      const img = document.getElementById('shareCardImagePreview');
      const downloadBtn = document.getElementById('btnDownloadShareCard');
      const copyBtn = document.getElementById('btnCopyShareCard');
      const shareBtn = document.getElementById('btnNativeShareCard');

      if (img) img.src = dataUrl;

      if (downloadBtn) {
        downloadBtn.onclick = () => {
          const a = document.createElement('a');
          a.download = `menh-ban-2026-${Date.now()}.png`;
          a.href = dataUrl;
          a.click();
          if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
            TuViApp.showToast('Đang tải ảnh thẻ Mệnh Bàn về thiết bị của bạn!', 'success');
          }
        };
      }

      if (copyBtn) {
        copyBtn.onclick = async () => {
          try {
            if (navigator.clipboard && navigator.clipboard.write && blob) {
              const item = new ClipboardItem({ 'image/png': blob });
              await navigator.clipboard.write([item]);
              if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
                TuViApp.showToast('✅ Đã sao chép ảnh thẻ vào bộ nhớ tạm! Bạn có thể dán (Paste) ngay vào Story Threads, Zalo, Messenger.', 'success');
              } else {
                alert('Đã sao chép ảnh! Bạn có thể dán ngay vào mạng xã hội.');
              }
            } else {
              // Fallback download if clipboard API not available
              downloadBtn.click();
            }
          } catch (err) {
            downloadBtn.click();
          }
        };
      }

      if (shareBtn) {
        if (navigator.share && blob) {
          shareBtn.style.display = 'inline-flex';
          shareBtn.onclick = async () => {
            try {
              const file = new File([blob], 'the-menh-ban-2026.png', { type: 'image/png' });
              await navigator.share({
                title: 'Thẻ Mệnh Bàn Tử Vi 2026',
                text: 'Giải mã vận mệnh lá số chính tông tại xemtuvihuyenhoc.com',
                files: [file]
              });
            } catch (err) {
              if (err.name !== 'AbortError') console.log('Share error:', err);
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
     * Sinh Thẻ Ảnh 1080x1920 (9:16) chuẩn phong cách Cổ Phong Hoàng Gia & Spotify Wrapped
     */
    generateCard: function (laSo) {
      if (!laSo) {
        if (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) {
          laSo = TuViChart._currentLaSo;
        } else {
          if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
            TuViApp.showToast('Vui lòng lập lá số trước khi xuất thẻ mệnh bàn!', 'warning');
          }
          return;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');

      // 1. NỀN HOÀNG GIA CỔ PHONG (Deep Crimson & Royal Indigo Gradient)
      const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
      bgGrad.addColorStop(0, '#26060B');   // Đỏ son cung đình thẫm
      bgGrad.addColorStop(0.35, '#140D1F'); // Chàm thẫm
      bgGrad.addColorStop(0.7, '#0E0818');  // Tử khí đông lai
      bgGrad.addColorStop(1, '#1A070B');    // Chân thẻ đỏ gụ
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1920);

      // Điểm xuyết tinh vân sao vàng lấp lánh
      for (let i = 0; i < 110; i++) {
        const x = (Math.sin(i * 99) * 0.5 + 0.5) * 1080;
        const y = (Math.cos(i * 37) * 0.5 + 0.5) * 1920;
        const r = (i % 3 === 0) ? 2.2 : 1.2;
        const a = 0.25 + (i % 5) * 0.12;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(243, 217, 139, ${a})`;
        ctx.fill();
      }

      // 2. KHUNG VIỀN VÀNG HOÀNG GIA KÉP (Double Royal Gold Borders)
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 3.5;
      ctx.strokeRect(50, 50, 980, 1820);

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(64, 64, 952, 1792);

      // Họa tiết góc cổ kính 4 góc
      const drawCorner = (x, y, sx, sy) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(sx, sy);
        ctx.strokeStyle = '#F3D98B';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 36);
        ctx.lineTo(0, 0);
        ctx.lineTo(36, 0);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(8, 28);
        ctx.lineTo(8, 8);
        ctx.lineTo(28, 8);
        ctx.stroke();
        ctx.restore();
      };
      drawCorner(78, 78, 1, 1);
      drawCorner(1002, 78, -1, 1);
      drawCorner(78, 1842, 1, -1);
      drawCorner(1002, 1842, -1, -1);

      // 3. VÒNG BÁT QUÁI MỜ CHÌM LÀM WATERMARK
      ctx.save();
      ctx.translate(540, 960);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.06)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 420, 0, Math.PI * 2);
      ctx.arc(0, 0, 320, 0, Math.PI * 2);
      ctx.arc(0, 0, 200, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 4. HEADER: THƯƠNG HIỆU & CHỦ ĐỀ
      ctx.textAlign = 'center';
      
      // Huy hiệu mạ vàng nhỏ
      ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
      ctx.fillRect(360, 110, 360, 36);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(360, 110, 360, 36);

      ctx.fillStyle = '#F3D98B';
      ctx.font = 'bold 16px "Segoe UI", Arial, sans-serif';
      ctx.fillText('✦ MỆNH BÀN 2026 · WRAPPED EDITION ✦', 540, 134);

      ctx.fillStyle = '#FFF6D6';
      ctx.font = 'bold 38px "Times New Roman", Georgia, serif';
      ctx.fillText('XEM TỬ VI HUYỀN HỌC', 540, 195);

      ctx.fillStyle = 'rgba(243, 217, 139, 0.75)';
      ctx.font = '500 20px "Segoe UI", Arial, sans-serif';
      ctx.fillText('LÁ SỐ TỬ VI ĐẨU SỐ CHÍNH TÔNG VIỆT NAM', 540, 230);

      // Dải phân cách hoa văn
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctx.beginPath();
      ctx.moveTo(260, 260);
      ctx.lineTo(820, 260);
      ctx.stroke();

      // 5. THÔNG TIN ĐƯƠNG SỐ
      const hoTen = (laSo.hoTen || 'ĐƯƠNG SỐ').toUpperCase();
      const namSinh = laSo.namSinh || 2002;
      const canChiNam = laSo.canChiNam || 'Nhâm Ngọ';
      const napAm = laSo.napAm || 'Dương Liễu Mộc';
      const cuc = (laSo.cucInfo && laSo.cucInfo.name) ? laSo.cucInfo.name : (laSo.cuc || 'Hỏa Lục Cục');

      ctx.fillStyle = '#F3D98B';
      ctx.font = 'bold 56px "Times New Roman", Georgia, serif';
      ctx.fillText(hoTen, 540, 340);

      ctx.fillStyle = '#EAE0CB';
      ctx.font = '500 24px "Segoe UI", Arial, sans-serif';
      ctx.fillText(`${canChiNam} (${namSinh}) · ${napAm} · ${cuc}`, 540, 385);

      // 6. KHỐI 1: CUNG MỆNH & CUNG THÂN
      const pMenh = laSo.cung[laSo.cungMenh ? laSo.cungMenh.chiIndex : 0] || {};
      const pThan = laSo.cung[laSo.cungThan ? laSo.cungThan.chiIndex : 0] || {};

      const ctMenh = (pMenh.chinhTinh && pMenh.chinhTinh.length > 0)
        ? pMenh.chinhTinh.map(s => `${s.name}${s.dacHam ? ` (${s.dacHam})` : ''}`).join(', ')
        : 'Vô Chính Diệu';

      const ctThan = (pThan.chinhTinh && pThan.chinhTinh.length > 0)
        ? pThan.chinhTinh.map(s => `${s.name}${s.dacHam ? ` (${s.dacHam})` : ''}`).join(', ')
        : 'Vô Chính Diệu';

      const thanCu = (laSo.thanCu || 'Mệnh').toUpperCase();

      // Vẽ Card Cung Mệnh & Thân
      ctx.fillStyle = 'rgba(20, 14, 32, 0.78)';
      ctx.fillRect(120, 430, 840, 190);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(120, 430, 840, 190);

      // Cột Mệnh (Trái)
      ctx.textAlign = 'left';
      ctx.fillStyle = '#B08A3E';
      ctx.font = 'bold 20px "Segoe UI", Arial, sans-serif';
      ctx.fillText(`✦ CUNG MỆNH (TỌA ${pMenh.chi || 'TỴ'})`, 160, 480);

      ctx.fillStyle = '#FFF6D6';
      ctx.font = 'bold 26px "Times New Roman", Georgia, serif';
      ctx.fillText(ctMenh, 160, 525);

      ctx.fillStyle = 'rgba(234, 224, 203, 0.7)';
      ctx.font = '400 18px "Segoe UI", Arial, sans-serif';
      ctx.fillText(`Khí chất tiền vận · Bản tính cốt tủy`, 160, 565);

      // Vạch chia giữa
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
      ctx.beginPath();
      ctx.moveTo(540, 460);
      ctx.lineTo(540, 590);
      ctx.stroke();

      // Cột Thân (Phải)
      ctx.textAlign = 'left';
      ctx.fillStyle = '#B08A3E';
      ctx.font = 'bold 20px "Segoe UI", Arial, sans-serif';
      ctx.fillText(`✦ CUNG THÂN (CƯ ${thanCu})`, 580, 480);

      ctx.fillStyle = '#FFF6D6';
      ctx.font = 'bold 26px "Times New Roman", Georgia, serif';
      ctx.fillText(ctThan, 580, 525);

      ctx.fillStyle = 'rgba(234, 224, 203, 0.7)';
      ctx.font = '400 18px "Segoe UI", Arial, sans-serif';
      ctx.fillText(`Hậu vận từ 30 tuổi · Điểm tựa thành tựu`, 580, 565);

      // 7. KHỐI 2: 3 TỪ KHÓA ĐỊNH MỆNH (SPOTIFY WRAPPED HIGHLIGHT)
      const keywords = this.computeKeywords(laSo);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#F3D98B';
      ctx.font = 'bold 22px "Segoe UI", Arial, sans-serif';
      ctx.fillText('✦ 3 TỪ KHÓA ĐỊNH MỆNH CỦA BẠN ✦', 540, 675);

      // Hộp sơn mài chữ vàng
      ctx.fillStyle = 'rgba(163, 40, 31, 0.25)';
      ctx.fillRect(120, 710, 840, 150);
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2;
      ctx.strokeRect(120, 710, 840, 150);

      // Vẽ 3 Pill Badges
      const pillWidth = 245;
      const pillGap = 20;
      const startX = 120 + (840 - (pillWidth * 3 + pillGap * 2)) / 2;

      keywords.forEach((kw, kIdx) => {
        const px = startX + kIdx * (pillWidth + pillGap);
        const py = 750;

        ctx.fillStyle = 'rgba(27, 23, 20, 0.85)';
        ctx.fillRect(px, py, pillWidth, 70);
        ctx.strokeStyle = 'rgba(243, 217, 139, 0.6)';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(px, py, pillWidth, 70);

        ctx.fillStyle = '#FFF2C5';
        ctx.font = 'bold 21px "Times New Roman", Georgia, serif';
        ctx.fillText(kw, px + pillWidth / 2, py + 43);
      });

      // 8. KHỐI 3: 3 THANH CHỈ SỐ NĂNG LƯỢNG NĂM 2026 – 2027
      const scores = this.computeEnergyScores(laSo);

      ctx.fillStyle = '#F3D98B';
      ctx.font = 'bold 22px "Segoe UI", Arial, sans-serif';
      ctx.fillText('✦ CHỈ SỐ NĂNG LƯỢNG VẬN KHÍ 2026 – 2027 ✦', 540, 920);

      ctx.fillStyle = 'rgba(20, 14, 32, 0.78)';
      ctx.fillRect(120, 950, 840, 350);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(120, 950, 840, 350);

      const drawEnergyBar = (label, score, y, icon) => {
        // Label & Score
        ctx.textAlign = 'left';
        ctx.fillStyle = '#FFF6D6';
        ctx.font = 'bold 24px "Times New Roman", Georgia, serif';
        ctx.fillText(`${icon} ${label}`, 160, y);

        ctx.textAlign = 'right';
        ctx.fillStyle = '#F3D98B';
        ctx.font = 'bold 26px "Segoe UI", Arial, sans-serif';
        ctx.fillText(`${score}%`, 920, y);

        // Track bar
        const bx = 160;
        const by = y + 16;
        const bw = 760;
        const bh = 18;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(bx, by, bw, bh);

        // Fill bar gradient
        const fillW = (bw * score) / 100;
        const barGrad = ctx.createLinearGradient(bx, by, bx + fillW, by);
        barGrad.addColorStop(0, '#B08A3E');
        barGrad.addColorStop(0.7, '#D4AF37');
        barGrad.addColorStop(1, '#FFF2A8');

        ctx.fillStyle = barGrad;
        ctx.fillRect(bx, by, fillW, bh);

        ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, by, bw, bh);
      };

      drawEnergyBar('Chỉ Số Tài Lộc Vận', scores.taiLoc, 1020, '💰');
      drawEnergyBar('Chỉ Số Sự Nghiệp & Uy Quyền', scores.suNghiep, 1125, '👑');
      drawEnergyBar('Chỉ Số Đào Hoa & Nhân Duyên', scores.daoHoa, 1230, '🌸');

      // 9. KHỐI 4: LỜI BÌNH ĐẠO TRỊ MỆNH & TRIẾT HỌC CỔ TRUYỀN
      ctx.textAlign = 'center';
      ctx.fillStyle = '#F3D98B';
      ctx.font = 'italic bold 28px "Times New Roman", Georgia, serif';
      ctx.fillText('“ Thời lai đồ điếu thành công dị · Vận khứ anh hùng ẩm hận đa ”', 540, 1375);

      ctx.fillStyle = '#E2DDD5';
      ctx.font = 'italic 22px "Times New Roman", Georgia, serif';
      ctx.fillText('Tâm sáng tự khắc phúc sinh · Đức dày tải vạn lộc', 540, 1420);

      ctx.fillStyle = 'rgba(234, 224, 203, 0.85)';
      ctx.font = '400 20px "Segoe UI", Arial, sans-serif';
      ctx.fillText('Chu kỳ 2026 (Bính Ngọ) mở ra bước ngoặt đột phá tài vận nếu biết nắm bắt thiên thời.', 540, 1465);

      // 10. CON DẤU MỘC HOÀNG GIA ĐỎ SON & QR CODE BRAND
      ctx.save();
      ctx.fillStyle = '#A3281F';
      ctx.beginPath();
      ctx.arc(540, 1600, 75, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 3.5;
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.font = 'bold 15px "Times New Roman", serif';
      ctx.fillText('✦ TỬ VI ✦', 540, 1585);
      ctx.fillText('CHÍNH TÔNG', 540, 1605);
      ctx.fillText('VIỆT NAM', 540, 1625);
      ctx.restore();

      // 11. CHÂN TRANG & THƯƠNG HIỆU
      ctx.textAlign = 'center';
      ctx.fillStyle = '#F3D98B';
      ctx.font = 'bold 26px "Segoe UI", Arial, sans-serif';
      ctx.fillText('Lập lá số & Giải mã vận mệnh tại:', 540, 1735);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 36px "Segoe UI", Arial, sans-serif';
      ctx.fillText('xemtuvihuyenhoc.com', 540, 1785);

      ctx.fillStyle = 'rgba(234, 224, 203, 0.65)';
      ctx.font = '400 18px "Segoe UI", Arial, sans-serif';
      ctx.fillText('Tra cứu Tử Vi Đẩu Số 100% Cổ Truyền Nam Phái · Không quảng cáo rác', 540, 1825);

      // Chuyển sang DataURL & Blob để hiển thị modal
      const dataUrl = canvas.toDataURL('image/png');
      canvas.toBlob((blob) => {
        TuViShare.openModal(dataUrl, blob);
      }, 'image/png');
    }
  };

  global.TuViShare = TuViShare;
})(typeof window !== 'undefined' ? window : this);
