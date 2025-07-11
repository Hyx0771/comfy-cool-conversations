import { useState, useEffect, useRef } from 'react';
import { Message, ChatContext } from '@/types/chatbot-types';

export const useConversation = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [context, setContext] = useState<ChatContext>({
    state: 'welcome',
    conversationHistory: []
  });
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [context.conversationHistory]);

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

  const resetChat = () => {
    setContext({
      state: 'welcome',
      conversationHistory: []
    });
    
    setTimeout(() => {
      addBotMessage(
        "Hoi! Waar kan ik je mee helpen? Stel gerust je vraag over onze diensten of prijzen. 😊"
      );
    }, 300);
  };

  return {
    context,
    setContext,
    isTyping,
    messagesEndRef,
    addBotMessage,
    addUserMessage,
    resetChat
  };
};