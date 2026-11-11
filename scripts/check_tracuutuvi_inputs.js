const fs = require('fs');

async function checkFormInputs() {
  const res = await fetch('https://xem.tracuutuvi.com/', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const html = await res.text();
  const f0 = html.match(/<form action="" method="post"[\s\S]*?<\/form>/i)?.[0] || '';
  const inputs = [...f0.matchAll(/<(input|select)[^>]*name=["']([^"']*)["'][^>]*>/gi)].map(m => m[0]);
  console.log('Inputs in form 0:');
  inputs.forEach(i => console.log(i));
}

checkFormInputs();

