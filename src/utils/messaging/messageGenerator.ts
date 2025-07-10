import { CompanyConfig, DEFAULT_COMPANY_CONFIG, SERVICE_DETAIL_MAPPINGS, SERVICE_DISPLAY_NAMES } from '../config/messageConfig';
import { CustomerData } from './customerDataCollector';
import { whatsappEncoder } from './whatsappEncoder';

export class MessageTemplateGenerator {
  private config: CompanyConfig;

  constructor(config: CompanyConfig = DEFAULT_COMPANY_CONFIG) {
    this.config = config;
  }

  private generateGalleryUrl(galleryId: string): string {
    // Use the current domain for the gallery URL
    const baseUrl = window.location.origin;
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

  private getPhotosStatus(photos: File[] | string | undefined): string {
    if (!photos) return 'Niet meegestuurd';
    if (typeof photos === 'string') return photos;
    if (Array.isArray(photos) && photos.length > 0) {
      return `${photos.length} foto${photos.length > 1 ? "'s" : ''} bijgevoegd`;
    }
    return 'Niet meegestuurd';
  }

  generateMessage(customerData: CustomerData, galleryId?: string): string {
    console.log('Generating message with galleryId:', galleryId);
    
    const serviceDisplayName = SERVICE_DISPLAY_NAMES[customerData.serviceType] || customerData.serviceType;
    const dynamicDetails = this.generateDynamicDetails(customerData.serviceType, customerData);
    const photosStatus = this.getPhotosStatus(customerData.photos);
    
    // Generate gallery section if galleryId is provided
    const gallerySection = galleryId ? `

🖼️ Foto galerij: ${this.generateGalleryUrl(galleryId)}
   Bekijk alle foto's in een overzichtelijke galerij` : '';

    console.log('Gallery section:', gallerySection);

    const template = `👋 Hoi!

Ik heb net via ${this.config.name} een offerte aangevraagd. Hier zijn de details:

👤 Naam: ${customerData.name || 'Niet opgegeven'}
📞 Telefoonnummer: ${customerData.phone || 'Niet opgegeven'}
📧 E-mailadres: ${customerData.email || 'Niet opgegeven'}
📍 Locatie: ${customerData.location || 'Niet meegestuurd'}
🖼️ Foto's: ${photosStatus}${gallerySection}
🛠️ Gevraagde dienst: ${serviceDisplayName}

📋 Offertedetails:
${dynamicDetails}

Laat ons weten of dit klopt of als je nog iets wilt aanvullen. Dan maken we direct een voorstel op maat voor je klaar! 💨

Groeten van het ${this.config.name} team ${this.config.emoji}`;

    return template;
  }

  generateWhatsAppUrl(customerData: CustomerData, galleryId?: string): string {
    console.log('Generating WhatsApp URL with galleryId:', galleryId);
    
    const message = this.generateMessage(customerData, galleryId);
    return whatsappEncoder.generateWhatsAppUrl(message, this.config.whatsappNumber);
  }

  generateEmailData(customerData: CustomerData, galleryId?: string): { subject: string; body: string; to: string } {
    const serviceDisplayName = SERVICE_DISPLAY_NAMES[customerData.serviceType] || customerData.serviceType;
    const message = this.generateMessage(customerData, galleryId);
    
    return {
      subject: `Offerte aanvraag - ${serviceDisplayName}`,
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