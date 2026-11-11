const fs = require('fs');

const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

for (let i = 0; i <= 11; i++) {
  const matchId = `KNH${i}`;
  const idx = html.indexOf(`id="${matchId}"`);
  if (idx !== -1) {
    const chunk = html.slice(Math.max(0, idx - 400), Math.min(html.length, idx + 300));
    console.log(`=== PALACE ${i} ===`);
    console.log(chunk.replace(/\r?\n/g, ' '));
  }
}
