import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isWidget = mode === 'widget';
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      __IS_WIDGET__: JSON.stringify(isWidget),
    },
    build: isWidget ? {
      // Widget-specific build configuration
      lib: {
        entry: path.resolve(__dirname, 'src/widget.tsx'),
        name: 'ClobolWidget',
        fileName: 'clobol-widget',
        formats: ['iife'] // Self-executing function for script tag
      },
      rollupOptions: {
        output: {
          assetFileNames: 'clobol-widget.[ext]'
        }
      },
      outDir: 'dist-widget'
    } : {
      // Regular app build
      outDir: 'dist'
    }
  };
});
