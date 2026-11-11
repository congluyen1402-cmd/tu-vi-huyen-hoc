const fs = require('fs');

async function inspectForms() {
  const r1 = await fetch('https://tuvi.vn/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const h1 = await r1.text();
  const forms1 = [...h1.matchAll(/<form[\s\S]*?<\/form>/gi)].map(m => m[0]);
  console.log('--- tuvi.vn FORMS (' + forms1.length + ') ---');
  forms1.forEach((f, i) => console.log(`Form ${i}: action="${f.match(/action=["']([^"']*)["']/)?.[1]}" method="${f.match(/method=["']([^"']*)["']/)?.[1]}"`));

  const r2 = await fetch('https://xem.tracuutuvi.com/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const h2 = await r2.text();
  const forms2 = [...h2.matchAll(/<form[\s\S]*?<\/form>/gi)].map(m => m[0]);
  console.log('--- xem.tracuutuvi.com FORMS (' + forms2.length + ') ---');
  forms2.forEach((f, i) => console.log(`Form ${i}: action="${f.match(/action=["']([^"']*)["']/)?.[1]}" method="${f.match(/method=["']([^"']*)["']/)?.[1]}"`));
}

inspectForms();

