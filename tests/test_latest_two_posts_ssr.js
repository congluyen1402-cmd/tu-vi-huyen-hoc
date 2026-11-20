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
      const hasFaqSchema = resData.includes('"@type": "FAQPage"');
      const hasCTA = resData.includes('LẬP LÁ SỐ') || resData.includes('GÓI VIP');
      const hasImage = resData.includes('/images/blog/');

      console.log(`[SSR TEST] ${url}:`);
      console.log(' - Title injected:', hasTitle ? '✅ PASS' : '❌ FAIL');
      console.log(' - og:type article:', hasArticle ? '✅ PASS' : '❌ FAIL');
      console.log(' - BlogPosting schema:', hasSchema ? '✅ PASS' : '❌ FAIL');
      console.log(' - FAQPage schema:', hasFaqSchema ? '✅ PASS' : '❌ FAIL');
      console.log(' - CTA conversion block:', hasCTA ? '✅ PASS' : '❌ FAIL');
      console.log(' - Real mystic image src:', hasImage ? '✅ PASS' : '❌ FAIL');

      resolve(hasTitle && hasArticle && hasSchema && hasFaqSchema && hasCTA && hasImage);
    };
    server.emit('request', req, res);
  });
}

async function run() {
  const p1 = await testUrl('/blog/xem-ngay-tot-xuat-hanh-khai-truong-2026-2027-trach-cat-tu-vi', 'Xem Ngày Tốt Xuất Hành Khai Trương');
  const p2 = await testUrl('/blog/tu-vi-doan-tuong-lai-2026-2027-khung-hoang-tuoi-30-45-dai-van-phat-tai', 'Tử Vi Đoán Tương Lai 2026');

  if (p1 && p2) {
    console.log('\n🎉 ALL 2 NEW BLOG POSTS PASS SSR, SEO, SCHEMA & CONVERSION CHECKS 100%!');
    process.exit(0);
  } else {
    console.error('\n❌ SOME CHECKS FAILED');
    process.exit(1);
  }
}

run();
