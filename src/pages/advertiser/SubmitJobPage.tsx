import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  DollarSign, 
  Upload, 
  Info, 
  AlertCircle,
  Menu,
  Calculator,
  CreditCard,
  Wallet,
  ArrowLeft,
  ArrowRight,
  Globe,
  Target
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarContent from "@/components/dashboard/SidebarContent";

const SubmitJobPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [activeMenu, setActiveMenu] = useState("submitJob");
  const [currentStep, setCurrentStep] = useState(1);
  
  // Job details (Step 1)
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [autoRateTasks, setAutoRateTasks] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [characterCount, setCharacterCount] = useState(0);
  
  // Budget calculator (Step 2)
  const [jobType, setJobType] = useState("view");
  const [budget, setBudget] = useState("");
  const [ratePerAction, setRatePerAction] = useState("");
  const [estimatedActions, setEstimatedActions] = useState(0);
  const [jobApprovalFee] = useState(2);
  const [siteFee, setSiteFee] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  
  // Payment (Step 3)
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  
  // User account
  const [accountBalance, setAccountBalance] = useState(120.50);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    calculateEstimates();
  }, [budget, ratePerAction]);

  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      setIsLoggedIn(true);
      // Get user role from localStorage or Supabase
      const savedRole = localStorage.getItem('userRole');
      setUserRole(savedRole || "");
      
      if (savedRole !== 'advertiser') {
        navigate('/dashboard');
      }
    } else {
      navigate('/login');
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setJobDescription(text);
    setCharacterCount(text.length);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  const handleCountrySelection = (country: string) => {
    setSelectedCountries(prev => {
      if (prev.includes(country)) {
        return prev.filter(c => c !== country);
      } else {
        return [...prev, country];
      }
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    navigate('/');
  };

  const calculateEstimates = () => {
    const budgetNum = parseFloat(budget) || 0;
    const rateNum = parseFloat(ratePerAction) || 0;
    
    if (budgetNum > 0 && rateNum > 0) {
      const actions = Math.floor(budgetNum / rateNum);
      const siteFeeAmount = budgetNum * 0.1; // 10% site fee
      const total = budgetNum + jobApprovalFee + siteFeeAmount;
      
      setEstimatedActions(actions);
      setSiteFee(siteFeeAmount);
      setTotalCost(total);
    } else {
      setEstimatedActions(0);
      setSiteFee(0);
      setTotalCost(0);
    }
  };

  const handleContinue = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!jobTitle || !jobDescription) {
        alert("Please fill in all required fields");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!budget || !ratePerAction || totalCost === 0) {
        alert("Please complete your budget details");
        return;
      }
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitJob = async () => {
    try {
      // Check if user has sufficient balance when using wallet
      if (paymentMethod === "wallet" && accountBalance < totalCost) {
        if (confirm("Your balance is insufficient. Would you like to deposit funds?")) {
          navigate('/deposit-funds');
          return;
        }
        return;
      }

      // Start loading state
      setIsSubmitting(true);

      // Process payment based on selected method
      let paymentResult;
      if (paymentMethod === "wallet") {
        // Process wallet payment
        const { data: walletData, error: walletError } = await supabase
          .from('user_wallets')
          .select('balance')
          .single();

        if (walletError) throw new Error('Failed to check wallet balance');

        const currentBalance = walletData.balance;
        if (currentBalance < totalCost) {
          throw new Error('Insufficient balance');
        }

        // Deduct amount from wallet
        const { error: updateError } = await supabase
          .from('user_wallets')
          .update({ balance: currentBalance - totalCost })
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

        if (updateError) throw new Error('Failed to process payment');
        
        paymentResult = { success: true, transaction_id: `wallet_${Date.now()}` };
      } else {
        // For card/PayPal payments, we'll just simulate success for now
        // In production, integrate with actual payment processors
        paymentResult = { success: true, transaction_id: `${paymentMethod}_${Date.now()}` };
      }

      if (!paymentResult.success) {
        throw new Error('Payment failed');
      }

      // Create the job posting
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .insert({
          title: jobTitle,
          description: jobDescription,
          type: jobType,
          budget: parseFloat(budget),
          rate_per_action: parseFloat(ratePerAction),
          total_actions: estimatedActions,
          countries: selectedCountries.length > 0 ? selectedCountries : null,
          auto_rate: autoRateTasks,
          status: 'active',
          is_featured: totalCost >= 100, // Jobs with budget >= $100 are featured
          is_premium: totalCost >= 50,   // Jobs with budget >= $50 are premium
          payment_status: 'paid',
          payment_method: paymentMethod,
          payment_transaction_id: paymentResult.transaction_id,
          total_cost: totalCost,
          advertiser_id: (await supabase.auth.getUser()).data.user?.id,
          created_at: new Date().toISOString(),
          available_seats: estimatedActions,
          completed_submissions: 0
        })
        .select()
        .single();

      if (jobError) throw new Error('Failed to create job posting');

      // If proof file exists, upload it
      if (proofFile) {
        const fileExt = proofFile.name.split('.').pop();
        const fileName = `${jobData.id}_proof.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('job-proofs')
          .upload(fileName, proofFile);

        if (uploadError) {
          console.error('Failed to upload proof file:', uploadError);
          // Don't throw error here, as the job is already created
        }
      }

      // Create a transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          amount: totalCost,
          type: 'job_posting',
          status: 'completed',
          payment_method: paymentMethod,
          transaction_id: paymentResult.transaction_id,
          job_id: jobData.id,
          created_at: new Date().toISOString()
        });

      if (transactionError) {
        console.error('Failed to record transaction:', transactionError);
        // Don't throw error here, as the job is already created
      }

      // Update account balance in state
      if (paymentMethod === "wallet") {
        setAccountBalance(prev => prev - totalCost);
      }

      // Navigate to success page
      navigate('/advertiser/my-jobs', { 
        state: { 
          success: true, 
          message: 'Job posted successfully!',
          jobId: jobData.id 
        }
      });

    } catch (error) {
      console.error('Error submitting job:', error);
      alert(error.message || 'Failed to submit job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render nothing if not logged in
  if (!isLoggedIn || userRole !== 'advertiser') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="sticky top-0 left-0 right-0 h-16 bg-white border-b z-40">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <SidebarContent 
                  activeMenu={activeMenu} 
                  setActiveMenu={setActiveMenu}
                  handleLogout={handleLogout}
                  isLoggedIn={isLoggedIn}
                />
              </SheetContent>
            </Sheet>
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/c9628198-a7de-4746-8562-b3649c93a411.png" 
                alt="MicroTaskers Logo" 
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const span = document.createElement('span');
                    span.className = 'text-xl font-bold text-purple-600';
                    span.textContent = 'MicroTaskers';
                    parent.appendChild(span);
                  }
                }}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="font-medium">${accountBalance.toFixed(2)}</span>
            </div>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => navigate('/deposit-funds')}
            >
              Deposit
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {['Job Details', 'Budget', 'Payment'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${currentStep > index ? 'bg-green-600 text-white' : 
                    currentStep === index + 1 ? 'bg-purple-600 text-white' : 
                    'bg-gray-200 text-gray-600'}
                `}>
                  {currentStep > index ? '✓' : index + 1}
                </div>
                <span className="ml-3 font-medium text-gray-900">{step}</span>
                {index < 2 && (
                  <div className={`w-24 h-1 mx-4 ${currentStep > index ? 'bg-green-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto">
          {/* Step 1: Job Details */}
          {currentStep === 1 && (
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                  <CardDescription>Provide the basic information about your job</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="job-type">Job Type <span className="text-red-500">*</span></Label>
                      <Select value={jobType} onValueChange={setJobType}>
                        <SelectTrigger id="job-type">
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="view">Views</SelectItem>
                          <SelectItem value="click">Clicks</SelectItem>
                          <SelectItem value="like">Likes</SelectItem>
                          <SelectItem value="follow">Follows</SelectItem>
                          <SelectItem value="subscribe">Subscriptions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="job-title">Job Title <span className="text-red-500">*</span></Label>
                      <Input 
                        id="job-title"
                        placeholder="Enter a descriptive title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="job-description">Job Description <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="job-description"
                        placeholder="Describe what workers need to do"
                        className="min-h-[120px]"
                        value={jobDescription}
                        onChange={handleDescriptionChange}
                      />
                      <p className="text-sm text-gray-500 mt-1 text-right">{characterCount}/1000</p>
                    </div>

                    <div>
                      <Label>Required Proof</Label>
                      <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                        <div className="flex items-center gap-3">
                          <Input
                            id="proof-file"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          <Label
                            htmlFor="proof-file"
                            className="flex items-center px-4 py-2 bg-white border rounded-md cursor-pointer hover:bg-gray-50"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Choose File
                          </Label>
                          <span className="text-sm text-gray-600">
                            {proofFile ? proofFile.name : "No file selected"}
                          </span>
                        </div>
                        
                        <div className="flex items-start mt-3">
                          <Checkbox 
                            id="auto-rate"
                            checked={autoRateTasks}
                            onCheckedChange={(checked) => setAutoRateTasks(checked === true)}
                          />
                          <Label htmlFor="auto-rate" className="ml-2 text-sm text-gray-600">
                            Auto-approve tasks when proof is submitted
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Target Countries
                      </Label>
                      <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                        <div className="flex flex-wrap gap-2">
                          {["United States", "United Kingdom", "Canada", "Australia", "Germany"].map((country) => (
                            <div
                              key={country}
                              onClick={() => handleCountrySelection(country)}
                              className={`
                                px-3 py-1.5 rounded-full text-sm cursor-pointer flex items-center gap-1.5
                                ${selectedCountries.includes(country)
                                  ? "bg-purple-100 text-purple-800 border border-purple-300"
                                  : "bg-white border hover:border-purple-300"}
                              `}
                            >
                              {country}
                              {selectedCountries.includes(country) && (
                                <span className="text-purple-600">✓</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Leave empty to target workers worldwide</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end mt-6">
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={handleContinue}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Budget */}
          {currentStep === 2 && (
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-purple-600" />
                    Set Your Budget
                  </CardTitle>
                  <CardDescription>Define your budget and rate per {jobType}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Your Total Budget</Label>
                        <div className="mt-2 flex items-center">
                          <div className="flex-1 flex items-center border rounded-md overflow-hidden">
                            <span className="px-3 bg-gray-50 border-r h-10 flex items-center text-gray-500">$</span>
                            <Input 
                              type="number"
                              value={budget}
                              onChange={(e) => setBudget(e.target.value)}
                              min="0"
                              step="0.01"
                              className="border-0"
                              placeholder="Enter amount"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label>Rate per {jobType}</Label>
                        <div className="mt-2 flex items-center">
                          <div className="flex-1 flex items-center border rounded-md overflow-hidden">
                            <span className="px-3 bg-gray-50 border-r h-10 flex items-center text-gray-500">$</span>
                            <Input 
                              type="number"
                              value={ratePerAction}
                              onChange={(e) => setRatePerAction(e.target.value)}
                              min="0.01"
                              step="0.01"
                              className="border-0"
                              placeholder={`Amount per ${jobType}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {budget && ratePerAction && (
                      <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                          <h3 className="text-lg font-semibold text-purple-900 mb-4">Estimated Results</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-purple-700">Total {jobType}s:</span>
                              <span className="font-semibold text-purple-900">{estimatedActions.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-purple-700">Available Seats:</span>
                              <span className="font-semibold text-purple-900">{estimatedActions.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                          <h3 className="text-lg font-semibold text-green-900 mb-4">Cost Breakdown</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-green-700">Budget:</span>
                              <span className="font-medium text-green-900">${parseFloat(budget).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-green-700">Approval Fee:</span>
                              <span className="font-medium text-green-900">${jobApprovalFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-green-700">Platform Fee (10%):</span>
                              <span className="font-medium text-green-900">${siteFee.toFixed(2)}</span>
                            </div>
                            <div className="pt-2 mt-2 border-t border-green-200">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-green-900">Total Cost:</span>
                                <span className="text-lg font-bold text-green-900">${totalCost.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={handleContinue}
                  disabled={!budget || !ratePerAction || totalCost === 0}
                >
                  Continue to Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                    Complete Payment
                  </CardTitle>
                  <CardDescription>Choose your payment method</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-blue-900">Total Amount Due</h3>
                        <p className="text-sm text-blue-700 mt-1">Including all fees</p>
                      </div>
                      <div className="text-2xl font-bold text-blue-900">${totalCost.toFixed(2)}</div>
                    </div>
                  </div>

                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    {accountBalance >= totalCost && (
                      <div className={`
                        border rounded-lg p-4 transition-colors cursor-pointer
                        ${paymentMethod === 'wallet' ? 'bg-purple-50 border-purple-200' : 'hover:border-purple-200'}
                      `}>
                        <div className="flex items-start">
                          <RadioGroupItem value="wallet" id="wallet" className="mt-1" />
                          <Label htmlFor="wallet" className="flex flex-col ml-3 cursor-pointer">
                            <div className="flex items-center">
                              <Wallet className="h-5 w-5 mr-2 text-purple-600" />
                              <span className="font-medium">Wallet Balance</span>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              Available: <span className="font-medium text-green-600">${accountBalance.toFixed(2)}</span>
                            </div>
                          </Label>
                        </div>
                      </div>
                    )}

                    <div className={`
                      border rounded-lg p-4 transition-colors cursor-pointer
                      ${paymentMethod === 'card' ? 'bg-purple-50 border-purple-200' : 'hover:border-purple-200'}
                    `}>
                      <div className="flex items-start">
                        <RadioGroupItem value="card" id="card" className="mt-1" />
                        <Label htmlFor="card" className="flex flex-col ml-3 cursor-pointer flex-1">
                          <div className="flex items-center">
                            <CreditCard className="h-5 w-5 mr-2 text-gray-600" />
                            <span className="font-medium">Credit/Debit Card</span>
                          </div>
                          
                          {paymentMethod === 'card' && (
                            <div className="mt-4 space-y-4">
                              <div>
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input 
                                  id="card-number" 
                                  placeholder="0000 0000 0000 0000"
                                  className="mt-1"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="expiry">Expiry Date</Label>
                                  <Input 
                                    id="expiry" 
                                    placeholder="MM/YY"
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="cvv">CVV</Label>
                                  <Input 
                                    id="cvv" 
                                    placeholder="123"
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </Label>
                      </div>
                    </div>

                    <div className={`
                      border rounded-lg p-4 transition-colors cursor-pointer
                      ${paymentMethod === 'paypal' ? 'bg-purple-50 border-purple-200' : 'hover:border-purple-200'}
                    `}>
                      <div className="flex items-center">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="ml-3 cursor-pointer">
                          <div className="h-8 w-24 bg-[#0070BA] rounded text-white font-bold flex items-center justify-center">
                            PayPal
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 px-8"
                  onClick={handleSubmitJob}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Pay & Post Job'
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitJobPage; 