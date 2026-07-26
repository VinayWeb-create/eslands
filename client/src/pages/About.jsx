import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Rocket, ShieldCheck, Globe, Users, Lightbulb, Handshake,
  Eye, Target, ArrowRight, CheckCircle2, Sparkles, Building2,
  Calendar, Award, TrendingUp, Heart, Zap, Lock,
  Search, Layout, Code, FlaskConical, Headphones
} from 'lucide-react';

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
    icon: Globe,
    title: 'Global Perspective',
    description: 'With clients and partners worldwide, we bring diverse insights and cross-industry expertise to every project.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Heart,
    title: 'People-Centric',
    description: 'Technology is built by people, for people. We prioritise user experience, accessibility, and human-centred design.',
    gradient: 'from-sky-500 to-indigo-500',
  },
];

const processSteps = [
  { icon: Search, title: 'Discovery', description: 'Understanding your goals, audience, and challenges.', duration: '1–2 weeks', color: 'from-sky-500 to-cyan-500' },
  { icon: Layout, title: 'Planning', description: 'Detailed roadmaps, timelines, and technical specs.', duration: '1–2 weeks', color: 'from-indigo-500 to-purple-500' },
  { icon: Code, title: 'Development', description: 'Clean, scalable code built with modern stacks.', duration: '4–8 weeks', color: 'from-purple-500 to-pink-500' },
  { icon: FlaskConical, title: 'Testing', description: 'Rigorous QA across unit, integration, and UAT.', duration: '1–2 weeks', color: 'from-sky-500 to-indigo-500' },
  { icon: Rocket, title: 'Deployment', description: 'Seamless go-live with monitoring and rollback.', duration: '1 week', color: 'from-indigo-500 to-blue-500' },
  { icon: Headphones, title: 'Support', description: 'Ongoing maintenance and dedicated support.', duration: 'Ongoing', color: 'from-cyan-500 to-sky-500' },
];

const differentiators = [
  'Customer-first thinking at every decision point',
  'Transparent delivery with clear communication',
  'Secure systems built to enterprise standards',
  'Sustained growth through measurable outcomes',
  'Agile methodology with rapid prototyping',
  'Post-launch support and long-term partnerships',
];

function CountUp({ target, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const numeric = parseInt(target.replace(/[^0-9]/g, ''), 10);

  return (
    <span ref={ref} className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
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

function GlowCard({ children, className = '', glowColor = 'sky' }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty('--x', `${x}%`);
    ref.current.style.setProperty('--y', `${y}%`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden transition-colors duration-300 hover:border-slate-600/50 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), rgba(56,189,248,0.04), transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function About() {
  return (
    <div className="relative overflow-hidden">
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-slate-950 pt-28 pb-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-500/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/[0.04] rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-5 py-2 mb-8">
              <Building2 className="w-4 h-4 text-sky-400" />
              <span className="text-sm font-medium text-sky-300 tracking-wide">About Us</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Enterprise IT,
              <br />
              <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Personal Touch
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-8 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Empowering businesses through digital excellence since 2013. We build secure, scalable solutions with the care of a dedicated partner.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="#our-story" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:shadow-sky-500/30 hover:scale-[1.02]">
                Our Story
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#values" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                Our Values
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="relative bg-slate-950 py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.08}>
                <div className="group relative rounded-2xl bg-slate-800/50 border border-slate-700/50 p-8 text-center transition-all duration-300 hover:border-slate-600/50 hover:bg-slate-800/70">
                  <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${stat.accent} bg-opacity-10`}>
                    <stat.icon className="w-6 h-6 text-white/80" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-slate-400 font-medium">{stat.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story (two-column) ───────────────────────────── */}
      <section id="our-story" className="relative bg-slate-900/50 py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-indigo-500/[0.03] rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/5 px-5 py-2 mb-6">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-medium text-indigo-300 tracking-wide">Our Journey</span>
                </div>

                <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                  Built on{' '}
                  <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                    Trust & Innovation
                  </span>
                </h2>

                <div className="mt-8 space-y-5 text-slate-400 leading-relaxed">
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

                <div className="mt-10 flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {['from-sky-400 to-cyan-400', 'from-indigo-400 to-purple-400', 'from-purple-400 to-pink-400'].map((g, i) => (
                      <div key={i} className={`h-10 w-10 rounded-full bg-gradient-to-br ${g} border-2 border-slate-900 flex items-center justify-center`}>
                        <Users className="w-4 h-4 text-white" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-slate-400">Trusted by businesses worldwide</span>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-sky-500/10 to-indigo-500/10 rounded-3xl blur-xl" />
                <div className="relative rounded-3xl overflow-hidden border border-slate-700/50 bg-slate-900">
                  <img
                    src="/images/chel-4.png"
                    alt="Esland IT Solutions team"
                    className="w-full h-[420px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Our Mission</div>
                        <div className="text-xs text-slate-300">Empowering businesses through digital excellence</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section className="relative bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-5 py-2 mb-6">
                <Calendar className="w-4 h-4 text-sky-400" />
                <span className="text-sm font-medium text-sky-300 tracking-wide">Milestones</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white">Our Journey</h2>
              <p className="mt-4 text-slate-400 max-w-xl mx-auto">From a small startup to a global technology partner — a decade of growth, innovation, and trust.</p>
            </div>
          </FadeUp>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/30 via-indigo-500/30 to-purple-500/30 hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <FadeUp key={item.year} delay={i * 0.1}>
                  <div className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Year badge */}
                    <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                      <div className={`inline-block ${i % 2 === 0 ? '' : ''}`}>
                        <span className="text-5xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                          {item.year}
                        </span>
                        <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                        <p className="mt-2 text-slate-400 leading-relaxed max-w-md">{item.description}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-14 w-14 items-center justify-center rounded-full bg-slate-950 border border-white/[0.08] z-10">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${item.color}`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="md:w-1/2" />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────── */}
      <section className="relative bg-slate-900/50 py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-500/[0.04] rounded-full blur-[140px]" />
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-sky-500/[0.03] rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <FadeUp>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/5 px-5 py-2 mb-6">
                <Eye className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300 tracking-wide">Purpose</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white">Mission & Vision</h2>
              <p className="mt-4 text-slate-400 max-w-xl mx-auto">The driving force behind everything we build.</p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Mission Card */}
            <FadeUp delay={0.1}>
              <div className="group relative rounded-3xl overflow-hidden border border-sky-500/10 bg-slate-900 transition-all duration-500 hover:border-sky-500/25 hover:shadow-2xl hover:shadow-sky-500/5">
                {/* Top gradient stripe */}
                <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-500" />
                <div className="p-10 sm:p-12">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">Our Mission</h3>
                      <p className="text-sm text-sky-400 font-medium mt-1">What drives us forward</p>
                    </div>
                  </div>
                  <p className="text-lg text-slate-300 leading-relaxed mb-10">
                    To empower businesses with secure, scalable, and elegant technology solutions — combining deep technical expertise with modern UX, strong security, and measurable outcomes. We exist to turn complex challenges into simple, reliable systems.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { text: 'Customer-first thinking', icon: '01' },
                      { text: 'Transparent delivery', icon: '02' },
                      { text: 'Secure by design', icon: '03' },
                      { text: 'Sustained growth', icon: '04' },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-3 rounded-xl bg-slate-800/50 border border-slate-700/50 px-4 py-3 group-hover:border-sky-500/15 transition-colors">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 text-xs font-bold">{item.icon}</span>
                        <span className="text-sm text-slate-200 font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Vision Card */}
            <FadeUp delay={0.2}>
              <div className="group relative rounded-3xl overflow-hidden border border-indigo-500/10 bg-slate-900 transition-all duration-500 hover:border-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/5">
                {/* Top gradient stripe */}
                <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-500" />
                <div className="p-10 sm:p-12">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">Our Vision</h3>
                      <p className="text-sm text-indigo-400 font-medium mt-1">Where we're heading</p>
                    </div>
                  </div>
                  <p className="text-lg text-slate-300 leading-relaxed mb-10">
                    To shape the future of technology by making enterprise-grade digital transformation accessible, transparent, and human — where every business, regardless of size, can harness the power of modern IT.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { text: 'Accessible innovation', icon: '01' },
                      { text: 'Transparent partnerships', icon: '02' },
                      { text: 'Global technology impact', icon: '03' },
                      { text: 'Human-centred design', icon: '04' },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-3 rounded-xl bg-slate-800/50 border border-slate-700/50 px-4 py-3 group-hover:border-indigo-500/15 transition-colors">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-bold">{item.icon}</span>
                        <span className="text-sm text-slate-200 font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────────── */}
      <section id="values" className="relative bg-slate-950 py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <FadeUp>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-5 py-2 mb-6">
                <Heart className="w-4 h-4 text-sky-400" />
                <span className="text-sm font-medium text-sky-300 tracking-wide">Core Values</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white">What We Stand For</h2>
              <p className="mt-4 text-slate-400 max-w-xl mx-auto">The principles that guide every decision, every line of code, and every client relationship.</p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-8">
            {values.map((val, i) => (
              <FadeUp key={val.title} delay={i * 0.1}>
                <div className="group relative rounded-3xl overflow-hidden border border-slate-700/50 bg-slate-900 transition-all duration-500 hover:border-slate-600/50 hover:shadow-2xl hover:shadow-black/20 h-full">
                  <div className="flex flex-col sm:flex-row h-full">
                    {/* Icon column */}
                    <div className="flex items-center justify-center p-8 sm:p-10 bg-slate-800/50 sm:w-40 shrink-0">
                      <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${val.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <val.icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    {/* Content */}
                    <div className="flex-1 p-8 sm:p-10 border-t sm:border-t-0 sm:border-l border-slate-700/50">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-100 transition-colors">{val.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{val.description}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────── */}
      <section className="relative bg-slate-900/50 py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-500/[0.03] rounded-full blur-[160px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-5 py-2 mb-6">
                  <Zap className="w-4 h-4 text-sky-400" />
                  <span className="text-sm font-medium text-sky-300 tracking-wide">Differentiators</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                  Why Businesses{' '}
                  <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                    Choose Us
                  </span>
                </h2>
                <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                  We don't just build software — we build lasting partnerships. Every decision we make is guided by the belief that technology should serve people, not the other way around.
                </p>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {differentiators.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl bg-slate-800/50 border border-slate-700/50 p-4 hover:border-sky-500/15 hover:bg-sky-500/[0.03] transition-all duration-300 group">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-indigo-500 shadow-md shadow-sky-500/10 group-hover:shadow-sky-500/20 transition-shadow">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-slate-200 leading-relaxed font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-sky-500/10 to-indigo-500/10 rounded-3xl blur-xl" />
                <div className="relative rounded-3xl overflow-hidden border border-slate-700/50 bg-slate-900">
                  <img
                    src="/images/service.jpg"
                    alt="Our approach"
                    className="w-full h-[460px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-sm text-slate-300 font-semibold mb-3">Our Tech Stack</p>
                    <div className="flex flex-wrap gap-2.5">
                      {['React', 'Node.js', 'AWS', 'Flutter', 'DevOps', 'Python', 'MongoDB'].map((tag) => (
                        <span key={tag} className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-white/15 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Development Process ──────────────────────────────── */}
      <section className="relative bg-slate-950 py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo-500/[0.03] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky-500/[0.03] rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <FadeUp>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/5 px-5 py-2 mb-6">
                <Code className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-medium text-indigo-300 tracking-wide">How We Work</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white">Our Development Process</h2>
              <p className="mt-4 text-slate-400 max-w-xl mx-auto">A proven, transparent workflow that turns ideas into production-ready solutions.</p>
            </div>
          </FadeUp>

          {/* Horizontal flow on desktop, vertical on mobile */}
          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-px bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {processSteps.map((step, i) => (
                <FadeUp key={step.title} delay={i * 0.08}>
                  <div className="group relative">
                    {/* Step number + dot connector */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <step.icon className="w-7 h-7 text-white" />
                        {/* Pulse dot for desktop connector */}
                        <div className={`hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-br ${step.color}`} />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Step {i + 1}</span>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      </div>
                    </div>
                    {/* Card */}
                    <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 p-6 transition-all duration-300 hover:border-slate-600/50 hover:bg-slate-800/70">
                      <p className="text-sm text-slate-400 leading-relaxed mb-4">{step.description}</p>
                      <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-700/50 px-3 py-1.5">
                        <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${step.color}`} />
                        <span className="text-xs text-slate-400 font-medium">{step.duration}</span>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative bg-slate-900/50 py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-500/[0.04] rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 text-center">
          <FadeUp>
            <div className="mx-auto max-w-2xl">
              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                Ready to Build{' '}
                <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  Something Great?
                </span>
              </h2>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                Let's talk about how Esland IT Solutions can help you achieve your digital transformation goals.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:shadow-sky-500/30 hover:scale-[1.02]">
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/careers" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20">
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
