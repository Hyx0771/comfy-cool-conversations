
export interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

export interface ChatContext {
  state: 'welcome' | 'faq-display' | 'faq-answered' | 'custom-question' | 'contact-selection' | 'contact-form' | 'completed';
  conversationHistory: Message[];
  selectedFAQ?: number;
  customQuestion?: string;
  contactMethod?: ContactMethod;
  contactForm?: {
    name: string;
    email: string;
    phone: string;
  };
}

export type ContactMethod = 'whatsapp' | 'email' | 'call';
