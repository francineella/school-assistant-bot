
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';

const Chat = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // If not authenticated, redirect to home page
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // Show loading state if still checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Loading chat...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <Card variant="glass" className="overflow-hidden border">
            <div className="h-[calc(100vh-12rem)]">
              <ChatInterface />
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
