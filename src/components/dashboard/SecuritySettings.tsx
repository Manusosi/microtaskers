
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const SecuritySettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Submit password change
  const handlePasswordSubmit = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "All password fields are required",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      // Update password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully",
      });
      
      // Reset password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Error updating password:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="text-purple-600" size={18} />
        <h3 className="font-semibold text-gray-700">Change password</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="currentPassword" className="text-sm text-gray-600">
            Current Password
          </Label>
          <Input 
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            className="border-purple-200 focus-visible:ring-purple-400"
          />
        </div>
        
        <div>
          <Label htmlFor="newPassword" className="text-sm text-gray-600">
            New password
          </Label>
          <Input 
            id="newPassword"
            name="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="border-purple-200 focus-visible:ring-purple-400"
          />
        </div>
        
        <div>
          <Label htmlFor="confirmPassword" className="text-sm text-gray-600">
            Confirm password
          </Label>
          <Input 
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            className="border-purple-200 focus-visible:ring-purple-400"
          />
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 hover:text-purple-700"
          onClick={handlePasswordSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : "Change Password"}
        </Button>
      </div>
    </div>
  );
};
