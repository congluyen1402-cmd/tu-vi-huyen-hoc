const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '..', 'data', 'posts.json');
const sitemapFile = path.join(__dirname, '..', 'sitemap.xml');

const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;
xml += `  <url><loc>https://www.xemtuvihuyenhoc.com/</loc><lastmod>2026-11-13</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>\n`;
xml += `  <url><loc>https://www.xemtuvihuyenhoc.com/than-so-hoc</loc><lastmod>2026-11-13</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n`;
xml += `  <url><loc>https://www.xemtuvihuyenhoc.com/hop-tuoi</loc><lastmod>2026-11-13</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n`;
xml += `  <url><loc>https://www.xemtuvihuyenhoc.com/blog</loc><lastmod>2026-11-13</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>\n`;
xml += `  <url><loc>https://www.xemtuvihuyenhoc.com/chinh-sach-bao-mat</loc><lastmod>2026-11-12</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>\n`;
xml += `  <url><loc>https://www.xemtuvihuyenhoc.com/chinh-sach-hoan-tien-ho-tro</loc><lastmod>2026-11-12</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>\n`;
xml += `  <url><loc>https://www.xemtuvihuyenhoc.com/dieu-khoan-su-dung</loc><lastmod>2026-11-12</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>\n`;

posts.forEach(p => {
  const postImg = p.image ? (p.image.startsWith('http') ? p.image : 'https://www.xemtuvihuyenhoc.com' + p.image) : 'https://www.xemtuvihuyenhoc.com/img/og-image.jpg';
  const lastModDate = p.updatedAt ? p.updatedAt.split('T')[0] : (p.publishedAt || '2026-11-13');
  const safeTitle = (p.title || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
  xml += `  <url>\n`;
  xml += `    <loc>https://www.xemtuvihuyenhoc.com/blog/${p.slug}</loc>\n`;
  xml += `    <lastmod>${lastModDate}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>0.85</priority>\n`;
  xml += `    <image:image>\n`;
  xml += `      <image:loc>${postImg}</image:loc>\n`;
  xml += `      <image:title>${safeTitle}</image:title>\n`;
  xml += `    </image:image>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>`;

fs.writeFileSync(sitemapFile, xml, 'utf8');
console.log('✅ Synchronized sitemap.xml! Total URLs:', 7 + posts.length);

