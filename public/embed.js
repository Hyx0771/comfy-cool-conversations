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
      width: 380px;
      height: 600px;
      border: none;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);
      background: white;
      display: none;
      position: absolute;
      bottom: 80px;
      right: 0;
      transform-origin: bottom right;
      animation: slideIn 0.3s ease-out;
    `;

    // Create chat button matching the design
    const button = document.createElement('button');
    button.id = config.buttonId;
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
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      outline: none;
      overflow: hidden;
    `;

    // Add ripple effect
    button.addEventListener('mousedown', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(${x}px, ${y}px) scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });

    // Add hover effects
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.boxShadow = '0 6px 20px rgba(30, 136, 229, 0.4)';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 4px 16px rgba(30, 136, 229, 0.3)';
    });

    // Toggle functionality
    let isOpen = false;
    button.addEventListener('click', function() {
      isOpen = !isOpen;
      if (isOpen) {
        iframe.style.display = 'block';
        iframe.style.animation = 'slideIn 0.3s ease-out';
        button.innerHTML = `
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `;
        button.style.background = 'linear-gradient(135deg, #424242, #303030)';
      } else {
        iframe.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
          iframe.style.display = 'none';
        }, 300);
        button.innerHTML = `
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        `;
        button.style.background = 'linear-gradient(135deg, #1E88E5, #1976D2)';
      }
    });

    // Inject animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: scale(0.8) translateY(20px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      
      @keyframes slideOut {
        from {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
        to {
          opacity: 0;
          transform: scale(0.8) translateY(20px);
        }
      }
      
      @keyframes ripple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
      
      @media (max-width: 480px) {
        #${config.containerId} iframe {
          width: 100vw !important;
          height: 100vh !important;
          border-radius: 0 !important;
          bottom: 0 !important;
          right: 0 !important;
          position: fixed !important;
        }
        
        #${config.containerId} {
          bottom: 20px !important;
          right: 20px !important;
        }
      }
    `;
    document.head.appendChild(style);

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