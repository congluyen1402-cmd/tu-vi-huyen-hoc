const fs = require('fs');
const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

// Find where Cung 8 (Thân) is defined
const idx8 = html.indexOf('data-cung="dien-trach"');
console.log('--- HTML AROUND DIEN TRACH ---');
console.log(html.slice(idx8 - 200, idx8 + 1500));

