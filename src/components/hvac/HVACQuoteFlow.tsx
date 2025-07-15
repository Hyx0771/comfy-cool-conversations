import React from 'react';
import type { ConversationStep, ContactMethod } from '../../types/conversation-types';
import ServiceSelectionButtons from './ServiceSelectionButtons';
import ContactMethodSelector from './ContactMethodSelector';
import ContactForm from './ContactForm';
import PersonalDetailsForm from './PersonalDetailsForm';
import StepInput from './StepInput';
import CompletionScreen from './CompletionScreen';

interface HVACQuoteFlowProps {
  serviceType: string | null;
  isCompleted: boolean;
  flowTitle: string;
  currentStep: ConversationStep | null;
  showEnhancedContactSelection: boolean;
  showContactForm: boolean;
  showPersonalDetailsForm: boolean;
  contactMethods: ContactMethod[];
  conversationData: Record<string, any>;
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
  isProcessing: boolean;
  uploadedGalleryId?: string | null;
  onServiceSelect: (service: string) => void;
  onContactMethodSelect: (method: string) => void;
  onContactFormSubmit: (data: { phone: string; email: string }) => void;
  onPersonalDetailsSubmit: (data: { name: string; phone: string; email: string }) => void;
  onStepResponse: (value: any) => void;
}

const HVACQuoteFlow: React.FC<HVACQuoteFlowProps> = ({
  serviceType,
  isCompleted,
  flowTitle,
  currentStep,
  showEnhancedContactSelection,
  showContactForm,
  showPersonalDetailsForm,
  contactMethods,
  conversationData,
  inputValue,
  setInputValue,
  selectedFiles,
  setSelectedFiles,
  isProcessing,
  onServiceSelect,
  onContactMethodSelect,
  onContactFormSubmit,
  onPersonalDetailsSubmit,
  onStepResponse
}) => {
  if (isCompleted) {
    return <CompletionScreen flowTitle={flowTitle} />;
  }

  if (!serviceType) {
    return <ServiceSelectionButtons onServiceSelect={onServiceSelect} />;
  }

  if (showPersonalDetailsForm) {
    return <PersonalDetailsForm onPersonalDetailsSubmit={onPersonalDetailsSubmit} />;
  }

  if (showEnhancedContactSelection) {
    return (
      <ContactMethodSelector
        contactMethods={contactMethods}
        onContactMethodSelect={onContactMethodSelect}
        isProcessing={isProcessing}
      />
    );
  }

  if (showContactForm) {
    return <ContactForm onContactFormSubmit={onContactFormSubmit} />;
  }

  if (currentStep && currentStep.type !== 'contact') {
    return (
      <StepInput
        step={currentStep}
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        onStepResponse={onStepResponse}
        conversationData={conversationData}
      />
    );
  }

  return null;
};

export default HVACQuoteFlow;