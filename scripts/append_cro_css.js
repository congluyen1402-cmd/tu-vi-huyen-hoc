const fs = require('fs');

const cssToAdd = `
/* ==========================================================================
   TẦNG MIỄN PHÍ TÂM LÝ & KHÓA NỬA VỜI CLIFFHANGER PAYWALL (MỰC & GIẤY)
   ========================================================================== */

.free-psychological-dossier {
  margin-bottom: 2rem;
  background: var(--card, #FBF7EE);
  border: 1.5px solid var(--seal, #A3281F);
  border-radius: 8px;
  padding: 1.4rem;
  box-shadow: 0 3px 12px rgba(27, 23, 20, 0.05);
}

.free-psychological-dossier .dossier-card {
  background: #FFF;
  border: 1px solid var(--line, #CFC2A6);
  border-radius: 6px;
  padding: 1rem 1.15rem;
  margin-bottom: 1rem;
  transition: border-color 0.15s ease;
}

.free-psychological-dossier .dossier-card:hover {
  border-color: var(--brass, #B08A3E);
}

/* Cliffhanger Paywall (30% Teaser + 70% Blurred) */
.cliffhanger-blur-wrap {
  position: relative;
  overflow: hidden;
  margin-top: 1rem;
  border-radius: 6px;
  background: var(--card, #FBF7EE);
  border: 1px solid var(--line, #CFC2A6);
}

.cliffhanger-blurred-content {
  filter: blur(5px);
  user-select: none;
  -webkit-user-select: none;
  pointer-events: none;
  opacity: 0.38;
  max-height: 280px;
  overflow: hidden;
}

.cliffhanger-paywall-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(243, 236, 221, 0.45) 0%, rgba(243, 236, 221, 0.96) 26%, #F3ECDD 100%);
  padding: 1.5rem 1.25rem;
  text-align: center;
  z-index: 5;
}

.cliffhanger-timer-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: rgba(163, 40, 31, 0.08);
  border: 1px solid var(--seal, #A3281F);
  border-radius: 20px;
  font-size: 0.82rem;
  color: var(--seal, #A3281F);
  margin-bottom: 0.75rem;
}

.live-pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--seal, #A3281F);
  animation: pulse-dot 1.5s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(1.3); }
}

.cliffhanger-title {
  font-family: var(--font-heading, 'Noto Serif', serif);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--seal, #A3281F);
  margin: 0 0 0.35rem;
  line-height: 1.4;
}

.cliffhanger-subtitle {
  font-size: 0.88rem;
  color: var(--text-muted, #5E5446);
  margin: 0 0 0.85rem;
}

.cliffhanger-bullets {
  list-style: none;
  padding: 0;
  margin: 0 0 1.15rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 580px;
  width: 100%;
}

.cliffhanger-bullets li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--text, #2A231C);
}

.cliff-check {
  color: var(--seal, #A3281F);
  font-weight: 700;
  flex-shrink: 0;
}

.cliffhanger-cta-group {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 0.65rem;
}

.btn-cliffhanger-main {
  padding: 0.75rem 1.4rem;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  background: var(--seal, #A3281F);
  color: #FFF;
  border: 1px solid var(--seal, #A3281F);
  box-shadow: 0 2px 8px rgba(163, 40, 31, 0.25);
  transition: transform 0.15s ease, background 0.15s ease;
}

.btn-cliffhanger-main:hover {
  background: var(--seal-dark, #861F18);
  transform: translateY(-1px);
}

.btn-cliffhanger-sub {
  padding: 0.75rem 1.15rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text, #2A231C);
  background: var(--card, #FBF7EE);
  border: 1.5px solid var(--line, #CFC2A6);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-cliffhanger-sub:hover {
  border-color: var(--seal, #A3281F);
  color: var(--seal, #A3281F);
  background: var(--paper-2, #EAE0CB);
}

.cliffhanger-micro-note {
  font-size: 0.78rem;
  color: var(--text-muted, #5E5446);
}

/* Modal Package Switcher */
.modal-package-switcher {
  display: flex;
  gap: 8px;
  margin: 12px 0 16px;
  justify-content: center;
}

.modal-pkg-btn {
  position: relative;
  flex: 1;
  max-width: 155px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 9px 8px;
  background: var(--card, #FBF7EE);
  border: 1.5px solid var(--line, #CFC2A6);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.modal-pkg-btn:hover {
  border-color: var(--brass, #B08A3E);
}

.modal-pkg-btn.active {
  border-color: var(--seal, #A3281F);
  background: #FFF;
  box-shadow: 0 2px 6px rgba(163, 40, 31, 0.15);
}

.pkg-btn-name {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text, #2A231C);
  text-align: center;
  line-height: 1.25;
}

.pkg-btn-price {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--seal, #A3281F);
  margin-top: 3px;
}

@media (max-width: 768px) {
  .cliffhanger-cta-group {
    flex-direction: column;
    width: 100%;
  }
  .btn-cliffhanger-main,
  .btn-cliffhanger-sub {
    width: 100%;
    justify-content: center;
  }
  .modal-package-switcher {
    flex-direction: column;
    align-items: stretch;
  }
  .modal-pkg-btn {
    max-width: none;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 12px;
  }
}
`;

['css/style.css', 'public/css/style.css'].forEach(path => {
  let content = fs.readFileSync(path, 'utf8');
  if (!content.includes('.free-psychological-dossier')) {
    content += '\n' + cssToAdd;
    fs.writeFileSync(path, content, 'utf8');
    console.log(`Appended CRO styles to ${path}`);
  } else {
    console.log(`${path} already contains .free-psychological-dossier`);
  }
});
