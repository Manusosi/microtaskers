import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Country {
  code: string;
  name: string;
}

const Signup = () => {
  const { role: type } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    countryCode: "",
  });

  useEffect(() => {
    if (!type || !['tasker', 'advertiser'].includes(type)) {
      navigate('/');
    }
  }, [type, navigate]);

  const { data: countries, isLoading: isLoadingCountries, error: countriesError } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("countries")
          .select("code, name")
          .order("name") as { data: Country[] | null; error: any };
        
        if (error) throw error;
        return data || [];
      } catch (err) {
        console.error("Error fetching countries:", err);
        return [];
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      setError("You must agree to the Terms and Conditions to continue.");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            username: formData.username,
            role: type,
            country_code: formData.countryCode,
            phone_number: phone,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        navigate(type === "tasker" ? "/dashboard/tasker" : "/dashboard/advertiser");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      setError(error.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center mb-8">
        <Link to="/">
          <img 
            src="/lovable-uploads/c9628198-a7de-4746-8562-b3649c93a411.png" 
            alt="Microtaskers Logo" 
            className="h-16 mx-auto" 
          />
        </Link>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-left">
          <CardTitle>Register as {type === "tasker" ? "a Tasker" : "an Advertiser"}</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}
          {countriesError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
              Error loading countries. Please refresh the page.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Choose a username"
                onChange={handleChange}
                required
              />
            </div>

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
              <Label htmlFor="country">Country</Label>
              <Select
                onValueChange={(value) => 
                  setFormData({ ...formData, countryCode: value })
                }
                required
                disabled={isLoadingCountries}
              >
                <SelectTrigger>
                  <SelectValue placeholder={isLoadingCountries ? "Loading countries..." : "Select your country"} />
                </SelectTrigger>
                <SelectContent>
                  {countries?.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <PhoneInput
                international
                countrySelectProps={{ unicodeFlags: true }}
                value={phone}
                onChange={(value) => setPhone(value || "")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox 
                id="terms" 
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the Terms and Conditions
                </label>
                <p className="text-sm text-gray-500">
                  By checking this box, you agree to our{" "}
                  <Link to="/terms" className="text-[#8511b4] hover:text-[#7a0fa6] underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-[#8511b4] hover:text-[#7a0fa6] underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#8511b4] hover:bg-[#7a0fa6] mt-6"
              disabled={loading || isLoadingCountries || !agreedToTerms}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#8511b4] hover:text-[#7a0fa6]">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
