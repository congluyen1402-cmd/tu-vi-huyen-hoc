const fs = require('fs');
const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');
const tot0 = html.indexOf('id="sao-tot-0"');
const end0 = html.indexOf('id="sao-xau-0"');
console.log('TOT 0:');
console.log(html.slice(tot0, end0).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
console.log('\nXAU 0:');
console.log(html.slice(end0, end0 + 2000).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));

