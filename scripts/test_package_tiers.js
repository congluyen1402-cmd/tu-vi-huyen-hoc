/**
 * Test Suite: Gói 49k (3 Cung Tự Chọn) vs Gói 99k (VIP Toàn Thư 12 Cung & Đại Hạn)
 */
const assert = require('assert');

// Mock localStorage and window
const store = {};
global.localStorage = {
  getItem: (k) => store[k] || null,
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; },
  clear: () => { for (const k in store) delete store[k]; }
};
global.sessionStorage = {
  getItem: (k) => store['sess_' + k] || null,
  setItem: (k, v) => { store['sess_' + k] = String(v); },
  removeItem: (k) => { delete store['sess_' + k]; }
};
global.window = {
  location: { origin: 'http://localhost:8080', pathname: '/' },
  addEventListener: () => {}
};
global.document = {
  body: {
    classList: { add: () => {}, remove: () => {} }
  },
  getElementById: () => null,
  querySelectorAll: () => [],
  querySelector: () => null
};

// Load TuViMonetize
require('../js/tuvi-monetize.js');
const Monetize = window.TuViMonetize;

async function runTests() {
  console.log('--- TEST 1: Unpaid Chart ---');
  const chartUnpaid = {
    hoTen: 'Nguyen Van A',
    gioiTinh: 'nam',
    ngay: 15,
    thang: 8,
    nam: 1995,
    gio: 9,
    phut: 30,
    isLunar: false
  };

  assert.strictEqual(Monetize.isChartUnlocked(chartUnpaid), false, 'Unpaid chart must NOT be unlocked');
  assert.strictEqual(Monetize.isChart49k(chartUnpaid), false, 'Unpaid chart is not 49k');
  assert.strictEqual(Monetize.isChart99k(chartUnpaid), false, 'Unpaid chart is not 99k');
  assert.strictEqual(Monetize.isPalaceUnlocked('Mệnh', chartUnpaid), true, 'Mệnh must be free');
  assert.strictEqual(Monetize.isPalaceUnlocked('Phụ Mẫu', chartUnpaid), true, 'Phụ Mẫu must be free');
  assert.strictEqual(Monetize.isPalaceUnlocked('Tài Bạch', chartUnpaid), false, 'Tài Bạch must be locked');
  assert.strictEqual(Monetize.isPalaceUnlocked('Quan Lộc', chartUnpaid), false, 'Quan Lộc must be locked');
  assert.strictEqual(Monetize.isDaiHanUnlocked(chartUnpaid), false, 'Đại Hạn must be locked');
  assert.strictEqual(Monetize.isTamPhuongUnlocked(chartUnpaid), false, 'Tam Phương must be locked');
  console.log('✅ TEST 1 passed: Unpaid chart behaves correctly.');

  console.log('--- TEST 2: Gói 49k (3 Cung Tự Chọn) ---');
  const chart49k = {
    hoTen: 'Tran Thi B',
    gioiTinh: 'nu',
    ngay: 20,
    thang: 3,
    nam: 2002,
    gio: 14,
    phut: 15,
    isLunar: false
  };
  const key49k = Monetize.getChartKey(chart49k);

  // Giả lập kích hoạt đơn 49k
  Monetize.saveUnlockedChart(key49k, {
    orderCode: 'TV490001',
    packageId: 'vip_49k',
    packageName: 'Gói Luận 3 Cung Tự Chọn',
    amount: 49000,
    isTripwire: true,
    is3Cung: true,
    selectedPalaces: []
  });

  assert.strictEqual(Monetize.isChart49k(chart49k), true, 'Chart must be identified as 49k');
  assert.strictEqual(Monetize.isChart99k(chart49k), false, 'Chart 49k is NOT 99k');
  assert.strictEqual(Monetize.isDaiHanUnlocked(chart49k), false, 'Gói 49k KHÔNG CÓ Đại Hạn');
  assert.strictEqual(Monetize.isTamPhuongUnlocked(chart49k), false, 'Gói 49k KHÔNG CÓ Tam Phương Tứ Chính');

  // Mệnh và Phụ Mẫu luôn mở miễn phí
  assert.strictEqual(Monetize.isPalaceUnlocked('Mệnh', chart49k), true);
  assert.strictEqual(Monetize.isPalaceUnlocked('Phụ Mẫu', chart49k), true);

  // Khách chưa chọn cung nào -> các cung còn lại đều khóa
  assert.strictEqual(Monetize.isPalaceUnlocked('Tài Bạch', chart49k), false);
  assert.strictEqual(Monetize.isPalaceUnlocked('Quan Lộc', chart49k), false);

  // Khách chọn cung 1: Tài Bạch
  let res = Monetize.selectPalaceFor49k('Tài Bạch', chart49k);
  assert.strictEqual(res, true, 'Select palace 1 ok');
  assert.deepStrictEqual(Monetize.getSelectedPalaces(chart49k), ['tai-bach']);
  assert.strictEqual(Monetize.isPalaceUnlocked('Tài Bạch', chart49k), true, 'Tài Bạch is now unlocked');
  assert.strictEqual(Monetize.isPalaceUnlocked('Quan Lộc', chart49k), false, 'Quan Lộc is still locked');

  // Khách chọn cung 2: Quan Lộc
  res = Monetize.selectPalaceFor49k('quan-loc', chart49k);
  assert.strictEqual(res, true, 'Select palace 2 ok');
  assert.deepStrictEqual(Monetize.getSelectedPalaces(chart49k), ['tai-bach', 'quan-loc']);
  assert.strictEqual(Monetize.isPalaceUnlocked('Quan Lộc', chart49k), true, 'Quan Lộc is now unlocked');

  // Khách chọn cung 3: Phu Thê
  res = Monetize.selectPalaceFor49k('Phu Thê', chart49k);
  assert.strictEqual(res, true, 'Select palace 3 ok');
  assert.deepStrictEqual(Monetize.getSelectedPalaces(chart49k), ['tai-bach', 'quan-loc', 'phu-the']);
  assert.strictEqual(Monetize.isPalaceUnlocked('Phu Thê', chart49k), true, 'Phu Thê is now unlocked');

  // 7 cung còn lại phải bị KHÓA!
  const remaining7 = ['Điền Trạch', 'Phúc Đức', 'Tử Tức', 'Thiên Di', 'Tật Ách', 'Nô Bộc', 'Huynh Đệ'];
  for (const p of remaining7) {
    assert.strictEqual(Monetize.isPalaceUnlocked(p, chart49k), false, `${p} must be LOCKED in 49k package`);
  }

  // Khách cố chọn cung thứ 4: Điền Trạch -> Phải từ chối vì đã đủ 3 cung!
  res = Monetize.selectPalaceFor49k('Điền Trạch', chart49k);
  assert.strictEqual(res, false, 'Selecting 4th palace must be rejected');
  assert.strictEqual(Monetize.isPalaceUnlocked('Điền Trạch', chart49k), false);

  // Khách bấm bỏ chọn Quan Lộc -> Cho phép và giải phóng 1 slot!
  res = Monetize.selectPalaceFor49k('Quan Lộc', chart49k);
  assert.strictEqual(res, true, 'Deselect Quan Lộc ok');
  assert.deepStrictEqual(Monetize.getSelectedPalaces(chart49k), ['tai-bach', 'phu-the']);
  assert.strictEqual(Monetize.isPalaceUnlocked('Quan Lộc', chart49k), false, 'Quan Lộc is now locked again');

  // Bây giờ khách chọn Điền Trạch thay thế -> OK!
  res = Monetize.selectPalaceFor49k('Điền Trạch', chart49k);
  assert.strictEqual(res, true, 'Select Điền Trạch in freed slot ok');
  assert.deepStrictEqual(Monetize.getSelectedPalaces(chart49k), ['tai-bach', 'phu-the', 'dien-trach']);
  assert.strictEqual(Monetize.isPalaceUnlocked('Điền Trạch', chart49k), true);
  console.log('✅ TEST 2 passed: Gói 49k selects 3 palaces, locks 7 others, handles deselect/reselect, and locks Đại Hạn + Tam Phương.');

  console.log('--- TEST 3: Gói 99k (VIP Toàn Thư) ---');
  const chart99k = {
    hoTen: 'Le Van C',
    gioiTinh: 'nam',
    ngay: 10,
    thang: 10,
    nam: 1990,
    gio: 21,
    phut: 0,
    isLunar: true
  };
  const key99k = Monetize.getChartKey(chart99k);

  // Giả lập kích hoạt đơn 99k
  Monetize.saveUnlockedChart(key99k, {
    orderCode: 'TV990001',
    packageId: 'vip_99k',
    packageName: 'Báo Cáo VIP A4 Toàn Thư (Mở Khóa 12 Cung & Đại Hạn)',
    amount: 99000,
    isTripwire: false,
    is3Cung: false
  });

  assert.strictEqual(Monetize.isChart99k(chart99k), true, 'Chart must be identified as 99k');
  assert.strictEqual(Monetize.isChart49k(chart99k), false, 'Chart 99k is NOT 49k');
  assert.strictEqual(Monetize.isDaiHanUnlocked(chart99k), true, 'Gói 99k MỞ KHÓA toàn bộ Đại Hạn');
  assert.strictEqual(Monetize.isTamPhuongUnlocked(chart99k), true, 'Gói 99k MỞ KHÓA Tam Phương Tứ Chính & Tứ Hóa');

  // Mở khóa TOÀN BỘ 12 CUNG
  const all12 = [
    'Mệnh', 'Phụ Mẫu', 'Phúc Đức', 'Điền Trạch', 'Quan Lộc', 'Nô Bộc',
    'Thiên Di', 'Tật Ách', 'Tài Bạch', 'Tử Tức', 'Phu Thê', 'Huynh Đệ'
  ];
  for (const p of all12) {
    assert.strictEqual(Monetize.isPalaceUnlocked(p, chart99k), true, `${p} must be UNLOCKED in 99k package`);
  }
  console.log('✅ TEST 3 passed: Gói 99k unlocks all 12 palaces, Đại Hạn, and Tam Phương Tứ Chính.');

  console.log('--- TEST 4: Isolation Across Charts ---');
  // Đảm bảo lá số chartUnpaid vẫn hoàn toàn bị khóa!
  assert.strictEqual(Monetize.isPalaceUnlocked('Tài Bạch', chartUnpaid), false);
  assert.strictEqual(Monetize.isPalaceUnlocked('Quan Lộc', chartUnpaid), false);
  assert.strictEqual(Monetize.isDaiHanUnlocked(chartUnpaid), false);

  // Đảm bảo lá số chart49k chỉ mở 3 cung đã chọn, các cung khác vẫn khóa
  assert.strictEqual(Monetize.isPalaceUnlocked('Tử Tức', chart49k), false);
  assert.strictEqual(Monetize.isPalaceUnlocked('Thiên Di', chart49k), false);
  assert.strictEqual(Monetize.isDaiHanUnlocked(chart49k), false);
  console.log('✅ TEST 4 passed: Zero leakage across distinct chart keys.');

  console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
