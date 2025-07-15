import React from 'react';
import WidgetChat from '@/components/WidgetChat';

const Widget: React.FC = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <WidgetChat />
    </div>
  );
};

export default Widget;