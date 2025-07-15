import { build } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// Build configuration for the widget
const buildWidget = async () => {
  try {
    await build({
      configFile: false,
      root: process.cwd(),
      build: {
        outDir: 'dist-widget',
        lib: {
          entry: path.resolve(__dirname, 'src/widget/WidgetEntry.tsx'),
          name: 'ClobolChatbot',
          fileName: 'bot',
          formats: ['iife']
        },
        rollupOptions: {
          external: [],
          output: {
            globals: {},
            format: 'iife',
            inlineDynamicImports: true,
            manualChunks: undefined
          }
        },
        minify: true,
        target: 'es2015'
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src')
        }
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify('production')
      }
    });
    
    console.log('Widget built successfully!');
  } catch (error) {
    console.error('Build failed:', error);
  }
};

buildWidget();