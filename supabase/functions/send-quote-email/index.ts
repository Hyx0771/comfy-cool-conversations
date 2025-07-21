
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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerData, galleryId, requestType }: QuoteEmailRequest = await req.json();
    
    console.log('📧 Quote email request:', { customerData, galleryId, requestType });

    // Generate email content
    const subject = `🏠 Nieuwe Offerte Aanvraag - ${customerData.serviceType || 'Service'} (${requestType === 'call' ? 'Bel verzoek' : 'E-mail verzoek'})`;
    
    let emailContent = `
      <h2>Nieuwe offerte aanvraag ontvangen</h2>
      <h3>Klantgegevens:</h3>
      <ul>
        <li><strong>Naam:</strong> ${customerData.name || 'Niet opgegeven'}</li>
        <li><strong>Telefoon:</strong> ${customerData.phone || 'Niet opgegeven'}</li>
        <li><strong>E-mail:</strong> ${customerData.email || 'Niet opgegeven'}</li>
        <li><strong>Adres:</strong> ${customerData.postcode || ''} ${customerData.huisnummer || ''}</li>
        <li><strong>Service:</strong> ${customerData.serviceType}</li>
        <li><strong>Contact voorkeur:</strong> ${requestType === 'call' ? 'Telefonisch' : 'E-mail'}</li>
      </ul>
    `;

    if (galleryId) {
      emailContent += `
        <h3>Foto's en video's:</h3>
        <p><a href="https://${req.headers.get('host')}/gallery/${galleryId}" target="_blank">Bekijk alle geüploade media hier</a></p>
      `;
    }

    // Add service-specific details
    emailContent += `<h3>Service details:</h3><ul>`;
    Object.entries(customerData).forEach(([key, value]) => {
      if (!['name', 'phone', 'email', 'postcode', 'huisnummer', 'serviceType', 'photos'].includes(key) && value) {
        emailContent += `<li><strong>${key}:</strong> ${value}</li>`;
      }
    });
    emailContent += `</ul>`;

    const textContent = `
Nieuwe offerte aanvraag

Klantgegevens:
- Naam: ${customerData.name || 'Niet opgegeven'}
- Telefoon: ${customerData.phone || 'Niet opgegeven'}  
- E-mail: ${customerData.email || 'Niet opgegeven'}
- Service: ${customerData.serviceType}
- Contact voorkeur: ${requestType === 'call' ? 'Telefonisch' : 'E-mail'}

${galleryId ? `Foto's beschikbaar op: https://${req.headers.get('host')}/gallery/${galleryId}` : ''}
    `;

    const emailResponse = await resend.emails.send({
      from: "HVAC Chatbot <noreply@yourdomain.com>",
      to: ["info@yourcompany.com"], // Replace with your email
      subject: subject,
      html: emailContent,
      text: textContent,
    });

    if (emailResponse.error) {
      console.error('❌ Resend API Error:', emailResponse.error);
      throw new Error(`Email delivery failed: ${emailResponse.error.message || 'Unknown error'}`);
    }

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
