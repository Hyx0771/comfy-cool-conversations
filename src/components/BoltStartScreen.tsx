import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import AgentFixMessage from './AgentFixMessage';

interface BoltStartScreenProps {
  onModeSelect: (mode: 'quote' | 'support' | 'photo' | 'faq') => void;
}

const BoltStartScreen: React.FC<BoltStartScreenProps> = ({ onModeSelect }) => {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [showModeSelection, setShowModeSelection] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowWelcomeMessage(true);
    }, 100); // Much faster - was likely longer before
  }, []);

  const handleWelcomeComplete = useCallback(() => {
    setShowModeSelection(true);
  }, []);

  const handleSupportClick = () => {
    onModeSelect('faq');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6 overflow-y-auto touch-manipulation">
        {showWelcomeMessage && (
          <AgentFixMessage
            content="👋 Bolt hier – jouw klusmaat van Clobol ❄️ Offerte of vraag? Even klikken, dan fix ik het."
            onComplete={handleWelcomeComplete}
            delay={1200}
          />
        )}

        {showModeSelection && (
          <div className="animate-fade-in space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              <Button
                className="h-auto p-4 sm:p-5 lg:p-6 justify-start text-left bg-gradient-to-r from-[#007BFF] to-blue-600 hover:from-blue-600 hover:to-blue-700 min-h-[72px] sm:min-h-[80px] lg:min-h-[85px] flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 touch-manipulation w-full group"
                onClick={() => onModeSelect('quote')}
              >
                <div className="mr-3 text-xl sm:text-2xl lg:text-3xl animate-pulse flex-shrink-0">❄️</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm sm:text-base lg:text-lg leading-tight mb-1 text-white group-hover:text-blue-50 truncate">
                    🔥 Offerte
                  </div>
                  <div className="text-xs sm:text-sm text-blue-100 leading-tight font-medium truncate">
                    Installatie of reparatie
                  </div>
                </div>
                <div className="text-white opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <span className="text-lg sm:text-xl">🔧</span>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 sm:p-5 lg:p-6 justify-start text-left min-h-[64px] sm:min-h-[70px] lg:min-h-[75px] flex items-center border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102 touch-manipulation w-full group bg-white"
                onClick={handleSupportClick}
              >
                <div className="mr-3 text-lg sm:text-xl lg:text-2xl flex-shrink-0">💬</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs sm:text-sm lg:text-base leading-tight mb-1 text-gray-800 group-hover:text-blue-700 truncate">
                    Vraag stellen
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 leading-tight truncate">
                    Over prijzen of diensten
                  </div>
                </div>
              </Button>
            </div>

            <div className="text-center mt-4 sm:mt-6 p-3 sm:p-4 bg-white/90 rounded-lg border border-transparent">
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                🛠️ Jij klikt. Bolt fixt.
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-4 text-center flex-shrink-0">
        <p className="text-xs text-gray-400">⚡ Powered by Aigento</p>
      </div>
    </div>
  );
};

export default BoltStartScreen;