const fs = require('fs');

async function testFetch() {
  const res = await fetch('https://xem.tracuutuvi.com/', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const html = await res.text();
  fs.writeFileSync('scripts/tracuutuvi_homepage.html', html, 'utf8');
  console.log('Homepage length:', html.length);
  const forms = [...html.matchAll(/<form[^>]*>[\s\S]*?<\/form>/gi)].map(m => m[0]);
  console.log('Total forms:', forms.length);
  forms.forEach((f, i) => {
    console.log(`--- FORM ${i} ---`);
    console.log(f.slice(0, 300));
  });
}

testFetch();

