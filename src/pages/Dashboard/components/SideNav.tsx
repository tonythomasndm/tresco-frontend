import { FileText, Shield, AlertTriangle, Map } from "lucide-react";
import { cn } from "../../../utils/cn";

export const SideNav = () => {
  return (
    <aside className="w-68 flex-shrink-0 bg-white border-r border-slate-100 min-h-[calc(100vh-4rem)] p-8 hidden lg:block">
      <div className="mb-10 px-4">
        <h2 className="text-xl font-bold text-[#1a365d] tracking-tight">Candidate Alpha</h2>
        <p className="text-[9px] text-slate-400 font-bold tracking-[0.2em] uppercase mt-1">
          Analysis Phase: Final
        </p>
      </div>
      
      <nav className="space-y-2">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.05s' }}><NavItem icon={<FileText className="w-4 h-4" />} label="Executive Summary" /></div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}><NavItem icon={<Shield className="w-4 h-4" />} label="Trust Analysis" active /></div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}><NavItem icon={<AlertTriangle className="w-4 h-4" />} label="Risk Profile" /></div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}><NavItem icon={<Map className="w-4 h-4" />} label="Integrity Map" /></div>
      </nav>
    </aside>
  );
};

const NavItem = ({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) => {
  return (
    <a 
      href="#" 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold transition-colors",
        active 
          ? "bg-[#f1f5f9] text-[#2b5a9e] border border-slate-100/50" 
          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
      )}
    >
      <div className={cn(active ? "text-[#2b5a9e]" : "text-slate-400")}>
        {icon}
      </div>
      {label}
    </a>
  );
};
