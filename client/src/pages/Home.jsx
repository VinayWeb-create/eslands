import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Phone, Mail, ArrowRight, Check, Star, ChevronLeft, ChevronRight,
  Globe, Smartphone, Search, Code2, Network, ShoppingCart, Palette,
  PlayCircle, RotateCcw, TrendingUp, Megaphone, Cloud, Database, Server, Cpu
} from 'lucide-react';
import PartnersMarquee from '../components/PartnersMarquee';
import ScrollToTop from '../components/ScrollToTop';

// ─── DATA ────────────────────────────────────────────────────────────────────
const heroSlides = [
  {
    title: 'Esland IT Solution',
    subtitle: 'We Build creative, effective & professional websites and affordable web design solutions !!!',
    cta1: { label: 'Get More', href: '/services' },
    cta2: { label: 'Call Us', href: 'tel:02038190333' },
    image: '/banner-3.jpg',
  },
  {
    title: 'Software & Mobile Development',
    subtitle: 'Custom software, mobile apps, and enterprise solutions that power businesses worldwide.',
    cta1: { label: 'Our Services', href: '/services' },
    cta2: { label: 'Call Us', href: 'tel:02038190333' },
    image: '/ban-8.jpg',
  },
  {
    title: 'Branding & Digital Marketing',
    subtitle: 'Logo design, SEO, social media marketing, and 2D animation to elevate your brand.',
    cta1: { label: 'Start Now', href: '/contact' },
    cta2: { label: 'Call Us', href: 'tel:02038190333' },
    image: '/ban-9.jpg',
  },
];

const aboutFeatures = [
  { icon: Globe, title: 'Web Design', desc: 'Custom responsive websites tailored for your brand and target audience.' },
  { icon: Network, title: 'Domain Registration', desc: 'Fast and reliable domain registration and hosting services.' },
  { icon: Phone, title: 'Customer Support', desc: 'Dedicated 24/7 technical and customer support for all clients.' },
];

const servicesGrid = [
  { icon: Globe, title: 'Web Development', desc: 'Custom responsive websites built with modern technologies for an engaging user experience.', href: '/services#web-development' },
  { icon: Smartphone, title: 'Mobile Development', desc: 'iOS & Android apps for your business — cross-platform and performance-optimised.', href: '/services#mobile-development' },
  { icon: Search, title: 'SEO & Marketing', desc: 'Organic rankings, keyword strategy, and digital campaigns that drive measurable results.', href: '/services#seo-marketing' },
  { icon: Code2, title: 'Software Development', desc: 'Custom software solutions, cloud integrations, and enterprise application development.', href: '/services#software-development' },
  { icon: Network, title: 'Networking Solutions', desc: 'Corporate IT infrastructure, network security setup, and ongoing maintenance.', href: '/services#networking' },
  { icon: ShoppingCart, title: 'E-Commerce Solutions', desc: 'Online store development with secure payment gateways and product catalog management.', href: '/services#ecommerce' },
];

const pricingPlans = [
  {
    name: 'Standard',
    price: '$99',
    period: '/mo',
    color: '#ac92ed',
    colorClass: 'from-purple-500/20 to-purple-600/10',
    borderClass: 'border-purple-500/40',
    badgeClass: 'bg-purple-500',
    features: ['5 Web Pages', '1 Domain Name', '1 G.B Hosting', '5 Email IDs', '24/7 Support'],
  },
  {
    name: 'Business',
    price: '$199',
    period: '/mo',
    color: '#48cfae',
    colorClass: 'from-teal-500/20 to-teal-600/10',
    borderClass: 'border-teal-500/40',
    badgeClass: 'bg-teal-500',
    features: ['15 Web Pages', '1 Domain Name', '5 G.B Hosting', '15 Email IDs', '24/7 Support'],
    popular: true,
  },
  {
    name: 'Premium',
    price: '$299',
    period: '/mo',
    color: '#fb6e52',
    colorClass: 'from-red-500/20 to-red-600/10',
    borderClass: 'border-red-500/40',
    badgeClass: 'bg-red-500',
    features: ['30 Web Pages', '2 Domain Names', '10 G.B Hosting', '30 Email IDs', '24/7 Support'],
  },
  {
    name: 'Ultimate',
    price: '$499',
    period: '/mo',
    color: '#ff9800',
    colorClass: 'from-orange-500/20 to-orange-600/10',
    borderClass: 'border-orange-500/40',
    badgeClass: 'bg-orange-500',
    features: ['Unlimited Pages', '5 Domain Names', '50 G.B Hosting', 'Unlimited Emails', '24/7 Support'],
  },
];

const testimonials = [
  {
    quote: 'Esland IT Solutions transformed our online presence completely. The website they built has doubled our customer enquiries. Exceptional service and support.',
    name: 'Michael Thompson',
    role: 'CEO, Vertex Retail Ltd',
  },
  {
    quote: 'Professional team that delivered exactly what we needed — on time and within budget. Their SEO work has taken us to the top of Google. Highly recommended.',
    name: 'Sarah Patel',
    role: 'Marketing Director, Bloom Interiors',
  },
  {
    quote: 'The mobile app they built for us is flawless. Our customers love it, and the team was responsive throughout. Best IT investment we have made.',
    name: 'David Okonkwo',
    role: 'Founder, SwiftDeliver',
  },
];

const stats = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '200+', label: 'Happy Clients' },
  { value: '12+', label: 'Services Offered' },
  { value: '10+', label: 'Years Experience' },
];

// ─── HERO SLIDER ─────────────────────────────────────────────────────────────
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[current];
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      {/* Animated bg image with gradient overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {/* Overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 via-slate-900/80 to-slate-950/90 backdrop-blur-[1px]" />
        </motion.div>
      </AnimatePresence>

      {/* Grid lines overlay */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(14,165,233,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Giant 3D Floating Background Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            rotateY: [15, -15, 15],
            rotateX: [10, -10, 10],
            y: [0, -12, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            perspective: 1000,
            transformStyle: "preserve-3d",
          }}
          className="opacity-[0.06] w-[450px] sm:w-[650px] h-auto flex items-center justify-center"
        >
          <img src="/image.png" alt="" className="w-full h-auto object-contain" />
        </motion.div>
      </div>

      {/* Glow orbs */}
      <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-sky-600/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center sm:px-10 lg:px-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.55 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6 inline-flex rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 text-xs uppercase tracking-[0.35em] text-sky-300"
            >
              Esland IT Solutions
            </motion.span>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
              {slide.title}
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {slide.subtitle}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                href={slide.cta1.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
              >
                {slide.cta1.label} <ArrowRight size={16} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                href={slide.cta2.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/25 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur transition hover:border-sky-400 hover:bg-white/10"
              >
                <Phone size={16} /> {slide.cta2.label}
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="mt-12 flex items-center justify-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-8 h-2 bg-sky-400' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({ value, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseInt(value, 10);
    if (isNaN(numericValue)) {
      setCount(value);
      return;
    }

    const suffix = value.replace(/[0-9]/g, '');
    let start = 0;
    const end = numericValue;
    const steps = 40;
    const stepDuration = (duration * 1000) / steps;
    const increment = end / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setCount(value);
        clearInterval(timer);
      } else {
        start += increment;
        setCount(Math.floor(start) + suffix);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

// ─── STATS COUNTER ───────────────────────────────────────────────────────────
function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 gap-4 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 sm:grid-cols-4 sm:p-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="text-center"
          >
            <p className="text-3xl font-bold text-sky-400 sm:text-4xl">
              <AnimatedCounter value={stat.value} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── ABOUT SECTION ───────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-14">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-sky-400">Who We Are</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Esland IT Solutions
          </h2>
          <p className="mt-5 text-sm leading-8 text-slate-400">
            Esland IT Solutions was founded in 2013 by Naresh Pathi with the goal of creating Software development projects and the best online essential electronics shopping research and discovery destination.
          </p>
          <p className="mt-4 text-sm leading-8 text-slate-400">
            We specialise in delivering creative, effective and professional websites and affordable web design solutions. Our team combines technical expertise with business insight to create digital experiences that drive growth.
          </p>

          <div className="mt-8 space-y-5">
            {aboutFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition hover:border-sky-500/30"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow">
                  <feat.icon size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{feat.title}</h3>
                  <p className="mt-1 text-xs leading-6 text-slate-400">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:brightness-110"
            >
              Learn More <ArrowRight size={15} />
            </Link>
            <a
              href="tel:02038190333"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-sky-400"
            >
              <Phone size={15} /> Call Us
            </a>
          </div>
        </motion.div>

        {/* Right — visual card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-sky-600/20 via-slate-900/60 to-sky-800/20 p-8 shadow-xl">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-sky-500/15 blur-2xl" />
            <div className="relative grid grid-cols-2 gap-4">
              {[
                { label: 'Founded', value: '2013' },
                { label: 'Services', value: '12+' },
                { label: 'Clients', value: '200+' },
                { label: 'Countries', value: '5+' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-center">
                  <p className="text-3xl font-bold text-sky-400">{item.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-sky-500/20 bg-sky-500/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">Our Mission</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                To deliver innovative, reliable, and affordable IT solutions that help businesses grow and succeed in the digital world.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA BANNER (Branding & Promotion) ───────────────────────────────────────
function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-sky-600 to-sky-500 py-14">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 10px)' }} />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center sm:flex-row sm:justify-between sm:text-left sm:px-10 lg:px-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-100">Special Offer</p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Branding &amp; Promotion</h2>
          <p className="mt-2 max-w-lg text-sm leading-7 text-sky-100">
            Elevate your brand with our comprehensive branding, logo design, and promotional strategies. Stand out from the competition.
          </p>
        </div>
        <motion.a
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          href="tel:02038190333"
          className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-sky-600 shadow-xl transition hover:bg-sky-50"
        >
          <Phone size={16} /> Call Us
        </motion.a>
      </div>
    </section>
  );
}

function InteractiveServiceCard({ service, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Calculate tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -12;
    const tiltY = ((x - centerX) / centerX) * 12;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-7 transition-all duration-300 hover:border-sky-500/40 hover:shadow-2xl hover:shadow-sky-500/5"
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(14, 165, 233, 0.15), transparent 80%)`,
        }}
      />
      <div className="relative z-10" style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-lg">
          <service.icon size={22} />
        </div>
        <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">{service.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-400">{service.desc}</p>
        <Link
          to={service.href}
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 transition hover:gap-2.5 hover:text-sky-300"
        >
          Learn More <ArrowRight size={13} />
        </Link>
      </div>
    </motion.div>
  );
}

// ─── SERVICES GRID ────────────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-14">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55 }}
        className="mb-14 text-center"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-sky-400">What We Offer</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Our Services</h2>
        <p className="mt-4 text-base leading-8 text-slate-400">End-to-end technology solutions for every digital challenge your business faces.</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {servicesGrid.map((service, index) => (
          <InteractiveServiceCard key={service.title} service={service} index={index} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-sky-400 hover:bg-white/10"
        >
          View All 12 Services <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-14">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mb-14 text-center"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-sky-400">Happy Clients</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">What Our Clients Say</h2>
      </motion.div>

      <div className="relative mx-auto max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 sm:p-12 text-center shadow-xl"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-sky-400 text-sky-400" />)}
            </div>
            <blockquote className="text-base leading-8 text-slate-300 italic">
              &ldquo;{testimonials[current].quote}&rdquo;
            </blockquote>
            <div className="mt-8">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white font-bold text-lg">
                {testimonials[current].name.charAt(0)}
              </div>
              <p className="font-bold text-white">{testimonials[current].name}</p>
              <p className="text-xs text-slate-400">{testimonials[current].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-sky-400 hover:text-sky-400">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all ${i === current ? 'w-6 h-2 bg-sky-400' : 'w-2 h-2 bg-white/30'}`} />
            ))}
          </div>
          <button onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-sky-400 hover:text-sky-400">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function InteractivePricingCard({ plan, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -12;
    const tiltY = ((x - centerX) / centerX) * 12;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`group relative overflow-hidden rounded-[2rem] border ${plan.borderClass} bg-gradient-to-b ${plan.colorClass} p-7 transition-all duration-300 ${plan.popular ? 'ring-2 ring-teal-500/50' : ''}`}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.08), transparent 80%)`,
        }}
      />

      <div className="relative z-10" style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
        {plan.popular && (
          <div className="absolute right-4 top-4">
            <span className="rounded-full bg-teal-500 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">Popular</span>
          </div>
        )}

        {/* Plan header colour block */}
        <div className="mb-6">
          <div className="mb-4 inline-flex rounded-xl px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor: plan.color }}>
            {plan.name}
          </div>
          <div className="flex items-end gap-1">
            <span className="text-4xl font-bold text-white">{plan.price}</span>
            <span className="mb-1 text-sm text-slate-400">{plan.period}</span>
          </div>
        </div>

        <ul className="mb-8 space-y-3">
          {plan.features.map((feat) => (
            <li key={feat} className="flex items-center gap-2.5 text-sm text-slate-300">
              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: plan.color + '33' }}>
                <Check size={11} style={{ color: plan.color }} />
              </div>
              {feat}
            </li>
          ))}
        </ul>

        <a
          href="/contact"
          className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white transition hover:brightness-110"
          style={{ backgroundColor: plan.color }}
        >
          Order Now
        </a>
      </div>
    </motion.div>
  );
}

// ─── PRICING ──────────────────────────────────────────────────────────────────
function PricingSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-14">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mb-14 text-center"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-sky-400">Transparent Pricing</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Pricing Plans</h2>
        <p className="mt-4 text-base text-slate-400">Choose the plan that best fits your business needs.</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {pricingPlans.map((plan, index) => (
          <InteractivePricingCard key={plan.name} plan={plan} index={index} />
        ))}
      </div>
    </section>
  );
}

// ─── ADDRESS / CONTACT BAR ────────────────────────────────────────────────────
function AddressSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-14">
      <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 lg:grid-cols-2">
        {/* Map placeholder */}
        <div className="min-h-[300px] bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center rounded-t-[2rem] lg:rounded-l-[2rem] lg:rounded-tr-none overflow-hidden relative">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(14,165,233,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="relative z-10 text-center">
            <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-sky-500/20 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full bg-sky-500 ring-4 ring-sky-500/30 animate-pulse" />
            </div>
            <p className="text-xs text-slate-400">Barking, London, UK</p>
          </div>
          {/* Map embed could go here */}
          <iframe
            title="Esland IT Solutions Location"
            className="absolute inset-0 h-full w-full opacity-40"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.0!2d0.0804!3d51.5354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a7f26f6e7e9f%3A0x1!2sWeller+House%2C+Barking!5e0!3m2!1sen!2suk!4v1"
            loading="lazy"
            allowFullScreen
          />
        </div>

        {/* Contact Details */}
        <div className="p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.35em] text-sky-400">Find Us</p>
          <h2 className="mt-3 text-2xl font-bold text-white">Our Office</h2>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Mailing Address</p>
                <p className="mt-1 text-sm text-slate-300">Suite-G, Weller House,<br />58-60 Longbridge Rd,<br />Barking, London, IG11 8RT.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
                <Phone size={16} />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Phone / Tel</p>
                <a href="tel:02038190333" className="mt-1 block text-sm font-semibold text-white hover:text-sky-400 transition">02038190333</a>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Email</p>
                <a href="mailto:info@eslanditsolutions.com" className="mt-1 block text-sm font-semibold text-white hover:text-sky-400 transition">info@eslanditsolutions.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-sky-700/40 via-sky-600/30 to-sky-700/40 py-16">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <div className="relative mx-auto max-w-2xl px-6 text-center sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-sky-300">Stay Updated</p>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Subscribe to Our Newsletter</h2>
          <p className="mt-3 text-sm text-sky-100">Get the latest news, updates, and special offers from Esland IT Solutions.</p>

          {submitted ? (
            <div className="mt-8 rounded-2xl border border-sky-400/30 bg-sky-500/10 p-5">
              <p className="font-semibold text-sky-300">✓ Thank you for subscribing!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm text-white placeholder:text-sky-200 backdrop-blur focus:border-sky-400 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-white px-8 py-4 text-sm font-bold text-sky-600 shadow-xl transition hover:bg-sky-50 hover:shadow-2xl"
              >
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── TECH STACK SECTION ──────────────────────────────────────────────────────
const techStack = {
  Web: [
    { name: 'React', desc: 'Frontend UI library', icon: Code2, color: 'text-sky-400 border-sky-500/20' },
    { name: 'Next.js', desc: 'Enterprise frameworks', icon: Globe, color: 'text-white border-white/20' },
    { name: 'Node.js', desc: 'Robust backend runtime', icon: Server, color: 'text-green-400 border-green-500/20' },
    { name: 'Tailwind CSS', desc: 'Responsive CSS styles', icon: Palette, color: 'text-teal-400 border-teal-500/20' },
  ],
  Mobile: [
    { name: 'React Native', desc: 'Cross-platform app development', icon: Smartphone, color: 'text-sky-400 border-sky-500/20' },
    { name: 'Flutter', desc: 'High-perf rendering engine', icon: Globe, color: 'text-cyan-400 border-cyan-500/20' },
    { name: 'iOS/Swift', desc: 'Premium native iOS apps', icon: Smartphone, color: 'text-orange-400 border-orange-500/20' },
    { name: 'Android/Kotlin', desc: 'Robust native Android apps', icon: Smartphone, color: 'text-purple-400 border-purple-500/20' },
  ],
  'Cloud & DevOps': [
    { name: 'AWS', desc: 'Global cloud infrastructure', icon: Cloud, color: 'text-yellow-500 border-yellow-500/20' },
    { name: 'Docker', desc: 'Containerization & deployments', icon: Cpu, color: 'text-blue-400 border-blue-500/20' },
    { name: 'PostgreSQL', desc: 'Relational data storage', icon: Database, color: 'text-blue-500 border-blue-500/20' },
    { name: 'MongoDB', desc: 'Flexible NoSQL document database', icon: Database, color: 'text-green-500 border-green-500/20' },
  ],
  'UI/UX & Design': [
    { name: 'Figma', desc: 'Interactive UI/UX design', icon: Palette, color: 'text-rose-400 border-rose-500/20' },
    { name: 'Adobe Suite', desc: 'Creative design solutions', icon: Palette, color: 'text-red-500 border-red-500/20' },
    { name: 'Framer Motion', desc: 'Modern web animations', icon: PlayCircle, color: 'text-pink-400 border-pink-500/20' },
    { name: '2D Animation', desc: 'Engaging promotional videos', icon: PlayCircle, color: 'text-indigo-400 border-indigo-500/20' },
  ],
};

function TechStackSection() {
  const [activeTab, setActiveTab] = useState('Web');
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-14">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mb-14 text-center"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-sky-400">Our Capabilities</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Technology Stack</h2>
        <p className="mt-4 text-base text-slate-400">We leverage the most modern, secure, and robust technologies to build premium software.</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {Object.keys(techStack).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-6 py-3 text-sm font-semibold transition ${activeTab === tab ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg' : 'border border-white/10 text-slate-400 hover:border-sky-500/30 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="wait">
          {techStack[activeTab].map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className={`rounded-2xl border ${tech.color} bg-slate-950/65 p-6 backdrop-blur transition-shadow hover:shadow-[0_0_20px_rgba(14,165,233,0.1)]`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                  <tech.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{tech.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{tech.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── MAIN HOME ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="relative overflow-x-hidden pt-[33px]">
      <HeroSlider />
      <StatsSection />
      <AboutSection />
      <CTABanner />
      <ServicesSection />
      <TechStackSection />
      <TestimonialsSection />
      <PricingSection />

      {/* Partners */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <PartnersMarquee />
        </motion.div>
      </section>

      <AddressSection />
      <NewsletterSection />

      {/* Final CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-14"
      >
        <div className="flex flex-col gap-6 items-center rounded-[2rem] border border-white/10 bg-gradient-to-r from-sky-600/20 via-sky-500/10 to-sky-600/20 p-10 text-center shadow-xl lg:flex-row lg:justify-between lg:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-sky-400">Get Started Today</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Let&apos;s build something great together</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="tel:02038190333" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:brightness-110">
              <Phone size={16} /> Call Now
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white transition hover:border-sky-400">
              Get a Proposal <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.section>

      <ScrollToTop />
    </div>
  );
}
