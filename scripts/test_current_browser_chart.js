const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1600 } });
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  await page.goto('http://localhost:8080');
  
  // Fill form
  await page.fill('#hoTen', 'Trần Công Luyện');
  await page.selectOption('#gioiTinh', 'nam');
  await page.selectOption('#loaiLich', 'duong');
  await page.selectOption('#namSinh', '2002');
  await page.selectOption('#thangSinh', '4');
  await page.waitForTimeout(200);
  await page.selectOption('#ngaySinh', '10');
  await page.selectOption('#gioSinh', '19');
  await page.selectOption('#phutSinh', '30');
  
  console.log('Values filled. Submitting...');
  await page.click('#btnSubmit');
  
  // Wait 4 seconds for an sao ritual
  await page.waitForTimeout(4000);
  
  const ketQuaVisible = await page.isVisible('#ket-qua');
  console.log('#ket-qua isVisible:', ketQuaVisible);
  
  const inlineErrors = await page.$$eval('.form-error-inline', els => els.map(e => e.textContent.trim()).filter(Boolean));
  console.log('Inline errors:', inlineErrors);

  const chartEl = await page.$('.la-so-traditional-grid');
  if (chartEl) {
    await chartEl.screenshot({ path: 'chart_current_render.png' });
    console.log('Saved chart_current_render.png');
  }

  const cungTy = await page.$('.cung-classical-cell[data-chi="5"]');
  if (cungTy) {
    const text = await cungTy.innerText();
    console.log('=== Cung Tỵ (MỆNH) text ===\n' + text);
  }

  await browser.close();
})();
