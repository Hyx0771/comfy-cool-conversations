// Bolt Chat Widget Embed Script - Transparent Background
(function() {
  // Prevent multiple initializations
  if (window.BoltChatWidget) return;

  // Configuration
  const config = {
    baseUrl: 'https://clobol-aigento.com',
    containerId: 'bolt-chat-widget'
  };

  // Create the widget
  function createWidget() {
    // Create container
    const container = document.createElement('div');
    container.id = config.containerId;
    container.style.cssText = `
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 1000;
      font-family: system-ui, -apple-system, sans-serif;
      pointer-events: none;
    `;

    // Create iframe - volledig transparant
    const iframe = document.createElement('iframe');
    iframe.src = config.baseUrl + '/assistant';
    iframe.style.cssText = `
      width: 400px;
      height: 650px;
      border: none;
      background: transparent;
      display: block;
      pointer-events: auto;
    `;

    // Maak iframe volledig transparant
    iframe.setAttribute('allowtransparency', 'true');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');

    // Unified responsive design
    function adjustForMobile() {
      const isMobile = window.innerWidth <= 768;
      const viewportHeight = window.innerHeight;
      
      if (isMobile) {
        // Mobile: Maximum screen space utilization
        iframe.style.cssText = `
          width: calc(100vw - 0.5rem);
          height: calc(100vh - 60px);
          max-height: 95vh;
          border: none;
          background: transparent;
          display: block;
          position: fixed;
          bottom: 0.25rem;
          right: 0.25rem;
          left: 0.25rem;
          pointer-events: auto;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
        `;
      } else {
        // Desktop: Consistent sidebar design
        iframe.style.cssText = `
          width: 420px;
          height: 680px;
          border: none;
          background: transparent;
          display: block;
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          pointer-events: auto;
          border-radius: 16px;
        `;
      }
      
      // Always ensure transparency attributes
      iframe.setAttribute('allowtransparency', 'true');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('scrolling', 'no');
    }

    // Listen for resize events
    window.addEventListener('resize', adjustForMobile);
    adjustForMobile(); // Initial check

    // Add iframe to container
    container.appendChild(iframe);
    document.body.appendChild(container);
  }

  // Initialize
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createWidget);
    } else {
      createWidget();
    }
  }

  // Expose API
  window.BoltChatWidget = { init, config };

  // Auto-initialize
  init();
})();