import { SERVICE_DISPLAY_NAMES } from './constants.ts';
import { 
  formatAddress, 
  getServiceIcon, 
  processConversationHistory, 
  generateTechnicalSpecs 
} from './htmlUtils.ts';
import { getEmailStyles } from './htmlStyles.ts';
import {
  generateHeaderSection,
  generateContactSection,
  generateServiceSection,
  generateGallerySection,
  generateConversationSection,
  generateSpecsSection,
  generateCTASection,
  generateGuaranteesSection,
  generateFooterSection
} from './htmlSections.ts';

export const generateHtmlTemplate = (message: string, customerData: any, galleryId?: string, requestType?: string, conversationHistory?: any[]): string => {
  const galleryUrl = galleryId ? `https://clobol-aigento.com/gallery/${galleryId}` : null;
  const requestTypeText = requestType === 'call' ? 'Bel verzoek' : 'E-mail verzoek';
  
  // Enhanced service name with proper emoji handling and Dutch translations
  const serviceDisplayName = SERVICE_DISPLAY_NAMES[customerData.serviceType] || customerData.serviceType;
  const serviceIcon = getServiceIcon(serviceDisplayName);
  
  // Format address from customer data
  const getFormattedAddress = () => formatAddress(customerData);
  
  // Process conversation history and generate technical specs
  const processedConversation = processConversationHistory(conversationHistory || [], customerData);
  const technicalSpecs = generateTechnicalSpecs(customerData);
  
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nieuwe Offerte Aanvraag - Aigento.ai</title>
    <style>
        ${getEmailStyles()}
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); line-height: 1.6; min-height: 100vh;">
    
    <!-- Main Container with Premium Shadow -->
    <div style="max-width: 650px; margin: 20px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1); position: relative;">
        
        ${generateHeaderSection(serviceDisplayName, requestTypeText)}

        ${generateContactSection(customerData, getFormattedAddress)}

        ${generateServiceSection(serviceDisplayName, serviceIcon)}

        ${galleryUrl ? generateGallerySection(galleryUrl) : ''}

        ${processedConversation && processedConversation.length > 0 ? generateConversationSection(processedConversation) : ''}

        ${generateSpecsSection(technicalSpecs)}

        ${generateCTASection(requestType, customerData)}

        ${generateGuaranteesSection()}

        ${generateFooterSection()}

    </div>
</body>
</html>`;
};