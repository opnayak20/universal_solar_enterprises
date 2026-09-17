import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  BatteryCharging,
  Wrench,
  Cable,
  Settings,
  CheckCircle2
} from "lucide-react";

const MaterialInfo = () => {
  const materials = [
    {
      title: "Conductor & Cabling",
      general: "Standard Aluminum Wire",
      heavy: "Tinned Earthing Wire",
      premium: "Heavy Duty Solar DC Copper Cables (UV Resistant)",
      icon: Cable,
    },
    {
      title: "Earthing & Surge Protection",
      general: "Conventional Plate Earthing",
      heavy: "Chemical Pipe Earthing",
      premium: "Maintenance-Free Chemical Earthing + Type-II SPD",
      icon: Zap,
    },
    {
      title: "Mounting Structure Build",
      general: "Standard Iron Frame",
      heavy: "Pre-Galvanized Structure",
      premium: "Hot-Dip Galvanized (HDG) 80+ Micron High-Wind Structure",
      icon: Wrench,
    },
    {
      title: "DCDB & ACDB Combiner Boxes",
      general: "Standard Fuse Box",
      heavy: "SPD with MCB Protection",
      premium: "IP65 Weatherproof Box with Class-1 Surge Arrestors",
      icon: BatteryCharging,
    },
    {
      title: "Fasteners & Hardware",
      general: "Mild Steel Screws",
      heavy: "Galvanized Bolts",
      premium: "Stainless Steel SS304 / SS316 Anti-Rust Fasteners",
      icon: Settings,
    },
    {
      title: "Solar Module Quality",
      general: "Polycrystalline Panels",
      heavy: "Mono PERC Half-Cut",
      premium: "Tier-1 TOPCon / Bifacial High-Efficiency Modules",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="material-info" className="py-14 sm:py-20 bg-slate-50/80">
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
              Quality Assurance
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight">
              Premium Material Specifications
            </h2>
            <div className="w-16 h-1 bg-emerald-600 mx-auto rounded-full mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-lg text-gray-600 px-2">
              Solar Enterprises installs strictly Tier-1 components designed to withstand severe weather and guarantee 25+ years of peak generation.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {materials.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center space-x-3 mb-4 sm:mb-5">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-gray-900">
                        {item.title}
                      </h3>
                    </div>

                    {/* Specs Comparison */}
                    <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                      <div className="p-2.5 rounded-lg bg-slate-50 text-slate-600">
                        <span className="font-semibold text-slate-800 block text-[11px] uppercase mb-0.5">
                          Standard Market:
                        </span>
                        {item.general}
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-50/50 text-emerald-900 border border-emerald-100">
                        <span className="font-semibold text-emerald-800 block text-[11px] uppercase mb-0.5 flex items-center">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600 inline flex-shrink-0" />
                          Solar Enterprises Premium:
                        </span>
                        {item.premium}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MaterialInfo;