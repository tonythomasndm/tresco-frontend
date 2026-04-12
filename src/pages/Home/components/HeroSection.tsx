import { useState, useEffect } from 'react';
import { ArrowRight, Activity, ShieldCheck, Zap, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../../../assets/hero_abstract_net.png';

const HeroSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <section className="relative w-full bg-gradient-to-b from-white via-white to-blue-50/30 pt-16 pb-24 lg:pt-24 lg:pb-36 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-50/50 to-transparent rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-6 border border-blue-100">
              TRESCO INTELLIGENCE
            </div>
            
            <h1 className="text-[40px] sm:text-[52px] lg:text-[64px] font-extrabold tracking-tight text-[#0a152e] leading-[1.05] mb-6">
              Verified Talent.<br />
              <span className="bg-gradient-to-r from-[#1a365d] to-[#2b5a9e] bg-clip-text text-transparent">Unbiased Scores.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-500 font-medium mb-10 max-w-xl leading-relaxed">
              Eliminate the guesswork in hiring. Our AI-driven precision lens analyzes skills, experience, and potential with mathematical accuracy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to={isLoggedIn ? "/connect" : "/login"} className="group flex items-center justify-center gap-2 bg-gradient-to-r from-[#1a365d] to-[#2b5a9e] text-white px-8 py-4 rounded-2xl font-semibold hover:from-[#122b4f] hover:to-[#1e4a8a] transition-all shadow-xl shadow-blue-900/20 hover:shadow-blue-900/30 hover:-translate-y-0.5 active:scale-[0.98]">
                {isLoggedIn ? "Go to Analysis" : "Get Started Free"}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#how-it-works" className="flex items-center justify-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-2xl font-semibold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm">
                Learn More
              </a>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-slate-100">
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black text-[#0a152e]">500+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Teams Active</p>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black text-[#0a152e]">98.4%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Accuracy Rate</p>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black text-[#0a152e]">2M+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Profiles Scored</p>
              </div>
            </div>
          </div>

          {/* Right Image/Graphic */}
          <div className="relative w-full h-[420px] lg:h-[520px] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-300/50 border border-slate-200/50 group">
            <img 
              src={heroImage} 
              alt="Data Network Grid" 
              className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0a152e]/60 via-[#0a152e]/20 to-transparent"></div>
            
            {/* Floating Badge 1 */}
            <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl flex items-center gap-3 border border-white/50 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/25">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">REAL-TIME</p>
                <p className="text-sm font-extrabold text-slate-800">Precision Match</p>
              </div>
            </div>

            {/* Floating Badge 2 */}
            <div className="absolute bottom-10 left-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl flex items-center gap-3 border border-white/50 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/25">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">TRUST</p>
                <p className="text-sm font-extrabold text-slate-800">100% Verified</p>
              </div>
            </div>

            {/* Floating Badge 3 */}
            <div className="absolute top-1/2 -translate-y-1/2 left-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl flex items-center gap-3 border border-white/50 animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/25">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">SCORE</p>
                <p className="text-sm font-extrabold text-slate-800">845 / 1000</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
