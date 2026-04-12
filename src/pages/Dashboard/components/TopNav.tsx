import { Bell, User, Download, Shield } from "lucide-react";

export const TopNav = () => {
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <nav className="h-16 px-6 lg:px-8 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-20 print:hidden">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#0a152e] rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-blue-400" />
          </div>
          <span className="font-extrabold text-[#2b5a9e] text-xl tracking-tight hidden sm:block">TrustScore</span>
          <span className="font-extrabold text-[#2b5a9e] text-xl tracking-tight sm:hidden">TS</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-widest uppercase">
          <a href="#" className="text-[#2b5a9e] border-b-2 border-[#2b5a9e] pb-1">Dashboard</a>
          <a href="#" className="text-slate-400 hover:text-[#0a152e] transition-colors">Reports</a>
          <a href="#" className="text-slate-400 hover:text-[#0a152e] transition-colors">Settings</a>
        </div>
      </div>

      <div className="flex items-center gap-3 text-slate-500">
         <button
           onClick={handleDownloadPDF}
           className="hidden sm:flex items-center gap-2 bg-[#1a365d] hover:bg-[#0f2744] text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-900/10 active:scale-95"
         >
           <Download className="w-3.5 h-3.5" />
           Download Report
         </button>
         <button
           onClick={handleDownloadPDF}
           className="sm:hidden p-2 hover:bg-slate-50 rounded-lg transition-colors text-[#1a365d]"
           title="Download Report"
         >
           <Download className="w-5 h-5" />
         </button>
         <button className="hover:text-slate-800 p-2 hover:bg-slate-50 rounded-lg transition-colors"><Bell className="w-5 h-5" /></button>
         <button className="hover:text-slate-800 p-2 hover:bg-slate-50 rounded-lg transition-colors"><User className="w-5 h-5" /></button>
      </div>
    </nav>
  );
};
