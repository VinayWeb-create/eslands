import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../lib/api';
import { toast } from 'react-toastify';
import { Phone, Mail, MapPin, Send, ChevronDown, Layers, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/ui/PageHero';

const inputCls = 'w-full rounded-2xl border border-[#E4E9F0] bg-white/80 px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 shadow-[0_1px_2px_rgba(15,23,41,0.04)] transition focus:border-[#0057D8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0057D8]/10';

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
    <div className="relative min-h-screen bg-[var(--color-bg)] text-gray-700 overflow-x-clip">
      <PageHero
        eyebrow="Enterprise Support"
        title={form.subject === 'Get Proposal' ? 'Get a tailored' : form.subject === 'Book Consultation' ? 'Book your free' : 'Get in'}
        highlight={form.subject === 'Get Proposal' ? 'proposal.' : form.subject === 'Book Consultation' ? 'consultation.' : 'touch.'}
        sub="We are ready to architect your next digital capability."
      >
        <div className="flex flex-wrap justify-center gap-2.5">
          <span className="ui-tag"><Clock size={14} /> Reply within 24 hours</span>
          <span className="ui-tag"><ShieldCheck size={14} /> NDA on request</span>
          <span className="ui-tag"><CheckCircle2 size={14} /> Senior architects only</span>
        </div>
      </PageHero>

      {/* Main Contact Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-10 sm:py-20 lg:px-14 relative z-10">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1.15fr_1fr] items-start">
          
          {/* Left Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="ui-panel"
          >
            <div className="ui-panel__shine" aria-hidden="true" />
            <h2 className="relative text-2xl sm:text-3xl font-display font-extrabold tracking-[-0.03em] text-gray-900 mb-2">
              Send Us A Message
            </h2>
            <p className="relative text-sm leading-relaxed text-gray-500 mb-8 font-medium">
              Need to discuss your project requirements? <span className="text-[#003087] font-bold">We respond within 24 hours.</span>
            </p>

            <form className="relative space-y-5" onSubmit={handleValidationAndSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="form-name" className="flex items-center text-xs font-bold uppercase tracking-wider text-[#003087] mb-1.5 ml-1">Full Name *</label>
                  <input
                    id="form-name"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={inputCls}
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
                    className={inputCls}
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
                    className={inputCls}
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
                    className={inputCls}
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
                    className={`${inputCls} appearance-none pr-10 cursor-pointer font-medium`}
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
                  className={`${inputCls} resize-none`}
                />
                {errors.message && <p className="text-red-600 text-xs mt-1.5 ml-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="ui-btn ui-btn--primary w-full sm:w-auto"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                  ) : (
                    <Send size={15} />
                  )}
                  Submit Inquiry
                </span>
              </button>

              {successMsg && (
                <p role="status" className="text-green-700 text-xs font-semibold mt-4 border border-green-200 bg-green-50 rounded-2xl p-4 leading-6">
                  {successMsg}
                </p>
              )}
              {errorMsg && (
                <p role="alert" className="text-red-600 text-xs font-semibold mt-4 border border-red-200 bg-red-50 rounded-2xl p-4 leading-6">
                  {errorMsg}
                </p>
              )}
            </form>
          </motion.div>

          {/* Right Column: Address Details & Map */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 lg:sticky lg:top-24"
          >
            <div className="ui-card ui-card--static ui-spot p-6 sm:p-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-3">
                  <div className="ui-icon-tile">
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
                  <div className="ui-icon-tile">
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
            <div className="ui-card ui-card--static overflow-hidden h-[300px] sm:h-[340px] relative bg-gray-50 p-1.5">
              <iframe
                title="Esland IT Solutions Office Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.691646495486!2d0.07895821577108171!3d51.53721527964005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a66d4184d01d%3A0x4fc9c915675b5d4b!2sRadial+House%2C+3-5+Ripple+Rd%2C+Barking+IG11+7NP%2C+UK!5e0!3m2!1sen!2sin!4v1483707062936"
                className="w-full h-full rounded-[18px] border-0 brightness-95"
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
