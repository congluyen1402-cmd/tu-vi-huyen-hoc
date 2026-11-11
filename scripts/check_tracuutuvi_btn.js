const fs = require('fs');

async function checkButton() {
  const res = await fetch('https://xem.tracuutuvi.com/', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const html = await res.text();
  const f0 = html.match(/<form action="" method="post"[\s\S]*?<\/form>/i)?.[0] || '';
  const buttons = [...f0.matchAll(/<(button|input)[^>]*>/gi)].map(m => m[0]);
  console.log('Buttons/inputs in form:');
  buttons.forEach(b => console.log(b));
}

checkButton();

