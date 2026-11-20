const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const LASO_LOGS_FILE = path.join(DATA_DIR, 'laso_logs.json');

function fixVietnameseEncoding(str) {
  if (!str || typeof str !== 'string') return str;
  return str
    .replace(/KhÃ¡ch/g, 'Khách')
    .replace(/Chuyá»ƒn Khoáº£n/g, 'Chuyển Khoản')
    .replace(/Tráº§n CÃ´ng Luyá»‡n/g, 'Trần Công Luyện')
    .replace(/BÃ¡o CÃ¡o/g, 'Báo Cáo')
    .replace(/ToÃ n ThÆ°/g, 'Toàn Thư')
    .replace(/Ä‘/g, 'đ')
    .replace(/GÃ³i Luáº­n 3 Cung Tá»± Chá» n/g, 'Báo Cáo VIP A4 Toàn Thư')
    .replace(/Ä á»“ng bá»™ tá»«/g, 'Đồng bộ từ')
    .replace(/Giao dá»‹ch tháº­t tá»«/g, 'Giao dịch thật từ')
    .replace(/ChuyÃªn SÃ¢u/g, 'Chuyên Sâu');
}

// 1. Chuẩn hóa Đơn hàng
let orders = [];
try { orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8')); } catch (e) {}

// Loại bỏ đơn test TV002000 (2.000đ test kết nối)
orders = orders.filter(o => o.orderCode !== 'TV002000' && o.amount >= 10000);

orders.forEach(o => {
  o.customerName = fixVietnameseEncoding(o.customerName);
  o.packageName = fixVietnameseEncoding(o.packageName);
  if (o.packageName && o.packageName.includes('3 Cung')) {
    o.packageName = 'Báo Cáo VIP A4 Toàn Thư (49.000đ)';
  }
  if (o.amount === 29000 && !o.packageName.includes('29')) {
    o.packageName = 'Báo Cáo VIP Khuyến Mãi (29.000đ)';
  }
  if (o.note) o.note = fixVietnameseEncoding(o.note);
});

fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
console.log('Đã chuẩn hóa orders.json:', orders.length, 'đơn hàng thực tế.');

// 2. Chuẩn hóa Bookings (Loại bỏ mock data test 0912345678)
let bookings = [];
try { bookings = JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf8')); } catch (e) {}
bookings = bookings.filter(b => b.customerPhone !== '0912345678' && b.id !== 'bk_1794538002');
fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf8');
console.log('Đã chuẩn hóa bookings.json:', bookings.length, 'lịch hẹn thực tế.');

// 3. Chuẩn hóa Laso logs (Loại bỏ Tran Van B, Nguyen Van A)
let lasoLogs = [];
try { lasoLogs = JSON.parse(fs.readFileSync(LASO_LOGS_FILE, 'utf8')); } catch (e) {}
lasoLogs = lasoLogs.filter(l => l.hoTen !== 'Tran Van B' && l.hoTen !== 'Nguyen Van A');
fs.writeFileSync(LASO_LOGS_FILE, JSON.stringify(lasoLogs, null, 2), 'utf8');
console.log('Đã chuẩn hóa laso_logs.json:', lasoLogs.length, 'nhật ký thực tế.');

// 4. Chuẩn hóa Analytics
let analytics = {};
try { analytics = JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf8')); } catch (e) {}

// Sửa font palaceClicks
const PALACE_MAP = {
  'PHÃšC Ä á»¨C': 'PHÚC ĐỨC',
  'Ä Iá»€N TRáº CH': 'ĐIỀN TRẠCH',
  'QUAN Lá»˜C': 'QUAN LỘC',
  'NÃ” Bá»˜C': 'NÔ BỘC',
  'PHá»¤ MáºªU': 'PHỤ MẪU',
  'THIÃŠN DI': 'THIÊN DI',
  'Má»†NH': 'MỆNH',
  'Táº¬T Ã CH': 'TẬT ÁCH',
  'HUYNH Ä á»†': 'HUYNH ĐỆ',
  'PHU THÃŠ<THÃ‚N>': 'PHU THÊ <THÂN>',
  'Tá»¬ Tá»¨C': 'TỬ TỨC',
  'TÃ€I Báº CH': 'TÀI BẠCH',
  'PHU THÃŠ': 'PHU THÊ',
  'PHÃšC Ä á»¨C<THÃ‚N>': 'PHÚC ĐỨC <THÂN>'
};

const cleanPalaceClicks = {};
if (analytics.palaceClicks) {
  Object.keys(analytics.palaceClicks).forEach(k => {
    const cleanKey = PALACE_MAP[k] || k;
    cleanPalaceClicks[cleanKey] = (cleanPalaceClicks[cleanKey] || 0) + analytics.palaceClicks[k];
  });
  analytics.palaceClicks = cleanPalaceClicks;
}

// Tính toán lại summary chuẩn xác
const paidOrders = orders.filter(o => o.status === 'PAID');
analytics.summary = analytics.summary || {};
analytics.summary.totalPaidOrders = paidOrders.length;
analytics.summary.totalRevenue = paidOrders.reduce((sum, o) => sum + (o.amount || 0), 0);

fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(analytics, null, 2), 'utf8');
console.log('Đã chuẩn hóa analytics.json: Doanh thu thực tế =', analytics.summary.totalRevenue, 'VNĐ, Tổng đơn =', analytics.summary.totalPaidOrders);
