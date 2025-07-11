import { Message, ContactMethod } from '@/types/chatbot-types';

export const generateEmailTemplate = (
  conversation: Message[],
  customQuestion: string,
  contactInfo: { name: string; email: string; phone: string },
  contactMethod: ContactMethod
): string => {
  const currentDate = new Date().toLocaleDateString('nl-NL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const conversationHTML = conversation
    .map(msg => {
      const time = msg.timestamp.toLocaleTimeString('nl-NL', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      const sender = msg.type === 'bot' ? 'Aigento.ai Assistant' : contactInfo.name;
      const bgColor = msg.type === 'bot' ? '#f8fafc' : '#1E88E5';
      const textColor = msg.type === 'bot' ? '#1f2937' : '#ffffff';
      
      return `
        <div style="margin: 15px 0; display: flex; ${msg.type === 'bot' ? 'justify-content: flex-start' : 'justify-content: flex-end'};">
          <div style="
            max-width: 70%;
            padding: 12px 16px;
            border-radius: 18px;
            ${msg.type === 'bot' ? 'border-bottom-left-radius: 6px' : 'border-bottom-right-radius: 6px'};
            background-color: ${bgColor};
            color: ${textColor};
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          ">
            <div style="font-weight: 600; font-size: 12px; margin-bottom: 4px; opacity: 0.8;">
              ${sender}
            </div>
            <div style="line-height: 1.5; white-space: pre-wrap;">
              ${msg.content}
            </div>
            <div style="font-size: 11px; margin-top: 6px; opacity: 0.7;">
              ${time}
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  const methodText = contactMethod === 'call' ? 'telefonisch contact' : 'e-mail contact';

  return `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nieuwe FAQ Conversatie - Aigento.ai</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); line-height: 1.6;">
    
    <div style="max-width: 650px; margin: 20px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1E88E5 0%, #64B5F6 100%); padding: 40px 30px; text-align: center; color: white;">
            <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 30px; backdrop-filter: blur(10px);">
                🤖
            </div>
            <h1 style="margin: 0 0 10px 0; font-size: 28px; font-weight: 700; color: #000000; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                Nieuwe FAQ Conversatie
            </h1>
            <p style="margin: 0; font-size: 16px; color: #000000; opacity: 0.9;">
                Via Aigento.ai FAQ Chatbot - ${methodText} gewenst
            </p>
            <div style="margin-top: 15px; padding: 8px 16px; background: rgba(255,255,255,0.15); border-radius: 20px; display: inline-block; backdrop-filter: blur(10px);">
                <span style="color: white; font-weight: 600; font-size: 12px;">
                    ${currentDate}
                </span>
            </div>
        </div>

        <!-- Contact Info -->
        <div style="padding: 30px;">
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 25px; border-left: 4px solid #1E88E5;">
                <h2 style="margin: 0 0 20px 0; color: #000000; font-size: 20px; display: flex; align-items: center;">
                    <span style="background: #1E88E5; color: white; border-radius: 10px; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 16px;">👤</span>
                    Contactgegevens
                </h2>
                <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                        <span style="color: #64748b; font-weight: 500;">Naam</span>
                        <span style="color: #1f2937; font-weight: 600;">${contactInfo.name}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                        <span style="color: #64748b; font-weight: 500;">E-mail</span>
                        <span style="color: #1f2937; font-weight: 600;">${contactInfo.email}</span>
                    </div>
                    ${contactInfo.phone ? `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0;">
                        <span style="color: #64748b; font-weight: 500;">Telefoon</span>
                        <span style="color: #1f2937; font-weight: 600;">${contactInfo.phone}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>

        <!-- Custom Question Highlight -->
        ${customQuestion ? `
        <div style="padding: 0 30px 30px;">
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%); border-radius: 16px; padding: 25px; border-left: 4px solid #f59e0b;">
                <h2 style="margin: 0 0 15px 0; color: #000000; font-size: 20px; display: flex; align-items: center;">
                    <span style="background: #f59e0b; color: white; border-radius: 10px; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 16px;">❓</span>
                    Specifieke Vraag
                </h2>
                <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                    <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 500; line-height: 1.6;">
                        "${customQuestion}"
                    </p>
                </div>
            </div>
        </div>
        ` : ''}

        <!-- Conversation History -->
        <div style="padding: 0 30px 30px;">
            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 16px; padding: 25px; border-left: 4px solid #0ea5e9;">
                <h2 style="margin: 0 0 20px 0; color: #000000; font-size: 20px; display: flex; align-items: center;">
                    <span style="background: #0ea5e9; color: white; border-radius: 10px; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 16px;">💬</span>
                    Volledige Conversatie
                </h2>
                <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); max-height: 400px; overflow-y: auto;">
                    ${conversationHTML}
                </div>
            </div>
        </div>

        <!-- Action Required -->
        <div style="padding: 40px 30px; background: linear-gradient(135deg, #1f2937 0%, #374151 100%); text-align: center; color: white;">
            <div style="margin-bottom: 25px;">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #1E88E5, #64B5F6); border-radius: 15px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(30, 136, 229, 0.4);">
                    <span style="color: white; font-size: 28px;">${contactMethod === 'call' ? '📞' : '📧'}</span>
                </div>
                <h3 style="color: white; margin: 0 0 10px 0; font-size: 24px; font-weight: 700;">
                    ${contactMethod === 'call' ? 'Telefonisch Contact Gewenst' : 'Reactie per E-mail Gewenst'}
                </h3>
                <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 16px; line-height: 1.6;">
                    ${contactMethod === 'call' 
                      ? 'De klant wacht op een telefoontje voor persoonlijk advies.' 
                      : 'De klant verwacht een reactie per e-mail op zijn/haar vragen.'}
                </p>
            </div>
            
            <div style="margin: 30px 0;">
                ${contactMethod === 'call' ? `
                <a href="tel:${contactInfo.phone}" 
                   style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 16px; margin: 0 10px 10px 0; box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);">
                    📞 Bel ${contactInfo.name}
                </a>
                ` : ''}
                <a href="mailto:${contactInfo.email}?subject=Reactie%20op%20uw%20Aigento.ai%20vraag" 
                   style="display: inline-block; background: linear-gradient(135deg, #1E88E5 0%, #1976D2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 16px; margin: 0 10px 10px 0; box-shadow: 0 6px 20px rgba(30, 136, 229, 0.4);">
                    📧 Stuur E-mail
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div style="padding: 30px; background: #000; color: #888; text-align: center;">
            <div style="margin-bottom: 15px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #1E88E5, #64B5F6); border-radius: 10px; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
                    <span style="color: white; font-size: 18px; font-weight: bold;">A</span>
                </div>
                <h4 style="margin: 0; color: white; font-size: 16px; font-weight: 600;">Aigento.ai</h4>
                <p style="margin: 10px 0 0 0; font-size: 14px; line-height: 1.5;">
                    Deze conversatie is automatisch gegenereerd via onze FAQ Chatbot.
                    <br>
                    <strong style="color: #ccc;">Powered by Aigento.ai Assistant</strong>
                </p>
            </div>
        </div>

    </div>
</body>
</html>
  `;
};