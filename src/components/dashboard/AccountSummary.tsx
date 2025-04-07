
import { Button } from "@/components/ui/button";
import { CreditCard, AlertCircle, DollarSign, Crown, Briefcase, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface AccountSummaryProps {
  balance: number;
  accountType?: string;
}

export const AccountSummary = ({ balance, accountType }: AccountSummaryProps) => {
  const [tier, setTier] = useState(accountType || 'free');
  
  // Get the tier from localStorage if not provided via props
  useEffect(() => {
    if (!accountType) {
      const savedTier = localStorage.getItem('userTier') || 'free';
      setTier(savedTier);
    }
  }, [accountType]);
  
  // Determine tier icon based on account type
  const getTierIcon = () => {
    switch(tier.toLowerCase()) {
      case 'premium':
        return <Crown className="h-5 w-5 text-amber-500" />;
      case 'standard':
        return <Trophy className="h-5 w-5 text-blue-600" />;
      default:
        return <Briefcase className="h-5 w-5 text-gray-600" />;
    }
  };
  
  // Get formatted tier name
  const getTierName = () => {
    return tier.charAt(0).toUpperCase() + tier.slice(1);
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Account Summary</h3>
        <div className="px-2 py-1 bg-gray-100 rounded-md flex items-center gap-1 text-xs md:text-sm">
          {getTierIcon()}
          <span className="font-medium">{getTierName()}</span>
        </div>
      </div>
      
      <div className="text-center py-3 md:py-4">
        <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
          ${balance.toFixed(2)}
        </div>
        <p className="text-gray-500 text-xs md:text-sm">Available Balance</p>
      </div>
      
      <div className="space-y-2 mt-3 md:mt-4">
        <Button className="w-full text-sm md:text-base" asChild>
          <Link to="#" className="flex items-center justify-center">
            <DollarSign className="mr-2 h-4 w-4" />
            Manage Funds
          </Link>
        </Button>
      </div>
      
      {balance === 0 && (
        <div className="mt-3 md:mt-4 flex items-center gap-2 text-amber-600 text-xs md:text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>Deposit funds to start advertising</span>
        </div>
      )}
      
      {balance > 0 && balance < 5 && (
        <div className="mt-3 md:mt-4 flex items-center gap-2 text-amber-600 text-xs md:text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>Low balance - consider adding funds</span>
        </div>
      )}
      
      {balance >= 5 && (
        <div className="mt-3 md:mt-4 flex items-center gap-2 text-amber-600 text-xs md:text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>Payments require verification</span>
        </div>
      )}
    </div>
  );
};
