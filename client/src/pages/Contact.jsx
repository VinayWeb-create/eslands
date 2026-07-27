import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../lib/api';
import { toast } from 'react-toastify';
import { Phone, Mail, MapPin, Send, Sparkles, ChevronDown, Layers } from 'lucide-react';

const serviceMap = {
  'web-development': 'Web Development',
  'mobile-development': 'Mobile Development',
  'software-development': 'Software Development',
  'networking': 'Networking & Infrastructure',
  'naming': 'Professional Naming',
  'branding': 'Branding & Identity',
  'animation': '2D Animation & Motion',
  'ecommerce': 'E-commerce Platforms',
  'seo-marketing': 'SEO & Growth Marketing',
  'redesign': 'System Modernization',
  'logo-design': 'Logo & Brand Systems',
  'social-media': 'Social Media Marketing',
};

export default function Contact() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    service: 'General Inquiry',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const paramService = searchParams.get('service') || searchParams.get('selectedService');
    const stateService = location.state?.service;
    const targetService = paramService || stateService;

    if (targetService) {
      const lower = targetService.toLowerCase();
      const matched = serviceMap[lower] || Object.values(serviceMap).find(s => s.toLowerCase() === lower) || targetService;
      setForm((prev) => ({ ...prev, service: matched }));
    }
  }, [searchParams, location.state]);

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleValidationAndSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg('');
    setErrorMsg('');

    const newErrors = {};
    const phoneFormat = /^[0-9 ]+$/;
    const mailFormat = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
    requiredFields.forEach((field) => {
      if (!form[field].trim()) {
        newErrors[field] = 'Please Fill this Field.';
      }
    });

    if (form.email && !form.email.match(mailFormat)) {
      newErrors.email = 'Please enter valid email address.';
    }

    if (form.phone && !form.phone.match(phoneFormat)) {
      newErrors.phone = 'Please enter valid Phone Number.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setSuccessMsg('Sending your message. Please wait....');
    try {
      await api.post('/api/contact', form);
      setSuccessMsg('Thank You for contacting us, We have received your message and our representative will contact you as soon as possible.');
      setForm({ name: '', email: '', phone: '', subject: '', service: 'General Inquiry', message: '' });
    } catch (error) {
      setSuccessMsg('');
      setErrorMsg('Sorry. Something went wrong. Please try after sometime.');
      toast.error(error?.response?.data?.message || 'Sorry, something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-300 overflow-x-hidden pt-[65px]">
      {/* Glow Backdrops */}
      <div className="pointer-events-none fixed left-0 top-0 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[160px]" />
      <div className="pointer-events-none fixed right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[160px]" />

      {/* Page Banner */}
      <section className="relative h-[280px] flex items-center justify-center border-b border-white/10 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/ban-1.jpg"
            alt="Get in touch banner background"
            className="w-full h-full object-cover opacity-30 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-3 inline-block">
              <Sparkles size={13} className="inline mr-1" /> Enterprise Support
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-3 uppercase">
              Get In Touch
            </h1>
            <p className="text-slate-300 max-w-lg mx-auto text-sm sm:text-base leading-relaxed font-medium">
              We are ready to architect your next digital capability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-14 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          
          {/* Left Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="spotlight-card rounded-[2.5rem] border border-white/10 bg-slate-900/90 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden"
          >
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Send Us A Message
            </h2>
            <p className="text-sm leading-relaxed text-slate-400 mb-8 font-medium">
              Need to discuss your project requirements? <span className="text-sky-400 font-bold">We respond within 24 hours.</span>
            </p>

            <form className="space-y-5" onSubmit={handleValidationAndSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="form-name" className="sr-only">Name</label>
                  <input
                    id="form-name"
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full rounded-2xl border border-white/15 bg-slate-950/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none transition-colors"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="form-email" className="sr-only">Email</label>
                  <input
                    id="form-email"
                    type="text"
                    placeholder="Business Email"
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full rounded-2xl border border-white/15 bg-slate-950/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none transition-colors"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="form-phone" className="sr-only">Phone Number</label>
                  <input
                    id="form-phone"
                    type="text"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full rounded-2xl border border-white/15 bg-slate-950/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none transition-colors"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="form-subject" className="sr-only">Subject</label>
                  <input
                    id="form-subject"
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full rounded-2xl border border-white/15 bg-slate-950/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none transition-colors"
                  />
                  {errors.subject && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.subject}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="form-service" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-400 mb-1.5 ml-1">
                  <Layers size={13} /> Select Service / Capability Required
                </label>
                <div className="relative">
                  <select
                    id="form-service"
                    value={form.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    className="w-full appearance-none rounded-2xl border border-white/15 bg-slate-950/80 px-4 py-3.5 text-sm text-white focus:border-sky-400 focus:outline-none transition-colors pr-10 cursor-pointer font-medium"
                  >
                    <option value="General Inquiry" className="bg-slate-900 text-white">General Inquiry / Consultation</option>
                    <option value="Web Development" className="bg-slate-900 text-white">Web Development & Cloud Applications</option>
                    <option value="Mobile Development" className="bg-slate-900 text-white">Mobile Development (iOS & Android)</option>
                    <option value="Software Development" className="bg-slate-900 text-white">Bespoke Software Development</option>
                    <option value="Networking & Infrastructure" className="bg-slate-900 text-white">Networking & Infrastructure</option>
                    <option value="Professional Naming" className="bg-slate-900 text-white">Professional Brand Naming</option>
                    <option value="Branding & Identity" className="bg-slate-900 text-white">Branding & Identity Systems</option>
                    <option value="2D Animation & Motion" className="bg-slate-900 text-white">2D Animation & Motion Graphics</option>
                    <option value="E-commerce Platforms" className="bg-slate-900 text-white">E-commerce Platforms</option>
                    <option value="SEO & Growth Marketing" className="bg-slate-900 text-white">SEO & Growth Marketing</option>
                    <option value="System Modernization" className="bg-slate-900 text-white">System & UX Modernization</option>
                    <option value="Logo & Brand Systems" className="bg-slate-900 text-white">Logo & Brand Systems</option>
                    <option value="Social Media Marketing" className="bg-slate-900 text-white">Social Media Marketing</option>
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="form-message" className="sr-only">Message</label>
                <textarea
                  id="form-message"
                  rows={5}
                  placeholder="Tell us about your technical requirements..."
                  value={form.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full resize-none rounded-2xl border border-white/15 bg-slate-950/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none transition-colors"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-4 text-xs font-bold text-white shadow-xl shadow-sky-500/20 hover:brightness-110 transition-all uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} />
                Send Message
              </button>

              {successMsg && (
                <p className="text-emerald-400 text-xs font-semibold mt-4 border border-emerald-400/30 bg-emerald-500/10 rounded-2xl p-4 leading-6">
                  {successMsg}
                </p>
              )}
              {errorMsg && (
                <p className="text-red-400 text-xs font-semibold mt-4 border border-red-400/30 bg-red-500/10 rounded-2xl p-4 leading-6">
                  {errorMsg}
                </p>
              )}
            </form>
          </motion.div>

          {/* Right Column: Address Details & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="spotlight-card rounded-[2.5rem] border border-white/10 bg-slate-900/90 backdrop-blur-2xl p-8 shadow-2xl">
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-2">Mailing Address</h4>
                    <address className="text-xs leading-relaxed text-slate-300 not-italic font-medium">
                      Suite-G,<br />
                      Weller House,<br />
                      58-60 Longbridge Rd, Barking,<br />
                      London, IG11 8RT.
                    </address>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-2">Contact Info</h4>
                    <ul className="text-xs leading-relaxed text-slate-300 space-y-2 font-medium">
                      <li>
                        <span className="text-slate-400">Phone: </span> 
                        <a href="tel:02038190333" className="hover:text-sky-300 font-bold text-white transition">020 3819 0333</a>
                      </li>
                      <li>
                        <span className="text-slate-400">Mail: </span> 
                        <a href="mailto:info@eslanditsolutions.com" className="hover:text-sky-300 transition text-sky-400 font-semibold">info@eslanditsolutions.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Box */}
            <div className="rounded-[2.5rem] border border-white/10 overflow-hidden h-[320px] shadow-2xl relative bg-slate-900">
              <iframe
                title="Esland IT Solutions Office Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.691646495486!2d0.07895821577108171!3d51.53721527964005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a66d4184d01d%3A0x4fc9c915675b5d4b!2sRadial+House%2C+3-5+Ripple+Rd%2C+Barking+IG11+7NP%2C+UK!5e0!3m2!1sen!2sin!4v1483707062936"
                className="w-full h-full border-0 filter invert-[0.9] hue-rotate-180 brightness-90 contrast-125"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
