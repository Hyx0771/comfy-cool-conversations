const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building widget...');

try {
  // Run the build process
  execSync('node build-widget.js', { stdio: 'inherit' });
  
  console.log('Widget built successfully!');
  
  // Copy the built widget to public/bot.js
  const srcPath = path.join(__dirname, 'dist-widget', 'bot.js');
  const destPath = path.join(__dirname, 'public', 'bot.js');
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log('bot.js updated successfully!');
    console.log('New widget with full HVAC functionality is ready!');
  } else {
    console.error('Built widget file not found at:', srcPath);
  }
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}