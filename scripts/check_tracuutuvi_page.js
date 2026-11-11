const fs = require('fs');
const html = fs.readFileSync('scripts/tracuutuvi_result.html', 'utf8');

console.log('Title:', html.match(/<title>[\s\S]*?<\/title>/i)?.[0]);
console.log('First 500 chars:');
console.log(html.slice(0, 500));

