import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useInstantDB } from '../hooks/useInstantDB';

const Hero = () => {
  const { data } = useInstantDB();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6"
    >
      {/* Background Image with refined overlay */}
      <div className="absolute inset-0">
        <img
          src="/solar-home-bg.png"
          alt="Solar Enterprises Installation"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Soft modern dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-emerald-950/85 to-black/90 sm:bg-gradient-to-r sm:from-emerald-950/90 sm:via-emerald-950/80 sm:to-black/75"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center text-white w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-sm font-medium text-emerald-200 mb-5 sm:mb-6 max-w-[95vw]">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
            <span className="truncate sm:whitespace-normal">MNRE & CREDA Authorized • Raipur, Chhattisgarh</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6 text-white px-2">
            {data.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-2xl font-semibold text-emerald-300 mb-4 sm:mb-5 tracking-wide px-2">
            {data.hero.subtitle}
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal px-3 sm:px-4">
            {data.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span>{data.hero.cta}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={scrollToProjects}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold bg-white/10 hover:bg-white/20 active:bg-white/25 text-white border border-white/20 backdrop-blur-md transition-all duration-200"
            >
              <span>View Recent Projects</span>
            </button>
          </div>

          {/* Highlights Pills */}
          <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-left max-w-3xl mx-auto px-2 sm:px-0">
            <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm p-3 sm:p-3.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-200">PM Surya Ghar Subsidy Assistance</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm p-3 sm:p-3.5 rounded-xl border border-white/10">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-200">Tier-1 Solar PV Modules</span>
            </div>
            <div className="sm:col-span-2 md:col-span-1 flex items-center space-x-3 bg-white/5 backdrop-blur-sm p-3 sm:p-3.5 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-200">25-Year Performance Warranty</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;