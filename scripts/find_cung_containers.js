const fs = require('fs');
const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

const cungRegex = /<div[^>]*class=["'][^"']*\bcung\b[^"']*["'][\s\S]*?(?=<div[^>]*class=["'][^"']*\bcung\b[^"']*["']|<\/body>)/gi;
const matches = [...html.matchAll(/<div class="cung[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi)];
console.log('Matches:', matches.length);

// Let's search for "id=\"KNH" which is for KNH0..KNH11 (Khởi Nguyệt Hạn)
for (let i = 0; i < 12; i++) {
  const kIdx = html.indexOf(`id="KNH${i}"`);
  console.log(`KNH${i} index:`, kIdx);
}

