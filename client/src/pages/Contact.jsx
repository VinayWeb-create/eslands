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
    company: '',
    phone: '',
    subject: 'General Inquiry',
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

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'proposal') {
      setForm(prev => ({ ...prev, subject: 'Get Proposal' }));
    } else if (mode === 'consultation') {
      setForm(prev => ({ ...prev, subject: 'Book Consultation' }));
    } else {
      setForm(prev => ({ ...prev, subject: 'General Inquiry' }));
    }
  }, [searchParams]);

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
      setSuccessMsg('Enquiry submitted successfully! Thank you for contacting us, we have received your message and our representative will contact you as soon as possible.');
      setForm({ name: '', email: '', company: '', phone: '', subject: 'General Inquiry', service: 'General Inquiry', message: '' });
    } catch (error) {
      setSuccessMsg('');
      setErrorMsg('Sorry. Something went wrong. Please try after sometime.');
      toast.error(error?.response?.data?.message || 'Sorry, something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-700 overflow-x-hidden pt-[65px]">
      {/* Glow Backdrops */}
      <div className="pointer-events-none fixed left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-50/40 blur-[160px]" />

      {/* Page Banner */}
      <section className="relative h-[240px] flex items-center justify-center border-b border-[#E4E9F0] overflow-hidden bg-[#F8FAFC]">
        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-badge mb-3 inline-block">
              <Sparkles size={13} className="inline mr-1 animate-pulse" /> Enterprise Support
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-gray-900 mb-3 uppercase">
              Get In Touch
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base leading-relaxed font-medium">
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
            className="rounded-lg border border-[#E4E9F0] bg-white p-8 sm:p-10 shadow-sm relative overflow-hidden"
          >
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-900 mb-2">
              Send Us A Message
            </h2>
            <p className="text-sm leading-relaxed text-gray-500 mb-8 font-medium">
              Need to discuss your project requirements? <span className="text-[#003087] font-bold">We respond within 24 hours.</span>
            </p>

            <form className="space-y-5" onSubmit={handleValidationAndSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="form-name" className="flex items-center text-xs font-bold uppercase tracking-wider text-[#003087] mb-1.5 ml-1">Full Name *</label>
                  <input
                    id="form-name"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full rounded-lg border border-[#E4E9F0] bg-white px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#003087] focus:outline-none transition-colors"
                  />
                  {errors.name && <p className="text-red-600 text-xs mt-1.5 ml-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="form-email" className="flex items-center text-xs font-bold uppercase tracking-wider text-[#003087] mb-1.5 ml-1">Business Email *</label>
                  <input
                    id="form-email"
                    type="text"
                    placeholder="john@company.com"
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full rounded-lg border border-[#E4E9F0] bg-white px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#003087] focus:outline-none transition-colors"
                  />
                  {errors.email && <p className="text-red-600 text-xs mt-1.5 ml-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="form-company" className="flex items-center text-xs font-bold uppercase tracking-wider text-[#003087] mb-1.5 ml-1">Company</label>
                  <input
                    id="form-company"
                    type="text"
                    placeholder="Your Company"
                    value={form.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full rounded-lg border border-[#E4E9F0] bg-white px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#003087] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="form-phone" className="flex items-center text-xs font-bold uppercase tracking-wider text-[#003087] mb-1.5 ml-1">Phone *</label>
                  <input
                    id="form-phone"
                    type="text"
                    placeholder="+91 00000 00000"
                    value={form.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full rounded-lg border border-[#E4E9F0] bg-white px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#003087] focus:outline-none transition-colors"
                  />
                  {errors.phone && <p className="text-red-600 text-xs mt-1.5 ml-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="form-service" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#003087] mb-1.5 ml-1">
                  <Layers size={13} /> Service of Interest
                </label>
                <div className="relative">
                  <select
                    id="form-service"
                    value={form.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#E4E9F0] bg-white px-4 py-3.5 text-sm text-gray-700 focus:border-[#003087] focus:outline-none transition-colors pr-10 cursor-pointer font-medium"
                  >
                    <option value="General Inquiry" className="text-gray-700 bg-white">Select a service</option>
                    <option value="Web Development" className="text-gray-700 bg-white">Web Development</option>
                    <option value="Mobile Development" className="text-gray-700 bg-white">Mobile Development</option>
                    <option value="Software Development" className="text-gray-700 bg-white">Software Development</option>
                    <option value="Networking & Infrastructure" className="text-gray-700 bg-white">Networking & Infrastructure</option>
                    <option value="Professional Naming" className="text-gray-700 bg-white">Professional Naming</option>
                    <option value="Branding & Identity" className="text-gray-700 bg-white">Branding & Identity</option>
                    <option value="2D Animation & Motion" className="text-gray-700 bg-white">2D Animation & Motion</option>
                    <option value="E-commerce Platforms" className="text-gray-700 bg-white">E-commerce Platforms</option>
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="form-message" className="flex items-center text-xs font-bold uppercase tracking-wider text-[#003087] mb-1.5 ml-1">Project Details *</label>
                <textarea
                  id="form-message"
                  rows={5}
                  placeholder="What are you trying to achieve? Current pain points, timeline, and any technical or compliance constraints..."
                  value={form.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full resize-none rounded-lg border border-[#E4E9F0] bg-white px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#003087] focus:outline-none transition-colors"
                />
                {errors.message && <p className="text-red-600 text-xs mt-1.5 ml-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#003087] px-8 py-4 text-xs font-bold text-white shadow hover:bg-[#002068] transition-all uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} />
                Submit Inquiry
              </button>

              {successMsg && (
                <p className="text-green-700 text-xs font-semibold mt-4 border border-green-200 bg-green-50 rounded-lg p-4 leading-6">
                  {successMsg}
                </p>
              )}
              {errorMsg && (
                <p className="text-red-600 text-xs font-semibold mt-4 border border-red-200 bg-red-50 rounded-lg p-4 leading-6">
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
            <div className="rounded-lg border border-[#E4E9F0] bg-white p-8 shadow-sm">
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#003087] border border-blue-100">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-display font-bold text-gray-900 mb-2">Mailing Address</h4>
                    <address className="text-xs leading-relaxed text-gray-600 not-italic font-medium">
                      Suite-G,<br />
                      Weller House,<br />
                      58-60 Longbridge Rd, Barking,<br />
                      London, IG11 8RT.
                    </address>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#003087] border border-blue-100">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-display font-bold text-gray-900 mb-2">Contact Info</h4>
                    <ul className="text-xs leading-relaxed text-gray-600 space-y-2 font-medium">
                      <li>
                        <span className="text-gray-400">Phone: </span> 
                        <a href="tel:02038190333" className="hover:text-[#003087] font-bold text-gray-900 transition">020 3819 0333</a>
                      </li>
                      <li>
                        <span className="text-gray-400">Mail: </span> 
                        <a href="mailto:info@eslanditsolutions.com" className="hover:text-[#002068] transition text-[#003087] font-semibold">info@eslanditsolutions.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Box */}
            <div className="rounded-lg border border-[#E4E9F0] overflow-hidden h-[320px] shadow-sm relative bg-gray-50">
              <iframe
                title="Esland IT Solutions Office Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.691646495486!2d0.07895821577108171!3d51.53721527964005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a66d4184d01d%3A0x4fc9c915675b5d4b!2sRadial+House%2C+3-5+Ripple+Rd%2C+Barking+IG11+7NP%2C+UK!5e0!3m2!1sen!2sin!4v1483707062936"
                className="w-full h-full border-0 brightness-95"
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
