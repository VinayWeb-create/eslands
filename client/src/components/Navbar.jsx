import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu, X, ArrowRight, ChevronDown, Search,
  Code, Smartphone, Server, Shield, Palette, TrendingUp, ShoppingCart, RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MegaMenu from './nav/MegaMenu';
import MobileMenu from './nav/MobileMenu';
import Logo from './brand/Logo';

const serviceIcons = { Code, Smartphone, Server, Shield, Palette, TrendingUp, ShoppingCart, RotateCcw };

const allServices = [
  { label: 'Web Development', href: '/services#web-development', icon: 'Code', description: 'Custom, high-performance web engineering' },
  { label: 'Mobile Development', href: '/services#mobile-development', icon: 'Smartphone', description: 'Native iOS & Android enterprise apps' },
  { label: 'Software Development', href: '/services#software-development', icon: 'Server', description: 'Bespoke microservices & cloud systems' },
  { label: 'Networking Solutions', href: '/services#networking', icon: 'Shield', description: 'Zero-trust infrastructure & 24/7 support' },
  { label: 'Branding & Identity', href: '/services#branding', icon: 'Palette', description: 'Corporate identity, design & campaigns' },
  { label: 'SEO & Growth Marketing', href: '/services#seo-marketing', icon: 'TrendingUp', description: 'Enterprise organic traffic & conversion' },
  { label: 'E-commerce Platforms', href: '/services#ecommerce', icon: 'ShoppingCart', description: 'Omnichannel storefronts that scale' },
  { label: 'System Modernization', href: '/services#redesign', icon: 'RotateCcw', description: 'Modernize legacy IT architectures' },
];

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services', hasDropdown: true },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

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
      setScrolled(window.scrollY > 20);
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
      {/* ── Scroll Progress Line ─────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-white/[0.04]">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-500 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* ── Main Header (Dark Navy Enterprise Theme) ─────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-slate-950/85 border-b border-white/10 shadow-2xl shadow-slate-950/50 py-3.5'
            : 'bg-transparent border-b border-white/[0.04] py-5'
        }`}
        style={{ backdropFilter: 'blur(24px) saturate(1.2)', WebkitBackdropFilter: 'blur(24px) saturate(1.2)' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── Logo ── */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
            <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
              <Logo variant="horizontal" theme="dark" />
            </Link>
          </motion.div>

          {/* ── Desktop Nav ── */}
          <nav className="hidden items-center gap-1.5 lg:flex" onMouseLeave={() => setHoveredIndex(null)}>
            {navItems.map((item, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  {/* Hover Pill Backdrop */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        layoutId="navHover"
                        className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/10 shadow-sm"
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
                        className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold tracking-wider transition-colors duration-200 rounded-xl uppercase ${
                          isServicesActive ? 'text-sky-300' : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {item.label}
                        <ChevronDown size={13} className={`transition-transform duration-250 ${servicesOpen ? 'rotate-180 text-sky-400' : ''}`} />
                      </button>
                      {isServicesActive && (
                        <motion.div
                          layoutId="navActiveUnderline"
                          className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}

                      {/* Mega Menu */}
                      <AnimatePresence>
                        {servicesOpen && (
                          <MegaMenu
                            allServices={allServices}
                            serviceIcons={serviceIcons}
                            setServicesOpen={setServicesOpen}
                            setHoveredIndex={setHoveredIndex}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `relative z-10 block px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-xl transition-colors duration-200 ${
                          isActive ? 'text-sky-300' : 'text-slate-300 hover:text-white'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}
                          {isActive && (
                            <motion.div
                              layoutId="navActiveUnderline"
                              className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
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
          <div className="hidden items-center gap-3 lg:flex">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.08] border border-transparent hover:border-white/10 transition-all"
              aria-label="Search"
            >
              <Search size={18} />
            </motion.button>

            <div className="h-5 w-px bg-white/10 mx-1" />

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:shadow-sky-500/40 hover:brightness-110 uppercase tracking-wider"
              >
                Book Demo
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/80 p-2.5 text-slate-300 transition-all hover:bg-white/10 hover:text-white lg:hidden z-50 relative"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── Search Overlay Modal ─────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-start justify-center pt-32 bg-slate-950/80 backdrop-blur-md px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl border border-sky-500/30 bg-slate-900/95 shadow-2xl backdrop-blur-2xl">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-sky-400" size={20} />
                <input
                  type="text"
                  placeholder="Search enterprise solutions, cloud architecture, cybersecurity..."
                  className="w-full rounded-2xl bg-transparent py-5 pl-14 pr-12 text-white placeholder-slate-500 focus:outline-none text-sm font-medium"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Drawer Menu ────────────────────────────────── */}
      <MobileMenu
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        mobileServicesOpen={mobileServicesOpen}
        setMobileServicesOpen={setMobileServicesOpen}
        navItems={navItems}
        allServices={allServices}
        serviceIcons={serviceIcons}
      />
    </>
  );
}
