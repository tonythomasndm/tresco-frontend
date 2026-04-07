import { Activity } from 'lucide-react';

const DecorativeChart = () => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 xl:p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
      
      <div className="flex justify-between items-start mb-6 xl:mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-lg flex-shrink-0">
            <Activity className="w-4 h-4 text-blue-200" />
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-wider text-blue-200/60 uppercase">Current Trajectory</p>
            <p className="font-semibold text-white">Performance Alpha</p>
          </div>
        </div>
        <div className="text-lg xl:text-xl font-bold text-white">+14.2%</div>
      </div>

      <div className="flex items-end gap-2 h-20 xl:h-24 w-full relative z-10 mt-2">
        {[30, 45, 25, 60, 45, 80].map((height, i) => (
          <div 
            key={i} 
            className={`flex-1 rounded-t-sm transition-all duration-500 hover:opacity-100 ${i === 5 ? 'bg-[#73a8ff]' : 'bg-[#3e6bbd] opacity-50'}`}
            style={{ height: `${height}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default DecorativeChart;
