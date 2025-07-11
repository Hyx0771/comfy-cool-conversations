import { useQuoteFlow } from './useQuoteFlow';
import { useContactMethods } from './useContactMethods';
import { useImageHandling } from './useImageHandling';
import { collectCustomerData } from '../utils/messageTemplates';

export const useHVACQuoteAssistant = () => {
  // Use the focused hooks
  const imageHandling = useImageHandling();
  const quoteFlow = useQuoteFlow(imageHandling.clearFiles);

  // Enhanced handleStepData that includes file upload logic
  const handleStepDataWithUpload = async (data: any) => {
    // Check if this step includes files
    if (data.files && data.files.length > 0) {
      console.log('🚀 Processing step with files:', {
        filesCount: data.files.length,
        serviceType: quoteFlow.serviceType,
        hasExistingGallery: !!imageHandling.uploadedGalleryId
      });

      try {
        quoteFlow.setIsProcessing(true);
        
        // Generate customer data for upload
        const customerData = collectCustomerData(quoteFlow.conversationData, quoteFlow.serviceType || '');
        
        // Upload images and get gallery
        const gallery = await imageHandling.uploadImages(
          data.files,
          `${quoteFlow.serviceType}-${Date.now()}`,
          customerData.name,
          quoteFlow.serviceType || 'general'
        );
        
        if (gallery) {
          imageHandling.setUploadedGalleryId(gallery.id);
          console.log('✅ Gallery created during step response:', {
            galleryId: gallery.id,
            totalImages: gallery.images.length
          });
          
          quoteFlow.addUserMessage(`${data.files.length} foto${data.files.length > 1 ? "'s" : ''} geüpload`);
        }
        
        // Remove files from data before proceeding
        const { files, ...dataWithoutFiles } = data;
        quoteFlow.handleStepData(dataWithoutFiles);
        
      } catch (error) {
        console.error('❌ Error uploading files during step:', error);
        quoteFlow.addUserMessage('Foto upload mislukt - doorgaan zonder foto\'s');
        
        // Remove files from data and proceed anyway
        const { files, ...dataWithoutFiles } = data;
        quoteFlow.handleStepData(dataWithoutFiles);
      } finally {
        quoteFlow.setIsProcessing(false);
      }
    } else {
      // No files, proceed normally
      quoteFlow.handleStepData(data);
    }
  };

  // Enhanced handleStepResponse that includes file handling
  const handleStepResponseWithFiles = async (value: any, files?: File[]) => {
    if (typeof value === 'string') {
      quoteFlow.addUserMessage(value);
    }
    
    // If files are provided, include them in the data
    if (files && files.length > 0) {
      await handleStepDataWithUpload({ ...value, files });
    } else {
      await handleStepDataWithUpload(value);
    }
    
    quoteFlow.setInputValue('');
    imageHandling.clearFiles();
  };

  const contactMethods = useContactMethods({
    currentStep: quoteFlow.currentStep,
    conversationData: quoteFlow.conversationData,
    serviceType: quoteFlow.serviceType,
    uploadedGalleryId: imageHandling.uploadedGalleryId,
    selectedFiles: imageHandling.selectedFiles,
    uploadImages: imageHandling.uploadImages,
    addUserMessage: quoteFlow.addUserMessage,
    handleStepData: handleStepDataWithUpload,
    setUploadedGalleryId: imageHandling.setUploadedGalleryId,
    setSelectedFiles: imageHandling.setSelectedFiles,
    setIsProcessing: quoteFlow.setIsProcessing,
    messages: quoteFlow.messages
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
    handleStepResponse: handleStepResponseWithFiles,
    handlePersonalDetailsSubmit: quoteFlow.handlePersonalDetailsSubmit,
    getEncouragingMessage: quoteFlow.getEncouragingMessage,
    
    // Handlers from contact methods
    handleContactMethodSelect: contactMethods.handleContactMethodSelect,
    handleContactFormSubmit: contactMethods.handleContactFormSubmit
  };
};