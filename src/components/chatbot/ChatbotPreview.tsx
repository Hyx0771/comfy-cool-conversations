import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, HelpCircle, Wrench, ExternalLink } from 'lucide-react';

interface ChatbotConfig {
  id: string;
  name: string;
  description: string;
  welcome_message?: string;
  brand_colors?: {
    primary: string;
    secondary: string;
  };
  features?: {
    faq: boolean;
    quote_flow: boolean;
    support_chat: boolean;
  };
  logo_url?: string;
}

interface ChatbotPreviewProps {
  config: ChatbotConfig;
}

export const ChatbotPreview: React.FC<ChatbotPreviewProps> = ({ config }) => {
  const primaryColor = config.brand_colors?.primary || '#007BFF';
  const secondaryColor = config.brand_colors?.secondary || '#6C757D';
  
  const openPreview = () => {
    const previewUrl = `/widget?chatbot=${config.id}&preview=true`;
    window.open(previewUrl, '_blank', 'width=420,height=640');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <CardDescription>
            See how your chatbot will appear to visitors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={openPreview} className="w-full">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Full Preview
          </Button>
          
          <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
            <div className="max-w-sm mx-auto space-y-4">
              <div 
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: primaryColor }}
              >
                {config.logo_url ? (
                  <img 
                    src={config.logo_url} 
                    alt="Logo" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  config.name.charAt(0).toUpperCase()
                )}
              </div>
              
              <h3 className="text-lg font-semibold">{config.name}</h3>
              
              <div 
                className="px-4 py-2 rounded-lg text-white text-sm"
                style={{ backgroundColor: primaryColor }}
              >
                {config.welcome_message || 'Hi! How can I help you today?'}
              </div>
              
              <div className="space-y-2">
                {config.features?.faq && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full justify-start text-xs"
                    style={{ borderColor: secondaryColor }}
                  >
                    <HelpCircle className="mr-2 h-3 w-3" />
                    Frequently Asked Questions
                  </Button>
                )}
                
                {config.features?.quote_flow && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full justify-start text-xs"
                    style={{ borderColor: secondaryColor }}
                  >
                    <Wrench className="mr-2 h-3 w-3" />
                    Request Quote
                  </Button>
                )}
                
                {config.features?.support_chat && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full justify-start text-xs"
                    style={{ borderColor: secondaryColor }}
                  >
                    <MessageSquare className="mr-2 h-3 w-3" />
                    Chat with Support
                  </Button>
                )}
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              Click "Open Full Preview" to test the actual widget
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configuration Summary</CardTitle>
          <CardDescription>
            Overview of your current chatbot settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Brand Colors</h4>
              <div className="flex gap-2">
                <div 
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: primaryColor }}
                  title={`Primary: ${primaryColor}`}
                />
                <div 
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: secondaryColor }}
                  title={`Secondary: ${secondaryColor}`}
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-2">Features</h4>
              <div className="flex flex-wrap gap-1">
                {config.features?.faq && (
                  <Badge variant="secondary" className="text-xs">FAQ</Badge>
                )}
                {config.features?.quote_flow && (
                  <Badge variant="secondary" className="text-xs">Quotes</Badge>
                )}
                {config.features?.support_chat && (
                  <Badge variant="secondary" className="text-xs">Support</Badge>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-2">Welcome Message</h4>
            <p className="text-sm text-muted-foreground">
              "{config.welcome_message || 'Hi! How can I help you today?'}"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};