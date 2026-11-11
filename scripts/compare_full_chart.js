const fs = require('fs');
global.window = global;
require('../js/tuvi-engine.js');
const TuViEngine = global.window.TuViEngine || global.TuViEngine;

// Read tracuutuvi PDF text
const pdfText = fs.readFileSync('scripts/pdf_extracted_text.txt', 'utf8');

// Read tuvi.vn extracted json
const tuviVnData = JSON.parse(fs.readFileSync('scripts/tuvivn_extracted.json', 'utf8'));

console.log('=== SO SÁNH TOÀN DIỆN VỚI TRACUUTUVI VÀ TUVI.VN ===\n');

// Run engine with test case 2002
const chart = TuViEngine.lapLaSo(10, 4, 2002, 10, 'nam', false, '19:30');

const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

for (let i = 0; i < 12; i++) {
  const chi = DIA_CHI[i];
  const cung = chart.cung.find(c => c.chiIndex === i);
  const tuviPalace = tuviVnData.find(p => p.chiIndex === i);

  console.log(`================================================================`);
  console.log(`CUNG ${cung.cungName} (${chi}):`);
  console.log(`  Chính tinh:`, cung.chinhTinh.map(s => s.name + (s.dacHam ? ` (${s.dacHam})` : '') + (s.tuHoa ? ` [${s.tuHoa}]` : '')).join(', ') || 'Vô Chính Diệu');
  console.log(`  Cát tinh (web mình):`, cung.phuTinhLeft.map(s => s.name + (s.tuHoa ? ` [${s.tuHoa}]` : '')).join(', '));
  console.log(`  Sát tinh (web mình):`, cung.phuTinhRight.map(s => s.name + (s.tuHoa ? ` [${s.tuHoa}]` : '')).join(', '));
  console.log(`  TuVi.vn Cát:`, tuviPalace ? tuviPalace.tot.join(', ') : '');
  console.log(`  TuVi.vn Sát:`, tuviPalace ? tuviPalace.xau.join(', ') : '');
}

