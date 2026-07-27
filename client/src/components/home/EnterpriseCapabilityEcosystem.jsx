import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, Smartphone, Code, Network, Cloud, Cpu, ShieldCheck,
  Palette, Search, TrendingUp, ShoppingBag, Layers, Database,
  CheckCircle2, ArrowRight, Sparkles, Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoIcon from '../brand/LogoIcon';
import { useAccessibleAnimations } from '../../lib/animations';

const ecosystemServices = [
  {
    id: 'web',
    title: 'Web Development',
    category: 'Digital Core',
    icon: Globe,
    techStack: ['React 18', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
    metrics: { speed: '100/100 Core Web Vitals', uptime: '99.99%', latency: 'Sub-80ms Edge' },
    outcomes: ['High-converting enterprise web portals', 'Sub-second page hydration & SSR', 'SEO-engineered architecture'],
    desc: 'Scalable, high-performance web applications built on modern React ecosystems and edge delivery networks.',
    x: 20, y: 15,
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    category: 'Mobile Engine',
    icon: Smartphone,
    techStack: ['Flutter', 'React Native', 'Swift (iOS)', 'Kotlin (Android)'],
    metrics: { rating: '4.9★ App Store', sync: 'Real-Time Sync', crashFree: '99.9%' },
    outcomes: ['Native performance across iOS & Android', 'Offline-first encrypted data sync', 'Seamless biometric authentication'],
    desc: 'Cross-platform and native mobile applications crafted for enterprise workflow efficiency and mobile commerce.',
    x: 50, y: 12,
  },
  {
    id: 'software',
    title: 'Software Development',
    category: 'Engineering',
    icon: Code,
    techStack: ['Node.js', 'Python', 'Go', 'Microservices', 'GraphQL'],
    metrics: { throughput: '25k req/sec', sla: '99.99% Availability', concurrency: 'High Scale' },
    outcomes: ['Decoupled microservice architecture', 'High-throughput GraphQL & REST gateways', 'Zero-downtime database migrations'],
    desc: 'Custom enterprise software solutions tailored around complex business workflows and high-concurrency systems.',
    x: 80, y: 15,
  },
  {
    id: 'networking',
    title: 'Networking Solutions',
    category: 'Infrastructure',
    icon: Network,
    techStack: ['SD-WAN', 'Cisco Enterprise', 'BGP Routing', 'Edge Mesh'],
    metrics: { packetLoss: '0.00%', latency: '<10ms Ping', redundancy: 'Dual Multi-Path' },
    outcomes: ['Software-defined WAN enterprise networks', 'Zero single-point-of-failure routing', '24/7 SIEM network monitoring'],
    desc: 'Robust enterprise network topology providing secure site-to-site connectivity and low-latency packet routing.',
    x: 88, y: 48,
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    category: 'Cloud Mesh',
    icon: Cloud,
    techStack: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Terraform IaC', 'Docker'],
    metrics: { uptime: '99.99% SLA', autoScale: '100% Elastic', failover: 'Auto-Region' },
    outcomes: ['Multi-cloud hybrid topology deployment', 'Infrastructure as Code (Terraform) automation', 'Global CDN & edge load balancing'],
    desc: 'Enterprise multi-cloud architecture engineered for elastic scaling, disaster recovery, and automated deployments.',
    x: 80, y: 82,
  },
  {
    id: 'ai',
    title: 'AI Solutions',
    category: 'AI & Inference',
    icon: Cpu,
    techStack: ['LLM Inference', 'Vector Indexing', 'Python', 'PyTorch', 'OpenAI'],
    metrics: { inference: '2.4k req/sec', precision: '99.4%', privacy: 'Air-Gapped' },
    outcomes: ['Custom LLM inference pipeline integration', 'Vector database semantic search indexing', 'Autonomous workflow decision engines'],
    desc: 'Enterprise AI pipelines integrating LLM model hosting, vector embeddings, and automated predictive analytics.',
    x: 50, y: 88,
  },
  {
    id: 'devops',
    title: 'DevOps & Automation',
    category: 'CI/CD Pipeline',
    icon: Layers,
    techStack: ['Kubernetes', 'Helm', 'GitHub Actions', 'GitLab CI', 'Prometheus'],
    metrics: { deploySpeed: '5x Acceleration', strategy: 'Blue-Green', drift: 'Zero Drift' },
    outcomes: ['Zero-downtime blue-green release strategies', 'Containerized Kubernetes cluster deployment', 'Automated static code & security scans'],
    desc: 'Automated CI/CD deployment pipelines accelerating software releases while maintaining strict quality gates.',
    x: 20, y: 82,
  },
  {
    id: 'security',
    title: 'Cyber Security',
    category: 'Zero-Trust',
    icon: ShieldCheck,
    techStack: ['ISO 27001', 'SOC 2 Type II', 'AES-256', 'SIEM Telemetry', 'IAM Access'],
    metrics: { compliance: 'SOC 2 & ISO', risk: 'Zero Breach Risk', scan: 'Real-Time' },
    outcomes: ['Continuous vulnerability threat scanning', 'Zero-trust network mesh architecture', 'Encrypted payload vault security'],
    desc: 'Defense-in-depth cybersecurity embedded into every engineering layer, software release, and cloud infrastructure.',
    x: 12, y: 48,
  },
  {
    id: 'data',
    title: 'Data Engineering',
    category: 'Data Platform',
    icon: Database,
    techStack: ['Kafka', 'Snowflake', 'BigQuery', 'Redpanda', 'Apache Spark'],
    metrics: { throughput: '45.2 GB/s', queryLag: '0ms Real-Time', integrity: '100% Audited' },
    outcomes: ['Real-time streaming event ingestion', 'Snowflake & BigQuery data warehousing', 'Columnar zero-latency caching'],
    desc: 'High-speed data pipelines converting raw enterprise event logs into real-time executive data analytics.',
    x: 32, y: 32,
  },
  {
    id: 'branding',
    title: 'Branding & Identity',
    category: 'Design System',
    icon: Palette,
    techStack: ['Figma Tokens', 'Enterprise UI/UX', 'Design Systems', 'Framer Motion'],
    metrics: { satisfaction: '98% Client CSAT', accessibility: 'WCAG AAA', speed: 'Design Scale' },
    outcomes: ['Enterprise design systems & token libraries', 'User-centric product interaction flows', 'High-contrast accessible digital brands'],
    desc: 'Modern enterprise visual identity systems, interactive UI design, and responsive design systems.',
    x: 68, y: 32,
  },
  {
    id: 'seo',
    title: 'SEO & Growth Marketing',
    category: 'Growth Engine',
    icon: Search,
    techStack: ['Technical SEO', 'Schema Markup', 'GA4 Analytics', 'Core Web Vitals'],
    metrics: { googleScore: '99+ Score', organicGrowth: '+150% Traffic', conversion: '+42% Lift' },
    outcomes: ['High-ranking organic search authority', 'Lightning-fast mobile & desktop rendering', 'Data-driven B2B lead capture funnels'],
    desc: 'Technical search optimization and growth marketing engineered for domain authority and customer acquisition.',
    x: 68, y: 68,
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Solutions',
    category: 'Global Commerce',
    icon: ShoppingBag,
    techStack: ['Shopify Plus', 'Headless Commerce', 'Stripe Payments', 'Redis Cache'],
    metrics: { uptime: '99.99%', checkout: 'Sub-1s Processing', concurrency: '100k Users' },
    outcomes: ['Headless high-volume checkout engines', 'Global multi-currency payment integration', 'Real-time inventory synchronization'],
    desc: 'High-scale headless e-commerce solutions built to handle peak traffic surges and global payment processing.',
    x: 32, y: 68,
  },
];

export default function EnterpriseCapabilityEcosystem() {
  const [activeService, setActiveService] = useState(ecosystemServices[0]);
  const [hoveredService, setHoveredService] = useState(null);
  const canvasRef = useRef(null);
  const { prefersReducedMotion } = useAccessibleAnimations();

  // Radial Connection Rays & Data Packet Engine
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

    const packets = Array.from({ length: 18 }, () => ({
      nodeIdx: Math.floor(Math.random() * ecosystemServices.length),
      progress: Math.random(),
      speed: Math.random() * 0.007 + 0.003,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width * 0.5;
      const centerY = canvas.height * 0.5;

      // 1. Draw Connecting Rays from Center Hub (50%, 50%) to Every Node
      ecosystemServices.forEach((service) => {
        const nodeX = (service.x * canvas.width) / 100;
        const nodeY = (service.y * canvas.height) / 100;

        const isSelected = activeService.id === service.id;
        const isHovered = hoveredService?.id === service.id;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(nodeX, nodeY);
        ctx.strokeStyle = isSelected
          ? 'rgba(56, 189, 248, 0.65)'
          : isHovered
          ? 'rgba(56, 189, 248, 0.45)'
          : 'rgba(255, 255, 255, 0.09)';
        ctx.lineWidth = isSelected ? 2.2 : 1;
        ctx.stroke();
      });

      // 2. Animate Data Packets along Rays
      if (!prefersReducedMotion) {
        packets.forEach((packet) => {
          packet.progress += packet.speed;
          if (packet.progress >= 1) packet.progress = 0;

          const service = ecosystemServices[packet.nodeIdx];
          const nodeX = (service.x * canvas.width) / 100;
          const nodeY = (service.y * canvas.height) / 100;

          const currentX = nodeX + (centerX - nodeX) * packet.progress;
          const currentY = nodeY + (centerY - nodeY) * packet.progress;

          ctx.beginPath();
          ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#38bdf8';
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeService, hoveredService, prefersReducedMotion]);

  return (
    <section id="services" className="py-28 px-6 relative bg-slate-950 overflow-hidden border-t border-white/10">
      {/* Volumetric Radial Ambient Glow */}
      <div className="pointer-events-none absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-sky-500/10 blur-[180px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[160px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-4">
            <Sparkles size={14} className="text-sky-400" /> Enterprise Capability Network
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Integrated Ecosystem of <br />
            <span className="animate-text-shimmer">
              12 Enterprise Technology Pillars
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mt-4 font-medium">
            Every core capability remains active and connected to the central Esland Platform. Click any node to inspect SLA specs.
          </p>
        </div>

        {/* Ecosystem Stage & Inspector Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Scalable 2-Ring Interactive Capability Network Map */}
          <div className="lg:col-span-7 relative h-[560px] sm:h-[640px] rounded-[2.5rem] border border-white/15 bg-slate-900/80 backdrop-blur-2xl p-4 overflow-hidden shadow-2xl flex items-center justify-center group">
            {/* Blueprint Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(56,189,248,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.4)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Connecting Mesh Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

            {/* Central Esland Platform Hub (Exact 50%, 50%) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center pointer-events-none">
              <div className="relative">
                <div className="absolute -inset-6 rounded-full bg-sky-400/20 blur-xl animate-pulse" />
                <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-slate-950 border-2 border-sky-400/60 shadow-[0_0_50px_rgba(56,189,248,0.4)] p-3">
                  <LogoIcon size={38} />
                </div>
              </div>
              <span className="mt-2.5 px-3 py-1 rounded-full bg-slate-950/95 border border-sky-400/30 text-[10px] font-black text-white uppercase tracking-widest shadow-xl">
                ESLAND PLATFORM
              </span>
            </div>

            {/* 12 Visible Orbiting Service Nodes (No Overlaps!) */}
            {ecosystemServices.map((service) => {
              const ServiceIcon = service.icon;
              const isSelected = activeService.id === service.id;
              const isHovered = hoveredService?.id === service.id;

              return (
                <div
                  key={service.id}
                  style={{ left: `${service.x}%`, top: `${service.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActiveService(service)}
                    onMouseEnter={() => setHoveredService(service)}
                    onMouseLeave={() => setHoveredService(null)}
                    className={`relative flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl border transition-all duration-300 backdrop-blur-xl shadow-xl focus:outline-none ${
                      isSelected
                        ? 'bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-600 border-sky-300 text-slate-950 scale-110 shadow-sky-500/50 font-black'
                        : isHovered
                        ? 'bg-slate-800/95 border-sky-400/60 text-white scale-105 shadow-sky-500/20'
                        : 'bg-slate-900/90 border-white/15 text-slate-300 hover:border-white/30'
                    }`}
                  >
                    <ServiceIcon size={14} className={isSelected ? 'text-slate-950' : 'text-sky-400'} />
                    <span className="text-[10px] sm:text-xs font-bold tracking-wide whitespace-nowrap">{service.title}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Panel: Live Service Telemetry Inspector */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="spotlight-card h-full rounded-[2.5rem] border border-sky-500/30 bg-slate-900/90 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl shadow-sky-500/10 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Accent Top Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-purple-500" />

                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold text-sky-300 uppercase tracking-widest">
                      {activeService.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-400/20 px-3 py-1 rounded-full">
                      <ShieldCheck size={14} /> Active Ecosystem Node
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-xl shadow-sky-500/30">
                      <activeService.icon size={26} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white leading-tight">
                        {activeService.title}
                      </h3>
                      <p className="text-xs text-sky-400 font-semibold mt-0.5">Enterprise Solution Pillar</p>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">
                    {activeService.desc}
                  </p>

                  {/* Technology Stack Badges */}
                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2.5">
                      Core Technology Stack
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeService.techStack.map((tech) => (
                        <span key={tech} className="rounded-xl bg-slate-950/80 border border-white/15 px-3 py-1.5 text-xs font-bold text-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Telemetry Metrics Bar */}
                  <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-2xl bg-slate-950/80 border border-white/10 mb-6 text-center">
                    {Object.entries(activeService.metrics).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">{k}</span>
                        <span className="text-xs sm:text-sm font-extrabold text-sky-300">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Key Business Outcomes */}
                  <div className="space-y-2 mb-8">
                    {activeService.outcomes.map((outcome) => (
                      <div key={outcome} className="flex items-center gap-2.5 text-xs text-slate-200 font-semibold p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-semibold">ISO 27001 & SOC 2 Audited</span>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-400 hover:text-white transition group"
                  >
                    Explore Service Architecture <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
