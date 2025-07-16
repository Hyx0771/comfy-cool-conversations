import React from 'react';
import { useHVACQuoteAssistant } from '../hooks/useHVACQuoteAssistant';
import SupportHeader from './SupportHeader';
import HVACQuoteFlow from './hvac/HVACQuoteFlow';
import HVACMessageList from './hvac/HVACMessageList';

const HVACQuoteAssistant = () => {
  const {
    // State
    serviceType,
    showEnhancedContactSelection,
    showContactForm,
    showPersonalDetailsForm,
    inputValue,
    setInputValue,
    selectedFiles,
    setSelectedFiles,
    isProcessing,
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
  } = useHVACQuoteAssistant();

  return (
    <div className="h-full flex flex-col bg-white">
      <SupportHeader
        progress={progress}
        encouragingMessage={getEncouragingMessage()}
        showProgress={serviceType !== null}
      />

      <div className="flex-1 flex flex-col overflow-hidden md:overflow-hidden overflow-y-auto touch-manipulation">
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
            uploadedGalleryId={uploadedGalleryId}
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