import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const PlatformCard = ({ name, score, color, bg, border }: { name: string; score: number; color: string; bg: string; border: string }) => {
  const data = [{ value: score }, { value: 100 - score }];

  return (
    <div className={`${bg} ${border} border rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group`}>
      {/* Donut */}
      <div className="w-20 h-20 relative mb-3">
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
          <span className="text-lg font-black text-slate-800">{score}</span>
        </div>
      </div>

      {/* Name + Progress */}
      <h4 className="text-xs font-extrabold text-slate-700 tracking-tight mb-2">{name}</h4>
      <div className="w-full flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${score}%`, backgroundColor: color }}
          />
        </div>
        <span className="text-[10px] font-bold text-slate-400">{score}%</span>
      </div>
    </div>
  );
};

export const PlatformWeightageWidget = () => {
  const getStoredData = () => {
    try {
      const data = localStorage.getItem('trustscore_data');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  };

  const apiData = getStoredData();
  const getScore = (key: string, defaultScore: number) => {
     return apiData?.platform_scores?.[key] ?? defaultScore;
  };

  const platforms = [
    { name: 'LeetCode',      score: getScore('leetcode', 92), color: '#eab308', bg: 'bg-yellow-50', border: 'border-yellow-100' },
    { name: 'GitHub',        score: getScore('github', 88),   color: '#8b5cf6', bg: 'bg-violet-50', border: 'border-violet-100' },
    { name: 'LinkedIn',      score: getScore('linkedin', 74), color: '#3b82f6', bg: 'bg-blue-50',   border: 'border-blue-100' },
    { name: 'StackOverflow', score: getScore('stack_overflow', 65), color: '#f97316', bg: 'bg-orange-50', border: 'border-orange-100' },
    { name: 'HackerRank',    score: getScore('hackerrank', 78), color: '#10b981', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-extrabold text-[#0a152e] tracking-tight">Platform Weightage</h3>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{platforms.length} Sources</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {platforms.map((p) => (
          <PlatformCard key={p.name} name={p.name} score={p.score} color={p.color} bg={p.bg} border={p.border} />
        ))}
      </div>
    </div>
  );
};
