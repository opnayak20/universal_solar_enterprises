import { motion } from 'framer-motion';
import { Award, CheckCircle2, Users, ShieldCheck } from 'lucide-react';
import { useInstantDB } from '../hooks/useInstantDB';

const About = () => {
  const { data } = useInstantDB();

  const features = [
    {
      icon: Award,
      title: 'ISO Quality Standards',
      desc: 'Strict quality benchmarks & electrical safety standards.',
    },
    {
      icon: ShieldCheck,
      title: 'CREDA & MNRE Compliant',
      desc: 'Official solar installation compliance & net-metering support.',
    },
    {
      icon: Users,
      title: 'Certified Engineering Team',
      desc: 'Experienced solar technicians & project managers in Chhattisgarh.',
    },
    {
      icon: CheckCircle2,
      title: 'End-to-End Execution',
      desc: 'Site inspection, subsidy paperwork, design, installation & O&M.',
    },
  ];

  return (
    <section id="about" className="py-14 sm:py-20 bg-white">
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
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight">
              {data.about.heading}
            </h2>
            <div className="w-16 h-1 bg-emerald-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Left Story */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <p className="text-sm sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line font-normal">
                {data.about.text}
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start sm:items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5 sm:mt-0">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm sm:text-base">
                    Authorized Renewable Energy Contractor
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800">
                    {data.about.certifications}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side Feature Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2.5 sm:mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;