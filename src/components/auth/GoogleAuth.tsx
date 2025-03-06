
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}

const GoogleAuth = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Mock Google Sign-In function (in a real app, you would use the Google SDK)
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This is mock data. In a real implementation, you would get this from Google's OAuth response
      const mockGoogleUser: GoogleUser = {
        id: 'google123456789',
        email: 'user@example.com', // Change this to test different roles
        name: 'Example User',
        picture: 'https://via.placeholder.com/150'
      };
      
      login(mockGoogleUser);
      
      toast({
        title: 'Success',
        description: 'Signed in successfully',
        variant: 'default',
      });
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to sign in. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="lg" 
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="flex items-center justify-center gap-2 w-full md:w-auto transition-all hover:shadow-md"
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.7663 12.2764C23.7663 11.4607 23.7001 10.6406 23.559 9.83807H12.2402V14.4591H18.722C18.453 15.9494 17.5888 17.2678 16.3233 18.1056V21.1039H20.1903C22.4611 19.0139 23.7663 15.9274 23.7663 12.2764Z" fill="#4285F4"/>
          <path d="M12.2396 24.0008C15.4766 24.0008 18.2059 22.9382 20.1934 21.1039L16.3265 18.1055C15.2885 18.8375 13.9304 19.252 12.2433 19.252C9.11291 19.252 6.48028 17.1399 5.52345 14.3003H1.5166V17.3912C3.55368 21.4434 7.7029 24.0008 12.2396 24.0008Z" fill="#34A853"/>
          <path d="M5.52039 14.3002C5.00351 12.8099 5.00351 11.196 5.52039 9.70569V6.61475H1.51674C-0.185266 10.0055 -0.185266 14.0004 1.51674 17.3912L5.52039 14.3002Z" fill="#FBBC04"/>
          <path d="M12.2396 4.74966C13.9509 4.7232 15.6033 5.36697 16.8425 6.54867L20.276 3.12533C18.1416 1.0853 15.2652 -0.034466 12.2396 0.000808666C7.7029 0.000808666 3.55368 2.55822 1.5166 6.61481L5.5203 9.70575C6.47344 6.86616 9.10608 4.74966 12.2396 4.74966Z" fill="#EA4335"/>
        </svg>
      )}
      <span>Sign in with Google</span>
    </Button>
  );
};

export default GoogleAuth;
