const fs = require('fs');
const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');

const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

console.log('=== DANH SÁCH TOÀN BỘ CÁC SAO THEO TỪNG CUNG TRONG TUVI.VN ===\n');

for (let i = 0; i < 12; i++) {
  const kIdx = html.indexOf(`id="KNH${i}"`);
  const block = html.slice(kIdx - 2000, kIdx + 3000);

  // Cung name
  const cungMatch = block.match(/data-cung=["']([^"']*)["'][^>]*>([\s\S]*?)<\/p>/i);
  const cungName = cungMatch ? cungMatch[2].replace(/<[^>]+>/g, '').trim() : '';

  // Chinh tinh
  const chinhMatches = [...block.matchAll(/class=["'][^"']*text-chinh-chinh[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi)];
  const chinh = chinhMatches.map(m => m[1].replace(/<[^>]+>/g, '').replace(/[&#43;\-]/g, '').trim().split('(')[0].trim()).filter(Boolean);

  // Cát tinh (sao-tot-i)
  const totIdx = html.indexOf(`id="sao-tot-${i}"`);
  let totStars = [];
  if (totIdx !== -1) {
    const totBlock = html.slice(totIdx, totIdx + 1200);
    const m = [...totBlock.matchAll(/class=["'][^"']*text-sao-xau-tot[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)];
    totStars = m.map(x => x[1].replace(/<[^>]+>/g, '').trim().split('(')[0].trim()).filter(s => s && !s.startsWith('L.') && !s.startsWith('ĐV.'));
  }

  // Hung tinh (sao-xau-i)
  const xauIdx = html.indexOf(`id="sao-xau-${i}"`);
  let xauStars = [];
  if (xauIdx !== -1) {
    const xauBlock = html.slice(xauIdx, xauIdx + 1200);
    const m = [...xauBlock.matchAll(/class=["'][^"']*text-sao-xau-tot[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)];
    xauStars = m.map(x => x[1].replace(/<[^>]+>/g, '').trim().split('(')[0].trim()).filter(s => s && !s.startsWith('L.') && !s.startsWith('ĐV.'));
  }

  console.log(`[Cung ${cungName || 'Vô danh'} tại ${DIA_CHI[i]} (${i})]:`);
  console.log(`   Chính tinh: ${chinh.join(', ') || 'Vô chính diệu'}`);
  console.log(`   Cát tinh: ${totStars.join(', ') || 'Không'}`);
  console.log(`   Hung/Sát tinh: ${xauStars.join(', ') || 'Không'}`);
}

