
import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GoogleAuth from '@/components/auth/GoogleAuth';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/10">
      <Header />
      
      <main className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md p-8 rounded-lg glass-card text-center"
        >
          <h1 className="text-3xl font-semibold mb-6">Welcome</h1>
          <p className="text-muted-foreground mb-8">
            Sign in to access the School Information Assistant
          </p>
          <GoogleAuth />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
