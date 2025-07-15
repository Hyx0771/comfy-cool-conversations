import React, { useState, useEffect, useRef } from 'react';
import { injectStyles } from './WidgetStyles';

interface WidgetConfig {
  title?: string;
  subtitle?: string;
  primaryColor?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  welcomeMessage?: string;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const StandaloneWidget: React.FC<{ config: WidgetConfig }> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    title = 'Clobol Support',
    subtitle = 'Hoe kunnen we helpen?',
    primaryColor = '#007BFF',
    position = 'bottom-right',
    welcomeMessage = 'Hallo! Hoe kan ik je helpen?'
  } = config;

  useEffect(() => {
    injectStyles();
    
    // Add welcome message
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        text: welcomeMessage,
        isUser: false,
        timestamp: new Date()
      }]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('prijs') || lowerInput.includes('kosten')) {
      return 'Voor een persoonlijke offerte kunt u contact met ons opnemen. Onze prijzen zijn afhankelijk van het type systeem en de grootte van uw woning.';
    }
    
    if (lowerInput.includes('installatie')) {
      return 'Onze gecertificeerde technici zorgen voor een professionele installatie. Dit duurt meestal 1-2 dagen, afhankelijk van de complexiteit.';
    }
    
    if (lowerInput.includes('onderhoud')) {
      return 'Regelmatig onderhoud is belangrijk voor optimale prestaties. Wij adviseren jaarlijks onderhoud voor uw HVAC-systeem.';
    }
    
    if (lowerInput.includes('contact') || lowerInput.includes('bellen')) {
      return 'U kunt ons bereiken via telefoon, e-mail of dit chatvenster. Onze klantenservice is beschikbaar van maandag tot vrijdag van 8:00 tot 17:00.';
    }
    
    return 'Bedankt voor uw vraag! Onze specialisten kunnen u hier meer over vertellen. Zou u graag contact willen opnemen voor een persoonlijk gesprek?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'bottom-left':
        return { bottom: '20px', left: '20px', right: 'auto' };
      case 'top-right':
        return { top: '20px', right: '20px', bottom: 'auto' };
      case 'top-left':
        return { top: '20px', left: '20px', bottom: 'auto', right: 'auto' };
      default:
        return { bottom: '20px', right: '20px' };
    }
  };

  const getChatPositionStyles = () => {
    switch (position) {
      case 'bottom-left':
        return { bottom: '90px', left: '20px', right: 'auto' };
      case 'top-right':
        return { top: '90px', right: '20px', bottom: 'auto' };
      case 'top-left':
        return { top: '90px', left: '20px', bottom: 'auto', right: 'auto' };
      default:
        return { bottom: '90px', right: '20px' };
    }
  };

  return (
    <div className="clobol-widget-container">
      {/* Trigger Button */}
      <button
        className="clobol-widget-trigger"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          ...getPositionStyles(),
          backgroundColor: primaryColor
        }}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`clobol-widget-chat ${isOpen ? 'open' : ''}`}
          style={getChatPositionStyles()}
        >
          {/* Header */}
          <div className="clobol-widget-header" style={{ backgroundColor: primaryColor }}>
            <div>
              <h3>{title}</h3>
              <p>{subtitle}</p>
            </div>
            <button 
              className="clobol-widget-close"
              onClick={() => setIsOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="clobol-widget-content">
            <div className="clobol-widget-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`clobol-widget-message ${message.isUser ? 'user' : 'bot'}`}
                >
                  <div className="clobol-widget-message-content">
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="clobol-widget-message bot">
                  <div className="clobol-widget-message-content">
                    Aan het typen...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="clobol-widget-input-container">
              <input
                type="text"
                className="clobol-widget-input"
                placeholder="Type een bericht..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <button
                className="clobol-widget-send"
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                style={{ backgroundColor: primaryColor }}
              >
                Verstuur
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};