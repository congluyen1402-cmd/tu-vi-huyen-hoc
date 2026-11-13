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
  console.log('\n--- STAGE 2 VERIFICATION CHECKS ---');
  
  // 1. Check title
  console.log('1. Title injected:', resData.includes('Tử Vi Hôn Nhân &amp; Tình Duyên Năm 2027') ? '✅ PASS' : '❌ FAIL');

  // 2. Check Table of Contents (TOC)
  const hasToc = resData.includes('class="article-toc-box"') && resData.includes('MỤC LỤC BÀI VIẾT');
  console.log('2. Auto Table of Contents (TOC) generated:', hasToc ? '✅ PASS' : '❌ FAIL');

  // 3. Check Featured Image
  const hasFeaturedImg = resData.includes('class="article-featured-image-wrap"');
  console.log('3. Article Featured Hero Image:', hasFeaturedImg ? '✅ PASS' : '❌ FAIL');

  // 4. Check Social Share Bar
  const hasShare = resData.includes('class="article-share-bar"') && resData.includes('btn-share-zalo');
  console.log('4. Social Share Bar (Facebook, Zalo, Copy Link):', hasShare ? '✅ PASS' : '❌ FAIL');

  // 5. Check Author Box (E-E-A-T)
  const hasAuthorBox = resData.includes('class="author-bio-card"') && resData.includes('Đại Sư Nam Phái');
  console.log('5. Author Bio Box (E-E-A-T Standard):', hasAuthorBox ? '✅ PASS' : '❌ FAIL');

  // 6. Check Related Posts Grid
  const hasRelated = resData.includes('class="related-posts-section"') && resData.includes('BÀI VIẾT CÙNG CHUYÊN MỤC');
  console.log('6. Related Posts Section (3 cards):', hasRelated ? '✅ PASS' : '❌ FAIL');

  process.exit(0);
};

server.emit('request', req, res);

