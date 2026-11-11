const fs = require('fs');
const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

for (let i = 0; i < 12; i++) {
  const kIdx = html.indexOf(`id="KNH${i}"`);
  const block = html.slice(kIdx - 2000, kIdx + 3000);
  const tsNames = ['Trường Sinh', 'Mộc Dục', 'Quan Đới', 'Lâm Quan', 'Đế Vượng', 'Suy', 'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'];
  
  const found = tsNames.filter(ts => {
    // Look for exact match in class="txt-tiny-mid white-space-nowrap">NAME
    const re = new RegExp(`class=["'][^"']*txt-tiny-mid white-space-nowrap[^"']*["']>\\s*${ts}\\b`, 'i');
    return re.test(block);
  });
  console.log(`Chi ${DIA_CHI[i]} (Index ${i}): Tràng sinh = [${found.join(', ')}]`);
}

