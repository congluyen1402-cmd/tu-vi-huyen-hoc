const TuViEngine = require('../js/tuvi-engine.js');
const c = TuViEngine.lapLaSo(10, 4, 2002, 10, 'nam', false, '19:30', 2026);

function generatePalaceCliffhangerTeaser(cung, laSo) {
  const cungName = cung.cungName.replace('<THÂN>', '').trim();
  const chinhTinhNames = (cung.chinhTinh || []).map(s => s.name + (s.dacHam ? ' ' + s.dacHam : '')).join(', ') || 'Vô Chính Diệu';
  
  const satTinhNames = (cung.phuTinhRight || []).map(s => s.name).slice(0, 3).join(', ');
  const catTinhNames = (cung.phuTinhLeft || []).map(s => s.name).slice(0, 3).join(', ');

  let bullets = [];

  switch (cungName) {
    case 'TÀI BẠCH':
      bullets = [
        `Bí pháp kích hoạt nguồn tiền đại cát từ <strong>[${chinhTinhNames}]</strong> trong năm Bính Ngọ 2026.`,
        `Tháng âm lịch trong năm 2026 – 2027 cần đề phòng hao tài lớn nhất do tác động của <strong>[${satTinhNames || 'Địa Không, Tiểu Hao'}]</strong>.`,
        `Định hướng phân bổ dòng vốn: Lá số của bạn hợp đầu tư Bất Động Sản, Chứng Khoán hay kinh doanh dịch vụ?`,
        `Toàn văn phương pháp Cải Mệnh &amp; Tích Phúc Tụ Tài kinh điển của cụ Nguyễn Phát Lộc cho Cung Tài Bạch.`
      ];
      break;
    case 'QUAN LỘC':
      bullets = [
        `Ngành nghề &amp; lĩnh vực đại vận giúp bạn đột phá công danh với thế đứng của <strong>[${chinhTinhNames}]</strong>.`,
        `Thời điểm vàng chuyển việc, thăng chức hoặc mở rộng quy mô kinh doanh trong 2 năm 2026 – 2027.`,
        `Bí quyết chế ngự tiểu nhân ganh ghét và kích hoạt quý nhân nâng đỡ trên con đường thăng tiến.`
      ];
      break;
    case 'PHU THÊ':
      bullets = [
        `Chân dung, tính cách &amp; nghề nghiệp của người bạn đời tiền định qua bộ sao <strong>[${chinhTinhNames}]</strong>.`,
        `Thời điểm kết hôn hoặc giai đoạn thử thách hôn nhân cần hóa giải để gia đạo hòa thuận bền lâu.`,
        `Phương pháp hóa giải triệt để ảnh hưởng của <strong>[${satTinhNames || 'Sát Tinh ngầm / Không Vong'}]</strong> để giữ trọn lửa ấm gia đình.`
      ];
      break;
    case 'ĐIỀN TRẠCH':
      bullets = [
        `Quy mô và thời điểm tích lũy bất động sản lớn nhất trong đời theo thế đứng của <strong>[${chinhTinhNames}]</strong>.`,
        `Năm nào trong đại vận là thời điểm vàng để mua bán nhà đất không lo tranh chấp, sinh lời tối đa?`,
        `Bí quyết phong thủy nhà ở kích hoạt cung Tài Lộc tương sinh với bản mệnh.`
      ];
      break;
    case 'THIÊN DI':
      bullets = [
        `Vận số xuất ngoại, đi xa lập nghiệp: Cơ hội thăng tiến và đắc thời đắc vị ngoài xã hội.`,
        `Phương vị xuất hành đại cát và các tháng cần cẩn trọng an toàn giao thông năm 2026.`,
        `Cách biến môi trường xã hội bên ngoài thành bàn đạp làm giàu nhanh chóng.`
      ];
      break;
    case 'PHÚC ĐỨC':
      bullets = [
        `Mức độ thụ hưởng phúc ấm tổ tiên và chiều sâu nội tâm theo bộ sao <strong>[${chinhTinhNames}]</strong>.`,
        `Nguồn năng lượng tâm linh và nghiệp lực dòng họ tác động đến hậu vận như thế nào?`,
        `Phương pháp tu dưỡng tâm tính &amp; tích lũy âm đức giúp tiêu trừ vận hạn lớn.`
      ];
      break;
    case 'TỬ TỨC':
      bullets = [
        `Số lượng, giới tính và đường công danh hiển đạt của con cái sau này theo <strong>[${chinhTinhNames}]</strong>.`,
        `Tính cách con cái và phương pháp giáo dục phù hợp để con thành tài, hiếu thuận.`,
        `Hóa giải các hung tinh chiếu cung con cái để gia đạo bình an.`
      ];
      break;
    case 'TẬT ÁCH':
      bullets = [
        `Bản đồ sức khỏe: Các cơ quan tạng phủ dễ suy yếu cần chú ý bảo dưỡng theo ngũ hành bản mệnh.`,
        `Năm hạn và tháng âm lịch cần đề phòng tai nạn, bệnh tật bất ngờ trong đại vận.`,
        `Pháp hóa giải huyết quang và cách ăn uống dưỡng sinh khoa học của cụ Nguyễn Phát Lộc.`
      ];
      break;
    default:
      bullets = [
        `Toàn bộ ma trận Tam Phương Tứ Chính hội chiếu tương tác vào Cung <strong>${cungName}</strong>.`,
        `Dự báo cơ hội bứt phá và rủi ro tiềm ẩn trong chu kỳ 2 năm tới (2026 – 2027).`,
        `Lời khuyên Cải Mệnh &amp; Hóa Giải sát tinh chi tiết từ các bậc tiền bối Tử Vi Lý Số.`
      ];
  }

  return {
    cungName,
    chinhTinhNames,
    bullets
  };
}

const cTai = c.cung.find(p => p.cungName.includes('TÀI BẠCH'));
console.log(generatePalaceCliffhangerTeaser(cTai, c));

