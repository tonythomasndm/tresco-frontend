import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Search,
  Database,
  Cpu,
  CheckCircle2,
  Loader2,
  Fingerprint,
  ArrowRight,
  RotateCw,
} from "lucide-react";
import { ROUTES } from "../../constants";

const TOTAL_DURATION_MS = 30000; // 30 seconds to reach 100%
const MAX_WAIT_MS = 120000; // 2 minutes max before retry screen
const POLL_INTERVAL_MS = 5000;
const REQUEST_TIMEOUT_MS = 10000;
const SCORE_API_URL =
  "https://trescoml-production.up.railway.app/generate-score";

const Processing = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [requestCycle, setRequestCycle] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const isCompleteRef = useRef(false);
  const hasTimedOutRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const statusIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const overallTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const statusMessages = [
    {
      icon: <Search className="w-5 h-5" />,
      text: "Analyzing digital footprint...",
    },
    {
      icon: <Database className="w-5 h-5" />,
      text: "Aggregating platform data...",
    },
    {
      icon: <Fingerprint className="w-5 h-5" />,
      text: "Verifying authentic identity...",
    },
    { icon: <Cpu className="w-5 h-5" />, text: "ML Model computing Tresco..." },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Finalizing security audit...",
    },
  ];

  const updateProgress = useCallback(() => {
    if (isCompleteRef.current || hasTimedOutRef.current) return;

    const elapsed = Date.now() - startTimeRef.current;
    const newProgress = Math.min((elapsed / TOTAL_DURATION_MS) * 99, 99);

    setProgress(newProgress);

    animFrameRef.current = requestAnimationFrame(updateProgress);
  }, []);

  const cleanupPendingWork = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (statusIntervalRef.current) {
      clearInterval(statusIntervalRef.current);
      statusIntervalRef.current = null;
    }

    if (overallTimeoutRef.current) {
      clearTimeout(overallTimeoutRef.current);
      overallTimeoutRef.current = null;
    }

    if (pollTimeoutRef.current) {
      clearTimeout(pollTimeoutRef.current);
      pollTimeoutRef.current = null;
    }

    if (requestTimeoutRef.current) {
      clearTimeout(requestTimeoutRef.current);
      requestTimeoutRef.current = null;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const getStoredUserId = useCallback(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      return "";
    }

    try {
      const user = JSON.parse(storedUser);
      return user?.id ?? "";
    } catch {
      return "";
    }
  }, []);

  const pollForScore = useCallback(async () => {
    const userId = getStoredUserId();
    if (!userId || isCompleteRef.current || hasTimedOutRef.current) {
      hasTimedOutRef.current = true;
      setHasTimedOut(true);
      cleanupPendingWork();
      return;
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    requestTimeoutRef.current = setTimeout(() => {
      abortController.abort();
    }, REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(SCORE_API_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
        signal: abortController.signal,
      });

      const data = await response.json();

      if (data?.status === "success" && data?.data) {
        localStorage.setItem("trustscore_data", JSON.stringify(data.data));
        isCompleteRef.current = true;
        setIsComplete(true);
        setProgress(100);
        cleanupPendingWork();
        return;
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Error while polling score API:", error);
      }
    } finally {
      if (requestTimeoutRef.current) {
        clearTimeout(requestTimeoutRef.current);
        requestTimeoutRef.current = null;
      }

      abortControllerRef.current = null;
    }

    if (!isCompleteRef.current && !hasTimedOutRef.current) {
      pollTimeoutRef.current = setTimeout(() => {
        void pollForScore();
      }, POLL_INTERVAL_MS);
    }
  }, [cleanupPendingWork, getStoredUserId]);

  useEffect(() => {
    cleanupPendingWork();
    localStorage.removeItem("trustscore_data");
    startTimeRef.current = Date.now();
    isCompleteRef.current = false;
    hasTimedOutRef.current = false;
    setProgress(0);
    setStatusIndex(0);
    setIsComplete(false);
    setHasTimedOut(false);

    animFrameRef.current = requestAnimationFrame(updateProgress);
    statusIntervalRef.current = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 4000);

    overallTimeoutRef.current = setTimeout(() => {
      hasTimedOutRef.current = true;
      setHasTimedOut(true);
      cleanupPendingWork();
    }, MAX_WAIT_MS);

    void pollForScore();

    return () => {
      cleanupPendingWork();
    };
  }, [cleanupPendingWork, pollForScore, requestCycle, updateProgress]);

  const handleRetry = () => {
    cleanupPendingWork();
    setRequestCycle((current) => current + 1);
  };

  const handleGoToDashboard = () => {
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className="min-h-screen bg-[#0a152e] flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 w-full max-w-lg">
        {/* Main Loading Visual */}
        <div className="relative flex items-center justify-center mb-16">
          {/* Pulsing Concentric Circles */}
          {!isComplete && !hasTimedOut && (
            <>
              <div className="absolute w-64 h-64 border border-blue-500/20 rounded-full animate-[ping_3s_linear_infinite]" />
              <div
                className="absolute w-48 h-48 border border-blue-400/30 rounded-full animate-[ping_3s_linear_infinite]"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute w-32 h-32 border border-blue-300/40 rounded-full animate-[ping_3s_linear_infinite]"
                style={{ animationDelay: "2s" }}
              />
            </>
          )}

          {/* Central Logo/Icon */}
          <div
            className={`relative w-24 h-24 rounded-3xl shadow-[0_0_50px_-5px_rgba(59,130,246,0.5)] flex items-center justify-center border border-white/20 backdrop-blur-sm group transition-all duration-700 ${
              isComplete
                ? "bg-gradient-to-br from-emerald-500 to-emerald-700"
                : hasTimedOut
                  ? "bg-gradient-to-br from-orange-500 to-orange-700"
                  : "bg-gradient-to-br from-blue-600 to-indigo-700"
            }`}
          >
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
        <div className="space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              {isComplete
                ? "Analysis Complete!"
                : hasTimedOut
                  ? "Request Timed Out"
                  : "Processing Profile"}
            </h1>
            <p className="text-blue-200/60 font-medium tracking-wide flex items-center justify-center gap-2 uppercase text-[10px]">
              {isComplete ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> All
                  Systems Verified
                </>
              ) : hasTimedOut ? (
                <>
                  <RotateCw className="w-3 h-3" /> Connection timed out
                </>
              ) : (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" /> Systems Online &
                  Computing
                </>
              )}
            </p>
          </div>

          {/* Status Message (Glassmorphism) — only show while processing */}
          {!isComplete && !hasTimedOut && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex items-center justify-center w-12 h-12 text-blue-400 transition-all duration-500 rounded-xl bg-blue-500/10">
                    {statusMessages[statusIndex].icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-tight text-white">
                      {statusMessages[statusIndex].text}
                    </p>
                    <div className="flex gap-1 mt-1">
                      <div
                        className={`h-1 w-4 rounded-full transition-all duration-500 ${statusIndex >= 0 ? "bg-blue-500" : "bg-white/10"}`}
                      />
                      <div
                        className={`h-1 w-4 rounded-full transition-all duration-500 ${statusIndex >= 1 ? "bg-blue-500" : "bg-white/10"}`}
                      />
                      <div
                        className={`h-1 w-4 rounded-full transition-all duration-500 ${statusIndex >= 2 ? "bg-blue-500" : "bg-white/10"}`}
                      />
                      <div
                        className={`h-1 w-4 rounded-full transition-all duration-500 ${statusIndex >= 3 ? "bg-blue-500" : "bg-white/10"}`}
                      />
                      <div
                        className={`h-1 w-4 rounded-full transition-all duration-500 ${statusIndex >= 4 ? "bg-blue-500" : "bg-white/10"}`}
                      />
                    </div>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 opacity-50 text-emerald-500" />
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 ${
                  isComplete
                    ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]"
                    : hasTimedOut
                      ? "bg-orange-400"
                      : "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.5)]"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs font-bold tracking-widest uppercase text-blue-200/40">
              {Math.round(progress)}% Complete
            </p>
          </div>

          {/* Action Buttons — shown contextually */}
          <div className="pt-2">
            {isComplete && (
              <button
                onClick={handleGoToDashboard}
                className="flex items-center gap-3 px-10 py-5 mx-auto text-sm font-black tracking-widest text-white uppercase transition-all shadow-2xl group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-2xl shadow-emerald-500/30 active:scale-95 hover:gap-5"
              >
                View Dashboard
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            )}

            {hasTimedOut && !isComplete && (
              <button
                onClick={handleRetry}
                className="flex items-center gap-3 px-10 py-5 mx-auto text-sm font-black tracking-widest text-white uppercase transition-all shadow-2xl group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-2xl shadow-orange-500/30 active:scale-95"
              >
                <RotateCw className="w-5 h-5 group-hover:animate-spin" />
                Retry Analysis
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute left-0 right-0 text-center bottom-10 opacity-30">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="flex items-center justify-center w-4 h-4 rounded bg-white/10">
            <Shield className="w-2 h-2 text-white" />
          </div>
          <span className="font-bold text-[10px] text-white tracking-widest uppercase">
            Tresco Engine v1.0
          </span>
        </div>
      </div>
    </div>
  );
};

export default Processing;
