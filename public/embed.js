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

    // Create widget script tag
    var widgetScript = document.createElement('script');
    var baseUrl = currentScript.src.replace('/embed.js', '');
    widgetScript.src = baseUrl + '/clobol-widget.iife.js';
    widgetScript.async = true;
    
    // Mark the script for auto-initialization
    widgetScript.setAttribute('data-clobol-widget', 'true');
    widgetScript.setAttribute('data-config', JSON.stringify(config));
    
    // Load CSS
    var widgetCSS = document.createElement('link');
    widgetCSS.rel = 'stylesheet';
    widgetCSS.href = baseUrl + '/clobol-widget.css';
    
    // Add error handling
    widgetScript.onerror = function() {
      console.error('Clobol Widget: Failed to load widget script');
    };
    
    widgetCSS.onerror = function() {
      console.warn('Clobol Widget: Failed to load widget styles');
    };

    // Append to head
    document.head.appendChild(widgetCSS);
    document.head.appendChild(widgetScript);
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
      if (window.clobolWidget) {
        // Trigger open if widget exists
        var event = new CustomEvent('clobol-widget-open');
        window.dispatchEvent(event);
      }
    },
    close: function() {
      if (window.clobolWidget) {
        var event = new CustomEvent('clobol-widget-close');
        window.dispatchEvent(event);
      }
    },
    updateConfig: function(newConfig) {
      if (window.clobolWidget) {
        window.clobolWidget.updateConfig(newConfig);
      }
    },
    destroy: function() {
      if (window.clobolWidget) {
        window.clobolWidget.destroy();
        window.clobolWidget = null;
      }
    }
  };
})();