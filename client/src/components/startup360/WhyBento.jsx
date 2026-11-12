import { motion } from 'framer-motion';
import { Handshake, KeyRound, Gauge, ShieldCheck, Users, Repeat } from 'lucide-react';
import CountUp from '../CountUp';
import { SectionHeading, reveal, useSpotlight } from './primitives';
import { whyMetrics } from './data';

const pillars = [
  { icon: Handshake, title: 'A partner, not a vendor', body: 'One accountable team that sits in your Slack, joins your stand-ups and owns outcomes with you.' },
  { icon: KeyRound, title: 'You own everything', body: 'Code, designs, domains and cloud accounts live in your company from day one.' },
  { icon: Gauge, title: 'Fortnightly releases', body: 'See working software every two weeks, not a big reveal at the end.' },
  { icon: ShieldCheck, title: 'Secure by default', body: 'Security reviews, access control and backups are part of every build.' },
  { icon: Users, title: 'Senior people only', body: 'Strategists, designers and engineers with years of shipped products behind them.' },
  { icon: Repeat, title: 'Flexible engagement', body: 'Start with one stage, add more as you grow, or take it all in-house later.' },
];

function Tile({ className = '', children, delay = 0 }) {
  const spot = useSpotlight();
  return (
    <motion.div {...reveal(delay)} onMouseMove={spot} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className={`ui-bento ${className}`}>
      {children}
    </motion.div>
  );
}

export default function WhyBento() {
  const [m0, m1, m2, m3] = whyMetrics;
  const P = pillars;
  return (
    <section aria-labelledby="s360-why-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="s360-why-title" eyebrow="Why Esland" title="The team behind the companies that ship." />

        <div className="mt-14 grid auto-rows-[minmax(170px,auto)] gap-4 md:grid-cols-4">
          <Tile className="ui-bento--hero md:col-span-2 md:row-span-2">
            <div className="ui-bento__orb" aria-hidden="true" />
            <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-sky-200">Track record</p>
            <p className="relative mt-4 font-display text-6xl font-extrabold tracking-tight text-white sm:text-7xl"><CountUp end={m1.value} suffix={m1.suffix} /></p>
            <p className="relative mt-2 text-lg text-sky-100">{m1.label}</p>
            <p className="relative mt-auto max-w-sm pt-10 text-sm leading-relaxed text-sky-100/80">Web platforms, mobile apps, cloud systems and brands for startups and enterprises across healthcare, retail, education, finance and more.</p>
          </Tile>

          {[m0, m2, m3].map((m, i) => (
            <Tile key={m.label} delay={0.05 * (i + 1)} className={i === 2 ? 'md:col-span-2' : ''}>
              <p className="font-display text-4xl font-extrabold tracking-tight text-[var(--color-text)]"><CountUp end={m.value} suffix={m.suffix} decimals={m.decimals || 0} /></p>
              <p className="mt-2 text-sm font-medium text-[var(--color-text-muted)]">{m.label}</p>
            </Tile>
          ))}

          {P.map((p, i) => (
            <Tile key={p.title} delay={0.04 * i} className={i === 0 || i === 5 ? 'md:col-span-2' : ''}>
              <span className="ui-icon-tile"><p.icon size={20} aria-hidden="true" /></span>
              <h3 className="mt-5 font-display text-lg font-extrabold text-[var(--color-text)]">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-muted)]">{p.body}</p>
            </Tile>
          ))}
        </div>
      </div>
    </section>
  );
}
