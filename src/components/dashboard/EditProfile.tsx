
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Edit, 
  Camera, 
  Info,
  DollarSign,
  SaveIcon,
  Check,
  Eye,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Country data with codes
const countries = [
  { code: "US", name: "United States", phoneCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", phoneCode: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", phoneCode: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", phoneCode: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", phoneCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", phoneCode: "+33", flag: "🇫🇷" },
  { code: "JP", name: "Japan", phoneCode: "+81", flag: "🇯🇵" },
  { code: "CN", name: "China", phoneCode: "+86", flag: "🇨🇳" },
  { code: "IN", name: "India", phoneCode: "+91", flag: "🇮🇳" },
  { code: "BR", name: "Brazil", phoneCode: "+55", flag: "🇧🇷" },
  { code: "RU", name: "Russia", phoneCode: "+7", flag: "🇷🇺" },
  { code: "ZA", name: "South Africa", phoneCode: "+27", flag: "🇿🇦" },
  { code: "MX", name: "Mexico", phoneCode: "+52", flag: "🇲🇽" },
  { code: "KR", name: "South Korea", phoneCode: "+82", flag: "🇰🇷" },
  { code: "IT", name: "Italy", phoneCode: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", phoneCode: "+34", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", phoneCode: "+31", flag: "🇳🇱" },
  { code: "SE", name: "Sweden", phoneCode: "+46", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", phoneCode: "+41", flag: "🇨🇭" },
  { code: "KE", name: "Kenya", phoneCode: "+254", flag: "🇰🇪" },
  { code: "NG", name: "Nigeria", phoneCode: "+234", flag: "🇳🇬" },
  { code: "EG", name: "Egypt", phoneCode: "+20", flag: "🇪🇬" },
  { code: "SG", name: "Singapore", phoneCode: "+65", flag: "🇸🇬" },
  { code: "MY", name: "Malaysia", phoneCode: "+60", flag: "🇲🇾" },
  { code: "TH", name: "Thailand", phoneCode: "+66", flag: "🇹🇭" },
  { code: "ID", name: "Indonesia", phoneCode: "+62", flag: "🇮🇩" },
  { code: "PH", name: "Philippines", phoneCode: "+63", flag: "🇵🇭" },
  { code: "AE", name: "United Arab Emirates", phoneCode: "+971", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", phoneCode: "+966", flag: "🇸🇦" },
  { code: "TR", name: "Turkey", phoneCode: "+90", flag: "🇹🇷" },
  // Can be expanded with more countries as needed
];

export const EditProfile = () => {
  const { toast } = useToast();
  
  // Profile information state
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [phonePrefix, setPhonePrefix] = useState<string>("+1");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  
  const [formData, setFormData] = useState({
    username: "",
    accountType: "Standard Account",
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    minJobPrice: "5.00",
    bio: "",
  });
  
  // Character count state
  const [bioCharCount, setBioCharCount] = useState(0);
  const maxBioChars = 400;
  
  // Fetch user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { user } = session;
          setUserId(user.id);
          
          console.log("User metadata:", user.user_metadata);
          
          // Set email from auth
          setFormData(prev => ({
            ...prev,
            email: user.email || "",
            username: user.user_metadata?.username || user.email?.split('@')[0] || "",
            firstName: user.user_metadata?.first_name || "",
            lastName: user.user_metadata?.last_name || "",
            company: user.user_metadata?.company || "",
            addressLine1: user.user_metadata?.address_line1 || "",
            addressLine2: user.user_metadata?.address_line2 || "",
            city: user.user_metadata?.city || "",
            state: user.user_metadata?.state || "",
            zipCode: user.user_metadata?.zip_code || "",
            country: user.user_metadata?.country || "United States",
            phone: user.phone || user.user_metadata?.phone || "",
            minJobPrice: user.user_metadata?.min_job_price || "5.00",
          }));
          
          // Find the country in our list
          const countryData = countries.find(c => 
            c.name === (user.user_metadata?.country || "United States")
          );
          
          if (countryData) {
            setPhonePrefix(countryData.phoneCode);
          }
          
          // Extract phone number without country code if available
          if (user.phone || user.user_metadata?.phone) {
            const phoneWithoutPrefix = (user.phone || user.user_metadata?.phone || "")
              .replace(/^\+\d+\s*/, '');
            setPhoneNumber(phoneWithoutPrefix);
          }
          
          // Check if the user has an avatar
          if (user.user_metadata?.avatar_url) {
            setAvatarUrl(user.user_metadata.avatar_url);
          }
          
          // Set bio character count
          if (user.user_metadata?.bio) {
            setFormData(prev => ({
              ...prev,
              bio: user.user_metadata.bio
            }));
            setBioCharCount(user.user_metadata.bio.length);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast({
          title: "Error",
          description: "Failed to load your profile information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [toast]);
  
  // Handle avatar change
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      // Check file size (maximum 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setAvatar(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      toast({
        title: "Avatar ready",
        description: "Your avatar will be changed after saving changes",
      });
    }
  };
  
  // Handle form data change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "bio") {
      // Limit bio to maxBioChars characters
      if (value.length <= maxBioChars) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setBioCharCount(value.length);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    if (name === "country") {
      // Find the corresponding country data
      const countryData = countries.find(c => c.name === value);
      if (countryData) {
        // Update phone prefix based on country
        setPhonePrefix(countryData.phoneCode);
      }
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle phone prefix and number change
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberOnly = e.target.value.replace(/\D/g, '');
    setPhoneNumber(numberOnly);
    
    // Update full phone in formData
    const fullPhone = numberOnly ? `${phonePrefix} ${numberOnly}` : "";
    setFormData(prev => ({
      ...prev,
      phone: fullPhone.trim()
    }));
  };
  
  // Upload avatar to storage
  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatar || !userId) return null;
    
    try {
      // Create a unique file name with user ID as folder name
      const fileExt = avatar.name.split('.').pop();
      const fileName = `${userId}/${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload the file
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(fileName, avatar, {
          upsert: true,
          contentType: avatar.type
        });
      
      if (uploadError) {
        console.error("Upload error details:", uploadError);
        throw uploadError;
      }
      
      console.log("Upload successful:", data);
      
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
      
      console.log("Public URL:", urlData.publicUrl);
      return urlData.publicUrl;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
  };
  
  // Submit profile changes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Upload avatar if changed
      let avatarUpdated = false;
      let avatarPublicUrl = avatarUrl;
      
      if (avatar) {
        try {
          avatarPublicUrl = await uploadAvatar();
          avatarUpdated = true;
          console.log("Avatar uploaded successfully:", avatarPublicUrl);
        } catch (error) {
          console.error("Avatar upload failed:", error);
          toast({
            title: "Avatar Upload Failed",
            description: "Could not upload your avatar, but we'll continue updating your profile.",
            variant: "destructive",
          });
        }
      }
      
      // Update user metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          username: formData.username,
          first_name: formData.firstName,
          last_name: formData.lastName,
          company: formData.company,
          address_line1: formData.addressLine1,
          address_line2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          country: formData.country,
          phone: formData.phone,
          min_job_price: formData.minJobPrice,
          bio: formData.bio,
          account_type: formData.accountType,
          ...(avatarUpdated && { avatar_url: avatarPublicUrl }),
        },
      });
      
      if (error) throw error;
      
      // Update local avatar state if needed
      if (avatarUpdated && avatarPublicUrl) {
        setAvatarUrl(avatarPublicUrl);
        setAvatar(null);
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Profile preview component
  const ProfilePreview = () => {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-purple-100">
            {avatarPreview ? (
              <img 
                src={avatarPreview} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-purple-100">
                <User className="text-purple-600 h-12 w-12" />
              </div>
            )}
          </div>
          <h2 className="mt-4 font-semibold text-xl">{formData.firstName} {formData.lastName}</h2>
          <p className="text-gray-500">@{formData.username}</p>
          <div className="mt-2 inline-block bg-purple-100 px-3 py-1 rounded-full text-purple-800 text-sm">
            {formData.accountType}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p>{formData.email}</p>
            </div>
            {formData.phone && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p>{formData.phone}</p>
              </div>
            )}
            {formData.company && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Company</h3>
                <p>{formData.company}</p>
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-500">Country</h3>
              <p>{formData.country}</p>
            </div>
          </div>
        </div>
        
        {formData.bio && (
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">About Me</h3>
            <p className="text-gray-700">{formData.bio}</p>
          </div>
        )}
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading your profile...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center">
            <Edit className="text-white" size={20} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700">Edit Profile</h2>
        </div>
        
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
              <Eye size={14} className="mr-1" />
              View my profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Profile Preview</DialogTitle>
            </DialogHeader>
            <ProfilePreview />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Avatar */}
        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="text-purple-600" size={18} />
              <h3 className="font-semibold text-gray-700">Avatar</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full overflow-hidden mb-4 flex items-center justify-center">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Avatar preview" 
                    className="w-full h-full object-cover"
                  />
                ) : avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="text-purple-600" size={40} />
                )}
              </div>
              
              <Input 
                id="avatar-upload" 
                type="file" 
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              
              <Label 
                htmlFor="avatar-upload" 
                className="bg-purple-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
              >
                <Camera size={16} />
                Change avatar
              </Label>
              
              <p className="text-xs text-gray-500 mt-2">Max. file size: 5MB</p>
            </div>
          </div>
          
          {/* Link to Settings Page */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-purple-600" size={18} />
              <h3 className="font-semibold text-gray-700">Other Settings</h3>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                For security, notification preferences, and skills settings, please visit the settings page.
              </p>
              <Button 
                variant="outline" 
                className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                onClick={() => navigate('/settings')}
              >
                Go to Settings
              </Button>
            </div>
          </div>
        </div>
        
        {/* Middle and Right columns - Main form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Details */}
              <div className="text-gray-500 flex items-center">
                <span>Registered as</span>
              </div>
              <div className="text-gray-700">worker</div>
              
              <div>
                <Label htmlFor="username" className="text-sm text-gray-600">
                  Username<span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div className="flex items-end">
                <div className="bg-amber-100 text-amber-600 px-3 py-2 rounded-md text-sm flex items-center">
                  <Info size={14} className="mr-1" />
                  {formData.accountType}
                </div>
              </div>
              
              {/* Personal Details */}
              <div>
                <Label htmlFor="firstName" className="text-sm text-gray-600">
                  First Name<span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName" className="text-sm text-gray-600">
                  Last Name<span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm text-gray-600">
                  Email Address<span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled
                  className="border-purple-200 focus-visible:ring-purple-400 bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
              
              <div>
                <Label htmlFor="company" className="text-sm text-gray-600">
                  Company
                </Label>
                <Input 
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              {/* Address Details */}
              <div>
                <Label htmlFor="addressLine1" className="text-sm text-gray-600">
                  Address Line 1
                </Label>
                <Input 
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div>
                <Label htmlFor="addressLine2" className="text-sm text-gray-600">
                  Address Line 2
                </Label>
                <Input 
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div>
                <Label htmlFor="city" className="text-sm text-gray-600">
                  City
                </Label>
                <Input 
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div>
                <Label htmlFor="state" className="text-sm text-gray-600">
                  State
                </Label>
                <Input 
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div>
                <Label htmlFor="zipCode" className="text-sm text-gray-600">
                  Zip Code
                </Label>
                <Input 
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
              </div>
              
              <div>
                <Label htmlFor="country" className="text-sm text-gray-600">
                  Country
                </Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => handleSelectChange("country", value)}
                >
                  <SelectTrigger className="border-purple-200 focus:ring-purple-400">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-80">
                    {countries.map(country => (
                      <SelectItem key={country.code} value={country.name}>
                        <div className="flex items-center">
                          <span className="mr-2">{country.flag}</span>
                          {country.name} ({country.phoneCode})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-sm text-gray-600">
                  Phone
                </Label>
                <div className="flex">
                  <div className="bg-gray-100 flex items-center px-3 border border-r-0 border-gray-200 rounded-l-md text-gray-600">
                    {phonePrefix}
                  </div>
                  <Input 
                    id="phone"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="border-purple-200 focus-visible:ring-purple-400 rounded-l-none"
                  />
                </div>
              </div>
              
              <div className="flex items-end gap-2">
                <Label htmlFor="minJobPrice" className="text-sm text-gray-600 mb-2 flex items-center">
                  Min Job Price 
                  <div className="ml-1 cursor-help relative group">
                    <Info size={14} className="text-purple-400" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-gray-800 text-white text-xs rounded w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                      The minimum amount you are willing to accept for a job
                    </div>
                  </div>
                </Label>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input 
                    id="minJobPrice"
                    name="minJobPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.minJobPrice}
                    onChange={handleInputChange}
                    className="pl-8 border-purple-200 focus-visible:ring-purple-400"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor="bio" className="text-sm text-gray-600">
                    Something about you
                  </Label>
                  <span className={`text-xs ${bioCharCount > maxBioChars * 0.9 ? 'text-amber-600' : 'text-gray-500'}`}>
                    {bioCharCount}/{maxBioChars} characters
                  </span>
                </div>
                <Textarea 
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="h-32 border-purple-200 focus-visible:ring-purple-400"
                  placeholder="Tell us about yourself... (max 400 characters)"
                  maxLength={maxBioChars}
                />
              </div>
              
              {/* Action Buttons */}
              <div className="md:col-span-2 flex justify-end gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  className="border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
