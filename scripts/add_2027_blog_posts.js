const fs = require('fs');
const path = require('path');

const POSTS_FILE = path.join(__dirname, '..', 'data', 'posts.json');

// Biểu đồ SVG 1: Tứ Hóa Can Đinh 2027 & Trục Tài Lộc
const svg1 = `
<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" style="background:#FAF6EE; border-radius:6px; font-family:'Be Vietnam Pro',sans-serif;">
  <defs>
    <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C29B38"/>
      <stop offset="100%" stop-color="#8A6818"/>
    </linearGradient>
    <linearGradient id="sealGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A3281F"/>
      <stop offset="100%" stop-color="#6E1710"/>
    </linearGradient>
    <filter id="shadow1" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Khung viền cổ điển -->
  <rect x="8" y="8" width="744" height="344" rx="6" fill="none" stroke="#D9CEB8" stroke-width="1.5"/>
  <rect x="14" y="14" width="732" height="332" rx="4" fill="none" stroke="#C29B38" stroke-width="0.75" stroke-dasharray="6,4"/>

  <!-- Tiêu đề Sơ đồ -->
  <text x="380" y="42" text-anchor="middle" font-size="16" font-weight="700" fill="#A3281F" font-family="'Noto Serif',serif" letter-spacing="1">✦ BẢN ĐỒ TỨ HÓA CAN ĐINH &amp; DÒNG CHẢY TIỀN TÀI NĂM 2027 ✦</text>

  <!-- Vòng tròn trung tâm: Đinh Mùi 2027 -->
  <circle cx="380" cy="180" r="48" fill="#F3ECDD" stroke="#A3281F" stroke-width="2" filter="url(#shadow1)"/>
  <circle cx="380" cy="180" r="42" fill="none" stroke="#C29B38" stroke-width="1"/>
  <text x="380" y="174" text-anchor="middle" font-size="14" font-weight="700" fill="#A3281F">ĐINH MÙI</text>
  <text x="380" y="194" text-anchor="middle" font-size="12" font-weight="600" fill="#C29B38">LƯU NIÊN 2027</text>

  <!-- Đường nối trục Tứ Hóa -->
  <line x1="380" y1="132" x2="380" y2="78" stroke="#C29B38" stroke-width="2" stroke-dasharray="4,3"/>
  <line x1="428" y1="180" x2="520" y2="180" stroke="#C29B38" stroke-width="2" stroke-dasharray="4,3"/>
  <line x1="380" y1="228" x2="380" y2="280" stroke="#A3281F" stroke-width="2" stroke-dasharray="4,3"/>
  <line x1="332" y1="180" x2="240" y2="180" stroke="#C29B38" stroke-width="2" stroke-dasharray="4,3"/>

  <!-- 1. HÓA LỘC (Top): Thái Âm Hóa Lộc -->
  <g transform="translate(230, 48)">
    <rect width="300" height="58" rx="6" fill="#FFFDF8" stroke="#C29B38" stroke-width="1.5" filter="url(#shadow1)"/>
    <rect x="0" y="0" width="8" height="58" rx="3" fill="#C29B38"/>
    <text x="20" y="24" font-size="13" font-weight="700" fill="#8A6818">THÁI ÂM HÓA LỘC (TỤ TÀI ĐỆ NHẤT)</text>
    <text x="20" y="44" font-size="11" fill="#4A3E31">Chủ về tiền ngầm, bất động sản, tích lũy đất đai &amp; dòng tiền bền vững</text>
  </g>

  <!-- 2. HÓA QUYỀN (Right): Thiên Đồng Hóa Quyền -->
  <g transform="translate(500, 150)">
    <rect width="235" height="58" rx="6" fill="#FFFDF8" stroke="#D9CEB8" stroke-width="1.2" filter="url(#shadow1)"/>
    <rect x="0" y="0" width="6" height="58" rx="3" fill="#D97706"/>
    <text x="16" y="24" font-size="12" font-weight="700" fill="#92400E">THIÊN ĐỒNG HÓA QUYỀN</text>
    <text x="16" y="44" font-size="10.5" fill="#4A3E31">Hành động dứt khoát, mở rộng kinh doanh</text>
  </g>

  <!-- 3. HÓA KỴ (Bottom): Cự Môn Hóa Kỵ -->
  <g transform="translate(230, 260)">
    <rect width="300" height="58" rx="6" fill="#FFF8F7" stroke="#A3281F" stroke-width="1.5" filter="url(#shadow1)"/>
    <rect x="0" y="0" width="8" height="58" rx="3" fill="#A3281F"/>
    <text x="20" y="24" font-size="13" font-weight="700" fill="#A3281F">CỰ MÔN HÓA KỴ (CẢNH BÁO RỦI RO)</text>
    <text x="20" y="44" font-size="11" fill="#7A1F17">Tránh tranh chấp hợp đồng, không cho vay miệng, thị phi hao tài</text>
  </g>

  <!-- 4. HÓA KHOA (Left): Thiên Cơ Hóa Khoa -->
  <g transform="translate(25, 150)">
    <rect width="235" height="58" rx="6" fill="#FFFDF8" stroke="#D9CEB8" stroke-width="1.2" filter="url(#shadow1)"/>
    <rect x="0" y="0" width="6" height="58" rx="3" fill="#2563EB"/>
    <text x="16" y="24" font-size="12" font-weight="700" fill="#1D4ED8">THIÊN CƠ HÓA KHOA</text>
    <text x="16" y="44" font-size="10.5" fill="#4A3E31">Dùng trí tuệ thẩm định, quản trị vốn khoa học</text>
  </g>

  <!-- Chú thích chân sơ đồ -->
  <text x="380" y="338" text-anchor="middle" font-size="10.5" fill="#8C7D6B">Nguồn: Đồ hình Tứ Hóa Nam Phái Cổ Truyền - Bản quyền nghiên cứu tại xemtuvihuyenhoc.com</text>
</svg>
`;

// Biểu đồ SVG 2: Ma Trận 4 Lớp Quản Trị Rủi Ro Đầu Tư 2027
const svg2 = `
<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" style="background:#FAF6EE; border-radius:6px; font-family:'Be Vietnam Pro',sans-serif;">
  <defs>
    <filter id="shadow2" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect x="8" y="8" width="744" height="344" rx="6" fill="none" stroke="#D9CEB8" stroke-width="1.5"/>
  <rect x="14" y="14" width="732" height="332" rx="4" fill="none" stroke="#A3281F" stroke-width="0.75" stroke-dasharray="6,4"/>

  <text x="380" y="42" text-anchor="middle" font-size="16" font-weight="700" fill="#A3281F" font-family="'Noto Serif',serif" letter-spacing="1">✦ MA TRẬN 4 TẦNG BẢO VỆ TÀI CHÍNH &amp; ĐẦU TƯ NĂM 2027 ✦</text>

  <!-- Cột 1: Soi Cung Tài -->
  <g transform="translate(30, 68)">
    <rect width="160" height="235" rx="6" fill="#FFFDF8" stroke="#D9CEB8" stroke-width="1" filter="url(#shadow2)"/>
    <rect x="0" y="0" width="160" height="34" rx="6 6 0 0" fill="#C29B38"/>
    <text x="80" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#FFFFFF">1. SOI CUNG TÀI</text>
    <text x="14" y="60" font-size="11" font-weight="700" fill="#A3281F">● Gặp Thái Âm:</text>
    <text x="14" y="78" font-size="10" fill="#4A3E31">Thời cơ vàng gom tài sản</text>
    <text x="14" y="105" font-size="11" font-weight="700" fill="#DC2626">● Gặp Cự Môn Kỵ:</text>
    <text x="14" y="123" font-size="10" fill="#4A3E31">Dừng ngay lướt sóng, giữ chặt tiền mặt</text>
    <text x="14" y="152" font-size="11" font-weight="700" fill="#B45309">● Gặp Không Kiếp:</text>
    <text x="14" y="170" font-size="10" fill="#4A3E31">Tuyệt đối không dùng đòn bẩy ngân hàng</text>
    <rect x="14" y="196" width="132" height="24" rx="4" fill="#F3ECDD"/>
    <text x="80" y="212" text-anchor="middle" font-size="9.5" font-weight="600" fill="#6B5E52">Kiểm soát vị thế</text>
  </g>

  <!-- Mũi tên liên kết 1->2 -->
  <path d="M 195 185 L 215 185" stroke="#C29B38" stroke-width="2" marker-end="url(#arrow)"/>

  <!-- Cột 2: Rào Chắn Pháp Lý -->
  <g transform="translate(215, 68)">
    <rect width="160" height="235" rx="6" fill="#FFFDF8" stroke="#D9CEB8" stroke-width="1" filter="url(#shadow2)"/>
    <rect x="0" y="0" width="160" height="34" rx="6 6 0 0" fill="#1E3A8A"/>
    <text x="80" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#FFFFFF">2. RÀO CHẮN PHÁP LÝ</text>
    <text x="14" y="60" font-size="11" font-weight="700" fill="#1E3A8A">● Giấy trắng mực đen:</text>
    <text x="14" y="78" font-size="10" fill="#4A3E31">Không tin thỏa thuận miệng dù thân thích</text>
    <text x="14" y="105" font-size="11" font-weight="700" fill="#1E3A8A">● Công chứng rõ ràng:</text>
    <text x="14" y="123" font-size="10" fill="#4A3E31">Hợp đồng đối tác phải có điều khoản phạt</text>
    <text x="14" y="152" font-size="11" font-weight="700" fill="#DC2626">● Khóa van bảo lãnh:</text>
    <text x="14" y="170" font-size="10" fill="#4A3E31">Cấm ký bảo lãnh vay mượn hộ người khác</text>
    <rect x="14" y="196" width="132" height="24" rx="4" fill="#F3ECDD"/>
    <text x="80" y="212" text-anchor="middle" font-size="9.5" font-weight="600" fill="#6B5E52">Hóa giải Cự Môn Kỵ</text>
  </g>

  <!-- Cột 3: Tỷ Lệ Vốn Vàng -->
  <g transform="translate(390, 68)">
    <rect width="160" height="235" rx="6" fill="#FFFDF8" stroke="#D9CEB8" stroke-width="1" filter="url(#shadow2)"/>
    <rect x="0" y="0" width="160" height="34" rx="6 6 0 0" fill="#047857"/>
    <text x="80" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#FFFFFF">3. PHÂN BỔ TÀI SẢN</text>
    <text x="14" y="60" font-size="11" font-weight="700" fill="#047857">● 60% Tài sản lõi:</text>
    <text x="14" y="78" font-size="10" fill="#4A3E31">Đất sạch, vàng vật chất, kênh phòng thủ</text>
    <text x="14" y="105" font-size="11" font-weight="700" fill="#047857">● 30% Sản xuất KD:</text>
    <text x="14" y="123" font-size="10" fill="#4A3E31">Duy trì mô hình kinh doanh có dòng tiền</text>
    <text x="14" y="152" font-size="11" font-weight="700" fill="#047857">● 10% Dự phòng:</text>
    <text x="14" y="170" font-size="10" fill="#4A3E31">Thanh khoản ứng phó biến cố bất ngờ</text>
    <rect x="14" y="196" width="132" height="24" rx="4" fill="#F3ECDD"/>
    <text x="80" y="212" text-anchor="middle" font-size="9.5" font-weight="600" fill="#6B5E52">Bảo toàn sinh khí</text>
  </g>

  <!-- Cột 4: Kích Hoạt Kho Điền -->
  <g transform="translate(565, 68)">
    <rect width="160" height="235" rx="6" fill="#FFFDF8" stroke="#D9CEB8" stroke-width="1" filter="url(#shadow2)"/>
    <rect x="0" y="0" width="160" height="34" rx="6 6 0 0" fill="#A3281F"/>
    <text x="80" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#FFFFFF">4. KHO ĐIỀN SẢN</text>
    <text x="14" y="60" font-size="11" font-weight="700" fill="#A3281F">● Soi Cung Điền Trạch:</text>
    <text x="14" y="78" font-size="10" fill="#4A3E31">Đo lường năng lực tích lũy nhà đất</text>
    <text x="14" y="105" font-size="11" font-weight="700" fill="#A3281F">● Gặp Lộc Tồn / Khoa:</text>
    <text x="14" y="123" font-size="10" fill="#4A3E31">Cơ hội mua bất động sản giá đáy</text>
    <text x="14" y="152" font-size="11" font-weight="700" fill="#DC2626">● Gặp Tang Môn / Hổ:</text>
    <text x="14" y="170" font-size="10" fill="#4A3E31">Cẩn thận quy hoạch hoặc tranh chấp sổ đỏ</text>
    <rect x="14" y="196" width="132" height="24" rx="4" fill="#F3ECDD"/>
    <text x="80" y="212" text-anchor="middle" font-size="9.5" font-weight="600" fill="#6B5E52">Tích sản truyền đời</text>
  </g>

  <text x="380" y="338" text-anchor="middle" font-size="10.5" fill="#8C7D6B">Đồ hình Quản Trị Vốn 2027 Nam Phái - Thực hiện bởi Hội đồng Khoa học Xem Tử Vi Huyền Học</text>
</svg>
`;

// Biểu đồ SVG 3: Sơ Đồ Hỷ Thần & Hóa Giải Xung Khắc Hôn Nhân 2027
const svg3 = `
<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" style="background:#FAF6EE; border-radius:6px; font-family:'Be Vietnam Pro',sans-serif;">
  <defs>
    <filter id="shadow3" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect x="8" y="8" width="744" height="344" rx="6" fill="none" stroke="#D9CEB8" stroke-width="1.5"/>
  <rect x="14" y="14" width="732" height="332" rx="4" fill="none" stroke="#A3281F" stroke-width="0.75" stroke-dasharray="6,4"/>

  <text x="380" y="42" text-anchor="middle" font-size="16" font-weight="700" fill="#A3281F" font-family="'Noto Serif',serif" letter-spacing="1">✦ SƠ ĐỒ SOI CHIẾU HỶ TÍN &amp; HÓA GIẢI CUNG PHU THÊ NĂM 2027 ✦</text>

  <!-- Nhánh Trái: Hỷ Tín & Kết Duyên -->
  <g transform="translate(35, 75)">
    <rect width="320" height="225" rx="6" fill="#FFFDF8" stroke="#C29B38" stroke-width="1.5" filter="url(#shadow3)"/>
    <rect x="0" y="0" width="320" height="36" rx="6 6 0 0" fill="#BE185D"/>
    <text x="160" y="24" text-anchor="middle" font-size="13" font-weight="700" fill="#FFFFFF">🌸 DẤU HIỆU CƯỚI HỎI &amp; THÊM NGƯỜI THÊM CỦA</text>

    <text x="20" y="65" font-size="11.5" font-weight="700" fill="#BE185D">1. Lưu Đào Hoa &amp; Lưu Hồng Loan:</text>
    <text x="20" y="83" font-size="10.5" fill="#4A3E31">Nhập Mệnh, Thân hoặc Cung Phu Thê: Duyên lành gõ cửa, dễ thành hôn phối danh chính ngôn thuận.</text>

    <text x="20" y="118" font-size="11.5" font-weight="700" fill="#B45309">2. Thiên Hỷ &amp; Hóa Lộc hội chiếu:</text>
    <text x="20" y="136" font-size="10.5" fill="#4A3E31">Gia đình đón tin vui lớn, sinh quý tử đầu lòng, vợ chồng cùng làm ăn vượng phát.</text>

    <text x="20" y="170" font-size="11.5" font-weight="700" fill="#047857">3. Top tuổi vượng hôn nhân 2027:</text>
    <text x="20" y="188" font-size="10.5" fill="#4A3E31">Tuổi Mão (1999, 1987), Tuổi Hợi (1995, 1983), Tuổi Ngọ (1990, 2002) gặp đại vận hỷ tín.</text>
  </g>

  <!-- Trục Tâm: Hòa Hợp Âm Dương -->
  <circle cx="380" cy="188" r="22" fill="#FAF6EE" stroke="#A3281F" stroke-width="2"/>
  <text x="380" y="193" text-anchor="middle" font-size="18" fill="#A3281F">☯</text>

  <!-- Nhánh Phải: Sóng Gió & Cách Hóa Giải -->
  <g transform="translate(405, 75)">
    <rect width="320" height="225" rx="6" fill="#FFFDF8" stroke="#A3281F" stroke-width="1.5" filter="url(#shadow3)"/>
    <rect x="0" y="0" width="320" height="36" rx="6 6 0 0" fill="#A3281F"/>
    <text x="160" y="24" text-anchor="middle" font-size="13" font-weight="700" fill="#FFFFFF">⚠️ HIỂM HỌA KHẮC KHẨU &amp; PHƯƠNG PHÁP HÓA GIẢI</text>

    <text x="20" y="65" font-size="11.5" font-weight="700" fill="#A3281F">1. Cự Môn Hóa Kỵ chiếu Phu Thê:</text>
    <text x="20" y="83" font-size="10.5" fill="#4A3E31">Lời nói vô tình chém nhát kiếm đau lòng; nghi ngờ ghen tuông vô căn cứ gây rạn nứt.</text>

    <text x="20" y="118" font-size="11.5" font-weight="700" fill="#7C2D12">2. Tuần Triệt / Cô Thần Quả Tú:</text>
    <text x="20" y="136" font-size="10.5" fill="#4A3E31">Cảm giác cô đơn trong chính ngôi nhà mình; vợ chồng thiếu sự thấu hiểu và chia sẻ.</text>

    <text x="20" y="170" font-size="11.5" font-weight="700" fill="#1E3A8A">3. Bí quyết Tu Dưỡng Cải Mệnh:</text>
    <text x="20" y="188" font-size="10.5" fill="#4A3E31">"Lấy nhẫn nhịn làm vàng, lấy lắng nghe làm gốc". Bố trí phòng ngủ đúng phong thủy sinh khí.</text>
  </g>

  <text x="380" y="338" text-anchor="middle" font-size="10.5" fill="#8C7D6B">Sơ đồ Luận Đoán Cung Phu Thê 2027 - Nghiên cứu độc quyền tại xemtuvihuyenhoc.com</text>
</svg>
`;

// =========================================================================
// BÀI VIẾT 1: TIỀN BẠC & TÀI LỘC 2027
// =========================================================================
const post1 = {
  id: 'post-2027-tai-loc',
  slug: 'van-han-tien-bac-tai-loc-nam-2027-dinh-mui',
  title: 'Vận Hạn Tiền Bạc Năm 2027 (Đinh Mùi): Bộ Sao Nào Nắm Giữ Kho Tiền & Con Giáp Nào Bứt Phá Tài Lộc?',
  description: 'Dự báo vận hạn tiền bạc năm 2027 Đinh Mùi theo Tử Vi Nam Phái. Giải mã Thái Âm Hóa Lộc, bí quyết kích hoạt Cung Tài Bạch, Điền Trạch và top tuổi phát tài.',
  keywords: 'vận hạn tiền bạc 2027, tài lộc năm 2027, tử vi năm đinh mùi 2027, cung tài bạch 2027, thái âm hóa lộc 2027, xem lá số tử vi 2027, tuổi phát tài 2027',
  category: 'Tài lộc & Sự nghiệp',
  publishedAt: '2026-11-12',
  readTime: '8 phút',
  views: 2840,
  contentHtml: `
    <p>Bước sang năm <strong>Đinh Mùi 2027</strong>, dòng chảy tài chính và vận hội tiền bạc của 12 con giáp bước vào chu kỳ tái cấu trúc mạnh mẽ. Trong học thuật Tử Vi Đẩu Số Nam Phái, can Đinh mang trong mình sự chuyển động đặc biệt của Tứ Hóa: <em>"Đinh - Nguyệt Đồng Cơ Cự"</em> (Thái Âm Hóa Lộc, Thiên Đồng Hóa Quyền, Thiên Cơ Hóa Khoa, Cự Môn Hóa Kỵ). Đây chính là chiếc chìa khóa vạn năng mở ra bí mật: <strong>Ai sẽ là người gom trọn kho tiền, và ai cần thận trọng giữ chặt túi tiền trong năm 2027?</strong></p>

    <h2>1. Tổng Quan Khí Vận Tiền Tệ Năm Đinh Mùi 2027</h2>
    <p>Năm Đinh Mùi có can <strong>Đinh (Âm Hỏa)</strong> tương sinh cho chi <strong>Mùi (Âm Thổ)</strong>. Về mặt ngũ hành cổ truyền, Hỏa sinh Thổ là thế đất được ủ ấm, biểu thị cho sự tích lũy ngầm, bền chặt và chắc chắn. Dòng tiền năm 2027 sẽ không chảy ồ ạt vào các mô hình kiếm tiền chớp nhoáng, mà ưu ái những người có tầm nhìn dài hạn, biết đầu tư vào <strong>giá trị thực tế và tài sản bền vững</strong>.</p>

    <div class="article-callout">
      <div class="article-callout-title">✦ QUY TẮC CỔ TRUYỀN CAN ĐINH</div>
      <p><em>"Thái Âm cư Hợi hiệu Viễn Du, phú tư đao kim bất khả số."</em> — Can Đinh kích hoạt Thái Âm Hóa Lộc, chủ về nguồn tiền tích tụ từ từ, của cải gia tăng trong sự âm thầm, tiền đẻ ra tiền từ đất đai, nhà cửa và kinh doanh dịch vụ chất lượng cao.</p>
    </div>

    <h2>2. Bản Đồ Tứ Hóa 2027: Thái Âm Hóa Lộc - Đệ Nhất Tài Tinh Nổi Sóng</h2>
    <p>Khác với năm Bính Ngọ 2026 khi Thiên Đồng Hóa Lộc chủ về kiếm tiền từ sự thay đổi và hưởng thụ, năm <strong>Đinh Mùi 2027 đặt Thái Âm vào vị trí Hóa Lộc</strong>. Thái Âm vốn là đệ nhất sao tài tinh kiêm điền sản tinh trong 14 Chính Tinh Tử Vi. Dưới đây là sơ đồ luân chuyển năng lượng tài lộc năm 2027:</p>

    <div class="article-diagram">
      ${svg1}
      <div class="diagram-caption">Hình 1: Đồ hình Tứ Hóa Can Đinh 2027 &amp; Trục luân chuyển tiền tài theo Tử Vi Nam Phái.</div>
    </div>

    <p>Khi Thái Âm gặp Hóa Lộc trong năm Đinh Mùi 2027:</p>
    <ul>
      <li><strong>Tiền ngầm, của chìm phát huy uy lực:</strong> Những ai tích lũy đất đai, nhà xưởng hoặc tài sản dài hạn trước đó sẽ đón nhận quả ngọt bất ngờ.</li>
      <li><strong>Phụ nữ đóng vai trò then chốt trong kinh tế:</strong> Thái Âm tượng trưng cho người mẹ, người vợ. Năm 2027, các mô hình kinh doanh do phụ nữ dẫn dắt hoặc hướng vào nhu cầu của phụ nữ (chăm sóc sắc đẹp, gia đình, chăm sóc sức khỏe, thời trang) sẽ gặt hái doanh thu vượt trội.</li>
      <li><strong>Kinh doanh ban đêm và dịch vụ lưu trú bùng nổ:</strong> Thái Âm cai quản màn đêm. Các ngành hàng ẩm thực đêm, du lịch nghỉ dưỡng, kinh doanh online không biên giới sẽ liên tục mở rộng dòng tiền.</li>
    </ul>

    <div class="in-article-cta">
      <div class="in-article-cta-title">✦ LÁ SỐ CỦA BẠN NĂM 2027 CÓ THÁI ÂM HÓA LỘC CHIẾU MỆNH KHÔNG? ✦</div>
      <p style="margin:0; font-size:0.92rem; color:var(--text-muted);">Vị trí Cung Tài Bạch và Cung Điền Trạch quyết định 90% việc tiền chảy vào túi hay thất thoát trong năm 2027.</p>
      <a href="/#lap-la-so" class="in-article-cta-btn"><i data-lucide="compass"></i> TRA CỨU CUNG TÀI BẠCH 2027 MIỄN PHÍ NGAY</a>
    </div>

    <h2>3. Top 3 Thế Đứng Trên Lá Số Dễ Phát Tài Rực Rỡ Nhất Năm 2027</h2>
    <p>Không phải ai cũng có vận tiền tài giống nhau. Trong thực tế luận giải, người đắc lộc năm 2027 phải có ít nhất 1 trong 3 thế đứng hoàng kim sau trên bàn lá số:</p>

    <h3>Thế 1: Thái Âm miếu vượng tại Dậu, Tuất, Hợi, Tý</h3>
    <p>Nếu trong lá số của bạn, sao Thái Âm đóng ở cung Hợi (được mệnh danh là <em>"Nguyệt lãng thiên môn"</em> - Trăng sáng cửa trời) hoặc tại Dậu, Tuất, Tý: Năm Đinh Mùi 2027 Hóa Lộc sẽ chiếu rọi trực tiếp, biến bạn thành thỏi nam châm thu hút tài lộc, kinh doanh một vốn bốn lời.</p>

    <h3>Thế 2: Cung Tài Bạch hoặc Cung Điền Trạch đóng tại cung Mùi (Lưu Thái Tuế)</h3>
    <p>Cung Mùi năm 2027 tiếp nhận toàn bộ năng lượng của Lưu Thái Tuế, Lưu Lộc Tồn (nếu có cách cục đẹp). Nếu cung Tài hoặc cung Điền của bạn nằm tại Mùi mà không bị Tuần Triệt phá hoại, bạn sẽ có cơ hội mua tậu nhà đất mới hoặc mở rộng cơ ngơi kinh doanh vô cùng vang dội.</p>

    <h3>Thế 3: Tam Hợp Hợi - Mão - Mùi hội tụ Song Lộc</h3>
    <p>Nếu Cung Mệnh hoặc Cung Tài nằm trong tam hợp Mộc cục (Hợi - Mão - Mùi) lại may mắn gặp cả <strong>Lộc Tồn nguyên thủy và Lưu Hóa Lộc 2027</strong> hội chiếu (gọi là Song Lộc Triều Viên): Tiền bạc năm này không chỉ đến từ tiền lương cố định mà liên tục đón nhận các khoản thưởng lớn, tiền đầu tư sinh lời vượt ngoài mong đợi.</p>

    <h2>4. Top Con Giáp Gặp "Thiên Thời Tiền Bạc" Năm Đinh Mùi 2027</h2>
    <ul>
      <li><strong>Tuổi Mão (1987 Đinh Mão, 1999 Kỷ Mão):</strong> Nằm trong tam hợp Hợi - Mão - Mùi. Khí vận hanh thông, công danh thăng tiến kéo theo bổng lộc dồi dào.</li>
      <li><strong>Tuổi Hợi (1983 Quý Hợi, 1995 Ất Hợi):</strong> Được Thái Âm đắc địa nâng đỡ, tài chính ổn định vững vàng, giải quyết dứt điểm các khoản nợ cũ và bắt đầu tích lũy của cải.</li>
      <li><strong>Tuổi Ngọ (1990 Canh Ngọ, 2002 Nhâm Ngọ):</strong> Chi Mùi lục hợp với chi Ngọ. Dễ gặp quý nhân tương trợ, được giao phó các dự án trọng điểm đem lại nguồn thu bứt phá.</li>
    </ul>

    <div class="article-callout warning">
      <div class="article-callout-title">⚠️ LỜI CẢNH BÁO TỪ CỔ NHÂN</div>
      <p>Năm 2027 tuy có Thái Âm Hóa Lộc nhưng đồng thời xuất hiện <strong>Cự Môn Hóa Kỵ</strong>. Nếu cung Tài Bạch của bạn vướng phải Hóa Kỵ hay Không Kiếp, tuyệt đối không được tham gia vào các dự án góp vốn mờ ám kẻo tiền vào cửa trước lại đội nón ra cửa sau.</p>
    </div>

    <h2>5. Lời Kết &amp; Phương Pháp Khải Vận Tài Lộc</h2>
    <p>Tiền tài trong Tử Vi là sự kết hợp giữa <em>"Thiên Thời"</em> (vận năm), <em>"Địa Lợi"</em> (cách chọn ngành nghề, phong thủy nhà ở) và <em>"Nhân Hòa"</em> (năng lực và đạo đức kinh doanh). Để nắm chắc vận may của mình, bước đầu tiên và quan trọng nhất là bạn cần nhìn rõ bàn cờ số mệnh của chính mình.</p>
  `
};

// =========================================================================
// BÀI VIẾT 2: ĐẦU TƯ, TÀI CHÍNH & QUẢN TRỊ RỦI RO 2027
// =========================================================================
const post2 = {
  id: 'post-2027-dau-tu-rui-ro',
  slug: 'du-bao-tai-chinh-dau-tu-nam-2027-hoa-giai-cu-mon-hoa-ky',
  title: 'Dự Báo Tài Chính & Đầu Tư Năm 2027: Cảnh Báo "Cự Môn Hóa Kỵ" & Bí Quyết Giữ Tiền Tránh Bẫy Thất Thoát',
  description: 'Cảnh báo rủi ro tài chính năm Đinh Mùi 2027: Cự Môn Hóa Kỵ gây kiện tụng, hợp đồng tranh chấp, mất tiền vì tin người. Hướng dẫn 4 tầng bảo vệ vốn đầu tư an toàn.',
  keywords: 'tài chính năm 2027, đầu tư năm 2027, cự môn hóa kỵ 2027, rủi ro tài chính 2027, hóa giải vận hạn 2027, xem tử vi đầu tư 2027, quản trị rủi ro đinh mùi',
  category: 'Tài lộc & Sự nghiệp',
  publishedAt: '2026-11-12',
  readTime: '9 phút',
  views: 3120,
  contentHtml: `
    <p>Nếu hỏi đâu là <strong>"quả bom nổ chậm"</strong> nguy hiểm nhất trong lá số Tử Vi năm <strong>Đinh Mùi 2027</strong> đối với giới kinh doanh và nhà đầu tư, câu trả lời của mọi bậc thầy Tử Vi Nam Phái đều thống nhất: <strong>Đó chính là CỰ MÔN HÓA KỴ!</strong></p>
    <p>Rất nhiều người chỉ nhìn thấy Thái Âm Hóa Lộc mà vội vã đổ hết tiền của đi đầu cơ, để rồi rơi vào cảnh trắng tay vì dính bẫy pháp lý, bị đối tác bội tín hoặc vướng vào kiện tụng kéo dài. Bài viết này sẽ bóc trần bản chất rủi ro tài chính năm 2027 và cung cấp ma trận 4 tầng bảo vệ tài sản chuẩn xác nhất.</p>

    <h2>1. Bóc Trần Bản Chất "Cự Môn Hóa Kỵ" Trong Năm Đinh Mùi 2027</h2>
    <p>Trong Tử Vi, sao <strong>Cự Môn</strong> là Bắc Đẩu Đệ Nhị Tinh, mang hành Thủy đới Kim, hóa khí thành <em>"Ám Tinh"</em>. Cự Môn cai quản miệng lưỡi, lời nói, hợp đồng, giao kết thương mại và các mối quan hệ xã giao. Khi can Đinh giáng xuống làm <strong>Cự Môn Hóa Kỵ</strong>, bản chất ám muội của ngôi sao này bị kích động đến tột cùng:</p>

    <ul>
      <li><strong>Cạm bẫy từ lời hứa ngọt ngào:</strong> Những lời rủ rê đầu tư "lợi nhuận cam kết 20–30%/tháng", các dự án bánh vẽ không có pháp lý rõ ràng sẽ xuất hiện nhan nhản. Người nhẹ dạ cả tin sẽ mất trắng chỉ sau một đêm.</li>
      <li><strong>Tranh chấp cổ phần, kiện tụng hợp đồng:</strong> Hợp tác làm ăn vốn êm ấm bỗng nảy sinh mâu thuẫn vì ăn chia không sòng phẳng, hợp đồng có kẽ hở pháp lý khiến đối tác lật kèo.</li>
      <li><strong>Khẩu thiệt hao tài:</strong> Một câu nói lỡ lời, một status bốc đồng trên mạng xã hội có thể kéo theo scandal ảnh hưởng trực tiếp đến uy tín kinh doanh và thiệt hại hàng trăm triệu đồng.</li>
    </ul>

    <div class="article-diagram">
      ${svg2}
      <div class="diagram-caption">Hình 2: Ma trận 4 tầng bảo vệ vốn &amp; phòng ngừa rủi ro đầu tư năm Đinh Mùi 2027.</div>
    </div>

    <h2>2. Những Cung Vị Tuyệt Đối Cấm "Tất Tay" (All-in) Năm 2027</h2>
    <p>Khi mở lá số Tử Vi của bạn ra, hãy kiểm tra kỹ các cung vị sau để xem bạn có thuộc diện "Báo động đỏ" trong năm 2027 hay không:</p>

    <h3>Trường hợp 1: Cung Tài Bạch có Cự Môn hoặc bị Hóa Kỵ chiếu</h3>
    <p>Đây là cách cục <em>"Hao tài tốn của vì thị phi"</em>. Tiền kiếm được bao nhiêu cũng dễ bị phát sinh các khoản chi ngoài ý muốn: nộp phạt, đền bù hợp đồng, chi phí thuốc men kiện cáo. Lời khuyên tối thượng: <strong>Ưu tiên giữ tiền mặt và vàng, tuyệt đối không lướt sóng chứng khoán hay tiền số với đòn bẩy cao.</strong></p>

    <h3>Trường hợp 2: Cung Quan Lộc gặp Địa Không - Địa Kiếp đồng cung</h3>
    <p>Địa Không - Địa Kiếp là cặp sát tinh bạo phát bạo tàn. Khi bước vào năm Đinh Mùi 2027, nếu bạn nôn nóng mở rộng quy mô công ty hoặc vay mượn ngân hàng quá 50% tài sản để ôm hàng, nguy cơ đứt gãy dòng tiền giữa năm là rất lớn.</p>

    <h3>Trường hợp 3: Cung Nô Bộc có Thiên Khôi, Thiên Việt gặp Kình Dương</h3>
    <p>Dấu hiệu rõ ràng của việc bị bạn bè, cấp dưới hoặc đối tác "gài bẫy" đứng tên vay nợ hộ hoặc làm người bảo lãnh pháp lý. Nhớ kỹ nguyên tắc: <strong>Năm 2027 không bảo lãnh tài chính cho bất kỳ ai!</strong></p>

    <div class="in-article-cta">
      <div class="in-article-cta-title">✦ KIỂM TRA ĐỘ AN TOÀN TÀI CHÍNH CỦA BẠN NĂM 2027 ✦</div>
      <p style="margin:0; font-size:0.92rem; color:var(--text-muted);">Hệ thống sẽ phân tích vị trí Lưu Hóa Kỵ, Cung Tài, Cung Điền và đưa ra chỉ số cảnh báo rủi ro chi tiết cho lá số của bạn.</p>
      <a href="/#lap-la-so" class="in-article-cta-btn"><i data-lucide="shield-alert"></i> KIỂM TRA RỦI RO ĐẦU TƯ 2027 MIỄN PHÍ</a>
    </div>

    <h2>3. Ma Trận 4 Lớp Bảo Vệ Tài Sản: Bí Quyết Biến Nguy Thành An</h2>
    <p>Để vô hiệu hóa năng lượng tiêu cực của Cự Môn Hóa Kỵ, cổ nhân truyền dạy phương pháp dùng <strong>Thiên Cơ Hóa Khoa</strong> để chế ngự:</p>

    <ol>
      <li><strong>Tầng 1 - Thẩm định pháp lý 100% bằng văn bản:</strong> Mọi khoản tiền ra vào từ 10 triệu đồng trở lên phải có hợp đồng, ủy nhiệm chi qua ngân hàng có ghi chú nội dung minh bạch. Tuyệt đối không giao dịch tiền mặt không có giấy biên nhận.</li>
      <li><strong>Tầng 2 - Chiến lược phân bổ vốn 60 - 30 - 10:</strong> 
        <ul>
          <li><em>60% vốn:</em> Đặt vào tài sản an toàn (đất có sổ hồng, vàng tích trữ, tiết kiệm kỳ hạn dài).</li>
          <li><em>30% vốn:</em> Dành cho hoạt động sản xuất kinh doanh cốt lõi đang tạo ra dòng tiền dương hàng tháng.</li>
          <li><em>10% vốn:</em> Quỹ khẩn cấp bằng tiền mặt sẵn sàng ứng phó trong 6 tháng.</li>
        </ul>
      </li>
      <li><strong>Tầng 3 - Tu dưỡng khẩu nghiệp:</strong> Cự Môn chủ về lời ăn tiếng nói. Năm 2027, hãy áp dụng triết lý <em>"Nói ít - Làm nhiều - Tránh tranh cãi"</em>. Im lặng là vàng, giữ sự khiêm nhường sẽ tránh được 80% thị phi tiểu nhân ganh ghét.</li>
      <li><strong>Tầng 4 - Trích lộc làm từ thiện (Hóa giải chủ động):</strong> Theo nguyên lý nhân quả Tử Vi, Hóa Kỵ gây hao tán tài sản. Nếu bạn chủ động trích 5–10% lợi nhuận để cúng dường, xây cầu làm đường, giúp đỡ người nghèo khó, bạn đã tự mình hoàn thành việc "hao tiền" nhưng tích về phúc đức vô lượng, triệt tiêu tai ương tiềm ẩn.</li>
    </ol>

    <h2>4. Lời Khuyên Đầu Tư Cho Từng Kênh Tài Sản Năm 2027</h2>
    <ul>
      <li><strong>Bất động sản:</strong> Ưu tiên đất nền có sổ sẵn, nhà phố ở thực, chung cư có pháp lý chuẩn. Tránh xa các dự án condotel hứa hẹn lợi nhuận ảo hoặc đất rừng, đất nông nghiệp phân lô chưa đủ điều kiện chuyển nhượng.</li>
      <li><strong>Chứng khoán / Cổ phiếu:</strong> Lựa chọn các doanh nghiệp đầu ngành có bảng cân đối kế toán lành mạnh, nợ vay thấp, chia cổ tức đều đặn bằng tiền mặt. Tránh lướt sóng các mã penny bị thao túng giá.</li>
      <li><strong>Khởi nghiệp / Mở rộng kinh doanh:</strong> Nên thăm dò thị trường từng bước nhỏ. Năm 2027 Thiên Đồng Hóa Quyền khuyên bạn nên tập trung vào đổi mới chất lượng sản phẩm hơn là đổ tiền chạy quảng cáo rầm rộ nhưng nội lực rỗng tuếch.</li>
    </ul>
  `
};

// =========================================================================
// BÀI VIẾT 3: HÔN NHÂN, TÌNH DUYÊN & GIA ĐẠO 2027
// =========================================================================
const post3 = {
  id: 'post-2027-hon-nhan-tinh-duyen',
  slug: 'tu-vi-hon-nhan-tinh-duyen-nam-2027-dinh-mui',
  title: 'Tử Vi Hôn Nhân & Tình Duyên Năm 2027 (Đinh Mùi): Năm Hỷ Tín Đắc Lộc Hay Sóng Gió Cung Phu Thê?',
  description: 'Luận giải chi tiết tình duyên, cưới hỏi và gia đạo năm 2027 Đinh Mùi. Nhận biết dấu hiệu kết hôn, sinh con và bí quyết vàng hóa giải khắc khẩu vợ chồng.',
  keywords: 'hôn nhân năm 2027, tình duyên 2027, tử vi cung phu thê 2027, cưới hỏi năm 2027 đinh mùi, xem hạn kết hôn 2027, hóa giải xung khắc vợ chồng, sinh con năm 2027',
  category: 'Hôn nhân & Gia đạo',
  publishedAt: '2026-11-12',
  readTime: '8 phút',
  views: 3450,
  contentHtml: `
    <p><em>"Thuận vợ thuận chồng tát biển Đông cũng cạn."</em> — Nhưng bước vào năm <strong>Đinh Mùi 2027</strong>, chuyện tình cảm và gia đạo của rất nhiều gia đình sẽ đứng trước những phép thử lớn. Dưới tác động của bộ sao đôi <strong>Thái Âm Hóa Lộc</strong> và <strong>Cự Môn Hóa Kỵ</strong>, năm 2027 vừa mở ra cơ hội trăm năm kết tóc cho người độc thân, vừa đặt ra bài toán hóc búa về sự lắng nghe và hòa hợp cho các cặp vợ chồng.</p>

    <h2>1. Bức Tranh Tình Cảm Năm Đinh Mùi 2027: Gió Yên Hay Sóng Ngầm?</h2>
    <p>Trong Tử Vi Nam Phái, cung <strong>Phu Thê</strong> không đứng độc lập mà luôn nằm trong thế Tam Phương Tứ Chính hội chiếu cùng cung <strong>Quan Lộc, Phúc Đức và Thiên Di</strong>. Năm Đinh Mùi 2027, can Đinh tạo ra một rung cảm đặc biệt:</p>
    <ul>
      <li><strong>Mặt sáng (Thái Âm Hóa Lộc):</strong> Người bạn đời là quý nhân đem lại may mắn về tài chính, cùng nhau gây dựng kinh tế gia đình vững chắc. Phụ nữ trong nhà có tiếng nói quyết định và được yêu chiều.</li>
      <li><strong>Mặt tối (Cự Môn Hóa Kỵ):</strong> Cực kỳ dễ nảy sinh "chiến tranh lạnh", khẩu chiến từ những hiểu lầm vụn vặt trong cuộc sống hàng ngày. Nếu không làm chủ được cái tôi, lời nói lúc nóng giận sẽ để lại vết thương khó lành.</li>
    </ul>

    <div class="article-diagram">
      ${svg3}
      <div class="diagram-caption">Hình 3: Sơ đồ soi chiếu hỷ tín cưới hỏi &amp; bí quyết hóa giải xung khắc Cung Phu Thê năm 2027.</div>
    </div>

    <h2>2. Dấu Hiệu Hỷ Tín Kết Hôn &amp; Sinh Quý Tử Trong Năm 2027</h2>
    <p>Đối với các bạn trẻ đang tìm kiếm một nửa đích thực hoặc mong mỏi chuyện thành gia lập thất, năm Đinh Mùi 2027 là thời cơ vàng nếu lá số của bạn xuất hiện các dấu hiệu sau:</p>

    <h3>Dấu hiệu 1: Lưu Đào Hoa hoặc Lưu Hồng Loan nhập Cung Mệnh / Phu Thê</h3>
    <p>Năm 2027 chi Mùi, các sao đào hoa lưu động sẽ kích hoạt mạnh mẽ duyên phận. Người độc thân đi đâu cũng dễ gặp được đối tượng ưng ý, tình cảm tiến triển nhanh chóng, gia đình đôi bên ủng hộ nhiệt liệt.</p>

    <h3>Dấu hiệu 2: Thiên Đồng Hóa Quyền gặp Thiên Hỷ</h3>
    <p>Thiên Đồng chủ về sự đổi mới, kết hợp cùng Hóa Quyền thể hiện hành động dứt khoát. Cặp đôi đã yêu nhau nhiều năm sẽ chính thức quyết định về chung một nhà, danh chính ngôn thuận tổ chức hôn lễ trang trọng.</p>

    <h3>Dấu hiệu 3: Cung Tử Tức hội tụ Hóa Lộc, Ân Quang, Thiên Quý</h3>
    <p>Đây là chỉ dấu báo trước gia đình sẽ đón thêm quý tử hoặc công chúa trong năm Đinh Mùi. Đứa trẻ sinh năm Đinh Mùi mang mệnh Thiên Hà Thủy, thông minh, hiếu thảo và là sợi dây gắn kết cha mẹ thêm bền chặt.</p>

    <div class="in-article-cta">
      <div class="in-article-cta-title">✦ NĂM 2027 BẠN VÀ NGƯỜI ẤY CÓ HẠN KẾT HÔN HAY KHÔNG? ✦</div>
      <p style="margin:0; font-size:0.92rem; color:var(--text-muted);">Tra cứu chỉ số hòa hợp Cung Phu Thê, xem hạn cưới hỏi và sinh con năm Đinh Mùi 2027 theo chuẩn Tử Vi Nam Phái.</p>
      <a href="/#lap-la-so" class="in-article-cta-btn"><i data-lucide="heart"></i> SOI CUNG PHU THÊ &amp; HẠN KẾT HÔN 2027</a>
    </div>

    <h2>3. Cảnh Báo "Khẩu Thiệt Hóa Kỵ": Tại Sao Vợ Chồng Dễ Cãi Nhau Năm 2027?</h2>
    <p>Đối với các gia đình đã kết hôn, Cự Môn Hóa Kỵ là sát tinh gây đau đầu nhất. Khi Hóa Kỵ rơi vào Cung Phu Thê hoặc Cung Phúc Đức trong năm 2027:</p>
    <ul>
      <li><strong>Bất đồng quan điểm về tài chính:</strong> Một bên muốn tiết kiệm tích lũy (ảnh hưởng của Thái Âm), một bên muốn mở rộng kinh doanh đầu tư mạo hiểm, dẫn tới tranh cãi triền miên.</li>
      <li><strong>Mối quan hệ mẹ chồng - nàng dâu / nội ngoại:</strong> Cự Môn là sao nhiều lời. Lời nói bóng gió từ người ngoài hoặc sự can thiệp quá sâu của gia đình hai bên dễ thổi bùng ngọn lửa mâu thuẫn.</li>
      <li><strong>Đề phòng người thứ ba:</strong> Nếu Cung Phu Thê có sự xuất hiện của <em>Phục Binh, Thiên Riêu hoặc Tham Lang hãm địa</em>, cần cẩn trọng các mối quan hệ xã giao bên ngoài kẻo sa chân vào bẫy tình cảm ngoài luồng.</li>
    </ul>

    <h2>4. 3 Bí Quyết Phong Thủy &amp; Tu Dưỡng Giữ Trọn Lửa Yêu Năm 2027</h2>
    <ol>
      <li><strong>Quy tắc "3 giây im lặng" trước khi cất lời:</strong> Khi cảm thấy cơn giận bốc lên, hãy hít thở sâu và dừng lại 3 giây. Đừng biến lời nói của mình thành vũ khí sát thương người bạn đời. Nhớ rằng: <em>"Thắng trong tranh cãi thì thua trong tình cảm."</em></li>
      <li><strong>Phong thủy phòng ngủ đón sinh khí:</strong>
        <ul>
          <li>Tránh kê gương soi chiếu thẳng vào đầu giường hoặc cửa ra vào phòng ngủ (gương khuếch đại năng lượng bất an của Cự Môn).</li>
          <li>Giữ phòng ngủ luôn thoáng đãng, thơm mát với ánh sáng vàng ấm áp để tăng cường năng lượng mộc và hỏa tương sinh.</li>
          <li>Đặt một cặp hồ lô phong thủy hoặc thạch anh hồng ở đầu giường để gắn kết tình cảm vợ chồng.</li>
        </ul>
      </li>
      <li><strong>Cùng nhau làm việc thiện tích đức:</strong> Cuối tuần cùng nhau đi lễ chùa, phóng sinh, làm từ thiện. Khi hai tâm hồn cùng hướng về những điều thiện lành, mọi năng lượng hung hiểm của Hóa Kỵ đều tự khắc tan biến như sương mai gặp nắng ấm.</li>
    </ol>

    <h2>5. Lời Kết</h2>
    <p>Hôn nhân không phải là tìm kiếm một người hoàn hảo, mà là hai con người chưa hoàn hảo cùng nhau nhìn về một hướng và bao dung cho khiếm khuyết của nhau. Hiểu rõ Cung Phu Thê trên lá số Tử Vi năm 2027 sẽ giúp bạn biết điểm mạnh để phát huy, biết điểm yếu để phòng ngừa, từ đó giữ cho mái ấm gia đình luôn tràn ngập tiếng cười và hạnh phúc.</p>
  `
};

// Đọc danh sách hiện tại
let posts = [];
try {
  posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
} catch (e) {
  posts = [];
}

// Thay thế hoặc thêm mới 3 bài viết
const newPosts = [post1, post2, post3];
newPosts.forEach(newP => {
  const idx = posts.findIndex(p => p.slug === newP.slug || p.id === newP.id);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], newP);
  } else {
    // Đưa 3 bài viết mới này lên đầu danh sách để độc giả thấy ngay
    posts.unshift(newP);
  }
});

fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), 'utf8');
console.log('Đã cập nhật thành công 3 bài viết SEO 2027 vào data/posts.json! Tổng số bài viết:', posts.length);
