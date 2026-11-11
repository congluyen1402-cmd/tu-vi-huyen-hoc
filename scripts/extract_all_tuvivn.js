const fs = require('fs');

const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

// Let's find the 12 cung cells in tuvi.vn
// Each cell usually has an id or data-chi or similar
// Let's search for text-dia-chi or cung names
const cungNames = ['MỆNH', 'PHỤ MẪU', 'PHÚC ĐỨC', 'ĐIỀN TRẠCH', 'QUAN LỘC', 'NÔ BỘC', 'THIÊN DI', 'TẬT ÁCH', 'TÀI BẠCH', 'TỬ TỨC', 'PHU THÊ', 'HUYNH ĐỆ'];

// Let's write a regex or parser to pull all 12 cells
// In tuvi.vn, palaces are usually identified by id="cung-0" to "cung-11" or id="sao-tot-0" to "sao-tot-11"
for (let i = 0; i < 12; i++) {
  console.log(`\n=================== CUNG INDEX ${i} ===================`);
  // Look for sao-tot-i and sao-xau-i
  const idx = html.indexOf(`id="sao-tot-${i}"`);
  if (idx !== -1) {
    // print surrounding block
    const block = html.slice(idx - 600, idx + 1200);
    // strip HTML tags to get pure text lines
    const textLines = block.replace(/<[^>]+>/g, '\n')
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('//') && !l.includes('{') && !l.includes('}'));
    console.log(textLines.join(' | '));
  }
}

