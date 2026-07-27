import React from 'react';

export default function LogoIcon({ size = 38, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 ${className}`}
      aria-label="Esland Logo Icon"
    >
      <defs>
        <linearGradient id="esland-icon-arc1" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="50%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        <linearGradient id="esland-icon-arc2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0369a1" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        <linearGradient id="esland-text-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>

        <filter id="icon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Sweeping Orbital Arc */}
      <path
        d="M 28 82 C 12 65 18 35 48 18 C 72 4 92 20 90 38 C 88 56 65 85 35 92 C 20 95 12 88 28 82 Z"
        fill="url(#esland-icon-arc1)"
        filter="url(#icon-glow)"
      />

      {/* Inner Orbit Arc */}
      <path
        d="M 32 75 C 22 62 25 40 48 26 C 68 14 82 26 80 38 C 78 52 58 76 34 82 C 25 84 22 79 32 75 Z"
        fill="url(#esland-icon-arc2)"
        opacity="0.85"
      />

      {/* Bold Monogram 'E' inside */}
      <text
        x="38"
        y="62"
        fill="url(#esland-text-grad)"
        fontSize="44"
        fontWeight="900"
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="-1"
      >
        E
      </text>
    </svg>
  );
}
