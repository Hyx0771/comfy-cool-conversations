(function() {
  'use strict';
  
  // Default configuration
  var defaultConfig = {
    mode: 'faq',
    theme: 'light',
    position: 'bottom-right',
    primaryColor: '#007BFF',
    title: 'Clobol Support',
    subtitle: 'Hoe kunnen we helpen?',
    welcomeMessage: 'Hoi! Waar kan ik je mee helpen?'
  };

  // Get the current script to extract configuration
  var currentScript = document.currentScript || (function() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  // Parse configuration from script attributes
  var config = {};
  if (currentScript) {
    // Get data attributes
    var dataset = currentScript.dataset;
    for (var key in dataset) {
      if (dataset.hasOwnProperty(key)) {
        config[key] = dataset[key];
      }
    }
    
    // Parse JSON config if provided
    var jsonConfig = currentScript.getAttribute('data-config');
    if (jsonConfig) {
      try {
        var parsedConfig = JSON.parse(jsonConfig);
        config = Object.assign(config, parsedConfig);
      } catch (e) {
        console.warn('Clobol Widget: Invalid JSON configuration', e);
      }
    }
  }

  // Merge with defaults
  config = Object.assign({}, defaultConfig, config);

  // Widget loader
  function loadWidget() {
    // Check if widget is already loaded
    if (window.clobolWidget) {
      return;
    }

    // Create widget iframe
    var iframe = document.createElement('iframe');
    var baseUrl = currentScript.src.replace('/embed.js', '');
    
    // Build URL with configuration parameters
    var params = new URLSearchParams();
    params.set('widget', 'true');
    for (var key in config) {
      if (config.hasOwnProperty(key) && config[key]) {
        params.set(key, config[key]);
      }
    }
    
    iframe.src = baseUrl + '/?' + params.toString();
    console.log('Clobol Widget: Loading iframe from:', iframe.src);
    iframe.style.cssText = 'border: none; position: fixed; z-index: 999999; transition: all 0.3s ease;';
    iframe.allow = 'clipboard-write';
    iframe.title = 'Clobol Support Widget';
    
    // Set iframe size and position
    var container = document.createElement('div');
    container.id = 'clobol-widget-container';
    container.style.cssText = 'position: fixed; z-index: 999999; pointer-events: none;';
    
    // Set position based on config
    var positions = {
      'bottom-right': { bottom: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' },
      'top-right': { top: '20px', right: '20px' },
      'top-left': { top: '20px', left: '20px' }
    };
    
    var pos = positions[config.position] || positions['bottom-right'];
    Object.assign(container.style, pos);
    
    // Set iframe dimensions to match widget size
    iframe.style.width = '80px';
    iframe.style.height = '80px';
    iframe.style.borderRadius = '50%';
    iframe.style.overflow = 'hidden';
    iframe.style.pointerEvents = 'auto';
    
    // Add error handling
    iframe.onerror = function() {
      console.error('Clobol Widget: Failed to load widget iframe');
    };
    
    container.appendChild(iframe);
    document.body.appendChild(container);
    
    // Store references for API
    window.clobolWidget = {
      iframe: iframe,
      container: container,
      config: config,
      isOpen: false
    };
  }

  // Load when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWidget);
  } else {
    loadWidget();
  }

  // Expose configuration API
  window.ClobolWidgetConfig = config;
  
  // Expose control API
  window.ClobolWidgetAPI = {
    open: function() {
      if (window.clobolWidget && window.clobolWidget.iframe) {
        window.clobolWidget.iframe.style.width = '400px';
        window.clobolWidget.iframe.style.height = '600px';
        window.clobolWidget.iframe.style.borderRadius = '12px';
        window.clobolWidget.isOpen = true;
        
        // Send message to iframe to open widget
        window.clobolWidget.iframe.contentWindow.postMessage({
          type: 'clobol-widget-open'
        }, '*');
      }
    },
    close: function() {
      if (window.clobolWidget && window.clobolWidget.iframe) {
        window.clobolWidget.iframe.style.width = '80px';
        window.clobolWidget.iframe.style.height = '80px';
        window.clobolWidget.iframe.style.borderRadius = '50%';
        window.clobolWidget.isOpen = false;
        
        // Send message to iframe to close widget
        window.clobolWidget.iframe.contentWindow.postMessage({
          type: 'clobol-widget-close'
        }, '*');
      }
    },
    toggle: function() {
      if (window.clobolWidget) {
        if (window.clobolWidget.isOpen) {
          this.close();
        } else {
          this.open();
        }
      }
    },
    updateConfig: function(newConfig) {
      if (window.clobolWidget) {
        Object.assign(window.clobolWidget.config, newConfig);
        // Reload iframe with new config
        var params = new URLSearchParams();
        params.set('widget', 'true');
        for (var key in window.clobolWidget.config) {
          if (window.clobolWidget.config.hasOwnProperty(key) && window.clobolWidget.config[key]) {
            params.set(key, window.clobolWidget.config[key]);
          }
        }
        var baseUrl = window.clobolWidget.iframe.src.split('?')[0];
        window.clobolWidget.iframe.src = baseUrl + '?' + params.toString();
      }
    },
    destroy: function() {
      if (window.clobolWidget) {
        if (window.clobolWidget.container && window.clobolWidget.container.parentNode) {
          window.clobolWidget.container.parentNode.removeChild(window.clobolWidget.container);
        }
        window.clobolWidget = null;
      }
    }
  };
  
  // Listen for messages from iframe to handle size changes
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'clobol-widget-resize' && window.clobolWidget) {
      var iframe = window.clobolWidget.iframe;
      if (event.data.isOpen) {
        iframe.style.width = '400px';
        iframe.style.height = '600px';
        iframe.style.borderRadius = '12px';
        window.clobolWidget.isOpen = true;
      } else {
        iframe.style.width = '80px';
        iframe.style.height = '80px';
        iframe.style.borderRadius = '50%';
        window.clobolWidget.isOpen = false;
      }
    }
  });
})();