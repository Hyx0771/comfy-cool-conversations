import React, { useState, useEffect } from 'react';
import BoltStartScreen from './BoltStartScreen';
import HVACQuoteAssistant from './HVACQuoteAssistant';
import SupportAssistant from './SupportAssistant';
import { ClobotFAQChatbot } from './chatbot/ClobotFAQChatbot';

type ChatMode = 'welcome' | 'quote' | 'support' | 'photo' | 'faq';

const WidgetChat: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<ChatMode>('welcome');

  useEffect(() => {
    const handleOpenChatbot = (event: CustomEvent) => {
      const { mode } = event.detail;
      setCurrentMode(mode || 'welcome');
    };

    window.addEventListener('openChatbot', handleOpenChatbot as EventListener);
    return () => {
      window.removeEventListener('openChatbot', handleOpenChatbot as EventListener);
    };
  }, []);

  const handleModeSelect = (mode: 'quote' | 'support' | 'photo' | 'faq') => {
    setCurrentMode(mode);
    localStorage.setItem('preferredChatFlow', mode);
  };

  const renderContent = () => {
    switch (currentMode) {
      case 'quote':
        return <HVACQuoteAssistant />;
      case 'support':
        return <SupportAssistant initialMode="support" />;
      case 'faq':
        return <ClobotFAQChatbot isOpen={true} onClose={() => setCurrentMode('welcome')} showHeader={false} />;
      default:
        return <BoltStartScreen onModeSelect={handleModeSelect} />;
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-white">
      {renderContent()}
    </div>
  );
};

export default WidgetChat;