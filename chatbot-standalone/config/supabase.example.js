
// Supabase Configuration Example
// Copy this file to 'supabase.js' and replace with your actual credentials

export const supabaseConfig = {
  // Your Supabase project URL
  url: 'https://your-project-id.supabase.co',
  
  // Your Supabase anon/public key
  anonKey: 'your-anon-key-here',
  
  // Optional: Service role key (for server-side operations only)
  serviceRoleKey: 'your-service-role-key-here'
};

// Email configuration (using Resend or similar service)
export const emailConfig = {
  // Resend API key (if using Resend for email sending)
  resendApiKey: 'your-resend-api-key-here',
  
  // Default from email
  fromEmail: 'quotes@yourcompany.com',
  
  // Default to email
  toEmail: 'sales@yourcompany.com'
};

// Company branding configuration
export const companyConfig = {
  name: 'Your Company Name',
  phone: '+31 70 123 4567',
  email: 'info@yourcompany.com',
  website: 'https://yourcompany.com',
  
  // WhatsApp number (optional)
  whatsapp: '+31612345678',
  
  // Primary brand color
  primaryColor: '#007BFF',
  
  // Logo URL (optional)
  logoUrl: 'https://yourcompany.com/logo.png'
};

// Feature toggles
export const featureFlags = {
  // Enable/disable specific features
  quoteFlow: true,
  faqSupport: true,
  fileUpload: true,
  whatsappIntegration: true,
  emailNotifications: true,
  
  // Analytics and tracking
  analytics: false,
  googleAnalytics: 'GA-XXXXXXXXX', // Your GA tracking ID
  
  // Development mode (enables extra logging)
  developmentMode: false
};

// API endpoints (if using custom backend)
export const apiEndpoints = {
  quotes: '/api/quotes',
  support: '/api/support',
  upload: '/api/upload',
  analytics: '/api/analytics'
};

// Default export for easy importing
export default {
  supabase: supabaseConfig,
  email: emailConfig,
  company: companyConfig,
  features: featureFlags,
  api: apiEndpoints
};
