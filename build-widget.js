import { build } from 'vite'
import { resolve } from 'path'
import fs from 'fs/promises'

async function buildWidget() {
  console.log('Building embeddable widget...')
  
  // Build the widget
  await build({
    configFile: false,
    build: {
      lib: {
        entry: resolve(process.cwd(), 'src/widget.tsx'),
        name: 'ClobotWidget',
        fileName: 'widget',
        formats: ['iife']
      },
      outDir: 'dist-widget',
      rollupOptions: {
        external: [],
        output: {
          inlineDynamicImports: true,
          globals: {}
        }
      },
      cssCodeSplit: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    define: {
      'process.env.NODE_ENV': '"production"'
    }
  })

  // Create embed.js
  const embedScript = `
(function() {
  'use strict';
  
  // Configuration
  var config = window.ClobotConfig || {};
  var widgetUrl = config.widgetUrl || 'https://clobot-widget.netlify.app/widget.js';
  var cssUrl = config.cssUrl || 'https://clobot-widget.netlify.app/widget.css';
  
  // Prevent multiple initializations
  if (window.ClobotWidget) return;
  
  // Load CSS
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = cssUrl;
  document.head.appendChild(link);
  
  // Load widget script
  var script = document.createElement('script');
  script.src = widgetUrl;
  script.onload = function() {
    if (window.ClobotWidget && typeof window.ClobotWidget.init === 'function') {
      window.ClobotWidget.init(config);
    }
  };
  document.head.appendChild(script);
  
  // Mark as loaded
  window.ClobotWidget = { loading: true };
})();`

  await fs.writeFile('dist-widget/embed.js', embedScript)
  
  console.log('Widget build complete!')
  console.log('Files created:')
  console.log('- dist-widget/widget.js (main widget)')
  console.log('- dist-widget/widget.css (styles)')
  console.log('- dist-widget/embed.js (embed script)')
}

buildWidget().catch(console.error)