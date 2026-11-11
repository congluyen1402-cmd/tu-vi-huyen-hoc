const fs = require('fs');

const robotsTxt = `User-agent: *
Allow: /
Allow: /chinh-sach-bao-mat
Allow: /dieu-khoan-su-dung
Allow: /chinh-sach-hoan-tien-ho-tro
Disallow: /admin
Disallow: /admin.html
Disallow: /data/
Disallow: /api/

Sitemap: https://www.xemtuvihuyenhoc.com/sitemap.xml
`;

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.xemtuvihuyenhoc.com/</loc>
    <lastmod>2026-11-11</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.xemtuvihuyenhoc.com/chinh-sach-bao-mat</loc>
    <lastmod>2026-11-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.xemtuvihuyenhoc.com/dieu-khoan-su-dung</loc>
    <lastmod>2026-11-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.xemtuvihuyenhoc.com/chinh-sach-hoan-tien-ho-tro</loc>
    <lastmod>2026-11-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
`;

['robots.txt', 'public/robots.txt'].forEach(p => fs.writeFileSync(p, robotsTxt, 'utf8'));
['sitemap.xml', 'public/sitemap.xml'].forEach(p => fs.writeFileSync(p, sitemapXml, 'utf8'));

console.log('Successfully updated robots.txt and sitemap.xml in root and public!');
