
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RegistrationSection = () => {
  return (
    <section className="container mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Choose Your Path</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold mb-4">I want to complete tasks and earn money</h3>
          <p className="text-gray-600 mb-6">Find tasks and get paid for your work.</p>
          <Link to="/signup/tasker">
            <Button variant="outline" className="w-full rounded-full">Register as a Tasker</Button>
          </Link>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold mb-4">I want to post tasks and hire</h3>
          <p className="text-gray-600 mb-6">Post tasks and hire professionals.</p>
          <Link to="/signup/advertiser">
            <Button className="w-full bg-[#8511b4] hover:bg-[#7a0fa6] rounded-full">Register as an Advertiser</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
