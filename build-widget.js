#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Building Clobol Chat Widget...\n');

// Build the widget
console.log('📦 Building widget library...');
try {
  execSync('vite build --mode widget', { stdio: 'inherit' });
  console.log('✅ Widget library built successfully!\n');
} catch (error) {
  console.error('❌ Widget build failed:', error.message);
  process.exit(1);
}

// Copy additional files to dist-widget
console.log('📋 Copying additional files...');
try {
  // Copy embed script
  fs.copyFileSync(
    path.join(__dirname, 'public', 'embed.js'),
    path.join(__dirname, 'dist-widget', 'embed.js')
  );
  
  // Copy widget HTML template
  fs.copyFileSync(
    path.join(__dirname, 'widget.html'),
    path.join(__dirname, 'dist-widget', 'index.html')
  );
  
  console.log('✅ Additional files copied!\n');
} catch (error) {
  console.error('❌ Failed to copy additional files:', error.message);
  process.exit(1);
}

// Generate integration instructions
const instructions = `
# Clobol Chat Widget - Integration Guide

## Files Generated:
- \`clobol-widget.iife.js\` - The main widget script
- \`clobol-widget.css\` - Widget styles
- \`embed.js\` - Easy embed script for websites
- \`index.html\` - Widget standalone page

## Quick Integration:

### Option 1: Simple Embed (Recommended)
Add this script tag to your website:

\`\`\`html
<script 
  src="https://your-cdn.com/embed.js"
  data-mode="faq"
  data-theme="light"
  data-position="bottom-right"
></script>
\`\`\`

### Option 2: Direct Script
Load the widget directly:

\`\`\`html
<link rel="stylesheet" href="https://your-cdn.com/clobol-widget.css">
<script src="https://your-cdn.com/clobol-widget.iife.js"></script>
<script>
  const widget = new ClobolChatWidget({
    mode: 'faq',
    theme: 'light',
    position: 'bottom-right'
  });
  widget.init();
</script>
\`\`\`

## Configuration Options:
- mode: 'faq' | 'quote' | 'support'
- theme: 'light' | 'dark'
- position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
- primaryColor: Any CSS color value
- title: Widget title text
- subtitle: Widget subtitle text

## API Methods:
- ClobolWidgetAPI.open() - Open the widget
- ClobolWidgetAPI.close() - Close the widget
- ClobolWidgetAPI.updateConfig(config) - Update configuration
- ClobolWidgetAPI.destroy() - Remove the widget

## Deployment:
1. Upload the contents of 'dist-widget' to your CDN or web server
2. Update the script src URLs to point to your hosted files
3. Test the integration on your website

Built on: ${new Date().toISOString()}
`;

fs.writeFileSync(
  path.join(__dirname, 'dist-widget', 'README.md'),
  instructions
);

console.log('🎉 Widget build completed successfully!');
console.log('📁 Files are ready in the "dist-widget" directory');
console.log('📖 Check dist-widget/README.md for integration instructions');
console.log('\n💡 Next steps:');
console.log('1. Upload dist-widget contents to your CDN/server');  
console.log('2. Update embed script URLs to your hosted location');
console.log('3. Test the widget on your target website');
console.log('4. Deploy and integrate! 🚀');