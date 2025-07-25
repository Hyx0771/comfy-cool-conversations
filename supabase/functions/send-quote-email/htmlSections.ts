// HTML section generators for email template

export const generateHeaderSection = (serviceDisplayName: string, requestTypeText: string): string => {
  return `
        <!-- Elegant Header with Animated Background -->
        <div style="background: linear-gradient(135deg, #1E88E5 0%, #64B5F6 100%); position: relative; overflow: hidden;">
            <!-- Subtle Pattern Overlay -->
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%);"></div>
            
            <div style="padding: 50px 40px; text-align: center; position: relative; z-index: 2;" class="responsive-padding">
                <!-- Company Logo Space -->
                <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 30px; backdrop-filter: blur(10px);">
                    🏠
                </div>
                
                <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: 700; color: white; text-shadow: 0 2px 10px rgba(0,0,0,0.2); letter-spacing: -0.5px;" class="fade-in">
                    Nieuwe Premium Offerte
                </h1>
                <p style="margin: 0; font-size: 18px; color: rgba(255,255,255,0.9); font-weight: 500;">
                    ${serviceDisplayName} via Aigento.ai Platform
                </p>
                <div style="margin-top: 20px; padding: 12px 24px; background: rgba(255,255,255,0.15); border-radius: 50px; display: inline-block; backdrop-filter: blur(10px);">
                    <span style="color: white; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                        ${requestTypeText} gewenst
                    </span>
                </div>
            </div>
        </div>`;
};

export const generateContactSection = (customerData: any, formatAddress: () => string): string => {
  return `
        <!-- Premium Contact Section -->
        <div style="padding: 40px;" class="responsive-padding fade-in">
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 30px; border-left: 5px solid #3b82f6; position: relative; overflow: hidden;">
                <!-- Decorative Elements -->
                <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; opacity: 0.1;"></div>
                
                <div style="display: flex; align-items: center; margin-bottom: 25px;">
                    <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 15px; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);">
                        <span style="color: white; font-size: 20px;">👤</span>
                    </div>
                    <h2 style="margin: 0; color: #000000; font-size: 24px; font-weight: 700; letter-spacing: -0.3px;">
                        Contactgegevens
                    </h2>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                      <span style="color: #64748b; font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Naam</span>
                      <span style="color: #1e293b; font-weight: 600; font-size: 16px;">${customerData.name || 'Niet opgegeven'}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                      <span style="color: #64748b; font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Telefoon</span>
                      <span style="color: #1e293b; font-weight: 600; font-size: 16px;">${customerData.phone || 'Niet opgegeven'}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                      <span style="color: #64748b; font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">E-mail</span>
                      <span style="color: #1e293b; font-weight: 600; font-size: 16px;">${customerData.email || 'Niet opgegeven'}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0;">
                      <span style="color: #64748b; font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Adres</span>
                      <span style="color: #1e293b; font-weight: 600; font-size: 16px;">${formatAddress()}</span>
                    </div>
                </div>
            </div>
        </div>`;
};

export const generateServiceSection = (serviceDisplayName: string, serviceIcon: string): string => {
  return `
        <!-- Stunning Service Section -->
        <div style="padding: 40px;" class="responsive-padding fade-in">
            <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 16px; padding: 30px; border-left: 5px solid #10b981; position: relative; overflow: hidden;">
                <!-- Decorative Background Pattern -->
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%);"></div>
                
                <div style="display: flex; align-items: center; margin-bottom: 25px; position: relative; z-index: 2;">
                    <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 15px; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);">
                        <span style="color: white; font-size: 20px;">${serviceIcon}</span>
                    </div>
                    <h2 style="margin: 0; color: #000000; font-size: 24px; font-weight: 700; letter-spacing: -0.3px;">
                        Gevraagde Service
                    </h2>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); position: relative; z-index: 2;">
                    <p style="margin: 15px 0; color: #065f46; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                      <span style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 12px; display: inline-block;"></span>
                      ${serviceDisplayName}
                    </p>
                </div>
            </div>
        </div>`;
};

export const generateGallerySection = (galleryUrl: string): string => {
  return `
        <!-- Premium Media Gallery Section -->
        <div style="padding: 40px;" class="responsive-padding fade-in">
            <div style="background: linear-gradient(135deg, #fefbf3 0%, #fef3c7 100%); border-radius: 16px; padding: 30px; border-left: 5px solid #f59e0b; position: relative; overflow: hidden;">
                <!-- Artistic Background Elements -->
                <div style="position: absolute; top: -10px; right: -10px; width: 60px; height: 60px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 50%; opacity: 0.2;"></div>
                <div style="position: absolute; bottom: -15px; left: -15px; width: 40px; height: 40px; background: linear-gradient(135deg, #fbbf24, #f59e0b); border-radius: 50%; opacity: 0.3;"></div>
                
                <div style="display: flex; align-items: center; margin-bottom: 25px; position: relative; z-index: 2;">
                    <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 15px; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);">
                        <span style="color: white; font-size: 20px;">📸</span>
                    </div>
                    <h2 style="margin: 0; color: #000000; font-size: 24px; font-weight: 700; letter-spacing: -0.3px;">
                        Foto's en Video's
                    </h2>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 12px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.08); position: relative; z-index: 2;">
                    <div style="margin-bottom: 25px;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 20px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);">
                            <span style="color: white; font-size: 35px;">🖼️</span>
                        </div>
                        <p style="margin: 0; color: #92400e; font-size: 18px; font-weight: 600; line-height: 1.4;">
                            Professionele media documentatie toegevoegd
                        </p>
                    </div>
                    
                    <a href="${galleryUrl}" 
                       class="btn-primary"
                       style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4); transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 1px;">
                        <span style="margin-right: 8px;">🚀</span> Bekijk Media Gallery
                    </a>
                    
                    <p style="margin: 20px 0 0 0; color: #78716c; font-size: 14px; font-style: italic;">
                        Klik hierboven voor de volledige media ervaring
                    </p>
                </div>
            </div>
        </div>`;
};

export const generateConversationSection = (processedConversation: any[]): string => {
  return `
        <!-- Premium Conversation History Section -->
        <div style="padding: 40px;" class="responsive-padding fade-in">
            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 16px; padding: 30px; border-left: 5px solid #0ea5e9; position: relative; overflow: hidden;">
                <!-- Decorative Elements -->
                <div style="position: absolute; top: -10px; right: -10px; width: 60px; height: 60px; background: linear-gradient(135deg, #0ea5e9, #0284c7); border-radius: 50%; opacity: 0.2;"></div>
                
                <div style="display: flex; align-items: center; margin-bottom: 25px; position: relative; z-index: 2;">
                    <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 15px; box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);">
                        <span style="color: white; font-size: 20px;">💬</span>
                    </div>
                    <h2 style="margin: 0; color: #000000; font-size: 24px; font-weight: 700; letter-spacing: -0.3px;">
                        Volledige Conversatie
                    </h2>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); max-height: 500px; overflow-y: auto; position: relative; z-index: 2;">
                    ${processedConversation.map((msg, index) => {
                      const time = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString('nl-NL', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      }) : '';
                      
                      const isBot = msg.type === 'bot';
                      const sender = msg.sender;
                      const senderIcon = isBot ? '🤖' : '👤';
                      const bgColor = isBot ? '#f1f5f9' : '#0ea5e9';
                      const textColor = isBot ? '#1e293b' : '#ffffff';
                      const alignment = isBot ? 'flex-start' : 'flex-end';
                      const borderRadius = isBot ? '20px 20px 20px 6px' : '20px 20px 6px 20px';
                      
                      return `
                        <div style="margin: 20px 0; display: flex; justify-content: ${alignment}; align-items: flex-end;">
                          ${isBot ? `<div style="margin-right: 10px; font-size: 20px;">${senderIcon}</div>` : ''}
                          <div style="
                            max-width: 70%;
                            padding: 16px 20px;
                            border-radius: ${borderRadius};
                            background-color: ${bgColor};
                            color: ${textColor};
                            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                            position: relative;
                          ">
                            <div style="font-weight: 700; font-size: 14px; margin-bottom: 8px; opacity: ${isBot ? '0.8' : '0.9'}; display: flex; align-items: center;">
                              <span style="margin-right: 6px;">${senderIcon}</span>
                              ${sender}
                            </div>
                            <div style="line-height: 1.6; white-space: pre-wrap; font-size: 15px;">
                              ${msg.content}
                            </div>
                            ${time ? `<div style="font-size: 12px; margin-top: 8px; opacity: 0.7; font-weight: 500;">${time}</div>` : ''}
                          </div>
                          ${!isBot ? `<div style="margin-left: 10px; font-size: 20px;">${senderIcon}</div>` : ''}
                        </div>
                      `;
                    }).join('')}
                </div>
            </div>
        </div>`;
};

export const generateSpecsSection = (technicalSpecs: string[]): string => {
  return `
        <!-- Enhanced Specifications Section -->
        <div style="padding: 40px;" class="responsive-padding fade-in">
            <div style="background: linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%); border-radius: 16px; padding: 30px; border-left: 5px solid #8b5cf6; position: relative; overflow: hidden;">
                <!-- Decorative Elements -->
                <div style="position: absolute; top: 20px; right: 20px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);"></div>
                
                <div style="display: flex; align-items: center; margin-bottom: 25px; position: relative; z-index: 2;">
                    <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 15px; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);">
                        <span style="color: white; font-size: 20px;">📋</span>
                    </div>
                    <h2 style="margin: 0; color: #000000; font-size: 24px; font-weight: 700; letter-spacing: -0.3px;">
                        Technische Specificaties
                    </h2>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); position: relative; z-index: 2;">
                    ${technicalSpecs.map(spec => `
                      <div style="padding: 15px 0; border-bottom: 1px solid #f3e8ff; display: flex; align-items: center;">
                        <div style="width: 10px; height: 10px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); border-radius: 50%; margin-right: 15px; flex-shrink: 0;"></div>
                        <span style="color: #581c87; font-size: 16px; font-weight: 500; line-height: 1.5;">${spec}</span>
                      </div>
                    `).join('')}
                </div>
            </div>
        </div>`;
};

export const generateCTASection = (requestType: string, customerData: any): string => {
  return `
        <!-- Premium Call to Action Section -->
        <div style="padding: 50px 40px; background: linear-gradient(135deg, #1e293b 0%, #334155 100%); position: relative; overflow: hidden;" class="responsive-padding">
            <!-- Elegant Background Pattern -->
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%);"></div>
            
            <div style="text-align: center; position: relative; z-index: 2;">
                <div style="margin-bottom: 30px;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 20px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);">
                        <span style="color: white; font-size: 35px;">${requestType === 'call' ? '📞' : '📧'}</span>
                    </div>
                    <h3 style="color: white; margin: 0 0 15px 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                        ${requestType === 'call' ? 'Telefonisch Contact Gewenst' : 'Reactie per E-mail Gewenst'}
                    </h3>
                    <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 18px; max-width: 500px; margin: 0 auto; line-height: 1.6; font-weight: 500;">
                        ${requestType === 'call' 
                          ? 'De klant staat klaar voor een persoonlijk gesprek over deze premium offerte aanvraag.' 
                          : 'De klant verwacht jullie professionele reactie op deze uitgebreide offerte aanvraag.'}
                    </p>
                </div>
                
                <div style="margin: 40px 0;">
                    ${requestType === 'call' ? `
                    <a href="tel:${customerData.phone || ''}" 
                       class="btn-success btn-responsive"
                       style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px 40px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 18px; margin: 0 15px 15px 0; box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4); transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 1px;">
                        <span style="margin-right: 10px;">📞</span> Bel ${customerData.name || 'Klant'} Nu
                    </a>
                    ` : ''}
                    <a href="mailto:${customerData.email || ''}?subject=Premium%20Offerte%20Reactie%20-%20Aigento.ai" 
                       class="btn-primary btn-responsive"
                       style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 20px 40px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 18px; margin: 0 15px 15px 0; box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4); transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 1px;">
                        <span style="margin-right: 10px;">✉️</span> Verstuur E-mail
                    </a>
                </div>
            </div>
        </div>`;
};

export const generateGuaranteesSection = (): string => {
  return `
        <!-- Premium Service Guarantees -->
        <div style="padding: 50px 40px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white;" class="responsive-padding">
            <div style="text-align: center; margin-bottom: 40px;">
                <h3 style="margin: 0 0 15px 0; color: white; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                    Premium Service Garanties
                </h3>
                <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 16px; max-width: 600px; margin: 0 auto; line-height: 1.6;">
                    Onze toewijding aan excellentie en klanttevredenheid
                </p>
            </div>
            
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 25px; max-width: 100%;">
                <div style="flex: 1; min-width: 200px; max-width: 250px; padding: 25px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%); border-radius: 16px; border: 1px solid rgba(59, 130, 246, 0.3); text-align: center; backdrop-filter: blur(10px);">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 15px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);">
                        <span style="font-size: 28px;">⚡</span>
                    </div>
                    <h4 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: white;">Snelle Reactie</h4>
                    <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.4;">24/7 bereikbaarheid en snelle reactietijden</p>
                </div>
                
                <div style="flex: 1; min-width: 200px; max-width: 250px; padding: 25px; background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%); border-radius: 16px; border: 1px solid rgba(16, 185, 129, 0.3); text-align: center; backdrop-filter: blur(10px);">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 15px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);">
                        <span style="font-size: 28px;">💯</span>
                    </div>
                    <h4 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: white;">Vrijblijvende Offerte</h4>
                    <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.4;">Transparante prijzen zonder verborgen kosten</p>
                </div>
                
                <div style="flex: 1; min-width: 200px; max-width: 250px; padding: 25px; background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.15) 100%); border-radius: 16px; border: 1px solid rgba(245, 158, 11, 0.3); text-align: center; backdrop-filter: blur(10px);">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 15px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);">
                        <span style="font-size: 28px;">🎯</span>
                    </div>
                    <h4 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: white;">Deskundig Advies</h4>
                    <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.4;">Expertise van gecertificeerde specialisten</p>
                </div>

                <div style="flex: 1; min-width: 200px; max-width: 250px; padding: 25px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%); border-radius: 16px; border: 1px solid rgba(139, 92, 246, 0.3); text-align: center; backdrop-filter: blur(10px);">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); border-radius: 15px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);">
                        <span style="font-size: 28px;">🛡️</span>
                    </div>
                    <h4 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: white;">Kwaliteitsgarantie</h4>
                    <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.4;">Professionele service met tevredenheidsgarantie</p>
                </div>
            </div>
        </div>`;
};

export const generateFooterSection = (): string => {
  return `
        <!-- Elegant Footer -->
        <div style="padding: 40px; background: #000; color: #888; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);" class="responsive-padding">
            <div style="margin-bottom: 20px;">
                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
                    <span style="color: white; font-size: 24px; font-weight: bold;">A</span>
                </div>
                <h4 style="margin: 0 0 10px 0; color: white; font-size: 20px; font-weight: 700;">Aigento.ai</h4>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; max-width: 400px; margin: 0 auto;">
                    Deze conversatie is automatisch gegenereerd via onze geavanceerde FAQ Chatbot.
                    <br><br>
                    <strong style="color: #ccc;">Mogelijk gemaakt door AI • Gedreven door Excellentie</strong>
                </p>
            </div>
            
            <div style="padding-top: 20px; border-top: 1px solid #333; margin-top: 20px;">
                <p style="margin: 0; font-size: 12px; color: #666;">
                    © 2024 Aigento.ai. Alle rechten voorbehouden.<br>
                    Premium HVAC & Service Oplossingen
                </p>
            </div>
        </div>`;
};