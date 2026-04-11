import { Link2, Sparkles, ShieldCheck } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Link2 className="w-5 h-5 text-blue-600" />,
      title: 'Connect',
      description: 'Integrate your ATS or talent pool directly into the TrustScore engine with zero-config API connectors.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-blue-600" />,
      title: 'Analyze',
      description: 'Our LLM-powered lens scrutinizes technical output, cultural alignment, and career velocity across billions of data points.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      title: 'Verify',
      description: 'Receive an immutable score and a precision report, giving you total confidence in your hiring decision.'
    }
  ];

  return (
    <section id="resources" className="w-full bg-white py-20 lg:py-28 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a152e] tracking-tight mb-4 text-center lg:text-left">
            How it works
          </h2>
          <p className="text-base text-slate-500 max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            Our proprietary methodology ensures every score is backed by real-world performance metrics.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 shadow-inner border border-blue-100">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-[#0a152e] mb-3">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500 font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
