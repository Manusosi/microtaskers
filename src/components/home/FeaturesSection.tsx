
const FeaturesSection = () => {
  return (
    <section className="bg-white/80 backdrop-blur-sm py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Easy Tasks</h3>
            <p className="text-gray-600">Complete simple microtasks in minutes and earn rewards instantly</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Quick Payments</h3>
            <p className="text-gray-600">Get paid weekly through multiple payment methods worldwide</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Work Anywhere</h3>
            <p className="text-gray-600">Access tasks from any device, anywhere in the world</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
