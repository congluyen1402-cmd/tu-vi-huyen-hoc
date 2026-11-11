const TuViEngine = require('../js/tuvi-engine.js');
const c = TuViEngine.lapLaSo(10, 4, 2002, 10, 'nam', false, '19:30', 2026);

// Test building the psychological teaser
function buildFreePsychologicalTeaser(laSo) {
  const pMenh = laSo.cung[laSo.cungMenh.chiIndex];
  const pThan = laSo.cung[laSo.cungThan.chiIndex];
  const pTai = laSo.cung.find(p => p.cungName.includes('TÀI BẠCH')) || laSo.cung[1];
  const pQuan = laSo.cung.find(p => p.cungName.includes('QUAN LỘC')) || laSo.cung[9];
  const pPhuThe = laSo.cung.find(p => p.cungName.includes('PHU THÊ')) || laSo.cung[3];
  const pDi = laSo.cung.find(p => p.cungName.includes('THIÊN DI')) || laSo.cung[11];

  const ctMenh = pMenh.chinhTinh.map(s => s.name).join(', ') || 'Vô Chính Diệu';
  const ctThan = pThan.chinhTinh.map(s => s.name).join(', ') || 'Vô Chính Diệu';
  const thanCu = laSo.thanCu || 'tài bạch';

  // 1. Góc khuất nội tâm
  let gockhuatText = '';
  if (ctMenh.includes('Thái Dương')) {
    gockhuatText = `Mệnh tọa thủ <strong>Thái Dương</strong> tại cung ${pMenh.chi}, bản chất là ngọn lửa quang minh, hào sảng, trọng danh dự và luôn có xu hướng gánh vác trách nhiệm cho người khác. Tuy nhiên, Thân cư <strong>${thanCu.toUpperCase()}</strong> (tọa thủ <strong>${ctThan}</strong>) lại khiến nội tâm đương số có sự giằng xé sâu sắc: Bên ngoài tỏ ra kiên định, bản lĩnh, nói cười xởi lởi nhưng khi màn đêm buông xuống là lúc những trăn trở về tiền tài, sự nghiệp và vị thế tương lai bủa vây dồn dập. Đương số rất ghét cảm giác mang ơn hay phụ thuộc, thà cắn răng chịu thiệt còn hơn hạ mình cầu cạnh. Điểm yếu chí mạng là <em>cả nể, dễ tin vào lời hứa của người thân cận</em>, dẫn đến việc nhiều lần làm ơn mắc oán hoặc gánh nợ/thiệt thòi thay cho người khác.`;
  } else if (ctMenh.includes('Tử Vi') || ctMenh.includes('Thiên Phủ')) {
    gockhuatText = `Mệnh ngự <strong>${ctMenh}</strong> — bậc Đế Vương, Lệnh Tinh nắm giữ uy quyền và lòng tự tôn cực cao. Tuy nhiên, Thân cư <strong>${thanCu.toUpperCase()}</strong> tạo nên một góc khuất cô đơn tột cùng: Không ai hiểu hết những toan tính và áp lực trên vai đương số. Bên ngoài luôn giữ hình tượng chỉn chu, thành đạt nhưng bên trong là sự thận trọng quá mức, đôi khi khó mở lòng chia sẻ thật sự với bất kỳ ai, kể cả người bạn đời. Điểm yếu chí mạng là <em>sợ thất bại, cái tôi lớn đôi khi bỏ lỡ thời cơ đổi vận nhanh chóng</em>.`;
  } else if (ctMenh.includes('Vũ Khúc') || ctMenh.includes('Thất Sát')) {
    gockhuatText = `Mệnh tọa thủ <strong>${ctMenh}</strong> mang khí chất gang thép, quyết liệt, hành động sắc bén và đầu óc kinh tài thực tế. Góc khuất nội tâm là cảm giác cô quả, ít khi biểu lộ sự yếu mềm nên người ngoài dễ nhìn nhận đương số là lạnh lùng, khó gần. Điểm yếu chí mạng là <em>tính nóng nảy bộc phát ngầm, khó thỏa hiệp</em>, khi niềm tin bị phản bội sẽ lập tức đoạn tuyệt dứt khoát không để đường lui.`;
  } else {
    gockhuatText = `Mệnh tọa thủ <strong>${ctMenh}</strong> tại cung ${pMenh.chi}, tương tác với Thân cư <strong>${thanCu.toUpperCase()}</strong> (${ctThan}) tạo nên mẫu người có trực giác nhạy bén, thông minh và giàu lòng trắc ẩn. Điểm yếu chí mạng là <em>dễ bị chi phối bởi cảm xúc</em>, hay suy nghĩ quá nhiều về những điều chưa xảy ra, dẫn đến hao tổn tinh thần trước khi kịp hành động thực tế.`;
  }

  // 2. Nghiệm lý biến cố 2 năm gần đây (2024 - 2025)
  const bienCoText = `
    Năm <strong>Giáp Thìn 2024</strong> và <strong>Ất Tỵ 2025</strong> vừa qua là chu kỳ thanh lọc nghiệp lực mạnh nhất trong chu kỳ 12 năm của đương số. Trục Lưu Thái Tuế và Lưu Kình Đà liên tục kích hoạt vào bản cung và tam hợp chiếu:<br>
    • <strong>Về Tài chính & Công việc:</strong> Đương số chắc chắn đã trải qua ít nhất một phen chao đảo, tiền bạc hao hụt ngoài dự tính, công việc gặp điểm nghẽn hoặc phải gánh vác các khoản chi tiêu lớn bất khả kháng. Nhiều kế hoạch tưởng chừng nắm chắc trong tay lại bị đình trệ vào phút chót.<br>
    • <strong>Về Tinh thần & Mối quan hệ:</strong> Xuất hiện sự rạn nứt hoặc xa cách trong các mối quan hệ tưởng chừng bền vững. Có những giai đoạn đương số cảm thấy cô độc tuyệt đối, nỗ lực hy sinh cho tập thể hay người thân nhưng nhận lại sự hờ hững, thiếu thấu hiểu.<br>
    <em>Cụ Nguyễn Phát Lộc đúc kết: Đây không phải là sự xui xẻo ngẫu nhiên, mà là vũ trụ đang "dọn dẹp mặt bằng" tâm thức, tống khứ các nhân duyên độc hại để bạn chuẩn bị đón nhận bước ngoặt tài lộc lớn năm 2026 – 2027.</em>
  `;

  // 3. Điểm sáng Cát Tinh cứu giải
  const catTinhText = `
    Dù đi qua nhiều khúc quanh gian nan, lá số sở hữu <strong>bộ ba quý tinh phò trợ cực mạnh</strong>: Cung Mệnh có <strong>Tả Phù hóa Khoa</strong> (Đệ nhất Giải Ách Thần Tinh, cứu nguy biến nguy thành an), lại hội tụ <strong>Thiên Việt</strong> (Quý Nhân bề trên nâng đỡ) và cung Tài Bạch có <strong>Thiên Lương Hóa Lộc</strong> (Nguồn tiền tài dồi dào từ danh tiếng, uy tín và sự tử tế).<br>
    Đây là bố cục <em>"Tiền bần hậu phú — Đại khí vãn thành"</em>. Càng trải qua rèn luyện thì giá trị bản thân càng nhân lên gấp bội. Năm 2026 (Bính Ngọ) chính là thời điểm thiên vận mở ra chiếc chìa khóa lật ngược tình thế, đặc biệt là cơ hội tài chính đột phá vào nửa cuối năm nếu bạn biết cách kích hoạt đúng phong thủy tinh đẩu.
  `;

  return { gockhuatText, bienCoText, catTinhText };
}

const result = buildFreePsychologicalTeaser(c);
console.log('Result generated successfully!');
console.log('Góc khuất:', result.gockhuatText.slice(0, 150));

