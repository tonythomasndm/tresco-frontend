import { CheckCircle2, AlertTriangle, Fingerprint } from 'lucide-react';

export const InsightListsWidget = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-10">
      
      {/* Key Strengths */}
      <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-slate-100/80 h-full transition-transform hover:scale-[1.01]">
        <div className="flex items-center gap-3 mb-8">
           <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-emerald-600 stroke-[3]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
             </svg>
           </div>
           <h3 className="font-black text-[#1a365d] text-lg tracking-tight">Key Strengths</h3>
        </div>
        
        <ul className="space-y-5">
          <li className="flex items-start gap-4">
             <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
             <p className="text-[13px] text-slate-600 leading-snug font-bold">Zero-Friction Transition from theory to implementation</p>
          </li>
          <li className="flex items-start gap-4">
             <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
             <p className="text-[13px] text-slate-600 leading-snug font-bold">Exceptional Algorithmic Density scores</p>
          </li>
          <li className="flex items-start gap-4">
             <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
             <p className="text-[13px] text-slate-600 leading-snug font-bold">Verified proficiency in Distributed Systems</p>
          </li>
        </ul>
      </div>

      {/* Risk Considerations */}
      <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-slate-100/80 h-full transition-transform hover:scale-[1.01]">
        <div className="flex items-center gap-3 mb-8">
           <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100">
             <AlertTriangle className="w-5 h-5 text-orange-500 stroke-[3]" />
           </div>
           <h3 className="font-black text-[#1a365d] text-lg tracking-tight">Risk Considerations</h3>
        </div>
        
        <ul className="space-y-5">
          <li className="flex items-start gap-4">
             <div className="w-2.5 h-2.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
             <p className="text-[13px] text-slate-600 leading-snug font-bold">Low Network Resonance (LinkedIn profile sparse)</p>
          </li>
          <li className="flex items-start gap-4">
             <div className="w-2.5 h-2.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
             <p className="text-[13px] text-slate-600 leading-snug font-bold">Minimal Peer Endorsements relative to technical skill</p>
          </li>
          <li className="flex items-start gap-4">
             <div className="w-2.5 h-2.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
             <p className="text-[13px] text-slate-600 leading-snug font-bold">Limited public Mentorship indicators</p>
          </li>
        </ul>
      </div>

    </div>
  );
};

export const IntegrityVerifiedCard = () => {
  return (
    <div className="bg-[#1a365d] rounded-[1.5rem] p-8 shadow-xl shadow-blue-900/10 relative overflow-hidden h-full flex flex-col justify-between group">
       {/* Background accent abstract */}
       <div className="absolute right-0 top-0 opacity-40 pointer-events-none transition-transform group-hover:scale-110 duration-700" style={{ width: '150%', height: '150%', transform: 'translate(20%, -20%)'}}>
         <div style={{ backgroundImage: 'radial-gradient(circle at center, rgba(147, 197, 253, 0.25) 0%, transparent 60%)', width: '100%', height: '100%' }}></div>
       </div>

       <div className="relative z-10">
         <div className="flex items-center justify-between mb-8">
           <h3 className="text-white font-black text-sm uppercase tracking-widest">Integrity Verified</h3>
           <Fingerprint className="text-blue-300 w-6 h-6 opacity-80" />
         </div>
         <p className="text-[13px] text-blue-100/70 leading-relaxed font-bold">
           Cross-domain cross-referencing audit completed 2 hours ago.
         </p>
       </div>
       
       <button className="relative z-10 bg-white/10 hover:bg-white/20 transition-all text-white text-[10px] font-black tracking-[0.2em] uppercase py-3 px-6 rounded-xl self-start mt-8 w-auto border border-white/10 shadow-lg backdrop-blur-md active:scale-95">
         View Full Log
       </button>
    </div>
  );
};
