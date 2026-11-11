const TuViEngine = require('../js/tuvi-engine.js');
try {
  const chart = TuViEngine.lapLaSo(10, 4, 2002, 10, 'nam', false, '19:15', 2026);
  console.log('Success! Cung 5 tieuHan:', chart.cungArray[5].tieuHan, 'thangHan:', chart.cungArray[5].thangHan);
  for (let i = 0; i < 12; i++) {
    console.log(`i=${i} (${chart.cungArray[i].chi}): tieuHan=${chart.cungArray[i].tieuHan} thangHan=${chart.cungArray[i].thangHan}`);
  }
} catch (e) {
  console.error(e);
}
