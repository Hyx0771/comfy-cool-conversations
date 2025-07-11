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
          Kies een veelgestelde vraag:
        </p>
      </div>
      
      <div className="grid gap-3 max-h-64 overflow-y-auto">
        {faqData.map((faq) => (
          <Button
            key={faq.id}
            onClick={() => onFAQClick(faq.id)}
            variant="outline"
            className="justify-start text-left h-auto p-4 hover:bg-gradient-to-r hover:from-[#007BFF] hover:to-blue-600 hover:text-white hover:border-[#007BFF] transition-all duration-300 border-gray-200 text-gray-700 whitespace-normal rounded-xl shadow-sm"
          >
            <span className="text-xs font-bold text-[#007BFF] mr-3 bg-blue-50 px-2 py-1 rounded-md">
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