const fs = require('fs');

const html = fs.readFileSync('scripts/tracuutuvi_submitted.html', 'utf8');

// Check for canvas, svg, or image or chart container
console.log('Canvas:', html.match(/<canvas[\s\S]*?<\/canvas>/gi)?.length || 0);
console.log('SVG:', html.match(/<svg[\s\S]*?<\/svg>/gi)?.length || 0);
console.log('Images with chart or laso in src:', [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]).filter(s => s.includes('la_so') || s.includes('chart') || s.includes('view') || s.includes('svg') || s.includes('laso')));

// Find all script tags in submitted html to see if chart is drawn via JS
const scripts = [...html.matchAll(/<script[\s\S]*?<\/script>/gi)].map(m => m[0]);
console.log('Scripts count:', scripts.length);
scripts.forEach((s, i) => {
  if (s.includes('laso') || s.includes('chart') || s.includes('cung') || s.includes('thienCan') || s.includes('diaChi')) {
    console.log(`Script ${i} length: ${s.length}, snippet:`, s.slice(0, 300));
  }
});

