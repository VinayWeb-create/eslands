import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu, X, ArrowRight, Phone, Mail, ChevronDown, Search,
  Code, Smartphone, Server, Shield, Palette, TrendingUp, ShoppingCart, RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const serviceIcons = { Code, Smartphone, Server, Shield, Palette, TrendingUp, ShoppingCart, RotateCcw };

const allServices = [
  { label: 'Web Development', href: '/services#web-development', icon: 'Code', description: 'Custom, high-performance websites' },
  { label: 'Mobile Development', href: '/services#mobile-development', icon: 'Smartphone', description: 'Native & cross-platform apps' },
  { label: 'Software Development', href: '/services#software-development', icon: 'Server', description: 'Bespoke enterprise software' },
  { label: 'Networking Solutions', href: '/services#networking', icon: 'Shield', description: 'Secure infrastructure & support' },
  { label: 'Branding & Promotion', href: '/services#branding', icon: 'Palette', description: 'Identity, design & campaigns' },
  { label: 'SEO & Marketing', href: '/services#seo-marketing', icon: 'TrendingUp', description: 'Grow traffic & conversions' },
  { label: 'E-commerce Solutions', href: '/services#ecommerce', icon: 'ShoppingCart', description: 'Storefronts that convert' },
  { label: 'Website Redesign', href: '/services#redesign', icon: 'RotateCcw', description: 'Modernize your existing site' },
];

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services', hasDropdown: true },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export default function Navbar() {
  const location = useLocation();
  const isServicesActive = location.pathname.startsWith('/services');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const megaTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(height > 0 ? (winScroll / height) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    setHoveredIndex(null);
    setServicesOpen(false);
  }, [location.pathname]);

  const handleMegaEnter = () => {
    clearTimeout(megaTimeout.current);
    setServicesOpen(true);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setServicesOpen(false), 120);
  };

  return (
    <>
      {/* ── Scroll Progress Bar ─────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-white/[0.04]">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>



      {/* ── Main Header ─────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-slate-950/80 border-b border-white/[0.06] shadow-2xl shadow-black/20 py-3'
            : 'bg-slate-950/40 border-b border-white/[0.04] py-4'
        }`}
        style={{ backdropFilter: 'blur(20px) saturate(1.4)', WebkitBackdropFilter: 'blur(20px) saturate(1.4)' }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── Logo ── */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
            <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
              <img src="/white-logo.png" alt="Esland IT Solutions" className="h-14 w-auto object-contain" />
            </Link>
          </motion.div>

          {/* ── Desktop Nav ── */}
          <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setHoveredIndex(null)}>
            {navItems.map((item, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  {/* Sliding Hover Pill */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        layoutId="navHover"
                        className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/[0.06]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                      />
                    )}
                  </AnimatePresence>

                  {item.hasDropdown ? (
                    <div
                      onMouseEnter={handleMegaEnter}
                      onMouseLeave={handleMegaLeave}
                      className="relative z-10"
                    >
                      <button
                        className={`flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-200 rounded-xl uppercase ${
                          isServicesActive ? 'text-sky-400' : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {item.label}
                        <ChevronDown size={13} className={`transition-transform duration-250 ${servicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isServicesActive && (
                        <motion.div
                          layoutId="navActiveUnderline"
                          className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}

                      {/* ── Mega Menu ── */}
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 14, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 14, scale: 0.96 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[520px] rounded-2xl border border-white/[0.08] bg-slate-900/95 p-6 shadow-2xl shadow-black/40 z-50"
                            style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
                          >
                            <div className="flex items-center gap-2 mb-5">
                              <div className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-400">Our Services</p>
                            </div>
                            <motion.div
                              initial="hidden"
                              animate="show"
                              variants={{ show: { transition: { staggerChildren: 0.025, delayChildren: 0.03 } } }}
                              className="grid grid-cols-2 gap-1.5"
                            >
                              {allServices.map((s) => {
                                const ServiceIcon = serviceIcons[s.icon];
                                return (
                                  <motion.div key={s.label} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
                                    <Link
                                      to={s.href}
                                      onClick={() => { setServicesOpen(false); setHoveredIndex(null); }}
                                      className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition-all duration-200 hover:bg-white/[0.06] hover:text-white group"
                                    >
                                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-sky-400 group-hover:bg-sky-500/10 transition-colors">
                                        {ServiceIcon ? <ServiceIcon size={15} /> : <span className="text-xs font-bold">{s.label[0]}</span>}
                                      </div>
                                      <span className="min-w-0">
                                        <span className="block font-semibold leading-tight text-[13px]">{s.label}</span>
                                        <span className="block text-[11px] text-slate-500 group-hover:text-slate-400 mt-0.5">{s.description}</span>
                                      </span>
                                    </Link>
                                  </motion.div>
                                );
                              })}
                            </motion.div>
                            <div className="mt-4 border-t border-white/[0.06] pt-4">
                              <Link
                                to="/services"
                                onClick={() => { setServicesOpen(false); setHoveredIndex(null); }}
                                className="flex items-center gap-2 text-[13px] font-bold text-sky-400 hover:text-sky-300 transition-colors"
                              >
                                View all services <ArrowRight size={13} />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `relative z-10 block px-4 py-2 text-[13px] font-semibold tracking-wide uppercase rounded-xl transition-colors duration-200 ${isActive ? 'text-sky-400' : 'text-slate-300 hover:text-white'}`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}
                          {isActive && (
                            <motion.div
                              layoutId="navActiveUnderline"
                              className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="hidden items-center gap-2 lg:flex">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
              aria-label="Search"
            >
              <Search size={17} />
            </motion.button>

            <div className="h-5 w-px bg-white/[0.08] mx-1" />

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-sky-500/15 transition-all duration-300 hover:shadow-sky-500/25 hover:brightness-110 uppercase tracking-wide"
              >
                Get a Quote
                <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] p-2.5 text-slate-300 transition-all hover:bg-white/[0.08] hover:text-white lg:hidden z-50 relative"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── Search Modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-start justify-center pt-32 bg-black/60 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="w-full max-w-2xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl border border-white/[0.08] bg-slate-900/95 shadow-2xl shadow-black/40" style={{ backdropFilter: 'blur(24px)' }}>
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type="text"
                  placeholder="Search services, solutions..."
                  className="w-full rounded-2xl bg-transparent py-5 pl-13 pr-12 text-white placeholder-slate-500 focus:outline-none text-sm"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Drawer ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 z-40 flex flex-col bg-slate-950 w-full lg:hidden overflow-y-auto shadow-2xl border-l border-white/[0.06]"
              style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
            >
              {/* Header area */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
                    <span className="text-sm font-black text-white">E</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Esland IT</p>
                    <p className="text-[11px] text-slate-500">Solutions</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.1] transition-all"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Quick actions */}
              <div className="px-6 pt-5 pb-2">
                <a
                  href="tel:02038190333"
                  className="flex items-center gap-3 rounded-xl bg-sky-500/10 border border-sky-500/20 px-4 py-3 mb-3"
                >
                  <div className="h-9 w-9 rounded-lg bg-sky-500/20 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-sky-400" />
                  </div>
                  <div>
                    <p className="text-[11px] text-sky-400/70 font-medium uppercase tracking-wider">Call Us Now</p>
                    <p className="text-sm font-bold text-white">020 3819 0333</p>
                  </div>
                </a>
              </div>

              {/* Nav items */}
              <nav className="flex-1 px-4 py-2">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col gap-0.5"
                >
                  {navItems.map((item) =>
                    item.hasDropdown ? (
                      <motion.div variants={itemVariants} key={item.label} className="w-full">
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="flex w-full items-center justify-between rounded-xl px-4 py-4 text-[15px] font-bold text-slate-200 hover:bg-white/[0.06] active:bg-white/[0.08] transition-colors"
                        >
                          <span className="flex items-center gap-3">
                            <span className="text-lg">⚡</span>
                            {item.label}
                          </span>
                          <ChevronDown size={18} className={`transition-transform duration-300 text-slate-500 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="grid grid-cols-2 gap-2 px-2 pb-2 pt-1">
                                {allServices.map((s) => {
                                  const ServiceIcon = serviceIcons[s.icon];
                                  return (
                                    <Link
                                      key={s.label}
                                      to={s.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex flex-col items-center gap-2 rounded-xl px-3 py-4 text-center bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] hover:border-white/[0.08] transition-all active:scale-[0.97]"
                                    >
                                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/15 to-indigo-500/15 text-sky-400">
                                        {ServiceIcon ? <ServiceIcon size={18} /> : <span className="text-sm font-bold">{s.label[0]}</span>}
                                      </div>
                                      <span className="text-[12px] font-semibold text-slate-300 leading-tight">{s.label}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                              <div className="px-2 pb-2">
                                <Link
                                  to="/services"
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center justify-center gap-2 rounded-xl border border-sky-500/20 bg-sky-500/5 px-4 py-3 text-[13px] font-bold text-sky-400 hover:bg-sky-500/10 transition-colors"
                                >
                                  View All Services <ArrowRight size={13} />
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ) : (
                      <motion.div variants={itemVariants} key={item.label} className="w-full">
                        <NavLink
                          to={item.path}
                          onClick={() => setMobileOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-4 py-4 text-[15px] font-bold transition-all active:scale-[0.98] ${
                              isActive ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-200 hover:bg-white/[0.06] border border-transparent'
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      </motion.div>
                    )
                  )}
                </motion.div>
              </nav>

              {/* Bottom CTA */}
              <div className="px-6 pb-8 pt-4 border-t border-white/[0.06]">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-sky-500/15 transition-all active:scale-[0.98] uppercase tracking-wide"
                >
                  Get a Quote <ArrowRight size={14} />
                </Link>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <Mail size={12} className="text-sky-400/50" />
                  <a href="mailto:info@eslanditsolutions.com" className="hover:text-white transition-colors">info@eslanditsolutions.com</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
