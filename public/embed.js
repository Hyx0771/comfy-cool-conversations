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
    iframe.src = `${domain}/embed-widget?config=${encodeURIComponent(JSON.stringify(config))}`;
    iframe.style.cssText = `
      position: fixed !important;
      width: 100px !important;
      height: 100px !important;
      bottom: 20px !important;
      right: 20px !important;
      border: none !important;
      z-index: 2147483647 !important;
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
      // Widget is open - expand iframe
      iframe.style.width = '100vw !important';
      iframe.style.height = '100vh !important';
      iframe.style.top = '0 !important';
      iframe.style.left = '0 !important';
      iframe.style.right = 'auto !important';
      iframe.style.bottom = 'auto !important';
      iframe.style.maxWidth = 'none !important';
      iframe.style.maxHeight = 'none !important';
    } else {
      // Widget is closed - collapse to button size
      iframe.style.width = '100px !important';
      iframe.style.height = '100px !important';
      
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
    const config = getConfig();
    const iframe = createIframe(config);
    
    // Listen for resize messages from iframe
    window.addEventListener('message', function(event) {
      if (event.data?.type === 'clobol-widget-resize') {
        handleIframeResize(iframe, event.data.isOpen);
      }
    });
    
    // Append iframe to body
    document.body.appendChild(iframe);
    
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