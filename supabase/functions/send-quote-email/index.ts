import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteEmailRequest {
  customerData: any;
  galleryId?: string;
  requestType: 'call' | 'email';
}

const generateHtmlTemplate = (message: string, customerData: any, galleryId?: string, requestType?: string): string => {
  const sections = message.split('==================================================');
  const contactSection = sections[1]?.trim() || '';
  const serviceSection = sections[2]?.trim() || '';
  const mediaSection = sections[3] ? sections[3].trim() : '';
  const specificationsSection = sections[4]?.trim() || '';
  
  const galleryUrl = galleryId ? `https://app.aigento.ai/gallery/${galleryId}` : null;
  const requestTypeText = requestType === 'call' ? 'telefonisch contact' : 'e-mail contact';
  
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nieuwe Offerte Aanvraag - Clobol</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                🏠 Nieuwe Offerte Aanvraag
            </h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                Via Aigento - ${requestTypeText} gewenst
            </p>
        </div>

        <!-- Contact Info Section -->
        <div style="padding: 30px; border-bottom: 3px solid #e2e8f0;">
            <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center;">
                <span style="background: #3b82f6; color: white; border-radius: 50%; width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 14px;">👤</span>
                Contactgegevens
            </h2>
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                ${contactSection.split('\n').map(line => {
                  if (line.trim() && !line.includes('CONTACTGEGEVENS')) {
                    const [label, value] = line.split(':').map(s => s.trim());
                    return `<p style="margin: 8px 0; color: #334155;"><strong style="color: #1e293b;">${label}:</strong> ${value}</p>`;
                  }
                  return '';
                }).join('')}
            </div>
        </div>

        <!-- Service Section -->
        <div style="padding: 30px; border-bottom: 3px solid #e2e8f0;">
            <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center;">
                <span style="background: #10b981; color: white; border-radius: 50%; width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 14px;">🔧</span>
                Gevraagde Service
            </h2>
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                ${serviceSection.split('\n').map(line => {
                  if (line.trim() && !line.includes('GEVRAAGDE SERVICE')) {
                    return `<p style="margin: 8px 0; color: #166534; font-size: 16px; font-weight: 500;">${line}</p>`;
                  }
                  return '';
                }).join('')}
            </div>
        </div>

        ${galleryUrl ? `
        <!-- Media Section -->
        <div style="padding: 30px; border-bottom: 3px solid #e2e8f0;">
            <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center;">
                <span style="background: #f59e0b; color: white; border-radius: 50%; width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 14px;">📸</span>
                Foto's en Video's
            </h2>
            <div style="background: #fefbf3; padding: 25px; border-radius: 12px; border-left: 4px solid #f59e0b; text-align: center;">
                <p style="margin: 0 0 20px 0; color: #92400e; font-size: 16px; font-weight: 500;">
                    ${mediaSection.includes('foto') || mediaSection.includes('video') ? mediaSection.split('\n').find(line => line.includes('foto') || line.includes('video')) || 'Media bijgevoegd' : 'Media bijgevoegd'}
                </p>
                <a href="${galleryUrl}" 
                   style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: all 0.3s ease;">
                    🖼️ Bekijk Alle Media
                </a>
                <p style="margin: 15px 0 0 0; color: #78716c; font-size: 14px;">
                    Klik op de knop hierboven om alle foto's en video's te bekijken
                </p>
            </div>
        </div>
        ` : ''}

        <!-- Specifications Section -->
        <div style="padding: 30px; border-bottom: 3px solid #e2e8f0;">
            <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center;">
                <span style="background: #8b5cf6; color: white; border-radius: 50%; width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 14px;">📋</span>
                Specificaties
            </h2>
            <div style="background: #faf5ff; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
                ${specificationsSection.split('\n').map(line => {
                  if (line.trim() && !line.includes('SPECIFICATIES')) {
                    return `<p style="margin: 8px 0; color: #581c87;">${line}</p>`;
                  }
                  return '';
                }).join('')}
            </div>
        </div>

        <!-- Call to Action -->
        <div style="padding: 40px 30px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); text-align: center;">
            <h3 style="color: #1e293b; margin: 0 0 20px 0; font-size: 22px;">
                ${requestType === 'call' ? '📞 Telefonisch Contact Gewenst' : '📧 Reactie per E-mail Gewenst'}
            </h3>
            <p style="color: #475569; margin: 0 0 25px 0; font-size: 16px; max-width: 500px; margin-left: auto; margin-right: auto;">
                ${requestType === 'call' 
                  ? 'De klant wil graag telefonisch contact voor deze offerte aanvraag.' 
                  : 'De klant wacht op jullie reactie per e-mail voor deze offerte aanvraag.'}
            </p>
            
            <div style="margin: 30px 0;">
                ${requestType === 'call' ? `
                <a href="tel:${customerData.phone || ''}" 
                   style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 18px 35px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 18px; margin: 0 10px 10px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    📞 Bel ${customerData.name || 'Klant'}
                </a>
                ` : ''}
                <a href="mailto:${customerData.email || ''}?subject=Offerte%20Reactie" 
                   style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 18px 35px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 18px; margin: 0 10px 10px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    📧 Stuur E-mail
                </a>
            </div>
        </div>

        <!-- Service Highlights -->
        <div style="padding: 30px; background: #1e293b; color: white; text-align: center;">
            <h3 style="margin: 0 0 20px 0; color: #f1f5f9; font-size: 20px;">Onze Service Garanties</h3>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; max-width: 100%;">
                <div style="flex: 1; min-width: 150px; padding: 15px; background: rgba(59, 130, 246, 0.1); border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.2);">
                    <div style="font-size: 24px; margin-bottom: 8px;">⚡</div>
                    <div style="font-size: 14px; font-weight: 500;">Snelle Service</div>
                </div>
                <div style="flex: 1; min-width: 150px; padding: 15px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.2);">
                    <div style="font-size: 24px; margin-bottom: 8px;">💯</div>
                    <div style="font-size: 14px; font-weight: 500;">Vrijblijvende Offerte</div>
                </div>
                <div style="flex: 1; min-width: 150px; padding: 15px; background: rgba(245, 158, 11, 0.1); border-radius: 8px; border: 1px solid rgba(245, 158, 11, 0.2);">
                    <div style="font-size: 24px; margin-bottom: 8px;">🎯</div>
                    <div style="font-size: 14px; font-weight: 500;">Professioneel Advies</div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div style="padding: 25px 30px; background: #0f172a; color: #94a3b8; text-align: center; font-size: 14px;">
            <p style="margin: 0; line-height: 1.5;">
                <strong style="color: #f1f5f9;">Het Aigento Team</strong><br>
                Deze offerte aanvraag is automatisch gegenereerd via het Aigento platform.
            </p>
        </div>

    </div>
</body>
</html>`;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerData, galleryId, requestType }: QuoteEmailRequest = await req.json();
    console.log('📧 Quote email request:', { customerData, galleryId, requestType });

    // Import message generation logic (simplified version)
    const generateMessage = (customerData: any, galleryId?: string): string => {
      const serviceDisplayName = customerData.serviceType || 'Service';
      const formattedLocation = customerData.postcode && customerData.huisnummer 
        ? `${customerData.postcode}, ${customerData.huisnummer}`
        : customerData.location || 'Niet opgegeven';

      let template = `Hallo!

Ik heb zojuist via Clobol een offerte aangevraagd.
Hieronder vind je alle details:

==================================================
CONTACTGEGEVENS
==================================================

Naam: ${customerData.name || 'Niet opgegeven'}
Telefoon: ${customerData.phone || 'Niet opgegeven'}
E-mail: ${customerData.email || 'Niet opgegeven'}
Adres: ${formattedLocation}

==================================================
GEVRAAGDE SERVICE
==================================================

Service: ${serviceDisplayName}`;

      if (galleryId) {
        const galleryUrl = `https://app.aigento.ai/gallery/${galleryId}`;
        template += `

==================================================
FOTO'S EN VIDEO'S
==================================================

Media bijgevoegd

BEKIJK ALLE MEDIA HIER:
${galleryUrl}

Klik op bovenstaande link om alle foto's en video's te bekijken.`;
      }

      template += `

==================================================
SPECIFICATIES
==================================================

• Basis offerte aanvraag

==================================================

Graag jullie reactie of deze informatie compleet is, dan kunnen we direct een scherpe offerte op maat maken!

ONZE SERVICE:
- Snelle service gegarandeerd
- Vrijblijvende offerte
- Professioneel advies

Met vriendelijke groet,
Het Aigento team`;

      return template;
    };

    const message = generateMessage(customerData, galleryId);
    const htmlContent = generateHtmlTemplate(message, customerData, galleryId, requestType);

    const emailResponse = await resend.emails.send({
      from: "Aigento Quote System <quotes@app.aigento.ai>",
      to: ["yves@aigento.ai"],
      subject: `🏠 Nieuwe Offerte Aanvraag - ${customerData.serviceType || 'Service'} (${requestType === 'call' ? 'Bel verzoek' : 'E-mail verzoek'})`,
      html: htmlContent,
      text: message,
    });

    console.log("✅ Quote email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id,
      requestType 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("❌ Error in send-quote-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);