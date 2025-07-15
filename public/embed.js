// Bolt Chat Widget Embed Script
(function() {
  // Prevent multiple initializations
  if (window.BoltChatWidget) return;

  // Configuration
  const config = {
    baseUrl: window.location.origin,
    containerId: 'bolt-chat-widget'
  };

  // Create the widget
  function createWidget() {
    // Create container
    const container = document.createElement('div');
    container.id = config.containerId;
    container.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      font-family: system-ui, -apple-system, sans-serif;
    `;

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = config.baseUrl + '/widget';
    iframe.style.cssText = `
      width: 380px;
      height: 600px;
      border: none;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12);
      background: white;
      display: none;
      position: absolute;
      bottom: 80px;
      right: 0;
    `;

    // Create button
    const button = document.createElement('button');
    button.innerHTML = `
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    `;
    button.style.cssText = `
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1E88E5, #1976D2);
      border: none;
      color: white;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(30, 136, 229, 0.3);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    `;

    // Toggle functionality
    let isOpen = false;
    button.addEventListener('click', function() {
      isOpen = !isOpen;
      if (isOpen) {
        iframe.style.display = 'block';
        button.innerHTML = `
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        `;
      } else {
        iframe.style.display = 'none';
        button.innerHTML = `
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        `;
      }
    });

    // Add hover effect
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });

    // Assemble widget
    container.appendChild(iframe);
    container.appendChild(button);
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