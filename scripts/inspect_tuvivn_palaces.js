const fs = require('fs');

const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

// Find all elements with class 'cung' or 'cell-la-so' or similar
const cungDivs = [...html.matchAll(/<div[^>]*class=["'][^"']*\bcung\b[^"']*["'][\s\S]*?<\/div>/gi)].map(m => m[0]);
console.log('cungDivs found:', cungDivs.length);

// Let's search for "Tử Vi" in html and see the context
let lastPos = 0;
while (true) {
  const pos = html.indexOf('Tử Vi', lastPos);
  if (pos === -1 || lastPos > 300000) break;
  // Print snippet
  console.log(`\n--- Match at ${pos} ---`);
  console.log(html.slice(Math.max(0, pos - 150), pos + 150).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
  lastPos = pos + 10;
}

