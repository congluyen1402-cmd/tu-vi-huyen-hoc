/**
 * ============================================================================
 * XEM TỬ VI HUYỀN HỌC - TỬ VI CALCULATION ENGINE
 * Thuật toán An Sao Tử Vi Đẩu Số Chính Tông & Lịch Âm Dương Hồ Ngọc Đức
 * Chuẩn xác 100% theo dữ liệu Tra Cứu Tử Vi
 * ============================================================================
 */

(function (global) {
  'use strict';

  // ==========================================================================
  // 1. CONSTANTS & MAPPINGS
  // ==========================================================================

  const THIEN_CAN = [
    'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'
  ];

  const THIEN_CAN_SHORT = [
    'G', 'Ấ', 'B', 'Đ', 'M', 'K', 'C', 'T', 'N', 'Q'
  ];

  const DIA_CHI = [
    'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'
  ];

  const CUC_NAMES = {
    2: { name: 'Thủy nhị cục', element: 'Thủy', value: 2 },
    3: { name: 'Mộc tam cục', element: 'Mộc', value: 3 },
    4: { name: 'Kim tứ cục', element: 'Kim', value: 4 },
    5: { name: 'Thổ ngũ cục', element: 'Thổ', value: 5 },
    6: { name: 'Hỏa lục cục', element: 'Hỏa', value: 6 }
  };

  const CUNG_NAMES_ORDER = [
    'MỆNH', 'HUYNH ĐỆ', 'PHU THÊ', 'TỬ TỨC', 'TÀI BẠCH', 'TẬT ÁCH',
    'THIÊN DI', 'NÔ BỘC', 'QUAN LỘC', 'ĐIỀN TRẠCH', 'PHÚC ĐỨC', 'PHỤ MẪU'
  ];

  // 60 Lục Thập Hoa Giáp Nạp Âm
  const LUC_THAP_HOA_GIAP = [
    { canChi: 'Giáp Tý', napAm: 'Hải Trung Kim', menh: 'Kim', detail: 'Vàng dưới biển' },
    { canChi: 'Ất Sửu', napAm: 'Hải Trung Kim', menh: 'Kim', detail: 'Vàng dưới biển' },
    { canChi: 'Bính Dần', napAm: 'Lô Trung Hỏa', menh: 'Hỏa', detail: 'Lửa trong lò' },
    { canChi: 'Đinh Mão', napAm: 'Lô Trung Hỏa', menh: 'Hỏa', detail: 'Lửa trong lò' },
    { canChi: 'Mậu Thìn', napAm: 'Đại Lâm Mộc', menh: 'Mộc', detail: 'Gỗ rừng già' },
    { canChi: 'Kỷ Tỵ', napAm: 'Đại Lâm Mộc', menh: 'Mộc', detail: 'Gỗ rừng già' },
    { canChi: 'Canh Ngọ', napAm: 'Lộ Bàng Thổ', menh: 'Thổ', detail: 'Đất ven đường' },
    { canChi: 'Tân Mùi', napAm: 'Lộ Bàng Thổ', menh: 'Thổ', detail: 'Đất ven đường' },
    { canChi: 'Nhâm Thân', napAm: 'Kiếm Phong Kim', menh: 'Kim', detail: 'Vàng mũi kiếm' },
    { canChi: 'Quý Dậu', napAm: 'Kiếm Phong Kim', menh: 'Kim', detail: 'Vàng mũi kiếm' },
    { canChi: 'Giáp Tuất', napAm: 'Sơn Đầu Hỏa', menh: 'Hỏa', detail: 'Lửa trên núi' },
    { canChi: 'Ất Hợi', napAm: 'Sơn Đầu Hỏa', menh: 'Hỏa', detail: 'Lửa trên núi' },
    { canChi: 'Bính Tý', napAm: 'Giản Hạ Thủy', menh: 'Thủy', detail: 'Nước dưới khe' },
    { canChi: 'Đinh Sửu', napAm: 'Giản Hạ Thủy', menh: 'Thủy', detail: 'Nước dưới khe' },
    { canChi: 'Mậu Dần', napAm: 'Thành Đầu Thổ', menh: 'Thổ', detail: 'Đất đầu thành' },
    { canChi: 'Kỷ Mão', napAm: 'Thành Đầu Thổ', menh: 'Thổ', detail: 'Đất đầu thành' },
    { canChi: 'Canh Thìn', napAm: 'Bạch Lạp Kim', menh: 'Kim', detail: 'Vàng trong nến' },
    { canChi: 'Tân Tỵ', napAm: 'Bạch Lạp Kim', menh: 'Kim', detail: 'Vàng trong nến' },
    { canChi: 'Nhâm Ngọ', napAm: 'Dương Liễu Mộc', menh: 'Mộc', detail: 'Gỗ cây liễu' },
    { canChi: 'Quý Mùi', napAm: 'Dương Liễu Mộc', menh: 'Mộc', detail: 'Gỗ cây liễu' },
    { canChi: 'Giáp Thân', napAm: 'Tuyền Trung Thủy', menh: 'Thủy', detail: 'Nước trong suối' },
    { canChi: 'Ất Dậu', napAm: 'Tuyền Trung Thủy', menh: 'Thủy', detail: 'Nước trong suối' },
    { canChi: 'Bính Tuất', napAm: 'Ốc Thượng Thổ', menh: 'Thổ', detail: 'Đất trên nóc nhà' },
    { canChi: 'Đinh Hợi', napAm: 'Ốc Thượng Thổ', menh: 'Thổ', detail: 'Đất trên nóc nhà' },
    { canChi: 'Mậu Tý', napAm: 'Tích Lịch Hỏa', menh: 'Hỏa', detail: 'Lửa sấm sét' },
    { canChi: 'Kỷ Sửu', napAm: 'Tích Lịch Hỏa', menh: 'Hỏa', detail: 'Lửa sấm sét' },
    { canChi: 'Canh Dần', napAm: 'Tùng Bách Mộc', menh: 'Mộc', detail: 'Gỗ tùng bách' },
    { canChi: 'Tân Mão', napAm: 'Tùng Bách Mộc', menh: 'Mộc', detail: 'Gỗ tùng bách' },
    { canChi: 'Nhâm Thìn', napAm: 'Trường Lưu Thủy', menh: 'Thủy', detail: 'Nước sông dài' },
    { canChi: 'Quý Tỵ', napAm: 'Trường Lưu Thủy', menh: 'Thủy', detail: 'Nước sông dài' },
    { canChi: 'Giáp Ngọ', napAm: 'Sa Trung Kim', menh: 'Kim', detail: 'Vàng trong cát' },
    { canChi: 'Ất Mùi', napAm: 'Sa Trung Kim', menh: 'Kim', detail: 'Vàng trong cát' },
    { canChi: 'Bính Thân', napAm: 'Sơn Hạ Hỏa', menh: 'Hỏa', detail: 'Lửa dưới chân núi' },
    { canChi: 'Đinh Dậu', napAm: 'Sơn Hạ Hỏa', menh: 'Hỏa', detail: 'Lửa dưới chân núi' },
    { canChi: 'Mậu Tuất', napAm: 'Bình Địa Mộc', menh: 'Mộc', detail: 'Gỗ đồng bằng' },
    { canChi: 'Kỷ Hợi', napAm: 'Bình Địa Mộc', menh: 'Mộc', detail: 'Gỗ đồng bằng' },
    { canChi: 'Canh Tý', napAm: 'Bích Thượng Thổ', menh: 'Thổ', detail: 'Đất trên vách' },
    { canChi: 'Tân Sửu', napAm: 'Bích Thượng Thổ', menh: 'Thổ', detail: 'Đất trên vách' },
    { canChi: 'Nhâm Dần', napAm: 'Kim Bạch Kim', menh: 'Kim', detail: 'Vàng trắng' },
    { canChi: 'Quý Mão', napAm: 'Kim Bạch Kim', menh: 'Kim', detail: 'Vàng trắng' },
    { canChi: 'Giáp Thìn', napAm: 'Phú Đăng Hỏa', menh: 'Hỏa', detail: 'Lửa đèn dầu' },
    { canChi: 'Ất Tỵ', napAm: 'Phú Đăng Hỏa', menh: 'Hỏa', detail: 'Lửa đèn dầu' },
    { canChi: 'Bính Ngọ', napAm: 'Thiên Hà Thủy', menh: 'Thủy', detail: 'Nước trên trời' },
    { canChi: 'Đinh Mùi', napAm: 'Thiên Hà Thủy', menh: 'Thủy', detail: 'Nước trên trời' },
    { canChi: 'Mậu Thân', napAm: 'Đại Trạch Thổ', menh: 'Thổ', detail: 'Đất quán lớn' },
    { canChi: 'Kỷ Dậu', napAm: 'Đại Trạch Thổ', menh: 'Thổ', detail: 'Đất quán lớn' },
    { canChi: 'Canh Tuất', napAm: 'Thoa Xuyến Kim', menh: 'Kim', detail: 'Vàng trang sức' },
    { canChi: 'Tân Hợi', napAm: 'Thoa Xuyến Kim', menh: 'Kim', detail: 'Vàng trang sức' },
    { canChi: 'Nhâm Tý', napAm: 'Tang Đố Mộc', menh: 'Mộc', detail: 'Gỗ cây dâu' },
    { canChi: 'Quý Sửu', napAm: 'Tang Đố Mộc', menh: 'Mộc', detail: 'Gỗ cây dâu' },
    { canChi: 'Giáp Dần', napAm: 'Đại Khê Thủy', menh: 'Thủy', detail: 'Nước khe lớn' },
    { canChi: 'Ất Mão', napAm: 'Đại Khê Thủy', menh: 'Thủy', detail: 'Nước khe lớn' },
    { canChi: 'Bính Thìn', napAm: 'Sa Trung Thổ', menh: 'Thổ', detail: 'Đất trong cát' },
    { canChi: 'Đinh Tỵ', napAm: 'Sa Trung Thổ', menh: 'Thổ', detail: 'Đất trong cát' },
    { canChi: 'Mậu Ngọ', napAm: 'Thiên Thượng Hỏa', menh: 'Hỏa', detail: 'Lửa trên trời' },
    { canChi: 'Kỷ Mùi', napAm: 'Thiên Thượng Hỏa', menh: 'Hỏa', detail: 'Lửa trên trời' },
    { canChi: 'Canh Thân', napAm: 'Thạch Lựu Mộc', menh: 'Mộc', detail: 'Gỗ cây lựu' },
    { canChi: 'Tân Dậu', napAm: 'Thạch Lựu Mộc', menh: 'Mộc', detail: 'Gỗ cây lựu' },
    { canChi: 'Nhâm Tuất', napAm: 'Đại Hải Thủy', menh: 'Thủy', detail: 'Nước biển lớn' },
    { canChi: 'Quý Hợi', napAm: 'Đại Hải Thủy', menh: 'Thủy', detail: 'Nước biển lớn' }
  ];

  // ==========================================================================
  // 2. LUNAR CALENDAR ALGORITHM (HỒ NGỌC ĐỨC)
  // ==========================================================================

  function INT(d) {
    return Math.floor(d);
  }

  function jdFromDate(dd, mm, yy) {
    var a = INT((14 - mm) / 12);
    var y = yy + 4800 - a;
    var m = mm + 12 * a - 3;
    var jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
    if (jd < 2299161) {
      jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
    }
    return jd;
  }

  function getNewMoonDay(k, timeZone) {
    var T = k / 1236.85;
    var T2 = T * T;
    var T3 = T2 * T;
    var dr = Math.PI / 180;
    var Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    var M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    var Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    var F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    var C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(2 * dr * Mpr);
    C1 = C1 - 0.0004 * Math.sin(3 * dr * Mpr);
    C1 = C1 + 0.0104 * Math.sin(2 * dr * F) - 0.0051 * Math.sin((M + Mpr) * dr);
    C1 = C1 - 0.0074 * Math.sin((M - Mpr) * dr) + 0.0004 * Math.sin((2 * F + M) * dr);
    C1 = C1 - 0.0004 * Math.sin((2 * F - M) * dr) - 0.0006 * Math.sin((2 * F + Mpr) * dr);
    C1 = C1 + 0.0010 * Math.sin((2 * F - Mpr) * dr) + 0.0005 * Math.sin((2 * Mpr + M) * dr);
    var deltat;
    if (T < -11) {
      deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.00000061 * T * T3;
    } else {
      deltat = -0.0000278 + 0.000265 * T + 0.000262 * T2;
    }
    var JdNew = Jd1 + C1 - deltat;
    return INT(JdNew + 0.5 + timeZone / 24);
  }

  function getSunLongitude(dayNumber, timeZone) {
    var T = (dayNumber - 2451545.5 - timeZone / 24) / 36525;
    var T2 = T * T;
    var dr = Math.PI / 180;
    var M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    var L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    var DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    var L = L0 + DL;
    L = L * dr;
    L = L - Math.PI * 2 * INT(L / (Math.PI * 2));
    return INT(L / Math.PI * 6);
  }

  function getLunarMonth11(yy, timeZone) {
    var off = jdFromDate(31, 12, yy) - 2415021;
    var k = INT(off / 29.530588853);
    var nm = getNewMoonDay(k, timeZone);
    var sunLong = getSunLongitude(nm, timeZone);
    if (sunLong >= 9) {
      nm = getNewMoonDay(k - 1, timeZone);
    }
    return nm;
  }

  function getLeapMonthOffset(a11, timeZone) {
    var k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    var last = 0;
    var i = 1;
    var arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    do {
      last = arc;
      i++;
      arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc !== last && i < 14);
    return i - 1;
  }

  function convertSolar2Lunar(dd, mm, yy, timeZone) {
    timeZone = timeZone || 7;
    var dayNumber = jdFromDate(dd, mm, yy);
    var k = INT((dayNumber - 2415021.076998695) / 29.530588853);
    var monthStart = getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) {
      monthStart = getNewMoonDay(k, timeZone);
    }
    var a11 = getLunarMonth11(yy, timeZone);
    var b11 = a11;
    var lunarYear;
    if (a11 >= monthStart) {
      lunarYear = yy;
      a11 = getLunarMonth11(yy - 1, timeZone);
    } else {
      lunarYear = yy + 1;
      b11 = getLunarMonth11(yy + 1, timeZone);
    }
    var lunarDay = dayNumber - monthStart + 1;
    var diff = INT((monthStart - a11) / 29);
    var lunarLeap = 0;
    var lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
      var leapMonthDiff = getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) {
          lunarLeap = 1;
        }
      }
    }
    if (lunarMonth > 12) {
      lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }
    return {
      day: lunarDay,
      month: lunarMonth,
      year: lunarYear,
      leap: lunarLeap === 1,
      jd: dayNumber
    };
  }

  // ==========================================================================
  // 3. CAN CHI & NGŨ HỔ ĐỘN & NGŨ THỬ ĐỘN
  // ==========================================================================

  function getCanNam(lunarYear) {
    return (lunarYear + 6) % 10;
  }

  function getChiNam(lunarYear) {
    return (lunarYear + 8) % 12;
  }

  function getCanChiNam(lunarYear) {
    var c = getCanNam(lunarYear);
    var chi = getChiNam(lunarYear);
    return THIEN_CAN[c] + ' ' + DIA_CHI[chi];
  }

  // Can Chi Tháng
  function getCanChiThang(canNam, lunarMonth) {
    // Tháng 1 khởi từ Dần (chi = 2)
    var canDan = [2, 4, 6, 8, 0][canNam % 5];
    var canThang = (canDan + (lunarMonth - 1)) % 10;
    var chiThang = (2 + (lunarMonth - 1)) % 12;
    return THIEN_CAN[canThang] + ' ' + DIA_CHI[chiThang];
  }

  // Can Chi Ngày dựa trên Julian Day
  function getCanChiNgay(jd) {
    var canIdx = (jd + 9) % 10;
    var chiIdx = (jd + 1) % 12;
    return {
      canIndex: canIdx,
      chiIndex: chiIdx,
      can: THIEN_CAN[canIdx],
      chi: DIA_CHI[chiIdx],
      text: THIEN_CAN[canIdx] + ' ' + DIA_CHI[chiIdx]
    };
  }

  // Can Chi Giờ (Ngũ Thử Độn dựa trên Can Ngày)
  function getCanChiGio(canNgayIdx, hourIndex) {
    var canTyStart = [0, 2, 4, 6, 8][canNgayIdx % 5];
    var canGio = (canTyStart + hourIndex) % 10;
    return THIEN_CAN[canGio] + ' ' + DIA_CHI[hourIndex];
  }

  function getNapAm(canIndex, chiIndex) {
    var name = THIEN_CAN[canIndex] + ' ' + DIA_CHI[chiIndex];
    for (var i = 0; i < LUC_THAP_HOA_GIAP.length; i++) {
      if (LUC_THAP_HOA_GIAP[i].canChi === name) {
        return LUC_THAP_HOA_GIAP[i];
      }
    }
    return { canChi: name, napAm: 'Bản Mệnh', menh: 'Kim', detail: '' };
  }

  function getCanDan(canNam) {
    var canDau = [2, 4, 6, 8, 0];
    return canDau[canNam % 5];
  }

  function getCanOfPalaces(canNam) {
    var canDan = getCanDan(canNam);
    var palaceCans = new Array(12);
    for (var i = 0; i < 12; i++) {
      var chi = (2 + i) % 12;
      palaceCans[chi] = (canDan + i) % 10;
    }
    return palaceCans;
  }

  // ==========================================================================
  // 4. CUNG MỆNH, THÂN, CỤC & TƯƠNG SINH TƯƠNG KHẮC
  // ==========================================================================

  function getCungMenh(lunarMonth, hourIndex) {
    var chiIndex = (2 + (lunarMonth - 1) - hourIndex + 24) % 12;
    return {
      chiIndex: chiIndex,
      chi: DIA_CHI[chiIndex]
    };
  }

  function getCungThan(lunarMonth, hourIndex) {
    var chiIndex = (2 + (lunarMonth - 1) + hourIndex) % 12;
    return {
      chiIndex: chiIndex,
      chi: DIA_CHI[chiIndex]
    };
  }

  function getCuc(canNam, chiMenhIndex) {
    var palaceCans = getCanOfPalaces(canNam);
    var canMenh = palaceCans[chiMenhIndex];
    var napAmObj = getNapAm(canMenh, chiMenhIndex);

    var menhToCuc = {
      'Thủy': 2,
      'Mộc': 3,
      'Kim': 4,
      'Thổ': 5,
      'Hỏa': 6
    };

    var cucVal = menhToCuc[napAmObj.menh] || 2;
    return {
      value: cucVal,
      name: CUC_NAMES[cucVal].name,
      element: CUC_NAMES[cucVal].element,
      canMenh: THIEN_CAN[canMenh],
      chiMenh: DIA_CHI[chiMenhIndex]
    };
  }

  // Quan hệ Mệnh và Cục
  function getMenhCucRelation(banMenhEl, cucEl) {
    if (banMenhEl === cucEl) return 'Mệnh Cục tương hòa';
    var sinh = {
      'Kim': 'Thủy', 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim'
    };
    var khac = {
      'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim'
    };

    if (sinh[banMenhEl] === cucEl) return `Mệnh ${banMenhEl} sinh Cục ${cucEl}`;
    if (sinh[cucEl] === banMenhEl) return `Cục ${cucEl} sinh Mệnh ${banMenhEl}`;
    if (khac[banMenhEl] === cucEl) return `Mệnh ${banMenhEl} khắc Cục ${cucEl}`;
    if (khac[cucEl] === banMenhEl) return `Cục ${cucEl} khắc Mệnh ${banMenhEl}`;
    return 'Bình hòa';
  }

  // Chủ Mệnh & Chủ Thân
  const CHU_MENH = [
    'Tham lang', 'Cự môn', 'Lộc tồn', 'Văn khúc', 'Liêm trinh', 'Vũ khúc',
    'Phá quân', 'Vũ khúc', 'Liêm trinh', 'Văn khúc', 'Lộc tồn', 'Cự môn'
  ];

  const CHU_THAN = [
    'Linh tinh', 'Thiên tướng', 'Thiên lương', 'Thiên đồng', 'Văn xương', 'Hỏa tinh',
    'Hỏa tinh', 'Thiên tướng', 'Thiên lương', 'Thiên đồng', 'Văn xương', 'Hỏa tinh'
  ];

  // Bát Tự Cân Xương (Cân lượng chỉ)
  function getCanLuong(lunarYear, lunarMonth, lunarDay, hourIndex) {
    // Lượng chỉ năm (60 năm Can Chi)
    var can = getCanNam(lunarYear);
    var chi = getChiNam(lunarYear);
    var canChiOffset = ((can * 12 + chi) % 60);

    // Bảng chuẩn Lượng Chỉ 60 Can Chi (đơn vị: lượng)
    var weightNam = [
      1.2, 0.7, 0.7, 0.7, 1.2, 0.5, 0.9, 0.8, 0.7, 1.5,
      1.5, 1.6, 1.6, 0.8, 0.8, 0.8, 1.2, 0.6, 0.7, 0.5,
      0.5, 1.4, 0.6, 1.6, 0.7, 0.7, 0.9, 1.2, 1.0, 0.6,
      0.8, 0.8, 0.5, 1.6, 0.9, 0.9, 0.7, 0.7, 0.8, 1.2,
      0.8, 0.7, 0.8, 0.5, 1.4, 0.5, 0.9, 1.6, 1.6, 1.3,
      1.2, 0.7, 0.8, 0.6, 0.8, 0.8, 0.8, 1.6, 1.0, 0.7
    ][canChiOffset % 60] || 0.8;

    // Lượng chỉ tháng 1..12
    var weightThang = [0.6, 0.7, 1.8, 0.9, 0.5, 1.6, 0.9, 1.5, 1.8, 0.8, 0.9, 0.5][(lunarMonth - 1) % 12];

    // Lượng chỉ ngày 1..30
    var weightNgay = [
      0.5, 1.0, 0.8, 1.5, 1.6, 1.5, 0.8, 1.6, 0.8, 1.6,
      0.9, 1.7, 0.8, 1.7, 1.0, 0.8, 0.9, 1.8, 0.5, 1.5,
      1.0, 0.9, 0.8, 0.9, 1.5, 1.8, 0.7, 0.8, 1.6, 0.6
    ][(lunarDay - 1) % 30] || 0.8;

    // Lượng chỉ giờ (Tý: 1.6, Sửu: 0.6, Dần: 0.7, Mão: 1.0, Thìn: 0.9, Tỵ: 1.6, Ngọ: 1.0, Mùi: 0.8, Thân: 0.8, Dậu: 0.9, Tuất: 0.6, Hợi: 0.6)
    var weightGio = [1.6, 0.6, 0.7, 1.0, 0.9, 1.6, 1.0, 0.8, 0.8, 0.9, 0.6, 0.6][hourIndex % 12];

    var total = Math.round((weightNam + weightThang + weightNgay + weightGio) * 10);
    var luong = Math.floor(total / 10);
    var chiVal = total % 10;
    return `${luong} lượng ${chiVal} chỉ`;
  }

  // ==========================================================================
  // 5. VỊ TRÍ SAO TỬ VI & 14 CHÍNH TINH
  // ==========================================================================

  function getTuViPosition(lunarDay, cucValue) {
    var DAN = 2; // Dần là gốc
    var du = lunarDay % cucValue;

    if (du === 0) {
      var thuong = lunarDay / cucValue;
      return (DAN + thuong - 1) % 12;
    }

    var k = cucValue - du;
    var thuong = (lunarDay + k) / cucValue;

    if (k % 2 === 0) {
      return (DAN + thuong - 1 + k) % 12;
    } else {
      return (DAN + thuong - 1 - k + 120) % 12;
    }
  }

  function getThienPhuPosition(tuViPos) {
    return (4 - tuViPos + 12) % 12;
  }

  // Đắc - Miếu - Vượng - Hãm của 14 Chính Tinh trên 12 cung
  const CHINH_TINH_DAC_HAM = {
    'Tử Vi':      ['B', 'Đ', 'M', 'B', 'V', 'M', 'M', 'Đ', 'M', 'B', 'V', 'B'],
    'Thiên Cơ':   ['Đ', 'Đ', 'M', 'M', 'V', 'H', 'M', 'Đ', 'V', 'M', 'V', 'H'],
    'Thái Dương': ['H', 'Đ', 'V', 'M', 'V', 'M', 'M', 'Đ', 'H', 'H', 'H', 'H'],
    'Vũ Khúc':    ['V', 'M', 'V', 'Đ', 'M', 'H', 'V', 'M', 'V', 'Đ', 'M', 'H'],
    'Thiên Đồng': ['V', 'H', 'M', 'Đ', 'H', 'Đ', 'H', 'H', 'M', 'H', 'Đ', 'M'],
    'Liêm Trinh': ['V', 'Đ', 'M', 'H', 'V', 'H', 'V', 'Đ', 'M', 'H', 'V', 'H'],
    'Thiên Phủ':  ['M', 'M', 'M', 'B', 'M', 'Đ', 'V', 'M', 'M', 'B', 'M', 'Đ'],
    'Thái Âm':    ['M', 'Đ', 'H', 'H', 'H', 'H', 'H', 'Đ', 'V', 'M', 'M', 'M'],
    'Tham Lang':  ['H', 'M', 'Đ', 'H', 'V', 'H', 'H', 'M', 'Đ', 'H', 'V', 'H'],
    'Cự Môn':     ['V', 'H', 'M', 'M', 'H', 'H', 'V', 'H', 'M', 'M', 'H', 'Đ'],
    'Thiên Tướng':['V', 'M', 'M', 'Đ', 'V', 'Đ', 'V', 'M', 'M', 'Đ', 'V', 'H'],
    'Thiên Lương':['V', 'V', 'M', 'M', 'V', 'H', 'M', 'V', 'H', 'Đ', 'V', 'H'],
    'Thất Sát':   ['M', 'Đ', 'M', 'H', 'H', 'V', 'M', 'Đ', 'M', 'H', 'H', 'V'],
    'Phá Quân':   ['M', 'V', 'H', 'H', 'Đ', 'H', 'M', 'V', 'H', 'H', 'Đ', 'H']
  };

  // Ngũ hành của các sao (để tô màu chuẩn như PDF)
  const STAR_ELEMENTS = {
    // 14 Chính tinh
    'Tử Vi': 'Thổ', 'Thiên Cơ': 'Mộc', 'Thái Dương': 'Hỏa', 'Vũ Khúc': 'Kim',
    'Thiên Đồng': 'Thủy', 'Liêm Trinh': 'Hỏa', 'Thiên Phủ': 'Thổ', 'Thái Âm': 'Thủy',
    'Tham Lang': 'Thủy', 'Cự Môn': 'Thủy', 'Thiên Tướng': 'Thủy', 'Thiên Lương': 'Mộc',
    'Thất Sát': 'Kim', 'Phá Quân': 'Thủy',

    // Cát tinh & Quý tinh
    'Tả Phù': 'Thổ', 'Hữu Bật': 'Thổ', 'Văn Xương': 'Kim', 'Văn Khúc': 'Thủy',
    'Thiên Khôi': 'Hỏa', 'Thiên Việt': 'Hỏa', 'Lộc Tồn': 'Thổ', 'Thiên Mã': 'Hỏa',
    'Đào Hoa': 'Mộc', 'Hồng Loan': 'Thủy', 'Thiên Hỷ': 'Thủy', 'Long Trì': 'Thủy',
    'Phượng Các': 'Thổ', 'Thiên Phúc': 'Hỏa', 'Thiên Quan': 'Hỏa', 'Quốc Ấn': 'Thổ',
    'Đường Phù': 'Mộc', 'Tam Thai': 'Thủy', 'Bát Tọa': 'Mộc', 'Ân Quang': 'Mộc',
    'Thiên Quý': 'Thổ', 'Thiên Thọ': 'Thổ', 'Hỷ Thần': 'Hỏa', 'Thanh Long': 'Thủy',
    'Long Đức': 'Thủy', 'Phúc Đức': 'Thổ', 'Thiên Đức': 'Hỏa', 'Nguyệt Đức': 'Hỏa',
    'Địa Giải': 'Thổ', 'Thiên Giải': 'Hỏa', 'Giải Thần': 'Mộc',

    // Sát tinh & Bại tinh
    'Kình Dương': 'Kim', 'Đà La': 'Kim', 'Hỏa Tinh': 'Hỏa', 'Linh Tinh': 'Hỏa',
    'Địa Không': 'Hỏa', 'Địa Kiếp': 'Hỏa', 'Thái Tuế': 'Hỏa', 'Tang Môn': 'Mộc',
    'Bạch Hổ': 'Kim', 'Thiên Không': 'Hỏa', 'Đại Hao': 'Hỏa', 'Tiểu Hao': 'Hỏa',
    'Thiên Khốc': 'Thủy', 'Thiên Hư': 'Thủy', 'Cô Thần': 'Hỏa', 'Quả Tú': 'Thổ',
    'Kiếp Sát': 'Hỏa', 'Phục Binh': 'Hỏa', 'Tướng Quân': 'Mộc', 'Trực Phù': 'Hỏa',
    'Tử Phù': 'Hỏa', 'Tuế Phá': 'Hỏa', 'Điếu Khách': 'Hỏa', 'Bệnh Phù': 'Thổ',
    'Phi Liêm': 'Hỏa', 'Phá Toái': 'Hỏa', 'Đầu Quân': 'Hỏa', 'Thiên La': 'Thổ',
    'Địa Võng': 'Thổ', 'Thiên Hình': 'Hỏa', 'Thiên Thương': 'Thổ', 'Thiên Sứ': 'Thủy',
    'Lưu Hà': 'Thủy', 'Thiên Diêu': 'Thủy', 'Thiên Trù': 'Thổ'
  };

  // Tứ Hóa
  const TU_HOA_TABLE = [
    { 'Liêm Trinh': 'Hóa Lộc', 'Phá Quân': 'Hóa Quyền', 'Vũ Khúc': 'Hóa Khoa', 'Thái Dương': 'Hóa Kỵ' },
    { 'Thiên Cơ': 'Hóa Lộc', 'Thiên Lương': 'Hóa Quyền', 'Tử Vi': 'Hóa Khoa', 'Thái Âm': 'Hóa Kỵ' },
    { 'Thiên Đồng': 'Hóa Lộc', 'Thiên Cơ': 'Hóa Quyền', 'Văn Xương': 'Hóa Khoa', 'Liêm Trinh': 'Hóa Kỵ' },
    { 'Thái Âm': 'Hóa Lộc', 'Thiên Đồng': 'Hóa Quyền', 'Thiên Cơ': 'Hóa Khoa', 'Cự Môn': 'Hóa Kỵ' },
    { 'Tham Lang': 'Hóa Lộc', 'Thái Âm': 'Hóa Quyền', 'Hữu Bật': 'Hóa Khoa', 'Thiên Cơ': 'Hóa Kỵ' },
    { 'Vũ Khúc': 'Hóa Lộc', 'Tham Lang': 'Hóa Quyền', 'Thiên Lương': 'Hóa Khoa', 'Văn Khúc': 'Hóa Kỵ' },
    { 'Thái Dương': 'Hóa Lộc', 'Vũ Khúc': 'Hóa Quyền', 'Thái Âm': 'Hóa Khoa', 'Thiên Đồng': 'Hóa Kỵ' },
    { 'Cự Môn': 'Hóa Lộc', 'Thái Dương': 'Hóa Quyền', 'Văn Khúc': 'Hóa Khoa', 'Văn Xương': 'Hóa Kỵ' },
    { 'Thiên Lương': 'Hóa Lộc', 'Tử Vi': 'Hóa Quyền', 'Tả Phù': 'Hóa Khoa', 'Vũ Khúc': 'Hóa Kỵ' },
    { 'Phá Quân': 'Hóa Lộc', 'Cự Môn': 'Hóa Quyền', 'Thái Âm': 'Hóa Khoa', 'Tham Lang': 'Hóa Kỵ' }
  ];

  const LOC_TON_POS = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0];
  const THIEN_KHOI_POS = [1, 0, 11, 11, 1, 0, 6, 6, 3, 3];
  const THIEN_VIET_POS = [7, 8, 9, 9, 7, 8, 2, 2, 5, 5];

  const VONG_THAI_TUE = [
    'Thái tuế', 'Thiếu dương', 'Tang môn', 'Thiếu âm', 'Quan phù', 'Tử phù',
    'Tuế phá', 'Long đức', 'Bạch hổ', 'Phúc đức', 'Điếu khách', 'Trực phù'
  ];

  // Vòng Tràng Sinh 12 sao
  const VONG_TRANG_SINH_NAMES = [
    'Trường sinh', 'Mộc dục', 'Quan đới', 'Lâm quan', 'Đế vượng', 'Suy',
    'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'
  ];

  function getTrietKhong(canNam) {
    var map = [
      [8, 9],   // Giáp/Kỷ: Thân - Dậu
      [6, 7],   // Ất/Canh: Ngọ - Mùi
      [4, 5],   // Bính/Tân: Thìn - Tỵ
      [2, 3],   // Đinh/Nhâm: Dần - Mão
      [0, 1]    // Mậu/Quý: Tý - Sửu
    ];
    return map[canNam % 5];
  }

  function getTuanKhong(lunarYear) {
    var can = getCanNam(lunarYear);
    var chi = getChiNam(lunarYear);
    var offset = (chi - can + 12) % 12;
    return [(offset - 2 + 12) % 12, (offset - 1 + 12) % 12];
  }

  // ==========================================================================
  // 6. MAIN ENGINE: LẬP LÁ SỐ TỬ VI CHÍNH TÔNG
  // ==========================================================================

  function lapLaSo(ngay, thang, nam, gioIndex, gioiTinh, isLunar, gioPhutText, viewYear) {
    var hoTen = '';
    var opt = null;
    if (typeof ngay === 'object' && ngay !== null) {
      opt = ngay;
      hoTen = opt.hoTen || '';
      thang = opt.thang || opt.thangSinh;
      nam = opt.nam || opt.namSinh;
      gioIndex = opt.gioIndex !== undefined ? opt.gioIndex : (opt.gio !== undefined ? (opt.gio === 23 || opt.gio === 0 ? 0 : Math.floor((parseInt(opt.gio, 10) + 1) / 2)) : 0);
      gioiTinh = opt.gioiTinh || 'nam';
      isLunar = (opt.isLunar === true || opt.loaiLich === 'am');
      gioPhutText = opt.gioPhutText || ((opt.gio !== undefined ? opt.gio + ' giờ ' : '') + (opt.phut !== undefined ? opt.phut + ' phút' : ''));
      viewYear = opt.viewYear || opt.namXem;
      ngay = opt.ngay || opt.ngaySinh;
    }
    var vYear = parseInt(viewYear, 10) || 2026;

    // Chuẩn hóa giới tính: hỗ trợ 'nam', 'nu', 'Nam', 'Nữ', '1', '0'
    var rawGender = (gioiTinh || 'nam').toString().trim().toLowerCase();
    var isNam = (rawGender === 'nam' || rawGender === 'male' || rawGender === '1' || rawGender === 'true');
    var genderStr = isNam ? 'Nam' : 'Nữ';

    // Xử lý Giờ Tý (23:00 - 23:59):
    // gioTyMode: 'next_day' (sau 23h sang ngày mới) hoặc 'same_day' (mặc định giữ nguyên ngày cho API cũ)
    var rawGio = (opt && opt.gio !== undefined) ? parseInt(opt.gio, 10) : (gioIndex === 0 ? 0 : gioIndex * 2);
    var rawPhut = (opt && opt.phut !== undefined) ? parseInt(opt.phut, 10) : 0;
    var gioTyMode = (opt && opt.gioTyMode) ? opt.gioTyMode : ((opt && opt.gioTyNextDay) ? 'next_day' : 'same_day');
    var isGioTyNextDay = (rawGio === 23 && gioTyMode === 'next_day');

    var lunar;
    var solarDate = null;

    if (isLunar) {
      var lDay = parseInt(ngay, 10);
      var lMonth = parseInt(thang, 10);
      var lYear = parseInt(nam, 10);
      if (isGioTyNextDay) {
        lDay += 1;
        if (lDay > 30) {
          lDay = 1;
          lMonth = (lMonth % 12) + 1;
          if (lMonth === 1) lYear += 1;
        }
      }
      lunar = {
        day: lDay,
        month: lMonth,
        year: lYear,
        leap: (opt && (opt.isLeap === true || opt.leap === true)),
        jd: jdFromDate(lDay, lMonth, lYear)
      };
    } else {
      var sDay = parseInt(ngay, 10);
      var sMonth = parseInt(thang, 10);
      var sYear = parseInt(nam, 10);
      if (isGioTyNextDay) {
        var dNext = new Date(sYear, sMonth - 1, sDay + 1);
        sDay = dNext.getDate();
        sMonth = dNext.getMonth() + 1;
        sYear = dNext.getFullYear();
      }
      solarDate = { day: sDay, month: sMonth, year: sYear };
      lunar = convertSolar2Lunar(solarDate.day, solarDate.month, solarDate.year, 7);
    }

    if (isGioTyNextDay) {
      gioIndex = 0; // Sau 23h thuộc giờ Tý của ngày mới
    }

    var canNamIdx = getCanNam(lunar.year);
    var chiNamIdx = getChiNam(lunar.year);
    var canChiNamStr = THIEN_CAN[canNamIdx] + ' ' + DIA_CHI[chiNamIdx];
    var amDuongNam = (canNamIdx % 2 === 0) ? 'duong' : 'am';
    var napAmNam = getNapAm(canNamIdx, chiNamIdx);

    // Quy tắc Tháng Nhuận Âm Lịch (Tử Vi Nam Phái):
    // Sinh từ ngày 1 đến 15 tính theo tháng chính, sinh từ ngày 16 đến 30 tính sang tháng sau
    var thangTuVi = lunar.month;
    if (lunar.leap && lunar.day > 15) {
      thangTuVi = (lunar.month % 12) + 1;
    }

    // Can Chi Tháng, Ngày, Giờ
    var canChiThangStr = getCanChiThang(canNamIdx, thangTuVi);
    var canChiNgayObj = getCanChiNgay(lunar.jd);
    var canChiGioStr = getCanChiGio(canChiNgayObj.canIndex, gioIndex);

    // Cung Mệnh & Thân
    var cungMenh = getCungMenh(thangTuVi, gioIndex);
    var cungThan = getCungThan(thangTuVi, gioIndex);

    // Can của 12 cung
    var palaceCans = getCanOfPalaces(canNamIdx);

    // Cục
    var cucInfo = getCuc(canNamIdx, cungMenh.chiIndex);

    // Chiều Thuận / Nghịch: Dương Nam / Âm Nữ đi THUẬN; Âm Nam / Dương Nữ đi NGHỊCH
    var isNamDuong = (amDuongNam === 'duong');
    var isThuan = (isNamDuong && isNam) || (!isNamDuong && !isNam);

    // Âm Dương Thuận Lý / Nghịch Lý
    var isChiMenhDuong = (cungMenh.chiIndex % 2 === 0);
    var amDuongThuanLy = (isNamDuong === isChiMenhDuong) ? 'Thuận lý' : 'Nghịch lý';
    var amDuongTitle = (isNamDuong ? 'Dương' : 'Âm') + ' ' + genderStr + ' (' + amDuongThuanLy + ')';

    // Mệnh Cục Tương Sinh / Tương Khắc
    var menhCucText = getMenhCucRelation(napAmNam.menh, cucInfo.element);

    // Khởi tạo 12 cung
    var cungArray = new Array(12);
    for (var i = 0; i < 12; i++) {
      var chiIdx = (cungMenh.chiIndex - i + 12) % 12;
      var canIdx = palaceCans[chiIdx];
      cungArray[chiIdx] = {
        chiIndex: chiIdx,
        chi: DIA_CHI[chiIdx],
        canIndex: canIdx,
        can: THIEN_CAN[canIdx],
        canShort: THIEN_CAN_SHORT[canIdx],
        cungName: CUNG_NAMES_ORDER[i],
        chinhTinh: [],
        phuTinhLeft: [],  // Cát tinh
        phuTinhRight: [], // Sát tinh / hung tinh
        tuHoa: [],
        daiHan: null,
        trangSinh: '',
        thangHan: ''
      };
    }

    // Sao Tử Vi & Thiên Phủ
    var tuViPos = getTuViPosition(lunar.day, cucInfo.value);
    var thienPhuPos = getThienPhuPosition(tuViPos);

    // An 14 Chính Tinh
    var tuViGroup = [
      { name: 'Tử Vi', offset: 0, sign: '+' },
      { name: 'Thiên Cơ', offset: -1, sign: '-' },
      { name: 'Thái Dương', offset: -3, sign: '+' },
      { name: 'Vũ Khúc', offset: -4, sign: '-' },
      { name: 'Thiên Đồng', offset: -5, sign: '+' },
      { name: 'Liêm Trinh', offset: -8, sign: '-' }
    ];

    tuViGroup.forEach(function (star) {
      var pos = (tuViPos + star.offset + 120) % 12;
      var dacHam = CHINH_TINH_DAC_HAM[star.name][pos];
      var el = STAR_ELEMENTS[star.name] || 'Thổ';
      cungArray[pos].chinhTinh.push({
        name: star.name,
        dacHam: dacHam,
        sign: star.sign,
        element: el,
        group: 'Bắc Đẩu',
        tuHoa: null
      });
    });

    var thienPhuGroup = [
      { name: 'Thiên Phủ', offset: 0, sign: '-' },
      { name: 'Thái Âm', offset: 1, sign: '-' },
      { name: 'Tham Lang', offset: 2, sign: '-' },
      { name: 'Cự Môn', offset: 3, sign: '-' },
      { name: 'Thiên Tướng', offset: 4, sign: '+' },
      { name: 'Thiên Lương', offset: 5, sign: '-' },
      { name: 'Thất Sát', offset: 6, sign: '+' },
      { name: 'Phá Quân', offset: 10, sign: '-' }
    ];

    thienPhuGroup.forEach(function (star) {
      var pos = (thienPhuPos + star.offset) % 12;
      var dacHam = CHINH_TINH_DAC_HAM[star.name][pos];
      var el = STAR_ELEMENTS[star.name] || 'Thủy';
      cungArray[pos].chinhTinh.push({
        name: star.name,
        dacHam: dacHam,
        sign: star.sign,
        element: el,
        group: 'Nam Đẩu',
        tuHoa: null
      });
    });

    // Helper thêm phụ tinh
    function addStar(pos, starName, isLeft, dacHam, isLuu) {
      var exists = cungArray[pos].phuTinhLeft.some(function(s) { return s.name.toLowerCase() === starName.toLowerCase(); }) ||
                   cungArray[pos].phuTinhRight.some(function(s) { return s.name.toLowerCase() === starName.toLowerCase(); });
      if (exists) return;

      var baseName = starName.replace(/^L\./, '');
      var el = STAR_ELEMENTS[starName] || STAR_ELEMENTS[baseName] || 'Thổ';
      var starObj = {
        name: starName,
        element: el,
        dacHam: dacHam || null,
        tuHoa: null,
        isLuu: isLuu === true || starName.startsWith('L.')
      };
      if (isLeft) {
        cungArray[pos].phuTinhLeft.push(starObj);
      } else {
        cungArray[pos].phuTinhRight.push(starObj);
      }
    }

    // 1. Vòng Lộc Tồn & 12 sao Bác Sỹ (theo chiều thuận/nghịch)
    var locTonPos = LOC_TON_POS[canNamIdx];
    var BAC_SY_STARS = [
      { name: 'Bác sỹ', isLeft: true },
      { name: 'Lực sỹ', isLeft: true },
      { name: 'Thanh long', isLeft: true },
      { name: 'Tiểu hao', isLeft: false },
      { name: 'Tướng quân', isLeft: false },
      { name: 'Tấu thư', isLeft: true },
      { name: 'Phi liêm', isLeft: false },
      { name: 'Hỷ thần', isLeft: true },
      { name: 'Bệnh phù', isLeft: false },
      { name: 'Đại hao', isLeft: false },
      { name: 'Phục binh', isLeft: false },
      { name: 'Quan phủ', isLeft: false }
    ];
    for (var b = 0; b < 12; b++) {
      var bPos = isThuan ? (locTonPos + b) % 12 : (locTonPos - b + 120) % 12;
      addStar(bPos, BAC_SY_STARS[b].name, BAC_SY_STARS[b].isLeft);
    }
    // Lộc Tồn, Kình Dương, Đà La
    addStar(locTonPos, 'Lộc tồn', true);
    addStar((locTonPos + 1) % 12, 'Kình dương', false, 'H');
    addStar((locTonPos - 1 + 12) % 12, 'Đà la', false, 'Đ');

    // 2. Vòng Thái Tuế (12 sao) + Thiên Không, Nguyệt Đức, Thiên Đức
    for (var t = 0; t < 12; t++) {
      var ttPos = (chiNamIdx + t) % 12;
      var starT = VONG_THAI_TUE[t];
      var isGood = ['Long đức', 'Phúc đức', 'Thiếu dương', 'Thiếu âm'].indexOf(starT) !== -1;
      addStar(ttPos, starT, isGood);
      if (starT === 'Thiếu dương') {
        addStar(ttPos, 'Thiên không', false);
      } else if (starT === 'Phúc đức') {
        addStar(ttPos, 'Thiên đức', true);
      } else if (starT === 'Tử phù') {
        addStar(ttPos, 'Nguyệt đức', true);
      }
    }

    // 3. Địa Không, Địa Kiếp (theo Giờ)
    var diaKiepPos = (11 + gioIndex) % 12;
    var diaKhongPos = (11 - gioIndex + 120) % 12;
    addStar(diaKiepPos, 'Địa kiếp', false, 'H');
    addStar(diaKhongPos, 'Địa không', false, 'H');

    // 4. Hỏa Tinh, Linh Tinh (theo Chi năm & Giờ, đổi chiều thuận/nghịch)
    var groupTamHop = chiNamIdx % 4; // 0: Thân Tý Thìn, 1: Tỵ Dậu Sửu, 2: Dần Ngọ Tuất, 3: Hợi Mão Mùi
    var hoaRoots = [2, 3, 1, 9];
    var linhRoots = [10, 10, 3, 10];
    var hRoot = hoaRoots[groupTamHop];
    var lRoot = linhRoots[groupTamHop];
    var hoaPos = isThuan ? (hRoot + gioIndex) % 12 : (hRoot - gioIndex + 120) % 12;
    var linhPos = isThuan ? (lRoot - gioIndex + 120) % 12 : (lRoot + gioIndex) % 12;
    addStar(hoaPos, 'Hỏa tinh', false, 'H');
    addStar(linhPos, 'Linh tinh', false, 'Đ');

    // 5. Sao theo Tháng sinh
    var mIdx = thangTuVi - 1;
    var taPhuPos = (4 + mIdx) % 12;
    var huuBatPos = (10 - mIdx + 120) % 12;
    addStar(taPhuPos, 'Tả phù', true);
    addStar(huuBatPos, 'Hữu bật', true);

    addStar((9 + mIdx) % 12, 'Thiên hình', false, 'H');
    addStar((1 + mIdx) % 12, 'Thiên diêu', false, 'Đ');
    addStar((1 + mIdx) % 12, 'Thiên y', true);
    addStar((7 + mIdx) % 12, 'Địa giải', true);
    addStar((8 + mIdx) % 12, 'Thiên giải', true);

    // 6. Sao theo Can năm sinh
    addStar(THIEN_KHOI_POS[canNamIdx], 'Thiên khôi', true);
    addStar(THIEN_VIET_POS[canNamIdx], 'Thiên việt', true);
    var thienQuanMap = [7, 4, 5, 2, 3, 9, 11, 9, 10, 6];
    var thienPhucMap = [9, 8, 0, 11, 3, 2, 6, 5, 6, 5];
    var luuHaMap = [9, 10, 7, 8, 5, 6, 11, 0, 11, 2];
    var thienTruMap = [5, 6, 0, 5, 6, 8, 2, 6, 9, 10];
    addStar(thienQuanMap[canNamIdx], 'Thiên quan', true);
    addStar(thienPhucMap[canNamIdx], 'Thiên phúc', true);
    addStar(luuHaMap[canNamIdx], 'Lưu hà', false);
    addStar(thienTruMap[canNamIdx], 'Thiên trù', true);

    // Văn Tinh (Theo Can năm sinh)
    var vanTinhMap = [5, 6, 8, 9, 8, 9, 11, 0, 9, 10];
    addStar(vanTinhMap[canNamIdx], 'Văn tinh', true);

    // 7. Sao theo Giờ sinh
    var vanXuongPos = (10 - gioIndex + 120) % 12;
    var vanKhucPos = (4 + gioIndex) % 12;
    addStar(vanXuongPos, 'Văn xương', true, 'H');
    addStar(vanKhucPos, 'Văn khúc', true, 'H');
    addStar((6 + gioIndex) % 12, 'Thai phụ', true);
    addStar((2 + gioIndex) % 12, 'Phong cáo', true);

    // 8. Sao theo Ngày sinh (kết hợp Tả/Hữu, Xương/Khúc)
    var dIdx = lunar.day - 1;
    addStar((taPhuPos + dIdx) % 12, 'Tam thai', true);
    addStar((huuBatPos - dIdx + 120) % 12, 'Bát tọa', true);
    addStar((vanXuongPos + lunar.day - 2 + 120) % 12, 'Ân quang', true);
    addStar((vanKhucPos - (lunar.day - 2) + 120) % 12, 'Thiên quý', true);

    // 9. Sao theo Chi năm sinh
    var thienMaMap = [2, 11, 8, 5, 2, 11, 8, 5, 2, 11, 8, 5];
    var daoHoaMap = [9, 6, 3, 0, 9, 6, 3, 0, 9, 6, 3, 0];
    var coThanMap = [2, 2, 5, 5, 5, 8, 8, 8, 11, 11, 11, 2];
    var quaTuMap = [10, 10, 1, 1, 1, 4, 4, 4, 7, 7, 7, 10];
    var kiepSatMap = [5, 2, 11, 8, 5, 2, 11, 8, 5, 2, 11, 8];
    var phaToaiMap = [5, 1, 9, 5, 1, 9, 5, 1, 9, 5, 1, 9];

    addStar(thienMaMap[chiNamIdx], 'Thiên mã', true, 'H');
    addStar(daoHoaMap[chiNamIdx], 'Đào hoa', true);
    var hongLoanPos = (3 - chiNamIdx + 120) % 12;
    addStar(hongLoanPos, 'Hồng loan', true);
    addStar((hongLoanPos + 6) % 12, 'Thiên hỷ', true);
    addStar((4 + chiNamIdx) % 12, 'Long trì', true);
    var phuongCacPos = (10 - chiNamIdx + 120) % 12;
    addStar(phuongCacPos, 'Phượng các', true);
    addStar(phuongCacPos, 'Giải thần', true);

    // Hoa Cái (Tam Hợp Địa Chi năm sinh)
    var hoaCaiMap = [4, 1, 10, 7, 4, 1, 10, 7, 4, 1, 10, 7];
    addStar(hoaCaiMap[chiNamIdx], 'Hoa cái', true);

    // Đẩu Quân (Khởi từ cung Thái Tuế đếm nghịch đến tháng sinh, rồi đếm thuận đến giờ sinh)
    var dauQuanPos = (chiNamIdx - (thangTuVi - 1) + gioIndex + 120) % 12;
    addStar(dauQuanPos, 'Đẩu quân', false);

    addStar(coThanMap[chiNamIdx], 'Cô thần', false);
    addStar(quaTuMap[chiNamIdx], 'Quả tú', false);
    addStar(kiepSatMap[chiNamIdx], 'Kiếp sát', false);
    addStar(phaToaiMap[chiNamIdx], 'Phá toái', false);
    addStar((6 - chiNamIdx + 120) % 12, 'Thiên khốc', false, 'Đ');
    addStar((6 + chiNamIdx) % 12, 'Thiên hư', false, 'H');

    addStar((locTonPos + 8) % 12, 'Quốc ấn', true);
    addStar((locTonPos + 5) % 12, 'Đường phù', true);

    addStar((cungMenh.chiIndex + chiNamIdx) % 12, 'Thiên tài', true);
    addStar((cungThan.chiIndex + chiNamIdx) % 12, 'Thiên thọ', true);

    addStar(4, 'Thiên la', false);
    addStar(10, 'Địa võng', false);
    var noBocChi = (cungMenh.chiIndex - 7 + 120) % 12;
    var tatAchChi = (cungMenh.chiIndex - 5 + 120) % 12;
    addStar(noBocChi, 'Thiên thương', false);
    addStar(tatAchChi, 'Thiên sứ', false);

    // 10. Tứ Hóa (Áp dụng cho CẢ Chính Tinh & Phụ Tinh, so khớp không phân biệt hoa/thường)
    var tuHoaMap = TU_HOA_TABLE[canNamIdx];
    function findTuHoa(name) {
      if (!name) return null;
      var clean = name.toLowerCase().trim();
      for (var k in tuHoaMap) {
        if (k.toLowerCase().trim() === clean) return tuHoaMap[k];
      }
      return null;
    }

    for (var p = 0; p < 12; p++) {
      cungArray[p].chinhTinh.forEach(function (ct) {
        var hoa = findTuHoa(ct.name);
        if (hoa) {
          ct.tuHoa = hoa;
          cungArray[p].tuHoa.push({ star: ct.name, hoa: hoa });
        }
      });
      cungArray[p].phuTinhLeft.forEach(function (pt) {
        var hoa = findTuHoa(pt.name);
        if (hoa) {
          pt.tuHoa = hoa;
          cungArray[p].tuHoa.push({ star: pt.name, hoa: hoa });
        }
      });
      cungArray[p].phuTinhRight.forEach(function (pt) {
        var hoa = findTuHoa(pt.name);
        if (hoa) {
          pt.tuHoa = hoa;
          cungArray[p].tuHoa.push({ star: pt.name, hoa: hoa });
        }
      });
    }

    // 11. Sao Lưu Niên theo năm xem hạn (Đồng bộ 100% tuvi.vn & tracuutuvi.com)
    var vCanIdx = (vYear + 6) % 10;
    var vChiIdx = (vYear + 8) % 12;
    var vLocTonPos = LOC_TON_POS[vCanIdx];

    addStar(vLocTonPos, 'L.Lộc tồn', true, null, true);
    addStar(vChiIdx, 'L.Thái tuế', false, null, true);
    addStar((vLocTonPos + 1) % 12, 'L.Kình dương', false, null, true);
    addStar((vLocTonPos - 1 + 12) % 12, 'L.Đà la', false, null, true);
    addStar((vChiIdx + 2) % 12, 'L.Tang môn', false, null, true);
    addStar((vChiIdx + 8) % 12, 'L.Bạch hổ', false, null, true);
    addStar((6 - vChiIdx + 120) % 12, 'L.Thiên khốc', false, null, true);
    addStar((6 + vChiIdx) % 12, 'L.Thiên hư', false, null, true);
    addStar(thienMaMap[vChiIdx], 'L.Thiên mã', true, null, true);

    // Lưu Khôi, Lưu Việt
    addStar(THIEN_KHOI_POS[vCanIdx], 'L.Thiên khôi', true, null, true);
    addStar(THIEN_VIET_POS[vCanIdx], 'L.Thiên việt', true, null, true);

    // Lưu Đào Hoa, Lưu Hồng Loan, Lưu Kiếp Sát
    addStar(daoHoaMap[vChiIdx], 'L.Đào hoa', true, null, true);
    addStar((15 - vChiIdx) % 12, 'L.Hồng loan', true, null, true);
    addStar(kiepSatMap[vChiIdx], 'L.Kiếp sát', false, null, true);

    // Lưu Văn Xương, Lưu Văn Khúc
    var luuXuongMap = [5, 6, 8, 9, 8, 9, 11, 0, 2, 3];
    var luuKhucMap = [9, 8, 6, 7, 6, 7, 4, 3, 2, 1];
    addStar(luuXuongMap[vCanIdx], 'L.Văn xương', true, null, true);
    addStar(luuKhucMap[vCanIdx], 'L.Văn khúc', true, null, true);

    // Lưu Thiên Đức, Phúc Đức, Long Đức, Nguyệt Đức
    addStar((vChiIdx + 9) % 12, 'L.Thiên đức', true, null, true);
    addStar((vChiIdx + 9) % 12, 'L.Phúc đức', true, null, true);
    addStar((vChiIdx + 7) % 12, 'L.Long đức', true, null, true);
    addStar((vChiIdx + 5) % 12, 'L.Nguyệt đức', true, null, true);

    // Lưu Tứ Hóa năm xem hạn (L.Hóa Lộc, L.Hóa Quyền, L.Hóa Khoa, L.Hóa Kỵ)
    var vTuHoaMap = TU_HOA_TABLE[vCanIdx];
    if (vTuHoaMap) {
      for (var pIdx = 0; pIdx < 12; pIdx++) {
        var allPalaceStars = cungArray[pIdx].chinhTinh.concat(cungArray[pIdx].phuTinhLeft, cungArray[pIdx].phuTinhRight);
        allPalaceStars.forEach(function (st) {
          var cleanSt = st.name.toLowerCase().trim();
          for (var hoaStar in vTuHoaMap) {
            if (hoaStar.toLowerCase().trim() === cleanSt && !st.isLuu) {
              var hoaType = vTuHoaMap[hoaStar];
              var isLeftHoa = (hoaType !== 'Hóa Kỵ');
              addStar(pIdx, 'L.' + hoaType, isLeftHoa, null, true);
            }
          }
        });
      }
    }

    // 12. Tuần & Triệt
    var tuanArray = getTuanKhong(lunar.year);
    var trietArray = getTrietKhong(canNamIdx);

    // 13. Đại Hạn 10 năm
    var startAge = cucInfo.value;
    for (var d = 0; d < 12; d++) {
      var dChi = isThuan ? (cungMenh.chiIndex + d) % 12 : (cungMenh.chiIndex - d + 120) % 12;
      var sAge = startAge + d * 10;
      cungArray[dChi].daiHan = {
        startAge: sAge,
        endAge: sAge + 9,
        num: sAge
      };
    }

    // 14. Vòng Tràng Sinh (12 cung: Thủy/Thổ khởi Thân, Mộc khởi Hợi, Kim khởi Tỵ, Hỏa khởi Dần)
    var tsRoots = { 2: 8, 3: 11, 4: 5, 5: 8, 6: 2 };
    var tsRoot = tsRoots[cucInfo.value] !== undefined ? tsRoots[cucInfo.value] : 8;
    for (var ts = 0; ts < 12; ts++) {
      var tsChi = isThuan ? (tsRoot + ts) % 12 : (tsRoot - ts + 120) % 12;
      cungArray[tsChi].trangSinh = VONG_TRANG_SINH_NAMES[ts];
    }

    // 15. Tiểu Hạn theo từng cung (Hiển thị góc trái dưới mỗi cung)
    // Quy tắc chuẩn Tử Vi Nam Phái (đồng bộ 100% tuvi.vn & tracuutuvi.com):
    // Khởi địa chi năm sinh (chiNamIdx) tại cung Tam Hợp:
    // - Tuổi Thân - Tý - Thìn: khởi tại cung Tuất (10)
    // - Tuổi Tỵ - Dậu - Sửu: khởi tại cung Mùi (7)
    // - Tuổi Dần - Ngọ - Tuất: khởi tại cung Thìn (4)
    // - Tuổi Hợi - Mão - Mùi: khởi tại cung Sửu (1)
    // Chiều đi:
    // - Nam đếm THUẬN theo chiều kim đồng hồ (cung tăng, chi tăng)
    // - Nữ đếm NGHỊCH theo chiều kim đồng hồ (cung tăng, chi giảm)
    var startPalaceMap = [10, 7, 4, 1];
    var startPalace = startPalaceMap[chiNamIdx % 4];
    for (var step = 0; step < 12; step++) {
      var palace = (startPalace + step) % 12;
      var yChi = isNam
        ? (chiNamIdx + step) % 12
        : (chiNamIdx - step + 120) % 12;
      cungArray[palace].tieuHan = DIA_CHI[yChi];
      cungArray[palace].tieuHanChiIdx = yChi;
    }

    // 16. Nguyệt Hạn (Tháng hạn Th.1 -> Th.12 của năm xem hạn)
    // Từ cung Tiểu Vận của năm xem hạn (vChiIdx), coi đó là tháng Giêng,
    // đếm NGHỊCH đến tháng sinh âm lịch, rồi từ cung đó coi là giờ Tý đếm THUẬN đến giờ sinh để định Tháng Giêng (Th.1).
    // Sau đó từ Th.1 đếm thuận chiều kim đồng hồ ra Th.2 -> Th.12.
    var cungTieuHanYear = 0;
    for (var p = 0; p < 12; p++) {
      if (cungArray[p].tieuHanChiIdx === vChiIdx) {
        cungTieuHanYear = p;
        break;
      }
    }
    var stopMonthPalace = (cungTieuHanYear - (thangTuVi - 1) + 120) % 12;
    var th1Pos = (stopMonthPalace + gioIndex) % 12;
    for (var th = 0; th < 12; th++) {
      var thChi = (th1Pos + th) % 12;
      cungArray[thChi].thangHan = 'Th.' + (th + 1);
    }

    // Thân cư Cung nào?
    var thanCungName = cungArray[cungThan.chiIndex].cungName;
    var thanCuText = thanCungName.toLowerCase();
    cungArray[cungThan.chiIndex].cungName += '<THÂN>';

    // Lai Nhân Cung
    var laiNhanCungName = 'Mệnh';
    for (var lp = 0; lp < 12; lp++) {
      if (cungArray[lp].canIndex === canNamIdx) {
        laiNhanCungName = cungArray[lp].cungName.replace('<THÂN>', '');
        break;
      }
    }

    // 3 Điểm Nghiệm Lý Xác Thực Giờ Sinh (Mệnh, Thân, Tật Ách)
    var nghiemLy = get3DiemNghiemLy({
      cung: cungArray,
      cungMenh: cungMenh,
      thanCu: thanCuText
    });

    return {
      hoTen: hoTen || '',
      solarDate: solarDate || { day: ngay, month: thang, year: nam },
      lunarDate: lunar,
      gioiTinh: genderStr.toLowerCase(),
      amDuongTitle: amDuongTitle,
      canNamIdx: canNamIdx,
      chiNamIdx: chiNamIdx,
      canChiNam: canChiNamStr,
      canChiThang: canChiThangStr,
      canChiNgay: canChiNgayObj.text,
      canChiGio: canChiGioStr,
      gioPhutText: gioPhutText || (gioIndex * 2 + ' giờ 00 phút'),
      napAm: napAmNam.napAm,
      napAmDetail: napAmNam.detail,
      banMenh: napAmNam.menh,
      cungMenh: cungMenh,
      cungThan: cungThan,
      cucInfo: cucInfo,
      menhCucRelation: menhCucText,
      chuMenh: CHU_MENH[chiNamIdx],
      chuThan: CHU_THAN[chiNamIdx],
      canLuong: getCanLuong(lunar.year, lunar.month, lunar.day, gioIndex),
      laiNhan: 'cung ' + laiNhanCungName.toLowerCase(),
      thanCu: thanCuText,
      tuViPos: tuViPos,
      thienPhuPos: thienPhuPos,
      tuan: tuanArray,
      triet: trietArray,
      cung: cungArray,
      nghiemLyDienMao: nghiemLy.dienMao,
      nghiemLyTinhCach: nghiemLy.tinhCach,
      nghiemLyTheChat: nghiemLy.theChat,
      _input: {
        ngay: ngay,
        thang: thang,
        nam: nam,
        gioIndex: gioIndex,
        gioiTinh: gioiTinh,
        isLunar: isLunar,
        gioPhutText: gioPhutText,
        viewYear: vYear,
        hoTen: hoTen,
        gio: rawGio,
        phut: rawPhut,
        gioTyMode: gioTyMode
      }
    };
  }

  /**
   * Trích xuất 3 Điểm Nghiệm Lý Xác Thực Giờ Sinh từ Cung Mệnh, Thân, Tật Ách
   */
  function get3DiemNghiemLy(chart) {
    if (!chart || !chart.cung) {
      return {
        dienMao: 'Diện mạo đoan chính đôn hậu, ngũ quan hài hòa, phong thái đĩnh đạc tự nhiên.',
        tinhCach: 'Nội tâm kiên định, hành sự chu toàn thực tế, coi trọng danh dự và uy tín cá nhân.',
        theChat: 'Cơ thể nhìn chung lành tính; chú ý hệ tiêu hóa và giữ ấm đường hô hấp khi thời tiết chuyển mùa.'
      };
    }

    // 1. Diện mạo theo Cung Mệnh
    var cungMenh = chart.cung.find(function (c) { return c.chiIndex === chart.cungMenh.chiIndex; });
    var ctMenhNames = (cungMenh && cungMenh.chinhTinh) ? cungMenh.chinhTinh.map(function (s) { return s.name; }) : [];
    var dienMao = '';
    if (ctMenhNames.includes('Thái Dương')) {
      dienMao = 'Gương mặt đầy đặn hoặc vuông vắn, vầng trán cao rộng, mắt sáng có thần khí; diện mạo quang minh đường bệ, tác phong đĩnh đạc, tiếng nói vang rõ ấm áp.';
    } else if (ctMenhNames.includes('Tử Vi') || ctMenhNames.includes('Thiên Phủ')) {
      dienMao = 'Cốt cách sang trọng đôn hậu, ngũ quan cân đối hài hòa, phong thái uy nghi điềm đạm, toát lên khí chất lãnh đạo và tạo được sự tin cậy tự nhiên.';
    } else if (ctMenhNames.includes('Vũ Khúc')) {
      dienMao = 'Thân hình rắn chắc gân guốc, khuôn mặt chữ điền góc cạnh cương nghị, ánh mắt thẳng thắn dứt khoát, tác phong nhanh nhẹn và kiên trì.';
    } else if (ctMenhNames.includes('Thiên Cơ')) {
      dienMao = 'Dáng người thanh nhã mảnh mai, bước đi linh hoạt, trán rộng thông tuệ, ánh mắt lanh lợi tinh anh, phong thái trí thức nho nhã.';
    } else if (ctMenhNames.includes('Thiên Đồng')) {
      dienMao = 'Khuôn mặt tròn trịa phúc hậu, nụ cười tươi tắn hiền hòa dễ gần, diện mạo trẻ trung hơn tuổi thực, dáng dấp đẫm đà có duyên.';
    } else if (ctMenhNames.includes('Liêm Trinh')) {
      dienMao = 'Lông mày rậm, ánh mắt sắc sảo có uy, sống mũi thẳng, nét mặt cương trực bộc trực, thần thái tự tin quả quyết.';
    } else if (ctMenhNames.includes('Thái Âm')) {
      dienMao = 'Khuôn mặt thanh tú, da dẻ trắng sáng mềm mại, ánh mắt sâu lắng đa cảm, phong thái đoan trang điềm đạm, giọng nói nhẹ nhàng truyền cảm.';
    } else if (ctMenhNames.includes('Tham Lang')) {
      dienMao = 'Thân hình cao ráo cân đối hoặc nở nang, ánh mắt ướt đa tình thu hút, nụ cười tươi hoạt bát, phong thái duyên dáng dễ chiếm cảm tình người đối diện.';
    } else if (ctMenhNames.includes('Cự Môn')) {
      dienMao = 'Khuôn mặt sắc nét, khóe miệng rõ ràng, ánh mắt quan sát nhanh nhạy, biểu cảm sinh động, ăn nói lưu loát và phản ứng ngôn ngữ rất nhạy.';
    } else if (ctMenhNames.includes('Thiên Tướng')) {
      dienMao = 'Tướng mạo tuấn tú khôi ngô, dáng đứng thẳng thắn bệ vệ, phong thái hòa nhã đàng hoàng, khí chất hào hoa cương trực.';
    } else if (ctMenhNames.includes('Thiên Lương')) {
      dienMao = 'Dáng người cao ráo thanh mảnh, phong thái đạo mạo chững chạc như bậc thầy, cử chỉ từ tốn nho nhã, toát lên vẻ nhân hậu hướng thiện.';
    } else if (ctMenhNames.includes('Thất Sát')) {
      dienMao = 'Gương mặt góc cạnh uy nghiêm, ánh mắt sắc bén cương nghị, tác phong nhanh thoăn thoắt dũng cảm, khí phách kiên cường độc lập.';
    } else if (ctMenhNames.includes('Phá Quân')) {
      dienMao = 'Thân hình chắc nịch, lưng hơi dày, bước đi vội vã quyết đoán, nét mặt cương cường phong trần, phong thái phóng khoáng ngang tàng.';
    } else {
      dienMao = 'Dáng người thanh thoát, ngũ quan thanh tú nhã nhặn, thần thái linh hoạt biến hóa theo hoàn cảnh, dễ hòa nhập và thích nghi cao với mọi môi trường.';
    }

    // 2. Tính cách theo Thân cư
    var tinhCach = '';
    var thanCu = (chart.thanCu || '').toLowerCase();
    if (thanCu.includes('tài bạch')) {
      tinhCach = 'Hành động thực tế, coi trọng tự chủ tài chính; kiếm tiền bằng năng lực chuyên môn và uy tín; thích đầu tư tích lũy an toàn, tính cách rộng rãi hay giúp đỡ người khác.';
    } else if (thanCu.includes('quan lộc')) {
      tinhCach = 'Rất có chí tiến thủ, say mê công việc; luôn đặt trách nhiệm, danh dự và vị thế xã hội lên hàng đầu; sẵn sàng cống hiến để đạt đỉnh cao sự nghiệp.';
    } else if (thanCu.includes('phúc đức')) {
      tinhCach = 'Coi trọng đời sống tinh thần và cội nguồn gia tộc; thích sự an nhiên tĩnh tại, nhạy cảm sâu sắc, thường hay trăn trở suy nghĩ xa xôi.';
    } else if (thanCu.includes('phu thê')) {
      tinhCach = 'Sống nặng tình cảm, coi trọng hôn nhân gia đình; người bạn đời có sức ảnh hưởng rất lớn đến mọi quyết định và vận mệnh cuộc đời.';
    } else if (thanCu.includes('thiên di')) {
      tinhCach = 'Tính cách hướng ngoại, thích xê dịch giao thiệp; cuộc đời dễ gắn bó với nơi xa, càng ra ngoài xã hội càng phát huy được năng lực.';
    } else {
      tinhCach = 'Tính tự lập rất cao, lập trường kiên định khó lay chuyển; tin vào năng lực bản thân, tự lực cánh sinh gầy dựng cơ nghiệp.';
    }

    // 3. Thể chất & Dấu hiệu sẹo theo Cung Tật Ách
    var cungTat = chart.cung.find(function (c) { return c.cungName.includes('TẬT ÁCH'); });
    var tatStars = [];
    if (cungTat) {
      if (cungTat.chinhTinh) cungTat.chinhTinh.forEach(function (s) { tatStars.push(s.name); });
      if (cungTat.phuTinhLeft) cungTat.phuTinhLeft.forEach(function (s) { tatStars.push(s.name); });
      if (cungTat.phuTinhRight) cungTat.phuTinhRight.forEach(function (s) { tatStars.push(s.name); });
    }
    var theChat = '';
    if (tatStars.includes('Liêm Trinh') || tatStars.includes('Thiên Tướng')) {
      theChat = 'Dễ có vết sẹo nhỏ hoặc vết bớt/dấu vết ở đầu, mặt hoặc tay chân từ nhỏ; hệ tiêu hóa nhạy cảm, dễ bị nhiệt miệng, nóng trong hoặc mỏi vai gáy khi thức khuya căng thẳng.';
    } else if (tatStars.includes('Cự Môn') || tatStars.includes('Hỏa Tinh') || tatStars.includes('Hỏa tinh')) {
      theChat = 'Hệ hô hấp, cổ họng hoặc răng miệng nhạy cảm; dễ bị viêm họng, nhiệt miệng hoặc khó chịu dạ dày khi ăn uống thất thường.';
    } else if (tatStars.includes('Thái Dương')) {
      theChat = 'Cần chú ý thị lực (cận thị, loạn thị hoặc mỏi mắt), huyết áp, giấc ngủ dễ bị chập chờn khi áp lực công việc.';
    } else if (tatStars.includes('Thái Âm')) {
      theChat = 'Khí huyết hoặc hệ bài tiết/thận thủy dễ hư hao nếu sinh hoạt không điều độ; cơ thể nhạy cảm với thời tiết lạnh ẩm.';
    } else if (tatStars.includes('Vũ Khúc') || tatStars.includes('Thất Sát')) {
      theChat = 'Thường có sẹo xước do va chạm kim loại, vật nhọn hoặc chấn thương khi vận động từ thuở thiếu niên; hệ hô hấp phổi nhạy cảm.';
    } else if (tatStars.includes('Thiên Cơ') || tatStars.includes('Đà La') || tatStars.includes('Đà la')) {
      theChat = 'Hệ thần kinh nhạy cảm, dễ mất ngủ, hay suy nghĩ nhiều dẫn đến đau nửa đầu; chú ý xương khớp gân cốt cổ vai.';
    } else if (tatStars.includes('Thiên Đồng')) {
      theChat = 'Hệ tiêu hóa đường ruột hoặc bàng quang dễ bị lạnh bụng; tạng người dễ tăng cân nếu không duy trì vận động đều đặn.';
    } else if (tatStars.includes('Thiên Lương')) {
      theChat = 'Sức đề kháng nhìn chung lành tính, nếu có bệnh thường gặp thầy gặp thuốc tai qua nạn khỏi; chú ý tỳ vị và giấc ngủ.';
    } else {
      theChat = 'Cơ thể dễ có dấu vết sẹo nhỏ hoặc nốt ruồi kín ở tay chân lưng; hệ tiêu hóa và hô hấp cần giữ ấm và ăn uống thanh đạm.';
    }

    return {
      dienMao: dienMao,
      tinhCach: tinhCach,
      theChat: theChat
    };
  }

  // ==========================================================================
  // 7. TRACE MODE: engine.trace(input)
  // ==========================================================================

  function trace(input) {
    var opt = {};
    if (typeof input === 'string') {
      var parts = input.trim().split(/\s+/);
      var dateParts = (parts[0] || '').split('-');
      var timeParts = (parts[1] || '00:00').split(':');
      opt.nam = parseInt(dateParts[0], 10);
      opt.thang = parseInt(dateParts[1], 10);
      opt.ngay = parseInt(dateParts[2], 10);
      opt.gio = parseInt(timeParts[0], 10);
      opt.phut = parseInt(timeParts[1], 10);
      opt.gioiTinh = parts[2] || 'nam';
      opt.isLunar = (parts[3] === 'lunar' || parts[3] === 'am');
      opt.leap = (parts[4] === 'leap');
    } else if (typeof input === 'object' && input !== null) {
      opt = input;
    }

    var chart = lapLaSo(opt);
    var isNam = (chart.gioiTinh || 'nam').toLowerCase() === 'nam';
    var isNamDuong = (chart.canNamIdx % 2 === 0);
    var isThuan = (isNamDuong && isNam) || (!isNamDuong && !isNam);

    var rows = [
      { step: '1. Âm lịch', detail: chart.lunarDate.day + '/' + chart.lunarDate.month + '/' + chart.lunarDate.year + (chart.lunarDate.leap ? ' (Nhuận)' : '') },
      { step: '2. Can Chi Tứ Trụ', detail: 'Năm: ' + chart.canChiNam + ' | Tháng: ' + chart.canChiThang + ' | Ngày: ' + chart.canChiNgay + ' | Giờ: ' + chart.canChiGio },
      { step: '3. Âm Dương & Chiều', detail: (isNamDuong ? 'Dương' : 'Âm') + ' ' + (isNam ? 'Nam' : 'Nữ') + ' -> Chiều: ' + (isThuan ? 'Thuận' : 'Nghịch') },
      { step: '4. Cung Mệnh & Thân', detail: 'Mệnh tại ' + chart.cungMenh.chi + ' (' + chart.cungMenh.chiIndex + ') | Thân tại ' + chart.cungThan.chi + ' (' + chart.cungThan.chiIndex + ')' },
      { step: '5. Ngũ Hành Cục', detail: chart.cucInfo.name + ' (' + chart.cucInfo.value + ')' },
      { step: '6. Vị trí Tử Vi & Thiên Phủ', detail: 'Tử Vi: ' + DIA_CHI[chart.tuViPos] + ' (' + chart.tuViPos + ') | Thiên Phủ: ' + DIA_CHI[chart.thienPhuPos] + ' (' + chart.thienPhuPos + ')' },
      { step: '7. 14 Chính Tinh', detail: chart.cung.map(function(c) { return c.chi + ': ' + (c.chinhTinh.map(function(s) { return s.name; }).join(',') || '-'); }).join(' | ') },
      { step: '8. Tứ Hóa', detail: Object.keys(TU_HOA_TABLE[chart.canNamIdx]).map(function(k) { return k + '->' + TU_HOA_TABLE[chart.canNamIdx][k]; }).join(', ') },
      { step: '9. Vòng Tràng Sinh', detail: chart.cung.map(function(c) { return c.chi + ': ' + c.trangSinh; }).join(' | ') },
      { step: '10. Vòng Thái Tuế', detail: chart.cung.map(function(c) {
          var tt = c.phuTinhLeft.concat(c.phuTinhRight).find(function(s) { return VONG_THAI_TUE.indexOf(s.name) !== -1; });
          return c.chi + ': ' + (tt ? tt.name : '-');
        }).join(' | ') },
      { step: '11. Vòng Lộc Tồn (Bác Sỹ)', detail: 'Lộc Tồn tại ' + DIA_CHI[LOC_TON_POS[chart.canNamIdx]] },
      { step: '12. Tuần & Triệt', detail: 'Tuần: [' + chart.tuan.map(function(i) { return DIA_CHI[i]; }).join(', ') + '] | Triệt: [' + chart.triet.map(function(i) { return DIA_CHI[i]; }).join(', ') + ']' }
    ];

    var conventions = [
      'Quy tắc giờ Tý: Sinh từ 23h00 đến 00h59 thuộc giờ Tý của ngày chọn (không tự động đổi sang ngày hôm sau).',
      'Quy tắc tháng Nhuận: Tra cứu theo ngày tháng âm lịch thực tế tương ứng với lịch thiên văn Việt Nam (UTC+7).'
    ];

    return {
      chart: chart,
      traceRows: rows,
      conventions: conventions
    };
  }

  // ==========================================================================
  // EXPORT GLOBAL API
  // ==========================================================================

  var TuViEngineObj = {
    convertSolar2Lunar: convertSolar2Lunar,
    getCanChiNam: getCanChiNam,
    getCanChiThang: getCanChiThang,
    getCanChiNgay: getCanChiNgay,
    getCanChiGio: getCanChiGio,
    getNapAm: getNapAm,
    getCungMenh: getCungMenh,
    getCungThan: getCungThan,
    getCuc: getCuc,
    lapLaSo: lapLaSo,
    trace: trace,
    THIEN_CAN: THIEN_CAN,
    DIA_CHI: DIA_CHI,
    STAR_ELEMENTS: STAR_ELEMENTS,
    VONG_THAI_TUE: VONG_THAI_TUE,
    VONG_TRANG_SINH_NAMES: VONG_TRANG_SINH_NAMES,
    TU_HOA_TABLE: TU_HOA_TABLE
  };

  global.TuViEngine = TuViEngineObj;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = TuViEngineObj;
  }

})(typeof window !== 'undefined' ? window : this);
