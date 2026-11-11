const fs = require('fs');

// Read extracted PDF text from tracuutuvi
const pdfText = fs.readFileSync('scripts/pdf_extracted_text.txt', 'utf8');

console.log('=== VERIFYING PROPOSED ENGINE UPGRADE ===');

// Let's test the 8 sao lưu for 2026 (Bính Ngọ)
const vYear = 2026;
const vCanIdx = (vYear + 6) % 10; // 2 (Bính)
const vChiIdx = (vYear + 8) % 12; // 6 (Ngọ)
const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
const LOC_TON_POS = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0];
const THIEN_MA_POS = [2, 11, 8, 5, 2, 11, 8, 5, 2, 11, 8, 5];

const vLocTonPos = LOC_TON_POS[vCanIdx];
const luuStars = [
  { name: 'L.Thái tuế', pos: vChiIdx },
  { name: 'L.Tang môn', pos: (vChiIdx + 2) % 12 },
  { name: 'L.Bạch hổ', pos: (vChiIdx + 8) % 12 },
  { name: 'L.Lộc tồn', pos: vLocTonPos },
  { name: 'L.Kình dương', pos: (vLocTonPos + 1) % 12 },
  { name: 'L.Đà la', pos: (vLocTonPos - 1 + 12) % 12 },
  { name: 'L.Thiên khốc', pos: (6 - vChiIdx + 120) % 12 },
  { name: 'L.Thiên hư', pos: (6 + vChiIdx) % 12 },
  { name: 'L.Thiên mã', pos: THIEN_MA_POS[vChiIdx] }
];

console.log('Calculated Sao Lưu for 2026:');
luuStars.forEach(s => {
  console.log(`  ${s.name} at ${DIA_CHI[s.pos]} (pos ${s.pos})`);
  // Check if PDF text has this star in this palace
  const inPdf = pdfText.includes(s.name) || pdfText.includes(s.name.replace('L.', 'L. '));
  console.log(`    Found in PDF: ${inPdf}`);
});

// Check Hoa Cái
const chiNamIdx = 6; // Ngọ
const hoaCaiMap = [4, 1, 10, 7, 4, 1, 10, 7, 4, 1, 10, 7];
const hoaCaiPos = hoaCaiMap[chiNamIdx];
console.log(`Hoa Cái at ${DIA_CHI[hoaCaiPos]} (pos ${hoaCaiPos}) -> PDF has Hoa cái: ${pdfText.includes('Hoa cái')}`);

// Check Đẩu Quân
const lunarMonth = 2;
const gioIndex = 10;
const dauQuanPos = (chiNamIdx - (lunarMonth - 1) + gioIndex + 120) % 12;
console.log(`Đẩu Quân at ${DIA_CHI[dauQuanPos]} (pos ${dauQuanPos}) -> PDF has Đẩu quân: ${pdfText.includes('Đẩu quân')}`);

// Check LN Văn Tinh
const canNamIdx = 8; // Nhâm
const lnVanTinhMap = [5, 6, 8, 9, 8, 9, 11, 0, 2, 3];
const lnVanTinhPos = lnVanTinhMap[canNamIdx];
console.log(`LN Văn Tinh at ${DIA_CHI[lnVanTinhPos]} (pos ${lnVanTinhPos}) -> PDF has LN Văn tinh: ${pdfText.includes('LN Văn tinh')}`);

