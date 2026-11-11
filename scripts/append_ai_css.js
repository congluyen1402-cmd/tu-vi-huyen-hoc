const fs = require('fs');

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
    c += '\n' + aiAdvisorCss;
    fs.writeFileSync(p, c, 'utf8');
    console.log('Appended AI advisor CSS to', p);
  }
});

