import { motion, useReducedMotion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { SectionHeading, reveal } from './primitives';
import { comparisonPoints, fragmentedPains, fragmentedVendors } from './data';

/* Pairs of vendors that try (and fail) to talk to each other. */
const brokenLinks = [[0, 1], [1, 2], [2, 4], [3, 0], [5, 1], [5, 3], [4, 3]];

function Fragmented() {
  const reduce = useReducedMotion();
  return (
    <div className="s360-compare-stage s360-compare-stage--bad" role="img" aria-label="Six disconnected vendors with broken communication, overdue invoices and delays">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {brokenLinks.map(([a, b], i) => {
          const A = fragmentedVendors[a]; const B = fragmentedVendors[b];
          const mx = (A.x + B.x) / 2; const my = (A.y + B.y) / 2;
          const gap = 0.18;
          return (
            <g key={i}>
              <line x1={A.x} y1={A.y} x2={mx - (B.x - A.x) * gap / 2} y2={my - (B.y - A.y) * gap / 2} stroke="#F87171" strokeWidth="0.4" strokeDasharray="1.2 1.4" vectorEffect="non-scaling-stroke" />
              <line x1={mx + (B.x - A.x) * gap / 2} y1={my + (B.y - A.y) * gap / 2} x2={B.x} y2={B.y} stroke="#F87171" strokeWidth="0.4" strokeDasharray="1.2 1.4" vectorEffect="non-scaling-stroke" />
            </g>
          );
        })}
      </svg>
      {brokenLinks.map(([a, b], i) => {
        const A = fragmentedVendors[a]; const B = fragmentedVendors[b];
        return (
          <span key={`x${i}`} className="s360-break" style={{ left: `${(A.x + B.x) / 2}%`, top: `${(A.y + B.y) / 2}%` }} aria-hidden="true">
            <X size={10} strokeWidth={3} />
          </span>
        );
      })}
      {fragmentedVendors.map((v, i) => (
        <motion.span
          key={v.label}
          className="s360-vendor"
          style={{ left: `${v.x}%`, top: `${v.y}%` }}
          animate={reduce ? {} : { x: [0, i % 2 ? 3 : -3, 0], rotate: [0, i % 2 ? -2 : 2, 0] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {v.label}
        </motion.span>
      ))}
      {fragmentedPains.map((p, i) => (
        <motion.span
          key={p.text}
          className={`s360-pain ${i % 2 ? "s360-pain--minor" : ""}`}
          style={p.x > 50 ? { right: `${100 - p.x - 18}%`, top: `${p.y}%` } : { left: `${p.x}%`, top: `${p.y}%` }}
          animate={reduce ? {} : { opacity: [0.55, 1, 0.55], y: [0, -4, 0] }}
          transition={{ duration: 2.6, delay: i * 0.6, repeat: Infinity }}
          aria-hidden="true"
        >
          <AlertTriangle size={11} /> {p.text}
        </motion.span>
      ))}
    </div>
  );
}

function Connected() {
  const reduce = useReducedMotion();
  return (
    <div className="s360-compare-stage s360-compare-stage--good" role="img" aria-label="The same capabilities connected to one central Startup360 team with data flowing between them">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {fragmentedVendors.map((v, i) => (
          <g key={v.label}>
            <line x1="50" y1="50" x2={v.x} y2={v.y} stroke="#34D399" strokeOpacity="0.35" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
            <line x1="50" y1="50" x2={v.x} y2={v.y} stroke="#10B981" strokeWidth="1.4" strokeDasharray="2 10" vectorEffect="non-scaling-stroke" className={reduce ? '' : 's360-flow'} style={{ animationDelay: `${-i * 0.4}s` }} />
          </g>
        ))}
      </svg>
      <span className="s360-hub" style={{ left: '50%', top: '50%' }}>Startup360 team</span>
      {fragmentedVendors.map((v) => (
        <span key={v.label} className="s360-vendor s360-vendor--good" style={{ left: `${v.x}%`, top: `${v.y}%` }}>
          {v.label.replace(/ (agency|shop|firm|vendor)$/i, '')}
        </span>
      ))}
    </div>
  );
}

function HealthBar({ value, good }) {
  return (
    <div className="mt-5">
      <div className="flex justify-between text-xs font-semibold">
        <span className="text-[var(--color-text-subtle)]">{good ? 'Founder focus' : 'Founder stress'}</span>
        <span className={good ? 'text-emerald-600' : 'text-red-500'}>{good ? 'High' : 'Very high'}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--color-border)]">
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeOut' }} className={`h-full rounded-full ${good ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-gradient-to-r from-amber-400 to-red-500'}`} />
      </div>
    </div>
  );
}

export default function Comparison() {
  return (
    <section aria-labelledby="s360-compare-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="s360-compare-title" eyebrow="Why one ecosystem wins"
          title={<>Six vendors don't make <span className="ui-gradient-text">one company.</span></>}
          sub="Most founders stitch together an agency for design, a shop for code, a firm for marketing and an accountant for compliance. Every gap between them costs weeks."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <motion.div {...reveal()} className="s360-compare-card">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/10 text-red-500"><X size={18} /></span>
              <div>
                <h3 className="font-display text-lg font-extrabold text-[var(--color-text)]">Traditional agencies</h3>
                <p className="text-sm text-[var(--color-text-subtle)]">Disconnected teams, invoices and timelines</p>
              </div>
            </div>
            <Fragmented />
            <HealthBar value={86} />
          </motion.div>

          <motion.div {...reveal(0.12)} className="s360-compare-card s360-compare-card--good">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600"><CheckCircle2 size={18} /></span>
              <div>
                <h3 className="font-display text-lg font-extrabold text-[var(--color-text)]">Startup360</h3>
                <p className="text-sm text-[var(--color-text-subtle)]">One team, one roadmap, one contract</p>
              </div>
            </div>
            <Connected />
            <HealthBar value={92} good />
          </motion.div>
        </div>

        <motion.dl {...reveal(0.1)} className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {comparisonPoints.map((p) => (
            <div key={p.label} className="s360-mini-stat">
              <dt className="text-xs font-semibold text-[var(--color-text-subtle)]">{p.label}</dt>
              <dd className="mt-2 flex items-baseline gap-2">
                <span className="text-sm font-semibold text-red-400 line-through decoration-2">{p.before}</span>
                <span className="font-display text-2xl font-extrabold text-[var(--color-text)]">{p.after}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
