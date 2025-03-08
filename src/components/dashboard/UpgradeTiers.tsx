
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Crown, Briefcase, Trophy, ChevronUp, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TierFeature {
  text: string;
  included: boolean;
}

interface TierProps {
  name: string;
  icon: React.ReactNode;
  price: string;
  features: TierFeature[];
  current?: boolean;
  buttonText: string;
  onSelect: () => void;
}

const Tier = ({ name, icon, price, features, current, buttonText, onSelect }: TierProps) => {
  return (
    <div className={`border rounded-lg p-6 ${current ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}>
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold">{name}</h3>
        {current && <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">Current</span>}
      </div>
      
      <div className="mb-4">
        <span className="text-2xl font-bold">{price}</span>
        {price !== "Free" && <span className="text-gray-500 text-sm">/month</span>}
      </div>
      
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className={`mr-2 mt-0.5 ${feature.included ? 'text-green-500' : 'text-gray-400'}`}>
              {feature.included ? '✓' : '✗'}
            </span>
            <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
      
      <Button 
        onClick={onSelect}
        variant={current ? "outline" : "default"}
        className={`w-full ${current ? 'border-purple-500 text-purple-700' : ''}`}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export const UpgradeTiers = () => {
  const [open, setOpen] = React.useState(false);
  const [currentTier, setCurrentTier] = React.useState<string>("free");
  const navigate = useNavigate();
  
  const tiers = [
    {
      id: "free",
      name: "Free Tier",
      icon: <Briefcase className="w-5 h-5 text-gray-600" />,
      price: "Free",
      features: [
        { text: "Access to basic jobs", included: true },
        { text: "Limited to 5 jobs/month", included: true },
        { text: "Jobs up to $0.50 payout", included: true },
        { text: "Basic support", included: true },
        { text: "Premium jobs", included: false },
        { text: "Early job access", included: false },
        { text: "Priority support", included: false },
      ],
      buttonText: "Current Plan",
    },
    {
      id: "standard",
      name: "Standard",
      icon: <Trophy className="w-5 h-5 text-blue-600" />,
      price: "$4.99",
      features: [
        { text: "Access to basic jobs", included: true },
        { text: "Unlimited jobs/month", included: true },
        { text: "Jobs up to $2.00 payout", included: true },
        { text: "Standard support", included: true },
        { text: "Some premium jobs", included: true },
        { text: "Early job access", included: false },
        { text: "Priority support", included: false },
      ],
      buttonText: "Upgrade",
    },
    {
      id: "premium",
      name: "Premium",
      icon: <Crown className="w-5 h-5 text-amber-500" />,
      price: "$9.99",
      features: [
        { text: "Access to all jobs", included: true },
        { text: "Unlimited jobs/month", included: true },
        { text: "Jobs up to $10.00 payout", included: true },
        { text: "Premium support", included: true },
        { text: "All premium jobs", included: true },
        { text: "Early job access", included: true },
        { text: "Priority support", included: true },
      ],
      buttonText: "Upgrade",
    }
  ];
  
  const handleSelectTier = (tierId: string) => {
    if (tierId === currentTier) {
      // Already on this tier
      setOpen(false);
      return;
    }
    
    // In a real app, here we'd process payment & upgrade
    // For now, just simulate the upgrade
    setCurrentTier(tierId);
    setOpen(false);
    
    // Here we would navigate to payment page in real implementation
    // navigate('/payments/upgrade');
  };
  
  return (
    <div className="p-4 border-t">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 border-none"
          >
            <ChevronUp className="w-4 h-4 mr-2" />
            Upgrade Account
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Upgrade Your Account</DialogTitle>
            <DialogDescription>
              Choose the right plan to access more and higher-paying jobs.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
            {tiers.map((tier) => (
              <Tier
                key={tier.id}
                name={tier.name}
                icon={tier.icon}
                price={tier.price}
                features={tier.features}
                current={tier.id === currentTier}
                buttonText={tier.id === currentTier ? "Current Plan" : "Upgrade"}
                onSelect={() => handleSelectTier(tier.id)}
              />
            ))}
          </div>
          
          <DialogFooter className="flex flex-col space-y-2">
            <p className="text-sm text-gray-500">
              Payment is processed securely. You can cancel your subscription at any time.
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
