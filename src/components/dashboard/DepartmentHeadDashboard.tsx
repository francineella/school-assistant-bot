
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { MessageSquare, BarChart, Star, Clock, ArrowUpRight, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AnalyticsCard } from '@/components/analytics/AnalyticsCard';

// Mock data for analytics
const FAQ_DATA = [
  { name: 'Enrollment', value: 35 },
  { name: 'Schedule', value: 25 },
  { name: 'Curriculum', value: 20 },
  { name: 'Faculty', value: 15 },
  { name: 'Facilities', value: 5 },
];

const DAILY_INQUIRIES = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 19 },
  { name: 'Wed', value: 15 },
  { name: 'Thu', value: 22 },
  { name: 'Fri', value: 30 },
  { name: 'Sat', value: 8 },
  { name: 'Sun', value: 5 },
];

// Mock data for department head recommended questions
const DEPARTMENT_HEAD_PICKS = [
  { id: '1', text: 'What are the latest changes to the curriculum?' },
  { id: '2', text: 'How does our department support student accommodations?' },
  { id: '3', text: 'What professional development opportunities are available?' },
];

// Mock data for recent departmental inquiries
const RECENT_DEPARTMENTAL_INQUIRIES = [
  {
    id: '1',
    user: 'John Doe',
    date: '1 hour ago',
    preview: 'Question about department resources...'
  },
  {
    id: '2',
    user: 'Jane Smith',
    date: 'Yesterday',
    preview: 'Inquiry about department meeting schedule...'
  },
];

export const DepartmentHeadDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Welcome Card */}
      <Card className="md:col-span-12" variant="glass">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-medium">Welcome back, Department Head {user?.name.split(' ')[0]}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Monitor department inquiries, view analytics, and manage department-specific information. You can also mark important questions for user visibility.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Link to="/chat">
            <Button className="gap-2 w-full sm:w-auto">
              <MessageSquare size={18} />
              Start a conversation
            </Button>
          </Link>
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <BarChart size={18} />
            View detailed analytics
          </Button>
        </CardFooter>
      </Card>
      
      {/* Analytics Cards */}
      <div className="md:col-span-6">
        <AnalyticsCard 
          title="Frequently Asked Topics" 
          type="pie" 
          data={FAQ_DATA} 
        />
      </div>
      
      <div className="md:col-span-6">
        <AnalyticsCard 
          title="Daily Inquiries" 
          type="bar" 
          data={DAILY_INQUIRIES} 
        />
      </div>
      
      {/* Department Head Picks */}
      <div className="md:col-span-6">
        <Card className="h-full" variant="default">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-medium">
              <Star size={18} className="mr-2" />
              Department Head's Picks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {DEPARTMENT_HEAD_PICKS.map((item) => (
                <div key={item.id} className="border rounded-md p-3 hover:bg-secondary/50 transition-colors">
                  <p className="text-sm">{item.text}</p>
                  <div className="mt-2 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                      Remove from picks
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full text-xs">Manage department picks</Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Recent Departmental Inquiries */}
      <div className="md:col-span-6">
        <Card className="h-full" variant="default">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-medium">
              <Users size={18} className="mr-2" />
              Recent Departmental Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RECENT_DEPARTMENTAL_INQUIRIES.map((inquiry) => (
                <div key={inquiry.id} className="border rounded-md p-3 hover:bg-secondary/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium line-clamp-1">{inquiry.preview}</p>
                      <p className="text-xs text-muted-foreground mt-1">By: {inquiry.user}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{inquiry.date}</span>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                      View details
                      <ArrowUpRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full text-xs">View all inquiries</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
