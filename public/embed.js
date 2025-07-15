// Expanding Chatbot Widget Embed Script
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
    // Create main container
    const container = document.createElement('div');
    container.id = config.containerId;
    container.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      font-family: system-ui, -apple-system, sans-serif;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    // Create floating button
    const button = document.createElement('button');
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1000000;
    `;

    // Create iframe (initially hidden)
    const iframe = document.createElement('iframe');
    iframe.src = config.baseUrl + '/assistant';
    iframe.style.cssText = `
      width: 0;
      height: 0;
      border: none;
      background: transparent;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      opacity: 0;
      transform: scale(0.8);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: absolute;
      bottom: 0;
      right: 0;
      pointer-events: none;
    `;

    // Set iframe attributes
    iframe.setAttribute('allowtransparency', 'true');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');

    // State management
    let isOpen = false;

    // Animation functions
    function openChat() {
      isOpen = true;
      
      // Container expansion
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Mobile: Full screen
        container.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          z-index: 999999;
          font-family: system-ui, -apple-system, sans-serif;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        // Hide button on mobile
        button.style.cssText = `
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1E88E5, #1976D2);
          border: none;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(30, 136, 229, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 1000000;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        `;
        
        // Expand iframe to full screen
        iframe.style.cssText = `
          width: 100vw;
          height: 100vh;
          border: none;
          background: transparent;
          border-radius: 0;
          box-shadow: none;
          opacity: 1;
          transform: scale(1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: auto;
        `;
      } else {
        // Desktop: Expanded chat window
        container.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 999999;
          font-family: system-ui, -apple-system, sans-serif;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        // Fade out button
        button.style.cssText = `
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1E88E5, #1976D2);
          border: none;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(30, 136, 229, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          bottom: 0;
          right: 0;
          z-index: 1000000;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        `;
        
        // Expand iframe
        iframe.style.cssText = `
          width: 400px;
          height: 600px;
          border: none;
          background: transparent;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          opacity: 1;
          transform: scale(1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: absolute;
          bottom: 0;
          right: 0;
          pointer-events: auto;
        `;
      }
    }

    function closeChat() {
      isOpen = false;
      
      // Reset container
      container.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999999;
        font-family: system-ui, -apple-system, sans-serif;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      `;
      
      // Show button
      button.style.cssText = `
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: linear-gradient(135deg, #1E88E5, #1976D2);
        border: none;
        color: white;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(30, 136, 229, 0.3);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1000000;
        opacity: 1;
        transform: scale(1);
        pointer-events: auto;
      `;
      
      // Hide iframe
      iframe.style.cssText = `
        width: 0;
        height: 0;
        border: none;
        background: transparent;
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: absolute;
        bottom: 0;
        right: 0;
        pointer-events: none;
      `;
    }

    // Button click handler
    button.addEventListener('click', function() {
      if (isOpen) {
        closeChat();
      } else {
        openChat();
      }
    });

    // Button hover effects
    button.addEventListener('mouseenter', () => {
      if (!isOpen) {
        button.style.transform = 'scale(1.05)';
      }
    });

    button.addEventListener('mouseleave', () => {
      if (!isOpen) {
        button.style.transform = 'scale(1)';
      }
    });

    // Listen for messages from iframe to close
    window.addEventListener('message', function(event) {
      if (event.origin !== config.baseUrl) return;
      
      if (event.data.type === 'CLOSE_CHAT') {
        closeChat();
      }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
      if (isOpen) {
        // Re-trigger open animation with new dimensions
        setTimeout(() => {
          openChat();
        }, 100);
      }
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
  window.BoltChatWidget = { 
    init, 
    config,
    open: function() {
      const container = document.getElementById(config.containerId);
      if (container) {
        const button = container.querySelector('button');
        if (button) button.click();
      }
    },
    close: function() {
      window.postMessage({ type: 'CLOSE_CHAT' }, config.baseUrl);
    }
  };

  // Auto-initialize
  init();
})();