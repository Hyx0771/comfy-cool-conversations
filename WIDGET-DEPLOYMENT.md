# Clobol Chat Widget - Deployment Guide

This guide explains how to deploy the Clobol Chat Widget as a standalone embeddable component.

## Overview

The widget is built as a standalone JavaScript library that can be embedded on any website. It includes:
- Main widget bundle (`clobol-widget.iife.js`)
- Styles (`clobol-widget.css`)
- Easy embed script (`embed.js`)
- Standalone widget page (`index.html`)

## Building the Widget

```bash
# Build the widget for deployment
node build-widget.js
```

This creates a `dist-widget` folder with all the necessary files.

## Deployment Options

### Option 1: Netlify (Recommended)

1. **Setup Repository**:
   ```bash
   git add .
   git commit -m "Add widget deployment configuration"
   git push origin main
   ```

2. **Deploy to Netlify**:
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build:widget`
   - Set publish directory: `dist-widget`
   - Deploy!

3. **Environment Variables** (if needed):
   - Set `NODE_VERSION=18` in Netlify dashboard

4. **Custom Domain** (optional):
   - Add your custom domain in Netlify dashboard
   - Update embed script URLs to use your domain

### Option 2: Manual Deployment

1. **Build the widget**:
   ```bash
   node build-widget.js
   ```

2. **Upload dist-widget contents** to your web server or CDN

3. **Update URLs** in your integration code

## Integration Instructions

### Quick Embed (Recommended)
```html
<script 
  src="https://your-domain.netlify.app/embed.js"
  data-mode="faq"
  data-theme="light"
  data-position="bottom-right"
></script>
```

### Direct Integration
```html
<link rel="stylesheet" href="https://your-domain.netlify.app/clobol-widget.css">
<script src="https://your-domain.netlify.app/clobol-widget.iife.js"></script>
<script>
  const widget = new ClobolChatWidget({
    mode: 'faq',
    theme: 'light',
    position: 'bottom-right'
  });
  widget.init();
</script>
```

## Configuration Options

- **mode**: `'faq' | 'quote' | 'support'`
- **theme**: `'light' | 'dark'`
- **position**: `'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'`
- **primaryColor**: Any CSS color value
- **title**: Widget title text
- **subtitle**: Widget subtitle text
- **welcomeMessage**: Initial greeting message

## Widget API

```javascript
// Access widget instance
window.ClobolWidgetAPI.open();
window.ClobolWidgetAPI.close();
window.ClobolWidgetAPI.updateConfig({ theme: 'dark' });
window.ClobolWidgetAPI.destroy();
```

## Testing

1. **Local Testing**:
   ```bash
   node build-widget.js
   # Open dist-widget/index.html in browser
   ```

2. **Integration Testing**:
   - Test embed script on different websites
   - Verify cross-origin functionality
   - Test different configuration options

## Troubleshooting

### CORS Issues
- Ensure proper headers are set in `netlify.toml`
- Check that your CDN allows cross-origin requests

### Widget Not Loading
- Verify script URLs are correct
- Check browser console for errors
- Ensure proper configuration attributes

### Styling Issues
- CSS conflicts with host site
- Z-index problems (widget uses z-index: 999999)
- Theme not applying correctly

## Production Checklist

- [ ] Widget builds successfully
- [ ] All files present in dist-widget
- [ ] Embed script works on test sites
- [ ] CORS headers configured
- [ ] Custom domain configured (if applicable)
- [ ] Performance optimization enabled
- [ ] Analytics configured (if needed)
- [ ] Error monitoring setup