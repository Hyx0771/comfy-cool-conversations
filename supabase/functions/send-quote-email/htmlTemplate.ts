import { SERVICE_DISPLAY_NAMES } from './constants.ts';

export const generateHtmlTemplate = (message: string, customerData: any, galleryId?: string, requestType?: string): string => {
  const sections = message.split('==================================================');
  const contactSection = sections[1]?.trim() || '';
  const serviceSection = sections[2]?.trim() || '';
  const mediaSection = sections[3] ? sections[3].trim() : '';
  const specificationsSection = sections[4]?.trim() || '';
  
  const galleryUrl = galleryId ? `https://clobol-aigento.com/gallery/${galleryId}` : null;
  const requestTypeText = requestType === 'call' ? 'telefonisch contact' : 'e-mail contact';
  
  // Enhanced service name with proper emoji handling
  const serviceDisplayName = SERVICE_DISPLAY_NAMES[customerData.serviceType] || customerData.serviceType;
  const serviceIcon = serviceDisplayName.includes('🌬️') ? '🌬️' : 
                     serviceDisplayName.includes('🔥') ? '🔥' :
                     serviceDisplayName.includes('🛠️') ? '🛠️' :
                     serviceDisplayName.includes('🚑') ? '🚑' :
                     serviceDisplayName.includes('✅') ? '✅' :
                     serviceDisplayName.includes('🏢') ? '🏢' : '🔧';
  
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nieuwe Offerte Aanvraag - Clobol</title>
    <style>
        /* Modern CSS Reset */
        * { box-sizing: border-box; }
        
        /* Premium Glassmorphism Effect */
        .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
        }
        
        /* Elegant Hover Effects */
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        }
        
        .btn-success:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
        }
        
        /* Subtle Animations */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
            animation: fadeInUp 0.6s ease-out;
        }
        
        /* Premium Gradients */
        .premium-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .service-gradient {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        
        .success-gradient {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        
        /* Enhanced Typography */
        .premium-title {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        /* Responsive Design */
        @media (max-width: 600px) {
            .responsive-padding { padding: 20px !important; }
            .responsive-text { font-size: 14px !important; }
            .btn-responsive { 
                display: block !important; 
                width: 100% !important; 
                margin: 10px 0 !important; 
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); line-height: 1.6; min-height: 100vh;">
    
    <!-- Main Container with Premium Shadow -->
    <div style="max-width: 650px; margin: 20px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1); position: relative;">
        
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
                    ${serviceDisplayName} via Clobol Platform
                </p>
                <div style="margin-top: 20px; padding: 12px 24px; background: rgba(255,255,255,0.15); border-radius: 50px; display: inline-block; backdrop-filter: blur(10px);">
                    <span style="color: white; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                        ${requestTypeText} gewenst
                    </span>
                </div>
            </div>
        </div>

        <!-- Premium Contact Section -->
        <div style="padding: 40px;" class="responsive-padding fade-in">
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 30px; border-left: 5px solid #3b82f6; position: relative; overflow: hidden;">
                <!-- Decorative Elements -->
                <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; opacity: 0.1;"></div>
                
                <div style="display: flex; align-items: center; margin-bottom: 25px;">
                    <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 15px; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);">
                        <span style="color: white; font-size: 20px;">👤</span>
                    </div>
                    <h2 style="margin: 0; color: #1e293b; font-size: 24px; font-weight: 700; letter-spacing: -0.3px;">
                        Contactgegevens
                    </h2>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                    ${contactSection.split('\n').map(line => {
                      if (line.trim() && !line.includes('CONTACTGEGEVENS')) {
                        const [label, value] = line.split(':').map(s => s.trim());
                        return `
                          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                            <span style="color: #64748b; font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">${label}</span>
                            <span style="color: #1e293b; font-weight: 600; font-size: 16px;">${value}</span>
                          </div>
                        `;
                      }
                      return '';
                    }).join('')}
                </div>
            </div>
        </div>

        <!-- Stunning Service Section -->
        <div style="padding: 40px;" class="responsive-padding fade-in">
            <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 16px; padding: 30px; border-left: 5px solid #10b981; position: relative; overflow: hidden;">
                <!-- Decorative Background Pattern -->
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%);"></div>
                
                <div style="display: flex; align-items: center; margin-bottom: 25px; position: relative; z-index: 2;">
                    <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 15px; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);">
                        <span style="color: white; font-size: 20px;">${serviceIcon}</span>
                    </div>
                    <h2 style="margin: 0; color: #1e293b; font-size: 24px; font-weight: 700; letter-spacing: -0.3px;">
                        Gevraagde Service
                    </h2>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); position: relative; z-index: 2;">
                    ${serviceSection.split('\n').map(line => {
                      if (line.trim() && !line.includes('GEVRAAGDE SERVICE')) {
                        return `
                          <p style="margin: 15px 0; color: #065f46; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                            <span style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 12px; display: inline-block;"></span>
                            ${line}
                          </p>
                        `;
                      }
                      return '';
                    }).join('')}
                </div>
            </div>
        </div>

        ${galleryUrl ? `
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
                    <h2 style="margin: 0; color: #1e293b; font-size: 24px; font-weight: 700; letter-spacing: -0.3px;">
                        Foto's en Video's
                    </h2>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 12px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.08); position: relative; z-index: 2;">
                    <div style="margin-bottom: 25px;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 20px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);">
                            <span style="color: white; font-size: 35px;">🖼️</span>
                        </div>
                        <p style="margin: 0; color: #92400e; font-size: 18px; font-weight: 600; line-height: 1.4;">
                            ${mediaSection.includes('foto') || mediaSection.includes('video') ? mediaSection.split('\n').find(line => line.includes('foto') || line.includes('video')) || 'Professionele media bijgevoegd' : 'Uitgebreide media documentatie toegevoegd'}
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
        </div>
        ` : ''}

        <!-- Enhanced Specifications Section -->
        <div style="padding: 40px;" class="responsive-padding fade-in">
            <div style="background: linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%); border-radius: 16px; padding: 30px; border-left: 5px solid #8b5cf6; position: relative; overflow: hidden;">
                <!-- Decorative Elements -->
                <div style="position: absolute; top: 20px; right: 20px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);"></div>
                
                <div style="display: flex; align-items: center; margin-bottom: 25px; position: relative; z-index: 2;">
                    <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 15px; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);">
                        <span style="color: white; font-size: 20px;">📋</span>
                    </div>
                    <h2 style="margin: 0; color: #1e293b; font-size: 24px; font-weight: 700; letter-spacing: -0.3px;">
                        Technische Specificaties
                    </h2>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); position: relative; z-index: 2;">
                    ${specificationsSection.split('\n').map(line => {
                      if (line.trim() && !line.includes('SPECIFICATIES')) {
                        return `
                          <div style="padding: 15px 0; border-bottom: 1px solid #f3e8ff; display: flex; align-items: center;">
                            <div style="width: 10px; height: 10px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); border-radius: 50%; margin-right: 15px; flex-shrink: 0;"></div>
                            <span style="color: #581c87; font-size: 16px; font-weight: 500; line-height: 1.5;">${line}</span>
                          </div>
                        `;
                      }
                      return '';
                    }).join('')}
                </div>
            </div>
        </div>

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
                    <a href="mailto:${customerData.email || ''}?subject=Premium%20Offerte%20Reactie%20-%20Clobol" 
                       class="btn-primary btn-responsive"
                       style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 20px 40px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 18px; margin: 0 15px 15px 0; box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4); transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 1px;">
                        <span style="margin-right: 10px;">✉️</span> Verstuur E-mail
                    </a>
                </div>
            </div>
        </div>

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
                    <h4 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: white;">Snelle Service</h4>
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
                    <h4 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: white;">Professioneel Advies</h4>
                    <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.4;">Expertise van gecertificeerde specialisten</p>
                </div>
            </div>
        </div>

        <!-- Elegant Footer -->
        <div style="padding: 40px; background: #000; color: #888; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);" class="responsive-padding">
            <div style="margin-bottom: 20px;">
                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
                    <span style="color: white; font-size: 24px; font-weight: bold;">C</span>
                </div>
                <h4 style="margin: 0 0 10px 0; color: white; font-size: 20px; font-weight: 700;">Het Clobol Team</h4>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; max-width: 400px; margin: 0 auto;">
                    Deze premium offerte aanvraag is automatisch gegenereerd via ons geavanceerde Clobol platform. 
                    <br><br>
                    <strong style="color: #ccc;">Powered by AI • Driven by Excellence</strong>
                </p>
            </div>
            
            <div style="padding-top: 20px; border-top: 1px solid #333; margin-top: 20px;">
                <p style="margin: 0; font-size: 12px; color: #666;">
                    © 2024 Clobol. Alle rechten voorbehouden. | Premium HVAC Solutions
                </p>
            </div>
        </div>

    </div>
</body>
</html>`;
};