const fs = require('fs');

['css/style.css', 'public/css/style.css'].forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let css = fs.readFileSync(filePath, 'utf8');

  // Update center-logo-img
  css = css.replace(
    /\.center-logo-img\s*\{[^}]*\}/,
    `.center-logo-img {\n  width: clamp(42px, 6.5cqw, 56px);\n  height: clamp(42px, 6.5cqw, 56px);\n  margin: 0 auto 6px;\n  object-fit: contain;\n  filter: drop-shadow(0 2px 6px rgba(120, 53, 15, 0.3));\n  display: block;\n}`
  );

  // Update navbar-logo-img
  css = css.replace(
    /\.navbar-logo-img\s*\{[^}]*\}/,
    `.navbar-logo-img {\n  width: 44px;\n  height: 44px;\n  min-width: 44px;\n  object-fit: contain;\n  border-radius: 50%;\n  border: none !important;\n  background: transparent !important;\n  padding: 0;\n  filter: drop-shadow(0 2px 8px rgba(245, 158, 11, 0.45));\n}`
  );

  fs.writeFileSync(filePath, css);
  console.log('Updated ' + filePath);
});
