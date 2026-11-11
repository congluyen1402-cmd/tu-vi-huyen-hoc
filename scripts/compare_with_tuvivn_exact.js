const path = require('path');
const fs = require('fs');
const engine = require(path.join(__dirname, '../js/tuvi-engine.js'));

const tuvivn = JSON.parse(fs.readFileSync(path.join(__dirname, 'tuvivn_extracted.json'), 'utf8'));

const chart = engine.lapLaSo({
  hoTen: 'Trần Công Luyện',
  gioiTinh: 'nam',
  ngay: 10,
  thang: 4,
  nam: 2002,
  gio: 19,
  phut: 30,
  isDuongLich: true,
  viewYear: 2026
});

console.log('=== COMPARISON WITH TUVI.VN (10/04/2002 19:30 Nam) ===\n');

for (let p = 0; p < 12; p++) {
  const c = chart.cung[p];
  const exp = tuvivn[p];
  
  const ourStars = c.chinhTinh.map(s => s.name)
    .concat(c.phuTinhLeft.map(s => s.name))
    .concat(c.phuTinhRight.map(s => s.name));
    
  // Clean up expected names (remove (M), (V), (Đ), (H), [L], etc.)
  const expStars = (exp.tot || []).concat(exp.xau || [])
    .filter(s => !s.startsWith('ĐV.')) // Skip Đại Vận sub-stars of tuvivn
    .map(s => s.replace(/\s*\([MVĐHBh]\)/g, '').trim());

  console.log(`Palace ${p} (${c.chi} - ${c.cungName}):`);
  
  // Find stars in exp but missing in ours
  const missing = expStars.filter(es => !ourStars.some(os => os.toLowerCase() === es.toLowerCase()));
  if (missing.length > 0) {
    console.log('  MISSING in our chart:', missing);
  } else {
    console.log('  All expected stars present!');
  }
  
  // Find stars in ours but not in exp
  const extra = ourStars.filter(os => !expStars.some(es => es.toLowerCase() === os.toLowerCase()));
  if (extra.length > 0) {
    console.log('  EXTRA in our chart:', extra);
  }
}

