# Integration Guide

This guide covers various ways to integrate the Clobol AI Chatbot into your website or application.

## Table of Contents

- [Basic Integration](#basic-integration)
- [Advanced Configuration](#advanced-configuration)
- [Custom Positioning](#custom-positioning)
- [Event Handling](#event-handling)
- [Backend Integration](#backend-integration)
- [Troubleshooting](#troubleshooting)

## Basic Integration

### 1. Simple Drop-in Integration

The easiest way to add the chatbot to your website:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Website</title>
</head>
<body>
    <!-- Your website content -->
    
    <!-- Add before closing </body> tag -->
    <script src="path/to/chatbot-standalone/embed.js"></script>
</body>
</html>
```

This will add the chatbot widget to the bottom-right corner of your page.

### 2. Configuration Before Loading

Configure the chatbot before it loads:

```html
<script>
// Configure before loading the embed script
window.BoltChatConfig = {
    companyName: 'Your Company',
    welcomeMessage: 'Hello! How can we help you today?',
    theme: {
        primaryColor: '#your-brand-color',
        backgroundColor: '#ffffff'
    }
};
</script>
<script src="path/to/chatbot-standalone/embed.js"></script>
```

## Advanced Configuration

### Complete Configuration Options

```javascript
window.BoltChatConfig = {
    // Container settings
    containerId: 'my-chatbot',
    position: 'bottom-right', // 'bottom-right', 'bottom-left', 'custom'
    
    // Appearance
    theme: {
        primaryColor: '#007BFF',
        backgroundColor: '#ffffff',
        textColor: '#333333'
    },
    
    // Behavior
    autoOpen: false,
    startMode: 'welcome', // 'welcome', 'quote', 'faq'
    
    // Company information
    companyName: 'Your Company',
    welcomeMessage: 'Custom welcome message',
    
    // API configuration
    apiEndpoints: {
        quotes: 'https://your-api.com/quotes',
        support: 'https://your-api.com/support'
    },
    
    // Custom styles
    customStyles: `
        .bolt-chat-widget {
            border: 2px solid #your-color;
        }
    `,
    
    // Event callbacks
    onOpen: function() {
        console.log('Chat opened');
        // Your tracking code
    },
    onClose: function() {
        console.log('Chat closed');
    },
    onQuoteSubmit: function(data) {
        console.log('Quote submitted:', data);
        // Send to your analytics
    }
};
```

### Environment-Specific Configuration

```javascript
// Development environment
if (window.location.hostname === 'localhost') {
    window.BoltChatConfig = {
        apiEndpoints: {
            quotes: 'http://localhost:3000/api/quotes'
        }
    };
}

// Production environment
if (window.location.hostname === 'yourproductionsite.com') {
    window.BoltChatConfig = {
        apiEndpoints: {
            quotes: 'https://api.yoursite.com/quotes'
        }
    };
}
```

## Custom Positioning

### 1. Fixed Position (Default)

The chatbot appears as a floating widget:

```javascript
window.BoltChatConfig = {
    position: 'bottom-right', // or 'bottom-left'
};
```

### 2. Custom Container

Embed the chatbot in a specific element on your page:

```html
<div id="my-chatbot-container" style="width: 400px; height: 600px;"></div>

<script>
window.BoltChatConfig = {
    containerId: 'my-chatbot-container',
    position: 'custom'
};
</script>
<script src="path/to/chatbot-standalone/embed.js"></script>
```

### 3. Modal Integration

Open the chatbot in a modal:

```html
<!-- Modal HTML -->
<div id="chatModal" class="modal" style="display: none;">
    <div class="modal-content">
        <span class="close">&times;</span>
        <div id="modal-chatbot" style="width: 100%; height: 500px;"></div>
    </div>
</div>

<script>
// Configure for modal
window.BoltChatConfig = {
    containerId: 'modal-chatbot',
    position: 'custom'
};

// Open modal function
function openChatModal() {
    document.getElementById('chatModal').style.display = 'block';
}

// Close modal
document.querySelector('.close').onclick = function() {
    document.getElementById('chatModal').style.display = 'none';
}
</script>
```

## Event Handling

### Available Events

```javascript
window.BoltChatConfig = {
    onOpen: function() {
        // Chatbot was opened
        gtag('event', 'chatbot_opened');
    },
    
    onClose: function() {
        // Chatbot was closed
        gtag('event', 'chatbot_closed');
    },
    
    onQuoteSubmit: function(quoteData) {
        // Quote form was submitted
        gtag('event', 'quote_submitted', {
            service_type: quoteData.service,
            value: 1
        });
        
        // Send to your CRM
        sendToCRM(quoteData);
    },
    
    onFAQClick: function(faqData) {
        // FAQ item was clicked
        gtag('event', 'faq_clicked', {
            faq_id: faqData.id,
            question: faqData.question
        });
    },
    
    onSupportMessage: function(messageData) {
        // Support message was sent
        gtag('event', 'support_message', {
            message_length: messageData.content.length
        });
    }
};
```

### Programmatic Control

```javascript
// Open the chatbot
window.BoltChatWidget.open();

// Close the chatbot
window.BoltChatWidget.close();

// Set mode
window.BoltChatWidget.setMode('quote'); // 'welcome', 'quote', 'faq'

// Destroy the widget
window.BoltChatWidget.destroy();
```

## Backend Integration

### 1. Supabase Integration

If you have a Supabase project, update the configuration:

```javascript
// Copy config/supabase.example.js to config/supabase.js
// and update with your credentials

export const supabaseConfig = {
    url: 'https://your-project.supabase.co',
    anonKey: 'your-anon-key'
};
```

### 2. Custom API Integration

Connect to your own backend:

```javascript
window.BoltChatConfig = {
    apiEndpoints: {
        quotes: 'https://your-api.com/api/quotes',
        support: 'https://your-api.com/api/support',
        upload: 'https://your-api.com/api/upload'
    }
};
```

### Expected API Format

Your API should accept POST requests with this format:

```javascript
// Quote submission
{
    "customerData": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "123-456-7890",
        "serviceType": "new-airco",
        // ... other form data
    },
    "requestType": "email" // or "call"
}

// Support message
{
    "message": "User's support message",
    "timestamp": "2024-01-01T12:00:00Z"
}
```

## WordPress Integration

### 1. Direct Integration

Add to your theme's `footer.php`:

```php
<script>
window.BoltChatConfig = {
    companyName: '<?php echo get_bloginfo('name'); ?>',
    // Other config...
};
</script>
<script src="<?php echo get_template_directory_uri(); ?>/chatbot-standalone/embed.js"></script>
```

### 2. Plugin Integration

Create a simple WordPress plugin:

```php
<?php
/**
 * Plugin Name: Clobol Chatbot
 * Description: Adds the Clobol AI chatbot to your website
 */

function clobol_chatbot_scripts() {
    wp_enqueue_script(
        'clobol-chatbot',
        plugin_dir_url(__FILE__) . 'chatbot-standalone/embed.js',
        array(),
        '1.0.0',
        true
    );
    
    // Add configuration
    wp_localize_script('clobol-chatbot', 'BoltChatConfig', array(
        'companyName' => get_bloginfo('name'),
        'primaryColor' => get_theme_mod('primary_color', '#007BFF')
    ));
}
add_action('wp_enqueue_scripts', 'clobol_chatbot_scripts');
?>
```

## React Integration

For React applications:

```jsx
import React, { useEffect } from 'react';

const ChatbotWidget = ({ config = {} }) => {
    useEffect(() => {
        // Set configuration
        window.BoltChatConfig = {
            position: 'bottom-right',
            ...config
        };
        
        // Load the embed script
        const script = document.createElement('script');
        script.src = '/chatbot-standalone/embed.js';
        script.async = true;
        document.body.appendChild(script);
        
        return () => {
            // Cleanup on unmount
            if (window.BoltChatWidget) {
                window.BoltChatWidget.destroy();
            }
            document.body.removeChild(script);
        };
    }, [config]);
    
    return null; // This component doesn't render anything
};

export default ChatbotWidget;
```

Usage in React:

```jsx
function App() {
    return (
        <div className="App">
            {/* Your app content */}
            
            <ChatbotWidget 
                config={{
                    companyName: 'My Company',
                    theme: {
                        primaryColor: '#ff6b6b'
                    }
                }}
            />
        </div>
    );
}
```

## Troubleshooting

### Common Issues

1. **Chatbot not appearing**
   - Check browser console for errors
   - Verify the embed.js path is correct
   - Ensure no Content Security Policy blocking

2. **Configuration not working**
   - Make sure `window.BoltChatConfig` is set before loading embed.js
   - Check for JavaScript errors in console

3. **Styling conflicts**
   - Use more specific CSS selectors
   - Add `!important` to critical styles
   - Use the `customStyles` configuration option

4. **Mobile responsiveness**
   - The chatbot auto-adjusts for mobile
   - Test on actual devices, not just browser dev tools

### Debug Mode

Enable debug logging:

```javascript
window.BoltChatConfig = {
    debug: true,
    // Other config...
};
```

This will output detailed logs to the browser console.

### Browser Compatibility

The chatbot supports:
- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

For older browsers, consider adding polyfills:

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6,es2015,es2017"></script>
```

## Security Considerations

1. **Content Security Policy**
   If you have CSP enabled, you may need to allow:
   ```
   script-src 'self' 'unsafe-inline';
   connect-src 'self' https://your-api.com;
   ```

2. **Data Privacy**
   - All data is processed according to GDPR
   - No data is stored locally without consent
   - Configure your privacy policy URL in the chatbot

3. **API Security**
   - Use HTTPS for all API endpoints
   - Implement proper authentication for backend APIs
   - Validate and sanitize all inputs

## Performance Optimization

1. **Lazy Loading**
   ```javascript
   // Load only when user interacts
   document.getElementById('chat-trigger').addEventListener('click', function() {
       const script = document.createElement('script');
       script.src = 'path/to/embed.js';
       document.body.appendChild(script);
   });
   ```

2. **Preload Resources**
   ```html
   <link rel="preload" href="path/to/chatbot-standalone/assets/styles.css" as="style">
   <link rel="preload" href="path/to/chatbot-standalone/assets/chatbot.js" as="script">
   ```

For more help, contact support@clobol.nl or check the documentation in the `docs/` folder.
