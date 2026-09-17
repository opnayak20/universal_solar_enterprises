import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useInstantDB } from '../hooks/useInstantDB';

const Footer = () => {
  const { data } = useInstantDB();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-white border-t border-emerald-900/60 pt-12 sm:pt-16 pb-10 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-emerald-800/60">
          {/* Company Bio */}
          <div className="md:col-span-5 space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center flex-shrink-0">
                <img
                  src="/logo-emblem.png"
                  alt={data.company}
                  className="h-12 w-12 sm:h-14 sm:w-14 object-contain drop-shadow-md"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                  {data.company}
                </h3>
                <p className="text-xs text-emerald-300 font-medium tracking-wide">
                  {data.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-md pt-1 sm:pt-2">
              Leading solar EPC contractor in Raipur, Chhattisgarh offering top-tier rooftop solar plants, commercial installations, and agricultural pump systems with full subsidy and net-metering support.
            </p>

            <div className="inline-block px-3 py-1 rounded-lg bg-emerald-900/80 border border-emerald-700/50 text-[11px] sm:text-xs font-semibold text-emerald-300">
              ISO Certified • MNRE & CREDA Compliant
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 sm:mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-emerald-100/80">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About Us', id: 'about' },
                { label: 'Our Services', id: 'services' },
                { label: 'Featured Projects', id: 'projects' },
                { label: 'Material Specifications', id: 'material-info' },
                { label: 'Get in Touch', id: 'contact' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-emerald-300 transition-colors flex items-center space-x-1.5 py-0.5"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Raipur Office Details */}
          <div className="md:col-span-4 space-y-3 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 sm:mb-4">
              Office Details
            </h4>
            <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm text-emerald-100/80">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  {data.contact.address}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  {data.contact.phone} {data.contact.altPhone && `/ ${data.contact.altPhone}`}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="break-all">{data.contact.email}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{data.contact.businessHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left text-xs text-emerald-200/70 border-t border-emerald-900/40">
          <p>{data.footer}</p>
          <div className="flex items-center justify-center space-x-1">
            <span>Developed by</span>
            <a
              href="https://qubnixtechnology.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 hover:text-white font-bold transition-colors"
            >
              Qubnix Technology
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;