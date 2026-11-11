const fs = require('fs');
const html = fs.readFileSync('scripts/tracuutuvi_chart_page.html', 'utf8');

const idx = html.indexOf('pdf/laso_pdf');
console.log('Context around pdf/laso_pdf:');
console.log(html.slice(idx - 500, idx + 1500));

