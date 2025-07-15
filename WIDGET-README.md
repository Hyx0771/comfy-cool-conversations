# Clobol HVAC Widget - Integration Guide

## Overview

The Clobol HVAC Widget provides an embeddable chat assistant that replicates the exact appearance and behavior of the main Clobol assistant, including:
- Floating button with fold/unfold behavior
- Full mobile and desktop responsiveness
- Multiple chat modes (quote, support, FAQ)
- Seamless iframe integration
- Customizable branding and positioning

## Quick Start

Add this single script tag to your website:

```html
<script 
  src="https://your-domain.com/embed.js"
  data-mode="quote"
  data-theme="light"
  data-position="bottom-right"
  data-primary-color="#007BFF"
  data-title="HVAC Support"
  data-subtitle="How can we help you?"
></script>
```

## Configuration Options

### Data Attributes

| Attribute | Options | Default | Description |
|-----------|---------|---------|-------------|
| `data-mode` | `welcome`, `quote`, `support`, `faq` | `welcome` | Initial chat mode |
| `data-theme` | `light`, `dark` | `light` | Widget theme |
| `data-position` | `bottom-right`, `bottom-left`, `top-right`, `top-left` | `bottom-right` | Button position |
| `data-primary-color` | Any hex color | `#007BFF` | Primary brand color |
| `data-title` | Any string | `Bolt` | Widget header title |
| `data-subtitle` | Any string | `Clobol assistent` | Widget header subtitle |

### Examples

#### Basic Integration
```html
<script src="https://your-domain.com/embed.js"></script>
```

#### Quote Mode with Custom Branding
```html
<script 
  src="https://your-domain.com/embed.js"
  data-mode="quote"
  data-primary-color="#FF6600"
  data-title="Get Your Quote"
  data-subtitle="HVAC Solutions"
></script>
```

#### Support Mode in Top Left
```html
<script 
  src="https://your-domain.com/embed.js"
  data-mode="support"
  data-position="top-left"
  data-primary-color="#28A745"
  data-title="Need Help?"
  data-subtitle="Support Team"
></script>
```

## JavaScript API

After the widget loads, you can control it programmatically:

```javascript
// Open the widget
window.ClobolWidgetAPI.open();

// Close the widget
window.ClobolWidgetAPI.close();

// Toggle the widget
window.ClobolWidgetAPI.toggle();
```

## Chat Modes

### Welcome Mode (`data-mode="welcome"`)
- Shows mode selection screen
- Users can choose between quote, support, or FAQ
- Ideal for general-purpose integration

### Quote Mode (`data-mode="quote"`)
- Direct access to HVAC quote flow
- Includes service selection, file uploads, and contact collection
- Perfect for sales-focused pages

### Support Mode (`data-mode="support"`)
- Customer support interface
- Handles tickets and support requests
- Best for help/support pages

### FAQ Mode (`data-mode="faq"`)
- Interactive FAQ chatbot
- Answers common questions
- Great for reducing support load

## Styling and Positioning

### Position Options

- **bottom-right** (default): Standard position, doesn't interfere with content
- **bottom-left**: Alternative for right-heavy layouts
- **top-right**: Good for pages with bottom CTAs
- **top-left**: Minimal interference position

### Custom Colors

Use `data-primary-color` to match your brand:
```html
data-primary-color="#YOUR_HEX_COLOR"
```

The widget automatically applies your color to:
- Floating button background
- Header background
- Interactive elements

## Mobile Responsiveness

The widget automatically adapts to mobile devices:
- Touch-friendly button sizing
- Responsive chat window
- Optimized for mobile interactions
- Proper viewport handling

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security

- HTTPS required for production
- CSP-friendly implementation
- No external dependencies
- Sandboxed iframe execution

## Performance

- Lazy loading iframe
- Minimal initial payload
- Efficient message passing
- No impact on page load speed

## Troubleshooting

### Widget Not Appearing
1. Check browser console for errors
2. Verify script URL is accessible
3. Ensure HTTPS for production sites
4. Check for Content Security Policy restrictions

### Widget Not Responding
1. Verify `window.ClobolWidgetAPI` exists
2. Check iframe loading in Network tab
3. Test with different browsers
4. Verify configuration parameters

### Styling Issues
1. Check for CSS conflicts
2. Verify z-index values
3. Test on different screen sizes
4. Check for iframe restrictions

## Support

For integration support or questions:
- Check browser console for error messages
- Test with minimal configuration first
- Verify all configuration parameters
- Contact support with specific error details

## Version History

- **v1.0**: Initial release with basic embed functionality
- **v2.0**: Added HVAC-specific features and improved mobile support
- **v3.0**: Complete rewrite with exact ChatBotWidget behavior replication