
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Login = () => {
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error signing in",
          description: error.message,
        });
        return;
      }

      if (data.user) {
        // Check user role from metadata and redirect accordingly
        const role = data.user.user_metadata.role;
        navigate(role === "tasker" ? "/dashboard" : "/advertiser-dashboard");
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="sticky top-0 z-50 border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/lovable-uploads/6ec07fee-6c66-486f-8b0f-1f56b48602f0.png" alt="Microtaskers Logo" className="h-8" />
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
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
                {loading ? "Signing in..." : "Sign in"}
              </Button>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Dialog>
                  <DialogTrigger className="text-[#8511b4] hover:text-[#7a0fa6] hover:underline">
                    Sign up
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Choose Your Path</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Link 
                        to="/signup/tasker" 
                        className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="font-semibold mb-2">I want to complete tasks and earn money</h3>
                        <p className="text-sm text-gray-600">Find tasks and get paid for your work.</p>
                      </Link>
                      <Link 
                        to="/signup/advertiser" 
                        className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="font-semibold mb-2">I want to post tasks and hire</h3>
                        <p className="text-sm text-gray-600">Post tasks and hire professionals.</p>
                      </Link>
                    </div>
                  </DialogContent>
                </Dialog>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
