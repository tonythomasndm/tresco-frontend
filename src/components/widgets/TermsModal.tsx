import React, { useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, onAccept }) => {
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0a152e]">Terms of Service</h3>
             
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-600 custom-scrollbar">
          <section>
            <h4 className="text-[#0a152e] font-bold mb-2">1. Introduction & Acceptance</h4>
            <p className="text-sm leading-relaxed">
              By checking the “I agree” box and accessing or using the Trust Score (Tresco) platform (“Platform”), you confirm that you have read, understood, and agree to be bound by these Terms of Service (“Terms”), the Privacy & Data Protection Policy (incorporated herein), and any additional policies referenced herein. If you do not agree, do not use the Platform.
            </p>
          </section>

          <section>
            <h4 className="text-[#0a152e] font-bold mb-2">2. Definitions</h4>
            <ul className="text-sm space-y-2 list-disc pl-5">
              <li><strong>User</strong> – any individual or entity registering for or using the Platform.</li>
              <li><strong>Platform</strong> – the Trust Score (Tresco) website, mobile app, APIs, and related services.</li>
              <li><strong>Data</strong> – information fetched, stored, or processed by the Platform, including profile data from LinkedIn, GitHub, Kaggle, Hackerrank, Leetcode, Stackoverflow or other third‑party sources.</li>
              <li><strong>Services</strong> – generation of a Trust Score, hiring insights, salary intelligence, and related analytics.</li>
              <li><strong>Score</strong> – the Trust Score metric produced by the Platform’s algorithms.</li>
            </ul>
          </section>

          <section>
            <h4 className="text-[#0a152e] font-bold mb-2">3. User Eligibility</h4>
            <ul className="text-sm space-y-2 list-disc pl-5">
              <li>You must be 18 years of age or older (or the legal age of majority in your jurisdiction) to create an account.</li>
              <li>If you are using the Platform on behalf of an organization, you warrant that you have the authority to bind that entity to these Terms.</li>
              <li>You represent that all information you provide is true, accurate, complete, and current.</li>
            </ul>
          </section>

          <section>
            <h4 className="text-[#0a152e] font-bold mb-2">4. Data Collection & Usage</h4>
            <div className="text-sm space-y-4">
              <div>
                <p className="font-semibold mb-1">4.1 Data Collected</p>
                <p>Profile data you provide directly (email, name, password). Data fetched from third‑party platforms (LinkedIn, GitHub, Leetcode, Hackerrank, Kaggle, Stackoverflow etc.) with your explicit authorization.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">4.2 Purpose</p>
                <p>Compute and display a Trust Score. Provide hiring insights, salary benchmarks, and related analytics. Improve Platform performance and conduct research.</p>
              </div>
            </div>
          </section>

          <section>
            <h4 className="text-[#0a152e] font-bold mb-2">5. User Consent (Critical)</h4>
            <p className="text-sm leading-relaxed">
              By authorizing the Platform to fetch data from LinkedIn, GitHub, or any third‑party service, you confirm you have the right to grant access and agree that the Platform may analyze the fetched data to generate the Trust Score. The Score is indicative only and not a guarantee of employability.
            </p>
          </section>

          <section>
            <h4 className="text-[#0a152e] font-bold mb-2">6. Third‑Party Platform Disclaimer</h4>
            <p className="text-sm leading-relaxed">
              The Platform is not affiliated, owned, or controlled by LinkedIn, GitHub, Leetcode, Hackerrank, Kaggle, Stackoverflow or any other data source. Data availability depends on those platforms’ APIs and terms.
            </p>
          </section>

          <section>
            <h4 className="text-[#0a152e] font-bold mb-2">7. AI & Scoring Disclaimer</h4>
            <p className="text-sm leading-relaxed font-semibold italic text-slate-500">
              The Trust Score is algorithmic, based on available data, and provided for informational purposes only. You must not rely solely on the Score for hiring or promotion decisions.
            </p>
          </section>

          <section className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 className="text-[#0a152e] font-bold mb-2">Important Notice</h4>
            <p className="text-xs leading-relaxed text-slate-500 uppercase tracking-wide">
              Users must not use the Score in a manner that discriminates against any individual or group under applicable law.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded focus:ring-2 focus:ring-blue-500/20 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                />
                <ShieldCheck className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                I agree to be bound by these Terms of Service and User Consent Policy.
              </span>
            </label>
            
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!agreed}
                onClick={onAccept}
                className="flex-2 flex-[2] px-6 py-3 rounded-xl bg-[#03102a] text-white font-bold text-sm hover:bg-[#0a1835] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/10"
              >
                Accept & Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default TermsModal;
