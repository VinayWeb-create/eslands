import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu, X, ArrowRight, ChevronDown, Sun, Moon,
  Code, Smartphone, Server, Shield, Palette, TrendingUp, ShoppingCart, RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import MegaMenu from './nav/MegaMenu';
import MobileMenu from './nav/MobileMenu';
import Logo from './brand/Logo';

const serviceIcons = { Code, Smartphone, Server, Shield, Palette, TrendingUp, ShoppingCart, RotateCcw };

const allServices = [
  { label: 'Web Development',      href: '/services#web-development',   icon: 'Code',          description: 'High-converting enterprise web & cloud application engineering' },
  { label: 'Mobile Development',   href: '/services#mobile-development', icon: 'Smartphone',    description: 'Resilient native iOS & Android applications for client engagement' },
  { label: 'Software Development',  href: '/services#software-development', icon: 'Server',     description: 'Bespoke microservices, cloud systems, and operations engines' },
  { label: 'Networking Solutions',  href: '/services#networking',         icon: 'Shield',        description: 'Zero-trust network infrastructure and 24/7 managed operations' },
  { label: 'Branding & Identity',   href: '/services#branding',          icon: 'Palette',       description: 'Design systems and motion branding that command market authority' },
  { label: 'SEO & Growth Marketing',href: '/services#seo-marketing',     icon: 'TrendingUp',    description: 'Data-driven B2B search authority and customer acquisition' },
  { label: 'E-commerce Platforms',  href: '/services#ecommerce',         icon: 'ShoppingCart',  description: 'High-scale headless e-commerce engines built to scale' },
  { label: 'System Modernization',  href: '/services#redesign',          icon: 'RotateCcw',     description: 'Zero-downtime legacy IT migrations and code transformations' },
];

const navItems = [
  { label: 'Home',     path: '/' },
  { label: 'Services', path: '/services', hasDropdown: true },
  { label: 'Products', path: '/products' },
  { label: 'About',    path: '/about' },
  { label: 'Careers',  path: '/careers' },
  { label: 'Contact',  path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const isServicesActive = location.pathname.startsWith('/services');

  const [scrolled, setScrolled]                   = useState(false);
  const [scrollProgress, setScrollProgress]       = useState(0);
  const [mobileOpen, setMobileOpen]               = useState(false);
  const [servicesOpen, setServicesOpen]           = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex]           = useState(null);
  const megaTimeout = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const winScroll = document.documentElement.scrollTop;
      const height    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(height > 0 ? (winScroll / height) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    setHoveredIndex(null);
    setServicesOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  const handleMegaEnter = () => { clearTimeout(megaTimeout.current); setServicesOpen(true); };
  const handleMegaLeave = () => { megaTimeout.current = setTimeout(() => setServicesOpen(false), 120); };

  /* Adaptive classes */
  const navText   = 'text-gray-600 dark:text-slate-300 hover:text-[#003087] dark:hover:text-white font-medium transition-colors duration-150';
  const activeText = 'text-[#003087] dark:text-blue-300 font-semibold';

  return (
    <>
      {/* ── Scroll Progress ── */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent">
        <motion.div
          className="h-full"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #003087, #0057D8, #4080FF)' }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* ── Main Header ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-2.5 shadow-[0_2px_20px_rgba(15,23,41,0.10)] dark:shadow-[0_4px_32px_rgba(0,0,0,0.5)]'
            : 'py-4'
        }`}
        style={{
          background: scrolled
            ? (isDark ? 'rgba(7,17,31,0.97)' : 'rgba(255,255,255,0.98)')
            : (isDark ? 'rgba(7,17,31,0.7)'  : 'rgba(255,255,255,0.0)'),
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(228,233,240,0.9)'}`
            : '1px solid transparent',
        }}
      >
        <div className="mx-auto flex max-w-[90vw] lg:max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
            <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
              <Logo variant="horizontal" theme={isDark ? 'dark' : 'light'} />
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navItems.map((item, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  {/* Hover pill */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        layoutId="navHover"
                        className="absolute inset-0 rounded-md"
                        style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,48,135,0.05)' }}
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
                        className={`flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold tracking-wide rounded-xl transition-colors duration-200 ${
                          isServicesActive ? activeText : navText
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-250 ${servicesOpen ? 'rotate-180 text-primary-500' : ''}`}
                        />
                      </button>
                      {isServicesActive && (
                        <motion.div
                          layoutId="navActiveBar"
                          className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-none"
                          style={{ background: '#003087' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
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
                        `relative z-10 block px-4 py-2.5 text-[13px] font-semibold tracking-wide rounded-xl transition-colors duration-200 ${
                          isActive ? activeText : navText
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}
                          {isActive && (
                            <motion.div
                              layoutId="navActiveBar"
                              className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-none"
                              style={{ background: '#003087' }}
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

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">

            <Link
              to="/contact?mode=proposal"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold transition-all duration-200"
              style={{
                border: '1.5px solid',
                borderColor: isDark ? 'rgba(64,128,255,0.35)' : '#C5D0E0',
                borderRadius: '5px',
                color: isDark ? '#8ABFFF' : '#003087',
                background: isDark ? 'rgba(64,128,255,0.04)' : 'transparent',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = isDark ? 'rgba(64,128,255,0.6)' : '#003087'; e.currentTarget.style.background = isDark ? 'rgba(64,128,255,0.08)' : 'rgba(0,48,135,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = isDark ? 'rgba(64,128,255,0.35)' : '#C5D0E0'; e.currentTarget.style.background = isDark ? 'rgba(64,128,255,0.04)' : 'transparent'; }}
            >
              Get Proposal
            </Link>
            <Link
              to="/contact?mode=consultation"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white transition-all duration-200"
              style={{
                background: '#003087',
                borderRadius: '5px',
                border: '1px solid #003087',
                boxShadow: '0 2px 8px rgba(0,48,135,0.25)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#002068'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,48,135,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#003087'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,48,135,0.25)'; }}
            >
              Book Consultation
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/80 p-2.5 text-gray-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-white/10 transition-all z-50 relative"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
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
