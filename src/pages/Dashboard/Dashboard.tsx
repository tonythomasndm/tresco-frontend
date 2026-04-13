import { useState, useEffect } from "react";
import { AuthenticityWidget } from "./components/AuthenticityWidget";
import { PlatformWeightageWidget } from "./components/PlatformWeightageWidget";
import {
  InsightListsWidget,
  ImprovementsWidget,
} from "./components/InsightsWidget";
import { Download } from "lucide-react";
import {
  MobileTopNav,
  MobileAuthenticityWidget,
  MobileSourceHealthWidget,
  MobileProsConsWidget,
  MobileImprovementsWidget,
} from "./components/MobileDashboardWidgets";

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDownloadPDF = () => {
    window.print();
  };

  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen pb-8 font-sans bg-slate-50">
        <MobileTopNav />
        <main className="flex-1 px-4 py-2 space-y-4">
          <MobileAuthenticityWidget />
          <MobileSourceHealthWidget />
          <MobileProsConsWidget />
          <MobileImprovementsWidget />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-[#f0f2f5]">
      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-8 lg:px-12 py-8 space-y-6">
        {/* Export Button */}
        <div className="flex justify-end print:hidden">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-[#0f1d35] hover:bg-[#1a365d] text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            Export PDF
          </button>
        </div>

        {/* Row 1: Score Hero (full width) */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
          <AuthenticityWidget />
        </div>

        {/* Row 2: Platform Weightage (full width) */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <PlatformWeightageWidget />
        </div>

        {/* Row 3: Pros & Cons */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <InsightListsWidget />
        </div>

        {/* Row 4: Improvements */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <ImprovementsWidget />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;