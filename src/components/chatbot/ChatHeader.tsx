import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="bg-gradient-to-r from-[#007BFF] to-blue-600 p-4 text-white flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">💬</div>
          <div>
            <h3 className="font-semibold text-lg">Bolt</h3>
            <p className="text-sm text-blue-100">FAQ assistent</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white/20 p-2"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};