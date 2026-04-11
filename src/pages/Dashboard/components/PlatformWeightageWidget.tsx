import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const PlatformRing = ({ score, name }: { score: number, name: string }) => {
  const data = [
    { value: score },
    { value: 100 - score }
  ];
  return (
    <div className="flex flex-col items-center">
      <div className="w-18 h-18 relative transition-transform hover:scale-110 duration-300">
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
            >
              <Cell fill="#1a365d" />
              <Cell fill="#f1f5f9" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[11px] font-black text-[#1a365d] tracking-tighter">{score}</span>
        </div>
      </div>
      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-4 text-center">{name}</span>
    </div>
  );
};

export const PlatformWeightageWidget = () => {
  return (
    <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-slate-100/80 h-full">
      <h3 className="text-[9px] text-[#1a365d] font-black tracking-[0.2em] uppercase mb-10 text-center lg:text-left">Platform Weightage</h3>
      <div className="grid grid-cols-2 gap-y-10 gap-x-4">
         <PlatformRing score={92} name="Leet Code" />
         <PlatformRing score={88} name="GitHub" />
         <PlatformRing score={74} name="LinkedIn" />
         <PlatformRing score={65} name="StackOverflow" />
      </div>
    </div>
  );
};
