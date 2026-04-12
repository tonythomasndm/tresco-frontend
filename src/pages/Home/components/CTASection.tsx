import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <section id="how-it-works" className="w-full bg-white py-24 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0f1d35] via-[#152847] to-[#1a365d] rounded-[2.5rem] p-12 lg:p-20 text-center shadow-2xl shadow-blue-900/20 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-400/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/5 rounded-full blur-[80px]" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-[0.15em]">Start Your Journey</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white mb-6 leading-tight">
              Ready to hire with<br />precision?
            </h2>
            <p className="text-[#a1bcdc] text-lg font-medium mb-10 max-w-2xl mx-auto">
              Join 500+ forward-thinking teams using Tresco to build high-performance cultures.
            </p>
            <Link 
              to={isLoggedIn ? "/connect" : "/login"} 
              className="group inline-flex items-center justify-center gap-2.5 bg-white text-[#0a152e] px-10 py-4.5 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-2xl shadow-black/20 hover:-translate-y-0.5 active:scale-[0.98] text-sm"
            >
              {isLoggedIn ? "Go to Analysis" : "Get Started Free"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
