const { chromium } = require('@playwright/test');

async function inspectLiveTraCuuTuVi() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://xem.tracuutuvi.com/?view=0V6px7GXnHmRqrvqFHph', { waitUntil: 'networkidle' });

  // Get all text content of elements with class or id containing 'cung' or 'laso' or 'chart'
  const chartInfo = await page.evaluate(() => {
    // Find all images
    const imgs = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      className: img.className
    }));

    // Find all headings
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => h.innerText);

    return { imgs, headings };
  });

  console.log('Headings:', chartInfo.headings);
  console.log('Images (filtered):', chartInfo.imgs.filter(i => !i.src.includes('logo') && !i.src.includes('icon')));

  await browser.close();
}

inspectLiveTraCuuTuVi().catch(console.error);

