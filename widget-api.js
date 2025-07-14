// Widget API for external integration
(function(window) {
  'use strict';

  // Configuration defaults
  const DEFAULT_CONFIG = {
    mode: null, // Will show start screen
    theme: 'light',
    position: 'bottom-right',
    primaryColor: '#007BFF',
    title: 'Clobol Support',
    subtitle: 'Hoe kunnen we helpen?',
    welcomeMessage: 'Hoi! Ik ben Bolt van Clobol. Waar kan ik je vandaag mee helpen?',
    baseUrl: 'https://clobol-aigento.netlify.app'
  };

  // Widget API
  function ClobolWidgetAPI() {
    this.config = { ...DEFAULT_CONFIG };
    this.container = null;
    this.iframe = null;
    this.isInitialized = false;
    this.isOpen = false;
  }

  ClobolWidgetAPI.prototype.init = function(config = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.createContainer();
    this.createIframe();
    this.setupEventListeners();
    this.isInitialized = true;
    console.log('✅ Clobol Widget initialized');
  };

  ClobolWidgetAPI.prototype.createContainer = function() {
    this.container = document.createElement('div');
    this.container.id = 'clobol-widget-container';
    this.container.style.cssText = `
      position: fixed;
      z-index: 999999;
      pointer-events: none;
    `;
    
    const position = this.getPosition();
    Object.assign(this.container.style, position);
    
    document.body.appendChild(this.container);
  };

  ClobolWidgetAPI.prototype.createIframe = function() {
    this.iframe = document.createElement('iframe');
    this.iframe.src = this.config.baseUrl + '/widget-complete.html';
    this.iframe.style.cssText = `
      width: 100vw;
      height: 100vh;
      border: none;
      background: transparent;
      pointer-events: auto;
    `;
    this.iframe.allow = 'microphone; camera';
    this.iframe.title = this.config.title;
    
    this.container.appendChild(this.iframe);
  };

  ClobolWidgetAPI.prototype.getPosition = function() {
    const positions = {
      'bottom-right': { bottom: '0', right: '0' },
      'bottom-left': { bottom: '0', left: '0' },
      'top-right': { top: '0', right: '0' },
      'top-left': { top: '0', left: '0' }
    };
    return positions[this.config.position] || positions['bottom-right'];
  };

  ClobolWidgetAPI.prototype.setupEventListeners = function() {
    // Listen for messages from the widget
    window.addEventListener('message', (event) => {
      if (event.source !== this.iframe.contentWindow) return;
      
      switch (event.data.type) {
        case 'widget-opened':
          this.isOpen = true;
          this.onOpen();
          break;
        case 'widget-closed':
          this.isOpen = false;
          this.onClose();
          break;
        case 'widget-message':
          this.onMessage(event.data.message);
          break;
      }
    });
  };

  ClobolWidgetAPI.prototype.open = function() {
    if (!this.isInitialized) {
      console.warn('Widget not initialized. Call init() first.');
      return;
    }
    
    this.sendMessage({ type: 'open-widget' });
  };

  ClobolWidgetAPI.prototype.close = function() {
    if (!this.isInitialized) {
      console.warn('Widget not initialized. Call init() first.');
      return;
    }
    
    this.sendMessage({ type: 'close-widget' });
  };

  ClobolWidgetAPI.prototype.toggle = function() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };

  ClobolWidgetAPI.prototype.sendMessage = function(message) {
    if (this.iframe && this.iframe.contentWindow) {
      this.iframe.contentWindow.postMessage(message, '*');
    }
  };

  ClobolWidgetAPI.prototype.updateConfig = function(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.sendMessage({ type: 'update-config', config: this.config });
  };

  ClobolWidgetAPI.prototype.destroy = function() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.isInitialized = false;
    this.isOpen = false;
  };

  // Event handlers (can be overridden)
  ClobolWidgetAPI.prototype.onOpen = function() {
    console.log('Widget opened');
  };

  ClobolWidgetAPI.prototype.onClose = function() {
    console.log('Widget closed');
  };

  ClobolWidgetAPI.prototype.onMessage = function(message) {
    console.log('Widget message:', message);
  };

  // Auto-initialization from script tag
  function autoInit() {
    const script = document.currentScript || document.querySelector('script[src*="clobol"]');
    if (!script) return;

    const config = {
      mode: script.getAttribute('data-mode'),
      theme: script.getAttribute('data-theme'),
      position: script.getAttribute('data-position'),
      primaryColor: script.getAttribute('data-primary-color'),
      title: script.getAttribute('data-title'),
      subtitle: script.getAttribute('data-subtitle'),
      welcomeMessage: script.getAttribute('data-welcome-message')
    };

    // Remove null values
    Object.keys(config).forEach(key => {
      if (config[key] === null) delete config[key];
    });

    const widget = new ClobolWidgetAPI();
    widget.init(config);

    // Make globally available
    window.ClobolWidgetAPI = widget;
  }

  // Export
  window.ClobolWidgetAPI = ClobolWidgetAPI;

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

})(window);