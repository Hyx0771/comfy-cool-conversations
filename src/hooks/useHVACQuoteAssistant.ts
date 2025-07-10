import { useQuoteFlow } from './useQuoteFlow';
import { useContactMethods } from './useContactMethods';
import { useImageHandling } from './useImageHandling';

export const useHVACQuoteAssistant = () => {
  // Use the focused hooks
  const imageHandling = useImageHandling();
  const quoteFlow = useQuoteFlow(imageHandling.clearFiles);

  const contactMethods = useContactMethods({
    currentStep: quoteFlow.currentStep,
    conversationData: quoteFlow.conversationData,
    serviceType: quoteFlow.serviceType,
    uploadedGalleryId: imageHandling.uploadedGalleryId,
    selectedFiles: imageHandling.selectedFiles,
    uploadImages: imageHandling.uploadImages,
    addUserMessage: quoteFlow.addUserMessage,
    handleStepData: quoteFlow.handleStepData,
    setUploadedGalleryId: imageHandling.setUploadedGalleryId,
    setSelectedFiles: imageHandling.setSelectedFiles,
    setIsProcessing: quoteFlow.setIsProcessing
  });

  return {
    // State from quote flow
    serviceType: quoteFlow.serviceType,
    showPersonalDetailsForm: quoteFlow.showPersonalDetailsForm,
    inputValue: quoteFlow.inputValue,
    setInputValue: quoteFlow.setInputValue,
    isProcessing: quoteFlow.isProcessing || imageHandling.isUploading,
    
    // State from contact methods
    showEnhancedContactSelection: contactMethods.showEnhancedContactSelection,
    showContactForm: contactMethods.showContactForm,
    
    // State from image handling
    selectedFiles: imageHandling.selectedFiles,
    setSelectedFiles: imageHandling.setSelectedFiles,
    uploadedGalleryId: imageHandling.uploadedGalleryId,
    
    // Quote conversation state
    currentStep: quoteFlow.currentStep,
    progress: quoteFlow.progress,
    isCompleted: quoteFlow.isCompleted,
    conversationData: quoteFlow.conversationData,
    flowTitle: quoteFlow.flowTitle,
    
    // Messages state
    messages: quoteFlow.messages,
    showTyping: quoteFlow.showTyping,
    pendingBotMessage: quoteFlow.pendingBotMessage,
    handleTypingComplete: quoteFlow.handleTypingComplete,
    
    // Configuration
    contactMethods: contactMethods.contactMethods,
    
    // Handlers from quote flow
    handleServiceSelect: quoteFlow.handleServiceSelect,
    handleStepResponse: quoteFlow.handleStepResponse,
    handlePersonalDetailsSubmit: quoteFlow.handlePersonalDetailsSubmit,
    getEncouragingMessage: quoteFlow.getEncouragingMessage,
    
    // Handlers from contact methods
    handleContactMethodSelect: contactMethods.handleContactMethodSelect,
    handleContactFormSubmit: contactMethods.handleContactFormSubmit
  };
};