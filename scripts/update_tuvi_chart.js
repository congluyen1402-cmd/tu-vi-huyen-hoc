const fs = require('fs');

let code = fs.readFileSync('js/tuvi-chart.js', 'utf8');

const verificationMethods = `
  /**
   * Render Thanh Điều Hướng Giờ Sinh & Hộp 3 Điểm Nghiệm Lý Xác Thực
   */
  renderGioSinhVerification: function (laSo) {
    if (!laSo) return '';
    const canChiGio = laSo.canChiGio || '';
    const gioPhutText = laSo.gioPhutText || '';
    const dm = laSo.nghiemLyDienMao || 'Diện mạo đoan chính đôn hậu, ngũ quan hài hòa, phong thái đĩnh đạc tự nhiên.';
    const tc = laSo.nghiemLyTinhCach || 'Nội tâm kiên định, hành sự chu toàn thực tế, coi trọng danh dự và uy tín cá nhân.';
    const the = laSo.nghiemLyTheChat || 'Cơ thể nhìn chung lành tính; chú ý hệ tiêu hóa và giữ ấm đường hô hấp khi thời tiết chuyển mùa.';

    return \`
      <div class="gio-sinh-verification-wrap">
        <!-- Thanh công cụ chuyển nhanh giờ sinh -->
        <div class="gio-nav-toolbar">
          <button type="button" class="btn-gio-nav btn-gio-prev" onclick="TuViChart.shiftHour(-1)" title="Chuyển sang giờ sinh liền trước">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            <span>Giờ sinh trước</span>
          </button>
          <div class="gio-current-display">
            <span class="gio-nav-label">Giờ đang xem:</span>
            <strong class="gio-current-val">\${canChiGio} (\${gioPhutText})</strong>
          </div>
          <button type="button" class="btn-gio-nav btn-gio-next" onclick="TuViChart.shiftHour(1)" title="Chuyển sang giờ sinh liền sau">
            <span>Giờ sinh kế tiếp</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <!-- Hộp 3 Điểm Nghiệm Lý Xác Thực Giờ Sinh -->
        <div class="verification-box">
          <div class="verification-header">
            <div class="verification-title">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="verification-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>3 Điểm Nghiệm Lý Xác Thực Giờ Sinh</span>
            </div>
            <span class="verification-subtitle">Tự kiểm chứng diện mạo, tính cách & thể chất để xác định độ chuẩn xác của giờ sinh:</span>
          </div>
          <div class="verification-grid">
            <div class="verification-item">
              <div class="verification-item-head">
                <span class="ver-step-badge">1</span>
                <strong>Diện Mạo & Thần Khí (Mệnh)</strong>
              </div>
              <p class="verification-item-desc">\${dm}</p>
            </div>
            <div class="verification-item">
              <div class="verification-item-head">
                <span class="ver-step-badge">2</span>
                <strong>Tính Cách & Định Hướng (Thân)</strong>
              </div>
              <p class="verification-item-desc">\${tc}</p>
            </div>
            <div class="verification-item">
              <div class="verification-item-head">
                <span class="ver-step-badge">3</span>
                <strong>Thể Chất & Vết Sẹo (Tật Ách)</strong>
              </div>
              <p class="verification-item-desc">\${the}</p>
            </div>
          </div>
        </div>
      </div>
    \`;
  },

  /**
   * Chuyển đổi nhanh giờ sinh (-1: lùi 1 giờ, +1: tiến 1 giờ)
   */
  shiftHour: function (delta) {
    if (!this._currentLaSo) return;
    const inp = Object.assign({}, this._currentLaSo._input || {});
    let curGioIdx = inp.gioIndex !== undefined ? inp.gioIndex : 0;
    let newGioIdx = (curGioIdx + delta + 12) % 12;
    inp.gioIndex = newGioIdx;
    inp.gio = (newGioIdx === 0) ? 0 : newGioIdx * 2;
    inp.phut = 30;
    const diaChiNames = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
    inp.gioPhutText = \`\${inp.gio} giờ 30 phút (Giờ \${diaChiNames[newGioIdx]})\`;
    if (this._currentLaSo.hoTen) inp.hoTen = this._currentLaSo.hoTen;

    if (typeof TuViEngine !== 'undefined') {
      const newLaSo = TuViEngine.lapLaSo(inp);
      newLaSo.hoTen = this._currentLaSo.hoTen;
      this.render(newLaSo);

      if (typeof TuViApp !== 'undefined' && TuViApp.collapseForm) {
        TuViApp.collapseForm(newLaSo);
      } else if (typeof App !== 'undefined' && App.collapseForm) {
        App.collapseForm(newLaSo);
      }
    }
  },
`;

const targetAnchor = 'renderTraditionalChart: function (laSo) {';
code = code.replace(targetAnchor, verificationMethods + '\n  ' + targetAnchor);

const bannerTarget = '${this.renderSeasonalBanner(laSo)}';
code = code.replace(bannerTarget, bannerTarget + '\n      ${this.renderGioSinhVerification(laSo)}');

fs.writeFileSync('js/tuvi-chart.js', code, 'utf8');
fs.writeFileSync('public/js/tuvi-chart.js', code, 'utf8');
console.log('Successfully updated js/tuvi-chart.js and public/js/tuvi-chart.js');

