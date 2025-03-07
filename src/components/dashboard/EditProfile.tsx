
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  User, 
  Lock, 
  Edit, 
  Camera, 
  ExternalLink, 
  ChevronDown, 
  Info,
  DollarSign,
  SaveIcon,
  X,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const EditProfile = () => {
  const { toast } = useToast();
  
  // Profile information state
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "demoworker",
    accountType: "Premium Account",
    firstName: "Demo",
    lastName: "Worker",
    email: "demoworker@demo.com",
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
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  // Skills state with initial data based on the example
  const [skills, setSkills] = useState([
    { id: "signup", label: "Sign up", checked: false },
    { id: "clickSearch", label: "Click or Search", checked: false },
    { id: "youtube", label: "Youtube", checked: false },
    { id: "facebook", label: "Facebook", checked: false },
    { id: "twitter", label: "Twitter", checked: false },
    { id: "forums", label: "Forums", checked: false },
    { id: "writeArticle", label: "Write an Article", checked: false },
    { id: "writeReview", label: "Write a Review", checked: false },
    { id: "votingRating", label: "Voting & Rating", checked: false },
    { id: "surveys", label: "Surveys", checked: false },
    { id: "websiteOwners", label: "Website Owners", checked: false },
    { id: "leads", label: "Leads", checked: false },
    { id: "dataMining", label: "Data Mining", checked: false },
    { id: "writeComment", label: "Write a Comment", checked: false },
    { id: "searchClick", label: "Search & Click", checked: false },
    { id: "bookmark", label: "Bookmark", checked: false },
    { id: "contentModeration", label: "Content Moderation", checked: false },
    { id: "other", label: "Other", checked: false },
  ]);
  
  // Email notification preferences
  const [notifications, setNotifications] = useState([
    { id: "newsletter", label: "I wish to receive newsletter", checked: true },
    { id: "newJob", label: "Notify me for new job by email", checked: false },
    { id: "jobInvitation", label: "Notify me for new job invitation", checked: false },
    { id: "taskCompleted", label: "Notify me for task completed", checked: false },
    { id: "newOrder", label: "Notify me for new order by email", checked: false },
  ]);
  
  // Handle avatar change
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAvatar(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      toast({
        title: "Avatar updated",
        description: "Your avatar will be changed after saving changes.",
      });
    }
  };
  
  // Handle form data change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle skill checkbox change
  const handleSkillChange = (id: string, checked: boolean) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, checked } : skill
    ));
  };
  
  // Handle notification checkbox change
  const handleNotificationChange = (id: string, checked: boolean) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, checked } : notification
    ));
  };
  
  // Submit password change
  const handlePasswordSubmit = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "All password fields are required.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would make an API request to change the password
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    
    // Reset password fields
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  
  // Submit profile changes
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would make an API request to update the user profile
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };
  
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
        
        <Button variant="outline" size="sm" className="text-purple-600 border-purple-200" asChild>
          <a href="#" className="flex items-center gap-1">
            <ExternalLink size={14} />
            View my profile
          </a>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Avatar and Password */}
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
            </div>
          </div>
          
          {/* Password Change Section */}
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
              >
                Change Password
              </Button>
            </div>
          </div>
          
          {/* Worker Skills Section */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <User className="text-purple-600" size={18} />
              <h3 className="font-semibold text-gray-700">Worker Skills</h3>
            </div>
            
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`skill-${skill.id}`}
                    checked={skill.checked}
                    onCheckedChange={(checked) => 
                      handleSkillChange(skill.id, checked as boolean)
                    }
                    className="text-purple-600 border-purple-200 data-[state=checked]:bg-purple-600"
                  />
                  <Label 
                    htmlFor={`skill-${skill.id}`}
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    {skill.label}
                  </Label>
                </div>
              ))}
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
                  Premium Account
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
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
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
                  <SelectContent>
                    <SelectItem value="United States">
                      <div className="flex items-center">
                        <span className="mr-2">🇺🇸</span>
                        United States
                      </div>
                    </SelectItem>
                    <SelectItem value="Canada">
                      <div className="flex items-center">
                        <span className="mr-2">🇨🇦</span>
                        Canada
                      </div>
                    </SelectItem>
                    <SelectItem value="United Kingdom">
                      <div className="flex items-center">
                        <span className="mr-2">🇬🇧</span>
                        United Kingdom
                      </div>
                    </SelectItem>
                    <SelectItem value="Australia">
                      <div className="flex items-center">
                        <span className="mr-2">🇦🇺</span>
                        Australia
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-sm text-gray-600">
                  Phone
                </Label>
                <Input 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border-purple-200 focus-visible:ring-purple-400"
                />
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
                <Label htmlFor="bio" className="text-sm text-gray-600">
                  Something about you
                </Label>
                <Textarea 
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="h-32 border-purple-200 focus-visible:ring-purple-400"
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              {/* Email Notifications */}
              <div className="md:col-span-2 border-t pt-4 mt-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-purple-600">
                    <Bell />
                  </div>
                  <h3 className="font-semibold text-gray-700">Email Notifications</h3>
                </div>
                
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`notification-${notification.id}`}
                        checked={notification.checked}
                        onCheckedChange={(checked) => 
                          handleNotificationChange(notification.id, checked as boolean)
                        }
                        className="text-purple-600 border-purple-200 data-[state=checked]:bg-purple-600"
                      />
                      <Label 
                        htmlFor={`notification-${notification.id}`}
                        className="text-sm text-gray-600 cursor-pointer"
                      >
                        {notification.label}
                      </Label>
                    </div>
                  ))}
                </div>
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
                >
                  <Check className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function Bell(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
