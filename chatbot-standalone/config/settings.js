
// Default Settings Configuration
// This file contains the default settings for the chatbot

export const defaultSettings = {
  // UI Settings
  ui: {
    theme: 'light', // 'light', 'dark', 'auto'
    primaryColor: '#007BFF',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    borderRadius: '8px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
  },
  
  // Chat behavior
  behavior: {
    autoOpen: false,
    startMode: 'welcome', // 'welcome', 'quote', 'faq'
    typingDelay: 1500,
    messageDelay: 500,
    showTimestamps: true,
    enableSounds: false
  },
  
  // Widget positioning
  positioning: {
    position: 'bottom-right', // 'bottom-right', 'bottom-left', 'custom'
    offset: {
      bottom: '1rem',
      right: '1rem'
    },
    zIndex: 1000,
    mobile: {
      fullscreen: true,
      position: 'fixed'
    }
  },
  
  // Messages and content
  content: {
    welcomeMessage: 'Hoi! Bolt hier – jouw klusmaat van Clobol ❄️ Offerte of vraag? Even klikken, dan fix ik het.',
    companyName: 'Clobol',
    supportEmail: 'info@clobol.nl',
    supportPhone: '070-123-4567',
    language: 'nl' // 'nl', 'en'
  },
  
  // Features configuration
  features: {
    quoteFlow: {
      enabled: true,
      services: [
        'new-airco',
        'heat-pump',
        'maintenance',
        'repair',
        'commissioning',
        'project-advice'
      ]
    },
    faqSupport: {
      enabled: true,
      showNumbers: true,
      allowCustomQuestions: true
    },
    fileUpload: {
      enabled: true,
      maxFiles: 5,
      maxFileSize: 10, // MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'video/mp4']
    },
    whatsapp: {
      enabled: true,
      number: '+31658769652'
    },
    analytics: {
      enabled: false,
      trackClicks: true,
      trackFormSubmissions: true,
      trackPageViews: false
    }
  },
  
  // API configuration
  api: {
    timeout: 30000, // 30 seconds
    retries: 3,
    endpoints: {
      quotes: null, // Will use demo endpoints if null
      support: null,
      upload: null,
      faq: null
    }
  },
  
  // Development settings
  development: {
    debugMode: false,
    verboseLogging: false,
    showPerformanceMetrics: false,
    mockApiResponses: true
  }
};

// Responsive breakpoints
export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200
};

// Animation settings
export const animations = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500
  },
  easing: {
    default: 'ease',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

// Utility function to merge settings
export function mergeSettings(userSettings = {}) {
  const merged = JSON.parse(JSON.stringify(defaultSettings));
  
  function deepMerge(target, source) {
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {};
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  
  deepMerge(merged, userSettings);
  return merged;
}

// Export default
export default defaultSettings;
