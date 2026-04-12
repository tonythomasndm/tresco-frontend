import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const getStoredData = () => {
  try {
    const data = localStorage.getItem("trustscore_data");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const AuthenticityWidget = () => {
  const apiData = getStoredData();
  const rawScore = Number(apiData?.score);
  const normalizedScore =
    Number.isFinite(rawScore) && rawScore <= 100 ? rawScore * 10 : rawScore;
  const displayScore = Math.max(
    0,
    Math.min(
      1000,
      Math.round(Number.isFinite(normalizedScore) ? normalizedScore : 845),
    ),
  );

  const scoreData = [
    { name: "Score", value: displayScore },
    { name: "Remaining", value: Math.max(0, 1000 - displayScore) },
  ];

  return (
    <div className="bg-gradient-to-r from-[#0f1d35] via-[#15253f] to-[#1a365d] rounded-3xl p-10 lg:p-12 shadow-2xl shadow-blue-950/20 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-[-30%] right-[-10%] w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-40%] left-[-5%] w-[400px] h-[400px] bg-indigo-500/6 rounded-full blur-[80px]" />

      <div className="relative z-10 flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
        {/* Donut Chart */}
        <div className="relative w-48 h-48 lg:w-52 lg:h-52 shrink-0 group">
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
                <Cell fill="url(#scoreGradient)" />
                <Cell fill="rgba(255,255,255,0.06)" />
              </Pie>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black leading-none tracking-tighter text-white lg:text-6xl">
              {displayScore}
            </span>
            <span className="text-[10px] font-bold text-blue-300/40 uppercase tracking-widest mt-1">
              / 1000
            </span>
          </div>
        </div>

        {/* Score Info */}
        <div className="flex-1 text-center lg:text-left">
          <div className="flex items-center justify-center gap-2 mb-3 lg:justify-start">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-[10px] text-blue-200/40 font-bold tracking-[0.3em] uppercase">
              Overall Trust Score
            </span>
          </div>

          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-white lg:text-3xl">
            High Authenticity Candidate
          </h2>

          <p className="max-w-md mb-6 text-sm font-medium leading-relaxed text-blue-200/40">
            This candidate demonstrates strong technical credibility across all
            connected platforms with verified contributions.
          </p>

        </div>
      </div>
    </div>
  );
};
