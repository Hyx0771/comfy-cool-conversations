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
      z-index: 999999;
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
      if (isMobile) {
        iframe.style.cssText = `
          width: calc(100vw - 2rem);
          height: 80vh;
          max-height: 600px;
          border: none;
          background: transparent;
          display: block;
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          pointer-events: auto;
        `;
      } else {
        iframe.style.cssText = `
          width: 400px;
          height: 650px;
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