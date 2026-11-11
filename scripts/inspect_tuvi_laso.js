const fs = require('fs');
const html = fs.readFileSync('scripts/tracuutuvi_chart_page.html', 'utf8');

const idx = html.indexOf('id="TUVI_LASO"');
console.log('Inside TUVI_LASO:');
console.log(html.slice(idx, idx + 2500));

