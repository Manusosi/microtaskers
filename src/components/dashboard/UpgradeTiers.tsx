
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Crown, Briefcase, Trophy, ChevronUp, DollarSign, CreditCard, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface TierFeature {
  text: string;
  included: boolean;
}

interface TierProps {
  name: string;
  icon: React.ReactNode;
  price: { monthly: string; annual: string };
  features: TierFeature[];
  current?: boolean;
  buttonText: string;
  onSelect: () => void;
}

interface UpgradeTiersProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Tier = ({ name, icon, price, features, current, buttonText, onSelect }: TierProps) => {
  return (
    <div className={`border rounded-lg p-4 md:p-6 ${current ? 'border-purple-500 bg-purple-50' : 'border-gray-200'} h-full flex flex-col`}>
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold">{name}</h3>
        {current && <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">Current</span>}
      </div>
      
      <div className="mb-4">
        <span className="text-2xl font-bold">{price.monthly !== "Free" ? `$${price.monthly}` : price.monthly}</span>
        {price.monthly !== "Free" && <span className="text-gray-500 text-sm">/month</span>}
      </div>
      
      <ul className="space-y-3 mb-6 flex-grow">
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
        className={`w-full mt-auto ${current ? 'border-purple-500 text-purple-700' : ''}`}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export const UpgradeTiers = ({ open, onOpenChange }: UpgradeTiersProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTier, setCurrentTier] = useState<string>("free");
  const [isAnnual, setIsAnnual] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Handle controlled/uncontrolled dialog state
  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setIsDialogOpen(newOpen);
    }
  };
  
  // Calculate the discount percentage
  const annualDiscount = 20; // 20% discount for annual plans
  
  const tiers = [
    {
      id: "free",
      name: "Free Tier",
      icon: <Briefcase className="w-5 h-5 text-gray-600" />,
      price: { 
        monthly: "Free",
        annual: "Free"
      },
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
      price: { 
        monthly: "4.99",
        annual: "3.99"
      },
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
      price: { 
        monthly: "9.99",
        annual: "7.99"
      },
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
  
  // Set user's current tier on component mount (from localStorage or API in a real app)
  React.useEffect(() => {
    // For a real app, you would fetch the user's current tier from the backend
    const savedTier = localStorage.getItem('userTier') || 'free';
    setCurrentTier(savedTier);
  }, []);
  
  const handleSelectTier = (tierId: string) => {
    if (tierId === currentTier) {
      // Already on this tier
      handleOpenChange(false);
      return;
    }
    
    // In a real app, here we'd process payment & upgrade
    localStorage.setItem('userTier', tierId);
    setCurrentTier(tierId);
    handleOpenChange(false);
    
    toast({
      title: "Subscription Updated",
      description: `Your subscription has been updated to the ${tierId.charAt(0).toUpperCase() + tierId.slice(1)} tier.`,
    });
  };
  
  return (
    <div className="p-4 border-t">
      <Dialog open={open !== undefined ? open : isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upgrade Your Account</DialogTitle>
            <DialogDescription>
              Choose the right plan to access more and higher-paying jobs.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center my-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="subscription-period" className={!isAnnual ? "font-bold" : ""}>Monthly</Label>
              <Switch
                id="subscription-period"
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              />
              <div className="flex items-center">
                <Label htmlFor="subscription-period" className={isAnnual ? "font-bold" : ""}>Annual</Label>
                <span className="ml-1.5 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Save {annualDiscount}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
            {tiers.map((tier) => (
              <Tier
                key={tier.id}
                name={tier.name}
                icon={tier.icon}
                price={isAnnual ? { monthly: tier.price.annual, annual: tier.price.annual } : tier.price}
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
