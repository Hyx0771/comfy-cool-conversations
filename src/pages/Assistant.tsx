import React from 'react';
import HVACQuoteAssistant from '@/components/HVACQuoteAssistant';

const Assistant: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto h-screen">
        <HVACQuoteAssistant />
      </div>
    </div>
  );
};

export default Assistant;