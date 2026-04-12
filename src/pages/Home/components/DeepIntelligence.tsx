import { ShieldCheck, Target, CheckCircle, ArrowUpRight } from 'lucide-react';
import dashboardImage from '../../../assets/dashboard_mockup.png';

const DeepIntelligence = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      title: 'Behavioral Integrity',
      description: 'Cross-referencing historical patterns to ensure genuine fit.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Target className="w-5 h-5 text-white" />,
      title: 'Technical Calibration',
      description: 'Scores that reflect actual problem-solving depth, not just keywords.',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-white" />,
      title: 'Bias-Free Auditing',
      description: 'Engineered to neutralize gender, ethnic, and institutional bias.',
      gradient: 'from-emerald-500 to-teal-600'
    }
  ];

  return (
    <section id='solutions' className="w-full bg-gradient-to-br from-[#0a152e] via-[#111d35] to-[#1a365d] text-white py-28 lg:py-36 font-sans relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-16 items-center">
          
          {/* Left: Dashboard Mockup */}
          <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-black/30 border border-white/10 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent z-10 pointer-events-none"></div>
            <img 
              src={dashboardImage} 
              alt="Intelligence Dashboard" 
              className="w-full h-auto object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Floating metric */}
            <div className="absolute bottom-6 right-6 z-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white text-lg font-black">98.4%</p>
                <p className="text-blue-200/60 text-[9px] font-bold uppercase tracking-widest">Accuracy</p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col space-y-10 lg:pl-4">
            <div>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-blue-200 text-[10px] font-bold uppercase tracking-[0.15em] mb-6 border border-white/10">
                DEEP ANALYSIS
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white leading-tight">
                Clarity through <br />
                <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Deep Intelligence.</span>
              </h2>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 bg-white/5 rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-all hover:border-white/20 group">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1.5 tracking-wide">{feature.title}</h4>
                    <p className="text-sm font-medium text-blue-200/60 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DeepIntelligence;
