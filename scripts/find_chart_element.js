const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const html = fs.readFileSync('scripts/tracuutuvi_chart_page.html', 'utf8');
  await page.setContent(html);

  // Search for the element that contains the chart near the top
  const chartInfo = await page.evaluate(() => {
    // Look for iframe, canvas, embed, object, img, or custom div
    const iframes = Array.from(document.querySelectorAll('iframe')).map(f => f.src);
    const embeds = Array.from(document.querySelectorAll('embed, object')).map(e => e.src || e.data);
    
    // Look around "Tải lá số"
    const links = Array.from(document.querySelectorAll('a')).map(a => ({ text: a.innerText, href: a.href }));
    
    // Check all divs between header and "LUẬN GIẢI TỔNG QUAN"
    const luanGiai = Array.from(document.querySelectorAll('*')).find(e => e.innerText?.includes('LUẬN GIẢI TỔNG QUAN'));
    let preHtml = '';
    if (luanGiai) {
      let cur = luanGiai;
      while (cur && cur.parentElement && cur.parentElement !== document.body) {
        cur = cur.parentElement;
      }
      // cur is top-level container
      let prev = cur.previousElementSibling;
      while (prev) {
        preHtml = prev.outerHTML + '\n' + preHtml;
        prev = prev.previousElementSibling;
      }
    }

    return { iframes, embeds, links: links.filter(l => l.text.includes('Tải') || l.href.includes('pdf')), preHtmlLength: preHtml.length, preHtmlSample: preHtml.slice(0, 1500) };
  });

  console.log(chartInfo);
  if (chartInfo.preHtmlLength > 0) {
    fs.writeFileSync('scripts/tracuutuvi_chart_container.html', chartInfo.preHtmlSample, 'utf8');
  }

  await browser.close();
})();

