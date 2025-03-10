
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

interface Country {
  code: string;
  name: string;
}

const Signup = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!type || !['tasker', 'advertiser'].includes(type)) {
      navigate('/');
    }
  }, [type, navigate]);

  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    countryCode: "",
  });

  const { data: countries } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("countries")
        .select("code, name")
        .order("name") as { data: Country[] | null; error: any };
      
      if (error) throw error;
      return data || [];
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
        navigate(type === "tasker" ? "/dashboard" : "/advertiser-dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error signing up. Please try again.");
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
        <CardHeader>
          <CardTitle>Register as {type === "tasker" ? "a Tasker" : "an Advertiser"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
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
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                onChange={handleChange}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#8511b4] hover:bg-[#7a0fa6]"
              disabled={loading}
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
