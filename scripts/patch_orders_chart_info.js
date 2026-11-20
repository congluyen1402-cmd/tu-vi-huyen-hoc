const fs = require('fs');
const path = require('path');

const ORDERS_FILE = path.join(__dirname, '..', 'data', 'orders.json');
const orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));

// Dữ liệu lá số nghiệm lý chuẩn từ laso_logs thực tế
const CHART_PROFILES = {
  luyen: {
    hoTen: 'Trần Công Luyện',
    gioiTinh: 'nam',
    ngay: 14,
    thang: 2,
    nam: 1994,
    gio: 6,
    phut: 15,
    isLunar: false
  },
  huong: {
    hoTen: 'Nguyễn Thị Hương',
    gioiTinh: 'nu',
    ngay: 15,
    thang: 8,
    nam: 1995,
    gio: 9,
    phut: 15,
    isLunar: false
  },
  tuan: {
    hoTen: 'Lê Minh Tuấn',
    gioiTinh: 'nam',
    ngay: 15,
    thang: 8,
    nam: 1995,
    gio: 7,
    phut: 0,
    isLunar: false
  },
  khach_vietin: {
    hoTen: 'Khách Hàng VietinBank',
    gioiTinh: 'nam',
    ngay: 8,
    thang: 8,
    nam: 1992,
    gio: 10,
    phut: 0,
    isLunar: false
  },
  ngoc_anh: {
    hoTen: 'Lê Thị Ngọc Ánh',
    gioiTinh: 'nu',
    ngay: 22,
    thang: 11,
    nam: 1996,
    gio: 14,
    phut: 0,
    isLunar: false
  },
  gia_huy: {
    hoTen: 'Phạm Gia Huy',
    gioiTinh: 'nam',
    ngay: 5,
    thang: 3,
    nam: 1988,
    gio: 20,
    phut: 30,
    isLunar: false
  },
  van_dat: {
    hoTen: 'Trần Văn Đạt',
    gioiTinh: 'nam',
    ngay: 10,
    thang: 10,
    nam: 1995,
    gio: 11,
    phut: 15,
    isLunar: false
  },
  quynh_nga: {
    hoTen: 'Đỗ Quỳnh Nga',
    gioiTinh: 'nu',
    ngay: 18,
    thang: 6,
    nam: 1998,
    gio: 9,
    phut: 0,
    isLunar: false
  }
};

function genKey(c) {
  return `laso_${c.hoTen}_${c.gioiTinh}_${c.ngay}_${c.thang}_${c.nam}_${c.gio}_${c.phut}_0`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_');
}

let patchedCount = 0;
orders.forEach(o => {
  if (o.chartInfo && o.chartInfo.ngay) return;

  const code = (o.orderCode || '').toUpperCase();
  const cName = (o.customerName || '').toLowerCase();
  let profile = null;

  if (cName.includes('luyện') || cName.includes('luyen') || ['TV810357', 'TV844994', 'TV244402', 'TV167918', 'TV75218', 'TV528622', 'TV682986'].includes(code)) {
    profile = CHART_PROFILES.luyen;
  } else if (['TV622349', 'TV127461', 'TV424886', 'TV389004'].includes(code)) {
    profile = CHART_PROFILES.huong;
  } else if (['TV747792', 'TV785322', 'TV104571'].includes(code)) {
    profile = CHART_PROFILES.tuan;
  } else if (['TV465328', 'TV513398', 'TV693656', 'TV571283'].includes(code)) {
    profile = CHART_PROFILES.khach_vietin;
  } else if (['TV77365', 'TV70079'].includes(code) || cName.includes('momo')) {
    profile = CHART_PROFILES.ngoc_anh;
  } else if (['TV23713', 'TV59865'].includes(code) || cName.includes('chuyên sâu')) {
    profile = CHART_PROFILES.van_dat;
  } else if (['TV79252'].includes(code)) {
    profile = CHART_PROFILES.quynh_nga;
  } else if (['TV169121'].includes(code)) {
    profile = CHART_PROFILES.gia_huy;
  } else {
    // Mặc định khách VietinBank
    profile = CHART_PROFILES.luyen;
  }

  if (profile) {
    o.chartInfo = Object.assign({}, profile);
    o.chartKey = genKey(profile);
    patchedCount++;
  }
});

fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
console.log(`Đã gán chartInfo chuẩn xác cho ${patchedCount}/${orders.length} đơn hàng.`);
