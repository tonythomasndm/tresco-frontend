import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Search, Shield, AlertTriangle, Fingerprint, Activity, Code, Settings, FileText, CheckCircle2 } from 'lucide-react';

export const MobileTopNav = () => {
  return (
    <nav className="h-20 px-4 bg-transparent flex items-center justify-between lg:hidden pt-4 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm">
           <img src="https://ui-avatars.com/api/?name=Alpha&background=1a365d&color=fff" alt="avatar" className="w-full h-full object-cover" />
        </div>
        <span className="font-black text-[#1a365d] text-base tracking-tight">Trust Score</span>
      </div>
      <button className="p-2 text-[#1a365d] hover:bg-slate-100 rounded-full transition-colors"><Search className="w-5 h-5 stroke-[2.5]"/></button>
    </nav>
  );
};

export const MobileAuthenticityWidget = () => {
  const scoreData = [
    { name: 'Score', value: 845 },
    { name: 'Remaining', value: 155 }
  ];
  return (
    <div className="bg-[#1a365d] rounded-[2rem] p-8 shadow-xl flex flex-col items-center justify-center lg:hidden mt-2 relative overflow-hidden animate-fade-in-up border border-white/5">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 opacity-5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

      <h3 className="text-[9px] text-blue-200/60 font-black tracking-[0.3em] uppercase mb-8 z-10">Overall Authenticity</h3>
      
      <div className="relative w-52 h-52 mb-8 z-10 transition-transform hover:scale-105 duration-500">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={scoreData}
              cx="50%"
              cy="50%"
              innerRadius="82%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              isAnimationActive={true}
            >
              <Cell fill="#ffffff" />
              <Cell fill="rgba(255,255,255,0.12)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Centered Score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
           <span className="text-6xl font-black tracking-tight mb-1">845</span>
           <span className="text-[10px] font-bold text-blue-200/50 uppercase tracking-widest">/ 1000</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 bg-white/10 rounded-full px-5 py-2 z-10 border border-white/10 shadow-lg backdrop-blur-md animate-pulse-subtle">
        <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
        <span className="text-[10px] font-black text-white uppercase tracking-[0.15em]">High Trust Tier</span>
      </div>
    </div>
  );
};

export const AttributeComparisonWidget = () => {
  return (
    <div className="lg:hidden mt-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <h3 className="text-[9px] text-slate-400 font-black tracking-[0.2em] uppercase mb-5 px-1">Attribute Comparison</h3>
      
      <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100/80 space-y-6">
        {/* Tech Integrity */}
        <div>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-blue-50 rounded-lg"><Code className="w-3.5 h-3.5 text-[#1a365d]" /></div>
              <span className="text-[11px] font-black text-slate-800 uppercase tracking-wide">Tech Integrity</span>
            </div>
            <span className="text-[11px] font-black text-[#1a365d]">98% Match</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-[#1a365d] rounded-full shadow-sm" style={{ width: '98%' }}></div>
          </div>
        </div>

        {/* Social Cross-Ref */}
        <div>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-red-50 rounded-lg"><Activity className="w-3.5 h-3.5 text-red-500" /></div>
              <span className="text-[11px] font-black text-slate-800 uppercase tracking-wide">Social Cross-Ref</span>
            </div>
            <span className="text-[11px] font-black text-red-500">Moderate</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-red-400 rounded-full shadow-sm" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileDonut = ({ score, name }: { score: number, name: string }) => {
  const data = [{ value: score }, { value: 100 - score }];
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100/80 shadow-sm flex flex-col items-center flex-1 min-w-[70px] transition-transform active:scale-95">
      <div className="w-14 h-14 relative mb-2.5">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius="72%" outerRadius="100%" startAngle={90} endAngle={-270} dataKey="value" stroke="none" isAnimationActive={true}>
              <Cell fill="#1a365d" />
              <Cell fill="#f1f5f9" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-black text-[#1a365d] tracking-tighter">{score}</span>
        </div>
      </div>
      <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest text-center">{name}</span>
    </div>
  );
};

export const MobileSourceHealthWidget = () => {
  return (
    <div className="lg:hidden mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <h3 className="text-[9px] text-slate-400 font-black tracking-[0.2em] uppercase mb-4 px-1">Source Health</h3>
      <div className="grid grid-cols-4 gap-3">
         <MobileDonut score={92} name="LC" />
         <MobileDonut score={88} name="GH" />
         <MobileDonut score={74} name="LI" />
         <MobileDonut score={65} name="SO" />
      </div>
    </div>
  );
};

export const MobileKeyInsightWidget = () => {
  return (
    <div className="lg:hidden mt-10 bg-[#f8fafc] rounded-2xl p-6 border border-slate-100 mb-28 animate-fade-in-up shadow-sm" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-1.5 bg-blue-50 rounded-lg border border-blue-100">
           <Fingerprint className="w-4 h-4 text-[#1a365d]" />
        </div>
        <h3 className="text-[11px] text-[#1a365d] font-black tracking-[0.15em] uppercase">Key Insight</h3>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-5">
         <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-[9px] font-black px-2.5 py-1.5 rounded-md uppercase tracking-wider border border-emerald-100 shadow-sm transition-transform hover:scale-105">
           <Shield className="w-3 h-3" /> Low Risk
         </span>
         <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-[9px] font-black px-2.5 py-1.5 rounded-md uppercase tracking-wider border border-blue-100 shadow-sm transition-transform hover:scale-105">
           <Code className="w-3 h-3" /> Expert Code
         </span>
         <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-[9px] font-black px-2.5 py-1.5 rounded-md uppercase tracking-wider border border-orange-100 shadow-sm transition-transform hover:scale-105">
           <AlertTriangle className="w-3 h-3" /> Social Gap
         </span>
      </div>

      <p className="text-xs text-[#1a365d] leading-relaxed font-bold">
        Authentic technical profile with <span className="font-black text-blue-600 underline underline-offset-4 decoration-blue-200">98% commit frequency match.</span> Recommended for technical hire despite moderate social footprint.
      </p>
    </div>
  );
};

export const MobileBottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex items-center justify-around px-4 py-4 lg:hidden z-30 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] pb-safe rounded-t-[1.5rem]">
      <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-[#1a365d] transition-all px-4 py-2 hover:scale-110">
         <FileText className="w-5 h-5 stroke-[2.5]" />
         <span className="text-[10px] font-black uppercase tracking-widest">Reports</span>
      </button>
      <button className="flex flex-col items-center gap-1.5 bg-[#1a365d] text-white px-8 py-2.5 rounded-2xl transition-all shadow-xl shadow-blue-900/20 active:scale-95 scale-105">
         <Activity className="w-5 h-5 stroke-[2.5]" />
         <span className="text-[10px] font-black uppercase tracking-widest">Strategy</span>
      </button>
      <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-[#1a365d] transition-all px-4 py-2 hover:scale-110">
         <Settings className="w-5 h-5 stroke-[2.5]" />
         <span className="text-[10px] font-black uppercase tracking-widest">Settings</span>
      </button>
    </div>
  );
};
