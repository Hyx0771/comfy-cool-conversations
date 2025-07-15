import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatBotWidget from './components/ChatBotWidget';
import './widget.css';

interface WidgetConfig {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark' | 'auto';
  primaryColor?: string;
  borderRadius?: string;
  zIndex?: number;
  initialMode?: 'welcome' | 'quote' | 'support' | 'faq';
  showBranding?: boolean;
  language?: string;
  customStyles?: Record<string, string>;
}

class ClobotWidget {
  private root: any = null;
  private container: HTMLElement | null = null;
  private config: WidgetConfig = {};
  private isInitialized = false;

  init(config: WidgetConfig = {}) {
    if (this.isInitialized) {
      console.warn('Clobot Widget already initialized');
      return;
    }

    this.config = {
      position: 'bottom-right',
      theme: 'auto',
      primaryColor: '#2563eb',
      borderRadius: '12px',
      zIndex: 9999,
      initialMode: 'welcome',
      showBranding: true,
      language: 'en',
      ...config
    };

    this.createContainer();
    this.applyCustomStyles();
    this.render();
    this.isInitialized = true;

    // Listen for theme changes
    if (this.config.theme === 'auto') {
      this.setupAutoTheme();
    }
  }

  private createContainer() {
    // Create widget container with CSS isolation
    this.container = document.createElement('div');
    this.container.id = 'clobot-widget-container';
    this.container.className = 'clobot-widget-root';
    
    // Apply position styles
    const positions = {
      'bottom-right': { bottom: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' },
      'top-right': { top: '20px', right: '20px' },
      'top-left': { top: '20px', left: '20px' }
    };

    const pos = positions[this.config.position!];
    Object.assign(this.container.style, {
      position: 'fixed',
      zIndex: this.config.zIndex?.toString(),
      ...pos
    });

    document.body.appendChild(this.container);
  }

  private applyCustomStyles() {
    if (!this.container) return;

    // Create a style element for custom CSS variables
    const styleEl = document.createElement('style');
    styleEl.id = 'clobot-widget-styles';
    
    let css = `
      .clobot-widget-root {
        --clobot-primary: ${this.config.primaryColor};
        --clobot-border-radius: ${this.config.borderRadius};
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
    `;

    // Apply custom styles if provided
    if (this.config.customStyles) {
      Object.entries(this.config.customStyles).forEach(([property, value]) => {
        css += `.clobot-widget-root { --clobot-${property}: ${value}; }\n`;
      });
    }

    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  private setupAutoTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => {
      if (this.container) {
        this.container.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
      }
    };

    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);
  }

  private render() {
    if (!this.container) return;

    this.root = createRoot(this.container);
    this.root.render(
      <React.StrictMode>
        <div className="clobot-widget-wrapper">
          <ChatBotWidget />
        </div>
      </React.StrictMode>
    );
  }

  destroy() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
    
    if (this.container) {
      document.body.removeChild(this.container);
      this.container = null;
    }

    // Remove custom styles
    const styleEl = document.getElementById('clobot-widget-styles');
    if (styleEl) {
      styleEl.remove();
    }

    this.isInitialized = false;
  }

  // Public API methods
  open() {
    window.dispatchEvent(new CustomEvent('openChatbot'));
  }

  close() {
    // Implementation depends on ChatBotWidget structure
    console.log('Close method called');
  }

  setMode(mode: string) {
    window.dispatchEvent(new CustomEvent('openChatbot', { detail: { mode } }));
  }
}

// Global widget instance
const widget = new ClobotWidget();

// Expose to window
(window as any).ClobotWidget = {
  init: (config: WidgetConfig) => widget.init(config),
  open: () => widget.open(),
  close: () => widget.close(),
  setMode: (mode: string) => widget.setMode(mode),
  destroy: () => widget.destroy()
};

export default widget;