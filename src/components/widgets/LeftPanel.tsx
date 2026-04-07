import { Activity } from 'lucide-react';

const LeftPanel = () => {
  return (
    <div className="relative w-full h-full min-h-[300px] lg:min-h-[100vh] flex flex-col justify-between p-8 lg:p-10 xl:p-16 text-white overflow-y-auto overflow-x-hidden bg-[#0B1E43]">
      {/* Background Gradient & Glow Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c2357] to-[#040b19] z-0 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#214b9c] rounded-full blur-[100px] opacity-30 z-0 pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 flex-grow flex flex-col justify-center lg:justify-start">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 mb-8 lg:mb-12 xl:mb-20 text-center lg:text-left mx-auto lg:mx-0">
          <div className="bg-white text-[#0a152e] p-2 rounded-xl h-12 w-12 flex items-center justify-center shadow-lg flex-shrink-0">
            <Activity className="w-7 h-7" strokeWidth={3} />
          </div>
          <div className="mt-2 lg:mt-0">
            <h1 className="text-2xl lg:text-xl font-bold tracking-tight">Analytical Architect</h1>
            <p className="text-[11px] lg:text-[10px] tracking-[0.2em] text-blue-200/80 uppercase font-bold lg:hidden mt-1">Precision Strategy Ecosystem</p>
          </div>
        </div>

        <div className="max-w-[400px] hidden lg:block">
          <h2 className="text-4xl xl:text-5xl font-bold leading-[1.1] tracking-tight mb-4 xl:mb-6">
            Master your <span className="text-[#8cb8ff]">strategic</span> data landscape.
          </h2>
          <p className="text-blue-100/70 text-base xl:text-lg leading-relaxed">
            Join the elite circle of strategists using high-fidelity precision to track, analyze, and optimize performance metrics in real-time.
          </p>
        </div>
      </div>

      {/* Decorative Chart Widget (Desktop Only) */}
      <div className="relative z-10 hidden lg:block mt-6 xl:mt-auto w-full max-w-[450px]">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 xl:p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          
          <div className="flex justify-between items-start mb-6 xl:mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg flex-shrink-0">
                <Activity className="w-4 h-4 text-blue-200" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-wider text-blue-200/60 uppercase">Current Trajectory</p>
                <p className="font-semibold text-white">Performance Alpha</p>
              </div>
            </div>
            <div className="text-lg xl:text-xl font-bold text-white">+14.2%</div>
          </div>

          <div className="flex items-end gap-2 h-20 xl:h-24 w-full relative z-10 mt-2">
            {[30, 45, 25, 60, 45, 80].map((height, i) => (
              <div 
                key={i} 
                className={`flex-1 rounded-t-sm transition-all duration-500 hover:opacity-100 ${i === 5 ? 'bg-[#73a8ff]' : 'bg-[#3e6bbd] opacity-50'}`}
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Floating User Badge */}
        <div className="absolute -bottom-4 right-2 xl:-bottom-5 xl:right-5 bg-white rounded-xl py-2 px-3 xl:py-3 xl:px-4 shadow-xl border border-slate-100 flex items-center gap-2 xl:gap-3">
          <div className="flex -space-x-2">
            <div className="w-6 h-6 xl:w-8 xl:h-8 rounded-full border-2 border-white bg-slate-300 overflow-hidden">
               <img src="https://i.pravatar.cc/100?img=47" alt="User" />
            </div>
            <div className="w-6 h-6 xl:w-8 xl:h-8 rounded-full border-2 border-white bg-slate-400 overflow-hidden">
               <img src="https://i.pravatar.cc/100?img=11" alt="User" />
            </div>
          </div>
          <span className="text-[9px] xl:text-[10px] font-bold tracking-widest text-[#0a152e] uppercase whitespace-nowrap">500+ Strategists Joined</span>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;