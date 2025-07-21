import React, { useState, useEffect, useCallback, useRef } from 'react';
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

interface GreetingBubble {
  id: string;
  message: string;
  visible: boolean;
  dismissed: boolean;
}

// Cookie utilities
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Context detection
const getContextualGreeting = () => {
  const url = window.location.href.toLowerCase();
  if (url.includes('/airco')) {
    return '👋 "Bolt hier! Airco plannen? Vraag meteen je offerte."';
  }
  if (url.includes('/warmtepomp')) {
    return '👋 "Bolt hier! Warmtepompvragen? Ik help je in 1 minuut."';
  }
  return '👋 "Hey, Bolt hier! Vraag of offerte? Klik maar."';
};

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState<ChatMode>('welcome');
  const [greetingBubbles, setGreetingBubbles] = useState<GreetingBubble[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const scrollListenerRef = useRef<(() => void) | null>(null);
  const mouseListenerRef = useRef<((e: MouseEvent) => void) | null>(null);

  // Check if bubble was dismissed today
  const wasBubbleDismissedToday = useCallback(() => {
    return getCookie('bolt-bubble-dismissed') === 'true';
  }, []);

  // Dismiss bubble and set cookie
  const dismissBubble = useCallback((bubbleId: string) => {
    setGreetingBubbles(prev => 
      prev.map(bubble => 
        bubble.id === bubbleId ? { ...bubble, visible: false, dismissed: true } : bubble
      )
    );
    setCookie('bolt-bubble-dismissed', 'true', 1); // 1 day
    setHasInteracted(true);
  }, []);

  // Show initial greeting bubble
  const showInitialBubble = useCallback(() => {
    if (wasBubbleDismissedToday() || isOpen) return;
    
    const message = getContextualGreeting();
    const bubble: GreetingBubble = {
      id: 'initial',
      message,
      visible: true,
      dismissed: false
    };
    
    setGreetingBubbles([bubble]);
    
    // Schedule second bubble
    const secondBubbleTimeout = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        const secondBubble: GreetingBubble = {
          id: 'followup',
          message: '🛠️ "Klaar met heen-en-weer? Ik help je aanvraag in 60 sec afronden."',
          visible: true,
          dismissed: false
        };
        setGreetingBubbles(prev => [...prev, secondBubble]);
      }
    }, 8000);
    
    timeoutRefs.current.push(secondBubbleTimeout);
  }, [wasBubbleDismissedToday, isOpen, hasInteracted]);

  // Scroll detection
  const handleScroll = useCallback(() => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > 50) {
      showInitialBubble();
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current);
        scrollListenerRef.current = null;
      }
    }
  }, [showInitialBubble]);

  // Exit intent detection (desktop only)
  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && window.innerWidth > 768 && !isOpen && !hasInteracted) {
      setShowExitIntent(true);
    }
  }, [isOpen, hasInteracted]);

  // Initialize bubble system
  useEffect(() => {
    if (wasBubbleDismissedToday()) return;

    // Set up scroll listener for early trigger
    scrollListenerRef.current = handleScroll;
    window.addEventListener('scroll', scrollListenerRef.current);

    // Set up exit intent (desktop only)
    if (window.innerWidth > 768) {
      mouseListenerRef.current = handleMouseLeave;
      document.addEventListener('mouseleave', mouseListenerRef.current);
    }

    // Initial bubble after 3 seconds
    const initialTimeout = setTimeout(showInitialBubble, 3000);
    timeoutRefs.current.push(initialTimeout);

    return () => {
      // Cleanup
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
      
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current);
      }
      if (mouseListenerRef.current) {
        document.removeEventListener('mouseleave', mouseListenerRef.current);
      }
    };
  }, [wasBubbleDismissedToday, handleScroll, handleMouseLeave, showInitialBubble]);

  // Existing functionality
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
    setHasInteracted(true);
    if (!isOpen) {
      setCurrentMode('welcome');
      // Hide all greeting bubbles when opening chat
      setGreetingBubbles(prev => prev.map(bubble => ({ ...bubble, visible: false })));
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
      {/* Greeting Bubbles */}
      {greetingBubbles.map((bubble, index) => 
        bubble.visible && (
          <div
            key={bubble.id}
            className="fixed bottom-24 right-4 z-30 max-w-[320px] md:max-w-[380px]"
            style={{
              animation: 'bubble-slide-up 200ms ease-out',
              transform: `translateY(${index * -80}px)`,
            }}
          >
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4 relative">
              <button
                onClick={() => dismissBubble(bubble.id)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors text-sm"
              >
                ×
              </button>
              
              <div className="flex items-start space-x-3 pr-4">
                <Avatar className="w-10 h-10 relative border-2 border-blue-200 flex-shrink-0">
                  <AvatarImage 
                    src={professionalAvatar} 
                    alt="Bolt"
                    className="object-cover w-full h-full"
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-bold text-sm">
                    B
                  </AvatarFallback>
                  <div className="absolute -bottom-1 -right-1 text-xs">❄️</div>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 mb-1">Bolt</div>
                  <div className="text-sm text-gray-700 leading-relaxed">{bubble.message}</div>
                  <div className="text-xs text-gray-500 mt-2 border-t pt-2">
                    425 installaties geregeld via Bolt deze maand.
                  </div>
                </div>
              </div>
              
              <button
                onClick={toggleChat}
                className="w-full mt-3 bg-gradient-to-r from-[#007BFF] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium py-2 px-4 rounded-xl transition-all duration-200 hover:shadow-md"
              >
                Start gesprek
              </button>
            </div>
          </div>
        )
      )}

      {/* Exit Intent Mini Form (Desktop Only) */}
      {showExitIntent && window.innerWidth > 768 && (
        <div className="fixed top-4 right-4 z-30 max-w-[300px]">
          <div 
            className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 relative"
            style={{ animation: 'bubble-slide-up 200ms ease-out' }}
          >
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors text-sm"
            >
              ×
            </button>
            
            <div className="text-sm font-medium text-gray-900 mb-2">Wacht! Nog heel even...</div>
            <div className="text-xs text-gray-600 mb-3">Krijg je offerte in 60 seconden</div>
            
            <button
              onClick={toggleChat}
              className="w-full bg-gradient-to-r from-[#007BFF] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-all duration-200"
            >
              Start nu
            </button>
          </div>
        </div>
      )}

      {/* Main Chat Button */}
      <div className="fixed bottom-4 right-4 z-40">
        <Button
          onClick={toggleChat}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-[#007BFF] to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 touch-manipulation group relative"
          size="icon"
        >
          {isOpen ? (
            <X className="h-7 w-7 text-white transition-transform group-hover:rotate-90" />
          ) : (
            <>
              <MessageCircle className="h-7 w-7 text-white" />
              <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-30"></div>
              <div className="absolute -top-2 -right-2 text-xl animate-bounce">❄️</div>
            </>
          )}
        </Button>
      </div>

      {/* Main Chat Interface */}
      {isOpen && (
        <div className="fixed inset-x-2 bottom-20 md:bottom-24 md:right-6 md:left-auto z-50 md:w-[420px] max-w-full">
          <Card className="shadow-xl border border-blue-200 rounded-2xl overflow-hidden animate-fade-in bg-white w-full h-[calc(100vh-140px)] md:h-[680px] flex flex-col">
            <div className="bg-gradient-to-r from-[#007BFF] to-blue-600 text-white p-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-3 min-w-0">
                  <Avatar className="w-10 h-10 relative border-2 border-white/20 flex-shrink-0">
                    <AvatarImage 
                      src={professionalAvatar} 
                      alt="HVAC Professional"
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback className="bg-white bg-opacity-20 text-white font-bold text-base">
                      B
                    </AvatarFallback>
                    <div className="absolute -bottom-1 -right-1 text-sm">❄️</div>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-base truncate">Bolt</h3>
                    <p className="text-sm text-blue-100 flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse flex-shrink-0"></span>
                      <span className="truncate">Clobol assistent</span>
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChat}
                  className="text-white hover:bg-white hover:bg-opacity-20 h-9 w-9 p-0 touch-manipulation rounded-full transition-all hover:rotate-90 flex-shrink-0"
                >
                  <X className="h-5 w-5" />
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