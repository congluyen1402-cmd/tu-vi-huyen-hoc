const fs = require('fs');
const { PDFParse } = require('pdf-parse');

(async () => {
  const dataBuffer = fs.readFileSync('scripts/tracuutuvi_laso.pdf');
  const parser = new PDFParse(new Uint8Array(dataBuffer));
  const result = await parser.getText();
  console.log('Result text length:', result.text ? result.text.length : 0);
  console.log('Sample:');
  console.log((result.text || '').slice(0, 1000));
  fs.writeFileSync('scripts/pdf_extracted_text.txt', result.text, 'utf8');
})();
