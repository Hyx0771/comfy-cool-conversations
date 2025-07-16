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
      <div className="fixed bottom-3 sm:bottom-4 right-3 sm:right-4 z-40">
        <Button
          onClick={toggleChat}
          className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-gradient-to-r from-[#007BFF] to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 touch-manipulation group relative"
          size="icon"
        >
          {isOpen ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white transition-transform group-hover:rotate-90" />
          ) : (
            <>
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
              <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-30"></div>
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-base sm:text-lg md:text-xl animate-bounce">❄️</div>
            </>
          )}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-x-2 bottom-16 sm:bottom-20 sm:right-4 sm:left-auto z-50 sm:w-[min(24rem,calc(100vw-2rem))] max-h-[calc(100vh-5rem)] sm:max-h-[calc(100vh-6rem)]">
          <Card className="shadow-lg border border-blue-200 rounded-2xl overflow-hidden animate-fade-in bg-white w-full h-full flex flex-col">
            <div className="bg-gradient-to-r from-[#007BFF] to-blue-600 text-white p-3 sm:p-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative border-2 border-white/20 flex-shrink-0">
                    <AvatarImage 
                      src={professionalAvatar} 
                      alt="HVAC Professional"
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback className="bg-white bg-opacity-20 text-white font-bold text-sm sm:text-base md:text-lg">
                      B
                    </AvatarFallback>
                    <div className="absolute -bottom-1 -right-1 text-xs sm:text-sm">❄️</div>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-sm sm:text-base md:text-lg truncate">Bolt</h3>
                    <p className="text-xs sm:text-sm text-blue-100 flex items-center">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-1.5 sm:mr-2 animate-pulse flex-shrink-0"></span>
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
            
            <div className="flex-1 overflow-hidden min-h-0">
              {renderContent()}
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBotWidget;