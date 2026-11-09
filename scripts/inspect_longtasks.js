const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./lh-mobile.json', 'utf8'));
const lt = data.audits['long-tasks'];
console.log('Long tasks count:', lt.details ? lt.details.items.length : 0);
if (lt.details && lt.details.items) {
  lt.details.items.slice(0, 10).forEach((item, i) => {
    console.log(`${i+1}. Duration: ${item.duration.toFixed(0)} ms, Start: ${item.startTime.toFixed(0)} ms, URL: ${item.url || 'self'}`);
  });
}

const bootup = data.audits['bootup-time'];
console.log('\nBootup time breakdown:');
if (bootup.details && bootup.details.items) {
  bootup.details.items.slice(0, 8).forEach(item => {
    console.log(`  ${item.url ? item.url.split('/').pop().split('?')[0] : 'other'}: total ${item.total.toFixed(0)} ms (eval: ${item.scripting.toFixed(0)} ms, parse: ${item.scriptParseCompile.toFixed(0)} ms)`);
  });
}
