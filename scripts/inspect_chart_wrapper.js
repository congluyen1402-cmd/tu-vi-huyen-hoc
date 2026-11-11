const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const html = fs.readFileSync('scripts/tracuutuvi_chart_page.html', 'utf8');
  await page.setContent(html);

  // Let's find elements containing 'MỆNH' or 'Thái dương'
  const palaceElements = await page.evaluate(() => {
    const allEls = document.querySelectorAll('*');
    const matches = [];
    allEls.forEach(el => {
      if (el.children.length === 0 && (el.innerText === 'MỆNH' || el.innerText?.includes('Thái dương') || el.innerText?.includes('Thái Dương'))) {
        // Find ancestor container
        let parent = el.parentElement;
        for (let k = 0; k < 5 && parent; k++) {
          if (parent.className || parent.id) {
            matches.push({
              tag: el.tagName,
              text: el.innerText,
              parentId: parent.id,
              parentClass: parent.className,
              parentTag: parent.tagName
            });
            break;
          }
          parent = parent.parentElement;
        }
      }
    });
    return matches;
  });

  console.log('Palace element ancestors:', palaceElements);

  // Check if chart is in an SVG or canvas or custom grid
  const chartWrapper = await page.evaluate(() => {
    // Find element with "LÁ SỐ TỬ VI CỦA BẠN"
    const els = Array.from(document.querySelectorAll('*'));
    const header = els.find(e => e.innerText?.includes('LÁ SỐ TỬ VI CỦA BẠN'));
    if (!header) return null;
    const next = header.nextElementSibling || header.parentElement;
    return {
      headerHtml: header.outerHTML.slice(0, 300),
      parentHtml: header.parentElement.innerHTML.slice(0, 2000)
    };
  });
  console.log('Chart wrapper summary:');
  console.log(chartWrapper?.parentHtml?.slice(0, 1000));

  await browser.close();
})();

