const TuViEngine = require('../js/tuvi-engine.js');
const c = TuViEngine.lapLaSo(10, 4, 2002, 10, 'nam', false, '19:30', 2026);

function generateFreePsychologicalTeaser(laSo) {
  const pMenh = laSo.cung[laSo.cungMenh.chiIndex];
  const pThan = laSo.cung[laSo.cungThan.chiIndex];
  const pTai = laSo.cung.find(p => p.cungName.includes('TÀI BẠCH')) || laSo.cung[1];
  const pQuan = laSo.cung.find(p => p.cungName.includes('QUAN LỘC')) || laSo.cung[9];
  const pPhuThe = laSo.cung.find(p => p.cungName.includes('PHU THÊ')) || laSo.cung[3];
  const pDi = laSo.cung.find(p => p.cungName.includes('THIÊN DI')) || laSo.cung[11];

  const ctMenh = pMenh.chinhTinh.map(s => s.name).join(', ') || 'Vô Chính Diệu';
  const ctThan = pThan.chinhTinh.map(s => s.name).join(', ') || 'Vô Chính Diệu';

  // Quét sát tinh tại Mệnh & Thân & Tài
  const allSat = [];
  [pMenh, pThan, pTai].forEach(p => {
    (p.phuTinhRight || []).forEach(s => {
      if (['Kình dương', 'Đà la', 'Hỏa tinh', 'Linh tinh', 'Địa không', 'Địa kiếp', 'Thiên hình', 'Hóa kỵ'].includes(s.name)) {
        allSat.push(`${s.name} (cung ${p.cungName.replace('<THÂN>', '')})`);
      }
    });
  });

  // Quét cát tinh cứu giải
  const allCat = [];
  [pMenh, pThan, pTai, pQuan, pDi].forEach(p => {
    (p.phuTinhLeft || []).forEach(s => {
      if (['Hóa Khoa', 'Hóa Lộc', 'Hóa Quyền', 'Thiên khôi', 'Thiên việt', 'Tả phù', 'Hữu bật', 'Ân quang', 'Thiên quý', 'Giải thần', 'Long đức', 'Nguyệt đức', 'Thiên đức', 'Phúc đức', 'Thanh long', 'Lộc tồn'].includes(s.name) || s.tuHoa) {
        allCat.push(`${s.name}${s.tuHoa ? ' [' + s.tuHoa + ']' : ''} (${p.cungName.replace('<THÂN>', '')})`);
      }
    });
    p.chinhTinh.forEach(s => {
      if (s.tuHoa) {
        allCat.push(`${s.name} [${s.tuHoa}] (${p.cungName.replace('<THÂN>', '')})`);
      }
    });
  });

  console.log('CT Mệnh:', ctMenh, '| CT Thân:', ctThan);
  console.log('Sát tinh:', allSat);
  console.log('Cát tinh:', allCat);
}

generateFreePsychologicalTeaser(c);

