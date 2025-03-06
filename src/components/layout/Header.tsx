
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User, LogOut, MessageSquare, LayoutDashboard } from 'lucide-react';

export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const getNavLinkClass = (path: string) => {
    return `animated-link ${location.pathname === path ? 'text-primary font-medium' : 'text-foreground/80 hover:text-foreground'}`;
  };
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <header className="w-full bg-background/80 backdrop-blur-md z-10 sticky top-0 border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <MessageSquare size={18} className="text-white" />
          </div>
          <span className="font-semibold text-lg hidden sm:inline-flex">School Assistant</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className={getNavLinkClass('/dashboard')}>Dashboard</Link>
              <Link to="/chat" className={getNavLinkClass('/chat')}>Chat</Link>
            </>
          )}
        </nav>
        
        {/* User Menu (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0 overflow-hidden">
                  {user?.picture ? (
                    <img 
                      src={user.picture} 
                      alt={user.name} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={18} />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                  <div className="text-xs text-muted-foreground bg-secondary/50 rounded px-2 py-1 mt-1 inline-flex w-fit">
                    {user?.role === 'admin' ? 'Administrator' : 
                     user?.role === 'department_head' ? 'Department Head' : 'User'}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/chat" className="cursor-pointer">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Chat</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-foreground p-1"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[60px] left-0 right-0 bg-background z-20 border-b animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 pb-3 border-b">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    {user?.picture ? (
                      <img src={user.picture} alt={user.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-10 w-10 bg-secondary flex items-center justify-center rounded-full">
                        <User size={18} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <Link 
                  to="/dashboard" 
                  className={`${getNavLinkClass('/dashboard')} py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/chat" 
                  className={`${getNavLinkClass('/chat')} py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Chat
                </Link>
                <Button 
                  variant="ghost" 
                  className="justify-start px-0 hover:bg-transparent text-destructive hover:text-destructive"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
};
