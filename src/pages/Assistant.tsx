import React from 'react';
import SupportAssistant from '@/components/SupportAssistant';

const Assistant: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto h-screen">
        <div className="bg-white shadow-lg rounded-lg h-full overflow-hidden">
          <div className="h-full">
            <SupportAssistant initialMode="support" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;