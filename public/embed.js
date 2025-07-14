(function() {
    'use strict';
    
    // Prevent multiple loads
    if (window.ClobolWidgetLoaded) {
        console.log('Clobol Widget already loaded');
        return;
    }
    window.ClobolWidgetLoaded = true;
    
    console.log('🚀 Clobol Widget Loading...');
    
    // Get current script and configuration
    var currentScript = document.currentScript || (function() {
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i].src && scripts[i].src.indexOf('embed.js') !== -1) {
                return scripts[i];
            }
        }
        return scripts[scripts.length - 1];
    })();
    
    // Parse configuration
    var config = {
        mode: 'faq',
        theme: 'light',
        position: 'bottom-right',
        primaryColor: '#007BFF',
        title: 'Clobol Assistant',
        subtitle: 'Hoe kan ik helpen?',
        welcomeMessage: 'Hoi! Ik ben Bolt van Clobol. Waar kan ik je vandaag mee helpen?',
        baseUrl: 'https://clobol-aigento.netlify.app'
    };
    
    // Override with script attributes
    if (currentScript) {
        config.mode = currentScript.getAttribute('data-mode') || config.mode;
        config.theme = currentScript.getAttribute('data-theme') || config.theme;
        config.position = currentScript.getAttribute('data-position') || config.position;
        config.primaryColor = currentScript.getAttribute('data-primary-color') || config.primaryColor;
        config.title = currentScript.getAttribute('data-title') || config.title;
        config.subtitle = currentScript.getAttribute('data-subtitle') || config.subtitle;
        config.welcomeMessage = currentScript.getAttribute('data-welcome-message') || config.welcomeMessage;
    }
    
    console.log('📋 Widget Config:', config);
    
    // Widget CSS
    var cssText = `
        .clobol-widget {
            position: fixed;
            z-index: 2147483647;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        
        .clobol-widget-button {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: ${config.primaryColor};
            background: linear-gradient(135deg, ${config.primaryColor} 0%, ${config.primaryColor}dd 100%);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: white;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        
        .clobol-widget-button:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }
        
        .clobol-widget-button:active {
            transform: scale(0.95);
        }
        
        .clobol-widget-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            transform: scale(0);
            transition: transform 0.3s ease;
        }
        
        .clobol-widget-button:hover::before {
            transform: scale(1);
        }
        
        .clobol-widget-chat {
            width: 380px;
            height: 520px;
            border: none;
            border-radius: 16px;
            box-shadow: 0 12px 48px rgba(0,0,0,0.18);
            background: white;
            display: none;
            position: absolute;
            overflow: hidden;
        }
        
        .clobol-widget-chat.clobol-show {
            display: block;
            animation: clobolSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .clobol-widget-chat.clobol-hide {
            animation: clobolSlideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Position classes */
        .clobol-position-bottom-right {
            bottom: 20px;
            right: 20px;
        }
        
        .clobol-position-bottom-left {
            bottom: 20px;
            left: 20px;
        }
        
        .clobol-position-top-right {
            top: 20px;
            right: 20px;
        }
        
        .clobol-position-top-left {
            top: 20px;
            left: 20px;
        }
        
        /* Chat positioning */
        .clobol-widget-chat.clobol-position-bottom-right {
            bottom: 90px;
            right: 20px;
        }
        
        .clobol-widget-chat.clobol-position-bottom-left {
            bottom: 90px;
            left: 20px;
        }
        
        .clobol-widget-chat.clobol-position-top-right {
            top: 90px;
            right: 20px;
        }
        
        .clobol-widget-chat.clobol-position-top-left {
            top: 90px;
            left: 20px;
        }
        
        /* Mobile responsive */
        @media (max-width: 768px) {
            .clobol-widget-chat {
                width: calc(100vw - 40px);
                height: calc(100vh - 140px);
                max-width: 380px;
                max-height: 520px;
            }
            
            .clobol-widget-button {
                width: 56px;
                height: 56px;
                font-size: 22px;
            }
            
            .clobol-position-bottom-right,
            .clobol-position-bottom-left {
                bottom: 16px;
            }
            
            .clobol-position-bottom-right {
                right: 16px;
            }
            
            .clobol-position-bottom-left {
                left: 16px;
            }
            
            .clobol-widget-chat.clobol-position-bottom-right,
            .clobol-widget-chat.clobol-position-bottom-left {
                bottom: 84px;
            }
            
            .clobol-widget-chat.clobol-position-bottom-right {
                right: 16px;
            }
            
            .clobol-widget-chat.clobol-position-bottom-left {
                left: 16px;
            }
        }
        
        /* Animations */
        @keyframes clobolSlideUp {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes clobolSlideDown {
            from {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            to {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
        }
        
        /* Loading state */
        .clobol-widget-loading {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8f9fa;
            color: #6c757d;
            font-size: 14px;
        }
        
        .clobol-widget-loading::before {
            content: '';
            width: 20px;
            height: 20px;
            border: 2px solid #e9ecef;
            border-top: 2px solid ${config.primaryColor};
            border-radius: 50%;
            animation: clobolSpin 1s linear infinite;
            margin-right: 10px;
        }
        
        @keyframes clobolSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    // Add CSS to page
    function addCSS() {
        var style = document.createElement('style');
        style.textContent = cssText;
        document.head.appendChild(style);
        console.log('✅ Widget styles added');
    }
    
    // Create widget HTML
    function createWidget() {
        var container = document.createElement('div');
        container.className = 'clobol-widget clobol-position-' + config.position;
        container.id = 'clobol-widget-container';
        
        var isOpen = false;
        
        container.innerHTML = 
            '<button class="clobol-widget-button" id="clobol-widget-button" aria-label="Open chat">' +
                '💬' +
            '</button>' +
            '<div class="clobol-widget-chat clobol-position-' + config.position + '" id="clobol-widget-chat">' +
                '<div class="clobol-widget-loading">Loading chat...</div>' +
            '</div>';
        
        document.body.appendChild(container);
        
        var button = document.getElementById('clobol-widget-button');
        var chat = document.getElementById('clobol-widget-chat');
        
        // Load iframe after a short delay
        setTimeout(function() {
            var iframe = document.createElement('iframe');
            iframe.src = config.baseUrl + '?embedded=true&mode=' + config.mode + '&theme=' + config.theme;
            iframe.style.cssText = 'width: 100%; height: 100%; border: none; background: white;';
            iframe.allow = 'microphone; camera';
            iframe.title = config.title;
            iframe.loading = 'lazy';
            
            chat.innerHTML = '';
            chat.appendChild(iframe);
            console.log('✅ Chat iframe loaded');
        }, 500);
        
        // Button click handler
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleChat();
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (isOpen && !container.contains(e.target)) {
                closeChat();
            }
        });
        
        // Widget API functions
        function openChat() {
            if (!isOpen) {
                isOpen = true;
                chat.style.display = 'block';
                chat.className = chat.className.replace('clobol-hide', '') + ' clobol-show';
                button.innerHTML = '✕';
                button.setAttribute('aria-label', 'Close chat');
                console.log('📖 Chat opened');
            }
        }
        
        function closeChat() {
            if (isOpen) {
                isOpen = false;
                chat.className = chat.className.replace('clobol-show', '') + ' clobol-hide';
                button.innerHTML = '💬';
                button.setAttribute('aria-label', 'Open chat');
                
                setTimeout(function() {
                    if (!isOpen) {
                        chat.style.display = 'none';
                        chat.className = chat.className.replace('clobol-hide', '');
                    }
                }, 300);
                console.log('📕 Chat closed');
            }
        }
        
        function toggleChat() {
            if (isOpen) {
                closeChat();
            } else {
                openChat();
            }
        }
        
        // Create API
        window.ClobolWidgetAPI = {
            open: openChat,
            close: closeChat,
            toggle: toggleChat,
            isOpen: function() { return isOpen; },
            config: config,
            version: '1.0.0'
        };
        
        console.log('✅ Widget API created');
        
        // Fire load event
        window.dispatchEvent(new CustomEvent('clobolWidgetLoaded', { 
            detail: { config: config, api: window.ClobolWidgetAPI }
        }));
        
        return {
            open: openChat,
            close: closeChat,
            toggle: toggleChat,
            destroy: function() {
                if (container && container.parentNode) {
                    container.parentNode.removeChild(container);
                }
                window.ClobolWidgetAPI = null;
                window.ClobolWidgetLoaded = false;
                console.log('🗑️ Widget destroyed');
            }
        };
    }
    
    // Initialize widget
    function init() {
        try {
            addCSS();
            var widget = createWidget();
            window.clobolWidget = widget;
            
            // Call onload if specified
            if (currentScript && typeof currentScript.onload === 'function') {
                currentScript.onload();
            }
            
            console.log('🎉 Clobol Widget initialized successfully!');
        } catch (error) {
            console.error('❌ Clobol Widget initialization failed:', error);
            
            // Call onerror if specified
            if (currentScript && typeof currentScript.onerror === 'function') {
                currentScript.onerror(error);
            }
        }
    }
    
    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // Small delay to ensure script attributes are parsed
        setTimeout(init, 10);
    }
    
})();
