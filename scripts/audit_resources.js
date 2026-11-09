const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

console.log('=== CSS LINKS ===');
const cssLinks = html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || [];
cssLinks.forEach(l => console.log(l));

console.log('=== PRELOADS / PRECONNECTS ===');
const preloads = html.match(/<link[^>]*rel=["'](?:preload|preconnect|dns-prefetch)["'][^>]*>/gi) || [];
preloads.forEach(l => console.log(l));

console.log('=== SCRIPTS ===');
const scripts = html.match(/<script[^>]*src=["'][^"']+["'][^>]*>/gi) || [];
scripts.forEach(s => console.log(s));

console.log('=== EXTERNAL FONTS / ASSETS IN CSS ===');
const css = fs.readFileSync('css/style.css', 'utf8');
const imports = css.match(/@import[^;]+;/gi) || [];
imports.forEach(i => console.log(i));

