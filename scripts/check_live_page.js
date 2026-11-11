const { chromium } = require('@playwright/test');

async function testScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const consoleLogs = [];
  const errors = [];
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => errors.push(err.message));
  page.on('response', resp => {
    if (!resp.ok()) {
      console.log(`HTTP ${resp.status()} for ${resp.url()}`);
    }
  });

  console.log('Navigating to https://www.xemtuvihuyenhoc.com...');
  await page.goto('https://www.xemtuvihuyenhoc.com', { waitUntil: 'networkidle' });

  await page.screenshot({ path: 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262/live_site_check.png', fullPage: false });
  console.log('Title:', await page.title());
  console.log('Errors:', errors);
  console.log('Console logs (first 10):', consoleLogs.slice(0, 10));

  await browser.close();
}

testScreenshots().catch(console.error);

