// Bolt Chat Widget Embed Script - Minimal Version
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
    `;

    // Create iframe - direct visible, no toggle
    const iframe = document.createElement('iframe');
    iframe.src = config.baseUrl + '/assistant'; // Keep using /assistant
    iframe.style.cssText = `
      width: 400px;
      height: 650px;
      border: none;
      background: transparent;
      display: block;
    `;

    // Mobile responsiveness
    function adjustForMobile() {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        iframe.style.cssText = `
          width: 100vw;
          height: 100vh;
          border: none;
          background: transparent;
          display: block;
          position: fixed;
          bottom: 0;
          right: 0;
          left: 0;
          top: 0;
        `;
      } else {
        iframe.style.cssText = `
          width: 400px;
          height: 650px;
          border: none;
          background: transparent;
          display: block;
        `;
      }
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