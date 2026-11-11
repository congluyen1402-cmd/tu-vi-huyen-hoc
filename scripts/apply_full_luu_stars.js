const fs = require('fs');

function updateEngineFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');

  // 1. Add duplicate check in addStar
  code = code.replace(
    /function addStar\(pos, starName, isLeft, dacHam, isLuu\) \{[\s\S]*?var baseName = starName\.replace\(\/\^L\\\.\/, ''\);/,
    `function addStar(pos, starName, isLeft, dacHam, isLuu) {
      var exists = cungArray[pos].phuTinhLeft.some(function(s) { return s.name.toLowerCase() === starName.toLowerCase(); }) ||
                   cungArray[pos].phuTinhRight.some(function(s) { return s.name.toLowerCase() === starName.toLowerCase(); });
      if (exists) return;

      var baseName = starName.replace(/^L\\./, '');`
  );

  // 2. Fix Văn tinh
  code = code.replace(
    /\/\/ Lưu Niên Văn Tinh[\s\S]*?addStar\(lnVanTinhMap\[canNamIdx\], 'LN Văn tinh', true\);/,
    `// Văn Tinh (Theo Can năm sinh)
    var vanTinhMap = [5, 6, 8, 9, 8, 9, 11, 0, 9, 10];
    addStar(vanTinhMap[canNamIdx], 'Văn tinh', true);`
  );

  // 3. Add full Lưu Niên stars in Section 11
  const targetSec11 = `    // 11. Sao Lưu Niên theo năm xem hạn (L.Thái Tuế, L.Kình Dương, L.Đà La, L.Tang Môn, L.Bạch Hổ, L.Thiên Khốc, L.Thiên Hư, L.Thiên Mã, L.Lộc Tồn)
    var vCanIdx = (vYear + 6) % 10;
    var vChiIdx = (vYear + 8) % 12;
    var vLocTonPos = LOC_TON_POS[vCanIdx];

    addStar(vLocTonPos, 'L.Lộc tồn', true, null, true);
    addStar(vChiIdx, 'L.Thái tuế', false, null, true);
    addStar((vLocTonPos + 1) % 12, 'L.Kình dương', false, null, true);
    addStar((vLocTonPos - 1 + 12) % 12, 'L.Đà la', false, null, true);
    addStar((vChiIdx + 2) % 12, 'L.Tang môn', false, null, true);
    addStar((vChiIdx + 8) % 12, 'L.Bạch hổ', false, null, true);
    addStar((6 - vChiIdx + 120) % 12, 'L.Thiên khốc', false, null, true);
    addStar((6 + vChiIdx) % 12, 'L.Thiên hư', false, null, true);
    addStar(thienMaMap[vChiIdx], 'L.Thiên mã', true, null, true);`;

  const replaceSec11 = `    // 11. Sao Lưu Niên theo năm xem hạn (Đồng bộ 100% tuvi.vn & tracuutuvi.com)
    var vCanIdx = (vYear + 6) % 10;
    var vChiIdx = (vYear + 8) % 12;
    var vLocTonPos = LOC_TON_POS[vCanIdx];

    addStar(vLocTonPos, 'L.Lộc tồn', true, null, true);
    addStar(vChiIdx, 'L.Thái tuế', false, null, true);
    addStar((vLocTonPos + 1) % 12, 'L.Kình dương', false, null, true);
    addStar((vLocTonPos - 1 + 12) % 12, 'L.Đà la', false, null, true);
    addStar((vChiIdx + 2) % 12, 'L.Tang môn', false, null, true);
    addStar((vChiIdx + 8) % 12, 'L.Bạch hổ', false, null, true);
    addStar((6 - vChiIdx + 120) % 12, 'L.Thiên khốc', false, null, true);
    addStar((6 + vChiIdx) % 12, 'L.Thiên hư', false, null, true);
    addStar(thienMaMap[vChiIdx], 'L.Thiên mã', true, null, true);

    // Lưu Khôi, Lưu Việt
    addStar(THIEN_KHOI_POS[vCanIdx], 'L.Thiên khôi', true, null, true);
    addStar(THIEN_VIET_POS[vCanIdx], 'L.Thiên việt', true, null, true);

    // Lưu Đào Hoa, Lưu Hồng Loan, Lưu Kiếp Sát
    addStar(daoHoaMap[vChiIdx], 'L.Đào hoa', true, null, true);
    addStar((15 - vChiIdx) % 12, 'L.Hồng loan', true, null, true);
    addStar(kiepSatMap[vChiIdx], 'L.Kiếp sát', false, null, true);

    // Lưu Văn Xương, Lưu Văn Khúc
    var luuXuongMap = [5, 6, 8, 9, 8, 9, 11, 0, 2, 3];
    var luuKhucMap = [9, 8, 6, 7, 6, 7, 4, 3, 2, 1];
    addStar(luuXuongMap[vCanIdx], 'L.Văn xương', true, null, true);
    addStar(luuKhucMap[vCanIdx], 'L.Văn khúc', true, null, true);

    // Lưu Thiên Đức, Phúc Đức, Long Đức, Nguyệt Đức
    addStar((vChiIdx + 9) % 12, 'L.Thiên đức', true, null, true);
    addStar((vChiIdx + 9) % 12, 'L.Phúc đức', true, null, true);
    addStar((vChiIdx + 7) % 12, 'L.Long đức', true, null, true);
    addStar((vChiIdx + 5) % 12, 'L.Nguyệt đức', true, null, true);

    // Lưu Tứ Hóa năm xem hạn (L.Hóa Lộc, L.Hóa Quyền, L.Hóa Khoa, L.Hóa Kỵ)
    var vTuHoaMap = TU_HOA_TABLE[vCanIdx];
    if (vTuHoaMap) {
      for (var pIdx = 0; pIdx < 12; pIdx++) {
        var allPalaceStars = cungArray[pIdx].chinhTinh.concat(cungArray[pIdx].phuTinhLeft, cungArray[pIdx].phuTinhRight);
        allPalaceStars.forEach(function (st) {
          var cleanSt = st.name.toLowerCase().trim();
          for (var hoaStar in vTuHoaMap) {
            if (hoaStar.toLowerCase().trim() === cleanSt && !st.isLuu) {
              var hoaType = vTuHoaMap[hoaStar];
              var isLeftHoa = (hoaType !== 'Hóa Kỵ');
              addStar(pIdx, 'L.' + hoaType, isLeftHoa, null, true);
            }
          }
        });
      }
    }`;

  if (code.includes(targetSec11)) {
    code = code.replace(targetSec11, replaceSec11);
  } else {
    console.warn('Target Sec 11 not matched exactly in', filePath);
  }

  fs.writeFileSync(filePath, code, 'utf8');
  console.log('Updated', filePath);
}

updateEngineFile('js/tuvi-engine.js');
updateEngineFile('public/js/tuvi-engine.js');

