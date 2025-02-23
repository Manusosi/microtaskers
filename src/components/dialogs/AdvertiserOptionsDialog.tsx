
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Rocket, BarChart3, Users, Target, Briefcase } from "lucide-react";

interface AdvertiserOptionsDialogProps {
  trigger: React.ReactNode;
}

const AdvertiserOptionsDialog = ({ trigger }: AdvertiserOptionsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl bg-gradient-to-br from-purple-100 via-purple-50 to-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#8511b4] to-purple-800">
            Microtaskers Ads offers many ways to advertise
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-8">
          <AdvertisingOption
            icon={<Rocket className="w-8 h-8" />}
            title="Traffic"
            bgColor="bg-gradient-to-br from-[#8511b4] to-purple-600"
          />
          <AdvertisingOption
            icon={<BarChart3 className="w-8 h-8" />}
            title="Sales"
            bgColor="bg-gradient-to-br from-[#8511b4] to-purple-600"
          />
          <AdvertisingOption
            icon={<Users className="w-8 h-8" />}
            title="Engagement"
            bgColor="bg-gradient-to-br from-[#8511b4] to-purple-600"
          />
          <AdvertisingOption
            icon={<Target className="w-8 h-8" />}
            title="Leads"
            bgColor="bg-gradient-to-br from-[#8511b4] to-purple-600"
          />
          <AdvertisingOption
            icon={<Briefcase className="w-8 h-8" />}
            title="Jobs"
            bgColor="bg-gradient-to-br from-[#8511b4] to-purple-600"
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
    <div className={`${bgColor} rounded-xl p-4 mx-auto w-20 h-20 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform`}>
      {icon}
    </div>
    <h3 className="font-semibold text-gray-800">{title}</h3>
  </div>
);

export default AdvertiserOptionsDialog;
