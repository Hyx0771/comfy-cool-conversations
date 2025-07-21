import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Download, Check } from 'lucide-react';

const DashboardBilling: React.FC = () => {
  const currentPlan = {
    name: 'Pro',
    price: 49,
    billing: 'monthly',
    chatbotsLimit: 10,
    chatbotsUsed: 3,
    messagesLimit: 10000,
    messagesUsed: 5431,
    features: [
      'Up to 10 chatbots',
      'Unlimited conversations',
      'Advanced analytics',
      'Custom branding',
      'Priority support',
      'API access',
    ],
  };

  const billingHistory = [
    {
      id: '1',
      date: '2024-01-15',
      amount: 49,
      status: 'paid',
      description: 'Pro Plan - Monthly',
    },
    {
      id: '2',
      date: '2023-12-15',
      amount: 49,
      status: 'paid',
      description: 'Pro Plan - Monthly',
    },
    {
      id: '3',
      date: '2023-11-15',
      amount: 49,
      status: 'paid',
      description: 'Pro Plan - Monthly',
    },
  ];

  const plans = [
    {
      name: 'Starter',
      price: 19,
      description: 'Perfect for small businesses',
      features: ['1 chatbot', '1,000 messages/month', 'Basic analytics', 'Email support'],
    },
    {
      name: 'Pro',
      price: 49,
      description: 'Great for growing businesses',
      features: ['10 chatbots', '10,000 messages/month', 'Advanced analytics', 'Priority support'],
      current: true,
    },
    {
      name: 'Enterprise',
      price: 149,
      description: 'For large organizations',
      features: ['Unlimited chatbots', 'Unlimited messages', 'Custom integrations', 'Dedicated support'],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">
            Manage your subscription and billing information.
          </p>
        </div>
        <Button>
          <CreditCard className="mr-2 h-4 w-4" />
          Update Payment Method
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your active subscription details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">{currentPlan.name} Plan</h3>
                <p className="text-muted-foreground">
                  ${currentPlan.price}/{currentPlan.billing}
                </p>
              </div>
              <Badge>Active</Badge>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Chatbots Used</span>
                  <span>{currentPlan.chatbotsUsed} / {currentPlan.chatbotsLimit}</span>
                </div>
                <Progress 
                  value={(currentPlan.chatbotsUsed / currentPlan.chatbotsLimit) * 100} 
                  className="h-2"
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Messages This Month</span>
                  <span>{currentPlan.messagesUsed.toLocaleString()} / {currentPlan.messagesLimit.toLocaleString()}</span>
                </div>
                <Progress 
                  value={(currentPlan.messagesUsed / currentPlan.messagesLimit) * 100} 
                  className="h-2"
                />
              </div>
            </div>

            <div className="pt-4 space-y-1">
              {currentPlan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  {feature}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Your current payment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CreditCard className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Next billing date</p>
              <p className="text-sm text-muted-foreground">February 15, 2024</p>
            </div>
            
            <Button variant="outline" className="w-full">
              Update Payment Method
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>Choose the plan that fits your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <div 
                key={plan.name} 
                className={`p-4 border rounded-lg ${plan.current ? 'border-primary bg-primary/5' : ''}`}
              >
                <div className="text-center space-y-2 mb-4">
                  <h3 className="text-lg font-medium">{plan.name}</h3>
                  <div className="text-2xl font-bold">${plan.price}</div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={plan.current ? 'secondary' : 'default'}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : 'Upgrade'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your past invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingHistory.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{invoice.description}</p>
                  <p className="text-sm text-muted-foreground">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-medium">${invoice.amount}</p>
                    <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardBilling;