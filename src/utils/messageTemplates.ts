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

// Service-specific detail mappings - Updated to match actual form field names
export const SERVICE_DETAIL_MAPPINGS: ServiceDetails = {
  'new-airco': [
    'Doel: {aircoPurpose}',
    'Aantal kamers: {roomCount}',
    'Grootte grootste kamer: {roomSize}',
    'Bouwjaar huis: {houseYear}',
    'Muurmateriaal: {wallMaterial}',
    'Locatie buitenunit: {outdoorUnitLocation}',
    'Elektrische aansluiting: {electrical}',
    'Voorkeursmerk: {brandPreference}',
    'Leidinglengte: {pipeLength}',
    'Condenswater afvoer: {condensationDrain}',
    'Opmerkingen: {comments}'
  ],
  'heat-pump': [
    'Huidige verwarming: {currentHeating}',
    'Isolatie/energielabel: {insulation}',
    'Gasverbruik per jaar: {gasConsumption}',
    'Verwarmd vloeroppervlak: {heatedArea}',
    'Afgiftesysteem: {emissionSystem}',
    'CV-leidingen diameter: {pipeDiameter}',
    'Gewenste oplossing: {solutionType}',
    'Opmerkingen: {comments}'
  ],
  'maintenance': [
    'Merk buitendeel: {outdoorBrand}',
    'Bouwjaar systeem: {systemYear}',
    'Laatste onderhoud: {lastMaintenance}',
    'Foutcode op display: {errorCode}',
    'Urgentie: {urgency}',
    'Opmerkingen: {comments}'
  ],
  'repair': [
    'Type apparaat: {deviceType}',
    'Probleem: {problem}',
    'Wanneer begon het: {problemStart}',
    'Urgentie: {urgency}',
    'Opmerkingen: {comments}'
  ],
  'commissioning': [
    'Merk systeem: {systemBrand}',
    'F-gassen certificaat: {certificate}',
    'Lengte koelleidingen: {pipeLength}',
    'Vacuum & druktest: {vacuumTest}',
    'Diameter leidingen: {pipeDiameter}',
    'Gewenste datum: {date}',
    'Opmerkingen: {comments}'
  ],
  'project-advice': [
    'Type pand/project: {propertyType}',
    'Omvang project: {projectSize}',
    'Projectfase: {projectPhase}',
    'Indicatief budget: {budget}',
    'Energie/CO2-doel: {energyGoal}',
    'Gewenste opleverdatum: {deliveryDate}',
    'Opmerkingen: {comments}'
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
    console.log('Generated message:', message);
    
    // Use custom encoding for WhatsApp
    const encodedMessage = this.encodeForWhatsApp(encodeURIComponent(message));
    const whatsappUrl = `https://wa.me/${this.config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    console.log('Final WhatsApp URL:', whatsappUrl);
    return whatsappUrl;
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

// Enhanced utility function to collect form data with proper field mapping
export const collectCustomerData = (formData: Record<string, any>, serviceType: string): CustomerData => {
  // Extract personal details if they exist
  const personalDetails = formData.personalDetails || {};
  const contactInfo = formData.contactInfo || {};
  
  // Create the base customer data
  const customerData: CustomerData = {
    name: formData.name || personalDetails.name,
    phone: formData.phone || formData.phoneNumber || personalDetails.phone || contactInfo.phone,
    email: formData.email || formData.emailAddress || personalDetails.email || contactInfo.email,
    location: formData.location || formData.address,
    photos: formData.photos || formData.images,
    serviceType,
    // Include all other form data for dynamic details
    ...formData
  };

  // Clean up nested objects to flatten the data structure
  Object.keys(customerData).forEach(key => {
    const value = customerData[key];
    // If it's an object but not an array or File, try to extract meaningful data
    if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof File)) {
      // For nested objects, we might want to extract the main value
      if (value.value || value.text || value.label || value.name) {
        customerData[key] = value.value || value.text || value.label || value.name;
      } else {
        // For other objects, convert to string representation
        customerData[key] = JSON.stringify(value);
      }
    }
  });

  return customerData;
};