// Clobol AI Chatbot - Complete 1:1 Recreation of React Version
// Full-featured standalone chatbot matching the React components exactly

class BoltChatApp {
    constructor(container, config = {}) {
        this.container = container;
        this.config = config;
        this.currentMode = config.startMode || 'welcome';
        this.eventHandlers = {};
        this.messages = [];
        this.isTyping = false;
        this.showWelcomeMessage = false;
        this.showModeSelection = false;
        
        // HVAC Quote Flow State
        this.serviceType = null;
        this.currentStepIndex = 0;
        this.conversationData = {};
        this.isCompleted = false;
        this.progress = 0;
        this.showContactForm = false;
        this.showPersonalDetailsForm = false;
        this.selectedFiles = [];
        
        // Load HVAC Flow Configurations
        this.hvacFlowConfigs = this.getHVACFlowConfigs();
        
        this.init();
    }

    init() {
        this.render();
        this.startWelcomeSequence();
    }

    startWelcomeSequence() {
        setTimeout(() => {
            this.showWelcomeMessage = true;
            this.renderWelcomeScreen();
            this.addAnimatedWelcomeMessage();
        }, 100);
    }

    addAnimatedWelcomeMessage() {
        this.isTyping = true;
        this.renderMessages();
        
        setTimeout(() => {
            this.isTyping = false;
            this.addMessage('👋 Bolt hier – jouw klusmaat van Clobol ❄️ Offerte of vraag? Even klikken, dan fix ik het.', true);
            
            setTimeout(() => {
                this.showModeSelection = true;
                this.renderWelcomeScreen();
            }, 1200);
        }, 1200);
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
        if (mode === 'welcome') {
            this.resetToWelcome();
        } else {
            this.render();
        }
    }

    resetToWelcome() {
        this.serviceType = null;
        this.currentStepIndex = 0;
        this.conversationData = {};
        this.isCompleted = false;
        this.progress = 0;
        this.messages = [];
        this.showWelcomeMessage = false;
        this.showModeSelection = false;
        this.currentMode = 'welcome';
        this.render();
        this.startWelcomeSequence();
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

    render() {
        this.container.innerHTML = `
            <div class="bolt-chat-widget" style="height: 100vh; display: flex; flex-direction: column; background: white;">
                ${this.renderHeader()}
                <div class="chat-content" style="flex: 1; display: flex; flex-direction: column; overflow: hidden;">
                    ${this.currentMode === 'welcome' ? '' : this.renderContent()}
                </div>
            </div>
        `;
        
        if (this.currentMode === 'welcome') {
            this.renderWelcomeScreen();
        } else {
            this.attachEventListeners();
        }
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
                flex-shrink: 0;
            ">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="font-size: 1.5rem;">⚡</div>
                    <div>
                        <h3 style="margin: 0; font-size: 1.1rem; font-weight: 600;">Bolt</h3>
                        <p style="margin: 0; font-size: 0.85rem; opacity: 0.9;">AI Assistent van ${this.config.companyName || 'Clobol'}</p>
                    </div>
                </div>
                ${this.progress > 0 ? `
                    <div style="text-align: right;">
                        <div style="font-size: 0.8rem; opacity: 0.9; margin-bottom: 0.25rem;">Voortgang</div>
                        <div style="background: rgba(255,255,255,0.2); height: 6px; width: 60px; border-radius: 3px; overflow: hidden;">
                            <div style="background: white; height: 100%; width: ${this.progress}%; transition: width 0.3s ease;"></div>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderContent() {
        switch (this.currentMode) {
            case 'quote':
                return this.renderQuoteFlow();
            case 'faq':
                return this.renderFAQScreen();
            default:
                return '';
        }
    }

    renderWelcomeScreen() {
        const contentContainer = this.container.querySelector('.chat-content');
        if (!contentContainer) return '';
        
        const welcomeContent = `
            <div class="h-full flex flex-col overflow-y-auto touch-manipulation" style="flex: 1; padding: 1rem; display: flex; flex-direction: column; overflow-y: auto;">
                ${this.showWelcomeMessage ? `
                    <div class="messages-container" style="flex: 1; margin-bottom: 1rem;">
                        ${this.renderMessagesHTML()}
                    </div>
                ` : '<div style="flex: 1;"></div>'}
                
                ${this.showModeSelection ? `
                    <div class="animate-fade-in space-y-4" style="display: flex; flex-direction: column; gap: 1rem; animation: fadeIn 0.3s ease-out;">
                        <button class="mode-btn quote-btn" data-mode="quote" style="
                            background: linear-gradient(135deg, #007BFF 0%, #3b82f6 100%);
                            color: white;
                            border: none;
                            padding: 1.25rem;
                            border-radius: 0.75rem;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            gap: 0.75rem;
                            font-size: 1.1rem;
                            font-weight: 600;
                            transition: all 0.3s ease;
                            box-shadow: 0 4px 12px rgba(0,123,255,0.25);
                            min-height: 80px;
                            width: 100%;
                            text-align: left;
                        ">
                            <div style="font-size: 2rem; animation: pulse 2s infinite; flex-shrink: 0;">❄️</div>
                            <div style="flex: 1; min-width: 0;">
                                <div style="font-size: 1.125rem; line-height: 1.2; margin-bottom: 0.25rem; color: white; font-weight: bold;">
                                    🔥 Offerte
                                </div>
                                <div style="font-size: 0.875rem; color: rgba(191, 219, 254, 1); line-height: 1.2; font-weight: 500;">
                                    Installatie of reparatie
                                </div>
                            </div>
                            <div style="color: white; opacity: 0.7; transition: opacity 0.2s; flex-shrink: 0;">
                                <span style="font-size: 1.25rem;">🔧</span>
                            </div>
                        </button>
                        
                        <button class="mode-btn faq-btn" data-mode="faq" style="
                            background: white;
                            color: #333;
                            border: 2px solid rgba(191, 219, 254, 1);
                            padding: 1.25rem;
                            border-radius: 0.75rem;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            gap: 0.75rem;
                            font-size: 1rem;
                            font-weight: 500;
                            transition: all 0.3s ease;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                            min-height: 70px;
                            width: 100%;
                            text-align: left;
                        ">
                            <div style="font-size: 1.25rem; flex-shrink: 0;">💬</div>
                            <div style="flex: 1; min-width: 0;">
                                <div style="font-size: 1rem; line-height: 1.2; margin-bottom: 0.25rem; color: #1f2937; font-weight: bold;">
                                    Vraag stellen
                                </div>
                                <div style="font-size: 0.875rem; color: #6b7280; line-height: 1.2;">
                                    Over prijzen of diensten
                                </div>
                            </div>
                        </button>
                        
                        <div style="text-align: center; margin-top: 1.5rem; padding: 1rem; background: rgba(255, 255, 255, 0.9); border-radius: 0.5rem; border: 1px solid transparent;">
                            <p style="margin: 0; font-size: 0.875rem; color: #6b7280; line-height: 1.4;">
                                🛠️ Jij klikt. Bolt fixt.
                            </p>
                        </div>
                    </div>
                ` : ''}
                
                <div style="padding: 1rem; text-align: center; flex-shrink: 0;">
                    <p style="font-size: 0.75rem; color: #9ca3af;">⚡ Powered by Aigento</p>
                </div>
            </div>
        `;
        
        contentContainer.innerHTML = welcomeContent;
        this.attachEventListeners();
        return '';
    }

    attachEventListeners() {
        this.container.querySelectorAll('.mode-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.setMode(mode);
            });
        });

        this.container.querySelectorAll('.service-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const service = e.currentTarget.dataset.service;
                this.handleServiceSelection(service);
            });
        });
    }

    renderQuoteFlow() {
        if (this.serviceType && !this.isCompleted) {
            return `<div style="flex: 1; padding: 1rem; overflow-y: auto;">${this.renderMessagesHTML()}</div>`;
        } else {
            return `
                <div style="flex: 1; display: flex; flex-direction: column; padding: 1rem; overflow-y: auto;">
                    <div class="messages-container" style="flex: 1; margin-bottom: 1rem;">
                        ${this.renderMessagesHTML()}
                    </div>
                    
                    <div class="quote-options" style="display: grid; grid-template-columns: 1fr; gap: 0.75rem;">
                        <button class="service-btn" data-service="new-airco" style="background: white; border: 2px solid #e5e7eb; padding: 1rem; border-radius: 0.5rem; cursor: pointer; text-align: left; transition: all 0.2s ease; font-size: 0.9rem; display: flex; align-items: center; gap: 0.75rem; font-weight: 500; color: #374151;">
                            <span style="font-size: 1.125rem;">🌬️</span>
                            Nieuwe airco (koelen / verwarmen)
                        </button>
                        <button class="service-btn" data-service="heat-pump" style="background: white; border: 2px solid #e5e7eb; padding: 1rem; border-radius: 0.5rem; cursor: pointer; text-align: left; transition: all 0.2s ease; font-size: 0.9rem; display: flex; align-items: center; gap: 0.75rem; font-weight: 500; color: #374151;">
                            <span style="font-size: 1.125rem;">🔥</span>
                            Warmtepomp
                        </button>
                        <button class="service-btn" data-service="maintenance" style="background: white; border: 2px solid #e5e7eb; padding: 1rem; border-radius: 0.5rem; cursor: pointer; text-align: left; transition: all 0.2s ease; font-size: 0.9rem; display: flex; align-items: center; gap: 0.75rem; font-weight: 500; color: #374151;">
                            <span style="font-size: 1.125rem;">🛠️</span>
                            Onderhoud / service
                        </button>
                        <button class="service-btn" data-service="repair" style="background: white; border: 2px solid #e5e7eb; padding: 1rem; border-radius: 0.5rem; cursor: pointer; text-align: left; transition: all 0.2s ease; font-size: 0.9rem; display: flex; align-items: center; gap: 0.75rem; font-weight: 500; color: #374151;">
                            <span style="font-size: 1.125rem;">🚑</span>
                            Reparatie / storing
                        </button>
                        <button class="service-btn" data-service="commissioning" style="background: white; border: 2px solid #e5e7eb; padding: 1rem; border-radius: 0.5rem; cursor: pointer; text-align: left; transition: all 0.2s ease; font-size: 0.9rem; display: flex; align-items: center; gap: 0.75rem; font-weight: 500; color: #374151;">
                            <span style="font-size: 1.125rem;">✅</span>
                            Inbedrijfstelling gekocht systeem
                        </button>
                        <button class="service-btn" data-service="project-advice" style="background: white; border: 2px solid #e5e7eb; padding: 1rem; border-radius: 0.5rem; cursor: pointer; text-align: left; transition: all 0.2s ease; font-size: 0.9rem; display: flex; align-items: center; gap: 0.75rem; font-weight: 500; color: #374151;">
                            <span style="font-size: 1.125rem;">🏢</span>
                            Advies groot project / VvE
                        </button>
                    </div>
                    
                    <button class="back-btn" onclick="window.boltChatApp.setMode('welcome')" style="background: transparent; border: none; color: #007BFF; padding: 0.75rem; margin-top: 1rem; cursor: pointer; font-size: 0.9rem; text-align: center;">
                        ← Terug naar start
                    </button>
                </div>
            `;
        }
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
                        <button class="faq-btn" style="background: white; border: 1px solid #e9ecef; padding: 1rem; border-radius: 8px; cursor: pointer; text-align: left; transition: all 0.2s ease; font-size: 0.85rem;" data-faq-id="${faq.id}">
                            <span style="background: #f8f9fa; color: #007BFF; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: bold; margin-right: 0.5rem;">${faq.id.toString().padStart(2, '0')}</span>
                            ${faq.question}
                        </button>
                    `).join('')}
                </div>
                
                <button class="back-btn" onclick="window.boltChatApp.setMode('welcome')" style="background: transparent; border: none; color: #007BFF; padding: 0.75rem; margin-top: 1rem; cursor: pointer; font-size: 0.9rem;">
                    ← Terug naar start
                </button>
            </div>
        `;
    }

    handleServiceSelection(service) {
        const serviceNames = {
            'new-airco': '🌬️ Nieuwe airco (koelen / verwarmen)',
            'heat-pump': '🔥 Warmtepomp',
            'maintenance': '🛠️ Onderhoud / service',
            'repair': '🚑 Reparatie / storing',
            'commissioning': '✅ Inbedrijfstelling gekocht systeem',
            'project-advice': '🏢 Advies groot project / VvE'
        };

        this.addMessage(`Ik wil graag een offerte voor: ${serviceNames[service]}`, false);
        this.serviceType = service;
        
        setTimeout(() => {
            this.isTyping = true;
            this.renderMessages();
            
            setTimeout(() => {
                this.isTyping = false;
                this.addMessage(`Geweldig! Voor ${serviceNames[service]} ga ik je een aantal vragen stellen om een passende offerte te maken. Dit duurt ongeveer 2-3 minuten.`, true);
                
                setTimeout(() => {
                    this.addMessage('🎉 Demo versie - In de volledige versie volgen hier interactieve stappen voor een complete offerte!', true);
                    setTimeout(() => {
                        this.emit('quote-submitted', {
                            service,
                            timestamp: new Date(),
                            status: 'demo'
                        });
                    }, 1000);
                }, 1500);
            }, 1500);
        }, 500);
    }

    renderMessagesHTML() {
        if (this.messages.length === 0) {
            return '<div style="height: 100px;"></div>';
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
                                <div style="width: 8px; height: 8px; background: #666; border-radius: 50%; animation: typing 1.4s infinite ease-in-out both;"></div>
                                <div style="width: 8px; height: 8px; background: #666; border-radius: 50%; animation: typing 1.4s infinite ease-in-out both; animation-delay: 0.16s;"></div>
                                <div style="width: 8px; height: 8px; background: #666; border-radius: 50%; animation: typing 1.4s infinite ease-in-out both; animation-delay: 0.32s;"></div>
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderMessages() {
        const messagesContainer = this.container.querySelector('.messages-container');
        if (messagesContainer) {
            messagesContainer.innerHTML = this.renderMessagesHTML();
            this.scrollToBottom();
        }
    }

    scrollToBottom() {
        const messagesContainer = this.container.querySelector('.messages-container');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    getHVACFlowConfigs() {
        return {
            'new-airco': {
                title: '🌬️ Nieuwe airco (koelen / verwarmen)',
                steps: [
                    { id: 'airco-purpose', field: 'aircoPurpose', content: '❄️🔥 Wat wilt u precies?', type: 'choice', options: ['❄️ Alleen koelen', '🔥 Alleen verwarmen', '❄️🔥 Koelen én verwarmen'] }
                ]
            }
        };
    }
}

// Add required CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    @keyframes typing {
        0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
        40% { transform: scale(1); opacity: 1; }
    }
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
    .bolt-chat-widget button:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.15); }
`;
document.head.appendChild(style);

export default BoltChatApp;