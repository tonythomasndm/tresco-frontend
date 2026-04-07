const FloatingUserBadge = () => {
  return (
    <div className="absolute -bottom-4 right-2 xl:-bottom-5 xl:right-5 bg-white rounded-xl py-2 px-3 xl:py-3 xl:px-4 shadow-xl border border-slate-100 flex items-center gap-2 xl:gap-3">
      <div className="flex -space-x-2">
        <div className="w-6 h-6 xl:w-8 xl:h-8 rounded-full border-2 border-white bg-slate-300 overflow-hidden">
           <img src="https://i.pravatar.cc/100?img=47" alt="User" />
        </div>
        <div className="w-6 h-6 xl:w-8 xl:h-8 rounded-full border-2 border-white bg-slate-400 overflow-hidden">
           <img src="https://i.pravatar.cc/100?img=11" alt="User" />
        </div>
      </div>
      <span className="text-[9px] xl:text-[10px] font-bold tracking-widest text-[#0a152e] uppercase whitespace-nowrap">500+ Strategists Joined</span>
    </div>
  );
};

export default FloatingUserBadge;
