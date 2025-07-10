import { CompanyConfig, DEFAULT_COMPANY_CONFIG, SERVICE_DETAIL_MAPPINGS, SERVICE_DISPLAY_NAMES } from '../config/messageConfig';
import { CustomerData } from './customerDataCollector';
import { whatsappEncoder } from './whatsappEncoder';
import { EmojiCleaner } from './emojiCleaner';

export class MessageTemplateGenerator {
  private config: CompanyConfig;

  constructor(config: CompanyConfig = DEFAULT_COMPANY_CONFIG) {
    this.config = config;
  }

  private generateGalleryUrl(galleryId: string): string {
    // Use the correct production domain for the gallery URL
    const baseUrl = 'https://clobol-aigento.com';
    return `${baseUrl}/gallery/${galleryId}`;
  }

  private replaceTemplateVariables(template: string, data: any): string {
    return template.replace(/\{([^}]+)\}/g, (match, key) => {
      const value = data[key];
      if (value === undefined || value === null || value === '') {
        return 'Niet opgegeven';
      }
      return String(value);
    });
  }

  private generateDynamicDetails(serviceType: string, customerData: CustomerData): string {
    const detailTemplate = SERVICE_DETAIL_MAPPINGS[serviceType] || [];
    const details: string[] = [];

    detailTemplate.forEach(template => {
      const detail = this.replaceTemplateVariables(template, customerData);
      // Only add detail if it doesn't end with "Niet opgegeven" (meaning the field had actual data)
      if (!detail.endsWith('Niet opgegeven')) {
        details.push(`• ${detail}`);
      }
    });

    return details.length > 0 ? details.join('\n') : '• Basis offerte aanvraag (geen extra details ingevuld)';
  }

  private formatLocation(postcode?: string, huisnummer?: string, location?: string): string {
    if (location) return location;
    if (postcode && huisnummer) {
      return `${postcode}, ${huisnummer}`;
    }
    if (postcode) return postcode;
    if (huisnummer) return `Huisnummer ${huisnummer}`;
    return 'Niet opgegeven';
  }

  private getMediaStatus(photos: File[] | string | undefined): string {
    console.log('getMediaStatus input:', photos, typeof photos);
    
    if (!photos) return 'Niet meegestuurd';
    
    // If it's already a formatted string (like "1 foto geselecteerd"), use it
    if (typeof photos === 'string') {
      // Check if it looks like a photo count string
      if (photos.includes('foto') || photos.includes('video') || photos.includes('geselecteerd') || photos.includes('bijgevoegd')) {
        return photos;
      }
      // If it's some other string, treat as "not sent"
      return 'Niet meegestuurd';
    }
    
    // Handle File array
    if (Array.isArray(photos) && photos.length > 0) {
      const imageCount = photos.filter(file => file.type.startsWith('image/')).length;
      const videoCount = photos.filter(file => file.type.startsWith('video/')).length;
      
      if (imageCount > 0 && videoCount > 0) {
        return `${imageCount} foto${imageCount > 1 ? "'s" : ''} en ${videoCount} video${videoCount > 1 ? "'s" : ''} bijgevoegd`;
      } else if (imageCount > 0) {
        return `${imageCount} foto${imageCount > 1 ? "'s" : ''} bijgevoegd`;
      } else if (videoCount > 0) {
        return `${videoCount} video${videoCount > 1 ? "'s" : ''} bijgevoegd`;
      }
    }
    
    return 'Niet meegestuurd';
  }

  generateMessage(customerData: CustomerData, galleryId?: string): string {
    console.log('Generating message with galleryId:', galleryId);
    
    // Clean all emojis from customer data for WhatsApp message
    const cleanCustomerData = EmojiCleaner.cleanObject(customerData);
    
    const serviceDisplayName = SERVICE_DISPLAY_NAMES[cleanCustomerData.serviceType] || cleanCustomerData.serviceType;
    const cleanServiceDisplayName = EmojiCleaner.cleanText(serviceDisplayName);
    const dynamicDetails = this.generateDynamicDetails(cleanCustomerData.serviceType, cleanCustomerData);
    const mediaStatus = this.getMediaStatus(cleanCustomerData.photos);
    const formattedLocation = this.formatLocation(
      cleanCustomerData.postcode, 
      cleanCustomerData.huisnummer, 
      cleanCustomerData.location
    );
    
    // Enhanced gallery section with better formatting
    const galleryUrl = galleryId ? this.generateGalleryUrl(galleryId) : null;

    console.log('Gallery URL:', galleryUrl);

    // Build media section with gallery URL prominently displayed (no emojis for WhatsApp)
    let mediaSection = `Media: ${mediaStatus}`;
    if (galleryUrl) {
      mediaSection += `

BEKIJK ALLE FOTO'S EN VIDEO'S:
${galleryUrl}

Klik op de link hierboven om alle media te bekijken`;
    }

    const template = `Hallo!

Ik heb zojuist via ${this.config.name} een offerte aangevraagd. Hieronder vind je alle details:

==============================
CONTACTGEGEVENS
==============================
Naam: ${cleanCustomerData.name || 'Niet opgegeven'}
Telefoon: ${cleanCustomerData.phone || 'Niet opgegeven'}  
E-mail: ${cleanCustomerData.email || 'Niet opgegeven'}
Adres: ${formattedLocation}

==============================
SERVICE AANVRAAG
==============================
Gevraagde dienst: ${cleanServiceDisplayName}
${mediaSection}

==============================
SPECIFICATIES
==============================
${dynamicDetails}

==============================

Graag jullie reactie of dit compleet is, dan kunnen we direct een scherpe offerte op maat maken! 

- Snelle service gegarandeerd
- Vrijblijvende offerte

Met vriendelijke groet,
Het ${this.config.name} team`;

    // Apply comprehensive emoji cleaning to the entire message for WhatsApp
    return EmojiCleaner.cleanForWhatsApp(template);
  }

  generateWhatsAppUrl(customerData: CustomerData, galleryId?: string): string {
    console.log('Generating WhatsApp URL with galleryId:', galleryId);
    
    const message = this.generateMessage(customerData, galleryId);
    return whatsappEncoder.generateWhatsAppUrl(message, this.config.whatsappNumber);
  }

  generateEmailData(customerData: CustomerData, galleryId?: string): { subject: string; body: string; to: string } {
    // Clean emojis for email as well
    const cleanCustomerData = EmojiCleaner.cleanObject(customerData);
    const serviceDisplayName = SERVICE_DISPLAY_NAMES[cleanCustomerData.serviceType] || cleanCustomerData.serviceType;
    const cleanServiceDisplayName = EmojiCleaner.cleanText(serviceDisplayName);
    const message = this.generateMessage(customerData, galleryId);
    
    return {
      subject: `Offerte aanvraag - ${cleanServiceDisplayName}`,
      body: message,
      to: this.config.emailAddress
    };
  }

  // Static method to create instance with custom config
  static withConfig(config: Partial<CompanyConfig>): MessageTemplateGenerator {
    const fullConfig = { ...DEFAULT_COMPANY_CONFIG, ...config };
    return new MessageTemplateGenerator(fullConfig);
  }
}

// Export singleton instance with default config
export const messageGenerator = new MessageTemplateGenerator();