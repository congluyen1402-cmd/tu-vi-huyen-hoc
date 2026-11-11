const fs = require('fs');
global.window = global;
require('../js/tuvi-engine.js');
const TuViEngine = global.window.TuViEngine || global.TuViEngine;

const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

// Parse tuvi.vn data from the HTML
console.log('=== SO SÁNH CHI TIẾT TỪNG CUNG VỚI TUVI.VN ===\n');

// In tuvi.vn, each cung has an ID or structure
// Let's find all cung sections in tuvi.vn
const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

// Let's run our engine with normalized parameters
const myChart = TuViEngine.lapLaSo(10, 4, 2002, 10, 'nam', false, '19:30');

// Function to find stars in tuvi.vn HTML for a given chi
// In tuvi.vn HTML, chi index 0..11 corresponds to Tý..Hợi
// Let's see: in tuvi.vn, id="sao-tot-i" and id="sao-xau-i" exist for i=0..11
for (let i = 0; i < 12; i++) {
  const chi = DIA_CHI[i];
  
  // Extract tuvi.vn block for chi i
  const totIdx = html.indexOf(`id="sao-tot-${i}"`);
  const xauIdx = html.indexOf(`id="sao-xau-${i}"`);
  
  let tuviVnText = '';
  if (totIdx !== -1) {
    // Palace header is right before sao-tot-i
    const preHeader = html.slice(totIdx - 1500, totIdx);
    const postHeader = html.slice(totIdx, (xauIdx !== -1 ? xauIdx + 1500 : totIdx + 2000));
    tuviVnText = (preHeader + '\n' + postHeader).replace(/<[^>]+>/g, '\n')
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.includes('{') && !s.includes('}') && !s.includes('function'));
  }

  const myCung = myChart.cung.find(c => c.chiIndex === i);

  console.log(`----------------------------------------------------------------`);
  console.log(`CUNG [${chi} - Index ${i}]:`);
  console.log(`  > WEB MÌNH:`);
  console.log(`     Tên cung: ${myCung.cungName}`);
  console.log(`     Chính tinh: ${myCung.chinhTinh.map(s => s.name + (s.dacTinh ? ' ('+s.dacTinh+')' : '')).join(', ') || 'Vô chính diệu'}`);
  console.log(`     Cát tinh: ${myCung.phuTinhLeft.map(s => s.name).join(', ')}`);
  console.log(`     Hung tinh: ${myCung.phuTinhRight.map(s => s.name).join(', ')}`);
  console.log(`     Đại hạn: ${myCung.daiHan.startAge} | Tràng sinh: ${myCung.trangSinh}`);
  
  console.log(`  > TUVI.VN (Trích xuất):`);
  // Print meaningful lines from tuvi.vn text
  const cleanTuViLines = tuviVnText.filter(l => 
    !l.includes('class=') && !l.includes('style=') && !l.includes('data-') &&
    l.length < 40 && !l.startsWith('var ') && !l.startsWith('//')
  );
  console.log(`     ` + cleanTuViLines.slice(0, 25).join(' | '));
}

