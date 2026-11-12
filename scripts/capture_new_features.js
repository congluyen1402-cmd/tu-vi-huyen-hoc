const { chromium, devices } = require('@playwright/test');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/tktu2/.gemini/antigravity/brain/a7370d27-c78d-4370-8c6f-d0b0a9357262';

async function capture() {
  const browser = await chromium.launch();

  // 1. Desktop - Thần Số Học
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto('http://localhost:8080/than-so-hoc');
    await page.fill('#numFullName', 'Trần Công Luyện');
    await page.fill('#numBirthDate', '1995-10-14');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'desktop_than_so_hoc_result.png'), fullPage: false });
    console.log('Saved desktop_than_so_hoc_result.png');
    await page.close();
  }

  // 2. Mobile iPhone 13 - Thần Số Học
  {
    const iphone = devices['iPhone 13'];
    const page = await browser.newPage({ ...iphone });
    await page.goto('http://localhost:8080/than-so-hoc');
    await page.fill('#numFullName', 'Trần Công Luyện');
    await page.fill('#numBirthDate', '1995-10-14');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'iphone13_than_so_hoc_result.png'), fullPage: false });
    console.log('Saved iphone13_than_so_hoc_result.png');
    await page.close();
  }

  // 3. Desktop - Bói Hợp Tuổi
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto('http://localhost:8080/hop-tuoi');
    await page.fill('#p1Name', 'Nguyễn Văn Nam');
    await page.fill('#p1Dob', '1990-05-15');
    await page.fill('#p2Name', 'Lê Thị Mai');
    await page.fill('#p2Dob', '1994-08-20');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'desktop_hop_tuoi_result.png'), fullPage: false });
    console.log('Saved desktop_hop_tuoi_result.png');
    await page.close();
  }

  // 4. Mobile iPhone 13 - Bói Hợp Tuổi
  {
    const iphone = devices['iPhone 13'];
    const page = await browser.newPage({ ...iphone });
    await page.goto('http://localhost:8080/hop-tuoi');
    await page.fill('#p1Name', 'Nguyễn Văn Nam');
    await page.fill('#p1Dob', '1990-05-15');
    await page.fill('#p2Name', 'Lê Thị Mai');
    await page.fill('#p2Dob', '1994-08-20');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'iphone13_hop_tuoi_result.png'), fullPage: false });
    console.log('Saved iphone13_hop_tuoi_result.png');
    await page.close();
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});

