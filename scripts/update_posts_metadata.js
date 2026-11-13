const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '..', 'data', 'posts.json');
const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));

const imageMap = {
  'tu-vi-hon-nhan-tinh-duyen-nam-2027-dinh-mui': '/img/og-image.jpg',
  'du-bao-tai-chinh-dau-tu-nam-2027-hoa-giai-cu-mon-hoa-ky': '/img/sample-report-1.jpg',
  'van-han-tien-bac-tai-loc-nam-2027-dinh-mui': '/img/sample-report-2.jpg',
  'cach-xem-la-so-tu-vi-chuan-nam-phai': '/img/la-so-bg-trong-dong.jpg',
  'luan-giai-van-han-luu-nien-2027-dinh-mui': '/img/hero-temple-bg.jpg',
  'cung-phu-the-co-tuan-triet-co-than-qua-tu': '/img/sample-report-3.jpg',
  'y-nghia-bo-tu-hoa-loc-quyen-khoa-ky': '/img/hero-temple-bg.jpg',
  'menh-vo-chinh-dieu-la-gi-khi-nao-dac-cach': '/img/la-so-bg-trong-dong.jpg'
};

posts.forEach(p => {
  if (!p.image && imageMap[p.slug]) {
    p.image = imageMap[p.slug];
  } else if (!p.image) {
    p.image = '/img/og-image.jpg';
  }
  if (!p.author) {
    p.author = 'Đại Sư Nam Phái';
  }
  if (!p.updatedAt) {
    p.updatedAt = '2026-11-13T08:00:00+07:00';
  }
});

fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf8');
console.log('✅ Updated data/posts.json with images, author, and updatedAt!');

