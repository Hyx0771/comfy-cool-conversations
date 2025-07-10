import { useState, useEffect } from 'react';
import { useHVACQuoteConversation } from './useHVACQuoteConversation';
import { useHVACMessages } from './useHVACMessages';

export const useQuoteFlow = (clearFiles?: () => void) => {
  const [serviceType, setServiceType] = useState<string | null>(null);
  const [showPersonalDetailsForm, setShowPersonalDetailsForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

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

  // Effects
  useEffect(() => {
    if (currentStep && currentStep.content && !showPersonalDetailsForm) {
      addBotMessage(currentStep.content, true);
    }
  }, [currentStep, addBotMessage, showPersonalDetailsForm]);

  useEffect(() => {
    if (currentStep?.id === 'personal-details') {
      setShowPersonalDetailsForm(true);
    }
  }, [currentStep]);

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

  const handleStepResponse = async (value: any, files?: File[]) => {
    if (typeof value === 'string') {
      addUserMessage(value);
    }
    
    // Handle file uploads before clearing files or proceeding
    if (files && files.length > 0) {
      console.log('🔄 Step response with files - triggering upload:', {
        filesCount: files.length,
        serviceType,
        hasValue: !!value
      });
      
      // We'll handle the upload in the parent component that has access to upload functions
      handleStepData({ ...value, files });
    } else {
      handleStepData(value);
    }
    
    setInputValue('');
    clearFiles?.();
  };

  const handlePersonalDetailsSubmit = (data: { name: string; phone: string; email: string; postcode: string; huisnummer: string }) => {
    setIsProcessing(true);
    addUserMessage(`Naam: ${data.name}, Telefoon: ${data.phone}, E-mail: ${data.email}, Postcode: ${data.postcode}, Huisnummer: ${data.huisnummer}`);
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
    showPersonalDetailsForm,
    inputValue,
    setInputValue,
    isProcessing,
    setIsProcessing,
    
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
    
    // Exposed functions for other hooks
    addUserMessage,
    handleStepData,
    
    // Handlers
    handleServiceSelect,
    handleStepResponse,
    handlePersonalDetailsSubmit,
    getEncouragingMessage
  };
};