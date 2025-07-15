import React from 'react';
import EmbeddableHVACWidget from '@/components/EmbeddableHVACWidget';

const WidgetDemo = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Widget Demo</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Embed Code</h2>
          <p className="text-gray-600 mb-4">Use this iframe to embed the widget with full HVAC functionality:</p>
          <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-sm whitespace-pre">
              {`<iframe 
  src="https://your-app-name.lovable.app/embed" 
  width="400" 
  height="600" 
  frameborder="0"
  style="position: fixed; bottom: 20px; right: 20px; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.2);">
</iframe>`}
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