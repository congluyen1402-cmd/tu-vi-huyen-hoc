const { chromium } = require('@playwright/test');

async function testCases() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const cases = [
    // Case 1: Nam, Dần Ngọ Tuất (already know)
    // Case 2: Nu, 1995 (Ất Hợi, Hợi Mão Mùi)
    { name: 'Nu 1995', day: 15, month: 8, year: 1995, hour: 6, min: 15, gender: 0, isSolar: 1 },
    // Case 3: Nam, 1990 (Canh Ngọ)
    { name: 'Nam 1990', day: 1, month: 1, year: 1990, hour: 14, min: 0, gender: 1, isSolar: 1 },
    // Case 4: Nu, 1988 (Mậu Thìn, Thân Tý Thìn)
    { name: 'Nu 1988', day: 20, month: 11, year: 1988, hour: 22, min: 30, gender: 0, isSolar: 1 },
  ];

  for (const c of cases) {
    console.log(`\n================ Testing ${c.name} ================`);
    await page.goto('https://tuvi.vn/lap-la-so-tu-vi', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.fill('#input-name', c.name);
    await page.fill('#input-day', c.day.toString());
    await page.fill('#input-month', c.month.toString());
    await page.fill('#input-year', c.year.toString());
    await page.fill('#input-hour', c.hour.toString());
    await page.fill('#input-minute', c.min.toString());
    if (c.gender === 0) {
      await page.click('#radio-gender-2'); // Nu
    }
    await page.click('#btn-view');
    await page.waitForSelector('.cung-view', { timeout: 15000 });

    const result = await page.evaluate(() => {
      const data = [];
      for (let p = 0; p < 12; p++) {
        const cEl = document.querySelector(`#cung${p}`);
        if (!cEl) continue;
        const thEl = cEl.querySelector('[class*="khoi-tieu-han"]');
        const knhEl = cEl.querySelector(`[id="KNH${p}"]`);
        data.push({
          palace: p,
          tieuHan: thEl ? thEl.textContent.trim() : '',
          thangHan: knhEl ? knhEl.textContent.trim() : ''
        });
      }
      return data;
    });

    console.log(result);
  }

  await browser.close();
}

testCases().catch(console.error);

