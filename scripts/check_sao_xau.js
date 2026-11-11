const fs = require('fs');
const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

for (let i = 0; i < 12; i++) {
  const xauIdx = html.indexOf(`id="sao-xau-${i}"`);
  console.log(`id="sao-xau-${i}" index:`, xauIdx);
  if (xauIdx !== -1) {
    const block = html.slice(xauIdx, xauIdx + 1500);
    const phuMatches = [...block.matchAll(/class=["'][^"']*text-sao-xau-tot[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)];
    const stars = phuMatches.map(m => m[1].replace(/<[^>]+>/g, '').trim().split('(')[0].trim()).filter(Boolean);
    console.log(`  sao-xau-${i}:`, stars.join(', '));
  }
}

