interface CompanyConfig {
  name: string;
  emoji: string;
  whatsappNumber: string;
  emailAddress: string;
}

interface CustomerData {
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  photos?: File[] | string;
  serviceType: string;
  [key: string]: any; // For dynamic service-specific data
}

interface ServiceDetails {
  [key: string]: string[];
}

// Default company configuration
export const DEFAULT_COMPANY_CONFIG: CompanyConfig = {
  name: "Clobol",
  emoji: "❄️",
  whatsappNumber: "+31658769652",
  emailAddress: "info@clobol.nl"
};

// Service-specific detail mappings
export const SERVICE_DETAIL_MAPPINGS: ServiceDetails = {
  'new-airco': [
    'AC Type: {acType}',
    'Kamers: {rooms}',
    'Locatie unit: {location}',
    'Woningtype: {propertyType}',
    'Tijdsplanning: {timing}'
  ],
  'heat-pump': [
    'Huidige verwarming: {currentHeating}',
    'Isolatie: {insulation}',
    'Gasverbruik: {gasUsage}',
    'Vloeroppervlak: {floorArea}',
    'Oplossing: {solution}'
  ],
  'maintenance': [
    'Merk: {brand}',
    'Bouwjaar: {buildYear}',
    'Laatste onderhoud: {lastMaintenance}',
    'Urgentie: {urgency}'
  ],
  'repair': [
    'Probleem: {problemType}',
    'Wanneer begon het: {problemStart}',
    'Urgentie: {urgency}',
    'Symptomen: {symptoms}'
  ],
  'commissioning': [
    'Systeem type: {systemType}',
    'Merk: {brand}',
    'Gewenste datum: {preferredDate}',
    'Locatie: {installationLocation}'
  ],
  'project-advice': [
    'Project type: {projectType}',
    'Budget: {budget}',
    'Energiedoel: {energyGoal}',
    'Opleverdatum: {deliveryDate}'
  ]
};

// Service type display names
export const SERVICE_DISPLAY_NAMES: { [key: string]: string } = {
  'new-airco': '🌬️ Nieuwe airco (koelen / verwarmen)',
  'heat-pump': '🔥 Warmtepomp',
  'maintenance': '🛠️ Onderhoud / service',
  'repair': '🚑 Reparatie / storing',
  'commissioning': '✅ Inbedrijfstelling gekocht systeem',
  'project-advice': '🏢 Advies groot project / VvE'
};

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
      // Only add detail if it contains meaningful data (not just "Niet opgegeven")
      if (!detail.includes('Niet opgegeven: Niet opgegeven')) {
        details.push(`• ${detail}`);
      }
    });

    return details.length > 0 ? details.join('\n') : '• Basis offerte aanvraag';
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
    const serviceDisplayName = SERVICE_DISPLAY_NAMES[customerData.serviceType] || customerData.serviceType;
    const dynamicDetails = this.generateDynamicDetails(customerData.serviceType, customerData);
    const photosStatus = this.getPhotosStatus(customerData.photos);
    
    // Generate gallery section if galleryId is provided
    const gallerySection = galleryId ? `
🖼️ Foto galerij: ${this.generateGalleryUrl(galleryId)}
   Bekijk alle foto's in een overzichtelijke galerij` : '';

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
    const message = this.generateMessage(customerData, galleryId);
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${this.config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
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

// Utility function to collect form data
export const collectCustomerData = (formData: Record<string, any>, serviceType: string): CustomerData => {
  return {
    name: formData.name,
    phone: formData.phone || formData.phoneNumber,
    email: formData.email || formData.emailAddress,
    location: formData.location || formData.address,
    photos: formData.photos || formData.images,
    serviceType,
    // Include all other form data for dynamic details
    ...formData
  };
};