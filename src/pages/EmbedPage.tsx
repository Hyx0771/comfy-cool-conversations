import React from 'react';
import { EmbeddableWidget } from '@/components/EmbeddableWidget';

const EmbedPage = () => {
  // Get config from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const configParam = urlParams.get('config');
  
  let config = {};
  if (configParam) {
    try {
      config = JSON.parse(decodeURIComponent(configParam));
    } catch (e) {
      console.error('Invalid config parameter:', e);
    }
  }

  return (
    <div className="min-h-screen bg-transparent">
      <EmbeddableWidget config={config} />
    </div>
  );
};

export default EmbedPage;