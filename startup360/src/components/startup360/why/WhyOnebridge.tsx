'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, Code2, Cloud, Megaphone, MessageCircle, Palette, Scale, ShieldCheck, BrainCircuit, Briefcase } from 'lucide-react';
import { fadeUp, stagger, viewportOnce } from '@/animations/variants';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { cities, trustBadges } from '@/content/startup360';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

const squad = [
  { icon: Briefcase, label: 'Strategist' },
  { icon: Palette, label: 'Designer' },
  { icon: Code2, label: 'Engineer' },
  { icon: Cloud, label: 'Cloud' },
  { icon: BrainCircuit, label: 'AI' },
  { icon: Megaphone, label: 'Growth' },
];

function Cell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className={cn('min-h-52', className)}>
      <SpotlightCard className="h-full p-6 sm:p-7">{children}</SpotlightCard>
    </motion.div>
  );
}

export function WhyOnebridge() {
  return (
    <Section id="why" labelledBy="why-title">
      <SectionHeading
        id="why-title"
        eyebrow="Why Onebridge"
        title={
          <>
            A partner that <span className="text-gradient">stays after launch.</span>
          </>
        }
        description={`${site.legalName} is a Hyderabad-based technology consulting and services company. Startup360 brings all of it together so founders work with one accountable team.`}
      />

      <motion.div variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-16 grid auto-rows-[minmax(13rem,auto)] gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* One squad */}
        <Cell className="md:col-span-2 lg:row-span-2">
          <div className="flex h-full flex-col">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">One squad</p>
            <h3 className="mt-3 max-w-sm font-display text-3xl font-semibold tracking-tight">Strategy, design, engineering, cloud, AI and growth — on one backlog.</h3>
            <div className="relative mx-auto my-8 grid aspect-square w-full max-w-[300px] flex-1 place-items-center">
              <span aria-hidden className="absolute inset-[12%] rounded-full border border-dashed border-line-strong" />
              <motion.ul
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, ease: 'linear', repeat: Infinity }}
                aria-label="Disciplines in your squad"
              >
                {squad.map((s, i) => {
                  const a = (i / squad.length) * Math.PI * 2 - Math.PI / 2;
                  const Icon = s.icon;
                  return (
                    <li key={s.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${50 + 38 * Math.cos(a)}%`, top: `${50 + 38 * Math.sin(a)}%` }}>
                      <motion.span
                        animate={{ rotate: -360 }}
                        transition={{ duration: 50, ease: 'linear', repeat: Infinity }}
                        className="glass flex flex-col items-center gap-1 rounded-2xl px-3 py-2 shadow-soft"
                      >
                        <Icon className="size-4 text-brand" aria-hidden />
                        <span className="text-[10px] font-medium">{s.label}</span>
                      </motion.span>
                    </li>
                  );
                })}
              </motion.ul>
              <span className="grid size-24 place-items-center rounded-full bg-fg text-center text-bg shadow-[0_0_60px_-10px_var(--brand)]">
                <span className="text-xs font-semibold leading-tight">
                  1 point of
                  <br />
                  contact
                </span>
              </span>
            </div>
          </div>
        </Cell>

        {/* Since */}
        <Cell>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">Building since</p>
          <AnimatedCounter to={site.foundingYear} from={2000} className="mt-4 block font-display text-6xl font-semibold tracking-tighter" />
          <p className="mt-3 text-sm text-muted">Software, cloud, AI and digital services delivered from Hyderabad.</p>
        </Cell>

        {/* Capabilities */}
        <Cell>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">Capabilities</p>
          <AnimatedCounter to={16} suffix="+" className="text-gradient mt-4 block font-display text-6xl font-semibold tracking-tighter" />
          <p className="mt-3 text-sm text-muted">Integrated pillars — choose a module or activate all of them.</p>
        </Cell>

        {/* MVP timeline */}
        <Cell className="lg:col-span-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">Focused MVP timeline</p>
          <p className="mt-4 font-display text-5xl font-semibold tracking-tighter">
            <AnimatedCounter to={4} /> – <AnimatedCounter to={12} /> <span className="text-2xl text-muted">weeks</span>
          </p>
          <div className="mt-6 grid grid-cols-12 gap-1" aria-hidden>
            {Array.from({ length: 12 }, (_, i) => (
              <motion.span
                key={i}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className={cn('h-8 origin-bottom rounded-md', i < 4 ? 'bg-brand' : 'bg-gradient-to-t from-violet/20 to-violet/60')}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-subtle" aria-hidden>
            <span>Discovery</span>
            <span>Build</span>
            <span>Launch</span>
          </div>
        </Cell>

        {/* Response */}
        <Cell>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">Founder line</p>
          <div className="mt-4 space-y-2" aria-hidden>
            <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-fg/5 px-3 py-2 text-xs">Can we start this week?</div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-teal/15 px-3 py-2 text-xs text-teal"
            >
              Yes — discovery call tomorrow 11 AM ✓✓
            </motion.div>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <MessageCircle className="size-4 text-teal" aria-hidden /> WhatsApp response target: <b className="text-fg">2 hours</b>
          </p>
        </Cell>

        {/* Honest by design */}
        <Cell>
          <Scale className="size-6 text-violet" aria-hidden />
          <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">Honest by design</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            We never promise funding or approvals. Regulated filings go to licensed CA and legal professionals — we coordinate.
          </p>
        </Cell>

        {/* Reach */}
        <Cell className="md:col-span-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">Hyderabad-based · India-wide</p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">In-person in Hyderabad, remote across India.</h3>
          <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
            <ul className="animate-marquee flex w-max gap-2" aria-label="Cities we work with">
              {[...cities, ...cities].map((c, i) => (
                <li key={`${c}-${i}`} aria-hidden={i >= cities.length} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Cell>

        {/* Trust */}
        <Cell className="md:col-span-2 lg:col-span-4">
          <ShieldCheck className="size-6 text-teal" aria-hidden />
          <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">Your idea stays yours.</h3>
          <p className="mt-2 text-sm text-muted">Strict mutual NDA from the first call. Your business logic and IP remain 100% yours.</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {trustBadges.map((b) => (
              <li key={b} className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs font-medium">
                <BadgeCheck className="size-3.5 text-brand" aria-hidden /> {b}
              </li>
            ))}
          </ul>
        </Cell>
      </motion.div>
    </Section>
  );
}
