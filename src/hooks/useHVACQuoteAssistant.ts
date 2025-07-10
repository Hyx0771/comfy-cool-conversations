import { useState, useEffect } from 'react';
import { useHVACQuoteConversation } from './useHVACQuoteConversation';
import { useHVACMessages } from './useHVACMessages';
import { useImageUpload } from './useImageUpload';
import { messageGenerator, collectCustomerData } from '../utils/messageTemplates';
import { ContactMethod } from '../types/conversation-types';

export const useHVACQuoteAssistant = () => {
  // State management
  const [serviceType, setServiceType] = useState<string | null>(null);
  const [showEnhancedContactSelection, setShowEnhancedContactSelection] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPersonalDetailsForm, setShowPersonalDetailsForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedGalleryId, setUploadedGalleryId] = useState<string | null>(null);

  // Custom hooks
  const {
    currentStep,
    progress,
    isCompleted,
    conversationData,
    flowTitle,
    handleStepData,
    reset
  } = useHVACQuoteConversation(serviceType);

  const {
    messages,
    showTyping,
    pendingBotMessage,
    addBotMessage,
    addUserMessage,
    handleTypingComplete,
    resetMessages
  } = useHVACMessages();

  const { uploadImages, isUploading } = useImageUpload();

  // Contact methods configuration
  const contactMethods: ContactMethod[] = [
    { id: 'whatsapp', label: 'WhatsApp', emoji: '📱', description: 'Direct chatten' },
    { id: 'phone', label: 'Bellen', emoji: '📞', description: 'Telefonisch contact' },
    { id: 'email', label: 'E-mail', emoji: '📧', description: 'Per e-mail' }
  ];

  // Effects
  useEffect(() => {
    if (currentStep && currentStep.content && !showEnhancedContactSelection) {
      addBotMessage(currentStep.content, true);
    }
  }, [currentStep, addBotMessage, showEnhancedContactSelection]);

  useEffect(() => {
    if (currentStep?.id === 'personal-details') {
      setShowPersonalDetailsForm(true);
    } else if (currentStep?.id === 'contact-info') {
      setShowEnhancedContactSelection(true);
    }
  }, [currentStep]);

  // Handler functions
  const handleServiceSelect = (service: string) => {
    setServiceType(service);
    const serviceLabels: Record<string, string> = {
      'new-airco': '🌬️ Nieuwe airco (koelen / verwarmen)',
      'heat-pump': '🔥 Warmtepomp',
      'maintenance': '🛠️ Onderhoud / service',
      'repair': '🚑 Reparatie / storing',
      'commissioning': '✅ Inbedrijfstelling gekocht systeem',
      'project-advice': '🏢 Advies groot project / VvE'
    };
    addUserMessage(`Ik wil graag een offerte voor: ${serviceLabels[service]}`);
  };

  const handleStepResponse = (value: any) => {
    if (typeof value === 'string') {
      addUserMessage(value);
    }
    handleStepData(value);
    setInputValue('');
    setSelectedFiles([]);
  };

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

  const handlePersonalDetailsSubmit = (data: { name: string; phone: string; email: string }) => {
    setIsProcessing(true);
    addUserMessage(`Naam: ${data.name}, Telefoon: ${data.phone}, E-mail: ${data.email}`);
    setTimeout(() => {
      handleStepData(data);
      setShowPersonalDetailsForm(false);
      setIsProcessing(false);
    }, 200);
  };

  const getEncouragingMessage = () => {
    if (progress <= 30) return "Net gestart! 🚀";
    if (progress <= 60) return "Goede voortgang! 💪";
    if (progress <= 80) return "Bijna klaar! ⭐";
    return "Laatste stap! ✅";
  };

  return {
    // State
    serviceType,
    showEnhancedContactSelection,
    showContactForm,
    showPersonalDetailsForm,
    inputValue,
    setInputValue,
    selectedFiles,
    setSelectedFiles,
    isProcessing: isProcessing || isUploading,
    uploadedGalleryId,
    
    // Quote conversation state
    currentStep,
    progress,
    isCompleted,
    conversationData,
    flowTitle,
    
    // Messages state
    messages,
    showTyping,
    pendingBotMessage,
    handleTypingComplete,
    
    // Configuration
    contactMethods,
    
    // Handlers
    handleServiceSelect,
    handleStepResponse,
    handleContactMethodSelect,
    handleContactFormSubmit,
    handlePersonalDetailsSubmit,
    getEncouragingMessage
  };
};