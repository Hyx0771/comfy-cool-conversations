(function() {
  'use strict';
  
  // Widget styles
  const widgetStyles = `
    .clobol-widget-container {
      position: fixed !important;
      z-index: 999999 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
      font-size: 14px !important;
      line-height: 1.5 !important;
      color: #333 !important;
      box-sizing: border-box !important;
    }
    
    .clobol-widget-container * {
      box-sizing: border-box !important;
    }
    
    .clobol-widget-trigger {
      position: fixed !important;
      bottom: 20px !important;
      right: 20px !important;
      width: 60px !important;
      height: 60px !important;
      border-radius: 50% !important;
      background: #007BFF !important;
      color: white !important;
      border: none !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
      transition: all 0.3s ease !important;
      z-index: 999999 !important;
    }
    
    .clobol-widget-trigger:hover {
      transform: scale(1.05) !important;
      box-shadow: 0 6px 20px rgba(0,0,0,0.2) !important;
    }
    
    .clobol-widget-chat {
      position: fixed !important;
      bottom: 90px !important;
      right: 20px !important;
      width: 380px !important;
      height: 600px !important;
      max-height: 80vh !important;
      background: white !important;
      border-radius: 12px !important;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2) !important;
      border: 1px solid #e2e8f0 !important;
      overflow: hidden !important;
      display: flex !important;
      flex-direction: column !important;
      z-index: 999999 !important;
      transform: translateY(20px) !important;
      opacity: 0 !important;
      transition: all 0.3s ease !important;
    }
    
    .clobol-widget-chat.open {
      transform: translateY(0) !important;
      opacity: 1 !important;
    }
    
    .clobol-widget-header {
      background: #007BFF !important;
      color: white !important;
      padding: 16px !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      border-bottom: 1px solid #0056b3 !important;
    }
    
    .clobol-widget-header h3 {
      margin: 0 !important;
      font-size: 16px !important;
      font-weight: 600 !important;
    }
    
    .clobol-widget-header p {
      margin: 0 !important;
      font-size: 12px !important;
      opacity: 0.9 !important;
    }
    
    .clobol-widget-close {
      background: none !important;
      border: none !important;
      color: white !important;
      cursor: pointer !important;
      padding: 4px !important;
      border-radius: 4px !important;
      transition: background 0.2s !important;
    }
    
    .clobol-widget-close:hover {
      background: rgba(255,255,255,0.1) !important;
    }
    
    .clobol-widget-content {
      flex: 1 !important;
      overflow: hidden !important;
      display: flex !important;
      flex-direction: column !important;
    }
    
    .clobol-widget-messages {
      flex: 1 !important;
      overflow-y: auto !important;
      padding: 16px !important;
    }
    
    .clobol-widget-message {
      margin-bottom: 12px !important;
      display: flex !important;
      gap: 8px !important;
    }
    
    .clobol-widget-message.user {
      justify-content: flex-end !important;
    }
    
    .clobol-widget-message-content {
      max-width: 70% !important;
      padding: 8px 12px !important;
      border-radius: 8px !important;
      word-wrap: break-word !important;
    }
    
    .clobol-widget-message.bot .clobol-widget-message-content {
      background: #f1f3f4 !important;
      color: #333 !important;
    }
    
    .clobol-widget-message.user .clobol-widget-message-content {
      background: #007BFF !important;
      color: white !important;
    }
    
    .clobol-widget-input-container {
      padding: 16px !important;
      border-top: 1px solid #e2e8f0 !important;
      display: flex !important;
      gap: 8px !important;
    }
    
    .clobol-widget-input {
      flex: 1 !important;
      padding: 8px 12px !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 6px !important;
      font-size: 14px !important;
      outline: none !important;
      font-family: inherit !important;
    }
    
    .clobol-widget-input:focus {
      border-color: #007BFF !important;
    }
    
    .clobol-widget-send {
      padding: 8px 16px !important;
      background: #007BFF !important;
      color: white !important;
      border: none !important;
      border-radius: 6px !important;
      cursor: pointer !important;
      font-size: 14px !important;
      transition: background 0.2s !important;
    }
    
    .clobol-widget-send:hover {
      background: #0056b3 !important;
    }
    
    .clobol-widget-send:disabled {
      background: #ccc !important;
      cursor: not-allowed !important;
    }
    
    @media (max-width: 480px) {
      .clobol-widget-chat {
        width: calc(100vw - 40px) !important;
        height: calc(100vh - 120px) !important;
        right: 20px !important;
        bottom: 90px !important;
      }
    }
  `;
  
  // Inject styles
  const injectStyles = () => {
    const styleId = 'clobol-widget-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = widgetStyles;
      document.head.appendChild(style);
    }
  };
  
  // Widget implementation
  class ClobolWidget {
    constructor(config = {}) {
      this.config = {
        title: 'Clobol Support',
        subtitle: 'Hoe kunnen we helpen?',
        primaryColor: '#007BFF',
        position: 'bottom-right',
        welcomeMessage: 'Hallo! Hoe kan ik je helpen?',
        ...config
      };
      
      this.isOpen = false;
      this.messages = [];
      this.container = null;
      this.isLoading = false;
      
      this.init();
    }
    
    init() {
      injectStyles();
      this.createWidget();
      this.addWelcomeMessage();
    }
    
    createWidget() {
      // Create container
      this.container = document.createElement('div');
      this.container.className = 'clobol-widget-container';
      this.container.innerHTML = this.getWidgetHTML();
      
      document.body.appendChild(this.container);
      
      // Add event listeners
      this.addEventListeners();
    }
    
    getWidgetHTML() {
      const { title, subtitle, primaryColor } = this.config;
      
      return `
        <button class="clobol-widget-trigger" style="background: ${primaryColor};">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
          </svg>
        </button>
        
        <div class="clobol-widget-chat">
          <div class="clobol-widget-header" style="background: ${primaryColor};">
            <div>
              <h3>${title}</h3>
              <p>${subtitle}</p>
            </div>
            <button class="clobol-widget-close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          
          <div class="clobol-widget-content">
            <div class="clobol-widget-messages"></div>
            
            <div class="clobol-widget-input-container">
              <input type="text" class="clobol-widget-input" placeholder="Type een bericht...">
              <button class="clobol-widget-send" style="background: ${primaryColor};">Verstuur</button>
            </div>
          </div>
        </div>
      `;
    }
    
    addEventListeners() {
      const trigger = this.container.querySelector('.clobol-widget-trigger');
      const close = this.container.querySelector('.clobol-widget-close');
      const input = this.container.querySelector('.clobol-widget-input');
      const send = this.container.querySelector('.clobol-widget-send');
      
      trigger.addEventListener('click', () => this.toggle());
      close.addEventListener('click', () => this.close());
      send.addEventListener('click', () => this.sendMessage());
      
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendMessage();
      });
    }
    
    toggle() {
      this.isOpen ? this.close() : this.open();
    }
    
    open() {
      this.isOpen = true;
      const chat = this.container.querySelector('.clobol-widget-chat');
      chat.style.display = 'flex';
      setTimeout(() => chat.classList.add('open'), 10);
    }
    
    close() {
      this.isOpen = false;
      const chat = this.container.querySelector('.clobol-widget-chat');
      chat.classList.remove('open');
      setTimeout(() => chat.style.display = 'none', 300);
    }
    
    addWelcomeMessage() {
      this.addMessage(this.config.welcomeMessage, false);
    }
    
    addMessage(text, isUser = true) {
      const messagesContainer = this.container.querySelector('.clobol-widget-messages');
      const messageEl = document.createElement('div');
      messageEl.className = `clobol-widget-message ${isUser ? 'user' : 'bot'}`;
      messageEl.innerHTML = `<div class="clobol-widget-message-content">${text}</div>`;
      
      messagesContainer.appendChild(messageEl);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    sendMessage() {
      const input = this.container.querySelector('.clobol-widget-input');
      const text = input.value.trim();
      
      if (!text || this.isLoading) return;
      
      this.addMessage(text, true);
      input.value = '';
      
      this.isLoading = true;
      
      // Show typing indicator
      this.addMessage('Aan het typen...', false);
      
      // Simulate bot response
      setTimeout(() => {
        // Remove typing indicator
        const messages = this.container.querySelectorAll('.clobol-widget-message');
        messages[messages.length - 1].remove();
        
        // Add bot response
        this.addMessage(this.getBotResponse(text), false);
        this.isLoading = false;
      }, 1000);
    }
    
    getBotResponse(input) {
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
    }
    
    destroy() {
      if (this.container) {
        document.body.removeChild(this.container);
        this.container = null;
      }
      
      const styles = document.getElementById('clobol-widget-styles');
      if (styles) styles.remove();
    }
  }
  
  // Global API
  window.ClobolChatbot = {
    init: (config) => new ClobolWidget(config),
    version: '1.0.0'
  };
  
  // Auto-initialize if script has data attributes
  document.addEventListener('DOMContentLoaded', () => {
    const script = document.querySelector('script[src*="bot.js"]');
    if (script && script.getAttribute('data-auto-init') !== 'false') {
      const config = {};
      
      // Read config from data attributes
      if (script.getAttribute('data-title')) config.title = script.getAttribute('data-title');
      if (script.getAttribute('data-subtitle')) config.subtitle = script.getAttribute('data-subtitle');
      if (script.getAttribute('data-primary-color')) config.primaryColor = script.getAttribute('data-primary-color');
      if (script.getAttribute('data-position')) config.position = script.getAttribute('data-position');
      if (script.getAttribute('data-welcome-message')) config.welcomeMessage = script.getAttribute('data-welcome-message');
      
      window.ClobolChatbot.init(config);
    }
  });
  
})();