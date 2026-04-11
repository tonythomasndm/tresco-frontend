import { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { SideNav } from './components/SideNav';
import { AuthenticityWidget } from './components/AuthenticityWidget';
import { TrustMatrixWidget } from './components/TrustMatrixWidget';
import { PlatformWeightageWidget } from './components/PlatformWeightageWidget';
import { InsightListsWidget, IntegrityVerifiedCard } from './components/InsightsWidget';
import { ActionBanner } from './components/ActionBanner';
import { 
  MobileTopNav, 
  MobileAuthenticityWidget, 
  AttributeComparisonWidget, 
  MobileSourceHealthWidget, 
  MobileKeyInsightWidget, 
  MobileBottomNav 
} from './components/MobileDashboardWidgets';

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-24">
        <MobileTopNav />
        <main className="px-4 py-2 space-y-4 flex-1">
          <MobileAuthenticityWidget />
          <AttributeComparisonWidget />
          <MobileSourceHealthWidget />
          <MobileKeyInsightWidget />
        </main>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <TopNav />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar matches screenshot layout */}
        <SideNav />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50/20 p-8 lg:p-10">
          <div className="max-w-[1400px] mx-auto">
            
            <div className="grid grid-cols-12 gap-6 lg:gap-8">
              {/* Row 1: Metrics & Weightage */}
              <div className="col-span-12 lg:col-span-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <AuthenticityWidget />
              </div>
              <div className="col-span-12 lg:col-span-4 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                <PlatformWeightageWidget />
              </div>

              {/* Row 2: Radar Chart & Verification */}
              <div className="col-span-12 lg:col-span-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <TrustMatrixWidget />
              </div>
              <div className="col-span-12 lg:col-span-4 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                <div className="h-full">
                  <IntegrityVerifiedCard />
                </div>
              </div>

              {/* Row 3: Insights */}
              <div className="col-span-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <InsightListsWidget />
              </div>

              {/* Row 4: Action Banner */}
              <div className="col-span-12 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
                <ActionBanner />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
