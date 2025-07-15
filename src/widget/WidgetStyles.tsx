// Self-contained styles for the widget to avoid conflicts with host site
export const widgetStyles = `
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
  
  .clobol-widget-trigger svg {
    width: 24px !important;
    height: 24px !important;
    fill: currentColor !important;
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
  
  .clobol-widget-close svg {
    width: 16px !important;
    height: 16px !important;
    fill: currentColor !important;
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

export const injectStyles = () => {
  const styleId = 'clobol-widget-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = widgetStyles;
    document.head.appendChild(style);
  }
};