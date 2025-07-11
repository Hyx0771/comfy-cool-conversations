import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClobotFAQChatbot } from './ClobotFAQChatbot';

export const ChatbotTrigger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-[#1E88E5] to-[#64B5F6] hover:from-[#1976D2] hover:to-[#42A5F5] shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
          size="lg"
        >
          <MessageCircle className="w-7 h-7 text-white group-hover:animate-pulse" />
        </Button>
        
        {/* Tooltip */}
        <div className="absolute bottom-20 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Stel je vraag aan Bolt
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>

      {/* Chatbot Interface */}
      <ClobotFAQChatbot 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
};