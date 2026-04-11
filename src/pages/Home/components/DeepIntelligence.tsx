import { ShieldCheck, Target, CheckCircle } from 'lucide-react';
import dashboardImage from '../../../assets/dashboard_mockup.png';

const DeepIntelligence = () => {
  return (
    <section id='solutions'className="w-full bg-[#2b333e] text-white py-24 lg:py-32 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Left: Dashboard Mockup */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent z-10 pointer-events-none"></div>
            <img 
              src={dashboardImage} 
              alt="Intelligence Dashboard" 
              className="w-full h-auto object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Right: Content details */}
          <div className="flex flex-col space-y-10 lg:pl-8">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-tight">
              Clarity through <br />
              <span className="text-[#a1bcdc]">Deep Intelligence.</span>
            </h2>

            <div className="space-y-8">
              {/* Feature 1 */}
              <div className="flex items-start gap-4">
                <div className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5 border border-white/20">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1.5 tracking-wide">Behavioral Integrity</h4>
                  <p className="text-sm font-medium text-slate-400 leading-relaxed">
                    Cross-referencing historical patterns to ensure genuine fit.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4">
                <div className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5 border border-white/20">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1.5 tracking-wide">Technical Calibration</h4>
                  <p className="text-sm font-medium text-slate-400 leading-relaxed">
                    Scores that reflect actual problem-solving depth, not just keywords.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4">
                <div className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5 border border-white/20">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1.5 tracking-wide">Bias-Free Auditing</h4>
                  <p className="text-sm font-medium text-slate-400 leading-relaxed">
                    Engineered to neutralize gender, ethnic, and institutional bias.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DeepIntelligence;
