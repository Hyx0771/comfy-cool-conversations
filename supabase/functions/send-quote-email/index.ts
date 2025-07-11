import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { QuoteEmailRequest, FAQEmailRequest } from './types.ts';
import { generateMessage } from './messageGenerator.ts';
import { generateHtmlTemplate } from './htmlTemplate.ts';
import { generateFAQEmailTemplate } from './faqTemplate.ts';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Check if this is a FAQ email request or quote email request
    if ('contactInfo' in body) {
      // FAQ email request
      const { contactInfo, customQuestion, conversationHistory, contactMethod }: FAQEmailRequest = body;
      console.log('📧 FAQ email request:', { contactInfo, customQuestion, contactMethod });

      const htmlContent = generateFAQEmailTemplate(conversationHistory, customQuestion, contactInfo, contactMethod);
      const textContent = `Nieuwe FAQ vraag van ${contactInfo.name}\n\nVraag: ${customQuestion}\n\nContact: ${contactInfo.email}${contactInfo.phone ? ` / ${contactInfo.phone}` : ''}`;

      const emailResponse = await resend.emails.send({
        from: "Clobol FAQ Chatbot <faq@app.aigento.ai>",
        to: ["yves@aigento.ai"],
        subject: `💬 Nieuwe FAQ Vraag - ${contactMethod === 'call' ? 'Bel verzoek' : 'E-mail verzoek'} van ${contactInfo.name}`,
        html: htmlContent,
        text: textContent,
      });

      if (emailResponse.error) {
        console.error('❌ Resend API Error:', emailResponse.error);
        throw new Error(`Email delivery failed: ${emailResponse.error.message || 'Unknown error'}`);
      }

      console.log("✅ FAQ email sent successfully:", emailResponse);

      return new Response(JSON.stringify({ 
        success: true, 
        emailId: emailResponse.data?.id,
        requestType: contactMethod 
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    } else {
      // Quote email request
      const { customerData, galleryId, requestType }: QuoteEmailRequest = body;
      console.log('📧 Quote email request:', { customerData, galleryId, requestType });

      const message = generateMessage(customerData, galleryId);
      const conversationHistory = customerData.conversationHistory || [];
      const htmlContent = generateHtmlTemplate(message, customerData, galleryId, requestType, conversationHistory);

      console.log('📧 Attempting to send email with domain: app.aigento.ai');
      
      const emailResponse = await resend.emails.send({
        from: "Clobol Quote System <quotes@app.aigento.ai>",
        to: ["yves@aigento.ai"],
        subject: `🏠 Nieuwe Offerte Aanvraag - ${customerData.serviceType || 'Service'} (${requestType === 'call' ? 'Bel verzoek' : 'E-mail verzoek'})`,
        html: htmlContent,
        text: message,
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
    }
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