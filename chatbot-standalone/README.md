
# Clobol AI Chatbot - Standalone Package

A complete, self-contained chatbot widget that can be easily integrated into any website.

## Features

- 🤖 **Multi-mode AI Assistant**: Quote requests, FAQ support, and general chat
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🎨 **Customizable**: Easy to theme and configure
- 🔧 **Zero Dependencies**: All required libraries included
- ⚡ **Fast Setup**: Integration in under 5 minutes

## Quick Start

### Option 1: Direct Integration (Recommended)

1. **Download and Extract**
   ```bash
   # Download the chatbot-standalone folder to your project
   # Extract to your web server directory
   ```

2. **Include in Your HTML**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <!-- Your existing head content -->
   </head>
   <body>
       <!-- Your website content -->
       
       <!-- Chatbot Integration - Add before closing </body> tag -->
       <script src="path/to/chatbot-standalone/embed.js"></script>
   </body>
   </html>
   ```

3. **Done!** The chatbot will appear in the bottom-right corner of your website.

### Option 2: Custom Integration

```html
<!-- Custom container -->
<div id="my-chatbot-container"></div>

<script>
// Configure before loading
window.BoltChatConfig = {
    containerId: 'my-chatbot-container',
    position: 'custom', // 'bottom-right', 'bottom-left', 'custom'
    theme: {
        primaryColor: '#007BFF',
        backgroundColor: '#ffffff'
    }
};
</script>
<script src="path/to/chatbot-standalone/embed.js"></script>
```

## Configuration

### Basic Configuration

```javascript
window.BoltChatConfig = {
    // Container settings
    containerId: 'bolt-chat-widget', // Default container ID
    position: 'bottom-right', // 'bottom-right', 'bottom-left', 'custom'
    
    // Appearance
    theme: {
        primaryColor: '#007BFF',
        backgroundColor: '#ffffff',
        textColor: '#333333'
    },
    
    // Behavior
    autoOpen: false, // Auto-open on page load
    startMode: 'welcome', // 'welcome', 'quote', 'faq'
    
    // Company branding
    companyName: 'Your Company',
    welcomeMessage: 'Hi! How can I help you today?'
};
```

### Advanced Configuration

```javascript
window.BoltChatConfig = {
    // API Configuration (if using custom backend)
    apiEndpoints: {
        quotes: 'https://your-api.com/quotes',
        support: 'https://your-api.com/support'
    },
    
    // Custom CSS
    customStyles: `
        .bolt-chat-widget {
            /* Your custom styles */
        }
    `,
    
    // Event callbacks
    onOpen: function() { console.log('Chat opened'); },
    onClose: function() { console.log('Chat closed'); },
    onQuoteSubmit: function(data) { console.log('Quote submitted:', data); }
};
```

## File Structure

```
chatbot-standalone/
├── README.md                 # This file
├── embed.js                  # Main integration script
├── index.html               # Standalone demo page
├── package.json             # Node.js package info
├── assets/                  # Static assets
│   ├── styles.css          # Compiled styles
│   ├── chatbot.js          # Main chatbot application
│   └── images/             # Icons and images
├── src/                     # Source files (for customization)
│   ├── components/         # React components
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Utility functions
│   └── data/               # Static data
├── config/                  # Configuration files
│   ├── supabase.example.js # Example Supabase config
│   └── settings.js         # Default settings
└── docs/                   # Additional documentation
    ├── INTEGRATION.md      # Integration guide
    ├── CUSTOMIZATION.md    # Customization guide
    └── API.md              # API documentation
```

## Customization

### Styling

1. **CSS Variables**: Modify `assets/styles.css` to change colors and appearance
2. **Custom CSS**: Add your styles via the `customStyles` config option
3. **Complete Rebuild**: Modify source files in `src/` and rebuild

### Functionality

1. **FAQ Data**: Edit `src/data/faqData.js` to customize FAQ content
2. **Quote Flow**: Modify `src/data/hvacFlowConfigs.js` for quote process
3. **Messages**: Update `src/utils/messageTemplates.js` for custom messaging

### Backend Integration

By default, the chatbot uses demo endpoints. To connect your own backend:

1. Update `config/supabase.example.js` with your Supabase credentials
2. Rename to `config/supabase.js`
3. Or configure custom API endpoints in `BoltChatConfig.apiEndpoints`

## Browser Support

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## Troubleshooting

### Common Issues

1. **Chatbot not appearing**
   - Check that `embed.js` is loading correctly
   - Verify no JavaScript errors in browser console
   - Ensure container element exists (for custom positioning)

2. **Styling conflicts**
   - Add `!important` to critical styles
   - Use more specific CSS selectors
   - Check for CSS framework conflicts

3. **API errors**
   - Verify Supabase configuration
   - Check network connectivity
   - Review browser console for error messages

### Support

For technical support or customization requests:
- Email: support@clobol.nl
- Documentation: See `docs/` folder
- Issues: Create detailed bug reports with browser info

## License

This chatbot package is provided for integration purposes. Please respect the original licensing terms.

## Updates

To update to a newer version:
1. Download the latest package
2. Replace existing files (backup customizations first)
3. Review changelog for any breaking changes
4. Test integration thoroughly

---

**Powered by Clobol AI** - Professional HVAC services with intelligent automation.
