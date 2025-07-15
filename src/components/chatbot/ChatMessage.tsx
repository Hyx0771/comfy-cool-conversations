import React from 'react';
import { Message } from '@/types/chatbot-types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.type === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          isBot
            ? 'bg-gray-100 border border-gray-200 rounded-bl-md text-gray-800'
            : 'bg-gradient-to-r from-[#1E88E5] to-[#64B5F6] text-white rounded-br-md shadow-md'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <div className={`text-xs mt-2 ${
          isBot ? 'text-gray-400' : 'text-blue-100'
        }`}>
          {message.timestamp.toLocaleTimeString('nl-NL', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};