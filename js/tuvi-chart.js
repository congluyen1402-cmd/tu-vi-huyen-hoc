/**
 * ============================================================================
 * XEM TỬ VI HUYỀN HỌC - TỬ VI CHART RENDERER
 * Thiết kế giao diện lá số chuẩn Trống Đồng Đông Sơn theo mẫu Tra Cứu Tử Vi
 * ============================================================================
 */

const TuViChart = {
  _currentLaSo: null,

  // Tính Thiên Can - Địa Chi động theo năm Dương lịch (Item 7)
  getCanChiYear: function (year) {
    const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
    const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
    const y = parseInt(year, 10) || new Date().getFullYear();
    const can = CAN[(y + 6) % 10];
    const chi = CHI[(y + 8) % 12];
    return `${can} ${chi}`;
  },

  // Mã màu chuẩn Ngũ Hành theo bản gốc PDF
  ELEMENT_COLORS: {
    'Hỏa': '#cc0000', // Đỏ
    'Mộc': '#008000', // Xanh lục
    'Thủy': '#000000', // Đen
    'Kim': '#555555', // Xám
    'Thổ': '#b45309'  // Vàng cam / nâu
  },

  // Màu sắc định danh Cung Vị theo bản gốc Tra Cứu Tử Vi
  PALACE_COLORS: {
    'MỆNH': '#cc0000',
    'PHỤ MẪU': '#cc0000',
    'PHÚC ĐỨC': '#b45309',
    'ĐIỀN TRẠCH': '#334155',
    'QUAN LỘC': '#0f172a',
    'NÔ BỘC': '#cc0000',
    'THIÊN DI': '#0f172a',
    'TẬT ÁCH': '#cc0000',
    'TÀI BẠCH': '#b45309',
    'TỬ TỨC': '#0d9488',
    'PHU THÊ': '#16a34a',
    'HUYNH ĐỆ': '#ea580c'
  },

  /**
   * Tạo Vector Bát Quái Mờ Đằng Sau Lưới Lá Số theo chuẩn phong thủy
   */
  getBatQuaiSvg: function (size = 560) {
    return `
      <svg class="bat-quai-watermark-svg" width="${size}" height="${size}" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Vòng Tròn Ngoài Cùng Bát Quái -->
        <circle cx="250" cy="250" r="240" stroke="#8b5a2b" stroke-width="2.5" stroke-dasharray="6 4" opacity="0.6" />
        <circle cx="250" cy="250" r="230" stroke="#8b5a2b" stroke-width="1.5" opacity="0.5" />
        
        <!-- Bát Giác Cổ Kính (Octagon) -->
        <polygon points="179.8,32.2 320.2,32.2 419.5,131.5 419.5,271.8 320.2,371.1 179.8,371.1 80.5,271.8 80.5,131.5" 
          stroke="#8b5a2b" stroke-width="2" fill="none" opacity="0.4" />

        <!-- Vành tròn phân tầng bát quái -->
        <circle cx="250" cy="250" r="195" stroke="#8b5a2b" stroke-width="1.8" opacity="0.7" />
        <circle cx="250" cy="250" r="145" stroke="#8b5a2b" stroke-width="1.8" opacity="0.7" />
        <circle cx="250" cy="250" r="95" stroke="#8b5a2b" stroke-width="2" opacity="0.8" />

        <!-- 8 Quẻ Bát Quái (Trigrams) -->
        <!-- 1. CÀN ☰ -->
        <g transform="translate(250, 250) rotate(0) translate(-250, -250)">
          <text x="250" y="68" font-family="'Playfair Display', serif" font-size="16" font-weight="bold" fill="#8b5a2b" text-anchor="middle">乾</text>
          <rect x="230" y="78" width="40" height="4" rx="2" fill="#8b5a2b" />
          <rect x="230" y="86" width="40" height="4" rx="2" fill="#8b5a2b" />
          <rect x="230" y="94" width="40" height="4" rx="2" fill="#8b5a2b" />
        </g>
        <!-- 2. TỐN ☴ -->
        <g transform="translate(250, 250) rotate(45) translate(-250, -250)">
          <text x="250" y="68" font-family="'Playfair Display', serif" font-size="16" font-weight="bold" fill="#8b5a2b" text-anchor="middle">巽</text>
          <rect x="230" y="78" width="40" height="4" rx="2" fill="#8b5a2b" />
          <rect x="230" y="86" width="40" height="4" rx="2" fill="#8b5a2b" />
          <rect x="230" y="94" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="252" y="94" width="18" height="4" rx="2" fill="#8b5a2b" />
        </g>
        <!-- 3. KHẢM ☵ -->
        <g transform="translate(250, 250) rotate(90) translate(-250, -250)">
          <text x="250" y="68" font-family="'Playfair Display', serif" font-size="16" font-weight="bold" fill="#8b5a2b" text-anchor="middle">坎</text>
          <rect x="230" y="78" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="252" y="78" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="230" y="86" width="40" height="4" rx="2" fill="#8b5a2b" />
          <rect x="230" y="94" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="252" y="94" width="18" height="4" rx="2" fill="#8b5a2b" />
        </g>
        <!-- 4. CẤN ☶ -->
        <g transform="translate(250, 250) rotate(135) translate(-250, -250)">
          <text x="250" y="68" font-family="'Playfair Display', serif" font-size="16" font-weight="bold" fill="#8b5a2b" text-anchor="middle">艮</text>
          <rect x="230" y="78" width="40" height="4" rx="2" fill="#8b5a2b" />
          <rect x="230" y="86" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="252" y="86" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="230" y="94" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="252" y="94" width="18" height="4" rx="2" fill="#8b5a2b" />
        </g>
        <!-- 5. KHÔN ☷ -->
        <g transform="translate(250, 250) rotate(180) translate(-250, -250)">
          <text x="250" y="68" font-family="'Playfair Display', serif" font-size="16" font-weight="bold" fill="#8b5a2b" text-anchor="middle">坤</text>
          <rect x="230" y="78" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="252" y="78" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="230" y="86" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="252" y="86" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="230" y="94" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="252" y="94" width="18" height="4" rx="2" fill="#8b5a2b" />
        </g>
        <!-- 6. CHẤN ☳ -->
        <g transform="translate(250, 250) rotate(225) translate(-250, -250)">
          <text x="250" y="68" font-family="'Playfair Display', serif" font-size="16" font-weight="bold" fill="#8b5a2b" text-anchor="middle">震</text>
          <rect x="230" y="78" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="252" y="78" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="230" y="86" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="252" y="86" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="230" y="94" width="40" height="4" rx="2" fill="#8b5a2b" />
        </g>
        <!-- 7. LY ☲ -->
        <g transform="translate(250, 250) rotate(270) translate(-250, -250)">
          <text x="250" y="68" font-family="'Playfair Display', serif" font-size="16" font-weight="bold" fill="#8b5a2b" text-anchor="middle">離</text>
          <rect x="230" y="78" width="40" height="4" rx="2" fill="#8b5a2b" />
          <rect x="230" y="86" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="252" y="86" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="230" y="94" width="40" height="4" rx="2" fill="#8b5a2b" />
        </g>
        <!-- 8. ĐOÀI ☱ -->
        <g transform="translate(250, 250) rotate(315) translate(-250, -250)">
          <text x="250" y="68" font-family="'Playfair Display', serif" font-size="16" font-weight="bold" fill="#8b5a2b" text-anchor="middle">兌</text>
          <rect x="230" y="78" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="252" y="78" width="18" height="4" rx="2" fill="#8b5a2b" />
          <rect x="230" y="86" width="40" height="4" rx="2" fill="#8b5a2b" />
          <rect x="230" y="94" width="40" height="4" rx="2" fill="#8b5a2b" />
        </g>

        <!-- Tâm Âm Dương Thái Cực (Taijitu ☯) -->
        <g transform="translate(250, 250)">
          <circle cx="0" cy="0" r="90" fill="#fdfbf7" stroke="#8b5a2b" stroke-width="2" />
          <path d="M 0,-90 A 90,90 0 0,1 0,90 A 45,45 0 0,1 0,0 A 45,45 0 0,0 0,-90 Z" fill="#8b5a2b" opacity="0.85" />
          <path d="M 0,-90 A 90,90 0 0,0 0,90 A 45,45 0 0,1 0,0 A 45,45 0 0,0 0,-90 Z" fill="#fffef9" opacity="0.85" />
          <circle cx="0" cy="45" r="14" fill="#fffef9" stroke="#8b5a2b" stroke-width="1.5" />
          <circle cx="0" cy="-45" r="14" fill="#8b5a2b" />
        </g>
      </svg>
    `;
  },

  GRID_ORDER: [
    5, 6, 7, 8,    // Row 1: Tỵ, Ngọ, Mùi, Thân
    4, -1, -1, 9,  // Row 2: Thìn, [Center], [Center], Dậu
    3, -1, -1, 10, // Row 3: Mão, [Center], [Center], Tuất
    2, 1, 0, 11    // Row 4: Dần, Sửu, Tý, Hợi
  ],

  render: function (laSo) {
    if (!laSo) return;
    this._currentLaSo = laSo;

    // 1. Hiển thị Section Kết Quả
    const ketQuaSection = document.getElementById('ket-qua');
    if (ketQuaSection) {
      ketQuaSection.style.display = 'block';
      ketQuaSection.classList.add('visible');
    }

    // 2. Render Lá Số dạng Trống Đồng Đông Sơn
    this.renderTraditionalChart(laSo);

    // 3. Render Luận Giải Chi Tiết
    this.renderLuanGiai(laSo);

    // 4. Khuyến nghị Vật Phẩm Phong Thủy Hộ Mệnh (Thương Mại Hóa)
    if (typeof TuViMonetize !== 'undefined') {
      TuViMonetize.renderFengShuiItems(laSo);
    }

    // Khởi tạo lại Lucide line icons
    if (typeof window !== 'undefined' && window.lucide) {
      setTimeout(() => window.lucide.createIcons(), 60);
    }

    // Cuộn mượt mà đến lá số
    setTimeout(() => {
      const chartEl = document.getElementById('la-so-chart');
      if (chartEl) {
        chartEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 250);
  },

  /**
   * Render toàn bộ lưới lá số theo chuẩn PDF Tra Cứu Tử Vi
   */
  renderTraditionalChart: function (laSo) {
    const chartWrapper = document.getElementById('la-so-chart');
    if (!chartWrapper) return;

    let html = `
      <div class="la-so-actions-bar">
        <button class="btn-action-chart btn-action-vip" onclick="TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư (Mở Khóa 12 Cung)', 49000)"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:4px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Tải Báo Cáo VIP A4 (49.000đ)</button>
        <button class="btn-action-chart" onclick="window.print()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:4px;"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>In Lá Số</button>
        <button class="btn-action-chart" onclick="TuViChart.toggleLuanGiaiVisibility()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:4px;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>Xem / Ẩn Luận Giải</button>
        <button class="btn-action-chart btn-action-fengshui" onclick="TuViMonetize.scrollToFengShui()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:4px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Vật Phẩm Hợp Mệnh</button>
      </div>

      <div class="la-so-scroll-wrapper">
        <div class="la-so-paper-container" id="laSoPrintArea">
          <!-- Hình Bát Quái Mờ Đằng Sau Lưới Lá Số (Chính Tông Cổ Truyền) -->
          <div class="la-so-watermark-bg">
            ${this.getBatQuaiSvg(560)}
          </div>

          <div class="la-so-classical-grid">
    `;

    // Render từng ô theo Grid 4x4
    let centerRendered = false;
    for (let i = 0; i < this.GRID_ORDER.length; i++) {
      const chiIndex = this.GRID_ORDER[i];

      if (chiIndex === -1) {
        if (!centerRendered) {
          html += this.renderCenterBox(laSo);
          centerRendered = true;
        }
        continue;
      }

      html += this.renderPalaceCell(laSo, chiIndex);
    }

    html += `
          </div>

          <!-- Legend Chú Giải Ngũ Hành & Trạng Thái dưới cùng lá số -->
          <div class="la-so-legend-footer">
            <div class="legend-status">
              (M): Miếu địa; (V): Vượng địa; (Đ): Đắc địa; (B): Bình hòa; (H): Hãm địa
            </div>
            <div class="legend-elements">
              <span class="legend-item"><span class="color-box box-kim"></span> Kim</span>
              <span class="legend-item"><span class="color-box box-moc"></span> Mộc</span>
              <span class="legend-item"><span class="color-box box-thuy"></span> Thủy</span>
              <span class="legend-item"><span class="color-box box-hoa"></span> Hỏa</span>
              <span class="legend-item"><span class="color-box box-tho"></span> Thổ</span>
            </div>
          </div>
        </div>
      </div>
    `;

    chartWrapper.innerHTML = html;
  },

  /**
   * Render từng ô Cung (Palace Cell) chuẩn nguyên bản Tra Cứu Tử Vi
   */
  renderPalaceCell: function (laSo, chiIndex) {
    const cung = laSo.cung[chiIndex];
    const isMenh = chiIndex === laSo.cungMenh.chiIndex;
    const isThan = chiIndex === laSo.cungThan.chiIndex;

    // Kiểm tra Tuần / Triệt
    const hasTuan = laSo.tuan && laSo.tuan.includes(chiIndex);
    const hasTriet = laSo.triet && laSo.triet.includes(chiIndex);

    let tuanTrietBanner = '';
    // Tuần giữa Thân & Dậu (ở ô Thân hoặc ô Dậu)
    if (hasTuan && chiIndex === laSo.tuan[0]) {
      tuanTrietBanner = '<div class="tuan-triet-ribbon ribbon-tuan">Tuần</div>';
    }
    if (hasTriet && chiIndex === laSo.triet[0]) {
      tuanTrietBanner = '<div class="tuan-triet-ribbon ribbon-triet">Triệt</div>';
    }

    // Tiêu đề cung và màu sắc đặc trưng
    const titleColor = this.PALACE_COLORS[cung.cungName] || '#cc0000';
    const palaceTitle = isThan ? `${cung.cungName}&lt;THÂN&gt;` : cung.cungName;

    // Cột sao trái: Chính tinh + Cát tinh
    let leftColHtml = '';
    if (cung.chinhTinh && cung.chinhTinh.length > 0) {
      cung.chinhTinh.forEach(ct => {
        const color = this.ELEMENT_COLORS[ct.element] || '#cc0000';
        const sign = ct.sign || '+';
        const dacHam = ct.dacHam ? ` (${ct.dacHam})` : '';
        leftColHtml += `
          <div class="star-line star-chinh" style="color: ${color};">
            <span class="star-sign">${sign}</span>
            <strong class="star-name">${ct.name}</strong>${dacHam}
            ${ct.tuHoa ? `<span class="tu-hoa-badge">${ct.tuHoa}</span>` : ''}
          </div>
        `;
      });
    }

    if (cung.phuTinhLeft && cung.phuTinhLeft.length > 0) {
      cung.phuTinhLeft.forEach(pt => {
        const color = this.ELEMENT_COLORS[pt.element] || '#b45309';
        const dacHam = pt.dacHam ? ` (${pt.dacHam})` : '';
        leftColHtml += `
          <div class="star-line star-cat" style="color: ${color};">
            <span>${pt.name}</span>${dacHam}
            ${pt.tuHoa ? `<span class="tu-hoa-badge">${pt.tuHoa}</span>` : ''}
          </div>
        `;
      });
    }

    // Cột sao phải: Phụ tinh, Sát tinh, Bại tinh
    let rightColHtml = '';
    if (cung.phuTinhRight && cung.phuTinhRight.length > 0) {
      cung.phuTinhRight.forEach(pt => {
        const color = this.ELEMENT_COLORS[pt.element] || '#cc0000';
        const dacHam = pt.dacHam ? ` (${pt.dacHam})` : '';
        rightColHtml += `
          <div class="star-line star-sat" style="color: ${color};">
            <span>${pt.name}</span>${dacHam}
            ${pt.tuHoa ? `<span class="tu-hoa-badge">${pt.tuHoa}</span>` : ''}
          </div>
        `;
      });
    }

    return `
      <div class="cung-classical-cell ${isMenh ? 'cell-menh' : ''} ${isThan ? 'cell-than' : ''}" 
           data-chi="${chiIndex}">
        ${tuanTrietBanner}
        
        <!-- Header Cung -->
        <div class="cung-top-bar">
          <span class="cung-can-chi">${cung.canShort}.${cung.chi}</span>
          <span class="cung-main-title" style="color: ${titleColor};">${palaceTitle}</span>
          <span class="cung-dai-han-num">${cung.daiHan ? cung.daiHan.num : ''}</span>
        </div>

        <!-- Hai cột sao -->
        <div class="cung-stars-columns">
          <div class="cung-col-left">${leftColHtml}</div>
          <div class="cung-col-right">${rightColHtml}</div>
        </div>

        <!-- Footer Cung -->
        <div class="cung-bottom-bar">
          <span class="cung-chi-label">${cung.chi}</span>
          <span class="cung-trang-sinh">${cung.trangSinh || ''}</span>
          <span class="cung-thang-han">${cung.thangHan || ''}</span>
        </div>
      </div>
    `;
  },

  /**
   * Render Ô Trung Tâm (Center Box 2x2) theo chuẩn bản gốc
   */
  renderCenterBox: function (laSo) {
    const sDate = laSo.solarDate;
    const lDate = laSo.lunarDate;

    return `
      <div class="center-classical-box">
        <div class="center-inner-content">
          <!-- Logo & Header XEM TỬ VI HUYỀN HỌC -->
          <div class="center-brand-header">
            <img src="img/logo-xem-tu-vi-huyen-hoc.png" alt="Xem Tử Vi Huyền Học" class="center-logo-img">
            <h2 class="center-title-main">LẬP LÁ SỐ TỬ VI CHÍNH TÔNG VIỆT NAM</h2>
            <div class="center-website-link">https://www.xemtuvihuyenhoc.com</div>
          </div>

          <!-- Bảng Thông Số Chi Tiết Bản Mệnh -->
          <table class="center-meta-table">
            <tbody>
              <tr>
                <td class="col-label">Họ tên:</td>
                <td class="col-val text-bold">${laSo.hoTen || 'Nguyễn Văn An'}</td>
              </tr>
              <tr>
                <td class="col-label">Năm sinh:</td>
                <td class="col-val">${sDate.year} - ${laSo.canChiNam}</td>
              </tr>
              <tr>
                <td class="col-label">Tháng sinh:</td>
                <td class="col-val">${sDate.month} (tháng ${lDate.month} âm - ${laSo.canChiThang})</td>
              </tr>
              <tr>
                <td class="col-label">Ngày sinh:</td>
                <td class="col-val">${sDate.day} (ngày ${lDate.day} âm - ${laSo.canChiNgay})</td>
              </tr>
              <tr>
                <td class="col-label">Giờ sinh:</td>
                <td class="col-val">${laSo.gioPhutText} (${laSo.canChiGio})</td>
              </tr>
              <tr>
                <td class="col-label">Âm dương:</td>
                <td class="col-val">${laSo.amDuongTitle}</td>
              </tr>
              <tr>
                <td class="col-label">Bản mệnh:</td>
                <td class="col-val">${laSo.napAm} (${laSo.napAmDetail})</td>
              </tr>
              <tr>
                <td class="col-label">Cục mệnh:</td>
                <td class="col-val">${laSo.cucInfo.name} <span class="text-sub">(${laSo.menhCucRelation})</span></td>
              </tr>
              <tr>
                <td class="col-label">Chủ mệnh:</td>
                <td class="col-val text-capitalize">${laSo.chuMenh}</td>
              </tr>
              <tr>
                <td class="col-label">Chủ thân:</td>
                <td class="col-val text-capitalize">${laSo.chuThan}</td>
              </tr>
              <tr>
                <td class="col-label">Cân lượng:</td>
                <td class="col-val">${laSo.canLuong}</td>
              </tr>
              <tr>
                <td class="col-label">Lai nhân:</td>
                <td class="col-val">${laSo.laiNhan}</td>
              </tr>
              <tr>
                <td class="col-label">Thân cư:</td>
                <td class="col-val text-capitalize">${laSo.thanCu}</td>
              </tr>
              <tr>
                <td class="col-label">Xem thêm:</td>
                <td class="col-val text-sub">Nguyệt vận tháng 9 &amp; tiểu vận năm ${new Date().getFullYear()} âm lịch</td>
              </tr>
            </tbody>
          </table>

          <div class="center-footer-copy">
            © ${new Date().getFullYear()} - www.xemtuvihuyenhoc.com - ${laSo.hoTen || 'Đương số'}
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Bật/Tắt Luận Giải
   */
  toggleLuanGiaiVisibility: function () {
    const el = document.getElementById('luan-giai');
    if (!el) return;
    const isHidden = el.style.display === 'none';
    el.style.display = isHidden ? 'block' : 'none';
    if (isHidden) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  /**
   * Modal xem chi tiết từng cung
   */
  showCungModal: function (chiIndex) {
    return false; // Đã gỡ bỏ tính năng mở popup khi nhấp vào lá số
    if (!this._currentLaSo) return;
    const cung = this._currentLaSo.cung[chiIndex];

    let modal = document.getElementById('tuvi-cung-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'tuvi-cung-modal';
      modal.className = 'tuvi-modal-wrapper';
      document.body.appendChild(modal);
    }

    let chinhTinhHtml = '';
    if (cung.chinhTinh && cung.chinhTinh.length > 0) {
      chinhTinhHtml += '<h4>✦ Chính Tinh Tọa Thủ:</h4>';
      cung.chinhTinh.forEach(ct => {
        chinhTinhHtml += `
          <div class="modal-star-row">
            <span class="modal-star-name" style="color: ${this.ELEMENT_COLORS[ct.element] || '#cc0000'}">
              ★ ${ct.name} (${ct.dacHam || 'Đ'})
            </span>
            <span class="modal-element-tag">Hành ${ct.element}</span>
            ${ct.tuHoa ? `<span class="modal-hoa-badge">${ct.tuHoa}</span>` : ''}
          </div>
        `;
      });
    }

    let catTinhHtml = '';
    if (cung.phuTinhLeft && cung.phuTinhLeft.length > 0) {
      catTinhHtml += '<h4>✦ Cát Tinh & Quý Tinh:</h4><div class="modal-phu-grid">';
      cung.phuTinhLeft.forEach(pt => {
        catTinhHtml += `<span class="modal-phu-item cat-tinh">${pt.name}</span>`;
      });
      catTinhHtml += '</div>';
    }

    let satTinhHtml = '';
    if (cung.phuTinhRight && cung.phuTinhRight.length > 0) {
      satTinhHtml += '<h4>✦ Sát Bại Tinh:</h4><div class="modal-phu-grid">';
      cung.phuTinhRight.forEach(pt => {
        satTinhHtml += `<span class="modal-phu-item sat-tinh">${pt.name}</span>`;
      });
      satTinhHtml += '</div>';
    }

    let deepAnalysisHtml = '';
    if (typeof TuViLuanGiaiEngine !== 'undefined' && this._currentLaSo) {
      const a = TuViLuanGiaiEngine.generatePalaceDeepAnalysis(cung, this._currentLaSo);
      deepAnalysisHtml = `
        <div class="modal-deep-analysis" style="margin-top: 1rem; border-top: 1px solid rgba(212, 175, 55, 0.3); padding-top: 1rem;">
          <h4 style="color: #ffd700; margin-bottom: 0.5rem; font-size: 1rem;">✦ Biện Giải Cổ Học &amp; Tinh Đẩu:</h4>
          <div style="font-size: 0.88rem; line-height: 1.6; color: #e2e8f0; margin-bottom: 0.8rem;">
            ${a.cachCucHtml}
          </div>
          ${a.tamPhuongHtml || ''}
          ${a.chinhTinhDetailHtml}
          ${a.tuHoaDetailHtml}
          ${a.vongKhiHtml}
          ${a.khongVongHtml}
          <div style="margin-top: 0.8rem; background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 0.6rem 0.8rem; border-radius: 4px;">
            <strong style="color: #ffd700; font-size: 0.86rem;">🛡️ Đạo Trị Mệnh &amp; Hóa Giải Sát Khí (Theo Cụ Nguyễn Phát Lộc):</strong>
            <p style="color: #f1f5f9; font-size: 0.84rem; line-height: 1.5; margin: 0.3rem 0 0;">${a.caiSoHtml}</p>
          </div>
        </div>
      `;
    }

    modal.innerHTML = `
      <div class="tuvi-modal-backdrop" onclick="TuViChart.closeCungModal()"></div>
      <div class="tuvi-modal-card">
        <div class="tuvi-modal-header">
          <h3>${cung.cungName} · Cung ${cung.chi} (${cung.can})</h3>
          <button class="tuvi-modal-close" onclick="TuViChart.closeCungModal()">&times;</button>
        </div>
        <div class="tuvi-modal-body">
          ${cung.daiHan ? `<div class="modal-daihan-info">Đại Hạn giai đoạn: <strong>${cung.daiHan.startAge} - ${cung.daiHan.endAge} tuổi</strong> (Vòng Tràng Sinh: <em>${cung.trangSinh || ''}</em>)</div>` : ''}
          ${chinhTinhHtml}
          ${catTinhHtml}
          ${satTinhHtml}
          ${deepAnalysisHtml}
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeCungModal: function () {
    const modal = document.getElementById('tuvi-cung-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  /**
   * Render Luận Giải Chi Tiết 12 Cung & Vận Hạn bên dưới lá số
   */
  renderLuanGiai: function (laSo) {
    const listEl = document.getElementById('accordionList');
    if (!listEl) return;

    const CUNG_KEYS = [
      { name: 'MỆNH', key: 'menh', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' },
      { name: 'PHỤ MẪU', key: 'phu-mau', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
      { name: 'PHÚC ĐỨC', key: 'phuc-duc', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
      { name: 'ĐIỀN TRẠCH', key: 'dien-trach', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
      { name: 'QUAN LỘC', key: 'quan-loc', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>' },
      { name: 'NÔ BỘC', key: 'no-boc', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
      { name: 'THIÊN DI', key: 'thien-di', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>' },
      { name: 'TẬT ÁCH', key: 'tat-ach', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
      { name: 'TÀI BẠCH', key: 'tai-bach', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>' },
      { name: 'TỬ TỨC', key: 'tu-tuc', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>' },
      { name: 'PHU THÊ', key: 'phu-the', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' },
      { name: 'HUYNH ĐỆ', key: 'huynh-de', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' }
    ];

    // Xác thực quyền VIP: Hỗ trợ cả thành viên đăng nhập lẫn khách vãng lai quét mã VietQR mở khóa tức thì
    const isVip = Boolean(
      (typeof TuViAuth !== 'undefined' && TuViAuth.isVip && TuViAuth.isVip()) ||
      (typeof TuViMonetize !== 'undefined' && TuViMonetize.isVipUnlocked) ||
      (typeof window !== 'undefined' && window.TuViMonetize && window.TuViMonetize.isVipUnlocked)
    );

    let html = '';
    CUNG_KEYS.forEach((item, index) => {
      const cung = laSo.cung.find(c => c.cungName.startsWith(item.name));
      if (!cung) return;

      const isFirst = index === 0;
      // Quy định nghiệp vụ: Tra cứu cơ bản chỉ cho xem 2 cung đầu (MỆNH & PHỤ MẪU). Từ cung thứ 3 (index >= 2) khóa hoàn toàn
      const isLocked = !isVip && index >= 2;

      if (isLocked) {
        html += `
          <div class="accordion-item item-locked" data-palace="${item.key}">
            <button class="accordion-header" aria-expanded="false" type="button" onclick="TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư (Mở Khóa 12 Cung)', 49000)">
              <span class="palace-icon gold-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
              <span class="palace-name palace-title-gold-light">${cung.cungName} · Cung ${cung.chi} (${cung.can})</span>
              <span class="wax-seal-badge"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Khóa Gói VIP 49.000đ</span>
              <span class="toggle-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></span>
            </button>
            <div class="accordion-body" role="region" style="display:none;">
              <div class="palace-vip-lock-card">
                <div class="lock-glow-icon"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
                <h4>NỘI DUNG LUẬN GIẢI CUNG ${cung.cungName}</h4>
                <p class="lock-sub-desc">
                  Gói Tra Cứu Cơ Bản <strong>chỉ cho xem luận giải 2 cung đầu (MỆNH &amp; PHỤ MẪU)</strong>.<br>
                  Toàn bộ ma trận Tam Phương Tứ Chính, Tứ Hóa Phi Tinh, Cát Tinh Nâng Đỡ, Sát Tinh Thử Thách và Đạo Trị Mệnh của <strong>Cung ${cung.cungName}</strong> được bảo mật trong Gói VIP 49.000đ.
                </p>
                <div class="lock-perks-row">
                  <span class="lock-perk-badge">✓ Mở khóa toàn bộ 12 Cung</span>
                  <span class="lock-perk-badge">✓ Xem trọn đời đại hạn</span>
                  <span class="lock-perk-badge">✓ Tải File PDF VIP A4</span>
                </div>
                <button class="btn-gold-pill btn-lock-upgrade" onclick="TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư (Mở Khóa 12 Cung)', 49000)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:-2px;margin-right:4px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Đăng Ký Gói VIP 49.000đ Để Mở Khóa
                </button>
              </div>
            </div>
          </div>
        `;
        return;
      }

      // Sinh phân tích chuyên sâu đa tầng bằng Bộ Máy Biện Giải (chỉ chạy cho cung được phép xem)
      let analysis = null;
      if (typeof TuViLuanGiaiEngine !== 'undefined') {
        analysis = TuViLuanGiaiEngine.generatePalaceDeepAnalysis(cung, laSo);
      }

      const tieuDeText = analysis ? analysis.tieuDe : `${cung.cungName} Tọa Cung ${cung.chi}`;
      const cachCucText = analysis ? analysis.cachCucHtml : `<p>Tọa thủ tại cung ${cung.chi} thuộc ngũ hành bản vị.</p>`;
      const chinhTinhText = analysis ? analysis.chinhTinhDetailHtml : '';
      const tuHoaText = analysis ? analysis.tuHoaDetailHtml : '';
      const catTinhText = analysis ? analysis.catTinhDetailHtml : '';
      const satTinhText = analysis ? analysis.satTinhDetailHtml : '';
      const vongKhiText = analysis ? analysis.vongKhiHtml : '';
      const khongVongText = analysis ? analysis.khongVongHtml : '';
      const caiSoText = analysis ? analysis.caiSoHtml : 'Giữ tâm thái an hòa, tích cực hành thiện tích đức, thận trọng trong các quyết định lớn để hóa giải ách nạn, vươn tới thành công.';

      html += `
        <div class="accordion-item ${isFirst ? 'open' : ''}" data-palace="${item.key}">
          <button class="accordion-header" aria-expanded="${isFirst ? 'true' : 'false'}" type="button">
            <span class="palace-icon" aria-hidden="true">${item.icon}</span>
            <span class="palace-name">${cung.cungName} · Cung ${cung.chi} (${cung.can})</span>
            <span class="palace-stars-count">${tieuDeText}</span>
            <span class="toggle-icon" aria-hidden="true">▼</span>
          </button>
          <div class="accordion-body" role="region">
            <div class="luan-giai-scholarly-content">
              <div class="luan-giai-nhandinh-badge">✦ ${tieuDeText}</div>
              
              <!-- 1. Cách Cục & Khí Tượng Cung Vị -->
              <div class="luan-giai-block cach-cuc-block" style="margin-bottom: 0.8rem; font-size: 0.9rem; line-height: 1.6; color: #e2e8f0;">
                ${cachCucText}
              </div>

              <!-- 2. Tương Tác Tam Phương Tứ Chính & Đại Cách Cục (Lệnh Đông Lai) -->
              ${analysis && analysis.tamPhuongHtml ? analysis.tamPhuongHtml : ''}

              <!-- 3. Biện Giải Từng Chính Tinh Tọa Thủ -->
              ${chinhTinhText}

              <!-- 4. Tứ Hóa Phi Tinh (Lộc - Quyền - Khoa - Kỵ) -->
              ${tuHoaText}

              <!-- 5. Cát Tinh Nâng Đỡ -->
              ${catTinhText}

              <!-- 6. Sát Tinh Thử Thách -->
              ${satTinhText}

              <!-- 7. Vòng Tràng Sinh & Thái Tuế -->
              ${vongKhiText}

              <!-- 8. Tuần Không / Triệt Không Án Ngữ -->
              ${khongVongText}

              <!-- 9. Lời Khuyên Tu Dưỡng & Cải Sửa Số Mệnh -->
              <div class="palace-advice" style="margin-top: 1rem; background: rgba(212, 175, 55, 0.08); border: 1px dashed rgba(212, 175, 55, 0.4); padding: 0.8rem 1rem; border-radius: 6px;">
                <strong style="color: #ffd700; font-size: 0.9rem;">🛡️ Đạo Trị Mệnh &amp; Hóa Giải Sát Khí (Theo Cụ Nguyễn Phát Lộc):</strong>
                <p style="color: #f8fafc; font-size: 0.86rem; line-height: 1.6; margin-top: 0.3rem;">${caiSoText}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    // Item 7: Tính năm Dương lịch hiện tại và Can Chi động
    const curYear = new Date().getFullYear();
    const nextYear = curYear + 1;
    const curCanChi = this.getCanChiYear(curYear);
    const nextCanChi = this.getCanChiYear(nextYear);

    // Thêm Khối Vận Hạn Từng Giai Đoạn & Phương Pháp Hóa Giải
    const daiHanList = [
      {
        phase: '6 – 15 Tuổi',
        cung: 'MỆNH tại Tỵ',
        chuDe: 'Thời Thơ Ấu · Khởi Đầu Nhân Cách',
        luanGiai: 'Đại hạn đầu đời tại Mệnh cung (Thái Dương miếu địa). Đương số là đứa trẻ thông minh, sáng dạ, tính cách tự tin, có tố chất lãnh đạo bạn bè đồng trang lứa. Tuy có Linh Tinh, Trực Phù nên đôi khi dễ nóng nảy, tính khí bướng bỉnh hoặc ốm sốt nhiệt thuở nhỏ, nhưng căn bản phát triển thể chất và học vấn đều thuận lợi rực rỡ.',
        hoaGiai: 'Gia đình cần rèn luyện tính kiên nhẫn, lễ phép, hướng đương số tham gia các hoạt động ngoại khóa để giải tỏa bớt nhiệt khí dư thừa của Thái Dương.'
      },
      {
        phase: '16 – 25 Tuổi',
        cung: 'PHỤ MẪU tại Ngọ',
        chuDe: 'Thử Thách Tuổi Trẻ · Định Hình Con Đường Tự Lập',
        luanGiai: 'Đại hạn ngộ Phá Quân miếu địa, Thái Tuế, Đại Hao. Đây là 10 năm của những bước ngoặt lớn về học vấn, công việc và thay đổi môi trường sống. Đại Hao chủ về sự biến động, đầu tư học tập và chi tiêu nhiều. Thời điểm chuyển giao đại hạn tâm tư trăn trở về định hướng tương lai, công việc có sự đổi mới hoặc cơ hội đột phá.',
        hoaGiai: 'Tập trung trau dồi chuyên môn cốt lõi, không nên vội vã đầu cơ rủi ro. Học cách quản trị tài chính cá nhân chặt chẽ. Hóa giải Thái tuế bằng cách đi xa, thay đổi không gian sống hoặc khởi động dự án mới.'
      },
      {
        phase: `Lưu Niên ${curYear} (${curCanChi}) & ${nextYear} (${nextCanChi})`,
        cung: 'LƯU NIÊN TOÀN DIỆN',
        chuDe: `Vận Khí ${curYear} (${curCanChi}) & Tiếp Nối ${nextYear} (${nextCanChi})`,
        luanGiai: `Năm ${curYear} (${curCanChi}): Vận số mở ra chu kỳ tài lộc và chuyển biến tích cực trong sự nghiệp lẫn nhân duyên. Các cát tinh hội tụ mang lại cơ hội hợp tác mới, kinh doanh hanh thông, song cần cẩn trọng trong các cam kết pháp lý. Bước sang năm ${nextYear} (${nextCanChi}): Tiếp đà sinh vượng, đương số đón nhận cát tinh trợ lực, thuận bề tích lũy tài sản và củng cố vị thế cá nhân vững chắc.`,
        hoaGiai: `Chủ động lập kế hoạch tài chính rõ ràng cho cả năm ${curYear} và chuẩn bị nền tảng đón vận khí năm ${nextYear}. Tích cực tu tâm dưỡng tính, làm việc thiện, phóng sinh để kích hoạt phúc đức trường tồn.`
      },
      {
        phase: '26 – 35 Tuổi',
        cung: 'PHÚC ĐỨC tại Mùi',
        chuDe: 'Thời Kỳ Vàng Khởi Nghiệp · Trí Tuệ Tỏa Sáng',
        luanGiai: 'Bước sang đại hạn cung Phúc Đức tại Mùi (Thiên Cơ đắc địa, Thiếu Dương, Quốc Ấn, Thiên Không). Đây là đại vận khai sáng trí tuệ phi thường! Thiên Cơ chủ về mưu lược, chiến lược và sáng tạo kết hợp Quốc Ấn báo hiệu đương số sẽ thiết lập được địa vị xã hội, xây dựng uy tín nghề nghiệp vững chắc và lập gia đình bền lâu.',
        hoaGiai: 'Tránh tự cao tự đại vì Thiên Không luôn là lưỡi dao thử thách tâm tính. Hãy lấy sự chân thành, phụng sự khách hàng và nhân viên làm gốc để giữ vững thành tựu kinh doanh/công danh.'
      },
      {
        phase: '36 – 45 Tuổi',
        cung: 'ĐIỀN TRẠCH tại Thân',
        chuDe: 'Đỉnh Cao Tài Sản · Phú Quý Song Toàn',
        luanGiai: 'Đại hạn Tử Vi - Thiên Phủ miếu địa đồng cung hóa Quyền, hội Thiên Mã, Tam Thai. Đây là 10 năm rực rỡ nhất trong đời về mặt tích lũy tài sản, bất động sản và danh vọng xã hội! Thiên Phủ là ngân khố nhà trời mở ra, việc mua đất dựng nhà, đầu tư kinh doanh gặt hái thành công vang dội. Đương số trở thành trụ cột vững chãi.',
        hoaGiai: 'Duy trì đạo đức kinh doanh, "tích đức tồn phúc". Cẩn trọng Tang Môn Cô Thần báo hiệu trong dòng họ có người cao tuổi tạ thế, cần chu tất việc hiếu nghĩa.'
      },
      {
        phase: '46 – 55 Tuổi',
        cung: 'QUAN LỘC tại Dậu',
        chuDe: 'Củng Cố Vị Thế · Cảnh Giác Rủi Ro Ẩn Tàng',
        luanGiai: 'Đại hạn Thái Âm miếu địa ngộ Hữu Bật, Hồng Loan nhưng có Địa Kiếp hung sát. Sự nghiệp tiếp tục gặt hái thành quả lớn, nhưng bước vào giai đoạn này cần đặc biệt cảnh giác với sự đố kỵ, tranh đoạt quyền lợi từ đối thủ hoặc thị trường biến động.',
        hoaGiai: 'Chuyển dịch sang mô hình kinh doanh an toàn, giữ thế thủ vững chắc hơn là công phá liều lĩnh. Chia nhỏ nguồn vốn đầu tư, tuyệt đối không bảo lãnh nợ nần cho người khác.'
      },
      {
        phase: '56 – 65 Tuổi Trở Đi',
        cung: 'NÔ BỘC (Tuất) & THIÊN DI (Hợi)',
        chuDe: 'Hậu Vận An Nhàn · Hưởng Phúc Tử Tôn',
        luanGiai: 'Bước vào các cung vị hậu vận, đương số lui về hậu trường, cố vấn cho thế hệ trẻ hoặc tận hưởng thú điền viên, nghiên cứu huyền học, triết đạo. Con cháu thành đạt, hiếu thảo. Cuộc đời đạt cảnh giới thanh thản, viên mãn tròn vẹn.',
        hoaGiai: 'Thực hành dưỡng sinh, thiền định, buông bỏ chấp niệm thế sự để thân tâm an lạc trường thọ.'
      }
    ];

    html += `
      <div class="daihan-overview-box glass-card">
        <div class="daihan-header-row">
          <span class="gold-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
          <h4 class="daihan-title">LUẬN ĐOÁN VẬN HẠN TỪNG GIAI ĐOẠN &amp; PHƯƠNG PHÁP HÓA GIẢI</h4>
        </div>
        <p class="daihan-sub-desc">
          ${isVip ? 'Tài khoản VIP: Đã mở khóa trọn bộ vận hạn các thập niên cuộc đời.' : 'Tính năng tra cứu cơ bản chỉ mở Đại Hạn đầu đời (6 – 15 Tuổi). Quý khách cần đăng ký gói VIP 49.000đ để mở khóa toàn bộ vận hạn tương lai.'}
        </p>

        <div class="daihan-vertical-timeline">
          <div class="timeline-axis"></div>
          ${daiHanList.map((dh, dIndex) => {
            const isPhaseLocked = !isVip && dIndex > 0;
            const isCurrent = dIndex === 0;

            if (isPhaseLocked) {
              return `
                <div class="timeline-item locked-period">
                  <div class="timeline-node node-locked">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <div class="timeline-card-wrap">
                    <div class="timeline-card glass-surface locked-surface">
                      <div class="timeline-card-header">
                        <strong class="timeline-phase-title">Đại Hạn: ${dh.phase} (${dh.cung})</strong>
                        <span class="wax-seal-badge"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Khóa VIP 49k</span>
                      </div>
                      <div class="timeline-locked-blur-preview">
                        <div class="timeline-blur-text">${dh.luanGiai.substring(0, 100)}... ma trận hung cát vận hạn bảo mật trong gói VIP...</div>
                        <div class="timeline-locked-cta-overlay">
                          <button class="btn-gold-pill btn-lock-upgrade-sm" onclick="TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư (Mở Khóa Toàn Bộ Đại Hạn)', 49000)">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                            Mở Khóa Xem Hết Đại Vận (49k)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }

            return `
              <div class="timeline-item active-period">
                <div class="timeline-node node-gold">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div class="timeline-card-wrap">
                  <div class="timeline-card glass-surface gold-highlight-card">
                    <div class="timeline-card-header">
                      <strong class="timeline-phase-title text-gold">Đại Hạn: ${dh.phase} (${dh.cung})</strong>
                      <span class="timeline-badge-gold">${dh.chuDe}</span>
                    </div>
                    <p class="timeline-desc">${dh.luanGiai}</p>
                    <div class="timeline-advice-box">
                      <strong class="text-gold"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline; vertical-align:-2px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Phương Pháp Hóa Giải &amp; Tu Dưỡng:</strong>
                      <span> ${dh.hoaGiai}</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    listEl.innerHTML = html;
  }
};

if (typeof window !== 'undefined') {
  window.TuViChart = TuViChart;
}
