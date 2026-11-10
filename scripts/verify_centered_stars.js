const { chromium } = require('@playwright/test');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

  console.log('Navigating to http://localhost:8080 ...');
  await page.goto('http://localhost:8080');

  // Fill in form for the same test case as the user's screenshot
  // 10/04/2002 19:30 Nam
  await page.fill('#hoTen', 'Trần Công Luyện');
  await page.selectOption('#gioiTinh', 'nam');
  await page.selectOption('#ngaySinh', '10');
  await page.selectOption('#thangSinh', '4');
  await page.selectOption('#namSinh', '2002');
  await page.selectOption('#gioSinh', '19');
  await page.selectOption('#phutSinh', '30');

  console.log('Submitting form...');
  await page.click('#btnSubmit');

  // Wait for chart
  await page.waitForSelector('#laSoPrintArea', { timeout: 10000 });
  await page.waitForTimeout(1000);

  // Take screenshot of chart area
  const chartElement = await page.$('#laSoPrintArea');
  const screenshotPath = path.join(__dirname, '..', 'chart_centered_stars.png');
  await chartElement.screenshot({ path: screenshotPath });
  console.log('Saved screenshot to:', screenshotPath);

  // Check top 4 cells
  const cellsData = await page.evaluate(() => {
    const cells = document.querySelectorAll('.cung-classical-cell');
    const results = [];
    cells.forEach(c => {
      const topBar = c.querySelector('.cung-top-bar')?.innerText.replace(/\n/g, ' ');
      const canSign = c.querySelector('.cung-can-sign')?.innerText;
      const centerStars = Array.from(c.querySelectorAll('.star-chinh-center')).map(s => s.innerText.trim());
      const leftCol = Array.from(c.querySelectorAll('.cung-col-left .star-line')).map(s => s.innerText.trim());
      const rightCol = Array.from(c.querySelectorAll('.cung-col-right .star-line')).map(s => s.innerText.trim());
      results.push({
        topBar,
        canSign,
        centerStars,
        leftColCount: leftCol.length,
        rightColCount: rightCol.length
      });
    });
    return results;
  });

  console.log('First 4 cells:');
  console.log(JSON.stringify(cellsData.slice(0, 4), null, 2));

  await browser.close();
})();
