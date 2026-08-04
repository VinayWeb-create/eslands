import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, Award, Globe2,
  Activity, CheckCircle, TrendingUp, Zap, Server, Lock,
  BarChart3, Users, Clock, ChevronRight, Cpu, Network,
  Database, Shield, AlertTriangle
} from 'lucide-react';
import { useAccessibleAnimations } from '../../lib/animations';
import CountUp from '../CountUp';

const heroStats = [
  { value: 10,   suffix: '+',  label: 'Years\nExperience' },
  { value: 500,  suffix: '+',  label: 'Projects\nDelivered' },
  { value: 200,  suffix: '+',  label: 'Global\nClients' },
  { value: 99.9, suffix: '%',  label: 'Uptime\nSLA', decimals: 1 },
];

const trustBadges = [
  { label: 'ISO 27001:2022', icon: ShieldCheck },
  { label: 'SOC 2 Type II',  icon: Lock },
  { label: '24/7 Support',   icon: Activity },
];

export default function Hero() {
  const [pulseActive, setPulseActive] = useState(true);
  const [activeTab, setActiveTab] = useState('throughput'); // 'throughput' | 'security'
  const { prefersReducedMotion } = useAccessibleAnimations();

  // Parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200 });
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    const pulseInterval = setInterval(() => setPulseActive(p => !p), 2000);
    const tabInterval = setInterval(() => {
      setActiveTab(prev => (prev === 'throughput' ? 'security' : 'throughput'));
    }, 5500);

    return () => {
      clearInterval(pulseInterval);
      clearInterval(tabInterval);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    mouseX.set(e.clientX / window.innerWidth  - 0.5);
    mouseY.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-[#FFFFFF]"
    >
      {/* Subtle corporate grid lines */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,48,135,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,48,135,0.03) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute z-[1]"
        style={{
          top: '-15%', left: '-8%',
          width: '55vw', height: '55vw',
          background: 'radial-gradient(circle, rgba(0,87,216,0.06) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="pointer-events-none absolute z-[1]"
        style={{
          bottom: '-15%', right: '-8%',
          width: '45vw', height: '45vw',
          background: 'radial-gradient(circle, rgba(0,48,135,0.04) 0%, transparent 65%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[90vw] lg:max-w-[1440px] px-6 w-full pt-28 pb-20">
        <div className="grid gap-12 lg:gap-10 lg:grid-cols-12 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Authority badges */}
              <div className="mb-7 flex items-center gap-3 flex-wrap">
                <span
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
                  style={{
                    background: 'rgba(184,134,11,0.08)',
                    border: '1px solid rgba(184,134,11,0.22)',
                    color: '#8B6800',
                    borderRadius: '3px',
                  }}
                >
                  ★ Enterprise Grade
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                  style={{
                    background: 'rgba(0,48,135,0.06)',
                    border: '1px solid rgba(0,48,135,0.15)',
                    color: '#003087',
                    borderRadius: '3px',
                  }}
                >
                  IT Solutions & Digital Transformation
                </span>
              </div>

              {/* Headline */}
              <h1
                className="font-display font-black tracking-tight leading-[1.05] mb-6"
                style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.6rem)', color: '#0F1729' }}
              >
                Engineering Digital<br />
                Excellence For{' '}
                <span
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #003087 0%, #0057D8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Enterprise Growth
                </span>
              </h1>

              {/* Sub-headline */}
              <p
                className="text-lg sm:text-xl font-medium leading-relaxed mb-8 max-w-xl text-[#4B5563]"
              >
                From cloud infrastructure to bespoke AI solutions — we architect, build, and manage technology that powers Fortune-caliber businesses across the globe.
              </p>

              {/* Key differentiators */}
              <div className="flex flex-col gap-2.5 mb-10">
                {[
                  'ISO 27001 & SOC 2 Type II certified infrastructure',
                  'Zero-downtime deployment with 99.99% uptime SLA',
                  'Dedicated senior engineers — no outsourcing',
                ].map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.55 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle size={16} style={{ color: '#003087', flexShrink: 0 }} />
                    <span className="text-sm font-medium text-[#4B5563]">
                      {point}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white transition-all duration-200"
                  style={{
                    background: '#003087',
                    borderRadius: '5px',
                    border: '1px solid #003087',
                    boxShadow: '0 2px 12px rgba(0,48,135,0.25)',
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#002068';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,48,135,0.35)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#003087';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,48,135,0.25)';
                  }}
                >
                  Schedule a Consultation
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold transition-all duration-200"
                  style={{
                    background: 'transparent',
                    border: '1.5px solid #003087',
                    color: '#003087',
                    borderRadius: '5px',
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(0,48,135,0.05)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Explore Services
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-5 flex-wrap">
                {trustBadges.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-500"
                  >
                    <Icon size={13} style={{ color: '#003087' }} />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — High-Fidelity Professional BI Dashboard ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: parallaxX, y: parallaxY }}
              className="relative w-full max-w-[450px]"
            >
              {/* Glow border ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500 pointer-events-none" />

              <div
                className="relative rounded-2xl overflow-hidden bg-white"
                style={{
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 20px 40px rgba(0,48,135,0.06), 0 1px 3px rgba(0,0,0,0.02)',
                }}
              >
                {/* Header Gradient bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[4px]"
                  style={{ background: 'linear-gradient(90deg, #003087 0%, #0092E8 50%, #10B981 100%)' }}
                />

                {/* Dashboard Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] bg-gray-50/50">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-100 text-[#003087]">
                      <Database size={11} className="animate-pulse" />
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-900">
                      Esland Command Center
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[9px] font-extrabold text-emerald-700 uppercase tracking-widest">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Live Stream
                    </span>
                  </div>
                </div>

                {/* Custom Interactive Dashboard Tabs */}
                <div className="grid grid-cols-2 border-b border-[#E2E8F0] bg-white p-1 gap-1">
                  <button
                    onClick={() => setActiveTab('throughput')}
                    className={`flex items-center justify-center gap-2 py-2.5 text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                      activeTab === 'throughput'
                        ? 'bg-blue-50 border border-blue-100 text-[#003087] shadow-sm'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Network size={13} className={activeTab === 'throughput' ? 'text-[#003087]' : 'text-gray-400'} />
                    Network Analytics
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`flex items-center justify-center gap-2 py-2.5 text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                      activeTab === 'security'
                        ? 'bg-emerald-50 border border-emerald-100 text-emerald-800 shadow-sm'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Shield size={13} className={activeTab === 'security' ? 'text-emerald-700' : 'text-gray-400'} />
                    Security Telemetry
                  </button>
                </div>

                {/* Main Interactive Screen */}
                <div className="p-5 min-h-[230px] flex flex-col justify-between bg-white relative">
                  {/* Decorative background grid overlay */}
                  <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                  <AnimatePresence mode="wait">
                    {activeTab === 'throughput' ? (
                      <motion.div
                        key="throughput"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full flex-1 flex flex-col justify-between"
                      >
                        {/* Upper Stats Meta */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-gray-400 font-extrabold block">Network Throughput</span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-3xl font-display font-black text-gray-900 leading-none">48.2 GB/s</span>
                              <span className="text-[10px] font-extrabold text-blue-600">+12.4% vs last hr</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] uppercase tracking-wider text-gray-400 font-extrabold block">Cluster Status</span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Optimal
                            </span>
                          </div>
                        </div>

                        {/* Interactive Main Line Chart (SVG) */}
                        <div className="relative w-full h-[120px] rounded-lg overflow-hidden border border-gray-100 bg-gray-50/50 p-1">
                          <svg className="w-full h-full" viewBox="0 0 320 120" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0057D8" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#0057D8" stopOpacity="0.0" />
                              </linearGradient>
                              <linearGradient id="emerald-gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                              </linearGradient>
                              <filter id="svg-glow">
                                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                                <feMerge>
                                  <feMergeNode in="coloredBlur"/>
                                  <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                              </filter>
                            </defs>

                            {/* Horizontal Gridlines */}
                            <line x1="0" y1="30" x2="320" y2="30" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
                            <line x1="0" y1="65" x2="320" y2="65" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
                            <line x1="0" y1="100" x2="320" y2="100" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />

                            {/* Gradient Underlays */}
                            <path d="M 0 95 Q 40 70 80 85 T 160 50 T 240 30 T 320 15 L 320 120 L 0 120 Z" fill="url(#blue-gradient)" />
                            <path d="M 0 105 Q 40 90 80 100 T 160 75 T 240 55 T 320 38 L 320 120 L 0 120 Z" fill="url(#emerald-gradient)" />

                            {/* Double Chart Lines */}
                            <path d="M 0 95 Q 40 70 80 85 T 160 50 T 240 30 T 320 15" fill="none" stroke="#0057D8" strokeWidth="2.8" strokeLinecap="round" filter="url(#svg-glow)" />
                            <path d="M 0 105 Q 40 90 80 100 T 160 75 T 240 55 T 320 38" fill="none" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="1" />

                            {/* Glowing Target Peaks */}
                            <circle cx="240" cy="30" r="4.5" fill="#FFFFFF" stroke="#0057D8" strokeWidth="2.5" />
                            <circle cx="320" cy="15" r="4.5" fill="#FFFFFF" stroke="#0092E8" strokeWidth="2.5" />
                          </svg>

                          {/* Hover Tooltip overlay */}
                          <div className="absolute top-[18px] left-[158px] bg-[#003087] text-white rounded px-2 py-0.5 text-[8px] font-black uppercase tracking-wider shadow">
                            48.2 GB/s Inbound
                          </div>
                        </div>

                        {/* Chart Legend */}
                        <div className="flex justify-between items-center mt-2 px-1 text-[8.5px] font-extrabold text-gray-400 uppercase tracking-wider">
                          <div className="flex gap-3">
                            <span className="flex items-center gap-1 text-[#003087]"><span className="h-1.5 w-1.5 rounded-full bg-[#0057D8]" /> Inbound</span>
                            <span className="flex items-center gap-1 text-emerald-800"><span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" /> Outbound</span>
                          </div>
                          <span>Refresh: 1s</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="security"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full flex-1 flex flex-col justify-between"
                      >
                        {/* Upper Stats Meta */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-gray-400 font-extrabold block">Intrusion Shield Status</span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-3xl font-display font-black text-gray-900 leading-none">100% Secure</span>
                              <span className="text-[10px] font-extrabold text-emerald-600">0 Threat Blocks</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] uppercase tracking-wider text-gray-400 font-extrabold block">Security Engine</span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                              Active Shielding
                            </span>
                          </div>
                        </div>

                        {/* Interactive Graph (Threat Activity / Firewalls) */}
                        <div className="relative w-full h-[120px] rounded-lg overflow-hidden border border-gray-100 bg-gray-50/50 p-2 flex flex-col justify-between">
                          <div className="flex items-center justify-between text-[9px] font-bold text-gray-600 border-b border-gray-100 pb-1.5">
                            <span>Threat Vector Analytics</span>
                            <span className="text-[9px] text-[#003087] font-extrabold">SSL / TLS Decryption</span>
                          </div>

                          <div className="grid grid-cols-3 gap-3 my-2.5">
                            {[
                              { label: 'DDoS Mitigated', val: '182k/day', status: 'Optimal', col: 'text-blue-600 bg-blue-50' },
                              { label: 'IP Reputation Check', val: 'Passed', status: '100% Clean', col: 'text-emerald-700 bg-emerald-50' },
                              { label: 'WAF Rule Blocks', val: '0 Incidents', status: 'Secure', col: 'text-purple-700 bg-purple-50' }
                            ].map((itm, i) => (
                              <div key={i} className={`p-2 rounded border border-gray-100 ${itm.col} text-center flex flex-col justify-between`}>
                                <span className="text-[8px] font-bold uppercase tracking-wider text-gray-400 block">{itm.label}</span>
                                <span className="text-xs font-black block mt-0.5">{itm.val}</span>
                                <span className="text-[8px] font-extrabold block mt-0.5 opacity-90">{itm.status}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Axis/Ref info */}
                        <div className="flex justify-between items-center text-[8.5px] font-extrabold text-gray-400 uppercase tracking-widest mt-1 px-1">
                          <span>Secure Endpoint Handshake</span>
                          <span>TLS 1.3 Active</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>


                {/* Compliance footer */}
                <div
                  className="px-5 py-4 border-t border-[#E2E8F0] flex items-center justify-between bg-gray-50/50"
                >
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-[#003087]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-900">
                      ISO 27001 Certified
                    </span>
                  </div>
                  <Link
                    to="/contact"
                    className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors text-[#003087] hover:text-[#002068]"
                  >
                    Get a Demo <ChevronRight size={10} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
