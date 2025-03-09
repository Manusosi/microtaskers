
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Download, AlertCircle, CreditCard, Bitcoin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface WithdrawFundsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PaymentMethod {
  enabled: boolean;
  [key: string]: any;
}

interface PaymentMethods {
  card: PaymentMethod;
  paypal: PaymentMethod;
  mpesa: PaymentMethod;
  bitcoin: PaymentMethod;
  [key: string]: PaymentMethod;
}

export const WithdrawFundsDialog = ({ open, onOpenChange }: WithdrawFundsDialogProps) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedPaymentMethods, setSavedPaymentMethods] = useState<PaymentMethods | null>(null);
  const [userTier, setUserTier] = useState('free');
  
  // Load saved payment methods and user tier from localStorage
  useEffect(() => {
    try {
      const savedMethods = localStorage.getItem('paymentMethods');
      if (savedMethods) {
        setSavedPaymentMethods(JSON.parse(savedMethods));
      }
      
      const tier = localStorage.getItem('userTier') || 'free';
      setUserTier(tier);
    } catch (error) {
      console.error("Error loading payment methods:", error);
    }
  }, [open]);
  
  // Get enabled payment methods
  const getEnabledMethods = () => {
    if (!savedPaymentMethods) return [];
    
    return Object.entries(savedPaymentMethods)
      .filter(([_, method]) => method.enabled)
      .map(([key]) => key);
  };
  
  // Get payment method display name
  const getMethodDisplayName = (methodKey: string) => {
    switch(methodKey) {
      case 'card': return 'Credit/Debit Card';
      case 'paypal': return 'PayPal';
      case 'mpesa': return 'M-Pesa';
      case 'bitcoin': return 'Bitcoin (BTC)';
      default: return methodKey;
    }
  };
  
  // Get payment method icon
  const getMethodIcon = (methodKey: string) => {
    switch(methodKey) {
      case 'card': 
        return <CreditCard className="h-4 w-4 mr-2 text-gray-600" />;
      case 'paypal': 
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-2 text-blue-600 fill-current">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.568 6.243-8.148 6.243h-2.19c-1.657 0-3.057 1.221-3.324 2.87l-1.119 7.103h4.604c.524 0 .968-.382 1.05-.9l.787-4.993c.166-.87 1.02-1.506 1.902-1.506h1.855c3.424 0 6.165-1.678 7.202-4.512.312-.852.369-1.59.029-2.018zM6.248 6.947a.641.641 0 0 1 .633-.74h7.168c.694 0 1.355.045 1.953.132-1.678-1.622-4.648-1.25-6.089-1.25h-4.95c-.523 0-.967.382-1.05.901L.805 19.092c-.08.522.264 1.005.79 1.005h4.602l1.593-10.112c.024-.142.06-.284.094-.423.059-.255.151-.46.364-.615z"/>
          </svg>
        );
      case 'mpesa': 
        return <span className="flex-shrink-0 text-green-600 font-bold mr-2 text-xs">M-PESA</span>;
      case 'bitcoin': 
        return <Bitcoin className="h-4 w-4 mr-2 text-amber-500" />;
      default: 
        return null;
    }
  };

  const handleWithdraw = () => {
    if (!paymentMethod || !amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount and select a payment method", {
        description: "Make sure all fields are filled correctly.",
      });
      return;
    }
    
    if (!accountDetails && !savedPaymentMethods?.[paymentMethod]?.enabled) {
      toast.error("Please enter your account details", {
        description: "We need your account information to process the withdrawal.",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Withdrawal request submitted!", {
        description: `Your request to withdraw $${amount} via ${getMethodDisplayName(paymentMethod)} is being processed.`,
      });
      // After successful submission, close the dialog
      onOpenChange(false);
      // Reset form
      setPaymentMethod("");
      setAmount("");
      setAccountDetails("");
    }, 1500);
  };

  // Determine if user has saved payment methods
  const hasSavedMethods = savedPaymentMethods && getEnabledMethods().length > 0;
  
  // Determine withdrawal limits based on tier
  const getWithdrawalLimit = () => {
    switch(userTier) {
      case 'premium': return { min: 5, max: 10000 };
      case 'standard': return { min: 10, max: 5000 };
      default: return { min: 20, max: 1000 };
    }
  };
  
  const withdrawalLimit = getWithdrawalLimit();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Download className="h-6 w-6 text-blue-600" />
          </div>
          <DialogTitle className="text-xl md:text-2xl">Withdraw Funds</DialogTitle>
          <p className="text-muted-foreground mt-2">
            Request a withdrawal from your account to your preferred payment method.
          </p>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount" className="text-foreground">
              Amount
            </Label>
            <div className="flex">
              <div className="flex items-center justify-center bg-muted px-3 border border-r-0 border-input rounded-l-md">
                $
              </div>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="rounded-l-none"
                min={withdrawalLimit.min}
                max={withdrawalLimit.max}
                step="0.01"
              />
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              {userTier === 'free' ? (
                <span>Free tier: Minimum ${withdrawalLimit.min}.00, maximum ${withdrawalLimit.max}.00</span>
              ) : userTier === 'standard' ? (
                <span>Standard tier: Minimum ${withdrawalLimit.min}.00, maximum ${withdrawalLimit.max}.00</span>
              ) : (
                <span>Premium tier: Minimum ${withdrawalLimit.min}.00, maximum ${withdrawalLimit.max}.00</span>
              )}
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="withdrawal-method" className="text-foreground">
              Method
            </Label>
            <Select 
              value={paymentMethod} 
              onValueChange={setPaymentMethod}
            >
              <SelectTrigger id="withdrawal-method" className="w-full">
                <SelectValue placeholder="-- Select payment method --" />
              </SelectTrigger>
              <SelectContent>
                {hasSavedMethods ? (
                  <>
                    <p className="px-2 py-1.5 text-xs text-muted-foreground font-medium">Your Payment Methods</p>
                    {getEnabledMethods().map((method) => (
                      <SelectItem key={method} value={method} className="flex items-center">
                        <div className="flex items-center">
                          {getMethodIcon(method)}
                          <span>{getMethodDisplayName(method)}</span>
                        </div>
                      </SelectItem>
                    ))}
                    <p className="px-2 py-1.5 text-xs text-muted-foreground font-medium mt-2">Other Methods</p>
                  </>
                ) : null}
                {!getEnabledMethods().includes('paypal') && <SelectItem value="paypal">PayPal</SelectItem>}
                {!getEnabledMethods().includes('card') && <SelectItem value="card">Credit/Debit Card</SelectItem>}
                {!getEnabledMethods().includes('skrill') && <SelectItem value="skrill">Skrill</SelectItem>}
                {!getEnabledMethods().includes('wire') && <SelectItem value="wire">Wire Transfer</SelectItem>}
                {!getEnabledMethods().includes('mpesa') && <SelectItem value="mpesa">M-Pesa</SelectItem>}
                {!getEnabledMethods().includes('bitcoin') && <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>}
              </SelectContent>
            </Select>
            
            {hasSavedMethods && paymentMethod && savedPaymentMethods?.[paymentMethod]?.enabled && (
              <div className="mt-2 p-3 bg-gray-50 border rounded-md">
                <p className="text-xs text-gray-600 font-medium mb-1">Using saved payment details:</p>
                {paymentMethod === 'card' && (
                  <p className="text-sm flex items-center">
                    <CreditCard className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                    Card ending in {savedPaymentMethods.card.number.slice(-4)} 
                    <span className="ml-1 text-xs text-gray-500">({savedPaymentMethods.card.name})</span>
                  </p>
                )}
                {paymentMethod === 'paypal' && (
                  <p className="text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 mr-1.5 text-blue-600 fill-current">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.568 6.243-8.148 6.243h-2.19c-1.657 0-3.057 1.221-3.324 2.87l-1.119 7.103h4.604c.524 0 .968-.382 1.05-.9l.787-4.993c.166-.87 1.02-1.506 1.902-1.506h1.855c3.424 0 6.165-1.678 7.202-4.512.312-.852.369-1.59.029-2.018zM6.248 6.947a.641.641 0 0 1 .633-.74h7.168c.694 0 1.355.045 1.953.132-1.678-1.622-4.648-1.25-6.089-1.25h-4.95c-.523 0-.967.382-1.05.901L.805 19.092c-.08.522.264 1.005.79 1.005h4.602l1.593-10.112c.024-.142.06-.284.094-.423.059-.255.151-.46.364-.615z"/>
                    </svg>
                    {savedPaymentMethods.paypal.email}
                  </p>
                )}
                {paymentMethod === 'mpesa' && (
                  <p className="text-sm flex items-center">
                    <span className="text-xs font-bold text-green-600 mr-1.5">M-PESA</span>
                    {savedPaymentMethods.mpesa.phoneNumber} 
                    <span className="ml-1 text-xs text-gray-500">({savedPaymentMethods.mpesa.name})</span>
                  </p>
                )}
                {paymentMethod === 'bitcoin' && (
                  <p className="text-sm flex items-center">
                    <Bitcoin className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                    {savedPaymentMethods.bitcoin.address.substring(0, 15)}...
                  </p>
                )}
              </div>
            )}
          </div>

          {paymentMethod === "paypal" && !savedPaymentMethods?.paypal?.enabled && (
            <div className="grid gap-2">
              <Label htmlFor="paypal-email">PayPal Email</Label>
              <Input 
                id="paypal-email" 
                type="email" 
                placeholder="your-email@example.com"
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
              />
            </div>
          )}
          
          {paymentMethod === "skrill" && (
            <div className="grid gap-2">
              <Label htmlFor="skrill-email">Skrill Email</Label>
              <Input 
                id="skrill-email" 
                type="email" 
                placeholder="your-email@example.com"
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
              />
            </div>
          )}
          
          {paymentMethod === "wire" && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <Input 
                  id="bank-name" 
                  placeholder="Enter bank name" 
                  value={accountDetails}
                  onChange={(e) => setAccountDetails(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="account-name">Account Holder Name</Label>
                <Input id="account-name" placeholder="Enter account holder name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="account-number">Account Number/IBAN</Label>
                <Input id="account-number" placeholder="Enter account number or IBAN" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="swift-code">SWIFT/BIC Code</Label>
                <Input id="swift-code" placeholder="Enter SWIFT or BIC code" />
              </div>
            </div>
          )}
          
          {paymentMethod === "mpesa" && !savedPaymentMethods?.mpesa?.enabled && (
            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="mpesa-name">Full Name</Label>
                <Input 
                  id="mpesa-name" 
                  placeholder="Enter your full name"
                  value={accountDetails}
                  onChange={(e) => setAccountDetails(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mpesa-phone">M-Pesa Phone Number</Label>
                <Input 
                  id="mpesa-phone" 
                  placeholder="+254 7XX XXX XXX"
                />
              </div>
            </div>
          )}
          
          {paymentMethod === "bitcoin" && !savedPaymentMethods?.bitcoin?.enabled && (
            <div className="grid gap-2">
              <Label htmlFor="bitcoin-address">Bitcoin Address</Label>
              <Input 
                id="bitcoin-address" 
                placeholder="Enter your Bitcoin wallet address"
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Make sure to double-check your Bitcoin address. Transactions cannot be reversed.
              </p>
            </div>
          )}
          
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800">
            <p className="flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 text-amber-500" />
              <span>
                Withdrawals are subject to review. You may be asked to verify your identity before funds are released.
                {userTier === 'free' ? (
                  <span className="block mt-1 text-xs">
                    Free accounts: Processing can take 3-5 business days.
                    <Button 
                      variant="link" 
                      className="text-purple-600 h-auto p-0 pl-1"
                      onClick={() => {
                        onOpenChange(false);
                        // Navigate to upgrade page
                        window.location.href = '/dashboard/tasker?tab=upgrade';
                      }}
                    >
                      Upgrade your account
                    </Button>
                    for faster processing.
                  </span>
                ) : userTier === 'standard' ? (
                  <span className="block mt-1 text-xs">Standard accounts: Processing can take 1-3 business days.</span>
                ) : (
                  <span className="block mt-1 text-xs">Premium accounts: Priority processing within 24 hours.</span>
                )}
              </span>
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleWithdraw} 
            className="w-full sm:w-auto"
            variant="success"
            disabled={
              !paymentMethod || 
              !amount || 
              parseFloat(amount) <= 0 || 
              (parseFloat(amount) < withdrawalLimit.min) ||
              (parseFloat(amount) > withdrawalLimit.max) ||
              (!accountDetails && !savedPaymentMethods?.[paymentMethod]?.enabled) || 
              isLoading
            }
          >
            {isLoading ? (
              <>Processing...</>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" /> Withdraw ${amount ? parseFloat(amount).toFixed(2) : "0.00"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
