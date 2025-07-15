import React from 'react';
import { createRoot } from 'react-dom/client';
import { StandaloneWidget } from './StandaloneWidget';

interface WidgetConfig {
  title?: string;
  subtitle?: string;
  primaryColor?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  welcomeMessage?: string;
}

// Global widget API
declare global {
  interface Window {
    ClobolChatbot: {
      init: (config?: WidgetConfig) => void;
      destroy: () => void;
      open: () => void;
      close: () => void;
      isOpen: () => boolean;
    };
  }
}

let widgetRoot: any = null;
let widgetContainer: HTMLDivElement | null = null;
let widgetInstance: any = null;

const initChatbot = (config: WidgetConfig = {}) => {
  // Prevent multiple initializations
  if (widgetContainer) {
    console.warn('Clobol Chatbot is already initialized');
    return;
  }

  // Create container
  widgetContainer = document.createElement('div');
  widgetContainer.id = 'clobol-widget-root';
  widgetContainer.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    pointer-events: none !important;
    z-index: 999999 !important;
  `;
  
  document.body.appendChild(widgetContainer);

  // Initialize React app
  widgetRoot = createRoot(widgetContainer);
  
  const WidgetApp = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    React.useEffect(() => {
      // Store widget instance for API access
      widgetInstance = {
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        isOpen: () => isOpen
      };
    }, [isOpen]);

    return (
      <div style={{ pointerEvents: 'auto' }}>
        <StandaloneWidget config={config} />
      </div>
    );
  };

  widgetRoot.render(<WidgetApp />);
};

const destroyChatbot = () => {
  if (widgetRoot) {
    widgetRoot.unmount();
    widgetRoot = null;
  }
  
  if (widgetContainer) {
    document.body.removeChild(widgetContainer);
    widgetContainer = null;
  }
  
  widgetInstance = null;
  
  // Remove styles
  const styles = document.getElementById('clobol-widget-styles');
  if (styles) {
    styles.remove();
  }
};

// Create global API
window.ClobolChatbot = {
  init: initChatbot,
  destroy: destroyChatbot,
  open: () => widgetInstance?.open?.(),
  close: () => widgetInstance?.close?.(),
  isOpen: () => widgetInstance?.isOpen?.() || false
};

// Auto-initialize if config is provided via data attributes
document.addEventListener('DOMContentLoaded', () => {
  const script = document.querySelector('script[src*="bot.js"]');
  if (script) {
    const config: WidgetConfig = {};
    
    // Read config from data attributes
    if (script.getAttribute('data-title')) {
      config.title = script.getAttribute('data-title') || undefined;
    }
    if (script.getAttribute('data-subtitle')) {
      config.subtitle = script.getAttribute('data-subtitle') || undefined;
    }
    if (script.getAttribute('data-primary-color')) {
      config.primaryColor = script.getAttribute('data-primary-color') || undefined;
    }
    if (script.getAttribute('data-position')) {
      config.position = script.getAttribute('data-position') as any || undefined;
    }
    if (script.getAttribute('data-welcome-message')) {
      config.welcomeMessage = script.getAttribute('data-welcome-message') || undefined;
    }
    
    // Auto-initialize with config
    if (script.getAttribute('data-auto-init') !== 'false') {
      initChatbot(config);
    }
  }
});

// Export for manual initialization
export { initChatbot };
export default initChatbot;