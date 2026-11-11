const fs = require('fs');
const html = fs.readFileSync('scripts/tracuutuvi_submitted.html', 'utf8');

// Search for canvas IDs
const canvases = [...html.matchAll(/<canvas[^>]*id=["']([^"']*)["'][^>]*>/gi)];
console.log('Canvases:', canvases.map(c => c[0]));

// Search for scripts that draw canvas
const scripts = [...html.matchAll(/<script[\s\S]*?<\/script>/gi)].map(m => m[0]);
scripts.forEach((s, i) => {
  if (s.includes('getContext') || s.includes('canvas')) {
    console.log(`Script ${i} draws canvas! Length: ${s.length}`);
    console.log(s.slice(0, 400));
  }
});

