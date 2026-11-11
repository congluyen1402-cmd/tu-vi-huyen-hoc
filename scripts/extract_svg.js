const fs = require('fs');
const html = fs.readFileSync('scripts/tracuutuvi_submitted.html', 'utf8');

const svgs = [...html.matchAll(/<svg[\s\S]*?<\/svg>/gi)].map(m => m[0]);
console.log('SVG lengths:', svgs.map(s => s.length));
// If an SVG has large length, it's the chart!
svgs.forEach((s, i) => {
  if (s.length > 1000) {
    console.log(`SVG ${i} length: ${s.length}`);
    fs.writeFileSync(`scripts/tracuutuvi_svg_${i}.svg`, s, 'utf8');
  }
});

