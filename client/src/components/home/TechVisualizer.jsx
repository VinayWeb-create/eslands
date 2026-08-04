import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cloud, ShieldCheck, Cpu, Database, Server, Zap, Globe,
  Activity, Layers, Lock, ArrowUpRight, CheckCircle2, BarChart3
} from 'lucide-react';
import { useAccessibleAnimations } from '../../lib/animations';

const enterpriseNodes = [
  {
    id: 'infra',
    label: 'Infrastructure',
    icon: Cloud,
    tag: 'Cloud Core',
    headline: 'Multi-Region Cloud Topology',
    desc: 'AWS & Azure hybrid architecture with automated cross-region replication and 99.99% availability SLAs.',
    x: 18, y: 35,
    metrics: { uptime: '99.99%', latency: '12ms', throughput: '45.2 GB/s', health: 99.8 },
    features: ['AWS / Azure Hybrid Topology', 'Automated Cross-Region Failover', 'Terraform IaC Automation', 'Edge Router Orchestration'],
    color: '#0ea5e9',
    accent: 'from-sky-500 to-blue-600',
  },
  {
    id: 'engineering',
    label: 'Engineering',
    icon: Cpu,
    tag: 'Software Craft',
    headline: 'Bespoke Microservices Architecture',
    desc: 'Scalable distributed software systems built using React, Node.js, Python, and containerized Docker workloads.',
    x: 48, y: 55,
    metrics: { uptime: '99.98%', latency: '18ms', throughput: '12.8k req/s', health: 99.5 },
    features: ['Microservices & Event Mesh', 'GraphQL & REST Gateways', 'Docker & Kubernetes Pods', 'Sub-100ms API Execution'],
    color: '#38bdf8',
    accent: 'from-cyan-400 to-sky-600',
  },
  {
    id: 'security',
    label: 'Security',
    icon: ShieldCheck,
    tag: 'Zero-Trust',
    headline: 'Zero-Trust Cybersecurity Mesh',
    desc: 'Continuous real-time threat intelligence, automated vulnerability patching, and strict SOC 2 audit readiness.',
    x: 75, y: 25,
    metrics: { uptime: '100.0%', latency: '8ms', throughput: 'Protected', health: 100 },
    features: ['Continuous SIEM Monitoring', 'Encrypted Payload Vaults', 'Penetration Scan Automation', 'Strict IAM Access Control'],
    color: '#34d399',
    accent: 'from-emerald-400 to-teal-600',
  },
  {
    id: 'cloud',
    label: 'Cloud',
    icon: Globe,
    tag: 'Multi-Cloud',
    headline: 'Elastic Multi-Cloud Operations',
    desc: 'Dynamic auto-scaling infrastructure across AWS, Azure, and Google Cloud with zero vendor lock-in.',
    x: 35, y: 18,
    metrics: { uptime: '99.99%', latency: '14ms', throughput: '80.0 GB/s', health: 99.7 },
    features: ['Multi-Cloud Traffic Routing', 'Serverless Compute Clusters', 'Cost Optimization Engine', 'Global Edge CDN Delivery'],
    color: '#a855f7',
    accent: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'devops',
    label: 'DevOps',
    icon: Layers,
    tag: 'Automation',
    headline: 'CI/CD & IaC Deployment Pipelines',
    desc: 'Automated software deployment pipelines featuring static code analysis, automated testing, and blue-green releases.',
    x: 65, y: 42,
    metrics: { uptime: '99.95%', latency: '22ms', throughput: '150 deploys/wk', health: 98.9 },
    features: ['GitHub Actions & GitLab CI', 'Kubernetes Helm Deployment', 'Blue-Green Zero-Downtime Rollout', 'Infrastructure Drift Detection'],
    color: '#60a5fa',
    accent: 'from-blue-400 to-indigo-600',
  },
  {
    id: 'ai',
    label: 'AI Systems',
    icon: Zap,
    tag: 'AI & Inference',
    headline: 'High-Throughput Model Inference Engine',
    desc: 'Enterprise AI pipelines integrating LLM model hosting, vector embeddings, and real-time semantic search.',
    x: 82, y: 58,
    metrics: { uptime: '99.90%', latency: '45ms', throughput: '2.4k infer/s', health: 99.1 },
    features: ['Vector Database Indexing', 'GPU Inference Cluster', 'Custom Model Fine-Tuning', 'Private Data Vault Shield'],
    color: '#f43f5e',
    accent: 'from-rose-500 to-purple-600',
  },
  {
    id: 'data',
    label: 'Data Platform',
    icon: Database,
    tag: 'Analytics',
    headline: 'High-Speed Streaming Data Pipeline',
    desc: 'Real-time ETL data pipelines, high-speed SQL/NoSQL indexing, and executive data warehouse analytics.',
    x: 22, y: 75,
    metrics: { uptime: '99.99%', latency: '10ms', throughput: '1.2M msg/sec', health: 99.9 },
    features: ['Kafka & Redpanda Streaming', 'Snowflake & BigQuery Data Lakes', 'Zero-Latency Query Caching', 'Automated ETL Pipeline Audits'],
    color: '#06b6d4',
    accent: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: Server,
    tag: 'Managed Ops',
    headline: '24/7 SIEM Telemetry & Managed Ops',
    desc: 'Proactive operations control center monitoring cluster health, network load, and incident response SLAs.',
    x: 78, y: 80,
    metrics: { uptime: '99.99%', latency: '15ms', throughput: '24/7 Active', health: 99.9 },
    features: ['24/7 NOC & SOC Response', 'PagerDuty Incident Escalation', 'Automated System Healing', 'Proactive Log Aggregation'],
    color: '#38bdf8',
    accent: 'from-sky-400 to-indigo-500',
  },
  {
    id: 'api',
    label: 'API Mesh',
    icon: Lock,
    tag: 'API Gateway',
    headline: 'Enterprise API Gateway & Rate Mesh',
    desc: 'High-concurrency API gateway managing authentication, rate limiting, and request routing across microservices.',
    x: 52, y: 82,
    metrics: { uptime: '99.99%', latency: '9ms', throughput: '25k req/s', health: 99.8 },
    features: ['JWT & OAuth2 Gateways', 'Rate Limiting & DDoS Shield', 'GraphQL Mesh Federation', 'OpenAPI Spec Validation'],
    color: '#10b981',
    accent: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    tag: 'Telemetry',
    headline: 'Executive Dashboard & Telemetry',
    desc: 'Real-time infrastructure visualization providing executives with instant clarity on performance and SLA metrics.',
    x: 32, y: 50,
    metrics: { uptime: '100.0%', latency: '5ms', throughput: 'Real-Time', health: 100 },
    features: ['Grafana & Datadog Metrics', 'Custom Executive Reporting', 'SLA Breach Prediction', 'Real-Time Cost Auditing'],
    color: '#a855f7',
    accent: 'from-purple-500 to-pink-600',
  },
];

export default function TechVisualizer() {
  const canvasRef = useRef(null);
  const [activeNode, setActiveNode] = useState(enterpriseNodes[0]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const { prefersReducedMotion } = useAccessibleAnimations();

  // Auto-switch tabs
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNode((prev) => {
        const currentIndex = enterpriseNodes.findIndex((n) => n.id === prev.id);
        return enterpriseNodes[(currentIndex + 1) % enterpriseNodes.length];
      });
    }, 6500);
    return () => clearInterval(timer);
  }, [activeNode]);

  // Canvas Network Mesh Simulation with Glowing Packets
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

    // Floating Background Ambient Particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.4),
      vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.4),
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    // Data Packets Traveling Between Connected Nodes
    const packets = Array.from({ length: 14 }, () => {
      const startIdx = Math.floor(Math.random() * enterpriseNodes.length);
      let endIdx = Math.floor(Math.random() * enterpriseNodes.length);
      while (endIdx === startIdx) endIdx = Math.floor(Math.random() * enterpriseNodes.length);
      return {
        from: enterpriseNodes[startIdx],
        to: enterpriseNodes[endIdx],
        progress: Math.random(),
        speed: Math.random() * 0.005 + 0.003,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Mesh Connection Lines Between Nodes
      enterpriseNodes.forEach((node, i) => {
        enterpriseNodes.forEach((otherNode, j) => {
          if (i >= j) return;
          const dx = (node.x - otherNode.x) * (canvas.width / 100);
          const dy = (node.y - otherNode.y) * (canvas.height / 100);
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < canvas.width * 0.45) {
            const isConnectedToActive = activeNode.id === node.id || activeNode.id === otherNode.id;
            ctx.beginPath();
            ctx.moveTo((node.x * canvas.width) / 100, (node.y * canvas.height) / 100);
            ctx.lineTo((otherNode.x * canvas.width) / 100, (otherNode.y * canvas.height) / 100);
            const isDark = document.documentElement.classList.contains('dark');
            ctx.strokeStyle = isConnectedToActive
              ? (isDark ? 'rgba(56, 189, 248, 0.45)' : 'rgba(37, 99, 235, 0.35)')
              : (isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(37, 99, 235, 0.10)');
            ctx.lineWidth = isConnectedToActive ? 1.8 : 1;
            if (isConnectedToActive) {
              ctx.setLineDash([5, 5]);
            } else {
              ctx.setLineDash([]);
            }
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      });

      // 2. Animate Data Packets Traveling Along Lines
      if (!prefersReducedMotion) {
        packets.forEach((packet) => {
          packet.progress += packet.speed;
          if (packet.progress >= 1) {
            packet.progress = 0;
            packet.from = enterpriseNodes[Math.floor(Math.random() * enterpriseNodes.length)];
            packet.to = enterpriseNodes[Math.floor(Math.random() * enterpriseNodes.length)];
          }

          const startX = (packet.from.x * canvas.width) / 100;
          const startY = (packet.from.y * canvas.height) / 100;
          const endX = (packet.to.x * canvas.width) / 100;
          const endY = (packet.to.y * canvas.height) / 100;

          const currentX = startX + (endX - startX) * packet.progress;
          const currentY = startY + (endY - startY) * packet.progress;

          const isDarkP = document.documentElement.classList.contains('dark');
          ctx.beginPath();
          ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
          ctx.fillStyle = isDarkP ? '#38bdf8' : '#2563eb';
          ctx.shadowBlur = 10;
          ctx.shadowColor = isDarkP ? '#38bdf8' : '#2563eb';
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      // 3. Draw Ambient Background Particles
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }

        const isDarkBg = document.documentElement.classList.contains('dark');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDarkBg ? `rgba(56,189,248,${p.alpha})` : `rgba(37,99,235,${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeNode, prefersReducedMotion]);

  return (
    <section className="py-0 px-6 relative bg-[var(--color-bg)] overflow-hidden border-t border-[var(--color-border)]">
      {/* Ambient Lighting Orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-primary-500/5 blur-[170px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[450px] w-[450px] rounded-full bg-accent-500/5 blur-[150px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-badge mb-4 inline-flex">
            <Activity size={14} className="animate-pulse" /> Live Enterprise Architecture Engine
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            Interactive Architecture &amp;{' '}<br />
            <span className="text-shimmer">Digital Ecosystem Nodes</span>
          </h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed mt-4 font-medium">
            Click on any capability node to inspect how Esland architects, secures, and scales enterprise workloads.
          </p>
        </div>

        {/* Live Architecture Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Interactive Network Canvas */}
          <div className="lg:col-span-7 relative h-[400px] sm:h-[460px] rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 overflow-hidden shadow-card group">
            {/* Blueprint grid */}
            <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] bg-[radial-gradient(rgba(37,99,235,0.6)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* Canvas Mesh */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

            {/* 10 Interactive Capability Nodes */}
            {enterpriseNodes.map((node) => {
              const NodeIcon = node.icon;
              const isSelected = activeNode.id === node.id;
              const isHovered = hoveredNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  {/* Active Radial Glow */}
                  {isSelected && (
                    <div className="absolute inset-0 -m-4 rounded-full bg-sky-400/30 blur-xl animate-pulse pointer-events-none" />
                  )}

                  <button
                    onClick={() => setActiveNode(node)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`relative flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border transition-all duration-300 backdrop-blur-xl shadow-lg focus:outline-none ${
                      isSelected
                        ? 'bg-gradient-to-r from-primary-500 to-primary-700 border-primary-300 dark:border-primary-400 text-white scale-110 shadow-primary-500/30 font-extrabold'
                        : isHovered
                        ? 'bg-[var(--color-bg-surface)] border-primary-200 dark:border-primary-400/60 text-primary-700 dark:text-white scale-105'
                        : 'bg-[var(--color-bg)] border-[var(--color-border)] text-[var(--color-text-main)] hover:border-primary-200 dark:hover:border-white/30'
                    }`}
                  >
                     <NodeIcon size={16} className={isSelected ? 'text-white' : 'text-primary-600 dark:text-primary-400'} />
                     <span className="text-xs font-bold tracking-wide">{node.label}</span>
                  </button>

                  {/* Tooltip on Hover */}
                  <AnimatePresence>
                    {isHovered && !isSelected && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 p-3 rounded-xl bg-white dark:bg-slate-950/95 border border-primary-100 dark:border-primary-400/40 text-[11px] shadow-lg pointer-events-none z-40 text-center backdrop-blur-xl"
                      >
                        <p className="font-bold text-primary-600 dark:text-primary-300">{node.headline}</p>
                        <p className="text-[10px] text-gray-400 dark:text-slate-400 mt-1">Click to inspect live SLA telemetry</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Panel: Live Enterprise Architecture Dashboard */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 120, damping: 16, mass: 0.9 }}
                className="spotlight-card h-full rounded-3xl border border-primary-100 dark:border-primary-500/30 bg-[var(--color-bg-card)] p-6 sm:p-8 shadow-card flex flex-col justify-between overflow-hidden relative"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-500 via-accent-400 to-primary-700" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/3 via-transparent to-transparent pointer-events-none" />

                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="section-badge">
                      {activeNode.tag}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-success-600 dark:text-emerald-400 bg-success-50 dark:bg-emerald-500/10 border border-success-200 dark:border-emerald-400/20 px-3 py-1 rounded-full">
                      <ShieldCheck size={14} /> Active Node
                    </span>
                  </div>

                  {/* Headline & Description */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${activeNode.accent} text-white shadow-xl shadow-sky-500/20`}>
                      <activeNode.icon size={26} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-xl font-display font-extrabold text-gray-900 dark:text-white leading-tight">
                        {activeNode.headline}
                      </h3>
                      <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold mt-0.5">{activeNode.label} Pillar</p>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed mb-8 font-medium">
                    {activeNode.desc}
                  </p>

                  {/* Animated Live Telemetry Metrics Bar */}
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] mb-6">
                    <div className="text-center">
                      <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-slate-400 tracking-wider block">Uptime SLA</span>
                      <span className="text-base sm:text-lg font-display font-extrabold text-gray-900 dark:text-white">{activeNode.metrics.uptime}</span>
                    </div>
                    <div className="text-center border-x border-[var(--color-border)] px-2">
                      <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-slate-400 tracking-wider block">Latency</span>
                      <span className="text-base sm:text-lg font-display font-extrabold text-primary-600 dark:text-primary-300">{activeNode.metrics.latency}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-slate-400 tracking-wider block">Throughput</span>
                      <span className="text-base sm:text-lg font-display font-extrabold text-success-600 dark:text-emerald-400 truncate block">{activeNode.metrics.throughput}</span>
                    </div>
                  </div>

                  {/* Health Progress Indicator */}
                  <div className="mb-6 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-gray-400 dark:text-slate-400 uppercase tracking-wider">Node Health Score</span>
                      <span className="text-success-600 dark:text-emerald-400">{activeNode.metrics.health}% Operational</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-slate-950 overflow-hidden border border-[var(--color-border)]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeNode.metrics.health}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-primary-500 via-accent-400 to-success-500 shadow-[0_0_8px_rgba(37,99,235,0.5)]"
                      />
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-2 mb-8">
                    {activeNode.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-slate-300 font-semibold p-2.5 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
                        <CheckCircle2 size={14} className="text-success-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <span className="text-xs text-gray-400 dark:text-slate-400 font-semibold">ISO 27001 & SOC 2 Audited</span>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-white transition group"
                  >
                    Request Technical Spec <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
