#!/usr/bin/env node
/**
 * CLI Tracing tool for Tử Vi Engine
 * Usage: npm run trace -- "YYYY-MM-DD HH:mm nam|nu solar|lunar [leap]"
 */

const path = require('path');
const engine = require(path.join(__dirname, '../js/tuvi-engine.js'));

const args = process.argv.slice(2);
let inputStr = args.join(' ').trim();

if (!inputStr) {
  // Default test case: 2002-04-10 19:30 nam solar
  inputStr = '2002-04-10 19:30 nam solar';
}

// Clean quotes if wrapped
inputStr = inputStr.replace(/^["']|["']$/g, '');

const result = engine.trace(inputStr);

console.log('\n========================================================================================');
console.log('                 BẢNG TRUY VẾT TỪNG BƯỚC AN SAO TỬ VI (TRACE MODE)');
console.log('========================================================================================');
console.log(`Đầu vào: "${inputStr}"\n`);

console.log('----------------------------------------------------------------------------------------');
console.log('| BƯỚC                    | GIÁ TRỊ TRUNG GIAN / KẾT QUẢ TÍNH TOÁN                     |');
console.log('----------------------------------------------------------------------------------------');

result.traceRows.forEach(row => {
  const stepCol = row.step.padEnd(24, ' ');
  console.log(`| ${stepCol} | ${row.detail}`);
});

console.log('----------------------------------------------------------------------------------------');
console.log('\n[QUY ƯỚC & NGUYÊN TẮC ÁP DỤNG]:');
result.conventions.forEach((c, idx) => {
  console.log(`  (${idx + 1}) ${c}`);
});
console.log('========================================================================================\n');

