import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  value, 
  onChange, 
  onSubmit, 
  placeholder = "Stel hier uw vraag..." 
}) => {
  return (
    <div className="border-t border-white/20 bg-transparent p-4 flex-shrink-0">
      <div className="flex gap-3">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] rounded-xl px-4 py-3 text-sm"
          onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
        />
        <Button
          onClick={onSubmit}
          disabled={!value.trim()}
          className="bg-gradient-to-r from-[#007BFF] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};