import React from 'react';
import ChatBotWidget from '@/components/ChatBotWidget';

const Assistant: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <ChatBotWidget />
    </div>
  );
};

export default Assistant;