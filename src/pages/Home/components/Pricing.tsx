import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';

const Pricing = () => {
  const [hoveredTier, setHoveredTier] = useState<string>('Growth');

  const tiers = [
    {
      name: 'Standard',
      price: '$0',
      period: '/month',
      description: 'For individuals exploring TrustScore',
      features: ['5 Candidate Reports / mo', 'Basic Skill Verification', 'Community Support'],
      cta: 'Start Free',
      highlighted: false
    },
    {
      name: 'Growth',
      price: '$49',
      period: '/month',
      description: 'For growing teams and recruiters',
      features: ['50 Candidate Reports / mo', 'Advanced Skill Graphing', 'ATS Integration', 'Priority Support'],
      cta: 'Get Growth',
      highlighted: true,
      badge: 'MOST POPULAR'
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      description: 'For large organizations at scale',
      features: ['Unlimited Reports', 'Custom Benchmarking', 'Dedicated Success Manager', 'SOC2 Compliance Package'],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="w-full bg-gradient-to-b from-slate-50/50 to-white py-28 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-[0.15em] mb-6 border border-slate-200">
            PRICING PLANS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a152e] mb-5">Choose Your Tier</h2>
          <p className="text-slate-500 font-medium text-lg">Simple, predictable pricing for teams of all sizes.</p>
        </div>

        {/* Pricing Cards */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch"
          onMouseLeave={() => setHoveredTier('Growth')}
        >
          {tiers.map((tier) => {
            const isActive = hoveredTier === tier.name;
            return (
              <div 
                key={tier.name}
                onMouseEnter={() => setHoveredTier(tier.name)}
                className={`relative rounded-[2rem] p-8 lg:p-9 transition-all duration-300 cursor-pointer flex flex-col ${
                  isActive 
                    ? 'bg-white border-2 border-[#1a365d] shadow-2xl shadow-blue-900/10 md:scale-[1.03] z-10' 
                    : 'bg-white border border-slate-200 hover:shadow-lg scale-100 z-0'
                }`}
              >
                {tier.badge && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#1a365d] to-[#2b5a9e] text-white text-[9px] uppercase font-bold tracking-[0.15em] py-2 px-5 rounded-full shadow-lg shadow-blue-900/25">
                      <Sparkles className="w-3 h-3" />
                      {tier.badge}
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#0a152e] mb-1">{tier.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{tier.description}</p>
                </div>
                
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black text-[#0a152e] tracking-tight">{tier.price}</span>
                  <span className="text-sm font-medium text-slate-400">{tier.period}</span>
                </div>
                
                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-blue-50' : 'bg-slate-50'
                      }`}>
                        <Check className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      </div>
                      <span className="text-sm font-medium text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 rounded-2xl font-semibold transition-all text-sm ${
                  isActive
                    ? 'bg-gradient-to-r from-[#1a365d] to-[#2b5a9e] text-white hover:from-[#122b4f] hover:to-[#1e4a8a] shadow-lg shadow-blue-900/20 active:scale-[0.98]'
                    : 'border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}>
                  {tier.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
