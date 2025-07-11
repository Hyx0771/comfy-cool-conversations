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
    { id: 'phone', label: 'Bel mij', emoji: '📞', description: 'Telefonisch contact' },
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
      // Use existing gallery ID (should be set by now if files were uploaded)
      const galleryId = uploadedGalleryId;
      
      console.log('📱 Processing contact method:', {
        method,
        galleryId,
        serviceType,
        hasGallery: !!galleryId
      });

      // Generate customer data for contact methods
      const customerData = collectCustomerData(conversationData, serviceType || '');
      
      // Process contact method with gallery ID (if available)
      if (method === 'whatsapp') {
        console.log('📱 Generating WhatsApp message with gallery ID:', galleryId);
        const whatsappUrl = messageGenerator.generateWhatsAppUrl(customerData, galleryId);
        console.log('Final WhatsApp URL:', whatsappUrl);
        window.open(whatsappUrl, '_blank');
        addUserMessage(galleryId ? 'WhatsApp bericht met fotogalerij verzonden' : 'WhatsApp contact gekozen');
      } else if (method === 'phone') {
        addUserMessage('Telefonisch contact gekozen');
      } else if (method === 'email') {
        console.log('📧 Generating email with gallery ID:', galleryId);
        const emailData = messageGenerator.generateEmailData(customerData, galleryId);
        const mailtoUrl = `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
        console.log('Final email URL:', mailtoUrl);
        window.open(mailtoUrl, '_blank');
        addUserMessage(galleryId ? 'E-mail met fotogalerij link verzonden' : 'E-mail contact gekozen');
      }
      
      handleStepData({ preferredContact: method });
    } catch (error) {
      console.error('Error processing contact method:', error);
      addUserMessage('Er is een fout opgetreden - probeer het opnieuw');
    } finally {
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