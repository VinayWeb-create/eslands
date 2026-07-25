import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../lib/api';
import { toast } from 'react-toastify';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field on change
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

    // Check empty fields (mimics jQuery's .js-message-details validation)
    const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
    requiredFields.forEach((field) => {
      if (!form[field].trim()) {
        newErrors[field] = 'Please Fill this Field.';
      }
    });

    // Validate email
    if (form.email && !form.email.match(mailFormat)) {
      newErrors.email = 'Please enter valid email address.';
    }

    // Validate phone number
    if (form.phone && !form.phone.match(phoneFormat)) {
      newErrors.phone = 'Please enter valid Phone Number.';
    }

    // If there are validation errors, update state and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    setLoading(true);
    setSuccessMsg('Sending your message. Please wait....');
    try {
      await api.post('/api/contact', form);
      setSuccessMsg('Thank You for contacting us, We have received your message and our representative will contact you as soon as possible.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setSuccessMsg('');
      setErrorMsg('Sorry. Something went wrong. Please try after sometime.');
      toast.error(error?.response?.data?.message || 'Sorry, something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-700 overflow-x-hidden pt-[65px]">
      {/* Background glow styling */}
      <div className="pointer-events-none fixed left-0 top-0 h-96 w-96 rounded-full bg-sky-500/5 blur-3xl" />
      <div className="pointer-events-none fixed right-0 bottom-0 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl" />

      {/* 1. Page Banner using ban-1.jpg */}
      <section className="relative h-[300px] flex items-center justify-center border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/ban-1.jpg"
            alt="Get in touch banner background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs uppercase tracking-[0.35em] text-sky-300 mb-2">Esland IT Solutions</p>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4 uppercase">
              Get in touch with us
            </h1>
            <p className="text-slate-200 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
              we are always ready to assist you
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          
          {/* Left Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="rounded-[2.5rem] border border-slate-200 bg-white p-8 sm:p-10 shadow-md relative overflow-hidden"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Drop Your Message
            </h2>
            <p className="text-sm leading-7 text-slate-500 mb-8">
              Need to talk to us ? <span className="text-sky-600 font-bold">We&apos;re Listening ....</span>
            </p>

            <form className="space-y-5" onSubmit={handleValidationAndSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name field */}
                <div>
                  <label htmlFor="form-name" className="sr-only">Name</label>
                  <input
                    id="form-name"
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="js-sender-name js-message-details w-full rounded-2xl border border-slate-250 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-455 transition focus:border-sky-500 focus:bg-white focus:outline-none"
                  />
                  {errors.name && <p className="js-error text-red-500 text-xs mt-1.5 ml-1">{errors.name}</p>}
                </div>

                {/* Email field */}
                <div>
                  <label htmlFor="form-email" className="sr-only">Email</label>
                  <input
                    id="form-email"
                    type="text"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="js-sender-email js-message-details w-full rounded-2xl border border-slate-250 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-455 transition focus:border-sky-500 focus:bg-white focus:outline-none"
                  />
                  {errors.email && <p className="js-error text-red-500 text-xs mt-1.5 ml-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Phone Number field */}
                <div>
                  <label htmlFor="form-phone" className="sr-only">Phone Number</label>
                  <input
                    id="form-phone"
                    type="text"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="js-phone-number w-full rounded-2xl border border-slate-250 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-455 transition focus:border-sky-500 focus:bg-white focus:outline-none"
                  />
                  {errors.phone && <p className="js-error text-red-500 text-xs mt-1.5 ml-1">{errors.phone}</p>}
                </div>

                {/* Subject field */}
                <div>
                  <label htmlFor="form-subject" className="sr-only">Subject</label>
                  <input
                    id="form-subject"
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="js-sender-subject js-message-details w-full rounded-2xl border border-slate-250 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-455 transition focus:border-sky-500 focus:bg-white focus:outline-none"
                  />
                  {errors.subject && <p className="js-error text-red-500 text-xs mt-1.5 ml-1">{errors.subject}</p>}
                </div>
              </div>

              {/* Message field */}
              <div>
                <label htmlFor="form-message" className="sr-only">Message</label>
                <textarea
                  id="form-message"
                  rows={5}
                  placeholder="Message"
                  value={form.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="js-sender-message js-message-details w-full resize-none rounded-2xl border border-slate-250 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-455 transition focus:border-sky-500 focus:bg-white focus:outline-none"
                />
                {errors.message && <p className="js-error text-red-500 text-xs mt-1.5 ml-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="js-send-message w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} />
                Send Message
              </button>

              {/* Status Message Labels */}
              {successMsg && (
                <p className="js-success text-emerald-600 text-sm font-medium mt-4 border border-emerald-100 bg-emerald-50 rounded-2xl p-4 leading-6">
                  {successMsg}
                </p>
              )}
              {errorMsg && (
                <p className="js-error text-red-600 text-sm font-medium mt-4 border border-red-100 bg-red-50 rounded-2xl p-4 leading-6">
                  {errorMsg}
                </p>
              )}
            </form>
          </motion.div>

          {/* Right Column: Address Details & IFrame Maps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-md">
              <div className="grid gap-8 sm:grid-cols-2">
                {/* Mailing Address card */}
                <div className="space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 mb-2">Mailing Address</h4>
                    <address className="text-sm leading-6 text-slate-600 not-italic">
                      Suite-G,<br />
                      Weller House,<br />
                      58-60 Longbridge Rd, Barking,<br />
                      London, IG11 8RT.
                    </address>
                  </div>
                </div>

                {/* Contact Info card */}
                <div className="space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 mb-2">Contact Info</h4>
                    <ul className="text-sm leading-6 text-slate-655 space-y-2">
                      <li>
                        <span className="font-semibold text-slate-500">Phone: </span> 
                        <a href="tel:02038190333" className="hover:text-sky-600 font-bold transition">02038190333</a>
                      </li>
                      <li>
                        <span className="font-semibold text-slate-500">Tel: </span> 
                        <a href="tel:02038190333" className="hover:text-sky-600 transition">02038190333</a>
                      </li>
                      <li>
                        <span className="font-semibold text-slate-500">Mail: </span> 
                        <a href="mailto:info@eslanditsolutions.com" className="hover:text-sky-600 transition break-all font-semibold">info@eslanditsolutions.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Box */}
            <div className="rounded-[2.5rem] border border-slate-200 overflow-hidden h-[320px] shadow-md">
              <iframe
                title="Esland IT Solutions Office Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.691646495486!2d0.07895821577108171!3d51.53721527964005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a66d4184d01d%3A0x4fc9c915675b5d4b!2sRadial+House%2C+3-5+Ripple+Rd%2C+Barking+IG11+7NP%2C+UK!5e0!3m2!1sen!2sin!4v1483707062936"
                className="w-full h-full border-0"
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
