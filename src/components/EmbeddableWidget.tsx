import React, { useState, useEffect } from 'react';
import { ClobotFAQChatbot } from './chatbot/ClobotFAQChatbot';
import HVACQuoteAssistant from './HVACQuoteAssistant';
import SupportAssistant from './SupportAssistant';
import BoltStartScreen from './BoltStartScreen';
import { Button } from './ui/button';
import { MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react';

interface WidgetConfig {
  mode?: 'faq' | 'quote' | 'support';
  theme?: 'light' | 'dark';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;
  title?: string;
  subtitle?: string;
  welcomeMessage?: string;
}

interface EmbeddableWidgetProps {
  config: WidgetConfig;
}

export const EmbeddableWidget: React.FC<EmbeddableWidgetProps> = ({ config }) => {
  console.log('EmbeddableWidget: Rendering with config:', config);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Apply custom CSS variables for theming
  useEffect(() => {
    if (config.primaryColor) {
      document.documentElement.style.setProperty('--widget-primary', config.primaryColor);
    }
  }, [config.primaryColor]);

  // Listen for messages from parent window (embed.js)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('EmbeddableWidget: Received message:', event.data);
      if (event.data?.type === 'clobol-widget-open') {
        console.log('EmbeddableWidget: Opening widget');
        setIsOpen(true);
        setIsMinimized(false);
      } else if (event.data?.type === 'clobol-widget-close') {
        console.log('EmbeddableWidget: Closing widget');
        setIsOpen(false);
        setIsMinimized(false);
      } else if (event.data?.type === 'clobol-widget-toggle') {
        console.log('EmbeddableWidget: Toggling widget');
        setIsOpen(prev => !prev);
        setIsMinimized(false);
      } else if (event.data?.type === 'clobol-widget-config') {
        console.log('EmbeddableWidget: Received config:', event.data.config);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Send resize messages to parent window
  useEffect(() => {
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'clobol-widget-resize',
        isOpen: isOpen && !isMinimized
      }, '*');
    }
  }, [isOpen, isMinimized]);

  const toggleWidget = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    setIsMinimized(false);
    
    // Send message to parent window for iframe sizing
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'clobol-widget-resize',
        isOpen: newIsOpen
      }, '*');
    }
  };

  const minimizeWidget = () => {
    setIsMinimized(!isMinimized);
  };

  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  
  const renderChatContent = () => {
    // If no specific mode is set via config and user hasn't selected, show start screen
    if (!config.mode && !selectedMode) {
      return (
        <BoltStartScreen 
          onModeSelect={(mode) => {
            setSelectedMode(mode);
          }} 
        />
      );
    }

    // Use selected mode or fallback to config mode
    const currentMode = selectedMode || config.mode || 'faq';
    
    switch (currentMode) {
      case 'quote':
        return <HVACQuoteAssistant />;
      case 'support':
        return <SupportAssistant initialMode="support" />;
      case 'faq':
      default:
        return <ClobotFAQChatbot isOpen={true} onClose={() => setIsOpen(false)} showHeader={false} />;
    }
  };

  return (
    <div className={`widget-container ${config.theme || 'light'}`}>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={toggleWidget}
          className="widget-trigger"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: config.primaryColor || '#007BFF',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="widget-chat-window"
          style={{
            width: isMinimized ? '300px' : '380px',
            height: isMinimized ? '60px' : '600px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease',
            maxHeight: '80vh',
            border: '1px solid rgba(226, 232, 240, 0.3)'
          }}
        >
          {/* Header */}
          <div 
            className="widget-header"
            style={{
              backgroundColor: config.primaryColor || '#007BFF',
              color: 'white',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              minHeight: '60px',
              boxSizing: 'border-box'
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                {config.title || 'Clobol Support'}
              </h3>
              {!isMinimized && (
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
                  {config.subtitle || 'Hoe kunnen we helpen?'}
                </p>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={minimizeWidget}
                style={{ 
                  color: 'white', 
                  padding: '4px',
                  minWidth: 'auto',
                  height: 'auto'
                }}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                style={{ 
                  color: 'white', 
                  padding: '4px',
                  minWidth: 'auto',
                  height: 'auto'
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <div style={{ flex: 1, overflow: 'hidden' }}>
              {renderChatContent()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};