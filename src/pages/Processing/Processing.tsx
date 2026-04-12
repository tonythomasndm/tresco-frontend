import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Search, 
  Database, 
  Cpu, 
  CheckCircle2,
  Loader2,
  Fingerprint,
  ArrowRight,
  RotateCw
} from 'lucide-react';
import { ROUTES } from '../../constants';

const TOTAL_DURATION_MS = 30000; // 30 seconds to reach 100%
const MAX_TIMEOUT_MS = 60000;   // 60 seconds max before retry

const Processing = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const animFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const statusMessages = [
    { icon: <Search className="w-5 h-5" />, text: "Analyzing digital footprint..." },
    { icon: <Database className="w-5 h-5" />, text: "Aggregating platform data..." },
    { icon: <Fingerprint className="w-5 h-5" />, text: "Verifying authentic identity..." },
    { icon: <Cpu className="w-5 h-5" />, text: "ML Model computing Tresco..." },
    { icon: <Shield className="w-5 h-5" />, text: "Finalizing security audit..." }
  ];

  const updateProgress = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const newProgress = Math.min((elapsed / TOTAL_DURATION_MS) * 100, 100);
    
    setProgress(newProgress);

    if (newProgress >= 100) {
      setIsComplete(true);
      return; // Stop animation
    }

    animFrameRef.current = requestAnimationFrame(updateProgress);
  }, []);

  useEffect(() => {
    startTimeRef.current = Date.now();

    // Start progress animation
    animFrameRef.current = requestAnimationFrame(updateProgress);

    // Status message rotation
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % 5);
    }, 4000);

    // Max timeout — if not complete after 60s, show retry
    timeoutRef.current = setTimeout(() => {
      if (!isComplete) {
        setHasTimedOut(true);
      }
    }, MAX_TIMEOUT_MS);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      clearInterval(statusInterval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [updateProgress, isComplete]);

  const handleRetry = () => {
    setProgress(0);
    setIsComplete(false);
    setHasTimedOut(false);
    setStatusIndex(0);
    startTimeRef.current = Date.now();
    animFrameRef.current = requestAnimationFrame(updateProgress);
    
    // Reset max timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setHasTimedOut(true);
    }, MAX_TIMEOUT_MS);
  };

  const handleGoToDashboard = () => {
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className="min-h-screen bg-[#0a152e] flex flex-col items-center justify-center p-6 overflow-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="w-full max-w-lg relative z-10">
        
        {/* Main Loading Visual */}
        <div className="relative flex items-center justify-center mb-16">
          {/* Pulsing Concentric Circles */}
          {!isComplete && !hasTimedOut && (
            <>
              <div className="absolute w-64 h-64 border border-blue-500/20 rounded-full animate-[ping_3s_linear_infinite]" />
              <div className="absolute w-48 h-48 border border-blue-400/30 rounded-full animate-[ping_3s_linear_infinite]" style={{ animationDelay: '1s' }} />
              <div className="absolute w-32 h-32 border border-blue-300/40 rounded-full animate-[ping_3s_linear_infinite]" style={{ animationDelay: '2s' }} />
            </>
          )}
          
          {/* Central Logo/Icon */}
          <div className={`relative w-24 h-24 rounded-3xl shadow-[0_0_50px_-5px_rgba(59,130,246,0.5)] flex items-center justify-center border border-white/20 backdrop-blur-sm group transition-all duration-700 ${
            isComplete ? 'bg-gradient-to-br from-emerald-500 to-emerald-700' : 
            hasTimedOut ? 'bg-gradient-to-br from-orange-500 to-orange-700' :
            'bg-gradient-to-br from-blue-600 to-indigo-700'
          }`}>
            {isComplete ? (
              <CheckCircle2 className="w-12 h-12 text-white animate-bounce" />
            ) : hasTimedOut ? (
              <RotateCw className="w-12 h-12 text-white" />
            ) : (
              <Shield className="w-12 h-12 text-white animate-pulse" />
            )}
          </div>
        </div>

        {/* Textual Information */}
        <div className="text-center space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {isComplete ? 'Analysis Complete!' : hasTimedOut ? 'Request Timed Out' : 'Processing Profile'}
            </h1>
            <p className="text-blue-200/60 font-medium tracking-wide flex items-center justify-center gap-2 uppercase text-[10px]">
              {isComplete ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> All Systems Verified
                </>
              ) : hasTimedOut ? (
                <>
                  <RotateCw className="w-3 h-3" /> Connection timed out
                </>
              ) : (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" /> Systems Online & Computing
                </>
              )}
            </p>
          </div>

          {/* Status Message (Glassmorphism) — only show while processing */}
          {!isComplete && !hasTimedOut && (
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
          )}

          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 ${
                  isComplete ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]' : 
                  hasTimedOut ? 'bg-orange-400' :
                  'bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.5)]'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-blue-200/40 text-xs font-bold tracking-widest uppercase">
              {Math.round(progress)}% Complete
            </p>
          </div>

          {/* Action Buttons — shown contextually */}
          <div className="pt-2">
            {isComplete && (
              <button
                onClick={handleGoToDashboard}
                className="group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-sm uppercase tracking-widest rounded-2xl px-10 py-5 transition-all shadow-2xl shadow-emerald-500/30 active:scale-95 flex items-center gap-3 mx-auto hover:gap-5"
              >
                View Dashboard
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            )}

            {hasTimedOut && !isComplete && (
              <button
                onClick={handleRetry}
                className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-sm uppercase tracking-widest rounded-2xl px-10 py-5 transition-all shadow-2xl shadow-orange-500/30 active:scale-95 flex items-center gap-3 mx-auto"
              >
                <RotateCw className="w-5 h-5 group-hover:animate-spin" />
                Retry Analysis
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-0 right-0 text-center opacity-30">
        <div className="flex items-center justify-center gap-2 mb-1">
           <div className="w-4 h-4 bg-white/10 rounded flex items-center justify-center">
             <Shield className="w-2 h-2 text-white" />
           </div>
           <span className="font-bold text-[10px] text-white tracking-widest uppercase">Tresco Engine v1.0</span>
        </div>
      </div>
    </div>
  );
};

export default Processing;
