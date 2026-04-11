import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section id="how-it-works" className="w-full bg-[#f8fafc] py-20 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1c3c66] rounded-3xl p-12 lg:p-20 text-center shadow-2xl relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white mb-6">
              Ready to hire with precision?
            </h2>
            <p className="text-[#a1bcdc] text-lg font-medium mb-10 max-w-2xl mx-auto">
              Join 500+ forward-thinking teams using TrustScore to build high-performance cultures.
            </p>
            <Link 
              to="/signup" 
              className="inline-block bg-white text-[#1c3c66] font-bold px-10 py-4 rounded-xl hover:bg-slate-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
