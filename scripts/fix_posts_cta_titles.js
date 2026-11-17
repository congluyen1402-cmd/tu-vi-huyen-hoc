const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '..', 'data', 'posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

posts.forEach(p => {
  // Update any CTA h3 inside dark cards
  p.contentHtml = p.contentHtml.replace(
    /<h3 style="color:\s*#fbbf24;[^"]*">([\s\S]*?)<\/h3>/gi,
    '<div class="article-cta-title" style="color: #FBBF24 !important; font-family: var(--font-heading, serif); font-size: 1.4rem; margin-bottom: 0.8rem; font-weight: 700; text-shadow: 0 2px 6px rgba(0,0,0,0.85);">$1</div>'
  );
  // Update old 99k pricing references in FAQs to match current tiers
  p.contentHtml = p.contentHtml.replace(/Gói VIP 49k và Gói VIP 99k/g, 'Gói VIP Toàn Thư 49k và Gói Xem Nhanh 29k');
  p.contentHtml = p.contentHtml.replace(/99\.000đ/g, '49.000đ');
  p.contentHtml = p.contentHtml.replace(/99\.000 đ/g, '49.000 đ');
});

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf8');
console.log('✅ Updated all CTA titles and pricing in posts.json');
