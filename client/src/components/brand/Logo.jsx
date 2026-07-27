import React from 'react';

export default function Logo({
  variant = 'horizontal', // 'horizontal' | 'stacked' | 'icon-only'
  theme = 'dark', // 'dark' | 'light'
  className = '',
  height = 54,
}) {
  const isDark = theme === 'dark';

  // Exact Logo Colors
  const textColor = isDark ? '#ffffff' : '#032b69';
  const subtextColor = isDark ? '#e0f2fe' : '#1e293b';
  const primarySwoosh = isDark ? 'url(#swoosh-grad-dark)' : 'url(#swoosh-grad-light)';
  const secondarySwoosh = isDark ? 'url(#swoosh-inner-dark)' : 'url(#swoosh-inner-light)';

  if (variant === 'icon-only') {
    return (
      <svg width={height} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="icon-sw1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="icon-sw2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        <path d="M 28 82 C 12 65 18 35 48 18 C 72 4 92 20 90 38 C 88 56 65 85 35 92 C 20 95 12 88 28 82 Z" fill="url(#icon-sw1)" />
        <path d="M 32 75 C 22 62 25 40 48 26 C 68 14 82 26 80 38 C 78 52 58 76 34 82 C 25 84 22 79 32 75 Z" fill="url(#icon-sw2)" opacity="0.8" />
        <text x="38" y="62" fill="#ffffff" fontSize="42" fontWeight="900" fontFamily="Inter, sans-serif">E</text>
      </svg>
    );
  }

  return (
    <div className={`inline-flex items-center group cursor-pointer select-none ${className}`}>
      <svg
        height={height}
        viewBox="0 0 340 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-auto transition-transform duration-300 group-hover:scale-[1.02]"
        aria-label="Esland IT Solutions Logo"
      >
        <defs>
          {/* Dark Mode Gradients */}
          <linearGradient id="swoosh-grad-dark" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <linearGradient id="swoosh-inner-dark" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>

          {/* Light Mode Gradients */}
          <linearGradient id="swoosh-grad-light" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="swoosh-inner-light" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0c4a6e" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          {/* Glow filter for dark backgrounds */}
          <filter id="swoosh-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Primary Outer Orbital Swoosh Arc (sweeping from bottom left around right to top right) */}
        <path
          d="M 104 98 C 88 116 112 118 160 106 C 220 90 310 50 310 18 C 310 6 240 8 220 12 C 265 10 326 12 320 32 C 312 58 210 106 142 116 C 114 120 96 110 104 98 Z"
          fill={primarySwoosh}
          filter={isDark ? "url(#swoosh-glow)" : undefined}
        />

        {/* 2. Secondary Inner Swoosh Arc */}
        <path
          d="M 112 92 C 102 106 124 108 165 98 C 215 84 290 48 290 22 C 290 14 245 14 230 16 C 265 15 302 18 298 32 C 292 52 205 92 148 102 C 124 106 108 98 112 92 Z"
          fill={secondarySwoosh}
          opacity="0.9"
        />

        {/* 3. Main 'Esland' Wordmark */}
        <text
          x="20"
          y="68"
          fill={textColor}
          fontSize="68"
          fontWeight="900"
          fontFamily="Inter, 'Segoe UI', system-ui, sans-serif"
          letterSpacing="-1.5"
        >
          Esland
        </text>

        {/* 4. Subtext 'IT Solutions' offset below 'land' */}
        <text
          x="142"
          y="92"
          fill={subtextColor}
          fontSize="23"
          fontWeight="700"
          fontFamily="Inter, 'Segoe UI', system-ui, sans-serif"
          letterSpacing="0.5"
        >
          IT Solutions
        </text>
      </svg>
    </div>
  );
}
