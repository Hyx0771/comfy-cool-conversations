export interface QuoteEmailRequest {
  customerData: any;
  galleryId?: string;
  requestType: 'call' | 'email';
}

export interface MediaStatus {
  status: string;
  hasMedia: boolean;
}