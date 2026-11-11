const { chromium } = require('@playwright/test');

async function testRender() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1200 } });

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err.message));

  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

  // Fill form
  await page.fill('#hoTen', 'Trần Công Luyện');
  await page.selectOption('#gioiTinh', 'nam');
  await page.selectOption('#ngaySinh', '10');
  await page.selectOption('#thangSinh', '4');
  await page.selectOption('#namSinh', '2002');
  await page.selectOption('#gioSinh', '19');
  await page.selectOption('#phutSinh', '30');

  // Submit
  await page.click('#btnSubmit');

  // Wait for chart container
  await page.waitForSelector('#la-so-chart', { state: 'visible', timeout: 15000 });
  await page.waitForTimeout(1000);

  // Take screenshot of the chart
  const chartEl = await page.$('#la-so-chart');
  if (chartEl) {
    await chartEl.screenshot({ path: 'chart_verified_fixed.png' });
    console.log('Saved screenshot to chart_verified_fixed.png');
  }

  // Extract palace footer texts
  const palaces = await page.evaluate(() => {
    const list = [];
    for (let p = 0; p < 12; p++) {
      const cell = document.querySelector(`.la-so-cell[data-chi="${p}"]`);
      if (!cell) continue;
      const tieuHan = cell.querySelector('.cung-chi-label')?.textContent.trim();
      const trangSinh = cell.querySelector('.cung-trang-sinh')?.textContent.trim();
      const thangHan = cell.querySelector('.cung-thang-han')?.textContent.trim();
      const title = cell.querySelector('.cung-main-title')?.textContent.trim();
      const canChi = cell.querySelector('.cung-can-chi')?.textContent.trim();
      list.push({ p, canChi, title, tieuHan, trangSinh, thangHan });
    }
    return list;
  });

  console.log('\n=== RENDERED CHART PALACES IN BROWSER ===');
  palaces.forEach(p => {
    console.log(`Palace ${p.p} (${p.canChi} ${p.title}): Tiểu Vận = [${p.tieuHan}], Tràng Sinh = [${p.trangSinh}], Tháng Hạn = [${p.thangHan}]`);
  });

  await browser.close();
}

testRender().catch(console.error);
