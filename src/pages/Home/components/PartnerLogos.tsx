const PartnerLogos = () => {
  const logos = ['NEXUS', 'EQUITY', 'VELOCITY', 'CORE_LINK'];

  return (
    <section className="w-full bg-white py-16 border-b border-slate-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-slate-400 uppercase mb-10 text-center">
          POWERING TALENT DECISIONS FOR
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20 items-center justify-center w-full max-w-4xl">
          {logos.map((logo) => (
            <div key={logo} className="flex justify-center group">
              <span className="text-xl sm:text-2xl font-black tracking-[0.15em] text-slate-300 group-hover:text-slate-700 transition-colors duration-300 cursor-default">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
