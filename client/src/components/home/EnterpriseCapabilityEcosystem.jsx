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
    x: 32, y: 64,
  },
  {
    id: 'seo',
    title: 'SEO & Marketing',
    category: 'Growth Engine',
    icon: TrendingUp,
    techStack: ['Google Search', 'Schema Markup', 'B2B Authority', 'Semrush Analytics'],
    metrics: { trafficIncrease: '+240%', keywordRank: 'Top 3 Focus', conversion: '+3.4% Avg' },
    outcomes: ['Data-driven organic search traffic', 'Local & international corporate positioning', 'High-intent B2B lead generation'],
    desc: 'Strategic B2B search engine optimization to establish brand authority and drive customer acquisition.',
    x: 68, y: 32,
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Platforms',
    category: 'Commerce Core',
    icon: ShoppingBag,
    techStack: ['Shopify Plus', 'Headless Commerce', 'Stripe', 'GraphQL APIs'],
    metrics: { scaleLimit: 'Unlimited', checkoutSpeed: '<1.2s', loadTime: 'WCAG AAA' },
    outcomes: ['API-first headless e-commerce architectures', 'Custom secure checkout flow integrations', 'Robust inventory sync logic'],
    desc: 'Enterprise-grade online transactional systems engineered for extreme user concurrency and high-speed checkout flows.',
    x: 68, y: 64,
  },
];

export default function EnterpriseCapabilityEcosystem() {
  const [activeService, setActiveService] = useState(ecosystemServices[0]);
  const [hoveredService, setHoveredService] = useState(null);
  const canvasRef = useRef(null);
  const { prefersReducedMotion } = useAccessibleAnimations();

  // Auto-switch tabs
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveService((prev) => {
        const currentIndex = ecosystemServices.findIndex((s) => s.id === prev.id);
        return ecosystemServices[(currentIndex + 1) % ecosystemServices.length];
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [activeService]);

  // Draw Ray & Connecting Mesh lines
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

    // Initial configuration for ray data packets
    const packets = [];
    ecosystemServices.forEach((_, idx) => {
      // 2 data packets per ray with staggered progress
      packets.push({ nodeIdx: idx, progress: 0, speed: Math.random() * 0.003 + 0.002 });
      packets.push({ nodeIdx: idx, progress: 0.5, speed: Math.random() * 0.003 + 0.002 });
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 1. Draw Connecting Rays
      ecosystemServices.forEach((service) => {
        const nodeX = (service.x * canvas.width) / 100;
        const nodeY = (service.y * canvas.height) / 100;

        const isSelected = activeService.id === service.id;
        const isHovered = hoveredService?.id === service.id;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(nodeX, nodeY);
        ctx.strokeStyle = isSelected
          ? 'rgba(0, 48, 135, 0.45)'
          : isHovered
          ? 'rgba(0, 48, 135, 0.28)'
          : 'rgba(0, 48, 135, 0.08)';
        ctx.lineWidth = isSelected ? 2 : 1;
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
          ctx.arc(currentX, currentY, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = '#0057D8';
          ctx.fill();
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
    <section id="ecosystem" className="py-28 px-6 relative bg-white overflow-hidden border-t border-[var(--color-border)]">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blue-50/40 blur-[180px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-badge mb-4 inline-flex">
            <Sparkles size={14} /> Enterprise Capability Network
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900 tracking-tight leading-tight">
            Integrated Ecosystem of <br />
            <span className="text-shimmer">
              12 Enterprise Technology Pillars
            </span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-4 font-medium">
            Every core capability remains active and connected to the central Esland Platform. Click any node to inspect SLA specs.
          </p>
        </div>

        {/* Ecosystem Stage & Inspector Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Scalable 2-Ring Interactive Capability Network Map */}
          <div className="lg:col-span-6 relative h-[400px] sm:h-[450px] rounded-lg border border-[#E4E9F0] bg-[#F8FAFC] p-2 overflow-hidden shadow-sm flex items-center justify-center group">
            {/* Blueprint Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,48,135,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(0,48,135,0.4)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

            {/* Connecting Mesh Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

            {/* Central Esland Platform Hub (Exact 50%, 50%) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center pointer-events-none">
              <div className="relative">
                <div className="absolute -inset-6 rounded-full bg-blue-100/40 blur-xl animate-pulse" />
                <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-white border-2 border-[#003087] shadow-lg p-3">
                  <LogoIcon size={38} />
                </div>
              </div>
              <span className="mt-2.5 px-3 py-1 rounded-full bg-white border border-[#C5D0E0] text-[10px] font-black text-[#003087] uppercase tracking-widest shadow-md">
                ESLAND PLATFORM
              </span>
            </div>

            {/* 12 Visible Orbiting Service Nodes */}
            {ecosystemServices.map((service) => {
              const ServiceIcon = service.icon;
              const isSelected = activeService.id === service.id;
              const isHovered = hoveredService?.id === service.id;

              return (
                <motion.div
                  key={service.id}
                  style={{ left: `${service.x}%`, top: `${service.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  animate={!prefersReducedMotion ? { y: [0, -5, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 3 + (service.x % 3), ease: "easeInOut" }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveService(service)}
                    onMouseEnter={() => setHoveredService(service)}
                    onMouseLeave={() => setHoveredService(null)}
                    className={`relative flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg border transition-all duration-200 shadow-sm focus:outline-none ${
                      isSelected
                        ? 'bg-[#003087] border-[#003087] text-white font-bold shadow-md'
                        : isHovered
                        ? 'bg-white border-[#003087] text-[#003087] shadow-sm'
                        : 'bg-white border-[#E4E9F0] text-gray-700 hover:border-[#003087]'
                    }`}
                  >
                    <ServiceIcon size={12} className={isSelected ? 'text-white' : 'text-[#003087]'} />
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-wide whitespace-nowrap">{service.title}</span>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Right Panel: Live Service Telemetry Inspector */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 120, damping: 16, mass: 0.9 }}
                className="h-full rounded-lg border border-[#E4E9F0] bg-white p-4 sm:p-5 shadow-sm flex flex-col justify-between relative overflow-hidden"
              >
                {/* Accent Top Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#003087] via-[#0057D8] to-green-500" />

                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#003087] uppercase tracking-widest">
                      {activeService.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 border border-green-100 px-3 py-1 rounded-full">
                      <ShieldCheck size={14} /> Active Ecosystem Node
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#003087] to-[#0057D8] text-white shadow-sm">
                      <activeService.icon size={26} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-extrabold text-gray-900 leading-tight">
                        {activeService.title}
                      </h3>
                      <p className="text-xs text-[#003087] font-semibold mt-0.5">Enterprise Solution Pillar</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                    {activeService.desc}
                  </p>

                  {/* Technology Stack Badges */}
                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2.5">
                      Core Technology Stack
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeService.techStack.map((tech) => (
                        <span key={tech} className="rounded-lg bg-gray-50 border border-[#E4E9F0] px-3 py-1.5 text-xs font-bold text-gray-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Telemetry Metrics Bar */}
                  <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-lg bg-gray-50 border border-[#E4E9F0] mb-6 text-center">
                    {Object.entries(activeService.metrics).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block mb-0.5">{k}</span>
                        <span className="text-xs sm:text-sm font-extrabold text-[#003087]">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Key Business Outcomes */}
                  <div className="space-y-2 mb-8">
                    {activeService.outcomes.map((outcome) => (
                      <div key={outcome} className="flex items-center gap-2.5 text-xs text-gray-700 font-semibold p-2.5 rounded-lg bg-green-50/20 border border-green-50/40">
                        <CheckCircle2 size={14} className="text-green-600 shrink-0" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-semibold">ISO 27001 & SOC 2 Audited</span>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#003087] hover:text-[#002068] transition group"
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
