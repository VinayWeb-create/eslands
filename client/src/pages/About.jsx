import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Rocket, ShieldCheck, Globe, Users, Lightbulb, Handshake,
  Eye, Target, ArrowRight, CheckCircle2, Sparkles, Building2,
  Calendar, Award, TrendingUp, Heart, Zap, Lock,
  Search, Layout, Code, FlaskConical, Headphones,
  Play, Pause, Volume2, VolumeX, Maximize2
} from 'lucide-react';
import { useAccessibleAnimations } from '../lib/animations';

const stats = [
  { value: '15+', label: 'Years of Experience', icon: Calendar, accent: 'from-blue-50 to-indigo-50 text-[#003087]' },
  { value: '500+', label: 'Projects Delivered', icon: Rocket, accent: 'from-blue-50 to-indigo-50 text-[#003087]' },
  { value: '50+', label: 'Team Members', icon: Users, accent: 'from-blue-50 to-indigo-50 text-[#003087]' },
  { value: '98%', label: 'Client Satisfaction', icon: Award, accent: 'from-blue-50 to-indigo-50 text-[#003087]' },
];

const timeline = [
  {
    year: '2013',
    title: 'Founded',
    description: 'Esland IT Solutions was established with a vision to deliver enterprise-grade digital solutions with a personal touch.',
    icon: Building2,
    color: 'from-[#003087] to-[#0057D8]',
  },
  {
    year: '2018',
    title: 'Expansion',
    description: 'Grew our capabilities into cloud-native development, DevOps consulting, and managed IT services.',
    icon: TrendingUp,
    color: 'from-[#003087] to-[#0057D8]',
  },
  {
    year: '2022',
    title: 'Global Reach',
    description: 'Expanded service offerings to include advanced security operations, data analytics, and enterprise-grade SaaS platforms.',
    icon: Globe,
    color: 'from-[#003087] to-[#0057D8]',
  },
  {
    year: '2024',
    title: 'Industry Leadership',
    description: 'Established as a trusted digital transformation partner across finance, healthcare, logistics, and retail sectors.',
    icon: Award,
    color: 'from-[#003087] to-[#0057D8]',
  },
];

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'We invest in emerging technologies, rapid prototyping, and continuous learning to keep our clients ahead of the curve.',
    gradient: 'from-[#003087] to-[#0057D8]',
  },
  {
    icon: Handshake,
    title: 'Trust & Integrity',
    description: 'We build long-term relationships through honest communication, transparent processes, and consistent delivery.',
    gradient: 'from-[#003087] to-[#0057D8]',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    description: 'Security is baked into every line of code, cloud architecture, and operational procedure we implement.',
    gradient: 'from-[#003087] to-[#0057D8]',
  },
  {
    icon: Heart,
    title: 'People-First Culture',
    description: 'We treat clients as partners and foster an environment where world-class talent thrives.',
    gradient: 'from-[#003087] to-[#0057D8]',
  },
];

const processSteps = [
  { icon: Search, title: 'Discovery & Plan', description: 'Requirements gathering, system architecture blueprinting, and roadmap definition.', duration: '1-2 weeks', color: 'from-blue-50 to-indigo-50' },
  { icon: Layout, title: 'UX & System Design', description: 'Interactive prototypes, component system architecture, and threat modeling.', duration: '2 weeks', color: 'from-blue-50 to-indigo-50' },
  { icon: Code, title: 'Agile Engineering', description: 'Iterative sprint execution with CI/CD automation, clean code standards, and security scans.', duration: '4-8 weeks', color: 'from-blue-50 to-indigo-50' },
  { icon: FlaskConical, title: 'QA & Security Audit', description: 'Automated testing, load testing, penetration audits, and SOC 2 readiness.', duration: '1-2 weeks', color: 'from-blue-50 to-indigo-50' },
  { icon: Rocket, title: 'Deployment', description: 'Zero-downtime production launch with monitoring and automated failover.', duration: '1 week', color: 'from-blue-50 to-indigo-50' },
  { icon: Headphones, title: '24/7 Support', description: 'Proactive telemetry monitoring, incident SLAs, and continuous optimization.', duration: 'Ongoing', color: 'from-blue-50 to-indigo-50' },
];

const differentiators = [
  'Customer-first thinking at every decision point',
  'Transparent delivery with clear communication',
  'Secure systems built to enterprise standards',
  'Sustained growth through measurable outcomes',
  'Agile methodology with rapid prototyping',
  'Post-launch support and long-term partnerships',
];

const leadership = [
  { name: 'Naresh Pathi', role: 'Founder & CEO', icon: Lightbulb, bio: 'Driving the vision for enterprise-grade digital transformation.' },
  { name: 'Sarah Jenkins', role: 'Chief Technology Officer', icon: Code, bio: '20+ years engineering secure, scalable systems.' },
  { name: 'Marcus Chen', role: 'Head of Operations', icon: Target, bio: 'Ensuring seamless delivery and client success across the globe.' },
];

const certifications = [
  { name: 'AWS Advanced Partner', icon: Globe },
  { name: 'Microsoft Gold Partner', icon: Layout },
  { name: 'ISO 27001 Certified', icon: Lock },
  { name: 'SOC 2 Type II Compliant', icon: ShieldCheck },
];

function CountUp({ target, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const numeric = parseInt(target.replace(/[^0-9]/g, ''), 10);

  return (
    <span ref={ref} className="text-4xl font-black text-[#003087]">
      {isInView ? (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {numeric}
        </motion.span>
      ) : '0'}{suffix}
    </span>
  );
}

function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const { prefersReducedMotion } = useAccessibleAnimations();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white text-gray-700 pt-[65px]">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-50/40 blur-[160px]" />

      {/* ── Hero Section ────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-[#F8FAFC] pt-24 pb-20 border-b border-[#E4E9F0]">
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 text-center">
          <FadeUp>
            <span className="section-badge mb-6 inline-flex">
              <Building2 className="w-4 h-4 mr-1 text-[#003087]" /> About Esland IT
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-gray-900 leading-[1.1] uppercase">
              Enterprise IT, <br />
              <span className="text-shimmer">
                Personal Touch
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-8 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Empowering businesses through digital excellence since 2013. We build secure, scalable solutions with the care of a dedicated partner.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="#our-story" className="inline-flex items-center gap-2 rounded-lg bg-[#003087] px-8 py-4 text-xs font-bold text-white shadow hover:bg-[#002068] transition-all uppercase tracking-wider">
                Our Story <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#values" className="inline-flex items-center gap-2 rounded-lg border border-[#C5D0E0] bg-white px-8 py-4 text-xs font-bold text-[#003087] hover:bg-gray-50 transition-all uppercase tracking-wider">
                Our Values
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="relative bg-white py-16 border-b border-[#E4E9F0]">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.08}>
                <div className="rounded-lg border border-[#E4E9F0] bg-white p-8 text-center shadow-sm hover:border-[#003087] transition-all duration-300">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-[#003087] border border-blue-100">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-black text-gray-900">
                    <CountUp target={stat.value} />
                  </div>
                  <div className="mt-2 text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story & Expanded Mission Video ──────────────── */}
      <section id="our-story" className="relative bg-white py-24 border-b border-[#E4E9F0]">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 relative z-10 space-y-16">
          {/* Narrative Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-5 py-2 mb-6">
                  <Sparkles className="w-4 h-4 text-[#003087]" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#003087]">Our Journey</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900 leading-tight">
                  Built on <br />
                  <span className="text-shimmer">
                    Trust & Innovation
                  </span>
                </h2>

                <div className="mt-8 space-y-5 text-gray-600 leading-relaxed font-medium text-sm sm:text-base">
                  <p>
                    Esland IT Solutions is an IT consulting firm that provides enterprise-grade technology services — software engineering, cloud and DevOps, security operations, data analytics, and managed IT — with a personal, people-first approach.
                  </p>
                  <p>
                    Founded in 2013 by Naresh Pathi, the company grew from a small web-development shop into a full-service digital transformation partner, trusted by clients across finance, healthcare, logistics, and retail.
                  </p>
                  <p>
                    We combine deep technical expertise with modern user experience design, strong security practices, and measurable business outcomes — so our clients can focus on growth while we handle the technology.
                  </p>
                </div>

                <div className="mt-10 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {['bg-blue-50', 'bg-indigo-50', 'bg-sky-50'].map((g, i) => (
                      <div key={i} className={`h-10 w-10 rounded-full ${g} border-2 border-white flex items-center justify-center text-[#003087] shadow-sm`}>
                        <Users className="w-4 h-4" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Trusted by businesses worldwide</span>
                </div>
              </div>
            </FadeUp>

            {/* High-Impact Expanded Video Card Showcase */}
            <FadeUp delay={0.15}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-sky-500/10 via-[#003087]/5 to-[#0057D8]/10 rounded-lg blur-2xl opacity-60 pointer-events-none" />
                
                <div className="relative rounded-lg overflow-hidden border border-[#E4E9F0] bg-white shadow-md">
                  {/* High-Definition Clear Video Element */}
                  <video
                    ref={videoRef}
                    src="/images/mission-video.mp4"
                    poster="/about-image.jpg"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-[480px] sm:h-[560px] object-cover filter brightness-100 contrast-105 transition-all duration-500"
                  />

                  {/* Subtle Gradient Overlay for Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />

                  {/* Top Bar Status Badge */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-auto">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 border border-[#E4E9F0] text-xs font-bold text-[#003087] uppercase tracking-widest shadow">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> ESLAND MISSION SHOWCASE
                    </span>

                    <button
                      onClick={toggleMute}
                      className="p-3 rounded-full bg-white/90 border border-[#E4E9F0] text-gray-700 hover:text-[#003087] transition-all shadow"
                      aria-label="Toggle Mute"
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-[#003087]" />}
                    </button>
                  </div>

                  {/* Bottom Video Info & Interactive Play Bar */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 rounded-lg bg-white border border-[#E4E9F0] shadow-lg flex items-center justify-between gap-4 pointer-events-auto">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={togglePlay}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#003087] text-white shadow hover:bg-[#002068] transition-all"
                        aria-label="Toggle Play"
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                      </button>
                      <div>
                        <h4 className="text-base font-display font-bold text-gray-900 leading-tight">Digital Excellence in Action</h4>
                        <p className="text-xs text-[#003087] font-semibold mt-0.5">Engineered for global enterprise scale</p>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                      <Target size={16} className="text-[#003087]" /> ISO 27001 Verified
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section className="relative bg-[#F8FAFC] py-24 border-b border-[#E4E9F0]">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 relative z-10">
          <FadeUp>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="section-badge mb-4 inline-flex">
                <Calendar className="w-4 h-4" /> Milestones
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900">Our Journey</h2>
              <p className="mt-4 text-gray-500 text-sm sm:text-base font-medium">From a small startup to a global technology partner — a decade of growth, innovation, and trust.</p>
            </div>
          </FadeUp>

          <div className="relative border-l border-[#C5D0E0] md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-0.5 md:before:bg-[#C5D0E0] max-w-4xl mx-auto space-y-12">
            {timeline.map((step, i) => (
              <FadeUp key={step.year} delay={i * 0.1}>
                <div className={`relative flex flex-col md:flex-row items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-[-9px] md:left-1/2 md:-translate-x-1/2 h-4.5 w-4.5 rounded-full border-4 border-white bg-[#003087] shadow z-10" />

                  {/* Card wrapper */}
                  <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="rounded-lg border border-[#E4E9F0] bg-white p-6 shadow-sm hover:border-[#003087] transition-all">
                      <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#003087] mb-2">{step.year}</span>
                      <h3 className="text-lg font-display font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed font-medium">{step.description}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────── */}
      <section className="relative bg-white py-28 border-b border-[#E4E9F0]">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Mission Card */}
            <FadeUp delay={0.1}>
              <div className="group relative rounded-lg overflow-hidden border border-[#E4E9F0] bg-white p-10 sm:p-12 hover:border-[#003087] shadow-sm transition-all">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#003087] to-[#0057D8] absolute top-0 left-0" />
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-50 text-[#003087] shadow">
                    <Target className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-display font-extrabold text-gray-900">Our Mission</h3>
                    <p className="text-xs text-[#003087] font-bold uppercase tracking-wider mt-1">What drives us forward</p>
                  </div>
                </div>
                <p className="text-gray-600 text-base leading-relaxed mb-8 font-medium">
                  To empower businesses with secure, scalable, and elegant technology solutions — combining deep technical expertise with modern UX, strong security, and measurable outcomes. We exist to turn complex challenges into simple, reliable systems.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { text: 'Customer-first thinking', icon: '01' },
                    { text: 'Transparent delivery', icon: '02' },
                    { text: 'Secure by design', icon: '03' },
                    { text: 'Sustained growth', icon: '04' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 rounded-lg bg-gray-50 border border-[#E4E9F0] px-4 py-3 text-xs text-gray-700 font-semibold">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-100 text-[#003087] text-xs font-bold">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Vision Card */}
            <FadeUp delay={0.2}>
              <div className="group relative rounded-lg overflow-hidden border border-[#E4E9F0] bg-white p-10 sm:p-12 hover:border-[#003087] shadow-sm transition-all">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#003087] to-[#0057D8] absolute top-0 left-0" />
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-50 text-[#003087] shadow">
                    <Eye className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-display font-extrabold text-gray-900">Our Vision</h3>
                    <p className="text-xs text-[#003087] font-bold uppercase tracking-wider mt-1">Where we're heading</p>
                  </div>
                </div>
                <p className="text-gray-600 text-base leading-relaxed mb-8 font-medium">
                  To shape the future of technology by making enterprise-grade digital transformation accessible, transparent, and human — where every business, regardless of size, can harness the power of modern IT.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { text: 'Accessible innovation', icon: '01' },
                    { text: 'Transparent partnerships', icon: '02' },
                    { text: 'Global technology impact', icon: '03' },
                    { text: 'Human-centred design', icon: '04' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 rounded-lg bg-gray-50 border border-[#E4E9F0] px-4 py-3 text-xs text-gray-700 font-semibold">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-100 text-[#003087] text-xs font-bold">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────────── */}
      <section id="values" className="relative bg-[#F8FAFC] py-28 border-b border-[#E4E9F0]">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <FadeUp>
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <span className="section-badge mb-4 inline-flex">
                <Heart className="w-4 h-4 mr-1 text-[#003087]" /> Core Values
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900">What We Stand For</h2>
              <p className="mt-4 text-gray-500 text-sm sm:text-base font-medium">The principles that guide every decision, every line of code, and every client relationship.</p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-8">
            {values.map((val, i) => (
              <FadeUp key={val.title} delay={i * 0.1}>
                <div className="rounded-lg overflow-hidden border border-[#E4E9F0] bg-white shadow-sm hover:border-[#003087] transition-all">
                  <div className="flex flex-col sm:flex-row h-full">
                    <div className="flex items-center justify-center p-8 bg-gray-50 sm:w-40 shrink-0 border-b sm:border-b-0 sm:border-r border-[#E4E9F0]">
                      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gradient-to-br from-[#003087] to-[#0057D8] text-white shadow-md">
                        <val.icon className="w-10 h-10" />
                      </div>
                    </div>
                    <div className="flex-1 p-8 sm:p-10">
                      <h3 className="text-xl font-display font-bold text-gray-900 mb-3">{val.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">{val.description}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────── */}
      <section className="relative bg-white py-28 border-b border-[#E4E9F0]">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div>
                <div className="section-badge mb-6 inline-flex">
                  <Zap className="w-4 h-4 mr-1 text-[#003087]" /> Differentiators
                </div>
                <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900 leading-tight">
                  Why Businesses <br />
                  <span className="text-shimmer">
                    Choose Us
                  </span>
                </h2>
                <p className="mt-6 text-gray-500 text-sm sm:text-base leading-relaxed font-medium">
                  We don't just build software — we build lasting partnerships. Every decision we make is guided by the belief that technology should serve people, not the other way around.
                </p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {differentiators.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg bg-gray-50 border border-[#E4E9F0] p-4 text-xs font-semibold text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-sky-500/10 via-[#003087]/5 to-[#0057D8]/10 rounded-lg blur-2xl opacity-60 pointer-events-none" />
                
                <motion.div
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.01 }}
                  className="relative rounded-lg overflow-hidden border border-[#E4E9F0] bg-white shadow flex flex-col justify-between h-[440px]"
                >
                  {/* Subtle Top Gradient Accent Border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#003087] via-[#0057D8] to-green-500" />

                  {/* Enterprise Dashboard Video Engine */}
                  <div className="relative w-full flex-1 overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                    <video
                      src="/images/Create_a_premium_second_sea.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-label="Enterprise Technology Animation Dashboard"
                      className="w-full h-full object-contain filter brightness-105 contrast-105 transition-all duration-700 pointer-events-none select-none rounded-lg"
                    />
                  </div>

                  {/* Tech Badges Footer inside Card */}
                  <div className="relative z-10 p-6 pt-2 bg-white border-t border-[#E4E9F0]">
                    <p className="text-[10px] text-[#003087] uppercase tracking-[0.25em] font-extrabold mb-3">Our Core Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Node.js', 'AWS', 'Flutter', 'DevOps', 'Python', 'MongoDB'].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg bg-gray-50 border border-[#E4E9F0] px-3 py-1.5 text-xs font-bold text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Development Process ──────────────────────────────── */}
      <section className="relative bg-[#F8FAFC] py-28 border-b border-[#E4E9F0]">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <FadeUp>
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <span className="section-badge mb-4 inline-flex">
                <Code className="w-4 h-4" /> How We Work
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900">Our Development Process</h2>
              <p className="mt-4 text-gray-500 text-sm sm:text-base font-medium">A proven, transparent workflow that turns ideas into production-ready solutions.</p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {processSteps.map((step, i) => (
              <FadeUp key={step.title} delay={i * 0.08}>
                <div className="rounded-lg bg-white border border-[#E4E9F0] p-6 hover:border-[#003087] transition-all shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#003087] border border-blue-100 shadow-sm">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#003087]">Step {i + 1}</span>
                      <h3 className="text-lg font-display font-bold text-gray-900">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4 font-medium">{step.description}</p>
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold text-[#003087] uppercase tracking-widest">
                    {step.duration}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ───────────────────────────────────────── */}
      <section className="relative bg-white py-24 border-b border-[#E4E9F0]">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <FadeUp>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="section-badge mb-4 inline-flex">
                <Users className="w-4 h-4" /> Leadership Team
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900">Guided by Experience</h2>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((leader, i) => (
              <FadeUp key={leader.name} delay={i * 0.1}>
                <div className="rounded-lg bg-white border border-[#E4E9F0] p-8 text-center hover:border-[#003087] transition-all shadow-sm">
                  <div className="mx-auto h-20 w-20 rounded-full bg-blue-50 border border-blue-100 mb-6 flex items-center justify-center text-[#003087] shadow-sm">
                    <leader.icon className="w-9 h-9" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-900">{leader.name}</h3>
                  <p className="text-xs text-[#003087] font-bold uppercase tracking-wider mt-1 mb-3">{leader.role}</p>
                  <p className="text-gray-600 text-xs leading-relaxed font-medium">{leader.bio}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications & Partners ────────────────────────── */}
      <section className="relative bg-white py-16 border-b border-[#E4E9F0]">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 text-center">
          <FadeUp>
            <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-10">
              Enterprise Partners & Audited Certifications
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-600">
                  <cert.icon className="w-6 h-6 text-[#003087]" />
                  <span className="text-sm font-bold text-gray-800">{cert.name}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative bg-[#07111F] py-24">
        <div className="mx-auto max-w-7xl px-6 text-center relative z-10">
          <FadeUp>
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
                Ready to Build <br />
                <span className="text-shimmer">
                  Something Great?
                </span>
              </h2>
              <p className="mt-6 text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                Let's talk about how Esland IT Solutions can help you achieve your digital transformation goals.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-[#003087] px-8 py-4 text-xs font-bold text-white shadow hover:bg-[#002068] transition-all uppercase tracking-wider">
                  Schedule Discovery Call <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/careers" className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-4 text-xs font-bold text-slate-200 hover:text-white transition-all uppercase tracking-wider">
                  View Open Roles
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
