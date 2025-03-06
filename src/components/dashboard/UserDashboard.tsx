
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Clock, ArrowUpRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Same suggested questions from the chat component
const SUGGESTED_QUESTIONS = [
  { id: '1', text: 'What are the school\'s operating hours?' },
  { id: '2', text: 'What are the requirements to enroll?' },
  { id: '3', text: 'How can I contact a specific department?' },
  { id: '4', text: 'What extracurricular activities are available?' },
  { id: '5', text: 'When is the next parent-teacher conference?' },
];

interface RecentConversation {
  id: string;
  date: string;
  preview: string;
}

// Mock data for recent conversations
const RECENT_CONVERSATIONS: RecentConversation[] = [
  {
    id: '1',
    date: '2 hours ago',
    preview: 'Inquiry about enrollment procedures...'
  },
  {
    id: '2',
    date: 'Yesterday',
    preview: 'Questions about school calendar and holidays...'
  },
  {
    id: '3',
    date: '3 days ago',
    preview: 'Information about extracurricular activities...'
  },
];

export const UserDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Welcome Card */}
      <Card className="md:col-span-12" variant="glass">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-medium">Welcome back, {user?.name.split(' ')[0]}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Access school information instantly through our AI assistant. Ask questions, view past conversations, and get the information you need.
          </p>
        </CardContent>
        <CardFooter>
          <Link to="/chat">
            <Button className="gap-2">
              <MessageSquare size={18} />
              Start a new conversation
            </Button>
          </Link>
        </CardFooter>
      </Card>
      
      {/* Recent Conversations */}
      <div className="md:col-span-6">
        <Card className="h-full" variant="default">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-medium">
              <Clock size={18} className="mr-2" />
              Recent Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RECENT_CONVERSATIONS.map((conversation) => (
                <div key={conversation.id} className="border rounded-md p-3 hover:bg-secondary/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium line-clamp-1">{conversation.preview}</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{conversation.date}</span>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Link to="/chat">
                      <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                        Continue
                        <ArrowUpRight size={14} className="ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/chat" className="w-full">
              <Button variant="outline" className="w-full text-xs">View all conversations</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      {/* Popular Topics */}
      <div className="md:col-span-6">
        <Card className="h-full" variant="default">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-medium">
              <MessageSquare size={18} className="mr-2" />
              Suggested Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {SUGGESTED_QUESTIONS.map((question) => (
                <Link
                  key={question.id}
                  to="/chat"
                  className="block border rounded-md p-3 hover:bg-secondary/50 transition-colors"
                >
                  <p className="text-sm">{question.text}</p>
                </Link>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/chat" className="w-full">
              <Button variant="outline" className="w-full text-xs">View more questions</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
