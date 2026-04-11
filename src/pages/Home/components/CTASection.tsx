import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);
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
              to={isLoggedIn ? "/connect" : "/login"} 
              className="inline-flex items-center justify-center gap-2 bg-[#0a152e] text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {isLoggedIn ? "Go to Analysis" : "Get Started Now"}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
