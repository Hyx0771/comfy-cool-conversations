# Customization Guide

This guide explains how to customize the appearance, behavior, and functionality of the Clobol AI Chatbot.

## Table of Contents

- [Theme Customization](#theme-customization)
- [Content Customization](#content-customization)
- [Behavioral Customization](#behavioral-customization)
- [Advanced Customization](#advanced-customization)
- [Source Code Modifications](#source-code-modifications)

## Theme Customization

### Basic Color Scheme

```javascript
window.BoltChatConfig = {
    theme: {
        primaryColor: '#your-brand-color',
        backgroundColor: '#ffffff',
        textColor: '#333333'
    }
};
```

### CSS Custom Properties

The chatbot uses CSS custom properties that you can override:

```css
.bolt-chat-widget {
    --primary-color: #007BFF;
    --bg-color: #ffffff;
    --text-color: #333333;
    --border-color: #e9ecef;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    --radius: 8px;
}
```

### Complete Theme Override

```javascript
window.BoltChatConfig = {
    customStyles: `
        .bolt-chat-widget {
            --primary-color: #ff6b6b;
            --bg-color: #f8f9fa;
            --text-color: #2c3e50;
            --border-color: #dee2e6;
            --radius: 12px;
        }
        
        .bolt-chat-widget .chat-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .bolt-chat-widget .primary-btn {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
        }
        
        .bolt-chat-widget .message.bot .message-bubble {
            background: #e3f2fd;
            color: #1565c0;
        }
    `
};
```

### Dark Theme

```javascript
window.BoltChatConfig = {
    customStyles: `
        .bolt-chat-widget {
            --primary-color: #64b5f6;
            --bg-color: #1e1e1e;
            --text-color: #ffffff;
            --border-color: #404040;
        }
        
        .bolt-chat-widget .message.bot .message-bubble {
            background: #2d2d2d;
            color: #e0e0e0;
        }
        
        .bolt-chat-widget input,
        .bolt-chat-widget textarea,
        .bolt-chat-widget button {
            background: #2d2d2d;
            color: #ffffff;
            border-color: #404040;
        }
        
        .bolt-chat-widget button:hover {
            background: #404040;
        }
    `
};
```

### Brand-Specific Themes

#### Corporate/Professional Theme
```css
.bolt-chat-widget {
    --primary-color: #2c5aa0;
    --bg-color: #ffffff;
    --text-color: #2c3e50;
    font-family: 'Arial', sans-serif;
}

.bolt-chat-widget .chat-header {
    background: linear-gradient(135deg, #2c5aa0 0%, #1e3a5f 100%);
}

.bolt-chat-widget button {
    border-radius: 4px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
```

#### Modern/Playful Theme
```css
.bolt-chat-widget {
    --primary-color: #ff6b6b;
    --bg-color: #ffffff;
    --radius: 20px;
    font-family: 'Poppins', sans-serif;
}

.bolt-chat-widget .chat-header {
    background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
    border-radius: 20px 20px 0 0;
}

.bolt-chat-widget .message-bubble {
    border-radius: 18px;
}

.bolt-chat-widget button {
    border-radius: 25px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.bolt-chat-widget button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}
```

## Content Customization

### Welcome Messages

```javascript
window.BoltChatConfig = {
    welcomeMessage: 'Welcome to our support! How can we help you today?',
    companyName: 'Your Company Name'
};
```

### FAQ Content

Edit the FAQ data in `src/data/faqData.js`:

```javascript
export const faqData = [
    {
        id: 1,
        question: "Your custom question?",
        answer: "Your detailed answer here...",
        keywords: ["custom", "question", "keywords"],
        category: "general"
    },
    // Add more FAQs...
];
```

### Service Options

Customize the quote flow services in `src/data/hvacFlowConfigs.js`:

```javascript
export const hvacFlowConfigs = {
    'custom-service': {
        title: 'Your Custom Service',
        description: 'Description of your service',
        steps: [
            {
                id: 'step-1',
                content: 'First question?',
                type: 'choice',
                options: ['Option 1', 'Option 2', 'Option 3']
            }
            // Add more steps...
        ]
    }
};
```

### Button Labels and Text

All text can be customized by modifying the source files or using configuration:

```javascript
window.BoltChatConfig = {
    labels: {
        quote: 'Get Quote',
        support: 'Need Help?',
        faq: 'Common Questions',
        send: 'Send Message',
        back: 'Go Back'
    }
};
```

## Behavioral Customization

### Auto-Open Settings

```javascript
window.BoltChatConfig = {
    autoOpen: true,
    autoOpenDelay: 5000, // Open after 5 seconds
    
    // Or condition-based auto-open
    autoOpenCondition: function() {
        // Open if user has been on page for 30 seconds
        return performance.now() > 30000;
    }
};
```

### Default Mode

```javascript
window.BoltChatConfig = {
    startMode: 'quote', // 'welcome', 'quote', 'faq', 'support'
    
    // Or dynamic mode based on page
    startMode: function() {
        if (window.location.pathname.includes('/support')) {
            return 'faq';
        } else if (window.location.pathname.includes('/quote')) {
            return 'quote';
        }
        return 'welcome';
    }
};
```

### Typing Delays

```javascript
window.BoltChatConfig = {
    typingDelay: 1000,    // How long to show typing indicator
    messageDelay: 500,    // Delay between messages
    fastMode: false       // Skip delays for testing
};
```

## Advanced Customization

### Custom Components

You can replace entire sections with your own HTML:

```javascript
window.BoltChatConfig = {
    customComponents: {
        header: `
            <div class="custom-header">
                <img src="/your-logo.png" alt="Logo">
                <h3>Custom Support</h3>
            </div>
        `,
        footer: `
            <div class="custom-footer">
                <p>Powered by Your Company</p>
            </div>
        `
    }
};
```

### Custom Animations

```css
.bolt-chat-widget .fade-in {
    animation: customFadeIn 0.5s ease-out;
}

@keyframes customFadeIn {
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.bolt-chat-widget button {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.bolt-chat-widget button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}
```

### Integration with Your Design System

```javascript
window.BoltChatConfig = {
    customStyles: `
        .bolt-chat-widget {
            font-family: var(--your-font-family);
            --primary-color: var(--your-primary-color);
            --radius: var(--your-border-radius);
        }
        
        .bolt-chat-widget button {
            /* Use your button styles */
            @apply bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark;
        }
        
        .bolt-chat-widget input {
            /* Use your input styles */
            @apply border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary;
        }
    `
};
```

### Responsive Customization

```css
/* Mobile-specific styling */
@media (max-width: 768px) {
    .bolt-chat-widget {
        border-radius: 0;
    }
    
    .bolt-chat-widget .chat-header {
        padding: 1.5rem 1rem;
    }
    
    .bolt-chat-widget .mode-selection {
        padding: 0 1rem 1rem;
    }
}

/* Desktop-specific styling */
@media (min-width: 769px) {
    .bolt-chat-widget {
        max-width: 450px;
        min-height: 600px;
    }
}
```

## Source Code Modifications

For extensive customization, you can modify the source files:

### 1. Modifying the Main Application

Edit `assets/chatbot.js` to change core functionality:

```javascript
// Example: Add custom validation
handleServiceSelection(service) {
    // Your custom validation logic
    if (!this.validateService(service)) {
        this.addMessage('This service is not available in your area.', true);
        return;
    }
    
    // Original logic...
    const serviceNames = { /* ... */ };
    this.addMessage(`Selected: ${serviceNames[service]}`, false);
}

validateService(service) {
    // Your custom validation logic
    const userLocation = this.getUserLocation();
    return this.availableServices[userLocation].includes(service);
}
```

### 2. Adding New Features

```javascript
// Example: Add geolocation detection
class BoltChatApp {
    constructor(container, config = {}) {
        // ... existing code
        this.userLocation = null;
        this.detectLocation();
    }
    
    async detectLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                this.updateServicesForLocation();
            });
        }
    }
    
    updateServicesForLocation() {
        // Customize available services based on location
        if (this.isInServiceArea()) {
            this.enableAllServices();
        } else {
            this.showLimitedServices();
        }
    }
}
```

### 3. Custom Message Templates

Create custom message generation in `src/utils/messageTemplates.js`:

```javascript
export function generateCustomMessage(customerData, serviceType) {
    const templates = {
        'emergency-service': `
            🚨 EMERGENCY SERVICE REQUEST
            
            Customer: ${customerData.name}
            Phone: ${customerData.phone}
            Issue: ${customerData.problem}
            Urgency: ${customerData.urgency}
            
            ⚠️ REQUIRES IMMEDIATE ATTENTION
        `,
        
        'maintenance-contract': `
            📋 MAINTENANCE CONTRACT REQUEST
            
            Customer: ${customerData.name}
            Property Type: ${customerData.propertyType}
            Equipment: ${customerData.equipment}
            Frequency: ${customerData.frequency}
        `
    };
    
    return templates[serviceType] || generateStandardMessage(customerData, serviceType);
}
```

### 4. Adding Integrations

Add third-party integrations:

```javascript
// Example: Google Analytics integration
class BoltChatApp {
    trackEvent(eventName, parameters) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        
        // Also send to your custom analytics
        if (this.config.customAnalytics) {
            this.config.customAnalytics.track(eventName, parameters);
        }
    }
    
    handleServiceSelection(service) {
        // Track the selection
        this.trackEvent('service_selected', {
            service_type: service,
            timestamp: Date.now()
        });
        
        // Continue with original logic...
    }
}
```

## Testing Your Customizations

### 1. Local Testing

```bash
# Start a local server
cd chatbot-standalone
npx http-server -c-1 -p 3000

# Open in browser
open http://localhost:3000
```

### 2. Test Configuration

Create a test HTML file:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Chatbot Test</title>
</head>
<body>
    <h1>Test Your Customizations</h1>
    
    <script>
    window.BoltChatConfig = {
        // Your custom configuration
        debug: true,
        theme: {
            primaryColor: '#ff6b6b'
        }
    };
    </script>
    <script src="embed.js"></script>
</body>
</html>
```

### 3. Mobile Testing

Test on actual mobile devices or use browser dev tools:

```css
/* Add temporary mobile debugging styles */
@media (max-width: 768px) {
    .bolt-chat-widget::before {
        content: 'MOBILE VIEW';
        position: absolute;
        top: 0;
        left: 0;
        background: red;
        color: white;
        padding: 4px;
        font-size: 10px;
        z-index: 9999;
    }
}
```

## Performance Considerations

### 1. CSS Optimization

```css
/* Use efficient selectors */
.bolt-chat-widget .message { /* Good */ }
.bolt-chat-widget * { /* Avoid - too broad */ }

/* Minimize repaints */
.bolt-chat-widget button {
    will-change: transform; /* For animations */
    transform: translateZ(0); /* Hardware acceleration */
}
```

### 2. JavaScript Optimization

```javascript
// Debounce expensive operations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use it for search or resize operations
const debouncedSearch = debounce(this.searchFAQs.bind(this), 300);
```

## Best Practices

1. **Keep It Consistent**: Match your website's design language
2. **Test Thoroughly**: Test on all target devices and browsers
3. **Performance First**: Minimize custom CSS and JavaScript
4. **Accessibility**: Ensure custom styles maintain accessibility
5. **Fallbacks**: Provide fallbacks for custom features
6. **Documentation**: Document your customizations for team members

For more help with customization, contact support@clobol.nl or refer to the source code comments.
