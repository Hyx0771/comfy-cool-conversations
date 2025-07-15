const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building clean widget...');

try {
  // Run the build process
  execSync('node build-widget.js', { stdio: 'inherit' });
  
  // Copy the built widget to public/bot.js
  const srcPath = path.join(__dirname, 'dist-widget', 'bot.js');
  const destPath = path.join(__dirname, 'public', 'bot.js');
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log('\n✅ Widget built successfully!');
    console.log('📄 bot.js updated with full HVAC functionality');
    console.log('🚀 Ready to embed with script tag');
  } else {
    console.error('❌ Built widget file not found');
  }
} catch (error) {
  console.error('❌ Build failed:', error.message);
}