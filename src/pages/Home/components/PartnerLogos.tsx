const PartnerLogos = () => {
  const logos = ['NEXUS', 'EQUITY', 'VELOCITY', 'CORE_LINK'];

  return (
    <section className="w-full bg-[#f8fafc] py-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-8 sm:mb-12 text-center">
          POWERING TALENT DECISIONS FOR
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-24 items-center justify-center w-full max-w-4xl opacity-[0.55] hover:opacity-100 transition-opacity duration-300">
          {logos.map((logo) => (
            <div className="flex justify-center">
              <span className="text-xl sm:text-2xl font-black tracking-widest text-slate-800 font-sans">
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
