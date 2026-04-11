import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#f8fafc] border-t border-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-black text-[#0a152e] tracking-tight block mb-4">
              TrustSco
            </Link>
            <p className="text-[13px] font-medium text-slate-500 leading-relaxed pr-4">
              The premier metrics for the future of work. Build high-performance cultures, clarify user intent.
            </p>
          </div>

          {/* Links Cols */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Platform</h4>
              <a href="#" className="text-[13px] font-medium text-slate-600 hover:text-[#0a152e] transition-colors">Solutions</a>
              <a href="#" className="text-[13px] font-medium text-slate-600 hover:text-[#0a152e] transition-colors">Pricing</a>
              <a href="#" className="text-[13px] font-medium text-slate-600 hover:text-[#0a152e] transition-colors">Security</a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Legal</h4>
              <a href="#" className="text-[13px] font-medium text-slate-600 hover:text-[#0a152e] transition-colors">Privacy Policy</a>
              <a href="#" className="text-[13px] font-medium text-slate-600 hover:text-[#0a152e] transition-colors">Terms of Service</a>
              <a href="#" className="text-[13px] font-medium text-slate-600 hover:text-[#0a152e] transition-colors">Cookie Policy</a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Company</h4>
              <a href="#" className="text-[13px] font-medium text-slate-600 hover:text-[#0a152e] transition-colors">Contact Support</a>
              <a href="#" className="text-[13px] font-medium text-slate-600 hover:text-[#0a152e] transition-colors">Twitter</a>
              <a href="#" className="text-[13px] font-medium text-slate-600 hover:text-[#0a152e] transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] font-medium text-slate-400">
            &copy; {new Date().getFullYear()} TrustSco. All rights reserved. Precision in every metric.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
