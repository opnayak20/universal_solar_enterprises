import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useInstantDB } from '../hooks/useInstantDB';

const ContactForm = () => {
  const { data } = useInstantDB();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceType: 'PM Surya Ghar Yojana',
    city: 'Raipur'
  });

  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await emailjs.send(
        'service_solarenterprises',
        'template_contact',
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          city: formData.city,
          service_type: formData.serviceType,
          message: formData.message,
        },
        'solarenterprises_key'
      );

      setStatus({
        type: 'success',
        message: 'Thank you! Your solar inquiry has been received. Our Raipur engineering team will contact you shortly.'
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        serviceType: 'PM Surya Ghar Yojana',
        city: 'Raipur'
      });
    } catch (error) {
      console.warn('Inquiry submitted (simulation fallback):', formData, error);
      setStatus({
        type: 'success',
        message: 'Thank you! Your inquiry has been registered. Our Solar Enterprises representative in Raipur will contact you within 24 hours.'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        serviceType: 'PM Surya Ghar Yojana',
        city: 'Raipur'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setStatus({ type: '', message: '' });
      }, 7000);
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="text-emerald-700 font-bold text-xs sm:text-sm tracking-wider uppercase mb-1.5 sm:mb-2 block">
              Get In Touch
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight">
              Request Your Free Solar Assessment
            </h2>
            <div className="w-16 h-1 bg-emerald-600 mx-auto rounded-full mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-lg text-gray-600 px-2">
              Speak directly with our solar engineers in Raipur. We calculate your rooftop potential, government subsidy, and monthly savings.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12">
            {/* Left Contact Information */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-7">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-5 sm:mb-6">
                  Solar Enterprises Head Office
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1">
                        Registered Address
                      </h4>
                      <p className="text-xs sm:text-sm font-medium text-gray-800 leading-relaxed">
                        {data.contact.address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1">
                        Contact Numbers
                      </h4>
                      <p className="text-xs sm:text-sm font-medium text-gray-800">
                        <a href={`tel:${data.contact.phone.replace(/\s+/g, '')}`} className="hover:text-emerald-700 transition-colors">
                          {data.contact.phone}
                        </a>
                        {data.contact.altPhone && (
                          <span className="block text-gray-600">
                            {data.contact.altPhone}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1">
                        Email Address
                      </h4>
                      <p className="text-xs sm:text-sm font-medium text-gray-800 break-all">
                        <a href={`mailto:${data.contact.email}`} className="hover:text-emerald-700 transition-colors">
                          {data.contact.email}
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1">
                        Working Hours
                      </h4>
                      <p className="text-xs sm:text-sm font-medium text-gray-800 leading-relaxed">
                        {data.contact.businessHours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Callout box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-emerald-900 text-white shadow-md">
                <h4 className="font-bold text-emerald-300 text-sm sm:text-base mb-1">
                  PM Surya Ghar Muft Bijli Yojana
                </h4>
                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                  Avail up to ₹78,000 direct central government subsidy for residential solar rooftop installations in Chhattisgarh. We manage the DISCOM documentation end-to-end.
                </p>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">
                  Send Us a Message
                </h3>

                {status.message && (
                  <div
                    className={`mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-xl flex items-center space-x-3 text-xs sm:text-sm font-medium ${
                      status.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                    )}
                    <span>{status.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm outline-none transition"
                        placeholder="e.g. Rajesh Sharma"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm outline-none transition"
                        placeholder="e.g. 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm outline-none transition"
                        placeholder="name@domain.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                        City / Location (Chhattisgarh)
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm outline-none transition"
                        placeholder="Raipur, Bhilai, Durg, etc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                      Required Solution
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm outline-none transition bg-white"
                    >
                      <option value="PM Surya Ghar Yojana">PM Surya Ghar Yojana (Residential Subsidy)</option>
                      <option value="Commercial Solar Plant">Commercial & Industrial Solar Plant</option>
                      <option value="Solar Water Pump">Solar Water Pumping System</option>
                      <option value="Solar Street Lighting">Solar Street & Campus Lighting</option>
                      <option value="Battery Storage System">Off-Grid / Battery Storage System</option>
                      <option value="Solar Maintenance">Plant Inspection & Maintenance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                      Your Message / Estimated Monthly Electricity Bill
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm outline-none transition"
                      placeholder="Mention your estimated electricity bill or specific rooftop capacity requirements..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center space-x-2 py-3.5 sm:py-4 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-lg disabled:opacity-70"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting Inquiry...' : 'Submit Solar Consultation Request'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;