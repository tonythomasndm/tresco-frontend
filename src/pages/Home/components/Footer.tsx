import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, X } from 'lucide-react';

const Footer = () => {
  const [showContact, setShowContact] = useState(false);

  return (
    <footer className="w-full bg-[#f8fafc] border-t border-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-black text-[#0a152e] tracking-tight block mb-4">
               Tresco
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
            <div className="flex flex-col gap-3 relative">
              <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Company</h4>
              <div className="relative">
                <button 
                  onClick={() => setShowContact(!showContact)}
                  className="text-[13px] font-medium text-slate-600 hover:text-[#0a152e] transition-colors"
                >
                  Contact Support
                </button>
                
                {showContact && (
                  <div className="absolute bottom-full left-0 mb-3 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 p-4 animate-in slide-in-from-bottom-2 duration-200 z-50">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Support Details</h5>
                      <button onClick={() => setShowContact(false)} className="text-slate-400 hover:text-slate-600">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Email</p>
                          <a href="mailto:lakshaymittalkdb05@gmail.com" className="text-[12px] font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                            lakshaymittalkdb05@gmail.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                          <Phone className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Phone</p>
                          <a href="tel:+919818040354" className="text-[12px] font-semibold text-slate-700 hover:text-green-600 transition-colors">
                            +91 9818040354
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <a href="https://x.com/Lakshay_mittal_" className="text-[13px] font-medium text-slate-600 hover:text-[#0a152e] transition-colors">Twitter</a>
              <a href="https://www.linkedin.com/in/lakshay-mittal-b49090219" className="text-[13px] font-medium text-slate-600 hover:text-[#0a152e] transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] font-medium text-slate-400">
            &copy; {new Date().getFullYear()} Tresco. All rights reserved. Precision in every metric.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
