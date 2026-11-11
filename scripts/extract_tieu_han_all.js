const fs = require('fs');
const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

// The palaces are cung5 (Tỵ), cung6 (Ngọ), cung7 (Mùi), cung8 (Thân), cung4 (Thìn), cung9 (Dậu), cung3 (Mão), cung10 (Tuất), cung2 (Dần), cung1 (Sửu), cung0 (Tý), cung11 (Hợi)
// Let's find which cung contains which khoi-tieu-han:
for (let p = 0; p < 12; p++) {
  const cIdx = html.indexOf(`id="cung${p}"`);
  if (cIdx !== -1) {
    // find next cung or table end
    const chunk = html.slice(cIdx, cIdx + 18000);
    const m = chunk.match(/class="khoi-tieu-han[^"]*"[^>]*>([\s\S]*?)<\/div>/);
    const mTh = chunk.match(/id="KNH\d+"[^>]*>([\s\S]*?)<\/p>/);
    console.log(`Palace ${p}: TieuHan = "${m ? m[1].replace(/<[^>]+>/g, '').trim() : ''}", ThangHan = "${mTh ? mTh[1].trim() : ''}"`);
  }
}
