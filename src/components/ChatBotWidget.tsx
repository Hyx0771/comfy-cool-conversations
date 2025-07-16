import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import HVACQuoteAssistant from './HVACQuoteAssistant';
import SupportAssistant from './SupportAssistant';
import BoltStartScreen from './BoltStartScreen';
import { ClobotFAQChatbot } from './chatbot/ClobotFAQChatbot';
import professionalAvatar from '@/assets/hvac-professional-avatar.jpg';

type ChatMode = 'welcome' | 'quote' | 'support' | 'photo' | 'faq';

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState<ChatMode>('welcome');

  useEffect(() => {
    const preferredFlow = localStorage.getItem('preferredFlow');
    if (preferredFlow === 'quote' || preferredFlow === 'support' || preferredFlow === 'faq') {
      setCurrentMode(preferredFlow);
    }

    const handleOpenChatbot = (event: CustomEvent) => {
      const { mode } = event.detail;
      setCurrentMode(mode);
      setIsOpen(true);
      localStorage.setItem('preferredFlow', mode);
    };

    window.addEventListener('openChatbot', handleOpenChatbot as EventListener);
    return () => {
      window.removeEventListener('openChatbot', handleOpenChatbot as EventListener);
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setCurrentMode('welcome');
    }
  };

  const handleModeSelect = (mode: 'quote' | 'support' | 'photo' | 'faq') => {
    if (mode === 'photo') {
      setCurrentMode('quote');
      localStorage.setItem('preferredFlow', 'quote');
      return;
    }
    setCurrentMode(mode);
    localStorage.setItem('preferredFlow', mode);
  };

  const renderContent = () => {
    if (currentMode === 'quote') {
      return <HVACQuoteAssistant />;
    }
    if (currentMode === 'support') {
      return <SupportAssistant initialMode="support" />;
    }
    if (currentMode === 'faq') {
      return <ClobotFAQChatbot isOpen={true} onClose={() => setCurrentMode('welcome')} showHeader={false} />;
    }
    return <BoltStartScreen onModeSelect={handleModeSelect} />;
  };

  return (
    <>
      <div className="fixed bottom-3 sm:bottom-4 lg:bottom-6 right-3 sm:right-4 lg:right-6 z-40">
        <Button
          onClick={toggleChat}
          className="h-14 w-14 sm:h-16 sm:w-16 lg:h-18 lg:w-18 rounded-full bg-gradient-to-r from-[#007BFF] to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 touch-manipulation group relative"
          size="icon"
        >
          {isOpen ? (
            <X className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white transition-transform group-hover:rotate-90" />
          ) : (
            <>
              <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
              <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-30"></div>
              <div className="absolute -top-2 -right-2 text-lg sm:text-xl animate-bounce">❄️</div>
            </>
          )}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-x-2 bottom-20 sm:bottom-24 sm:right-6 sm:left-auto z-50 sm:w-96 sm:max-w-[calc(100vw-3rem)] max-w-full">
          <Card className="shadow-lg border border-blue-200 rounded-2xl overflow-hidden animate-fade-in bg-white w-full max-h-[85vh] flex flex-col">
            <div className="bg-gradient-to-r from-[#007BFF] to-blue-600 text-white p-3 sm:p-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 relative border-2 border-white/20 flex-shrink-0">
                    <AvatarImage 
                      src={professionalAvatar} 
                      alt="HVAC Professional"
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback className="bg-white bg-opacity-20 text-white font-bold text-sm sm:text-base lg:text-lg">
                      B
                    </AvatarFallback>
                    <div className="absolute -bottom-1 -right-1 text-xs sm:text-sm">❄️</div>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-sm sm:text-base lg:text-lg truncate">Bolt</h3>
                    <p className="text-xs sm:text-sm text-blue-100 flex items-center">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-1 sm:mr-2 animate-pulse flex-shrink-0"></span>
                      <span className="truncate">Clobol assistent</span>
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChat}
                  className="text-white hover:bg-white hover:bg-opacity-20 h-8 w-8 sm:h-9 sm:w-9 p-0 touch-manipulation rounded-full transition-all hover:rotate-90 flex-shrink-0"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
               </div>
            
            <div className="flex-1 min-h-0 overflow-hidden">
              {renderContent()}
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBotWidget;