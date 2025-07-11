export interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
}

export type ContactMethod = 'whatsapp' | 'email' | 'call';

export type ChatState = 
  | 'welcome'
  | 'faq-display'
  | 'faq-answered'
  | 'custom-question'
  | 'contact-selection'
  | 'contact-form'
  | 'completed';

export interface ChatContext {
  state: ChatState;
  selectedFAQ?: number;
  customQuestion?: string;
  contactMethod?: ContactMethod;
  contactForm?: ContactForm;
  conversationHistory: Message[];
}