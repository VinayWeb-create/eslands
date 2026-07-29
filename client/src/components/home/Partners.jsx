import { motion } from 'framer-motion';
import CountUp from '../CountUp';
import { useAccessibleAnimations } from '../../lib/animations';
import { ShieldCheck, Award, Lock, Server, Cpu, Cloud, CheckCircle } from 'lucide-react';

const clientPartners = [
  { name: 'Flower Paradise', color: '#e879a0', hueRotate: 290, logo: '/images/flower_paradise_logo.png' },
  { name: 'Ash Groove', color: '#60a5a0', hueRotate: 144, logo: '/images/ash_groove_logo.png' },
  { name: 'Amdip Traders', color: '#f59e0b', hueRotate: 8, logo: '/images/amdip_traders_logo.png' },
  { name: 'Ilford Kitchens', color: '#ef4444', hueRotate: 330, logo: '/images/ilford_kitchens_logo.png' },
  { name: 'NEX', color: '#3b82f6', hueRotate: 187, logo: '/nex.png' },
  { name: 'Mobile Bitz', color: '#8b5cf6', hueRotate: 228, logo: '/images/mobile_bitz_logo.png' },
  { name: 'Kingsburry School', color: '#10b981', hueRotate: 100, logo: '/images/kingsburry_school_logo.png' },
];

const enterpriseCertifications = [
  { title: 'ISO 27001:2022', category: 'Information Security', icon: ShieldCheck, accent: 'text-emerald-400' },
  { title: 'SOC 2 Type II', category: 'Compliance & Audit', icon: Lock, accent: 'text-sky-400' },
  { title: 'AWS Cloud Partner', category: 'Cloud Infrastructure', icon: Cloud, accent: 'text-amber-400' },
  { title: 'Microsoft Solution Partner', category: 'Enterprise Apps', icon: Cpu, accent: 'text-indigo-400' },
];

export default function Partners() {
  const { prefersReducedMotion, fadeUp } = useAccessibleAnimations();

  return (
    <section className="border-y border-white/5 bg-slate-950 py-16 relative overflow-hidden">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-950/20 via-slate-950 to-indigo-950/20 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 mb-12 relative z-10">
        <motion.p {...fadeUp} className="text-center text-xs font-bold uppercase tracking-[0.35em] text-sky-400 mb-3">
          ENTERPRISE TRUST & COMPLIANCE
        </motion.p>
        <motion.h2 {...fadeUp} className="text-center text-2xl sm:text-4xl font-black text-white tracking-tight mb-10">
          Trusted By Global Enterprises & Technology Leaders
        </motion.h2>

        {/* Enterprise Certifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {enterpriseCertifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.title}
                className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:border-sky-500/30 transition-all duration-300 group"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 ${cert.accent}`}>
                  <Icon size={22} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug group-hover:text-sky-300 transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">{cert.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee Logos Carousel */}
      <div className="relative overflow-hidden py-10">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes shimmer-sweep {
            0% { left: -150%; }
            45% { left: 150%; }
            100% { left: 150%; }
          }
          .animate-shimmer-sweep {
            position: absolute;
            top: 0;
            width: 60%;
            height: 100%;
            transform: skewX(-25deg);
            animation: shimmer-sweep 4s infinite ease-in-out;
          }
        `}} />
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className={`flex ${prefersReducedMotion ? '' : 'animate-marquee'}`} style={{ width: 'max-content' }}>
          {[...clientPartners, ...clientPartners].map((partner, index) => {
            const isWhiteBg = partner.name !== 'NEX';
            const staggerDelay = `${(index % clientPartners.length) * 0.4}s`;
            return (
              <div key={index} className="mx-6 flex-shrink-0 group relative py-4">
                {/* Vibrant Colored Glowing Aura behind the card (Gentle Pulsate) */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-25 group-hover:opacity-60 blur-xl transition-all duration-700 pointer-events-none animate-pulse"
                  style={{
                    background: `radial-gradient(circle, ${partner.color} 0%, transparent 70%)`,
                    animationDuration: '3s',
                    animationDelay: staggerDelay,
                  }}
                />
                
                {/* Logo Card container with uniform size and dark glass style */}
                <div
                  className="partner-card relative w-60 h-28 sm:w-72 sm:h-36 flex items-center justify-center p-4 rounded-3xl border bg-slate-950/60 backdrop-blur-md hover:bg-slate-900/40 transition-all duration-500 ease-out overflow-hidden"
                  style={{
                    borderColor: `${partner.color}35`,
                    boxShadow: `inset 0 0 12px ${partner.color}15, 0 4px 20px rgba(0,0,0,0.4)`,
                    '--partner-color': partner.color,
                  }}
                >
                  {/* Staggered Shimmer Sweep Effect (Colorful sweep passing through) */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                    <div
                      className="animate-shimmer-sweep opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${partner.color} 50%, transparent)`,
                        animationDelay: staggerDelay,
                      }}
                    />
                  </div>

                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    className="max-h-20 sm:max-h-26 max-w-[95%] object-contain transition-all duration-500 ease-out"
                    style={{
                      // Colorize by default
                      filter: isWhiteBg
                        ? `invert(1) brightness(0.9) sepia(1) saturate(350%) hue-rotate(${partner.hueRotate}deg)`
                        : `brightness(1.3) contrast(1.1)`,
                      mixBlendMode: isWhiteBg ? 'screen' : 'normal',
                    }}
                  />
                  
                  {/* Style block to handle the hover state filter cleanly in pure CSS */}
                  <style dangerouslySetInnerHTML={{__html: `
                    .group:hover .partner-card img {
                      filter: ${isWhiteBg 
                        ? `invert(1) brightness(1.25) sepia(1) saturate(800%) hue-rotate(${partner.hueRotate}deg) contrast(1.2) !important`
                        : 'brightness(1.8) contrast(1.3) !important'};
                    }
                    .group:hover .partner-card {
                      border-color: ${partner.color} !important;
                      box-shadow: 0 0 25px ${partner.color}50, inset 0 0 15px ${partner.color}30 !important;
                    }
                  `}} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
