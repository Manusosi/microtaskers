
import { Button } from "@/components/ui/button";
import { CreditCard, AlertCircle, DollarSign, Crown, Briefcase, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

interface AccountSummaryProps {
  balance: number;
  accountType: string;
}

export const AccountSummary = ({ balance, accountType }: AccountSummaryProps) => {
  // Determine tier icon based on account type
  const getTierIcon = () => {
    switch(accountType.toLowerCase()) {
      case 'premium':
        return <Crown className="h-5 w-5 text-amber-500" />;
      case 'standard':
        return <Trophy className="h-5 w-5 text-blue-600" />;
      default:
        return <Briefcase className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Account Summary</h3>
        <div className="px-2 py-1 bg-gray-100 rounded-md flex items-center gap-1 text-sm">
          {getTierIcon()}
          <span className="font-medium">{accountType}</span>
        </div>
      </div>
      
      <div className="text-center py-4">
        <div className="text-3xl font-bold text-gray-900 mb-1">
          ${balance.toFixed(2)}
        </div>
        <p className="text-gray-500 text-sm">Available Balance</p>
      </div>
      
      <div className="space-y-2 mt-4">
        <Button className="w-full" asChild>
          <Link to="#" className="flex items-center justify-center">
            <DollarSign className="mr-2 h-4 w-4" />
            Manage Funds
          </Link>
        </Button>
      </div>
      
      <div className="mt-4 flex items-center gap-2 text-amber-600 text-sm">
        <AlertCircle className="h-4 w-4" />
        <span>Payments require verification</span>
      </div>
    </div>
  );
};
