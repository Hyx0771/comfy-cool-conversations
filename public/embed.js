(function() {
  'use strict';
  
  // Configuration defaults
  const defaultConfig = {
    mode: 'welcome',
    theme: 'light',
    position: 'bottom-right',
    primaryColor: '#007BFF',
    title: 'Bolt',
    subtitle: 'Clobol assistent'
  };

  // Get configuration from script attributes
  function getConfig() {
    const script = document.currentScript || document.querySelector('script[src*="embed.js"]');
    if (!script) return defaultConfig;

    const config = { ...defaultConfig };
    
    // Extract data attributes
    const dataset = script.dataset;
    if (dataset.mode) config.mode = dataset.mode;
    if (dataset.theme) config.theme = dataset.theme;
    if (dataset.position) config.position = dataset.position;
    if (dataset.primaryColor) config.primaryColor = dataset.primaryColor;
    if (dataset.title) config.title = dataset.title;
    if (dataset.subtitle) config.subtitle = dataset.subtitle;
    
    return config;
  }

  // Get the script's domain for iframe src
  function getScriptDomain() {
    const script = document.currentScript || document.querySelector('script[src*="embed.js"]');
    if (!script) return window.location.origin;
    
    try {
      const url = new URL(script.src);
      return url.origin;
    } catch (e) {
      return window.location.origin;
    }
  }

  // Create iframe element
  function createIframe(config) {
    const iframe = document.createElement('iframe');
    const domain = getScriptDomain();
    
    // Configure iframe
    iframe.src = `${domain}/embed?config=${encodeURIComponent(JSON.stringify(config))}`;
    iframe.style.cssText = `
      position: fixed !important;
      width: 60px !important;
      height: 60px !important;
      bottom: 20px !important;
      right: 20px !important;
      border: none !important;
      border-radius: 12px !important;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1) !important;
      z-index: 999999 !important;
      background: transparent !important;
      pointer-events: auto !important;
      transition: all 0.3s ease !important;
    `;
    
    // Handle position
    if (config.position === 'bottom-left') {
      iframe.style.right = 'auto !important';
      iframe.style.left = '20px !important';
    } else if (config.position === 'top-right') {
      iframe.style.bottom = 'auto !important';
      iframe.style.top = '20px !important';
    } else if (config.position === 'top-left') {
      iframe.style.bottom = 'auto !important';
      iframe.style.top = '20px !important';
      iframe.style.right = 'auto !important';
      iframe.style.left = '20px !important';
    }
    
    iframe.id = 'clobol-widget-iframe';
    iframe.allow = 'clipboard-write';
    iframe.loading = 'lazy';
    
    return iframe;
  }

  // Handle iframe resizing based on widget state
  function handleIframeResize(iframe, isOpen) {
    if (isOpen) {
      // Widget is open - show chat window
      iframe.style.width = '380px !important';
      iframe.style.height = '600px !important';
      iframe.style.maxHeight = '80vh !important';
      iframe.style.maxWidth = 'calc(100vw - 40px) !important';
      
      // Mobile responsive
      if (window.innerWidth <= 480) {
        iframe.style.width = 'calc(100vw - 20px) !important';
        iframe.style.height = '70vh !important';
        iframe.style.left = '10px !important';
        iframe.style.right = '10px !important';
        iframe.style.bottom = '10px !important';
      }
    } else {
      // Widget is closed - show only button
      iframe.style.width = '60px !important';
      iframe.style.height = '60px !important';
      iframe.style.maxHeight = 'none !important';
      iframe.style.maxWidth = 'none !important';
      
      // Restore position
      const config = getConfig();
      if (config.position === 'bottom-left') {
        iframe.style.bottom = '20px !important';
        iframe.style.left = '20px !important';
        iframe.style.right = 'auto !important';
        iframe.style.top = 'auto !important';
      } else if (config.position === 'top-right') {
        iframe.style.top = '20px !important';
        iframe.style.right = '20px !important';
        iframe.style.bottom = 'auto !important';
        iframe.style.left = 'auto !important';
      } else if (config.position === 'top-left') {
        iframe.style.top = '20px !important';
        iframe.style.left = '20px !important';
        iframe.style.right = 'auto !important';
        iframe.style.bottom = 'auto !important';
      } else {
        // bottom-right (default)
        iframe.style.bottom = '20px !important';
        iframe.style.right = '20px !important';
        iframe.style.top = 'auto !important';
        iframe.style.left = 'auto !important';
      }
    }
  }

  // Initialize widget
  function initWidget() {
    // Check if widget is already initialized
    if (window.ClobolWidgetAPI) {
      return;
    }
    
    const config = getConfig();
    const iframe = createIframe(config);
    
    // Add iframe directly to body
    document.body.appendChild(iframe);
    
    // Wait for iframe to load before setting up communication
    iframe.addEventListener('load', function() {
      // Listen for resize messages from iframe
      window.addEventListener('message', function(event) {
        // Ensure the message is from our iframe
        if (event.source === iframe.contentWindow) {
          if (event.data?.type === 'clobol-widget-resize') {
            handleIframeResize(iframe, event.data.isOpen);
          }
        }
      });
      
      // Send initial config to iframe
      iframe.contentWindow.postMessage({ 
        type: 'clobol-widget-config', 
        config: config 
      }, '*');
    });
    
    // Widget is now ready
    
    // Create public API
    window.ClobolWidgetAPI = {
      open: function() {
        iframe.contentWindow.postMessage({ type: 'clobol-widget-open' }, '*');
      },
      close: function() {
        iframe.contentWindow.postMessage({ type: 'clobol-widget-close' }, '*');
      },
      toggle: function() {
        iframe.contentWindow.postMessage({ type: 'clobol-widget-toggle' }, '*');
      }
    };
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})();