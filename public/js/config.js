/**
 * CẤU HÌNH HỆ THỐNG XEM TỬ VI HUYỀN HỌC (SITE_CONFIG)
 * Single Source of Truth cho thông tin liên hệ, chính sách, chuyên gia và bảng giá.
 * Chủ website điền các trường TODO bên dưới.
 */
(function (global) {
  'use strict';

  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth() + 1;
  const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

  function computeCanChi(year) {
    const can = CAN[(year + 6) % 10];
    const chi = CHI[(year + 8) % 12];
    return `${can} ${chi}`;
  }

  const curCanChi = computeCanChi(curYear);
  const nextCanChi = computeCanChi(curYear + 1);

  // Hiển thị năm vận hạn: nếu vào tháng 11, 12 thì hiển thị kèm năm kế tiếp
  let seasonalYearLabel = `${curYear} (${curCanChi})`;
  if (curMonth >= 11) {
    seasonalYearLabel = `${curYear} (${curCanChi}) & Đón đầu ${curYear + 1} (${nextCanChi})`;
  }

  const SITE_CONFIG = {
    // 1. THÔNG TIN LIÊN HỆ & PHÁP NHÂN
    businessName: 'Xem Tử Vi Huyền Học',
    contactEmail: '', // TODO: Điền email liên hệ (VD: hotro@xemtuvihuyenhoc.com)
    zaloUrl: '', // TODO: Điền link Zalo chính thức (VD: https://zalo.me/09xxxx) hoặc để trống để ẩn
    phone: '',        // TODO: Điền số điện thoại hotline nếu có
    address: '',      // TODO: Điền địa chỉ văn phòng nếu có
    facebookUrl: '',  // TODO: Điền link Fanpage Facebook nếu có
    instagramUrl: 'https://instagram.com/tu_vi_huyenhoc',
    youtubeUrl: '',   // TODO: Điền link kênh Youtube nếu có

    // 2. CHÍNH SÁCH ĐỔI TRẢ & HỖ TRỢ VẬT PHẨM PHONG THỦY
    returnsSupportText: 'Hỗ trợ kiểm tra hàng khi nhận và đổi trả trong vòng 7 ngày nếu vật phẩm bị hư hỏng, nứt vỡ trong quá trình vận chuyển.',

    // 3. THÔNG TIN VẬN HẠN DYNAMIC THEO NĂM HIỆN TẠI
    currentYear: curYear,
    currentCanChi: curCanChi,
    nextYear: curYear + 1,
    nextCanChi: nextCanChi,
    seasonalYearLabel: seasonalYearLabel,

    // 4. DANH SÁCH CHUYÊN GIA (Chỉ hiển thị khi verified === true và có file ảnh hợp lệ)
    // Nếu rỗng hoặc verified === false, hệ thống sẽ tự động hiển thị khối 'Đội ngũ tư vấn' trung tính
    experts: [
      // TODO: Chủ website bổ sung chuyên gia thật khi đã xác thực:
      // {
      //   name: "Chuyên gia ...",
      //   title: "Nhà nghiên cứu Tử Vi Đẩu Số",
      //   years: 15,
      //   photo: "/img/experts/chuyen-gia-1.jpg",
      //   bio: "Chuyên sâu phân tích đại vận, định hướng công việc và gia đạo.",
      //   verified: true
      // }
    ],

    // 5. CẤU TRÚC BẢNG GIÁ DỊCH VỤ MINH BẠCH
    pricing: {
      // Nhóm 1: Báo Cáo Luận Giải (File PDF)
      reports: [
        {
          id: 'free',
          name: 'Tra Cứu Cơ Bản',
          price: 0,
          desc: 'Tổng quan bố cục bản mệnh và hai cung khởi đầu',
          badge: '',
          featuresIncluded: [
            'Lập lá số chính xác 12 cung & 14 chính tinh',
            'Luận giải chi tiết 2 cung (Mệnh & Phụ Mẫu)',
            'Xem đại hạn đầu đời (6 – 15 tuổi)'
          ],
          featuresMissing: [
            '10 cung còn lại',
            'Đại hạn từ 16 tuổi trở đi',
            'Xuất file PDF A4 lưu trữ'
          ],
          ctaText: 'Bắt đầu tra cứu',
          ctaLink: '#lap-la-so'
        },
        {
          id: 'vip_49k',
          name: 'Báo Cáo VIP A4',
          price: 49000,
          originalPrice: 199000,
          desc: 'Bản luận giải đầy đủ 12 cung và vận hạn trọn đời',
          badge: 'Khuyên dùng',
          featuresIncluded: [
            'Mở khóa toàn bộ luận giải 12 cung không che',
            'Xuất file PDF A4 đầy đủ bố cục lưu trữ trọn đời',
            'Phân tích Ma Trận Tam Phương Tứ Chính',
            `Luận đoán Vận Hạn Lưu Niên ${curYear} (${curCanChi})`,
            'Bảng phương hướng xuất hành, con số và màu tương sinh'
          ],
          featuresMissing: [],
          ctaText: 'Mở Khóa VIP (49.000đ)',
          isVipModal: true
        },
        {
          id: 'vip_199k',
          name: 'Luận Chuyên Sâu',
          price: 199000,
          originalPrice: 399000,
          desc: 'Phân tích chuyên đề Hôn Nhân Gia Đạo hoặc Điền Sản Kinh Doanh',
          badge: '',
          featuresIncluded: [
            'Đầy đủ toàn bộ quyền lợi của Báo Cáo VIP A4',
            'Chuyên đề Tình Duyên: Hóa giải Cung Phu Thê bị Tuần Triệt',
            'Chuyên đề Điền Sản: Thời điểm phát tài đại vận',
            'Phương pháp tu dưỡng cải mệnh theo học thuyết cổ truyền',
            'Bản báo cáo phân tích chuyên sâu chi tiết'
          ],
          featuresMissing: [],
          ctaText: 'Đăng Ký Luận Sâu (199.000đ)',
          isVipModal: true
        }
      ],

      // Nhóm 2: Tư Vấn Trực Tiếp (Cuộc Gọi 1-1)
      consultations: [
        {
          id: 'call_30m',
          name: 'Tham Vấn 1-1 Chuyên Đề',
          price: 490000,
          duration: '30 phút',
          desc: 'Giải đáp trực tiếp 1 vấn đề trọng tâm: Công việc, Hôn nhân hoặc Vận hạn năm',
          features: [
            'Đàm đạo trực tiếp qua Zalo Call / Zoom 30 phút',
            'Tập trung tháo gỡ bế tắc hoặc lựa chọn ngã rẽ cụ thể',
            'Định hướng thời điểm hành động thuận lợi'
          ]
        },
        {
          id: 'call_60m',
          name: 'Luận Đàm 1-1 Toàn Đồ',
          price: 990000,
          duration: '60 phút',
          desc: 'Phân tích toàn diện 12 cung, 10 năm đại vận và định hướng dài hạn',
          features: [
            'Đàm đạo trực tiếp 60 phút cùng chuyên gia',
            'Soi chiếu tổng thể Mệnh - Thân - Tài - Quan - Phối',
            'Định vị thiên thời, địa lợi, nhân hòa trong đại vận',
            'Hỗ trợ giải đáp thắc mắc thêm trong 7 ngày sau buổi đàm'
          ]
        }
      ]
    }
  };

  global.SITE_CONFIG = SITE_CONFIG;
})(typeof window !== 'undefined' ? window : this);

