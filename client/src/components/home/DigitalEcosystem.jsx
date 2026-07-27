import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, ShieldCheck, Cpu, Database, Server, Globe2, ArrowRight, Zap, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const ecosystemPillars = [
  {
    id: 'cloud',
    title: 'Multi-Region Enterprise Cloud',
    icon: Cloud,
    tag: 'Infrastructure',
    stat: '99.99% Availability',
    desc: 'AWS & Azure hybrid architecture featuring automated cross-region replication, serverless container orchestration, and instant failover.',
    features: ['AWS / Azure Hybrid Topology', 'Automated Failover Routing', 'Elastic Auto-Scaling', 'Infrastructure as Code (Terraform)'],
  },
  {
    id: 'security',
    title: 'Zero-Trust Cybersecurity Mesh',
    icon: ShieldCheck,
    tag: 'Security & Audit',
    stat: 'ISO 27001 Certified',
    desc: 'Continuous real-time threat intelligence, automated vulnerability patching, encrypted data vaults, and strict SOC 2 audit readiness.',
    features: ['Continuous SIEM Telemetry', 'Encrypted Payload Vaults', 'Automated Penetration Scans', 'Strict Access Governance (IAM)'],
  },
  {
    id: 'software',
    title: 'Bespoke Microservices Engineering',
    icon: Cpu,
    tag: 'Software Craft',
    stat: 'Sub-100ms API Speed',
    desc: 'Scalable distributed software systems built using React, Node.js, Python, Swift, Kotlin, and containerized Docker/Kubernetes workloads.',
    features: ['Microservices & Event-Driven Architecture', 'GraphQL & REST API Gateways', 'CI/CD Pipeline Automation', 'High-Concurrency Processing'],
  },
  {
    id: 'data',
    title: 'High-Throughput Data Engineering',
    icon: Database,
    tag: 'Analytics & Telemetry',
    stat: '10x Query Acceleration',
    desc: 'Real-time ETL data pipelines, high-speed SQL/NoSQL indexing, and executive data warehouse visualization.',
    features: ['Real-Time Stream Processing', 'Data Warehouse Integration', 'Automated Analytics Telemetry', 'Zero-Latency Query Caching'],
  },
];

export default function DigitalEcosystem() {
  const [activePillar, setActivePillar] = useState(ecosystemPillars[0]);

  return (
    <section className="py-28 px-6 relative bg-slate-950 overflow-hidden border-t border-white/5">
      {/* Glow Orbs Background */}
      <div className="pointer-events-none absolute right-1/3 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]" />
      <div className="pointer-events-none absolute left-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-sky-500/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-4">
            <Globe2 size={14} /> Enterprise Digital Ecosystem
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Integrated Technology Architecture For <br />
            <span className="animate-text-shimmer">
              Mission-Critical Operations
            </span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed mt-4">
            Explore the core engineering pillars powering Esland’s enterprise clients.
          </p>
        </div>

        {/* Orbit Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Pillar Selector Column */}
          <div className="lg:col-span-5 space-y-4">
            {ecosystemPillars.map((pillar) => {
              const Icon = pillar.icon;
              const isSelected = activePillar.id === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar)}
                  className={`w-full p-6 rounded-[2rem] border text-left transition-all duration-300 backdrop-blur-xl flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-gradient-to-r from-sky-500/20 via-indigo-600/20 to-slate-900 border-sky-400 text-white shadow-xl shadow-sky-500/10 scale-[1.02]'
                      : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${isSelected ? 'bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg' : 'bg-white/5 text-sky-400'}`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">{pillar.tag}</span>
                      <h4 className="text-base font-bold text-white leading-tight">{pillar.title}</h4>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${isSelected ? 'bg-sky-500/20 border-sky-400/40 text-sky-300' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                    {pillar.stat}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Inspector Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="spotlight-card h-full rounded-[2.5rem] border border-sky-500/30 bg-slate-900/90 backdrop-blur-2xl p-8 sm:p-12 flex flex-col justify-between overflow-hidden shadow-2xl shadow-sky-500/10"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-purple-500" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold text-sky-300 uppercase tracking-widest">
                      {activePillar.tag}
                    </span>
                    <span className="text-xl font-black text-white">{activePillar.stat}</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-black text-white mb-4 leading-tight">
                    {activePillar.title}
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 font-medium">
                    {activePillar.desc}
                  </p>

                  {/* Key Architecture Features */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {activePillar.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-200 font-semibold">
                        <Check size={14} className="text-emerald-400 shrink-0" />
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Enterprise SLA Guaranteed</span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 hover:text-white transition"
                  >
                    Request Technical Spec <ArrowRight size={14} />
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
