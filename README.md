# ✦ XEM TỬ VI HUYỀN HỌC (Full Stack Web App)

Hệ thống tra cứu, an sao và luận giải Tử Vi Đẩu Số đa tầng kết hợp Cổng thanh toán tự động VietQR (SePay API) và Bảng quản trị kinh doanh thông minh (AI Growth Advisor).

---

## 🌟 Tính Năng Nổi Bật

### 1. Phía Khách Hàng (Client Frontend)
- **Lá Số Trống Đồng Đông Sơn:** Giao diện đồ họa phong cách Huyền học Hoàng gia (Midnight Indigo & Imperial Gold), an sao 12 cung chuẩn xác theo Thiên Bàn & Địa Bàn.
- **Biện Giải Đa Tầng Chuyên Sâu:**
  - Cách cục & Khí tượng cung vị.
  - Phân tích Tam Phương Tứ Chính, Tứ Hóa Phi Tinh (Lộc - Quyền - Khoa - Kỵ).
  - Cát tinh nâng đỡ & Sát tinh thử thách.
  - Lời khuyên tu dưỡng, cải biến vận mệnh (theo cụ Nguyễn Phát Lộc).
- **Thương Mại Hóa & Thanh Toán Tự Động (VietQR NAPAS 24/7):**
  - Mở khóa toàn bộ 12 cung & bản in PDF VIP A4 lưu trữ trọn đời.
  - Tự động sinh mã VietQR kèm số tiền và nội dung chuyển khoản theo mã đơn hàng.
  - Tự động đối soát giao dịch ngân hàng VietinBank qua **SePay API** trong 3 giây.
  - Khách vãng lai thanh toán được kích hoạt ngay lập tức mà không bắt buộc phải đăng ký tài khoản rườm rà.
- **Vật Phẩm Phong Thủy Hộ Mệnh:** Gợi ý vật phẩm phong thủy tương sinh theo ngũ hành bản mệnh (Kim, Mộc, Thủy, Hỏa, Thổ).
- **Đặt Lịch Tư Vấn 1-1:** Kết nối đặt lịch đàm đạo trực tiếp với chuyên gia qua Zalo.

---

### 2. Phía Quản Trị (Admin Backend Dashboard - `/admin`)
- **Báo Cáo Doanh Thu Thực Tế:** Thống kê doanh thu theo Hôm nay, Tuần này (7 ngày), Tháng này, Tổng tích lũy, Tỷ lệ chốt đơn thành công.
- **Phân Tích Lưu Lượng & Hành Vi (Traffic Analytics):**
  - Số lượt xem trang (Pageviews), Khách truy cập riêng biệt (Unique Visitors).
  - Số lá số đã lập, số lượt đọc các cung vị, số lượt mở quét mã QR.
- **Phễu Chuyển Đổi 5 Bước (Conversion Funnel):**
  - Theo dõi tỷ lệ chuyển đổi và điểm rơi của khách từ lúc vào web đến khi thanh toán thành công.
- **Tính Năng Thông Minh (AI Smart Growth Advisor):**
  - Bảng xếp hạng Top Cung vị khách hàng tò mò nhất (Cung Phu Thê, Cung Tài Bạch,...).
  - Phân tích insight tâm lý khách hàng.
  - Đưa ra 4 giải pháp chiến lược thực chiến giúp tăng gấp đôi doanh thu và tối ưu tỷ lệ chuyển đổi.
- **Nhật Ký Hành Vi Thời Gian Thực (Live Activity Feed):** Giám sát trực tiếp các tương tác của khách hàng trên trang web.
- **Quản Lý Đơn Hàng:** Phê duyệt đơn hàng 1 chạm, kiểm tra trạng thái thanh toán, xóa đơn test.
- **Cấu Hình Tự Động SePay:** Quản lý và lưu trữ SePay API Key trực tiếp trên giao diện.

---

## 📁 Cấu Trúc Thư Mục

```text
├── admin.html               # Trang quản trị doanh thu, lưu lượng & AI Advisor
├── index.html               # Giao diện chính tra cứu Tử Vi
├── server.js                # Máy chủ Backend Node.js phục vụ API & static files
├── package.json             # Cấu hình dự án Node.js
├── favicon.png              # Favicon trang web
├── apple-touch-icon.png     # Icon ứng dụng web
├── css/
│   ├── normalize.css        # Chuẩn hóa CSS
│   ├── style.css            # CSS cốt lõi & giao diện lá số hoàng gia
│   ├── responsive.css       # Tương thích thiết bị di động & máy tính bảng
│   └── print.css            # Định dạng in PDF báo cáo Tử Vi VIP A4
├── js/
│   ├── app.js               # Điều phối giao diện người dùng
│   ├── tuvi-engine.js       # Thuật toán an sao & tính toán lá số Tử Vi
│   ├── tuvi-luan-giai.js    # Bộ máy luận giải đa tầng chuyên sâu
│   ├── tuvi-chart.js        # Vẽ biểu đồ lá số & danh sách accordion 12 cung
│   ├── tuvi-monetize.js     # Cổng VietQR, Affiliate phong thủy & Đặt lịch tư vấn
│   ├── tuvi-auth.js         # Quản lý tài khoản & phân quyền VIP
│   └── mystic-video.js      # Hiệu ứng nền huyền học
└── data/
    ├── config.json          # Cấu hình tài khoản ngân hàng & SePay API Key
    ├── orders.json          # Cơ sở dữ liệu đơn hàng
    ├── users.json           # Dữ liệu tài khoản người dùng
    ├── sessions.json        # Phiên đăng nhập người dùng
    └── analytics.json       # Lưu trữ sự kiện hành vi & lưu lượng truy cập
```

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

Dự án được xây dựng hoàn toàn bằng **Node.js thuần (Zero dependencies)**, không cần cài đặt thêm thư viện nặng nề.

### 1. Khởi chạy máy chủ:
```bash
node server.js
```
hoặc:
```bash
npm start
```

### 2. Truy cập ứng dụng:
- **Giao diện người dùng:** [http://localhost:8080/](http://localhost:8080/)
- **Bảng quản trị kinh doanh & AI Advisor:** [http://localhost:8080/admin](http://localhost:8080/admin)

---

## 🔒 Thông Tin Ngân Hàng & Tích Hợp API
- **Ngân hàng:** VietinBank (Ngân Hàng Công Thương Việt Nam)
- **Số tài khoản:** `108884822302`
- **Chủ tài khoản:** `TRAN CONG LUYEN`
- **Cổng tự động:** SePay API & Webhook (`/api/webhook/sepay`)

