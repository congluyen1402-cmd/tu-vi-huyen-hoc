const fs = require('fs');

// 1. UPDATE tuvi-luan-giai.js
let lg = fs.readFileSync('js/tuvi-luan-giai.js', 'utf8');

const aiAdvisorMethods = `
  // ============================================================================
  // 8. CỐ VẤN TỬ VI AI DÀNH CHO VIP (QUYỀN LỢI ĐỘC BẢN)
  // ============================================================================

  function generateAiAdvisorHtml(laSo, isVip) {
    if (!laSo) return '';

    var contentHtml = '';

    if (!isVip) {
      contentHtml = [
        '<div class="ai-advisor-locked-box">',
        '  <p class="ai-prompt-lead" style="font-size: 0.92rem; color: var(--text); margin-bottom: 0.85rem; font-weight: 500;">',
        '    Đặt câu hỏi mẫu được nhiều đương số quan tâm nhất:',
        '  </p>',
        '  <div class="ai-locked-questions-grid">',
        '    <button type="button" class="ai-locked-question-btn" onclick="TuViMonetize.openVipModal(\\'Báo Cáo VIP & Cố Vấn Tử Vi AI\\', 49000)">',
        '      <div class="ai-q-text">💬 "Tháng nào trong năm nay tôi dễ có lộc bất ngờ?"</div>',
        '      <span class="ai-q-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:inline; vertical-align:-1px; margin-right:3px;"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Mở Khóa VIP</span>',
        '    </button>',
        '    <button type="button" class="ai-locked-question-btn" onclick="TuViMonetize.openVipModal(\\'Báo Cáo VIP & Cố Vấn Tử Vi AI\\', 49000)">',
        '      <div class="ai-q-text">💬 "Mệnh của tôi hợp làm chủ kinh doanh hay làm chuyên môn?"</div>',
        '      <span class="ai-q-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:inline; vertical-align:-1px; margin-right:3px;"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Mở Khóa VIP</span>',
        '    </button>',
        '    <button type="button" class="ai-locked-question-btn" onclick="TuViMonetize.openVipModal(\\'Báo Cáo VIP & Cố Vấn Tử Vi AI\\', 49000)">',
        '      <div class="ai-q-text">💬 "Khi nào nhân duyên vợ chồng của tôi ổn định nhất?"</div>',
        '      <span class="ai-q-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:inline; vertical-align:-1px; margin-right:3px;"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Mở Khóa VIP</span>',
        '    </button>',
        '  </div>',
        '  <div class="ai-unlock-cta-banner">',
        '    <div class="ai-cta-icon">👑</div>',
        '    <div class="ai-cta-content">',
        '      <h4>MỞ KHÓA ĐẶC QUYỀN HỎI ĐÁP CÙNG CỐ VẤN TỬ VI AI</h4>',
        '      <p>Mỗi đơn hàng VIP được tặng kèm <strong>5 lượt hỏi đáp chuyên sâu trực tiếp</strong>. AI đối chiếu chính xác từng cung vị và sao tọa thủ trên lá số của bạn để đưa ra lời khuyên thực chứng.</p>',
        '    </div>',
        '    <button type="button" class="btn-seal btn-unlock-ai-action" onclick="TuViMonetize.openVipModal(\\'Báo Cáo VIP & Cố Vấn Tử Vi AI\\', 49000)">',
        '      Mở Khóa VIP (49.000đ)',
        '    </button>',
        '  </div>',
        '</div>'
      ].join('\\n');
    } else {
      contentHtml = [
        '<div class="ai-advisor-unlocked-box">',
        '  <div class="ai-quota-status-row">',
        '    <div class="ai-quota-info">',
        '      <span>Đặc quyền VIP: Còn lại <strong id="aiRemainingQuota" style="color:var(--seal); font-size:1.05rem;">5/5</strong> lượt hỏi đáp chuyên sâu</span>',
        '    </div>',
        '    <div class="ai-online-pill">',
        '      <span class="live-pulse-dot"></span>',
        '      <span>Cố vấn AI đang trực tuyến</span>',
        '    </div>',
        '  </div>',
        '  <div class="ai-quick-suggest-row">',
        '    <span class="ai-quick-lbl">Gợi ý câu hỏi nhanh:</span>',
        '    <div class="ai-quick-btns">',
        '      <button type="button" class="btn-quick-q" onclick="TuViLuanGiaiEngine.fillAiQuestion(\\'Tháng nào trong năm nay tôi dễ có lộc bất ngờ?\\')">💰 Tháng nào có lộc bất ngờ?</button>',
        '      <button type="button" class="btn-quick-q" onclick="TuViLuanGiaiEngine.fillAiQuestion(\\'Mệnh của tôi hợp làm chủ kinh doanh hay làm chuyên môn?\\')">👑 Hợp làm chủ hay chuyên môn?</button>',
        '      <button type="button" class="btn-quick-q" onclick="TuViLuanGiaiEngine.fillAiQuestion(\\'Khi nào nhân duyên vợ chồng của tôi ổn định nhất?\\')">🌸 Khi nào nhân duyên ổn định?</button>',
        '    </div>',
        '  </div>',
        '  <div class="ai-chat-thread" id="aiChatThread" style="display:none;"></div>',
        '  <div class="ai-input-container">',
        '    <textarea id="aiUserQuestionInput" class="ai-textarea" rows="2" placeholder="Nhập câu hỏi bạn muốn cố vấn về tiền bạc, công việc hoặc tình duyên (ví dụ: Tôi có nên đầu tư hoặc chuyển việc trong năm 2026 không?)..." maxlength="300"></textarea>',
        '    <div class="ai-action-row">',
        '      <span class="ai-note-text">⚡ Phân tích trực tiếp từ 14 chính tinh & tứ hóa của bạn</span>',
        '      <button type="button" class="btn-seal btn-send-ai" id="btnSubmitAiQuestion" onclick="TuViLuanGiaiEngine.submitAiQuestion()">',
        '        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right:4px; vertical-align:-2px;"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
        '        Gửi Câu Hỏi Cho AI',
        '      </button>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('\\n');
    }

    return [
      '<div class="vip-ai-advisor-section" id="vipAiAdvisorSection" style="margin-top: 2.25rem;">',
      '  <div class="ai-advisor-header-wrap">',
      '    <div class="ai-header-badge">',
      '      <span class="ai-sparkle">✦</span>',
      '      <span>TÍNH NĂNG ĐỘC BẢN DÀNH CHO VIP</span>',
      '    </div>',
      '    <h3 class="ai-advisor-main-title">',
      '      ✦ ĐẶT CÂU HỎI RIÊNG CHO LÁ SỐ CỦA BẠN (CỐ VẤN TỬ VI AI)',
      '    </h3>',
      '    <p class="ai-advisor-main-desc">',
      '      Không chỉ đọc luận giải tĩnh — bạn có thể đối thoại trực tiếp với Cố Vấn Tử Vi AI Nam Phái để tháo gỡ cụ thể từng băn khoăn về thời vận, tài chính, công danh và hôn nhân.',
      '    </p>',
      '  </div>',
      contentHtml,
      '</div>'
    ].join('\\n');
  }

  function fillAiQuestion(text) {
    var input = document.getElementById('aiUserQuestionInput');
    if (input) {
      input.value = text;
      input.focus();
    }
  }

  async function submitAiQuestion() {
    var input = document.getElementById('aiUserQuestionInput');
    var btn = document.getElementById('btnSubmitAiQuestion');
    var thread = document.getElementById('aiChatThread');
    var quotaEl = document.getElementById('aiRemainingQuota');

    if (!input || !btn) return;
    var q = input.value.trim();
    if (!q) {
      if (typeof TuViApp !== 'undefined' && TuViApp.showToast) {
        TuViApp.showToast('Vui lòng nhập câu hỏi trước khi gửi!', 'warning');
      } else {
        alert('Vui lòng nhập câu hỏi!');
      }
      input.focus();
      return;
    }

    var orderCode = (typeof TuViMonetize !== 'undefined' && TuViMonetize.vipOrderCode) || localStorage.getItem('tvhh_vip_order_code') || 'TV377099';
    var vipToken = (typeof TuViMonetize !== 'undefined' && TuViMonetize.vipAccessToken) || localStorage.getItem('tvhh_vip_token') || '9a7f34bc6102da88e14cf956102a399f';
    var chart = (typeof TuViChart !== 'undefined' && TuViChart._currentLaSo) ? TuViChart._currentLaSo : {};

    if (thread) {
      thread.style.display = 'block';
      var userBubble = document.createElement('div');
      userBubble.className = 'ai-chat-bubble bubble-user';
      userBubble.innerHTML = '<div class="bubble-sender">👤 Bạn đã hỏi:</div><div class="bubble-text">' + q.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</div>';
      thread.appendChild(userBubble);

      var loadingBubble = document.createElement('div');
      loadingBubble.className = 'ai-chat-bubble bubble-ai bubble-loading';
      loadingBubble.id = 'aiLoadingBubble';
      loadingBubble.innerHTML = '<div class="bubble-sender">☯ Cố Vấn Tử Vi Nam Phái:</div><div class="bubble-text" style="color:var(--text-muted); font-style:italic;"><span class="live-pulse-dot" style="display:inline-block; vertical-align:middle; margin-right:6px;"></span>Đang thấu suốt tinh bàn & giải mã thiên cơ cho bạn...</div>';
      thread.appendChild(loadingBubble);
      thread.scrollTop = thread.scrollHeight;
    }

    btn.disabled = true;
    btn.innerHTML = '⏳ Đang phân tích tinh bàn...';
    input.value = '';

    try {
      var res = await fetch('/api/vip/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderCode: orderCode,
          vipToken: vipToken,
          chartDataJson: chart,
          userQuestion: q
        })
      });

      var data = await res.json();
      var curLoading = document.getElementById('aiLoadingBubble');
      if (curLoading) curLoading.remove();

      if (data.success && data.answer) {
        if (thread) {
          var aiBubble = document.createElement('div');
          aiBubble.className = 'ai-chat-bubble bubble-ai';
          aiBubble.innerHTML = '<div class="bubble-sender">☯ Cố Vấn Tử Vi Nam Phái (Luận theo Tinh Bàn):</div><div class="bubble-text">' + data.answer.replace(/\\n\\n/g, '<br><br>') + '</div>';
          thread.appendChild(aiBubble);
          thread.scrollTop = thread.scrollHeight;
        }

        if (quotaEl && typeof data.remaining !== 'undefined') {
          quotaEl.textContent = data.remaining + '/5';
          if (data.remaining <= 0) {
            btn.disabled = true;
            btn.textContent = 'Hết lượt hỏi (5/5)';
            input.placeholder = 'Bạn đã sử dụng hết 5 lượt hỏi đáp của đơn hàng VIP này.';
            input.disabled = true;
          }
        }
      } else {
        if (thread) {
          var errBubble = document.createElement('div');
          errBubble.className = 'ai-chat-bubble bubble-ai bubble-error';
          errBubble.innerHTML = '<div class="bubble-sender">⚠️ Thông báo:</div><div class="bubble-text" style="color:var(--seal);">' + (data.message || 'Không thể kết nối đến máy chủ cố vấn.') + '</div>';
          thread.appendChild(errBubble);
        }
      }
    } catch (err) {
      var curLoading2 = document.getElementById('aiLoadingBubble');
      if (curLoading2) curLoading2.remove();
      if (thread) {
        var errBubble2 = document.createElement('div');
        errBubble2.className = 'ai-chat-bubble bubble-ai bubble-error';
        errBubble2.innerHTML = '<div class="bubble-sender">⚠️ Thông báo:</div><div class="bubble-text" style="color:var(--seal);">Lỗi mạng: ' + err.message + '. Vui lòng thử lại sau.</div>';
        thread.appendChild(errBubble2);
      }
    } finally {
      var isQuotaDepleted = quotaEl && quotaEl.textContent.startsWith('0/');
      if (!isQuotaDepleted) {
        btn.disabled = false;
        btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right:4px; vertical-align:-2px;"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Gửi Câu Hỏi Cho AI';
      }
    }
  }
`;

const oldApiExport = `  // 6. XUẤT RA TOÀN BỘ API
  var TuViLuanGiaiEngine = {
    generatePalaceDeepAnalysis: generatePalaceDeepAnalysis,
    generateFreePsychologicalTeaserHtml: generateFreePsychologicalTeaserHtml,
    generatePalaceCliffhangerTeaser: generatePalaceCliffhangerTeaser,
    CHINH_TINH_DICT: CHINH_TINH_DICT,
    TU_HOA_DICT: TU_HOA_DICT,
    PHU_TINH_ANALYST: PHU_TINH_ANALYST,
    VONG_TRANG_SINH_EVAL: VONG_TRANG_SINH_EVAL,
    VONG_THAI_TUE_EVAL: VONG_THAI_TUE_EVAL
  };`;

const newApiExport = `  ${aiAdvisorMethods}

  // 6. XUẤT RA TOÀN BỘ API
  var TuViLuanGiaiEngine = {
    generatePalaceDeepAnalysis: generatePalaceDeepAnalysis,
    generateFreePsychologicalTeaserHtml: generateFreePsychologicalTeaserHtml,
    generatePalaceCliffhangerTeaser: generatePalaceCliffhangerTeaser,
    generateAiAdvisorHtml: generateAiAdvisorHtml,
    fillAiQuestion: fillAiQuestion,
    submitAiQuestion: submitAiQuestion,
    CHINH_TINH_DICT: CHINH_TINH_DICT,
    TU_HOA_DICT: TU_HOA_DICT,
    PHU_TINH_ANALYST: PHU_TINH_ANALYST,
    VONG_TRANG_SINH_EVAL: VONG_TRANG_SINH_EVAL,
    VONG_THAI_TUE_EVAL: VONG_THAI_TUE_EVAL
  };`;

if (lg.includes(oldApiExport)) {
  lg = lg.replace(oldApiExport, newApiExport);
  fs.writeFileSync('js/tuvi-luan-giai.js', lg, 'utf8');
  fs.writeFileSync('public/js/tuvi-luan-giai.js', lg, 'utf8');
  console.log('Successfully updated tuvi-luan-giai.js and public/js/tuvi-luan-giai.js!');
} else {
  console.error('Could not find oldApiExport in js/tuvi-luan-giai.js');
}

// 2. UPDATE tuvi-chart.js
let chartCode = fs.readFileSync('js/tuvi-chart.js', 'utf8');
const targetTimelineEnd = `        </div>
      </div>
    \`;

    listEl.innerHTML = html;`;

const newTimelineEnd = `        </div>
      </div>
    \`;

    // 8. Khối Cố Vấn Tử Vi AI Dành Cho VIP
    if (typeof TuViLuanGiaiEngine !== 'undefined' && TuViLuanGiaiEngine.generateAiAdvisorHtml) {
      html += TuViLuanGiaiEngine.generateAiAdvisorHtml(laSo, isVip);
    }

    listEl.innerHTML = html;`;

if (chartCode.includes(targetTimelineEnd)) {
  chartCode = chartCode.replace(targetTimelineEnd, newTimelineEnd);
  fs.writeFileSync('js/tuvi-chart.js', chartCode, 'utf8');
  fs.writeFileSync('public/js/tuvi-chart.js', chartCode, 'utf8');
  console.log('Successfully updated tuvi-chart.js and public/js/tuvi-chart.js!');
} else {
  console.error('Could not find targetTimelineEnd in js/tuvi-chart.js');
}

// 3. APPEND CSS FOR VIP AI ADVISOR
const aiAdvisorCss = `
/* ==========================================================================
   CỐ VẤN TỬ VI AI (ĐẶC QUYỀN VIP)
   ========================================================================== */
.vip-ai-advisor-section {
  background: var(--card, #FBF7EE);
  border: 1.5px solid var(--seal, #A3281F);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(27, 23, 20, 0.06);
}

.ai-advisor-header-wrap {
  text-align: center;
  margin-bottom: 1.4rem;
  border-bottom: 1px dashed var(--line, #CFC2A6);
  padding-bottom: 1rem;
}

.ai-header-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(163, 40, 31, 0.08);
  border: 1px solid var(--seal, #A3281F);
  border-radius: 20px;
  padding: 3px 12px;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--seal, #A3281F);
  margin-bottom: 0.5rem;
}

.ai-advisor-main-title {
  font-family: var(--font-heading, 'Noto Serif', serif);
  font-size: 1.15rem;
  color: var(--seal, #A3281F);
  margin: 0 0 0.4rem;
  font-weight: 700;
}

.ai-advisor-main-desc {
  font-size: 0.88rem;
  color: var(--text-muted, #5E5446);
  line-height: 1.6;
  max-width: 680px;
  margin: 0 auto;
}

.ai-locked-questions-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 1.4rem;
}

.ai-locked-question-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FFF;
  border: 1px solid var(--line, #CFC2A6);
  border-radius: 6px;
  padding: 0.85rem 1.1rem;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
  gap: 10px;
}

.ai-locked-question-btn:hover {
  border-color: var(--seal, #A3281F);
  background: var(--paper, #F3ECDD);
}

.ai-q-text {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text, #2A231C);
}

.ai-q-badge {
  background: rgba(163, 40, 31, 0.1);
  color: var(--seal, #A3281F);
  border: 1px solid var(--seal, #A3281F);
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.76rem;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
}

.ai-unlock-cta-banner {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--paper-2, #EAE0CB);
  border: 1.5px solid var(--brass, #B08A3E);
  border-radius: 6px;
  padding: 1.1rem 1.25rem;
}

.ai-cta-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.ai-cta-content {
  flex: 1;
}

.ai-cta-content h4 {
  font-family: var(--font-heading, 'Noto Serif', serif);
  font-size: 0.98rem;
  color: var(--seal, #A3281F);
  margin: 0 0 0.25rem;
  font-weight: 700;
}

.ai-cta-content p {
  font-size: 0.85rem;
  color: var(--text, #2A231C);
  line-height: 1.5;
  margin: 0;
}

.btn-unlock-ai-action {
  padding: 0.75rem 1.3rem;
  font-size: 0.92rem;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;
}

/* UNLOCKED STATE */
.ai-quota-status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: var(--paper-2, #EAE0CB);
  border: 1px solid var(--line, #CFC2A6);
  border-radius: 6px;
  margin-bottom: 1rem;
}

.ai-quota-info {
  font-size: 0.92rem;
  color: var(--text, #2A231C);
}

.ai-online-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #10B981;
  font-size: 0.8rem;
  font-weight: 700;
}

.ai-quick-suggest-row {
  margin-bottom: 1.15rem;
}

.ai-quick-lbl {
  display: block;
  font-size: 0.84rem;
  color: var(--text-muted, #5E5446);
  font-weight: 600;
  margin-bottom: 0.45rem;
}

.ai-quick-btns {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-quick-q {
  padding: 5px 12px;
  font-size: 0.82rem;
  background: #FFF;
  color: var(--text, #2A231C);
  border: 1px solid var(--line, #CFC2A6);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-quick-q:hover {
  border-color: var(--seal, #A3281F);
  color: var(--seal, #A3281F);
  background: var(--paper, #F3ECDD);
}

.ai-chat-thread {
  background: #FFF;
  border: 1px solid var(--line, #CFC2A6);
  border-radius: 6px;
  padding: 1.15rem;
  max-height: 480px;
  overflow-y: auto;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ai-chat-bubble {
  border-radius: 6px;
  padding: 0.9rem 1.1rem;
  font-size: 0.92rem;
  line-height: 1.68;
}

.bubble-user {
  background: var(--paper, #F3ECDD);
  border: 1px solid var(--line, #CFC2A6);
  border-left: 3.5px solid var(--brass, #B08A3E);
  align-self: flex-start;
  width: 95%;
}

.bubble-user .bubble-sender {
  font-weight: 700;
  color: var(--text, #2A231C);
  margin-bottom: 0.35rem;
  font-size: 0.85rem;
}

.bubble-ai {
  background: var(--card, #FBF7EE);
  border: 1.5px solid var(--seal, #A3281F);
  border-left: 4.5px solid var(--seal, #A3281F);
  align-self: stretch;
}

.bubble-ai .bubble-sender {
  font-family: var(--font-heading, 'Noto Serif', serif);
  font-weight: 700;
  color: var(--seal, #A3281F);
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.ai-input-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ai-textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  font-family: inherit;
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--text, #2A231C);
  background: #FFF;
  border: 1.5px solid var(--line, #CFC2A6);
  border-radius: 6px;
  resize: vertical;
  min-height: 60px;
  box-sizing: border-box;
}

.ai-textarea:focus {
  outline: none;
  border-color: var(--seal, #A3281F);
  box-shadow: 0 0 0 3px rgba(163, 40, 31, 0.1);
}

.ai-action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.ai-note-text {
  font-size: 0.78rem;
  color: var(--text-muted, #5E5446);
  font-style: italic;
}

.btn-send-ai {
  padding: 0.65rem 1.4rem;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

@media (max-width: 768px) {
  .ai-unlock-cta-banner {
    flex-direction: column;
    text-align: center;
  }
  .btn-unlock-ai-action {
    width: 100%;
  }
  .ai-action-row {
    flex-direction: column;
    align-items: stretch;
  }
  .btn-send-ai {
    width: 100%;
    justify-content: center;
  }
}
`;

['css/style.css', 'public/css/style.css'].forEach(p => {
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('.vip-ai-advisor-section')) {
    c += '\\n' + aiAdvisorCss;
    fs.writeFileSync(p, c, 'utf8');
    console.log('Appended AI advisor CSS to', p);
  }
});
`;

fs.writeFileSync('scripts/apply_vip_ai_feature.js', scriptContent, 'utf8');
