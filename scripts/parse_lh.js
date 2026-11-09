const fs = require('fs');

function parseReport(file, label) {
  if (!fs.existsSync(file)) {
    console.log(file + ' does not exist yet');
    return;
  }
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const perf = data.categories.performance.score * 100;
  const audits = data.audits;
  
  console.log(`\n========================================`);
  console.log(`=== LIGHTHOUSE ${label.toUpperCase()} AUDIT RESULTS ===`);
  console.log(`========================================`);
  console.log(`Performance Score: ${perf.toFixed(0)}/100`);
  console.log(`First Contentful Paint (FCP): ${audits['first-contentful-paint'].displayValue} (${audits['first-contentful-paint'].numericValue.toFixed(0)} ms)`);
  console.log(`Largest Contentful Paint (LCP): ${audits['largest-contentful-paint'].displayValue} (${audits['largest-contentful-paint'].numericValue.toFixed(0)} ms)`);
  console.log(`Total Blocking Time (TBT): ${audits['total-blocking-time'].displayValue} (${audits['total-blocking-time'].numericValue.toFixed(0)} ms)`);
  console.log(`Cumulative Layout Shift (CLS): ${audits['cumulative-layout-shift'].displayValue}`);
  console.log(`Speed Index: ${audits['speed-index'].displayValue}`);
  
  if (audits['total-byte-weight']) {
    console.log(`Total Byte Weight: ${audits['total-byte-weight'].displayValue} (${(audits['total-byte-weight'].numericValue / 1024).toFixed(1)} KB)`);
  }
  if (audits['network-requests']) {
    console.log(`Total Network Requests: ${audits['network-requests'].details ? audits['network-requests'].details.items.length : 'N/A'}`);
  }
  
  console.log('\n--- Diagnostics & Opportunities ---');
  const oppKeys = [
    'render-blocking-resources',
    'unused-javascript',
    'unused-css-rules',
    'unminified-javascript',
    'unminified-css',
    'modern-image-formats',
    'uses-optimized-images',
    'efficient-animated-content',
    'uses-text-compression',
    'uses-responsive-images',
    'dom-size',
    'long-tasks',
    'bootup-time',
    'mainthread-work-breakdown',
    'font-display'
  ];
  
  oppKeys.forEach(k => {
    const a = audits[k];
    if (a && (a.numericValue > 0 || (a.details && a.details.items && a.details.items.length > 0))) {
      console.log(`• ${a.title}: ${a.displayValue || (a.numericValue ? a.numericValue.toFixed(0) + ' ms' : '')}`);
      if (a.details && a.details.items && a.details.items.length > 0) {
        a.details.items.slice(0, 4).forEach(item => {
          const url = item.url ? item.url.split('/').pop().split('?')[0] : '';
          const wasted = item.wastedBytes ? `${(item.wastedBytes/1024).toFixed(1)} KB wasted` : (item.wastedMs ? `${item.wastedMs.toFixed(0)} ms wasted` : '');
          console.log(`    - ${url || item.label || 'item'}: ${wasted} ${item.totalBytes ? '(' + (item.totalBytes/1024).toFixed(1) + ' KB)' : ''}`);
        });
      }
    }
  });
}

parseReport('./lh-mobile.json', 'Mobile');
parseReport('./lh-desktop.json', 'Desktop');
