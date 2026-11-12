import type { IndustryId } from '@/content/startup360';

/**
 * Hand-built, animated SVG illustrations — one per industry.
 * Pure SVG + SMIL so they cost nothing in JS and respect `currentColor`.
 */
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export function IndustryIllustration({ id }: { id: IndustryId }) {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full" aria-hidden>
      {illustrations[id]}
    </svg>
  );
}

const illustrations: Record<IndustryId, React.ReactNode> = {
  healthcare: (
    <g>
      <rect x="30" y="20" width="140" height="100" rx="14" {...stroke} opacity={0.35} />
      <path d="M40 75 H75 L85 50 L97 100 L109 60 L117 75 H160" {...stroke} stroke="var(--teal)" strokeWidth={3} strokeDasharray="220" strokeDashoffset="220">
        <animate attributeName="stroke-dashoffset" values="220;0;0;-220" keyTimes="0;0.5;0.7;1" dur="2.6s" repeatCount="indefinite" />
      </path>
      <g transform="translate(150 34)">
        <path d="M0 -6 V6 M-6 0 H6" {...stroke} stroke="var(--danger)" strokeWidth={3}>
          <animateTransform attributeName="transform" type="scale" values="1;1.25;1" dur="1.3s" repeatCount="indefinite" />
        </path>
      </g>
    </g>
  ),
  education: (
    <g>
      <path d="M100 30 L170 58 L100 86 L30 58 Z" {...stroke} stroke="var(--violet)" />
      <path d="M60 70 V98 C80 114 120 114 140 98 V70" {...stroke} opacity={0.6} />
      <path d="M170 58 V92" {...stroke} />
      <circle cx="170" cy="96" r="4" fill="var(--brand)">
        <animate attributeName="cy" values="96;102;96" dur="1.6s" repeatCount="indefinite" />
      </circle>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={70 + i * 30} cy="20" r="3" fill="var(--brand)">
          <animate attributeName="opacity" values="0;1;0" dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          <animate attributeName="cy" values="28;10" dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </g>
  ),
  retail: (
    <g>
      <path d="M30 35 H48 L62 95 H150 L165 50 H55" {...stroke} />
      <circle cx="72" cy="110" r="7" {...stroke} />
      <circle cx="140" cy="110" r="7" {...stroke} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={75 + i * 24} y="58" width="18" height="18" rx="4" fill="var(--brand)" opacity={0.85}>
          <animate attributeName="y" values="-20;58;58" keyTimes="0;0.35;1" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
        </rect>
      ))}
    </g>
  ),
  manufacturing: (
    <g>
      <g transform="translate(80 70)">
        <g>
          <circle r="26" {...stroke} stroke="var(--violet)" strokeDasharray="10 6" strokeWidth={8} />
          <circle r="10" {...stroke} />
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
        </g>
      </g>
      <g transform="translate(130 50)">
        <g>
          <circle r="16" {...stroke} stroke="var(--brand)" strokeDasharray="7 5" strokeWidth={7} />
          <circle r="6" {...stroke} />
          <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="3.7s" repeatCount="indefinite" />
        </g>
      </g>
      <path d="M20 118 H180" {...stroke} opacity={0.4} />
      <rect x="20" y="108" width="16" height="10" rx="2" fill="var(--teal)">
        <animate attributeName="x" values="20;164" dur="3s" repeatCount="indefinite" />
      </rect>
    </g>
  ),
  construction: (
    <g>
      <path d="M50 125 V25 H160 M50 25 L70 40 M150 25 V45" {...stroke} />
      <path d="M50 45 H70 M50 65 H70 M50 85 H70 M50 105 H70" {...stroke} opacity={0.4} />
      <line x1="150" y1="45" x2="150" y2="70" {...stroke} stroke="var(--brand)">
        <animate attributeName="y2" values="55;85;55" dur="3s" repeatCount="indefinite" />
      </line>
      <rect x="138" y="70" width="24" height="12" rx="2" fill="var(--brand)">
        <animate attributeName="y" values="55;85;55" dur="3s" repeatCount="indefinite" />
      </rect>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={95 + (i % 2) * 26} y={110 - Math.floor(i / 2) * 16} width="24" height="14" rx="2" fill="var(--violet)" opacity={0.7}>
          <animate attributeName="opacity" values="0;0.8" dur="0.5s" begin={`${i * 0.6}s`} fill="freeze" />
        </rect>
      ))}
    </g>
  ),
  finance: (
    <g>
      {[
        [40, 70, 95, true],
        [62, 55, 85, true],
        [84, 60, 100, false],
        [106, 40, 75, true],
        [128, 30, 65, true],
        [150, 35, 58, false],
      ].map(([x, top, bottom, up], i) => (
        <g key={i}>
          <line x1={(x as number) + 6} x2={(x as number) + 6} y1={(top as number) - 8} y2={(bottom as number) + 8} stroke="currentColor" opacity={0.4} />
          <rect x={x as number} y={top as number} width="12" height={(bottom as number) - (top as number)} rx="2" fill={up ? 'var(--teal)' : 'var(--danger)'}>
            <animate attributeName="height" values={`0;${(bottom as number) - (top as number)}`} dur="0.8s" begin={`${i * 0.15}s`} fill="freeze" />
          </rect>
        </g>
      ))}
      <path d="M30 110 L70 92 L110 98 L170 40" {...stroke} stroke="var(--brand)" strokeDasharray="200" strokeDashoffset="200">
        <animate attributeName="stroke-dashoffset" values="200;0" dur="2s" fill="freeze" />
      </path>
    </g>
  ),
  realestate: (
    <g>
      <path d="M40 120 V60 L80 35 L120 60 V120" {...stroke} />
      <path d="M120 120 V45 H165 V120" {...stroke} opacity={0.6} />
      <path d="M25 120 H180" {...stroke} />
      {[
        [60, 70], [88, 70], [60, 92], [88, 92], [130, 58], [148, 58], [130, 78], [148, 78], [130, 98], [148, 98],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="12" height="12" rx="2" fill="var(--brand)">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="3s" begin={`${(i * 0.37) % 3}s`} repeatCount="indefinite" />
        </rect>
      ))}
    </g>
  ),
  hospital: (
    <g>
      <rect x="45" y="30" width="110" height="90" rx="8" {...stroke} />
      <path d="M100 45 V75 M85 60 H115" {...stroke} stroke="var(--danger)" strokeWidth={5} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={58 + (i % 4) * 22} y={88 + Math.floor(i / 4) * 14} width="16" height="9" rx="2" fill={i % 3 === 0 ? 'var(--line-strong)' : 'var(--teal)'}>
          <animate attributeName="opacity" values="1;0.3;1" dur="4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
        </rect>
      ))}
    </g>
  ),
  travel: (
    <g>
      <circle cx="100" cy="80" r="45" {...stroke} opacity={0.35} />
      <path d="M55 80 H145 M100 35 C80 55 80 105 100 125 C120 105 120 55 100 35" {...stroke} opacity={0.35} />
      <path id="travel-arc" d="M30 110 Q100 -10 170 100" {...stroke} stroke="var(--violet)" strokeDasharray="4 6" />
      <g>
        <path d="M-8 0 L8 0 M0 -2 L-4 -8 M0 2 L-4 8" {...stroke} stroke="var(--brand)" strokeWidth={3} />
        <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
          <mpath href="#travel-arc" />
        </animateMotion>
      </g>
    </g>
  ),
};
