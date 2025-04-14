
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Attempt to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Invalid credentials or you don't have admin access.",
        });
        setLoading(false);
        return;
      }

      if (data.user) {
        // Check if user has admin role
        const role = data.user.user_metadata?.role;
        
        if (role !== 'admin') {
          // Sign out if not admin
          await supabase.auth.signOut();
          
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have admin privileges.",
          });
          
          setLoading(false);
          return;
        }
        
        // If admin, redirect to admin dashboard
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard.",
        });
        
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-purple-700" />
          </div>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your admin email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#8511b4] hover:bg-[#7a0fa6]"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Sign in to Admin Panel"}
            </Button>
            
            <div className="text-center mt-4">
              <a href="/" className="text-sm text-purple-600 hover:underline">
                Return to Homepage
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
