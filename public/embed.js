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

    // Mobile responsiveness
    function adjustForMobile() {
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      if (isMobile) {
        // Mobile: Full width with safe margins, dynamic height
        iframe.style.cssText = `
          width: calc(100vw - 1rem);
          height: clamp(400px, ${Math.min(viewportHeight * 0.8, 600)}px, 80vh);
          max-width: 100vw;
          border: none;
          background: transparent;
          display: block;
          position: fixed;
          bottom: 0.5rem;
          right: 0.5rem;
          left: 0.5rem;
          pointer-events: auto;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        `;
      } else if (isTablet) {
        // Tablet: Larger but constrained
        iframe.style.cssText = `
          width: clamp(380px, 50vw, 500px);
          height: clamp(500px, 70vh, 650px);
          border: none;
          background: transparent;
          display: block;
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          pointer-events: auto;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.12);
        `;
      } else {
        // Desktop: Original dimensions
        iframe.style.cssText = `
          width: 400px;
          height: 650px;
          border: none;
          background: transparent;
          display: block;
          pointer-events: auto;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.12);
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