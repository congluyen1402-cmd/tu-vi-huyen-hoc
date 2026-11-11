const fs = require('fs');

const html = fs.readFileSync('scripts/tracuutuvi_result.html', 'utf8');

// Search for center info and palaces in tracuutuvi
console.log('--- TRACUUTUVI RESULT ANALYSIS ---');
const idx = html.indexOf('Nhâm Ngọ');
console.log('Nhâm Ngọ index:', idx);
if (idx !== -1) {
  console.log(html.slice(idx - 100, idx + 400).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
}

// Check if there are palaces table
const palaces = [...html.matchAll(/class=["'][^"']*\bcung-[0-9]+[^"']*["']|id=["'][^"']*\bcung-[0-9]+[^"']*["']/gi)];
console.log('Palace matches:', palaces.length);
if (palaces.length > 0) {
  palaces.slice(0, 5).forEach(p => console.log(p[0]));
}

// Let's search for table or divs that represent the 12 palaces
// In tracuutuvi, usually it's a 4x4 table or 12 divs
const tableMatch = html.match(/<table[^>]*class=["'][^"']*la-so[^"']*["'][\s\S]*?<\/table>/i);
if (tableMatch) {
  console.log('Found la-so table! Length:', tableMatch[0].length);
  fs.writeFileSync('scripts/tracuutuvi_table.html', tableMatch[0], 'utf8');
} else {
  // Let's search for "MỆNH" or "Điền Trạch"
  const dtIdx = html.indexOf('Điền Trạch');
  console.log('Điền Trạch index:', dtIdx);
  if (dtIdx !== -1) {
    console.log(html.slice(dtIdx - 200, dtIdx + 400).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
  }
}

