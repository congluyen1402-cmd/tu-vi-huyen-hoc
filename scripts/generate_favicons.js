const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const logoBase64 = fs.readFileSync('img/logo-xem-tu-vi-huyen-hoc.png').toString('base64');
  const dataUri = `data:image/png;base64,${logoBase64}`;

  const html = `
    <html>
      <body style="margin:0; padding:0; background:transparent;">
        <canvas id="c64" width="64" height="64"></canvas>
        <canvas id="c180" width="180" height="180"></canvas>
        <img id="logo" src="${dataUri}" />
      </body>
    </html>
  `;
  await page.setContent(html);

  const { fav64, apple180 } = await page.evaluate(async () => {
    const img = document.getElementById('logo');
    if (!img.complete) await new Promise(r => img.onload = r);

    function drawIcon(canvasId, size) {
      const c = document.getElementById(canvasId);
      const ctx = c.getContext('2d');
      ctx.clearRect(0, 0, size, size);

      // Fit or center the logo
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const scale = Math.min((size * 0.92) / w, (size * 0.92) / h);
      const dw = w * scale;
      const dh = h * scale;
      const dx = (size - dw) / 2;
      const dy = (size - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
      return c.toDataURL('image/png');
    }

    return {
      fav64: drawIcon('c64', 64),
      apple180: drawIcon('c180', 180)
    };
  });

  const bFav64 = Buffer.from(fav64.split(',')[1], 'base64');
  const bApple180 = Buffer.from(apple180.split(',')[1], 'base64');

  fs.writeFileSync('favicon.png', bFav64);
  fs.writeFileSync('public/favicon.png', bFav64);
  fs.writeFileSync('apple-touch-icon.png', bApple180);
  fs.writeFileSync('public/apple-touch-icon.png', bApple180);

  console.log('Successfully generated favicon.png and apple-touch-icon.png from logo!');
  await browser.close();
}

generateIcons().catch(err => {
  console.error(err);
  process.exit(1);
});
