const fs = require('fs');
const path = require('path');

// Read the original HTML file
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Replace CDN script references with local minified versions
const updatedHtml = htmlContent
  .replace(
    /<script src="https:\/\/cdn\.jsdelivr\.net\/gh\/david-vos\/dvos\.me@main\/scripts\/navigation\.js" defer><\/script>/g,
    '<script src="scripts/script.min.js" defer></script>'
  )
  .replace(
    /<script src="https:\/\/cdn\.jsdelivr\.net\/gh\/david-vos\/dvos\.me@main\/scripts\/p5\.min\.js" defer><\/script>/g,
    '<script src="scripts/p5.min.js" defer></script>'
  )
  .replace(
    /<script src="https:\/\/cdn\.jsdelivr\.net\/gh\/david-vos\/dvos\.me@main\/scripts\/script\.js" defer><\/script>/g,
    '' // Remove this line since it's combined in script.min.js
  );

// Write the updated HTML to dist folder
fs.writeFileSync('dist/index.html', updatedHtml);

console.log('HTML file processed and saved to dist/index.html'); 