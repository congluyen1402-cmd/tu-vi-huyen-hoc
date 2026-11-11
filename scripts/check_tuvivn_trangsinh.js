const fs = require('fs');
const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

const tsNames = ['Trường Sinh', 'Mộc Dục', 'Quan Đới', 'Lâm Quan', 'Đế Vượng', 'Suy', 'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'];

console.log('--- VÒNG TRÀNG SINH TRONG TUVI.VN ---');
tsNames.forEach(ts => {
  let idx = 0;
  while ((idx = html.indexOf(ts, idx)) !== -1) {
    console.log(`${ts} at index ${idx}: snippet:`, html.slice(idx - 100, idx + 100).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
    idx += ts.length;
  }
});

