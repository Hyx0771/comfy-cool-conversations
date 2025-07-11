import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowLeft, X } from 'lucide-react';

interface ChatHeaderProps {
  showBackButton: boolean;
  onBack: () => void;
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ showBackButton, onBack, onClose }) => {
  return (
    <div className="bg-gradient-to-r from-[#007BFF] to-blue-600 p-4 text-white flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Bolt</h3>
            <p className="text-sm text-blue-100">FAQ assistent</p>
          </div>
        </div>
        <div className="flex gap-2">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
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
    </div>
  );
};