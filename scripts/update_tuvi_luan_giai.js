const fs = require('fs');
const dict = require('./build_phu_tinh_dict.js');

console.log("Loaded DICT with", Object.keys(dict).length, "stars.");

// Read original tuvi-luan-giai.js
let content = fs.readFileSync('js/tuvi-luan-giai.js', 'utf8');

// Build the code string for PHU_TINH_PALACE_DICT and helper functions
const dictJson = JSON.stringify(dict, null, 2);

const replacementBlock = `
  // 3. KHO PHÂN TÍCH CHUYÊN SÂU 12 CUNG CHO TOÀN BỘ PHỤ TINH, CÁT TINH & SÁT BẠI TINH
  const PHU_TINH_PALACE_DICT = ${dictJson};

  function normalizeStarName(name) {
    if (!name) return '';
    let clean = name.replace(/^L\\./i, '').trim().replace(/\\s+/g, ' ');
    const lower = clean.toLowerCase();
    const canonMap = {
      'tả phù': 'Tả Phù', 'tả phụ': 'Tả Phù', 'ta phu': 'Tả Phù',
      'hữu bật': 'Hữu Bật', 'huu bat': 'Hữu Bật',
      'thiên khôi': 'Thiên Khôi', 'thien khoi': 'Thiên Khôi',
      'thiên việt': 'Thiên Việt', 'thien viet': 'Thiên Việt',
      'văn xương': 'Văn Xương', 'van xuong': 'Văn Xương',
      'văn khúc': 'Văn Khúc', 'van khuc': 'Văn Khúc',
      'lộc tồn': 'Lộc Tồn', 'loc ton': 'Lộc Tồn',
      'thiên mã': 'Thiên Mã', 'thien ma': 'Thiên Mã',
      'đào hoa': 'Đào Hoa', 'dao hoa': 'Đào Hoa',
      'hồng loan': 'Hồng Loan', 'hong loan': 'Hồng Loan',
      'thiên hỷ': 'Thiên Hỷ', 'thien hy': 'Thiên Hỷ',
      'ân quang': 'Ân Quang', 'an quang': 'Ân Quang',
      'thiên quý': 'Thiên Quý', 'thien quy': 'Thiên Quý',
      'tam thai': 'Tam Thai',
      'bát tọa': 'Bát Tọa', 'bat toa': 'Bát Tọa',
      'long trì': 'Long Trì', 'long tri': 'Long Trì',
      'phượng các': 'Phượng Các', 'phuong cac': 'Phượng Các',
      'giải thần': 'Giải Thần', 'giai than': 'Giải Thần',
      'thiên quan': 'Thiên Quan', 'thien quan': 'Thiên Quan',
      'thiên phúc': 'Thiên Phúc', 'thien phuc': 'Thiên Phúc',
      'hoa cái': 'Hoa Cái', 'hoa cai': 'Hoa Cái',
      'quốc ấn': 'Quốc Ấn', 'quoc an': 'Quốc Ấn',
      'đường phù': 'Đường Phù', 'duong phu': 'Đường Phù',
      'thiên trù': 'Thiên Trù', 'thien tru': 'Thiên Trù',
      'thai phụ': 'Thai Phụ', 'thai phu': 'Thai Phụ',
      'phong cáo': 'Phong Cáo', 'phong cao': 'Phong Cáo',
      'thiên y': 'Thiên Y',
      'địa giải': 'Địa Giải', 'dia giai': 'Địa Giải',
      'thiên giải': 'Thiên Giải', 'thien giải': 'Thiên Giải',
      'văn tinh': 'Văn Tinh', 'van tinh': 'Văn Tinh',
      'thiên tài': 'Thiên Tài', 'thien tai': 'Thiên Tài',
      'thiên thọ': 'Thiên Thọ', 'thien tho': 'Thiên Thọ',
      'bác sỹ': 'Bác Sỹ', 'bac sy': 'Bác Sỹ', 'bác sĩ': 'Bác Sỹ',
      'lực sỹ': 'Lực Sỹ', 'luc sy': 'Lực Sỹ', 'lực sĩ': 'Lực Sỹ',
      'thanh long': 'Thanh Long',
      'tấu thư': 'Tấu Thư', 'tau thu': 'Tấu Thư',
      'hỷ thần': 'Hỷ Thần', 'hy than': 'Hỷ Thần',
      'thiếu dương': 'Thiếu Dương', 'thieu duong': 'Thiếu Dương',
      'thiếu âm': 'Thiếu Âm', 'thieu am': 'Thiếu Âm',
      'long đức': 'Long Đức', 'long duc': 'Long Đức',
      'phúc đức': 'Phúc Đức', 'phuc duc': 'Phúc Đức',
      'kình dương': 'Kình Dương', 'kinh duong': 'Kình Dương',
      'đà la': 'Đà La', 'da la': 'Đà La',
      'hỏa tinh': 'Hỏa Tinh', 'hoa tinh': 'Hỏa Tinh',
      'linh tinh': 'Linh Tinh',
      'địa không': 'Địa Không', 'dia khong': 'Địa Không',
      'địa kiếp': 'Địa Kiếp', 'dia kiep': 'Địa Kiếp',
      'thiên hình': 'Thiên Hình', 'thien hinh': 'Thiên Hình',
      'thiên diêu': 'Thiên Diêu', 'thien dieu': 'Thiên Diêu',
      'thiên khốc': 'Thiên Khốc', 'thien khoc': 'Thiên Khốc',
      'thiên hư': 'Thiên Hư', 'thien hu': 'Thiên Hư',
      'tang môn': 'Tang Môn', 'tang mon': 'Tang Môn',
      'bạch hổ': 'Bạch Hổ', 'bach ho': 'Bạch Hổ',
      'đại hao': 'Đại Hao', 'dai hao': 'Đại Hao',
      'tiểu hao': 'Tiểu Hao', 'tieu hao': 'Tiểu Hao',
      'cô thần': 'Cô Thần', 'co than': 'Cô Thần',
      'quả tú': 'Quả Tú', 'qua tu': 'Quả Tú',
      'kiếp sát': 'Kiếp Sát', 'kiep sat': 'Kiếp Sát',
      'phá toái': 'Phá Toái', 'pha toai': 'Phá Toái',
      'phi liêm': 'Phi Liêm', 'phi liem': 'Phi Liêm',
      'phục binh': 'Phục Binh', 'phuc binh': 'Phục Binh',
      'điếu khách': 'Điếu Khách', 'dieu khach': 'Điếu Khách',
      'trực phù': 'Trực Phù', 'truc phu': 'Trực Phù',
      'tử phù': 'Tử Phù', 'tu phu': 'Tử Phù',
      'bệnh phù': 'Bệnh Phù', 'benh phu': 'Bệnh Phù',
      'quan phù': 'Quan Phù', 'quan phu': 'Quan Phù',
      'quan phủ': 'Quan Phủ',
      'thái tuế': 'Thái Tuế', 'thai tue': 'Thái Tuế',
      'tuế phá': 'Tuế Phá', 'tue pha': 'Tuế Phá',
      'thiên không': 'Thiên Không', 'thien khong': 'Thiên Không',
      'lưu hà': 'Lưu Hà', 'luu ha': 'Lưu Hà',
      'thiên la': 'Thiên La',
      'địa võng': 'Địa Võng', 'dia vong': 'Địa Võng',
      'thiên thương': 'Thiên Thương', 'thien thuong': 'Thiên Thương',
      'thiên sứ': 'Thiên Sứ', 'thien su': 'Thiên Sứ',
      'đẩu quân': 'Đẩu Quân', 'dau quan': 'Đẩu Quân',
      'tướng quân': 'Tướng Quân', 'tuong quan': 'Tướng Quân',
      'hóa kỵ': 'Hóa Kỵ', 'hoa ky': 'Hóa Kỵ'
    };
    return canonMap[lower] || clean;
  }

  function normalizePalaceName(palace) {
    if (!palace) return 'MỆNH';
    let p = palace.replace(/<[^>]*>/g, '').trim().toUpperCase();
    if (p.includes('MỆNH') || p.includes('MENH')) return 'MỆNH';
    if (p.includes('PHỤ MẪU') || p.includes('PHU MAU')) return 'PHỤ MẪU';
    if (p.includes('PHÚC') || p.includes('PHUC')) return 'PHÚC ĐỨC';
    if (p.includes('ĐIỀN') || p.includes('DIEN')) return 'ĐIỀN TRẠCH';
    if (p.includes('QUAN') || p.includes('SU NGHIEP')) return 'QUAN LỘC';
    if (p.includes('NÔ') || p.includes('NO BOC') || p.includes('BAN BE')) return 'NÔ BỘC';
    if (p.includes('DI') || p.includes('THIEN DI')) return 'THIÊN DI';
    if (p.includes('TẬT') || p.includes('TAT ACH') || p.includes('SUC KHOE')) return 'TẬT ÁCH';
    if (p.includes('TÀI') || p.includes('TAI BACH') || p.includes('TIEN BAC')) return 'TÀI BẠCH';
    if (p.includes('TỬ') || p.includes('TU TUC') || p.includes('CON CAI')) return 'TỬ TỨC';
    if (p.includes('PHU') || p.includes('PHU THE') || p.includes('HON NHAN')) return 'PHU THÊ';
    if (p.includes('HUYNH') || p.includes('HUYNH DE') || p.includes('ANH EM')) return 'HUYNH ĐỆ';
    return 'MỆNH';
  }

  function getPhuTinhPalaceMeaning(rawStarName, rawPalaceName, isSat, dacHam, isLuu) {
    const starName = (rawStarName || '').trim();
    const isLuuStar = isLuu || starName.startsWith('L.');
    const cleanStar = normalizeStarName(starName);
    const cleanPalace = normalizePalaceName(rawPalaceName);

    // 1. Direct 12-palace lookup
    let meaning = '';
    if (PHU_TINH_PALACE_DICT[cleanStar] && PHU_TINH_PALACE_DICT[cleanStar][cleanPalace]) {
      meaning = PHU_TINH_PALACE_DICT[cleanStar][cleanPalace];
    } else if (PHU_TINH_ANALYST[cleanStar]) {
      meaning = PHU_TINH_ANALYST[cleanStar];
    }

    // 2. If it is an annual transit (Lưu Tinh)
    if (isLuuStar) {
      const luuMeanings = {
        'Lộc Tồn': {
          'MỆNH': 'Lưu Lộc Tồn kích hoạt cơ hội tài chính bất ngờ trong năm hạn, đón nhận nhiều bổng lộc; song cẩn trọng Kình Đà lưu chiếu gây đố kỵ ngầm.',
          'TÀI BẠCH': 'Năm nay kích hoạt đại lộc tài chính, có khoản thu nhập ngoài dự kiến, tiền bạc vào nhà như nước.',
          'QUAN LỘC': 'Công danh trong năm khởi sắc mạnh mẽ, được giao phụ trách nguồn ngân sách lớn hoặc thăng chức tăng lương.',
          'ĐIỀN TRẠCH': 'Năm nay thuận lợi mua sắm tài sản lớn, tân trang nhà đất hoặc sinh lời từ bất động sản.',
          'PHU THÊ': 'Người phối ngẫu năm nay làm ăn phát tài, gia đạo có thêm nguồn tài chính dồi dào.'
        },
        'Kình Dương': {
          'MỆNH': 'Lưu Kình Dương nhập Mệnh: năm nay tính khí dễ nóng nảy cương cường; đề phòng va chạm xe cộ, tai nạn thương tích hoặc phẫu thuật dao kéo.',
          'TẬT ÁCH': 'Năm nay đề phòng tai nạn thương tích kim khí đổ máu hoặc phải can thiệp tiểu phẫu; cần hết sức cẩn thận khi lái xe.',
          'PHU THÊ': 'Vợ chồng năm nay dễ xảy ra tranh cãi nảy lửa; cần học cách nhẫn nhịn để giữ hòa khí gia đình.'
        },
        'Đà La': {
          'MỆNH': 'Lưu Đà La nhập Mệnh: năm nay mưu sự hay gặp cảnh dùng dằng, chậm trễ giấy tờ hoặc tiểu nhân ngấm ngầm cản trở; cần kiên nhẫn.',
          'QUAN LỘC': 'Công việc trong năm hay bị đình trệ, vướng mắc thủ tục kéo dài; cần rà soát kỹ lưỡng hồ sơ pháp lý.'
        },
        'Tang Môn': {
          'MỆNH': 'Lưu Tang Môn hội chiếu: trong năm tâm trạng hay trăn trở ưu tư; đề phòng trong gia đình dòng họ có người già đau ốm.',
          'PHỤ MẪU': 'Năm nay cần đặc biệt chú ý quan tâm sức khỏe của cha mẹ song thân, chu đáo thuốc men thăm hỏi.'
        },
        'Bạch Hổ': {
          'MỆNH': 'Lưu Bạch Hổ hội tụ: gia tăng quyết tâm và nghị lực vượt khó; song đề phòng tai nạn đổ máu, bệnh huyết áp hoặc thị phi khẩu thiệt.',
          'TẬT ÁCH': 'Cẩn trọng tai nạn va chạm hoặc bệnh về máu huyết trong năm nay; nên đi hiến máu nhân đạo để giải bớt sát khí.'
        },
        'Thiên Mã': {
          'MỆNH': 'Lưu Thiên Mã xung khởi: năm nay bôn ba di chuyển nhiều, có cơ hội xuất ngoại, công tác xa hoặc chuyển đổi môi trường thuận lợi.',
          'QUAN LỘC': 'Công việc trong năm có sự thuyên chuyển, đi công tác xa nhiều hoặc mở rộng chi nhánh thị trường mới.'
        },
        'Thái Tuế': {
          'MỆNH': 'Lưu Thái Tuế đáo Mệnh: một năm chuyển biến trọng đại, công danh và đời sống có nhiều bước ngoặt lớn; cần cẩn trọng lời ăn tiếng nói.',
          'QUAN LỘC': 'Năm nay sự nghiệp đối mặt với sự thay đổi lớn hoặc thanh tra kiểm tra; làm việc minh bạch sẽ vươn lên đỉnh cao.'
        }
      };

      if (luuMeanings[cleanStar] && luuMeanings[cleanStar][cleanPalace]) {
        return \`<em>(Lưu niên hạn)</em> \${luuMeanings[cleanStar][cleanPalace]}\`;
      } else if (meaning) {
        return \`<em>(Lưu niên hội chiếu)</em> Trong năm hạn tác động mạnh đến cung \${cleanPalace}: \${meaning}\`;
      }
    }

    if (dacHam && (dacHam === 'M' || dacHam === 'V' || dacHam === 'Đ')) {
      if (isSat) {
        return \`\${meaning} Đắc địa tại bản cung giúp biến hung thành dũng, rèn đúc ý chí kiên cường và khả năng bứt phá ngoạn mục.\`;
      }
    }

    return meaning;
  }

  // Fallback general dictionary
  const PHU_TINH_ANALYST = {
    'Tả Phù': 'Có bề tôi trung thành, bạn bè đồng nghiệp hết lòng phò tá, tăng thêm sức mạnh tổ chức.',
    'Hữu Bật': 'Có quý nhân âm thầm giúp đỡ, kết nối các mối quan hệ xã hội thuận buồm xuôi gió.',
    'Thiên Khôi': 'Tọa Quý hướng Quý, gặp được bậc tiền bối, cấp trên có thẩm quyền nâng đỡ tận tình.',
    'Thiên Việt': 'Khôi Việt xuất chúng, dễ nổi danh trong tập thể, luôn có lối thoát hiểm kỳ diệu khi khó khăn.',
    'Văn Xương': 'Tài hoa văn chương, chữ nghĩa thanh thoát, bằng cấp sáng lạn, tư duy nhạy bén.',
    'Văn Khúc': 'Tài nghệ cầm kỳ thi họa, khiếu thẩm mỹ tinh tế, giỏi giao tiếp và nắm bắt tâm lý người khác.',
    'Lộc Tồn': 'Thiên lộc trời ban, của cải tích lũy vững vàng, có của ăn của để; song đi liền Kình Đà kẹp hai bên.',
    'Thiên Mã': 'Nghị lực vươn lên mạnh mẽ, năng động, thích bôn ba xuất ngoại, phát tài trên đường thiên lý.',
    'Đào Hoa': 'Duyên ngầm quyến rũ, nhiều người theo đuổi, tâm hồn trẻ trung, thành công nhờ nhân duyên.',
    'Hồng Loan': 'Duyên phận tốt đẹp, cuộc đời có nhiều niềm vui tao nhã, vợ chồng tương kính như tân.',
    'Thiên Hỷ': 'Niềm vui rạng rỡ, hỷ tín liên miên, tính tình vui tươi xua tan u ám.',
    'Ân Quang': 'Được thần linh và tổ tiên che chở, tính tình nhân hậu, luôn biết ơn và đền đáp.',
    'Thiên Quý': 'Lòng dạ thánh thiện, có quý nhân vô hình phù hộ những lúc ngặt nghèo nhất.',
    'Tam Thai': 'Phong thái ung dung đĩnh đạc, danh tiếng lan tỏa nhẹ nhàng, cuộc sống an nhiên.',
    'Bát Tọa': 'Nền tảng vững chắc, có người hầu kẻ hạ, vị trí xã hội ổn định.',
    'Long Trì': 'Nhan sắc thanh tú, nhà cửa phong thủy đắc địa, tai thính mũi nhạy.',
    'Phượng Các': 'Văn phong cao nhã, tiếng thơm bay xa, thông minh lễ độ.',
    'Hoa Cái': 'Khí chất kiêu sa, có khiếu nghệ thuật tâm linh, phong cách quý phái.',
    'Quốc Ấn': 'Nắm giữ con dấu, quyền ký duyệt, văn bằng chứng nhận uy tín trong chức vụ.',
    'Thiên Phúc': 'Phúc đức tổ phụ, tính tình hiền lành, tai ương tiêu trừ.',
    'Thiên Quan': 'Tấm lòng bồ tát, hay làm việc phúc thiện, giảm trừ tà khí sát tinh.',
    'Kình Dương': 'Thanh kiếm sắc nhọn: tính tình cương liệt, táo bạo nhưng dễ gây hình thương đao kiếm, phẫu thuật, va chạm xung đột.',
    'Đà La': 'Mũi khoan ngầm: sự trắc trở dây dưa, âm mưu đố kỵ ngầm, bệnh mãn tính khó dứt điểm.',
    'Địa Không': 'Lỗ đen vũ trụ: bạo phát bạo tàn, ảo mộng vô thường, phá tan tiền tài nếu tham lam; song khai mở tư duy dị biệt vượt thời đại.',
    'Địa Kiếp': 'Cơn sóng thần: biến động khôn lường, tai ách bất ngờ, thị trường sụp đổ hoặc tiểu nhân đâm lén sau lưng.',
    'Hỏa Tinh': 'Ngọn lửa cuồng nộ: nóng nảy bốc đồng, biến cố phát sinh chớp nhoáng, hỏa hoạn bỏng rát.',
    'Linh Tinh': 'Tiếng sét trong đêm: ưu sầu lo lắng ngầm, thù dai, thần kinh căng thẳng hoặc bệnh tật về gân cốt.',
    'Thiên Hình': 'Thanh đao công lý: nghiêm khắc kỷ luật, cẩn trọng pháp luật kiện tụng hoặc vết tích thương tật trên người.',
    'Bạch Hổ': 'Hổ trắng uy phong: nghị lực phi thường gánh vác trách nhiệm; song chủ về máu huyết, tai nạn, ưu tư.',
    'Tang Môn': 'Nỗi sầu muộn: trong lòng hay lo nghĩ xa xôi, tang tóc ưu phiền trong dòng họ.',
    'Cô Thần': 'Sự cô độc, khó trải lòng với người khác, thích một mình suy ngẫm.',
    'Quả Tú': 'Khép kín tâm tư, duyên phận muộn màng, tự tay xây đắp giang sơn.',
    'Đại Hao': 'Đại lộ tiêu tài: tiền của luân chuyển rất lớn, đầu tư mạo hiểm hoặc chi tiêu hào phóng không tiếc tay.',
    'Tiểu Hao': 'Hao tán nhỏ giọt: hay mất mát vặt, mua sắm lặt vặt tốn kém.',
    'Thiên Khốc': 'Tiếng khóc oan khiên: nội tâm nhiều trăn trở cay đắng thuở thiếu thời.',
    'Thiên Hư': 'Hư danh hao tổn: sức khỏe yếu về phổi, khí hư, hay lo âu hão huyền.',
    'Kiếp Sát': 'Sát khí phục kích: đề phòng thương tích tay chân, mất cắp hoặc tiểu nhân mưu toan.',
    'Phục Binh': 'Kẻ mai phục sau lưng: cẩn trọng khẩu thiệt đâm thọc, lừa gạt hợp đồng.',
    'Điếu Khách': 'Thích ngao du nói chuyện, cẩn trọng cờ bạc cá cược hoặc chi tiêu quá đà.'
  };
`;

// Replace in content
const targetRegex = /\/\/ 3\. KHO PHÂN TÍCH CHI TIẾT TỪNG PHỤ TINH[\s\S]*?const PHU_TINH_ANALYST = \{[\s\S]*?\};\n/;

if (!targetRegex.test(content)) {
  console.error("Target regex NOT matched in content!");
  process.exit(1);
}

content = content.replace(targetRegex, replacementBlock);

// Now update the loop calls in section 4 & 5
const oldCatLoop = `      cung.phuTinhLeft.forEach(pt => {
        const desc = PHU_TINH_ANALYST[pt.name] || 'Gia tăng may mắn, hỗ trợ bản cung phát triển thuận lợi.';
        catTinhDetailHtml += \`<li><strong style="color: #D4AF37;">\${pt.name}:</strong> \${desc}</li>\`;
      });`;

const newCatLoop = `      cung.phuTinhLeft.forEach(pt => {
        const desc = getPhuTinhPalaceMeaning(pt.name, cungName, false, pt.dacHam, pt.isLuu);
        catTinhDetailHtml += \`<li><strong style="color: #D4AF37;">\${pt.name}:</strong> \${desc}</li>\`;
      });`;

const oldSatLoop = `      cung.phuTinhRight.forEach(pt => {
        const desc = PHU_TINH_ANALYST[pt.name] || 'Mang theo chông gai, đòi hỏi ý chí kiên định vượt qua.';
        satTinhDetailHtml += \`<li><strong style="color: #FCA5A5;">\${pt.name}:</strong> \${desc}</li>\`;
      });`;

const newSatLoop = `      cung.phuTinhRight.forEach(pt => {
        const desc = getPhuTinhPalaceMeaning(pt.name, cungName, true, pt.dacHam, pt.isLuu);
        satTinhDetailHtml += \`<li><strong style="color: #FCA5A5;">\${pt.name}:</strong> \${desc}</li>\`;
      });`;

content = content.replace(oldCatLoop, newCatLoop);
content = content.replace(oldSatLoop, newSatLoop);

// Also expose PHU_TINH_PALACE_DICT and getPhuTinhPalaceMeaning in engine export
content = content.replace(
  `PHU_TINH_ANALYST: PHU_TINH_ANALYST,`,
  `PHU_TINH_ANALYST: PHU_TINH_ANALYST,\n    PHU_TINH_PALACE_DICT: PHU_TINH_PALACE_DICT,\n    getPhuTinhPalaceMeaning: getPhuTinhPalaceMeaning,`
);

fs.writeFileSync('js/tuvi-luan-giai.js', content, 'utf8');
fs.writeFileSync('public/js/tuvi-luan-giai.js', content, 'utf8');
console.log("Successfully updated js/tuvi-luan-giai.js and public/js/tuvi-luan-giai.js!");
