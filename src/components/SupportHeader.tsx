import React from 'react';
import { Progress } from '@/components/ui/progress';

interface SupportHeaderProps {
  progress: number;
  encouragingMessage: string;
  showProgress?: boolean;
}

const SupportHeader: React.FC<SupportHeaderProps> = ({
  progress,
  encouragingMessage,
  showProgress = true
}) => {
  if (!showProgress) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-2 sm:p-3 border-b flex-shrink-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-medium text-blue-700 truncate mr-2">{encouragingMessage}</span>
        <span className="text-xs text-blue-600 flex-shrink-0">{progress}%</span>
      </div>
      <Progress value={progress} className="h-1.5 sm:h-2" />
    </div>
  );
};

export default SupportHeader;