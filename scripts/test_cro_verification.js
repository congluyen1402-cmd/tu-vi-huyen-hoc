const { chromium } = require('@playwright/test');

async function testCroFeatures() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  console.log('1. Loading localhost:8080...');
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

  // Fill form
  console.log('2. Submitting chart form...');
  await page.fill('#hoTen', 'Trần Công Luyện');
  await page.selectOption('#gioiTinh', 'nam');
  await page.selectOption('#ngaySinh', '10');
  await page.selectOption('#thangSinh', '4');
  await page.selectOption('#namSinh', '2002');
  await page.selectOption('#gioSinh', '19');
  await page.selectOption('#phutSinh', '30');

  await page.click('button[type="submit"]');

  // Wait for chart and luan giai to render
  console.log('3. Waiting for accordionList...');
  await page.waitForSelector('#accordionList', { state: 'visible', timeout: 10000 });

  // Check Free Psychological Dossier
  const dossier = await page.$('.free-psychological-dossier');
  console.log('Free Psychological Dossier found:', !!dossier);
  if (dossier) {
    const text = await dossier.innerText();
    console.log('Dossier preview:', text.substring(0, 150).replace(/\n/g, ' '));
  }

  // Check Cliffhanger Paywall on locked palaces (e.g. Tài Bạch or Điền Trạch)
  const cliffhanger = await page.$('.cliffhanger-paywall-overlay');
  console.log('Cliffhanger Paywall found:', !!cliffhanger);
  if (cliffhanger) {
    const title = await cliffhanger.$eval('.cliffhanger-title', el => el.innerText);
    const bulletsCount = await cliffhanger.$$eval('.cliffhanger-bullets li', els => els.length);
    console.log('Cliffhanger title:', title);
    console.log('Cliffhanger bullets count:', bulletsCount);
  }

  // Check Countdown clock
  const countdown = await page.$eval('.cliffhanger-countdown-clock', el => el.innerText);
  console.log('Cliffhanger countdown clock value:', countdown);

  // Check Pricing Section
  const pricingCards = await page.$$eval('#bang-gia-dich-vu .pricing-card', els => els.map(e => {
    const title = e.querySelector('.pricing-title')?.innerText;
    const price = e.querySelector('.pricing-price')?.innerText;
    return { title, price };
  }));
  console.log('Pricing cards:', pricingCards.slice(0, 3));

  // Check VIP Modal package switching
  console.log('4. Testing VIP Modal with 29k...');
  await page.evaluate(() => {
    TuViMonetize.openVipModal('Gói Mở Khóa Nhanh 3 Cung Trọng Tâm (Tài - Quan - Phối)', 29000);
  });
  await page.waitForTimeout(500);

  const modalPrice29k = await page.$eval('#vipPriceDisplay', el => el.innerText);
  const modalQr29k = await page.$eval('#vipQrImage', el => el.src);
  console.log('Modal price 29k:', modalPrice29k);
  console.log('Modal QR contains 29000:', modalQr29k.includes('amount=29000'));

  console.log('5. Testing VIP Modal package switch to 49k...');
  await page.evaluate(() => {
    TuViMonetize.switchModalPackage('Báo Cáo VIP Toàn Thư 12 Cung & Xuất PDF A4', 49000);
  });
  await page.waitForTimeout(500);
  const modalPrice49k = await page.$eval('#vipPriceDisplay', el => el.innerText);
  const modalQr49k = await page.$eval('#vipQrImage', el => el.src);
  console.log('Modal price 49k:', modalPrice49k);
  console.log('Modal QR contains 49000:', modalQr49k.includes('amount=49000'));

  // Screenshot modal
  await page.screenshot({ path: 'scripts/cro_modal_check.png' });
  console.log('Screenshot saved to scripts/cro_modal_check.png');

  // Close modal and take screenshot of dossier and cliffhanger
  await page.evaluate(() => TuViMonetize.closeVipModal());
  await page.waitForTimeout(300);

  // Scroll to dossier
  await page.$eval('.free-psychological-dossier', el => el.scrollIntoView({ behavior: 'instant' }));
  await page.screenshot({ path: 'scripts/cro_dossier_check.png' });
  console.log('Screenshot saved to scripts/cro_dossier_check.png');

  await browser.close();
  console.log('All CRO checks completed successfully!');
}

testCroFeatures().catch(err => {
  console.error('Test CRO error:', err);
  process.exit(1);
});
