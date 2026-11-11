const fs = require('fs');
const html = fs.readFileSync('scripts/tracuutuvi_homepage.html', 'utf8');
const match = html.match(/<form action="" method="post"[\s\S]*?<\/form>/i);
if (match) {
  fs.writeFileSync('scripts/tracuutuvi_form0.html', match[0], 'utf8');
  console.log('Saved form0 to scripts/tracuutuvi_form0.html');
}

