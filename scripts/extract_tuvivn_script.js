const fs = require('fs');

const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

// Find all script tags
const scripts = [...html.matchAll(/<script[\s\S]*?<\/script>/gi)].map(m => m[0]);
console.log('Total script tags:', scripts.length);

scripts.forEach((s, idx) => {
  if (s.includes('animalType') || s.includes('cucMenh') || s.includes('item.name') || s.includes('canChi')) {
    console.log(`Script ${idx} has chart data or template! Length: ${s.length}`);
    console.log(s.slice(0, 500));
    fs.writeFileSync(`scripts/tuvivn_script_${idx}.js`, s, 'utf8');
  }
});

