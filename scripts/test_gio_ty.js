const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('js/tuvi-engine.js', 'utf8');
const context = { console };
vm.createContext(context);
vm.runInContext(code, context);
const TuViEngine = context.TuViEngine || global.TuViEngine;

function getHourChiIndex(hour, minute) {
  if (hour === 23 || hour === 0) return 0;
  return Math.floor((hour + 1) / 2) % 12;
}

const testTimes = [
  { hour: 22, minute: 59, label: '22:59' },
  { hour: 23, minute: 0,  label: '23:00' },
  { hour: 23, minute: 30, label: '23:30' },
  { hour: 0,  minute: 0,  label: '00:00' },
  { hour: 0,  minute: 30, label: '00:30' },
  { hour: 1,  minute: 0,  label: '01:00' }
];

console.log('=== TEST GIỜ TÝ & CAN CHI GIỜ ===\n');

['Dương lịch (Solar)', 'Âm lịch (Lunar)'].forEach(calType => {
  const isLunar = calType.includes('Lunar');
  console.log(`--- Kiểm tra với ${calType}: Ngày 10/04/2002 ---`);
  testTimes.forEach(t => {
    const gioIndex = getHourChiIndex(t.hour, t.minute);
    const gioPhutText = `${t.hour} giờ ${t.minute < 10 ? '0' + t.minute : t.minute} phút`;
    const laso = TuViEngine.lapLaSo(10, 4, 2002, gioIndex, 'nam', isLunar, gioPhutText);
    
    console.log(
      `Giờ ${t.label.padEnd(5)} -> ` +
      `gioIndex: ${gioIndex} (${TuViEngine.DIA_CHI[gioIndex]}) | ` +
      `Can Chi Ngày: ${laso.canChiNgay} | ` +
      `Can Chi Giờ: ${laso.canChiGio.padEnd(10)} | ` +
      `Cung Mệnh tại: ${laso.cungMenh.chi} | ` +
      `Cung Thân tại: ${laso.cungThan.chi}`
    );
  });
  console.log('');
});
