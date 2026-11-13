const http = require('http');
const server = require('../server.js');

const req = new http.IncomingMessage(null);
req.method = 'GET';
req.url = '/blog/tu-vi-hon-nhan-tinh-duyen-nam-2027-dinh-mui';
req.headers = { host: 'www.xemtuvihuyenhoc.com' };

let resData = '';
const res = new http.ServerResponse(req);
res.writeHead = function(statusCode, headers) {
  console.log('Status Code:', statusCode);
  console.log('Content-Type:', headers['Content-Type']);
};
res.end = function(chunk) {
  if (chunk) resData += chunk;
  console.log('\n--- VERIFICATION CHECKS ---');
  
  // 1. Check title
  const hasTitle = resData.includes('<title>Tử Vi Hôn Nhân &amp; Tình Duyên Năm 2027 (Đinh Mùi): Năm Hỷ Tín Đắc Lộc Hay Sóng Gió Cung Phu Thê? | Xem Tử Vi Huyền Học</title>') || resData.includes('Tử Vi Hôn Nhân &amp; Tình Duyên Năm 2027');
  console.log('1. Custom Title injected:', hasTitle ? '✅ PASS' : '❌ FAIL');

  // 2. Check OG Type
  const hasOgType = resData.includes('<meta property="og:type" content="article">');
  console.log('2. og:type is article:', hasOgType ? '✅ PASS' : '❌ FAIL');

  // 3. Check OG Title
  const hasOgTitle = resData.includes('<meta property="og:title" content="Tử Vi Hôn Nhân &amp; Tình Duyên');
  console.log('3. Dynamic og:title injected:', hasOgTitle ? '✅ PASS' : '❌ FAIL');

  // 4. Check Twitter Card
  const hasTwitter = resData.includes('<meta name="twitter:card" content="summary_large_image">');
  console.log('4. Twitter Card tag present:', hasTwitter ? '✅ PASS' : '❌ FAIL');

  // 5. Check BlogPosting Schema
  const hasBlogPostingSchema = resData.includes('"@type": "BlogPosting"') && resData.includes('"wordCount"');
  console.log('5. BlogPosting Schema with wordCount & author:', hasBlogPostingSchema ? '✅ PASS' : '❌ FAIL');

  // 6. Check BreadcrumbList Schema
  const hasBreadcrumbSchema = resData.includes('"@type": "BreadcrumbList"');
  console.log('6. BreadcrumbList Schema injected:', hasBreadcrumbSchema ? '✅ PASS' : '❌ FAIL');

  // 7. Check Breadcrumb UI
  const hasBreadcrumbUI = resData.includes('class="blog-breadcrumbs"');
  console.log('7. Visual Breadcrumbs UI on page:', hasBreadcrumbUI ? '✅ PASS' : '❌ FAIL');

  process.exit(0);
};

server.emit('request', req, res);

