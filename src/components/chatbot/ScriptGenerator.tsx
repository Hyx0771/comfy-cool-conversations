import React, { useState } from 'react';
import { Copy, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ScriptGeneratorProps {
  chatbotId: string;
}

export const ScriptGenerator: React.FC<ScriptGeneratorProps> = ({ chatbotId }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const baseUrl = window.location.origin;
  const widgetUrl = `${baseUrl}/widget?chatbot=${chatbotId}`;
  
  const embedScript = `<script>
(function() {
  // Prevent multiple initializations
  if (window.BoltChatWidget) return;
  
  const config = {
    baseUrl: "${baseUrl}",
    chatbotId: "${chatbotId}",
    containerId: "bolt-chat-widget"
  };

  function createWidget() {
    // Create container
    const container = document.createElement('div');
    container.id = config.containerId;
    container.style.cssText = \`
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 400px;
      height: 600px;
      z-index: 9999;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      background: transparent;
      transition: all 0.3s ease;
    \`;
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = \`\${config.baseUrl}/widget?chatbot=\${config.chatbotId}\`;
    iframe.style.cssText = \`
      width: 100%;
      height: 100%;
      border: none;
      background: transparent;
      border-radius: 12px;
    \`;
    iframe.setAttribute('allow', 'clipboard-read; clipboard-write');
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
    
    container.appendChild(iframe);
    document.body.appendChild(container);
    
    adjustForMobile();
    window.addEventListener('resize', adjustForMobile);
  }

  function adjustForMobile() {
    const container = document.getElementById(config.containerId);
    if (!container) return;
    
    if (window.innerWidth <= 768) {
      container.style.cssText = \`
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        border-radius: 0;
        box-shadow: none;
      \`;
    } else {
      container.style.cssText = \`
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 400px;
        height: 600px;
        z-index: 9999;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        background: transparent;
        transition: all 0.3s ease;
      \`;
    }
  }

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createWidget);
    } else {
      createWidget();
    }
  }

  window.BoltChatWidget = {
    init: init,
    config: config
  };

  init();
})();
</script>`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(embedScript);
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Embed code copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please copy the code manually',
        variant: 'destructive',
      });
    }
  };

  const downloadScript = () => {
    const blob = new Blob([embedScript], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chatbot-${chatbotId}.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openWidget = () => {
    window.open(widgetUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Embed Script</CardTitle>
          <CardDescription>
            Copy and paste this script into your website's HTML to add the chatbot widget
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">JavaScript</Badge>
            <Badge variant="outline">Responsive</Badge>
            <Badge variant="outline">Mobile-friendly</Badge>
          </div>
          
          <Textarea
            value={embedScript}
            readOnly
            className="font-mono text-xs resize-none"
            rows={12}
          />
          
          <div className="flex gap-2">
            <Button onClick={copyToClipboard} variant="default">
              <Copy className="mr-2 h-4 w-4" />
              {copied ? 'Copied!' : 'Copy Code'}
            </Button>
            <Button onClick={downloadScript} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button onClick={openWidget} variant="outline">
              <ExternalLink className="mr-2 h-4 w-4" />
              Test Widget
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Implementation Guide</CardTitle>
          <CardDescription>
            Follow these steps to add the chatbot to your website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="font-medium">Copy the embed script</h4>
                <p className="text-sm text-muted-foreground">
                  Use the "Copy Code" button above to copy the complete script
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="font-medium">Add to your website</h4>
                <p className="text-sm text-muted-foreground">
                  Paste the script before the closing <code className="bg-muted px-1 rounded">&lt;/body&gt;</code> tag of your HTML
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="font-medium">Test and customize</h4>
                <p className="text-sm text-muted-foreground">
                  The widget will appear automatically. Return here to modify settings anytime
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Widget URL</CardTitle>
          <CardDescription>
            Direct link to your chatbot widget for testing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 bg-muted rounded font-mono text-sm">
              {widgetUrl}
            </code>
            <Button size="sm" variant="outline" onClick={openWidget}>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};