export class WhatsAppEncoder {
  private encodeForWhatsApp(message: string): string {
    // WhatsApp-safe encoding: preserve emojis and handle special characters
    // Use a more careful approach to URL encoding
    return message
      .replace(/%/g, '%25') // Encode % first to avoid double encoding
      .replace(/&/g, '%26')
      .replace(/=/g, '%3D')
      .replace(/\+/g, '%2B')
      .replace(/#/g, '%23');
  }

  generateWhatsAppUrl(message: string, whatsappNumber: string): string {
    console.log('Generating WhatsApp URL with message length:', message.length);
    console.log('Generated message:', message);
    
    // Use custom encoding for WhatsApp
    const encodedMessage = this.encodeForWhatsApp(encodeURIComponent(message));
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    console.log('Final WhatsApp URL:', whatsappUrl);
    return whatsappUrl;
  }
}

// Export singleton instance
export const whatsappEncoder = new WhatsAppEncoder();