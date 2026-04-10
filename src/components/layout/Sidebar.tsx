
import { Grid, BarChart3, FileText, Settings, HelpCircle, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: Grid, label: 'DASHBOARD', path: '/dashboard' },
  { icon: BarChart3, label: 'ANALYTICS', path: '/analytics' },
  { icon: FileText, label: 'REPORTS', path: '/reports' },
  { icon: Settings, label: 'SETTINGS', path: '/settings' },
  { icon: HelpCircle, label: 'HELP', path: '/help' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-[#eaecf0] hidden md:flex flex-col">
      <div className="p-6">
        <h1 className="text-[#1c3c66] text-lg font-bold">Analytical Editorial</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          // For demo purposes, we will highlight Dashboard on the error page
          const isActive = item.label === 'DASHBOARD' || location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                isActive
                  ? 'bg-[#295b8d] text-white'
                  : 'text-[#64748b] hover:bg-slate-50'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-white' : 'text-[#64748b]'} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#eaecf0]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#eef2f6] flex items-center justify-center text-[#295b8d]">
            <User size={20} />
          </div>
          <div>
            <div className="font-semibold text-sm text-[#111827]">System Admin</div>
            <div className="text-[10px] uppercase text-[#64748b] font-medium tracking-wider">STEEL INSIGHT PRO</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
