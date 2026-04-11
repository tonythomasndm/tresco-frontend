import { PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';

export const AuthenticityWidget = () => {
  const scoreData = [
    { name: 'Score', value: 845 },
    { name: 'Remaining', value: 155 }
  ];
  const COLORS = ['#1a365d', '#f1f5f9'];

  const trendData = [
    { value: 600 }, { value: 650 }, { value: 620 }, { value: 700 }, 
    { value: 680 }, { value: 750 }, { value: 720 }, { value: 800 }, 
    { value: 780 }, { value: 845 }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-10 h-full">
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
        <h3 className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase mb-8">Overall Authenticity</h3>
        
        <div className="flex items-baseline justify-center lg:justify-start gap-3 mb-6">
           <span className="text-6xl font-black text-[#1a365d] tracking-tighter">845</span>
           <span className="text-2xl text-slate-200 font-bold">/ 1000</span>
        </div>
        
        <div className="flex items-center justify-center lg:justify-start gap-4">
           <span className="bg-[#f8fafc] text-[#1a365d] text-[9px] font-black px-3 py-1.5 rounded-md uppercase tracking-widest border border-slate-100 shadow-sm">
             Elite Caliber
           </span>
           <span className="text-xs font-bold text-slate-400">92nd Percentile</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-10 w-full lg:w-auto mt-2 lg:mt-0">
        <div className="hidden xl:block">
           <p className="text-[9px] text-slate-400 font-bold tracking-[0.1em] uppercase mb-1 text-right">Score Trend (90 D)</p>
           <div className="h-14 w-28">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <Line type="monotone" dataKey="value" stroke="#1a365d" strokeWidth={2.5} dot={false} isAnimationActive={true} />
                </LineChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Big Donut */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 relative mx-auto lg:mx-0">
           <ResponsiveContainer width="100%" height="100%">
             <PieChart>
               <Pie
                 data={scoreData}
                 cx="50%"
                 cy="50%"
                 innerRadius="75%"
                 outerRadius="100%"
                 startAngle={90}
                 endAngle={-270}
                 dataKey="value"
                 stroke="none"
               >
                 {scoreData.map((_, index) => (
                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                 ))}
               </Pie>
             </PieChart>
           </ResponsiveContainer>
           {/* Center checkmark */}
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1a365d] rounded-full flex items-center justify-center text-white shadow-lg">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
               </svg>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
