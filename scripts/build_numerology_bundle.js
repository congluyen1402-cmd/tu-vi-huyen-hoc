/**
 * Build Script: Extracts and bundles Numerology and Compatibility data into vanilla browser-ready JS.
 */
const fs = require('fs');
const path = require('path');

function readAndClean(filePath, exportName) {
  let code = fs.readFileSync(filePath, 'utf8');
  // Strip import statements
  code = code.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '');
  // Replace export default block
  code = code.replace(/export\s+default\s*\{[\s\S]*?\};?/g, '');
  // Strip individual export default
  code = code.replace(/export\s+default\s+[\w]+;?/g, '');
  // Clean export const / export function
  code = code.replace(/export\s+const\s+(\w+)/g, 'const $1');
  code = code.replace(/export\s+function\s+(\w+)/g, 'function $1');
  code = code.replace(/export\s*\{[\s\S]*?\};?/g, '');
  
  const runner = new Function(code + '\nreturn ' + exportName + ';');
  return runner();
}

console.log('Loading Numerology meanings...');
const baseDir = path.join(__dirname, '..', 'temp_co_hoc_tinh_hoa', 'src', 'data', 'numerologyMeanings');

const lifePathMeanings = readAndClean(path.join(baseDir, 'lifePathMeaning.js'), 'lifePathMeanings');
const expressionMeanings = readAndClean(path.join(baseDir, 'expressionMeaning.js'), 'expressionMeanings');
const soulUrgeMeanings = readAndClean(path.join(baseDir, 'soulUrgeMeaning.js'), 'soulUrgeMeanings');
const personalityMeanings = readAndClean(path.join(baseDir, 'personalityMeaning.js'), 'personalityMeanings');
const birthdayMeanings = readAndClean(path.join(baseDir, 'birthdayMeaning.js'), 'birthdayMeanings');
const pinnacleMeanings = readAndClean(path.join(baseDir, 'cyclesMeaning.js'), 'pinnacleMeanings');
const challengeMeanings = readAndClean(path.join(baseDir, 'cyclesMeaning.js'), 'challengeMeanings');
const karmicDebtMeanings = readAndClean(path.join(baseDir, 'karmicDebtMeaning.js'), 'karmicDebtMeanings');

// Additional rich data for Arrows and Personal Years
const arrowMeanings = {
  // Trục ngang
  '3-6-9': {
    name: 'Mũi Tên Trí Tuệ (3-6-9)',
    type: 'Trí não',
    strength: {
      title: 'Trí Tuệ Sáng Suốt & Khả Năng Tư Duy Vượt Trội',
      description: 'Bạn sở hữu bộ óc nhạy bén, khả năng phân tích logic và tiếp thu kiến thức tuyệt vời. Bạn có trí nhớ tốt, tư duy sắc sảo và luôn khao khát học hỏi điều mới. Thích hợp cho nghiên cứu, học thuật, chiến lược và quản lý cấp cao.',
      advice: 'Tránh suy nghĩ quá nhiều dẫn đến căng thẳng hoặc xem thường những người tư duy chậm hơn mình.'
    },
    weakness: {
      title: 'Mũi Tên Trống 3-6-9 (Trí Nhớ Ngắn Hạn & Hay Quên)',
      description: 'Khi thiếu cả 3 số 3, 6, 9 trên trục trí tuệ, bạn có xu hướng hay đãng trí, trí nhớ ngắn hạn giảm sút khi gặp áp lực, khó tập trung trong thời gian dài.',
      advice: 'Hãy rèn luyện thói quen ghi chú, lập to-do list, đọc sách mỗi ngày và tập thiền để định tâm.'
    }
  },
  '2-5-8': {
    name: 'Mũi Tên Cảm Xúc & Tâm Hồn (2-5-8)',
    type: 'Tâm hồn',
    strength: {
      title: 'Cân Bằng Cảm Xúc & Trực Giác Tâm Linh Sâu Sắc',
      description: 'Bạn có trái tim ấm áp, lòng trắc ẩn, khả năng thấu cảm cảm xúc của người khác và trực giác tâm linh mạnh mẽ. Luôn biết cách dung hòa các mối quan hệ và tạo cảm giác an yên cho người xung quanh.',
      advice: 'Học cách bảo vệ ranh giới cảm xúc của bản thân, không để nỗi buồn của người khác hút cạn năng lượng của mình.'
    },
    weakness: {
      title: 'Mũi Tên Trống 2-5-8 (Dễ Tổn Thương & Nhạy Cảm Quá Mức)',
      description: 'Khi thiếu trục 2-5-8, bạn dễ rơi vào trạng thái nội tâm bất an, dễ bị tổn thương bởi lời nói của người khác, hoặc che giấu cảm xúc thật sau lớp vỏ bọc lạnh lùng.',
      advice: 'Hãy tập biểu đạt cảm xúc chân thành, viết nhật ký biết ơn và dành thời gian kết nối với thiên nhiên.'
    }
  },
  '1-4-7': {
    name: 'Mũi Tên Thể Chất & Thực Tế (1-4-7)',
    type: 'Thể chất',
    strength: {
      title: 'Thực Tế, Khéo Léo & Năng Lực Hành Động Cụ Thể',
      description: 'Bạn là người thực tế, chân chạm đất, có năng lực quản trị cuộc sống vật chất, tài chính và khéo léo trong công việc thủ công, kỹ thuật hoặc sắp xếp trật tự.',
      advice: 'Đừng quá chú trọng vật chất hay câu nệ tiểu tiết mà bỏ lỡ bức tranh tổng thể hoặc các giá trị tinh thần.'
    },
    weakness: {
      title: 'Mũi Tên Trống 1-4-7 (Thiếu Thực Tế & Hay Mơ Mộng)',
      description: 'Thiếu trục 1-4-7 khiến bạn hay bay bổng, có nhiều ý tưởng viển vông nhưng khó hiện thực hóa thành hành động cụ thể, dễ gặp rắc rối với việc quản lý tài chính thực tế.',
      advice: 'Hãy bắt đầu từ những việc nhỏ cụ thể, học cách ghi chép chi tiêu và rèn luyện thể thao hàng ngày.'
    }
  },

  // Trục dọc
  '1-2-3': {
    name: 'Mũi Tên Kế Hoạch (1-2-3)',
    type: 'Kế hoạch',
    strength: {
      title: 'Lập Kế Hoạch Chu Toàn & Khả Năng Tổ Chức',
      description: 'Bạn luôn suy nghĩ trước khi hành động, có phương pháp làm việc khoa học, ngăn nắp, tỉ mỉ và luôn chuẩn bị phương án dự phòng cho mọi tình huống.',
      advice: 'Tránh cầu toàn quá mức dẫn đến chần chừ bỏ lỡ thời cơ vàng.'
    },
    weakness: {
      title: 'Mũi Tên Trống 1-2-3 (Thiếu Kế Hoạch & Hành Động Ngẫu Hứng)',
      description: 'Làm việc theo cảm hứng, thường bắt đầu mà không có kế hoạch rõ ràng, dễ bị quá tải hoặc quên hạn chót.',
      advice: 'Tập lập kế hoạch theo tuần, chia nhỏ mục tiêu lớn thành các bước khả thi mỗi ngày.'
    }
  },
  '4-5-6': {
    name: 'Mũi Tên Ý Chí (4-5-6)',
    type: 'Ý chí',
    strength: {
      title: 'Ý Chí Sắt Đá & Bản Lĩnh Vượt Khó',
      description: 'Bạn sở hữu sự kiên cường phi thường, không bao giờ đầu hàng trước nghịch cảnh. Nghị lực mạnh mẽ giúp bạn vượt qua mọi sóng gió để chạm đến thành công.',
      advice: 'Học cách linh hoạt, không nên quá cứng nhắc hoặc áp đặt ý chí của mình lên người khác.'
    },
    weakness: {
      title: 'Mũi Tên Trống 4-5-6 (Thiếu Ý Chí & Dễ Uất Ức)',
      description: 'Dễ nản lòng khi gặp rào cản, cảm thấy bất lực hoặc uất ức khi kỳ vọng không đạt được như ý muốn.',
      advice: 'Rèn luyện tính kiên nhẫn qua các thói quen hàng ngày, tập thể dục kỷ luật và học cách chấp nhận sự thật.'
    }
  },
  '7-8-9': {
    name: 'Mũi Tên Hoạt Động (7-8-9)',
    type: 'Hoạt động',
    strength: {
      title: 'Năng Động, Thích Khám Phá & Trải Nghiệm Thực Tế',
      description: 'Bạn tràn đầy năng lượng, thích đi đây đi đó, khám phá thế giới, dấn thân vào các hoạt động thể thao, du lịch hoặc công việc đòi hỏi sự dịch chuyển liên tục.',
      advice: 'Cần giữ tĩnh lặng cho tâm trí, tránh tiêu hao quá nhiều năng lượng ra bên ngoài.'
    },
    weakness: {
      title: 'Mũi Tên Trống 7-8-9 (Thụ Động & Trì Trệ)',
      description: 'Có xu hướng thụ động, ngại thay đổi vùng an toàn, thích ngồi một chỗ và chần chừ dấn thân vào trải nghiệm mới.',
      advice: 'Hãy bước ra ngoài, đi bộ ít nhất 30 phút mỗi ngày và tham gia các hoạt động tập thể.'
    }
  },

  // Trục chéo
  '1-5-9': {
    name: 'Mũi Tên Quyết Tâm (1-5-9)',
    type: 'Quyết tâm',
    strength: {
      title: 'Quyết Tâm Cao Độ & Không Bỏ Cuộc',
      description: 'Một khi đã đặt ra mục tiêu, bạn sẽ theo đuổi đến cùng bằng mọi giá. Tinh thần bền bỉ và sự tập trung cao độ là chìa khóa mở ra mọi cánh cửa thành tựu.',
      advice: 'Cần phân biệt giữa kiên định đúng đắn và sự ngoan cố mù quáng khi hoàn cảnh đã thay đổi.'
    },
    weakness: {
      title: 'Mũi Tên Trống 1-5-9 (Trì Hoãn & Thiếu Quyết Đoán)',
      description: 'Thường chần chừ, khó đưa ra quyết định dứt khoát, dễ bỏ cuộc giữa chừng khi gặp khó khăn ban đầu.',
      advice: 'Áp dụng quy tắc 5 giây và chia nhỏ mục tiêu để hành động ngay không do dự.'
    }
  },
  '3-5-7': {
    name: 'Mũi Tên Nhạy Bén Tâm Linh (3-5-7)',
    type: 'Tâm linh',
    strength: {
      title: 'Trực Giác Nhạy Bén, Thấu Hiểu Triết Lý & Giác Ngộ',
      description: 'Bạn có năng khiếu tự nhiên về triết học, tâm linh, huyền học và trực giác sắc bén. Bạn thấu hiểu quy luật nhân quả và có sự đồng cảm sâu sắc với kiếp nhân sinh.',
      advice: 'Kết hợp tri thức tâm linh với thực tế đời sống để tạo ra giá trị hữu ích cho cộng đồng.'
    },
    weakness: {
      title: 'Mũi Tên Trống 3-5-7 (Hay Hoài Nghi & Bất An)',
      description: 'Có xu hướng đa nghi, khó tin tưởng người khác hoặc hoài nghi bản thân, dễ bị lo âu không có căn cứ.',
      advice: 'Học cách tin vào trực giác mách bảo, thực hành thiền định và sống chân thành cởi mở.'
    }
  }
};

const personalYearMeanings = {
  1: {
    year: 1,
    name: 'Năm Của Sự Khởi Đầu Mới & Định Hướng Lại Tương Lai',
    keyword: 'Khởi đầu, Gieo hạt, Tự lập, Đột phá',
    overview: 'Đây là năm mở đầu cho một chu kỳ 9 năm hoàn toàn mới! Năng lượng tràn ngập sự tươi mới, dũng cảm và cơ hội bứt phá. Thời điểm vàng để bắt đầu công việc mới, dự án kinh doanh mới hoặc thay đổi lối sống.',
    careerAdvice: 'Dám thử thách những hướng đi táo bạo, tự tin đưa ra quyết định làm chủ cuộc đời.',
    loveAdvice: 'Khởi sắc những mối quan hệ mới; nếu đang độc thân, bạn sẽ tỏa ra sức hút độc lập khó cưỡng.',
    financeAdvice: 'Thích hợp để đầu tư dài hạn cho chu kỳ mới, chú ý quản lý nguồn vốn ban đầu cẩn trọng.'
  },
  2: {
    year: 2,
    name: 'Năm Của Hợp Tác, Kết Nối & Bình An Nội Tâm',
    keyword: 'Hòa giải, Kiên nhẫn, Lắng nghe, Đối tác',
    overview: 'Sau một năm khởi xướng mạnh mẽ, năm số 2 yêu cầu sự chậm rãi, lắng nghe và hợp tác. Đây không phải lúc lao về phía trước một mình mà là xây dựng mạng lưới quan hệ và nuôi dưỡng hạt giống đã gieo.',
    careerAdvice: 'Tập trung vào làm việc nhóm, xây dựng niềm tin với đối tác và đồng nghiệp.',
    loveAdvice: 'Một năm thăng hoa của tình yêu đôi lứa, cơ hội đính hôn, kết hôn hoặc hâm nóng tình cảm.',
    financeAdvice: 'Giữ tài chính ở mức an toàn, tránh đầu tư mạo hiểm nóng vội.'
  },
  3: {
    year: 3,
    name: 'Năm Của Sáng Tạo, Lan Tỏa & Mở Rộng Giao Tiếp',
    keyword: 'Sáng tạo, Biểu đạt, Niềm vui, Xã hội',
    overview: 'Năm bùng nổ của năng lượng sáng tạo, giao lưu xã hội và truyền cảm hứng. Bạn sẽ cảm thấy vui vẻ, tự tin chia sẻ ý tưởng và mở rộng vòng kết nối bạn bè.',
    careerAdvice: 'Tỏa sáng trong lĩnh vực marketing, truyền thông, thuyết trình hoặc sáng tạo nghệ thuật.',
    loveAdvice: 'Các buổi tiệc, chuyến du lịch và gặp gỡ mang lại nhiều niềm vui và duyên lành bất ngờ.',
    financeAdvice: 'Thu nhập có thể tăng nhanh từ nhiều nguồn, nhưng cẩn thận chi tiêu quá đà cho tiệc tùng.'
  },
  4: {
    year: 4,
    name: 'Năm Của Củng Cố Nền Tảng, Kỷ Luật & Thực Tế',
    keyword: 'Kỷ luật, Trật tự, Lao động, Vững chắc',
    overview: 'Năm để siết chặt kỷ luật, tổ chức lại công việc, chăm sóc sức khỏe và xây dựng nền tảng vững như bàn thạch. Cần nỗ lực lao động nghiêm túc, không có đường tắt.',
    careerAdvice: 'Hoàn thiện quy trình, học thêm chứng chỉ chuyên môn, kiên trì cày ải để thu quả ngọt.',
    loveAdvice: 'Cần sự chân thành, trách nhiệm và cam kết thực tế thay vì những lời hứa hão huyền.',
    financeAdvice: 'Thực hành tiết kiệm, quản lý dòng tiền chặt chẽ, đầu tư vào tài sản hữu hình an toàn.'
  },
  5: {
    year: 5,
    name: 'Năm Của Biến Chuyển, Tự Do & Bứt Phá Vùng An Toàn',
    keyword: 'Đổi mới, Du lịch, Cơ hội, Bất ngờ',
    overview: 'Đỉnh điểm giữa chu kỳ 9 năm! Cuộc sống của bạn sẽ có những bước ngoặt bất ngờ, nhiều chuyến đi, cơ hội mới và thôi thúc thoát khỏi những điều tù túng, nhàm chán.',
    careerAdvice: 'Sẵn sàng đón nhận thay đổi, thích nghi nhanh với công nghệ và thị trường mới.',
    loveAdvice: 'Nhiều trải nghiệm mới lạ, tuy nhiên tránh đứng núi này trông núi nọ.',
    financeAdvice: 'Cơ hội kiếm tiền nhanh nhưng cũng dễ biến động, cần giữ quỹ dự phòng linh hoạt.'
  },
  6: {
    year: 6,
    name: 'Năm Của Gia Đình, Yêu Thương & Trách Nhiệm Xã Hội',
    keyword: 'Tổ ấm, Chăm sóc, Trách nhiệm, Hài hòa',
    overview: 'Năng lượng quay về cội nguồn, chăm lo cho cha mẹ, con cái, xây dựng hoặc sửa sang tổ ấm gia đình. Đây là năm của lòng nhân ái, vị tha và sự phụng sự.',
    careerAdvice: 'Phù hợp với các dự án vì cộng đồng, giáo dục, y tế, chăm sóc khách hàng hoặc doanh nghiệp gia đình.',
    loveAdvice: 'Thời điểm vàng để đón thêm thành viên mới, hòa giải bất hòa và gắn kết thâm sâu.',
    financeAdvice: 'Chi tiêu nhiều cho sửa sang nhà cửa, giáo dục và sức khỏe người thân.'
  },
  7: {
    year: 7,
    name: 'Năm Của Chiêm Nghiệm, Học Hỏi & Nâng Tầm Trí Tuệ',
    keyword: 'Tĩnh lặng, Trí tuệ, Tâm linh, Nghiên cứu',
    overview: 'Một năm hướng nội sâu sắc. Vũ trụ nhắc nhở bạn dừng lại để nhìn lại chặng đường đã qua, học hỏi chuyên sâu, đọc sách, nghiên cứu hoặc khám phá thế giới tâm linh, huyền học.',
    careerAdvice: 'Tập trung nâng cao kiến thức, nâng cấp năng lực lõi thay vì mở rộng kinh doanh rầm rộ.',
    loveAdvice: 'Cần không gian riêng tư cho bản thân; chia sẻ chiều sâu tâm hồn với bạn đời.',
    financeAdvice: 'Tránh đầu cơ rủi ro cao; giữ tiền và đầu tư vào trí tuệ là khoản sinh lời cao nhất.'
  },
  8: {
    year: 8,
    name: 'Năm Của Thành Tựu, Quyền Lực & Thu Hoạch Tài Chính',
    keyword: 'Tài chính, Thành công, Uy tín, Gặt hái',
    overview: 'Năm đỉnh cao về tiền bạc, địa vị và quyền lực! Mọi nỗ lực chăm chỉ từ các năm trước sẽ được đền đáp xứng đáng bằng danh vọng và tài chính dồi dào.',
    careerAdvice: 'Mở rộng quy mô, đàm phán hợp đồng lớn, khẳng định vị thế dẫn đầu trong ngành.',
    loveAdvice: 'Hài hòa giữa công việc bận rộn và tình cảm; cùng bạn đời định hướng tương lai giàu có.',
    financeAdvice: 'Thời cơ vàng để gia tăng tài sản, chốt lời đầu tư và mở rộng dòng tiền thông minh.'
  },
  9: {
    year: 9,
    name: 'Năm Của Hoàn Tất, Chuyển Giao & Cho Đi Đại Lượng',
    keyword: 'Khép lại, Buông bỏ, Nhân ái, Tái sinh',
    overview: 'Năm kết thúc chu kỳ 9 năm. Thời điểm buông bỏ những điều không còn phục vụ cho sự phát triển của bạn (công việc cũ, thói quen xấu, mối quan hệ độc hại) để chuẩn bị cho chu kỳ rực rỡ tiếp theo.',
    careerAdvice: 'Hoàn tất các dự án tồn đọng, chuyển giao công việc, dọn dẹp không gian làm việc.',
    loveAdvice: 'Học cách tha thứ, buông bỏ oán hận để trái tim thanh thản đón nhận những điều tốt đẹp.',
    financeAdvice: 'Tích cực làm từ thiện, chia sẻ phúc lành và thanh toán dứt điểm các khoản nợ cũ.'
  }
};

const bundleContent = `/**
 * TỬ VI HUYỀN HỌC - BỘ DỮ LIỆU KIẾN GIẢI THẦN SỐ HỌC PYTHAGORAS TOÀN THƯ
 * Được biên soạn và tích hợp chuẩn xác theo hệ thống Cổ Học Tinh Hoa
 * Phiên bản hoàn chỉnh cho Client-side Engine 100% Offline
 */
(function(window) {
  'use strict';

  const TuViNumerologyData = {
    lifePathMeanings: ${JSON.stringify(lifePathMeanings, null, 2)},
    expressionMeanings: ${JSON.stringify(expressionMeanings, null, 2)},
    soulUrgeMeanings: ${JSON.stringify(soulUrgeMeanings, null, 2)},
    personalityMeanings: ${JSON.stringify(personalityMeanings, null, 2)},
    birthdayMeanings: ${JSON.stringify(birthdayMeanings, null, 2)},
    pinnacleMeanings: ${JSON.stringify(pinnacleMeanings, null, 2)},
    challengeMeanings: ${JSON.stringify(challengeMeanings, null, 2)},
    karmicDebtMeanings: ${JSON.stringify(karmicDebtMeanings, null, 2)},
    arrowMeanings: ${JSON.stringify(arrowMeanings, null, 2)},
    personalYearMeanings: ${JSON.stringify(personalYearMeanings, null, 2)}
  };

  window.TuViNumerologyData = TuViNumerologyData;
})(typeof window !== 'undefined' ? window : this);
`;

const outputPath = path.join(__dirname, '..', 'js', 'tuvi-numerology-data.js');
fs.writeFileSync(outputPath, bundleContent, 'utf8');
console.log('SUCCESS: Generated js/tuvi-numerology-data.js with size ' + Math.round(bundleContent.length / 1024) + ' KB');
