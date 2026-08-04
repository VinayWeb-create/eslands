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

  // Auto-switch tabs
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDimension((prev) => {
        const currentIndex = transformationDimensions.findIndex((dim) => dim.id === prev.id);
        return transformationDimensions[(currentIndex + 1) % transformationDimensions.length];
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [activeDimension]);

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

    // Neural nodes
    const nodeCount = 30;
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(41, 112, 255, 0.15)';
      ctx.strokeStyle = 'rgba(41, 112, 255, 0.12)';
      ctx.lineWidth = 1.2;

      // Update & Draw Nodes
      nodes.forEach((node) => {
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
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
    <section className="py-0 px-6 relative bg-[var(--color-bg-surface)] overflow-hidden border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-badge mb-4 inline-flex">
            <RefreshCw size={14} className="animate-spin-slow" /> Digital Transformation Engine
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900 tracking-tight leading-tight">
            Transform Legacy Complexity Into <br />
            <span className="text-shimmer">
              Enterprise Technology Leadership
            </span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-4 font-medium">
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
                className={`relative px-5 py-3 rounded-lg border text-xs font-bold tracking-wide transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#003087] border-[#003087] text-white shadow-md scale-105'
                    : 'bg-white border-[#E4E9F0] text-gray-500 hover:text-[#003087] hover:border-[#003087]'
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
              className="grid lg:grid-cols-12 gap-8 items-stretch relative z-10"
            >
              {/* STAGE 1: Left - Legacy Monolith Environment */}
              <div className="lg:col-span-5 rounded-2xl border-2 border-red-100 bg-white p-8 shadow-md relative overflow-hidden flex flex-col justify-between h-full hover:scale-[1.02] hover:border-red-300 hover:shadow-red-500/20 hover:shadow-2xl transition-all duration-500 group/left">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 opacity-80 group-hover/left:opacity-100 transition-opacity" />
                
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-red-600">
                      <AlertTriangle size={14} /> BEFORE ESLAND
                    </span>
                    <span className="px-3 py-1 rounded-full bg-red-50 border border-red-100 text-xs font-bold text-red-600">
                      {activeDimension.legacy.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-extrabold text-gray-900 mb-3">
                    {activeDimension.legacy.title}
                  </h3>

                  {/* Legacy Risk Telemetry */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-red-50/50 border border-red-100 mb-6 text-center">
                    {Object.entries(activeDimension.legacy.metrics).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">{k}</span>
                        <span className="text-xs font-extrabold text-red-600">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Legacy Bottlenecks */}
                  <div className="space-y-2 mb-6">
                    {activeDimension.legacy.issues.map((issue) => (
                      <div key={issue} className="flex items-center gap-2 text-xs text-gray-600 font-medium p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Architecture State: High Fragility</span>
                  <span className="text-red-600 font-bold">Replacement Urgency</span>
                </div>
              </div>

              {/* STAGE 2: Center - Esland Transformation Neural Engine */}
              <div className="lg:col-span-2 flex flex-col items-center justify-center my-4 lg:my-0 text-center relative z-20">
                <div className="relative group cursor-pointer hover:scale-110 transition-transform duration-500">
                  {/* Outer Rings */}
                  <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-sky-400 via-[#003087] to-indigo-500 blur-xl opacity-30 group-hover:opacity-60 transition-opacity animate-pulse" />
                  <div className="absolute -inset-2 rounded-full border-2 border-dashed border-[#003087]/30 animate-[spin_8s_linear_infinite]" />
                  
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white border-2 border-[#003087] text-[#003087] shadow-[0_0_20px_rgba(0,48,135,0.2)]">
                    <Cpu size={36} className="animate-spin-slow text-[#003087]" />
                  </div>
                </div>

                <span className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#003087] max-w-[140px]">
                  {activeDimension.engine}
                </span>
                <span className="mt-1 text-[9px] font-semibold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-100">
                  Processing Stream
                </span>
              </div>

              {/* STAGE 3: Right - Modern Enterprise Platform Engine */}
              <div className="lg:col-span-5 rounded-2xl border-2 border-green-100 bg-white p-8 shadow-md relative overflow-hidden flex flex-col justify-between h-full hover:scale-[1.02] hover:border-green-300 hover:shadow-green-500/20 hover:shadow-2xl transition-all duration-500 group/right">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-[#0057D8] to-emerald-500 opacity-80 group-hover/right:opacity-100 transition-opacity" />
                
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#003087]">
                      <Zap size={14} className="text-[#003087]" /> AFTER ESLAND
                    </span>
                    <span className="px-3 py-1 rounded-full bg-green-50 border border-green-100 text-xs font-bold text-green-700">
                      {activeDimension.modern.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-extrabold text-gray-900 mb-3">
                    {activeDimension.modern.title}
                  </h3>

                  {/* Modernized Telemetry */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-green-50/30 border border-green-100 mb-6 text-center">
                    {Object.entries(activeDimension.modern.metrics).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">{k}</span>
                        <span className="text-xs font-extrabold text-[#003087]">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Modern Outcomes */}
                  <div className="space-y-2 mb-6">
                    {activeDimension.modern.outcomes.map((out) => (
                      <div key={out} className="flex items-center gap-2 text-xs text-gray-700 font-semibold p-2.5 rounded-lg bg-green-50/20 border border-green-50">
                        <CheckCircle2 size={14} className="text-green-600 shrink-0" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-green-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={14} /> 100% SLA Guarantee
                  </span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#003087] hover:text-[#002068] transition group"
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
