const fs = require('fs');

async function checkOptions() {
  const res = await fetch('https://xem.tracuutuvi.com/', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const html = await res.text();
  const selects = [...html.matchAll(/<select[^>]*name=["']([^"']*)["'][^>]*>([\s\S]*?)<\/select>/gi)];
  selects.forEach(s => {
    console.log(`Select ${s[1]}:`);
    const opts = [...s[2].matchAll(/<option[^>]*value=["']([^"']*)["'][^>]*>(.*?)<\/option>/gi)];
    console.log(opts.map(o => `${o[1]}: ${o[2].trim()}`).join(', '));
  });
}

checkOptions();

