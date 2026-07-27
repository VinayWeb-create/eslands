import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Award, Globe2, Terminal, Activity, Newspaper } from 'lucide-react';
import { useAccessibleAnimations } from '../../lib/animations';
import CountUp from '../CountUp';

const newsroomUpdates = [
  { tag: 'SECURITY WIN', text: 'Esland achieves ISO 27001:2022 & SOC 2 Type II audit renewal' },
  { tag: 'CLIENT RESULT', text: 'Ilford Kitchens records 40% annual revenue boost post-redesign' },
  { tag: 'UPTIME SLA', text: '99.99% multi-region cloud availability maintained across all client nodes' }
];

const heroSlides = [
  { src: '/ban-8.jpg', alt: 'Computer Network layout background', title: 'High-Performance Infrastructure' },
  { src: '/ban-9.jpg', alt: 'London Enterprise Infrastructure background', title: 'Global Technology Partner' },
  { src: '/banner-3.jpg', alt: 'Corporate teamwork background', title: 'Architecting Digital Futures' }
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [newsIndex, setNewsIndex] = useState(0);
  const [telemetryMode, setTelemetryMode] = useState('enterprise');
  const canvasRef = useRef(null);
  const { prefersReducedMotion } = useAccessibleAnimations();

  // Smooth Parallax Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 35, stiffness: 250 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
  const parallaxReverseX = useTransform(smoothX, [-0.5, 0.5], [25, -25]);
  const parallaxReverseY = useTransform(smoothY, [-0.5, 0.5], [25, -25]);

  // Ambient Canvas Particles & Light Rays
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

    const lightRays = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 0.8,
      speedY: -(Math.random() * 0.4 + 0.1),
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lightRays.forEach((ray) => {
        if (!prefersReducedMotion) {
          ray.y += ray.speedY;
          if (ray.y < 0) {
            ray.y = canvas.height;
            ray.x = Math.random() * canvas.width;
          }
        }

        ctx.beginPath();
        ctx.arc(ray.x, ray.y, ray.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${ray.alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#38bdf8';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  // Slide & News Ticker Intervals
  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);

    const newsTimer = window.setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % newsroomUpdates.length);
    }, 4500);

    return () => {
      window.clearInterval(slideTimer);
      window.clearInterval(newsTimer);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] sm:min-h-[96vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-24 pb-16"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[2]" />

      {/* Layered Lighting & Volumetric Gradient Spheres */}
      <div className="pointer-events-none absolute left-0 top-0 h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] rounded-full bg-sky-500/10 sm:bg-sky-500/20 blur-[100px] sm:blur-[180px] z-[1]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[250px] w-[250px] sm:h-[550px] sm:w-[550px] rounded-full bg-purple-600/10 sm:bg-purple-600/20 blur-[80px] sm:blur-[170px] z-[1]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[200px] w-[250px] sm:h-[400px] sm:w-[500px] rounded-full bg-cyan-500/10 sm:bg-cyan-500/15 blur-[80px] sm:blur-[150px] z-[1]" />

      {/* Slide Backgrounds — Reduced Dark Density so Images are Crisp & Visible */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
            style={{ x: parallaxX, y: parallaxY }}
          >
            <img
              src={heroSlides[activeSlide].src}
              alt={heroSlides[activeSlide].alt}
              className="w-full h-full object-cover filter brightness-[0.95] sm:brightness-[0.88] contrast-110 sm:contrast-115 saturate-110 transition-all duration-700"
            />
            {/* Lighter Transparent Gradient Overlays for Vivid High Quality Image Visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/40 sm:from-slate-950/45 sm:via-slate-950/15 sm:to-slate-950/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-transparent to-transparent sm:from-slate-950/55 sm:via-slate-950/20" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Blueprint Grid Overlay (5% Opacity) */}
      <motion.div
        style={{ x: parallaxReverseX, y: parallaxReverseY }}
        className="absolute inset-0 z-[1] opacity-[0.03] sm:opacity-[0.05] bg-[linear-gradient(rgba(56,189,248,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.5)_1px,transparent_1px)] bg-[size:70px_70px] pointer-events-none"
      />

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full text-center lg:text-left my-auto">
        {/* Newsroom Recency Ticker Bar */}
        <div className="mb-8 flex justify-center lg:justify-start">
          <div className="inline-flex items-center gap-3 rounded-full border border-sky-400/40 bg-slate-950/80 px-4.5 py-2 text-xs backdrop-blur-2xl shadow-2xl shadow-sky-500/20 max-w-xl">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-400 text-slate-950 font-black uppercase text-[10px] tracking-wider shrink-0 flex items-center gap-1">
              <Newspaper size={12} /> {newsroomUpdates[newsIndex].tag}
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={newsIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-slate-200 font-semibold truncate text-[11px] sm:text-xs"
              >
                {newsroomUpdates[newsIndex].text}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 max-w-3xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 uppercase leading-[1.05]">
                Architecting <br />
                <span className="animate-text-shimmer drop-shadow-[0_0_35px_rgba(56,189,248,0.5)]">
                  Digital Ambition
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-200 font-medium max-w-2xl mb-10 leading-relaxed mx-auto lg:mx-0 drop-shadow">
                Esland architects resilient enterprise cloud infrastructure, zero-trust cybersecurity, and high-performance bespoke software engineering for Fortune 500 leaders.
              </p>

              {/* Dual CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-5 mb-12">
                <MagneticButton>
                  <Link
                    to="/contact"
                    className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-600 px-8 py-4 text-sm font-bold text-slate-950 shadow-[0_0_35px_rgba(56,189,248,0.5)] hover:shadow-[0_0_55px_rgba(56,189,248,0.8)] hover:scale-105 transition-all duration-300 uppercase tracking-wider"
                  >
                    <span>Schedule Enterprise Demo</span>
                    <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </MagneticButton>

                <MagneticButton>
                  <Link
                    to="/about"
                    className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/25 bg-slate-900/85 backdrop-blur-2xl px-8 py-4 text-sm font-bold text-slate-100 hover:text-white hover:bg-white/15 hover:border-white/40 transition-all duration-300 uppercase tracking-wider"
                  >
                    <span>Prove It (Case Studies)</span>
                  </Link>
                </MagneticButton>
              </div>

              {/* Animated Statistics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/15 max-w-xl mx-auto lg:mx-0">
                {[
                  { value: 10, suffix: '+', label: 'Years Experience' },
                  { value: 500, suffix: '+', label: 'Enterprise Projects' },
                  { value: 200, suffix: '+', label: 'Global Clients' },
                  { value: 99.9, suffix: '%', label: 'Uptime SLA' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      <CountUp end={stat.value} suffix={stat.suffix} decimals={stat.value % 1 !== 0 ? 1 : 0} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: High-Impact Flagship Illustration Showcase (15-20% Larger) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1.05, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ x: parallaxReverseX, y: parallaxReverseY }}
              className="relative w-full max-w-lg lg:max-w-xl"
            >
              {/* Soft Volumetric Glow Halo */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-sky-400/40 via-indigo-500/30 to-purple-600/40 blur-3xl rounded-[3.5rem] pointer-events-none" />

              <div className="spotlight-card relative rounded-[2.5rem] border-2 border-sky-400/40 bg-slate-900/95 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:border-sky-400/70 transition-all duration-500 overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-cyan-300 to-purple-500" />

                {/* Dashboard Header Bar */}
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-400 shadow-md">
                      {telemetryMode === 'enterprise' ? <Globe2 size={20} /> : <Terminal size={20} />}
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm sm:text-base font-bold text-white leading-tight">System Telemetry Dashboard</h4>
                      <p className="text-[11px] text-sky-300 font-semibold">Multi-Region Enterprise Nodes</p>
                    </div>
                  </div>

                  <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-white/15">
                    <button
                      onClick={() => setTelemetryMode('enterprise')}
                      className={`px-3.5 py-1 text-[10px] font-bold uppercase rounded-lg transition-all ${
                        telemetryMode === 'enterprise' ? 'bg-sky-400 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Nodes
                    </button>
                    <button
                      onClick={() => setTelemetryMode('telemetry')}
                      className={`px-3.5 py-1 text-[10px] font-bold uppercase rounded-lg transition-all ${
                        telemetryMode === 'telemetry' ? 'bg-sky-400 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Terminal
                    </button>
                  </div>
                </div>

                {/* Interactive Centerpiece Illustration */}
                <AnimatePresence mode="wait">
                  {telemetryMode === 'enterprise' ? (
                    <motion.div
                      key="enterprise"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative p-2"
                    >
                      <img
                        src="/Computer_India.png"
                        alt="Enterprise Telemetry Dashboard Centerpiece"
                        className="w-full h-auto object-contain rounded-2xl filter brightness-105 contrast-105 drop-shadow-[0_20px_40px_rgba(56,189,248,0.45)] transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="telemetry"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-slate-950 p-5 rounded-2xl border border-white/15 font-mono text-xs text-slate-200 space-y-2.5 text-left shadow-inner"
                    >
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <Activity size={15} className="animate-pulse" /> SYSTEM SLA: 99.99% ONLINE
                      </div>
                      <div className="text-sky-300">[AWS-EU-WEST-1] Ping: 12ms | Latency: Sub-100ms</div>
                      <div className="text-purple-300">[AZURE-UK-SOUTH] Kubernetes Mesh: 100% Active</div>
                      <div className="text-slate-300">[SECURITY-AUDIT] Zero-Trust Payload: Encrypted AES-256</div>
                      <div className="text-emerald-400 font-bold pt-3 border-t border-white/10">
                        &gt; status: 0 critical vulnerabilities | ISO 27001 Verified
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Badges */}
                <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                    <ShieldCheck size={16} /> ISO 27001 Certified
                  </span>
                  <span className="flex items-center gap-1.5 font-bold text-sky-300">
                    <Award size={16} /> 24/7 Ops Support
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              activeSlide === index
                ? 'w-10 bg-gradient-to-r from-sky-400 to-indigo-500 shadow-[0_0_15px_rgba(56,189,248,0.6)]'
                : 'w-2.5 bg-white/30 hover:bg-white/60 backdrop-blur-md'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// Magnetic Button Component
function MagneticButton({ children }) {
  const { prefersReducedMotion } = useAccessibleAnimations();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const xPos = (clientX - (left + width / 2)) * 0.2;
    const yPos = (clientY - (top + height / 2)) * 0.2;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
