const fs = require('fs');
const html = fs.readFileSync('scripts/tracuutuvi_result.html', 'utf8');
console.log('HTML size:', html.length);
console.log('Title:', html.match(/<title>([^<]*)<\/title>/i)?.[1]);
console.log('Forms count:', (html.match(/<form/gi) || []).length);
console.log('Includes SVG:', html.includes('<svg'));
console.log('Includes canvas:', html.includes('<canvas'));
console.log('Has Thamhtrhht:', html.includes('Thamhtrhht') || html.includes('Test 2002'));
const idx = html.indexOf('Test 2002');
if (idx !== -1) {
  console.log('Context around Test 2002:');
  console.log(html.slice(idx - 200, idx + 500));
} else {
  console.log('No Test 2002 found. Checking form action:');
  const forms = [...html.matchAll(/<form[^>]*action=["']([^"']*)["'][^>]*>/gi)];
  forms.forEach(f => console.log(f[0]));
}

