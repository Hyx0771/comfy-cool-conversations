// Self-contained styles for the widget to avoid conflicts with host site
export const widgetStyles = `
  /* Reset and base styles */
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
    --popover: 0 0% 100% !important;
    --popover-foreground: 222.2 84% 4.9% !important;
    --secondary: 210 40% 96% !important;
    --secondary-foreground: 222.2 47.4% 11.2% !important;
    --muted: 210 40% 96% !important;
    --muted-foreground: 215.4 16.3% 46.9% !important;
    --accent: 210 40% 96% !important;
    --accent-foreground: 222.2 47.4% 11.2% !important;
    --destructive: 0 84.2% 60.2% !important;
    --destructive-foreground: 210 40% 98% !important;
    --border: 214.3 31.8% 91.4% !important;
    --input: 214.3 31.8% 91.4% !important;
    --ring: 221.2 83.2% 53.3% !important;
    --radius: 0.5rem !important;
  }
  
  .clobol-widget-container * {
    box-sizing: border-box !important;
  }
  
  /* Trigger button */
  .clobol-widget-trigger {
    position: fixed !important;
    bottom: 20px !important;
    right: 20px !important;
    width: 60px !important;
    height: 60px !important;
    border-radius: 50% !important;
    background: hsl(var(--primary)) !important;
    color: hsl(var(--primary-foreground)) !important;
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
  
  /* Chat window */
  .clobol-widget-chat {
    position: fixed !important;
    bottom: 90px !important;
    right: 20px !important;
    width: 380px !important;
    height: 600px !important;
    max-height: 80vh !important;
    background: hsl(var(--background)) !important;
    border-radius: 12px !important;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2) !important;
    border: 1px solid hsl(var(--border)) !important;
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
  
  /* Button styles */
  .clobol-widget-container button {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    white-space: nowrap !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    transition: all 0.2s !important;
    border: none !important;
    cursor: pointer !important;
    border-radius: var(--radius) !important;
    padding: 8px 16px !important;
    text-decoration: none !important;
  }
  
  .clobol-widget-container button:disabled {
    pointer-events: none !important;
    opacity: 0.5 !important;
  }
  
  .clobol-widget-container button:hover {
    opacity: 0.9 !important;
  }
  
  /* Primary button */
  .clobol-widget-container .inline-flex.items-center.justify-center.rounded-md.font-medium.transition-colors.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:opacity-50.disabled\\:pointer-events-none.ring-offset-background.bg-primary.text-primary-foreground.hover\\:bg-primary\\/90 {
    background: hsl(var(--primary)) !important;
    color: hsl(var(--primary-foreground)) !important;
    padding: 8px 16px !important;
    border-radius: var(--radius) !important;
  }
  
  /* Secondary button */
  .clobol-widget-container .inline-flex.items-center.justify-center.rounded-md.font-medium.transition-colors.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:opacity-50.disabled\\:pointer-events-none.ring-offset-background.border.border-input.bg-background.hover\\:bg-accent.hover\\:text-accent-foreground {
    background: hsl(var(--background)) !important;
    color: hsl(var(--foreground)) !important;
    border: 1px solid hsl(var(--border)) !important;
    padding: 8px 16px !important;
    border-radius: var(--radius) !important;
  }
  
  /* Card styles */
  .clobol-widget-container .rounded-lg.border.bg-card.text-card-foreground.shadow-sm {
    border-radius: var(--radius) !important;
    border: 1px solid hsl(var(--border)) !important;
    background: hsl(var(--card)) !important;
    color: hsl(var(--card-foreground)) !important;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
  }
  
  /* Input styles */
  .clobol-widget-container input[type="text"], 
  .clobol-widget-container input[type="email"], 
  .clobol-widget-container input[type="tel"], 
  .clobol-widget-container textarea {
    flex: 1 !important;
    background: hsl(var(--background)) !important;
    border: 1px solid hsl(var(--border)) !important;
    border-radius: var(--radius) !important;
    padding: 8px 12px !important;
    font-size: 14px !important;
    color: hsl(var(--foreground)) !important;
    outline: none !important;
    transition: border-color 0.2s !important;
  }
  
  .clobol-widget-container input:focus, 
  .clobol-widget-container textarea:focus {
    border-color: hsl(var(--ring)) !important;
    outline: 2px solid transparent !important;
    outline-offset: 2px !important;
  }
  
  /* Avatar styles */
  .clobol-widget-container .relative.flex.shrink-0.overflow-hidden.rounded-full {
    position: relative !important;
    display: flex !important;
    flex-shrink: 0 !important;
    overflow: hidden !important;
    border-radius: 9999px !important;
    width: 40px !important;
    height: 40px !important;
  }
  
  /* Scrollbar styles */
  .clobol-widget-container ::-webkit-scrollbar {
    width: 6px !important;
  }
  
  .clobol-widget-container ::-webkit-scrollbar-track {
    background: hsl(var(--muted)) !important;
  }
  
  .clobol-widget-container ::-webkit-scrollbar-thumb {
    background: hsl(var(--muted-foreground)) !important;
    border-radius: 3px !important;
  }
  
  .clobol-widget-container ::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--foreground)) !important;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 480px) {
    .clobol-widget-chat {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100% !important;
      height: 100% !important;
      max-height: none !important;
      border-radius: 0 !important;
      transform: none !important;
      opacity: 1 !important;
    }
    
    .clobol-widget-chat.open {
      transform: none !important;
      opacity: 1 !important;
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