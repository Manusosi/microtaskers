
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  count: number;
  id: string;
  isActive?: boolean;
  onClick: (id: string) => void;
  onDepositClick?: () => void;
  onWithdrawClick?: () => void;
  badge?: {
    text: string;
    variant: "default" | "secondary" | "destructive" | "outline"
  };
}

export const MenuItem = ({ 
  icon: Icon, 
  label, 
  count, 
  id, 
  isActive, 
  onClick,
  onDepositClick,
  onWithdrawClick,
  badge
}: MenuItemProps) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'tasker';
  
  const handleClick = () => {
    // Special handling for deposit funds
    if (id === 'deposit' && onDepositClick) {
      onDepositClick();
      onClick(id);
      return;
    }
    
    // Special handling for withdraw funds
    if (id === 'withdraw' && onWithdrawClick) {
      onWithdrawClick();
      onClick(id);
      return;
    }
    
    onClick(id);
    
    // Navigate based on menu item
    switch(id) {
      case 'dashboard':
        navigate(`/dashboard/${userRole}`);
        break;
      case 'payments':
        navigate('/payments');
        break;
      case 'support':
        navigate('/support');
        break;
      case 'profile':
        navigate('/profile/edit');
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        // For items without specific pages yet
        break;
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
        isActive
          ? "bg-purple-100 text-purple-900"
          : "hover:bg-gray-100 text-gray-700"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <Badge variant={badge.variant} className="ml-2 text-xs font-normal">
          {badge.text}
        </Badge>
      )}
      {count > 0 && !badge && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {count}
        </span>
      )}
    </button>
  );
};
