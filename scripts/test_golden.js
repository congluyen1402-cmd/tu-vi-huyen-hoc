#!/usr/bin/env node
/**
 * Golden Test Suite Runner for Tử Vi Engine
 * Diffs actual vs expected and prints only the first diverging step per case.
 */

const fs = require('fs');
const path = require('path');
const engine = require(path.join(__dirname, '../js/tuvi-engine.js'));

const casesFile = path.join(__dirname, '../tests/golden/cases.json');
const cases = JSON.parse(fs.readFileSync(casesFile, 'utf8'));

console.log('\n================================================================');
console.log('              TỬ VI ENGINE - GOLDEN TEST SUITE');
console.log('================================================================\n');

let passed = 0;
let failed = 0;

cases.forEach((tc, idx) => {
  const input = tc.input;
  let opt = {};

  if (input.calendar === 'solar') {
    const parts = input.solarDate.split('-');
    opt.nam = parseInt(parts[0], 10);
    opt.thang = parseInt(parts[1], 10);
    opt.ngay = parseInt(parts[2], 10);
    opt.isLunar = false;
  } else {
    const parts = (input.lunarDate || '').split('-');
    opt.nam = parseInt(parts[0], 10);
    opt.thang = parseInt(parts[1], 10);
    opt.ngay = parseInt(parts[2], 10);
    opt.isLunar = true;
  }

  const timeParts = (input.time || '00:00').split(':');
  opt.gio = parseInt(timeParts[0], 10);
  opt.phut = parseInt(timeParts[1], 10);
  opt.gioiTinh = input.gioiTinh;

  let chart;
  try {
    chart = engine.lapLaSo(opt);
  } catch (err) {
    console.error(`[FAIL] ${tc.id}: Lỗi thực thi engine -> ${err.message}`);
    failed++;
    return;
  }

  const exp = tc.expected;
  let divergence = null;

  // Check 1: Lunar date
  if (exp.lunar) {
    if (chart.lunarDate.day !== exp.lunar.day || chart.lunarDate.month !== exp.lunar.month || chart.lunarDate.year !== exp.lunar.year) {
      divergence = `Bước 1 (Âm lịch): Thực tế=${chart.lunarDate.day}/${chart.lunarDate.month}/${chart.lunarDate.year} vs Kỳ vọng=${exp.lunar.day}/${exp.lunar.month}/${exp.lunar.year}`;
    }
  }

  // Check 2: Can Chi
  if (!divergence && exp.canChi) {
    if (exp.canChi.nam && chart.canChiNam !== exp.canChi.nam) {
      divergence = `Bước 2 (Can Chi Năm): Thực tế=${chart.canChiNam} vs Kỳ vọng=${exp.canChi.nam}`;
    } else if (exp.canChi.thang && chart.canChiThang !== exp.canChi.thang) {
      divergence = `Bước 2 (Can Chi Tháng): Thực tế=${chart.canChiThang} vs Kỳ vọng=${exp.canChi.thang}`;
    } else if (exp.canChi.ngay && chart.canChiNgay !== exp.canChi.ngay) {
      divergence = `Bước 2 (Can Chi Ngày): Thực tế=${chart.canChiNgay} vs Kỳ vọng=${exp.canChi.ngay}`;
    } else if (exp.canChi.gio && chart.canChiGio !== exp.canChi.gio) {
      divergence = `Bước 2 (Can Chi Giờ): Thực tế=${chart.canChiGio} vs Kỳ vọng=${exp.canChi.gio}`;
    }
  }

  // Check 3: Cuc
  if (!divergence && exp.cuc) {
    if (chart.cucInfo.value !== exp.cuc.value) {
      divergence = `Bước 3 (Ngũ Hành Cục): Thực tế=${chart.cucInfo.name} (${chart.cucInfo.value}) vs Kỳ vọng=${exp.cuc.name} (${exp.cuc.value})`;
    }
  }

  // Check 4: Menh
  if (!divergence && exp.menh) {
    if (chart.cungMenh.chi !== exp.menh) {
      divergence = `Bước 4 (Cung Mệnh): Thực tế=${chart.cungMenh.chi} vs Kỳ vọng=${exp.menh}`;
    }
  }

  // Check 5: Than
  if (!divergence && exp.than) {
    if (chart.cungThan.chi !== exp.than) {
      divergence = `Bước 5 (Cung Thân): Thực tế=${chart.cungThan.chi} vs Kỳ vọng=${exp.than}`;
    }
  }

  // Check 6: Tu Vi
  if (!divergence && exp.tuVi) {
    const tuViChi = engine.DIA_CHI[chart.tuViPos];
    if (tuViChi !== exp.tuVi) {
      divergence = `Bước 6 (Tử Vi): Thực tế=${tuViChi} vs Kỳ vọng=${exp.tuVi}`;
    }
  }

  // Check 7: Thien Phu
  if (!divergence && exp.thienPhu) {
    const thienPhuChi = engine.DIA_CHI[chart.thienPhuPos];
    if (thienPhuChi !== exp.thienPhu) {
      divergence = `Bước 7 (Thiên Phủ): Thực tế=${thienPhuChi} vs Kỳ vọng=${exp.thienPhu}`;
    }
  }

  if (divergence) {
    console.log(`[FAIL] ${tc.id}:`);
    console.log(`       -> LỆCH TẠI: ${divergence}`);
    failed++;
  } else {
    console.log(`[PASS] ${tc.id}: Hoàn toàn chính xác`);
    passed++;
  }
});

console.log('\n----------------------------------------------------------------');
console.log(`TỔNG KẾT: ${passed}/${cases.length} ĐẠT (${failed} lỗi)`);
console.log('----------------------------------------------------------------\n');

if (failed > 0) {
  process.exit(1);
}
