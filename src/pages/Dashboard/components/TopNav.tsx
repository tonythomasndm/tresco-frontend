import { Bell, User, Search } from "lucide-react";

export const TopNav = () => {
  return (
    <nav className="h-16 px-6 lg:px-8 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          {/* Brand Logo from Screenshot */}
          <span className="font-extrabold text-[#2b5a9e] text-xl tracking-tight hidden sm:block">Steel Insight</span>
          <span className="font-extrabold text-[#2b5a9e] text-xl tracking-tight sm:hidden">SI</span>
        </div>
        
        {/* Nav Links from Screenshot */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-widest uppercase">
          <a href="#" className="text-slate-400 hover:text-[#0a152e] transition-colors">Reports</a>
          <a href="#" className="text-[#2b5a9e] border-b-2 border-[#2b5a9e] pb-1">Strategy</a>
          <a href="#" className="text-slate-400 hover:text-[#0a152e] transition-colors">Settings</a>
        </div>
      </div>

      <div className="flex items-center gap-4 text-slate-500">
         <button className="md:hidden"><Search className="w-5 h-5"/></button>
         <button className="hover:text-slate-800"><Bell className="w-5 h-5" /></button>
         <button className="hover:text-slate-800"><User className="w-5 h-5" /></button>
      </div>
    </nav>
  );
};
