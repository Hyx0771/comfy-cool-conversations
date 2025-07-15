import React from 'react';
import { createRoot } from 'react-dom/client';
import EmbeddableHVACWidget from '@/components/EmbeddableHVACWidget';

const EmbedPage = () => {
  React.useEffect(() => {
    // Initialize the widget when this page loads
    const container = document.getElementById('widget-container');
    if (container) {
      const root = createRoot(container);
      root.render(
        <EmbeddableHVACWidget 
          config={{
            title: 'Bolt',
            subtitle: 'Clobol assistent',
            primaryColor: '#007BFF',
            mode: 'welcome'
          }}
        />
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div id="widget-container" className="w-full h-full"></div>
    </div>
  );
};

export default EmbedPage;