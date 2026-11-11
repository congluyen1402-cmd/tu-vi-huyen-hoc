const fs = require('fs');
const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

const cIdx = html.indexOf('id="cung0"');
const chunk = html.slice(cIdx, cIdx + 25000);
const m = chunk.match(/khoi-tieu-han[^"]*"[^>]*>([\s\S]*?)<\/div>/);
console.log(m ? m[0] : 'not found');

