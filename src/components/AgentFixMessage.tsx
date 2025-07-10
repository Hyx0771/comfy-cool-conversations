import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import noaAvatar from '@/assets/noa-avatar.jpg';

interface AgentFixMessageProps {
  content: string;
  onComplete?: () => void;
  delay?: number;
}

const AgentFixMessage: React.FC<AgentFixMessageProps> = ({
  content,
  onComplete,
  delay = 800
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= content.length) {
          setDisplayedText(content.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsComplete(true);
          if (onComplete) {
            setTimeout(onComplete, 500);
          }
        }
      }, 30);

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [content, delay, onComplete]);

  return (
    <div className="flex space-x-3 animate-fade-in">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src={noaAvatar} alt="Noa" />
        <AvatarFallback className="bg-blue-500 text-white text-xs">N</AvatarFallback>
      </Avatar>
      <div className="bg-white rounded-2xl rounded-tl-md p-3 shadow-sm border max-w-[85%]">
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
          {displayedText}
          {!isComplete && <span className="animate-pulse">|</span>}
        </p>
      </div>
    </div>
  );
};

export default AgentFixMessage;