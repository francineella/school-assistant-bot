
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'user' | 'department_head' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (googleUser: any) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('schoolAssistantUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (googleUser: any) => {
    // This still determines the role based on email for demo purposes
    const email = googleUser.email;
    let role: UserRole = 'user';
    
    // Simple rule-based role assignment (for demo)
    if (email.includes('admin')) {
      role = 'admin';
    } else if (email.includes('department') || email.includes('head')) {
      role = 'department_head';
    }
    
    const newUser: User = {
      id: googleUser.id || googleUser.sub,
      name: googleUser.name,
      email: googleUser.email,
      picture: googleUser.picture,
      role
    };
    
    setUser(newUser);
    localStorage.setItem('schoolAssistantUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('schoolAssistantUser');
    
    // Also clear any Google auth session
    if (window.google?.accounts?.id) {
      window.google.accounts.id.cancel();
    }
  };

  // Role switching function for demo purposes
  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('schoolAssistantUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user, 
      login, 
      logout,
      switchRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};
