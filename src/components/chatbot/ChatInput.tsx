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
    <div className="border-t bg-white p-4 flex-shrink-0">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]"
          onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
        />
        <Button
          onClick={onSubmit}
          disabled={!value.trim()}
          className="bg-[#007BFF] hover:bg-blue-600 text-white px-4"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};