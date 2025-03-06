
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserRole, useAuth } from '@/context/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Users } from 'lucide-react';

export const RoleSwitcher = () => {
  const { user, switchRole } = useAuth();
  
  if (!user) return null;

  const roles: { value: UserRole; label: string }[] = [
    { value: 'user', label: 'Regular User' },
    { value: 'department_head', label: 'Department Head' },
    { value: 'admin', label: 'Administrator' }
  ];
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Users size={16} />
          <span className="hidden md:inline">Demo: </span>
          {roles.find(r => r.value === user.role)?.label || 'Switch Role'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Demo Mode</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {roles.map((role) => (
          <DropdownMenuItem
            key={role.value}
            className={user.role === role.value ? "bg-secondary text-secondary-foreground" : ""}
            onClick={() => switchRole(role.value)}
          >
            {role.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
