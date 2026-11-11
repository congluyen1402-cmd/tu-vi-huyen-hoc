const fs = require('fs');

async function inspectTraCuuTuVi() {
  const res = await fetch('https://xem.tracuutuvi.com/', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const html = await res.text();
  console.log('xem.tracuutuvi.com length:', html.length);
  // find form or input
  const forms = [...html.matchAll(/<form[\s\S]*?<\/form>/gi)].map(m => m[0]);
  forms.forEach((f, i) => {
    console.log(`\n--- FORM ${i} ---`);
    console.log(f.slice(0, 500));
  });
}

inspectTraCuuTuVi();

