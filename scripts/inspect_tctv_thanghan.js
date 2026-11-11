const fs = require('fs');
if (fs.existsSync('scripts/tracuutuvi_result.html')) {
  const html = fs.readFileSync('scripts/tracuutuvi_result.html', 'utf8');
  console.log('tracuutuvi_result.html length:', html.length);
  // search for Th.1, Th.2, etc.
  const matches = [...html.matchAll(/Th\.\d+/g)];
  console.log('tracuutuvi Th. matches:', matches.length);
  matches.forEach(m => {
    const idx = m.index;
    console.log(html.slice(Math.max(0, idx - 60), Math.min(html.length, idx + 60)).replace(/\s+/g, ' '));
  });
} else {
  console.log('tracuutuvi_result.html not found');
}

