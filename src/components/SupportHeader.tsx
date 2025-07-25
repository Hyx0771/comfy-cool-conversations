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
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 border-b">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-blue-700">{encouragingMessage}</span>
        <span className="text-xs text-blue-600">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default SupportHeader;