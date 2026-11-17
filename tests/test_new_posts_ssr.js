const http = require('http');
const server = require('../server.js');

function testUrl(url, expectedTitlePart) {
  return new Promise((resolve) => {
    const req = new http.IncomingMessage(null);
    req.method = 'GET';
    req.url = url;
    req.headers = { host: 'www.xemtuvihuyenhoc.com' };

    let resData = '';
    const res = new http.ServerResponse(req);
    res.writeHead = function(statusCode, headers) {};
    res.end = function(chunk) {
      if (chunk) resData += chunk;
      const hasTitle = resData.includes(expectedTitlePart);
      const hasArticle = resData.includes('og:type" content="article"');
      const hasSchema = resData.includes('"@type": "BlogPosting"');
      const hasCTA = resData.includes('ĐẶC QUYỀN');
      console.log(`[SSR TEST] ${url}:`);
      console.log(' - Title injected:', hasTitle ? '✅ PASS' : '❌ FAIL');
      console.log(' - og:type article:', hasArticle ? '✅ PASS' : '❌ FAIL');
      console.log(' - BlogPosting schema:', hasSchema ? '✅ PASS' : '❌ FAIL');
      console.log(' - CTA block:', hasCTA ? '✅ PASS' : '❌ FAIL');
      resolve(hasTitle && hasArticle && hasSchema);
    };
    server.emit('request', req, res);
  });
}

async function run() {
  const p1 = await testUrl('/blog/xem-ngay-tot-dong-tho-mua-xe-khoi-su-ban-menh-tu-vi', 'Xem Ngày Tốt Động Thổ');
  const p2 = await testUrl('/blog/xem-tu-vi-doan-tuong-lai-2026-2027-giai-ma-van-han-tuoi-30-45', 'Xem Tử Vi Đoán Tương Lai 2026');
  if (p1 && p2) {
    console.log('\n🎉 ALL NEW BLOG POSTS PASS SSR & SEO INTEGRATION!');
    process.exit(0);
  } else {
    console.error('\n❌ SOME CHECKS FAILED');
    process.exit(1);
  }
}

run();
