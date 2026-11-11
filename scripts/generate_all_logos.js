const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Load the master emblem as base64
  const masterBuf = fs.readFileSync('img/logo-master-emblem.jpg');
  const masterBase64 = `data:image/jpeg;base64,${masterBuf.toString('base64')}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Be+Vietnam+Pro:wght@600;700;800;900&display=swap" rel="stylesheet">
      <style>
        body { margin: 0; padding: 0; background: transparent; }
        canvas { display: block; }
      </style>
    </head>
    <body>
      <img id="masterImg" src="${masterBase64}" style="display:none;" />
      <canvas id="c512" width="512" height="512"></canvas>
      <canvas id="c180" width="180" height="180"></canvas>
      <canvas id="c64" width="64" height="64"></canvas>
      <canvas id="cHorizontal" width="680" height="170"></canvas>
    </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);

  // Process canvases in the browser context
  const results = await page.evaluate(async () => {
    const img = document.getElementById('masterImg');
    if (!img.complete) {
      await new Promise(r => { img.onload = r; });
    }

    // 1. Generate 512x512 circular emblem with transparent outer corners & subtle gold rim
    const c512 = document.getElementById('c512');
    const ctx512 = c512.getContext('2d');
    ctx512.imageSmoothingEnabled = true;
    ctx512.imageSmoothingQuality = 'high';

    ctx512.save();
    ctx512.beginPath();
    ctx512.arc(256, 256, 246, 0, Math.PI * 2);
    ctx512.closePath();
    ctx512.clip();

    // Source image dimensions: 1024x1024
    // Medallion is centered at 512, 512 with radius ~456
    // We draw slightly scaled so the gold border fits nicely
    const srcRadius = 462;
    const sx = 512 - srcRadius;
    const sy = 512 - srcRadius;
    const sWidth = srcRadius * 2;
    const sHeight = srcRadius * 2;

    ctx512.drawImage(img, sx, sy, sWidth, sHeight, 10, 10, 492, 492);
    ctx512.restore();

    // Add fine circular gold glow rim
    ctx512.beginPath();
    ctx512.arc(256, 256, 246, 0, Math.PI * 2);
    ctx512.lineWidth = 4;
    const grad512 = ctx512.createLinearGradient(0, 0, 512, 512);
    grad512.addColorStop(0, '#fffbeb');
    grad512.addColorStop(0.3, '#fbbf24');
    grad512.addColorStop(0.7, '#d97706');
    grad512.addColorStop(1, '#78350f');
    ctx512.strokeStyle = grad512;
    ctx512.stroke();

    // 2. Generate 180x180 (Apple Touch Icon)
    const c180 = document.getElementById('c180');
    const ctx180 = c180.getContext('2d');
    ctx180.imageSmoothingEnabled = true;
    ctx180.imageSmoothingQuality = 'high';
    ctx180.drawImage(c512, 0, 0, 512, 512, 0, 0, 180, 180);

    // 3. Generate 64x64 (Favicon)
    const c64 = document.getElementById('c64');
    const ctx64 = c64.getContext('2d');
    ctx64.imageSmoothingEnabled = true;
    ctx64.imageSmoothingQuality = 'high';
    ctx64.drawImage(c512, 0, 0, 512, 512, 0, 0, 64, 64);

    // 4. Generate Horizontal Full Logo (680 x 170)
    const cH = document.getElementById('cHorizontal');
    const ctxH = cH.getContext('2d');
    ctxH.imageSmoothingEnabled = true;
    ctxH.imageSmoothingQuality = 'high';

    // Left Emblem: 146x146 centered at x=85, y=85
    ctxH.drawImage(c512, 0, 0, 512, 512, 12, 12, 146, 146);

    // Typography
    const textX = 180;

    // Line 1: XEM TỬ VI
    ctxH.save();
    ctxH.font = '900 42px "Cinzel Decorative", "Be Vietnam Pro", serif';
    ctxH.letterSpacing = '2px';
    const gold1 = ctxH.createLinearGradient(textX, 20, textX, 70);
    gold1.addColorStop(0, '#ffffff');
    gold1.addColorStop(0.2, '#fef08a');
    gold1.addColorStop(0.55, '#f59e0b');
    gold1.addColorStop(0.85, '#d97706');
    gold1.addColorStop(1, '#92400e');

    // Subtle dark glow/shadow
    ctxH.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctxH.shadowBlur = 12;
    ctxH.shadowOffsetX = 2;
    ctxH.shadowOffsetY = 4;
    ctxH.fillStyle = gold1;
    ctxH.fillText('XEM TỬ VI', textX, 62);
    ctxH.restore();

    // Line 2: HUYỀN HỌC
    ctxH.save();
    ctxH.font = '900 38px "Cinzel Decorative", "Be Vietnam Pro", serif';
    ctxH.letterSpacing = '3px';
    const gold2 = ctxH.createLinearGradient(textX, 65, textX, 115);
    gold2.addColorStop(0, '#ffffff');
    gold2.addColorStop(0.2, '#fef08a');
    gold2.addColorStop(0.55, '#f59e0b');
    gold2.addColorStop(0.85, '#d97706');
    gold2.addColorStop(1, '#92400e');

    ctxH.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctxH.shadowBlur = 12;
    ctxH.shadowOffsetX = 2;
    ctxH.shadowOffsetY = 4;
    ctxH.fillStyle = gold2;
    ctxH.fillText('HUYỀN HỌC', textX, 110);
    ctxH.restore();

    // Line 3: Tagline with 4-point stars
    ctxH.save();
    ctxH.font = '700 13.5px "Be Vietnam Pro", sans-serif';
    ctxH.letterSpacing = '1.8px';
    const brassGrad = ctxH.createLinearGradient(textX, 125, textX + 380, 125);
    brassGrad.addColorStop(0, '#fbbf24');
    brassGrad.addColorStop(1, '#fde68a');
    ctxH.fillStyle = brassGrad;
    ctxH.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctxH.shadowBlur = 6;
    ctxH.fillText('✦ LẬP LÁ SỐ CHÍNH TÔNG · THIÊN CƠ KHỞI VẬN ✦', textX, 142);
    ctxH.restore();

    // Decorative Star Accent on Right
    ctxH.save();
    ctxH.translate(615, 85);
    ctxH.fillStyle = '#fbbf24';
    ctxH.shadowColor = 'rgba(251, 191, 36, 0.8)';
    ctxH.shadowBlur = 10;
    ctxH.beginPath();
    // 4-point star
    ctxH.moveTo(0, -14);
    ctxH.lineTo(3.5, -3.5);
    ctxH.lineTo(14, 0);
    ctxH.lineTo(3.5, 3.5);
    ctxH.lineTo(0, 14);
    ctxH.lineTo(-3.5, 3.5);
    ctxH.lineTo(-14, 0);
    ctxH.lineTo(-3.5, -3.5);
    ctxH.closePath();
    ctxH.fill();
    ctxH.restore();

    return {
      p512: c512.toDataURL('image/png'),
      p180: c180.toDataURL('image/png'),
      p64: c64.toDataURL('image/png'),
      pHorizontal: cH.toDataURL('image/png')
    };
  });

  function saveBase64Png(dataUrl, targetPath) {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(targetPath, Buffer.from(base64Data, 'base64'));
    console.log('Saved:', targetPath);
  }

  // Save 512 circular emblem as primary logo
  saveBase64Png(results.p512, 'img/logo-xem-tu-vi-huyen-hoc.png');
  saveBase64Png(results.p512, 'public/img/logo-xem-tu-vi-huyen-hoc.png');

  // Save Apple Touch Icon
  saveBase64Png(results.p180, 'apple-touch-icon.png');
  saveBase64Png(results.p180, 'public/apple-touch-icon.png');

  // Save Favicon
  saveBase64Png(results.p64, 'favicon.png');
  saveBase64Png(results.p64, 'public/favicon.png');

  // Save Full Horizontal Logo
  saveBase64Png(results.pHorizontal, 'img/logo-full-horizontal.png');
  saveBase64Png(results.pHorizontal, 'public/img/logo-full-horizontal.png');

  console.log('ALL LOGO ASSETS SUCCESSFULLY GENERATED!');
  await browser.close();
})();

