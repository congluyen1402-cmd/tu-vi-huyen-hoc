const http = require('http');
const server = require('../server.js');

function getPage(url) {
  return new Promise((resolve) => {
    const req = new http.IncomingMessage(null);
    req.method = 'GET';
    req.url = url;
    req.headers = { host: 'www.xemtuvihuyenhoc.com' };

    let resData = '';
    const res = new http.ServerResponse(req);
    res.writeHead = function() {};
    res.end = function(chunk) {
      if (chunk) resData += chunk;
      resolve(resData);
    };
    server.emit('request', req, res);
  });
}

async function verify() {
  const html1 = await getPage('/blog/xem-ngay-tot-dong-tho-mua-xe-khoi-su-ban-menh-tu-vi');
  const html2 = await getPage('/blog/xem-tu-vi-doan-tuong-lai-2026-2027-giai-ma-van-han-tuoi-30-45');

  console.log('--- POST 1 CTA TITLE CHECK ---');
  const m1 = html1.match(/<div class="article-cta-title"[^>]*>[\s\S]*?<\/div>/);
  console.log(m1 ? m1[0] : 'NOT FOUND');

  console.log('--- POST 2 CTA TITLE CHECK ---');
  const m2 = html2.match(/<div class="article-cta-title"[^>]*>[\s\S]*?<\/div>/);
  console.log(m2 ? m2[0] : 'NOT FOUND');

  console.log('\n--- VERIFY NO BLACK H3 ON CTA IN BOTH POSTS ---');
  const hasBlackH3_1 = html1.includes('id="muc-6">Tra Cứu');
  const hasBlackH3_2 = html2.includes('id="muc-6">Nhìn Thấu');
  console.log('Post 1 CTA in TOC/H3:', hasBlackH3_1 ? '❌ BAD (still in TOC)' : '✅ GOOD (clean)');
  console.log('Post 2 CTA in TOC/H3:', hasBlackH3_2 ? '❌ BAD (still in TOC)' : '✅ GOOD (clean)');

  process.exit(0);
}

verify();
