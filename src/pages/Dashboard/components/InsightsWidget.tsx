import { CheckCircle2, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';

const getStoredData = () => {
  try {
    const data = localStorage.getItem('trustscore_data');
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

export const InsightListsWidget = () => {
  const apiData = getStoredData();

  const defaultPros = [
    "Zero-Friction Transition from theory to implementation",
    "Exceptional Algorithmic Density scores across platforms",
    "Verified proficiency in Distributed Systems design"
  ];
  const pros = apiData?.pros ? parseInsightItems(apiData.pros) : defaultPros;

  const defaultCons = [
    "Low Network Resonance — LinkedIn profile is sparse",
    "Minimal Peer Endorsements relative to technical skill",
    "Limited public Mentorship or community leadership indicators"
  ];
  const cons = apiData?.cons ? parseInsightItems(apiData.cons) : defaultCons;

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
  const apiData = getStoredData();

  const defaultImprovements = [
    {
      title: "Strengthen LinkedIn Presence",
      description: "Add detailed project descriptions, gather 5+ skill endorsements, and publish technical articles.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Increase Open Source Contributions",
      description: "Contribute to 2-3 active open source projects to demonstrate collaboration skills.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Build Peer Network",
      description: "Engage in code reviews, mentor juniors, and participate in tech communities.",
      color: "from-violet-500 to-purple-600"
    },
    {
      title: "Diversify Platform Activity",
      description: "Answer on Stack Overflow and participate in HackerRank challenges regularly.",
      color: "from-amber-500 to-orange-600"
    }
  ];

  let improvementsList = defaultImprovements;
  if (apiData?.improvements) {
    const sentences = parseInsightItems(apiData.improvements);
    improvementsList = sentences.map((sent, i) => {
      const styles = [
        { color: "from-emerald-500 to-teal-600" },
        { color: "from-blue-500 to-indigo-600" },
        { color: "from-violet-500 to-purple-600" },
        { color: "from-amber-500 to-orange-600" }
      ];
      const style = styles[i % styles.length];
      return {
        title: `Priority Optimization ${i + 1}`,
        description: sent,
        ...style
      };
    });
  }

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
        {improvementsList.map((item, index) => (
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
          </div>
        ))}
      </div>
    </div>
  );
};
