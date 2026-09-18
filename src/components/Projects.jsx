import { motion } from 'framer-motion';
import { MapPin, Zap, ArrowUpRight } from 'lucide-react';
import { useInstantDB } from '../hooks/useInstantDB';

const Projects = () => {
  const { data } = useInstantDB();

  return (
    <section id="projects" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="text-emerald-700 font-bold text-xs sm:text-sm tracking-wider uppercase mb-1.5 sm:mb-2 block">
              Portfolio
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight">
              Featured Solar Installations
            </h2>
            <div className="w-16 h-1 bg-emerald-600 mx-auto rounded-full mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-lg text-gray-600 leading-relaxed px-2">
              Demonstrating excellence in solar project execution across Agra and Uttar Pradesh.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {data.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Project Image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-100">
                    {project.img ? (
                      <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-emerald-700 flex items-center justify-center">
                        <Zap className="w-12 h-12 text-white/50" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-emerald-700 text-white px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold shadow-md">
                      {project.capacity}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center text-xs font-semibold text-emerald-700 mb-1.5 sm:mb-2">
                      <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-emerald-700 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                  <span>Turnkey EPC Execution</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Clean Assurance Banner */}
          <div className="mt-12 sm:mt-16 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10 text-center max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Have a Rooftop or Commercial Space in Chhattisgarh?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-xs sm:text-base mb-6 leading-relaxed">
              Our engineering team conducts free structural feasibility and solar irradiance audits to provide accurate energy yield and payback calculations.
            </p>
            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-colors shadow-sm"
            >
              <span>Schedule Free Site Feasibility Survey</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;