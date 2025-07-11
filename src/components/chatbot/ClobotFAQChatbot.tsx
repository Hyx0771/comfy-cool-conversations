import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, ArrowLeft, Phone, Mail, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { faqData, fallbackResponse } from '@/data/faqData';
import { ChatMessage } from './ChatMessage';
import { FAQGrid } from './FAQGrid';
import { ContactForm } from './ContactForm';
import { ContactButtons } from './ContactButtons';
import { generateEmailTemplate } from './EmailTemplate';
import { Message, ContactMethod, ChatState, ChatContext } from '@/types/chatbot-types';
import { useToast } from '@/hooks/use-toast';

interface ClobotFAQChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClobotFAQChatbot: React.FC<ClobotFAQChatbotProps> = ({
  isOpen,
  onClose
}) => {
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [context, setContext] = useState<ChatContext>({
    state: 'welcome',
    conversationHistory: []
  });
  
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [context.conversationHistory]);

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

  const addBotMessage = (content: string, delay: number = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content,
        timestamp: new Date()
      };
      
      setContext(prev => ({
        ...prev,
        conversationHistory: [...prev.conversationHistory, newMessage]
      }));
      setIsTyping(false);
    }, delay);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    
    setContext(prev => ({
      ...prev,
      conversationHistory: [...prev.conversationHistory, newMessage]
    }));
  };

  const handleFAQClick = (faqId: number) => {
    const faq = faqData.find(f => f.id === faqId);
    if (!faq) return;

    addUserMessage(faq.question);
    
    setContext(prev => ({
      ...prev,
      selectedFAQ: faqId,
      state: 'faq-answered'
    }));

    addBotMessage(faq.answer);
    
    setTimeout(() => {
      addBotMessage("Heb je nog andere vragen? Stel ze gerust!", 2000);
      setContext(prev => ({ ...prev, state: 'custom-question' }));
    }, 2500);
  };

  const handleCustomQuestion = () => {
    if (!currentInput.trim()) return;

    const question = currentInput.trim();
    addUserMessage(question);
    
    setContext(prev => ({
      ...prev,
      customQuestion: question,
      state: 'contact-selection'
    }));

    setCurrentInput('');
    addBotMessage(fallbackResponse);
    
    setTimeout(() => {
      addBotMessage("Hoe wil je verder geholpen worden?", 1000);
    }, 2000);
  };

  const handleContactMethodSelect = (method: ContactMethod) => {
    setContext(prev => ({
      ...prev,
      contactMethod: method
    }));

    if (method === 'whatsapp') {
      handleWhatsAppRedirect();
    } else {
      setContext(prev => ({ ...prev, state: 'contact-form' }));
    }
  };

  const handleWhatsAppRedirect = () => {
    const question = context.customQuestion || 'Ik heb een vraag over jullie diensten.';
    const encodedMessage = encodeURIComponent(`Hoi Clobol, ik heb een vraag: ${question}`);
    const whatsappUrl = `https://wa.me/31658769652?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    addBotMessage("Je wordt doorgeleid naar WhatsApp! 📱");
    setContext(prev => ({ ...prev, state: 'completed' }));
  };

  const handleContactFormSubmit = (formData: { name: string; email: string; phone: string }) => {
    setContext(prev => ({
      ...prev,
      contactForm: formData,
      state: 'completed'
    }));

    // Generate email
    const emailContent = generateEmailTemplate(
      context.conversationHistory,
      context.customQuestion || '',
      formData,
      context.contactMethod || 'email'
    );

    // For demo purposes, we'll show a success message
    addBotMessage(
      `Bedankt ${formData.name}! We hebben je gegevens ontvangen en nemen binnen één werkdag contact met je op. ✅`
    );

    toast({
      title: "Gegevens verzonden!",
      description: "We nemen zo snel mogelijk contact met je op.",
      duration: 5000,
    });
  };

  const resetChat = () => {
    setContext({
      state: 'welcome',
      conversationHistory: []
    });
    setCurrentInput('');
    
    setTimeout(() => {
      addBotMessage(
        "Hoi! Waar kan ik je mee helpen? Stel gerust je vraag over onze diensten of prijzen. 😊"
      );
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Chat Container */}
      <Card className="h-full bg-white border-0 rounded-none overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#007BFF] to-blue-600 p-4 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Bolt</h3>
                <p className="text-sm text-blue-100">FAQ assistent</p>
              </div>
            </div>
            <div className="flex gap-2">
              {context.state !== 'welcome' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetChat}
                  className="text-white hover:bg-white/20 p-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50/30 to-white">
          {context.conversationHistory.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 max-w-xs">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}

          {/* FAQ Grid */}
          {(context.state === 'welcome' || context.state === 'faq-display') && (
            <FAQGrid onFAQClick={handleFAQClick} />
          )}

          {/* Contact Buttons */}
          {context.state === 'contact-selection' && (
            <ContactButtons onMethodSelect={handleContactMethodSelect} />
          )}

          {/* Contact Form */}
          {context.state === 'contact-form' && context.contactMethod && (
            <ContactForm
              contactMethod={context.contactMethod}
              onSubmit={handleContactFormSubmit}
            />
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        {(context.state === 'custom-question' || context.state === 'faq-answered') && (
          <div className="border-t bg-white p-4 flex-shrink-0">
            <div className="flex gap-2">
              <Input
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Stel hier uw vraag..."
                className="flex-1 border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]"
                onKeyPress={(e) => e.key === 'Enter' && handleCustomQuestion()}
              />
              <Button
                onClick={handleCustomQuestion}
                disabled={!currentInput.trim()}
                className="bg-[#007BFF] hover:bg-blue-600 text-white px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};