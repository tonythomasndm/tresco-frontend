import { Link2, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Link2 className="w-6 h-6 text-white" />,
      title: 'Connect',
      description: 'Integrate your ATS or talent pool directly into the Tresco engine with zero-config API connectors.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-white" />,
      title: 'Analyze',
      step: '02',
      description: 'Our LLM-powered lens scrutinizes technical output, cultural alignment, and career velocity across billions of data points.',
      gradient: 'from-violet-500 to-purple-600',
      shadowColor: 'shadow-violet-500/25'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      title: 'Verify',
      step: '03',
      description: 'Receive an immutable score and a precision report, giving you total confidence in your hiring decision.',
      gradient: 'from-emerald-500 to-teal-600',
      shadowColor: 'shadow-emerald-500/25'
    }
  ];

  return (
    <section id="resources" className="w-full bg-gradient-to-b from-white to-slate-50/50 py-24 lg:py-32 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-[0.15em] mb-6 border border-slate-200">
            SIMPLE PROCESS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a152e] tracking-tight mb-5">
            How it works
          </h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Our proprietary methodology ensures every score is backed by real-world performance metrics.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg shadow-slate-100/50 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Step Number */}
              <span className="absolute top-6 right-6 text-[11px] font-black text-slate-200 tracking-widest">
                {step.step}
              </span>

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-7 shadow-xl ${step.shadowColor} group-hover:scale-110 transition-transform`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-extrabold text-[#0a152e] mb-3">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500 font-medium mb-6">
                {step.description}
              </p>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-[#2b5a9e] opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
