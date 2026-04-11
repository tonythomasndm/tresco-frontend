import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { cn } from "../../../utils/cn";

export const TrustMatrixWidget = () => {
  const data = [
    { subject: 'CODE QUALITY', A: 94, B: 70, fullMark: 100 },
    { subject: 'ARCHITECTURE', A: 88, B: 65, fullMark: 100 },
    { subject: 'SOFT SKILLS', A: 71, B: 85, fullMark: 100 },
    { subject: 'COMMUNICATION', A: 82, B: 75, fullMark: 100 },
    { subject: 'COMMUNITY IMPACT', A: 65, B: 60, fullMark: 100 },
    { subject: 'PRESENCE', A: 50, B: 55, fullMark: 100 },
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col xl:flex-row items-center gap-12 h-full">
      {/* Chart Section */}
      <div className="flex-1 w-full">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-sm font-black text-[#1a365d] uppercase tracking-wider">Trust Dimension Matrix</h3>
          <div className="flex items-center gap-4 text-[9px] uppercase font-bold tracking-widest">
             <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#1a365d]"></div>Candidate Alpha</div>
             <div className="flex items-center gap-1.5 text-slate-300"><div className="w-2 h-2 rounded-full border border-slate-200"></div>Cohort Avg</div>
          </div>
        </div>
        
        <div className="h-72 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
              <PolarGrid stroke="#f1f5f9" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 8, fontWeight: 800, letterSpacing: '0.1em' }} />
              <Radar name="Cohort" dataKey="B" stroke="#cbd5e1" fill="#f8fafc" fillOpacity={0.6} />
              <Radar name="Candidate" dataKey="A" stroke="#1a365d" strokeWidth={2.5} fill="#2b5a9e" fillOpacity={0.15} dot={{ r: 3, fill: '#1a365d' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4 w-full xl:w-[320px] shrink-0">
        <StatCard title="CODE QUALITY" value="94.2%" trend="+ 15% vs. Cohort" trendUp />
        <StatCard title="ARCHITECTURE" value="88.5%" trend="+ 5% vs. Cohort" trendUp />
        <StatCard title="COMMUNICATION" value="4.2" trend="Above Average" neutral />
        <StatCard title="SOFT SKILLS" value="71.0%" trend="- 8% vs. Cohort" trendDown />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, trendUp, trendDown, neutral }: any) => {
  return (
    <div className="bg-[#f8fafc] rounded-xl p-5 border border-slate-100/80 shadow-sm">
      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">{title}</p>
      <p className="text-2xl font-black text-[#1a365d] mb-3 text-center tracking-tighter">{value}</p>
      <div className="flex justify-center">
        <div className={cn(
          "text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm",
          trendUp && "bg-emerald-50 text-emerald-600 border border-emerald-100",
          trendDown && "bg-red-50 text-red-600 border border-red-100",
          neutral && "text-blue-600 bg-blue-50 border border-blue-100"
        )}>
          {trend}
        </div>
      </div>
    </div>
  );
};
