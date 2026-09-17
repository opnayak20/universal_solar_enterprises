import { useState, useEffect } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import { useInstantDB } from '../hooks/useInstantDB';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data } = useInstantDB();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Material Specs', id: 'material-info' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-2.5 sm:py-3'
          : 'bg-gradient-to-b from-black/70 via-black/35 to-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group min-w-0"
            onClick={() => scrollToSection('home')}
          >
            <div className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
              <img
                src="/logo-emblem.png"
                alt={data.company}
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain drop-shadow-md"
              />
            </div>

            <div className="min-w-0">
              <span
                className={`text-base sm:text-xl font-extrabold tracking-tight block truncate ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                {data.company}
              </span>
              <span
                className={`text-[10px] sm:text-xs block font-medium -mt-0.5 tracking-wide truncate ${
                  scrolled ? 'text-emerald-700' : 'text-emerald-300'
                }`}
              >
                Raipur, Chhattisgarh
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  scrolled
                    ? 'text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/80'
                    : 'text-white/90 hover:text-white hover:bg-white/15'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => scrollToSection('contact')}
              className={`hidden sm:inline-flex items-center space-x-1.5 sm:space-x-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm ${
                scrolled
                  ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                  : 'bg-emerald-600 text-white hover:bg-emerald-500'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Contact Us</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-xl transition-colors focus:outline-none ${
                scrolled
                  ? 'text-gray-900 hover:bg-gray-100'
                  : 'text-white hover:bg-white/20'
              }`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Clean Fullscreen / Modal Friendly overlay) */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] sm:top-[65px] bottom-0 bg-white/98 backdrop-blur-xl border-t border-gray-100 shadow-2xl px-5 pt-4 pb-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full flex items-center justify-between text-left px-4 py-3.5 rounded-xl text-base font-semibold text-gray-800 hover:text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-gray-400 text-sm">→</span>
              </button>
            ))}
          </div>

          <div className="pt-4 mt-auto border-t border-gray-100 space-y-3">
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3.5 rounded-xl text-base font-bold bg-emerald-700 active:bg-emerald-800 text-white shadow-md transition-colors"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Request Free Consultation</span>
            </button>
            <div className="text-center text-xs text-gray-500 font-medium">
              Raipur, Chhattisgarh • Call: {data.contact?.phone || '+91 98765 43210'}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;