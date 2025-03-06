import React from 'react';
import { Link } from 'react-router-dom';
import { CustomCard, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/custom-card';
import { Button } from '@/components/ui/button';
import { MessageSquare, BarChart, FileText, Users, Upload, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AnalyticsCard } from '@/components/analytics/AnalyticsCard';

// Mock data for analytics
const TOPIC_DISTRIBUTION = [
  { name: 'Enrollment', value: 35 },
  { name: 'Schedule', value: 25 },
  { name: 'Curriculum', value: 20 },
  { name: 'Faculty', value: 15 },
  { name: 'Facilities', value: 5 },
];

const USER_ACTIVITY = [
  { name: 'Students', value: 45 },
  { name: 'Parents', value: 30 },
  { name: 'Faculty', value: 15 },
  { name: 'Staff', value: 10 },
];

// Mock data for documents
const KNOWLEDGE_BASE_DOCUMENTS = [
  { id: '1', name: 'Student Handbook 2023-2024.pdf', updated: '2 weeks ago', size: '3.2 MB' },
  { id: '2', name: 'Faculty Guidelines.pdf', updated: '1 month ago', size: '1.8 MB' },
  { id: '3', name: 'School Calendar.pdf', updated: '3 days ago', size: '0.5 MB' },
];

// Mock data for user management
const SYSTEM_USERS = [
  { id: '1', name: 'John Smith', email: 'john@example.com', role: 'department_head', department: 'Mathematics' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'department_head', department: 'Science' },
  { id: '3', name: 'Robert Williams', email: 'robert@example.com', role: 'admin', department: 'IT' },
];

export const AdminDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Welcome Card */}
      <CustomCard className="md:col-span-12" variant="glass">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-medium">Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Welcome, {user?.name}. Manage system users, view comprehensive analytics, and update the knowledge base for the School Information Assistant.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row flex-wrap gap-3">
          <Button variant="default" className="gap-2 w-full sm:w-auto">
            <Upload size={18} />
            Upload documents
          </Button>
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <Users size={18} />
            Manage users
          </Button>
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <Settings size={18} />
            System settings
          </Button>
        </CardFooter>
      </CustomCard>
      
      {/* Analytics Cards */}
      <div className="md:col-span-6">
        <AnalyticsCard 
          title="Topics Distribution" 
          type="pie" 
          data={TOPIC_DISTRIBUTION} 
        />
      </div>
      
      <div className="md:col-span-6">
        <AnalyticsCard 
          title="User Activity by Role" 
          type="bar" 
          data={USER_ACTIVITY} 
        />
      </div>
      
      {/* Knowledge Base Documents */}
      <div className="md:col-span-6">
        <CustomCard className="h-full" variant="default">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-medium">
              <FileText size={18} className="mr-2" />
              Knowledge Base Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {KNOWLEDGE_BASE_DOCUMENTS.map((doc) => (
                <div key={doc.id} className="border rounded-md p-3 hover:bg-secondary/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      <div className="flex text-xs text-muted-foreground mt-1 gap-2">
                        <span>Last updated: {doc.updated}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end gap-2">
                    <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                      Replace
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-destructive hover:text-destructive">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full gap-2">
              <Upload size={16} />
              Upload new document
            </Button>
          </CardFooter>
        </CustomCard>
      </div>
      
      {/* User Management */}
      <div className="md:col-span-6">
        <CustomCard className="h-full" variant="default">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-medium">
              <Users size={18} className="mr-2" />
              System Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {SYSTEM_USERS.map((user) => (
                <div key={user.id} className="border rounded-md p-3 hover:bg-secondary/50 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="text-xs py-1 px-2 rounded-full bg-secondary">
                      {user.role === 'admin' ? 'Administrator' : 
                       user.role === 'department_head' ? `Department Head (${user.department})` : 'User'}
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end gap-2">
                    <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full text-xs gap-2">
              <Users size={16} />
              Add new user
            </Button>
          </CardFooter>
        </CustomCard>
      </div>
    </div>
  );
};
