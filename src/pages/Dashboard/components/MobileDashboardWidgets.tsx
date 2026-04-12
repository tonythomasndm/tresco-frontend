import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  AlertTriangle,
  Activity,
  Settings,
  FileText,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
  Download,
} from "lucide-react";

const getStoredData = () => {
  try {
    const data = localStorage.getItem("trustscore_data");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const parseInsightItems = (text: string) => {
  if (!text) return [];

  const normalizedText = text.replace(/\s+/g, " ").trim();
  if (!normalizedText) return [];

  const markerRegex = /(?:^|\s)(\d+)\.\s+/g;
  const markers: Array<{ start: number; contentStart: number }> = [];
  let marker: RegExpExecArray | null;

  while ((marker = markerRegex.exec(normalizedText)) !== null) {
    const markerStart = marker.index + (marker[0].startsWith(" ") ? 1 : 0);
    markers.push({
      start: markerStart,
      contentStart: markerStart + marker[1].length + 2,
    });
  }

  if (markers.length >= 2) {
    return markers
      .map((current, index) => {
        const nextStart =
          index < markers.length - 1
            ? markers[index + 1].start
            : normalizedText.length;
        return normalizedText
          .slice(current.contentStart, nextStart)
          .trim()
          .replace(/^[\s,;:-]+|[\s,;:-]+$/g, "");
      })
      .filter(Boolean);
  }

  return normalizedText
    .split(/(?<=[.?!])\s+/)
    .map((entry) => entry.trim().replace(/^[\s,;:-]+|[\s,;:-]+$/g, ""))
    .filter(Boolean);
};

export const MobileTopNav = () => {
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <nav className="flex items-center justify-between h-20 px-4 pt-4 bg-transparent lg:hidden animate-fade-in-up print:hidden">
      <div className="flex items-center gap-3">
        <div className="overflow-hidden border-2 rounded-full shadow-sm w-9 h-9 border-slate-100">
          <img
            src="https://ui-avatars.com/api/?name=Alpha&background=1a365d&color=fff"
            alt="avatar"
            className="object-cover w-full h-full"
          />
        </div>
        <span className="font-black text-[#1a365d] text-base tracking-tight">
          TrustScore
        </span>
      </div>
      <button
        onClick={handleDownloadPDF}
        className="p-2 text-[#1a365d] hover:bg-slate-100 rounded-full transition-colors"
        title="Download Report"
      >
        <Download className="w-5 h-5 stroke-[2.5]" />
      </button>
    </nav>
  );
};

export const MobileAuthenticityWidget = () => {
  const apiData = getStoredData();
  const rawScore = Number(apiData?.score);

  const scoreData = [
    { name: "Score", value: rawScore },
    { name: "Remaining", value: Math.max(0, 1000 - rawScore) },
  ];
  return (
    <div className="bg-[#1a365d] rounded-[2rem] p-8 shadow-xl flex flex-col items-center justify-center lg:hidden mt-2 relative overflow-hidden animate-fade-in-up border border-white/5">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-32 h-32 translate-x-1/2 -translate-y-1/2 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 -translate-x-1/2 translate-y-1/2 bg-blue-300 rounded-full opacity-5 blur-2xl"></div>

      <h3 className="text-[9px] text-blue-200/60 font-black tracking-[0.3em] uppercase mb-8 z-10">
        Overall Authenticity
      </h3>

      <div className="relative z-10 mb-8 transition-transform duration-500 w-52 h-52 hover:scale-105">
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
          <span className="mb-1 text-6xl font-black tracking-tight">
            {rawScore}
          </span>
          <span className="text-[10px] font-bold text-blue-200/50 uppercase tracking-widest">
            / 1000
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 bg-white/10 rounded-full px-5 py-2 z-10 border border-white/10 shadow-lg backdrop-blur-md animate-pulse-subtle">
        <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
        <span className="text-[10px] font-black text-white uppercase tracking-[0.15em]">
          High Trust Tier
        </span>
      </div>
    </div>
  );
};

const MobileDonut = ({ score, name }: { score: number; name: string }) => {
  const data = [{ value: score }, { value: 100 - score }];
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100/80 shadow-sm flex flex-col items-center flex-1 min-w-[70px] transition-transform active:scale-95">
      <div className="w-14 h-14 relative mb-2.5">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="72%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              isAnimationActive={true}
            >
              <Cell fill="#1a365d" />
              <Cell fill="#f1f5f9" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-black text-[#1a365d] tracking-tighter">
            {score}
          </span>
        </div>
      </div>
      <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest text-center">
        {name}
      </span>
    </div>
  );
};

export const MobileSourceHealthWidget = () => {
  const apiData = getStoredData();
  const getScore = (key: string, defaultScore: number) => {
    return apiData?.platform_scores?.[key] ?? defaultScore;
  };
  const platforms = [
    { key: "leetcode", defaultScore: 92, name: "LC" },
    { key: "github", defaultScore: 88, name: "GH" },
    { key: "linkedin", defaultScore: 74, name: "LI" },
    { key: "stack_overflow", defaultScore: 65, name: "SO" },
    { key: "hackerrank", defaultScore: 78, name: "HR" },
  ]
    .map((platform) => {
      const rawScore = Number(getScore(platform.key, platform.defaultScore));
      if (rawScore === -1) return null;

      const normalizedScore = rawScore > 100 ? rawScore / 10 : rawScore;
      if (normalizedScore < 0) return null;

      return {
        ...platform,
        score: Math.max(0, Math.min(100, Math.round(normalizedScore))),
      };
    })
    .filter(
      (platform): platform is NonNullable<typeof platform> => platform !== null,
    );

  return (
    <div
      className="mt-8 lg:hidden animate-fade-in-up"
      style={{ animationDelay: "0.2s" }}
    >
      <h3 className="text-[9px] text-slate-400 font-black tracking-[0.2em] uppercase mb-4 px-1">
        Platform Weightage
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {platforms.map((platform) => (
          <MobileDonut
            key={platform.key}
            score={platform.score}
            name={platform.name}
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
    "Verified proficiency in Distributed Systems",
  ];
  const pros = apiData?.pros ? parseInsightItems(apiData.pros) : defaultPros;

  const defaultCons = [
    "Low Network Resonance (LinkedIn profile sparse)",
    "Minimal Peer Endorsements relative to technical skill",
    "Limited public Mentorship indicators",
  ];
  const cons = apiData?.cons ? parseInsightItems(apiData.cons) : defaultCons;

  return (
    <div
      className="mt-8 space-y-5 lg:hidden animate-fade-in-up"
      style={{ animationDelay: "0.25s" }}
    >
      {/* Pros */}
      <div className="p-5 bg-white border shadow-sm rounded-2xl border-slate-100/80">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <h3 className="text-[11px] text-[#1a365d] font-black tracking-[0.15em] uppercase">
            Pros
          </h3>
        </div>
        <ul className="space-y-3">
          {pros.map((pro: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <p className="text-[12px] text-slate-600 leading-snug font-bold">
                {pro}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="p-5 bg-white border shadow-sm rounded-2xl border-slate-100/80">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-1.5 bg-orange-50 rounded-lg border border-orange-100">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
          </div>
          <h3 className="text-[11px] text-[#1a365d] font-black tracking-[0.15em] uppercase">
            Cons
          </h3>
        </div>
        <ul className="space-y-3">
          {cons.map((con: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 shrink-0" />
              <p className="text-[12px] text-slate-600 leading-snug font-bold">
                {con}
              </p>
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
      description:
        "Add detailed project descriptions and gather skill endorsements.",
    },
    {
      title: "Increase Open Source Contributions",
      description:
        "Contribute to active open source projects beyond personal repos.",
    },
    {
      title: "Build Peer Network",
      description: "Engage in code reviews and mentor junior developers.",
    },
    {
      title: "Diversify Platform Activity",
      description:
        "Answer on Stack Overflow and participate in Kaggle competitions.",
    },
  ];

  let improvementsList = defaultImprovements;
  if (apiData?.improvements) {
    const sentences = parseInsightItems(apiData.improvements);
    improvementsList = sentences.map((sent, i) => {
      return {
        title: `Improvement Priority ${i + 1}`,
        description: sent,
      };
    });
  }

  return (
    <div
      className="mt-8 lg:hidden mb-28 animate-fade-in-up"
      style={{ animationDelay: "0.3s" }}
    >
      <div className="flex items-center gap-2.5 mb-4 px-1">
        <div className="p-1.5 bg-violet-50 rounded-lg border border-violet-100">
          <Lightbulb className="w-4 h-4 text-violet-600" />
        </div>
        <h3 className="text-[11px] text-[#1a365d] font-black tracking-[0.15em] uppercase">
          Improvements
        </h3>
      </div>

      <div className="space-y-3">
        {improvementsList.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-white border shadow-sm rounded-xl border-slate-100/80"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="flex items-center justify-center w-6 h-6 border rounded-lg bg-violet-50 border-violet-100">
                <TrendingUp className="w-3 h-3 text-violet-600" />
              </div>
              <h4 className="text-[12px] font-black text-[#1a365d]">
                {item.title}
              </h4>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium mb-2 pl-8">
              {item.description}
            </p>
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
        <span className="text-[10px] font-black uppercase tracking-widest">
          Reports
        </span>
      </button>
      <button className="flex flex-col items-center gap-1.5 bg-[#1a365d] text-white px-8 py-2.5 rounded-2xl transition-all shadow-xl shadow-blue-900/20 active:scale-95 scale-105">
        <Activity className="w-5 h-5 stroke-[2.5]" />
        <span className="text-[10px] font-black uppercase tracking-widest">
          Dashboard
        </span>
      </button>
      <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-[#1a365d] transition-all px-4 py-2 hover:scale-110">
        <Settings className="w-5 h-5 stroke-[2.5]" />
        <span className="text-[10px] font-black uppercase tracking-widest">
          Settings
        </span>
      </button>
    </div>
  );
};
