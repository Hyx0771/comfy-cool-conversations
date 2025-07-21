
// Clobol AI Chatbot - Standalone Embed Script
(function() {
  'use strict';
  
  // Prevent multiple initializations
  if (window.BoltChatWidget) {
    console.warn('Bolt Chat Widget is already initialized');
    return;
  }

  // Default configuration
  const defaultConfig = {
    containerId: 'bolt-chat-widget',
    position: 'bottom-right', // 'bottom-right', 'bottom-left', 'custom'
    theme: {
      primaryColor: '#007BFF',
      backgroundColor: '#ffffff',
      textColor: '#333333'
    },
    autoOpen: false,
    startMode: 'welcome', // 'welcome', 'quote', 'faq'
    companyName: 'Clobol',
    welcomeMessage: 'Hoi! Bolt hier – jouw klusmaat van Clobol ❄️ Offerte of vraag? Even klikken, dan fix ik het.',
    customStyles: '',
    onOpen: null,
    onClose: null,
    onQuoteSubmit: null
  };

  // Merge user config with defaults
  const config = Object.assign({}, defaultConfig, window.BoltChatConfig || {});

  // Get the directory path of this script
  function getScriptPath() {
    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];
    const scriptSrc = currentScript.src;
    return scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));
  }

  const basePath = getScriptPath();

  // Create the widget container
  function createWidget() {
    let container;
    
    if (config.position === 'custom' && config.containerId !== 'bolt-chat-widget') {
      container = document.getElementById(config.containerId);
      if (!container) {
        console.error(`Custom container with ID "${config.containerId}" not found`);
        return;
      }
    } else {
      container = document.createElement('div');
      container.id = config.containerId;
      document.body.appendChild(container);
    }

    // Apply positioning styles
    if (config.position !== 'custom') {
      container.style.cssText = getPositionStyles(config.position);
    }

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = `${basePath}/index.html#config=${encodeURIComponent(JSON.stringify(config))}`;
    iframe.style.cssText = getIframeStyles();
    
    // Set iframe attributes for transparency and security
    iframe.setAttribute('allowtransparency', 'true');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');

    // Add responsive behavior
    addResponsiveBehavior(iframe);

    // Add to container
    container.appendChild(iframe);

    // Handle iframe communication
    setupMessageHandling(iframe);

    console.log('Bolt Chat Widget initialized successfully');
    
    // Auto-open if configured
    if (config.autoOpen) {
      setTimeout(() => {
        iframe.contentWindow?.postMessage({ type: 'OPEN_CHAT' }, '*');
      }, 1000);
    }
  }

  function getPositionStyles(position) {
    const baseStyles = `
      position: fixed;
      z-index: 1000;
      font-family: system-ui, -apple-system, sans-serif;
      pointer-events: none;
    `;

    switch (position) {
      case 'bottom-left':
        return baseStyles + `
          bottom: 1rem;
          left: 1rem;
        `;
      case 'bottom-right':
      default:
        return baseStyles + `
          bottom: 1rem;
          right: 1rem;
        `;
    }
  }

  function getIframeStyles() {
    return `
      border: none;
      background: transparent;
      display: block;
      pointer-events: auto;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12);
      transition: all 0.3s ease;
    `;
  }

  function addResponsiveBehavior(iframe) {
    function adjustForMobile() {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        iframe.style.cssText = getIframeStyles() + `
          width: calc(100vw - 1rem);
          height: calc(100vh - 80px);
          max-height: 95vh;
          position: fixed;
          bottom: 0.5rem;
          right: 0.5rem;
          left: 0.5rem;
        `;
      } else {
        iframe.style.cssText = getIframeStyles() + `
          width: 420px;
          height: 680px;
        `;
      }
    }

    // Initial adjustment
    adjustForMobile();
    
    // Listen for resize events
    window.addEventListener('resize', adjustForMobile);
    
    // Store cleanup function
    iframe._cleanup = () => {
      window.removeEventListener('resize', adjustForMobile);
    };
  }

  function setupMessageHandling(iframe) {
    window.addEventListener('message', (event) => {
      // Security: Only accept messages from our iframe
      if (event.source !== iframe.contentWindow) return;

      const { type, data } = event.data;

      switch (type) {
        case 'CHAT_OPENED':
          if (config.onOpen) config.onOpen();
          break;
          
        case 'CHAT_CLOSED':
          if (config.onClose) config.onClose();
          break;
          
        case 'QUOTE_SUBMITTED':
          if (config.onQuoteSubmit) config.onQuoteSubmit(data);
          break;
          
        case 'RESIZE_IFRAME':
          if (data.width) iframe.style.width = data.width + 'px';
          if (data.height) iframe.style.height = data.height + 'px';
          break;
      }
    });
  }

  // Load required stylesheets
  function loadStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${basePath}/assets/styles.css`;
    document.head.appendChild(link);

    // Add custom styles if provided
    if (config.customStyles) {
      const style = document.createElement('style');
      style.textContent = config.customStyles;
      document.head.appendChild(style);
    }
  }

  // Initialize when DOM is ready
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        loadStyles();
        createWidget();
      });
    } else {
      loadStyles();
      createWidget();
    }
  }

  // Public API
  const BoltChatWidget = {
    init,
    config,
    open: () => {
      const iframe = document.querySelector(`#${config.containerId} iframe`);
      if (iframe) {
        iframe.contentWindow?.postMessage({ type: 'OPEN_CHAT' }, '*');
      }
    },
    close: () => {
      const iframe = document.querySelector(`#${config.containerId} iframe`);
      if (iframe) {
        iframe.contentWindow?.postMessage({ type: 'CLOSE_CHAT' }, '*');
      }
    },
    setMode: (mode) => {
      const iframe = document.querySelector(`#${config.containerId} iframe`);
      if (iframe) {
        iframe.contentWindow?.postMessage({ type: 'SET_MODE', mode }, '*');
      }
    },
    destroy: () => {
      const container = document.getElementById(config.containerId);
      if (container) {
        const iframe = container.querySelector('iframe');
        if (iframe && iframe._cleanup) {
          iframe._cleanup();
        }
        if (config.position !== 'custom') {
          container.remove();
        } else {
          container.innerHTML = '';
        }
      }
    }
  };

  // Expose API
  window.BoltChatWidget = BoltChatWidget;

  // Auto-initialize
  init();

  console.log('Bolt Chat Widget embed script loaded');
})();
