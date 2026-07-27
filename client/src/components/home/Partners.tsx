import { motion } from 'framer-motion';
import { useAccessibleAnimations } from '../../lib/animations';
import { ShieldCheck, Lock, Cpu, Cloud, LucideIcon } from 'lucide-react';

export interface ClientPartner {
  name: string;
  color: string;
  logo: string;
}

export interface EnterpriseCert {
  title: string;
  category: string;
  icon: LucideIcon;
  accent: string;
}

const clientPartners: ClientPartner[] = [
  { name: 'Flower Paradise', color: '#e879a0', logo: '/images/flower_paradise_logo.png' },
  { name: 'Ash Groove', color: '#60a5a0', logo: '/images/ash_groove_logo.png' },
  { name: 'Amdip Traders', color: '#f59e0b', logo: '/images/amdip_traders_logo.png' },
  { name: 'Ilford Kitchens', color: '#ef4444', logo: '/images/ilford_kitchens_logo.png' },
  { name: 'NEX', color: '#3b82f6', logo: '/nex.png' },
  { name: 'Mobile Bitz', color: '#8b5cf6', logo: '/images/mobile_bitz_logo.png' },
  { name: 'Kingsburry School', color: '#10b981', logo: '/images/kingsburry_school_logo.png' },
];

const enterpriseCertifications: EnterpriseCert[] = [
  { title: 'ISO 27001:2022', category: 'Information Security', icon: ShieldCheck, accent: 'text-emerald-400' },
  { title: 'SOC 2 Type II', category: 'Compliance & Audit', icon: Lock, accent: 'text-sky-400' },
  { title: 'AWS Cloud Partner', category: 'Cloud Infrastructure', icon: Cloud, accent: 'text-amber-400' },
  { title: 'Microsoft Solution Partner', category: 'Enterprise Apps', icon: Cpu, accent: 'text-indigo-400' },
];

export default function Partners() {
  const { prefersReducedMotion, fadeUp } = useAccessibleAnimations();

  return (
    <section className="border-y border-white/5 bg-slate-950 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-950/20 via-slate-950 to-indigo-950/20 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 mb-12 relative z-10">
        <motion.p {...fadeUp} className="text-center text-xs font-bold uppercase tracking-[0.35em] text-sky-400 mb-3">
          ENTERPRISE TRUST & COMPLIANCE
        </motion.p>
        <motion.h2 {...fadeUp} className="text-center text-2xl sm:text-4xl font-black text-white tracking-tight mb-10">
          Trusted By Global Enterprises & Technology Leaders
        </motion.h2>

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

      <div className="relative overflow-hidden pt-2 pb-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className={`flex ${prefersReducedMotion ? '' : 'animate-marquee'}`} style={{ width: 'max-content' }}>
          {[...clientPartners, ...clientPartners].map((partner, index) => (
            <div key={index} className="mx-4 flex-shrink-0 group">
              <div className="relative flex items-center justify-center p-4 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md hover:border-sky-400/40 hover:bg-slate-900 transition-all duration-300">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  className="h-12 sm:h-14 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
