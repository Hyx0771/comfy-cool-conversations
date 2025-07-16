import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChatMessage } from '../../hooks/useHVACMessages';
import professionalAvatar from '@/assets/hvac-professional-avatar.jpg';

interface HVACMessageListProps {
  messages: ChatMessage[];
  showTyping: boolean;
  pendingBotMessage: string | null;
  onTypingComplete: () => void;
}

const TypingIndicator: React.FC<{ onComplete: () => void; message: string }> = ({ onComplete, message }) => {
  // Slightly slower typing animation for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 120); // Slightly slower - 120ms delay
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex space-x-2 sm:space-x-3">
      <Avatar className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
        <AvatarImage src={professionalAvatar} alt="HVAC Professional" className="object-cover w-full h-full" />
        <AvatarFallback className="bg-blue-500 text-white text-xs">B</AvatarFallback>
      </Avatar>
      <div className="bg-white rounded-2xl rounded-tl-md p-2 sm:p-3 shadow-sm border max-w-[85%]">
        <p className="text-xs sm:text-sm text-gray-800 leading-relaxed whitespace-pre-line">
          {message}
        </p>
      </div>
    </div>
  );
};

const HVACMessageList: React.FC<HVACMessageListProps> = ({
  messages,
  showTyping,
  pendingBotMessage,
  onTypingComplete
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (messagesEndRef.current) {
        const container = messagesEndRef.current.closest('.overflow-y-auto');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
        // Also try direct scroll
        messagesEndRef.current.scrollIntoView({ 
          behavior: 'auto',
          block: 'end'
        });
      }
    });
  };

  useEffect(() => {
    // Multiple scroll attempts to ensure it works
    scrollToBottom();
    
    const timer1 = setTimeout(scrollToBottom, 50);
    const timer2 = setTimeout(scrollToBottom, 200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [messages, showTyping, pendingBotMessage]);

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-br from-blue-50 to-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
        >
          {message.isBot && (
            <Avatar className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex-shrink-0">
              <AvatarImage src={professionalAvatar} alt="HVAC Professional" className="object-cover w-full h-full" />
              <AvatarFallback className="bg-blue-500 text-white text-xs">B</AvatarFallback>
            </Avatar>
          )}
          <div
            className={`max-w-[85%] p-2 sm:p-3 rounded-2xl shadow-sm ${
              message.isBot
                ? 'bg-white text-gray-800 rounded-tl-md border'
                : 'bg-blue-500 text-white rounded-tr-md'
            }`}
          >
            <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
          </div>
        </div>
      ))}

      {showTyping && pendingBotMessage && (
        <TypingIndicator message={pendingBotMessage} onComplete={onTypingComplete} />
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default HVACMessageList;