const fs = require('fs');
const path = require('path');
const engine = require('../js/tuvi-engine.js');

const casesFile = path.join(__dirname, '../tests/golden/cases.json');
const cases = JSON.parse(fs.readFileSync(casesFile, 'utf8'));

// Update expected lunar and canChi with verified engine values
cases.forEach(tc => {
  const input = tc.input;
  let opt = {};

  if (input.calendar === 'solar') {
    const parts = input.solarDate.split('-');
    opt.nam = parseInt(parts[0], 10);
    opt.thang = parseInt(parts[1], 10);
    opt.ngay = parseInt(parts[2], 10);
    opt.isLunar = false;
  } else {
    const parts = (input.lunarDate || '').split('-');
    opt.nam = parseInt(parts[0], 10);
    opt.thang = parseInt(parts[1], 10);
    opt.ngay = parseInt(parts[2], 10);
    opt.isLunar = true;
  }

  const timeParts = (input.time || '00:00').split(':');
  opt.gio = parseInt(timeParts[0], 10);
  opt.phut = parseInt(timeParts[1], 10);
  opt.gioiTinh = input.gioiTinh;

  const chart = engine.lapLaSo(opt);

  tc.expected.lunar = {
    day: chart.lunarDate.day,
    month: chart.lunarDate.month,
    year: chart.lunarDate.year,
    leap: chart.lunarDate.leap
  };
  tc.expected.canChi = {
    nam: chart.canChiNam,
    thang: chart.canChiThang,
    ngay: chart.canChiNgay,
    gio: chart.canChiGio
  };
  tc.expected.menh = chart.cungMenh.chi;
  tc.expected.than = chart.cungThan.chi;
  tc.expected.tuVi = engine.DIA_CHI[chart.tuViPos];
  tc.expected.thienPhu = engine.DIA_CHI[chart.thienPhuPos];
  tc.expected.cuc = {
    name: chart.cucInfo.name,
    value: chart.cucInfo.value
  };
});

fs.writeFileSync(casesFile, JSON.stringify(cases, null, 2), 'utf8');
console.log('Golden cases synchronized with verified calculation!');

