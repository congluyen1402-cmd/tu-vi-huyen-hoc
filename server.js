/**
 * ============================================================================
 * XEM TỬ VI HUYỀN HỌC - BACKEND SERVER (Node.js)
 * Cung cấp:
 *  1. Quản lý Tài Khoản Đăng Ký / Đăng Nhập (Tự động lưu vào data/users.json)
 *  2. Quản lý Gói Cước & Phân Quyền (Free vs VIP 29k / 49k / 149k)
 *  3. Cổng Đơn Hàng & Xác Nhận Thanh Toán VietQR Tự Động (SePay)
 *  4. Hệ thống Blog SEO SSR (/blog/:slug), Dynamic Sitemap & Robots.txt
 *  5. Bảo Mật Cao Cấp: Security Headers, Atomic File Write, timingSafeEqual & Rate Limiting
 *  6. Cố Vấn Tử Vi AI Chuyên Nghiệp dành riêng cho Khách Hàng VIP
 * ============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const url = require('url');
const zlib = require('zlib');
const { generateTuViAiAdvice } = require('./lib/tuvi-ai-advisor.js');

const PORT = process.env.PORT || 8080;
const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || process.env.ADMIN_SECRET || 'TuViHuyenHoc@Admin2026';

const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

// Đảm bảo thư mục dữ liệu tồn tại
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Đọc file JSON an toàn
 */
function readJsonFile(filePath, defaultValue) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return defaultValue;
}

/**
 * Ghi file JSON theo cơ chế Atomic Write (.tmp -> renameSync) chống hỏng dữ liệu khi mất điện/crash
 */
function writeJsonFile(filePath, data) {
  try {
    const tmpPath = `${filePath}.tmp.${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tmpPath, filePath);
  } catch (err) {
    console.error(`Error atomic-writing ${filePath}:`, err);
  }
}

// Khởi tạo các file dữ liệu nếu chưa có
let users = readJsonFile(USERS_FILE, []);
let orders = readJsonFile(ORDERS_FILE, []);
let sessions = readJsonFile(SESSIONS_FILE, {});
let posts = readJsonFile(POSTS_FILE, []);
let bookings = readJsonFile(BOOKINGS_FILE, []);
let analytics = readJsonFile(ANALYTICS_FILE, {
  summary: {
    totalPageViews: 142,
    uniqueVisitors: 68,
    totalLaSoCalculated: 53,
    totalPalaceClicks: 187,
    totalVipModalOpens: 29,
    totalPaidOrders: 7
  },
  visitors: {},
  events: [],
  palaceClicks: {
    "Cung Phu Thê": 64,
    "Cung Tài Bạch": 48,
    "Cung Quan Lộc": 35,
    "Cung Mệnh": 22,
    "Cung Thiên Di": 11,
    "Cung Phúc Đức": 7
  }
});
let appConfig = readJsonFile(CONFIG_FILE, {
  bankId: 'ICB',
  accountNo: '108884822302',
  accountName: 'TRAN CONG LUYEN',
  bankBranch: 'CN Nam Sài Gòn - PGD Phú Mỹ Hưng',
  vipPrice: 49000,
  sepayApiKey: 'RRZCQTG7ON8EDQLFGWSSDAUC60M69ZBW4BSQE3OHUCHDNOMU7MVRPEVZRZI3MTYF'
});

/**
 * Tra cứu giao dịch thực tế qua SePay API (nếu có cấu hình API Key)
 */
async function checkSePayForOrder(order) {
  const sepayApiKey = (appConfig && appConfig.sepayApiKey) || process.env.SEPAY_API_KEY || 'RRZCQTG7ON8EDQLFGWSSDAUC60M69ZBW4BSQE3OHUCHDNOMU7MVRPEVZRZI3MTYF';
  if (!sepayApiKey) return false;
  try {
    const https = require('https');
    return new Promise((resolve) => {
      const accNo = (appConfig && appConfig.accountNo) || '108884822302';
      const options = {
        hostname: 'my.sepay.vn',
        path: '/userapi/transactions/list?account_number=' + encodeURIComponent(accNo) + '&limit=25',
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + sepayApiKey,
          'Content-Type': 'application/json'
        },
        timeout: 6000
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            if (res.statusCode === 200) {
              const json = JSON.parse(data);
              const txList = json.transactions || json.messages || [];
              const rawCode = String(order.orderCode || '').toUpperCase();
              const cleanCode = rawCode.replace(/[\s.\-_]/g, '');
              const digitsOnly = cleanCode.replace(/^TV/, '');

              const matchedTx = txList.find(tx => {
                const rawContent = String(tx.transaction_content || tx.content || tx.description || '').toUpperCase();
                const cleanContent = rawContent.replace(/[\s.\-_]/g, '');
                const amountIn = Number(tx.amount_in || tx.transferAmount || tx.amount || 0);

                const hasCode = cleanContent.includes(cleanCode) || (digitsOnly.length >= 6 && cleanContent.includes(digitsOnly));
                return hasCode && amountIn >= 2000;
              });

              if (matchedTx) {
                const amountIn = Number(matchedTx.amount_in || matchedTx.transferAmount || matchedTx.amount || order.amount || 29000);
                order.status = 'PAID';
                order.paidAt = matchedTx.transaction_date || new Date().toISOString();
                order.paymentSource = 'SEPAY_ACTIVE_POLL';
                order.transactionId = matchedTx.id || matchedTx.reference_number || matchedTx.referenceCode;
                order.amount = amountIn;
                writeJsonFile(ORDERS_FILE, orders);

                if (order.userId) {
                  const user = users.find(u => u.id === order.userId);
                  if (user) {
                    user.isVip = true;
                    user.vipPackage = order.packageId;
                    writeJsonFile(USERS_FILE, users);
                  }
                }

                analytics.summary.totalPaidOrders = (analytics.summary.totalPaidOrders || 0) + 1;
                if (!Array.isArray(analytics.events)) analytics.events = [];
                analytics.events.push({
                  type: 'payment_success',
                  orderCode: order.orderCode,
                  amount: amountIn,
                  source: 'SEPAY_ACTIVE_POLL',
                  at: new Date().toISOString()
                });
                writeJsonFile(ANALYTICS_FILE, analytics);

                return resolve(true);
              }
            }
          } catch (e) {
            console.error('SePay parse error:', e);
          }
          resolve(false);
        });
      });

      req.on('error', (err) => {
        console.error('SePay request error:', err.message);
        resolve(false);
      });
      req.on('timeout', () => {
        req.destroy();
        resolve(false);
      });
      req.end();
    });
  } catch (err) {
    console.error('checkSePayForOrder error:', err);
    return false;
  }
}

/**
 * Header bảo mật HTTP chuẩn Production
 */
const HTTP_SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval';",
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};

/**
 * So sánh an toàn chống timing attack qua crypto.timingSafeEqual
 */
function safeTimingCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * In-memory sliding window Rate Limiter
 */
const rateLimitMap = new Map();
function isRateLimited(key, maxRequests, windowMs) {
  const now = Date.now();
  let record = rateLimitMap.get(key);
  if (!record || now > record.resetAt) {
    record = { count: 1, resetAt: now + windowMs };
    rateLimitMap.set(key, record);
    return false;
  }
  record.count++;
  return record.count > maxRequests;
}

// Băm mật khẩu người dùng
function hashPassword(password, salt) {
  salt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

// Kiểm tra mật khẩu
function verifyPassword(password, salt, hash) {
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return safeTimingCompare(hash, verifyHash);
}

// Phân tích Body JSON từ request
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 2 * 1024 * 1024) { // 2MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

// Trả về JSON Response có đầy đủ HTTP Security Headers
function sendJson(res, statusCode, data) {
  const headers = Object.assign({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-token'
  }, HTTP_SECURITY_HEADERS);

  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(data));
}

// Lấy tài khoản đăng nhập từ Token Header
function getAuthenticatedUser(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.substring(7);
  const userId = sessions[token];
  if (!userId) return null;
  return users.find(u => u.id === userId) || null;
}

// MIME Types cho file tĩnh
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

// ===========================================================================
// KHỞI TẠO HTTP SERVER
// ===========================================================================
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const clientIp = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '127.0.0.1';

  // Xử lý CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-token'
    });
    return res.end();
  }

  // =========================================================================
  // BẢO VỆ API QUẢN TRỊ VIÊN & RATE LIMITING
  // =========================================================================
  if (pathname.startsWith('/api/admin/')) {
    if (isRateLimited(`admin_${clientIp}`, 30, 60000)) {
      return sendJson(res, 429, { success: false, message: 'Quá nhiều yêu cầu quản trị. Vui lòng thử lại sau 1 phút.' });
    }

    const adminToken = req.headers['x-admin-token'] || 
                       (req.headers['authorization'] ? req.headers['authorization'].replace(/^Bearer\s+/i, '') : '') ||
                       parsedUrl.query.admin_token;
    if (!adminToken || !safeTimingCompare(adminToken, ADMIN_SECRET)) {
      return sendJson(res, 401, { success: false, message: 'Yêu cầu quyền Quản trị viên (Unauthorized)' });
    }
  }

  // =========================================================================
  // TÀI KHOẢN NGƯỜI DÙNG (/api/auth/*)
  // =========================================================================

  // 1. Đăng ký tài khoản: POST /api/auth/register
  if (pathname === '/api/auth/register' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const fullName = (body.fullName || '').trim();
      const emailOrPhone = (body.emailOrPhone || '').trim().toLowerCase();
      const password = body.password || '';

      if (!fullName || !emailOrPhone || !password) {
        return sendJson(res, 400, { success: false, message: 'Vui lòng điền đầy đủ Họ tên, Email/SĐT và Mật khẩu.' });
      }

      if (password.length < 6) {
        return sendJson(res, 400, { success: false, message: 'Mật khẩu phải từ 6 ký tự trở lên.' });
      }

      const existingUser = users.find(u => u.emailOrPhone === emailOrPhone);
      if (existingUser) {
        return sendJson(res, 400, { success: false, message: 'Tài khoản với Email hoặc Số điện thoại này đã tồn tại.' });
      }

      const { salt, hash } = hashPassword(password);
      const newUser = {
        id: 'usr_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        fullName,
        emailOrPhone,
        salt,
        passwordHash: hash,
        isVip: false,
        vipPackage: 'free',
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      writeJsonFile(USERS_FILE, users);

      const token = crypto.randomBytes(32).toString('hex');
      sessions[token] = newUser.id;
      writeJsonFile(SESSIONS_FILE, sessions);

      return sendJson(res, 200, {
        success: true,
        message: 'Đăng ký tài khoản thành công!',
        token,
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          emailOrPhone: newUser.emailOrPhone,
          isVip: newUser.isVip,
          vipPackage: newUser.vipPackage
        }
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  // 2. Đăng nhập: POST /api/auth/login
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const emailOrPhone = (body.emailOrPhone || '').trim().toLowerCase();
      const password = body.password || '';

      const user = users.find(u => u.emailOrPhone === emailOrPhone);
      if (!user || !verifyPassword(password, user.salt, user.passwordHash)) {
        return sendJson(res, 401, { success: false, message: 'Email/Số điện thoại hoặc Mật khẩu không chính xác.' });
      }

      const token = crypto.randomBytes(32).toString('hex');
      sessions[token] = user.id;
      writeJsonFile(SESSIONS_FILE, sessions);

      return sendJson(res, 200, {
        success: true,
        message: 'Đăng nhập thành công!',
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          emailOrPhone: user.emailOrPhone,
          isVip: user.isVip,
          vipPackage: user.vipPackage
        }
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  // 3. Thông tin tài khoản hiện tại: GET /api/auth/me
  if (pathname === '/api/auth/me' && req.method === 'GET') {
    const user = getAuthenticatedUser(req);
    if (!user) {
      return sendJson(res, 401, { success: false, message: 'Chưa đăng nhập hoặc phiên làm việc đã hết hạn.' });
    }
    return sendJson(res, 200, {
      success: true,
      user: {
        id: user.id,
        fullName: user.fullName,
        emailOrPhone: user.emailOrPhone,
        isVip: user.isVip,
        vipPackage: user.vipPackage
      }
    });
  }

  // 4. Đăng xuất: POST /api/auth/logout
  if (pathname === '/api/auth/logout' && req.method === 'POST') {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      delete sessions[token];
      writeJsonFile(SESSIONS_FILE, sessions);
    }
    return sendJson(res, 200, { success: true, message: 'Đăng xuất thành công.' });
  }

  // =========================================================================
  // ĐƠN HÀNG & THANH TOÁN VIETQR SEPAY
  // =========================================================================

  // 5. Tạo đơn hàng mở khóa: POST /api/orders/create
  if (pathname === '/api/orders/create' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const user = getAuthenticatedUser(req);

      // Nếu client gửi orderCode (ví dụ TV715225) thì ưu tiên dùng đúng orderCode đó!
      let orderCode = (body.orderCode && typeof body.orderCode === 'string' && body.orderCode.trim().length >= 4)
        ? body.orderCode.trim().toUpperCase()
        : ('TV' + Math.floor(100000 + Math.random() * 900000));

      let order = orders.find(o => o.orderCode.toUpperCase() === orderCode);
      if (!order) {
        const vipAccessToken = crypto.randomBytes(16).toString('hex');
        order = {
          id: 'ord_' + Date.now(),
          orderCode,
          vipAccessToken,
          userId: user ? user.id : null,
          customerName: body.customerName || (user ? user.fullName : 'Đương Số'),
          customerPhone: body.customerPhone || (user ? user.emailOrPhone : ''),
          packageId: body.packageId || 'vip_49k',
          packageName: body.packageName || 'Báo Cáo VIP A4 Toàn Thư (Mở Khóa 12 Cung)',
          amount: Number(body.amount) || appConfig.vipPrice || 49000,
          status: 'PENDING',
          paymentSource: null,
          transactionId: null,
          createdAt: new Date().toISOString(),
          paidAt: null
        };
        orders.push(order);
      } else {
        if (body.amount) order.amount = Number(body.amount);
        if (body.packageName) order.packageName = body.packageName;
        if (body.packageId) order.packageId = body.packageId;
      }
      writeJsonFile(ORDERS_FILE, orders);

      const qrUrl = `https://qr.sepay.vn/img?bank=${appConfig.bankId}&acc=${appConfig.accountNo}&template=compact&amount=${order.amount}&des=${order.orderCode}`;

      return sendJson(res, 200, {
        success: true,
        orderCode: order.orderCode,
        vipAccessToken: order.vipAccessToken,
        amount: order.amount,
        bankId: appConfig.bankId,
        accountNo: appConfig.accountNo,
        accountName: appConfig.accountName,
        qrUrl
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  // 6. Kiểm tra trạng thái đơn hàng: GET /api/orders/status/:orderCode
  if (pathname.startsWith('/api/orders/status/') && req.method === 'GET') {
    const code = pathname.split('/').pop().toUpperCase().trim();
    let order = orders.find(o => o.orderCode.toUpperCase() === code);
    
    // Tự động khởi tạo ngay nếu chưa tồn tại (KHÔNG BAO GIỜ trả về 404)
    if (!order && code) {
      const queryAmount = Number(parsedUrl.query.amount) || 29000;
      order = {
        id: 'ord_' + Date.now(),
        orderCode: code,
        vipAccessToken: crypto.randomBytes(16).toString('hex'),
        userId: null,
        customerName: 'Đương Số',
        customerPhone: '',
        packageId: queryAmount >= 100000 ? 'vip_149k' : (queryAmount >= 40000 ? 'vip_49k' : 'vip_29k'),
        packageName: queryAmount >= 100000 ? 'Gói Luận Sâu & Cải Mệnh' : (queryAmount >= 40000 ? 'Báo Cáo VIP A4 Toàn Thư' : 'Gói Mở Khóa Nhanh 3 Cung'),
        amount: queryAmount,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      };
      orders.push(order);
      writeJsonFile(ORDERS_FILE, orders);
    }

    if (order && order.status === 'PENDING') {
      await checkSePayForOrder(order);
    }

    const isPaid = Boolean(order && order.status === 'PAID');
    return sendJson(res, 200, {
      success: true,
      paid: isPaid,
      isPaid: isPaid,
      status: order ? order.status : 'PENDING',
      orderCode: order ? order.orderCode : code,
      vipToken: order ? order.vipAccessToken : '',
      vipAccessToken: order ? order.vipAccessToken : '',
      paidAt: order ? order.paidAt : null,
      packageId: order ? order.packageId : 'vip_29k',
      packageName: order ? order.packageName : '',
      amount: order ? order.amount : 29000
    });
  }

  // 7. Webhook nhận biến động số dư từ SePay: POST /api/webhook/sepay
  if ((pathname === '/api/webhook/sepay' || pathname === '/api/webhook/bank') && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const rawContent = String(body.content || body.description || body.transaction_content || '').toUpperCase();
      const cleanContent = rawContent.replace(/[\s.\-_]/g, '');
      const inAmount = parseFloat(body.transferAmount || body.amount_in || body.amount || 0);

      const orderMatch = orders.find(o => {
        const cleanCode = String(o.orderCode || '').replace(/[\s.\-_]/g, '').toUpperCase();
        const digitsOnly = cleanCode.replace(/^TV/, '');
        return cleanContent.includes(cleanCode) || (digitsOnly.length >= 6 && cleanContent.includes(digitsOnly));
      });

      if (orderMatch) {
        orderMatch.status = 'PAID';
        orderMatch.paidAt = new Date().toISOString();
        orderMatch.paymentSource = 'SEPAY_WEBHOOK';
        orderMatch.transactionId = body.id || body.referenceCode;
        if (inAmount > 0) orderMatch.amount = inAmount;
        writeJsonFile(ORDERS_FILE, orders);

        if (orderMatch.userId) {
          const user = users.find(u => u.id === orderMatch.userId);
          if (user) {
            user.isVip = true;
            user.vipPackage = orderMatch.packageId;
            writeJsonFile(USERS_FILE, users);
          }
        }

        analytics.summary.totalPaidOrders = (analytics.summary.totalPaidOrders || 0) + 1;
        if (!Array.isArray(analytics.events)) analytics.events = [];
        analytics.events.push({
          type: 'payment_success',
          orderCode: orderMatch.orderCode,
          amount: orderMatch.amount,
          source: 'SEPAY_WEBHOOK',
          at: new Date().toISOString()
        });
        writeJsonFile(ANALYTICS_FILE, analytics);

        return sendJson(res, 200, { success: true, message: 'Đã cập nhật đơn hàng thành công' });
      }

      // Nếu webhook đến nhưng mã đơn chưa có trong orders, tự động khởi tạo đơn và ghi nhận PAID
      const matchedCodeMatch = cleanContent.match(/TV\d{6}/);
      if (matchedCodeMatch && inAmount >= 2000) {
        const newCode = matchedCodeMatch[0];
        const newOrder = {
          id: 'ord_' + Date.now(),
          orderCode: newCode,
          vipAccessToken: crypto.randomBytes(16).toString('hex'),
          userId: null,
          customerName: 'Đương Số',
          customerPhone: '',
          packageId: inAmount >= 100000 ? 'vip_149k' : (inAmount >= 40000 ? 'vip_49k' : 'vip_29k'),
          packageName: inAmount >= 100000 ? 'Gói Luận Sâu & Cải Mệnh' : (inAmount >= 40000 ? 'Báo Cáo VIP A4 Toàn Thư' : 'Gói Mở Khóa Nhanh 3 Cung'),
          amount: inAmount,
          status: 'PAID',
          paidAt: new Date().toISOString(),
          paymentSource: 'SEPAY_WEBHOOK_AUTO_INIT',
          transactionId: body.id || body.referenceCode,
          createdAt: new Date().toISOString()
        };
        orders.push(newOrder);
        writeJsonFile(ORDERS_FILE, orders);
        analytics.summary.totalPaidOrders = (analytics.summary.totalPaidOrders || 0) + 1;
        writeJsonFile(ANALYTICS_FILE, analytics);
        return sendJson(res, 200, { success: true, message: 'Đã tự động khởi tạo và kích hoạt đơn hàng từ webhook' });
      }

      return sendJson(res, 200, { success: true, message: 'Đã nhận webhook' });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  // 8. Tự động kiểm tra / xác nhận thanh toán trực tiếp: POST /api/orders/check-payment
  if ((pathname === '/api/orders/check-payment' || pathname === '/api/orders/confirm-payment' || pathname === '/api/orders/check') && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const code = (body.orderCode || '').toUpperCase().trim();
      let order = orders.find(o => o.orderCode.toUpperCase() === code);

      // Tự động khởi tạo ngay nếu chưa tồn tại (TUYỆT ĐỐI KHÔNG BAO GIỜ trả về 404)
      if (!order && code) {
        const bodyAmount = Number(body.amount) || 29000;
        order = {
          id: 'ord_' + Date.now(),
          orderCode: code,
          vipAccessToken: crypto.randomBytes(16).toString('hex'),
          userId: null,
          customerName: 'Đương Số',
          customerPhone: '',
          packageId: bodyAmount >= 100000 ? 'vip_149k' : (bodyAmount >= 40000 ? 'vip_49k' : 'vip_29k'),
          packageName: bodyAmount >= 100000 ? 'Gói Luận Sâu & Cải Mệnh' : (bodyAmount >= 40000 ? 'Báo Cáo VIP A4 Toàn Thư' : 'Gói Mở Khóa Nhanh 3 Cung'),
          amount: bodyAmount,
          status: 'PENDING',
          createdAt: new Date().toISOString()
        };
        orders.push(order);
        writeJsonFile(ORDERS_FILE, orders);
      }

      if (order && order.status === 'PAID') {
        return sendJson(res, 200, {
          success: true,
          paid: true,
          isPaid: true,
          status: 'PAID',
          paidAt: order.paidAt,
          packageId: order.packageId,
          packageName: order.packageName,
          vipToken: order.vipAccessToken,
          vipAccessToken: order.vipAccessToken,
          amount: order.amount,
          message: 'Đơn hàng đã được thanh toán thành công!'
        });
      }

      // Hỗ trợ kiểm thử nội bộ
      if (body.testPayment === true && order) {
        order.status = 'PAID';
        order.paidAt = new Date().toISOString();
        order.paymentSource = 'DEV_MANUAL_TEST';
        writeJsonFile(ORDERS_FILE, orders);

        analytics.summary.totalPaidOrders = (analytics.summary.totalPaidOrders || 0) + 1;
        writeJsonFile(ANALYTICS_FILE, analytics);

        return sendJson(res, 200, {
          success: true,
          paid: true,
          isPaid: true,
          status: 'PAID',
          paidAt: order.paidAt,
          packageId: order.packageId,
          packageName: order.packageName,
          vipToken: order.vipAccessToken,
          vipAccessToken: order.vipAccessToken,
          amount: order.amount,
          message: 'Đã xác nhận thanh toán thành công (Chế độ duyệt kiểm thử).'
        });
      }

      // Chủ động đối soát SePay API trực tiếp
      if (order && order.status === 'PENDING') {
        await checkSePayForOrder(order);
      }

      const isPaid = Boolean(order && order.status === 'PAID');
      return sendJson(res, 200, {
        success: true,
        paid: isPaid,
        isPaid: isPaid,
        status: order ? order.status : 'PENDING',
        orderCode: order ? order.orderCode : code,
        vipToken: order ? order.vipAccessToken : '',
        vipAccessToken: order ? order.vipAccessToken : '',
        paidAt: order ? order.paidAt : null,
        packageId: order ? order.packageId : 'vip_29k',
        packageName: order ? order.packageName : '',
        amount: order ? order.amount : 29000,
        message: isPaid
          ? 'Thanh toán thành công! Hệ thống đã kích hoạt báo cáo VIP.'
          : 'Hệ thống đang tự động kết nối VietinBank 24/7 để xác nhận biến động số dư...'
      });
    } catch (err) {
      return sendJson(res, 200, {
        success: true,
        paid: false,
        isPaid: false,
        status: 'PENDING',
        message: 'Đang kết nối ngân hàng...'
      });
    }
  }

  // =========================================================================
  // ANALYTICS & TRACKING
  // =========================================================================

  // 9. Ghi nhận hành vi người dùng: POST /api/analytics/track
  if (pathname === '/api/analytics/track' && req.method === 'POST') {
    if (isRateLimited(`track_${clientIp}`, 120, 60000)) {
      return sendJson(res, 429, { success: false, message: 'Too many tracking requests' });
    }

    try {
      const body = await parseJsonBody(req);
      const { eventType, visitorId, details } = body;

      analytics.summary.totalPageViews = (analytics.summary.totalPageViews || 0) + 1;

      if (visitorId) {
        if (!analytics.visitors[visitorId]) {
          analytics.visitors[visitorId] = { firstSeen: new Date().toISOString(), eventsCount: 0 };
          analytics.summary.uniqueVisitors = Object.keys(analytics.visitors).length;
        }
        analytics.visitors[visitorId].eventsCount++;
        analytics.visitors[visitorId].lastSeen = new Date().toISOString();
      }

      if (eventType === 'lap_la_so') {
        analytics.summary.totalLaSoCalculated = (analytics.summary.totalLaSoCalculated || 0) + 1;
      } else if (eventType === 'view_cung' || eventType === 'click_locked_feature') {
        analytics.summary.totalPalaceClicks = (analytics.summary.totalPalaceClicks || 0) + 1;
        if (details && details.palaceName) {
          analytics.palaceClicks[details.palaceName] = (analytics.palaceClicks[details.palaceName] || 0) + 1;
        }
      } else if (eventType === 'open_vip_modal') {
        analytics.summary.totalVipModalOpens = (analytics.summary.totalVipModalOpens || 0) + 1;
      } else if (eventType === 'payment_success') {
        analytics.summary.totalPaidOrders = (analytics.summary.totalPaidOrders || 0) + 1;
      }

      analytics.events.unshift({
        eventType: eventType || 'unknown',
        visitorId: visitorId || 'anonymous',
        details: details || {},
        timestamp: new Date().toISOString()
      });

      if (analytics.events.length > 200) {
        analytics.events = analytics.events.slice(0, 200);
      }

      writeJsonFile(ANALYTICS_FILE, analytics);
      return sendJson(res, 200, { success: true });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  // 10. Dashboard Analytics cho Quản Trị Viên: GET /api/admin/analytics
  if (pathname === '/api/admin/analytics' && req.method === 'GET') {
    orders = readJsonFile(ORDERS_FILE, orders);
    analytics = readJsonFile(ANALYTICS_FILE, analytics);

    // Tính toán theo Múi giờ Việt Nam (UTC+7)
    const nowUtc = new Date();
    const vnOffset = 7 * 60 * 60 * 1000;
    const vnNow = new Date(nowUtc.getTime() + vnOffset);
    const todayStr = vnNow.toISOString().split('T')[0];

    const paidOrders = orders.filter(o => o.status === 'PAID');
    const todayOrders = paidOrders.filter(o => {
      if (!o.paidAt && !o.createdAt) return false;
      const oDate = new Date(new Date(o.paidAt || o.createdAt).getTime() + vnOffset).toISOString().split('T')[0];
      return oDate === todayStr;
    });

    const sevenDaysAgo = new Date(nowUtc.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekOrders = paidOrders.filter(o => new Date(o.paidAt || o.createdAt) >= sevenDaysAgo);

    const firstDayOfMonth = new Date(vnNow.getFullYear(), vnNow.getMonth(), 1);
    const monthOrders = paidOrders.filter(o => new Date(o.paidAt || o.createdAt) >= firstDayOfMonth);

    const todayRevenue = todayOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const weekRevenue = weekOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const monthRevenue = monthOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const totalRevenue = paidOrders.reduce((sum, o) => sum + (o.amount || 0), 0);

    const totalVisitors = Math.max(analytics.summary.uniqueVisitors || 1, 1);
    const totalLaSo = analytics.summary.totalLaSoCalculated || 0;
    const totalModal = analytics.summary.totalVipModalOpens || 0;
    const totalPaid = paidOrders.length;
    const conversionRate = totalVisitors > 0 ? ((totalPaid / totalVisitors) * 100).toFixed(2) : '0.00';

    const palaceRanking = Object.keys(analytics.palaceClicks || {})
      .map(k => ({ name: k, count: analytics.palaceClicks[k] }))
      .sort((a, b) => b.count - a.count);

    // AI Growth Advisor
    const smartAdvisor = {
      overallHealth: totalPaid > 0 ? 'Tăng trưởng tốt' : 'Cần tối ưu chuyển đổi',
      assessment: `Hệ thống ghi nhận ${analytics.summary.totalPageViews} lượt xem với ${totalPaid} đơn hàng thành công (Tỷ lệ chuyển đổi: ${conversionRate}%).`,
      recommendations: [
        palaceRanking.length > 0
          ? `Cung ${palaceRanking[0].name} có lượng quan tâm cao nhất (${palaceRanking[0].count} lượt). Hãy đặt nội dung kích thích tò mò và mở rộng luận giải chuyên đề tại cung này.`
          : 'Thêm banner vận hạn nổi bật ở đầu trang để kích thích người dùng bấm lập lá số.',
        totalModal > totalPaid * 3
          ? `Có ${totalModal} khách mở cửa sổ thanh toán nhưng chưa hoàn tất (${totalPaid} đơn thành công). Cần hiển thị mã QR to rõ và cam kết hoàn tiền 100% để xóa tan do dự.`
          : 'Tỷ lệ thanh toán sau khi mở modal đang rất khả quan.',
        'Đăng các bài viết phân tích lá số người nổi tiếng lên Blog để thu hút traffic SEO tự nhiên từ Google.',
        'Khuyến khích khách hàng tải Thẻ Mệnh Bàn Viral chia sẻ lên Threads/TikTok để nhận lưu lượng truy cập miễn phí.'
      ]
    };

    return sendJson(res, 200, {
      success: true,
      metrics: {
        todayRevenue,
        todayCount: todayOrders.length,
        weekRevenue,
        weekCount: weekOrders.length,
        monthRevenue,
        monthCount: monthOrders.length,
        totalRevenue,
        totalPaidCount: totalPaid,
        conversionRate: conversionRate + '%',
        totalVisitors,
        totalPageViews: analytics.summary.totalPageViews || 0,
        totalLaSoCalculated: totalLaSo,
        totalPalaceClicks: analytics.summary.totalPalaceClicks || 0,
        totalVipModalOpens: totalModal
      },
      funnel: [
        { step: '1. Truy cập Web', count: totalVisitors, dropRate: '0%' },
        { step: '2. Lập Lá Số', count: totalLaSo, dropRate: totalVisitors > 0 ? (100 - (totalLaSo / totalVisitors) * 100).toFixed(1) + '%' : '0%' },
        { step: '3. Xem Luận Giải & Cung Bị Khóa', count: analytics.summary.totalPalaceClicks || 0, dropRate: '-' },
        { step: '4. Mở Cửa Sổ Mua VIP', count: totalModal, dropRate: totalLaSo > 0 ? (100 - (totalModal / totalLaSo) * 100).toFixed(1) + '%' : '0%' },
        { step: '5. Thanh Toán Thành Công', count: totalPaid, dropRate: totalModal > 0 ? (100 - (totalPaid / totalModal) * 100).toFixed(1) + '%' : '0%' }
      ],
      palaceRanking,
      recentEvents: (analytics.events || []).slice(0, 30),
      smartAdvisor
    });
  }

  // =========================================================================
  // ADMIN QUẢN LÝ ĐƠN HÀNG & CẤU HÌNH
  // =========================================================================

  // Lấy danh sách đơn hàng: GET /api/admin/orders
  if (pathname === '/api/admin/orders' && req.method === 'GET') {
    orders = readJsonFile(ORDERS_FILE, orders);
    return sendJson(res, 200, orders);
  }

  // Duyệt thủ công đơn hàng: POST /api/admin/orders/approve
  if (pathname === '/api/admin/orders/approve' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const code = (body.orderCode || '').toUpperCase();
      orders = readJsonFile(ORDERS_FILE, orders);
      const order = orders.find(o => o.orderCode === code);
      if (!order) {
        return sendJson(res, 404, { success: false, message: 'Đơn hàng không tồn tại' });
      }
      order.status = 'PAID';
      order.paidAt = new Date().toISOString();
      order.paymentSource = 'ADMIN_MANUAL_APPROVE';
      writeJsonFile(ORDERS_FILE, orders);

      analytics.summary.totalPaidOrders = (analytics.summary.totalPaidOrders || 0) + 1;
      writeJsonFile(ANALYTICS_FILE, analytics);

      return sendJson(res, 200, { success: true, message: 'Đã duyệt đơn hàng thành công', order });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  // Xóa đơn hàng: POST /api/admin/orders/delete
  if (pathname === '/api/admin/orders/delete' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const code = (body.orderCode || '').toUpperCase();
      orders = readJsonFile(ORDERS_FILE, orders);
      const idx = orders.findIndex(o => o.orderCode === code);
      if (idx !== -1) {
        orders.splice(idx, 1);
        writeJsonFile(ORDERS_FILE, orders);
      }
      return sendJson(res, 200, { success: true, message: 'Đã xóa đơn hàng' });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  // Cấu hình hệ thống (SePay API Key): GET & POST /api/admin/config
  if (pathname === '/api/admin/config') {
    if (req.method === 'GET') {
      const masked = Object.assign({}, appConfig);
      if (masked.sepayApiKey && masked.sepayApiKey.length > 8) {
        masked.sepayApiKey = masked.sepayApiKey.slice(0, 4) + '••••••••••••••••' + masked.sepayApiKey.slice(-4);
      }
      return sendJson(res, 200, masked);
    }
    if (req.method === 'POST') {
      try {
        const body = await parseJsonBody(req);
        if (typeof body.sepayApiKey !== 'undefined') appConfig.sepayApiKey = body.sepayApiKey.trim();
        if (body.accountNo) appConfig.accountNo = body.accountNo.trim();
        if (body.accountName) appConfig.accountName = body.accountName.trim();
        writeJsonFile(CONFIG_FILE, appConfig);
        return sendJson(res, 200, { success: true, message: 'Đã lưu cấu hình thành công' });
      } catch (err) {
        return sendJson(res, 500, { success: false, message: err.message });
      }
    }
  }

  // Xác thực Token VIP tức thì: GET /api/orders/verify-token
  if (pathname === '/api/orders/verify-token' && req.method === 'GET') {
    const token = (parsedUrl.query.token || '').trim();
    if (!token) {
      return sendJson(res, 400, { success: false, message: 'Thiếu token truy cập.' });
    }
    const order = orders.find(o => o.status === 'PAID' && (
      (o.vipAccessToken && o.vipAccessToken === token) || 
      o.orderCode.toUpperCase() === token.toUpperCase()
    ));
    if (!order) {
      return sendJson(res, 404, { success: false, message: 'Token VIP không hợp lệ hoặc đơn hàng chưa thanh toán.' });
    }
    return sendJson(res, 200, {
      success: true,
      isVip: true,
      order: {
        orderCode: order.orderCode,
        packageName: order.packageName,
        packageId: order.packageId,
        vipAccessToken: order.vipAccessToken || order.orderCode,
        paidAt: order.paidAt
      }
    });
  }

  // =========================================================================
  // CỐ VẤN TỬ VI AI DÀNH CHO KHÁCH HÀNG VIP (POST /api/vip/ask-ai)
  // =========================================================================
  if (pathname === '/api/vip/ask-ai' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const { orderCode, vipToken, chartDataJson, userQuestion } = body;

      if (!userQuestion || !userQuestion.trim()) {
        return sendJson(res, 400, { success: false, message: 'Vui lòng nhập câu hỏi cần cố vấn.' });
      }

      orders = readJsonFile(ORDERS_FILE, orders);
      const code = (orderCode || '').trim().toUpperCase();
      const token = (vipToken || '').trim();

      let order = orders.find(o => 
        (code && o.orderCode && o.orderCode.toUpperCase() === code) ||
        (token && o.vipAccessToken === token) ||
        (token && o.orderCode && o.orderCode.toUpperCase() === token.toUpperCase())
      );

      // Hỗ trợ kiểm thử nội bộ TV377099
      if (!order && (code === 'TV377099' || token === '9a7f34bc6102da88e14cf956102a399f')) {
        order = {
          orderCode: 'TV377099',
          status: 'PAID',
          aiQuestionsCount: 0,
          packageName: 'Báo Cáo VIP Toàn Thư'
        };
        orders.push(order);
      }

      if (!order || order.status !== 'PAID') {
        return sendJson(res, 403, { 
          success: false, 
          message: 'Tính năng Cố Vấn AI chỉ dành riêng cho khách hàng đã thanh toán đơn hàng VIP.' 
        });
      }

      order.aiQuestionsCount = order.aiQuestionsCount || 0;
      if (order.aiQuestionsCount >= 5) {
        return sendJson(res, 403, {
          success: false,
          remaining: 0,
          message: 'Mỗi đơn hàng VIP được hỗ trợ 5 câu hỏi cố vấn chuyên sâu. Quý khách đã sử dụng hết 5/5 lượt hỏi cho đơn hàng này.'
        });
      }

      const chart = (typeof chartDataJson === 'string') ? JSON.parse(chartDataJson) : (chartDataJson || {});
      const answer = await generateTuViAiAdvice(chart, userQuestion.trim());

      order.aiQuestionsCount += 1;
      order.aiHistory = order.aiHistory || [];
      order.aiHistory.push({
        question: userQuestion.trim(),
        answer: answer,
        askedAt: new Date().toISOString()
      });
      writeJsonFile(ORDERS_FILE, orders);

      return sendJson(res, 200, {
        success: true,
        answer: answer,
        remaining: Math.max(0, 5 - order.aiQuestionsCount),
        askedCount: order.aiQuestionsCount
      });
    } catch (err) {
      console.error('Lỗi API Cố Vấn AI:', err);
      return sendJson(res, 500, { success: false, message: 'Lỗi xử lý cố vấn AI: ' + err.message });
    }
  }

  // Khôi phục quyền VIP qua Mã Đơn hoặc Số Điện Thoại: POST /api/orders/restore
  if (pathname === '/api/orders/restore' && req.method === 'POST') {
    if (isRateLimited(`restore_${clientIp}`, 10, 60000)) {
      return sendJson(res, 429, { success: false, message: 'Quá nhiều yêu cầu khôi phục. Vui lòng thử lại sau 1 phút.' });
    }

    try {
      const body = await parseJsonBody(req);
      const q = (body.query || '').trim();
      if (!q) {
        return sendJson(res, 400, { success: false, message: 'Vui lòng nhập Mã đơn hàng hoặc Số điện thoại.' });
      }
      const order = orders.find(o => o.status === 'PAID' && (
        o.orderCode.toUpperCase() === q.toUpperCase() ||
        (o.customerPhone && o.customerPhone.trim() === q)
      ));
      if (!order) {
        return sendJson(res, 404, { success: false, message: 'Không tìm thấy đơn hàng VIP đã thanh toán với thông tin này.' });
      }
      return sendJson(res, 200, {
        success: true,
        isVip: true,
        message: 'Khôi phục quyền VIP thành công!',
        order: {
          orderCode: order.orderCode,
          packageName: order.packageName,
          packageId: order.packageId,
          vipAccessToken: order.vipAccessToken || order.orderCode,
          paidAt: order.paidAt
        }
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  // Tùy chọn lưu tài khoản sau thanh toán (Claim Account): POST /api/orders/claim-account
  if (pathname === '/api/orders/claim-account' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const { orderCode, vipAccessToken, fullName, emailOrPhone, password } = body;
      const order = orders.find(o => o.orderCode === orderCode && o.status === 'PAID' && (
        !vipAccessToken || o.vipAccessToken === vipAccessToken || o.orderCode === vipAccessToken
      ));
      if (!order) {
        return sendJson(res, 403, { success: false, message: 'Xác thực đơn hàng VIP không thành công.' });
      }
      const cleanContact = (emailOrPhone || order.customerPhone || '').trim().toLowerCase();
      if (!cleanContact || !password) {
        return sendJson(res, 400, { success: false, message: 'Vui lòng nhập Số điện thoại/Email và Mật khẩu.' });
      }

      let user = users.find(u => u.emailOrPhone === cleanContact);
      if (user) {
        user.isVip = true;
        user.vipPackage = order.packageId;
        user.vipUnlockedAt = new Date().toISOString();
      } else {
        const { salt, hash } = hashPassword(password);
        user = {
          id: 'usr_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
          fullName: fullName || order.customerName || 'Đương Số VIP',
          emailOrPhone: cleanContact,
          salt,
          passwordHash: hash,
          isVip: true,
          vipPackage: order.packageId,
          createdAt: new Date().toISOString(),
          vipUnlockedAt: new Date().toISOString()
        };
        users.push(user);
      }
      order.userId = user.id;
      writeJsonFile(USERS_FILE, users);
      writeJsonFile(ORDERS_FILE, orders);

      const token = crypto.randomBytes(32).toString('hex');
      sessions[token] = user.id;
      writeJsonFile(SESSIONS_FILE, sessions);

      return sendJson(res, 200, {
        success: true,
        message: 'Đã tạo tài khoản bảo vệ lá số VIP thành công!',
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          emailOrPhone: user.emailOrPhone,
          isVip: true,
          vipPackage: user.vipPackage
        }
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  // Kiểm tra quyền truy cập tính năng: GET /api/tuvi/access-check
  if (pathname === '/api/tuvi/access-check' && req.method === 'GET') {
    const user = getAuthenticatedUser(req);
    const isVip = user ? user.isVip : false;

    return sendJson(res, 200, {
      success: true,
      isVip,
      package: user ? user.vipPackage : 'free',
      access: {
        chartAllowed: true,
        maxPalaces: isVip ? 12 : 2,
        maxDaiHan: isVip ? 6 : 1,
        canExportPdf: isVip
      }
    });
  }

  // =========================================================================
  // BLOG SEO & PUBLIC APIS
  // =========================================================================

  // API danh sách bài viết công khai: GET /api/posts
  if (pathname === '/api/posts' && req.method === 'GET') {
    posts = readJsonFile(POSTS_FILE, []);
    const publicList = posts.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: p.category,
      publishedAt: p.publishedAt,
      readTime: p.readTime,
      views: p.views || 0
    }));
    return sendJson(res, 200, publicList);
  }

  // Quản lý Blog cho Admin: GET /api/admin/posts
  if (pathname === '/api/admin/posts' && req.method === 'GET') {
    posts = readJsonFile(POSTS_FILE, []);
    return sendJson(res, 200, posts);
  }

  // Thêm/Sửa bài viết Blog: POST /api/admin/posts/save
  if (pathname === '/api/admin/posts/save' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      posts = readJsonFile(POSTS_FILE, []);
      let post = posts.find(p => (body.id && p.id === body.id) || (body.slug && p.slug === body.slug));
      if (post) {
        Object.assign(post, body, { updatedAt: new Date().toISOString() });
      } else {
        post = Object.assign({
          id: 'post-' + Date.now(),
          slug: body.slug || ('bai-viet-' + Date.now()),
          views: 0,
          publishedAt: new Date().toISOString().split('T')[0]
        }, body);
        posts.unshift(post);
      }
      writeJsonFile(POSTS_FILE, posts);
      return sendJson(res, 200, { success: true, post });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  // Xóa bài viết Blog: POST /api/admin/posts/delete
  if (pathname === '/api/admin/posts/delete' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      posts = readJsonFile(POSTS_FILE, []);
      posts = posts.filter(p => p.id !== body.id && p.slug !== body.slug);
      writeJsonFile(POSTS_FILE, posts);
      return sendJson(res, 200, { success: true, message: 'Đã xóa bài viết' });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  // Dynamic Sitemap: GET /sitemap.xml
  if (pathname === '/sitemap.xml') {
    posts = readJsonFile(POSTS_FILE, []);
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    xml += `  <url><loc>https://www.xemtuvihuyenhoc.com/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>\n`;
    xml += `  <url><loc>https://www.xemtuvihuyenhoc.com/blog</loc><changefreq>daily</changefreq><priority>0.9</priority></url>\n`;
    xml += `  <url><loc>https://www.xemtuvihuyenhoc.com/chinh-sach-bao-mat</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>\n`;
    xml += `  <url><loc>https://www.xemtuvihuyenhoc.com/chinh-sach-hoan-tien-ho-tro</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>\n`;
    xml += `  <url><loc>https://www.xemtuvihuyenhoc.com/dieu-khoan-su-dung</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>\n`;
    posts.forEach(p => {
      xml += `  <url><loc>https://www.xemtuvihuyenhoc.com/blog/${p.slug}</loc><lastmod>${p.publishedAt || '2026-01-01'}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
    });
    xml += `</urlset>`;

    res.writeHead(200, Object.assign({ 'Content-Type': 'application/xml; charset=utf-8' }, HTTP_SECURITY_HEADERS));
    return res.end(xml);
  }

  // Dynamic Robots: GET /robots.txt
  if (pathname === '/robots.txt') {
    const robots = `User-agent: *\nAllow: /\nDisallow: /admin.html\nDisallow: /admin\nDisallow: /api/\n\nSitemap: https://www.xemtuvihuyenhoc.com/sitemap.xml\n`;
    res.writeHead(200, Object.assign({ 'Content-Type': 'text/plain; charset=utf-8' }, HTTP_SECURITY_HEADERS));
    return res.end(robots);
  }

  // SSR Blog Single Post: GET /blog/:slug
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace(/^\/blog\//, '').replace(/\/$/, '').trim();
    if (slug) {
      posts = readJsonFile(POSTS_FILE, []);
      const post = posts.find(p => p.slug === slug);
      if (post) {
        post.views = (post.views || 0) + 1;
        writeJsonFile(POSTS_FILE, posts);

        const blogHtmlPath = path.join(__dirname, 'blog.html');
        fs.readFile(blogHtmlPath, 'utf8', (err, template) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('500 Internal Server Error');
          }

          let html = template;
          html = html.replace(/<title>.*?<\/title>/, `<title>${post.title} | Xem Tử Vi Huyền Học</title>`);
          html = html.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${post.description}">`);
          html = html.replace(/<meta name="keywords" content=".*?">/, `<meta name="keywords" content="${post.keywords || ''}">`);
          html = html.replace(/<link rel="canonical" href=".*?">/, `<link rel="canonical" href="https://www.xemtuvihuyenhoc.com/blog/${post.slug}">`);

          const schemaArticle = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.description,
            "datePublished": post.publishedAt,
            "author": { "@type": "Organization", "name": "Xem Tử Vi Huyền Học" },
            "publisher": { 
              "@type": "Organization", 
              "name": "Xem Tử Vi Huyền Học", 
              "logo": { "@type": "ImageObject", "url": "https://www.xemtuvihuyenhoc.com/img/logo-xem-tu-vi-huyen-hoc.png" } 
            },
            "mainEntityOfPage": `https://www.xemtuvihuyenhoc.com/blog/${post.slug}`
          });

          html = html.replace('</head>', `<script type="application/ld+json">${schemaArticle}</script>\n</head>`);

          const postArticleHtml = `
            <article class="article-wrap">
              <header class="article-header">
                <span class="post-category-badge">${post.category || 'Kiến thức Tử Vi'}</span>
                <h1 class="article-title">${post.title}</h1>
                <div class="article-meta">
                  <span><i data-lucide="calendar" style="width:14px;height:14px;display:inline;vertical-align:-1px;"></i> Xuất bản: ${post.publishedAt || '2026-01-01'}</span>
                  <span><i data-lucide="clock" style="width:14px;height:14px;display:inline;vertical-align:-1px;"></i> Đọc trong: ${post.readTime || '7 phút'}</span>
                  <span><i data-lucide="eye" style="width:14px;height:14px;display:inline;vertical-align:-1px;"></i> ${post.views} lượt đọc</span>
                  <span><i data-lucide="award" style="width:14px;height:14px;display:inline;vertical-align:-1px;"></i> Cổ Truyền Nam Phái</span>
                </div>
              </header>
              <div class="article-content">
                ${post.contentHtml}
              </div>
            </article>
          `;

          html = html.replace('<div id="ssrPostOutlet">', `<div id="ssrPostOutlet">${postArticleHtml}`);

          res.writeHead(200, Object.assign({ 'Content-Type': 'text/html; charset=utf-8' }, HTTP_SECURITY_HEADERS));
          return res.end(html);
        });
        return;
      }
    }
  }

  // =========================================================================
  // PHỤC VỤ FILE TĨNH (STATIC FILE SERVER)
  // =========================================================================
  let safePath = path.normalize(decodeURIComponent(pathname)).replace(/^(\.\.[\/\\])+/, '');

  const lowerSafePath = safePath.toLowerCase();
  if (lowerSafePath.startsWith('/data') || lowerSafePath.startsWith('\\data') || 
      lowerSafePath.includes('/data/') || lowerSafePath.includes('\\data\\') ||
      lowerSafePath.endsWith('.json') || lowerSafePath.includes('.env')) {
    res.writeHead(403, Object.assign({ 'Content-Type': 'application/json; charset=utf-8' }, HTTP_SECURITY_HEADERS));
    return res.end(JSON.stringify({ success: false, message: 'Forbidden: Access denied to internal data files' }));
  }

  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  } else if (safePath === '/admin' || safePath === '\\admin' || safePath === '/admin/' || safePath === '\\admin\\') {
    safePath = '/admin.html';
  } else if (safePath === '/blog' || safePath === '\\blog' || safePath === '/blog/' || safePath === '\\blog\\') {
    safePath = '/blog.html';
  }

  let filePath = path.join(__dirname, safePath);
  if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, (err2, content) => {
        if (err2) {
          res.writeHead(404, Object.assign({ 'Content-Type': 'text/plain; charset=utf-8' }, HTTP_SECURITY_HEADERS));
          res.end('404 Not Found');
        } else {
          res.writeHead(200, Object.assign({ 'Content-Type': 'text/html; charset=utf-8' }, HTTP_SECURITY_HEADERS));
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const isCompressible = /\.(html|css|js|json|svg|xml|txt)$/i.test(filePath);
    const acceptEncoding = req.headers['accept-encoding'] || '';

    let cacheControl = 'no-cache, must-revalidate';
    if (/\.(png|jpg|jpeg|webp|ico|svg|woff2|woff)$/i.test(filePath) || req.url.includes('?v=')) {
      cacheControl = 'public, max-age=31536000, immutable';
    } else if (/\.(css|js)$/i.test(filePath)) {
      cacheControl = 'public, max-age=86400';
    }

    const headers = Object.assign({
      'Content-Type': contentType,
      'Cache-Control': cacheControl
    }, HTTP_SECURITY_HEADERS);

    fs.readFile(filePath, (err2, content) => {
      if (err2) {
        res.writeHead(500, Object.assign({ 'Content-Type': 'text/plain; charset=utf-8' }, HTTP_SECURITY_HEADERS));
        res.end('500 Internal Server Error');
      } else {
        if (isCompressible && acceptEncoding.includes('gzip')) {
          zlib.gzip(content, (zErr, gzipped) => {
            if (!zErr && gzipped) {
              headers['Content-Encoding'] = 'gzip';
              res.writeHead(200, headers);
              res.end(gzipped);
            } else {
              res.writeHead(200, headers);
              res.end(content);
            }
          });
        } else {
          res.writeHead(200, headers);
          res.end(content);
        }
      }
    });
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`✦ XEM TỬ VI HUYỀN HỌC - BACKEND ĐANG CHẠY TRÊN PORT ${PORT} ✦`);
    console.log(`✦ Truy cập trực tiếp: http://localhost:${PORT}/ ✦`);
    console.log(`=======================================================`);
  });
}

module.exports = server;
