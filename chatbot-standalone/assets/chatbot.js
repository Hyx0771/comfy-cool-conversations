
// Clobol AI Chatbot - Main Application Bundle
// This is a simplified version of the React-based chatbot for standalone use

class BoltChatApp {
    constructor(container, config = {}) {
        this.container = container;
        this.config = config;
        this.currentMode = config.startMode || 'welcome';
        this.eventHandlers = {};
        this.messages = [];
        this.isTyping = false;
        
        // Initialize supabase configuration (placeholder)
        this.supabase = {
            url: 'https://yiidyfidkhwtlyucacnd.supabase.co',
            key: 'your-anon-key-here' // Will be loaded from config
        };
        
        this.init();
    }

    init() {
        this.render();
        this.addWelcomeMessage();
    }

    on(event, handler) {
        if (!this.eventHandlers[event]) {
            this.eventHandlers[event] = [];
        }
        this.eventHandlers[event].push(handler);
    }

    emit(event, data) {
        if (this.eventHandlers[event]) {
            this.eventHandlers[event].forEach(handler => handler(data));
        }
    }

    setMode(mode) {
        this.currentMode = mode;
        this.render();
    }

    addMessage(content, isBot = false) {
        const message = {
            id: Date.now().toString(),
            content,
            isBot,
            timestamp: new Date()
        };
        this.messages.push(message);
        this.renderMessages();
        this.scrollToBottom();
    }

    addWelcomeMessage() {
        setTimeout(() => {
            this.addMessage(this.config.welcomeMessage || 'Hoi! Bolt hier – jouw klusmaat van Clobol ❄️ Offerte of vraag? Even klikken, dan fix ik het.', true);
        }, 500);
    }

    render() {
        this.container.innerHTML = `
            <div class="bolt-chat-widget" style="height: 100vh; display: flex; flex-direction: column; background: white;">
                ${this.renderHeader()}
                ${this.renderContent()}
            </div>
        `;
        
        this.attachEventListeners();
    }

    renderHeader() {
        return `
            <div class="chat-header" style="
                background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%);
                color: white;
                padding: 1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            ">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="font-size: 1.5rem;">⚡</div>
                    <div>
                        <h3 style="margin: 0; font-size: 1.1rem; font-weight: 600;">Bolt</h3>
                        <p style="margin: 0; font-size: 0.85rem; opacity: 0.9;">AI Assistent van ${this.config.companyName || 'Clobol'}</p>
                    </div>
                </div>
            </div>
        `;
    }

    renderContent() {
        switch (this.currentMode) {
            case 'welcome':
                return this.renderWelcomeScreen();
            case 'quote':
                return this.renderQuoteFlow();
            case 'faq':
                return this.renderFAQScreen();
            case 'support':
                return this.renderSupportScreen();
            default:
                return this.renderWelcomeScreen();
        }
    }

    renderWelcomeScreen() {
        return `
            <div style="flex: 1; padding: 1.5rem; display: flex; flex-direction: column;">
                <div class="messages-container" style="flex: 1; margin-bottom: 1rem;">
                    ${this.renderMessagesHTML()}
                </div>
                
                <div class="mode-selection" style="display: flex; flex-direction: column; gap: 1rem;">
                    <button class="mode-btn quote-btn" style="
                        background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%);
                        color: white;
                        border: none;
                        padding: 1.25rem;
                        border-radius: 12px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                        font-size: 0.95rem;
                        font-weight: 600;
                        transition: all 0.2s ease;
                        box-shadow: 0 4px 12px rgba(0,123,255,0.25);
                    " data-mode="quote">
                        <span style="font-size: 1.5rem;">❄️</span>
                        <div style="text-align: left;">
                            <div>🔥 Offerte</div>
                            <div style="font-size: 0.8rem; opacity: 0.9; font-weight: 400;">Installatie of reparatie</div>
                        </div>
                    </button>
                    
                    <button class="mode-btn faq-btn" style="
                        background: white;
                        color: #333;
                        border: 2px solid #e9ecef;
                        padding: 1rem;
                        border-radius: 12px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                        font-size: 0.9rem;
                        font-weight: 500;
                        transition: all 0.2s ease;
                    " data-mode="faq">
                        <span style="font-size: 1.25rem;">💬</span>
                        <div style="text-align: left;">
                            <div>Vraag stellen</div>
                            <div style="font-size: 0.8rem; color: #666; font-weight: 400;">Over prijzen of diensten</div>
                        </div>
                    </button>
                </div>
                
                <div style="text-align: center; margin-top: 1.5rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                    <p style="margin: 0; font-size: 0.85rem; color: #666;">🛠️ Jij klikt. Bolt fixt.</p>
                </div>
            </div>
        `;
    }

    renderQuoteFlow() {
        return `
            <div style="flex: 1; padding: 1.5rem; display: flex; flex-direction: column;">
                <div class="messages-container" style="flex: 1; margin-bottom: 1rem;">
                    ${this.renderMessagesHTML()}
                </div>
                
                <div class="quote-options" style="display: grid; grid-template-columns: 1fr; gap: 0.75rem;">
                    <button class="service-btn" style="
                        background: white;
                        border: 2px solid #e9ecef;
                        padding: 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                        text-align: left;
                        transition: all 0.2s ease;
                        font-size: 0.9rem;
                    " data-service="new-airco">
                        🌬️ Nieuwe airco (koelen / verwarmen)
                    </button>
                    <button class="service-btn" style="
                        background: white;
                        border: 2px solid #e9ecef;
                        padding: 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                        text-align: left;
                        transition: all 0.2s ease;
                        font-size: 0.9rem;
                    " data-service="heat-pump">
                        🔥 Warmtepomp
                    </button>
                    <button class="service-btn" style="
                        background: white;
                        border: 2px solid #e9ecef;
                        padding: 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                        text-align: left;
                        transition: all 0.2s ease;
                        font-size: 0.9rem;
                    " data-service="maintenance">
                        🛠️ Onderhoud / service
                    </button>
                    <button class="service-btn" style="
                        background: white;
                        border: 2px solid #e9ecef;
                        padding: 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                        text-align: left;
                        transition: all 0.2s ease;
                        font-size: 0.9rem;
                    " data-service="repair">
                        🚑 Reparatie / storing
                    </button>
                </div>
                
                <button class="back-btn" style="
                    background: transparent;
                    border: none;
                    color: #007BFF;
                    padding: 0.75rem;
                    margin-top: 1rem;
                    cursor: pointer;
                    font-size: 0.9rem;
                " onclick="this.getRootNode().host.setMode('welcome')">
                    ← Terug naar start
                </button>
            </div>
        `;
    }

    renderFAQScreen() {
        const faqs = [
            { id: 1, question: "Wel of geen warmtepomp voor mijn woning?", answer: "Een warmtepomp is ideaal om gas te besparen mits uw woning goed is geïsoleerd..." },
            { id: 2, question: "Wat kost een airco gemiddeld?", answer: "Een single-split airco voor één kamer kost doorgaans €1.500-€3.000 inclusief installatie..." },
            { id: 3, question: "Hoe snel kan ik geholpen worden?", answer: "Na uw aanvraag via het intakeformulier nemen wij binnen één werkdag contact op..." }
        ];

        return `
            <div style="flex: 1; padding: 1.5rem; display: flex; flex-direction: column;">
                <div class="messages-container" style="flex: 1; margin-bottom: 1rem;">
                    ${this.renderMessagesHTML()}
                </div>
                
                <div class="faq-grid" style="display: flex; flex-direction: column; gap: 0.75rem; max-height: 300px; overflow-y: auto;">
                    ${faqs.map(faq => `
                        <button class="faq-btn" style="
                            background: white;
                            border: 1px solid #e9ecef;
                            padding: 1rem;
                            border-radius: 8px;
                            cursor: pointer;
                            text-align: left;
                            transition: all 0.2s ease;
                            font-size: 0.85rem;
                        " data-faq-id="${faq.id}">
                            <span style="
                                background: #f8f9fa;
                                color: #007BFF;
                                padding: 0.25rem 0.5rem;
                                border-radius: 4px;
                                font-size: 0.75rem;
                                font-weight: bold;
                                margin-right: 0.5rem;
                            ">${faq.id.toString().padStart(2, '0')}</span>
                            ${faq.question}
                        </button>
                    `).join('')}
                </div>
                
                <div style="margin-top: 1rem; border-top: 1px solid #e9ecef; padding-top: 1rem;">
                    <p style="text-align: center; margin-bottom: 0.75rem; font-size: 0.85rem; color: #666;">
                        Of stel je eigen vraag:
                    </p>
                    <div style="display: flex; gap: 0.5rem;">
                        <input class="custom-question-input" type="text" placeholder="Stel hier je vraag..." style="
                            flex: 1;
                            padding: 0.75rem;
                            border: 1px solid #e9ecef;
                            border-radius: 8px;
                            font-size: 0.9rem;
                        ">
                        <button class="send-question-btn" style="
                            background: #007BFF;
                            color: white;
                            border: none;
                            padding: 0.75rem 1rem;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 1rem;
                        ">📤</button>
                    </div>
                </div>
                
                <button class="back-btn" style="
                    background: transparent;
                    border: none;
                    color: #007BFF;
                    padding: 0.75rem;
                    margin-top: 1rem;
                    cursor: pointer;
                    font-size: 0.9rem;
                " onclick="this.getRootNode().host.setMode('welcome')">
                    ← Terug naar start
                </button>
            </div>
        `;
    }

    renderSupportScreen() {
        return `
            <div style="flex: 1; padding: 1.5rem; display: flex; flex-direction: column;">
                <div class="messages-container" style="flex: 1; margin-bottom: 1rem;">
                    ${this.renderMessagesHTML()}
                </div>
                
                <div style="border-top: 1px solid #e9ecef; padding-top: 1rem;">
                    <textarea class="support-input" placeholder="Beschrijf je vraag of probleem..." style="
                        width: 100%;
                        min-height: 80px;
                        padding: 0.75rem;
                        border: 1px solid #e9ecef;
                        border-radius: 8px;
                        resize: vertical;
                        font-size: 0.9rem;
                        font-family: inherit;
                    "></textarea>
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                        <button class="send-support-btn" style="
                            flex: 1;
                            background: #007BFF;
                            color: white;
                            border: none;
                            padding: 0.75rem;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 0.9rem;
                        ">Versturen</button>
                        <button class="back-btn" style="
                            background: transparent;
                            border: 1px solid #e9ecef;
                            color: #666;
                            padding: 0.75rem 1rem;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 0.9rem;
                        " onclick="this.getRootNode().host.setMode('welcome')">
                            Terug
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderMessagesHTML() {
        if (this.messages.length === 0) {
            return '<div style="height: 100px;"></div>'; // Spacer
        }

        return `
            <div class="messages-list" style="display: flex; flex-direction: column; gap: 1rem;">
                ${this.messages.map(message => `
                    <div style="display: flex; ${message.isBot ? 'justify-content: flex-start' : 'justify-content: flex-end'};">
                        <div style="
                            max-width: 85%;
                            padding: 0.75rem 1rem;
                            border-radius: 1rem;
                            font-size: 0.9rem;
                            line-height: 1.4;
                            ${message.isBot 
                                ? 'background: #f8f9fa; color: #333; border-bottom-left-radius: 0.25rem;' 
                                : 'background: linear-gradient(135deg, #007BFF, #0056b3); color: white; border-bottom-right-radius: 0.25rem;'
                            }
                        ">
                            ${message.content}
                            <div style="
                                font-size: 0.75rem;
                                opacity: 0.7;
                                margin-top: 0.25rem;
                            ">
                                ${message.timestamp.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                `).join('')}
                ${this.isTyping ? `
                    <div style="display: flex; justify-content: flex-start;">
                        <div style="
                            background: #f8f9fa;
                            padding: 0.75rem 1rem;
                            border-radius: 1rem;
                            border-bottom-left-radius: 0.25rem;
                        ">
                            <div style="display: flex; gap: 0.25rem;">
                                <div style="
                                    width: 8px;
                                    height: 8px;
                                    background: #666;
                                    border-radius: 50%;
                                    animation: typing 1.4s infinite ease-in-out both;
                                "></div>
                                <div style="
                                    width: 8px;
                                    height: 8px;
                                    background: #666;
                                    border-radius: 50%;
                                    animation: typing 1.4s infinite ease-in-out both;
                                    animation-delay: 0.16s;
                                "></div>
                                <div style="
                                    width: 8px;
                                    height: 8px;
                                    background: #666;
                                    border-radius: 50%;
                                    animation: typing 1.4s infinite ease-in-out both;
                                    animation-delay: 0.32s;
                                "></div>
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderMessages() {
        const container = this.container.querySelector('.messages-container');
        if (container) {
            container.innerHTML = this.renderMessagesHTML();
        }
    }

    scrollToBottom() {
        const container = this.container.querySelector('.messages-container');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }

    attachEventListeners() {
        // Mode selection buttons
        this.container.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.setMode(mode);
                this.emit('chat-opened');
            });
        });

        // Service selection buttons
        this.container.querySelectorAll('.service-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const service = e.currentTarget.dataset.service;
                this.handleServiceSelection(service);
            });
        });

        // FAQ buttons
        this.container.querySelectorAll('.faq-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const faqId = e.currentTarget.dataset.faqId;
                this.handleFAQSelection(parseInt(faqId));
            });
        });

        // Custom question input
        const questionInput = this.container.querySelector('.custom-question-input');
        const sendBtn = this.container.querySelector('.send-question-btn');
        
        if (questionInput && sendBtn) {
            const sendQuestion = () => {
                const question = questionInput.value.trim();
                if (question) {
                    this.addMessage(question, false);
                    this.handleCustomQuestion(question);
                    questionInput.value = '';
                }
            };

            sendBtn.addEventListener('click', sendQuestion);
            questionInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendQuestion();
                }
            });
        }

        // Support form
        const supportBtn = this.container.querySelector('.send-support-btn');
        const supportInput = this.container.querySelector('.support-input');
        
        if (supportBtn && supportInput) {
            supportBtn.addEventListener('click', () => {
                const message = supportInput.value.trim();
                if (message) {
                    this.addMessage(message, false);
                    this.handleSupportMessage(message);
                    supportInput.value = '';
                }
            });
        }

        // Add hover effects
        this.container.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                if (!e.target.style.background.includes('transparent')) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
                }
            });
            
            btn.addEventListener('mouseleave', (e) => {
                e.target.style.transform = '';
                e.target.style.boxShadow = '';
            });
        });
    }

    handleServiceSelection(service) {
        const serviceNames = {
            'new-airco': '🌬️ Nieuwe airco (koelen / verwarmen)',
            'heat-pump': '🔥 Warmtepomp',
            'maintenance': '🛠️ Onderhoud / service',
            'repair': '🚑 Reparatie / storing'
        };

        this.addMessage(`Ik wil graag een offerte voor: ${serviceNames[service]}`, false);
        
        setTimeout(() => {
            this.isTyping = true;
            this.renderMessages();
            
            setTimeout(() => {
                this.isTyping = false;
                this.addMessage('Perfect! Om je een goede offerte te kunnen maken, heb ik wat meer informatie nodig. Laat je contactgegevens achter en we nemen binnen één werkdag contact met je op voor een persoonlijk advies.', true);
                
                // Simulate quote flow completion
                setTimeout(() => {
                    this.emit('quote-submitted', {
                        service,
                        timestamp: new Date(),
                        status: 'demo'
                    });
                }, 1000);
            }, 1500);
        }, 500);
    }

    handleFAQSelection(faqId) {
        const faqs = {
            1: {
                question: "Wel of geen warmtepomp voor mijn woning?",
                answer: "Een warmtepomp is ideaal om gas te besparen mits uw woning goed is geïsoleerd en er ruimte is voor een binnen- en buitenunit. Bij matige isolatie adviseren wij vaak een hybride oplossing. Clobol kijkt graag mee en geeft eerlijk advies op maat."
            },
            2: {
                question: "Wat kost een airco gemiddeld?",
                answer: "Een single-split airco voor één kamer kost doorgaans €1.500-€3.000 inclusief installatie. Een multi-split voor meerdere ruimtes begint rond €2.500 en kan oplopen tot €5.000 of meer, afhankelijk van aantal binnenunits en vermogen."
            },
            3: {
                question: "Hoe snel kan ik geholpen worden?",
                answer: "Na uw aanvraag via het intakeformulier nemen wij binnen één werkdag contact op. Advies en installatie kunnen meestal binnen enkele weken worden ingepland; bij spoed zoeken we sneller een oplossing."
            }
        };

        const faq = faqs[faqId];
        if (faq) {
            this.addMessage(faq.question, false);
            
            setTimeout(() => {
                this.isTyping = true;
                this.renderMessages();
                
                setTimeout(() => {
                    this.isTyping = false;
                    this.addMessage(faq.answer, true);
                    
                    setTimeout(() => {
                        this.addMessage('Heb je nog andere vragen? Stel ze gerust!', true);
                    }, 2000);
                }, 1500);
            }, 500);
        }
    }

    handleCustomQuestion(question) {
        setTimeout(() => {
            this.isTyping = true;
            this.renderMessages();
            
            setTimeout(() => {
                this.isTyping = false;
                this.addMessage('Bedankt voor je vraag! Voor meer specifieke informatie raad ik je aan om contact met ons op te nemen. We kunnen je dan beter en sneller helpen met een passend advies.', true);
                
                setTimeout(() => {
                    this.addMessage('Hoe wil je verder geholpen worden? Je kunt bellen naar 070-123-4567 of een e-mail sturen naar info@clobol.nl', true);
                }, 2000);
            }, 1500);
        }, 500);
    }

    handleSupportMessage(message) {
        setTimeout(() => {
            this.isTyping = true;
            this.renderMessages();
            
            setTimeout(() => {
                this.isTyping = false;
                this.addMessage('Bedankt voor je bericht! We hebben je vraag ontvangen en nemen zo snel mogelijk contact met je op. Voor urgente zaken kun je ook direct bellen naar 070-123-4567.', true);
            }, 1500);
        }, 500);
    }
}

// Add typing animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes typing {
        0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Export for module loading
export default BoltChatApp;
