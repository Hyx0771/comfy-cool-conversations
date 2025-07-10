import React from 'react';
import { Button } from '@/components/ui/button';
import type { ContactMethod } from '../../types/conversation-types';

interface ContactMethodSelectorProps {
  contactMethods: ContactMethod[];
  onContactMethodSelect: (method: string) => void;
  isProcessing: boolean;
}

const ContactMethodSelector: React.FC<ContactMethodSelectorProps> = ({ 
  contactMethods, 
  onContactMethodSelect, 
  isProcessing 
}) => (
  <div className="p-4 space-y-4">
    <h3 className="text-lg font-semibold text-gray-800 text-center">
      Hoe wil je contact? 📞
    </h3>
    <div className="grid gap-3">
      {contactMethods.map((method) => (
        <Button
          key={method.id}
          onClick={() => onContactMethodSelect(method.id)}
          disabled={isProcessing}
          className="h-auto p-4 justify-start text-left border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 min-h-[60px] flex items-center rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white text-gray-800 hover:text-blue-700"
          variant="outline"
        >
          <div className="mr-3 text-xl">{method.emoji}</div>
          <div className="flex-1">
            <div className="font-bold text-sm leading-tight mb-1">
              {method.label}
            </div>
            <div className="text-xs leading-tight opacity-70">
              {method.description}
            </div>
          </div>
        </Button>
      ))}
    </div>
  </div>
);

export default ContactMethodSelector;