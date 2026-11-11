const fs = require('fs');

let code = fs.readFileSync('js/tuvi-chart.js', 'utf8');

// Find renderLuanGiai function block
const startMarker = "  renderLuanGiai: function (laSo) {";
const endMarker = "  },\n\n  /**\n   * Khởi tạo Sticky CTA dưới cùng";

// Let's find index of startMarker
const sIdx = code.indexOf(startMarker);
if (sIdx === -1) {
  console.error("Could not find startMarker");
  process.exit(1);
}

// Find the end of renderLuanGiai
const renderLuanGiaiEndStr = "  },\n\n  /**\n   * Khởi tạo Sticky CTA";
const eIdx = code.indexOf(renderLuanGiaiEndStr);
if (eIdx === -1) {
  console.error("Could not find renderLuanGiaiEndStr");
  process.exit(1);
}

const newRenderLuanGiai = `  renderLuanGiai: function (laSo) {
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

    // Xác thực quyền VIP
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
      : (isTripwire ? 'Đã mở 5/12 cung (Gói Nhanh Tài - Quan - Phối)' : 'Đã mở 2/12 cung (Mệnh &amp; Phụ Mẫu) + Bản Đồ Tâm Lý');
    const progressWidth = isVip ? '100%' : (isTripwire ? '41.6%' : '16.6%');

    let html = \`
      \${freeDossierHtml}

      <div class="accordion-progress-wrap" style="margin-bottom: 1.5rem;">
        <div class="accordion-progress-label">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--seal, #A3281F);"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Tiến độ luận giải: <strong>\${progressLabel}</strong></span>
        </div>
        <div class="accordion-progress-track">
          <div class="accordion-progress-fill" style="width: \${progressWidth};"></div>
        </div>
      </div>
    \`;

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

      const tieuDeText = analysis ? analysis.tieuDe : \`\${cung.cungName} Tọa Cung \${cung.chi}\`;
      const cachCucText = analysis ? analysis.cachCucHtml : \`<p>Tọa thủ tại cung \${cung.chi} thuộc ngũ hành bản vị.</p>\`;
      const tamPhuongText = (analysis && analysis.tamPhuongHtml) ? analysis.tamPhuongHtml : '';
      const chinhTinhText = analysis ? analysis.chinhTinhDetailHtml : '';
      const tuHoaText = analysis ? analysis.tuHoaDetailHtml : '';
      const catTinhText = analysis ? analysis.catTinhDetailHtml : '';
      const satTinhText = analysis ? analysis.satTinhDetailHtml : '';
      const vongKhiText = analysis ? analysis.vongKhiHtml : '';
      const khongVongText = analysis ? analysis.khongVongHtml : '';
      const caiSoText = analysis ? analysis.caiSoHtml : 'Giữ tâm thái an hòa, tích cực hành thiện tích đức, thận trọng trong các quyết định lớn để hóa giải ách nạn, vươn tới thành công.';

      if (isFullyUnlocked) {
        // CUNG ĐÃ ĐƯỢC MỞ KHÓA HOÀN TOÀN
        html += \`
          <div class="accordion-item \${isFirst ? 'open' : ''}" data-palace="\${item.key}">
            <button class="accordion-header" aria-expanded="\${isFirst ? 'true' : 'false'}" type="button" onclick="TuViChart.toggleAccordionItem(this)">
              <span class="palace-icon" aria-hidden="true">\${item.icon}</span>
              <span class="palace-name">\${cung.cungName} · Cung \${cung.chi} (\${cung.can})</span>
              <span class="palace-stars-count" style="color:var(--seal, #A3281F); font-weight:600;">\${tieuDeText}</span>
              <span class="toggle-icon" aria-hidden="true">▼</span>
            </button>
            <div class="accordion-body" role="region" style="\${isFirst ? 'display:block;' : 'display:none;'}">
              <div class="luan-giai-scholarly-content">
                <div class="luan-giai-nhandinh-badge">\${tieuDeText}</div>
                
                <!-- 1. Cách Cục & Khí Tượng Cung Vị -->
                <div class="luan-giai-block cach-cuc-block" style="margin-bottom: 0.8rem; font-size: 0.92rem; line-height: 1.65; color: var(--text);">
                  \${cachCucText}
                </div>

                <!-- 2. Tương Tác Tam Phương Tứ Chính & Đại Cách Cục -->
                \${tamPhuongText}

                <!-- 3. Biện Giải Từng Chính Tinh Tọa Thủ -->
                \${chinhTinhText}

                <!-- 4. Tứ Hóa Phi Tinh (Lộc - Quyền - Khoa - Kỵ) -->
                \${tuHoaText}

                <!-- 5. Cát Tinh Nâng Đỡ -->
                \${catTinhText}

                <!-- 6. Sát Tinh Thử Thách -->
                \${satTinhText}

                <!-- 7. Vòng Tràng Sinh & Thái Tuế -->
                \${vongKhiText}

                <!-- 8. Tuần Không / Triệt Không Án Ngữ -->
                \${khongVongText}

                <!-- 9. Lời Khuyên Tu Dưỡng & Cải Sửa Số Mệnh -->
                <div class="palace-advice" style="margin-top: 1rem; background: var(--paper-2); border: 1.5px solid var(--line); padding: 0.9rem 1.1rem; border-radius: 6px;">
                  <strong style="color: var(--seal); font-size: 0.92rem; font-family: var(--font-heading);">Đạo Trị Mệnh &amp; Hóa Giải Sát Khí (Theo Cụ Nguyễn Phát Lộc):</strong>
                  <p style="color: var(--text); font-size: 0.9rem; line-height: 1.65; margin-top: 0.35rem;">\${caiSoText}</p>
                </div>
              </div>
            </div>
          </div>
        \`;
      } else {
        // CUNG TEASER 30% + CLIFFHANGER BLUR PAYWALL 70%
        let cliff = null;
        if (typeof TuViLuanGiaiEngine !== 'undefined' && TuViLuanGiaiEngine.generatePalaceCliffhangerTeaser) {
          cliff = TuViLuanGiaiEngine.generatePalaceCliffhangerTeaser(cung, laSo);
        }
        const bulletsList = cliff ? cliff.bullets : [
          \`Bí pháp kích hoạt quý nhân phò trợ Cung \${cung.cungName} trong năm 2026 – 2027.\`,
          \`Tháng âm lịch cần đề phòng biến cố hao tài hoặc thị phi tình cảm.\`,
          \`Phương pháp Cải Mệnh &amp; hóa giải sát tinh của tiền nhân.\`
        ];

        html += \`
          <div class="accordion-item item-teaser" data-palace="\${item.key}">
            <button class="accordion-header" aria-expanded="false" type="button" onclick="TuViChart.toggleAccordionItem(this)">
              <span class="palace-icon" aria-hidden="true">\${item.icon}</span>
              <span class="palace-name">\${cung.cungName} · Cung \${cung.chi} (\${cung.can})</span>
              <span class="seal-badge" style="background:rgba(163,40,31,0.08); color:var(--seal, #A3281F); border:1px solid var(--seal, #A3281F); padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:inline; vertical-align:-1px; margin-right:3px;"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Mở 30% Teaser
              </span>
              <span class="toggle-icon" aria-hidden="true">▼</span>
            </button>
            <div class="accordion-body" role="region" style="display:none;">
              <div class="luan-giai-scholarly-content">
                <!-- 30% NỘI DUNG ĐẦU: HIỂN THỊ RÕ NÉT SẮC BÉN -->
                <div class="luan-giai-nhandinh-badge">\${tieuDeText}</div>
                <div class="luan-giai-block cach-cuc-block" style="margin-bottom: 0.8rem; font-size: 0.92rem; line-height: 1.65; color: var(--text);">
                  \${cachCucText}
                </div>
                \${tamPhuongText}

                <!-- 70% CAO TRÀO TIẾP THEO: LÀM MỜ VÀ ĐÈ KHUNG PAYWALL CLIFFHANGER -->
                <div class="cliffhanger-blur-wrap">
                  <div class="cliffhanger-blurred-content" aria-hidden="true">
                    \${chinhTinhText}
                    \${tuHoaText}
                    \${catTinhText}
                    \${satTinhText}
                    \${vongKhiText}
                    \${khongVongText}
                    <div style="margin-top: 1rem; background: var(--paper-2); padding: 0.9rem; border-radius: 6px;">
                      <strong>Đạo Trị Mệnh:</strong> \${caiSoText}
                    </div>
                  </div>

                  <!-- KHUNG CTA CLIFFHANGER ĐẬM CHẤT CHUYỂN ĐỔI -->
                  <div class="cliffhanger-paywall-overlay">
                    <div class="cliffhanger-timer-pill">
                      <span class="live-pulse-dot"></span>
                      <span>Ưu đãi kích hoạt còn: <strong class="cliffhanger-countdown-clock">14:59</strong></span>
                    </div>

                    <h4 class="cliffhanger-title">✦ THIÊN CƠ BẢO MẬT: CUNG \${cung.cungName} ĐANG NẮM GIỮ VẬN KHÍ CỦA BẠN</h4>
                    <p class="cliffhanger-subtitle">Mở khóa để xem giải mã toàn diện cho riêng lá số của bạn:</p>

                    <ul class="cliffhanger-bullets">
                      \${bulletsList.map(b => \`<li><span class="cliff-check">✓</span> <span>\${b}</span></li>\`).join('')}
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

                    <div class="cliffhanger-micro-note">
                      <span>⚡ Thanh toán VietQR tự động qua SePay • Hệ thống tự động kích hoạt trong 3 giây</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        \`;
      }
    });

    listEl.innerHTML = html;

    // Khởi động đồng hồ đếm ngược 15 phút
    if (typeof TuViMonetize !== 'undefined' && TuViMonetize.initCountdownTimer) {
      TuViMonetize.initCountdownTimer();
    }
  }`;

// Replace renderLuanGiai
code = code.slice(0, sIdx) + newRenderLuanGiai + code.slice(eIdx);

fs.writeFileSync('js/tuvi-chart.js', code, 'utf8');
fs.writeFileSync('public/js/tuvi-chart.js', code, 'utf8');
console.log('Successfully upgraded renderLuanGiai in js/tuvi-chart.js and public/js/tuvi-chart.js!');

