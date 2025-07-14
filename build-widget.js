import { execSync } from 'child_process';
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Building standalone chatbot widget...');

try {
  // Step 1: Build the widget using Vite
  console.log('📦 Building widget with Vite...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Step 2: Create dist-widget directory
  const distWidgetDir = join(__dirname, 'dist-widget');
  if (!existsSync(distWidgetDir)) {
    mkdirSync(distWidgetDir, { recursive: true });
  }
  
  // Step 3: Copy main dist files to dist-widget
  console.log('📁 Copying build files...');
  const distDir = join(__dirname, 'dist');
  
  // Copy all files from dist to dist-widget
  execSync(`cp -r ${distDir}/* ${distWidgetDir}/`, { stdio: 'inherit' });
  
  // Step 4: Copy additional widget files
  console.log('📋 Adding widget-specific files...');
  
  // Copy embed.js if it exists
  const embedSource = join(__dirname, 'public', 'embed.js');
  const embedDest = join(distWidgetDir, 'embed.js');
  if (existsSync(embedSource)) {
    copyFileSync(embedSource, embedDest);
  }
  
  // Copy widget.html if it exists
  const widgetHtmlSource = join(__dirname, 'public', 'widget.html');
  const widgetHtmlDest = join(distWidgetDir, 'widget.html');
  if (existsSync(widgetHtmlSource)) {
    copyFileSync(widgetHtmlSource, widgetHtmlDest);
  }
  
  // Step 5: Create integration README
  console.log('📝 Creating integration instructions...');
  const readmeContent = `# Clobol Chatbot Widget Integration

## Quick Integration

Add this single line to your website:

\`\`\`html
<script 
  src="https://YOUR-NETLIFY-URL.netlify.app/embed.js"
  data-mode="faq"
  data-theme="light"
  data-position="bottom-right">
</script>
\`\`\`

## Configuration Options

- **data-mode**: "faq", "quote", "support"
- **data-theme**: "light", "dark"
- **data-position**: "bottom-right", "bottom-left", "top-right", "top-left"
- **data-primary-color**: Any hex color (e.g., "#FF6B35")
- **data-title**: Custom widget title
- **data-subtitle**: Custom widget subtitle

## Advanced Integration

For more control, use the widget library directly:

\`\`\`html
<link rel="stylesheet" href="https://YOUR-NETLIFY-URL.netlify.app/assets/index.css">
<script src="https://YOUR-NETLIFY-URL.netlify.app/assets/index.js"></script>
<script>
  // Widget will initialize automatically
</script>
\`\`\`

## Support

Contact us for integration support and customization options.
`;
  
  writeFileSync(join(distWidgetDir, 'README.md'), readmeContent);
  
  console.log('✅ Widget build completed successfully!');
  console.log(`📂 Widget files are in: ${distWidgetDir}`);
  console.log('🌐 Ready for deployment to Netlify!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
