import React from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

interface ChatbotConfig {
  id: string;
  name: string;
  description: string;
  domain: string;
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
  custom_css?: string;
  logo_url?: string;
}

interface ChatbotConfigFormProps {
  config: ChatbotConfig;
  onSave: (updatedConfig: Partial<ChatbotConfig>) => void;
  saving: boolean;
}

export const ChatbotConfigForm: React.FC<ChatbotConfigFormProps> = ({
  config,
  onSave,
  saving,
}) => {
  const [formData, setFormData] = React.useState<ChatbotConfig>(config);

  React.useEffect(() => {
    setFormData(config);
  }, [config]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateFormData = (updates: Partial<ChatbotConfig>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const updateBrandColors = (colorType: 'primary' | 'secondary', value: string) => {
    setFormData(prev => ({
      ...prev,
      brand_colors: {
        ...prev.brand_colors!,
        [colorType]: value
      }
    }));
  };

  const updateFeatures = (feature: keyof NonNullable<ChatbotConfig['features']>, enabled: boolean) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features!,
        [feature]: enabled
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Configure the basic settings for your chatbot
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Chatbot Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
                placeholder="e.g., Support Assistant"
              />
            </div>
            <div>
              <Label htmlFor="domain">Domain</Label>
              <Input
                id="domain"
                value={formData.domain}
                onChange={(e) => updateFormData({ domain: e.target.value })}
                placeholder="e.g., mycompany.com"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData({ description: e.target.value })}
              placeholder="Brief description of what this chatbot does"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="welcome_message">Welcome Message</Label>
            <Textarea
              id="welcome_message"
              value={formData.welcome_message || ''}
              onChange={(e) => updateFormData({ welcome_message: e.target.value })}
              placeholder="Hi! How can I help you today?"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="logo_url">Logo URL</Label>
            <Input
              id="logo_url"
              value={formData.logo_url || ''}
              onChange={(e) => updateFormData({ logo_url: e.target.value })}
              placeholder="https://example.com/logo.png"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand Colors</CardTitle>
          <CardDescription>
            Customize the appearance of your chatbot
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primary_color">Primary Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="primary_color"
                  type="color"
                  value={formData.brand_colors?.primary || '#007BFF'}
                  onChange={(e) => updateBrandColors('primary', e.target.value)}
                  className="w-16 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={formData.brand_colors?.primary || '#007BFF'}
                  onChange={(e) => updateBrandColors('primary', e.target.value)}
                  placeholder="#007BFF"
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="secondary_color">Secondary Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="secondary_color"
                  type="color"
                  value={formData.brand_colors?.secondary || '#6C757D'}
                  onChange={(e) => updateBrandColors('secondary', e.target.value)}
                  className="w-16 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={formData.brand_colors?.secondary || '#6C757D'}
                  onChange={(e) => updateBrandColors('secondary', e.target.value)}
                  placeholder="#6C757D"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
          <CardDescription>
            Enable or disable specific chatbot features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">FAQ System</div>
              <div className="text-sm text-muted-foreground">
                Enable FAQ questions and answers
              </div>
            </div>
            <Switch
              checked={formData.features?.faq || false}
              onCheckedChange={(enabled) => updateFeatures('faq', enabled)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Quote Flow</div>
              <div className="text-sm text-muted-foreground">
                Enable HVAC quote request flow
              </div>
            </div>
            <Switch
              checked={formData.features?.quote_flow || false}
              onCheckedChange={(enabled) => updateFeatures('quote_flow', enabled)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Support Chat</div>
              <div className="text-sm text-muted-foreground">
                Enable direct support messaging
              </div>
            </div>
            <Switch
              checked={formData.features?.support_chat || false}
              onCheckedChange={(enabled) => updateFeatures('support_chat', enabled)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom CSS</CardTitle>
          <CardDescription>
            Add custom CSS to override default styles (optional)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.custom_css || ''}
            onChange={(e) => updateFormData({ custom_css: e.target.value })}
            placeholder="/* Your custom CSS here */
.chat-widget {
  /* Custom styles */
}"
            rows={8}
            className="font-mono text-sm"
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving} className="min-w-32">
          {saving ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Configuration
            </>
          )}
        </Button>
      </div>
    </form>
  );
};