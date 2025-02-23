
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AdvertiserOptionsDialogProps {
  trigger: React.ReactNode;
}

const AdvertiserOptionsDialog = ({ trigger }: AdvertiserOptionsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">
            Microtaskers Ads offers many ways to advertise
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-8">
          <AdvertisingOption
            icon={<TrafficIcon />}
            title="Traffic"
            bgColor="bg-[#4169E1]"
          />
          <AdvertisingOption
            icon={<SalesIcon />}
            title="Sales"
            bgColor="bg-[#63B3ED]"
          />
          <AdvertisingOption
            icon={<EngagementIcon />}
            title="Engagement"
            bgColor="bg-[#4169E1]"
          />
          <AdvertisingOption
            icon={<LeadsIcon />}
            title="Leads"
            bgColor="bg-[#4169E1]"
          />
          <AdvertisingOption
            icon={<JobsIcon />}
            title="Jobs"
            bgColor="bg-[#2D3748]"
          />
        </div>
        <div className="flex justify-center mt-6">
          <Link to="/signup/advertiser">
            <Button className="bg-[#8511b4] hover:bg-[#7a0fa6] text-white rounded-full px-8 py-6 text-lg font-semibold transition-all hover:-translate-y-1">
              Continue
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AdvertisingOption = ({ icon, title, bgColor }: { icon: React.ReactNode; title: string; bgColor: string }) => (
  <div className="text-center space-y-2">
    <div className={`${bgColor} rounded-xl p-4 mx-auto w-20 h-20 flex items-center justify-center`}>
      {icon}
    </div>
    <h3 className="font-semibold">{title}</h3>
  </div>
);

const TrafficIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 10L20 15L15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 4V9C4 11.2091 5.79086 13 8 13H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SalesIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.4 15C19.1277 15.8031 19.0306 16.6511 19.115 17.4897C19.1994 18.3282 19.4627 19.1407 19.888 19.878C20.0637 20.1755 20.1064 20.5293 20.0071 20.8579C19.9077 21.1866 19.6738 21.4644 19.363 21.634C17.5 22.776 15.306 23.416 13 23.416C10.694 23.416 8.5 22.776 6.637 21.634C6.32623 21.4644 6.09227 21.1866 5.99289 20.8579C5.89351 20.5293 5.93624 20.1755 6.112 19.878C6.53734 19.1407 6.80058 18.3282 6.88498 17.4897C6.96937 16.6511 6.87229 15.8031 6.6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.8999 7.5C10.2099 5.3 11.2099 2.5 14.9999 2.5C19.9999 2.5 20.9999 6.5 20.9999 8.5C20.9999 10.5 19.9999 12.5 18.9999 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EngagementIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LeadsIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.4 15C19.1277 15.8031 19.0306 16.6511 19.115 17.4897C19.1994 18.3282 19.4627 19.1407 19.888 19.878C20.0637 20.1755 20.1064 20.5293 20.0071 20.8579C19.9077 21.1866 19.6738 21.4644 19.363 21.634C17.5 22.776 15.306 23.416 13 23.416C10.694 23.416 8.5 22.776 6.637 21.634C6.32623 21.4644 6.09227 21.1866 5.99289 20.8579C5.89351 20.5293 5.93624 20.1755 6.112 19.878C6.53734 19.1407 6.80058 18.3282 6.88498 17.4897C6.96937 16.6511 6.87229 15.8031 6.6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const JobsIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default AdvertiserOptionsDialog;
