import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, UserPlus, Mail } from 'lucide-react';

const DashboardTeam: React.FC = () => {
  const teamMembers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      joinedDate: 'Jan 2024',
      avatar: '',
    },
    // Add more team members as needed
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">
            Manage your team members and their permissions.
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Manage who has access to your organization and chatbots
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{member.name}</h4>
                        <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                          {member.role}
                        </Badge>
                        {member.email === 'john@example.com' && (
                          <Badge variant="outline">You</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Joined {member.joinedDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit Role
                    </Button>
                    {member.email !== 'john@example.com' && (
                      <Button variant="outline" size="sm" className="text-destructive">
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Settings</CardTitle>
            <CardDescription>Configure team permissions and access levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Role Permissions</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">Admin</span>
                      <p className="text-sm text-muted-foreground">
                        Full access to all features and settings
                      </p>
                    </div>
                    <Badge>Full Access</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">Member</span>
                      <p className="text-sm text-muted-foreground">
                        Can view analytics and manage chatbot content
                      </p>
                    </div>
                    <Badge variant="secondary">Limited Access</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">Viewer</span>
                      <p className="text-sm text-muted-foreground">
                        Read-only access to analytics and reports
                      </p>
                    </div>
                    <Badge variant="outline">View Only</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {teamMembers.length === 1 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Grow your team</h3>
              <p className="text-muted-foreground mb-4">
                Invite team members to collaborate on your chatbots and analytics.
              </p>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Send First Invitation
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardTeam;