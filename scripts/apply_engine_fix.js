const fs = require('fs');
const path = require('path');

const engineFile = path.join(__dirname, '../js/tuvi-engine.js');
let content = fs.readFileSync(engineFile, 'utf8');

// Find the section from `function getTrietKhong` to the end
const marker = '  function getTrietKhong(canNam) {';
const splitIdx = content.indexOf(marker);
if (splitIdx === -1) {
  console.error('Marker not found!');
  process.exit(1);
}

const topPart = content.slice(0, splitIdx);

const newBottomPart = `  function getTrietKhong(canNam) {
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

  function lapLaSo(ngay, thang, nam, gioIndex, gioiTinh, isLunar, gioPhutText) {
    var hoTen = '';
    if (typeof ngay === 'object' && ngay !== null) {
      var opt = ngay;
      hoTen = opt.hoTen || '';
      thang = opt.thang;
      nam = opt.nam;
      gioIndex = opt.gioIndex !== undefined ? opt.gioIndex : (opt.gio !== undefined ? (opt.gio === 23 || opt.gio === 0 ? 0 : Math.floor((parseInt(opt.gio, 10) + 1) / 2)) : 0);
      gioiTinh = opt.gioiTinh || 'nam';
      isLunar = (opt.isLunar === true || opt.loaiLich === 'am');
      gioPhutText = opt.gioPhutText || ((opt.gio !== undefined ? opt.gio + ' giờ ' : '') + (opt.phut !== undefined ? opt.phut + ' phút' : ''));
      ngay = opt.ngay;
    }

    // Chuẩn hóa giới tính: hỗ trợ 'nam', 'nu', 'Nam', 'Nữ', '1', '0'
    var rawGender = (gioiTinh || 'nam').toString().trim().toLowerCase();
    var isNam = (rawGender === 'nam' || rawGender === 'male' || rawGender === '1' || rawGender === 'true');
    var genderStr = isNam ? 'Nam' : 'Nữ';

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
    function addStar(pos, starName, isLeft, dacHam) {
      var el = STAR_ELEMENTS[starName] || 'Thổ';
      var starObj = {
        name: starName,
        element: el,
        dacHam: dacHam || null,
        tuHoa: null
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
    var mIdx = lunar.month - 1;
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
    var vanTinhMap = [5, 6, 8, 9, 8, 9, 11, 0, 9, 10];
    var thienTruMap = [5, 6, 0, 5, 6, 8, 2, 6, 9, 10];
    addStar(thienQuanMap[canNamIdx], 'Thiên quan', true);
    addStar(thienPhucMap[canNamIdx], 'Thiên phúc', true);
    addStar(luuHaMap[canNamIdx], 'Lưu hà', false);
    addStar(vanTinhMap[canNamIdx], 'Văn tinh', true);
    addStar(thienTruMap[canNamIdx], 'Thiên trù', true);

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
    addStar((daoHoaMap[chiNamIdx] + 1) % 12, 'Hoa cái', true);

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

    // 10. Tứ Hóa (Áp dụng cho CẢ Chính Tinh & Phụ Tinh)
    var tuHoaMap = TU_HOA_TABLE[canNamIdx];
    for (var p = 0; p < 12; p++) {
      cungArray[p].chinhTinh.forEach(function (ct) {
        if (tuHoaMap[ct.name]) {
          ct.tuHoa = tuHoaMap[ct.name];
          cungArray[p].tuHoa.push({ star: ct.name, hoa: tuHoaMap[ct.name] });
        }
      });
      cungArray[p].phuTinhLeft.forEach(function (pt) {
        if (tuHoaMap[pt.name]) {
          pt.tuHoa = tuHoaMap[pt.name];
          cungArray[p].tuHoa.push({ star: pt.name, hoa: tuHoaMap[pt.name] });
        }
      });
      cungArray[p].phuTinhRight.forEach(function (pt) {
        if (tuHoaMap[pt.name]) {
          pt.tuHoa = tuHoaMap[pt.name];
          cungArray[p].tuHoa.push({ star: pt.name, hoa: tuHoaMap[pt.name] });
        }
      });
    }

    // 11. Tuần & Triệt
    var tuanArray = getTuanKhong(lunar.year);
    var trietArray = getTrietKhong(canNamIdx);

    // 12. Đại Hạn 10 năm
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

    // 13. Vòng Tràng Sinh (12 cung: Thủy/Thổ khởi Thân, Mộc khởi Hợi, Kim khởi Tỵ, Hỏa khởi Dần)
    var tsRoots = { 2: 8, 3: 11, 4: 5, 5: 8, 6: 2 };
    var tsRoot = tsRoots[cucInfo.value] !== undefined ? tsRoots[cucInfo.value] : 8;
    for (var ts = 0; ts < 12; ts++) {
      var tsChi = isThuan ? (tsRoot + ts) % 12 : (tsRoot - ts + 120) % 12;
      cungArray[tsChi].trangSinh = VONG_TRANG_SINH_NAMES[ts];
    }

    // 14. Tháng Hạn
    var thRoot = (cungMenh.chiIndex - (lunar.month - 1) + 120) % 12;
    var startThang1 = (thRoot + gioIndex) % 12;
    for (var th = 0; th < 12; th++) {
      var thChi = (startThang1 + th) % 12;
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
      cung: cungArray
    };
  }

  // ==========================================================================
  // 7. TRACE MODE: engine.trace(input)
  // ==========================================================================

  function trace(input) {
    var opt = {};
    if (typeof input === 'string') {
      var parts = input.trim().split(/\\s+/);
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
`;

const fullCode = topPart + newBottomPart;
fs.writeFileSync(engineFile, fullCode, 'utf8');

// Synchronize to public/js/tuvi-engine.js
const publicEngineFile = path.join(__dirname, '../public/js/tuvi-engine.js');
fs.writeFileSync(publicEngineFile, fullCode, 'utf8');

console.log('Successfully updated js/tuvi-engine.js and public/js/tuvi-engine.js');

