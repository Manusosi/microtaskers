
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";

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
  
  // Special icon handling for upgrade account
  const IconComponent = id === 'upgrade' ? Crown : Icon;
  
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
      <IconComponent className={cn("w-5 h-5", id === 'upgrade' && "text-amber-500")} />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <Badge variant={badge.variant} className={cn(
          "ml-2 text-xs font-normal",
          badge.text === "Coming Soon" && "bg-purple-600 hover:bg-purple-700"
        )}>
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
