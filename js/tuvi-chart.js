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
    'Kim': '#7A5C00',
    'Mộc': '#1A6B35',
    'Thủy': '#164273',
    'Hỏa': '#A3281F',
    'Thổ': '#7D4814'
  },

  // Màu sắc định danh Cung Vị theo chuẩn trang nhã, tương phản cao trên nền giấy #FBF7EE
  PALACE_COLORS: {
    'MỆNH': '#A3281F',
    'PHỤ MẪU': '#2A231C',
    'PHÚC ĐỨC': '#2A231C',
    'ĐIỀN TRẠCH': '#2A231C',
    'QUAN LỘC': '#2A231C',
    'NÔ BỘC': '#2A231C',
    'THIÊN DI': '#2A231C',
    'TẬT ÁCH': '#2A231C',
    'TÀI BẠCH': '#2A231C',
    'TỬ TỨC': '#2A231C',
    'PHU THÊ': '#2A231C',
    'HUYNH ĐỆ': '#2A231C'
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
          
          <span>Mở khóa toàn bộ 12 cung + Đại hạn · <strong>49.000đ</strong></span>
        </div>
        <button class="btn-sticky-unlock" onclick="TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư (Mở Khóa 12 Cung)', 49000)">
          Mở Khóa VIP (49.000đ)
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
              <p class="chart-school-note" style="margin: 0.75rem auto 1.5rem; text-align: center; font-size: 0.88rem; color: var(--text-muted); font-style: italic;">
                *Lá số an theo phương pháp Tử Vi Cổ Truyền Việt Nam (Lịch thiên văn UTC+7, an sao chuẩn phái Trung Châu &amp; Thái Thứ Lang); quy tắc giờ Tý: tính theo đúng ngày được chọn trên biểu mẫu (23h00–00h59).*
              </p>
              <div class="luan-giai-section" id="luan-giai" style="display:block;">
                <h3 class="luan-giai-header-title">Luận Giải Chi Tiết 12 Cung</h3>
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

    return `
      <div class="gio-sinh-verification-wrap">
        <!-- Thanh công cụ chuyển nhanh giờ sinh -->
        <div class="gio-nav-toolbar">
          <button type="button" class="btn-gio-nav btn-gio-prev" onclick="TuViChart.shiftHour(-1)" title="Chuyển sang giờ sinh liền trước">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            <span>Giờ sinh trước</span>
          </button>
          <div class="gio-current-display">
            <span class="gio-nav-label">Giờ đang xem:</span>
            <strong class="gio-current-val">${canChiGio} (${gioPhutText})</strong>
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
              <p class="verification-item-desc">${dm}</p>
            </div>
            <div class="verification-item">
              <div class="verification-item-head">
                <span class="ver-step-badge">2</span>
                <strong>Tính Cách & Định Hướng (Thân)</strong>
              </div>
              <p class="verification-item-desc">${tc}</p>
            </div>
            <div class="verification-item">
              <div class="verification-item-head">
                <span class="ver-step-badge">3</span>
                <strong>Thể Chất & Vết Sẹo (Tật Ách)</strong>
              </div>
              <p class="verification-item-desc">${the}</p>
            </div>
          </div>
        </div>
      </div>
    `;
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
    inp.gioPhutText = `${inp.gio} giờ 30 phút (Giờ ${diaChiNames[newGioIdx]})`;
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

  renderTraditionalChart: function (laSo) {
    const chartWrapper = document.getElementById('la-so-chart');
    if (!chartWrapper) return;

    const isVip = Boolean(
      (typeof TuViAuth !== 'undefined' && TuViAuth.isVip && TuViAuth.isVip()) ||
      (typeof TuViMonetize !== 'undefined' && TuViMonetize.isVipUnlocked) ||
      (typeof window !== 'undefined' && window.TuViMonetize && window.TuViMonetize.isVipUnlocked)
    );
    const orderDisplay = (typeof TuViMonetize !== 'undefined' && TuViMonetize.vipOrderCode) || (typeof localStorage !== 'undefined' && localStorage.getItem('tvhh_vip_order_code')) || 'TV289735';

    let html = `
      <!-- BẢN IN: TIÊU ĐỀ BÁO CÁO VIP TRANG TRỌNG (CHỈ HIỂN THỊ KHI IN / LƯU PDF A4) -->
      <div class="print-report-header">
        <div class="print-header-top">
          <span class="print-brand">✦ XEM TỬ VI HUYỀN HỌC · BÁO CÁO TOÀN THƯ ✦</span>
          <span class="print-meta-right">BẢN LƯU TRỮ TRỌN ĐỜI · MÃ HỒ SƠ: #${orderDisplay}</span>
        </div>
        <h1 class="print-header-title">BÁO CÁO LUẬN GIẢI TỬ VI ĐẨU SỐ TOÀN THƯ</h1>
        <p class="print-header-sub">Hệ thống an sao phái Trung Châu &amp; Thái Thứ Lang · Lịch thiên văn UTC+7 · Chuẩn cổ truyền Việt Nam</p>
      </div>

      ${this.renderSummaryCard(laSo)}
      ${this.renderSeasonalBanner(laSo)}
      ${this.renderGioSinhVerification(laSo)}

      <div class="la-so-toolbar">
        <button type="button" class="btn-toolbar btn-toolbar-png" onclick="TuViChart.downloadChartPng()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:5px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Tải lá số
        </button>
        <button type="button" class="btn-toolbar btn-toolbar-numerology" onclick="TuViChart.openNumerologyForCurrent()" style="background: rgba(163,40,31,0.06); color: var(--seal); border-color: var(--seal); font-weight: 600;">
          🔮 Thần Số Học
        </button>
        <button type="button" class="btn-toolbar btn-toolbar-compatibility" onclick="TuViChart.openCompatibilityForCurrent()" style="color: var(--text); border-color: var(--line); font-weight: 600;">
          ❤️ Hợp Tuổi
        </button>
        <button type="button" class="btn-toolbar btn-toolbar-viral" onclick="TuViShare.generateCard(TuViChart._currentLaSo)" style="background: rgba(163,40,31,0.08); color: var(--seal); border-color: var(--seal); font-weight: 600;">
          ✨ Thẻ Mệnh Bàn Viral
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
        ${isVip ? `
          <button type="button" class="btn-toolbar btn-toolbar-vip btn-toolbar-unlocked" onclick="TuViMonetize.printVipReport()" style="background:#10b981; color:#fff; border-color:#10b981; font-weight:700;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:5px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>📥 Xuất Báo Cáo VIP A4
          </button>
        ` : `
          <button type="button" class="btn-toolbar btn-toolbar-vip" onclick="TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư (Mở Khóa 12 Cung)', 49000)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:5px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Tải Báo Cáo VIP A4 (49k)
          </button>
        `}
      </div>

      <!-- THANH CHUYỂN ĐỔI CHẾ ĐỘ XEM TRÊN ĐIỆN THOẠI (Auto-fit & Zoom) -->
      <div class="mobile-chart-scale-bar" id="mobileChartScaleBar">
        <button type="button" class="btn-scale-toggle active" id="btnScaleFit" onclick="TuViChart.setMobileScaleMode('fit')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="vertical-align:-2px;margin-right:4px;"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>🗺️ Vừa Màn Hình (Chuẩn)
        </button>
        <button type="button" class="btn-scale-toggle" id="btnScaleScroll" onclick="TuViChart.setMobileScaleMode('scroll')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="vertical-align:-2px;margin-right:4px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>🔍 Phóng To Lá Số (Vuốt ngang)
        </button>
      </div>

      <div class="la-so-scroll-wrapper laso-board-wrapper">
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

      <!-- NÚT NỔI BẬT: THẺ TÓM TẮT MỆNH BÀN 2026 (VIRAL WRAPPED) -->
      <div class="viral-wrapped-cta-wrap" style="text-align: center; margin: 1.25rem auto 1.5rem; max-width: 680px; padding: 0 10px;">
        <button type="button" class="btn-viral-wrapped-share" onclick="TuViShare.generateCard(TuViChart._currentLaSo)">
          ✨ Tải Thẻ Tóm Tắt Mệnh Bàn 2026 (Đăng Threads / TikTok / Story)
        </button>
      </div>

      <!-- KẾT HỢP THẦN SỐ HỌC PYTHAGORAS & BÁT TỰ (CỔ HỌC TINH HOA) -->
      <div class="huyen-hoc-cross-banner" style="background: var(--card); border: 2px solid var(--brass); border-radius: 12px; padding: 1.25rem 1.5rem; margin: 1.5rem auto; max-width: 780px; box-shadow: var(--shadow-sm); text-align: left;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 260px;">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--seal); letter-spacing: 1px;">✦ CỔ HỌC TINH HOA ✦</div>
            <h4 style="font-family: var(--font-heading); font-size: 1.15rem; color: var(--ink); margin: 0.25rem 0;">Khám Phá Thần Số Học Pythagoras Cho Đương Số</h4>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0; line-height: 1.5;">
              Kết hợp Tử Vi Đẩu Số cùng Thần Số Học Pythagoras để khám phá <strong>Số Chủ Đạo, 4 Đỉnh Cao Cuộc Đời</strong> và <strong>Vận Hạn Năm 2026 - 2027</strong>.
            </p>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button type="button" class="btn-toolbar" onclick="TuViChart.openNumerologyForCurrent()" style="background: var(--seal); color: #fff; border-color: var(--seal); font-weight: 600; padding: 0.6rem 1.1rem; cursor: pointer;">
              🔮 Tra Thần Số Học Ngay ➔
            </button>
            <button type="button" class="btn-toolbar" onclick="TuViChart.openCompatibilityForCurrent()" style="background: #FFFDF9; color: var(--ink); border-color: var(--line); font-weight: 600; padding: 0.6rem 1rem; cursor: pointer;">
              ❤️ Xem Hợp Tuổi
            </button>
          </div>
        </div>
      </div>
    `;

    chartWrapper.innerHTML = html;
    this.initMobileChartScale();
  },

  /**
   * Render từng ô Cung (Palace Cell) chuẩn nguyên bản Tra Cứu Tử Vi
   */
  
  _mobileScaleMode: 'fit',
  _onResizeScale: null,

  initMobileChartScale: function () {
    if (!this._androidPopstateListenerAttached) {
      this._androidPopstateListenerAttached = true;
      window.addEventListener('popstate', (e) => {
        const sheet = document.getElementById('tuviPalaceSheet');
        if (sheet && sheet.classList.contains('active')) {
          TuViChart.closePalaceSheet(true);
        }
      });
    }
    const updateScale = () => {
      const wrapper = document.querySelector('.la-so-scroll-wrapper');
      const container = document.getElementById('laSoPrintArea');
      if (!wrapper || !container) return;

      const isMobile = window.innerWidth < 768;
      const toggleBar = document.getElementById('mobileChartScaleBar');
      if (toggleBar) {
        toggleBar.style.display = isMobile ? 'flex' : 'none';
      }

      if (!isMobile || this._mobileScaleMode === 'scroll') {
        container.style.transform = '';
        container.style.transformOrigin = '';
        container.style.width = '';
        container.style.minWidth = '';
        wrapper.style.height = '';
        wrapper.style.overflowX = 'auto';
        return;
      }

      // Mode: 'fit' on mobile (iPhone 13 & smaller)
      const availWidth = wrapper.clientWidth || (window.innerWidth - 24);
      const BASE_WIDTH = 780;
      const scale = Math.min(1, Math.max(0.32, availWidth / BASE_WIDTH));

      container.style.width = BASE_WIDTH + 'px';
      container.style.minWidth = BASE_WIDTH + 'px';
      container.style.transform = 'scale(' + scale + ')';
      container.style.transformOrigin = 'top left';

      // Measure unscaled height
      const unscaledHeight = container.offsetHeight || container.scrollHeight || 780;
      wrapper.style.height = Math.round(unscaledHeight * scale + 8) + 'px';
      wrapper.style.overflow = 'hidden';
    };

    if (this._onResizeScale) {
      window.removeEventListener('resize', this._onResizeScale);
    }
    this._onResizeScale = () => updateScale();
    window.addEventListener('resize', this._onResizeScale, { passive: true });
    
    updateScale();
    setTimeout(updateScale, 50);
    setTimeout(updateScale, 250);
  },

  setMobileScaleMode: function (mode) {
    this._mobileScaleMode = mode;
    const btnFit = document.getElementById('btnScaleFit');
    const btnScroll = document.getElementById('btnScaleScroll');
    if (btnFit && btnScroll) {
      btnFit.classList.toggle('active', mode === 'fit');
      btnScroll.classList.toggle('active', mode === 'scroll');
    }
    if (this._onResizeScale) this._onResizeScale();
  },

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

    if (window.TuViTracker && window.TuViTracker.track) {
      window.TuViTracker.track('view_cung', {
        palaceName: cung.cungName,
        cungName: cung.cungName,
        chi: cung.chi,
        can: cung.can,
        isLocked
      });
    }

    // Kiểm tra Tuần / Triệt (Đặt GỌN GÀNG BÊN TRONG đường viền ô)
    const hasTuan = laSo.tuan && laSo.tuan.includes(chiIndex);
    const hasTriet = laSo.triet && laSo.triet.includes(chiIndex);
    const isTuanCell = hasTuan && chiIndex === laSo.tuan[0];
    const isTrietCell = hasTriet && chiIndex === laSo.triet[0];
    const hasTuanTriet = isTuanCell || isTrietCell;

    let tuanTrietBanner = '';
    if (hasTuan && chiIndex === laSo.tuan[0]) {
      tuanTrietBanner = '<div class="tuan-triet-ribbon tuan-triet-badge ribbon-tuan">Tuần</div>';
    }
    if (hasTriet && chiIndex === laSo.triet[0]) {
      tuanTrietBanner = '<div class="tuan-triet-ribbon tuan-triet-badge ribbon-triet">Triệt</div>';
    }

    // Tiêu đề cung và màu sắc đặc trưng
    const titleColor = this.PALACE_COLORS[cung.cungName] || '#7A1F17';
    const cleanPalaceName = (cung.cungName || "").replace(/<THÂN>|&lt;THÂN&gt;/g, "").trim();
    const palaceTitle = cleanPalaceName + (isThan ? " <span class=\"than-badge\">THÂN</span>" : "");

    // Dấu Âm / Dương của Thiên Can cung vị (Giáp, Bính, Mậu, Canh, Nhâm: '+'; Ất, Đinh, Kỷ, Tân, Quý: '−')
    const canIsDuong = (typeof cung.canIndex === 'number') ? (cung.canIndex % 2 === 0) : true;
    const canSignSymbol = canIsDuong ? '+' : '−';

    // Khối Chính Tinh ở GIỮA (Centered Main Stars)
    let chinhTinhCenterHtml = '';
    const hasChinhTinh = cung.chinhTinh && cung.chinhTinh.length > 0;
    if (hasChinhTinh) {
      cung.chinhTinh.forEach(ct => {
        const color = this.ELEMENT_COLORS[ct.element] || '#8F6B00';
        const sign = (ct.sign === '-' || ct.sign === '−') ? '−' : (ct.sign || '+');
        const dacHam = ct.dacHam ? ` (${ct.dacHam})` : '';
        chinhTinhCenterHtml += `
          <div class="star-chinh-center" style="color: ${color};">
            <span class="star-sign">${sign}</span>
            <strong class="star-name">${ct.name}</strong>${dacHam ? `<span class="star-dacham">${dacHam}</span>` : ''}
            ${ct.tuHoa ? `<span class="tu-hoa-badge">${ct.tuHoa}</span>` : ''}
          </div>
        `;
      });
    }

    // Cột sao trái: Cát tinh
    let leftColHtml = '';
    if (cung.phuTinhLeft && cung.phuTinhLeft.length > 0) {
      cung.phuTinhLeft.forEach(pt => {
        const color = pt.isLuu ? '#C2410C' : (this.ELEMENT_COLORS[pt.element] || '#1E7A3E');
        const dacHam = pt.dacHam ? ` (${pt.dacHam})` : '';
        leftColHtml += `
          <div class="star-line star-cat ${pt.isLuu ? 'star-luu' : ''}" style="color: ${color};">
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
        const color = pt.isLuu ? '#C2410C' : (this.ELEMENT_COLORS[pt.element] || '#B3261E');
        const dacHam = pt.dacHam ? ` (${pt.dacHam})` : '';
        rightColHtml += `
          <div class="star-line star-sat ${pt.isLuu ? 'star-luu' : ''}" style="color: ${color};">
            <span>${pt.name}</span>${dacHam}
            ${pt.tuHoa ? `<span class="tu-hoa-badge">${pt.tuHoa}</span>` : ''}
          </div>
        `;
      });
    }

    return `
      <div class="cung-classical-cell cung-cell la-so-cell ${isMenh ? 'cell-menh' : ''} ${isThan ? 'cell-than' : ''} ${hasTuanTriet ? 'has-tuan-triet' : ''}" 
           data-chi="${chiIndex}"
           onclick="TuViChart.openPalaceSheet(${chiIndex})"
           title="Nhấp để xem chi tiết sao & luận giải Cung ${cung.cungName}">
        ${tuanTrietBanner}
        
        <!-- Header Cung -->
        <div class="cung-top-bar cung-header">
          <span class="cung-can-chi" title="Cung ${cung.chi} (Thiên Can ${cung.can})">
            <span class="cung-fixed-chi-badge">${cung.chi}</span><span class="cung-can-dot">.${cung.canShort}</span>
          </span>
          <span class="cung-main-title" style="color: ${titleColor};">
            ${palaceTitle}
            ${isLocked ? '<span class="cell-lock-icon" title="Cung bị khóa"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>' : ''}
          </span>
          <span class="cung-dai-han-num" title="Khởi Đại Hạn">${cung.daiHan ? cung.daiHan.num : ''}</span>
        </div>

        <!-- Khối Chính Tinh ở GIỮA -->
        <div class="cung-chinh-tinh-wrap ${hasChinhTinh ? '' : 'vcd'}">
          <span class="cung-can-sign" style="color: ${titleColor};">${canSignSymbol}</span>
          <div class="cung-chinh-tinh-center chinh-tinh-row">
            ${chinhTinhCenterHtml}
          </div>
        </div>

        <!-- Hai cột sao -->
        <div class="cung-stars-columns phu-tinh-grid">
          <div class="cung-col-left">${leftColHtml}</div>
          <div class="cung-col-right">${rightColHtml}</div>
        </div>

        <!-- Footer Cung -->
        <div class="cung-bottom-bar">
          <span class="cung-tieu-han-wrap" title="Lưu Tiểu Hạn năm ${laSo.viewYear || 2026}: ${cung.tieuHan || cung.chi}">
            <span class="cung-tieu-han-prefix">Hạn</span><b class="cung-chi-label">${cung.tieuHan || cung.chi}</b>
          </span>
          <span class="cung-trang-sinh" title="Vòng Tràng Sinh">${cung.trangSinh || ''}</span>
          <span class="cung-thang-han" title="Nguyệt Hạn (Tháng ${cung.thangHan ? cung.thangHan.replace('Th.', '') : ''} Âm Lịch)">${cung.thangHan || ''}</span>
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
   * Miễn phí: toàn văn; Khóa: 2 câu đầu rõ ràng, phần sau mờ dần + nút phẳng "Khóa · 49.000đ"
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

    if (window.TuViTracker && window.TuViTracker.track) {
      window.TuViTracker.track('view_cung', {
        palaceName: cung.cungName,
        cungName: cung.cungName,
        chi: cung.chi,
        can: cung.can,
        isLocked
      });
    }

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
          <p class="sheet-leading-text"><strong>Luận điểm ban đầu:</strong> ${firstSentences}</p>
          <div class="sheet-fade-mask" aria-hidden="true">
            <p>Toàn bộ ma trận Tam Phương Tứ Chính, Tứ Hóa Phi Tinh Lộc Quyền Khoa Kỵ, Cát Tinh phò tá, Sát Tinh thử thách và Đạo Trị Mệnh hóa giải vận hạn của Cung ${cung.cungName} được phân tích toàn diện trong bản luận giải chuyên sâu...</p>
          </div>
          <div class="sheet-unlock-cta">
            <button type="button" class="btn-flat-unlock" onclick="TuViMonetize.openVipModal('Mở Khóa Toàn Bộ Cung ${cung.cungName}', 49000)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:4px;"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Khóa · 49.000đ
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
            ${deepAnalysis.catTinhDetailHtml ? `<div class="sheet-analysis-block">${deepAnalysis.catTinhDetailHtml}</div>` : ''}
            ${deepAnalysis.satTinhDetailHtml ? `<div class="sheet-analysis-block">${deepAnalysis.satTinhDetailHtml}</div>` : ''}
            ${deepAnalysis.catSatInteractionHtml ? `<div class="sheet-analysis-block">${deepAnalysis.catSatInteractionHtml}</div>` : ''}
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
            <h4 class="sheet-section-title">Chính Tinh</h4>
            <div class="sheet-stars-group">${chinhTinhHtml}</div>
          </div>
          ${catTinhHtml ? `
          <div class="sheet-section">
            <h4 class="sheet-section-title">Cát Tinh &amp; Quý Tinh</h4>
            <div class="sheet-substars-group">${catTinhHtml}</div>
          </div>` : ''}
          ${satTinhHtml ? `
          <div class="sheet-section">
            <h4 class="sheet-section-title">Sát Bại Tinh &amp; Hóa Khí</h4>
            <div class="sheet-substars-group">${satTinhHtml}</div>
          </div>` : ''}
          <div class="sheet-section sheet-section-analysis">
            <h4 class="sheet-section-title">Luận Giải Cung Vị</h4>
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

  openNumerologyForCurrent: function () {
    if (!this._currentLaSo) return;
    const name = this._currentLaSo.hoTen || '';
    const s = this._currentLaSo.solarDate || {};
    const dob = s.year ? `${s.year}-${String(s.month).padStart(2, '0')}-${String(s.day).padStart(2, '0')}` : '';
    window.location.href = `/than-so-hoc?name=${encodeURIComponent(name)}&dob=${dob}`;
  },

  openCompatibilityForCurrent: function () {
    if (!this._currentLaSo) return;
    const name = this._currentLaSo.hoTen || '';
    const s = this._currentLaSo.solarDate || {};
    const dob = s.year ? `${s.year}-${String(s.month).padStart(2, '0')}-${String(s.day).padStart(2, '0')}` : '';
    window.location.href = `/hop-tuoi?name1=${encodeURIComponent(name)}&dob1=${dob}`;
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

    // Xác thực quyền VIP: VIP trọn gói hoặc gói tripwire 29k
    const isVip = Boolean(
      (typeof TuViAuth !== 'undefined' && TuViAuth.isVip && TuViAuth.isVip()) ||
      (typeof TuViMonetize !== 'undefined' && TuViMonetize.isVipUnlocked) ||
      (typeof window !== 'undefined' && window.TuViMonetize && window.TuViMonetize.isVipUnlocked)
    );

    const isTripwire = Boolean(
      (typeof TuViMonetize !== 'undefined' && TuViMonetize.isTripwireUnlocked) ||
      (typeof window !== 'undefined' && window.TuViMonetize && window.TuViMonetize.isTripwireUnlocked)
    );

    // 1. TẦNG MIỄN PHÍ: BẢN ĐỒ TÍNH CÁCH NGẦM & NGHIỆM LÝ VẬN TRÌNH ĐÃ QUA
    let freeDossierHtml = '';
    if (typeof TuViLuanGiaiEngine !== 'undefined' && TuViLuanGiaiEngine.generateFreePsychologicalTeaserHtml) {
      freeDossierHtml = TuViLuanGiaiEngine.generateFreePsychologicalTeaserHtml(laSo);
    }

    // 2. TIẾN ĐỘ LUẬN GIẢI
    const progressLabel = isVip
      ? 'Đã mở 12/12 cung (Bản VIP Toàn Thư)'
      : (isTripwire ? 'Đã mở 5/12 cung (Cơ Bản + Tài - Quan - Phối)' : 'Đã mở 2/12 cung (Mệnh &amp; Phụ Mẫu) + Bản Đồ Tâm Lý');
    const progressWidth = isVip ? '100%' : (isTripwire ? '41.6%' : '16.6%');

    let html = `
      ${freeDossierHtml}

      <div class="accordion-progress-wrap" style="margin-bottom: 1.5rem;">
        <div class="accordion-progress-label">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--seal, #A3281F);"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Tiến độ luận giải: <strong>${progressLabel}</strong></span>
        </div>
        <div class="accordion-progress-track">
          <div class="accordion-progress-fill" style="width: ${progressWidth};"></div>
        </div>
      </div>
    `;

    CUNG_KEYS.forEach((item, index) => {
      const cung = laSo.cung.find(c => c.cungName.startsWith(item.name));
      if (!cung) return;

      const isFirst = index === 0;
      const isFreePalace = (item.key === 'menh' || item.key === 'phu-mau');
      const isTripwirePalace = ['tai-bach', 'quan-loc', 'phu-the'].includes(item.key);
      const isFullyUnlocked = isVip || isFreePalace || (isTripwire && isTripwirePalace);

      // Phân tích chuyên sâu cung vị
      let analysis = null;
      if (typeof TuViLuanGiaiEngine !== 'undefined') {
        analysis = TuViLuanGiaiEngine.generatePalaceDeepAnalysis(cung, laSo);
      }

      const tieuDeText = analysis ? analysis.tieuDe : `${cung.cungName} Tọa Cung ${cung.chi}`;
      const cachCucText = analysis ? analysis.cachCucHtml : `<p>Tọa thủ tại cung ${cung.chi} thuộc ngũ hành bản vị.</p>`;
      const tamPhuongText = (analysis && analysis.tamPhuongHtml) ? analysis.tamPhuongHtml : '';
      const chinhTinhText = analysis ? analysis.chinhTinhDetailHtml : '';
      const tuHoaText = analysis ? analysis.tuHoaDetailHtml : '';
      const catTinhText = analysis ? analysis.catTinhDetailHtml : '';
      const satTinhText = analysis ? analysis.satTinhDetailHtml : '';
      const catSatInteractionText = (analysis && analysis.catSatInteractionHtml) ? analysis.catSatInteractionHtml : '';
      const vongKhiText = analysis ? analysis.vongKhiHtml : '';
      const khongVongText = analysis ? analysis.khongVongHtml : '';
      const caiSoText = analysis ? analysis.caiSoHtml : 'Giữ tâm thái an hòa, tích cực hành thiện tích đức, thận trọng trong các quyết định lớn để hóa giải ách nạn, vươn tới thành công.';

      if (isFullyUnlocked) {
        // CUNG ĐÃ ĐƯỢC MỞ KHÓA HOÀN TOÀN
        html += `
          <div class="accordion-item ${isFirst ? 'open' : ''}" data-palace="${item.key}">
            <button class="accordion-header" aria-expanded="${isFirst ? 'true' : 'false'}" type="button" onclick="TuViChart.toggleAccordionItem(this)">
              <span class="palace-icon" aria-hidden="true">${item.icon}</span>
              <span class="palace-name">${cung.cungName} · Cung ${cung.chi} (${cung.can})</span>
              <span class="palace-stars-count" style="color:var(--seal, #A3281F); font-weight:600;">${tieuDeText}</span>
              <span class="toggle-icon" aria-hidden="true">▼</span>
            </button>
            <div class="accordion-body" role="region" style="${isFirst ? 'display:block;' : 'display:none;'}">
              <div class="luan-giai-scholarly-content">
                <div class="luan-giai-nhandinh-badge">${tieuDeText}</div>
                
                <!-- 1. Cách Cục & Khí Tượng Cung Vị -->
                <div class="luan-giai-block cach-cuc-block" style="margin-bottom: 0.8rem; font-size: 0.92rem; line-height: 1.65; color: var(--text);">
                  ${cachCucText}
                </div>

                <!-- 2. Tương Tác Tam Phương Tứ Chính & Đại Cách Cục -->
                ${tamPhuongText}

                <!-- 3. Biện Giải Từng Chính Tinh Tọa Thủ -->
                ${chinhTinhText}

                <!-- 4. Tứ Hóa Phi Tinh (Lộc - Quyền - Khoa - Kỵ) -->
                ${tuHoaText}

                <!-- 5. Cát Tinh Nâng Đỡ -->
                ${catTinhText}

                <!-- 6. Sát Tinh Thử Thách -->
                ${satTinhText}

                <!-- 6.5. Tổng Luận Tương Tác Cát Hung -->
                ${catSatInteractionText}

                <!-- 7. Vòng Tràng Sinh & Thái Tuế -->
                ${vongKhiText}

                <!-- 8. Tuần Không / Triệt Không Án Ngữ -->
                ${khongVongText}

                <!-- 9. Lời Khuyên Tu Dưỡng & Cải Sửa Số Mệnh -->
                <div class="palace-advice" style="margin-top: 1rem; background: var(--paper-2); border: 1.5px solid var(--line); padding: 0.9rem 1.1rem; border-radius: 6px;">
                  <strong style="color: var(--seal); font-size: 0.92rem; font-family: var(--font-heading);">Đạo Trị Mệnh &amp; Hóa Giải Sát Khí (Theo Cụ Nguyễn Phát Lộc):</strong>
                  <p style="color: var(--text); font-size: 0.9rem; line-height: 1.65; margin-top: 0.35rem;">${caiSoText}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        // CUNG TEASER 30% + CLIFFHANGER BLUR PAYWALL 70%
        let cliff = null;
        if (typeof TuViLuanGiaiEngine !== 'undefined' && TuViLuanGiaiEngine.generatePalaceCliffhangerTeaser) {
          cliff = TuViLuanGiaiEngine.generatePalaceCliffhangerTeaser(cung, laSo);
        }
        const bulletsList = cliff ? cliff.bullets : [
          `Bí pháp kích hoạt quý nhân phò trợ Cung ${cung.cungName} trong năm 2026 – 2027.`,
          `Tháng âm lịch cần đề phòng biến cố hao tài hoặc thị phi tình cảm.`,
          `Phương pháp Cải Mệnh &amp; hóa giải sát tinh của tiền nhân.`
        ];

        html += `
          <div class="accordion-item item-teaser" data-palace="${item.key}">
            <button class="accordion-header" aria-expanded="false" type="button" onclick="TuViChart.toggleAccordionItem(this)">
              <span class="palace-icon" aria-hidden="true">${item.icon}</span>
              <span class="palace-name">${cung.cungName} · Cung ${cung.chi} (${cung.can})</span>
              <span class="seal-badge" style="background:rgba(163,40,31,0.08); color:var(--seal, #A3281F); border:1px solid var(--seal, #A3281F); padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:inline; vertical-align:-1px; margin-right:3px;"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Mở 30% Teaser
              </span>
              <span class="toggle-icon" aria-hidden="true">▼</span>
            </button>
            <div class="accordion-body" role="region" style="display:none;">
              <div class="luan-giai-scholarly-content">
                <!-- 30% NỘI DUNG ĐẦU: HIỂN THỊ RÕ NÉT SẮC BÉN -->
                <div class="luan-giai-nhandinh-badge">${tieuDeText}</div>
                <div class="luan-giai-block cach-cuc-block" style="margin-bottom: 0.8rem; font-size: 0.92rem; line-height: 1.65; color: var(--text);">
                  ${cachCucText}
                </div>
                ${tamPhuongText}

                <!-- 70% CAO TRÀO TIẾP THEO: LÀM MỜ VÀ ĐÈ KHUNG PAYWALL CLIFFHANGER -->
                <div class="cliffhanger-blur-wrap paywall-wrapper">
                  <div class="cliffhanger-blurred-content teaser-blurred-text" aria-hidden="true">
                    ${chinhTinhText}
                    ${tuHoaText}
                    ${catTinhText}
                    ${satTinhText}
                    ${vongKhiText}
                    ${khongVongText}
                    <div style="margin-top: 1rem; background: var(--paper-2); padding: 0.9rem; border-radius: 6px;">
                      <strong>Đạo Trị Mệnh:</strong> ${caiSoText}
                    </div>
                  </div>

                  <!-- KHUNG CTA CLIFFHANGER ĐẬM CHẤT CHUYỂN ĐỔI -->
                  <div class="cliffhanger-paywall-overlay paywall-cta-card">
                    <div class="cliffhanger-timer-pill countdown-pill">
                      <span class="live-pulse-dot"></span>
                      <span>Ưu đãi kích hoạt còn: <strong class="cliffhanger-countdown-clock">14:59</strong></span>
                    </div>

                    <h4 class="cliffhanger-title">✦ THIÊN CƠ BẢO MẬT: CUNG ${cung.cungName} ĐANG NẮM GIỮ VẬN KHÍ CỦA BẠN</h4>
                    <p class="cliffhanger-subtitle">Mở khóa để xem giải mã toàn diện cho riêng lá số của bạn:</p>

                    <ul class="cliffhanger-bullets">
                      ${bulletsList.map(b => `<li><span class="cliff-check">✓</span> <span>${b}</span></li>`).join('')}
                    </ul>

                    <div class="cliffhanger-cta-group">
                      <button type="button" class="btn-seal btn-cliffhanger-main" onclick="TuViMonetize.openVipModal('Báo Cáo VIP Toàn Thư 12 Cung &amp; Xuất PDF A4', 49000)">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="display:inline;vertical-align:-2px;margin-right:4px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        Mở Khóa Toàn Thư 12 Cung (49.000đ) — Khuyên Dùng
                      </button>
                      <button type="button" class="btn-cliffhanger-sub" onclick="TuViMonetize.openVipModal('Gói Mở Khóa Nhanh 3 Cung Trọng Tâm (Tài - Quan - Phối)', 29000)">
                        Mở Khóa Nhanh 3 Cung Trọng Tâm (29.000đ)
                      </button>
                    </div>

                    <div class="cliffhanger-micro-note paywall-note">
                      <span>⚡ Thanh toán VietQR tự động qua SePay • Hệ thống tự động kích hoạt trong 3 giây</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        `;
      }
    });

    // Item 7: Tính năm Dương lịch hiện tại và Can Chi động
    const curYear = new Date().getFullYear();
    const nextYear = curYear + 1;
    const curCanChi = this.getCanChiYear(curYear);
    const nextCanChi = this.getCanChiYear(nextYear);

    // Thêm Khối Vận Hạn Từng Giai Đoạn & Phương Pháp Hóa Giải
    let daiHanList = [];
    if (typeof TuViLuanGiaiEngine !== 'undefined' && TuViLuanGiaiEngine.generateDaiHanList) {
      daiHanList = TuViLuanGiaiEngine.generateDaiHanList(laSo, curYear, nextYear);
    }

    html += `
      <div class="daihan-overview-box glass-card" style="margin-top:2rem;">
        <div class="daihan-header-row">
          <span class="gold-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
          <h4 class="daihan-title">LUẬN ĐOÁN VẬN HẠN TỪNG GIAI ĐOẠN &amp; PHƯƠNG PHÁP HÓA GIẢI</h4>
        </div>
        <p class="daihan-sub-desc">
          ${isVip ? 'Tài khoản VIP: Đã mở khóa trọn bộ vận hạn các thập niên cuộc đời.' : (isTripwire ? 'Gói Nhanh: Đã mở khóa Lưu Niên 2026 – 2027 &amp; Đại Vận đầu đời.' : 'Tra cứu cơ bản mở Đại Hạn đầu đời. Quý khách có thể mở khóa nhanh hoặc trọn gói để xem toàn bộ vận hạn tương lai.')}
        </p>

        <div class="daihan-vertical-timeline">
          <div class="timeline-axis"></div>
          ${daiHanList.map((dh, dIndex) => {
            // isTripwire mở 2 đại hạn đầu và Lưu Niên (dIndex <= 2)
            const isPhaseUnlocked = isVip || (dIndex === 0) || (isTripwire && dIndex <= 2);

            if (!isPhaseUnlocked) {
              return `
                <div class="timeline-item locked-period">
                  <div class="timeline-node node-locked">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <div class="timeline-card-wrap">
                    <div class="timeline-card glass-surface locked-surface" style="padding: 1.25rem 1.45rem; border-radius: 10px; margin-bottom: 1.5rem;">
                      <div class="timeline-card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 0.6rem;">
                        <strong class="timeline-phase-title">Đại Hạn: ${dh.phase} (${dh.cung})</strong>
                        <span class="seal-badge" style="background:rgba(163,40,31,0.08); color:var(--seal, #A3281F); border:1px solid var(--seal, #A3281F); padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Khóa · 49.000đ</span>
                      </div>
                      <div class="timeline-locked-blur-preview">
                        <div class="timeline-blur-text">${(dh.khiTuong || dh.congDanh || '').replace(/<[^>]*>/g, '').substring(0, 110)}... ma trận hung cát vận hạn bảo mật trong gói VIP...</div>
                        <div class="timeline-locked-cta-overlay">
                          <button type="button" class="btn-seal btn-lock-upgrade-sm" onclick="TuViMonetize.openVipModal('Báo Cáo VIP A4 Toàn Thư (Mở Khóa Toàn Bộ Đại Hạn)', 49000)">
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
                  <div class="timeline-card glass-surface gold-highlight-card" style="padding: 1.25rem 1.45rem; border-radius: 10px; margin-bottom: 1.6rem; background: var(--paper-2, #FBF7EE); border: ${dh.isCurrent ? '2px solid #D4AF37' : '1.5px solid var(--line, #E5E7EB)'}; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
                    <div class="timeline-card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 0.8rem; border-bottom: 1px dashed var(--line); padding-bottom: 0.6rem;">
                      <div>
                        <strong class="timeline-phase-title" style="color: var(--seal, #A3281F); font-size: 1.05rem; font-family: var(--font-heading, serif);">
                          ${dh.type === 'luu_nien' ? dh.phase : `Đại Hạn: ${dh.phase} (${dh.cung})`}
                        </strong>
                        ${dh.isCurrent ? `<span style="margin-left: 8px; background: #FEF3C7; color: #B45309; border: 1px solid #F59E0B; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 700; display: inline-block;">★ ${dh.type === 'luu_nien' ? 'VẬN KHÍ TRỌNG TÂM' : 'ĐẠI VẬN HIỆN TẠI'}</span>` : ''}
                      </div>
                      <span class="timeline-badge-gold" style="background: rgba(212, 175, 55, 0.15); color: #926A06; border: 1px solid rgba(212, 175, 55, 0.4); font-size: 0.82rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 9999px;">
                        ${dh.chuDe}
                      </span>
                    </div>

                    <!-- 1. Khí Tượng & Tinh Hệ Đại Vận -->
                    <div style="font-size: 0.88rem; line-height: 1.65; color: var(--text); margin-bottom: 0.75rem;">
                      ${dh.khiTuong}
                    </div>

                    <!-- 2. Bốn Trọng Điểm Đời Người -->
                    <div class="daihan-pillars-grid" style="display: grid; grid-template-columns: 1fr; gap: 0.6rem; margin-bottom: 0.85rem;">
                      <div style="background: #FFFFFF; border-left: 3px solid #3B82F6; padding: 0.6rem 0.85rem; border-radius: 6px; border: 1px solid var(--line);">
                        <strong style="color: #1D4ED8; font-size: 0.86rem;">💼 ${dh.type === 'luu_nien' ? 'Quý 1 (Xuân): Khởi Đầu &amp; Định Hướng' : 'Công Danh, Học Vấn &amp; Sự Nghiệp'}:</strong>
                        <p style="margin: 0.2rem 0 0; font-size: 0.86rem; line-height: 1.6; color: var(--text);">${dh.congDanh}</p>
                      </div>
                      <div style="background: #FFFFFF; border-left: 3px solid #10B981; padding: 0.6rem 0.85rem; border-radius: 6px; border: 1px solid var(--line);">
                        <strong style="color: #047857; font-size: 0.86rem;">💰 ${dh.type === 'luu_nien' ? 'Quý 2 (Hạ): Tăng Tốc &amp; Bứt Phá Công Danh' : 'Tài Chính, Điền Sản &amp; Sinh Kế'}:</strong>
                        <p style="margin: 0.2rem 0 0; font-size: 0.86rem; line-height: 1.6; color: var(--text);">${dh.taiChinh}</p>
                      </div>
                      <div style="background: #FFFFFF; border-left: 3px solid #EC4899; padding: 0.6rem 0.85rem; border-radius: 6px; border: 1px solid var(--line);">
                        <strong style="color: #BE185D; font-size: 0.86rem;">❤️ ${dh.type === 'luu_nien' ? 'Quý 3 (Thu): Thu Hoạch &amp; Kiểm Soát Rủi Ro' : 'Tình Duyên, Hôn Nhân &amp; Gia Đạo'}:</strong>
                        <p style="margin: 0.2rem 0 0; font-size: 0.86rem; line-height: 1.6; color: var(--text);">${dh.tinhDuyen}</p>
                      </div>
                      <div style="background: #FFFFFF; border-left: 3px solid #F59E0B; padding: 0.6rem 0.85rem; border-radius: 6px; border: 1px solid var(--line);">
                        <strong style="color: #B45309; font-size: 0.86rem;">🛡️ ${dh.type === 'luu_nien' ? 'Quý 4 (Đông): Tổng Kết Tài Chính &amp; An Gia' : 'Sức Khỏe, Tinh Thần &amp; Hạn Ách'}:</strong>
                        <p style="margin: 0.2rem 0 0; font-size: 0.86rem; line-height: 1.6; color: var(--text);">${dh.sucKhoe}</p>
                      </div>
                    </div>

                    <!-- 3. Các Cột Mốc Then Chốt -->
                    ${dh.milestones && dh.milestones.length > 0 ? `
                      <div style="background: rgba(243, 244, 246, 0.7); border: 1px solid var(--line); border-radius: 6px; padding: 0.6rem 0.85rem; margin-bottom: 0.85rem; font-size: 0.84rem; line-height: 1.6; color: var(--text);">
                        <strong style="color: var(--ink);"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline; vertical-align:-2px; margin-right:4px;"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Bước Ngoặt &amp; Các Mốc Năm Then Chốt:</strong>
                        <ul style="margin: 0.25rem 0 0; padding-left: 1.2rem;">
                          ${dh.milestones.map(m => `<li>${m}</li>`).join('')}
                        </ul>
                      </div>
                    ` : ''}

                    <!-- 4. Phương Pháp Hóa Giải & Tu Dưỡng -->
                    <div class="timeline-advice-box" style="background: rgba(212, 175, 55, 0.08); border: 1.5px dashed rgba(212, 175, 55, 0.45); padding: 0.75rem 0.95rem; border-radius: 8px; font-size: 0.86rem; line-height: 1.65; color: var(--text);">
                      <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 0.3rem;">
                        <span style="color: #B45309; font-size: 1rem;">💡</span>
                        <strong style="color: #926A06; font-size: 0.89rem; font-family: var(--font-heading, serif); text-transform: uppercase;">
                          ${dh.type === 'luu_nien' ? 'PHÁP MÔN NGHÊNH CÁT ĐÓN TÀI &amp; HÓA GIẢI HUNG HẠN:' : 'PHƯƠNG PHÁP HÓA GIẢI, CẢI MỆNH &amp; TU DƯỠNG (THEO CỤ NGUYỄN PHÁT LỘC):'}
                        </strong>
                      </div>
                      <p style="margin: 0;">${dh.hoaGiai}</p>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // 8. Khối Cố Vấn Tử Vi AI Dành Cho VIP
    if (typeof TuViLuanGiaiEngine !== 'undefined' && TuViLuanGiaiEngine.generateAiAdvisorHtml) {
      html += TuViLuanGiaiEngine.generateAiAdvisorHtml(laSo, isVip);
    }

    // BẢN IN: CHÂN TRANG BÁO CÁO VIP A4 (CHỈ HIỂN THỊ KHI IN / XUẤT FILE PDF)
    html += `
      <div class="print-report-footer">
        <p class="print-footer-brand">✦ HỘI ĐỒNG KHOA HỌC XEM TỬ VI HUYỀN HỌC (www.xemtuvihuyenhoc.com) ✦</p>
        <p class="print-footer-copy">Bản Báo Cáo Luận Giải Tử Vi Đẩu Số VIP lưu giữ trọn đời · Bản quyền thuộc tác giả Trần Công Luyện · Bảo mật hồ sơ tuyệt đối.</p>
      </div>
    `;

    listEl.innerHTML = html;

    // Khởi động đồng hồ đếm ngược 15 phút
    if (typeof TuViMonetize !== 'undefined' && TuViMonetize.initCountdownTimer) {
      TuViMonetize.initCountdownTimer();
    }
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
};

if (typeof window !== 'undefined') {
  window.TuViChart = TuViChart;
}
