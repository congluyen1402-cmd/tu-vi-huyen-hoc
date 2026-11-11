const fs = require('fs');

const files = [
  'chinh-sach-bao-mat.html',
  'chinh-sach-hoan-tien-ho-tro.html',
  'dieu-khoan-su-dung.html',
  'public/chinh-sach-bao-mat.html',
  'public/chinh-sach-hoan-tien-ho-tro.html',
  'public/dieu-khoan-su-dung.html'
];

files.forEach(p => {
  let c = fs.readFileSync(p, 'utf8');
  if (c.includes('content="noindex, follow"')) {
    c = c.replace('content="noindex, follow"', 'content="index, follow"');
    fs.writeFileSync(p, c, 'utf8');
    console.log('Updated robots meta in', p);
  } else {
    console.log('Already index in', p);
  }
});
