import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Phone, Mail, MapPin, Send, Check,
  Globe, Smartphone, Code2, Network, Tag, Palette, Search,
  PlayCircle, Star, Quote, Sparkles, ChevronLeft, ChevronRight, CheckCircle2,
  Shield, TrendingUp, Award
} from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../lib/api';
import CountUp from '../components/CountUp';
import { Link } from 'react-router-dom';
import { services } from './Services';

/* ─── Data (unchanged) ─── */

const heroSlides = [
  { src: '/ban-9.jpg', alt: 'London Tower Bridge background', title: 'Welcome to Esland IT Solution' },
  { src: '/ban-8.jpg', alt: 'Computer Network layout background', title: 'Esland IT Solutions', hasOverlay: true },
  { src: '/banner-3.jpg', alt: 'Corporate teamwork background', title: 'Innovative Technology Solutions' }
];



const testimonials = [
  { name: 'Usman', client: 'Mobile Bitz, Dartford', title: 'Friendly !!!', quote: 'A very friendly and helpful company that have looked for solutions to any problems. It is great to talk to the same person every time I phone up or e-mail. My site is at top of both Google and Bing and this brings me more customers. Every time I phone up or e-mail a change, it is done quickly and efficiently. They have helped me expand my customer base.' },
  { name: 'Sami', client: 'Kingsburry School', title: 'Genuine service !!!', quote: 'I like Esland, because they genuinely try to find solutions for your business, rather than just trying to sell new services all the time, which may or may not be useful. Nice people too - always helps!' },
  { name: 'Ukrani', client: 'Private Client', title: 'Fantastic !!!', quote: "Fantastic service and website build from Esland, great input and help from them as we didn't really know where to start.... Let them do their thing so we can get on with ours, worked for us! Thanks Esland IT Solutions" },
  { name: 'Rupeesh', client: 'Flower Paradise', title: 'Recommended !!!', quote: 'I am very happy with my new website and SEO services for my flower shop business and have already started to build my new clients! I would highly recommend Esland.' },
  { name: 'Gaurav', client: 'Ash Groove', title: 'Quick Respond !!!', quote: 'Esland IT services was very quick to respond to any query, and completed the task of transferring my website from joomla to WordPress, and transferring my blogger blog to within the website very quickly. I found this company very self-sufficient and easy to get along with.' },
  { name: 'Amdip Traders Ltd', client: 'Amdip Traders', title: 'Great job !!!', quote: 'Could not have been easier!!! They did great job . Am about to use them again. Very happy customer!' },
  { name: 'Pat', client: 'Ilford Kitchens', title: 'SEO-Satisfied !!!', quote: 'We are a very satisfied client of Eland. Our traffic has increased substantially as well as a significant increase in the quality of our leads. Their efforts have contributed to a 40% increase in our sales.' }
];

const pricingPlans = [
  { name: 'Standard', price: '2', features: ['2 GB Webspace', '1 Domain', '10 GB Bandwidth', 'Free Setup Support'] },
  { name: 'Business', price: '3.99', features: ['3 GB Webspace', '2 Domains', '25 GB Bandwidth', '99.9% Uptime Guarantee'], popular: true },
  { name: 'Premium', price: '4.99', features: ['5 GB Webspace', '5 Domains', '50 GB Bandwidth', 'Enhanced Security Suite'] },
  { name: 'Ultimate', price: '5.99', features: ['10 GB Webspace', '10 Domains', '100 GB Bandwidth', 'Dedicated Managed Server'] }
];

const partners = [
  { name: 'Flower Paradise', color: '#e879a0', hoverColor: '#f9a8d4', accent: 'from-pink-500/15 to-rose-500/10', border: 'hover:border-pink-500/30' },
  { name: 'Ash Groove', color: '#60a5a0', hoverColor: '#5eead4', accent: 'from-teal-500/15 to-emerald-500/10', border: 'hover:border-teal-500/30' },
  { name: 'Amdip Traders', color: '#f59e0b', hoverColor: '#fbbf24', accent: 'from-amber-500/15 to-yellow-500/10', border: 'hover:border-amber-500/30' },
  { name: 'Ilford Kitchens', color: '#ef4444', hoverColor: '#f87171', accent: 'from-red-500/15 to-orange-500/10', border: 'hover:border-red-500/30' },
  { name: 'NEX', color: '#3b82f6', hoverColor: '#60a5fa', accent: 'from-blue-500/15 to-indigo-500/10', border: 'hover:border-blue-500/30', logo: '/nex.png', isImg: true },
  { name: 'Mobile Bitz', color: '#8b5cf6', hoverColor: '#a78bfa', accent: 'from-violet-500/15 to-purple-500/10', border: 'hover:border-violet-500/30' },
  { name: 'Kingsburry School', color: '#10b981', hoverColor: '#34d399', accent: 'from-emerald-500/15 to-green-500/10', border: 'hover:border-emerald-500/30' },
];

/* ─── Reusable animation variants ─── */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 24 } }
};

/* ─── Section Helpers ─── */

function Eyebrow({ children }) {
  return (
    <motion.p {...fadeUp} className="text-xs font-bold uppercase tracking-[0.35em] text-sky-400 mb-3">
      {children}
    </motion.p>
  );
}

function SectionTitle({ children }) {
  return (
    <motion.h2 {...fadeUp} className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
      {children}
    </motion.h2>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════════════
   HOME PAGE — DARK THEME
   ═══════════════════════════════════════════════════════════════════════════════════════ */

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);
  const [testPaused, setTestPaused] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (testPaused) return;
    const timer = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [testPaused]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/contact', form);
      toast.success('Thank you for contacting us! We have received your message and our representative will contact you shortly.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Sorry, something went wrong. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsLoading(true);
    try {
      await api.post('/api/newsletter', { email: newsletterEmail });
      toast.success('You have successfully subscribed to the Esland Newsletter!');
      setNewsletterEmail('');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to subscribe. Please try again.');
    } finally {
      setNewsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-300 overflow-x-hidden pt-[65px]">

      {/* ═══════════════════════════════════════════════════════════════════════
         1. HERO CAROUSEL
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative h-[70vh] sm:h-[80vh] min-h-[520px] sm:min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img src={heroSlides[activeSlide].src} alt={heroSlides[activeSlide].alt} className="w-full h-full object-cover" />
              {/* Mobile: lighter overlay so images show; Desktop: heavier for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 sm:from-slate-950/70 via-slate-950/20 sm:via-slate-950/40 to-slate-950/80 sm:to-slate-950/90" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 sm:from-slate-950/50 via-transparent to-slate-950/30 sm:to-slate-950/50" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 z-[1] opacity-[0.06] bg-[linear-gradient(rgba(123,156,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(123,156,255,0.13)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        {/* Ambient glow orbs */}
        <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full bg-sky-600/15 blur-[120px] pointer-events-none z-[1]" />
        <div className="absolute bottom-[-200px] left-[-100px] w-[400px] h-[400px] rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none z-[1]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full text-center lg:text-left">
          <div className="grid gap-6 sm:gap-12 lg:grid-cols-[1.3fr_0.7fr] items-center w-full">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-sky-300 mb-6"
                >
                  <Sparkles size={12} className="animate-pulse" />
                  ESTABLISHED SINCE 2013
                </motion.div>
                <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-white mb-4 sm:mb-6 uppercase leading-tight">
                  Welcome to <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-indigo-300 animate-gradient">
                    Esland IT Solution
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0">
                  We Build creative, effective &amp; professional websites and affordable web design solutions !!!
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <PlayCircle size={16} /> Book a Consultation
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-all duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center items-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="z-10 pointer-events-none mt-6 lg:mt-0"
              >
                <img src="/Computer_India.png" alt="Computer network visualization" className="w-[160px] sm:w-[240px] lg:w-[420px] drop-shadow-[0_15px_30px_rgba(56,189,248,0.25)] animate-float" />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                activeSlide === index ? 'w-10 bg-gradient-to-r from-sky-400 to-indigo-500 shadow-lg shadow-sky-500/30' : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
         2. PARTNERS MARQUEE + STATS
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-white/5 bg-slate-950 py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600/5 via-indigo-600/5 to-sky-600/5 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 mb-10 relative z-10">
          <motion.p {...fadeUp} className="text-center text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-3">
            Trusted by Businesses Across the UK
          </motion.p>
          <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-8 md:gap-16 mt-8">
            {[
              { value: 100, suffix: '+', label: 'Clients' },
              { value: 500, suffix: '+', label: 'Projects' },
              { value: 10, suffix: '+', label: 'Years' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-white">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-slate-500 font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee" style={{ width: 'max-content' }}>
            {[...partners, ...partners].map((partner, index) => (
              <div key={index} className="mx-3 flex-shrink-0 group cursor-pointer">
                <div
                  className={`relative flex items-center gap-3 px-7 py-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-2xl overflow-hidden ${partner.border}`}
                  style={{
                    '--brand': partner.color,
                    '--brand-hover': partner.hoverColor,
                  }}
                >
                  {/* Glow background on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${partner.color}10, transparent 70%)` }}
                  />
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-4 right-4 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-x-0 group-hover:scale-x-100"
                    style={{ background: `linear-gradient(90deg, transparent, ${partner.color}, transparent)` }}
                  />
                  {partner.isImg ? (
                    <img src={partner.logo} alt={partner.name} loading="lazy" className="h-7 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-110" />
                  ) : (
                    <span
                      className="text-[17px] font-extrabold tracking-tight relative z-10 transition-all duration-300 group-hover:tracking-wide"
                      style={{ color: `${partner.color}aa` }}
                      onMouseEnter={(e) => e.target.style.color = partner.hoverColor}
                      onMouseLeave={(e) => e.target.style.color = `${partner.color}aa`}
                    >
                      {partner.name}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
         3. ABOUT ESLAND
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-24 px-6 relative overflow-hidden bg-slate-950">
        <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-sky-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-indigo-600/10 blur-[100px]" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            {/* Left text */}
            <motion.div {...fadeUp}>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-400 mb-3">SOME WORDS ABOUT ESLAND</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
                Technology Partner Built For <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                  Your Ambition
                </span>
              </h2>
              <p className="text-slate-400 text-base leading-8 mb-8 font-medium">
                Esland IT Solutions is a platform which lets you discover the best products across a wide array of categories that include Essential Electronics, Computers, Printers Appliances also software support. Esland IT Solutions was founded in 2013 by Naresh Pathi with the goal of creating Software development projects and the best online essential electronics shopping research and discovery destination. Whatever your budget or the size of your business we are here to support you and make technology simple.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  { value: 10, suffix: '+', label: 'Years', icon: Award },
                  { value: 500, suffix: '+', label: 'Projects', icon: TrendingUp },
                  { value: 200, suffix: '+', label: 'Clients', icon: CheckCircle2 },
                  { value: 24, suffix: '/7', label: 'Support', icon: Shield },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-700/50 bg-slate-800/50 text-center hover:border-sky-500/20 hover:bg-sky-500/5 transition-all duration-300 group"
                  >
                    <stat.icon size={18} className="text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-2xl font-extrabold text-white">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <span className="text-xs text-slate-500 font-medium mt-1">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right image with tilt */}
            <motion.div {...fadeUp} transition={{ delay: 0.15, duration: 0.6 }} className="relative flex justify-center">
              <TiltImage />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
         4. CREATIVE / IMPRESSIVE / PROFESSIONAL
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 relative bg-slate-900/50 overflow-hidden">
        <div className="pointer-events-none absolute right-1/4 top-0 h-72 w-72 rounded-full bg-indigo-600/10 blur-[100px]" />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <Eyebrow>Why Esland</Eyebrow>
            <SectionTitle>The Esland Difference</SectionTitle>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Creative', desc: 'Innovative solutions that push boundaries and deliver memorable digital experiences.', gradient: 'from-indigo-500 to-sky-500', icon: Sparkles, glow: 'shadow-indigo-500/20', image: '/images/service.jpg' },
              { title: 'Impressive', desc: 'Results that speak for themselves — measurable impact on your business growth.', gradient: 'from-sky-500 to-cyan-500', icon: TrendingUp, glow: 'shadow-sky-500/20', image: '/woman-blue.jpg' },
              { title: 'Professional', desc: 'Enterprise-grade quality with dedicated support and transparent communication.', gradient: 'from-sky-500 to-indigo-500', icon: Shield, glow: 'shadow-sky-500/20', image: '/chel-4.png' },
            ].map((card) => (
              <motion.div
                key={card.title}
                variants={staggerItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="group relative"
              >
                <div className={`relative rounded-[2rem] border border-slate-700/50 bg-slate-900 transition-all duration-500 hover:border-transparent hover:shadow-2xl ${card.glow} hover:-translate-y-2 overflow-hidden`}>
                  {/* Gradient border on hover */}
                  <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{ padding: '1px' }}>
                    <div className="w-full h-full rounded-[calc(2rem-1px)] bg-slate-900/95" />
                  </div>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  </div>
                  <div className="relative z-10 p-8 sm:p-10">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <card.icon size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
         5. SERVICES — BENTO GRID
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-24 px-6 relative bg-slate-950 overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-sky-600/5 blur-[120px]" />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <Eyebrow>OUR SERVICES</Eyebrow>
            <SectionTitle>Complete Customer Satisfaction</SectionTitle>
            <motion.p {...fadeUp} className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
              We leverage our expertise to build, protect, and optimize your business technology ecosystems.
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.slice(0, 8).map((service, index) => {
              const IconComp = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="group relative rounded-[1.5rem] border border-slate-700/50 bg-slate-900 transition-all duration-500 hover:border-slate-600/50 hover:shadow-2xl hover:shadow-sky-500/5 hover:-translate-y-1.5 overflow-hidden"
                >
                  {/* Service Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.label}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    {/* Gradient accent top bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.iconBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    {/* Icon floating on image */}
                    <div className={`absolute bottom-4 left-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.iconBg} text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <IconComp size={20} />
                    </div>
                  </div>
                  <div className="p-6 sm:p-7">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-100 transition-colors">{service.label}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">{service.subheading}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-400 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Learn more <ArrowRight size={14} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
         6. BRANDING CTA
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 relative bg-gradient-to-br from-slate-900 via-indigo-950/50 to-slate-900 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-sky-500/20 via-indigo-900/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
        <div className="mx-auto max-w-4xl relative z-10 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Want to <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">brand</span> your business?
            </h2>
            <p className="text-lg text-slate-300 mb-8 font-medium italic">
              &quot; we can help brand your business effectively !!! &quot;
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white hover:brightness-110 shadow-lg shadow-sky-500/20 transition">
                Book a Consultation <ArrowRight size={15} />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
         7. TESTIMONIALS
         ═══════════════════════════════════════════════════════════════════════ */}
      <section id="testimonials" className="py-24 px-6 relative bg-slate-950 overflow-hidden">
        <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-sky-600/5 blur-[120px]" />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <Eyebrow>TESTIMONIALS</Eyebrow>
            <SectionTitle>Some of Our Happy Clients</SectionTitle>
          </div>

          <div
            className="grid gap-8 lg:grid-cols-[1fr_1.6fr] items-start"
            onMouseEnter={() => setTestPaused(true)}
            onMouseLeave={() => setTestPaused(false)}
          >
            {/* Left: visual + badges */}
            <motion.div {...fadeUp} className="flex flex-col items-center gap-6 w-full">
              <div className="rounded-[2.5rem] border border-slate-700/50 bg-slate-900 p-2 shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
                <img
                  src="/chel-4.png"
                  alt="Happy customer representation"
                  loading="lazy"
                  className="rounded-[2.2rem] h-[260px] sm:h-[340px] w-full max-w-[280px] lg:w-[260px] object-cover relative z-10 transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex gap-3 flex-wrap justify-center">
                {[
                  { icon: Star, text: '5.0 Rating', color: 'text-amber-400' },
                  { icon: CheckCircle2, text: '100% Satisfaction', color: 'text-emerald-400' },
                ].map((badge) => (
                  <div key={badge.text} className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/50 bg-slate-800/50 px-3 py-1.5 text-xs font-semibold text-slate-400">
                    <badge.icon size={12} className={badge.color} />
                    {badge.text}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: testimonial slider */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4 }}
                  className="rounded-[2.5rem] border border-white/5 bg-white/[0.03] backdrop-blur-sm p-8 sm:p-12 shadow-lg relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-sky-500/10 to-transparent rounded-bl-full pointer-events-none" />
                  <Quote size={48} className="text-sky-500/10 absolute right-8 top-8" />

                  <div className="flex gap-1 text-amber-400 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                    &quot;{testimonials[activeTestimonial].title}&quot;
                  </h3>
                  <p className="text-slate-400 text-sm sm:text-base leading-8 mb-8 font-medium">
                    {testimonials[activeTestimonial].quote}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {testimonials[activeTestimonial].name[0]}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {testimonials[activeTestimonial].name}
                      </h4>
                      <p className="text-xs text-sky-400 mt-0.5 uppercase tracking-wider font-semibold">
                        {testimonials[activeTestimonial].client}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="flex items-center gap-4 mt-8">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    className="h-9 w-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-sky-500/30 transition-all duration-200"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                    className="h-9 w-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-sky-500/30 transition-all duration-200"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeTestimonial === i ? 'w-6 bg-gradient-to-r from-sky-400 to-indigo-500' : 'w-2 bg-white/10 hover:bg-white/20'
                      }`}
                      aria-label={`Testimonial slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
         8. PROCESS SNAPSHOT
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 relative bg-slate-900/50 border-t border-white/5">
        <div className="mx-auto max-w-7xl relative z-10 text-center">
          <Eyebrow>HOW WE WORK</Eyebrow>
          <SectionTitle>Our Proven Process</SectionTitle>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {['Discovery & Strategy', 'Development & Integration', 'Deployment & Support'].map((step, i) => (
              <div key={step} className="p-8 rounded-[2rem] bg-slate-800/30 border border-white/5 relative">
                <div className="text-4xl font-black text-sky-500/20 absolute -top-4 -left-4">0{i+1}</div>
                <h3 className="text-lg font-bold text-white relative z-10 mt-4">{step}</h3>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/about" className="inline-flex items-center gap-2 text-sky-400 font-semibold hover:text-sky-300 transition">
              Explore Our Full Process <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
         9. CASE STUDIES
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 relative bg-slate-950 border-t border-white/5">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <Eyebrow>PROVEN IMPACT</Eyebrow>
            <SectionTitle>Real Business Outcomes</SectionTitle>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { client: 'Global Logistics Provider', result: '40% reduction in downtime', desc: 'Migrated legacy systems to a high-availability cloud architecture.' },
              { client: 'Fintech Startup', result: 'PCI-DSS Compliance in 30 days', desc: 'Implemented secure development lifecycle and automated security scanning.' }
            ].map(caseStudy => (
              <div key={caseStudy.client} className="p-10 rounded-[2rem] border border-white/5 bg-slate-900/50 hover:bg-slate-900 transition-colors">
                <p className="text-sky-400 font-bold mb-2">{caseStudy.client}</p>
                <h3 className="text-2xl font-extrabold text-white mb-4">{caseStudy.result}</h3>
                <p className="text-slate-400">{caseStudy.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════════════════════
         10. NEWSLETTER
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 px-6 overflow-hidden border-t border-white/5 bg-slate-900/50">
        <div className="absolute inset-0 z-0">
          <img src="/banner-newsletter.jpg" alt="" loading="lazy" className="w-full h-full object-cover grayscale opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/95" />
        </div>
        <div className="absolute inset-0 z-[1] opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <motion.div {...fadeUp}>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 flex items-center gap-3">
                <Mail className="text-sky-400" size={24} /> Stay updated with Esland
              </h2>
              <p className="text-slate-400 text-sm">Subscribe to receive the latest updates directly in your inbox.</p>
            </motion.div>
            <motion.form
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.6 }}
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md lg:ml-auto w-full"
            >
              <label htmlFor="newsletter-email" className="sr-only">Your Email Address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Your Email Address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition"
              />
              <button
                type="submit"
                disabled={newsLoading}
                className="rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow hover:brightness-110 disabled:opacity-50 transition"
              >
                {newsLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Tilt Image Sub-component ─── */

function TiltImage() {
  const ref = useRef(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const handleMouse = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.02)`);
  }, []);

  const reset = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className="relative rounded-[2rem] sm:rounded-[2.5rem] p-1.5 sm:p-2 border border-slate-700/50 bg-slate-900 overflow-hidden w-full max-w-sm sm:max-w-md shadow-lg group transition-transform duration-300 ease-out"
      style={{ transform, transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none z-10" />
      <img
        src="/about-image.jpg"
        alt="Esland workspace environment"
        className="rounded-[2.2rem] w-full object-cover aspect-[4/3] relative z-10 transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  );
}
