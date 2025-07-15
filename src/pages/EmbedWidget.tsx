import React, { useEffect, useState } from 'react';
import EmbeddableHVACWidget from '@/components/EmbeddableHVACWidget';

const EmbedWidget = () => {
  const [config, setConfig] = useState<any>({});

  useEffect(() => {
    // Extract config from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const configParam = urlParams.get('config');
    
    if (configParam) {
      try {
        const decodedConfig = JSON.parse(decodeURIComponent(configParam));
        setConfig(decodedConfig);
      } catch (error) {
        console.error('Error parsing config:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-transparent">
      <EmbeddableHVACWidget config={config} />
    </div>
  );
};

export default EmbedWidget;