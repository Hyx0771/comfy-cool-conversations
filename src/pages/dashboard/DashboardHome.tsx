import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Users, MessageSquare, TrendingUp } from 'lucide-react';

const DashboardHome: React.FC = () => {
  const stats = [
    {
      title: 'Active Chatbots',
      value: '3',
      description: '+1 from last month',
      icon: Bot,
    },
    {
      title: 'Total Conversations',
      value: '1,234',
      description: '+20% from last month',
      icon: MessageSquare,
    },
    {
      title: 'Team Members',
      value: '2',
      description: 'Organization members',
      icon: Users,
    },
    {
      title: 'Conversion Rate',
      value: '12.5%',
      description: '+2.1% from last month',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your chatbots today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest interactions with your chatbots</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New conversation started</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Quote request submitted</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">FAQ accessed</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your chatbots and settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <button className="w-full p-3 text-left rounded-lg border hover:bg-muted transition-colors">
                <div className="font-medium">Create New Chatbot</div>
                <div className="text-sm text-muted-foreground">Set up a new chatbot for your business</div>
              </button>
              <button className="w-full p-3 text-left rounded-lg border hover:bg-muted transition-colors">
                <div className="font-medium">View Analytics</div>
                <div className="text-sm text-muted-foreground">Check performance and usage statistics</div>
              </button>
              <button className="w-full p-3 text-left rounded-lg border hover:bg-muted transition-colors">
                <div className="font-medium">Team Settings</div>
                <div className="text-sm text-muted-foreground">Manage team members and permissions</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;