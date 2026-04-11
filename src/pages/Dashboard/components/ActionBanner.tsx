import { ThumbsUp, Shield, Users, Activity } from 'lucide-react';

export const ActionBanner = () => {
  return (
    <div className="bg-white rounded-[1.5rem] p-8 mt-4 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-10">
      
      <div className="flex flex-col md:flex-row items-center gap-12 flex-1">
        {/* Recommend Block */}
        <div className="flex items-center gap-5">
           <div className="w-16 h-16 bg-[#f0fdf4] rounded-2xl flex items-center justify-center shrink-0 border border-emerald-100 shadow-sm shadow-emerald-100/50">
             <ThumbsUp className="w-7 h-7 text-emerald-500" />
           </div>
           <div>
             <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.1em] mb-1">Strong Hire</h4>
             <p className="text-xs font-bold text-slate-800">Clear indicator setup.</p>
           </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-12 bg-slate-100"></div>

        {/* Metrics Grid */}
        <div className="flex flex-wrap items-start gap-12">
           <div className="max-w-[160px]">
             <div className="flex items-center gap-2 mb-2">
               <Shield className="w-4 h-4 text-[#1a365d]" />
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Data Integrity</p>
             </div>
             <p className="text-[11px] text-slate-600 font-bold leading-relaxed">
               98.4% consistency found across 14 primary technical data sources.
             </p>
           </div>
           
           <div className="max-w-[160px]">
             <div className="flex items-center gap-2 mb-2">
               <Users className="w-4 h-4 text-slate-400" />
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Team Fit</p>
             </div>
             <p className="text-[11px] text-slate-600 font-bold leading-relaxed">
               Technical aptitude high; Recommend focus on collaboration.
             </p>
           </div>

           <div className="max-w-[160px] hidden xl:block">
             <div className="flex items-center gap-2 mb-2">
               <Activity className="w-4 h-4 text-slate-300" />
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Risk Profile</p>
             </div>
             <p className="text-[11px] text-slate-600 font-bold leading-relaxed">
               Lowest risk decile for technical credentials.
             </p>
           </div>
        </div>
      </div>

      <button className="w-full lg:w-auto bg-[#1a365d] hover:bg-[#0f172a] text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-xl px-10 py-5 transition-all shadow-xl shadow-blue-900/20 active:scale-95 hover:shadow-blue-900/10">
        Approve Candidate
      </button>

    </div>
  );
};
