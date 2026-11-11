const fs = require('fs');

for (let i = 0; i < 12; i++) {
  const content = fs.readFileSync(`scripts/tracuutuvi_svg_${i}.svg`, 'utf8');
  // strip tags and extract text
  const texts = [...content.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
  console.log(`\n--- SVG ${i} ---`);
  console.log(texts.join(' | '));
}

