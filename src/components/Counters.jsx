import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Zap, Calendar, TrendingUp, Sparkles } from 'lucide-react';
import { useInstantDB } from '../hooks/useInstantDB';

const Counters = () => {
  const { data } = useInstantDB();

  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    mw: 0,
    years: 0,
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          animateCounters();
          setHasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;

    const targetProjects = data.counters?.projects || 500;
    const targetClients = data.counters?.clients || 450;
    const targetMw = data.counters?.mw || 15;
    const targetYears = data.counters?.years || 8;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;

      setCounters({
        projects: Math.min(Math.round((targetProjects / steps) * currentStep), targetProjects),
        clients: Math.min(Math.round((targetClients / steps) * currentStep), targetClients),
        mw: Math.min(Math.round((targetMw / steps) * currentStep), targetMw),
        years: Math.min(Math.round((targetYears / steps) * currentStep), targetYears),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);
  };

  const stats = [
    {
      icon: Award,
      label: 'Solar Installations',
      sublabel: 'Rooftop & Ground-Mounted',
      value: counters.projects,
      suffix: '+',
      badge: '99% On-Time',
      accentColor: 'from-emerald-400 to-teal-300',
      glowColor: 'group-hover:shadow-emerald-500/20',
    },
    {
      icon: Users,
      label: 'Satisfied Clients',
      sublabel: 'Homes & Enterprises',
      value: counters.clients,
      suffix: '+',
      badge: 'High Referral Rate',
      accentColor: 'from-teal-300 to-emerald-400',
      glowColor: 'group-hover:shadow-teal-500/20',
    },
    {
      icon: Zap,
      label: 'Clean Capacity',
      sublabel: 'Megawatts Installed',
      value: counters.mw,
      suffix: '+ MW',
      badge: 'Tier-1 High Yield',
      accentColor: 'from-emerald-300 to-cyan-400',
      glowColor: 'group-hover:shadow-cyan-500/20',
    },
    {
      icon: Calendar,
      label: 'Industry Experience',
      sublabel: 'In Solar Engineering',
      value: counters.years,
      suffix: '+ Yrs',
      badge: 'MNRE Certified',
      accentColor: 'from-cyan-300 to-emerald-400',
      glowColor: 'group-hover:shadow-teal-500/20',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-slate-950 text-white overflow-hidden"
    >
      {/* Subtle background ambient mesh glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl"></div>
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300 tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Delivering Measurable Energy Impact
          </h2>
        </div>

        {/* Modern Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-3xl p-7 bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800/90 hover:border-emerald-500/40 backdrop-blur-xl shadow-xl transition-all duration-300 ${stat.glowColor}`}
              >
                {/* Top Row: Icon and Pill Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/60 border border-slate-700/40 px-2.5 py-1 rounded-full">
                    {stat.badge}
                  </span>
                </div>

                {/* Big Number with Gradient Text */}
                <div className="mb-2">
                  <span className={`text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r ${stat.accentColor} bg-clip-text text-transparent font-sans`}>
                    {stat.value}
                  </span>
                  <span className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.accentColor} bg-clip-text text-transparent ml-1`}>
                    {stat.suffix}
                  </span>
                </div>

                {/* Label and Sublabel */}
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {stat.sublabel}
                  </p>
                </div>

                {/* Bottom interactive accent bar */}
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 group-hover:text-emerald-400 transition-colors">
                  <span className="font-semibold">Verified Metric</span>
                  <TrendingUp className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Counters;