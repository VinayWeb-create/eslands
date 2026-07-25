import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone, Mail, ChevronDown, Search, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const allServices = [
  { label: 'Web Development', href: '/services#web-development', icon: 'Code' },
  { label: 'Mobile Development', href: '/services#mobile-development', icon: 'Smartphone' },
  { label: 'Cloud Solutions', href: '/services#cloud', icon: 'Cloud' },
  { label: 'AI & Automation', href: '/services#ai', icon: 'Brain' },
  { label: 'Cybersecurity', href: '/services#security', icon: 'Shield' },
  { label: 'DevOps', href: '/services#devops', icon: 'Server' },
  { label: 'UI/UX Design', href: '/services#design', icon: 'Palette' },
  { label: 'Digital Marketing', href: '/services#marketing', icon: 'TrendingUp' },
  { label: 'Consulting', href: '/services#consulting', icon: 'Users' },
  { label: 'Staffing', href: '/services#staffing', icon: 'Briefcase' },
];

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services', hasDropdown: true },
  { label: 'Industries', path: '/industries' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
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
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-800">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Header */}
      <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? 'glass-dark border-white/5 py-3' : 'bg-transparent border-transparent py-5'} backdrop-blur-xl`}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
              <img src="/image.png" alt="Esland IT Solutions" className="h-12 w-auto object-contain" />
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item, index) => (
              item.hasDropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <motion.button 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition rounded-xl hover:bg-white/5"
                  >
                    {item.label}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                  </motion.button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-2 w-[480px] rounded-2xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl"
                      >
                        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-primary-400">Our Services</p>
                        <div className="grid grid-cols-2 gap-2">
                          {allServices.map((s) => (
                            <Link
                              key={s.label}
                              to={s.href}
                              onClick={() => setServicesOpen(false)}
                              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white group"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20 text-primary-400 group-hover:from-primary-500/30 group-hover:to-secondary-500/30 transition">
                                <span className="text-xs">{s.label[0]}</span>
                              </div>
                              {s.label}
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 border-t border-white/10 pt-4">
                          <Link to="/services" onClick={() => setServicesOpen(false)} className="flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition">
                            View all services <ArrowRight size={14} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div key={item.label} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm font-medium rounded-xl transition ${isActive ? 'text-white bg-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              )
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
              aria-label="Search"
            >
              <Search size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
              aria-label="Language"
            >
              <Globe size={18} />
            </motion.button>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="ml-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition hover:shadow-primary-500/40"
              >
                Get Started
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 lg:hidden"
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
            className="fixed inset-0 z-50 flex items-start justify-center pt-32 bg-slate-950/90 backdrop-blur-xl"
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
                  placeholder="Search services, case studies, industries..."
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/95 py-4 pl-12 pr-4 text-white placeholder-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.32, ease: 'easeInOut' }}
            className="fixed inset-0 z-30 flex flex-col bg-slate-950 pt-[72px] lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex w-full items-center justify-between rounded-2xl px-4 py-4 text-base font-semibold text-slate-200 hover:bg-white/5"
                    >
                      {item.label}
                      <ChevronDown size={16} className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pl-4"
                        >
                          {allServices.map((s) => (
                            <Link
                              key={s.label}
                              to={s.href}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition"
                            >
                              {s.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-2xl px-4 py-4 text-base font-semibold transition ${isActive ? 'bg-primary-500/20 text-primary-400' : 'text-slate-200 hover:bg-white/5 hover:text-white'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 text-sm font-semibold text-white"
                >
                  Get Started <ArrowRight size={15} />
                </Link>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="flex flex-col gap-2 text-sm text-slate-400">
                  <a href="tel:02038190333" className="flex items-center gap-2 hover:text-white transition"><Phone size={14} />02038190333</a>
                  <a href="mailto:info@eslanditsolutions.com" className="flex items-center gap-2 hover:text-white transition"><Mail size={14} />info@eslanditsolutions.com</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
