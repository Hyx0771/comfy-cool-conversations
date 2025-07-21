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
            // Show messages and current step input
            return `
                <div style="flex: 1; display: flex; flex-direction: column; overflow-y: auto;">
                    <div class="messages-container" style="flex: 1; padding: 1rem; overflow-y: auto;">
                        ${this.renderMessagesHTML()}
                    </div>
                    <div class="step-input-container"></div>
                </div>
            `;
        } else if (this.isCompleted) {
            // Show completion screen
            return `
                <div style="flex: 1; display: flex; flex-direction: column; overflow-y: auto;">
                    <div class="messages-container" style="flex: 1; padding: 1rem; overflow-y: auto;">
                        ${this.renderMessagesHTML()}
                    </div>
                    ${this.renderCompletionScreen()}
                </div>
            `;
        } else {
            // Show service selection
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
        
        // Re-render to show quote flow mode with messages
        this.render();
        
        setTimeout(() => {
            this.isTyping = true;
            this.renderMessages();
            
            setTimeout(() => {
                this.isTyping = false;
                const flowConfig = this.hvacFlowConfigs[service];
                if (flowConfig) {
                    this.addMessage(`Geweldig! Voor ${flowConfig.title} ga ik je een aantal vragen stellen om een passende offerte te maken. Dit duurt ongeveer 2-3 minuten.`, true);
                    
                    setTimeout(() => {
                        this.startQuoteFlow();
                    }, 1500);
                } else {
                    this.addMessage('Perfect! Om je een goede offerte te kunnen maken, heb ik wat meer informatie nodig. Laat je contactgegevens achter en we nemen binnen één werkdag contact met je op voor een persoonlijk advies.', true);
                }
            }, 1500);
        }, 500);
    }

    startQuoteFlow() {
        if (!this.serviceType || !this.hvacFlowConfigs[this.serviceType]) {
            return;
        }
        
        this.currentStepIndex = 0;
        this.conversationData = {};
        this.showNextQuoteStep();
    }

    showNextQuoteStep() {
        const flowConfig = this.hvacFlowConfigs[this.serviceType];
        if (!flowConfig || this.currentStepIndex >= flowConfig.steps.length) {
            this.completeQuoteFlow();
            return;
        }

        const currentStep = flowConfig.steps[this.currentStepIndex];
        this.progress = Math.round(((this.currentStepIndex + 1) / flowConfig.steps.length) * 100);
        
        // Update header progress
        this.updateProgress();
        
        setTimeout(() => {
            this.isTyping = true;
            this.renderMessages();
            
            setTimeout(() => {
                this.isTyping = false;
                this.addMessage(currentStep.content, true);
                
                setTimeout(() => {
                    this.renderQuoteStepInput(currentStep);
                }, 800);
            }, 1200);
        }, 500);
    }

    updateProgress() {
        const progressBar = this.container.querySelector('.progress-bar');
        const header = this.container.querySelector('.chat-header');
        
        if (header && this.progress > 0) {
            // Update existing progress or add new one
            const existingProgress = header.querySelector('.progress-container');
            if (existingProgress) {
                existingProgress.querySelector('.progress-bar').style.width = `${this.progress}%`;
            } else {
                const progressHTML = `
                    <div class="progress-container" style="text-align: right;">
                        <div style="font-size: 0.8rem; opacity: 0.9; margin-bottom: 0.25rem;">Voortgang</div>
                        <div style="background: rgba(255,255,255,0.2); height: 6px; width: 60px; border-radius: 3px; overflow: hidden;">
                            <div class="progress-bar" style="background: white; height: 100%; width: ${this.progress}%; transition: width 0.3s ease;"></div>
                        </div>
                    </div>
                `;
                header.innerHTML += progressHTML;
            }
        }
    }

    renderQuoteStepInput(step) {
        const stepContainer = this.container.querySelector('.step-input-container');
        if (!stepContainer) return;
        
        let inputHTML = '';
        
        if (step.type === 'choice' && step.options) {
            // Get conditional options if they exist
            let options = step.options;
            if (step.conditionalOptions && this.conversationData[step.conditionalOptions.condition]) {
                const conditionValue = this.conversationData[step.conditionalOptions.condition];
                if (step.conditionalOptions[conditionValue]) {
                    options = step.conditionalOptions[conditionValue];
                }
            }
            
            inputHTML = `
                <div class="step-input-area animate-fade-in" style="padding: 1rem; border-top: 1px solid #e5e7eb; background: white;">
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        ${options.map((option, index) => `
                            <button class="quote-option-btn" data-step-id="${step.id}" data-option="${option}" style="
                                background: white;
                                border: 2px solid #e5e7eb;
                                padding: 0.875rem;
                                border-radius: 0.5rem;
                                cursor: pointer;
                                text-align: left;
                                transition: all 0.2s ease;
                                font-size: 0.9rem;
                                color: #374151;
                                font-weight: 500;
                                line-height: 1.4;
                            ">
                                ${option}
                            </button>
                        `).join('')}
                    </div>
                    ${step.explanation ? `
                        <div style="margin-top: 0.75rem; padding: 0.75rem; background: #f0f9ff; border-radius: 0.5rem; border-left: 3px solid #007BFF;">
                            <p style="margin: 0; font-size: 0.85rem; color: #1e40af; font-style: italic;">
                                💡 ${step.explanation}
                            </p>
                        </div>
                    ` : ''}
                </div>
            `;
        } else if (step.type === 'text') {
            const isPhotoStep = step.content.toLowerCase().includes('foto') || step.content.toLowerCase().includes('upload');
            inputHTML = `
                <div class="step-input-area animate-fade-in" style="padding: 1rem; border-top: 1px solid #e5e7eb; background: white;">
                    <textarea class="quote-text-input" data-step-id="${step.id}" placeholder="${isPhotoStep ? 'Upload niet mogelijk in demo - beschrijf in tekst wat je wilt uploaden...' : 'Typ hier je antwoord...'}" style="
                        width: 100%;
                        min-height: 80px;
                        padding: 0.75rem;
                        border: 1px solid #e5e7eb;
                        border-radius: 0.5rem;
                        resize: vertical;
                        font-size: 0.9rem;
                        font-family: inherit;
                        color: #374151;
                    "></textarea>
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                        <button class="quote-submit-btn" data-step-id="${step.id}" style="
                            flex: 1;
                            background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%);
                            color: white;
                            border: none;
                            padding: 0.75rem;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            font-size: 0.9rem;
                            font-weight: 500;
                            transition: all 0.2s ease;
                        ">Volgende</button>
                        <button class="quote-skip-btn" data-step-id="${step.id}" style="
                            background: transparent;
                            border: 1px solid #e5e7eb;
                            color: #6b7280;
                            padding: 0.75rem 1rem;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            font-size: 0.9rem;
                            transition: all 0.2s ease;
                        ">Overslaan</button>
                    </div>
                </div>
            `;
        } else if (step.type === 'contact') {
            inputHTML = `
                <div class="step-input-area animate-fade-in" style="padding: 1.5rem; border-top: 1px solid #e5e7eb; background: white;">
                    <div style="margin-bottom: 1rem;">
                        <h3 style="margin: 0 0 0.5rem 0; color: #1f2937; font-size: 1.1rem; font-weight: 600;">Contactgegevens</h3>
                        <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Voor een persoonlijke offerte hebben we je gegevens nodig.</p>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                        <input type="text" class="contact-name" placeholder="Volledige naam *" style="
                            padding: 0.875rem;
                            border: 1px solid #e5e7eb;
                            border-radius: 0.5rem;
                            font-size: 0.9rem;
                            color: #374151;
                            transition: border-color 0.2s ease;
                        ">
                        <input type="email" class="contact-email" placeholder="E-mailadres *" style="
                            padding: 0.875rem;
                            border: 1px solid #e5e7eb;
                            border-radius: 0.5rem;
                            font-size: 0.9rem;
                            color: #374151;
                            transition: border-color 0.2s ease;
                        ">
                        <input type="tel" class="contact-phone" placeholder="Telefoonnummer *" style="
                            padding: 0.875rem;
                            border: 1px solid #e5e7eb;
                            border-radius: 0.5rem;
                            font-size: 0.9rem;
                            color: #374151;
                            transition: border-color 0.2s ease;
                        ">
                        <textarea class="contact-address" placeholder="Adres (optioneel)" style="
                            padding: 0.875rem;
                            border: 1px solid #e5e7eb;
                            border-radius: 0.5rem;
                            font-size: 0.9rem;
                            color: #374151;
                            resize: vertical;
                            min-height: 60px;
                            transition: border-color 0.2s ease;
                        "></textarea>
                        <button class="contact-submit-btn" style="
                            background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%);
                            color: white;
                            border: none;
                            padding: 1rem;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            font-size: 0.95rem;
                            font-weight: 600;
                            margin-top: 0.5rem;
                            transition: all 0.2s ease;
                            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.25);
                        ">🎯 Offerte aanvragen</button>
                    </div>
                    <p style="margin-top: 0.75rem; font-size: 0.8rem; color: #6b7280; text-align: center;">
                        Door op "Offerte aanvragen" te klikken, ga je akkoord met het delen van je gegevens voor een persoonlijke offerte.
                    </p>
                </div>
            `;
        }
        
        stepContainer.innerHTML = inputHTML;
        this.attachQuoteEventListeners();
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

    attachQuoteEventListeners() {
        // Option buttons
        this.container.querySelectorAll('.quote-option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const stepId = e.target.dataset.stepId;
                const option = e.target.dataset.option;
                this.handleQuoteStepResponse(stepId, option);
            });
            
            btn.addEventListener('mouseenter', (e) => {
                e.target.style.background = 'rgba(59, 130, 246, 0.05)';
                e.target.style.borderColor = '#007BFF';
                e.target.style.transform = 'translateY(-1px)';
            });
            
            btn.addEventListener('mouseleave', (e) => {
                e.target.style.background = 'white';
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.transform = 'translateY(0)';
            });
        });
        
        // Text submit buttons
        this.container.querySelectorAll('.quote-submit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const stepId = e.target.dataset.stepId;
                const textInput = this.container.querySelector(`.quote-text-input[data-step-id="${stepId}"]`);
                const value = textInput ? textInput.value.trim() : '';
                this.handleQuoteStepResponse(stepId, value || 'Geen antwoord gegeven');
            });
            
            btn.addEventListener('mouseenter', (e) => {
                e.target.style.background = 'linear-gradient(135deg, #0056b3 0%, #004085 100%)';
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 6px 16px rgba(0, 123, 255, 0.4)';
            });
            
            btn.addEventListener('mouseleave', (e) => {
                e.target.style.background = 'linear-gradient(135deg, #007BFF 0%, #0056b3 100%)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.25)';
            });
        });
        
        // Skip buttons
        this.container.querySelectorAll('.quote-skip-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const stepId = e.target.dataset.stepId;
                this.handleQuoteStepResponse(stepId, 'Overgeslagen');
            });
            
            btn.addEventListener('mouseenter', (e) => {
                e.target.style.background = '#f9fafb';
                e.target.style.borderColor = '#d1d5db';
            });
            
            btn.addEventListener('mouseleave', (e) => {
                e.target.style.background = 'transparent';
                e.target.style.borderColor = '#e5e7eb';
            });
        });
        
        // Contact form
        const contactBtn = this.container.querySelector('.contact-submit-btn');
        if (contactBtn) {
            contactBtn.addEventListener('click', () => {
                const name = this.container.querySelector('.contact-name')?.value.trim() || '';
                const email = this.container.querySelector('.contact-email')?.value.trim() || '';
                const phone = this.container.querySelector('.contact-phone')?.value.trim() || '';
                const address = this.container.querySelector('.contact-address')?.value.trim() || '';
                
                if (name && email && phone) {
                    this.conversationData.name = name;
                    this.conversationData.email = email;
                    this.conversationData.phone = phone;
                    if (address) this.conversationData.address = address;
                    this.completeQuoteFlow();
                } else {
                    // Visual feedback for required fields
                    const requiredFields = [
                        { element: this.container.querySelector('.contact-name'), value: name },
                        { element: this.container.querySelector('.contact-email'), value: email },
                        { element: this.container.querySelector('.contact-phone'), value: phone }
                    ];
                    
                    let hasErrors = false;
                    requiredFields.forEach(field => {
                        if (!field.value) {
                            field.element.style.borderColor = '#ef4444';
                            field.element.style.background = '#fef2f2';
                            hasErrors = true;
                        } else {
                            field.element.style.borderColor = '#e5e7eb';
                            field.element.style.background = 'white';
                        }
                    });
                    
                    if (hasErrors) {
                        // Show error message
                        let existingError = this.container.querySelector('.error-message');
                        if (!existingError) {
                            const errorDiv = document.createElement('div');
                            errorDiv.className = 'error-message';
                            errorDiv.style.cssText = `
                                background: #fef2f2;
                                color: #dc2626;
                                padding: 0.75rem;
                                border-radius: 0.5rem;
                                font-size: 0.85rem;
                                margin-top: 0.5rem;
                                border: 1px solid #fecaca;
                            `;
                            errorDiv.textContent = '⚠️ Vul alle verplichte velden (*) in om verder te gaan.';
                            contactBtn.parentNode.insertBefore(errorDiv, contactBtn);
                            
                            // Remove error after 5 seconds
                            setTimeout(() => {
                                if (errorDiv.parentNode) {
                                    errorDiv.parentNode.removeChild(errorDiv);
                                }
                            }, 5000);
                        }
                    }
                }
            });
            
            // Add hover effect
            contactBtn.addEventListener('mouseenter', (e) => {
                e.target.style.background = 'linear-gradient(135deg, #0056b3 0%, #004085 100%)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.4)';
            });
            
            contactBtn.addEventListener('mouseleave', (e) => {
                e.target.style.background = 'linear-gradient(135deg, #007BFF 0%, #0056b3 100%)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.25)';
            });
        }
        
        // Focus effects for inputs
        this.container.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.style.borderColor = '#007BFF';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
            });
            
            input.addEventListener('blur', (e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
            });
        });
    }

    handleQuoteStepResponse(stepId, response) {
        const flowConfig = this.hvacFlowConfigs[this.serviceType];
        const currentStep = flowConfig.steps[this.currentStepIndex];
        
        // Save response
        if (currentStep.field) {
            this.conversationData[currentStep.field] = response;
        }
        
        // Add user message
        this.addMessage(response, false);
        
        // Clear step input
        const stepContainer = this.container.querySelector('.step-input-container');
        if (stepContainer) {
            stepContainer.innerHTML = '';
        }
        
        // Move to next step
        this.currentStepIndex++;
        
        setTimeout(() => {
            this.showNextQuoteStep();
        }, 800);
    }

    completeQuoteFlow() {
        this.isCompleted = true;
        this.progress = 100;
        this.updateProgress();
        
        // Clear step input
        const stepContainer = this.container.querySelector('.step-input-container');
        if (stepContainer) {
            stepContainer.innerHTML = '';
        }
        
        setTimeout(() => {
            this.isTyping = true;
            this.renderMessages();
            
            setTimeout(() => {
                this.isTyping = false;
                this.addMessage('🎉 Geweldig! Ik heb alle informatie die ik nodig heb. We gaan direct aan de slag met je offerte en nemen binnen één werkdag contact met je op!', true);
                
                setTimeout(() => {
                    // Re-render to show completion screen
                    this.render();
                    
                    // Emit completion event
                    this.emit('quote-submitted', {
                        service: this.serviceType,
                        data: this.conversationData,
                        timestamp: new Date(),
                        status: 'completed'
                    });
                }, 2000);
            }, 1500);
        }, 500);
    }

    renderCompletionScreen() {
        return `
            <div class="completion-screen" style="padding: 1.5rem;">
                <div style="text-align: center; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 1rem; padding: 2rem; margin-bottom: 1rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🎯</div>
                    <h2 style="color: #007BFF; margin: 0 0 0.5rem 0; font-size: 1.75rem; font-weight: 700;">Offerte aangevraagd!</h2>
                    <p style="color: #6b7280; margin: 0 0 1.5rem 0; line-height: 1.6; font-size: 1rem;">
                        We hebben je aanvraag ontvangen en gaan direct aan de slag. 
                        Binnen één werkdag nemen we contact met je op voor een persoonlijk advies.
                    </p>
                    
                    <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
                        <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: rgba(59, 130, 246, 0.1); border-radius: 0.75rem; font-size: 0.95rem; color: #1e40af; font-weight: 500;">
                            <span style="font-size: 1.25rem;">📞</span>
                            <div>
                                <div style="font-weight: 600;">Direct bellen</div>
                                <div style="font-size: 0.85rem; opacity: 0.8;">070-123-4567 (ma-vr 8-18u)</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: rgba(34, 197, 94, 0.1); border-radius: 0.75rem; font-size: 0.95rem; color: #15803d; font-weight: 500;">
                            <span style="font-size: 1.25rem;">💬</span>
                            <div>
                                <div style="font-weight: 600;">WhatsApp</div>
                                <div style="font-size: 0.85rem; opacity: 0.8;">+31 6 12 34 56 78</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: rgba(168, 85, 247, 0.1); border-radius: 0.75rem; font-size: 0.95rem; color: #7c3aed; font-weight: 500;">
                            <span style="font-size: 1.25rem;">📧</span>
                            <div>
                                <div style="font-weight: 600;">E-mail</div>
                                <div style="font-size: 0.85rem; opacity: 0.8;">info@clobol.nl</div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 0.75rem;">
                        <button onclick="window.boltChatApp.openWhatsApp()" style="
                            flex: 1;
                            background: #25D366;
                            color: white;
                            border: none;
                            padding: 0.875rem 1rem;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            font-size: 0.9rem;
                            font-weight: 600;
                            transition: all 0.2s ease;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 0.5rem;
                        ">
                            <span>💬</span>
                            WhatsApp
                        </button>
                        <button onclick="window.boltChatApp.setMode('welcome')" style="
                            background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%);
                            color: white;
                            border: none;
                            padding: 0.875rem 1rem;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            font-size: 0.9rem;
                            font-weight: 600;
                            transition: all 0.2s ease;
                        ">Nieuwe offerte</button>
                    </div>
                </div>
                
                <div style="text-align: center; padding: 1rem; background: rgba(249, 250, 251, 0.8); border-radius: 0.5rem; font-size: 0.85rem; color: #6b7280;">
                    <p style="margin: 0; line-height: 1.5;">
                        🛡️ <strong>Je gegevens zijn veilig bij ons.</strong><br>
                        We gebruiken je informatie alleen voor het maken van je offerte en nemen binnen 24 uur contact op.
                    </p>
                </div>
            </div>
        `;
    }

    openWhatsApp() {
        const message = `Hoi! Ik heb zojuist een offerte aangevraagd via de chatbot voor: ${this.hvacFlowConfigs[this.serviceType]?.title}. Kunnen jullie me helpen?`;
        const phoneNumber = '+31658769652';
        const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
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
                    { id: 'airco-purpose', field: 'aircoPurpose', content: '❄️🔥 Wat wilt u precies?', type: 'choice', options: ['❄️ Alleen koelen', '🔥 Alleen verwarmen', '❄️🔥 Koelen én verwarmen'] },
                    { id: 'room-count', field: 'roomCount', content: '🏠 Hoeveel kamers?', type: 'choice', options: ['1 kamer', '2', '3', '4 of meer'] },
                    { id: 'room-size', field: 'roomSize', content: '📏 Hoe groot is de grootste kamer?', type: 'choice', options: ['Klein (< 20 m²)', 'Gemiddeld (20-35 m²)', 'Groot (35-50 m²)', 'Zeer groot (> 50 m²)'] },
                    { id: 'house-year', field: 'houseYear', content: '🏚️ Bouwjaar / isolatie huis?', type: 'choice', options: ['Voor 1990', '1990-2010', 'Na 2010', '🤷‍♂️ Weet ik niet'] },
                    { id: 'wall-material', field: 'wallMaterial', content: '🧱 Materiaal muur binnenunit?', type: 'choice', options: ['Beton / steen', 'Hout / gips', '🤷‍♂️ Weet ik niet'] },
                    { id: 'outdoor-unit-location', field: 'outdoorUnitLocation', content: '📍 Waar komt de buitenunit?', type: 'choice', options: ['Begane grond / balkon < 3 m', 'Gevel of dak hoger dan ≥ 3 m', '🤷‍♂️ Onbekend'] },
                    { id: 'electrical', field: 'electrical', content: '⚡ Wat staat er op uw zekeringkast?', type: 'choice', options: ['1 × 16 A', '1 × > 20 A', '3 × 25 A', '🤳 Weet ik niet'] },
                    { id: 'customer-type', field: 'customerType', content: '🏠 Voor wie is dit?', type: 'choice', options: ['🏠 Particulier', '🏢 Bedrijf / instelling'] },
                    { id: 'brand-preference', field: 'brandPreference', content: '🏷️ Voorkeursmerk?', type: 'choice', options: ['🔝 Daikin – topkwaliteit, stil en zuinig', '💰 Haier – voordelige basisoptie', '🤷‍♂️ Geen voorkeur'], conditionalOptions: { '🏢 Bedrijf / instelling': ['🔝 Daikin – topkwaliteit, stil en zuinig', '💰 Haier – voordelige basisoptie', '🏭 Mitsubishi Heavy – voor bedrijven', '🤷‍♂️ Geen voorkeur'] } },
                    { id: 'pipe-length', field: 'pipeLength', content: '📐 Geschatte lengte leidingen (binnen → buiten)', type: 'choice', options: ['< 3 m', '3-10 m', '> 10 m', '🤷‍♂️ Weet ik niet'] },
                    { id: 'condensation-drain', field: 'condensationDrain', content: '💧 Afvoer condenswater?', type: 'choice', options: ['🔽 Loopt vanzelf weg (natuurlijk afschot)', '💧 Geen afloop / weet ik niet'], explanation: 'Als het niet vanzelf wegloopt, plaatsen wij een klein pompje.' },
                    { id: 'photos', field: 'photos', content: '📸 Upload 2 foto\'s – binnenplek + buitenplek (optioneel)', type: 'text' },
                    { id: 'comments', field: 'comments', content: 'Is er nog iets wat we moeten weten?', type: 'text' },
                    { id: 'contact-info', field: 'contactInfo', content: 'Bijna klaar! Laat je gegevens achter voor een snelle offerte.', type: 'contact' }
                ]
            },
            'heat-pump': {
                title: '🔥 Warmtepomp',
                steps: [
                    { id: 'current-heating', field: 'currentHeating', content: '🔥 Huidige verwarming?', type: 'choice', options: ['CV-ketel < 2010', 'CV-ketel 2010-2020', 'CV-ketel > 2020', 'Volledig elektrisch'] },
                    { id: 'insulation', field: 'insulation', content: '🏚️ Isolatie / energielabel?', type: 'choice', options: ['Label A/B', 'Label C/D', 'Label E/F/G', '🤷‍♂️ Weet ik niet'] },
                    { id: 'gas-consumption', field: 'gasConsumption', content: '⛽ Jaarlijks gasverbruik (schatting)', type: 'choice', options: ['< 800 m³', '800-1400 m³', '> 1400 m³', '🤷‍♂️ Weet ik niet'] },
                    { id: 'heated-area', field: 'heatedArea', content: '📏 Verwarmd vloeroppervlak', type: 'choice', options: ['< 80 m²', '80-120 m²', '120-200 m²', '> 200 m²'] },
                    { id: 'solution-type', field: 'solutionType', content: '⚙️ Gewenste oplossing', type: 'choice', options: ['💧 Hybride (ketel + warmtepomp)', '🔌 Volledig elektrisch'] },
                    { id: 'photos', field: 'photos', content: '📸 Upload foto van meterkast + cv-ketel / technische ruimte', type: 'text' },
                    { id: 'comments', field: 'comments', content: 'Is er nog iets wat we moeten weten?', type: 'text' },
                    { id: 'contact-info', field: 'contactInfo', content: 'Perfect! Laat je gegevens achter en we sturen je een uitgebreide offerte.', type: 'contact' }
                ]
            },
            'maintenance': {
                title: '🛠️ Onderhoud / service',
                steps: [
                    { id: 'outdoor-brand', field: 'outdoorBrand', content: '🏷️ Merk buitendeel', type: 'choice', options: ['Daikin', 'Mitsubishi', 'Panasonic', 'Anders', '🤷‍♂️ Weet ik niet'] },
                    { id: 'system-year', field: 'systemYear', content: '📅 Bouwjaar systeem', type: 'choice', options: ['< 2015', '2015-2020', '> 2020', 'Onbekend'] },
                    { id: 'last-maintenance', field: 'lastMaintenance', content: '🔧 Laatste onderhoud', type: 'choice', options: ['< 12 mnd', '1-2 jaar', '> 2 jaar', 'Nooit'] },
                    { id: 'urgency', field: 'urgency', content: '⏱️ Hoe snel nodig?', type: 'choice', options: ['🚨 Spoed (≤ 24 u)', 'Binnen 1 week', 'Preventief / controle'] },
                    { id: 'photos', field: 'photos', content: '📸 Optioneel: upload foto van typeplaatje of foutcode', type: 'text' },
                    { id: 'comments', field: 'comments', content: 'Is er nog iets wat we moeten weten?', type: 'text' },
                    { id: 'contact-info', field: 'contactInfo', content: 'We nemen zo snel mogelijk contact met je op voor het onderhoud!', type: 'contact' }
                ]
            },
            'repair': {
                title: '🚑 Reparatie / storing',
                steps: [
                    { id: 'device-type', field: 'deviceType', content: '📟 Welk apparaat doet het niet?', type: 'choice', options: ['Airco', 'Warmtepomp', '🤷‍♂️ Weet ik niet'] },
                    { id: 'problem', field: 'problem', content: '❗ Wat is het probleem?', type: 'choice', options: ['❄️/🔥 Koelt of verwarmt niet', '💧 Lekt water', '🔊 Maakt lawaai', '⚠️ Foutcode op display', 'Anders'] },
                    { id: 'urgency', field: 'urgency', content: '⏱️ Hoe snel wilt u hulp?', type: 'choice', options: ['🚨 Spoed (≤ 24 u)', '48 u', '3-5 dagen', 'Niet dringend'] },
                    { id: 'media', field: 'media', content: '📸/🎥 Upload foto of korte video', type: 'text' },
                    { id: 'comments', field: 'comments', content: 'Is er nog iets wat we moeten weten?', type: 'text' },
                    { id: 'contact-info', field: 'contactInfo', content: 'We gaan meteen aan de slag om je probleem op te lossen!', type: 'contact' }
                ]
            },
            'commissioning': {
                title: '✅ Inbedrijfstelling gekocht systeem',
                steps: [
                    { id: 'system-brand', field: 'systemBrand', content: '🏷️ Merk van het systeem', type: 'choice', options: ['Daikin', 'Mitsubishi', 'Panasonic', 'Anders'] },
                    { id: 'certificate', field: 'certificate', content: '📜 F-gassen certificaat installateur?', type: 'choice', options: ['Ja', 'Nee', '🤷‍♂️ Weet ik niet'] },
                    { id: 'pipe-length', field: 'pipeLength', content: '📐 Lengte koelleidingen', type: 'choice', options: ['< 15 m', '15-30 m', '> 30 m', '🤷‍♂️ Weet ik niet'] },
                    { id: 'date', field: 'date', content: '📅 Gewenste datum inbedrijfstelling', type: 'text' },
                    { id: 'comments', field: 'comments', content: 'Is er nog iets wat we moeten weten?', type: 'text' },
                    { id: 'contact-info', field: 'contactInfo', content: 'We plannen de inbedrijfstelling zo snel mogelijk in!', type: 'contact' }
                ]
            },
            'project-advice': {
                title: '🏢 Advies groot project / VvE',
                steps: [
                    { id: 'property-type', field: 'propertyType', content: '🏢 Type pand / project', type: 'choice', options: ['Woningblok', 'Kantoorpand', 'VvE', 'Industrie', 'Anders'] },
                    { id: 'project-size', field: 'projectSize', content: '📏 Omvang project', type: 'choice', options: ['< 10 won. / < 500 m²', '10-25 won. / 500-1 000 m²', '25 won. / > 1 000 m²', '🤷‍♂️ Weet ik niet'] },
                    { id: 'budget', field: 'budget', content: '💶 Indicatief budget', type: 'choice', options: ['< €25k', '€25-75k', '€75-150k', '> €150k', 'Nog geen budget'] },
                    { id: 'delivery-date', field: 'deliveryDate', content: '📅 Gewenste opleverdatum', type: 'choice', options: ['< 3 mnd', '3-6 mnd', '> 6 mnd', 'Flexibel'] },
                    { id: 'comments', field: 'comments', content: 'Is er nog iets wat we moeten weten?', type: 'text' },
                    { id: 'contact-info', field: 'contactInfo', content: 'We nemen contact op voor een uitgebreid adviesgesprek!', type: 'contact' }
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