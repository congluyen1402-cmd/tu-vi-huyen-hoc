const fs = require('fs');
const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

const pos = 126278;
console.log('--- PALACE AROUND 126278 ---');
console.log(html.slice(pos - 1000, pos + 2000));

