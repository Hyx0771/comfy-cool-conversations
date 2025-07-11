import React from 'react';
import { Button } from '@/components/ui/button';
import { ContactMethod } from '@/types/chatbot-types';

interface ContactButtonsProps {
  onMethodSelect: (method: ContactMethod) => void;
}

export const ContactButtons: React.FC<ContactButtonsProps> = ({ onMethodSelect }) => {
  return (
    <div className="space-y-3 animate-fade-in">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          Kies hoe je verder geholpen wilt worden:
        </p>
      </div>
      
      <div className="space-y-2">
        <Button
          onClick={() => onMethodSelect('whatsapp')}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 h-auto"
        >
          <div className="text-left">
            <div className="font-semibold">💬 WhatsApp</div>
            <div className="text-sm text-green-100">Direct chatten</div>
          </div>
        </Button>
        
        <Button
          onClick={() => onMethodSelect('email')}
          variant="outline"
          className="w-full border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5] hover:text-white py-4 h-auto"
        >
          <div className="text-left">
            <div className="font-semibold">📧 E-mail</div>
            <div className="text-sm opacity-70">We mailen je terug</div>
          </div>
        </Button>
        
        <Button
          onClick={() => onMethodSelect('call')}
          variant="outline"
          className="w-full border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white py-4 h-auto"
        >
          <div className="text-left">
            <div className="font-semibold">📞 Belverzoek</div>
            <div className="text-sm opacity-70">We bellen je terug</div>
          </div>
        </Button>
      </div>
    </div>
  );
};