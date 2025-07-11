import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useConversation } from '@/hooks/useConversation';
import { useFAQChat } from '@/hooks/useFAQChat';
import { ChatHeader } from './ChatHeader';
import { MessagesList } from './MessagesList';
import { ChatInput } from './ChatInput';
import { FAQGrid } from './FAQGrid';
import { ContactButtons } from './ContactButtons';
import { ContactForm } from './ContactForm';

interface ClobotFAQChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClobotFAQChatbot: React.FC<ClobotFAQChatbotProps> = ({
  isOpen,
  onClose
}) => {
  const {
    context,
    setContext,
    isTyping,
    messagesEndRef,
    addBotMessage,
    addUserMessage,
    resetChat
  } = useConversation();

  const {
    currentInput,
    setCurrentInput,
    handleFAQClick,
    handleCustomQuestion,
    handleContactMethodSelect,
    handleContactFormSubmit
  } = useFAQChat({ context, setContext, addBotMessage, addUserMessage });

  useEffect(() => {
    if (isOpen && context.conversationHistory.length === 0) {
      // Initialize with welcome message
      setTimeout(() => {
        addBotMessage(
          "Hoi! Waar kan ik je mee helpen? Stel gerust je vraag over onze diensten of prijzen. 😊"
        );
      }, 500);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="h-full flex flex-col">
      <Card className="h-full bg-white border-0 rounded-none overflow-hidden flex flex-col">
        <ChatHeader 
          showBackButton={context.state !== 'welcome'}
          onBack={resetChat}
          onClose={onClose}
        />

        <MessagesList 
          messages={context.conversationHistory}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
        />

        {/* FAQ Grid */}
        {(context.state === 'welcome' || context.state === 'faq-display') && (
          <div className="p-4">
            <FAQGrid onFAQClick={handleFAQClick} />
          </div>
        )}

        {/* Contact Buttons */}
        {context.state === 'contact-selection' && (
          <div className="p-4">
            <ContactButtons onMethodSelect={handleContactMethodSelect} />
          </div>
        )}

        {/* Contact Form */}
        {context.state === 'contact-form' && context.contactMethod && (
          <div className="p-4">
            <ContactForm
              contactMethod={context.contactMethod}
              onSubmit={handleContactFormSubmit}
            />
          </div>
        )}

        {/* Input Area */}
        {(context.state === 'custom-question' || context.state === 'faq-answered') && (
          <ChatInput
            value={currentInput}
            onChange={setCurrentInput}
            onSubmit={handleCustomQuestion}
          />
        )}
      </Card>
    </div>
  );
};