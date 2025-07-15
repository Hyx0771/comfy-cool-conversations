import React from 'react';
import { createRoot } from 'react-dom/client';
import EmbeddableHVACWidget from '../components/EmbeddableHVACWidget';
import '../index.css';

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

// Inject widget styles
const injectStyles = () => {
  const styleId = 'clobol-widget-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .clobol-widget-container {
        position: fixed !important;
        z-index: 999999 !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
        font-size: 14px !important;
        line-height: 1.5 !important;
        color: #0f172a !important;
        box-sizing: border-box !important;
        --primary: 220 14% 50% !important;
        --primary-foreground: 210 40% 98% !important;
        --background: 0 0% 100% !important;
        --foreground: 222.2 84% 4.9% !important;
        --card: 0 0% 100% !important;
        --card-foreground: 222.2 84% 4.9% !important;
        --secondary: 210 40% 96% !important;
        --secondary-foreground: 222.2 47.4% 11.2% !important;
        --muted: 210 40% 96% !important;
        --muted-foreground: 215.4 16.3% 46.9% !important;
        --accent: 210 40% 96% !important;
        --accent-foreground: 222.2 47.4% 11.2% !important;
        --border: 214.3 31.8% 91.4% !important;
        --input: 214.3 31.8% 91.4% !important;
        --ring: 221.2 83.2% 53.3% !important;
        --radius: 0.5rem !important;
      }
      
      .clobol-widget-container * {
        box-sizing: border-box !important;
      }
      
      /* Mobile responsive */
      @media (max-width: 480px) {
        .clobol-widget-container > div > div {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100% !important;
          height: 100% !important;
          border-radius: 0 !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
};

const initChatbot = (config: WidgetConfig = {}) => {
  // Prevent multiple initializations
  if (widgetContainer) {
    console.warn('Clobol Chatbot is already initialized');
    return;
  }

  // Inject styles
  injectStyles();

  // Create container
  widgetContainer = document.createElement('div');
  widgetContainer.id = 'clobol-widget-root';
  widgetContainer.className = 'clobol-widget-container';
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

    const toggleWidget = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div style={{ pointerEvents: 'auto' }}>
        <EmbeddableHVACWidget 
          config={{
            title: config.title || 'Bolt',
            subtitle: config.subtitle || 'Clobol assistent',
            primaryColor: config.primaryColor || '#007BFF',
            mode: 'welcome'
          }}
          isOpen={isOpen} 
          onToggle={toggleWidget} 
        />
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