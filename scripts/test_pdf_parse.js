const fs = require('fs');
const pdf = require('pdf-parse');

(async () => {
  const dataBuffer = fs.readFileSync('scripts/tracuutuvi_laso.pdf');
  const data = await pdf(dataBuffer);

  console.log('PDF Page Count:', data.numpages);
  console.log('PDF Text length:', data.text.length);
  fs.writeFileSync('scripts/pdf_text.txt', data.text, 'utf8');
  console.log('--- FIRST 1000 CHARACTERS ---');
  console.log(data.text.slice(0, 1000));
})();

