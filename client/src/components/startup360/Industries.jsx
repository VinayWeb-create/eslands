import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE, SectionHeading } from './primitives';
import { industries } from './data';

/* ── Unique animated illustration per industry ─────────── */
function Illustration({ id, color }) {
  const common = { viewBox: '0 0 200 140', className: 'h-full w-full', 'aria-hidden': true, fill: 'none', stroke: color, strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (id) {
    case 'healthcare':
      return (<svg {...common}><path d="M10 80 H60 L72 50 L86 110 L100 30 L114 95 L124 80 H190" className="s360-draw" pathLength="1" /><circle cx="100" cy="30" r="4" fill={color} className="s360-blink" /></svg>);
    case 'education':
      return (<svg {...common}><path d="M100 40 L40 60 L100 80 L160 60 Z" /><path d="M60 68 V95 C80 108 120 108 140 95 V68" /><path d="M160 60 V92" /><circle cx="160" cy="96" r="4" fill={color} className="s360-bob" /><g className="s360-float-slow"><path d="M30 30 h20 M150 25 h18 M40 115 h16" opacity=".5" /></g></svg>);
    case 'retail':
      return (<svg {...common}>{[0, 1, 2, 3, 4].map((i) => <rect key={i} x={30 + i * 30} y={120 - (30 + i * 15)} width="18" height={30 + i * 15} rx="3" className="s360-grow" style={{ animationDelay: `${i * 0.15}s`, transformOrigin: `${39 + i * 30}px 120px` }} />)}<path d="M20 120 H185" /></svg>);
    case 'manufacturing':
      return (<svg {...common}><g className="s360-gear" style={{ transformOrigin: '75px 70px' }}><circle cx="75" cy="70" r="22" /><circle cx="75" cy="70" r="7" />{Array.from({ length: 8 }).map((_, i) => { const a = (i / 8) * Math.PI * 2; return <path key={i} d={`M${75 + Math.cos(a) * 22} ${70 + Math.sin(a) * 22} L${75 + Math.cos(a) * 31} ${70 + Math.sin(a) * 31}`} strokeWidth="5" />; })}</g><g className="s360-gear s360-gear--rev" style={{ transformOrigin: '128px 52px' }}><circle cx="128" cy="52" r="14" />{Array.from({ length: 6 }).map((_, i) => { const a = (i / 6) * Math.PI * 2; return <path key={i} d={`M${128 + Math.cos(a) * 14} ${52 + Math.sin(a) * 14} L${128 + Math.cos(a) * 21} ${52 + Math.sin(a) * 21}`} strokeWidth="4" />; })}</g><path d="M20 120 H180" /></svg>);
    case 'construction':
      return (<svg {...common}><path d="M50 125 V25 H160 M50 40 L80 25" /><path d="M50 25 L150 25" /><g className="s360-swing" style={{ transformOrigin: '130px 25px' }}><path d="M130 25 V70" strokeWidth="1.5" /><rect x="118" y="70" width="24" height="16" rx="2" fill={`${color}33`} /></g>{[0, 1, 2].map((i) => <rect key={i} x="78" y={105 - i * 20} width="34" height="18" rx="2" className="s360-stack" style={{ animationDelay: `${i * 0.5}s` }} />)}<path d="M20 125 H185" /></svg>);
    case 'finance':
      return (<svg {...common}>{[[30, 70, 95, 60, 88], [55, 60, 85, 52, 78], [80, 40, 72, 30, 65], [105, 50, 80, 45, 58], [130, 30, 60, 22, 40], [155, 20, 48, 12, 30]].map(([x, top, bot, hi, lo], i) => <g key={x} className="s360-pop" style={{ animationDelay: `${i * 0.12}s` }}><path d={`M${x} ${hi} V${bot + 10}`} strokeWidth="1.5" /><rect x={x - 6} y={top} width="12" height={bot - top} rx="2" fill={i % 3 === 2 ? 'transparent' : `${color}55`} /></g>)}<path d="M20 125 H185" /></svg>);
    case 'realestate':
      return (<svg {...common}><path d="M40 125 V60 L80 35 L120 60 V125" /><path d="M120 125 V45 H170 V125" />{[0, 1, 2, 3].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={130 + c * 20} y={55 + r * 17} width="10" height="9" rx="1" fill={color} className="s360-blink" style={{ animationDelay: `${(r + c) * 0.4}s` }} />))}<rect x="70" y="95" width="20" height="30" /><path d="M20 125 H185" /></svg>);
    case 'hospital':
      return (<svg {...common}><rect x="60" y="30" width="80" height="95" rx="4" /><g className="s360-heartbeat" style={{ transformOrigin: '100px 62px' }}><path d="M100 48 V76 M86 62 H114" strokeWidth="6" /></g><rect x="88" y="100" width="24" height="25" /><path d="M20 125 H185" /><path d="M150 80 h30 M20 70 h30" opacity=".4" className="s360-dash-move" /></svg>);
    case 'travel':
      return (<svg {...common}><path d="M20 110 C 60 20, 140 20, 180 100" strokeDasharray="4 6" opacity=".5" /><g><path d="M-8 -3 L8 0 L-8 3 L-5 0 Z" fill={color} stroke="none"><animateMotion dur="4s" repeatCount="indefinite" rotate="auto" path="M20 110 C 60 20, 140 20, 180 100" /></path></g><circle cx="20" cy="110" r="4" fill={color} /><circle cx="180" cy="100" r="4" fill={color} /></svg>);
    default:
      return null;
  }
}

/* ── Industry-specific dashboard preview ───────────────── */
function MiniChart({ data, type, color }) {
  const max = Math.max(...data);
  const w = 280; const h = 90; const step = w / (data.length - 1);
  if (type === 'bar' || type === 'candle') {
    const bw = w / data.length - 8;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full" aria-hidden="true">
        {data.map((v, i) => {
          const bh = (v / max) * (h - 8);
          const up = i === 0 || v >= data[i - 1];
          const fill = type === 'candle' ? (up ? '#10B981' : '#EF4444') : color;
          return <motion.rect key={i} x={i * (bw + 8) + 4} width={bw} rx="3" fill={fill} fillOpacity={type === 'candle' ? 0.85 : 0.25 + (i / data.length) * 0.75} initial={{ height: 0, y: h }} animate={{ height: bh, y: h - bh }} transition={{ delay: i * 0.06, duration: 0.6, ease: EASE }} />;
        })}
      </svg>
    );
  }
  if (type === 'progress') {
    return (
      <div className="space-y-2.5 py-1" aria-hidden="true">
        {['Foundation', 'Structure', 'MEP', 'Finishing'].map((l, i) => (
          <div key={l}>
            <div className="flex justify-between text-[11px] text-[var(--color-text-subtle)]"><span>{l}</span><span>{Math.max(8, 100 - i * 24)}%</span></div>
            <div className="mt-1 h-1.5 rounded-full bg-[var(--color-border)]"><motion.div className="h-full rounded-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${Math.max(8, 100 - i * 24)}%` }} transition={{ delay: i * 0.1, duration: 0.8 }} /></div>
          </div>
        ))}
      </div>
    );
  }
  const pts = data.map((v, i) => `${i * step},${h - (v / max) * (h - 10)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full" aria-hidden="true">
      <defs><linearGradient id={`s360g-${color.slice(1)}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={color} stopOpacity="0.35" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <motion.polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#s360g-${color.slice(1)})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
      <motion.polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: EASE }} />
    </svg>
  );
}

export default function Industries() {
  const [active, setActive] = useState(industries[0].id);
  const ind = industries.find((i) => i.id === active);

  return (
    <section aria-labelledby="s360-ind-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="s360-ind-title" eyebrow="Industry solutions" title="Built for the market you're entering." sub="Pick an industry to see the kind of product and dashboard we would ship for a startup in that space." />

        <div role="tablist" aria-label="Industries" className="scrollbar-hide -mx-4 mt-12 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
          {industries.map((i) => {
            const on = i.id === active;
            const Icon = i.icon;
            return (
              <button key={i.id} type="button" role="tab" aria-selected={on} aria-controls="s360-ind-panel" onClick={() => setActive(i.id)} className={`s360-ind-pill ${on ? 's360-ind-pill--on' : ''}`} style={{ '--c': i.color }}>
                <Icon size={15} aria-hidden="true" /> {i.name}
              </button>
            );
          })}
        </div>

        <div id="s360-ind-panel" role="tabpanel" className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div key={ind.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45, ease: EASE }} className="s360-ind-stage" style={{ '--c': ind.color }}>
              <div className="flex flex-col justify-between p-7 sm:p-10">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold" style={{ background: `${ind.color}18`, color: ind.color }}><ind.icon size={13} /> {ind.name}</span>
                  <h3 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-[var(--color-text)]">{ind.pitch}</h3>
                </div>
                <div className="mt-8 h-44 sm:h-52"><Illustration id={ind.id} color={ind.color} /></div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="s360-dash" aria-label={`${ind.name} sample dashboard`}>
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
                    <div className="flex gap-1.5" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></div>
                    <span className="text-[11px] font-semibold text-[var(--color-text-subtle)]">{ind.name.toLowerCase()}.dashboard · sample</span>
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />Live</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-4">
                    {ind.kpis.map(([k, v], i) => (
                      <motion.div key={k} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="rounded-xl bg-[var(--color-bg-surface)] p-3">
                        <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-subtle)]">{k}</p>
                        <p className="mt-1 font-display text-lg font-extrabold text-[var(--color-text)] sm:text-xl">{v}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="px-4 pb-4">
                    <p className="mb-2 text-[11px] font-semibold text-[var(--color-text-subtle)]">Last 7 periods</p>
                    <MiniChart data={ind.chart} type={ind.chartType} color={ind.color} />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
