export class WhatsAppEncoder {
  private encodeForWhatsApp(message: string): string {
    // Minimal encoding for WhatsApp - preserve emojis and avoid double encoding
    // Only encode the absolutely necessary characters for URL safety
    return message
      .replace(/&/g, '%26')
      .replace(/\+/g, '%2B')
      .replace(/#/g, '%23')
      .replace(/\?/g, '%3F');
  }

  generateWhatsAppUrl(message: string, whatsappNumber: string): string {
    console.log('Generating WhatsApp URL with message length:', message.length);
    console.log('Original message:', message);
    
    // Use minimal encoding to preserve emojis and avoid corruption
    const encodedMessage = this.encodeForWhatsApp(message);
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(encodedMessage)}`;
    
    console.log('Final WhatsApp URL:', whatsappUrl);
    return whatsappUrl;
  }
}

// Export singleton instance
export const whatsappEncoder = new WhatsAppEncoder();