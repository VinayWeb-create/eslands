import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../lib/api';
import { toast } from 'react-toastify';
import { Phone, Mail, MapPin, Send, Check } from 'lucide-react';

function ProjectEstimator({ setContactForm }) {
  const [service, setService] = useState('Web Design');
  const [size, setSize] = useState('Medium');
  const [features, setFeatures] = useState([]);

  const services = [
    { name: 'Web Design', base: 800 },
    { name: 'Mobile Apps', base: 1500 },
    { name: 'SEO & Marketing', base: 400 },
    { name: 'Software Development', base: 2000 },
    { name: 'Branding', base: 500 },
  ];

  const sizes = [
    { name: 'Small', label: '1-5 Pages / Screens', multiplier: 1.0 },
    { name: 'Medium', label: '5-15 Pages / Screens', multiplier: 1.6 },
    { name: 'Large', label: 'Enterprise / Unlimited', multiplier: 2.5 },
  ];

  const extraFeatures = [
    { id: 'auth', name: 'User Authentication', cost: 300 },
    { id: 'payments', name: 'Payment Integration', cost: 400 },
    { id: 'cms', name: 'CMS / Admin Dashboard', cost: 500 },
    { id: 'notifications', name: 'Push Notifications', cost: 250 },
    { id: 'multilang', name: 'Multi-language Support', cost: 200 },
  ];

  const toggleFeature = (id) => {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const calculateEstimate = () => {
    const selectedService = services.find((s) => s.name === service) || services[0];
    const selectedSize = sizes.find((s) => s.name === size) || sizes[0];
    
    let cost = selectedService.base * selectedSize.multiplier;
    
    features.forEach((featId) => {
      const feat = extraFeatures.find((f) => f.id === featId);
      if (feat) cost += feat.cost;
    });

    const minCost = Math.round(cost * 0.9);
    const maxCost = Math.round(cost * 1.15);
    const weeks = Math.max(2, Math.round((cost / 500) * 1.5));

    return { minCost, maxCost, weeks };
  };

  const { minCost, maxCost, weeks } = calculateEstimate();

  const handleApplyEstimate = () => {
    const featureNames = features
      .map((fid) => extraFeatures.find((f) => f.id === fid)?.name)
      .filter(Boolean)
      .join(', ');

    setContactForm({
      name: '',
      email: '',
      phone: '',
      subject: `Project Estimate: ${service} (${size} Scope)`,
      message: `Hi Esland Team,\n\nI used the Interactive Estimator on your website and would like to request a proposal based on these details:\n\n- Service: ${service}\n- Scope: ${size} (${sizes.find((s) => s.name === size)?.label})\n- Selected Addons: ${featureNames || 'None'}\n- Estimated Budget: $${minCost} - $${maxCost}\n- Expected Timeline: ~${weeks} weeks\n\nPlease let me know your availability for a brief kickoff call.\n\nBest regards,`,
    });

    window.scrollTo({
      top: 250,
      behavior: 'smooth',
    });

    toast.info('Estimate applied to the contact form above!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-8 shadow-xl sm:p-12 mt-12"
    >
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.35em] text-sky-400">Estimate Calculator</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Interactive Project Estimator</h2>
        <p className="mt-3 text-sm text-slate-400">Configure your project requirements below to get a ballpark budget and timeline estimate instantly.</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Options Selection */}
        <div className="space-y-6">
          {/* 1. Service Type */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-3">1. Select Service Type</span>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {services.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setService(s.name)}
                  className={`rounded-2xl border px-4 py-3 text-xs font-bold transition ${service === s.name ? 'border-sky-400 bg-sky-500/10 text-sky-400 shadow-glow' : 'border-white/10 text-slate-300 hover:border-sky-500/30 hover:text-white'}`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Project Scope */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-3">2. Select Project Scope</span>
            <div className="grid gap-3 sm:grid-cols-3">
              {sizes.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setSize(s.name)}
                  className={`flex flex-col items-center justify-center rounded-2xl border px-4 py-3.5 transition text-center ${size === s.name ? 'border-sky-400 bg-sky-500/10 text-sky-400 shadow-glow' : 'border-white/10 text-slate-300 hover:border-sky-500/30 hover:text-white'}`}
                >
                  <span className="text-xs font-bold">{s.name}</span>
                  <span className="text-[10px] text-slate-400 mt-1">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Extra Features */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-3">3. Project Addons &amp; Features</span>
            <div className="space-y-2">
              {extraFeatures.map((f) => {
                const isActive = features.includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => toggleFeature(f.id)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${isActive ? 'border-sky-400 bg-sky-500/10 text-sky-400' : 'border-white/10 text-slate-300 hover:border-sky-500/20'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-5 w-5 items-center justify-center rounded border transition ${isActive ? 'border-sky-400 bg-sky-500 text-white' : 'border-white/20'}`}>
                        {isActive && <Check size={12} />}
                      </div>
                      <span className="text-xs font-semibold">{f.name}</span>
                    </div>
                    <span className="text-xs font-bold text-sky-300">+${f.cost}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Estimate Result Display */}
        <div className="flex flex-col justify-between rounded-[2rem] border border-sky-500/20 bg-sky-500/5 p-8 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-sky-600/10 blur-3xl" />

          <div className="relative z-10 space-y-6">
            <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-[10px] uppercase tracking-wider text-sky-300 font-bold">BALLPARK ESTIMATE</span>
            
            <div className="space-y-2">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Estimated Budget Range</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white sm:text-5xl">${minCost.toLocaleString()}</span>
                <span className="text-lg text-slate-400 font-semibold">to</span>
                <span className="text-4xl font-extrabold text-sky-400 sm:text-5xl">${maxCost.toLocaleString()}</span>
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Timeline</span>
                <span className="text-lg font-bold text-white mt-1 block">~{weeks} Weeks</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Scope Complexity</span>
                <span className="text-lg font-bold text-white mt-1 block">{size}</span>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950/60 p-4 border border-white/5 text-xs leading-6 text-slate-300">
              💡 <span className="font-semibold text-white">Note:</span> This is an automated estimate for budget guidance. Our delivery team will review and establish a fixed, guaranteed quote once project scope is defined.
            </div>
          </div>

          <button
            type="button"
            onClick={handleApplyEstimate}
            className="relative z-10 w-full mt-8 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 py-4 text-center text-sm font-bold text-white shadow-lg transition hover:brightness-110"
          >
            Apply Estimate to Contact Form
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/contact', form);
      toast.success('Message sent successfully! We will get back to you shortly.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to send message. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: 'name', label: 'Your Name', placeholder: 'Enter your full name', type: 'text', required: true },
    { key: 'email', label: 'Email Address', placeholder: 'Enter your email address', type: 'email', required: true },
    { key: 'phone', label: 'Phone Number', placeholder: 'Enter your phone number', type: 'tel', required: false },
    { key: 'subject', label: 'Subject', placeholder: 'Enter subject', type: 'text', required: true },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden pt-[65px]">
      {/* Background glows */}
      <div className="pointer-events-none fixed left-0 top-0 h-96 w-96 rounded-full bg-sky-500/8 blur-3xl" />
      <div className="pointer-events-none fixed right-0 bottom-0 h-96 w-96 rounded-full bg-sky-600/6 blur-3xl" />

      {/* Page Banner */}
      <section className="border-b border-white/10 bg-gradient-to-r from-sky-600/20 via-sky-500/10 to-transparent px-6 py-14 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs uppercase tracking-[0.35em] text-sky-400">Get in Touch</p>
            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Contact Us</h1>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-xl sm:p-10"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-sky-400">Drop Your Message</p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Need to talk to us? We&apos;re Listening ....
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Fill in the form and a member of our team will get back to you within 24 hours.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((field) => (
                  <label key={field.key} className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {field.label}
                      {field.required && <span className="ml-0.5 text-sky-400">*</span>}
                    </span>
                    <input
                      id={`js-sender-${field.key === 'name' ? 'name' : field.key}`}
                      required={field.required}
                      type={field.type}
                      value={form[field.key]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-500 transition focus:border-sky-400 focus:bg-white/8 focus:outline-none focus:ring-1 focus:ring-sky-400/30"
                    />
                  </label>
                ))}
              </div>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Message <span className="text-sky-400">*</span>
                </span>
                <textarea
                  id="js-sender-message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-500 transition focus:border-sky-400 focus:bg-white/8 focus:outline-none focus:ring-1 focus:ring-sky-400/30"
                />
              </label>

              <motion.button
                id="js-send-message"
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 py-4 text-sm font-bold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
              >
                <Send size={16} />
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Address & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-7 shadow-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-sky-400">Office</p>
              <h3 className="mt-3 text-xl font-bold text-white">Visit or Contact Us</h3>

              <div className="mt-6 space-y-5">
                {/* Address */}
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Mailing Address</p>
                    <p className="mt-1.5 text-sm leading-6 text-slate-300">
                      Suite-G, Weller House,<br />
                      58-60 Longbridge Rd,<br />
                      Barking, London, IG11 8RT.
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Phone / Tel</p>
                    <a href="tel:02038190333" className="mt-1.5 block text-sm font-semibold text-white transition hover:text-sky-400">
                      02038190333
                    </a>
                    <a href="tel:02038190333" className="block text-sm text-slate-400 transition hover:text-sky-400">
                      Tel: 02038190333
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email</p>
                    <a href="mailto:info@eslanditsolutions.com" className="mt-1.5 block text-sm font-semibold text-white break-all transition hover:text-sky-400">
                      info@eslanditsolutions.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick direct call CTA */}
            <div className="rounded-[2rem] border border-sky-500/30 bg-gradient-to-br from-sky-600/20 via-sky-500/10 to-transparent p-7">
              <p className="text-sm font-semibold text-white">Prefer to talk?</p>
              <p className="mt-2 text-xs text-slate-400">Our team is available Mon–Fri, 9am–6pm (GMT).</p>
              <a
                href="tel:02038190333"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-7 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
              >
                <Phone size={15} /> Call 02038190333
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Estimator Section */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-14">
        <ProjectEstimator setContactForm={setForm} />
      </section>
    </div>
  );
}
