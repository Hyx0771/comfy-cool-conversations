import React from 'react';
import { Button } from '@/components/ui/button';
import { faqData } from '@/data/faqData';

interface FAQGridProps {
  onFAQClick: (faqId: number) => void;
}

export const FAQGrid: React.FC<FAQGridProps> = ({ onFAQClick }) => {
  return (
    <div className="space-y-3 animate-fade-in">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          Kies een veelgestelde vraag of stel je eigen vraag:
        </p>
      </div>
      
      <div className="grid gap-2 max-h-64 overflow-y-auto">
        {faqData.map((faq) => (
          <Button
            key={faq.id}
            onClick={() => onFAQClick(faq.id)}
            variant="outline"
            className="justify-start text-left h-auto p-3 hover:bg-[#1E88E5] hover:text-white hover:border-[#1E88E5] transition-all duration-200 border-gray-200 text-gray-700 whitespace-normal"
          >
            <span className="text-xs font-medium text-[#64B5F6] mr-2">
              {faq.id.toString().padStart(2, '0')}
            </span>
            <span className="text-sm leading-relaxed">
              {faq.question}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};