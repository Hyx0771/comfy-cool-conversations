// Widget Types
export interface WidgetConfig {
  mode?: 'faq' | 'quote' | 'support';
  theme?: 'light' | 'dark';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;
  title?: string;
  subtitle?: string;
  welcomeMessage?: string;
}

export interface Message {
  id: number;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface ConversationState {
  state: 'welcome' | 'faq-display' | 'custom-question' | 'faq-answered' | 'contact-selection' | 'contact-form';
  conversationHistory: Message[];
  contactMethod?: 'whatsapp' | 'email' | 'phone';
}

export interface ContactMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  action: () => void;
}