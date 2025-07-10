import { useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

export const useHVACMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [pendingBotMessage, setPendingBotMessage] = useState<string | null>(null);

  const addBotMessage = useCallback((content: string, withTyping = false) => {
    if (withTyping) {
      setShowTyping(true);
      setPendingBotMessage(content);
    } else {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        content,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
    }
  }, []);

  const addUserMessage = useCallback((content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const handleTypingComplete = useCallback(() => {
    if (pendingBotMessage) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        content: pendingBotMessage,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      setPendingBotMessage(null);
    }
    setShowTyping(false);
  }, [pendingBotMessage]);

  const resetMessages = useCallback(() => {
    setMessages([]);
    setShowTyping(false);
    setPendingBotMessage(null);
  }, []);

  return {
    messages,
    showTyping,
    pendingBotMessage,
    addBotMessage,
    addUserMessage,
    handleTypingComplete,
    resetMessages
  };
};