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
  { value: '15+', label: 'Years of Experience', icon: Calendar, accent: 'from-sky-400 to-cyan-400' },
  { value: '500+', label: 'Projects Delivered', icon: Rocket, accent: 'from-indigo-400 to-purple-400' },
  { value: '50+', label: 'Team Members', icon: Users, accent: 'from-sky-400 to-indigo-400' },
  { value: '98%', label: 'Client Satisfaction', icon: Award, accent: 'from-purple-400 to-pink-400' },
];

const timeline = [
  {
    year: '2013',
    title: 'Founded',
    description: 'Esland IT Solutions was established with a vision to deliver enterprise-grade digital solutions with a personal touch.',
    icon: Building2,
    color: 'from-sky-500 to-cyan-500',
  },
  {
    year: '2018',
    title: 'Expansion',
    description: 'Grew our capabilities into cloud-native development, DevOps consulting, and managed IT services.',
    icon: TrendingUp,
    color: 'from-indigo-500 to-purple-500',
  },
  {
    year: '2022',
    title: 'Global Reach',
    description: 'Expanded service offerings to include advanced security operations, data analytics, and enterprise-grade SaaS platforms.',
    icon: Globe,
    color: 'from-purple-500 to-pink-500',
  },
  {
    year: '2024',
    title: 'Industry Leadership',
    description: 'Established as a trusted digital transformation partner across finance, healthcare, logistics, and retail sectors.',
    icon: Award,
    color: 'from-sky-500 to-indigo-500',
  },
];

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'We invest in emerging technologies, rapid prototyping, and continuous learning to keep our clients ahead of the curve.',
    gradient: 'from-sky-500 to-cyan-500',
  },
  {
    icon: Handshake,
    title: 'Trust & Integrity',
    description: 'We build long-term relationships through honest communication, transparent processes, and consistent delivery.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    description: 'Security is baked into every line of code, cloud architecture, and operational procedure we implement.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Heart,
    title: 'People-First Culture',
    description: 'We treat clients as partners and foster an environment where world-class talent thrives.',
    gradient: 'from-sky-500 to-indigo-500',
  },
];

const processSteps = [
  { icon: Search, title: 'Discovery & Plan', description: 'Requirements gathering, system architecture blueprinting, and roadmap definition.', duration: '1-2 weeks', color: 'from-sky-500 to-cyan-500' },
  { icon: Layout, title: 'UX & System Design', description: 'Interactive prototypes, component system architecture, and threat modeling.', duration: '2 weeks', color: 'from-cyan-500 to-blue-500' },
  { icon: Code, title: 'Agile Engineering', description: 'Iterative sprint execution with CI/CD automation, clean code standards, and security scans.', duration: '4-8 weeks', color: 'from-blue-500 to-indigo-500' },
  { icon: FlaskConical, title: 'QA & Security Audit', description: 'Automated testing, load testing, penetration audits, and SOC 2 readiness.', duration: '1-2 weeks', color: 'from-indigo-500 to-purple-500' },
  { icon: Rocket, title: 'Deployment', description: 'Zero-downtime production launch with monitoring and automated failover.', duration: '1 week', color: 'from-purple-500 to-pink-500' },
  { icon: Headphones, title: '24/7 Support', description: 'Proactive telemetry monitoring, incident SLAs, and continuous optimization.', duration: 'Ongoing', color: 'from-pink-500 to-sky-500' },
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
    <span ref={ref} className="text-4xl font-black bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
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
    <div className="relative overflow-hidden bg-slate-950 text-slate-300 pt-[65px]">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed left-0 top-0 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[160px]" />
      <div className="pointer-events-none fixed right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[160px]" />

      {/* ── Hero Section ────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-slate-950 pt-28 pb-20 border-b border-white/10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 mb-8">
              <Building2 className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400">About Esland IT</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
              Enterprise IT, <br />
              <span className="animate-text-shimmer">
                Personal Touch
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-8 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
              Empowering businesses through digital excellence since 2013. We build secure, scalable solutions with the care of a dedicated partner.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="#our-story" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-4 text-xs font-bold text-white shadow-xl shadow-sky-500/20 hover:brightness-110 transition-all uppercase tracking-wider">
                Our Story <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#values" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/80 px-8 py-4 text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all uppercase tracking-wider">
                Our Values
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="relative bg-slate-950 py-16 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.08}>
                <div className="spotlight-card rounded-2xl bg-slate-900/90 border border-white/10 p-8 text-center transition-all duration-300 hover:border-sky-400/40">
                  <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${stat.accent} shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-black text-white">
                    <CountUp target={stat.value} />
                  </div>
                  <div className="mt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story & Expanded Mission Video ──────────────── */}
      <section id="our-story" className="relative bg-slate-950 py-24 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 relative z-10 space-y-16">
          {/* Narrative Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-5 py-2 mb-6">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-300">Our Journey</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  Built on <br />
                  <span className="animate-text-shimmer">
                    Trust & Innovation
                  </span>
                </h2>

                <div className="mt-8 space-y-5 text-slate-300 leading-relaxed font-medium text-sm sm:text-base">
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
                    {['from-sky-500 to-cyan-500', 'from-indigo-500 to-purple-500', 'from-purple-500 to-pink-500'].map((g, i) => (
                      <div key={i} className={`h-10 w-10 rounded-full bg-gradient-to-br ${g} border-2 border-slate-950 flex items-center justify-center text-white shadow-md`}>
                        <Users className="w-4 h-4" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Trusted by businesses worldwide</span>
                </div>
              </div>
            </FadeUp>

            {/* High-Impact Expanded Video Card Showcase */}
            <FadeUp delay={0.15}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-sky-500/30 via-indigo-500/20 to-purple-600/30 rounded-[3rem] blur-2xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />
                
                <div className="spotlight-card relative rounded-[2.5rem] overflow-hidden border-2 border-sky-400/30 bg-slate-900/95 shadow-[0_0_50px_rgba(56,189,248,0.2)] hover:border-sky-400/60 transition-all duration-500">
                  {/* High-Definition Clear Video Element */}
                  <video
                    ref={videoRef}
                    src="/images/mission-video.mp4"
                    poster="/images/chel-4.png"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-[480px] sm:h-[560px] object-cover filter brightness-100 contrast-105 transition-all duration-500"
                  />

                  {/* Subtle Gradient Overlay for Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

                  {/* Top Bar Status Badge */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-auto">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-xl border border-sky-400/30 text-xs font-bold text-sky-300 uppercase tracking-widest shadow-xl">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> ESLAND MISSION SHOWCASE
                    </span>

                    <button
                      onClick={toggleMute}
                      className="p-3 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/20 text-white hover:text-sky-300 hover:border-sky-400/50 transition-all shadow-xl"
                      aria-label="Toggle Mute"
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-sky-400" />}
                    </button>
                  </div>

                  {/* Bottom Video Info & Interactive Play Bar */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-slate-950/85 backdrop-blur-2xl border border-white/15 shadow-2xl flex items-center justify-between gap-4 pointer-events-auto">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={togglePlay}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/30 hover:scale-105 transition-all"
                        aria-label="Toggle Play"
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                      </button>
                      <div>
                        <h4 className="text-base font-bold text-white leading-tight">Digital Excellence in Action</h4>
                        <p className="text-xs text-sky-300 font-semibold mt-0.5">Engineered for global enterprise scale</p>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <Target size={16} className="text-sky-400" /> ISO 27001 Verified
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section className="relative bg-slate-950 py-24 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 relative z-10">
          <FadeUp>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 mb-4 text-xs font-bold uppercase tracking-[0.25em] text-sky-400">
                <Calendar className="w-4 h-4" /> Milestones
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white">Our Journey</h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base font-medium">From a small startup to a global technology partner — a decade of growth, innovation, and trust.</p>
            </div>
          </FadeUp>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/30 via-indigo-500/30 to-purple-500/30 hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <FadeUp key={item.year} delay={i * 0.1}>
                  <div className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                      <motion.div
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="spotlight-card inline-block w-full max-w-md p-8 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl text-left hover:border-sky-400/40"
                      >
                        <span className="text-5xl font-black bg-gradient-to-br from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                          {item.year}
                        </span>
                        <h3 className="mt-3 text-2xl font-bold text-white">{item.title}</h3>
                        <p className="mt-3 text-slate-300 leading-relaxed text-sm font-medium">{item.description}</p>
                      </motion.div>
                    </div>

                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-14 w-14 items-center justify-center rounded-full bg-slate-950 border border-white/15 z-10 shadow-xl">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-white`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="md:w-1/2" />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────── */}
      <section className="relative bg-slate-950 py-28 border-b border-white/10">
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <FadeUp>
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-5 py-2 mb-4 text-xs font-bold uppercase tracking-[0.25em] text-purple-400">
                <Eye className="w-4 h-4" /> Purpose
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white">Mission & Vision</h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base font-medium">The driving force behind everything we build.</p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Mission Card */}
            <FadeUp delay={0.1}>
              <div className="spotlight-card group relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/90 p-10 sm:p-12 hover:border-sky-400/40 shadow-2xl">
                <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-500 absolute top-0 left-0" />
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-xl">
                    <Target className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white">Our Mission</h3>
                    <p className="text-xs text-sky-400 font-bold uppercase tracking-wider mt-1">What drives us forward</p>
                  </div>
                </div>
                <p className="text-slate-300 text-base leading-relaxed mb-8 font-medium">
                  To empower businesses with secure, scalable, and elegant technology solutions — combining deep technical expertise with modern UX, strong security, and measurable outcomes. We exist to turn complex challenges into simple, reliable systems.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { text: 'Customer-first thinking', icon: '01' },
                    { text: 'Transparent delivery', icon: '02' },
                    { text: 'Secure by design', icon: '03' },
                    { text: 'Sustained growth', icon: '04' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 rounded-xl bg-slate-950/80 border border-white/10 px-4 py-3 text-xs text-slate-200 font-semibold">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 text-xs font-bold">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Vision Card */}
            <FadeUp delay={0.2}>
              <div className="spotlight-card group relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/90 p-10 sm:p-12 hover:border-purple-400/40 shadow-2xl">
                <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-500 absolute top-0 left-0" />
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-xl">
                    <Eye className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white">Our Vision</h3>
                    <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mt-1">Where we're heading</p>
                  </div>
                </div>
                <p className="text-slate-300 text-base leading-relaxed mb-8 font-medium">
                  To shape the future of technology by making enterprise-grade digital transformation accessible, transparent, and human — where every business, regardless of size, can harness the power of modern IT.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { text: 'Accessible innovation', icon: '01' },
                    { text: 'Transparent partnerships', icon: '02' },
                    { text: 'Global technology impact', icon: '03' },
                    { text: 'Human-centred design', icon: '04' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 rounded-xl bg-slate-950/80 border border-white/10 px-4 py-3 text-xs text-slate-200 font-semibold">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 text-xs font-bold">{item.icon}</span>
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
      <section id="values" className="relative bg-slate-950 py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <FadeUp>
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 mb-4 text-xs font-bold uppercase tracking-[0.25em] text-sky-400">
                <Heart className="w-4 h-4" /> Core Values
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white">What We Stand For</h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base font-medium">The principles that guide every decision, every line of code, and every client relationship.</p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-8">
            {values.map((val, i) => (
              <FadeUp key={val.title} delay={i * 0.1}>
                <div className="spotlight-card rounded-3xl overflow-hidden border border-white/10 bg-slate-900/90 shadow-2xl hover:border-sky-400/40 transition-all">
                  <div className="flex flex-col sm:flex-row h-full">
                    <div className="flex items-center justify-center p-8 bg-slate-950 sm:w-40 shrink-0 border-b sm:border-b-0 sm:border-r border-white/10">
                      <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${val.gradient} text-white shadow-xl`}>
                        <val.icon className="w-10 h-10" />
                      </div>
                    </div>
                    <div className="flex-1 p-8 sm:p-10">
                      <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">{val.description}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────── */}
      <section className="relative bg-slate-950 py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 mb-6">
                  <Zap className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400">Differentiators</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  Why Businesses <br />
                  <span className="animate-text-shimmer">
                    Choose Us
                  </span>
                </h2>
                <p className="mt-6 text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                  We don't just build software — we build lasting partnerships. Every decision we make is guided by the belief that technology should serve people, not the other way around.
                </p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {differentiators.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl bg-slate-900/80 border border-white/10 p-4 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="relative group">
                {/* Ambient Subtle Background Light & Low-Opacity Grid */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-sky-500/20 via-indigo-500/15 to-purple-600/20 rounded-[2.5rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(56,189,248,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.4)_1px,transparent_1px)] bg-[size:30px_30px] rounded-[2.2rem] pointer-events-none" />

                {/* Glassmorphic Enterprise Card Container */}
                <motion.div
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.02, rotateX: prefersReducedMotion ? 0 : 2, rotateY: prefersReducedMotion ? 0 : -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  style={{ perspective: 1000 }}
                  className="spotlight-card relative rounded-[2.2rem] overflow-hidden border border-white/20 bg-slate-900/85 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:border-sky-400/50 group-hover:shadow-[0_25px_60px_rgba(56,189,248,0.25)] transition-all duration-500 flex flex-col justify-between h-[440px]"
                >
                  {/* Subtle Top Gradient Accent Border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-500 opacity-80" />

                  {/* Enterprise Dashboard Video Engine */}
                  <div className="relative w-full flex-1 overflow-hidden bg-slate-950 flex items-center justify-center p-2">
                    <video
                      src="/images/Create_a_premium_second_sea.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-label="Enterprise Technology Animation Dashboard"
                      className="w-full h-full object-contain filter brightness-105 contrast-105 transition-all duration-700 pointer-events-none select-none rounded-[1.8rem]"
                    />
                    
                    {/* Light Reflection Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Tech Badges Footer inside Card */}
                  <div className="relative z-10 p-6 pt-2 bg-slate-950/90 backdrop-blur-md border-t border-white/10">
                    <p className="text-[10px] text-sky-400 uppercase tracking-[0.3em] font-extrabold mb-3">Our Core Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Node.js', 'AWS', 'Flutter', 'DevOps', 'Python', 'MongoDB'].map((tag) => (
                        <motion.span
                          key={tag}
                          whileHover={{ scale: prefersReducedMotion ? 1 : 1.08, y: prefersReducedMotion ? 0 : -2 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="rounded-xl bg-slate-900/90 border border-white/15 px-3 py-1.5 text-xs font-bold text-slate-200 hover:text-white hover:border-sky-400/50 hover:bg-sky-500/10 hover:shadow-[0_0_12px_rgba(56,189,248,0.3)] transition-all cursor-pointer"
                        >
                          {tag}
                        </motion.span>
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
      <section className="relative bg-slate-950 py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <FadeUp>
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-5 py-2 mb-4 text-xs font-bold uppercase tracking-[0.25em] text-indigo-400">
                <Code className="w-4 h-4" /> How We Work
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white">Our Development Process</h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base font-medium">A proven, transparent workflow that turns ideas into production-ready solutions.</p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {processSteps.map((step, i) => (
              <FadeUp key={step.title} delay={i * 0.08}>
                <div className="spotlight-card rounded-2xl bg-slate-900/90 border border-white/10 p-6 hover:border-sky-400/40 transition-all shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white shadow-lg`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">Step {i + 1}</span>
                      <h3 className="text-lg font-bold text-white">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 font-medium">{step.description}</p>
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-950 border border-white/10 text-[10px] font-bold text-sky-300 uppercase tracking-widest">
                    {step.duration}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ───────────────────────────────────────── */}
      <section className="relative bg-slate-950 py-24 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <FadeUp>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-5 py-2 mb-4 text-xs font-bold uppercase tracking-[0.25em] text-indigo-400">
                <Users className="w-4 h-4" /> Leadership Team
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white">Guided by Experience</h2>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((leader, i) => (
              <FadeUp key={leader.name} delay={i * 0.1}>
                <div className="spotlight-card rounded-2xl bg-slate-900/90 border border-white/10 p-8 text-center hover:border-sky-400/40 transition-all shadow-xl">
                  <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-sky-400/30 mb-6 flex items-center justify-center text-sky-400 shadow-lg">
                    <leader.icon className="w-9 h-9" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{leader.name}</h3>
                  <p className="text-xs text-sky-400 font-bold uppercase tracking-wider mt-1 mb-3">{leader.role}</p>
                  <p className="text-slate-300 text-xs leading-relaxed font-medium">{leader.bio}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications & Partners ────────────────────────── */}
      <section className="relative bg-slate-950 py-16 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 text-center">
          <FadeUp>
            <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-10">
              Enterprise Partners & Audited Certifications
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <cert.icon className="w-6 h-6 text-sky-400" />
                  <span className="text-sm font-bold text-white">{cert.name}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-24">
        <div className="mx-auto max-w-7xl px-6 text-center relative z-10">
          <FadeUp>
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                Ready to Build <br />
                <span className="animate-text-shimmer">
                  Something Great?
                </span>
              </h2>
              <p className="mt-6 text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                Let's talk about how Esland IT Solutions can help you achieve your digital transformation goals.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-4 text-xs font-bold text-white shadow-xl shadow-sky-500/20 hover:brightness-110 transition-all uppercase tracking-wider">
                  Book a Consultation <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/careers" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/80 px-8 py-4 text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all uppercase tracking-wider">
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
