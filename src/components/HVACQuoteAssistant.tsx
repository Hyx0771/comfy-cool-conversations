import React, { useState, useEffect } from 'react';
import { useHVACQuoteConversation } from '../hooks/useHVACQuoteConversation';
import { useHVACMessages } from '../hooks/useHVACMessages';
import SupportHeader from './SupportHeader';
import HVACQuoteFlow from './hvac/HVACQuoteFlow';
import HVACMessageList from './hvac/HVACMessageList';
import { ContactMethod } from '../types/conversation-types';

const HVACQuoteAssistant = () => {
  const [serviceType, setServiceType] = useState<string | null>(null);
  const [showEnhancedContactSelection, setShowEnhancedContactSelection] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPersonalDetailsForm, setShowPersonalDetailsForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
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

  const contactMethods: ContactMethod[] = [
    { id: 'whatsapp', label: 'WhatsApp', emoji: '📱', description: 'Direct chatten' },
    { id: 'phone', label: 'Bellen', emoji: '📞', description: 'Telefonisch contact' },
    { id: 'email', label: 'E-mail', emoji: '📧', description: 'Per e-mail' }
  ];

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

  const handleContactMethodSelect = (method: string) => {
    if (method === 'manual') {
      setShowContactForm(true);
      setShowEnhancedContactSelection(false);
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      if (method === 'whatsapp') {
        const whatsappMessage = `Hoi! Ik heb interesse in ${flowTitle}. Kunnen jullie me helpen met een offerte?`;
        const whatsappUrl = `https://wa.me/31658769652?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        addUserMessage('WhatsApp contact gekozen');
      } else if (method === 'phone') {
        addUserMessage('Telefonisch contact gekozen');
      } else if (method === 'email') {
        addUserMessage('E-mail contact gekozen');
      }
      
      handleStepData({ preferredContact: method });
      setIsProcessing(false);
    }, 200); // Much faster - was 1000ms
  };

  const handleContactFormSubmit = (data: { phone: string; email: string }) => {
    setIsProcessing(true);
    addUserMessage(`Contactgegevens: ${data.phone}, ${data.email}`);
    setTimeout(() => {
      handleStepData(data);
      setShowContactForm(false);
      setIsProcessing(false);
    }, 200); // Much faster - was 1000ms
  };

  const handlePersonalDetailsSubmit = (data: { name: string; phone: string; email: string }) => {
    setIsProcessing(true);
    addUserMessage(`Naam: ${data.name}, Telefoon: ${data.phone}, E-mail: ${data.email}`);
    setTimeout(() => {
      handleStepData(data);
      setShowPersonalDetailsForm(false);
      setIsProcessing(false);
    }, 200); // Much faster - was 1000ms
  };

  const getEncouragingMessage = () => {
    if (progress <= 30) return "Net gestart! 🚀";
    if (progress <= 60) return "Goede voortgang! 💪";
    if (progress <= 80) return "Bijna klaar! ⭐";
    return "Laatste stap! ✅";
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <SupportHeader
        progress={progress}
        encouragingMessage={getEncouragingMessage()}
        showProgress={serviceType !== null}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {messages.length > 0 && (
          <HVACMessageList
            messages={messages}
            showTyping={showTyping}
            pendingBotMessage={pendingBotMessage}
            onTypingComplete={handleTypingComplete}
          />
        )}

        <div className="flex-shrink-0">
          <HVACQuoteFlow
            serviceType={serviceType}
            isCompleted={isCompleted}
            flowTitle={flowTitle}
            currentStep={currentStep}
            showEnhancedContactSelection={showEnhancedContactSelection}
            showContactForm={showContactForm}
            showPersonalDetailsForm={showPersonalDetailsForm}
            contactMethods={contactMethods}
            conversationData={conversationData}
            inputValue={inputValue}
            setInputValue={setInputValue}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            isProcessing={isProcessing}
            onServiceSelect={handleServiceSelect}
            onContactMethodSelect={handleContactMethodSelect}
            onContactFormSubmit={handleContactFormSubmit}
            onPersonalDetailsSubmit={handlePersonalDetailsSubmit}
            onStepResponse={handleStepResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default HVACQuoteAssistant;