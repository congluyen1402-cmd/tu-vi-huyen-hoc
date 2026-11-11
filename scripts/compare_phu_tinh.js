const fs = require('fs');
global.window = global;
require('../js/tuvi-engine.js');
const TuViEngine = global.window.TuViEngine || global.TuViEngine;

const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

function parseTuViVnAllStars(html) {
  const result = [];
  const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  for (let i = 0; i < 12; i++) {
    const kIdx = html.indexOf(`id="KNH${i}"`);
    const block = html.slice(kIdx - 2000, kIdx + 3000);

    const phuMatches = [...block.matchAll(/class=["'][^"']*text-sao-xau-tot[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)];
    const stars = phuMatches.map(m => {
      const clean = m[1].replace(/<[^>]+>/g, '').trim();
      return clean.split('(')[0].trim();
    }).filter(s => s && !s.startsWith('L.') && !s.startsWith('ĐV.')); // filter out lưu sao for now

    result.push({ chiIndex: i, chi: DIA_CHI[i], stars });
  }
  return result;
}

const tvStars = parseTuViVnAllStars(html);
const myChart = TuViEngine.lapLaSo(10, 4, 2002, 10, 'nam', false, '19:30');

console.log('=== SO SÁNH TẤT CẢ PHỤ TINH TỪNG CUNG (Case 1) ===\n');

for (let i = 0; i < 12; i++) {
  const tv = tvStars[i];
  const my = myChart.cung.find(c => c.chiIndex === i);
  const myAllPhu = [...my.phuTinhLeft.map(s => s.name), ...my.phuTinhRight.map(s => s.name)];
  
  // Find stars in TV that are missing in My
  const missingInMy = tv.stars.filter(s => !myAllPhu.some(m => m.toLowerCase() === s.toLowerCase()));
  // Find stars in My that are missing in TV
  const extraInMy = myAllPhu.filter(m => !tv.stars.some(s => s.toLowerCase() === m.toLowerCase()));

  console.log(`[Cung ${my.cungName} tại ${tv.chi}]:`);
  console.log(`  Tuvi.vn (${tv.stars.length} sao): ${tv.stars.join(', ')}`);
  console.log(`  Web mình (${myAllPhu.length} sao): ${myAllPhu.join(', ')}`);
  if (missingInMy.length > 0) console.log(`  -> Thiếu trên web mình: [${missingInMy.join(', ')}]`);
  if (extraInMy.length > 0) console.log(`  -> Web mình có thêm / khác vị trí: [${extraInMy.join(', ')}]`);
  console.log('');
}

