const fs = require('fs');
const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

for (let i = 0; i < 12; i++) {
  const match = html.match(new RegExp(`id="DVT${i}"[\\s\\S]*?class="txt-tiny-mid white-space-nowrap">([\\s\\S]*?)<`));
  console.log(`Chi ${DIA_CHI[i]} (Index ${i}): Tràng Sinh = ${match ? match[1].trim() : 'NONE'}`);
}

