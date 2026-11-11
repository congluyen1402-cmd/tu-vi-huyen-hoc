const fs = require('fs');

async function downloadPdf() {
  const code = '0V6px7GXnHmRqrvqFHph';
  const url = `https://xem.tracuutuvi.com/pdf/laso_pdf?c=${code}`;
  console.log('Downloading PDF from:', url);
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  console.log('Status:', res.status, res.headers.get('content-type'));
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync('scripts/tracuutuvi_laso.pdf', buffer);
  console.log('Saved PDF, size:', buffer.length);
}

downloadPdf();

