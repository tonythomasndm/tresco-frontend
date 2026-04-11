import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import PartnerLogos from "./components/PartnerLogos";
import HowItWorks from "./components/HowItWorks";
import DeepIntelligence from "./components/DeepIntelligence";
import Pricing from "./components/Pricing";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-200 antialiased overflow-x-hidden">
      <Navbar />

      <HeroSection />
      <PartnerLogos />
      <HowItWorks />
      <DeepIntelligence />
      <Pricing />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
