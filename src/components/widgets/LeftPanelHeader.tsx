import { Activity } from 'lucide-react';

const LeftPanelHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 mb-8 lg:mb-12 xl:mb-20 text-center lg:text-left mx-auto lg:mx-0">
      <div className="bg-white text-[#0a152e] p-2 rounded-xl h-12 w-12 flex items-center justify-center shadow-lg flex-shrink-0">
        <Activity className="w-7 h-7" strokeWidth={3} />
      </div>
      <div className="mt-2 lg:mt-0">
        <h1 className="text-2xl lg:text-xl font-bold tracking-tight">Analytical Architect</h1>
        <p className="text-[11px] lg:text-[10px] tracking-[0.2em] text-blue-200/80 uppercase font-bold lg:hidden mt-1">Precision Strategy Ecosystem</p>
      </div>
    </div>
  );
};

export default LeftPanelHeader;
