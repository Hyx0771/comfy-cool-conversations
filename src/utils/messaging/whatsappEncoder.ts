export class WhatsAppEncoder {
  generateWhatsAppUrl(message: string, whatsappNumber: string): string {
    console.log('Generating WhatsApp URL with message length:', message.length);
    console.log('Original message:', message);
    
    // Use direct URL encoding to preserve emojis - avoid double encoding
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    
    console.log('Final WhatsApp URL:', whatsappUrl);
    return whatsappUrl;
  }
}

// Export singleton instance
export const whatsappEncoder = new WhatsAppEncoder();