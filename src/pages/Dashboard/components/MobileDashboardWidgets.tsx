import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Activity, Settings, FileText, CheckCircle2, Lightbulb, TrendingUp, Download } from 'lucide-react';

const getStoredData = () => {
  try {
    const data = localStorage.getItem('trustscore_data');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const splitSentences = (text: string) => {
  if (!text) return [];
  return text.split(/(?<=[.?!])\s+/).filter(s => s.trim().length > 0);
};

export const MobileTopNav = () => {
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <nav className="h-20 px-4 bg-transparent flex items-center justify-between lg:hidden pt-4 animate-fade-in-up print:hidden">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm">
           <img src="https://ui-avatars.com/api/?name=Alpha&background=1a365d&color=fff" alt="avatar" className="w-full h-full object-cover" />
        </div>
        <span className="font-black text-[#1a365d] text-base tracking-tight">TrustScore</span>
      </div>
      <button 
        onClick={handleDownloadPDF}
        className="p-2 text-[#1a365d] hover:bg-slate-100 rounded-full transition-colors"
        title="Download Report"
      >
        <Download className="w-5 h-5 stroke-[2.5]"/>
      </button>
    </nav>
  );
};

export const MobileAuthenticityWidget = () => {
  const apiData = getStoredData();
  const rawScore = apiData?.score ? apiData.score : 84.5;
  const displayScore = Math.round(rawScore * 10); // scale up to 1000

  const scoreData = [
    { name: 'Score', value: displayScore },
    { name: 'Remaining', value: 1000 - displayScore }
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
           <span className="text-6xl font-black tracking-tight mb-1">{displayScore}</span>
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
  const apiData = getStoredData();
  const getScore = (key: string, defaultScore: number) => {
     return apiData?.platform_scores?.[key] ?? defaultScore;
  };

  return (
    <div className="lg:hidden mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <h3 className="text-[9px] text-slate-400 font-black tracking-[0.2em] uppercase mb-4 px-1">Platform Weightage</h3>
      <div className="grid grid-cols-5 gap-2">
         <MobileDonut score={getScore('leetcode', 92)} name="LC" />
         <MobileDonut score={getScore('github', 88)} name="GH" />
         <MobileDonut score={getScore('linkedin', 74)} name="LI" />
         <MobileDonut score={getScore('stack_overflow', 65)} name="SO" />
         <MobileDonut score={getScore('hackerrank', 78)} name="HR" />
      </div>
    </div>
  );
};

export const MobileProsConsWidget = () => {
  const apiData = getStoredData();
  const defaultPros = [
    "Zero-Friction Transition from theory to implementation",
    "Exceptional Algorithmic Density scores",
    "Verified proficiency in Distributed Systems"
  ];
  const pros = apiData?.pros ? splitSentences(apiData.pros) : defaultPros;

  const defaultCons = [
    "Low Network Resonance (LinkedIn profile sparse)",
    "Minimal Peer Endorsements relative to technical skill",
    "Limited public Mentorship indicators"
  ];
  const cons = apiData?.cons ? splitSentences(apiData.cons) : defaultCons;

  return (
    <div className="lg:hidden mt-8 space-y-5 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
      {/* Pros */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100/80 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <h3 className="text-[11px] text-[#1a365d] font-black tracking-[0.15em] uppercase">Pros</h3>
        </div>
        <ul className="space-y-3">
          {pros.map((pro: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <p className="text-[12px] text-slate-600 leading-snug font-bold">{pro}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100/80 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-1.5 bg-orange-50 rounded-lg border border-orange-100">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
          </div>
          <h3 className="text-[11px] text-[#1a365d] font-black tracking-[0.15em] uppercase">Cons</h3>
        </div>
        <ul className="space-y-3">
          {cons.map((con: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 shrink-0" />
              <p className="text-[12px] text-slate-600 leading-snug font-bold">{con}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const MobileImprovementsWidget = () => {
  const apiData = getStoredData();

  const defaultImprovements = [
    {
      title: "Strengthen LinkedIn Presence",
      description: "Add detailed project descriptions and gather skill endorsements.",
      impact: "High",
      impactColor: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      title: "Increase Open Source Contributions",
      description: "Contribute to active open source projects beyond personal repos.",
      impact: "Medium",
      impactColor: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      title: "Build Peer Network",
      description: "Engage in code reviews and mentor junior developers.",
      impact: "Medium",
      impactColor: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      title: "Diversify Platform Activity",
      description: "Answer on Stack Overflow and participate in Kaggle competitions.",
      impact: "Moderate",
      impactColor: "bg-amber-50 text-amber-600 border-amber-100"
    }
  ];

  let improvementsList = defaultImprovements;
  if (apiData?.improvements) {
    const sentences = splitSentences(apiData.improvements);
    improvementsList = sentences.map((sent, i) => {
      const styles = [
        { impact: "High", impactColor: "bg-emerald-50 text-emerald-600 border-emerald-100" },
        { impact: "Medium", impactColor: "bg-blue-50 text-blue-600 border-blue-100" },
        { impact: "Medium", impactColor: "bg-violet-50 text-violet-600 border-violet-100" },
        { impact: "Moderate", impactColor: "bg-amber-50 text-amber-600 border-amber-100" }
      ];
      const style = styles[i % styles.length];
      return {
        title: `Improvement Priority ${i + 1}`,
        description: sent,
        ...style
      };
    });
  }

  return (
    <div className="lg:hidden mt-8 mb-28 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center gap-2.5 mb-4 px-1">
        <div className="p-1.5 bg-violet-50 rounded-lg border border-violet-100">
          <Lightbulb className="w-4 h-4 text-violet-600" />
        </div>
        <h3 className="text-[11px] text-[#1a365d] font-black tracking-[0.15em] uppercase">Improvements</h3>
      </div>
      
      <div className="space-y-3">
        {improvementsList.map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-4 border border-slate-100/80 shadow-sm">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-6 h-6 rounded-lg bg-violet-50 flex items-center justify-center border border-violet-100">
                <TrendingUp className="w-3 h-3 text-violet-600" />
              </div>
              <h4 className="text-[12px] font-black text-[#1a365d]">{item.title}</h4>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium mb-2 pl-8">{item.description}</p>
            <div className="pl-8">
              <span className={`inline-block text-[7px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest border ${item.impactColor}`}>
                {item.impact}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const MobileBottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex items-center justify-around px-4 py-4 lg:hidden z-30 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] pb-safe rounded-t-[1.5rem] print:hidden">
      <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-[#1a365d] transition-all px-4 py-2 hover:scale-110">
         <FileText className="w-5 h-5 stroke-[2.5]" />
         <span className="text-[10px] font-black uppercase tracking-widest">Reports</span>
      </button>
      <button className="flex flex-col items-center gap-1.5 bg-[#1a365d] text-white px-8 py-2.5 rounded-2xl transition-all shadow-xl shadow-blue-900/20 active:scale-95 scale-105">
         <Activity className="w-5 h-5 stroke-[2.5]" />
         <span className="text-[10px] font-black uppercase tracking-widest">Dashboard</span>
      </button>
      <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-[#1a365d] transition-all px-4 py-2 hover:scale-110">
         <Settings className="w-5 h-5 stroke-[2.5]" />
         <span className="text-[10px] font-black uppercase tracking-widest">Settings</span>
      </button>
    </div>
  );
};
