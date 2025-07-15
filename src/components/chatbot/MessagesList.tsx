import React from 'react';
import { Message } from '@/types/chatbot-types';
import { ChatMessage } from './ChatMessage';

interface MessagesListProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const MessagesList: React.FC<MessagesListProps> = ({ 
  messages, 
  isTyping, 
  messagesEndRef 
}) => {
  return (
    <div className="flex-1 chat-scroll p-4 space-y-4 bg-gradient-to-b from-blue-50/30 to-white">
      {messages.map((message) => (
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

      <div ref={messagesEndRef} />
    </div>
  );
};