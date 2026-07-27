import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server, Cpu, ShieldCheck, ArrowRight, Zap, RefreshCw, AlertTriangle,
  CheckCircle2, Activity, Globe, Database, Layers, Lock, Terminal
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAccessibleAnimations } from '../../lib/animations';

const transformationDimensions = [
  {
    id: 'cloud',
    title: 'Cloud Infrastructure',
    tag: 'Infrastructure Modernization',
    legacy: {
      title: 'Monolithic On-Premises Stack',
      status: 'High Downtime Risk',
      metrics: { latency: '3.8s Average', availability: '98.2% Uptime', risk: 'Critical' },
      issues: ['Single point of failure bottlenecks', 'Manual server capacity provisioning', 'High maintenance & legacy hardware costs', 'Unoptimized database query locks'],
    },
    engine: 'Esland AI Cloud Migration Core',
    modern: {
      title: 'Multi-Region Elastic Cloud Mesh',
      status: '99.99% Availability SLA',
      metrics: { latency: '12ms Edge Delivery', availability: '99.99% SLA', speed: '10x Faster' },
      outcomes: ['Multi-region AWS & Azure serverless pods', 'Automated Kubernetes auto-scaling', 'Terraform IaC pipeline automation', 'Global CDN edge caching'],
    },
  },
  {
    id: 'security',
    title: 'Cybersecurity & Zero-Trust',
    tag: 'Security Mesh Transformation',
    legacy: {
      title: 'Perimeter Firewalls Only',
      status: 'Vulnerable Architecture',
      metrics: { patches: 'Manual/Delayed', audit: 'Fails SOC 2', risk: 'Elevated' },
      issues: ['Unencrypted internal network payloads', 'Infrequent vulnerability scanning', 'Compliance audit friction & delays', 'Static IAM permission grants'],
    },
    engine: 'Esland Zero-Trust Security Audit Core',
    modern: {
      title: 'Zero-Trust Cybersecurity Mesh',
      status: 'ISO 27001 / SOC 2 Certified',
      metrics: { patches: 'Real-Time Auto', audit: '100% Certified', risk: 'Zero Breach' },
      outcomes: ['Continuous SIEM real-time monitoring', 'End-to-end payload encryption', 'Automated penetration testing routines', 'Role-Based IAM access governance'],
    },
  },
  {
    id: 'ai',
    title: 'AI & Inference Engine',
    tag: 'AI Intelligence Integration',
    legacy: {
      title: 'Manual Business Workflows',
      status: 'Low Operational Velocity',
      metrics: { speed: 'Manual Data Entry', error: 'High Rate', throughput: 'Static' },
      issues: ['Unstructured document bottlenecks', 'Zero real-time data predictions', 'Slow human-dependent approvals', 'Isolated data silos'],
    },
    engine: 'Esland Neural Inference Core',
    modern: {
      title: 'High-Throughput Model Pipeline',
      status: 'Real-Time Autonomous AI',
      metrics: { speed: '2.4k req/sec', error: 'Sub-0.01%', throughput: 'Sub-50ms Inference' },
      outcomes: ['Vector database semantic indexing', 'Fine-tuned LLM model execution', 'Private air-gapped data vaults', 'Automated intelligent workflow triggers'],
    },
  },
  {
    id: 'data',
    title: 'Data Platform & Streaming',
    tag: 'Data Warehouse Modernization',
    legacy: {
      title: 'Batch Overnight Database ETL',
      status: 'Stale Data Delay',
      metrics: { lag: '24-Hour Delay', queryTime: '45s+', locks: 'Frequent' },
      issues: ['Stale executive reporting data', 'Database lock contention during peak hours', 'Complex unmaintainable SQL scripts', 'No real-time event streaming'],
    },
    engine: 'Esland Streaming Data Pipeline Core',
    modern: {
      title: 'Real-Time Streaming Warehouse',
      status: '0ms Real-Time Data Streaming',
      metrics: { lag: '0ms Real-Time', queryTime: '<5ms Index', locks: 'Zero Lock' },
      outcomes: ['Kafka & Redpanda real-time stream ingestion', 'Snowflake & BigQuery data warehousing', 'Columnar zero-latency caching', 'Automated data integrity validation'],
    },
  },
  {
    id: 'devops',
    title: 'DevOps & Release Velocity',
    tag: 'Deployment Automation',
    legacy: {
      title: 'Manual Monthly Rollouts',
      status: 'High Deployment Friction',
      metrics: { duration: '3-4 Weeks', rollback: 'Manual/Risk', deploys: '1 / Month' },
      issues: ['High risk of production breakage', 'Manual rollback procedures', 'Inconsistent staging & prod environments', 'Slow time-to-market for new features'],
    },
    engine: 'Esland CI/CD Automation Engine',
    modern: {
      title: 'Automated Blue-Green CI/CD Pipeline',
      status: 'Zero-Downtime Instant Releases',
      metrics: { duration: '12 Minutes', rollback: 'Instant Auto', deploys: '50+ / Week' },
      outcomes: ['Automated GitHub Actions CI/CD workflows', 'Blue-green zero-downtime release strategy', 'Automated static security & unit testing', 'Immutable container deployments'],
    },
  },
];

export default function TransformationJourney() {
  const [activeDimension, setActiveDimension] = useState(transformationDimensions[0]);
  const canvasRef = useRef(null);
  const { prefersReducedMotion } = useAccessibleAnimations();

  // Neural Connection Canvas Animation
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

    // Glowing Data Packets traveling from Left -> Center -> Right
    const packets = Array.from({ length: 16 }, () => ({
      x: Math.random() * canvas.width,
      y: (canvas.height / 2) + (Math.random() - 0.5) * 80,
      speed: Math.random() * 2 + 1.2,
      size: Math.random() * 3 + 1.5,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Central Processing Pipeline Line
      const midY = canvas.height / 2;
      ctx.beginPath();
      ctx.moveTo(40, midY);
      ctx.lineTo(canvas.width - 40, midY);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Data Packets Animation
      if (!prefersReducedMotion) {
        packets.forEach((p) => {
          p.x += p.speed;
          if (p.x > canvas.width - 40) p.x = 40;

          const isLeft = p.x < canvas.width / 2 - 60;
          const isCenter = p.x >= canvas.width / 2 - 60 && p.x <= canvas.width / 2 + 60;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = isLeft ? '#ef4444' : isCenter ? '#a855f7' : '#38bdf8';
          ctx.shadowBlur = 12;
          ctx.shadowColor = isLeft ? '#ef4444' : isCenter ? '#a855f7' : '#38bdf8';
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
  }, [activeDimension, prefersReducedMotion]);

  return (
    <section className="py-28 px-6 relative bg-slate-950 overflow-hidden border-t border-white/10">
      {/* Background Volumetric Lighting */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-red-500/5 blur-[170px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-sky-500/10 blur-[170px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-4">
            <RefreshCw size={14} className="animate-spin-slow text-sky-400" /> Digital Transformation Engine
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Transform Legacy Complexity Into <br />
            <span className="animate-text-shimmer">
              Enterprise Technology Leadership
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mt-4 font-medium">
            Inspect how Esland's transformation engine converts brittle legacy architectures into high-availability cloud platforms.
          </p>
        </div>

        {/* Enterprise Control Center Rail */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-14">
          {transformationDimensions.map((dim) => {
            const isSelected = activeDimension.id === dim.id;
            return (
              <button
                key={dim.id}
                onClick={() => setActiveDimension(dim)}
                className={`relative px-5 py-3 rounded-2xl border text-xs font-bold tracking-wide transition-all duration-300 backdrop-blur-xl ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 border-sky-400 text-white shadow-xl shadow-sky-500/30 scale-105'
                    : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white hover:border-white/25'
                }`}
              >
                {dim.title}
              </button>
            );
          })}
        </div>

        {/* 3-Stage Transformation Engine Visualizer Stage */}
        <div className="relative">
          {/* Background Packet Mesh Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDimension.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-12 gap-8 items-center relative z-10"
            >
              {/* STAGE 1: Left - Legacy Monolith Environment */}
              <div className="lg:col-span-5 rounded-[2.5rem] border border-red-500/30 bg-slate-900/90 backdrop-blur-2xl p-8 shadow-2xl shadow-red-500/5 relative overflow-hidden flex flex-col justify-between h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-600" />
                
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-red-400">
                      <AlertTriangle size={14} /> BEFORE ESLAND
                    </span>
                    <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400">
                      {activeDimension.legacy.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-200 mb-3">
                    {activeDimension.legacy.title}
                  </h3>

                  {/* Legacy Risk Telemetry */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/80 border border-red-500/20 mb-6 text-center">
                    {Object.entries(activeDimension.legacy.metrics).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">{k}</span>
                        <span className="text-xs font-extrabold text-red-400">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Legacy Bottlenecks */}
                  <div className="space-y-2 mb-6">
                    {activeDimension.legacy.issues.map((issue) => (
                      <div key={issue} className="flex items-center gap-2 text-xs text-slate-400 font-medium p-2.5 rounded-xl bg-slate-950/50 border border-red-500/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-red-500/10 flex items-center justify-between text-xs text-slate-500">
                  <span>Architecture State: High Fragility</span>
                  <span className="text-red-400 font-bold">Replacement Urgency</span>
                </div>
              </div>

              {/* STAGE 2: Center - Esland Transformation Neural Engine */}
              <div className="lg:col-span-2 flex flex-col items-center justify-center my-4 lg:my-0 text-center">
                <div className="relative group cursor-pointer">
                  {/* Rotating Outer Energy Rings */}
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 blur-lg opacity-50 group-hover:opacity-100 transition-opacity animate-pulse" />
                  
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-slate-950 border-2 border-sky-400 text-sky-400 shadow-2xl shadow-sky-500/50">
                    <Cpu size={36} className="animate-spin-slow text-sky-400" />
                  </div>
                </div>

                <span className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-sky-400 max-w-[140px]">
                  {activeDimension.engine}
                </span>
                <span className="mt-1 text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                  Processing Stream
                </span>
              </div>

              {/* STAGE 3: Right - Modern Enterprise Platform Engine */}
              <div className="lg:col-span-5 rounded-[2.5rem] border border-sky-500/40 bg-slate-900/90 backdrop-blur-2xl p-8 shadow-2xl shadow-sky-500/20 relative overflow-hidden flex flex-col justify-between h-full spotlight-card">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400" />
                
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-sky-400">
                      <Zap size={14} className="text-sky-400" /> AFTER ESLAND TRANSFORMATION
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-xs font-bold text-emerald-400">
                      {activeDimension.modern.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white mb-3">
                    {activeDimension.modern.title}
                  </h3>

                  {/* Modernized Telemetry */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/80 border border-sky-500/20 mb-6 text-center">
                    {Object.entries(activeDimension.modern.metrics).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">{k}</span>
                        <span className="text-xs font-extrabold text-sky-300">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Modern Outcomes */}
                  <div className="space-y-2 mb-6">
                    {activeDimension.modern.outcomes.map((out) => (
                      <div key={out} className="flex items-center gap-2 text-xs text-slate-200 font-semibold p-2.5 rounded-xl bg-slate-950/60 border border-white/10">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={14} /> 100% SLA Guarantee
                  </span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-400 hover:text-white transition group"
                  >
                    Initiate Modernization <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
