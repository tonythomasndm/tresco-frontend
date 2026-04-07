import LeftPanelHeader from './LeftPanelHeader';
import LeftPanelHero from './LeftPanelHero';
import DecorativeChart from './DecorativeChart';
import FloatingUserBadge from './FloatingUserBadge';

const LeftPanel = () => {
  return (
    <div className="relative w-full h-full min-h-[300px] lg:min-h-[100vh] flex flex-col justify-between p-8 lg:p-10 xl:p-16 text-white overflow-y-auto overflow-x-hidden bg-[#0B1E43]">
      {/* Background Gradient & Glow Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c2357] to-[#040b19] z-0 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#214b9c] rounded-full blur-[100px] opacity-30 z-0 pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 flex-grow flex flex-col justify-center lg:justify-start">
        <LeftPanelHeader />
        <LeftPanelHero />
      </div>

      {/* Decorative Chart Widget (Desktop Only) */}
      <div className="relative z-10 hidden lg:block mt-6 xl:mt-auto w-full max-w-[450px]">
        <DecorativeChart />
        <FloatingUserBadge />
      </div>
    </div>
  );
};

export default LeftPanel;