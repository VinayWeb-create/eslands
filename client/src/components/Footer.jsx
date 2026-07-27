import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../lib/api';
import Logo from './brand/Logo';

const serviceLinks = [
  { label: 'Web Development', href: '/services#web-development' },
  { label: 'Mobile Development', href: '/services#mobile-development' },
  { label: 'Software Development', href: '/services#software-development' },
  { label: 'SEO & Marketing', href: '/services#seo-marketing' },
  { label: 'Networking Solutions', href: '/services#networking' },
  { label: 'Website Redesign', href: '/services#redesign' },
  { label: 'E-commerce Solutions', href: '/services#ecommerce' },
  { label: 'Branding & Identity', href: '/services#branding' },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const subscribe = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/api/newsletter', { email });
      toast.success('Thank you for subscribing to Esland Enterprise Updates.');
      setEmail('');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to subscribe right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-400 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-64 w-[80vw] rounded-full bg-sky-500/5 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-14 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Col 1: About & Branding */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block">
              <Logo variant="horizontal" descriptor="ENTERPRISE TECHNOLOGY" />
            </Link>
            <p className="text-xs leading-relaxed text-slate-400 font-medium">
              Esland IT Solutions was founded in 2013 by Naresh Pathi, architecting enterprise software development, resilient web applications, and mission-critical cloud IT solutions for global organizations.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-slate-400 hover:border-sky-400 hover:bg-sky-500/10 hover:text-sky-300 transition-all duration-300"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-slate-400 hover:border-sky-400 hover:bg-sky-500/10 hover:text-sky-300 transition-all duration-300"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-slate-400 hover:border-sky-400 hover:bg-sky-500/10 hover:text-sky-300 transition-all duration-300"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="lg:col-span-3">
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-white">
              Enterprise Solutions
            </h3>
            <ul className="space-y-3 text-xs text-slate-400 font-medium">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="hover:text-sky-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-white">
              Company
            </h3>
            <ul className="space-y-3 text-xs text-slate-400 font-medium">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="hover:text-sky-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/contact" className="hover:text-sky-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sky-400 transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact HQ & Newsletter */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-white">
                Global Headquarters
              </h3>
              <div className="space-y-3.5 text-xs text-slate-400 font-medium">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-sky-400" />
                  <span className="leading-relaxed">
                    Suite-G, Weller House,<br />58-60 Longbridge Rd,<br />Barking, London, IG11 8RT.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={15} className="shrink-0 text-sky-400" />
                  <a href="tel:02038190333" className="hover:text-sky-400 transition-colors">02038190333</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={15} className="shrink-0 text-sky-400" />
                  <a href="mailto:info@eslanditsolutions.com" className="hover:text-sky-400 transition-colors break-all">
                    info@eslanditsolutions.com
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter Micro Form */}
            <div>
              <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300">
                Enterprise Insights
              </h4>
              <form className="flex gap-2" onSubmit={subscribe}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Business Email"
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow hover:brightness-110 disabled:opacity-50 transition"
                >
                  {submitting ? '...' : <ArrowRight size={14} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10 bg-slate-950/90 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 text-center text-xs text-slate-500 sm:flex-row sm:justify-between sm:px-10 lg:px-14">
          <p>© {new Date().getFullYear()} Esland IT Solutions. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck size={14} /> ISO 27001 Certified
            </span>
            <span>•</span>
            <span className="text-sky-400 font-semibold">99.99% Uptime SLA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
