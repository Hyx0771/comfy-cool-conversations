(function() {
  'use strict';
  
  // Simple iframe-based widget
  function createClobolWidget(config = {}) {
    const widget = document.createElement('iframe');
    widget.src = (config.baseUrl || window.location.origin) + '/embed';
    widget.style.cssText = `
      position: fixed !important;
      bottom: 20px !important;
      right: 20px !important;
      width: 400px !important;
      height: 600px !important;
      border: none !important;
      border-radius: 12px !important;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2) !important;
      z-index: 999999 !important;
      background: white !important;
    `;
    
    // Make responsive
    if (window.innerWidth <= 480) {
      widget.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        border-radius: 0 !important;
        z-index: 999999 !important;
        background: white !important;
      `;
    }
    
    document.body.appendChild(widget);
    return widget;
  }
  
  // Global API
  window.ClobolChatbot = {
    init: function(config) {
      return createClobolWidget(config);
    }
  };
  
  // Auto-init
  document.addEventListener('DOMContentLoaded', function() {
    const script = document.querySelector('script[src*="bot.js"]');
    if (script && script.getAttribute('data-auto-init') !== 'false') {
      window.ClobolChatbot.init();
    }
  });
})();