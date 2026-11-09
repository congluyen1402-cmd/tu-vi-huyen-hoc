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

  // Mã màu chuẩn Ngũ Hành theo yêu cầu đặc tả (Kim #8F6B00, Mộc #1E7A3E, Thủy #1D4E89, Hỏa #B3261E, Thổ #A5601A)
  ELEMENT_COLORS: {
    'Kim': '#8F6B00',
    'Mộc': '#1E7A3E',
    'Thủy': '#1D4E89',
    'Hỏa': '#B3261E',
    'Thổ': '#A5601A'
  },

  // Màu sắc định danh Cung Vị theo chuẩn trang nhã, tương phản cao trên nền giấy #FBF7EE
  PALACE_COLORS: {
    'MỆNH': '#7A1F17',
    'PHỤ MẪU': '#7A1F17',
    'PHÚC ĐỨC': '#7A1F17',
    'ĐIỀN TRẠCH': '#7A1F17',
    'QUAN LỘC': '#7A1F17',
    'NÔ BỘC': '#7A1F17',
    'THIÊN DI': '#7A1F17',
    'TẬT ÁCH': '#7A1F17',
    'TÀI BẠCH': '#7A1F17',
    'TỬ TỨC': '#7A1F17',
    'PHU THÊ': '#7A1F17',
    'HUYNH ĐỆ': '#7A1F17'
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

  getElementClass: function (napAm, menh) {
    const text = (menh || napAm || '').toLowerCase();
    if (text.includes('kim')) return 'element-kim';
    if (text.includes('mộc') || text.includes('moc')) return 'element-moc';
    if (text.includes('thủy') || text.includes('thuy')) return 'element-thuy';
    if (text.includes('hỏa') || text.includes('hoa')) return 'element-hoa';
    if (text.includes('thổ') || text.includes('tho')) return 'element-tho';
    return 'element-tho';
  },

  generateTeaserSentence: function (laSo) {
    if (!laSo || !laSo.cungMenh) {
      return 'Mệnh cục tương hòa, nội lực thâm hậu, đường đời đón nhận nhiều cát trợ phi thường.';
    }
    const ctList = laSo.cungMenh.chinhTinh || [];
    if (ctList.length > 0) {
      const starNames = ctList.map(s => s.name).join(' & ');
      return `Mệnh tạo tọa thủ ${starNames} (${laSo.cungMenh.chi}), cốt cách ${laSo.napAm}, khí vận hanh thông và mưu lược xuất chúng.`;
    }
    return `Mệnh Vô Chính Diệu đắc Tam Phương Tứ Chính tương trợ, tính cách linh hoạt uyển chuyển, hậu vận tích lũy đại vinh hoa.`;
  },

  renderSummaryCard: function (laSo) {
    if (!laSo) return '';
    const menhStar = (laSo.cungMenh && laSo.cungMenh.chinhTinh && laSo.cungMenh.chinhTinh.length > 0)
      ? laSo.cungMenh.chinhTinh.map(s => s.name).join(' & ')
      : 'Vô Chính Diệu';
    const elemClass = this.getElementClass(laSo.napAm, laSo.menh);
    const teaser = this.generateTeaserSentence(laSo);

    return `
      <div class="la-so-summary-card">
        <div class="summary-header-row">
          <div class="summary-name">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="color:var(--gold);"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            ${laSo.hoTen || 'Nguyễn Văn An'}
          </div>
          <div class="summary-tags">
            <span class="tag-element ${elemClass}">Bản Mệnh: ${laSo.napAm} (${laSo.menh || 'Ngũ Hành'})</span>
            <span class="summary-main-star">★ Cung Mệnh: <strong>${menhStar}</strong></span>
            <span class="summary-main-star">Cục: <strong>${laSo.cucInfo ? laSo.cucInfo.name : ''}</strong></span>
          </div>
        </div>
        <div class="summary-teaser-sentence">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <span>“${teaser}”</span>
        </div>
      </div>
    `;
  },

  renderSeasonalBanner: function (laSo) {
    const curYear = new Date().getFullYear();
    const curCanChi = this.getCanChiYear(curYear);
    return `
      <div class="seasonal-banner">
        <div class="seasonal-banner-left">
          <div class="seasonal-banner-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Vận hạn năm ${curYear} (${curCanChi}) của bạn
          </div>
          <p class="seasonal-preview-text">
            Năm ${curYear} (${curCanChi}) chuyển vận tài lộc, các cát tinh chiếu rọi cung Quan Lộc và Tài Bạch mở ra cơ hội đột phá sự nghiệp...
          </p>
        </div>
        <button class="btn-seasonal-unlock" onclick="TuViMonetize.openVipModal('Vận Hạn Lưu Niên ${curYear} (${curCanChi})', 49000)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:inline;vertical-align:-1px;margin-right:4px;"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Mở Khóa Vận Hạn ${curYear} · 49.000đ
        </button>
      </div>
    `;
  },

  scrollToPalace: function (cungName) {
    if (!cungName) return;
    const listEl = document.getElementById('accordionList');
    if (!listEl) return;

    const cleanName = cungName.replace(/<[^>]*>/g, '').trim().toUpperCase();
    const items = listEl.querySelectorAll('.accordion-item');
    let targetItem = null;

    items.forEach(it => {
      const titleEl = it.querySelector('.palace-name');
      if (titleEl && titleEl.textContent.toUpperCase().includes(cleanName)) {
        targetItem = it;
      }
    });

    if (targetItem) {
      if (!targetItem.classList.contains('open')) {
        const headerBtn = targetItem.querySelector('.accordion-header');
        if (headerBtn) {
          this.toggleAccordionItem(headerBtn);
        }
      }
      targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetItem.style.transition = 'box-shadow 0.3s ease';
      targetItem.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.45)';
      setTimeout(() => {
        targetItem.style.boxShadow = '';
      }, 2000);
    }
  },

  toggleAccordionItem: function (btn) {
    const item = btn.closest('.accordion-item');
    if (!item) return;
    const isOpen = item.classList.contains('open');
    const body = item.querySelector('.accordion-body');
    if (isOpen) {
      item.classList.remove('open');
      if (body) body.style.display = 'none';
      btn.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('open');
      if (body) body.style.display = 'block';
      btn.setAttribute('aria-expanded', 'true');
    }
  },

  initStickyBottomCta: function (isVip) {
    let bar = document.getElementById('stickyBottomCtaBar');
    if (isVip) {
      if (bar) bar.style.display = 'none';
      return;
    }
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'stickyBottomCtaBar';
      bar.className = 'sticky-bottom-cta-bar';
      bar.innerHTML = `
        <div class="sticky-cta-text">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="color:var(--gold); flex-shrink:0;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>Mở khóa toàn bộ 12 cung + Đại hạn · <strong>49.000đ</strong></span>
        </div>
        <button class="btn-sticky-unlock" onclick="TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư (Mở Khóa 12 Cung)', 49000)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right:5px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Mở Khóa Ngay
        </button>
      `;
      document.body.appendChild(bar);
    } else {
      bar.style.display = 'flex';
    }

    if (this._onScrollStickyCta) {
      window.removeEventListener('scroll', this._onScrollStickyCta);
    }
    this._onScrollStickyCta = () => {
      const firstPalace = document.querySelector('.accordion-item');
      const pricingSec = document.getElementById('bang-gia-dich-vu');
      if (!firstPalace) return;

      const firstRect = firstPalace.getBoundingClientRect();
      const passedFirst = firstRect.top < window.innerHeight * 0.5;

      let inPricing = false;
      if (pricingSec) {
        const pRect = pricingSec.getBoundingClientRect();
        inPricing = pRect.top < window.innerHeight && pRect.bottom > 0;
      }

      if (passedFirst && !inPricing) {
        bar.classList.add('visible');
      } else {
        bar.classList.remove('visible');
      }
    };
    window.addEventListener('scroll', this._onScrollStickyCta, { passive: true });
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

    // 1. Khởi tạo và chèn Section Kết Quả vào DOM (Chỉ xuất hiện sau khi tính toán thành công)
    let ketQuaSection = document.getElementById('ket-qua');
    if (!ketQuaSection) {
      const mount = document.getElementById('resultMountPoint');
      if (mount) {
        mount.innerHTML = `
          <section class="section result-section" id="ket-qua">
            <div class="section-container la-so-outer-wrap">
              <div id="la-so-chart"></div>
              <div class="luan-giai-section" id="luan-giai" style="display:block;">
                <h3 class="luan-giai-header-title">✦ Luận Giải Chi Tiết 12 Cung ✦</h3>
                <div class="accordion-list" id="accordionList"></div>
              </div>
            </div>
          </section>
        `;
        ketQuaSection = document.getElementById('ket-qua');
      }
    }
    if (ketQuaSection) {
      ketQuaSection.style.display = 'block';
      ketQuaSection.classList.add('visible');
    }

    // 2. Render Lá Số dạng Trống Đồng Đông Sơn
    this.renderTraditionalChart(laSo);

    // 3. Render Luận Giải Chi Tiết
    this.renderLuanGiai(laSo);

    // Khởi tạo thanh CTA dính đáy nếu chưa là VIP
    const isVip = Boolean(
      (typeof TuViAuth !== 'undefined' && TuViAuth.isVip && TuViAuth.isVip()) ||
      (typeof TuViMonetize !== 'undefined' && TuViMonetize.isVipUnlocked) ||
      (typeof window !== 'undefined' && window.TuViMonetize && window.TuViMonetize.isVipUnlocked)
    );
    this.initStickyBottomCta(isVip);

    // 4. Khuyến nghị Vật Phẩm Phong Thủy Hộ Mệnh (Thương Mại Hóa)
    if (typeof TuViMonetize !== 'undefined') {
      TuViMonetize.renderFengShuiItems(laSo);
    }

    // Khởi tạo lại Lucide line icons
    if (typeof window !== 'undefined' && window.lucide) {
      setTimeout(() => window.lucide.createIcons(), 60);
    }

    // Cuộn mượt mà đến lá số với bù đắp header height
    setTimeout(() => {
      if (ketQuaSection) {
        ketQuaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      ${this.renderSummaryCard(laSo)}
      ${this.renderSeasonalBanner(laSo)}

      <div class="la-so-toolbar">
        <button type="button" class="btn-toolbar btn-toolbar-png" onclick="TuViChart.downloadChartPng()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:5px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Tải lá số
        </button>
        <button type="button" class="btn-toolbar btn-toolbar-zoom" onclick="TuViChart.openZoomModal()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:5px;"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>Phóng to
        </button>
        <button type="button" class="btn-toolbar btn-toolbar-new" onclick="TuViApp.resetAndExpandForm()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:5px;"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>Lập lá số khác
        </button>
        <button type="button" class="btn-toolbar btn-toolbar-luan" onclick="TuViChart.toggleLuanGiaiVisibility()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:5px;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>Xem / Ẩn Luận Giải
        </button>
        <button type="button" class="btn-toolbar btn-toolbar-vip" onclick="TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư (Mở Khóa 12 Cung)', 49000)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:5px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Tải Báo Cáo VIP A4 (49k)
        </button>
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
              (M): Miếu · (V): Vượng · (Đ): Đắc · (B): Bình hòa · (H): Hãm
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

    const isVip = Boolean(
      (typeof TuViAuth !== 'undefined' && TuViAuth.isVip && TuViAuth.isVip()) ||
      (typeof TuViMonetize !== 'undefined' && TuViMonetize.isVipUnlocked) ||
      (typeof window !== 'undefined' && window.TuViMonetize && window.TuViMonetize.isVipUnlocked)
    );
    const isFreePalace = cung.cungName.startsWith('MỆNH') || cung.cungName.startsWith('PHỤ MẪU');
    const isLocked = !isVip && !isFreePalace;

    // Kiểm tra Tuần / Triệt (Đặt GỌN GÀNG BÊN TRONG đường viền ô)
    const hasTuan = laSo.tuan && laSo.tuan.includes(chiIndex);
    const hasTriet = laSo.triet && laSo.triet.includes(chiIndex);

    let tuanTrietBanner = '';
    if (hasTuan && chiIndex === laSo.tuan[0]) {
      tuanTrietBanner = '<div class="tuan-triet-ribbon ribbon-tuan">Tuần</div>';
    }
    if (hasTriet && chiIndex === laSo.triet[0]) {
      tuanTrietBanner = '<div class="tuan-triet-ribbon ribbon-triet">Triệt</div>';
    }

    // Tiêu đề cung và màu sắc đặc trưng
    const titleColor = this.PALACE_COLORS[cung.cungName] || '#7A1F17';
    const palaceTitle = isThan ? `${cung.cungName}&lt;THÂN&gt;` : cung.cungName;

    // Cột sao trái: Chính tinh + Cát tinh
    let leftColHtml = '';
    if (cung.chinhTinh && cung.chinhTinh.length > 0) {
      cung.chinhTinh.forEach(ct => {
        const color = this.ELEMENT_COLORS[ct.element] || '#8F6B00';
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
        const color = this.ELEMENT_COLORS[pt.element] || '#1E7A3E';
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
        const color = this.ELEMENT_COLORS[pt.element] || '#B3261E';
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
      <div class="cung-classical-cell la-so-cell ${isMenh ? 'cell-menh' : ''} ${isThan ? 'cell-than' : ''}" 
           data-chi="${chiIndex}"
           onclick="TuViChart.openPalaceSheet(${chiIndex})"
           title="Nhấp để xem chi tiết sao & luận giải Cung ${cung.cungName}">
        ${tuanTrietBanner}
        
        <!-- Header Cung -->
        <div class="cung-top-bar">
          <span class="cung-can-chi">${cung.canShort}.${cung.chi}</span>
          <span class="cung-main-title" style="color: ${titleColor};">
            ${palaceTitle}
            ${isLocked ? '<span class="cell-lock-icon" title="Cung bị khóa"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>' : ''}
          </span>
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
          <span class="cung-thang-han">${cung.tieuHan ? 'H.' + cung.tieuHan : (cung.thangHan || '')}</span>
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
   * Bảng trượt chi tiết Cung (Bottom Sheet trên Mobile / Side Panel trên Desktop)
   * Hiển thị các sao của cung với trạng thái và luận giải
   * Miễn phí: toàn văn; Khóa: 2 câu đầu rõ ràng, phần sau mờ dần + nút phẳng "Mở khóa 49.000đ"
   * Đóng bằng: nút bấm, vuốt xuống, chạm nền (backdrop), phím Esc.
   */
  openPalaceSheet: function (chiIndex) {
    if (!this._currentLaSo) return;
    const cung = this._currentLaSo.cung[chiIndex];
    if (!cung) return;

    let sheet = document.getElementById('tuviPalaceSheet');
    if (!sheet) {
      sheet = document.createElement('div');
      sheet.id = 'tuviPalaceSheet';
      sheet.className = 'tuvi-palace-sheet';
      document.body.appendChild(sheet);
    }

    const isVip = Boolean(
      (typeof TuViAuth !== 'undefined' && TuViAuth.isVip && TuViAuth.isVip()) ||
      (typeof TuViMonetize !== 'undefined' && TuViMonetize.isVipUnlocked) ||
      (typeof window !== 'undefined' && window.TuViMonetize && window.TuViMonetize.isVipUnlocked)
    );
    const isFreePalace = cung.cungName.startsWith('MỆNH') || cung.cungName.startsWith('PHỤ MẪU');
    const isLocked = !isVip && !isFreePalace;

    // Chính tinh
    let chinhTinhHtml = '';
    if (cung.chinhTinh && cung.chinhTinh.length > 0) {
      chinhTinhHtml = cung.chinhTinh.map(ct => {
        const color = this.ELEMENT_COLORS[ct.element] || '#8F6B00';
        const dacHam = ct.dacHam ? ` (${ct.dacHam})` : '';
        const hoa = ct.tuHoa ? ` <span class="badge-hoa">${ct.tuHoa}</span>` : '';
        return `<span class="sheet-star-tag" style="border-color:${color};color:${color};"><strong>★ ${ct.name}</strong>${dacHam}${hoa}</span>`;
      }).join(' ');
    } else {
      chinhTinhHtml = '<span class="sheet-star-empty">Vô Chính Diệu (Không có chính tinh tọa thủ)</span>';
    }

    // Cát tinh & Quý tinh
    let catTinhHtml = (cung.phuTinhLeft || []).map(pt => {
      const color = this.ELEMENT_COLORS[pt.element] || '#1E7A3E';
      const dacHam = pt.dacHam ? ` (${pt.dacHam})` : '';
      const hoa = pt.tuHoa ? ` <span class="badge-hoa">${pt.tuHoa}</span>` : '';
      return `<span class="sheet-substar-tag" style="color:${color};">+ ${pt.name}${dacHam}${hoa}</span>`;
    }).join(' ');

    // Sát bại tinh
    let satTinhHtml = (cung.phuTinhRight || []).map(pt => {
      const color = this.ELEMENT_COLORS[pt.element] || '#B3261E';
      const dacHam = pt.dacHam ? ` (${pt.dacHam})` : '';
      const hoa = pt.tuHoa ? ` <span class="badge-hoa">${pt.tuHoa}</span>` : '';
      return `<span class="sheet-substar-tag" style="color:${color};">- ${pt.name}${dacHam}${hoa}</span>`;
    }).join(' ');

    // Luận giải chi tiết
    let deepAnalysis = null;
    if (typeof TuViLuanGiaiEngine !== 'undefined') {
      deepAnalysis = TuViLuanGiaiEngine.generatePalaceDeepAnalysis(cung, this._currentLaSo);
    }

    let luanGiaiBody = '';
    if (isLocked) {
      let firstSentences = '';
      if (deepAnalysis && deepAnalysis.cachCucHtml) {
        const rawText = deepAnalysis.cachCucHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const sentences = rawText.split(/(?<=[.!?])\s+/);
        firstSentences = sentences.slice(0, 2).join(' ');
      }
      if (!firstSentences) {
        firstSentences = `Cung ${cung.cungName} tọa tại địa chi ${cung.chi} (${cung.can}), tạo thành kết cấu trọng điểm ảnh hưởng trực tiếp đến đương số.`;
      }

      luanGiaiBody = `
        <div class="sheet-locked-wrap">
          <p class="sheet-leading-text"><strong>✦ Luận điểm ban đầu:</strong> ${firstSentences}</p>
          <div class="sheet-fade-mask" aria-hidden="true">
            <p>Toàn bộ ma trận Tam Phương Tứ Chính, Tứ Hóa Phi Tinh Lộc Quyền Khoa Kỵ, Cát Tinh phò tá, Sát Tinh thử thách và Đạo Trị Mệnh hóa giải vận hạn của Cung ${cung.cungName} được phân tích toàn diện trong bản luận giải chuyên sâu...</p>
          </div>
          <div class="sheet-unlock-cta">
            <button type="button" class="btn-flat-unlock" onclick="TuViMonetize.openVipModal('Mở Khóa Toàn Bộ Cung ${cung.cungName}', 49000)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:4px;"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Mở khóa 49.000đ
            </button>
          </div>
        </div>
      `;
    } else {
      if (deepAnalysis) {
        luanGiaiBody = `
          <div class="sheet-free-analysis">
            ${deepAnalysis.cachCucHtml ? `<div class="sheet-analysis-block">${deepAnalysis.cachCucHtml}</div>` : ''}
            ${deepAnalysis.chinhTinhDetailHtml ? `<div class="sheet-analysis-block">${deepAnalysis.chinhTinhDetailHtml}</div>` : ''}
            ${deepAnalysis.loiKhuyenHtml ? `<div class="sheet-analysis-block sheet-advice-box">${deepAnalysis.loiKhuyenHtml}</div>` : ''}
          </div>
        `;
      } else {
        luanGiaiBody = `<p>Cung ${cung.cungName} tọa tại ${cung.chi}. Bản mệnh đắc địa thế cát lành, tinh đẩu tương trợ hanh thông.</p>`;
      }
    }

    sheet.innerHTML = `
      <div class="sheet-backdrop" onclick="TuViChart.closePalaceSheet()"></div>
      <div class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="sheetPalaceTitle">
        <div class="sheet-drag-handle" aria-hidden="true"></div>
        <div class="sheet-header">
          <div class="sheet-header-title">
            <h3 id="sheetPalaceTitle">${cung.cungName} · CUNG ${cung.chi}</h3>
            <span class="sheet-subtitle">Can Chi: <strong>${cung.can} ${cung.chi}</strong> · Đại hạn: <strong>${cung.daiHan ? cung.daiHan.num : ''}</strong> tuổi</span>
          </div>
          <button type="button" class="sheet-close-btn" aria-label="Đóng bảng chi tiết" onclick="TuViChart.closePalaceSheet()">&times;</button>
        </div>
        <div class="sheet-content">
          <div class="sheet-section">
            <h4 class="sheet-section-title">✦ Chính Tinh</h4>
            <div class="sheet-stars-group">${chinhTinhHtml}</div>
          </div>
          ${catTinhHtml ? `
          <div class="sheet-section">
            <h4 class="sheet-section-title">✦ Cát Tinh &amp; Quý Tinh</h4>
            <div class="sheet-substars-group">${catTinhHtml}</div>
          </div>` : ''}
          ${satTinhHtml ? `
          <div class="sheet-section">
            <h4 class="sheet-section-title">✦ Sát Bại Tinh &amp; Hóa Khí</h4>
            <div class="sheet-substars-group">${satTinhHtml}</div>
          </div>` : ''}
          <div class="sheet-section sheet-section-analysis">
            <h4 class="sheet-section-title">✦ Luận Giải Cung Vị</h4>
            ${luanGiaiBody}
          </div>
        </div>
      </div>
    `;

    sheet.classList.add('active');
    document.body.classList.add('sheet-open');

    // Thêm listener đóng bằng phím ESC
    if (this._sheetEscListener) {
      window.removeEventListener('keydown', this._sheetEscListener);
    }
    this._sheetEscListener = (e) => {
      if (e.key === 'Escape') TuViChart.closePalaceSheet();
    };
    window.addEventListener('keydown', this._sheetEscListener);

    // Hỗ trợ cử chỉ vuốt xuống trên thiết bị di động (Swipe-down to close)
    const panel = sheet.querySelector('.sheet-panel');
    if (panel) {
      let startY = 0;
      let currentY = 0;
      panel.ontouchstart = (e) => {
        startY = e.touches[0].clientY;
      };
      panel.ontouchmove = (e) => {
        currentY = e.touches[0].clientY;
        const diff = currentY - startY;
        if (diff > 0 && panel.scrollTop <= 0) {
          panel.style.transform = `translateY(${diff}px)`;
        }
      };
      panel.ontouchend = () => {
        const diff = currentY - startY;
        panel.style.transform = '';
        if (diff > 90) {
          TuViChart.closePalaceSheet();
        }
      };
    }
  },

  closePalaceSheet: function () {
    const sheet = document.getElementById('tuviPalaceSheet');
    if (sheet) sheet.classList.remove('active');
    document.body.classList.remove('sheet-open');
    if (this._sheetEscListener) {
      window.removeEventListener('keydown', this._sheetEscListener);
      this._sheetEscListener = null;
    }
  },

  /**
   * Tải ảnh lá số chuẩn nét PNG (Client-side render)
   */
  downloadChartPng: function () {
    const printArea = document.getElementById('laSoPrintArea');
    if (!printArea) {
      alert('Chưa có lá số để tải. Vui lòng lập lá số trước.');
      return;
    }

    const loadScript = (src) => new Promise((resolve, reject) => {
      if (window.html2canvas) return resolve();
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Không thể tải thư viện xuất ảnh.'));
      document.head.appendChild(s);
    });

    if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
      TuViApp.showToast('Đang tạo ảnh lá số chất lượng cao...', 'info');
    }

    loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js')
      .then(() => {
        return window.html2canvas(printArea, {
          scale: 2,
          backgroundColor: '#FBF7EE',
          useCORS: true,
          logging: false
        });
      })
      .then(canvas => {
        const link = document.createElement('a');
        const hoTen = (this._currentLaSo && this._currentLaSo.hoTen) ? this._currentLaSo.hoTen.replace(/\s+/g, '_') : 'DuongSo';
        link.download = `La-So-Tu-Vi-${hoTen}-xemtuvihuyenhoc.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
          TuViApp.showToast('Đã tải ảnh lá số thành công!', 'success');
        }
      })
      .catch(err => {
        console.error('PNG download error:', err);
        alert('Có lỗi khi tạo ảnh lá số. Bạn có thể dùng tính năng In hoặc chụp màn hình.');
      });
  },

  /**
   * Modal xem toàn màn hình (Phóng to / Thu nhỏ / Pan)
   */
  _zoomLevel: 1,
  openZoomModal: function () {
    const printArea = document.getElementById('laSoPrintArea');
    if (!printArea) return;

    let modal = document.getElementById('tuviZoomModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'tuviZoomModal';
      modal.className = 'tuvi-zoom-modal';
      document.body.appendChild(modal);
    }

    this._zoomLevel = 1;
    modal.innerHTML = `
      <div class="zoom-modal-backdrop" onclick="TuViChart.closeZoomModal()"></div>
      <div class="zoom-modal-container">
        <div class="zoom-modal-toolbar">
          <button type="button" class="btn-zoom-ctrl" onclick="TuViChart.changeZoom(0.2)" title="Phóng to">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </button>
          <button type="button" class="btn-zoom-ctrl" onclick="TuViChart.changeZoom(-0.2)" title="Thu nhỏ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </button>
          <button type="button" class="btn-zoom-ctrl" onclick="TuViChart.resetZoom()" title="Về mặc định">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          </button>
          <button type="button" class="btn-zoom-ctrl btn-zoom-close" onclick="TuViChart.closeZoomModal()" title="Đóng">&times;</button>
        </div>
        <div class="zoom-modal-viewport" id="zoomViewport">
          <div class="zoom-modal-content" id="zoomContent">
            ${printArea.outerHTML}
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.classList.add('zoom-modal-open');

    if (this._zoomEscListener) {
      window.removeEventListener('keydown', this._zoomEscListener);
    }
    this._zoomEscListener = (e) => {
      if (e.key === 'Escape') TuViChart.closeZoomModal();
    };
    window.addEventListener('keydown', this._zoomEscListener);
  },

  changeZoom: function (delta) {
    this._zoomLevel = Math.max(0.6, Math.min(2.5, this._zoomLevel + delta));
    const content = document.getElementById('zoomContent');
    if (content) {
      content.style.transform = `scale(${this._zoomLevel})`;
    }
  },

  resetZoom: function () {
    this._zoomLevel = 1;
    const content = document.getElementById('zoomContent');
    if (content) {
      content.style.transform = 'scale(1)';
    }
  },

  closeZoomModal: function () {
    const modal = document.getElementById('tuviZoomModal');
    if (modal) modal.classList.remove('active');
    document.body.classList.remove('zoom-modal-open');
    if (this._zoomEscListener) {
      window.removeEventListener('keydown', this._zoomEscListener);
      this._zoomEscListener = null;
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

    let html = `
      <div class="accordion-progress-wrap">
        <div class="accordion-progress-label">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--gold);"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Tiến độ luận giải: <strong>${isVip ? 'Đã mở 12/12 cung (VIP)' : 'Đã mở 2/12 cung'}</strong></span>
        </div>
        <div class="accordion-progress-track">
          <div class="accordion-progress-fill" style="width: ${isVip ? '100%' : '16.6%'};"></div>
        </div>
      </div>
    `;

    CUNG_KEYS.forEach((item, index) => {
      const cung = laSo.cung.find(c => c.cungName.startsWith(item.name));
      if (!cung) return;

      const isFirst = index === 0;
      // Quy định nghiệp vụ: Tra cứu cơ bản chỉ cho xem 2 cung đầu (MỆNH & PHỤ MẪU). Từ cung thứ 3 (index >= 2) khóa hoàn toàn
      const isLocked = !isVip && index >= 2;

      if (isLocked) {
        const starCount = (cung.chinhTinh ? cung.chinhTinh.length : 0) + 
                          (cung.phuTinhLeft ? cung.phuTinhLeft.length : 0) + 
                          (cung.phuTinhRight ? cung.phuTinhRight.length : 0);
        const topStars = (cung.chinhTinh || []).map(s => s.name).concat((cung.phuTinhLeft || []).slice(0, 2).map(s => s.name));
        const starMention = topStars.length > 0 ? ` (như ${topStars.slice(0, 3).join(', ')})` : '';
        const curiosityLine = `Cung ${cung.cungName} của bạn có ${starCount} sao đáng chú ý${starMention}, nắm giữ thiên cơ trọng yếu về vận thế và đường phát triển.`;

        let analysis = null;
        if (typeof TuViLuanGiaiEngine !== 'undefined') {
          analysis = TuViLuanGiaiEngine.generatePalaceDeepAnalysis(cung, laSo);
        }
        let firstSentences = '';
        if (analysis && analysis.cachCucHtml) {
          const rawText = analysis.cachCucHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
          const sentences = rawText.split(/(?<=[.!?])\s+/);
          firstSentences = sentences.slice(0, 2).join(' ');
        }
        if (!firstSentences) {
          firstSentences = `Cung ${cung.cungName} tọa tại địa chi ${cung.chi} (${cung.can}), tạo thành kết cấu trọng điểm ảnh hưởng trực tiếp đến đương số.`;
        }

        html += `
          <div class="accordion-item item-locked" data-palace="${item.key}">
            <button class="accordion-header" aria-expanded="false" type="button" onclick="TuViChart.toggleAccordionItem(this)">
              <span class="palace-icon gold-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
              <span class="palace-name palace-title-gold-light">${cung.cungName} · Cung ${cung.chi} (${cung.can})</span>
              <span class="wax-seal-badge"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Mở khóa 49.000đ</span>
              <span class="toggle-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></span>
            </button>
            <div class="accordion-body" role="region" style="display:none;">
              <div class="palace-locked-preview-wrap">
                <div class="curiosity-line">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:inline; vertical-align:-2px; margin-right:4px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  ${curiosityLine}
                </div>
                <p style="font-size:0.92rem; line-height:1.65; color:#F5EFE0; margin-bottom:0.8rem;">
                  <strong>✦ Luận điểm ban đầu:</strong> ${firstSentences}
                </p>
                <div class="locked-fade-text" aria-hidden="true">
                  Toàn bộ ma trận Tam Phương Tứ Chính, Tứ Hóa Phi Tinh Lộc Quyền Khoa Kỵ, Cát Tinh phò tá, Sát Tinh thử thách và Đạo Trị Mệnh hóa giải vận hạn của Cung ${cung.cungName} được bảo mật trong Gói VIP 49.000đ. Đương số cần thấu triệt ngũ hành sinh khắc để đón lành tránh dữ và nắm bắt thiên cơ thịnh vượng...
                </div>
                <div class="locked-overlay-card">
                  <div class="lock-glow-icon"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
                  <span class="wax-seal-badge" style="margin: 0.6rem 0;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Mở khóa 49.000đ</span>
                  <button class="btn-gold-pill btn-lock-upgrade-sm" onclick="TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư (Mở Khóa 12 Cung)', 49000)">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:4px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Mở Khóa Toàn Bộ Cung ${cung.cungName} (49k)
                  </button>
                </div>
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
          <button class="accordion-header" aria-expanded="${isFirst ? 'true' : 'false'}" type="button" onclick="TuViChart.toggleAccordionItem(this)">
            <span class="palace-icon" aria-hidden="true">${item.icon}</span>
            <span class="palace-name">${cung.cungName} · Cung ${cung.chi} (${cung.can})</span>
            <span class="palace-stars-count">${tieuDeText}</span>
            <span class="toggle-icon" aria-hidden="true">▼</span>
          </button>
          <div class="accordion-body" role="region" style="${isFirst ? 'display:block;' : 'display:none;'}">
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
