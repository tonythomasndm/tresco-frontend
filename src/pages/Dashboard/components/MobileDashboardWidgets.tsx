import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Activity, Settings, FileText, CheckCircle2, Lightbulb, TrendingUp, Download, Award } from 'lucide-react';

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
    <nav className="h-20 px-4 bg-transparent flex items-center justify-end lg:hidden pt-4 animate-fade-in-up print:hidden">
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
  const displayScore = Math.round(rawScore); // scale up to 1000

  const scoreData = [
    { name: 'Score', value: displayScore },
    { name: 'Remaining', value: 1000 - displayScore }
  ];

  return (
    <div className="bg-gradient-to-r from-[#0f1d35] via-[#15253f] to-[#1a365d] rounded-3xl p-6 shadow-2xl shadow-blue-950/20 relative overflow-hidden lg:hidden mt-2 animate-fade-in-up border border-white/5">
      {/* Background blurs */}
      <div className="absolute top-[-30%] right-[-10%] w-[250px] h-[250px] bg-blue-500/10 rounded-full blur-[60px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[200px] h-[200px] bg-indigo-500/10 rounded-full blur-[50px]" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Donut Chart */}
        <div className="relative w-48 h-48 shrink-0 group pt-2">
          <div className="absolute inset-[-6px] bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all duration-700" />
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={scoreData}
                cx="50%"
                cy="50%"
                innerRadius="78%"
                outerRadius="100%"
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
                isAnimationActive={true}
              >
                <Cell fill="url(#mobileScoreGradient)" />
                <Cell fill="rgba(255,255,255,0.06)" />
              </Pie>
              <defs>
                <linearGradient id="mobileScoreGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black leading-none tracking-tighter text-white">
              {displayScore}
            </span>
            <span className="text-[10px] font-bold text-blue-300/40 uppercase tracking-widest mt-1">
              / 1000
            </span>
          </div>
        </div>

        {/* Score Info */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-[9px] text-blue-200/60 font-black tracking-[0.3em] uppercase">
              Overall Trust Score
            </span>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-white leading-tight">
            High Authenticity Candidate
          </h2>

          <p className="text-xs font-medium leading-relaxed text-blue-200/50 mb-1">
            This candidate demonstrates strong technical credibility across all connected platforms with verified contributions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <div className="flex items-center gap-2 px-3 py-2 border bg-emerald-500/15 border-emerald-400/20 rounded-xl">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-300">+12.3%</span>
              <span className="text-[9px] text-emerald-300/60 font-medium uppercase tracking-wider">
                vs last
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 border bg-white/5 border-white/10 rounded-xl">
              <Award className="w-3.5 h-3.5 text-blue-300" />
              <span className="text-xs font-bold text-blue-200">
                Top 8% Cohort
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobilePlatformCard = ({
  name,
  score,
  color,
  bg,
  border,
}: {
  name: string;
  score: number;
  color: string;
  bg: string;
  border: string;
}) => {
  const data = [{ value: score }, { value: 100 - score }];
  return (
    <div
      className={`${bg} ${border} border rounded-2xl p-4 flex flex-col items-center text-center shadow-sm shrink-0 w-[140px] snap-center`}
    >
      {/* Donut */}
      <div className="relative w-16 h-16 mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="68%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              isAnimationActive={true}
            >
              <Cell fill={color} />
              <Cell fill="#e2e8f0" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-black text-slate-800">{score}</span>
        </div>
      </div>

      {/* Name + Progress */}
      <h4 className="mb-2 text-[11px] font-extrabold tracking-tight text-slate-700">
        {name}
      </h4>
      <div className="flex items-center w-full gap-2">
        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-700 rounded-full"
            style={{ width: `${score}%`, backgroundColor: color }}
          />
        </div>
        <span className="text-[9px] font-bold text-slate-400">{score}%</span>
      </div>
    </div>
  );
};

export const MobileSourceHealthWidget = () => {
  const apiData = getStoredData();
  const getScore = (key: string, defaultScore: number) => {
    return apiData?.platform_scores?.[key] ?? defaultScore;
  };

  const platforms = [
    {
      name: "LeetCode",
      key: "leetcode",
      defaultScore: 92,
      color: "#eab308",
      bg: "bg-yellow-50",
      border: "border-yellow-100",
    },
    {
      name: "GitHub",
      key: "github",
      defaultScore: 88,
      color: "#8b5cf6",
      bg: "bg-violet-50",
      border: "border-violet-100",
    },
    {
      name: "LinkedIn",
      key: "linkedin",
      defaultScore: 74,
      color: "#3b82f6",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      name: "StackOverflow",
      key: "stack_overflow",
      defaultScore: 65,
      color: "#f97316",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
    {
      name: "HackerRank",
      key: "hackerrank",
      defaultScore: 78,
      color: "#10b981",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
  ]
    .map((p) => {
      const rawScore = getScore(p.key, p.defaultScore);
      if (rawScore === -1) return null;
      return { ...p, score: Math.round(rawScore / 10) };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <div className="lg:hidden mt-8 animate-fade-in-up bg-white rounded-3xl p-5 border border-slate-100 shadow-sm" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[11px] text-[#1a365d] font-black tracking-[0.1em] uppercase">Platform Weightage</h3>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{platforms.length} Sources</span>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory pr-4 -mr-4 no-scrollbar border-b border-transparent">
        {platforms.map((p) => (
          <MobilePlatformCard
            key={p.name}
            name={p.name}
            score={p.score}
            color={p.color}
            bg={p.bg}
            border={p.border}
          />
        ))}
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
    <div className="lg:hidden mt-8 mb-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
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