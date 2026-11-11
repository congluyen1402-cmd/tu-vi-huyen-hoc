const fs = require('fs');
global.window = global;
require('../js/tuvi-engine.js');
const TuViEngine = global.window.TuViEngine || global.TuViEngine;

const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

function parseTuViVnAccurate(html) {
  const result = [];
  for (let i = 0; i < 12; i++) {
    const kIdx = html.indexOf(`id="KNH${i}"`);
    if (kIdx === -1) {
      result.push({ chiIndex: i, chi: DIA_CHI[i], cungName: '', daiVan: null, chinhTinh: [], phuTinh: [] });
      continue;
    }
    const block = html.slice(kIdx - 2000, kIdx + 3000);

    // Cung name
    const cungMatch = block.match(/data-cung=["']([^"']*)["'][^>]*>([\s\S]*?)<\/p>/i);
    const cungName = cungMatch ? cungMatch[2].replace(/<[^>]+>/g, '').trim() : '';

    // Dai Van
    const dvMatch = block.match(/text-dai-van-number[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);
    const daiVan = dvMatch ? parseInt(dvMatch[1].replace(/<[^>]+>/g, '').trim(), 10) : null;

    // Chinh tinh: text-chinh-chinh
    const chinhMatches = [...block.matchAll(/class=["'][^"']*text-chinh-chinh[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi)];
    const chinhTinh = chinhMatches.map(m => {
      const clean = m[1].replace(/<[^>]+>/g, '').replace(/[&#43;\-]/g, '').trim();
      return clean.split('(')[0].trim();
    }).filter(Boolean);

    // Phu tinh: text-sao-xau-tot
    const phuMatches = [...block.matchAll(/class=["'][^"']*text-sao-xau-tot[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)];
    const phuTinh = phuMatches.map(m => {
      const clean = m[1].replace(/<[^>]+>/g, '').trim();
      return clean.split('(')[0].trim();
    }).filter(Boolean);

    result.push({ chiIndex: i, chi: DIA_CHI[i], cungName, daiVan, chinhTinh, phuTinh });
  }
  return result;
}

// Test with Case 1
const html = fs.readFileSync('scripts/tuvivn_result.html', 'utf8');
const data = parseTuViVnAccurate(html);
data.forEach(d => {
  console.log(`[${d.chi} - ${d.cungName}] ĐV: ${d.daiVan} | Chính: ${d.chinhTinh.join(', ')} | Phụ: ${d.phuTinh.slice(0, 5).join(', ')}`);
});

