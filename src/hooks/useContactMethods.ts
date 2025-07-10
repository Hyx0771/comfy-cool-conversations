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
        console.log('🔄 Contact method triggered image upload:', {
          filesCount: selectedFiles.length,
          method,
          serviceType,
          hasExistingGallery: !!uploadedGalleryId
        });
        
        const customerData = collectCustomerData(conversationData, serviceType || '');
        console.log('👤 Customer data for upload:', customerData);
        
        try {
          const gallery = await uploadImages(
            selectedFiles,
            `${serviceType}-${Date.now()}`,
            customerData.name,
            serviceType || 'general'
          );
          
          if (gallery) {
            galleryId = gallery.id;
            setUploadedGalleryId(gallery.id);
            console.log('🎯 Gallery ID successfully set:', {
              galleryId: gallery.id,
              totalImages: gallery.images.length,
              customerName: gallery.customerName
            });
            addUserMessage(`${selectedFiles.length} foto${selectedFiles.length > 1 ? "'s" : ''} geüpload naar galerij`);
            
            // Small delay to ensure the database operation is complete
            await new Promise(resolve => setTimeout(resolve, 500));
            console.log('⏰ Completed database stabilization delay');
          } else {
            console.error('❌ Gallery creation returned null - this should not happen!');
            addUserMessage('Foto upload mislukt - doorgaan zonder foto\'s');
          }
        } catch (uploadError) {
          console.error('💥 Error during image upload:', uploadError);
          addUserMessage('Foto upload mislukt - doorgaan zonder foto\'s');
        }
      } else if (uploadedGalleryId) {
        console.log('📁 Using existing gallery ID:', uploadedGalleryId);
        galleryId = uploadedGalleryId;
      }

      // Generate customer data once for all contact methods
      const customerData = collectCustomerData(conversationData, serviceType || '');
      console.log('📋 Final state before message generation:', {
        method,
        galleryId,
        hasFiles: selectedFiles.length > 0,
        customerName: customerData.name
      });
      
      // Process contact method with proper gallery ID
      if (method === 'whatsapp') {
        console.log('📱 Generating WhatsApp message with gallery ID:', galleryId);
        const whatsappUrl = messageGenerator.generateWhatsAppUrl(customerData, galleryId);
        console.log('Final WhatsApp URL with gallery:', whatsappUrl);
        window.open(whatsappUrl, '_blank');
        addUserMessage(galleryId ? 'WhatsApp bericht met fotogalerij verzonden' : 'WhatsApp contact gekozen');
      } else if (method === 'phone') {
        addUserMessage('Telefonisch contact gekozen');
      } else if (method === 'email') {
        console.log('Generating email with gallery ID:', galleryId);
        const emailData = messageGenerator.generateEmailData(customerData, galleryId);
        const mailtoUrl = `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
        console.log('Final email URL with gallery:', mailtoUrl);
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