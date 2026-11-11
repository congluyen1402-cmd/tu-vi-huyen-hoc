const fs = require('fs');
const html = fs.readFileSync('scripts/tracuutuvi_chart_page.html', 'utf8');

// Find "Tải lá số" button or link
const idx = html.indexOf('Tải lá số');
console.log('Tải lá số idx:', idx);
if (idx !== -1) {
  console.log(html.slice(idx - 300, idx + 400));
}

