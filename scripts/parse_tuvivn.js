const fs = require('fs');

const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

// Search for center box info
console.log('--- SEARCHING FOR KEYWORDS IN TUVIVN RESULT ---');
const keywords = ['Nhâm Ngọ', 'Cục', 'Mệnh', 'Thân', 'Tử Vi', 'Thiên Phủ', 'Đại Hạn', 'Tràng Sinh'];
keywords.forEach(kw => {
  const idx = html.indexOf(kw);
  console.log(`${kw} found at index:`, idx);
});

// Look for script tags or JSON data inside the html
const jsonMatches = html.match(/var\s+(dataLaSo|laso|chartData|chartInfo)\s*=\s*(\{[\s\S]*?\});/i);
if (jsonMatches) {
  console.log('Found chart JSON variable:', jsonMatches[1]);
} else {
  console.log('No obvious global chart JSON variable found in HTML.');
}

// Let's search for palace containers (often class contains cung or cell)
const cungMatches = [...html.matchAll(/class=["'][^"']*(cung|cell|palace)[^"']*["']/gi)];
console.log('Cung class occurrences:', cungMatches.length);
if (cungMatches.length > 0) {
  console.log('Sample match:', cungMatches[0][0]);
}

// Write a small snippet of center content
const centerIdx = html.indexOf('Bản Mệnh') !== -1 ? html.indexOf('Bản Mệnh') : html.indexOf('Nhâm Ngọ');
if (centerIdx !== -1) {
  console.log('\n--- CENTER CONTEXT ---');
  console.log(html.slice(Math.max(0, centerIdx - 300), centerIdx + 500).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
}

