import React from 'react';
import EmbeddableHVACWidget from '@/components/EmbeddableHVACWidget';

const WidgetDemo = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Widget Demo</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Embed Code</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm">
              {`<script src="https://your-domain.com/bot.js" 
        data-title="Bolt" 
        data-subtitle="Clobol assistent"
        data-primary-color="#007BFF"
        data-auto-init="true">
</script>`}
            </code>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
          <p className="text-gray-600 mb-4">This shows how the widget appears when embedded:</p>
          
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 min-h-[400px]">
            <EmbeddableHVACWidget 
              config={{
                title: 'Bolt',
                subtitle: 'Clobol assistent',
                primaryColor: '#007BFF',
                mode: 'welcome'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetDemo;