import { useState } from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
 
  const [hoveredTier, setHoveredTier] = useState<string>('Growth');

  return (
    <section id="pricing" className="w-full bg-[#f8fafc] py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a152e] mb-4">Choose Your Tier</h2>
          <p className="text-slate-500 font-medium">Simple, predictable pricing for teams of all sizes.</p>
        </div>

        {/* Pricing Cards Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto items-center"
          onMouseLeave={() => setHoveredTier('Growth')}
        >
          
          {/* Card 1: Standard */}
          <div 
            onMouseEnter={() => setHoveredTier('Standard')}
            className={`rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
              hoveredTier === 'Standard' 
                ? 'bg-white border-2 border-[#1c3c66] shadow-xl md:scale-105 z-10' 
                : 'bg-slate-50 border border-slate-200 hover:shadow-lg scale-100 z-0'
            }`}
          >
            <h3 className="text-lg font-bold text-[#0a152e] mb-2">Standard</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-black text-[#0a152e]">$0</span>
              <span className="text-sm font-medium text-slate-500">/month</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className={`w-4 h-4 ${hoveredTier === 'Standard' ? 'text-blue-600' : 'text-[#1c3c66]'}`} />
                <span className="text-sm font-medium text-slate-600">5 Candidate Reports / mo</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className={`w-4 h-4 ${hoveredTier === 'Standard' ? 'text-blue-600' : 'text-[#1c3c66]'}`} />
                <span className="text-sm font-medium text-slate-600">Basic Skill Verification</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className={`w-4 h-4 ${hoveredTier === 'Standard' ? 'text-blue-600' : 'text-[#1c3c66]'}`} />
                <span className="text-sm font-medium text-slate-600">Community Support</span>
              </li>
            </ul>
            
            <button className={`w-full py-3 rounded-lg font-semibold transition-colors mt-auto ${
              hoveredTier === 'Standard'
                ? 'bg-[#1c3c66] text-white hover:bg-[#122b4f] shadow-md'
                : 'border border-slate-300 text-slate-700 hover:bg-white hover:border-slate-400'
            }`}>
              Start Free
            </button>
          </div>

          {/* Card 2: Growth (Popular) */}
          <div 
            onMouseEnter={() => setHoveredTier('Growth')}
            className={`rounded-2xl p-8 relative transition-all duration-300 cursor-pointer ${
              hoveredTier === 'Growth'
                ? 'bg-white border-2 border-[#1c3c66] shadow-xl md:scale-105 z-10'
                : 'bg-slate-50 border border-slate-200 hover:shadow-lg scale-100 z-0'
            }`}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1c3c66] text-white text-[10px] uppercase font-bold tracking-widest py-1.5 px-4 rounded-full">
              MOST POPULAR
            </div>
            <h3 className="text-lg font-bold text-[#0a152e] mb-2">Growth</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-black text-[#0a152e]">$49</span>
              <span className="text-sm font-medium text-slate-500">/month</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className={`w-4 h-4 ${hoveredTier === 'Growth' ? 'text-blue-600' : 'text-[#1c3c66]'}`} />
                <span className="text-sm font-medium text-slate-700">50 Candidate Reports / mo</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className={`w-4 h-4 ${hoveredTier === 'Growth' ? 'text-blue-600' : 'text-[#1c3c66]'}`} />
                <span className="text-sm font-medium text-slate-700">Advanced Skill Graphing</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className={`w-4 h-4 ${hoveredTier === 'Growth' ? 'text-blue-600' : 'text-[#1c3c66]'}`} />
                <span className="text-sm font-medium text-slate-700">ATS Integration</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className={`w-4 h-4 ${hoveredTier === 'Growth' ? 'text-blue-600' : 'text-[#1c3c66]'}`} />
                <span className="text-sm font-medium text-slate-700">Priority Support</span>
              </li>
            </ul>
            
            <button className={`w-full py-3 rounded-lg font-semibold transition-all mt-auto ${
              hoveredTier === 'Growth'
                ? 'bg-[#1c3c66] text-white hover:bg-[#122b4f] shadow-md'
                : 'border border-slate-300 text-slate-700 hover:bg-white hover:border-slate-400'
            }`}>
              Get Growth
            </button>
          </div>

          {/* Card 3: Enterprise */}
          <div 
            onMouseEnter={() => setHoveredTier('Enterprise')}
            className={`rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
              hoveredTier === 'Enterprise'
                ? 'bg-white border-2 border-[#1c3c66] shadow-xl md:scale-105 z-10'
                : 'bg-slate-50 border border-slate-200 hover:shadow-lg scale-100 z-0'
            }`}
          >
            <h3 className="text-lg font-bold text-[#0a152e] mb-2">Enterprise</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-black text-[#0a152e]">$199</span>
              <span className="text-sm font-medium text-slate-500">/month</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className={`w-4 h-4 ${hoveredTier === 'Enterprise' ? 'text-blue-600' : 'text-[#1c3c66]'}`} />
                <span className="text-sm font-medium text-slate-600">Unlimited Reports</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className={`w-4 h-4 ${hoveredTier === 'Enterprise' ? 'text-blue-600' : 'text-[#1c3c66]'}`} />
                <span className="text-sm font-medium text-slate-600">Custom Benchmarking</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className={`w-4 h-4 ${hoveredTier === 'Enterprise' ? 'text-blue-600' : 'text-[#1c3c66]'}`} />
                <span className="text-sm font-medium text-slate-600">Dedicated Success Manager</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className={`w-4 h-4 ${hoveredTier === 'Enterprise' ? 'text-blue-600' : 'text-[#1c3c66]'}`} />
                <span className="text-sm font-medium text-slate-600">SOC2 Compliance Package</span>
              </li>
            </ul>
            
            <button className={`w-full py-3 rounded-lg font-semibold transition-colors mt-auto ${
              hoveredTier === 'Enterprise'
                ? 'bg-[#1c3c66] text-white hover:bg-[#122b4f] shadow-md'
                : 'border border-slate-300 text-slate-700 hover:bg-white hover:border-slate-400'
            }`}>
              Contact Sales
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;
