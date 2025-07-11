/**
 * Utility to clean emojis from text for WhatsApp messages
 * This ensures the visual interface can have emojis while WhatsApp messages remain clean
 */

export class EmojiCleaner {
  // Enhanced comprehensive emoji regex pattern that matches:
  // - All Unicode emoji ranges including newer emojis
  // - Skin tone modifiers and variation selectors
  // - Zero-width joiners (family emojis, etc.)
  // - Regional indicators (flag emojis)
  // - Symbol and punctuation that can cause diamond question marks
  private static readonly EMOJI_REGEX = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{2B00}-\u{2BFF}]|[\u{1F018}-\u{1F270}]|[\u{238C}]|[\u{2194}-\u{2199}]|[\u{21A9}-\u{21AA}]|[\u{231A}-\u{231B}]|[\u{23E9}-\u{23F3}]|[\u{25FD}-\u{25FE}]|[\u{2614}-\u{2615}]|[\u{2648}-\u{2653}]|[\u{267F}]|[\u{2693}]|[\u{26A1}]|[\u{26AA}-\u{26AB}]|[\u{26BD}-\u{26BE}]|[\u{26C4}-\u{26C5}]|[\u{26CE}]|[\u{26D4}]|[\u{26EA}]|[\u{26F2}-\u{26F3}]|[\u{26F5}]|[\u{26FA}]|[\u{26FD}]|[\u{2705}]|[\u{270A}-\u{270B}]|[\u{2728}]|[\u{274C}]|[\u{274E}]|[\u{2753}-\u{2755}]|[\u{2757}]|[\u{2795}-\u{2797}]|[\u{27B0}]|[\u{27BF}]|[\u{2B1B}-\u{2B1C}]|[\u{2B50}]|[\u{2B55}]|[\u{1F004}]|[\u{1F0CF}]|[\u{1F170}-\u{1F251}]|[\u{1FA70}-\u{1FAFF}]|[\u{E000}-\u{F8FF}]|[\u{FE0E}-\u{FE0F}]|[\u{200D}]|[\u{20E3}]|[\u{FE00}-\u{FE0F}]/gu;

  // Additional problematic characters that can cause diamond question marks
  private static readonly PROBLEMATIC_CHARS = /[^\x00-\x7F\u00A0-\u017F\u0100-\u024F\u1E00-\u1EFF]/gu;

  /**
   * Removes all emojis and problematic characters from a given text string
   * @param text - The text containing emojis and special characters
   * @returns Clean text without emojis or problematic characters
   */
  static cleanText(text: string): string {
    if (!text) return text;
    
    return text
      .replace(this.EMOJI_REGEX, '') // Remove emojis
      .replace(this.PROBLEMATIC_CHARS, '') // Remove other problematic characters
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/\*+/g, '') // Remove markdown bold formatting that might contain emojis
      .trim(); // Remove leading/trailing spaces
  }

  /**
   * Aggressive cleaning for WhatsApp messages to ensure no diamond question marks
   * PRESERVES line breaks and formatting for readability
   * @param text - The text to clean thoroughly
   * @returns Text safe for WhatsApp with proper formatting
   */
  static cleanForWhatsApp(text: string): string {
    if (!text) return text;
    
    return text
      .replace(this.EMOJI_REGEX, '') // Remove emojis
      .replace(this.PROBLEMATIC_CHARS, '') // Remove problematic unicode
      .replace(/[\u{1F000}-\u{1FFFF}]/gu, '') // Remove all extended unicode symbols
      .replace(/[\u{2000}-\u{2BFF}]/gu, '') // Remove punctuation and symbols
      .replace(/\*+/g, '') // Remove markdown formatting
      .replace(/[^\x00-\x7F\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\n\r]/g, '') // Keep only basic Latin + extensions + line breaks
      .replace(/[ \t]+/g, ' ') // Normalize horizontal whitespace but keep line breaks
      .replace(/\n{3,}/g, '\n\n') // Limit to max 2 consecutive line breaks
      .trim(); // Remove leading/trailing spaces
  }

  /**
   * Cleans emojis from all values in an object recursively
   * Useful for cleaning customer data before generating WhatsApp messages
   * @param obj - Object containing potentially emoji-laden text
   * @returns Clean object with emojis removed from all string values
   */
  static cleanObject<T extends Record<string, any>>(obj: T): T {
    const cleaned = { ...obj };
    
    for (const key in cleaned) {
      const value = cleaned[key];
      
      if (typeof value === 'string') {
        (cleaned as any)[key] = this.cleanText(value);
      } else if (Array.isArray(value)) {
        (cleaned as any)[key] = value.map(item => 
          typeof item === 'string' ? this.cleanText(item) : item
        );
      } else if (value && typeof value === 'object') {
        (cleaned as any)[key] = this.cleanObject(value);
      }
    }
    
    return cleaned;
  }
}