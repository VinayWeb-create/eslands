import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, Cloud, ShieldCheck, Cpu, Database, RotateCcw, Zap,
  CheckCircle2, ArrowUpRight, Activity, Globe, Lock, BarChart3, Terminal
} from 'lucide-react';
import { useAccessibleAnimations } from '../../lib/animations';

const standardCapabilities = [
  {
    id: 'arch',
    title: 'Enterprise Architecture',
    tagline: 'Resilient Microservices & Event-Driven Topology',
    category: 'Architecture',
    icon: Layers,
    color: '#0ea5e9',
    accent: 'from-sky-500 to-blue-600',
    ambientGlow: 'rgba(14, 165, 233, 0.15)',
    metrics: { uptime: '99.99%', speed: '10x Faster', pattern: 'Serverless Mesh', health: 99.9 },
    features: ['Event-Driven Microservices Topology', 'Sub-100ms Multi-Region Routing', 'Decoupled API Middleware Gateways', 'Fault-Tolerant System Failover'],
    desc: 'Future-proof enterprise software architecture designed for unlimited scalability, high concurrency, and lightning-fast global responsiveness.',
  },
  {
    id: 'cloud',
    title: 'Cloud Engineering',
    tagline: 'AWS & Azure Multi-Region Cloud Infrastructure',
    category: 'Infrastructure',
    icon: Cloud,
    color: '#38bdf8',
    colorClass: 'from-cyan-500 to-blue-600',
    accent: 'from-cyan-400 to-sky-600',
    ambientGlow: 'rgba(56, 189, 248, 0.15)',
    metrics: { uptime: '99.99%', latency: '12ms CDN', autoScale: '100% Elastic', health: 99.8 },
    features: ['Multi-Cloud AWS & Azure Integration', 'Automated Terraform Infrastructure as Code', 'Dynamic Load Balancing & Edge Caching', 'Disaster Recovery & Zero-Downtime Backup'],
    desc: 'Elastic cloud infrastructure built on IaC primitives, guaranteeing zero single points of failure and enterprise-grade SLA compliance.',
  },
  {
    id: 'security',
    title: 'Zero-Trust Cybersecurity',
    tagline: 'ISO 27001 & SOC 2 Type II Certified Protection',
    category: 'Cybersecurity',
    icon: ShieldCheck,
    color: '#10b981',
    accent: 'from-emerald-400 to-teal-600',
    ambientGlow: 'rgba(16, 185, 129, 0.15)',
    metrics: { compliance: 'SOC 2 & ISO', encryption: 'AES-256 / RSA', threats: '0 Breach Risk', health: 100 },
    features: ['Continuous SIEM Real-Time Telemetry', 'Encrypted Payload Vaults & Secret Management', 'Automated Penetration & Vulnerability Audits', 'Role-Based Access Governance (IAM)'],
    desc: 'Defense-in-depth cybersecurity embedded directly into every engineering layer, software deployment, and network data pipeline.',
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    tagline: 'High-Throughput Model Inference & Vector Search',
    category: 'AI & Machine Learning',
    icon: Zap,
    color: '#f43f5e',
    accent: 'from-rose-500 to-purple-600',
    ambientGlow: 'rgba(244, 63, 94, 0.15)',
    metrics: { inference: '2.4k req/sec', vectorDb: 'Active Index', privacy: 'Air-Gapped', health: 99.4 },
    features: ['High-Performance Vector Embeddings', 'LLM Model Fine-Tuning & Quantization', 'Enterprise Private Data Vault Shielding', 'Real-Time Semantic Search Pipelines'],
    desc: 'Bespoke AI inference engines empowering enterprise platforms with autonomous decision-making and secure natural language intelligence.',
  },
  {
    id: 'devops',
    title: 'DevOps & Automation',
    tagline: 'CI/CD Pipelines & Infrastructure as Code',
    category: 'DevOps Engine',
    icon: Cpu,
    color: '#a855f7',
    accent: 'from-purple-500 to-indigo-600',
    ambientGlow: 'rgba(168, 85, 247, 0.15)',
    metrics: { deployTime: '5x Acceleration', strategy: 'Blue-Green', drift: 'Zero Drift', health: 99.2 },
    features: ['Automated GitHub Actions & GitLab CI', 'Kubernetes Helm Pod Orchestration', 'Zero-Downtime Blue-Green Rollouts', 'Drift Detection & Immutable Configs'],
    desc: 'Continuous delivery automation reducing release cycles from weeks to minutes while maintaining rigorous automated quality gates.',
  },
  {
    id: 'data',
    title: 'Data Platform',
    tagline: 'Real-Time Streaming & Warehouse Analytics',
    category: 'Data Platform',
    icon: Database,
    color: '#06b6d4',
    accent: 'from-cyan-500 to-teal-600',
    ambientGlow: 'rgba(6, 182, 212, 0.15)',
    metrics: { throughput: '45.2 GB/s', queryLag: '0ms Real-Time', integrity: '100% Audited', health: 99.9 },
    features: ['Real-Time Event Stream Processing', 'Snowflake & BigQuery Data Warehousing', 'Zero-Latency Columnar Index Caching', 'Automated ETL Pipeline Monitoring'],
    desc: 'High-throughput data engineering pipelines transforming raw enterprise data into instant executive intelligence and predictive metrics.',
  },
  {
    id: 'transformation',
    title: 'Digital Transformation',
    tagline: 'Zero-Downtime Legacy System Modernization',
    category: 'Modernization',
    icon: RotateCcw,
    color: '#3b82f6',
    accent: 'from-blue-500 to-indigo-600',
    ambientGlow: 'rgba(59, 130, 246, 0.15)',
    metrics: { efficiency: '+40% ROI', legacyRisk: 'Eliminated', multiplier: '3.8x Speed', health: 99.7 },
    features: ['Legacy Monolith Microservice Extraction', 'Zero-Downtime Database Migration', 'Core Web Vitals & Speed Optimization', 'Complete UI/UX Digital Modernization'],
    desc: 'Seamless system modernization upgrading legacy enterprise monoliths into cloud-native digital platforms without operational disruption.',
  },
];

export default function EnterpriseStandard() {
  const [activeCap, setActiveCap] = useState(standardCapabilities[0]);
  const canvasRef = useRef(null);
  const { prefersReducedMotion } = useAccessibleAnimations();

  // Auto-switch tabs
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCap((prev) => {
        const currentIndex = standardCapabilities.findIndex((c) => c.id === prev.id);
        return standardCapabilities[(currentIndex + 1) % standardCapabilities.length];
      });
    }, 7000);
    return () => clearInterval(timer);
  }, [activeCap]);

  // Dynamic Volumetric Canvas Ambient Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.5),
      vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.5),
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = activeCap.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = activeCap.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeCap, prefersReducedMotion]);

  return (
    <section className="py-0 px-6 relative bg-[var(--color-bg-surface)] overflow-hidden border-t border-[var(--color-border)]">
      {/* Dynamic Volumetric Background Lighting Shift */}
      <motion.div
        animate={{ background: activeCap.ambientGlow }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full blur-[180px]"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-badge mb-4 inline-flex">
            <Activity size={14} className="animate-pulse" /> Flagship Product Experience
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            The Esland Enterprise{' '}<br />
            <span className="text-shimmer">Digital Engineering Standard</span>
          </h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed mt-4 font-medium">
            Explore our live capability matrix powering Fortune-caliber cloud systems and digital infrastructure.
          </p>
        </div>

        {/* Capability Selector Rail */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
          {standardCapabilities.map((cap) => {
            const Icon = cap.icon;
            const isSelected = activeCap.id === cap.id;
            return (
              <button
                key={cap.id}
                onClick={() => setActiveCap(cap)}
                className={`relative flex items-center gap-2.5 px-4 py-3 rounded-2xl border transition-all duration-300 text-xs font-bold tracking-wide ${
                  isSelected
                    ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-500/20 scale-105'
                    : 'bg-[var(--color-bg-card)] border-[var(--color-border)] text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:border-primary-200 dark:hover:border-white/25'
                }`}
              >
                <div className={`flex h-6 w-6 items-center justify-center rounded-lg ${isSelected ? 'bg-white/20 text-white' : 'bg-primary-50 dark:bg-white/5 text-primary-600 dark:text-primary-400'}`}>
                  <Icon size={14} />
                </div>
                <span>{cap.title}</span>
                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-white/80 animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* Living Enterprise System Stage */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: System Interactive Canvas & Architecture Orbit */}
          <div className="lg:col-span-6 relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 sm:p-6 overflow-hidden shadow-card flex flex-col justify-between group min-h-[300px]">
            {/* Blueprint grid */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[radial-gradient(rgba(37,99,235,0.8)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Particle Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

            {/* System Pillar Header inside Canvas Stage */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
                SYSTEM NODE: {activeCap.category}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-success-600 dark:text-emerald-400 bg-success-50 dark:bg-emerald-500/10 border border-success-200 dark:border-emerald-400/20 px-3 py-1 rounded-full">
                <ShieldCheck size={13} /> SLA Health: {activeCap.metrics.health}%
              </span>
            </div>

            {/* Living Capability Visualization Core */}
            <div className="relative z-10 my-auto py-8 text-center">
              <motion.div
                key={activeCap.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="inline-flex flex-col items-center justify-center"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-3xl blur-2xl opacity-60 animate-pulse" style={{ background: activeCap.color }} />
                  <div className={`relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${activeCap.accent} text-white shadow-2xl shadow-sky-500/30`}>
                    <activeCap.icon size={44} />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-gray-900 dark:text-white mb-2">
                  {activeCap.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-primary-600 dark:text-primary-400 max-w-md mx-auto">
                  {activeCap.tagline}
                </p>
              </motion.div>
            </div>

            {/* Telemetry Footer Status */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-bold text-gray-700 dark:text-slate-300">
                <Terminal size={14} className="text-primary-600 dark:text-primary-400" /> Operational State: Active
              </span>
              <span className="font-mono text-success-600 dark:text-emerald-400 font-bold">0 Vulnerabilities</span>
            </div>
          </div>

          {/* Right Side: Enterprise System Dashboard Inspector */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCap.id}
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 120, damping: 16, mass: 0.9 }}
                className="spotlight-card h-full rounded-3xl border border-primary-100 dark:border-primary-500/30 bg-[var(--color-bg-card)] p-4 sm:p-6 shadow-card flex flex-col justify-between relative overflow-hidden"
              >
                {/* Accent Sweep Top Border */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-500 via-accent-400 to-primary-700" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                      {activeCap.category} Architecture
                    </span>
                    <span className="text-xs font-bold text-gray-400 dark:text-slate-400">
                      ISO 27001 Audited
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-3xl font-display font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                    {activeCap.title}
                  </h3>

                  <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8 font-medium">
                    {activeCap.desc}
                  </p>

                  {/* Telemetry Metrics Bar */}
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] mb-6">
                    {Object.entries(activeCap.metrics).filter(([key]) => key !== 'health').map(([key, val]) => (
                      <div key={key} className="text-center">
                        <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-slate-400 tracking-wider block mb-1">
                          {key}
                        </span>
                        <span className="text-sm sm:text-base font-display font-extrabold text-gray-900 dark:text-white">{val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Operational Health Bar */}
                  <div className="mb-6 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-gray-400 dark:text-slate-400 uppercase tracking-wider">System Availability Score</span>
                      <span className="text-success-600 dark:text-emerald-400">{activeCap.metrics.health}% Operational</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-slate-950 overflow-hidden border border-[var(--color-border)]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeCap.metrics.health}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-primary-500 via-accent-400 to-success-500 shadow-[0_0_8px_rgba(37,99,235,0.5)]"
                      />
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="grid sm:grid-cols-2 gap-2.5 mb-8">
                    {activeCap.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-xs text-gray-600 dark:text-slate-200 font-semibold">
                        <CheckCircle2 size={14} className="text-success-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <span className="text-xs text-gray-400 dark:text-slate-400 font-semibold">24/7 SLA Guaranteed</span>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-white transition group"
                  >
                    Inspect Architecture Spec <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
