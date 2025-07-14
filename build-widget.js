import { execSync } from 'child_process';
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Building standalone chatbot widget...');

try {
  // Step 1: Build the widget using Vite
  console.log('📦 Building widget with Vite...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Step 2: Create dist-widget directory
  const distWidgetDir = join(__dirname, 'dist-widget');
  if (!existsSync(distWidgetDir)) {
    mkdirSync(distWidgetDir, { recursive: true });
  }
  
  // Step 3: Copy main dist files to dist-widget
  console.log('📁 Copying build files...');
  const distDir = join(__dirname, 'dist');
  
  // Copy all files from dist to dist-widget
  execSync(`cp -r ${distDir}/* ${distWidgetDir}/`, { stdio: 'inherit' });
  
  // Step 4: Create proper embed.js file
  console.log('📋 Creating embed.js...');
  const embedScript = `(function() {
    'use strict';
    
    // Prevent double loading
    if (window.ClobolChatWidget) {
        console.log('Clobol Widget already loaded');
        return;
    }
    
    // Configuration from script attributes
    const script = document.currentScript;
    const config = {
        mode: script.getAttribute('data-mode') || 'faq',
        theme: script.getAttribute('data-theme') || 'light',
        position: script.getAttribute('data-position') || 'bottom-right',
        primaryColor: script.getAttribute('data-primary-color') || '#007BFF',
        title: script.getAttribute('data-title') || 'Chat with us',
        subtitle: script.getAttribute('data-subtitle') || 'We\\'re here to help!'
    };
    
    // Base URL for assets
    const baseURL = script.src.replace('/embed.js', '');
    
    // Load CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = baseURL + '/assets/index.css';
    document.head.appendChild(cssLink);
    
    // Create widget container
    function createWidgetContainer() {
        if (document.getElementById('clobol-chatbot-container')) {
            return;
        }
        
        const container = document.createElement('div');
        container.id = 'clobol-chatbot-container';
        container.style.cssText = \`
            position: fixed;
            \${config.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
            \${config.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        \`;
        document.body.appendChild(container);
        return container;
    }
    
    // Create widget button
    function createWidgetButton() {
        const button = document.createElement('button');
        button.id = 'clobol-chat-button';
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
        
        return button;
    }
    
    // Create widget iframe
    function createWidgetIframe() {
        const iframe = document.createElement('iframe');
        iframe.id = 'clobol-chat-iframe';
        iframe.src = baseURL + '/index.html?mode=' + config.mode + '&theme=' + config.theme;
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
        return iframe;
    }
    
    // Widget state
    let isOpen = false;
    let container = null;
    let button = null;
    let iframe = null;
    
    // Initialize widget
    function initWidget() {
        container = createWidgetContainer();
        iframe = createWidgetIframe();
        button = createWidgetButton();
        
        container.appendChild(iframe);
        container.appendChild(button);
        
        button.addEventListener('click', toggleWidget);
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) {
                closeWidget();
            }
        });
        
        console.log('✅ Clobol Widget initialized successfully');
    }
    
    // Widget API functions
    function openWidget(mode) {
        if (!container) initWidget();
        
        if (mode && mode !== config.mode) {
            config.mode = mode;
            iframe.src = baseURL + '/index.html?mode=' + mode + '&theme=' + config.theme;
        }
        
        iframe.style.display = 'block';
        button.style.display = 'none';
        isOpen = true;
        
        // Add close button to iframe area
        if (!container.querySelector('.close-button')) {
            const closeButton = document.createElement('button');
            closeButton.className = 'close-button';
            closeButton.innerHTML = '×';
            closeButton.style.cssText = \`
                position: absolute;
                top: 10px;
                right: 10px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: rgba(0,0,0,0.1);
                color: #666;
                border: none;
                cursor: pointer;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            \`;
            closeButton.addEventListener('click', closeWidget);
            container.style.position = 'relative';
            container.appendChild(closeButton);
        }
        
        console.log('🚀 Widget opened in mode:', mode || config.mode);
    }
    
    function closeWidget() {
        if (iframe) iframe.style.display = 'none';
        if (button) button.style.display = 'flex';
        
        const closeButton = container?.querySelector('.close-button');
        if (closeButton) closeButton.remove();
        
        isOpen = false;
        console.log('📱 Widget closed');
    }
    
    function toggleWidget() {
        if (isOpen) {
            closeWidget();
        } else {
            openWidget();
        }
    }
    
    // Global API
    window.ClobolChatWidget = {
        open: openWidget,
        close: closeWidget,
        toggle: toggleWidget,
        isOpen: () => isOpen,
        config: config
    };
    
    // Alternative API names for compatibility
    window.ClobolWidget = window.ClobolChatWidget;
    window.openClobolChat = openWidget;
    
    // Auto-initialize after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
    console.log('📦 Clobol Widget embed script loaded');
})();`;
  
  writeFileSync(join(distWidgetDir, 'embed.js'), embedScript);
  
  // Step 5: Create integration README
  console.log('📝 Creating integration instructions...');
  const readmeContent = \`# Clobol Chatbot Widget Integration

## Quick Integration

Add this single line to your website:

\\\`\\\`\\\`html
<script 
  src="https://YOUR-NETLIFY-URL.netlify.app/embed.js"
  data-mode="faq"
  data-theme="light"
  data-position="bottom-right">
</script>
\\\`\\\`\\\`

## Configuration Options

- **data-mode**: "faq", "quote", "support"
- **data-theme**: "light", "dark"
- **data-position**: "bottom-right", "bottom-left", "top-right", "top-left"
- **data-primary-color**: Any hex color (e.g., "#FF6B35")
- **data-title**: Custom widget title
- **data-subtitle**: Custom widget subtitle

## API Methods

After the widget loads, you can control it programmatically:

\\\`\\\`\\\`javascript
// Open widget in specific mode
window.ClobolChatWidget.open('quote');

// Close widget
window.ClobolChatWidget.close();

// Toggle widget
window.ClobolChatWidget.toggle();

// Check if widget is open
if (window.ClobolChatWidget.isOpen()) {
    console.log('Widget is currently open');
}
\\\`\\\`\\\`

## Advanced Integration

For more control, use the widget library directly:

\\\`\\\`\\\`html
<link rel="stylesheet" href="https://YOUR-NETLIFY-URL.netlify.app/assets/index.css">
<script src="https://YOUR-NETLIFY-URL.netlify.app/assets/index.js"></script>
<script>
  // Widget will initialize automatically
</script>
\\\`\\\`\\\`

## Support

Contact us for integration support and customization options.
\`;
  
  writeFileSync(join(distWidgetDir, 'README.md'), readmeContent);
  
  console.log('✅ Widget build completed successfully!');
  console.log(\`📂 Widget files are in: \${distWidgetDir}\`);
  console.log('🌐 Ready for deployment to Netlify!');
  console.log('');
  console.log('📋 Generated files:');
  console.log('  - embed.js (Widget loader with API)');
  console.log('  - index.html (Main widget application)');
  console.log('  - assets/ (CSS and JS bundles)');
  console.log('  - README.md (Integration instructions)');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
