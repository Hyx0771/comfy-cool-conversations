# Clobol Widget Deployment Guide

## Overview
The Clobol Widget is an embeddable chat support system that can be integrated into any website with a single script tag. It provides FAQ support, HVAC quotes, and general customer support functionality.

## Build Process

### 1. Build the Widget
```bash
# Build the widget version
npm run build -- --mode widget

# This creates a dist-widget folder with:
# - clobol-widget.iife.js (the widget JavaScript)
# - clobol-widget.css (widget styles)
```

### 2. Build the Main App
```bash
# Build the main application
npm run build

# This creates a dist folder with the full application
```

## Deployment Structure

Your deployment should serve both:
1. **Main Application** (`/dist` folder) - The full Clobol application
2. **Widget Files** (`/dist-widget` folder) - The embeddable widget files
3. **Embed Script** (`/public/embed.js`) - The integration script

### Recommended File Structure
```
your-domain.com/
├── / (main app from /dist)
├── embed.js (from /public/embed.js)
└── widget/ (optional, for testing widget directly)
```

## Integration for Customers

### Basic Integration
Customers add this script tag to their website:

```html
<script 
  src="https://your-domain.com/embed.js"
  data-mode="faq"
  data-theme="light"
  data-position="bottom-right"
  data-primary-color="#007BFF"
  data-title="Customer Support"
  data-subtitle="How can we help you?"
></script>
```

### Configuration Options

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `data-mode` | `faq`, `quote`, `support` | `faq` | Widget functionality mode |
| `data-theme` | `light`, `dark` | `light` | Widget theme |
| `data-position` | `bottom-right`, `bottom-left`, `top-right`, `top-left` | `bottom-right` | Widget position |
| `data-primary-color` | Any CSS color | `#007BFF` | Primary brand color |
| `data-title` | String | `Clobol Support` | Widget header title |
| `data-subtitle` | String | `Hoe kunnen we helpen?` | Widget header subtitle |

## JavaScript API

The widget exposes a global API for programmatic control:

```javascript
// Open the widget
window.ClobolWidgetAPI.open();

// Close the widget  
window.ClobolWidgetAPI.close();

// Toggle widget visibility
window.ClobolWidgetAPI.toggle();

// Update configuration
window.ClobolWidgetAPI.updateConfig({
  primaryColor: '#ff6b6b',
  title: 'New Title'
});

// Remove the widget completely
window.ClobolWidgetAPI.destroy();
```

## Testing the Widget

### Local Testing
1. Start the development server: `npm run dev`
2. Open `examples/index.html` in your browser
3. The widget should appear in the bottom-right corner

### Production Testing
1. Deploy your files to your domain
2. Test the integration URL: `https://your-domain.com/?widget=true&mode=faq`
3. Test the embed script with the example HTML

## Widget Modes

### FAQ Mode (`data-mode="faq"`)
- Displays frequently asked questions
- Interactive chat interface
- Best for general customer support

### Quote Mode (`data-mode="quote"`)  
- HVAC quote request flow
- Image upload capability
- Contact form integration
- Best for service-based businesses

### Support Mode (`data-mode="support"`)
- General customer support chat
- Contact options
- Best for technical support

## Customization

### Styling
The widget respects the customer's `data-primary-color` for consistent branding. All other styling is contained within the widget to avoid conflicts.

### Content
Widget content can be customized through:
- Configuration attributes
- The JavaScript API
- Backend configuration (if implemented)

## Security Considerations

1. **CORS**: Ensure your domain allows iframe embedding
2. **CSP**: Widget uses iframe for isolation
3. **XSS**: All user inputs are sanitized
4. **Privacy**: No tracking cookies or external requests

## Performance

- **Initial Load**: ~50KB gzipped (including React)
- **Lazy Loading**: Widget content loads only when opened
- **CDN Ready**: All assets can be served from CDN
- **Mobile Optimized**: Responsive design for all devices

## Browser Support

- Chrome 60+
- Firefox 55+  
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Widget Not Appearing
1. Check console for JavaScript errors
2. Verify embed.js URL is accessible
3. Check for CSP restrictions
4. Ensure proper script placement (before `</body>`)

### Widget Not Opening
1. Verify API calls: `window.ClobolWidgetAPI`
2. Check iframe loading in browser dev tools
3. Test with direct widget URL: `?widget=true`

### Styling Issues
1. Check for CSS conflicts
2. Verify primary color format
3. Test in incognito mode
4. Check mobile viewport settings

## Support

For technical support with widget integration:
- Email: support@clobol.com
- Documentation: https://docs.clobol.com
- Examples: https://your-domain.com/examples/