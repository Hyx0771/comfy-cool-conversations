import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Building Clobol Widget...');

// Build the widget with Vite
console.log('📦 Building with Vite...');
execSync('npm run build', { stdio: 'inherit' });

// Create widget distribution directory
const widgetDir = path.join(__dirname, 'dist-widget');
if (fs.existsSync(widgetDir)) {
  fs.rmSync(widgetDir, { recursive: true });
}
fs.mkdirSync(widgetDir);

// Copy built files
console.log('📋 Copying build files...');
const distDir = path.join(__dirname, 'dist');
const files = fs.readdirSync(distDir);

files.forEach(file => {
  const srcPath = path.join(distDir, file);
  const destPath = path.join(widgetDir, file);
  
  if (fs.statSync(srcPath).isDirectory()) {
    // Copy directory recursively
    fs.cpSync(srcPath, destPath, { recursive: true });
  } else {
    // Copy file
    fs.copyFileSync(srcPath, destPath);
  }
});

// Generate embed.js
console.log('🔧 Generating embed.js...');
const embedScript = `(function() {
  'use strict';
  
  // Prevent double loading
  if (window.ClobolWidgetAPI) {
    console.log('Clobol Widget already loaded');
    return;
  }
  
  // Configuration from script attributes
  const script = document.currentScript || document.querySelector('script[src*="embed.js"]');
  const config = {
    mode: script?.getAttribute('data-mode') || 'auto',
    theme: script?.getAttribute('data-theme') || 'light',
    position: script?.getAttribute('data-position') || 'bottom-right',
    primaryColor: script?.getAttribute('data-primary-color') || '#007BFF',
    title: script?.getAttribute('data-title') || 'Clobol Support',
    subtitle: script?.getAttribute('data-subtitle') || 'Hoe kunnen we helpen?'
  };
  
  // Base URL for assets
  const baseURL = script?.src ? script.src.replace('/embed.js', '') : window.location.origin;
  
  // Widget state
  let isOpen = false;
  let container = null;
  let button = null;
  let iframe = null;
  
  // Create widget container
  function createContainer() {
    if (container) return container;
    
    container = document.createElement('div');
    container.id = 'clobol-widget-container';
    container.style.cssText = \`
      position: fixed;
      \${config.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
      \${config.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    \`;
    document.body.appendChild(container);
    return container;
  }
  
  // Create floating button
  function createButton() {
    if (button) return button;
    
    button = document.createElement('button');
    button.innerHTML = \`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    \`;
    button.style.cssText = \`
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: \${config.primaryColor};
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    \`;
    
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
      button.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    });
    
    button.addEventListener('click', openWidget);
    return button;
  }
  
  // Create iframe
  function createIframe() {
    if (iframe) return iframe;
    
    iframe = document.createElement('iframe');
    iframe.style.cssText = \`
      width: 380px;
      height: 600px;
      border: none;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      background: white;
      display: none;
      margin-bottom: 10px;
    \`;
    iframe.allow = 'camera; microphone; geolocation';
    
    // Build iframe URL with config
    const params = new URLSearchParams({
      widget: 'true',
      mode: config.mode,
      theme: config.theme,
      primaryColor: config.primaryColor,
      title: config.title,
      subtitle: config.subtitle
    });
    
    iframe.src = \`\${baseURL}/index.html?\${params.toString()}\`;
    return iframe;
  }
  
  // Initialize widget
  function initWidget() {
    const cont = createContainer();
    const btn = createButton();
    const frame = createIframe();
    
    cont.appendChild(frame);
    cont.appendChild(btn);
    
    console.log('✅ Clobol Widget initialized');
  }
  
  // Widget API functions
  function openWidget(mode) {
    if (!container) initWidget();
    
    if (mode && config.mode !== mode) {
      config.mode = mode;
      const params = new URLSearchParams({
        widget: 'true',
        mode: mode,
        theme: config.theme,
        primaryColor: config.primaryColor,
        title: config.title,
        subtitle: config.subtitle
      });
      iframe.src = \`\${baseURL}/index.html?\${params.toString()}\`;
    }
    
    iframe.style.display = 'block';
    button.style.display = 'none';
    isOpen = true;
    
    // Add close overlay
    if (!container.querySelector('.close-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'close-overlay';
      overlay.innerHTML = '×';
      overlay.style.cssText = \`
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(0,0,0,0.7);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000000;
      \`;
      overlay.addEventListener('click', closeWidget);
      container.style.position = 'relative';
      container.appendChild(overlay);
    }
  }
  
  function closeWidget() {
    if (iframe) iframe.style.display = 'none';
    if (button) button.style.display = 'flex';
    
    const overlay = container?.querySelector('.close-overlay');
    if (overlay) overlay.remove();
    
    isOpen = false;
  }
  
  function toggleWidget() {
    if (isOpen) {
      closeWidget();
    } else {
      openWidget();
    }
  }
  
  // Global API
  window.ClobolWidgetAPI = {
    open: openWidget,
    close: closeWidget,
    toggle: toggleWidget,
    isOpen: () => isOpen,
    config: config
  };
  
  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    setTimeout(initWidget, 100);
  }
  
  console.log('📦 Clobol Widget loaded successfully');
})();`;

fs.writeFileSync(path.join(widgetDir, 'embed.js'), embedScript);

console.log('✅ Widget build completed!');
console.log(`📂 Widget files generated in: ${widgetDir}`);
console.log('🚀 Ready for deployment!');