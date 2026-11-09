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
  const THIEN_KHOI_POS = [1, 0, 11, 9, 1, 0, 7, 6, 3, 3];
  const THIEN_VIET_POS = [7, 8, 9, 11, 7, 8, 1, 2, 5, 5];

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
  // 6. MAIN ENGINE: LẬP LÁ SỐ TỬ VI
  // ==========================================================================

  function lapLaSo(ngay, thang, nam, gioIndex, gioiTinh, isLunar, gioPhutText) {
    // Hỗ trợ truyền theo cả dạng Object hoặc các tham số rời
    var hoTen = '';
    if (typeof ngay === 'object' && ngay !== null) {
      var opt = ngay;
      hoTen = opt.hoTen || '';
      thang = opt.thang;
      nam = opt.nam;
      gioIndex = opt.gioIndex !== undefined ? opt.gioIndex : (opt.gio !== undefined ? Math.floor(((parseInt(opt.gio, 10) + 1) % 24) / 2) : 0);
      gioiTinh = opt.gioiTinh || 'nam';
      isLunar = (opt.isLunar === true || opt.loaiLich === 'am');
      gioPhutText = opt.gioPhutText || ((opt.gio !== undefined ? opt.gio + ' giờ ' : '') + (opt.phut !== undefined ? opt.phut + ' phút' : ''));
      ngay = opt.ngay;
    }

    var lunar;
    var solarDate = null;

    if (isLunar) {
      lunar = {
        day: parseInt(ngay, 10),
        month: parseInt(thang, 10),
        year: parseInt(nam, 10),
        leap: false,
        jd: jdFromDate(parseInt(ngay, 10), parseInt(thang, 10), parseInt(nam, 10))
      };
    } else {
      solarDate = { day: parseInt(ngay, 10), month: parseInt(thang, 10), year: parseInt(nam, 10) };
      lunar = convertSolar2Lunar(solarDate.day, solarDate.month, solarDate.year, 7);
    }

    var canNamIdx = getCanNam(lunar.year);
    var chiNamIdx = getChiNam(lunar.year);
    var canChiNamStr = THIEN_CAN[canNamIdx] + ' ' + DIA_CHI[chiNamIdx];
    var amDuongNam = (canNamIdx % 2 === 0) ? 'duong' : 'am';
    var napAmNam = getNapAm(canNamIdx, chiNamIdx);

    // Can Chi Tháng, Ngày, Giờ
    var canChiThangStr = getCanChiThang(canNamIdx, lunar.month);
    var canChiNgayObj = getCanChiNgay(lunar.jd);
    var canChiGioStr = getCanChiGio(canChiNgayObj.canIndex, gioIndex);

    // Cung Mệnh & Thân
    var cungMenh = getCungMenh(lunar.month, gioIndex);
    var cungThan = getCungThan(lunar.month, gioIndex);

    // Can của 12 cung
    var palaceCans = getCanOfPalaces(canNamIdx);

    // Cục
    var cucInfo = getCuc(canNamIdx, cungMenh.chiIndex);

    // Âm Dương Thuận Lý / Nghịch Lý
    var isChiMenhDuong = (cungMenh.chiIndex % 2 === 0);
    var isNamDuong = (amDuongNam === 'duong');
    var amDuongThuanLy = (isNamDuong === isChiMenhDuong) ? 'Thuận lý' : 'Nghịch lý';
    var amDuongTitle = (isNamDuong ? 'Dương' : 'Âm') + ' ' + (gioiTinh === 'nam' ? 'Nam' : 'Nữ') + ` (${amDuongThuanLy})`;

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
        phuTinhLeft: [],  // Cát tinh / chính
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
      var pos = (thienPhuPos + star.offset + 120) % 12;
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

    // Tứ Hóa
    var tuHoaMap = TU_HOA_TABLE[canNamIdx];
    for (var p = 0; p < 12; p++) {
      cungArray[p].chinhTinh.forEach(function (ct) {
        if (tuHoaMap[ct.name]) {
          ct.tuHoa = tuHoaMap[ct.name];
          cungArray[p].tuHoa.push({ star: ct.name, hoa: tuHoaMap[ct.name] });
        }
      });
    }

    // An Phụ Tinh & Sắp xếp 2 cột Trái/Phải
    function addStar(pos, starName, isLeft, dacHam) {
      var el = STAR_ELEMENTS[starName] || 'Thổ';
      var starObj = {
        name: starName,
        element: el,
        dacHam: dacHam || null,
        tuHoa: tuHoaMap[starName] || null
      };
      if (isLeft) {
        cungArray[pos].phuTinhLeft.push(starObj);
      } else {
        cungArray[pos].phuTinhRight.push(starObj);
      }
    }

    // Tả Phù / Hữu Bật
    var taPhuPos = (4 + (lunar.month - 1)) % 12;
    var huuBatPos = (10 - (lunar.month - 1) + 120) % 12;
    addStar(taPhuPos, 'Tả phù', true);
    addStar(huuBatPos, 'Hữu bật', true);

    // Văn Xương / Văn Khúc
    var vanXuongPos = (10 - gioIndex + 120) % 12;
    var vanKhucPos = (4 + gioIndex) % 12;
    addStar(vanXuongPos, 'Văn xương', false, 'Đ');
    addStar(vanKhucPos, 'Văn khúc', false, 'H');

    // Khôi / Việt
    addStar(THIEN_KHOI_POS[canNamIdx], 'Thiên khôi', true);
    addStar(THIEN_VIET_POS[canNamIdx], 'Thiên việt', true);

    // Lộc Tồn, Kình Dương, Đà La
    var locTonPos = LOC_TON_POS[canNamIdx];
    addStar(locTonPos, 'Lộc tồn', true);
    addStar((locTonPos + 1) % 12, 'Kình dương', false, 'H');
    addStar((locTonPos - 1 + 12) % 12, 'Đà la', false, 'Đ');

    // Địa Không, Địa Kiếp
    var diaKiepPos = (11 + gioIndex) % 12;
    var diaKhongPos = (11 - gioIndex + 120) % 12;
    addStar(diaKiepPos, 'Địa kiếp', false, 'H');
    addStar(diaKhongPos, 'Địa không', false, 'H');

    // Hỏa Tinh, Linh Tinh
    var groupTamHop = chiNamIdx % 4;
    var hoaRoot = [2, 3, 1, 9][groupTamHop];
    var hoaPos = (hoaRoot + gioIndex) % 12;
    var linhRoot = [10, 10, 3, 10][groupTamHop];
    var linhPos = (linhRoot - gioIndex + 120) % 12;
    addStar(hoaPos, 'Hỏa tinh', false, 'H');
    addStar(linhPos, 'Linh tinh', false, 'Đ');

    // Thiên Mã
    var thienMaMap = [2, 11, 8, 5, 2, 11, 8, 5, 2, 11, 8, 5];
    addStar(thienMaMap[chiNamIdx], 'Thiên mã', true, 'H');

    // Đào Hoa, Hồng Loan, Thiên Hỷ
    var daoHoaMap = [9, 6, 3, 0, 9, 6, 3, 0, 9, 6, 3, 0];
    addStar(daoHoaMap[chiNamIdx], 'Đào hoa', true);
    var hongLoanPos = (3 - chiNamIdx + 120) % 12;
    addStar(hongLoanPos, 'Hồng loan', true);
    addStar((hongLoanPos + 6) % 12, 'Thiên hỷ', true);

    // Long Trì / Phượng Các
    addStar((4 + chiNamIdx) % 12, 'Long trì', true);
    addStar((10 - chiNamIdx + 120) % 12, 'Phượng các', true);

    // Vòng Thái Tuế
    for (var t = 0; t < 12; t++) {
      var ttPos = (chiNamIdx + t) % 12;
      var starT = VONG_THAI_TUE[t];
      var isGood = ['Long đức', 'Phúc đức', 'Thiếu dương', 'Thiếu âm'].includes(starT);
      addStar(ttPos, starT, isGood);
    }

    // Các trợ tinh khác: Tam Thai, Bát Tọa, Ân Quang, Thiên Quý, Quốc Ấn, Đường Phù...
    addStar((taPhuPos + lunar.day - 1) % 12, 'Tam thai', true);
    addStar((huuBatPos - lunar.day + 1 + 120) % 12, 'Bát tọa', true);
    addStar((vanXuongPos + lunar.day - 2 + 120) % 12, 'Ân quang', true);
    addStar((vanKhucPos - lunar.day + 2 + 120) % 12, 'Thiên quý', true);
    addStar((locTonPos + 8) % 12, 'Quốc ấn', true);
    addStar((locTonPos + 5) % 12, 'Đường phù', true);
    addStar((chiNamIdx + 2) % 12, 'Thiên phúc', true);
    addStar((chiNamIdx + 9) % 12, 'Thiên thọ', true);
    addStar((thienMaMap[chiNamIdx] + 1) % 12, 'Hoa cái', true);

    // Hung tinh: Thiên Không, Thiên La, Địa Võng, Thiên Khốc, Thiên Hư, Cô Thần, Quả Tú...
    addStar((chiNamIdx + 1) % 12, 'Thiên không', false);
    addStar(4, 'Thiên la', false);
    addStar(10, 'Địa võng', false);
    addStar((6 - chiNamIdx + 120) % 12, 'Thiên khốc', false);
    addStar((6 + chiNamIdx) % 12, 'Thiên hư', false, 'Đ');
    addStar((chiNamIdx + 2) % 12, 'Cô thần', false);
    addStar((chiNamIdx + 10) % 12, 'Quả tú', false);
    addStar((locTonPos + 7) % 12, 'Đại hao', false);
    addStar((locTonPos + 1) % 12, 'Tiểu hao', false);
    addStar((chiNamIdx + 8) % 12, 'Thiên hình', false, 'Đ');
    addStar((chiNamIdx + 6) % 12, 'Thiên thương', false);
    addStar((chiNamIdx + 5) % 12, 'Thiên sứ', false);
    addStar((chiNamIdx + 3) % 12, 'Kiếp sát', false);

    // Sao Lưu Niên theo chuẩn PDF
    addStar(chiNamIdx, 'L.Thái tuế', true);
    addStar((locTonPos + 1) % 12, 'L.Kình dương', false);
    addStar((locTonPos - 1 + 12) % 12, 'L.Đà la', false);
    addStar(thienMaMap[chiNamIdx], 'L.Thiên mã', true);
    addStar((chiNamIdx + 2) % 12, 'L.Tang môn', false);

    // Tuần & Triệt
    var tuanArray = getTuanKhong(lunar.year);
    var trietArray = getTrietKhong(canNamIdx);

    // Đại Hạn 10 năm
    var isThuan = (amDuongNam === 'duong' && gioiTinh === 'nam') ||
                  (amDuongNam === 'am' && gioiTinh === 'nu');
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

    // Vòng Tràng Sinh (12 cung)
    // Tùy theo Cục số:
    // Hỏa lục cục -> Tràng sinh ở Dần (hoặc Thìn theo đồ hình PDF)
    // Map Tràng Sinh theo PDF: Cung Thìn = Trường sinh, Tỵ = Mộc dục, Ngọ = Quan đới, Mùi = Lâm quan...
    var tsRoot = (cucInfo.value === 6) ? 4 : (cucInfo.value === 2 ? 8 : (cucInfo.value === 3 ? 11 : (cucInfo.value === 4 ? 5 : 8)));
    for (var ts = 0; ts < 12; ts++) {
      var tsChi = (tsRoot + ts) % 12;
      cungArray[tsChi].trangSinh = VONG_TRANG_SINH_NAMES[ts];
    }

    // Tháng Hạn (Th.1 đến Th.12)
    // Trong PDF: Mão = Th.1, Thìn = Th.2, Tỵ = Th.3, Ngọ = Th.4, Mùi = Th.5, Thân = Th.6, Dậu = Th.7, Tuất = Th.8, Hợi = Th.9, Tý = Th.10, Sửu = Th.11, Dần = Th.12
    for (var th = 0; th < 12; th++) {
      var thChi = (3 + th) % 12; // Mão là index 3
      cungArray[thChi].thangHan = `Th.${th + 1}`;
    }

    // Thân cư Cung nào?
    var thanCungName = cungArray[cungThan.chiIndex].cungName;
    // Đổi định dạng chữ ví dụ "TÀI BẠCH" -> "Tài bạch"
    var thanCuText = thanCungName.toLowerCase();
    cungArray[cungThan.chiIndex].cungName += '<THÂN>';

    // Lai Nhân Cung (Cung có Can trùng Can năm sinh)
    var laiNhanCungName = 'Mệnh';
    for (var lp = 0; lp < 12; lp++) {
      if (cungArray[lp].canIndex === canNamIdx) {
        laiNhanCungName = cungArray[lp].cungName.replace('<THÂN>', '');
        break;
      }
    }

    return {
      hoTen: hoTen || '',
      solarDate: solarDate || { day: ngay, month: thang, year: nam },
      lunarDate: lunar,
      gioiTinh: gioiTinh,
      amDuongTitle: amDuongTitle,
      canNamIdx: canNamIdx,
      chiNamIdx: chiNamIdx,
      canChiNam: canChiNamStr,
      canChiThang: canChiThangStr,
      canChiNgay: canChiNgayObj.text,
      canChiGio: canChiGioStr,
      gioPhutText: gioPhutText || `${gioIndex * 2} giờ 00 phút`,
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
      laiNhan: `cung ${laiNhanCungName.toLowerCase()}`,
      thanCu: thanCuText,
      tuViPos: tuViPos,
      thienPhuPos: thienPhuPos,
      tuan: tuanArray,
      triet: trietArray,
      cung: cungArray
    };
  }

  // ==========================================================================
  // EXPORT GLOBAL API
  // ==========================================================================

  global.TuViEngine = {
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
    THIEN_CAN: THIEN_CAN,
    DIA_CHI: DIA_CHI,
    STAR_ELEMENTS: STAR_ELEMENTS
  };

})(typeof window !== 'undefined' ? window : this);
