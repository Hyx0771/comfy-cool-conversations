import { SERVICE_DISPLAY_NAMES, SERVICE_DETAIL_MAPPINGS } from './constants.ts';
import { cleanEmojis, cleanCustomerData, replaceTemplateVariables, formatLocation, getMediaStatus } from './utils.ts';

export const generateDynamicDetails = (serviceType: string, customerData: any): string => {
  const detailTemplate = SERVICE_DETAIL_MAPPINGS[serviceType] || [];
  const details: string[] = [];

  detailTemplate.forEach(template => {
    const detail = replaceTemplateVariables(template, customerData);
    // Only add detail if it doesn't end with "Niet opgegeven" (meaning the field had actual data)
    if (!detail.endsWith('Niet opgegeven')) {
      details.push(`• ${detail}`);
    }
  });

  return details.length > 0 ? details.join('\n') : '• Basis offerte aanvraag (geen extra details ingevuld)';
};

export const generateMessage = (customerData: any, galleryId?: string): string => {
  console.log('Generating message with galleryId:', galleryId);
  
  // Clean all emojis from customer data for WhatsApp/Email message
  const cleanedCustomerData = cleanCustomerData(customerData);
  
  const serviceDisplayName = SERVICE_DISPLAY_NAMES[cleanedCustomerData.serviceType] || cleanedCustomerData.serviceType;
  const cleanServiceDisplayName = cleanEmojis(serviceDisplayName);
  const dynamicDetails = generateDynamicDetails(cleanedCustomerData.serviceType, cleanedCustomerData);
  const mediaInfo = getMediaStatus(cleanedCustomerData.photos, galleryId);
  const formattedLocation = formatLocation(
    cleanedCustomerData.postcode, 
    cleanedCustomerData.huisnummer, 
    cleanedCustomerData.location
  );
  
  // Enhanced gallery section with better formatting
  const galleryUrl = galleryId ? `https://clobol-aigento.com/gallery/${galleryId}` : null;

  console.log('Gallery URL:', galleryUrl);

  // Build the complete message with perfect formatting
  let template = `Hallo!

Ik heb zojuist via Clobol een offerte aangevraagd.
Hieronder vind je alle details:

==================================================
CONTACTGEGEVENS
==================================================

Naam: ${cleanedCustomerData.name || 'Niet opgegeven'}
Telefoon: ${cleanedCustomerData.phone || 'Niet opgegeven'}
E-mail: ${cleanedCustomerData.email || 'Niet opgegeven'}
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
Het Clobol team`;

  // Apply comprehensive emoji cleaning to the entire message for email
  return cleanEmojis(template);
};