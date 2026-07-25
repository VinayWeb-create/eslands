import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone, Mail, ChevronDown, Search, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const allServices = [
  { label: 'Web Development', href: '/services#web-development', icon: 'Code' },
  { label: 'Mobile Development', href: '/services#mobile-development', icon: 'Smartphone' },
  { label: 'Software Development', href: '/services#software-development', icon: 'Server' },
  { label: 'Networking Solutions', href: '/services#networking', icon: 'Shield' },
  { label: 'Branding & Promotion', href: '/services#branding', icon: 'Palette' },
  { label: 'SEO & Marketing', href: '/services#seo-marketing', icon: 'TrendingUp' },
  { label: 'E-commerce Solutions', href: '/services#ecommerce', icon: 'ShoppingCart' },
  { label: 'Website Redesign', href: '/services#redesign', icon: 'RotateCcw' },
];

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services', hasDropdown: true },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

// Staggered child variants for mobile sidebar items
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 25, rotateY: 10 },
  show: { opacity: 1, x: 0, rotateY: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-200">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-500 to-indigo-600"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Header */}
      <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? 'bg-white/95 border-slate-200/80 shadow-sm py-3' : 'bg-white/80 border-slate-100 py-4'} border-b backdrop-blur-xl`}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
              <img src="/white-logo.png" alt="Esland IT Solutions" className="h-20 w-auto object-contain" />
            </Link>
          </motion.div>

          {/* Desktop Nav */}
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
                        className="absolute inset-0 rounded-xl bg-slate-100/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 26 }}
                      />
                    )}
                  </AnimatePresence>

                  {item.hasDropdown ? (
                    <div
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                      className="relative z-10"
                    >
                      <button
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-655 hover:text-slate-900 transition-colors duration-200 rounded-xl"
                      >
                        {item.label}
                        <ChevronDown size={14} className={`transition-transform duration-250 ${servicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.95, rotateX: -5 }}
                            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                            exit={{ opacity: 0, y: 12, scale: 0.95, rotateX: -5 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            style={{ transformOrigin: 'top center', perspective: 800 }}
                            className="absolute left-0 top-full mt-2 w-[480px] rounded-2xl border border-slate-200 bg-white p-6 shadow-xl backdrop-blur-xl z-50"
                          >
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-sky-600">Our Services</p>
                            <div className="grid grid-cols-2 gap-2">
                              {allServices.map((s) => (
                                <Link
                                  key={s.label}
                                  to={s.href}
                                  onClick={() => setServicesOpen(false)}
                                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950 group"
                                >
                                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600 group-hover:bg-sky-100 transition-colors">
                                    <span className="text-xs font-bold">{s.label[0]}</span>
                                  </div>
                                  {s.label}
                                </Link>
                              ))}
                            </div>
                            <div className="mt-4 border-t border-slate-100 pt-4">
                              <Link to="/services" onClick={() => setServicesOpen(false)} className="flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors">
                                View all services <ArrowRight size={14} />
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
                        `relative z-10 block px-4 py-2 text-sm font-semibold rounded-xl transition-colors duration-200 ${isActive ? 'text-sky-600 bg-sky-50' : 'text-slate-655 hover:text-slate-900'}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition"
              aria-label="Search"
            >
              <Search size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition"
              aria-label="Language"
            >
              <Globe size={18} />
            </motion.button>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="ml-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:brightness-110"
              >
                Get Started
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden z-50 relative"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-32 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="w-full max-w-2xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search services, solutions..."
                  className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/10"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-30 bg-slate-950 lg:hidden"
            />
            {/* Drawer (with 3D perspective rotation entry) */}
            <motion.div
              initial={{ opacity: 0, x: '100%', rotateY: 12 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: '100%', rotateY: 12 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              style={{ transformOrigin: 'right center', perspective: 1200 }}
              className="fixed inset-y-0 right-0 z-40 flex flex-col bg-white w-full sm:max-w-[360px] pt-[88px] lg:hidden overflow-y-auto shadow-2xl border-l border-slate-150"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col px-6 py-6 gap-2"
              >
                {navItems.map((item) =>
                  item.hasDropdown ? (
                    <motion.div variants={itemVariants} key={item.label} className="w-full">
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-base font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        {item.label}
                        <ChevronDown size={16} className={`transition-transform duration-250 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pl-4 border-l border-slate-100 ml-4 space-y-1 mt-1"
                          >
                            {allServices.map((s) => (
                              <Link
                                key={s.label}
                                to={s.href}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-505 hover:bg-slate-50 hover:text-slate-950 transition-colors"
                              >
                                {s.label}
                              </Link>
                            ))}
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
                          `block rounded-2xl px-4 py-3.5 text-base font-bold transition-all ${
                            isActive ? 'bg-sky-50 text-sky-600' : 'text-slate-705 hover:bg-slate-50 hover:text-slate-950'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </motion.div>
                  )
                )}

                <motion.div variants={itemVariants} className="mt-6 flex flex-col gap-3">
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:brightness-115 transition"
                  >
                    Get Started <ArrowRight size={15} />
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-8 border-t border-slate-100 pt-6">
                  <div className="flex flex-col gap-3 text-sm text-slate-500">
                    <a href="tel:02038190333" className="flex items-center gap-2.5 font-semibold hover:text-slate-900 transition-colors">
                      <Phone size={14} className="text-sky-500" />02038190333
                    </a>
                    <a href="mailto:info@eslanditsolutions.com" className="flex items-center gap-2.5 font-semibold hover:text-slate-900 transition-colors">
                      <Mail size={14} className="text-sky-500" />info@eslanditsolutions.com
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
