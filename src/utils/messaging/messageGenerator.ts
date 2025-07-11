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
    const baseUrl = 'https://app.aigento.ai';
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

  private getMediaStatus(photos: File[] | string | undefined, galleryId?: string): { status: string; hasMedia: boolean } {
    console.log('getMediaStatus input:', photos, typeof photos, 'galleryId:', galleryId);
    
    // If we have a gallery ID, we definitely have media
    if (galleryId) {
      if (typeof photos === 'string' && (photos.includes('foto') || photos.includes('video'))) {
        return { status: photos, hasMedia: true };
      }
      if (Array.isArray(photos) && photos.length > 0) {
        const imageCount = photos.filter(file => file.type.startsWith('image/')).length;
        const videoCount = photos.filter(file => file.type.startsWith('video/')).length;
        
        if (imageCount > 0 && videoCount > 0) {
          return { 
            status: `${imageCount} foto${imageCount > 1 ? "'s" : ''} en ${videoCount} video${videoCount > 1 ? "'s" : ''} bijgevoegd`,
            hasMedia: true 
          };
        } else if (imageCount > 0) {
          return { 
            status: `${imageCount} foto${imageCount > 1 ? "'s" : ''} bijgevoegd`,
            hasMedia: true 
          };
        } else if (videoCount > 0) {
          return { 
            status: `${videoCount} video${videoCount > 1 ? "'s" : ''} bijgevoegd`,
            hasMedia: true 
          };
        }
      }
      // Fallback when we have gallery but unclear media count
      return { status: "Media bijgevoegd", hasMedia: true };
    }
    
    // No gallery ID - check if we have files
    if (!photos) return { status: 'Geen media bijgevoegd', hasMedia: false };
    
    // Handle string format
    if (typeof photos === 'string') {
      if (photos.includes('foto') || photos.includes('video') || photos.includes('geselecteerd') || photos.includes('bijgevoegd')) {
        return { status: photos, hasMedia: true };
      }
      return { status: 'Geen media bijgevoegd', hasMedia: false };
    }
    
    // Handle File array
    if (Array.isArray(photos) && photos.length > 0) {
      const imageCount = photos.filter(file => file.type.startsWith('image/')).length;
      const videoCount = photos.filter(file => file.type.startsWith('video/')).length;
      
      if (imageCount > 0 && videoCount > 0) {
        return { 
          status: `${imageCount} foto${imageCount > 1 ? "'s" : ''} en ${videoCount} video${videoCount > 1 ? "'s" : ''} bijgevoegd`,
          hasMedia: true 
        };
      } else if (imageCount > 0) {
        return { 
          status: `${imageCount} foto${imageCount > 1 ? "'s" : ''} bijgevoegd`,
          hasMedia: true 
        };
      } else if (videoCount > 0) {
        return { 
          status: `${videoCount} video${videoCount > 1 ? "'s" : ''} bijgevoegd`,
          hasMedia: true 
        };
      }
    }
    
    return { status: 'Geen media bijgevoegd', hasMedia: false };
  }

  generateMessage(customerData: CustomerData, galleryId?: string): string {
    console.log('Generating message with galleryId:', galleryId);
    
    // Clean all emojis from customer data for WhatsApp message
    const cleanCustomerData = EmojiCleaner.cleanObject(customerData);
    
    const serviceDisplayName = SERVICE_DISPLAY_NAMES[cleanCustomerData.serviceType] || cleanCustomerData.serviceType;
    const cleanServiceDisplayName = EmojiCleaner.cleanText(serviceDisplayName);
    const dynamicDetails = this.generateDynamicDetails(cleanCustomerData.serviceType, cleanCustomerData);
    const mediaInfo = this.getMediaStatus(cleanCustomerData.photos, galleryId);
    const formattedLocation = this.formatLocation(
      cleanCustomerData.postcode, 
      cleanCustomerData.huisnummer, 
      cleanCustomerData.location
    );
    
    // Enhanced gallery section with better formatting
    const galleryUrl = galleryId ? this.generateGalleryUrl(galleryId) : null;

    console.log('Gallery URL:', galleryUrl);

    // Build the complete message with perfect formatting
    let template = `Hallo!

Ik heb zojuist via ${this.config.name} een offerte aangevraagd.
Hieronder vind je alle details:

==================================================
CONTACTGEGEVENS
==================================================

Naam: ${cleanCustomerData.name || 'Niet opgegeven'}
Telefoon: ${cleanCustomerData.phone || 'Niet opgegeven'}
E-mail: ${cleanCustomerData.email || 'Niet opgegeven'}
Adres: ${formattedLocation}

==================================================
GEVRAAGDE SERVICE
==================================================

Service: ${cleanServiceDisplayName}`;

    // Add media section based on whether we have media or not
    if (mediaInfo.hasMedia && galleryUrl) {
      template += `

==================================================
FOTO'S EN VIDEO'S
==================================================

${mediaInfo.status}

BEKIJK ALLE MEDIA HIER:
${galleryUrl}

Klik op bovenstaande link om alle foto's en video's te bekijken.`;
    } else if (mediaInfo.hasMedia) {
      template += `

Media: ${mediaInfo.status}`;
    } else {
      template += `

Media: ${mediaInfo.status}`;
    }

    template += `

==================================================
SPECIFICATIES
==================================================

${dynamicDetails}

==================================================

Graag jullie reactie of deze informatie compleet is, dan kunnen we direct een scherpe offerte op maat maken!

ONZE SERVICE:
- Snelle service gegarandeerd
- Vrijblijvende offerte
- Professioneel advies

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