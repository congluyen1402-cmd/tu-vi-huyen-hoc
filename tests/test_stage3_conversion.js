const http = require('http');
const server = require('../server.js');
const fs = require('fs');

console.log('--- STAGE 3 CONVERSION FUNNEL CHECKS ---');

// 1. Check blog.html has mobile sticky bar
const blogHtml = fs.readFileSync('./blog.html', 'utf8');
const hasStickyHtml = blogHtml.includes('id="blogStickyCta"') && blogHtml.includes('btn-sticky-cta');
console.log('1. Mobile Sticky Floating CTA markup in blog.html:', hasStickyHtml ? '✅ PASS' : '❌ FAIL');
const hasStickyScript = blogHtml.includes('initStickyCta') && blogHtml.includes('dismissStickyCta');
console.log('2. Mobile Sticky Floating CTA scroll logic in blog.html:', hasStickyScript ? '✅ PASS' : '❌ FAIL');

// 2. Check Post 1 (Marriage category)
function testMarriagePost() {
  const req = new http.IncomingMessage(null);
  req.method = 'GET';
  req.url = '/blog/tu-vi-hon-nhan-tinh-duyen-nam-2027-dinh-mui';
  req.headers = { host: 'www.xemtuvihuyenhoc.com' };

  let resData = '';
  const res = new http.ServerResponse(req);
  res.writeHead = () => {};
  res.end = function(chunk) {
    if (chunk) resData += chunk;
    const hasMarriageCta = resData.includes('href="/hop-tuoi"') && resData.includes('BÓI HỢP TUỔI VỢ CHỒNG NGAY');
    console.log('3. Marriage Post has Smart CTA linking to /hop-tuoi:', hasMarriageCta ? '✅ PASS' : '❌ FAIL');

    const hasVipTeaser = resData.includes('vip-report-teaser') && resData.includes('/#bang-gia-dich-vu');
    console.log('4. Marriage Post has VIP Report Teaser Box:', hasVipTeaser ? '✅ PASS' : '❌ FAIL');

    testFinancePost();
  };
  server.emit('request', req, res);
}

// 3. Check Post 2 (Finance category)
function testFinancePost() {
  const req = new http.IncomingMessage(null);
  req.method = 'GET';
  req.url = '/blog/du-bao-tai-chinh-dau-tu-nam-2027-hoa-giai-cu-mon-hoa-ky';
  req.headers = { host: 'www.xemtuvihuyenhoc.com' };

  let resData = '';
  const res = new http.ServerResponse(req);
  res.writeHead = () => {};
  res.end = function(chunk) {
    if (chunk) resData += chunk;
    const hasFinanceCta = resData.includes('smart-cta-card') && resData.includes('SOI CUNG TÀI BẠCH MIỄN PHÍ');
    console.log('5. Finance Post has Smart CTA linking to /#lap-la-so:', hasFinanceCta ? '✅ PASS' : '❌ FAIL');
    process.exit(0);
  };
  server.emit('request', req, res);
}

testMarriagePost();

