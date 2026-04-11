import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Search, 
  Database, 
  Cpu, 
  CheckCircle2,
  Loader2,
  Fingerprint
} from 'lucide-react';
import { ROUTES } from '../../constants';

const Processing = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(30);
  const [statusIndex, setStatusIndex] = useState(0);

  const statusMessages = [
    { icon: <Search className="w-5 h-5" />, text: "Analyzing digital footprint..." },
    { icon: <Database className="w-5 h-5" />, text: "Aggregating platform data..." },
    { icon: <Fingerprint className="w-5 h-5" />, text: "Verifying authentic identity..." },
    { icon: <Cpu className="w-5 h-5" />, text: "ML Model computing TrustScore..." },
    { icon: <Shield className="w-5 h-5" />, text: "Finalizing security audit..." }
  ];

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(ROUTES.DASHBOARD);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Status message rotation
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(statusInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0a152e] flex flex-col items-center justify-center p-6 overflow-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="w-full max-w-lg relative z-10">
        
        {/* Main Loading Visual */}
        <div className="relative flex items-center justify-center mb-16">
          {/* Pulsing Concentric Circles */}
          <div className="absolute w-64 h-64 border border-blue-500/20 rounded-full animate-[ping_3s_linear_infinite]" />
          <div className="absolute w-48 h-48 border border-blue-400/30 rounded-full animate-[ping_3s_linear_infinite]" style={{ animationDelay: '1s' }} />
          <div className="absolute w-32 h-32 border border-blue-300/40 rounded-full animate-[ping_3s_linear_infinite]" style={{ animationDelay: '2s' }} />
          
          {/* Central Logo/Icon */}
          <div className="relative w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-[0_0_50px_-5px_rgba(59,130,246,0.5)] flex items-center justify-center border border-white/20 backdrop-blur-sm group">
            <Shield className="w-12 h-12 text-white animate-pulse" />
          </div>
        </div>

        {/* Textual Information */}
        <div className="text-center space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Processing Profile</h1>
            <p className="text-blue-200/60 font-medium tracking-wide flex items-center justify-center gap-2 uppercase text-[10px]">
              <Loader2 className="w-3 h-3 animate-spin" /> Systems Online & Computing
            </p>
          </div>

          {/* Status Message (Glassmorphism) */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 transition-all duration-500">
                  {statusMessages[statusIndex].icon}
                </div>
                <div>
                   <p className="text-sm font-bold text-white tracking-tight">
                     {statusMessages[statusIndex].text}
                   </p>
                   <div className="flex gap-1 mt-1">
                      <div className={`h-1 w-4 rounded-full transition-all duration-500 ${statusIndex >= 0 ? 'bg-blue-500' : 'bg-white/10'}`} />
                      <div className={`h-1 w-4 rounded-full transition-all duration-500 ${statusIndex >= 1 ? 'bg-blue-500' : 'bg-white/10'}`} />
                      <div className={`h-1 w-4 rounded-full transition-all duration-500 ${statusIndex >= 2 ? 'bg-blue-500' : 'bg-white/10'}`} />
                      <div className={`h-1 w-4 rounded-full transition-all duration-500 ${statusIndex >= 3 ? 'bg-blue-500' : 'bg-white/10'}`} />
                      <div className={`h-1 w-4 rounded-full transition-all duration-500 ${statusIndex >= 4 ? 'bg-blue-500' : 'bg-white/10'}`} />
                   </div>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 opacity-50" />
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <span className="text-6xl font-black text-white/10 tabular-nums select-none">
                {timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
              <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white tabular-nums">
                {timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
            </div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
              Estimated Completion Time
            </p>
          </div>
        </div>

      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-0 right-0 text-center opacity-30">
        <div className="flex items-center justify-center gap-2 mb-1">
           <div className="w-4 h-4 bg-white/10 rounded flex items-center justify-center">
             <Shield className="w-2 h-2 text-white" />
           </div>
           <span className="font-bold text-[10px] text-white tracking-widest uppercase">TrustScore Engine v1.0</span>
        </div>
      </div>
    </div>
  );
};

export default Processing;
