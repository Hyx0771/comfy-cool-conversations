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
      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
        {showWelcomeMessage && (
          <AgentFixMessage
            content="Hoi! Ik ben Bolt van Clobol ❄️ 
Waar kan ik je vandaag mee helpen?"
            onComplete={handleWelcomeComplete}
            delay={1200}
          />
        )}

        {showModeSelection && (
          <div className="animate-fade-in space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Button
                className="h-auto p-4 sm:p-5 justify-start text-left bg-gradient-to-r from-[#007BFF] to-blue-600 hover:from-blue-600 hover:to-blue-700 min-h-[80px] sm:min-h-[85px] flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 touch-manipulation w-full group"
                onClick={() => onModeSelect('quote')}
              >
                <div className="mr-3 text-2xl sm:text-3xl animate-pulse">❄️</div>
                <div className="flex-1">
                  <div className="font-bold text-base sm:text-lg leading-tight mb-1 text-white group-hover:text-blue-50">
                    🔥 Offerte
                  </div>
                  <div className="text-sm text-blue-100 leading-tight font-medium">
                    Installatie of reparatie
                  </div>
                </div>
                <div className="text-white opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="text-xl">🔧</span>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 sm:p-5 justify-start text-left min-h-[70px] sm:min-h-[75px] flex items-center border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102 touch-manipulation w-full group bg-white"
                onClick={handleSupportClick}
              >
                <div className="mr-3 text-xl sm:text-2xl">💬</div>
                <div className="flex-1">
                  <div className="font-bold text-sm sm:text-base leading-tight mb-1 text-gray-800 group-hover:text-blue-700">
                    Vraag stellen
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 leading-tight">
                    Over prijzen of diensten
                  </div>
                </div>
              </Button>
            </div>

            <div className="text-center mt-6 p-4 bg-white/90 rounded-lg border border-transparent">
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-medium text-blue-700">Geen zorgen!</span> Ik help je stap voor stap. 
                Binnen 2 minuten weet je waar je aan toe bent. 😊
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoltStartScreen;