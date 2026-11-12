'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, FileLock2, Mail, MessageCircle, Phone, Timer } from 'lucide-react';
import { useTheme } from 'next-themes';
import { easeOutExpo } from '@/animations/variants';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { consultationHref, site } from '@/lib/site';
import { ParticleField } from './ParticleField';

const promises = [
  { icon: Timer, title: 'Free 30-minute strategy review', text: 'An actionable technical blueprint, no obligation.' },
  { icon: FileLock2, title: 'Strict mutual NDA', text: 'Your idea and IP stay 100% yours.' },
  { icon: MessageCircle, title: 'Reply within 2 hours', text: `WhatsApp & founder line · ${site.phone}` },
];

const words = ['Let’s', 'build', 'what’s', 'next.'];

export function FinalCta() {
  const { resolvedTheme } = useTheme();
  return (
    <section id="contact" aria-labelledby="cta-title" className="relative isolate overflow-hidden px-4 py-28 sm:px-6 sm:py-40">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 size-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,var(--brand),var(--violet),var(--teal),var(--brand))] opacity-[0.13] blur-[100px] animate-[beam-spin_20s_linear_infinite]" />
        <ParticleField key={resolvedTheme ?? 'init'} className="absolute inset-0 size-full" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted"
        >
          <span className="size-1.5 animate-pulse rounded-full bg-teal" /> Taking on new founders this month
        </motion.p>

        <h2 id="cta-title" className="mt-8 font-display text-[clamp(3.25rem,11vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
          {words.map((w, i) => (
            <span key={w} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
              <motion.span
                className={i >= 2 ? 'text-gradient inline-block' : 'inline-block'}
                initial={{ y: '105%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: easeOutExpo }}
              >
                {w}
                {i < words.length - 1 ? ' ' : ''}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-pretty text-muted"
        >
          Whether you’re validating an idea or scaling an existing product, tell us where you are. We’ll map registration coordination,
          technology, marketing and growth priorities for your stage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <MagneticButton href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="h-14 px-8 text-base">
            <MessageCircle className="size-5" aria-hidden /> Start on WhatsApp <ArrowUpRight className="size-4" aria-hidden />
          </MagneticButton>
          <MagneticButton href={consultationHref} variant="secondary" className="h-14 px-7 text-base">
            <Mail className="size-5" aria-hidden /> Book free consultation
          </MagneticButton>
          <MagneticButton href={`tel:${site.phoneE164}`} variant="ghost" className="h-14 px-6 text-base">
            <Phone className="size-5" aria-hidden /> {site.phone}
          </MagneticButton>
        </motion.div>

        <ul className="mx-auto mt-16 grid max-w-4xl gap-3 text-left sm:grid-cols-3">
          {promises.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: easeOutExpo }}
                className="glass rounded-2xl p-5"
              >
                <Icon className="size-5 text-brand" aria-hidden />
                <p className="mt-3 text-sm font-semibold">{p.title}</p>
                <p className="mt-1 text-sm text-muted">{p.text}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
