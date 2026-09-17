import { motion } from 'framer-motion';
import { useInstantDB } from '../hooks/useInstantDB';
import { CheckCircle } from 'lucide-react';

const Services = () => {
  const { data } = useInstantDB();

  return (
    <section id="services" className="py-14 sm:py-20 bg-slate-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="text-emerald-700 font-bold text-xs sm:text-sm tracking-wider uppercase mb-1.5 sm:mb-2 block">
              What We Deliver
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight">
              Solar Energy Solutions & Services
            </h2>
            <div className="w-16 h-1 bg-emerald-600 mx-auto rounded-full mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-lg text-gray-600 px-2">
              Custom-engineered solar solutions for homes, commercial establishments, and agriculture in Chhattisgarh.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {data.services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 p-2.5 sm:p-3 bg-emerald-50/60 rounded-xl inline-block group-hover:scale-105 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-emerald-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Industries Served */}
          {data.industries && data.industries.length > 0 && (
            <div className="mt-12 sm:mt-20 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Sectors & Industries We Power
              </h3>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto px-2">
                {data.industries.map((industry, index) => (
                  <div
                    key={index}
                    className="bg-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-gray-800 shadow-sm hover:border-emerald-500 transition-colors"
                  >
                    {industry}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Strengths */}
          {data.strengths && data.strengths.length > 0 && (
            <div className="mt-12 sm:mt-16 bg-gradient-to-r from-emerald-900 to-teal-950 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white shadow-xl">
              <div className="max-w-3xl mb-6 sm:mb-8">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-1.5 sm:mb-2">
                  The Solar Enterprises Advantage
                </span>
                <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                  Why Clients in Chhattisgarh Choose Us
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {data.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start space-x-2.5 sm:space-x-3 bg-white/5 p-3.5 sm:p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
