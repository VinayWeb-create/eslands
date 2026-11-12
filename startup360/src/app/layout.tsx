import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Instrument_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import { CursorGlow } from '@/components/providers/CursorGlow';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { site } from '@/lib/site';
import './globals.css';

const sans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const display = Instrument_Sans({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s` },
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f5f1' },
    { media: '(prefers-color-scheme: dark)', color: '#05070d' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <a href="#main" className="sr-only fixed left-4 top-4 z-[100] rounded-full bg-fg px-4 py-2 text-sm font-semibold text-bg focus:not-sr-only">
            Skip to content
          </a>
          <SmoothScroll />
          <CursorGlow />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
