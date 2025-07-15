(function() {
  // Prevent multiple initializations
  if (window.BoltChatWidget) {
    return;
  }

  // Configuration
  const config = {
    baseUrl: window.location.origin, // Will use the current domain where this script is hosted
    containerId: 'bolt-chat-widget',
    buttonId: 'bolt-chat-button'
  };

  // Create and inject CSS
  function injectStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = config.baseUrl + '/src/index.css';
    document.head.appendChild(link);
  }

  // Create widget container
  function createWidget() {
    // Create container
    const container = document.createElement('div');
    container.id = config.containerId;
    container.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = config.baseUrl + '/assistant';
    iframe.style.cssText = `
      width: 400px;
      height: 600px;
      border: none;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      background: white;
      display: none;
    `;

    // Create chat button
    const button = document.createElement('button');
    button.id = config.buttonId;
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    `;
    button.style.cssText = `
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #007BFF, #0056b3);
      border: none;
      color: white;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,123,255,0.3);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    `;

    // Add hover effects
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.boxShadow = '0 6px 16px rgba(0,123,255,0.4)';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 4px 12px rgba(0,123,255,0.3)';
    });

    // Toggle functionality
    let isOpen = false;
    button.addEventListener('click', function() {
      isOpen = !isOpen;
      if (isOpen) {
        iframe.style.display = 'block';
        button.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `;
      } else {
        iframe.style.display = 'none';
        button.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        `;
      }
    });

    // Assemble widget
    container.appendChild(iframe);
    container.appendChild(button);
    document.body.appendChild(container);
  }

  // Initialize widget
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        createWidget();
      });
    } else {
      createWidget();
    }
  }

  // Expose API
  window.BoltChatWidget = {
    init: init,
    config: config
  };

  // Auto-initialize
  init();
})();