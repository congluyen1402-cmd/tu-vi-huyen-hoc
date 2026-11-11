const fs = require('fs');

const html = fs.readFileSync('scripts/tracuutuvi_submitted.html', 'utf8');

// Find keywords
console.log('--- TRACUUTUVI SUBMITTED CONTENT ---');
const idx = html.indexOf('Nhâm Ngọ');
console.log('Nhâm Ngọ index:', idx);
if (idx !== -1) {
  console.log(html.slice(idx - 100, idx + 400).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
}

// Let's find all palace blocks
// Look for 12 cung or table
const palaces = [...html.matchAll(/class=["'][^"']*\b(cung|palace|cell)[^"']*["']/gi)];
console.log('Palace class count:', palaces.length);

// Let's search for "MỆNH" or "Điền Trạch"
const dtIdx = html.indexOf('Điền Trạch');
console.log('Điền Trạch index:', dtIdx);
if (dtIdx !== -1) {
  console.log(html.slice(dtIdx - 200, dtIdx + 400).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
}

