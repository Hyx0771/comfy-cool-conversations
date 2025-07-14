// Build script for widget
const fs = require('fs');
const path = require('path');

// Read template
const template = fs.readFileSync('widget-complete.html', 'utf8');

// Minify and optimize
const minified = template
  .replace(/\s+/g, ' ')
  .replace(/>\s+</g, '><')
  .trim();

// Write production version
fs.writeFileSync('widget-prod.html', minified);

// Create embed script
const embedScript = `
(function() {
  'use strict';
  
  // Load widget
  function loadWidget() {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://clobol-aigento.netlify.app/widget-prod.html';
    iframe.style.cssText = 'width: 100vw; height: 100vh; border: none; background: transparent; position: fixed; top: 0; left: 0; z-index: 999999; pointer-events: auto;';
    iframe.allow = 'microphone; camera';
    iframe.title = 'Clobol Widget';
    document.body.appendChild(iframe);
  }
  
  // Auto-load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWidget);
  } else {
    loadWidget();
  }
})();
`;

fs.writeFileSync('embed-min.js', embedScript);

console.log('✅ Widget built successfully!');
console.log('📁 Files created:');
console.log('  - widget-prod.html (minified)');
console.log('  - embed-min.js (embed script)');