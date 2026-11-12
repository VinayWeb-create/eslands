'use client';

import { motion } from 'framer-motion';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { growthEngine } from '@/content/startup360';
import { useInViewport } from '@/hooks/useInViewport';
import { cn } from '@/lib/utils';

function Connector({ index }: { index: number }) {
  return (
    <div aria-hidden className="relative h-10 w-px self-center md:h-px md:w-auto md:flex-1 md:self-auto md:mt-8">
      <span className="absolute inset-0 bg-gradient-to-b from-brand/60 to-violet/60 md:bg-gradient-to-r" />
      {[0, 1, 2].map((k) => (
        <span
          key={k}
          className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_10px_var(--brand)] [animation:flow-y_1.6s_linear_infinite] md:left-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:[animation:flow-x_1.6s_linear_infinite]"
          style={{ animationDelay: `${index * 0.15 + k * 0.53}s` }}
        />
      ))}
    </div>
  );
}

const fmt = new Intl.NumberFormat('en-IN');

/**
 * The growth engine: a closed loop from website traffic to revenue. Packets
 * flow continuously between stages and a simulated readout ticks while the
 * section is on screen.
 */
export function GrowthEngine() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInViewport(ref);
  const [tick, setTick] = useState(0);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const id = window.setInterval(() => {
      setTick((t) => t + 1);
      setPulse((p) => (p + 1) % growthEngine.length);
    }, 700);
    return () => window.clearInterval(id);
  }, [visible]);

  const visitors = 18_240 + tick * 37;
  const readout = [
    visitors,
    Math.round(visitors * 0.071),
    Math.round(visitors * 0.052),
    Math.round(visitors * 0.038),
    Math.round(visitors * 0.021),
    Math.round(visitors * 0.021 * 1.8),
    Math.round(visitors * 0.021 * 0.34 * 4_900),
  ];

  return (
    <Section id="growth-engine" labelledBy="engine-title">
      <SectionHeading
        id="engine-title"
        eyebrow="Startup growth engine"
        title={
          <>
            Traffic in. <span className="text-gradient">Revenue out.</span> Always running.
          </>
        }
        description="Website, CRM, marketing, WhatsApp, AI and analytics wired into one loop — so every visitor has a path to becoming revenue, and every rupee of revenue teaches the engine something."
      />

      <div ref={ref} className="border-beam relative mt-16 overflow-hidden rounded-[32px] bg-surface/70 p-6 shadow-soft backdrop-blur-xl sm:p-10">
        <div aria-hidden className="dot-bg absolute inset-0 opacity-50" />
        <ol className="relative flex flex-col items-stretch md:flex-row md:items-start" aria-label="Growth engine stages">
          {growthEngine.map((stage, i) => {
            const Icon = stage.icon;
            const hot = pulse === i;
            const isRevenue = stage.id === 'revenue';
            return (
              <Fragment key={stage.id}>
                <li className="flex items-center gap-4 md:w-[13%] md:shrink-0 md:flex-col md:gap-3 md:text-center">
                  <motion.span
                    animate={{ scale: hot ? 1.12 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                    className={cn(
                      'relative grid size-16 shrink-0 place-items-center rounded-2xl border transition-colors duration-300',
                      isRevenue ? 'border-transparent bg-fg text-bg' : 'border-line bg-surface',
                      hot && !isRevenue && 'border-brand text-brand',
                    )}
                    style={hot ? { boxShadow: '0 0 40px -6px var(--brand)' } : undefined}
                  >
                    <Icon className="size-6" aria-hidden />
                    {hot ? <span aria-hidden className="absolute inset-0 rounded-2xl border border-brand animate-pulse-ring" /> : null}
                  </motion.span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{stage.label}</span>
                    <span className="block font-mono text-[11px] text-subtle">{stage.stat}</span>
                    <span className="mt-1 block font-mono text-sm tabular-nums text-muted" aria-hidden>
                      {isRevenue ? `₹${fmt.format(readout[i]!)}` : fmt.format(readout[i]!)}
                    </span>
                  </span>
                </li>
                {i < growthEngine.length - 1 ? <Connector index={i} /> : null}
              </Fragment>
            );
          })}
        </ol>

        {/* Feedback loop */}
        <div className="relative mt-10 hidden md:block" aria-hidden>
          <svg viewBox="0 0 1000 60" className="h-14 w-full" preserveAspectRatio="none">
            <path id="loop-path" d="M 985 0 C 985 55, 940 55, 900 55 L 100 55 C 60 55, 15 55, 15 0" fill="none" stroke="var(--line-strong)" strokeDasharray="4 6" className="animate-dash" vectorEffect="non-scaling-stroke" />
            {[0, 1, 2, 3].map((k) => (
              <circle key={k} r="4" fill="var(--violet)">
                <animateMotion dur="5s" begin={`${k * 1.25}s`} repeatCount="indefinite">
                  <mpath href="#loop-path" />
                </animateMotion>
              </circle>
            ))}
          </svg>
          <p className="absolute inset-x-0 bottom-0 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
            Insights feed back into the website · the loop compounds
          </p>
        </div>

        <p className="relative mt-6 text-center text-[11px] text-subtle md:mt-4">Live simulation for illustration — real numbers depend on your market and offer.</p>
      </div>
    </Section>
  );
}
