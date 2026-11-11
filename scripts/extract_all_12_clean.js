const fs = require('fs');
const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

for (let i = 0; i < 12; i++) {
  const tot0 = html.indexOf(`id="sao-tot-${i}"`);
  const xau0 = html.indexOf(`id="sao-xau-${i}"`);
  const nextCung = html.indexOf(`id="sao-tot-${(i+1)%12}"`);

  const totText = html.slice(tot0, xau0).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  // xau text runs from xau0 until the next major section or closing div of cung-middle
  const xauSlice = html.slice(xau0, xau0 + 1000);
  const endXau = xauSlice.indexOf('</div> </div>');
  const xauText = (endXau !== -1 ? xauSlice.slice(0, endXau) : xauSlice).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

  console.log(`================ CUNG ${i} (${DIA_CHI[i]}) ================`);
  console.log('CÁT TINH:', totText.replace(`id="sao-tot-${i}">`, '').trim());
  console.log('HUNG TINH:', xauText.replace(`id="sao-xau-${i}">`, '').trim());
}

