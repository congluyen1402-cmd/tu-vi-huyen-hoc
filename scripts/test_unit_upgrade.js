const fs = require('fs');
global.window = global;
require('../js/tuvi-engine.js');
const TuViEngine = global.window.TuViEngine || global.TuViEngine;

function runUnitTests() {
  console.log('================================================================');
  console.log('          UNIT TESTS - TỬ VI ENGINE & CHART UPGRADE             ');
  console.log('================================================================\n');

  let passed = 0;
  let total = 0;

  function assert(desc, condition) {
    total++;
    if (condition) {
      console.log(`[PASS] ${desc}`);
      passed++;
    } else {
      console.error(`[FAIL] ${desc}`);
    }
  }

  // TEST CASE 1: Trần Công Luyện (10/04/2002 19h30 Nam)
  console.log('--- TEST CASE 1: Trần Công Luyện (10/04/2002 19h30 Dương lịch, Nam) ---');
  const c = TuViEngine.lapLaSo(10, 4, 2002, 10, 'nam', false, '19:30', 2026);

  // 1. Âm lịch
  assert('Âm lịch là 28/2/2002 Nhâm Ngọ', c.lunarDate.day === 28 && c.lunarDate.month === 2 && c.lunarDate.year === 2002 && c.canChiNam === 'Nhâm Ngọ');

  // 2. Mệnh Ất Tỵ (Thái Dương M)
  const pMenh = c.cung.find(p => p.chiIndex === c.cungMenh.chiIndex);
  const thaiDuong = pMenh.chinhTinh.find(s => s.name === 'Thái Dương');
  assert('Mệnh tại Ất Tỵ có Thái Dương (M)', pMenh.can === 'Ất' && pMenh.chi === 'Tỵ' && Boolean(thaiDuong) && thaiDuong.dacHam === 'M');

  // 3. Thân cư Tài Bạch Quý Sửu (Thiên Lương V Hóa Lộc)
  const pThan = c.cung.find(p => p.chiIndex === c.cungThan.chiIndex);
  const thienLuong = pThan.chinhTinh.find(s => s.name === 'Thiên Lương');
  assert('Thân cư Tài Bạch Quý Sửu có Thiên Lương (V) Hóa Lộc', pThan.can === 'Quý' && pThan.chi === 'Sửu' && Boolean(thienLuong) && thienLuong.dacHam === 'V' && thienLuong.tuHoa === 'Hóa Lộc');

  // 4. Điền Trạch Mậu Thân (Tử Vi M Hóa Quyền, Thiên Phủ M)
  const pDien = c.cung.find(p => p.cungName.includes('ĐIỀN TRẠCH'));
  const tuVi = pDien.chinhTinh.find(s => s.name === 'Tử Vi');
  const thienPhu = pDien.chinhTinh.find(s => s.name === 'Thiên Phủ');
  assert('Điền Trạch Mậu Thân có Tử Vi (M) Hóa Quyền & Thiên Phủ (M)', pDien.can === 'Mậu' && pDien.chi === 'Thân' && Boolean(tuVi) && tuVi.tuHoa === 'Hóa Quyền' && Boolean(thienPhu) && thienPhu.dacHam === 'M');

  // 5. Cung Giáp Thìn hiển thị tiểu vận Ngọ (chuẩn tuvi.vn & tracuutuvi.com)
  const pThin = c.cung.find(p => p.chi === 'Thìn');
  assert('Cung Giáp Thìn hiển thị tiểu vận Ngọ', pThin.tieuHan === 'Ngọ');

  // 6. Cung Mậu Thân hiển thị tiểu vận Tuất
  const pThanChi = c.cung.find(p => p.chi === 'Thân');
  assert('Cung Mậu Thân hiển thị tiểu vận Tuất', pThanChi.tieuHan === 'Tuất');

  // 7. Nguyệt hạn tháng Giêng (Th.1) tại Quý Sửu, Cung Ất Tỵ là Th.5 (chuẩn tuvi.vn & tracuutuvi.com)
  const pTy = c.cung.find(p => p.chi === 'Tỵ');
  assert('Cung Ất Tỵ mang tiểu vận Mùi và nguyệt hạn Th.5', pTy.tieuHan === 'Mùi' && pTy.thangHan === 'Th.5');
  assert('Nguyệt hạn tháng Giêng (Th.1) nằm tại cung Quý Sửu', pThan.thangHan === 'Th.1');

  // 8. Không trùng lặp LN Văn Tinh và Văn Tinh
  const allStarsInChart = [];
  c.cung.forEach(p => {
    p.phuTinhLeft.forEach(s => allStarsInChart.push(s.name));
    p.phuTinhRight.forEach(s => allStarsInChart.push(s.name));
  });
  const countLNVanTinh = allStarsInChart.filter(s => s === 'LN Văn tinh').length;
  const countVanTinh = allStarsInChart.filter(s => s === 'Văn tinh').length;
  assert('Chỉ có 1 sao LN Văn tinh và không bị trùng lặp Văn tinh', countLNVanTinh === 1 && countVanTinh === 0);

  // 9. Có đủ 3 điểm nghiệm lý xác thực giờ sinh
  assert('Trích xuất đủ 3 điểm nghiệm lý xác thực giờ sinh', Boolean(c.nghiemLyDienMao) && Boolean(c.nghiemLyTinhCach) && Boolean(c.nghiemLyTheChat));

  // TEST CASE 2: Kiểm tra tùy chọn Giờ Tý (sau 23h)
  console.log('\n--- TEST CASE 2: Kiểm tra Quy tắc Giờ Tý (23h) ---');
  const cTyNext = TuViEngine.lapLaSo({
    ngay: 10,
    thang: 4,
    nam: 2002,
    gio: 23,
    phut: 30,
    gioiTinh: 'nam',
    isLunar: false,
    gioTyMode: 'next_day'
  });
  assert('Giờ Tý (next_day) chuyển sang ngày 11/04 dương lịch', cTyNext.solarDate.day === 11);

  const cTySame = TuViEngine.lapLaSo({
    ngay: 10,
    thang: 4,
    nam: 2002,
    gio: 23,
    phut: 30,
    gioiTinh: 'nam',
    isLunar: false,
    gioTyMode: 'same_day'
  });
  assert('Giờ Tý (same_day) giữ nguyên ngày 10/04 dương lịch', cTySame.solarDate.day === 10);

  console.log('\n----------------------------------------------------------------');
  console.log(`KẾT QUẢ: ${passed}/${total} assertions PASSED (${(passed/total*100).toFixed(0)}%)`);
  console.log('================================================================');

  if (passed !== total) {
    process.exit(1);
  }
}

runUnitTests();
