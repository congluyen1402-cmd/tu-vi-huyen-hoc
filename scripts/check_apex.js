const { chromium } = require('@playwright/test');

async function testApex() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Visiting https://xemtuvihuyenhoc.com ...');
  const response = await page.goto('https://xemtuvihuyenhoc.com', { waitUntil: 'networkidle' });
  console.log('Final URL:', page.url());
  console.log('Status:', response.status());
  console.log('Title:', await page.title());

  await page.screenshot({ path: 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262/apex_check.png' });
  await browser.close();
}

testApex().catch(console.error);

