const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imgBase64 = fs.readFileSync('C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262/.user_uploaded/media_1794468000212_a709d045.jpg').toString('base64');
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js"></script>
      </head>
      <body>
        <img id="img" src="data:image/jpeg;base64,${imgBase64}" />
        <canvas id="canvas"></canvas>
      </body>
    </html>
  `);
  
  const qrData = await page.evaluate(async () => {
    const img = document.getElementById('img');
    await new Promise(r => { if (img.complete) r(); else img.onload = r; });
    const canvas = document.getElementById('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imgData.data, canvas.width, canvas.height);
    return code ? code.data : 'QR NOT FOUND';
  });
  console.log('DECODED QR RESULT:', qrData);
  await browser.close();
})();
