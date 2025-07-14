import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { EmbeddableWidget } from './components/EmbeddableWidget';

// Widget configuration interface
interface WidgetConfig {
  mode?: 'faq' | 'quote' | 'support';
  theme?: 'light' | 'dark';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;
  title?: string;
  subtitle?: string;
  welcomeMessage?: string;
}

// Global widget class
class ClobolChatWidget {
  private container: HTMLElement | null = null;
  private root: ReactDOM.Root | null = null;
  private config: WidgetConfig;

  constructor(config: WidgetConfig = {}) {
    this.config = {
      mode: 'faq',
      theme: 'light',
      position: 'bottom-right',
      primaryColor: '#007BFF',
      title: 'Clobol Support',
      subtitle: 'Hoe kunnen we helpen?',
      welcomeMessage: 'Hoi! Waar kan ik je mee helpen?',
      ...config
    };
  }

  init() {
    // Create container
    this.container = document.createElement('div');
    this.container.id = 'clobol-chat-widget';
    this.container.style.cssText = `
      position: fixed;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    `;

    // Set position
    this.setPosition();

    // Append to body
    document.body.appendChild(this.container);

    // Create React root and render
    this.root = ReactDOM.createRoot(this.container);
    this.root.render(
      <React.StrictMode>
        <EmbeddableWidget config={this.config} />
      </React.StrictMode>
    );
  }

  private setPosition() {
    if (!this.container) return;

    const positions = {
      'bottom-right': { bottom: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' },
      'top-right': { top: '20px', right: '20px' },
      'top-left': { top: '20px', left: '20px' }
    };

    const pos = positions[this.config.position || 'bottom-right'];
    Object.assign(this.container.style, pos);
  }

  destroy() {
    if (this.root) {
      this.root.unmount();
    }
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }

  updateConfig(newConfig: Partial<WidgetConfig>) {
    this.config = { ...this.config, ...newConfig };
    if (this.root && this.container) {
      this.root.render(
        <React.StrictMode>
          <EmbeddableWidget config={this.config} />
        </React.StrictMode>
      );
    }
  }
}

// Make it available globally
declare global {
  interface Window {
    ClobolChatWidget: typeof ClobolChatWidget;
    clobolWidget?: ClobolChatWidget;
  }
}

window.ClobolChatWidget = ClobolChatWidget;

// Auto-initialize if config is provided
document.addEventListener('DOMContentLoaded', () => {
  const script = document.querySelector('script[data-clobol-widget]');
  if (script) {
    const config = JSON.parse(script.getAttribute('data-config') || '{}');
    window.clobolWidget = new ClobolChatWidget(config);
    window.clobolWidget.init();
  }
});

export { ClobolChatWidget };
export type { WidgetConfig };