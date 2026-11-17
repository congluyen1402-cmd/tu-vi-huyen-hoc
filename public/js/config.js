/**
 * Cấu hình trung tâm cho Xem Tử Vi Huyền Học (xemtuvihuyenhoc.com)
 * Đồng bộ tự động: Thanh toán VietQR SePay, Bảng giá Micro-transactions & Liên hệ Zalo
 */

window.SITE_CONFIG = {
  brandName: "Xem Tử Vi Huyền Học",
  domain: "https://www.xemtuvihuyenhoc.com",
  currentYear: 2027,
  currentCanChi: "Đinh Mùi",
  nextYear: 2028,
  nextCanChi: "Mậu Thân",

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
      name: "Gói Xem Nhanh 3 Cung Tự Chọn",
      price: 29000,
      oldPrice: 99000,
      badge: "Tiết kiệm · Xem ngay",
      features: [
        "Tự do chọn 3 cung bất kỳ (Tài Bạch, Quan Lộc, Phu Thê,...)",
        "Phân tích chi tiết chính tinh, cát tinh, sát tinh & Đạo trị mệnh 3 cung",
        "Tặng kèm MIỄN PHÍ Cung Mệnh & Cung Phụ Mẫu (không tính vào 3 cung)"
      ]
    },
    vip_49k: {
      id: "vip_49k",
      name: "Báo Cáo VIP A4 Toàn Thư",
      price: 49000,
      oldPrice: 199000,
      badge: "★ ĐƯỢC CHỌN NHIỀU NHẤT",
      features: [
        "Mở khóa toàn bộ 12 cung luận giải chi tiết (không che mờ)",
        "Luận giải Đại Hạn các thập niên (từ 6 đến 75+ tuổi) & Phương pháp Hóa giải",
        "Phân tích Tam Phương Tứ Chính & Tứ Hóa Phi Tinh (Lộc - Quyền - Khoa - Kỵ)",
        "Dự báo Vận Hạn Lưu Niên 2027 (Đinh Mùi) & 2028 (Mậu Thân)",
        "Xuất file in PDF A4 màu hoàng gia trang trọng lưu giữ trọn đời",
        "Tích hợp Cố Vấn Tử Vi AI giải đáp thấu đáo"
      ]
    },
    deep_490k: {
      id: "deep_490k",
      name: "Tham Vấn 1-1 Chuyên Gia",
      price: 490000,
      oldPrice: 990000,
      badge: "Chuyên sâu 1-1",
      features: [
        "Đàm đạo 1-1 riêng tư trực tiếp cùng Chuyên Gia (Zalo Call / Zoom)",
        "Tháo gỡ nút thắt: Hôn nhân rạn nứt, công danh, đổi việc, tài vận",
        "Tùy chọn: 490k / 45 phút (Chuyên đề) hoặc 990k / 60 phút (Toàn đồ)",
        "Tặng kèm toàn bộ Combo Báo Cáo VIP A4 (trị giá 199.000đ)",
        "Bảo mật 100% hồ sơ thông tin và bí mật cá nhân"
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

  // Cập nhật Banner vận hạn năm 2027 (Đinh Mùi)
  const seasonalText = document.getElementById("pricingSeasonalText");
  if (seasonalText) {
    seasonalText.textContent =
      "Vận Hạn " + cfg.currentYear + " (" + cfg.currentCanChi + ") – Định vị cát hung & đại vận trọn đời";
  }
});

// =========================================================================
// HỆ THỐNG ĐỒNG BỘ SỰ KIỆN & PHÂN TÍCH HÀNH VI (TuViTracker)
// =========================================================================
(function() {
  function getOrCreateVisitorId() {
    try {
      let vid = localStorage.getItem('tvhh_visitor_id');
      if (!vid) {
        vid = 'vis_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
        localStorage.setItem('tvhh_visitor_id', vid);
      }
      return vid;
    } catch (e) {
      return 'vis_anon_' + Date.now().toString(36);
    }
  }

  window.TuViTracker = {
    visitorId: getOrCreateVisitorId(),
    track: function(eventType, details) {
      try {
        const payload = {
          eventType: eventType,
          visitorId: this.visitorId,
          details: details || {},
          timestamp: new Date().toISOString()
        };

        const dataStr = JSON.stringify(payload);
        if (navigator.sendBeacon) {
          const blob = new Blob([dataStr], { type: 'application/json' });
          if (navigator.sendBeacon('/api/analytics/track', blob)) return;
        }

        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: dataStr,
          keepalive: true
        }).catch(function() {});
      } catch (err) {
        console.warn('TuViTracker error:', err);
      }
    }
  };

  // Tự động ghi nhận lượt xem trang (page_view)
  document.addEventListener('DOMContentLoaded', function() {
    try {
      const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      window.TuViTracker.track('page_view', {
        path: window.location.pathname,
        referrer: document.referrer || '',
        screen: window.innerWidth + 'x' + window.innerHeight,
        device: isMobile ? 'mobile' : 'desktop'
      });
    } catch (e) {}
  });
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.SITE_CONFIG;
}
