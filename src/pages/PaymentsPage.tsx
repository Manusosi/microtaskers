
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  BellDot, 
  Menu,
  Upload,
  Download,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarContent } from "@/components/dashboard/SidebarContent";
import { PaymentHistory } from "@/components/dashboard/PaymentHistory";
import { PaymentSummary } from "@/components/dashboard/PaymentSummary";

const PaymentsPage = () => {
  const [activeMenu, setActiveMenu] = useState("payments");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        setUsername(session.user.user_metadata.username || session.user.email);
      } else {
        navigate('/login');
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsLoggedIn(true);
        setUsername(session?.user.user_metadata.username || session?.user.email || '');
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        navigate('/');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // Sample payment data
  const paymentData = [
    { 
      id: 1, 
      date: "31 Dec 2023 10:34 PM", 
      referenceId: "07790321", 
      paymentType: "Premium Account", 
      method: "Account Balance", 
      status: "paid", 
      fee: "---", 
      amount: 5.00 
    },
    { 
      id: 2, 
      date: "31 Dec 2023 10:01 AM", 
      referenceId: "16107181", 
      paymentType: "Withdrawal", 
      method: "PayPal", 
      status: "awaiting approval", 
      fee: "---", 
      amount: 10.00 
    },
    { 
      id: 3, 
      date: "31 Dec 2023 10:00 AM", 
      referenceId: "91740105", 
      paymentType: "Deposit", 
      method: "---", 
      status: "paid", 
      fee: "---", 
      amount: 67.00 
    }
  ];

  // Payment summary
  const paymentSummary = {
    accountBalance: 1239.00,
    totalDeposit: 67,
    totalWithdrawal: 0
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <div className="sticky top-0 left-0 right-0 h-16 bg-white border-b z-40 px-4 shadow-sm">
        <div className="h-full flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContent 
                  activeMenu={activeMenu} 
                  setActiveMenu={setActiveMenu}
                  onLogout={handleLogout}
                  isLoggedIn={isLoggedIn}
                />
              </SheetContent>
            </Sheet>
            <Link to="/">
              <img
                src="/lovable-uploads/c9628198-a7de-4746-8562-b3649c93a411.png"
                alt="Logo"
                className="h-8"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-6 ml-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900 font-medium">
                Jobs
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900 font-medium">
                Offers
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon">
                  <BellDot className="h-5 w-5" />
                </Button>
                <div className="hidden md:flex items-center space-x-2 bg-green-100 px-3 py-1.5 rounded-full">
                  <span className="text-sm font-bold text-green-600">US${paymentSummary.accountBalance.toFixed(2)}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-700">
                    {username?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost">Sign in</Button>
                </Link>
                <Link to="/signup/tasker">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-64 border-r bg-white overflow-y-auto">
          <SidebarContent 
            activeMenu={activeMenu} 
            setActiveMenu={setActiveMenu} 
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800">Payment History</h1>
                </div>
                <div className="flex space-x-3">
                  <Button className="bg-green-500 hover:bg-green-600">
                    <Upload className="mr-1 h-4 w-4" /> Deposit Funds
                  </Button>
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    <Download className="mr-1 h-4 w-4" /> Withdraw Funds
                  </Button>
                </div>
              </div>
              
              <PaymentSummary summary={paymentSummary} />
              <PaymentHistory payments={paymentData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
