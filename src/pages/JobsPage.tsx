
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Search, 
  Filter,
  Star,
  Crown,
  DollarSign,
  Clock,
  Globe,
  Target,
  Users,
  Loader2
} from "lucide-react";
import SidebarContent from "@/components/dashboard/SidebarContent";
import { Database } from "@/types/database";

type Job = Database['public']['Tables']['jobs']['Row'] & {
  applications_count: number;
};

const JobsPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState("jobs");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        setUserId(session.user.id);
        fetchJobs();
      } else {
        navigate('/login');
      }
    };

    checkSession();
  }, [navigate]);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('jobs')
        .select(`
          *,
          applications_count:job_applications(count)
        `)
        .eq('status', 'active')
        .order('is_featured', { ascending: false })
        .order('is_premium', { ascending: false })
        .order('created_at', { ascending: false });

      if (selectedType) {
        query = query.eq('type', selectedType);
      }

      if (selectedCountry) {
        query = query.contains('countries', [selectedCountry]);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching jobs:', error);
      } else {
        setJobs(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchJobs();
    }
  }, [selectedType, selectedCountry, isLoggedIn]);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <SidebarContent 
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                    isLoggedIn={isLoggedIn}
                    onLogout={handleLogout}
                  />
                </SheetContent>
              </Sheet>
              <h1 className="text-xl font-semibold text-gray-900">Available Jobs</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      placeholder="Search jobs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Select value={selectedType || ''} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      <SelectItem value="view">Views</SelectItem>
                      <SelectItem value="click">Clicks</SelectItem>
                      <SelectItem value="like">Likes</SelectItem>
                      <SelectItem value="follow">Follows</SelectItem>
                      <SelectItem value="subscribe">Subscriptions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={selectedCountry || ''} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Countries</SelectItem>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Jobs Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading available jobs...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <Card key={job.id} className={`
                  relative overflow-hidden transition-all duration-200 hover:shadow-lg
                  ${job.is_featured ? 'border-amber-200 bg-amber-50' : 
                    job.is_premium ? 'border-blue-200 bg-blue-50' : ''}
                `}>
                  {job.is_featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                        <Star className="h-3 w-3 mr-1 fill-current" /> Featured
                      </Badge>
                    </div>
                  )}
                  {job.is_premium && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        <Crown className="h-3 w-3 mr-1 fill-current" /> Premium
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{job.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {job.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                          ${job.rate_per_action} per {job.type}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-purple-600" />
                          {job.total_actions - (job.applications_count || 0)} seats left
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-blue-600" />
                          {new Date(job.created_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Globe className="h-4 w-4 mr-2 text-amber-600" />
                          {job.countries?.length ? job.countries.join(', ') : 'Worldwide'}
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
