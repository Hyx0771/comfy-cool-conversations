import { useState } from 'react';
import { faqData, fallbackResponse } from '@/data/faqData';
import { ContactMethod } from '@/types/chatbot-types';
import { generateEmailTemplate } from '@/components/chatbot/EmailTemplate';
import { useToast } from '@/hooks/use-toast';

interface UseFAQChatProps {
  context: any;
  setContext: (updater: (prev: any) => any) => void;
  addBotMessage: (content: string, delay?: number) => void;
  addUserMessage: (content: string) => void;
}

export const useFAQChat = ({ context, setContext, addBotMessage, addUserMessage }: UseFAQChatProps) => {
  const { toast } = useToast();
  const [currentInput, setCurrentInput] = useState('');

  const handleFAQClick = (faqId: number) => {
    const faq = faqData.find(f => f.id === faqId);
    if (!faq) return;

    addUserMessage(faq.question);
    
    setContext((prev: any) => ({
      ...prev,
      selectedFAQ: faqId,
      state: 'faq-answered'
    }));

    addBotMessage(faq.answer);
    
    setTimeout(() => {
      addBotMessage("Heb je nog andere vragen? Stel ze gerust!", 2000);
      setContext((prev: any) => ({ ...prev, state: 'custom-question' }));
    }, 2500);
  };

  const handleCustomQuestion = () => {
    if (!currentInput.trim()) return;

    const question = currentInput.trim();
    addUserMessage(question);
    
    setContext((prev: any) => ({
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
    setContext((prev: any) => ({
      ...prev,
      contactMethod: method
    }));

    if (method === 'whatsapp') {
      handleWhatsAppRedirect();
    } else {
      setContext((prev: any) => ({ ...prev, state: 'contact-form' }));
    }
  };

  const handleWhatsAppRedirect = () => {
    const question = context.customQuestion || 'Ik heb een vraag over jullie diensten.';
    const encodedMessage = encodeURIComponent(`Hoi Clobol, ik heb een vraag: ${question}`);
    const whatsappUrl = `https://wa.me/31658769652?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    addBotMessage("Je wordt doorgeleid naar WhatsApp! 📱");
    setContext((prev: any) => ({ ...prev, state: 'completed' }));
  };

  const handleContactFormSubmit = async (formData: { name: string; email: string; phone: string }) => {
    setContext((prev: any) => ({
      ...prev,
      contactForm: formData,
      state: 'completed'
    }));

    try {
      // Call the email edge function
      const response = await fetch('https://yiidyfidkhwtlyucacnd.supabase.co/functions/v1/send-quote-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactInfo: formData,
          customQuestion: context.customQuestion || '',
          conversationHistory: context.conversationHistory || [],
          contactMethod: context.contactMethod || 'email'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const result = await response.json();
      console.log('Email sent successfully:', result);

      addBotMessage(
        `Bedankt ${formData.name}! We hebben je gegevens ontvangen en nemen binnen één werkdag contact met je op. ✅`
      );

      toast({
        title: "Gegevens verzonden!",
        description: "We nemen zo snel mogelijk contact met je op.",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      
      addBotMessage(
        `Bedankt ${formData.name}! We hebben je gegevens ontvangen. Als er problemen zijn met de verzending, neem dan direct contact met ons op.`
      );

      toast({
        title: "Gegevens ontvangen",
        description: "Er was een probleem met de verzending, maar je gegevens zijn opgeslagen.",
        duration: 5000,
      });
    }
  };

  return {
    currentInput,
    setCurrentInput,
    handleFAQClick,
    handleCustomQuestion,
    handleContactMethodSelect,
    handleContactFormSubmit
  };
};