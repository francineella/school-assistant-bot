
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-background/80 backdrop-blur-md border-t py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <div className="mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} School Information Assistant. All rights reserved.
          </div>
          <div className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart size={14} className="text-destructive" fill="currentColor" />
            <span>for Education</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
