
import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, MessageSquare } from 'lucide-react';
import { CustomCard } from '@/components/ui/custom-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

// Types
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface SuggestedQuestion {
  id: string;
  text: string;
}

// Sample suggested questions
const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  { id: '1', text: 'What are the school\'s operating hours?' },
  { id: '2', text: 'What are the requirements to enroll?' },
  { id: '3', text: 'How can I contact a specific department?' },
  { id: '4', text: 'What extracurricular activities are available?' },
  { id: '5', text: 'When is the next parent-teacher conference?' },
];

// Mock responses for demo
const MOCK_RESPONSES: { [key: string]: string } = {
  '1': 'The school operates Monday through Friday from 8:00 AM to 3:30 PM. Administrative offices are open until 4:30 PM. On Wednesdays, we have early dismissal at 2:00 PM for teacher professional development.',
  '2': 'To enroll, you need to submit: 1) Completed application form, 2) Birth certificate, 3) Proof of residence, 4) Immunization records, 5) Previous school records if applicable. You can start the process on our website or visit the admissions office.',
  '3': 'You can contact specific departments through our directory on the school website. Alternatively, you can call our main office at (555) 123-4567, and they will direct your call to the appropriate department.',
  '4': 'We offer a wide range of extracurricular activities including sports (basketball, soccer, swimming), arts (drama, music, visual arts), academic clubs (debate, robotics, science), and community service opportunities.',
  '5': 'The next parent-teacher conference is scheduled for October 15th and 16th. You can sign up for a specific time slot through the parent portal or by contacting your child\'s teacher directly.',
  'default': 'I don\'t have specific information about that in my database. Could you please reach out to the school administration office for more detailed information?'
};

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      content: 'Hello! I\'m your School Information Assistant. How can I help you today?',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Generate assistant response (mock)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: MOCK_RESPONSES.default,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: SuggestedQuestion) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: question.text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Generate assistant response (mock)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: MOCK_RESPONSES[question.id] || MOCK_RESPONSES.default,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Suggested questions */}
      <div className="flex flex-wrap gap-2 p-3 mb-4">
        {SUGGESTED_QUESTIONS.map((question) => (
          <button
            key={question.id}
            onClick={() => handleSuggestedQuestion(question)}
            className="text-xs md:text-sm px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-200"
          >
            {question.text}
          </button>
        ))}
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[75%] rounded-2xl px-4 py-3",
                message.sender === 'user'
                  ? "bg-primary text-primary-foreground rounded-tr-none"
                  : "bg-secondary text-secondary-foreground rounded-tl-none"
              )}
            >
              <p className="text-sm md:text-base">{message.content}</p>
              <span className="block text-[10px] opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-secondary text-secondary-foreground rounded-2xl rounded-tl-none px-4 py-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary/70 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-primary/70 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-primary/70 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="focus-effect"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isLoading}
            variant="default"
            size="icon"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
