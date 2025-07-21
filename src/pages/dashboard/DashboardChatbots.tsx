import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Settings, BarChart3, ExternalLink } from 'lucide-react';

const DashboardChatbots: React.FC = () => {
  const navigate = useNavigate();
  
  const chatbots = [
    {
      id: '1',
      name: 'HVAC Support Bot',
      description: 'Handles HVAC quotes, support, and FAQ',
      domain: 'hvac-demo.com',
      status: 'active',
      conversations: 1234,
      quotes: 89,
      lastUpdate: '2 hours ago',
    },
    // Placeholder for additional chatbots
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chatbots</h1>
          <p className="text-muted-foreground">
            Manage and configure your chatbot deployments.
          </p>
        </div>
        <Button>
          <Bot className="mr-2 h-4 w-4" />
          Create New Chatbot
        </Button>
      </div>

      <div className="grid gap-6">
        {chatbots.map((chatbot) => (
          <Card key={chatbot.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    {chatbot.name}
                    <Badge variant={chatbot.status === 'active' ? 'default' : 'secondary'}>
                      {chatbot.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{chatbot.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/dashboard/chatbots/${chatbot.id}/configure`)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`/widget?chatbot=${chatbot.id}`, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold">{chatbot.conversations}</div>
                  <div className="text-sm text-muted-foreground">Conversations</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold">{chatbot.quotes}</div>
                  <div className="text-sm text-muted-foreground">Quote Requests</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold">{chatbot.domain}</div>
                  <div className="text-sm text-muted-foreground">Domain</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold">{chatbot.lastUpdate}</div>
                  <div className="text-sm text-muted-foreground">Last Updated</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {chatbots.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Bot className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No chatbots yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first chatbot to get started with the platform.
              </p>
              <Button>Create Your First Chatbot</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardChatbots;