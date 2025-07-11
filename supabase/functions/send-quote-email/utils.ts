import { MediaStatus } from './types.ts';

export const cleanEmojis = (text: string): string => {
  if (!text) return '';
  
  // Remove emojis while preserving text
  return text
    .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Emoticons
    .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Symbols & Pictographs
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Transport & Map
    .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '') // Flags
    .replace(/[\u{2600}-\u{26FF}]/gu, '')   // Miscellaneous symbols
    .replace(/[\u{2700}-\u{27BF}]/gu, '')   // Dingbats
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') // Supplemental Symbols and Pictographs
    .replace(/[\u{1FA70}-\u{1FAFF}]/gu, '') // Symbols and Pictographs Extended-A
    .trim();
};

export const cleanCustomerData = (data: any): any => {
  const cleaned: any = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      cleaned[key] = cleanEmojis(value);
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
};

export const replaceTemplateVariables = (template: string, data: any): string => {
  return template.replace(/\{([^}]+)\}/g, (match, key) => {
    const value = data[key];
    if (value === undefined || value === null || value === '') {
      return 'Niet opgegeven';
    }
    return String(value);
  });
};

export const formatLocation = (postcode?: string, huisnummer?: string, location?: string): string => {
  if (location) return location;
  if (postcode && huisnummer) {
    return `${postcode}, ${huisnummer}`;
  }
  if (postcode) return postcode;
  if (huisnummer) return `Huisnummer ${huisnummer}`;
  return 'Niet opgegeven';
};

export const getMediaStatus = (photos: any, galleryId?: string): MediaStatus => {
  console.log('getMediaStatus input:', photos, typeof photos, 'galleryId:', galleryId);
  
  // If we have a gallery ID, we definitely have media
  if (galleryId) {
    if (typeof photos === 'string' && (photos.includes('foto') || photos.includes('video'))) {
      return { status: photos, hasMedia: true };
    }
    if (Array.isArray(photos) && photos.length > 0) {
      const imageCount = photos.filter((file: any) => file.type?.startsWith('image/')).length;
      const videoCount = photos.filter((file: any) => file.type?.startsWith('video/')).length;
      
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
    const imageCount = photos.filter((file: any) => file.type?.startsWith('image/')).length;
    const videoCount = photos.filter((file: any) => file.type?.startsWith('video/')).length;
    
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
};