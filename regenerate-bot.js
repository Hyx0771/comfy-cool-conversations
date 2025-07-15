const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run the build process
const buildProcess = spawn('node', ['build-widget.js'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

buildProcess.on('close', (code) => {
  if (code === 0) {
    console.log('Widget build completed successfully!');
    
    // Copy the built widget to public/bot.js
    const srcPath = path.join(__dirname, 'dist-widget', 'bot.js');
    const destPath = path.join(__dirname, 'public', 'bot.js');
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log('bot.js updated successfully!');
    } else {
      console.error('Built widget file not found');
    }
  } else {
    console.error(`Build process exited with code ${code}`);
  }
});