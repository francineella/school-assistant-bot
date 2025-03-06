
import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/Card';
import GoogleAuth from '@/components/auth/GoogleAuth';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MessageSquare, BarChart, ShieldCheck } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-12 md:py-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-0 left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                    School Information <span className="text-primary">Assistant</span>
                  </h1>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p className="text-muted-foreground text-lg">
                    Access school information instantly through our AI-powered assistant. Get answers to your questions, explore resources, and stay informed.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="pt-4"
                >
                  <GoogleAuth />
                </motion.div>
              </div>
              
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative"
                >
                  <div className="relative w-full aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg overflow-hidden border border-white/20 shadow-xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3/4 h-3/4 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-lg border border-white/20 shadow-lg p-6 flex flex-col">
                        <div className="flex items-center space-x-2 pb-4 border-b border-gray-200/30">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                        <div className="flex-1 mt-4 space-y-3">
                          <div className="flex justify-end">
                            <div className="bg-secondary/80 rounded-lg p-3 max-w-[80%]">
                              <p className="text-xs text-foreground/80">How can I help you with school information today?</p>
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
                              <p className="text-xs text-foreground/80">What are the requirements to enroll in your school?</p>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <div className="bg-secondary/80 rounded-lg p-3 max-w-[80%]">
                              <p className="text-xs text-foreground/80">To enroll, you'll need to submit the following documents: completed application form, birth certificate, proof of residence...</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold">Key Features</h2>
              <p className="mt-2 text-muted-foreground">Discover what makes our School Information Assistant special</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card variant="hover" className="h-full">
                  <div className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <MessageSquare className="text-primary" size={24} />
                    </div>
                    <h3 className="text-xl font-medium mb-2">AI-Powered Chatbot</h3>
                    <p className="text-muted-foreground">
                      Get instant answers to your questions about school policies, procedures, and events through our intelligent chatbot.
                    </p>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card variant="hover" className="h-full">
                  <div className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <BarChart className="text-primary" size={24} />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Comprehensive Analytics</h3>
                    <p className="text-muted-foreground">
                      Department heads and administrators can access detailed insights about inquiries and frequently asked questions.
                    </p>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card variant="hover" className="h-full">
                  <div className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <ShieldCheck className="text-primary" size={24} />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Secure Authentication</h3>
                    <p className="text-muted-foreground">
                      Login securely with your Google account and access personalized information based on your role within the school community.
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Ready to get started?</h2>
              <p className="text-muted-foreground mb-8">
                Sign in with your Google account to access the School Information Assistant and get the information you need instantly.
              </p>
              <GoogleAuth />
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
