import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Code, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ScriptGenerator } from '@/components/chatbot/ScriptGenerator';
import { ChatbotConfigForm } from '@/components/chatbot/ChatbotConfigForm';
import { ChatbotPreview } from '@/components/chatbot/ChatbotPreview';

interface ChatbotConfig {
  id: string;
  name: string;
  description: string;
  domain: string;
  status: string;
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

const DashboardChatbotConfig: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [config, setConfig] = useState<ChatbotConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('settings');

  useEffect(() => {
    if (id) {
      loadChatbotConfig();
    }
  }, [id]);

  const loadChatbotConfig = async () => {
    try {
      setLoading(true);
      
      // Load chatbot basic info
      const { data: chatbot, error: chatbotError } = await supabase
        .from('chatbots')
        .select('*')
        .eq('id', id)
        .single();

      if (chatbotError) throw chatbotError;

      // Load chatbot configuration
      const { data: chatbotConfig, error: configError } = await supabase
        .from('chatbot_configurations')
        .select('*')
        .eq('chatbot_id', id)
        .maybeSingle();

      if (configError && configError.code !== 'PGRST116') {
        throw configError;
      }

      // Merge chatbot data with configuration
      const mergedConfig: ChatbotConfig = {
        id: chatbot.id,
        name: chatbot.name,
        description: chatbot.description || '',
        domain: chatbot.domain || '',
        status: chatbot.status,
        welcome_message: chatbotConfig?.welcome_message || 'Hi! How can I help you today?',
        brand_colors: (chatbotConfig?.brand_colors as { primary: string; secondary: string }) || { primary: '#007BFF', secondary: '#6C757D' },
        features: (chatbotConfig?.features as { faq: boolean; quote_flow: boolean; support_chat: boolean }) || { faq: true, quote_flow: true, support_chat: true },
        custom_css: chatbotConfig?.custom_css || '',
        logo_url: chatbotConfig?.logo_url || '',
      };

      setConfig(mergedConfig);
    } catch (error) {
      console.error('Error loading chatbot config:', error);
      toast({
        title: 'Error',
        description: 'Failed to load chatbot configuration',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedConfig: Partial<ChatbotConfig>) => {
    if (!config) return;

    try {
      setSaving(true);

      // Update chatbot basic info
      const { error: chatbotError } = await supabase
        .from('chatbots')
        .update({
          name: updatedConfig.name || config.name,
          description: updatedConfig.description || config.description,
          domain: updatedConfig.domain || config.domain,
        })
        .eq('id', id);

      if (chatbotError) throw chatbotError;

      // Upsert chatbot configuration
      const { error: configError } = await supabase
        .from('chatbot_configurations')
        .upsert({
          chatbot_id: id,
          welcome_message: updatedConfig.welcome_message || config.welcome_message,
          brand_colors: updatedConfig.brand_colors || config.brand_colors,
          features: updatedConfig.features || config.features,
          custom_css: updatedConfig.custom_css || config.custom_css,
          logo_url: updatedConfig.logo_url || config.logo_url,
        });

      if (configError) throw configError;

      setConfig({ ...config, ...updatedConfig });
      
      toast({
        title: 'Success',
        description: 'Chatbot configuration saved successfully',
      });
    } catch (error) {
      console.error('Error saving config:', error);
      toast({
        title: 'Error',
        description: 'Failed to save chatbot configuration',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading chatbot configuration...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Chatbot not found</h2>
        <p className="text-muted-foreground mb-4">The chatbot you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/dashboard/chatbots')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chatbots
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard/chatbots')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{config.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={config.status === 'active' ? 'default' : 'secondary'}>
                {config.status}
              </Badge>
              {config.domain && (
                <span className="text-sm text-muted-foreground">{config.domain}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="settings">
            <Palette className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="embed">
            <Code className="mr-2 h-4 w-4" />
            Embed Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <ChatbotConfigForm
            config={config}
            onSave={handleSave}
            saving={saving}
          />
        </TabsContent>

        <TabsContent value="preview">
          <ChatbotPreview config={config} />
        </TabsContent>

        <TabsContent value="embed">
          <ScriptGenerator chatbotId={config.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardChatbotConfig;