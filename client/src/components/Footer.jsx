import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../lib/api';
import Logo from './brand/Logo';

const serviceLinks = [
  { label: 'Web Development',       href: '/services#web-development' },
  { label: 'Mobile Development',    href: '/services#mobile-development' },
  { label: 'Software Development',  href: '/services#software-development' },
  { label: 'SEO & Marketing',       href: '/services#seo-marketing' },
  { label: 'Networking Solutions',  href: '/services#networking' },
  { label: 'Website Redesign',      href: '/services#redesign' },
  { label: 'E-commerce Solutions',  href: '/services#ecommerce' },
  { label: 'Branding & Identity',   href: '/services#branding' },
];

const companyLinks = [
  { label: 'Home',          href: '/' },
  { label: 'Products',      href: '/products' },
  { label: 'About Us',      href: '/about' },
  { label: 'Careers',       href: '/careers' },
  { label: 'Contact Us',    href: '/contact' },
  { label: 'Privacy Policy',href: '/contact' },
  { label: 'Terms of Service', href: '/contact' },
];

const socials = [
  { icon: Facebook,  href: 'https://facebook.com',  label: 'Facebook' },
  { icon: Twitter,   href: 'https://twitter.com',   label: 'Twitter / X' },
  { icon: Linkedin,  href: 'https://linkedin.com',  label: 'LinkedIn' },
];

export default function Footer() {
  const [email, setEmail]         = useState('');
  const [submitting, setSubmitting] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/api/newsletter', { email });
      toast.success('Subscribed to Esland Enterprise Insights!');
      setEmail('');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Unable to subscribe right now.');
    } finally {
      setSubmitting(false);
    }
  };

  const linkCls = 'text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm font-medium inline-block';

  return (
    <footer className="relative overflow-hidden text-slate-400" style={{ background: '#060C1A', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      {/* Ambient gradient */}
      <div className="pointer-events-none absolute left-1/3 bottom-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(21,88,214,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-14 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12">

          {/* Col 1 — Branding */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block">
              <Logo variant="horizontal" theme="dark" height={48} />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Esland IT Solutions delivers custom software, cloud architectures, and zero-trust security networks that accelerate digital transformation and scale business value.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 hover:border-primary-400/50 hover:bg-primary-500/10 hover:text-primary-400 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            {/* Certification tags */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-success-500/25 bg-success-500/10 text-success-400 text-[11px] font-bold">
                <ShieldCheck size={13} /> ISO 27001
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary-400/25 bg-primary-500/10 text-primary-400 text-[11px] font-bold">
                <ShieldCheck size={13} /> SOC 2 Type II
              </span>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div className="lg:col-span-3">
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Enterprise Solutions
            </h3>
            <div className="mb-4 w-7 h-[2px] rounded-full" style={{ background: 'linear-gradient(90deg, #1558D6, #00B4E6)' }} />
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className={linkCls}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Company
            </h3>
            <div className="mb-4 w-7 h-[2px] rounded-full" style={{ background: 'linear-gradient(90deg, #1558D6, #00B4E6)' }} />
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className={linkCls}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact + Newsletter */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: 'rgba(255,255,255,0.9)' }}>
                Global Headquarters
              </h3>
              <div className="mb-4 w-7 h-[2px] rounded-full" style={{ background: 'linear-gradient(90deg, #1558D6, #00B4E6)' }} />
              <div className="space-y-4 text-sm text-slate-400">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-primary-400" />
                  <span className="leading-relaxed">
                    Suite-G, Weller House,<br />
                    58–60 Longbridge Rd,<br />
                    Barking, London, IG11 8RT
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={15} className="shrink-0 text-primary-400" />
                  <a href="tel:02038190333" className="hover:text-white transition-colors">02038190333</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={15} className="shrink-0 text-primary-400" />
                  <a href="mailto:info@eslanditsolutions.com" className="hover:text-white transition-colors break-all">
                    info@eslanditsolutions.com
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: 'rgba(255,255,255,0.85)' }}>
                Enterprise Insights Newsletter
              </h4>
              <form className="flex gap-2" onSubmit={subscribe}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Business email"
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:bg-white/[0.08] transition-all"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 px-4 py-2.5 text-sm font-bold text-white shadow hover:shadow-glow-sm disabled:opacity-50 transition-all"
                >
                  {submitting ? '…' : <ArrowRight size={16} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)' }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 text-center text-xs text-slate-500 sm:flex-row sm:justify-between sm:px-10 lg:px-14">
          <p style={{ color: 'rgba(255,255,255,0.35)' }}>© {new Date().getFullYear()} Esland IT Solutions Ltd. All rights reserved. Registered in England & Wales.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-success-400 font-semibold">
              <ShieldCheck size={13} /> ISO 27001 & SOC 2 Audited
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-primary-400 font-semibold">99.99% Uptime SLA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
