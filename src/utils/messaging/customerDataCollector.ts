export interface CustomerData {
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  photos?: File[] | string;
  serviceType: string;
  [key: string]: any; // For dynamic service-specific data
}

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
    postcode: formData.postcode || personalDetails.postcode,
    huisnummer: formData.huisnummer || personalDetails.huisnummer,
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