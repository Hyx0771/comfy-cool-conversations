import React from 'react';
import ChatBotWidget from '@/components/ChatBotWidget';

const Assistant: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ChatBotWidget />
    </div>
  );
};

export default Assistant;