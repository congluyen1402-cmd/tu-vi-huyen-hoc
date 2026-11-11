const path = require('path');
const TuViEngine = require(path.join(__dirname, '../js/tuvi-engine.js'));
const laSo = TuViEngine.lapLaSo({
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

laSo.cung.forEach((c, idx) => {
  console.log(`\n=== Cung ${idx} (${c.chi} - ${c.cungName}) ===`);
  console.log('Chính tinh:', c.chinhTinh.map(s => s.name + (s.dacHam ? `(${s.dacHam})` : '') + (s.tuHoa ? `[${s.tuHoa}]` : '')).join(', '));
  console.log('Phụ tinh trái:', c.phuTinhLeft.map(s => s.name + (s.isLuu ? '[L]' : '') + (s.tuHoa ? `[${s.tuHoa}]` : '')).join(', '));
  console.log('Phụ tinh phải:', c.phuTinhRight.map(s => s.name + (s.isLuu ? '[L]' : '') + (s.tuHoa ? `[${s.tuHoa}]` : '')).join(', '));
});
