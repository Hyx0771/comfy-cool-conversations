// Re-export everything from the new modules for backward compatibility
export { messageGenerator, MessageTemplateGenerator } from './messaging/messageGenerator';
export { collectCustomerData } from './messaging/customerDataCollector';
export type { CustomerData } from './messaging/customerDataCollector';
export type { CompanyConfig } from './config/messageConfig';
export { DEFAULT_COMPANY_CONFIG, SERVICE_DISPLAY_NAMES } from './config/messageConfig';