import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChatMessage } from '../../hooks/useHVACMessages';
import noaAvatar from '@/assets/noa-avatar.jpg';

interface HVACMessageListProps {
  messages: ChatMessage[];
  showTyping: boolean;
  pendingBotMessage: string | null;
  onTypingComplete: () => void;
}

const TypingIndicator: React.FC<{ onComplete: () => void; message: string }> = ({ onComplete, message }) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    if (currentIndex < message.length) {
      const timer = setTimeout(() => {
        setDisplayedText(message.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);
      return () => clearTimeout(timer);
    } else if (currentIndex === message.length) {
      setTimeout(onComplete, 500);
    }
  }, [currentIndex, message, onComplete]);

  return (
    <div className="flex space-x-3 animate-fade-in">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src={noaAvatar} alt="Noa" />
        <AvatarFallback className="bg-blue-500 text-white text-xs">N</AvatarFallback>
      </Avatar>
      <div className="bg-white rounded-2xl rounded-tl-md p-3 shadow-sm border max-w-[85%]">
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
          {displayedText}
          {currentIndex < message.length && <span className="animate-pulse">|</span>}
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-blue-50 to-white">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
        >
          {message.isBot && (
            <Avatar className="w-8 h-8 mr-3 flex-shrink-0">
              <AvatarImage src={noaAvatar} alt="Noa" />
              <AvatarFallback className="bg-blue-500 text-white text-xs">N</AvatarFallback>
            </Avatar>
          )}
          <div
            className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
              message.isBot
                ? 'bg-white text-gray-800 rounded-tl-md border'
                : 'bg-blue-500 text-white rounded-tr-md'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
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