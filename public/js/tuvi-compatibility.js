/**
 * TỬ VI HUYỀN HỌC - BỘ TÍNH TOÁN TƯƠNG HỢP & BÓI HỢP TUỔI TOÀN DIỆN
 * Tích hợp Con Giáp (12 Chi) + Ngũ Hành Nạp Âm + Thần Số Học Pythagoras
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

  // 60 Hoa Giáp & Ngũ Hành Nạp Âm
  const NAP_AM_TABLE = {
    0: { name: 'Hải Trung Kim', element: 'Kim' },    // Giáp Tý
    1: { name: 'Hải Trung Kim', element: 'Kim' },    // Ất Sửu
    2: { name: 'Lư Trung Hỏa', element: 'Hỏa' },     // Bính Dần
    3: { name: 'Lư Trung Hỏa', element: 'Hỏa' },     // Đinh Mão
    4: { name: 'Đại Lâm Mộc', element: 'Mộc' },      // Mậu Thìn
    5: { name: 'Đại Lâm Mộc', element: 'Mộc' },      // Kỷ Tỵ
    6: { name: 'Lộ Bàng Thổ', element: 'Thổ' },      // Canh Ngọ
    7: { name: 'Lộ Bàng Thổ', element: 'Thổ' },      // Tân Mùi
    8: { name: 'Kiếm Phong Kim', element: 'Kim' },   // Nhâm Thân
    9: { name: 'Kiếm Phong Kim', element: 'Kim' },   // Quý Dậu
    10: { name: 'Sơn Đầu Hỏa', element: 'Hỏa' },     // Giáp Tuất
    11: { name: 'Sơn Đầu Hỏa', element: 'Hỏa' },     // Ất Hợi
    12: { name: 'Giản Hạ Thủy', element: 'Thủy' },   // Bính Tý
    13: { name: 'Giản Hạ Thủy', element: 'Thủy' },   // Đinh Sửu
    14: { name: 'Thành Đầu Thổ', element: 'Thổ' },   // Mậu Dần
    15: { name: 'Thành Đầu Thổ', element: 'Thổ' },   // Kỷ Mão
    16: { name: 'Bạch Lạp Kim', element: 'Kim' },    // Canh Thìn
    17: { name: 'Bạch Lạp Kim', element: 'Kim' },    // Tân Tỵ
    18: { name: 'Dương Liễu Mộc', element: 'Mộc' },  // Nhâm Ngọ
    19: { name: 'Dương Liễu Mộc', element: 'Mộc' },  // Quý Mùi
    20: { name: 'Tuyền Trung Thủy', element: 'Thủy' },// Giáp Thân
    21: { name: 'Tuyền Trung Thủy', element: 'Thủy' },// Ất Dậu
    22: { name: 'Ốc Thượng Thổ', element: 'Thổ' },   // Bính Tuất
    23: { name: 'Ốc Thượng Thổ', element: 'Thổ' },   // Đinh Hợi
    24: { name: 'Tích Lịch Hỏa', element: 'Hỏa' },   // Mậu Tý
    25: { name: 'Tích Lịch Hỏa', element: 'Hỏa' },   // Kỷ Sửu
    26: { name: 'Tùng Bách Mộc', element: 'Mộc' },   // Canh Dần
    27: { name: 'Tùng Bách Mộc', element: 'Mộc' },   // Tân Mão
    28: { name: 'Trường Lưu Thủy', element: 'Thủy' },// Nhâm Thìn
    29: { name: 'Trường Lưu Thủy', element: 'Thủy' },// Quý Tỵ
    30: { name: 'Sa Trung Kim', element: 'Kim' },    // Giáp Ngọ
    31: { name: 'Sa Trung Kim', element: 'Kim' },    // Ất Mùi
    32: { name: 'Sơn Hạ Hỏa', element: 'Hỏa' },      // Bính Thân
    33: { name: 'Sơn Hạ Hỏa', element: 'Hỏa' },      // Đinh Dậu
    34: { name: 'Bình Địa Mộc', element: 'Mộc' },    // Mậu Tuất
    35: { name: 'Bình Địa Mộc', element: 'Mộc' },    // Kỷ Hợi
    36: { name: 'Bích Thượng Thổ', element: 'Thổ' }, // Canh Tý
    37: { name: 'Bích Thượng Thổ', element: 'Thổ' }, // Tân Sửu
    38: { name: 'Kim Bạch Kim', element: 'Kim' },    // Nhâm Dần
    39: { name: 'Kim Bạch Kim', element: 'Kim' },    // Quý Mão
    40: { name: 'Phúc Đăng Hỏa', element: 'Hỏa' },   // Giáp Thìn
    41: { name: 'Phúc Đăng Hỏa', element: 'Hỏa' },   // Ất Tỵ
    42: { name: 'Thiên Hà Thủy', element: 'Thủy' },  // Bính Ngọ
    43: { name: 'Thiên Hà Thủy', element: 'Thủy' },  // Đinh Mùi
    44: { name: 'Đại Trạch Thổ', element: 'Thổ' },   // Mậu Thân
    45: { name: 'Đại Trạch Thổ', element: 'Thổ' },   // Kỷ Dậu
    46: { name: 'Thoa Xuyến Kim', element: 'Kim' },  // Canh Tuất
    47: { name: 'Thoa Xuyến Kim', element: 'Kim' },  // Tân Hợi
    48: { name: 'Tang Đố Mộc', element: 'Mộc' },     // Nhâm Tý
    49: { name: 'Tang Đố Mộc', element: 'Mộc' },     // Quý Sửu
    50: { name: 'Đại Khê Thủy', element: 'Thủy' },   // Giáp Dần
    51: { name: 'Đại Khê Thủy', element: 'Thủy' },   // Ất Mão
    52: { name: 'Sa Trung Thổ', element: 'Thổ' },    // Bính Thìn
    53: { name: 'Sa Trung Thổ', element: 'Thổ' },    // Đinh Tỵ
    54: { name: 'Thiên Thượng Hỏa', element: 'Hỏa' },// Mậu Ngọ
    55: { name: 'Thiên Thượng Hỏa', element: 'Hỏa' },// Kỷ Mùi
    56: { name: 'Thạch Lựu Mộc', element: 'Mộc' },   // Canh Thân
    57: { name: 'Thạch Lựu Mộc', element: 'Mộc' },   // Tân Dậu
    58: { name: 'Đại Hải Thủy', element: 'Thủy' },   // Nhâm Tuất
    59: { name: 'Đại Hải Thủy', element: 'Thủy' }    // Quý Hợi
  };

  // Tam Hợp & Lục Hợp
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

  // Helper function to extract Year info
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
      fullCanChi: `${can} ${chi}`,
      animal: CHI_INFO[chi]?.animal || '',
      emoji: CHI_INFO[chi]?.emoji || '',
      napAm: napAm.name,
      element: napAm.element
    };
  }

  // Calculate Element compatibility
  function evaluateElements(elem1, elem2) {
    if (elem1 === elem2) {
      return {
        score: 75,
        type: 'Bình Hòa (Đồng Hành)',
        desc: `Cả hai đều thuộc hành ${elem1}, cùng khí chất, dễ đồng cảm nhưng cũng dễ bướng bỉnh ngang nhau.`
      };
    }

    const sinhMap = {
      'Kim': 'Thủy',
      'Thủy': 'Mộc',
      'Mộc': 'Hỏa',
      'Hỏa': 'Thổ',
      'Thổ': 'Kim'
    };

    if (sinhMap[elem1] === elem2) {
      return {
        score: 95,
        type: 'Tương Sinh (Cực Tốt)',
        desc: `${elem1} sinh ${elem2}: Bản mệnh tương sinh, một bên nuôi dưỡng, nâng đỡ và mang lại may mắn, tài lộc cho bên kia.`
      };
    }

    if (sinhMap[elem2] === elem1) {
      return {
        score: 95,
        type: 'Tương Sinh (Cực Tốt)',
        desc: `${elem2} sinh ${elem1}: Bản mệnh tương sinh, hỗ trợ đắc lực và bồi đắp sinh khí thịnh vượng.`
      };
    }

    const khacMap = {
      'Kim': 'Mộc',
      'Mộc': 'Thổ',
      'Thổ': 'Thủy',
      'Thủy': 'Hỏa',
      'Hỏa': 'Kim'
    };

    if (khacMap[elem1] === elem2 || khacMap[elem2] === elem1) {
      return {
        score: 40,
        type: 'Tương Khắc (Cần Hóa Giải)',
        desc: `Ngũ hành xung khắc (${elem1} khắc ${elem2}). Dễ xảy ra bất đồng quan điểm hoặc cản trở năng lượng, cần dùng ngũ hành trung gian để hóa giải.`
      };
    }

    return {
      score: 60,
      type: 'Bình Hòa',
      desc: 'Không xung không khắc, giữ hòa khí thì mọi việc hanh thông.'
    };
  }

  // Calculate Chi compatibility
  function evaluateChi(chi1, chi2) {
    if (chi1 === chi2) {
      return { score: 70, type: 'Cùng Con Giáp', desc: `Đồng chi ${chi1}, tâm tính tương đồng, hiểu rõ tính cách của nhau.` };
    }

    // Tam hợp
    for (const group of TAM_HOP_GROUPS) {
      if (group.includes(chi1) && group.includes(chi2)) {
        return {
          score: 100,
          type: 'Tam Hợp (Đại Cát)',
          desc: `${chi1} và ${chi2} nằm trong bộ Tam Hợp (${group.join(' - ')}), âm dương tương trợ, đại cát đại lợi, gia đạo hòa hợp, sự nghiệp thăng hoa!`
        };
      }
    }

    // Lục hợp
    for (const pair of LUC_HOP_PAIRS) {
      if ((pair[0] === chi1 && pair[1] === chi2) || (pair[0] === chi2 && pair[1] === chi1)) {
        return {
          score: 95,
          type: 'Lục Hợp (Quý Nhân)',
          desc: `${chi1} và ${chi2} là cặp Lục Hợp trời sinh, tâm đầu ý hợp, gắn bó keo sơn, luôn nâng đỡ nhau vượt qua sóng gió.`
        };
      }
    }

    // Lục xung
    for (const pair of LUC_XUNG_PAIRS) {
      if ((pair[0] === chi1 && pair[1] === chi2) || (pair[0] === chi2 && pair[1] === chi1)) {
        return {
          score: 35,
          type: 'Lục Xung (Đại Kỵ)',
          desc: `${chi1} và ${chi2} là cặp Lục Xung đối đỉnh, dễ khắc khẩu, va chạm cá tính và mâu thuẫn về lối sống.`
        };
      }
    }

    // Lục hại
    for (const pair of LUC_HAI_PAIRS) {
      if ((pair[0] === chi1 && pair[1] === chi2) || (pair[0] === chi2 && pair[1] === chi1)) {
        return {
          score: 45,
          type: 'Lục Hại (Bất Lợi)',
          desc: `${chi1} và ${chi2} tương hại, dễ sinh nghi kỵ, hiểu lầm hoặc cản trở vận may của nhau.`
        };
      }
    }

    return {
      score: 65,
      type: 'Bình Thường',
      desc: 'Địa chi không xung không khắc, có thể cùng nhau xây dựng mối quan hệ tốt đẹp dựa trên sự thấu hiểu.'
    };
  }

  // Numerology Life Path compatibility
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
      22: [4, 8, 11, 22],
      33: [6, 9, 33]
    };

    if (lp1 === lp2) {
      return {
        score: 80,
        type: 'Đồng Điệu Tần Số',
        desc: `Cả hai đều mang Số Chủ Đạo ${lp1}, thấu hiểu sâu sắc động lực và lý tưởng sống của nhau.`
      };
    }

    const matches = naturalHarmony[lp1] || [];
    if (matches.includes(lp2)) {
      return {
        score: 90,
        type: 'Hòa Hợp Tần Số Sóng',
        desc: `Số Chủ Đạo ${lp1} và ${lp2} có độ tương thích cao trong hệ thống Pythagoras, tương trợ lẫn nhau về tư duy và năng lượng sáng tạo.`
      };
    }

    return {
      score: 65,
      type: 'Tương Tác Bổ Sung',
      desc: `Số ${lp1} và ${lp2} có góc nhìn khác biệt, cần học cách lắng nghe để bổ sung điểm khuyết cho nhau.`
    };
  }

  class CompatibilityEngine {
    constructor(p1, p2, type = 'love') {
      this.p1 = p1; // { name, birthDate: 'YYYY-MM-DD', gender }
      this.p2 = p2;
      this.type = type; // 'love', 'business', 'friendship', 'family'
    }

    calculate() {
      const year1 = parseInt(this.p1.birthDate.split('-')[0], 10);
      const year2 = parseInt(this.p2.birthDate.split('-')[0], 10);

      const astro1 = getYearAstrology(year1);
      const astro2 = getYearAstrology(year2);

      // Numerology
      const numEngine1 = new window.TuViNumerology.Engine(this.p1.name, this.p1.birthDate);
      const numEngine2 = new window.TuViNumerology.Engine(this.p2.name, this.p2.birthDate);

      const lp1 = numEngine1.getLifePath().value;
      const lp2 = numEngine2.getLifePath().value;
      const soul1 = numEngine1.getSoulUrge().value;
      const soul2 = numEngine2.getSoulUrge().value;

      // Evals
      const chiResult = evaluateChi(astro1.chi, astro2.chi);
      const elemResult = evaluateElements(astro1.element, astro2.element);
      const numResult = evaluateLifePath(lp1, lp2);

      // Weights based on relationship type
      let wChi = 0.35, wElem = 0.35, wNum = 0.30;
      if (this.type === 'business') {
        wChi = 0.25; wElem = 0.35; wNum = 0.40;
      } else if (this.type === 'love') {
        wChi = 0.35; wElem = 0.35; wNum = 0.30;
      }

      const totalScore = Math.round(chiResult.score * wChi + elemResult.score * wElem + numResult.score * wNum);

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

      // Advice remedies
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
        p1: { ...this.p1, astro: astro1, lifePath: lp1, soulUrge: soul1 },
        p2: { ...this.p2, astro: astro2, lifePath: lp2, soulUrge: soul2 },
        totalScore,
        rank,
        rankColor,
        rankBadge,
        chiResult,
        elemResult,
        numResult,
        remedies
      };
    }
  }

  // DOM Controller for hop-tuoi.html
  function initCompatibilityApp() {
    const form = document.getElementById('compatibilityForm');
    if (!form) return;

    const inputName1 = document.getElementById('p1Name');
    const inputDate1 = document.getElementById('p1Dob');
    const inputName2 = document.getElementById('p2Name');
    const inputDate2 = document.getElementById('p2Dob');
    const selectType = document.getElementById('relType');
    const container = document.getElementById('compatibilityResultContainer');

    // Auto-fill from URL params
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

      // Update URL
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
        window.TuViTracker.track('hop_tuoi_tra_cuu', {
          person1: n1,
          person2: n2,
          type: relType
        });
      }
    });
  }

  function renderCompatibilityResult(person1, person2, relType) {
    const container = document.getElementById('compatibilityResultContainer');
    if (!container) return;

    const engine = new CompatibilityEngine(person1, person2, relType);
    const res = engine.calculate();

    const typeLabels = {
      love: 'Tình Duyên & Hôn Nhân',
      business: 'Làm Ăn & Hợp Tác Kinh Doanh',
      friendship: 'Bạn Bè & Tri Kỷ',
      family: 'Gia Đình & Thân Tộc'
    };

    const html = `
      <div class="comp-report-wrapper">
        <!-- Hero Header -->
        <div class="comp-hero-card">
          <div class="comp-seal-tag">✦ BẢN ĐỒ TƯƠNG HỢP BÁT TỰ & THẦN SỐ HỌC ✦</div>
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
              <div class="p-detail">Số Chủ Đạo: <strong>Số ${res.p2.lifePath}</strong></div>
            </div>
          </div>
        </div>

        <!-- 3 Layers Analysis -->
        <div class="comp-section-block">
          <h3 class="section-title-royal">✦ PHÂN TÍCH TƯƠNG HỢP ĐA TẦNG ✦</h3>
          <div class="layers-grid">
            <!-- Layer 1: Con Giáp -->
            <div class="layer-card">
              <div class="layer-header">
                <span class="layer-icon">🐉</span>
                <div>
                  <h4>TẦNG 1: ĐỊA CHI (CON GIÁP)</h4>
                  <div class="layer-status">${res.chiResult.type} (${res.chiResult.score}/100)</div>
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
                  <div class="layer-status">${res.elemResult.type} (${res.elemResult.score}/100)</div>
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

        <!-- Traditional Remedies & Advice -->
        <div class="comp-section-block">
          <h3 class="section-title-royal">✦ LỜI BÌNH & PHƯƠNG PHÁP HÓA GIẢI CỔ TRUYỀN ✦</h3>
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
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    const yOffset = -85;
    const y = container.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }

  window.TuViCompatibility = {
    Engine: CompatibilityEngine,
    init: initCompatibilityApp,
    renderResult: renderCompatibilityResult
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCompatibilityApp);
  } else {
    initCompatibilityApp();
  }
})(typeof window !== 'undefined' ? window : this);
