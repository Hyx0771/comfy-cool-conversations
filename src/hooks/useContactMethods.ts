import { useState, useEffect } from 'react';
import { messageGenerator, collectCustomerData } from '../utils/messageTemplates';
import { ContactMethod } from '../types/conversation-types';

interface UseContactMethodsProps {
  currentStep: any;
  conversationData: Record<string, any>;
  serviceType: string | null;
  uploadedGalleryId: string | null;
  selectedFiles: File[];
  uploadImages: (files: File[], quoteId: string, customerName?: string, serviceType?: string) => Promise<any>;
  addUserMessage: (message: string) => void;
  handleStepData: (data: any) => void;
  setUploadedGalleryId: (id: string | null) => void;
  setSelectedFiles: (files: File[]) => void;
  setIsProcessing: (processing: boolean) => void;
}

export const useContactMethods = ({
  currentStep,
  conversationData,
  serviceType,
  uploadedGalleryId,
  selectedFiles,
  uploadImages,
  addUserMessage,
  handleStepData,
  setUploadedGalleryId,
  setSelectedFiles,
  setIsProcessing
}: UseContactMethodsProps) => {
  const [showEnhancedContactSelection, setShowEnhancedContactSelection] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // Contact methods configuration
  const contactMethods: ContactMethod[] = [
    { id: 'whatsapp', label: 'WhatsApp', emoji: '📱', description: 'Direct chatten' },
    { id: 'phone', label: 'Bellen', emoji: '📞', description: 'Telefonisch contact' },
    { id: 'email', label: 'E-mail', emoji: '📧', description: 'Per e-mail' }
  ];

  useEffect(() => {
    if (currentStep?.id === 'contact-info') {
      setShowEnhancedContactSelection(true);
    }
  }, [currentStep]);

  const handleContactMethodSelect = async (method: string) => {
    if (method === 'manual') {
      setShowContactForm(true);
      setShowEnhancedContactSelection(false);
      return;
    }

    setIsProcessing(true);
    
    try {
      let galleryId = uploadedGalleryId;
      
      // Upload images if any are selected and not already uploaded
      if (selectedFiles.length > 0 && !uploadedGalleryId) {
        console.log('Uploading images:', selectedFiles.length);
        const customerData = collectCustomerData(conversationData, serviceType || '');
        const gallery = await uploadImages(
          selectedFiles,
          `${serviceType}-${Date.now()}`,
          customerData.name,
          serviceType || 'general'
        );
        if (gallery) {
          galleryId = gallery.id;
          setUploadedGalleryId(gallery.id);
          console.log('Gallery created with ID:', gallery.id);
          addUserMessage(`${selectedFiles.length} foto${selectedFiles.length > 1 ? "'s" : ''} geüpload naar galerij`);
        } else {
          console.error('Failed to create gallery');
          addUserMessage('Foto upload mislukt - doorgaan zonder foto\'s');
        }
      }

      setTimeout(() => {
        if (method === 'whatsapp') {
          // Generate personalized message using the template system
          console.log('Generating WhatsApp message with gallery ID:', galleryId);
          const customerData = collectCustomerData(conversationData, serviceType || '');
          const whatsappUrl = messageGenerator.generateWhatsAppUrl(customerData, galleryId);
          console.log('Opening WhatsApp URL:', whatsappUrl);
          window.open(whatsappUrl, '_blank');
          addUserMessage('WhatsApp contact gekozen');
        } else if (method === 'phone') {
          addUserMessage('Telefonisch contact gekozen');
        } else if (method === 'email') {
          // Generate personalized email data
          console.log('Generating email with gallery ID:', galleryId);
          const customerData = collectCustomerData(conversationData, serviceType || '');
          const emailData = messageGenerator.generateEmailData(customerData, galleryId);
          const mailtoUrl = `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
          console.log('Opening email URL:', mailtoUrl);
          window.open(mailtoUrl, '_blank');
          addUserMessage('E-mail contact gekozen');
        }
        
        handleStepData({ preferredContact: method });
        setIsProcessing(false);
      }, 200);
    } catch (error) {
      console.error('Error processing contact method:', error);
      addUserMessage('Er is een fout opgetreden - probeer het opnieuw');
      setIsProcessing(false);
    }
  };

  const handleContactFormSubmit = (data: { phone: string; email: string }) => {
    setIsProcessing(true);
    addUserMessage(`Contactgegevens: ${data.phone}, ${data.email}`);
    setTimeout(() => {
      handleStepData(data);
      setShowContactForm(false);
      setIsProcessing(false);
    }, 200);
  };

  return {
    showEnhancedContactSelection,
    showContactForm,
    contactMethods,
    handleContactMethodSelect,
    handleContactFormSubmit
  };
};