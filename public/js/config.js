/**
 * Cấu hình trung tâm cho Xem Tử Vi Huyền Học (xemtuvihuyenhoc.com)
 * Đồng bộ tự động: Thanh toán VietQR SePay, Bảng giá Micro-transactions & Liên hệ Zalo
 */

window.SITE_CONFIG = {
  brandName: "Xem Tử Vi Huyền Học",
  domain: "https://www.xemtuvihuyenhoc.com",
  currentYear: 2026,
  currentCanChi: "Bính Ngọ",
  nextYear: 2027,
  nextCanChi: "Đinh Mùi",

  // 1. THÔNG TIN LIÊN HỆ & HỖ TRỢ (Thay số Zalo thật của bạn vào đây)
  contact: {
    ZALO_PHONE: "0925760173", // <-- THAY BẰNG SỐ ĐIỆN THOẠI ZALO THẬT CỦA BẠN
    ZALO_URL: "https://zalo.me/0925760173", // <-- THAY SỐ ZALO THẬT VÀO CUỐI LINK
    HOTLINE_DISPLAY: "0925.760.173",
    EMAIL: "hotro@xemtuvihuyenhoc.com",
    SUPPORT_HOURS: "08:30 – 22:00 (Tất cả các ngày trong tuần)"
  },

  // 2. CẤU HÌNH NGÂN HÀNG NHẬN TIỀN TỰ ĐỘNG QUA SEPAY VIETQR
  payment: {
    bankId: "ICB", // Mã ngân hàng VietinBank chuẩn VietQR
    bankName: "VietinBank",
    accountNo: "108884822302",
    accountName: "TRAN CONG LUYEN",
    orderPrefix: "TV",
    defaultAmount: 49000
  },

  // 3. CẤU HÌNH CÁC GÓI MỞ KHÓA TỰ ĐỘNG (MICRO-TRANSACTIONS)
  packages: {
    quick_29k: {
      id: "quick_29k",
      name: "Gói Mở Khóa Nhanh Vận Hạn 2026–2027 & 3 Cung Trọng Tâm",
      price: 29000,
      oldPrice: 99000,
      badge: "Tiết kiệm · Xem ngay",
      features: [
        "Mở khóa chi tiết 3 cung nóng nhất: Tài Bạch, Quan Lộc, Phu Thê",
        "Luận giải Lưu Niên 2026 (Bính Ngọ) & Dự báo sớm 2027 (Đinh Mùi)",
        "Chỉ rõ các tháng âm lịch dễ hao tài hoặc đón lộc bất ngờ"
      ]
    },
    vip_49k: {
      id: "vip_49k",
      name: "Báo Cáo VIP A4 Toàn Thư (12 Cung & Đại Vận Trọn Đời)",
      price: 49000,
      oldPrice: 199000,
      badge: "92% Khách hàng chọn",
      features: [
        "Mở khóa toàn bộ luận giải 12 cung không che mờ",
        "Xuất file PDF A4 đóng dấu mộc đỏ lưu trữ trọn đời",
        "Phân tích Ma Trận Tam Phương Tứ Chính & Đại Hạn 10 năm",
        "Luận đoán chi tiết Lưu Niên 2026 – 2027 & Cách hóa giải sát tinh"
      ]
    },
    deep_149k: {
      id: "deep_149k",
      name: "Gói Luận Giải Chuyên Sâu Hôn Nhân, Điền Sản & Cải Mệnh",
      price: 149000,
      oldPrice: 399000,
      badge: "Chuyên sâu",
      features: [
        "Bao gồm toàn bộ quyền lợi của Báo Cáo VIP A4 Toàn Thư",
        "Chuyên đề Tình Duyên: Hóa giải Cung Phu Thê gặp Tuần/Triệt, Cô Quả",
        "Chuyên đề Tài Điền: Chu kỳ tích lũy đất đai và bứt phá tài chính",
        "Kèm 5 lượt Hỏi Đáp trực tiếp với Cố Vấn Tử Vi AI trên lá số của bạn"
      ]
    }
  },

  // 4. DANH SÁCH VẬT PHẨM PHONG THỦY HỘ THÂN THEO NGŨ HÀNH BẢN MỆNH
  fengShuiItems: {
    Kim: [
      { name: "Vòng Đá Thạch Anh Tóc Vàng (Thổ sinh Kim)", benefit: "Bồi tụ nguyên khí, kích hoạt cung Tài Bạch & thu hút quý nhân", price: "350.000 đ" },
      { name: "Tỳ Hưu Đá Mắt Hổ Vàng Nâu", benefit: "Giữ tiền, hóa giải sát tinh Hao Kỵ chiếu mệnh", price: "290.000 đ" }
    ],
    Moc: [
      { name: "Vòng Đá Aquamarine Xanh Biển (Thủy sinh Mộc)", benefit: "An định tâm trí, hóa giải thị phi Quan Phù, Thái Tuế", price: "380.000 đ" },
      { name: "Chuỗi Đá Thạch Anh Xanh Aventurine", benefit: "Thúc đẩy công danh, thuận lợi thi cử và thăng tiến", price: "260.000 đ" }
    ],
    Thuy: [
      { name: "Vòng Đá Thạch Anh Trắng Ánh Kim (Kim sinh Thủy)", benefit: "Khai thông trí tuệ, hóa giải u buồn Cô Thần, Quả Tú", price: "320.000 đ" },
      { name: "Hồ Ly Đá Obsidian Đen Hộ Duyên", benefit: "Giữ gìn hạnh phúc gia đạo, hóa giải đào hoa xấu", price: "280.000 đ" }
    ],
    Hoa: [
      { name: "Vòng Đá Thạch Anh Tím Amethyst (Mộc sinh Hỏa)", benefit: "Tăng cường trực giác, hóa giải nóng nảy của Hỏa Tinh, Linh Tinh", price: "390.000 đ" },
      { name: "Vòng Gỗ Trầm Hương Tự Nhiên 108 Hạt", benefit: "Tịnh tâm, tiêu trừ chướng khí và bồi đắp phúc đức", price: "450.000 đ" }
    ],
    Tho: [
      { name: "Vòng Đá Mã Não Đỏ Hồng (Hỏa sinh Thổ)", benefit: "Vượng khí cung Điền Trạch, củng cố sức khỏe và tài vận", price: "310.000 đ" },
      { name: "Đồng Điếu Đá Ngọc Hoàng Long", benefit: "Chiêu tài tụ lộc, thuận lợi buôn bán và giao dịch đất đai", price: "250.000 đ" }
    ]
  },

  returnsSupportText: "Hỗ trợ kiểm tra hàng khi nhận và đổi trả trong vòng 7 ngày nếu vật phẩm bị hư hỏng, nứt vỡ trong quá trình vận chuyển."
};

// Đồng bộ với SOCIAL_CONFIG trong index.html
window.SOCIAL_CONFIG = {
  FACEBOOK_URL: "",
  YOUTUBE_URL: "",
  ZALO_URL: window.SITE_CONFIG.contact.ZALO_URL,
  INSTAGRAM_URL: "https://instagram.com/tu_vi_huyenhoc",
  EMAIL: window.SITE_CONFIG.contact.EMAIL
};

// Tự động cập nhật các liên kết Zalo hỗ trợ và nhãn năm vận hạn trên DOM
document.addEventListener("DOMContentLoaded", function () {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  // Cập nhật mọi link Zalo hỗ trợ trên trang
  document.querySelectorAll(".vip-zalo-link").forEach(function (el) {
    el.href = cfg.contact.ZALO_URL;
  });

  // Cập nhật Banner vận hạn cuối năm 2026 - đón đầu 2027
  const seasonalText = document.getElementById("pricingSeasonalText");
  if (seasonalText) {
    seasonalText.textContent =
      "Tổng kết vận trình " + cfg.currentYear + " (" + cfg.currentCanChi + ") & Đón đầu đại vận " + cfg.nextYear + " (" + cfg.nextCanChi + ")";
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.SITE_CONFIG;
}
