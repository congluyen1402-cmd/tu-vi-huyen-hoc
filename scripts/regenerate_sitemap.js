const fs = require('fs');
const path = require('path');

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const postsFilePath = path.join(__dirname, '..', 'data', 'posts.json');
const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf8'));

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;
xml += `  <url><loc>https://www.xemtuvihuyenhoc.com/</loc><lastmod>2026-11-15</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>\n`;
xml += `  <url><loc>https://www.xemtuvihuyenhoc.com/than-so-hoc</loc><lastmod>2026-11-15</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n`;
xml += `  <url><loc>https://www.xemtuvihuyenhoc.com/hop-tuoi</loc><lastmod>2026-11-15</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n`;
xml += `  <url><loc>https://www.xemtuvihuyenhoc.com/blog</loc><lastmod>2026-11-15</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>\n`;

posts.forEach(p => {
  const postImg = p.image ? (p.image.startsWith('http') ? p.image : 'https://www.xemtuvihuyenhoc.com' + p.image) : 'https://www.xemtuvihuyenhoc.com/img/og-image.jpg';
  const lastModDate = p.updatedAt ? p.updatedAt.split('T')[0] : (p.publishedAt || '2026-11-15');
  xml += `  <url>\n`;
  xml += `    <loc>https://www.xemtuvihuyenhoc.com/blog/${p.slug}</loc>\n`;
  xml += `    <lastmod>${lastModDate}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>0.85</priority>\n`;
  xml += `    <image:image>\n`;
  xml += `      <image:loc>${postImg}</image:loc>\n`;
  xml += `      <image:title>${escapeXml(p.title)}</image:title>\n`;
  xml += `    </image:image>\n`;
  xml += `  </url>\n`;
});
xml += `</urlset>`;

const rootSitemap = path.join(__dirname, '..', 'sitemap.xml');
const publicSitemap = path.join(__dirname, '..', 'public', 'sitemap.xml');

fs.writeFileSync(rootSitemap, xml, 'utf8');
if (fs.existsSync(path.dirname(publicSitemap))) {
  fs.writeFileSync(publicSitemap, xml, 'utf8');
}
console.log(`✅ Đã đồng bộ sitemap.xml thành công (${posts.length} bài viết)!`);
