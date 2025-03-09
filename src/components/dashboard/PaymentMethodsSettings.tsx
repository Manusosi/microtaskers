
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, AlertCircle, Check, Bitcoin, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export const PaymentMethodsSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [userTier, setUserTier] = useState('free');
  
  // Get the tier from localStorage
  useEffect(() => {
    const savedTier = localStorage.getItem('userTier') || 'free';
    setUserTier(savedTier);
  }, []);
  
  const [paymentMethods, setPaymentMethods] = useState({
    card: {
      enabled: false,
      name: "",
      number: "",
      expiry: "",
      cvv: ""
    },
    paypal: {
      enabled: false,
      email: ""
    },
    mpesa: {
      enabled: false,
      phoneNumber: "",
      name: ""
    },
    bitcoin: {
      enabled: false,
      address: ""
    }
  });
  
  // Count enabled payment methods
  const enabledCount = Object.values(paymentMethods).filter(method => method.enabled).length;
  const maxMethods = userTier !== 'free' ? 2 : 1;
  const canEnableMore = enabledCount < maxMethods;
  
  // Handle payment method toggle
  const handleToggle = (method: keyof typeof paymentMethods) => {
    if (paymentMethods[method].enabled) {
      // If already enabled, just disable it
      setPaymentMethods(prev => ({
        ...prev,
        [method]: {
          ...prev[method],
          enabled: false
        }
      }));
    } else {
      // If trying to enable but already at max limit
      if (!canEnableMore) {
        toast({
          title: `Maximum payment methods reached`,
          description: userTier === 'free' 
            ? "Free accounts can only use one payment method. Please upgrade to use more." 
            : "You can only have two payment methods enabled. Disable one first.",
          variant: "destructive",
        });
        return;
      }
      
      // Enable the method
      setPaymentMethods(prev => ({
        ...prev,
        [method]: {
          ...prev[method],
          enabled: true
        }
      }));
    }
  };
  
  // Handle input change for payment methods
  const handleInputChange = (method: keyof typeof paymentMethods, field: string, value: string) => {
    setPaymentMethods(prev => ({
      ...prev,
      [method]: {
        ...prev[method],
        [field]: value
      }
    }));
  };
  
  // Save payment methods
  const handleSave = () => {
    setLoading(true);
    
    setTimeout(() => {
      // Validate enabled payment methods
      let isValid = true;
      let errorMessage = "";
      
      // Check each enabled method has required fields filled
      Object.entries(paymentMethods).forEach(([key, method]) => {
        if (method.enabled) {
          if (key === 'card' && (!method.name || !method.number || !method.expiry || !method.cvv)) {
            isValid = false;
            errorMessage = "Please fill all card details";
          } else if (key === 'paypal' && !method.email) {
            isValid = false;
            errorMessage = "Please enter your PayPal email";
          } else if (key === 'mpesa' && (!method.phoneNumber || !method.name)) {
            isValid = false;
            errorMessage = "Please fill all M-Pesa details";
          } else if (key === 'bitcoin' && !method.address) {
            isValid = false;
            errorMessage = "Please enter your Bitcoin address";
          }
        }
      });
      
      if (!isValid) {
        toast({
          title: "Incomplete information",
          description: errorMessage,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      // Save to localStorage - in a real app, this would be saved to a database
      localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
      
      toast({
        title: "Payment methods updated",
        description: "Your payment preferences have been saved",
      });
      
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="text-purple-600" size={18} />
        <h3 className="font-semibold text-gray-700">Payment Methods</h3>
      </div>
      
      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm text-blue-800 mb-4">
        <p className="flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 text-blue-500" />
          <span>
            You can set up to {maxMethods} payment method{maxMethods > 1 ? 's' : ''} for receiving payments.
            {userTier === 'free' && 
              " Upgrade your account to enable more payment options."}
          </span>
        </p>
      </div>
      
      <div className="grid gap-6">
        {/* Credit/Debit Card */}
        <div className={`border rounded-lg p-4 ${paymentMethods.card.enabled ? 'border-purple-300 bg-purple-50' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-md border border-gray-200 flex items-center justify-center w-10 h-10">
                <CreditCard className="text-gray-700" size={18} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Credit or Debit Card</h4>
                <p className="text-xs text-gray-500">Visa, Mastercard, Amex</p>
              </div>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="card-enabled"
                checked={paymentMethods.card.enabled}
                onCheckedChange={() => handleToggle('card')}
                disabled={!paymentMethods.card.enabled && !canEnableMore}
              />
              <Label htmlFor="card-enabled" className="ml-2">
                {paymentMethods.card.enabled ? 'Enabled' : 'Disabled'}
              </Label>
            </div>
          </div>
          
          {paymentMethods.card.enabled && (
            <div className="mt-4 space-y-3">
              <div>
                <Label htmlFor="card-name">Name on Card</Label>
                <Input 
                  id="card-name" 
                  value={paymentMethods.card.name}
                  onChange={(e) => handleInputChange('card', 'name', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <Input 
                  id="card-number" 
                  value={paymentMethods.card.number}
                  onChange={(e) => handleInputChange('card', 'number', e.target.value)}
                  placeholder="•••• •••• •••• ••••"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="card-expiry">Expiry Date</Label>
                  <Input 
                    id="card-expiry" 
                    value={paymentMethods.card.expiry}
                    onChange={(e) => handleInputChange('card', 'expiry', e.target.value)}
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <Label htmlFor="card-cvv">CVV</Label>
                  <Input 
                    id="card-cvv" 
                    value={paymentMethods.card.cvv}
                    onChange={(e) => handleInputChange('card', 'cvv', e.target.value)}
                    placeholder="•••"
                    type="password"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* PayPal */}
        <div className={`border rounded-lg p-4 ${paymentMethods.paypal.enabled ? 'border-purple-300 bg-purple-50' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-md border border-gray-200 flex items-center justify-center w-10 h-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-blue-600 fill-current">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.568 6.243-8.148 6.243h-2.19c-1.657 0-3.057 1.221-3.324 2.87l-1.119 7.103h4.604c.524 0 .968-.382 1.05-.9l.787-4.993c.166-.87 1.02-1.506 1.902-1.506h1.855c3.424 0 6.165-1.678 7.202-4.512.312-.852.369-1.59.029-2.018zM6.248 6.947a.641.641 0 0 1 .633-.74h7.168c.694 0 1.355.045 1.953.132-1.678-1.622-4.648-1.25-6.089-1.25h-4.95c-.523 0-.967.382-1.05.901L.805 19.092c-.08.522.264 1.005.79 1.005h4.602l1.593-10.112c.024-.142.06-.284.094-.423.059-.255.151-.46.364-.615z"/>
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">PayPal</h4>
                <p className="text-xs text-gray-500">Connect your PayPal account</p>
              </div>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="paypal-enabled"
                checked={paymentMethods.paypal.enabled}
                onCheckedChange={() => handleToggle('paypal')}
                disabled={!paymentMethods.paypal.enabled && !canEnableMore}
              />
              <Label htmlFor="paypal-enabled" className="ml-2">
                {paymentMethods.paypal.enabled ? 'Enabled' : 'Disabled'}
              </Label>
            </div>
          </div>
          
          {paymentMethods.paypal.enabled && (
            <div className="mt-4 space-y-3">
              <div>
                <Label htmlFor="paypal-email">PayPal Email</Label>
                <Input 
                  id="paypal-email" 
                  type="email"
                  value={paymentMethods.paypal.email}
                  onChange={(e) => handleInputChange('paypal', 'email', e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* M-Pesa */}
        <div className={`border rounded-lg p-4 ${paymentMethods.mpesa.enabled ? 'border-purple-300 bg-purple-50' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-md border border-gray-200 flex items-center justify-center w-10 h-10">
                <Briefcase className="text-green-600" size={18} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">M-Pesa</h4>
                <p className="text-xs text-gray-500">Mobile money payments</p>
              </div>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="mpesa-enabled"
                checked={paymentMethods.mpesa.enabled}
                onCheckedChange={() => handleToggle('mpesa')}
                disabled={!paymentMethods.mpesa.enabled && !canEnableMore}
              />
              <Label htmlFor="mpesa-enabled" className="ml-2">
                {paymentMethods.mpesa.enabled ? 'Enabled' : 'Disabled'}
              </Label>
            </div>
          </div>
          
          {paymentMethods.mpesa.enabled && (
            <div className="mt-4 space-y-3">
              <div>
                <Label htmlFor="mpesa-name">Account Name</Label>
                <Input 
                  id="mpesa-name" 
                  value={paymentMethods.mpesa.name}
                  onChange={(e) => handleInputChange('mpesa', 'name', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="mpesa-phone">Phone Number</Label>
                <Input 
                  id="mpesa-phone" 
                  value={paymentMethods.mpesa.phoneNumber}
                  onChange={(e) => handleInputChange('mpesa', 'phoneNumber', e.target.value)}
                  placeholder="+254 7XX XXX XXX"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Bitcoin */}
        <div className={`border rounded-lg p-4 ${paymentMethods.bitcoin.enabled ? 'border-purple-300 bg-purple-50' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-md border border-gray-200 flex items-center justify-center w-10 h-10">
                <Bitcoin className="text-amber-500" size={18} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Bitcoin (BTC)</h4>
                <p className="text-xs text-gray-500">Cryptocurrency payments</p>
              </div>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="bitcoin-enabled"
                checked={paymentMethods.bitcoin.enabled}
                onCheckedChange={() => handleToggle('bitcoin')}
                disabled={!paymentMethods.bitcoin.enabled && !canEnableMore}
              />
              <Label htmlFor="bitcoin-enabled" className="ml-2">
                {paymentMethods.bitcoin.enabled ? 'Enabled' : 'Disabled'}
              </Label>
            </div>
          </div>
          
          {paymentMethods.bitcoin.enabled && (
            <div className="mt-4 space-y-3">
              <div>
                <Label htmlFor="bitcoin-address">Bitcoin Address</Label>
                <Textarea 
                  id="bitcoin-address" 
                  value={paymentMethods.bitcoin.address}
                  onChange={(e) => handleInputChange('bitcoin', 'address', e.target.value)}
                  placeholder="Enter your Bitcoin wallet address"
                  className="h-20"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button 
          onClick={handleSave}
          className="bg-purple-600 hover:bg-purple-700"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center">
              <Check className="mr-2 h-4 w-4" />
              Save Payment Methods
            </span>
          )}
        </Button>
      </div>
      
      <div className="pt-4 border-t border-gray-200 mt-6">
        <p className="text-sm text-gray-500">
          {userTier === 'free' ? (
            <span className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-1.5 text-amber-500" />
              Free accounts are limited to 1 payment method. 
              <Button 
                variant="link" 
                className="text-purple-600 h-auto p-0 px-1"
                onClick={() => navigate('/dashboard/tasker?tab=upgrade')}
              >
                Upgrade your account
              </Button>
              to enable more.
            </span>
          ) : (
            <span className="flex items-center">
              <Check className="h-4 w-4 mr-1.5 text-green-500" />
              As a {userTier.charAt(0).toUpperCase() + userTier.slice(1)} member, you can use up to {maxMethods} payment methods.
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
