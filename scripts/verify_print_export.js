const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function verifyPrintExport() {
  console.log('--- START PRINT EXPORT VERIFICATION ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();

  // Set VIP unlocked in localStorage
  await page.addInitScript(() => {
    localStorage.setItem('tvhh_vip_unlocked', 'true');
    localStorage.setItem('tvhh_vip_order_code', 'TV289735');
    localStorage.setItem('tvhh_vip_token', '9a7f34bc6102da88e14cf956102a399f');
  });

  const artifactDir = 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262';

  // 1. TEST TỬ VI PAGE (index.html)
  console.log('\n1. Testing Tử Vi page...');
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });

  // Fill and submit form
  await page.fill('#hoTen', 'Trần Công Luyện');
  await page.selectOption('#gioiTinh', 'nam');
  await page.selectOption('#ngaySinh', '15');
  await page.selectOption('#thangSinh', '8');
  await page.selectOption('#namSinh', '1995');
  await page.selectOption('#gioSinh', '9');
  await page.selectOption('#phutSinh', '30');
  await page.click('#btnSubmit');

  await page.waitForSelector('#ket-qua', { state: 'visible', timeout: 5000 });
  await page.waitForSelector('.la-so-paper-container', { state: 'visible', timeout: 5000 });
  console.log('✓ Lá số calculated and displayed.');

  // Emulate Print Media
  await page.emulateMedia({ media: 'print' });

  const checks = await page.evaluate(() => {
    const isHidden = (el) => !el || window.getComputedStyle(el).display === 'none';
    const isVisible = (el) => el && window.getComputedStyle(el).display !== 'none';

    return {
      headerHidden: isHidden(document.querySelector('.site-header') || document.querySelector('header')),
      navbarHidden: isHidden(document.querySelector('#navbar')),
      formHidden: isHidden(document.querySelector('#lap-la-so')),
      pricingHidden: isHidden(document.querySelector('#bang-gia-dich-vu')),
      bookingHidden: isHidden(document.querySelector('#dat-lich-tu-van')),
      fengshuiHidden: isHidden(document.querySelector('#vat-pham-phong-thuy')),
      mysticHidden: !document.querySelector('#khong-gian-tam-linh') || isHidden(document.querySelector('#khong-gian-tam-linh')),
      faqHidden: isHidden(document.querySelector('#cau-hoi-thuong-gap')),
      blogHidden: isHidden(document.querySelector('#blog-tu-vi')),
      footerHidden: isHidden(document.querySelector('footer')),
      mobileNavHidden: isHidden(document.querySelector('.mobile-bottom-nav')),
      floatingZaloHidden: isHidden(document.querySelector('.floating-zalo')),
      toolbarHidden: isHidden(document.querySelector('.la-so-toolbar')),
      
      // REPORT CONTENT VISIBILITY
      resultVisible: isVisible(document.querySelector('#ket-qua')),
      laSoPaperVisible: isVisible(document.querySelector('.la-so-paper-container')),
      printHeaderVisible: isVisible(document.querySelector('.print-report-header')),
      printFooterVisible: isVisible(document.querySelector('.print-report-footer')),
      accordionListVisible: isVisible(document.querySelector('#accordionList')),
      accordionItemsCount: document.querySelectorAll('.accordion-item').length
    };
  });

  console.log('Tử Vi Print Checks:');
  console.log(' - Header hidden:', checks.headerHidden);
  console.log(' - Navbar hidden:', checks.navbarHidden);
  console.log(' - Form hidden:', checks.formHidden);
  console.log(' - Pricing hidden:', checks.pricingHidden);
  console.log(' - Booking hidden:', checks.bookingHidden);
  console.log(' - Feng Shui store hidden:', checks.fengshuiHidden);
  console.log(' - Mystic video hidden:', checks.mysticHidden);
  console.log(' - FAQ hidden:', checks.faqHidden);
  console.log(' - Blog hidden:', checks.blogHidden);
  console.log(' - Footer hidden:', checks.footerHidden);
  console.log(' - Mobile bottom nav hidden:', checks.mobileNavHidden);
  console.log(' - Floating Zalo hidden:', checks.floatingZaloHidden);
  console.log(' - Chart toolbar hidden:', checks.toolbarHidden);
  console.log(' - Lá số paper container visible:', checks.laSoPaperVisible);
  console.log(' - Print report header visible:', checks.printHeaderVisible);
  console.log(' - Print report footer visible:', checks.printFooterVisible);
  console.log(' - Accordion items count:', checks.accordionItemsCount);

  // Take screenshot of Tử Vi print view
  await page.screenshot({ path: path.join(artifactDir, 'verify_print_tuvi_page1.png'), fullPage: false });

  // Generate actual PDF via Playwright
  const pdfPath = path.join(artifactDir, 'bao_cao_tu_vi_vip_test.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', bottom: '12mm', left: '12mm', right: '12mm' }
  });
  console.log(`✓ Generated PDF at: ${pdfPath} (Size: ${fs.statSync(pdfPath).size} bytes)`);

  // 2. TEST THẦN SỐ HỌC (than-so-hoc.html)
  console.log('\n2. Testing Thần Số Học print mode...');
  await page.emulateMedia({ media: 'screen' });
  await page.goto('http://localhost:8080/than-so-hoc?name=TranCongLuyen&dob=1995-08-15', { waitUntil: 'networkidle' });
  await page.waitForSelector('#numerologyResultContainer .num-report-wrapper', { state: 'visible', timeout: 5000 });
  console.log('✓ Thần Số Học report loaded.');

  // Emulate Print Media for Thần Số Học
  await page.emulateMedia({ media: 'print' });
  const numChecks = await page.evaluate(() => {
    const isHidden = (el) => !el || window.getComputedStyle(el).display === 'none';
    const isVisible = (el) => el && window.getComputedStyle(el).display !== 'none';
    return {
      headerHidden: isHidden(document.querySelector('.site-header')),
      heroFormHidden: isHidden(document.querySelector('.num-page-hero')),
      footerHidden: isHidden(document.querySelector('.site-footer')),
      mobileNavHidden: isHidden(document.querySelector('.mobile-bottom-nav')),
      printHeaderVisible: isVisible(document.querySelector('.print-report-header')),
      printFooterVisible: isVisible(document.querySelector('.print-report-footer')),
      numReportVisible: isVisible(document.querySelector('.num-report-wrapper'))
    };
  });

  console.log('Thần Số Học Print Checks:');
  console.log(' - Header hidden:', numChecks.headerHidden);
  console.log(' - Hero/Form hidden:', numChecks.heroFormHidden);
  console.log(' - Footer hidden:', numChecks.footerHidden);
  console.log(' - Mobile bottom nav hidden:', numChecks.mobileNavHidden);
  console.log(' - Print header visible:', numChecks.printHeaderVisible);
  console.log(' - Print footer visible:', numChecks.printFooterVisible);
  console.log(' - Report content visible:', numChecks.numReportVisible);

  await page.screenshot({ path: path.join(artifactDir, 'verify_print_thansohoc.png'), fullPage: false });

  // 3. TEST HỢP TUỔI (hop-tuoi.html)
  console.log('\n3. Testing Hợp Tuổi print mode...');
  await page.emulateMedia({ media: 'screen' });
  await page.goto('http://localhost:8080/hop-tuoi?name1=Luyen&dob1=1995-08-15&name2=Hoa&dob2=1998-05-20', { waitUntil: 'networkidle' });
  await page.waitForSelector('#compatibilityResultContainer .comp-report-wrapper', { state: 'visible', timeout: 5000 });
  console.log('✓ Hợp Tuổi report loaded.');

  await page.emulateMedia({ media: 'print' });
  const compChecks = await page.evaluate(() => {
    const isHidden = (el) => !el || window.getComputedStyle(el).display === 'none';
    const isVisible = (el) => el && window.getComputedStyle(el).display !== 'none';
    return {
      headerHidden: isHidden(document.querySelector('.site-header')),
      heroFormHidden: isHidden(document.querySelector('.hop-tuoi-hero')),
      footerHidden: isHidden(document.querySelector('.site-footer')),
      mobileNavHidden: isHidden(document.querySelector('.mobile-bottom-nav')),
      printHeaderVisible: isVisible(document.querySelector('.print-report-header')),
      printFooterVisible: isVisible(document.querySelector('.print-report-footer')),
      compReportVisible: isVisible(document.querySelector('.comp-report-wrapper'))
    };
  });

  console.log('Hợp Tuổi Print Checks:');
  console.log(' - Header hidden:', compChecks.headerHidden);
  console.log(' - Hero/Form hidden:', compChecks.heroFormHidden);
  console.log(' - Footer hidden:', compChecks.footerHidden);
  console.log(' - Mobile bottom nav hidden:', compChecks.mobileNavHidden);
  console.log(' - Print header visible:', compChecks.printHeaderVisible);
  console.log(' - Print footer visible:', compChecks.printFooterVisible);
  console.log(' - Report content visible:', compChecks.compReportVisible);

  await page.screenshot({ path: path.join(artifactDir, 'verify_print_hoptuoi.png'), fullPage: false });

  await browser.close();
  console.log('\n--- ALL VERIFICATIONS FINISHED SUCCESSFULLY ---');
}

verifyPrintExport().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});
