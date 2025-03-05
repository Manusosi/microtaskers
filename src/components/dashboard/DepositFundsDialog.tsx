
import React, { useState } from 'react';
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
import { Check, Upload, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface DepositFundsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DepositFundsDialog = ({ open, onOpenChange }: DepositFundsDialogProps) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDeposit = () => {
    if (!paymentMethod || !amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount and select a payment method", {
        description: "Make sure all fields are filled correctly.",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Deposit successful!", {
        description: `$${amount} has been added to your account via ${paymentMethod}.`,
      });
      // After successful deposit, close the dialog
      onOpenChange(false);
      // Reset form
      setPaymentMethod("");
      setAmount("");
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
            <Upload className="h-6 w-6 text-purple-600" />
          </div>
          <DialogTitle className="text-xl md:text-2xl">Deposit Funds</DialogTitle>
          <p className="text-muted-foreground mt-2">
            Add money to your account using your preferred payment method.
          </p>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="payment-method" className="text-foreground">
              Payment Method
            </Label>
            <Select 
              value={paymentMethod} 
              onValueChange={setPaymentMethod}
            >
              <SelectTrigger id="payment-method" className="w-full">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="card">Visa/Mastercard</SelectItem>
                <SelectItem value="mpesa">MPesa</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
                min="1"
                step="0.01"
              />
            </div>
            {amount && parseFloat(amount) > 0 && (
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                Transactions can take up to 24 hours to reflect in your account.
              </p>
            )}
          </div>

          {paymentMethod === "paypal" && (
            <div className="flex justify-center mt-2 bg-gray-50 p-3 rounded-md border">
              <img 
                src="/lovable-uploads/8f9d29db-dbc7-4448-b4dd-bade2ab7eda8.png" 
                alt="PayPal Payment Options" 
                className="h-12"
              />
            </div>
          )}
          
          {paymentMethod === "card" && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" maxLength={19} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" maxLength={5} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" maxLength={3} type="password" />
                </div>
              </div>
            </div>
          )}
          
          {paymentMethod === "mpesa" && (
            <div className="grid gap-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input id="phone-number" placeholder="+254 712 345 678" />
              <p className="text-xs text-muted-foreground mt-1">
                You will receive an M-PESA prompt on your phone to complete the transaction.
              </p>
            </div>
          )}
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
            onClick={handleDeposit} 
            className="w-full sm:w-auto"
            variant="success"
            disabled={!paymentMethod || !amount || parseFloat(amount) <= 0 || isLoading}
          >
            {isLoading ? (
              <>Processing...</>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" /> Deposit ${amount ? parseFloat(amount).toFixed(2) : "0.00"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
