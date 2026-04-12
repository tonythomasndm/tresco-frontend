import { CheckCircle2, AlertTriangle, Lightbulb, TrendingUp, ArrowRight } from 'lucide-react';

export const InsightListsWidget = () => {
  const pros = [
    "Zero-Friction Transition from theory to implementation",
    "Exceptional Algorithmic Density scores across platforms",
    "Verified proficiency in Distributed Systems design"
  ];

  const cons = [
    "Low Network Resonance — LinkedIn profile is sparse",
    "Minimal Peer Endorsements relative to technical skill",
    "Limited public Mentorship or community leadership indicators"
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      
      {/* Pros */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#0a152e] tracking-tight">Pros</h3>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">{pros.length} strengths found</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {pros.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-emerald-50/50 border border-emerald-100/60 rounded-xl p-4 hover:bg-emerald-50 transition-colors">
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 mt-0.5 shrink-0" />
              <p className="text-[13px] text-slate-700 leading-relaxed font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cons */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#0a152e] tracking-tight">Cons</h3>
            <p className="text-[10px] text-orange-600 font-bold uppercase tracking-widest">{cons.length} concerns flagged</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {cons.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-orange-50/50 border border-orange-100/60 rounded-xl p-4 hover:bg-orange-50 transition-colors">
              <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 shrink-0" />
              <p className="text-[13px] text-slate-700 leading-relaxed font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export const ImprovementsWidget = () => {
  const improvements = [
    {
      title: "Strengthen LinkedIn Presence",
      description: "Add detailed project descriptions, gather 5+ skill endorsements, and publish technical articles.",
      impact: "High",
      color: "from-emerald-500 to-teal-600",
      badgeBg: "bg-emerald-100 text-emerald-700"
    },
    {
      title: "Increase Open Source Contributions",
      description: "Contribute to 2-3 active open source projects to demonstrate collaboration skills.",
      impact: "Medium",
      color: "from-blue-500 to-indigo-600",
      badgeBg: "bg-blue-100 text-blue-700"
    },
    {
      title: "Build Peer Network",
      description: "Engage in code reviews, mentor juniors, and participate in tech communities.",
      impact: "Medium",
      color: "from-violet-500 to-purple-600",
      badgeBg: "bg-violet-100 text-violet-700"
    },
    {
      title: "Diversify Platform Activity",
      description: "Answer on Stack Overflow and participate in HackerRank challenges regularly.",
      impact: "Moderate",
      color: "from-amber-500 to-orange-600",
      badgeBg: "bg-amber-100 text-amber-700"
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#0a152e] tracking-tight">Improvements</h3>
            <p className="text-[10px] text-violet-600 font-bold uppercase tracking-widest">Actionable recommendations</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {improvements.map((item, index) => (
          <div 
            key={index}
            className="bg-[#fafbfc] rounded-2xl p-5 border border-slate-100 hover:border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-default"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-[#0a152e] leading-tight">{item.title}</h4>
                <p className="text-[12px] text-slate-400 leading-relaxed mt-1">{item.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100/80">
              <span className={`text-[9px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${item.badgeBg}`}>
                {item.impact} Impact
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
