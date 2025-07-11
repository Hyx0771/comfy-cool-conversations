export interface QuoteEmailRequest {
  customerData: any;
  galleryId?: string;
  requestType: 'call' | 'email';
}

export interface FAQEmailRequest {
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  customQuestion: string;
  conversationHistory: Array<{
    type: 'bot' | 'user';
    content: string;
    timestamp: Date;
  }>;
  contactMethod: 'email' | 'call';
}

export interface MediaStatus {
  status: string;
  hasMedia: boolean;
}