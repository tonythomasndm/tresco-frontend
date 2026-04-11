import { ArrowRight, Activity, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../../../assets/hero_abstract_net.png';

const HeroSection = () => {
  return (
    <section className="relative w-full bg-white pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-6 border border-blue-100">
              TRUSTSCORE INTELLIGENCE
            </div>
            
            <h1 className="text-[42px] sm:text-[52px] lg:text-[64px] font-extrabold tracking-tight text-[#0a152e] leading-[1.1] mb-6">
              Verified Talent.<br />
              <span className="text-[#1c3c66]">Unbiased Scores.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-500 font-medium mb-10 max-w-xl leading-relaxed">
              Eliminate the guesswork in hiring. Our AI-driven precision lens analyzes skills, experience, and potential with mathematical accuracy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/signup" className="flex items-center justify-center gap-2 bg-[#1c3c66] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-[#122b4f] transition-all shadow-lg shadow-[#1c3c66]/20">
                Get Started
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <button className="flex items-center justify-center bg-slate-100 text-slate-700 px-8 py-3.5 rounded-lg font-semibold hover:bg-slate-200 transition-all border border-slate-200">
                View Sample Report
              </button>
            </div>
          </div>

          {/* Right Image/Graphic */}
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800">
            <img 
              src={heroImage} 
              alt="Data Network Grid" 
              className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen"
            />
            {/* Gradient Overlay for styling */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0a152e]/50 to-transparent"></div>
            
            {/* Floating Badge 1 */}
            <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-xl flex items-center gap-3 animate-pulse border border-white/20">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">REAL-TIME ANALYSIS</p>
                <p className="text-sm font-extrabold text-slate-800">Precision Matched</p>
              </div>
            </div>

            {/* Floating Badge 2 */}
            <div className="absolute bottom-10 left-8 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-xl flex items-center gap-3 border border-white/20">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">TRUST GUARANTEE</p>
                <p className="text-sm font-extrabold text-slate-800">100% Verified</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
