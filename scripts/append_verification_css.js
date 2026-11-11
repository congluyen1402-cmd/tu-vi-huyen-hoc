const fs = require('fs');

const cssToAppend = `
/* ==========================================================================
   KIỂM CHỨNG GIỜ SINH & THANH CHUYỂN GIỜ TỬ VI CỔ TRUYỀN (MỰC & GIẤY)
   ========================================================================== */
.gio-sinh-verification-wrap {
  margin: 1.25rem 0 1.5rem;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(27, 23, 20, 0.05);
}

.gio-nav-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  background: var(--paper-2);
  border-bottom: 1px solid var(--line);
  gap: 12px;
  flex-wrap: wrap;
}

.btn-gio-nav {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.5rem 0.95rem;
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text);
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-gio-nav:hover {
  background: var(--paper);
  border-color: var(--brass);
  color: var(--seal);
}

.btn-gio-nav:active {
  transform: translateY(1px);
}

.gio-current-display {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.95rem;
  color: var(--text);
}

.gio-nav-label {
  color: var(--text-muted);
  font-size: 0.88rem;
}

.gio-current-val {
  color: var(--seal);
  font-weight: 700;
}

.verification-box {
  padding: 1.25rem 1.25rem 1.5rem;
}

.verification-header {
  margin-bottom: 1.15rem;
}

.verification-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading, 'Noto Serif', serif);
  font-size: 1.12rem;
  font-weight: 600;
  color: var(--seal);
  margin-bottom: 4px;
}

.verification-icon {
  color: var(--seal);
  flex-shrink: 0;
}

.verification-subtitle {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.verification-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.verification-item {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 5px;
  padding: 0.95rem 1rem;
  display: flex;
  flex-direction: column;
}

.verification-item-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0.5rem;
  color: var(--text);
  font-size: 0.92rem;
}

.ver-step-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--seal);
  color: #FFF;
  font-size: 0.78rem;
  font-weight: 700;
  flex-shrink: 0;
}

.verification-item-desc {
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--text);
  margin: 0;
}

@media (max-width: 768px) {
  .gio-nav-toolbar {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  .gio-current-display {
    justify-content: center;
    order: -1;
  }
  .btn-gio-nav {
    justify-content: center;
  }
  .verification-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 10px;
  }
}
`;

fs.appendFileSync('css/style.css', cssToAppend, 'utf8');
fs.appendFileSync('public/css/style.css', cssToAppend, 'utf8');
console.log('Appended CSS to style.css and public/css/style.css');

