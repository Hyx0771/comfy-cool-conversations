// Utility functions for HTML template generation

export const formatAddress = (customerData: any): string => {
  const parts = [];
  if (customerData.postcode) parts.push(customerData.postcode);
  if (customerData.huisnummer) parts.push(customerData.huisnummer);
  if (customerData.location) parts.push(customerData.location);
  return parts.length > 0 ? parts.join(', ') : 'Niet opgegeven';
};

export const getServiceIcon = (serviceDisplayName: string): string => {
  return serviceDisplayName.includes('🌬️') ? '🌬️' : 
         serviceDisplayName.includes('🔥') ? '🔥' :
         serviceDisplayName.includes('🛠️') ? '🛠️' :
         serviceDisplayName.includes('🚑') ? '🚑' :
         serviceDisplayName.includes('✅') ? '✅' :
         serviceDisplayName.includes('🏢') ? '🏢' : '🔧';
};

export const processConversationHistory = (conversationHistory: any[], customerData: any) => {
  if (!conversationHistory || !Array.isArray(conversationHistory) || conversationHistory.length === 0) {
    return [];
  }
  
  return conversationHistory.map((msg, index) => {
    // Handle different message formats that might come from the frontend
    const messageContent = msg.content || msg.text || msg.message || '';
    
    // Use isBot field to determine message type, with fallback logic
    const isBot = msg.isBot !== undefined ? msg.isBot : 
                 msg.type === 'bot' || 
                 (typeof messageContent === 'string' && messageContent.includes('Aigento'));
    
    const messageType = isBot ? 'bot' : 'user';
    const timestamp = msg.timestamp || new Date();
    
    // Determine sender based on message type
    const sender = isBot ? 'Aigento.ai Assistant' : customerData.name || 'Klant';
    
    return {
      type: messageType,
      content: messageContent,
      sender: sender,
      timestamp: timestamp
    };
  });
};

export const generateTechnicalSpecs = (customerData: any): string[] => {
  const specs = [];
  const fieldTranslations: Record<string, string> = {
    'currentHeating': 'Huidige Verwarming',
    'insulation': 'Isolatie',
    'gasConsumption': 'Gasverbruik',
    'heatedArea': 'Verwarmingsoppervlak',
    'emissionSystem': 'Emissiesysteem',
    'pipeDiameter': 'Leidingdiameter',
    'solutionType': 'Oplossingstype',
    'comments': 'Opmerkingen',
    'personalDetails': 'Persoonlijke Details'
  };
  
  Object.entries(customerData).forEach(([key, value]) => {
    // Skip basic contact info and metadata
    if (['name', 'phone', 'email', 'postcode', 'huisnummer', 'location', 'serviceType', 'photos', 'conversationHistory'].includes(key)) {
      return;
    }
    
    if (value && value !== '' && value !== null && value !== undefined) {
      // Use Dutch translation if available, otherwise format the key
      const readableKey = fieldTranslations[key] || key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
      
      let displayValue = String(value);
      if (Array.isArray(value)) {
        displayValue = value.join(', ');
      } else if (typeof value === 'object') {
        displayValue = JSON.stringify(value);
      }
      
      specs.push(`${readableKey}: ${displayValue}`);
    }
  });
  
  return specs.length > 0 ? specs : ['Basis offerte aanvraag (geen extra specificaties ingevuld)'];
};