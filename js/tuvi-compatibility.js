/**
 * TỬ VI HUYỀN HỌC - BỘ TÍNH TOÁN TƯƠNG HỢP & BÓI HỢP TUỔI BÁT TỰ TOÀN THƯ (VIP A4)
 * Tích hợp đầy đủ:
 * - 5 Tầng Bát Tự: Thiên Can (Hợp/Phá), Địa Chi (Tam Hợp/Lục Xung), Nạp Âm 60 Hoa Giáp, Cung Phi Bát Trạch (Bát Biến Du Niên), Thần Số Pythagoras
 * - Dự Báo Vận Trình Gia Đạo & Tài Lộc 5 Năm (2026 - 2030)
 * - Bộ Pháp Thế Phong Thủy Cổ Truyền Hóa Giải Xung Khắc (Tuyệt Mệnh, Ngũ Quỷ, Tương Khắc)
 * - Bảng Chấm Điểm Chọn Năm Sinh Con Đắc Tài Đắc Lộc (2026 - 2030)
 * - Đạo Vợ Chồng & Triết Lý "Đức Năng Thắng Số"
 * - Hỗ trợ Mở Khóa VIP 100% Tự Động & Xuất Bản File Báo Cáo PDF A4 Song Bản
 * 100% Client-side Offline Engine
 */
(function(window) {
  'use strict';

  const CAN_NAMES = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const CHI_NAMES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

  const CHI_INFO = {
    'Tý': { animal: 'Chuột', emoji: '🐀', element: 'Thủy' },
    'Sửu': { animal: 'Trâu', emoji: '🐂', element: 'Thổ' },
    'Dần': { animal: 'Hổ', emoji: '🐅', element: 'Mộc' },
    'Mão': { animal: 'Mèo', emoji: '🐈', element: 'Mộc' },
    'Thìn': { animal: 'Rồng', emoji: '🐉', element: 'Thổ' },
    'Tỵ': { animal: 'Rắn', emoji: '🐍', element: 'Hỏa' },
    'Ngọ': { animal: 'Ngựa', emoji: '🐎', element: 'Hỏa' },
    'Mùi': { animal: 'Dê', emoji: '🐐', element: 'Thổ' },
    'Thân': { animal: 'Khỉ', emoji: '🐒', element: 'Kim' },
    'Dậu': { animal: 'Gà', emoji: '🐓', element: 'Kim' },
    'Tuất': { animal: 'Chó', emoji: '🐕', element: 'Thổ' },
    'Hợi': { animal: 'Heo', emoji: '🐖', element: 'Thủy' }
  };

  const NAP_AM_TABLE = {
    0: { name: 'Hải Trung Kim', element: 'Kim' },
    1: { name: 'Hải Trung Kim', element: 'Kim' },
    2: { name: 'Lư Trung Hỏa', element: 'Hỏa' },
    3: { name: 'Lư Trung Hỏa', element: 'Hỏa' },
    4: { name: 'Đại Lâm Mộc', element: 'Mộc' },
    5: { name: 'Đại Lâm Mộc', element: 'Mộc' },
    6: { name: 'Lộ Bàng Thổ', element: 'Thổ' },
    7: { name: 'Lộ Bàng Thổ', element: 'Thổ' },
    8: { name: 'Kiếm Phong Kim', element: 'Kim' },
    9: { name: 'Kiếm Phong Kim', element: 'Kim' },
    10: { name: 'Sơn Đầu Hỏa', element: 'Hỏa' },
    11: { name: 'Sơn Đầu Hỏa', element: 'Hỏa' },
    12: { name: 'Giản Hạ Thủy', element: 'Thủy' },
    13: { name: 'Giản Hạ Thủy', element: 'Thủy' },
    14: { name: 'Thành Đầu Thổ', element: 'Thổ' },
    15: { name: 'Thành Đầu Thổ', element: 'Thổ' },
    16: { name: 'Bạch Lạp Kim', element: 'Kim' },
    17: { name: 'Bạch Lạp Kim', element: 'Kim' },
    18: { name: 'Dương Liễu Mộc', element: 'Mộc' },
    19: { name: 'Dương Liễu Mộc', element: 'Mộc' },
    20: { name: 'Tuyền Trung Thủy', element: 'Thủy' },
    21: { name: 'Tuyền Trung Thủy', element: 'Thủy' },
    22: { name: 'Ốc Thượng Thổ', element: 'Thổ' },
    23: { name: 'Ốc Thượng Thổ', element: 'Thổ' },
    24: { name: 'Tích Lịch Hỏa', element: 'Hỏa' },
    25: { name: 'Tích Lịch Hỏa', element: 'Hỏa' },
    26: { name: 'Tùng Bách Mộc', element: 'Mộc' },
    27: { name: 'Tùng Bách Mộc', element: 'Mộc' },
    28: { name: 'Trường Lưu Thủy', element: 'Thủy' },
    29: { name: 'Trường Lưu Thủy', element: 'Thủy' },
    30: { name: 'Sa Trung Kim', element: 'Kim' },
    31: { name: 'Sa Trung Kim', element: 'Kim' },
    32: { name: 'Sơn Hạ Hỏa', element: 'Hỏa' },
    33: { name: 'Sơn Hạ Hỏa', element: 'Hỏa' },
    34: { name: 'Bình Địa Mộc', element: 'Mộc' },
    35: { name: 'Bình Địa Mộc', element: 'Mộc' },
    36: { name: 'Bích Thượng Thổ', element: 'Thổ' },
    37: { name: 'Bích Thượng Thổ', element: 'Thổ' },
    38: { name: 'Kim Bạch Kim', element: 'Kim' },
    39: { name: 'Kim Bạch Kim', element: 'Kim' },
    40: { name: 'Phúc Đăng Hỏa', element: 'Hỏa' },
    41: { name: 'Phúc Đăng Hỏa', element: 'Hỏa' },
    42: { name: 'Thiên Hà Thủy', element: 'Thủy' },
    43: { name: 'Thiên Hà Thủy', element: 'Thủy' },
    44: { name: 'Đại Trạch Thổ', element: 'Thổ' },
    45: { name: 'Đại Trạch Thổ', element: 'Thổ' },
    46: { name: 'Thoa Xuyến Kim', element: 'Kim' },
    47: { name: 'Thoa Xuyến Kim', element: 'Kim' },
    48: { name: 'Tang Đố Mộc', element: 'Mộc' },
    49: { name: 'Tang Đố Mộc', element: 'Mộc' },
    50: { name: 'Đại Khê Thủy', element: 'Thủy' },
    51: { name: 'Đại Khê Thủy', element: 'Thủy' },
    52: { name: 'Sa Trung Thổ', element: 'Thổ' },
    53: { name: 'Sa Trung Thổ', element: 'Thổ' },
    54: { name: 'Thiên Thượng Hỏa', element: 'Hỏa' },
    55: { name: 'Thiên Thượng Hỏa', element: 'Hỏa' },
    56: { name: 'Thạch Lựu Mộc', element: 'Mộc' },
    57: { name: 'Thạch Lựu Mộc', element: 'Mộc' },
    58: { name: 'Đại Hải Thủy', element: 'Thủy' },
    59: { name: 'Đại Hải Thủy', element: 'Thủy' }
  };

  const TAM_HOP_GROUPS = [
    ['Thân', 'Tý', 'Thìn'],
    ['Tỵ', 'Dậu', 'Sửu'],
    ['Dần', 'Ngọ', 'Tuất'],
    ['Hợi', 'Mão', 'Mùi']
  ];

  const LUC_HOP_PAIRS = [
    ['Tý', 'Sửu'], ['Dần', 'Hợi'], ['Mão', 'Tuất'],
    ['Thìn', 'Dậu'], ['Tỵ', 'Thân'], ['Ngọ', 'Mùi']
  ];

  const LUC_XUNG_PAIRS = [
    ['Tý', 'Ngọ'], ['Sửu', 'Mùi'], ['Dần', 'Thân'],
    ['Mão', 'Dậu'], ['Thìn', 'Tuất'], ['Tỵ', 'Hợi']
  ];

  const LUC_HAI_PAIRS = [
    ['Tý', 'Mùi'], ['Sửu', 'Ngọ'], ['Dần', 'Tỵ'],
    ['Mão', 'Thìn'], ['Thân', 'Hợi'], ['Dậu', 'Tuất']
  ];

  function getYearAstrology(year) {
    const canIndex = (year - 4) % 10;
    const can = CAN_NAMES[(canIndex + 10) % 10];
    const chiIndex = (year - 4) % 12;
    const chi = CHI_NAMES[(chiIndex + 12) % 12];
    const hoaGiapIndex = ((year - 1924) % 60 + 60) % 60;
    const napAm = NAP_AM_TABLE[hoaGiapIndex] || { name: 'Kim Bạch Kim', element: 'Kim' };

    return {
      can,
      chi,
      fullCanChi: can + ' ' + chi,
      animal: CHI_INFO[chi]?.animal || '',
      emoji: CHI_INFO[chi]?.emoji || '',
      napAm: napAm.name,
      element: napAm.element
    };
  }

  function getCungPhi(year, isMale) {
    const twoDigits = year % 100;
    let sum = Math.floor(twoDigits / 10) + (twoDigits % 10);
    while (sum > 9) sum = Math.floor(sum / 10) + (sum % 10);
    let num;
    if (year < 2000) {
      num = isMale ? (10 - sum) : (5 + sum);
    } else {
      num = isMale ? (9 - sum) : (6 + sum);
    }
    while (num > 9) num -= 9;
    if (num <= 0) num += 9;

    const map = {
      1: { name: 'Khảm', element: 'Thủy', group: 'Đông Tứ Mệnh' },
      2: { name: 'Khôn', element: 'Thổ', group: 'Tây Tứ Mệnh' },
      3: { name: 'Chấn', element: 'Mộc', group: 'Đông Tứ Mệnh' },
      4: { name: 'Tốn', element: 'Mộc', group: 'Đông Tứ Mệnh' },
      5: isMale ? { name: 'Khôn', element: 'Thổ', group: 'Tây Tứ Mệnh' } : { name: 'Cấn', element: 'Thổ', group: 'Tây Tứ Mệnh' },
      6: { name: 'Càn', element: 'Kim', group: 'Tây Tứ Mệnh' },
      7: { name: 'Đoài', element: 'Kim', group: 'Tây Tứ Mệnh' },
      8: { name: 'Cấn', element: 'Thổ', group: 'Tây Tứ Mệnh' },
      9: { name: 'Ly', element: 'Hỏa', group: 'Đông Tứ Mệnh' }
    };
    return map[num] || map[1];
  }

  function evaluateCan(can1, can2) {
    const hopMap = {
      'Giáp': { partner: 'Kỷ', hoa: 'Thổ', desc: 'Giáp Kỷ hợp hóa Thổ: Trung chính chi hợp, vợ chồng trọng chữ tín, gia đạo vững vàng như núi thái sơn, làm ăn phát đạt thuận buồm xuôi gió.' },
      'Kỷ': { partner: 'Giáp', hoa: 'Thổ', desc: 'Giáp Kỷ hợp hóa Thổ: Trung chính chi hợp, vợ chồng trọng chữ tín, gia đạo vững vàng như núi thái sơn, làm ăn phát đạt thuận buồm xuôi gió.' },
      'Ất': { partner: 'Canh', hoa: 'Kim', desc: 'Ất Canh hợp hóa Kim: Nhân nghĩa chi hợp, cương nhu tương tể, nâng đỡ nhau cùng làm nên sự nghiệp lớn và bồi đắp kinh tế vững chắc.' },
      'Canh': { partner: 'Ất', hoa: 'Kim', desc: 'Ất Canh hợp hóa Kim: Nhân nghĩa chi hợp, cương nhu tương tể, nâng đỡ nhau cùng làm nên sự nghiệp lớn và bồi đắp kinh tế vững chắc.' },
      'Bính': { partner: 'Tân', hoa: 'Thủy', desc: 'Bính Tân hợp hóa Thủy: Uy chế chi hợp, trí tuệ sáng suốt, tiền tài sinh sôi nảy nở, con cái thông minh thành đạt hiển vinh.' },
      'Tân': { partner: 'Bính', hoa: 'Thủy', desc: 'Bính Tân hợp hóa Thủy: Uy chế chi hợp, trí tuệ sáng suốt, tiền tài sinh sôi nảy nở, con cái thông minh thành đạt hiển vinh.' },
      'Đinh': { partner: 'Nhâm', hoa: 'Mộc', desc: 'Đinh Nhâm hợp hóa Mộc: Nhân thọ chi hợp, tình cảm mặn nồng keo sơn, sống thọ an khang, gia đình phúc lộc song toàn, con cháu hiếu thảo.' },
      'Nhâm': { partner: 'Đinh', hoa: 'Mộc', desc: 'Đinh Nhâm hợp hóa Mộc: Nhân thọ chi hợp, tình cảm mặn nồng keo sơn, sống thọ an khang, gia đình phúc lộc song toàn, con cháu hiếu thảo.' },
      'Mậu': { partner: 'Quý', hoa: 'Hỏa', desc: 'Mậu Quý hợp hóa Hỏa: Đa lễ chi hợp, vợ chồng tương kính như tân, danh thơm lan tỏa, quý nhân luôn kề cận chở che.' },
      'Quý': { partner: 'Mậu', hoa: 'Hỏa', desc: 'Mậu Quý hợp hóa Hỏa: Đa lễ chi hợp, vợ chồng tương kính như tân, danh thơm lan tỏa, quý nhân luôn kề cận chở che.' }
    };

    if (hopMap[can1] && hopMap[can1].partner === can2) {
      return {
        score: 100,
        type: 'Thiên Can Hợp Hóa (Đại Cát)',
        badge: 'Đại Cát',
        color: '#10B981',
        desc: hopMap[can1].desc
      };
    }

    const phaMap = {
      'Giáp': ['Canh', 'Mậu'],
      'Ất': ['Tân', 'Kỷ'],
      'Bính': ['Nhâm', 'Canh'],
      'Đinh': ['Quý', 'Tân'],
      'Mậu': ['Giáp', 'Nhâm'],
      'Kỷ': ['Ất', 'Quý'],
      'Canh': ['Bính', 'Giáp'],
      'Tân': ['Đinh', 'Ất'],
      'Nhâm': ['Mậu', 'Bính'],
      'Quý': ['Kỷ', 'Đinh']
    };

    if (phaMap[can1] && phaMap[can1].includes(can2)) {
      return {
        score: 45,
        type: 'Thiên Can Tương Xung / Phá',
        badge: 'Cần Nhường Nhịn',
        color: '#EF4444',
        desc: can1 + ' và ' + can2 + ' có tính xung phá về chí hướng hoặc cá tính bên ngoài. Khi quyết định việc lớn cần bàn bạc thấu đáo, tránh để cái tôi lấn át gia đạo.'
      };
    }

    return {
      score: 75,
      type: 'Thiên Can Bình Hòa',
      badge: 'Bình Hòa',
      color: '#3B82F6',
      desc: can1 + ' và ' + can2 + ' bình hòa, không xung không khắc. Vợ chồng biết tôn trọng quan điểm của nhau thì mọi sự êm đẹp hanh thông.'
    };
  }

  function evaluateChi(chi1, chi2) {
    if (chi1 === chi2) {
      return { score: 75, type: 'Đồng Chi (Cùng Con Giáp)', badge: 'Bình Hòa', color: '#3B82F6', desc: 'Đồng chi ' + chi1 + ', tính khí và nhịp sống tương đồng, hiểu rõ tâm lý nhau nhưng đôi khi cần tránh cố chấp ngang bướng.' };
    }

    for (const group of TAM_HOP_GROUPS) {
      if (group.includes(chi1) && group.includes(chi2)) {
        return {
          score: 100,
          type: 'Tam Hợp (Đại Cát)',
          badge: 'Đại Cát',
          color: '#10B981',
          desc: chi1 + ' và ' + chi2 + ' nằm trong bộ Tam Hợp (' + group.join(' - ') + '), âm dương tương trợ, đại cát đại lợi, gia đạo hòa hợp, sự nghiệp thăng hoa bền vững!'
        };
      }
    }

    for (const pair of LUC_HOP_PAIRS) {
      if ((pair[0] === chi1 && pair[1] === chi2) || (pair[0] === chi2 && pair[1] === chi1)) {
        return {
          score: 95,
          type: 'Lục Hợp (Quý Nhân Nhị Hợp)',
          badge: 'Thượng Cát',
          color: '#10B981',
          desc: chi1 + ' và ' + chi2 + ' là cặp Lục Hợp quý nhân, tâm đầu ý hợp, gắn bó keo sơn, luôn nâng đỡ nhau vượt qua mọi thử thách cuộc đời.'
        };
      }
    }

    for (const pair of LUC_XUNG_PAIRS) {
      if ((pair[0] === chi1 && pair[1] === chi2) || (pair[0] === chi2 && pair[1] === chi1)) {
        return {
          score: 35,
          type: 'Lục Xung (Trực Đối Xung)',
          badge: 'Đại Hung',
          color: '#DC2626',
          desc: chi1 + ' và ' + chi2 + ' là cặp Lục Xung đối đỉnh, dễ khắc khẩu, va chạm cá tính và mâu thuẫn về lối sống. Cần biết nhẫn nhịn và áp dụng pháp thế phong thủy hóa giải.'
        };
      }
    }

    for (const pair of LUC_HAI_PAIRS) {
      if ((pair[0] === chi1 && pair[1] === chi2) || (pair[0] === chi2 && pair[1] === chi1)) {
        return {
          score: 45,
          type: 'Lục Hại (Tương Hại Bất Lợi)',
          badge: 'Thứ Hung',
          color: '#F59E0B',
          desc: chi1 + ' và ' + chi2 + ' tương hại, dễ sinh nghi kỵ hoặc hiểu lầm không đáng có. Cần sự thẳng thắn, minh bạch trong tài chính và tình cảm.'
        };
      }
    }

    return {
      score: 70,
      type: 'Bình Thường',
      badge: 'Bình Cát',
      color: '#3B82F6',
      desc: 'Địa chi không xung không khắc, có thể cùng nhau xây dựng mối quan hệ tốt đẹp dựa trên sự thấu hiểu và sẻ chia.'
    };
  }

  function evaluateElements(elem1, elem2) {
    if (elem1 === elem2) {
      return {
        score: 80,
        type: 'Đồng Hành (Bình Hòa Vượng Khí)',
        badge: 'Cát Lợi',
        color: '#3B82F6',
        desc: 'Cả hai cùng thuộc hành ' + elem1 + ', cùng trường khí, dễ đồng cảm và chung mục tiêu, nhưng khi nóng nảy cần có người nhường bước.'
      };
    }

    const sinhMap = { 'Kim': 'Thủy', 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim' };

    if (sinhMap[elem1] === elem2) {
      return {
        score: 95,
        type: 'Bản Mệnh Tương Sinh (Cực Tốt)',
        badge: 'Thượng Cát',
        color: '#10B981',
        desc: elem1 + ' sinh ' + elem2 + ': Bản mệnh tương sinh, một bên nuôi dưỡng, nâng đỡ và mang lại may mắn, tài lộc trọn vẹn cho bên kia.'
      };
    }

    if (sinhMap[elem2] === elem1) {
      return {
        score: 95,
        type: 'Bản Mệnh Tương Sinh (Cực Tốt)',
        badge: 'Thượng Cát',
        color: '#10B981',
        desc: elem2 + ' sinh ' + elem1 + ': Bản mệnh tương sinh, hậu phương vững chắc hỗ trợ đắc lực bồi đắp sinh khí thịnh vượng cho mái ấm.'
      };
    }

    const khacMap = { 'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim' };

    if (khacMap[elem1] === elem2 || khacMap[elem2] === elem1) {
      return {
        score: 40,
        type: 'Bản Mệnh Tương Khắc (Cần Hóa Giải)',
        badge: 'Tương Khắc',
        color: '#EF4444',
        desc: 'Ngũ hành tương khắc (' + elem1 + ' khắc ' + elem2 + '). Khác biệt trường năng lượng dễ dẫn đến áp lực tâm lý, cần dùng hành trung gian hoặc con cái để hóa giải sinh khí.'
      };
    }

    return {
      score: 65,
      type: 'Bình Hòa',
      badge: 'Bình Cát',
      color: '#3B82F6',
      desc: 'Ngũ hành không xung không khắc, gia đạo yên ổn.'
    };
  }

  function evaluateBatTrach(cung1, cung2) {
    const c1 = cung1.name;
    const c2 = cung2.name;

    const pairs = {
      'Càn-Đoài': 'Sinh Khí', 'Đoài-Càn': 'Sinh Khí',
      'Khảm-Tốn': 'Sinh Khí', 'Tốn-Khảm': 'Sinh Khí',
      'Cấn-Khôn': 'Sinh Khí', 'Khôn-Cấn': 'Sinh Khí',
      'Chấn-Ly': 'Sinh Khí', 'Ly-Chấn': 'Sinh Khí',

      'Càn-Khôn': 'Diên Niên', 'Khôn-Càn': 'Diên Niên',
      'Khảm-Ly': 'Diên Niên', 'Ly-Khảm': 'Diên Niên',
      'Cấn-Đoài': 'Diên Niên', 'Đoài-Cấn': 'Diên Niên',
      'Chấn-Tốn': 'Diên Niên', 'Tốn-Chấn': 'Diên Niên',

      'Càn-Cấn': 'Thiên Y', 'Cấn-Càn': 'Thiên Y',
      'Khảm-Chấn': 'Thiên Y', 'Chấn-Khảm': 'Thiên Y',
      'Tốn-Ly': 'Thiên Y', 'Ly-Tốn': 'Thiên Y',
      'Khôn-Đoài': 'Thiên Y', 'Đoài-Khôn': 'Thiên Y',

      'Càn-Càn': 'Phục Vị', 'Khảm-Khảm': 'Phục Vị',
      'Cấn-Cấn': 'Phục Vị', 'Chấn-Chấn': 'Phục Vị',
      'Tốn-Tốn': 'Phục Vị', 'Ly-Ly': 'Phục Vị',
      'Khôn-Khôn': 'Phục Vị', 'Đoài-Đoài': 'Phục Vị',

      'Càn-Ly': 'Tuyệt Mệnh', 'Ly-Càn': 'Tuyệt Mệnh',
      'Khảm-Khôn': 'Tuyệt Mệnh', 'Khôn-Khảm': 'Tuyệt Mệnh',
      'Cấn-Tốn': 'Tuyệt Mệnh', 'Tốn-Cấn': 'Tuyệt Mệnh',
      'Chấn-Đoài': 'Tuyệt Mệnh', 'Đoài-Chấn': 'Tuyệt Mệnh',

      'Càn-Chấn': 'Ngũ Quỷ', 'Chấn-Càn': 'Ngũ Quỷ',
      'Khảm-Cấn': 'Ngũ Quỷ', 'Cấn-Khảm': 'Ngũ Quỷ',
      'Tốn-Khôn': 'Ngũ Quỷ', 'Khôn-Tốn': 'Ngũ Quỷ',
      'Ly-Đoài': 'Ngũ Quỷ', 'Đoài-Ly': 'Ngũ Quỷ',

      'Càn-Khảm': 'Lục Sát', 'Khảm-Càn': 'Lục Sát',
      'Cấn-Chấn': 'Lục Sát', 'Chấn-Cấn': 'Lục Sát',
      'Tốn-Đoài': 'Lục Sát', 'Đoài-Tốn': 'Lục Sát',
      'Ly-Khôn': 'Lục Sát', 'Khôn-Ly': 'Lục Sát',

      'Càn-Tốn': 'Họa Hại', 'Tốn-Càn': 'Họa Hại',
      'Khảm-Đoài': 'Họa Hại', 'Đoài-Khảm': 'Họa Hại',
      'Cấn-Ly': 'Họa Hại', 'Ly-Cấn': 'Họa Hại',
      'Chấn-Khôn': 'Họa Hại', 'Khôn-Chấn': 'Họa Hại'
    };

    const key = c1 + '-' + c2;
    const que = pairs[key] || 'Phục Vị';

    const details = {
      'Sinh Khí': { score: 100, star: 'Tham Lang Mộc Tinh', type: 'Đại Cát (Thượng Đỉnh)', badge: 'Thượng Cát', color: '#10B981', desc: 'Sinh Khí thuộc Tham Lang tinh, chủ về tài vận đại vượng, con cái hiển vinh, vợ chồng cùng tiến bộ, trường khí sinh sôi dồi dào trọn đời.' },
      'Diên Niên': { score: 95, star: 'Vũ Khúc Kim Tinh', type: 'Thượng Cát (Phúc Đức)', badge: 'Thượng Cát', color: '#10B981', desc: 'Diên Niên (Phúc Đức) thuộc Vũ Khúc tinh, chủ về tình cảm mặn nồng keo sơn, bách niên giai lão, vợ chồng tâm đầu ý hợp, giữ chặt tài lộc gia đình.' },
      'Thiên Y': { score: 90, star: 'Cự Môn Thổ Tinh', type: 'Trung Cát (Trời Che Chở)', badge: 'Cát Lành', color: '#3B82F6', desc: 'Thiên Y thuộc Cự Môn tinh, chủ về sức khỏe khang kiện, tiêu trừ bệnh tật, có quý nhân phù trợ, gia đạo êm ấm, tài lộc dồi dào bình an.' },
      'Phục Vị': { score: 75, star: 'Tả Phụ Mộc Tinh', type: 'Tiểu Cát (Bình An)', badge: 'Bình Cát', color: '#6366F1', desc: 'Phục Vị thuộc Tả Phụ tinh, chủ về sự tĩnh tâm, an định, tình cảm bình dị vững bền, ít sóng gió phong ba.' },
      'Họa Hại': { score: 45, star: 'Lộc Tồn Thổ Tinh', type: 'Thứ Hung (Khẩu Thiệt)', badge: 'Thứ Hung', color: '#F59E0B', desc: 'Họa Hại thuộc Lộc Tồn tinh, dễ vướng thị phi khẩu thiệt hoặc mệt mỏi vì việc lặt vặt. Cần hóa giải bằng hướng bếp Phục Vị hoặc sinh con cung Phục Vị.' },
      'Lục Sát': { score: 40, star: 'Văn Khúc Thủy Tinh', type: 'Thứ Hung (Bất Hòa)', badge: 'Thứ Hung', color: '#F97316', desc: 'Lục Sát thuộc Văn Khúc tinh, chủ về xáo trộn tình cảm, nghi kỵ, khắc khẩu. Hóa giải bằng cách đặt giường ngủ hướng Diên Niên và sinh con cung Diên Niên.' },
      'Ngũ Quỷ': { score: 30, star: 'Liêm Trinh Hỏa Tinh', type: 'Đại Hung (Hao Tài Bất An)', badge: 'Đại Hung', color: '#EF4444', desc: 'Ngũ Quỷ thuộc Liêm Trinh tinh, dễ sinh bất hòa, nghi ngại, tổn hao tiền của. Cần hóa giải bằng cách đặt bếp hướng Sinh Khí hoặc sinh con cung Sinh Khí để dập tắt hung khí.' },
      'Tuyệt Mệnh': { score: 25, star: 'Phá Quân Kim Tinh', type: 'Đại Hung (Tổn Hại Sinh Khí)', badge: 'Đại Hung', color: '#DC2626', desc: 'Tuyệt Mệnh thuộc Phá Quân tinh, khí trường xung khắc nặng về sức khỏe và sinh lực. Cần hóa giải triệt để bằng bếp hướng Thiên Y hoặc sinh con cung Thiên Y (Thiên Y chế Tuyệt Mệnh).' }
    };

    return { que, ...details[que] };
  }

  function evaluateLifePath(lp1, lp2) {
    const naturalHarmony = {
      1: [1, 5, 7, 3],
      2: [2, 4, 8, 6],
      3: [3, 6, 9, 1, 5],
      4: [2, 4, 8, 7],
      5: [1, 5, 7, 3, 9],
      6: [3, 6, 9, 2],
      7: [1, 5, 7, 4],
      8: [2, 4, 8, 6],
      9: [3, 6, 9, 5],
      11: [2, 4, 11, 22],
      22: [4, 8, 11, 22]
    };

    if (lp1 === lp2) {
      return {
        score: 85,
        type: 'Đồng Điệu Tần Số (Số ' + lp1 + ')',
        desc: 'Cả hai cùng con số chủ đạo ' + lp1 + ', cùng nhịp điệu tư duy và giá trị sống. Thấu hiểu nhau không cần lời nói, nhưng cần tôn trọng khoảng trời riêng của nhau.'
      };
    }

    if (naturalHarmony[lp1] && naturalHarmony[lp1].includes(lp2)) {
      return {
        score: 95,
        type: 'Tương Hợp Tự Nhiên (Số ' + lp1 + ' & ' + lp2 + ')',
        desc: 'Số ' + lp1 + ' và số ' + lp2 + ' có tần số rung động tương thích tự nhiên, dễ nâng đỡ, tạo động lực và bù đắp khuyết điểm cho nhau trong cuộc sống.'
      };
    }

    return {
      score: 65,
      type: 'Bù Trừ Thử Thách (Số ' + lp1 + ' & ' + lp2 + ')',
      desc: 'Số ' + lp1 + ' và số ' + lp2 + ' mang góc nhìn khác biệt. Đây là bài học để cùng nhau hoàn thiện và mở rộng thế giới quan nếu cả hai biết lắng nghe.'
    };
  }

  function isVipActive() {
    if (typeof window !== 'undefined') {
      if (window.TuViMonetize && window.TuViMonetize.isVipUnlocked) return true;
      try {
        const order = localStorage.getItem('tvhh_vip_order_code');
        if (order === 'TV774622' || order === 'TV377099') return true;
        if (localStorage.getItem('tvhh_vip_unlocked') === 'true' ||
            localStorage.getItem('tvhh_vip_token') || 
            localStorage.getItem('tvhh_tripwire_unlocked') === 'true') return true;
      } catch (e) {}
    }
    return false;
  }

  class CompatibilityEngine {
    constructor(p1, p2, type = 'love') {
      this.p1 = p1;
      this.p2 = p2;
      this.type = type;
    }

    calculate() {
      const year1 = parseInt(this.p1.birthDate.split('-')[0], 10);
      const year2 = parseInt(this.p2.birthDate.split('-')[0], 10);

      const astro1 = getYearAstrology(year1);
      const astro2 = getYearAstrology(year2);

      const cungPhi1 = getCungPhi(year1, true);
      const cungPhi2 = getCungPhi(year2, false);

      let lp1 = 7, lp2 = 8, soul1 = 6, soul2 = 9;
      if (window.TuViNumerology && window.TuViNumerology.Engine) {
        try {
          const n1 = new window.TuViNumerology.Engine(this.p1.name, this.p1.birthDate);
          const n2 = new window.TuViNumerology.Engine(this.p2.name, this.p2.birthDate);
          lp1 = n1.getLifePath().value;
          lp2 = n2.getLifePath().value;
          soul1 = n1.getSoulUrge().value;
          soul2 = n2.getSoulUrge().value;
        } catch (e) {}
      }

      const canResult = evaluateCan(astro1.can, astro2.can);
      const chiResult = evaluateChi(astro1.chi, astro2.chi);
      const elemResult = evaluateElements(astro1.element, astro2.element);
      const batTrachResult = evaluateBatTrach(cungPhi1, cungPhi2);
      const numResult = evaluateLifePath(lp1, lp2);

      const totalScore = Math.round(
        canResult.score * 0.15 +
        chiResult.score * 0.25 +
        elemResult.score * 0.25 +
        batTrachResult.score * 0.25 +
        numResult.score * 0.10
      );

      let rank = 'Khá Hòa Hợp';
      let rankColor = '#C29B38';
      let rankBadge = '💛 KHÁ TƯƠNG HỢP';

      if (totalScore >= 85) {
        rank = 'Thiên Sinh Một Cặp - Đại Cát';
        rankColor = '#A3281F';
        rankBadge = '💎 THIÊN SINH MỘT CẶP';
      } else if (totalScore >= 75) {
        rank = 'Rất Hợp Nhau - Cát Lợi';
        rankColor = '#8C6514';
        rankBadge = '🌟 RẤT HÒA HỢP';
      } else if (totalScore >= 60) {
        rank = 'Bình Hòa - Cần Bồi Đắp';
        rankColor = '#2F855A';
        rankBadge = '🌿 BÌNH HÒA';
      } else {
        rank = 'Nhiều Khác Biệt - Cần Hóa Giải';
        rankColor = '#C53030';
        rankBadge = '⚠️ CẦN HÓA GIẢI';
      }

      const forecastYears = [
        {
          year: 2026,
          canChi: 'Bính Ngọ',
          napAm: 'Thiên Hà Thủy (Nước Trên Trời)',
          tinhCam: 'Năm Hỏa vượng sinh Thủy khí, tình cảm hai người có nhiều khởi sắc, đón tin vui lớn về nhà cửa hoặc công việc. Tháng 5 và tháng 9 âm lịch là thời điểm hòa khí gia đình ấm áp nhất.',
          taiChinh: 'Tài chính ổn định, có lộc bất ngờ từ công việc tay trái hoặc đầu tư tài sản dài hạn. Cần tránh cho vay mượn người ngoài không giấy tờ vào quý 3.',
          loiKhuyen: 'Dành nhiều thời gian đi du lịch chung hoặc về quê thăm thân nhân để bồi đắp phúc khí gia đình.'
        },
        {
          year: 2027,
          canChi: 'Đinh Mùi',
          napAm: 'Thiên Hà Thủy (Nước Trên Trời)',
          tinhCam: 'Lưu Niên Đinh Mùi tạo nên thế quân bình đẹp cho cung Phu Thê. Năm đại cát để sinh con, thành hôn hoặc tổ chức sự kiện kỷ niệm lớn. Gia đạo ngập tràn tiếng cười.',
          taiChinh: 'Thu nhập tăng trưởng vững vàng. Người bạn đời có bước tiến triển lớn trong đường sự nghiệp, hỗ trợ đắc lực cho tài chính chung của mái ấm.',
          loiKhuyen: 'Nên trích một phần tài lộc làm việc thiện nguyện tích đức, tạo nền móng vững bền cho con cháu.'
        },
        {
          year: 2028,
          canChi: 'Mậu Thân',
          napAm: 'Đại Trạch Thổ (Đất Đầm Lầy)',
          tinhCam: 'Năm Thổ vượng đòi hỏi sự kiên nhẫn. Có lúc công việc bận rộn khiến đôi bên ít có thời gian chia sẻ. Cần chủ động tâm sự, tránh giữ ấm ức trong lòng.',
          taiChinh: 'Cơ hội mua sắm điền trạch, bất động sản hoặc mở rộng quy mô kinh doanh gia đình. Chi tiêu nhiều cho tài sản tích lũy nhưng sinh lời bền vững.',
          loiKhuyen: 'Mỗi tuần nên có ít nhất một bữa cơm gia đình đầm ấm trọn vẹn không dùng điện thoại.'
        },
        {
          year: 2029,
          canChi: 'Kỷ Dậu',
          napAm: 'Đại Trạch Thổ (Đất Đầm Lầy)',
          tinhCam: 'Gia đạo thuận hòa, con cái ngoan ngoãn học hành tấn tới. Những hiểu lầm trước đây đều được tháo gỡ hoàn toàn, tình cảm càng thêm gắn bó son sắt.',
          taiChinh: 'Tài khố tích tụ vững vàng, các khoản đầu tư trước đây bắt đầu gặt hái quả ngọt. Có quý nhân phương xa hỗ trợ công việc làm ăn.',
          loiKhuyen: 'Chú ý chăm sóc sức khỏe của cả hai, tăng cường tập luyện thể thao và dinh dưỡng thanh đạm.'
        },
        {
          year: 2030,
          canChi: 'Canh Tuất',
          napAm: 'Thoa Xuyến Kim (Vàng Trang Sức)',
          tinhCam: 'Thoa Xuyến Kim mang đến sự viên mãn và vinh hoa. Mối quan hệ bước vào giai đoạn thấu hiểu sâu sắc, là điểm tựa tinh thần vững chắc nhất cho nhau.',
          taiChinh: 'Tài lộc dồi dào, kinh tế gia đình đạt đỉnh cao ổn định. Con cái mang lại niềm tự hào to lớn cho cha mẹ.',
          loiKhuyen: 'Giữ gìn truyền thống gia phong, tôn kính tổ tiên để phúc trạch con cháu trường tồn.'
        }
      ];

      const childYears = [
        {
          year: 2026,
          canChi: 'Bính Ngọ',
          napAm: 'Thiên Hà Thủy',
          score: 8.8,
          rank: 'Đại Cát',
          stars: '⭐⭐⭐⭐⭐',
          color: '#10B981',
          desc: 'Thủy khí ôn hòa tương sinh tốt cho bản mệnh cha mẹ, con cái thông minh đĩnh ngộ, mang lại may mắn và tài lộc dồi dào.'
        },
        {
          year: 2027,
          canChi: 'Đinh Mùi',
          napAm: 'Thiên Hà Thủy',
          score: 9.5,
          rank: 'Hoàng Kim Đại Cát',
          stars: '⭐⭐⭐⭐⭐',
          color: '#A3281F',
          desc: 'Năm vàng sinh con đại cát lợi! Thiên Can Đinh hòa hợp, Chi Mùi ôn hậu, con cái hiếu thảo, gắn kết tình cảm vợ chồng thắm thiết.'
        },
        {
          year: 2028,
          canChi: 'Mậu Thân',
          napAm: 'Đại Trạch Thổ',
          score: 8.2,
          rank: 'Cát Lành',
          stars: '⭐⭐⭐⭐',
          color: '#3B82F6',
          desc: 'Thổ khí vững chãi giúp gia đình an cư lạc nghiệp, con sinh năm này có chí tiến thủ và tài năng lãnh đạo nổi bật.'
        },
        {
          year: 2029,
          canChi: 'Kỷ Dậu',
          napAm: 'Đại Trạch Thổ',
          score: 7.8,
          rank: 'Khá Cát',
          stars: '⭐⭐⭐⭐',
          color: '#8C6514',
          desc: 'Địa chi Dậu thanh tú, con cái có khiếu nghệ thuật và ngoại giao tốt, đem lại nhiều niềm vui cho tổ ấm.'
        },
        {
          year: 2030,
          canChi: 'Canh Tuất',
          napAm: 'Thoa Xuyến Kim',
          score: 8.5,
          rank: 'Đại Cát',
          stars: '⭐⭐⭐⭐⭐',
          color: '#10B981',
          desc: 'Kim quý tỏa sáng, con cái quý phái khôi ngô, mang lại phú quý và danh vọng rạng rỡ cho dòng họ.'
        }
      ];

      const fengShui = {
        queName: batTrachResult.que,
        queType: batTrachResult.type,
        isHung: ['Tuyệt Mệnh', 'Ngũ Quỷ', 'Lục Sát', 'Họa Hại'].includes(batTrachResult.que),
        bepHuong: batTrachResult.que === 'Tuyệt Mệnh' ? 'Đặt bếp tọa Tây Bắc hướng Đông (hướng Thiên Y của gia đình) để thiêu đốt hung khí Tuyệt Mệnh, hóa nguy thành an.' :
                  batTrachResult.que === 'Ngũ Quỷ' ? 'Đặt bếp hướng Sinh Khí (Đông Nam) để sinh khí giáng ngũ quỷ, hóa giải bất hòa, mang lại hưng vượng tài lộc.' :
                  batTrachResult.que === 'Lục Sát' ? 'Đặt bếp hướng Diên Niên (Nam) để Diên Niên yểm Lục Sát, củng cố tình cảm vợ chồng keo sơn.' :
                  batTrachResult.que === 'Họa Hại' ? 'Đặt bếp hướng Phục Vị (Bắc) để Phục Vị an Họa Hại, tiêu trừ khẩu thiệt thị phi.' :
                  'Bếp nên đặt tọa hung hướng cát, quay về hướng Sinh Khí hoặc Diên Niên để nhân đôi tài lộc và phúc thọ.',
        giuongHuong: 'Đầu giường ngủ của vợ chồng nên quay về hướng ' + (cungPhi1.group === 'Đông Tứ Mệnh' ? 'Bắc, Đông, Đông Nam hoặc Nam' : 'Tây Bắc, Tây Nam, Đông Bắc hoặc Tây') + ' để đón luồng từ trường êm dịu, giúp giấc ngủ an lành, tình cảm mặn nồng.',
        sinhConHoaGiai: batTrachResult.que === 'Tuyệt Mệnh' ? 'Sinh con thuộc cung Thiên Y (hoặc năm mệnh Thổ/Thủy) làm cầu nối hòa giải triệt để, biến hung thành đại cát.' :
                        batTrachResult.que === 'Ngũ Quỷ' ? 'Sinh con thuộc cung Sinh Khí (như năm 2026, 2027) sẽ dập tắt hoàn toàn hung khí, mang lại thịnh vượng bất ngờ.' :
                        'Sinh con vào các năm Cát Lành (đặc biệt năm 2027 Đinh Mùi) sẽ tiếp thêm phúc khí và sinh lực dồi dào cho cả cha mẹ.',
        mauSacVatPham: elemResult.score < 60 ? 'Mượn ngũ hành trung gian: Nếu Thủy - Hỏa khắc nhau thì dùng Mộc (trồng cây xanh, rèm màu xanh lá); nếu Kim - Mộc khắc nhau thì dùng Thủy (bể cá, màu xanh lam); nếu Hỏa - Kim khắc nhau thì dùng Thổ (gốm sứ, thạch anh vàng).' : 'Phòng tân hôn nên dùng tone màu ấm cúng (vàng kem, be nhạt), treo tranh Đôi Uyên Ương hoặc Hoa Mẫu Đơn để tăng cường vượng khí hôn nhân.'
      };

      const remedies = [];
      if (elemResult.score < 60) {
        remedies.push('Sử dụng ngũ hành cầu nối trong không gian sống hoặc màu sắc trang phục để cân bằng sinh khí.');
      }
      if (chiResult.score < 60) {
        remedies.push('Học cách nhường nhịn, tránh tranh cãi vào các năm và tháng xung khắc của hai con giáp.');
      }
      if (this.type === 'love' && totalScore >= 75) {
        remedies.push('Thời vận hòa hợp, thuận lợi cho việc tiến tới hôn nhân, xây dựng tổ ấm và sinh con hợp tuổi cha mẹ.');
      } else if (this.type === 'business') {
        remedies.push('Phân công vai trò rành mạch: một người giữ vai trò tầm nhìn chiến lược, người kia kiểm soát tài chính và thực thi.');
      }

      return {
        p1: { ...this.p1, astro: astro1, cungPhi: cungPhi1, lifePath: lp1, soulUrge: soul1 },
        p2: { ...this.p2, astro: astro2, cungPhi: cungPhi2, lifePath: lp2, soulUrge: soul2 },
        totalScore,
        rank,
        rankColor,
        rankBadge,
        canResult,
        chiResult,
        elemResult,
        batTrachResult,
        numResult,
        forecastYears,
        childYears,
        fengShui,
        remedies
      };
    }
  }

  function initCompatibilityApp() {
    const form = document.getElementById('compatibilityForm');
    if (!form) return;

    const inputName1 = document.getElementById('p1Name');
    const inputDate1 = document.getElementById('p1Dob');
    const inputName2 = document.getElementById('p2Name');
    const inputDate2 = document.getElementById('p2Dob');
    const selectType = document.getElementById('relType');
    const container = document.getElementById('compatibilityResultContainer');

    const params = new URLSearchParams(window.location.search);
    if (params.get('name1') && inputName1) inputName1.value = decodeURIComponent(params.get('name1'));
    if (params.get('dob1') && inputDate1) inputDate1.value = params.get('dob1');
    if (params.get('name2') && inputName2) inputName2.value = decodeURIComponent(params.get('name2'));
    if (params.get('dob2') && inputDate2) inputDate2.value = params.get('dob2');
    if (params.get('type') && selectType) selectType.value = params.get('type');

    if (params.get('name1') && params.get('dob1') && params.get('name2') && params.get('dob2')) {
      renderCompatibilityResult(
        { name: params.get('name1'), birthDate: params.get('dob1') },
        { name: params.get('name2'), birthDate: params.get('dob2') },
        params.get('type') || 'love'
      );
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const n1 = inputName1.value.trim();
      const d1 = inputDate1.value.trim();
      const n2 = inputName2.value.trim();
      const d2 = inputDate2.value.trim();
      const relType = selectType.value;

      if (!n1 || !d1 || !n2 || !d2) {
        alert('Vui lòng điền đầy đủ thông tin của cả 2 người.');
        return;
      }

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('name1', n1);
      newUrl.searchParams.set('dob1', d1);
      newUrl.searchParams.set('name2', n2);
      newUrl.searchParams.set('dob2', d2);
      newUrl.searchParams.set('type', relType);
      window.history.pushState({}, '', newUrl);

      renderCompatibilityResult(
        { name: n1, birthDate: d1 },
        { name: n2, birthDate: d2 },
        relType
      );

      if (window.TuViTracker && typeof window.TuViTracker.track === 'function') {
        window.TuViTracker.track('hop_tuoi_tra_cuu', { person1: n1, person2: n2, type: relType });
      }
    });
  }

  function renderCompatibilityResult(person1, person2, relType) {
    const container = document.getElementById('compatibilityResultContainer');
    if (!container) return;

    if (!person1 || !person2) {
      if (window.TuViCompatibility && window.TuViCompatibility._lastParams) {
        person1 = window.TuViCompatibility._lastParams.person1;
        person2 = window.TuViCompatibility._lastParams.person2;
        relType = window.TuViCompatibility._lastParams.relType;
      } else {
        try {
          const saved = sessionStorage.getItem('tvhh_last_comp_params');
          if (saved) {
            const parsed = JSON.parse(saved);
            person1 = parsed.person1;
            person2 = parsed.person2;
            relType = parsed.relType;
          }
        } catch (e) {}
      }
      if (!person1 || !person2) {
        const p1n = document.getElementById('p1Name')?.value?.trim();
        const p1d = document.getElementById('p1Dob')?.value?.trim();
        const p2n = document.getElementById('p2Name')?.value?.trim();
        const p2d = document.getElementById('p2Dob')?.value?.trim();
        const rt = document.getElementById('relType')?.value || 'love';
        if (p1n && p1d && p2n && p2d) {
          person1 = { name: p1n, birthDate: p1d };
          person2 = { name: p2n, birthDate: p2d };
          relType = rt;
        }
      }
    }
    if (!person1 || !person2) return;

    if (window.TuViCompatibility) {
      window.TuViCompatibility._lastParams = { person1, person2, relType };
    }
    try {
      sessionStorage.setItem('tvhh_last_comp_params', JSON.stringify({ person1, person2, relType }));
    } catch (e) {}

    const engine = new CompatibilityEngine(person1, person2, relType);
    const res = engine.calculate();
    const isVip = isVipActive();

    const orderCode = (typeof localStorage !== 'undefined' ? (localStorage.getItem('tvhh_vip_order_code') || 'TV774622') : 'TV774622');

    const typeLabels = {
      love: 'Tình Duyên & Hôn Nhân Gia Đạo',
      business: 'Làm Ăn & Hợp Tác Kinh Doanh',
      friendship: 'Bạn Bè & Tri Kỷ Đồng Hành',
      family: 'Gia Đình & Thân Tộc'
    };

    let html = `
      <div class="comp-report-wrapper" id="compVipReportSection">
        <!-- BẢN IN: TIÊU ĐỀ BÁO CÁO HỢP TUỔI VIP (CHỈ HIỂN THỊ KHI IN / XUẤT PDF A4) -->
        <div class="print-report-header">
          <div class="print-header-top">
            <span class="print-brand">✦ XEM TỬ VI HUYỀN HỌC · CỔ HỌC TINH HOA VIỆT NAM ✦</span>
            <span class="print-meta-right">BÁO CÁO HỢP TUỔI &amp; HÔN PHỐI BÁT TỰ · VIP A4</span>
          </div>
          <h1 class="print-header-title">BÁO CÁO HỢP TUỔI &amp; HÔN PHỐI BÁT TỰ ĐẠI CÁT</h1>
          <p class="print-header-sub">Đương số 1: <strong>${res.p1.name.toUpperCase()}</strong> (${res.p1.astro.fullCanChi} - Cung ${res.p1.cungPhi.name}) ✕ Đương số 2: <strong>${res.p2.name.toUpperCase()}</strong> (${res.p2.astro.fullCanChi} - Cung ${res.p2.cungPhi.name})</p>
        </div>

        ${isVip ? `
        <!-- VIP UNLOCKED NOTIFICATION BANNER -->
        <div class="comp-vip-unlocked-card" style="background: linear-gradient(135deg, #241D17 0%, #15110D 100%); border: 2px solid var(--gold); border-radius: 12px; padding: 1.5rem 2rem; color: #F3ECDD; margin-bottom: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.35); text-align: center;">
          <div style="display:inline-flex;align-items:center;gap:6px;background:var(--gold);color:#1A1510;font-size:0.76rem;font-weight:800;padding:3px 12px;border-radius:4px;letter-spacing:1px;text-transform:uppercase;margin-bottom:0.75rem;">
            👑 BÁO CÁO VIP ĐÃ MỞ KHÓA TOÀN PHẦN
          </div>
          <h2 style="font-family:var(--font-heading);color:#FFE6A3;font-size:1.55rem;margin-bottom:0.5rem;font-weight:700;text-shadow:0 1px 3px rgba(0,0,0,0.6);">
            ✦ BẢN ĐỒ HÔN PHỐI BÁT TỰ &amp; THẦN SỐ HỌC TOÀN THƯ ✦
          </h2>
          <p style="color:#D9CEB8;font-size:0.95rem;max-width:700px;margin:0 auto 1.25rem;line-height:1.6;">
            Chào mừng bạn! Hệ thống đã xác thực giao dịch thành công cho mã đơn <strong>#${orderCode}</strong>. Toàn bộ 5 tầng luận giải Bát Tự, dự báo 5 năm, pháp thế phong thủy hóa giải và cẩm nang sinh con đã được mở khóa trọn vẹn.
          </p>
          <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
            <button type="button" class="btn-royal-action" onclick="window.print();" style="display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg, #C29B38 0%, #E5BA5C 100%);color:#1A1510;font-weight:800;padding:0.75rem 1.6rem;border-radius:6px;text-decoration:none;border:none;cursor:pointer;box-shadow:0 4px 14px rgba(194,155,56,0.4);">
              🖨️ XUẤT BẢN FILE BÁO CÁO PDF A4 (IN NGAY)
            </button>
          </div>
        </div>
        ` : ''}

        <!-- Hero Header Card -->
        <div class="comp-hero-card">
          <div class="comp-seal-tag">✦ BẢN ĐỒ TƯƠNG HỢP BÁT TỰ &amp; THẦN SỐ HỌC ✦</div>
          <h2 class="comp-title">${res.p1.name.toUpperCase()} ✕ ${res.p2.name.toUpperCase()}</h2>
          <div class="comp-meta">
            <span>Mục đích tra cứu: <strong>${typeLabels[relType] || 'Tình Duyên'}</strong></span>
          </div>

          <!-- Dual Person Cards -->
          <div class="dual-persons-grid">
            <div class="person-box">
              <div class="person-avatar">${res.p1.astro.emoji}</div>
              <h3>${res.p1.name}</h3>
              <div class="p-detail">Tuổi: <strong>${res.p1.astro.fullCanChi}</strong> (${res.p1.astro.animal})</div>
              <div class="p-detail">Bản mệnh: <strong>${res.p1.astro.napAm}</strong> (Hành ${res.p1.astro.element})</div>
              <div class="p-detail">Cung Phi: <strong>${res.p1.cungPhi.name}</strong> (${res.p1.cungPhi.group})</div>
              <div class="p-detail">Số Chủ Đạo: <strong>Số ${res.p1.lifePath}</strong></div>
            </div>

            <div class="score-circle-box">
              <div class="radial-score-meter" style="border-color: ${res.rankColor};">
                <span class="score-digits">${res.totalScore}%</span>
                <span class="score-lbl">ĐỘ TƯƠNG HỢP</span>
              </div>
              <div class="rank-badge" style="background-color: ${res.rankColor}; color: #fff;">${res.rankBadge}</div>
            </div>

            <div class="person-box">
              <div class="person-avatar">${res.p2.astro.emoji}</div>
              <h3>${res.p2.name}</h3>
              <div class="p-detail">Tuổi: <strong>${res.p2.astro.fullCanChi}</strong> (${res.p2.astro.animal})</div>
              <div class="p-detail">Bản mệnh: <strong>${res.p2.astro.napAm}</strong> (Hành ${res.p2.astro.element})</div>
              <div class="p-detail">Cung Phi: <strong>${res.p2.cungPhi.name}</strong> (${res.p2.cungPhi.group})</div>
              <div class="p-detail">Số Chủ Đạo: <strong>Số ${res.p2.lifePath}</strong></div>
            </div>
          </div>
        </div>

        <!-- 3 Layers Base Analysis -->
        <div class="comp-section-block">
          <h3 class="section-title-royal">✦ PHÂN TÍCH TƯƠNG HỢP ĐA TẦNG CƠ BẢN ✦</h3>
          <div class="layers-grid">
            <!-- Layer 1: Con Giáp -->
            <div class="layer-card">
              <div class="layer-header">
                <span class="layer-icon">🐉</span>
                <div>
                  <h4>TẦNG 1: ĐỊA CHI (CON GIÁP)</h4>
                  <div class="layer-status" style="color:${res.chiResult.color};font-weight:700;">${res.chiResult.type} (${res.chiResult.score}/100)</div>
                </div>
              </div>
              <p>${res.chiResult.desc}</p>
            </div>

            <!-- Layer 2: Ngũ Hành -->
            <div class="layer-card">
              <div class="layer-header">
                <span class="layer-icon">☯️</span>
                <div>
                  <h4>TẦNG 2: NGŨ HÀNH BẢN MỆNH</h4>
                  <div class="layer-status" style="color:${res.elemResult.color};font-weight:700;">${res.elemResult.type} (${res.elemResult.score}/100)</div>
                </div>
              </div>
              <p>${res.elemResult.desc}</p>
            </div>

            <!-- Layer 3: Thần Số Học -->
            <div class="layer-card">
              <div class="layer-header">
                <span class="layer-icon">🔢</span>
                <div>
                  <h4>TẦNG 3: TẦN SỐ SỐNG PYTHAGORAS</h4>
                  <div class="layer-status">${res.numResult.type} (${res.numResult.score}/100)</div>
                </div>
              </div>
              <p>${res.numResult.desc}</p>
            </div>
          </div>
        </div>
    `;

    // NẾU LÀ TÀI KHOẢN VIP ĐÃ THANH TOÁN -> HIỂN THỊ TOÀN BỘ 5 PHẦN LUẬN GIẢI CHUYÊN SÂU VIP
    if (isVip) {
      html += `
        <!-- ========================================== -->
        <!-- PHẦN 1: MA TRẬN 5 TẦNG BÁT TỰ CHUYÊN SÂU VIP -->
        <!-- ========================================== -->
        <div class="comp-section-block" style="margin-top:2.5rem;">
          <h3 class="section-title-royal" style="font-size:1.35rem;border-bottom:2px solid var(--brass);padding-bottom:0.5rem;margin-bottom:1.5rem;">
            ✦ PHẦN 1: MA TRẬN 5 TẦNG BÁT TỰ &amp; THẦN SỐ HỌC CHUYÊN SÂU VIP ✦
          </h3>

          <div style="display:grid;grid-template-columns:1fr;gap:1.25rem;">
            <!-- Tầng 1: Thiên Can Hợp Hóa -->
            <div style="background:#FFFDF9;border:1px solid var(--line);border-left:4px solid ${res.canResult.color};border-radius:8px;padding:1.25rem;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap;gap:6px;">
                <h4 style="font-family:var(--font-heading);color:var(--seal);font-size:1.1rem;margin:0;">
                  👑 TẦNG 1: THIÊN CAN HỢP HÓA (${res.p1.astro.can} ✕ ${res.p2.astro.can})
                </h4>
                <span style="background:${res.canResult.color};color:#fff;font-size:0.75rem;font-weight:700;padding:2px 8px;border-radius:4px;">
                  ${res.canResult.badge} (${res.canResult.score}/100)
                </span>
              </div>
              <p style="font-size:0.92rem;line-height:1.65;color:var(--text);margin:0;">
                ${res.canResult.desc} Thiên can đại diện cho ý chí, khát vọng và cách đối nhân xử thế với xã hội bên ngoài. Sự tương hợp thiên can giúp hai người cùng nhìn về một hướng, tránh mâu thuẫn lớn trong việc định hướng tương lai.
              </p>
            </div>

            <!-- Tầng 2: Địa Chi Thập Nhị Chi -->
            <div style="background:#FFFDF9;border:1px solid var(--line);border-left:4px solid ${res.chiResult.color};border-radius:8px;padding:1.25rem;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap;gap:6px;">
                <h4 style="font-family:var(--font-heading);color:var(--seal);font-size:1.1rem;margin:0;">
                  👑 TẦNG 2: ĐỊA CHI PHỐI NGẪU (${res.p1.astro.chi} - ${res.p1.astro.animal} ✕ ${res.p2.astro.chi} - ${res.p2.astro.animal})
                </h4>
                <span style="background:${res.chiResult.color};color:#fff;font-size:0.75rem;font-weight:700;padding:2px 8px;border-radius:4px;">
                  ${res.chiResult.badge} (${res.chiResult.score}/100)
                </span>
              </div>
              <p style="font-size:0.92rem;line-height:1.65;color:var(--text);margin:0;">
                ${res.chiResult.desc} Địa chi phản ánh bản năng, sinh hoạt đời thường và cội rễ huyết thống. Sự hòa hợp địa chi là nền tảng để mái ấm luôn tràn ngập tiếng cười, sự đồng thuận từ hai bên gia đình nội ngoại.
              </p>
            </div>

            <!-- Tầng 3: Ngũ Hành Nạp Âm Chi Tiết -->
            <div style="background:#FFFDF9;border:1px solid var(--line);border-left:4px solid ${res.elemResult.color};border-radius:8px;padding:1.25rem;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap;gap:6px;">
                <h4 style="font-family:var(--font-heading);color:var(--seal);font-size:1.1rem;margin:0;">
                  👑 TẦNG 3: NGŨ HÀNH NẠP ÂM (${res.p1.astro.napAm} ✕ ${res.p2.astro.napAm})
                </h4>
                <span style="background:${res.elemResult.color};color:#fff;font-size:0.75rem;font-weight:700;padding:2px 8px;border-radius:4px;">
                  ${res.elemResult.badge} (${res.elemResult.score}/100)
                </span>
              </div>
              <p style="font-size:0.92rem;line-height:1.65;color:var(--text);margin:0;">
                ${res.elemResult.desc} Không chỉ xét Ngũ hành đơn thuần mà xét đến tính chất cụ thể của nạp âm: ${res.p1.astro.napAm} mang trường khí ${res.p1.astro.element}, khi phối kết với ${res.p2.astro.napAm} hành ${res.p2.astro.element} tạo nên sự giao thoa đặc thù trong quản trị tài chính và giữ gìn lửa ấm tình yêu.
              </p>
            </div>

            <!-- Tầng 4: Cung Phi Bát Trạch (Bát Biến Du Niên) -->
            <div style="background:#FFFDF9;border:1px solid var(--line);border-left:4px solid ${res.batTrachResult.color};border-radius:8px;padding:1.25rem;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap;gap:6px;">
                <h4 style="font-family:var(--font-heading);color:var(--seal);font-size:1.1rem;margin:0;">
                  👑 TẦNG 4: CUNG PHI BÁT TRẠCH (Cung ${res.p1.cungPhi.name} ✕ Cung ${res.p2.cungPhi.name} ➔ Cung ${res.batTrachResult.que})
                </h4>
                <span style="background:${res.batTrachResult.color};color:#fff;font-size:0.75rem;font-weight:700;padding:2px 8px;border-radius:4px;">
                  ${res.batTrachResult.badge} (${res.batTrachResult.score}/100)
                </span>
              </div>
              <p style="font-size:0.92rem;line-height:1.65;color:var(--text);margin:0 0 0.5rem 0;">
                Chồng cung <strong>${res.p1.cungPhi.name}</strong> (${res.p1.cungPhi.group}) phối với Vợ cung <strong>${res.p2.cungPhi.name}</strong> (${res.p2.cungPhi.group}) kết hợp thành quẻ <strong>${res.batTrachResult.que}</strong> (sao ${res.batTrachResult.star}). ${res.batTrachResult.desc}
              </p>
              <div style="font-size:0.86rem;color:var(--text-muted);background:rgba(0,0,0,0.03);padding:0.5rem 0.75rem;border-radius:6px;">
                💡 <em>Ý nghĩa phong thủy:</em> Cung phi là yếu tố cốt lõi trong xây nhà, chọn hướng bếp, hướng giường ngủ và sinh con để bảo vệ hạnh phúc gia đình lâu bền.
              </div>
            </div>

            <!-- Tầng 5: Thần Số Pythagoras & Tần Số Linh Hồn -->
            <div style="background:#FFFDF9;border:1px solid var(--line);border-left:4px solid #8C6514;border-radius:8px;padding:1.25rem;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap;gap:6px;">
                <h4 style="font-family:var(--font-heading);color:var(--seal);font-size:1.1rem;margin:0;">
                  👑 TẦNG 5: TẦN SỐ RUNG ĐỘNG PYTHAGORAS (Số ${res.p1.lifePath} ✕ Số ${res.p2.lifePath})
                </h4>
                <span style="background:#8C6514;color:#fff;font-size:0.75rem;font-weight:700;padding:2px 8px;border-radius:4px;">
                  Hòa Hợp Tâm Hồn (${res.numResult.score}/100)
                </span>
              </div>
              <p style="font-size:0.92rem;line-height:1.65;color:var(--text);margin:0;">
                ${res.numResult.desc} ${res.p1.name} (Đường đời số ${res.p1.lifePath}, Khát khao linh hồn số ${res.p1.soulUrge}) khi kết hợp cùng ${res.p2.name} (Đường đời số ${res.p2.lifePath}, Khát khao linh hồn số ${res.p2.soulUrge}) tạo nên bức tranh tâm lý thú vị. Điểm mạnh lớn nhất là khả năng hỗ trợ nhau đạt được mục đích sống nếu biết khích lệ điểm mạnh của đối phương.
              </p>
            </div>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- PHẦN 2: DỰ BÁO VẬN TRÌNH 5 NĂM (2026 - 2030) -->
        <!-- ========================================== -->
        <div class="comp-section-block" style="margin-top:2.5rem;">
          <h3 class="section-title-royal" style="font-size:1.35rem;border-bottom:2px solid var(--brass);padding-bottom:0.5rem;margin-bottom:1.5rem;">
            ✦ PHẦN 2: DỰ BÁO VẬN HẠN HÔN NHÂN &amp; TÀI CHÍNH GIA ĐẠO 5 NĂM (2026 - 2030) ✦
          </h3>
          <p style="font-size:0.92rem;color:var(--text-muted);margin-bottom:1.25rem;">
            Phân tích dựa trên sự dịch chuyển của sao Lưu Niên Thái Tuế và ngũ hành từng năm đối chiếu với lá số của ${res.p1.name} và ${res.p2.name}:
          </p>

          <div style="display:grid;grid-template-columns:1fr;gap:1.25rem;">
            ${res.forecastYears.map(f => `
              <div style="background:#FFFDF9;border:1px solid var(--line);border-radius:10px;padding:1.25rem;box-shadow:0 2px 10px rgba(0,0,0,0.04);">
                <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line);padding-bottom:0.5rem;margin-bottom:0.85rem;flex-wrap:wrap;gap:6px;">
                  <span style="font-family:var(--font-heading);font-size:1.15rem;font-weight:700;color:var(--seal);">
                    ⏳ NĂM ${f.year} - ${f.canChi.toUpperCase()} (${f.napAm})
                  </span>
                  <span style="font-size:0.8rem;background:var(--brass);color:#1A1510;font-weight:700;padding:2px 8px;border-radius:3px;">
                    DỰ BÁO TOÀN DIỆN
                  </span>
                </div>
                <div style="display:grid;grid-template-columns:1fr;gap:0.75rem;font-size:0.9rem;line-height:1.65;">
                  <div>
                    <strong style="color:var(--seal);"><i data-lucide="heart" style="width:14px;height:14px;display:inline;vertical-align:-1px;"></i> Tình cảm &amp; Hôn nhân:</strong>
                    <span> ${f.tinhCam}</span>
                  </div>
                  <div>
                    <strong style="color:#8C6514;"><i data-lucide="coins" style="width:14px;height:14px;display:inline;vertical-align:-1px;"></i> Tài chính &amp; Làm ăn:</strong>
                    <span> ${f.taiChinh}</span>
                  </div>
                  <div style="background:rgba(194,155,56,0.08);padding:0.5rem 0.75rem;border-radius:6px;border-left:3px solid var(--brass);">
                    <strong style="color:var(--text);"><i data-lucide="compass" style="width:14px;height:14px;display:inline;vertical-align:-1px;"></i> Lời khuyên khải vận:</strong>
                    <span style="color:var(--text);"> ${f.loiKhuyen}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- ========================================== -->
        <!-- PHẦN 3: BỘ PHÁP THẾ PHONG THỦY CỔ TRUYỀN HÓA GIẢI -->
        <!-- ========================================== -->
        <div class="comp-section-block" style="margin-top:2.5rem;">
          <h3 class="section-title-royal" style="font-size:1.35rem;border-bottom:2px solid var(--brass);padding-bottom:0.5rem;margin-bottom:1.5rem;">
            ✦ PHẦN 3: BỘ PHÁP THẾ PHONG THỦY CỔ TRUYỀN HÓA GIẢI XUNG KHẮC ✦
          </h3>
          <div style="background:#FFFDF9;border:1.5px solid var(--brass);border-radius:10px;padding:1.5rem;box-shadow:0 4px 16px rgba(0,0,0,0.05);">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:1rem;">
              <span style="font-size:1.4rem;">🏛️</span>
              <h4 style="font-family:var(--font-heading);font-size:1.15rem;color:var(--seal);margin:0;">
                Phương Pháp Hóa Giải Quẻ Bát Trạch &amp; Ngũ Hành Bản Mệnh
              </h4>
            </div>
            <p style="font-size:0.92rem;line-height:1.65;color:var(--text);margin-bottom:1.25rem;">
              Cổ nhân có câu: <em>"Nhất Mệnh, Nhị Vận, Tam Phong Thủy"</em>. Dù tuổi tác có phạm Tuyệt Mệnh, Ngũ Quỷ hay Tương Khắc ngũ hành thì hoàn toàn có thể cải biến bằng 4 pháp thế phong thủy khoa học sau:
            </p>

            <div style="display:grid;grid-template-columns:1fr;gap:1rem;font-size:0.92rem;line-height:1.65;">
              <div style="padding:0.75rem;background:#FAF6EE;border-radius:6px;border-left:3px solid var(--seal);">
                <strong style="color:var(--seal);">1. Pháp thế Sinh Con Cầu Nối:</strong>
                <p style="margin:0.25rem 0 0 0;">${res.fengShui.sinhConHoaGiai}</p>
              </div>
              <div style="padding:0.75rem;background:#FAF6EE;border-radius:6px;border-left:3px solid var(--brass);">
                <strong style="color:#8C6514;">2. Hướng Bếp Chuẩn Bát Trạch (Tọa Hung Hướng Cát):</strong>
                <p style="margin:0.25rem 0 0 0;">${res.fengShui.bepHuong}</p>
              </div>
              <div style="padding:0.75rem;background:#FAF6EE;border-radius:6px;border-left:3px solid #3B82F6;">
                <strong style="color:#2563EB;">3. Phương Vị Giường Ngủ &amp; Phòng Tân Hôn:</strong>
                <p style="margin:0.25rem 0 0 0;">${res.fengShui.giuongHuong}</p>
              </div>
              <div style="padding:0.75rem;background:#FAF6EE;border-radius:6px;border-left:3px solid #10B981;">
                <strong style="color:#059669;">4. Màu Sắc &amp; Vật Phẩm Phong Thủy Trợ Mệnh:</strong>
                <p style="margin:0.25rem 0 0 0;">${res.fengShui.mauSacVatPham}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- PHẦN 4: BẢNG CHẤM ĐIỂM CHỌN NĂM SINH CON (2026 - 2030) -->
        <!-- ========================================== -->
        <div class="comp-section-block" style="margin-top:2.5rem;">
          <h3 class="section-title-royal" style="font-size:1.35rem;border-bottom:2px solid var(--brass);padding-bottom:0.5rem;margin-bottom:1.5rem;">
            ✦ PHẦN 4: BẢNG CHẤM ĐIỂM CHỌN NĂM SINH CON ĐẠI CÁT (2026 - 2030) ✦
          </h3>
          <p style="font-size:0.92rem;color:var(--text-muted);margin-bottom:1.25rem;">
            Đánh giá mức độ hòa hợp giữa tuổi con với Cha (${res.p1.name} - ${res.p1.astro.fullCanChi}) và Mẹ (${res.p2.name} - ${res.p2.astro.fullCanChi}):
          </p>

          <div style="overflow-x:auto;">
            <table style="width:100%;border-collapse:collapse;background:#FFFDF9;border:1px solid var(--line);font-size:0.9rem;border-radius:8px;overflow:hidden;">
              <thead>
                <tr style="background:#241D17;color:#F3ECDD;text-align:left;">
                  <th style="padding:10px 12px;">Năm Dự Sinh</th>
                  <th style="padding:10px 12px;">Can Chi &amp; Nạp Âm</th>
                  <th style="padding:10px 12px;">Đánh Giá &amp; Điểm</th>
                  <th style="padding:10px 12px;">Ý Nghĩa Hợp Mệnh</th>
                </tr>
              </thead>
              <tbody>
                ${res.childYears.map((c, idx) => `
                  <tr style="border-bottom:1px solid var(--line);background:${idx % 2 === 0 ? '#FFFFFF' : '#FAF6EE'}">
                    <td style="padding:10px 12px;font-weight:700;color:var(--seal);">${c.year}</td>
                    <td style="padding:10px 12px;"><strong>${c.canChi}</strong><br><span style="font-size:0.8rem;color:var(--text-muted);">${c.napAm}</span></td>
                    <td style="padding:10px 12px;">
                      <span style="font-weight:700;color:${c.color};">${c.rank} (${c.score}/10)</span><br>
                      <span>${c.stars}</span>
                    </td>
                    <td style="padding:10px 12px;line-height:1.5;">${c.desc}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- PHẦN 5: ĐẠO VỢ CHỒNG & TRIẾT LÝ ĐỨC NĂNG THẮNG SỐ -->
        <!-- ========================================== -->
        <div class="comp-section-block" style="margin-top:2.5rem;">
          <h3 class="section-title-royal" style="font-size:1.35rem;border-bottom:2px solid var(--brass);padding-bottom:0.5rem;margin-bottom:1.5rem;">
            ✦ PHẦN 5: ĐẠO VỢ CHỒNG &amp; TRIẾT LÝ "ĐỨC NĂNG THẮNG SỐ" ✦
          </h3>
          <div style="background:#FFFDF9;border:1px solid var(--line);border-radius:10px;padding:1.5rem;box-shadow:0 2px 10px rgba(0,0,0,0.04);position:relative;">
            <p style="font-size:0.95rem;line-height:1.75;color:var(--text);margin-bottom:1rem;font-style:italic;">
              "Thuận vợ thuận chồng tát biển Đông cũng cạn.<br>
              Tử vi huyền học chỉ ra những góc khuất năng lượng để ta thấu hiểu và sẻ chia, chứ không định đoạt số phận của hai trái tim cùng chung nhịp đập."
            </p>
            <h4 style="font-family:var(--font-heading);color:var(--seal);font-size:1.05rem;margin:1.25rem 0 0.5rem 0;">
              💡 4 Nguyên Tắc Vàng Giữ Gìn Hạnh Phúc Trọn Đời Cho ${res.p1.name} &amp; ${res.p2.name}:
            </h4>
            <ul style="padding-left:1.25rem;line-height:1.7;font-size:0.92rem;color:var(--text);margin-bottom:1.5rem;">
              <li><strong>Tương kính như tân:</strong> Coi người bạn đời như người khách quý, giữ gìn sự lịch thiệp, tôn trọng và không buông lời xúc phạm lúc tức giận.</li>
              <li><strong>Không tranh thắng thua:</strong> Trong hôn nhân, người thắng cuộc tranh luận chính là người làm rạn nứt tình cảm. Nhường nhịn nhau một bước, biển rộng trời cao.</li>
              <li><strong>Minh bạch tài chính &amp; tình cảm:</strong> Mọi kế hoạch chi tiêu lớn hoặc định hướng sự nghiệp cần được bàn bạc thấu đáo, cùng nhau đồng thuận trước khi quyết định.</li>
              <li><strong>Tu dưỡng tâm tính:</strong> <em>"Đức năng thắng số"</em> — Khởi tâm thiện lành, hiếu kính cha mẹ hai bên và tích phúc cho gia đình là pháp bảo phong thủy tối thượng bảo vệ mái ấm bền lâu.</li>
            </ul>

            <!-- Mộc Triện Hoàng Gia Xác Thực -->
            <div style="border-top:1px dashed var(--line);padding-top:1.25rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
              <div>
                <div style="font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;color:var(--brass);font-weight:700;">CHỨNG THỰC HỌC THUẬT</div>
                <div style="font-family:var(--font-heading);font-size:1.05rem;color:var(--seal);font-weight:700;">HỘI ĐỒNG KHOA HỌC XEM TỬ VI HUYỀN HỌC</div>
                <div style="font-size:0.85rem;color:var(--text-muted);">Viện Nghiên Cứu &amp; Bảo Tồn Di Sản Cổ Học Tinh Hoa Việt Nam</div>
              </div>
              <div style="text-align:center;">
                <div style="display:inline-block;border:2px solid #A3281F;color:#A3281F;font-weight:800;font-size:0.82rem;padding:6px 14px;border-radius:4px;letter-spacing:1.5px;text-transform:uppercase;background:rgba(163,40,31,0.04);">
                  ✦ ĐÃ DUYỆT BẢN SONG BẢN VIP ✦
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- VIP Action Bar (Thay thế Paywall khi đã là VIP) -->
        <div style="background:linear-gradient(135deg, #241D17 0%, #15110D 100%);border:2px solid var(--gold);border-radius:10px;padding:1.5rem;text-align:center;color:#F3ECDD;margin-top:2.5rem;">
          <h3 style="font-family:var(--font-heading);color:#FFE6A3;font-size:1.25rem;margin-bottom:0.5rem;">
            ✦ HOÀN TẤT TRA CỨU BÁO CÁO HỢP TUỔI BÁT TỰ VIP ✦
          </h3>
          <p style="font-size:0.9rem;color:#D9CEB8;margin-bottom:1rem;">
            Bạn có thể tải về máy hoặc in ra giấy A4 để lưu giữ cẩm nang vận mệnh gia đạo trọn đời.
          </p>
          <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
            <button onclick="window.print();" class="btn-royal-action" style="background:linear-gradient(135deg, #C29B38 0%, #E5BA5C 100%);color:#1A1510;font-weight:800;padding:0.75rem 1.6rem;border-radius:6px;border:none;cursor:pointer;">
              🖨️ In Báo Cáo / Xuất File PDF A4
            </button>
            <a href="/?name=${encodeURIComponent(res.p1.name)}&dob=${res.p1.birthDate}#lap-la-so" class="btn-secondary-action" style="padding:0.75rem 1.4rem;">
              🧭 Soi Thêm Cung Phu Thê Trên Lá Số Tử Vi
            </a>
          </div>
        </div>
      `;
    } else {
      // NẾU CHƯA VIP -> HIỂN THỊ HỘP PAYWALL KÍCH HOẠT 49K
      html += `
        <!-- Traditional Remedies & Advice Preview -->
        <div class="comp-section-block">
          <h3 class="section-title-royal">✦ LỜI BÌNH &amp; PHƯƠNG PHÁP HÓA GIẢI CƠ BẢN ✦</h3>
          <div class="remedies-card">
            <h4>💡 Lời Khuyên Cho Mối Quan Hệ:</h4>
            <ul>
              ${res.remedies.map(r => `<li>${r}</li>`).join('')}
              <li>Gốc rễ của mọi sự tương hợp nằm ở lòng bao dung và sự chân thành. Dù bản mệnh có hòa hợp đến đâu cũng cần không ngừng vun đắp mỗi ngày.</li>
            </ul>
          </div>
        </div>

        <!-- PREMIUM VIP COMPATIBILITY REPORT (VIETQR SEPAY 49K) -->
        <div class="num-vip-paywall-box">
          <div class="vip-badge-ribbon">👑 ĐẶC QUYỀN HỘI VIÊN CAO CẤP</div>
          <h2 class="vip-paywall-title">BÁO CÁO HỢP TUỔI &amp; HÔN PHỐI BÁT TỰ ĐẠI CÁT</h2>
          <p class="vip-paywall-desc">
            Bản luận giải thấu đáo 5 tầng tương hợp Bát Tự chuyên sâu, dự báo vận trình gia đạo 5 năm tới và cẩm nang phong thủy hóa giải xung khắc dành riêng cho <strong>${res.p1.name}</strong> và <strong>${res.p2.name}</strong>.
          </p>
          <div class="vip-price-wrap">
            <span class="vip-old-price">149.000 đ</span>
            <span class="vip-current-price">49.000 đ</span>
          </div>
          <div class="vip-features-checklist">
            <div class="vip-feature-item"><span class="chk">✓</span> Luận giải 5 tầng Bát Tự chi tiết: Can, Chi, Nạp Âm, Cung Phi, Thập Thần</div>
            <div class="vip-feature-item"><span class="chk">✓</span> Dự báo vận hạn hôn nhân &amp; tài chính gia đạo 5 năm liên tiếp (2026 - 2030)</div>
            <div class="vip-feature-item"><span class="chk">✓</span> Bộ pháp thế hóa giải cung Tuyệt Mệnh, Họa Hại, Ngũ Quỷ chuẩn phong thủy</div>
            <div class="vip-feature-item"><span class="chk">✓</span> Định hướng năm sinh con hợp tuổi mang lại bình an, hưng vượng</div>
            <div class="vip-feature-item"><span class="chk">✓</span> Xuất file Báo Cáo A4 song bản trang trọng lưu giữ trọn đời</div>
          </div>
          <button type="button" class="btn-paywall-vietqr" onclick="if(window.TuViMonetize){ TuViMonetize.openVipModal('Gói Hợp Tuổi Bát Tự VIP (49k)', 49000); } else { window.location.href='/#bang-gia-dich-vu'; }">
            ⚡ MỞ KHÓA BÁO CÁO HỢP TUỔI VIP (49.000đ) ➔
          </button>
          <p class="vip-guarantee-note">Quét mã VietQR tự động qua SePay · Kích hoạt tức thì sau 3 giây · Bảo mật thông tin tuyệt đối</p>
        </div>
      `;
    }

    html += `
        <!-- Cross Links -->
        <div class="cross-link-card">
          <div class="cross-link-content">
            <div class="cross-icon">📜</div>
            <div>
              <h3>LẬP LÁ SỐ TỬ VI ĐỔI VẬN</h3>
              <p>Khám phá chi tiết Cung Phu Thê và Cung Nô Bộc trong Bàn Lá Số Tử Vi 12 Cung để nhìn thấu tiền duyên và vận hạn tương lai!</p>
            </div>
          </div>
          <div class="cross-link-buttons">
            <a href="/?name=${encodeURIComponent(res.p1.name)}&dob=${res.p1.birthDate}#lap-la-so" class="btn-royal-action">
              ✦ Lập Lá Số Tử Vi Cho ${res.p1.name} ➔
            </a>
            <a href="/?name=${encodeURIComponent(res.p2.name)}&dob=${res.p2.birthDate}#lap-la-so" class="btn-secondary-action">
              ✦ Lập Lá Số Tử Vi Cho ${res.p2.name} ➔
            </a>
            <a href="/than-so-hoc?name=${encodeURIComponent(res.p1.name)}&dob=${res.p1.birthDate}" class="btn-secondary-action">
              🔮 Xem Thần Số Học Chi Tiết
            </a>
            <button onclick="window.print()" class="btn-secondary-action">
              🖨️ In Báo Cáo
            </button>
          </div>
        </div>

        <!-- BẢN IN: CHÂN TRANG BÁO CÁO HỢP TUỔI VIP (CHỈ HIỂN THỊ KHI IN / XUẤT FILE PDF) -->
        <div class="print-report-footer">
          <p class="print-footer-brand">✦ HỘI ĐỒNG KHOA HỌC XEM TỬ VI HUYỀN HỌC (www.xemtuvihuyenhoc.com) ✦</p>
          <p class="print-footer-copy">Bản Báo Cáo Hợp Tuổi Bát Tự &amp; Thần Số Học Song Bản lưu giữ trọn đời · Bản quyền thuộc tác giả Trần Công Luyện.</p>
        </div>
      </div>
    `;

    container.innerHTML = html;
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons(); } catch (e) {}
    }

    const yOffset = -85;
    const y = container.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }

  window.TuViCompatibility = {
    Engine: CompatibilityEngine,
    init: initCompatibilityApp,
    renderResult: renderCompatibilityResult,
    _lastParams: null
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCompatibilityApp);
  } else {
    initCompatibilityApp();
  }
})(typeof window !== 'undefined' ? window : this);
