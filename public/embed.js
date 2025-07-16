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
      
      if (isMobile) {
        iframe.style.cssText = `
          width: calc(100vw - 1rem);
          height: calc(100vh - 4rem);
          max-height: 85vh;
          border: none;
          background: transparent;
          display: block;
          position: fixed;
          bottom: 0.5rem;
          right: 0.5rem;
          pointer-events: auto;
        `;
      } else if (isTablet) {
        iframe.style.cssText = `
          width: min(28rem, calc(100vw - 2rem));
          height: min(32rem, calc(100vh - 5rem));
          border: none;
          background: transparent;
          display: block;
          pointer-events: auto;
        `;
      } else {
        iframe.style.cssText = `
          width: min(24rem, calc(100vw - 2rem));
          height: min(32rem, calc(100vh - 6rem));
          border: none;
          background: transparent;
          display: block;
          pointer-events: auto;
        `;
      }
      
      // Hernieuw transparantie attributen
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