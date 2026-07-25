import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone, Mail, Facebook, Twitter, Linkedin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const allServices = [
  { label: 'Web Development', href: '/services#web-development' },
  { label: 'Mobile Development', href: '/services#mobile-development' },
  { label: 'SEO & Marketing', href: '/services#seo-marketing' },
  { label: 'Software Development', href: '/services#software-development' },
  { label: 'Networking Solutions', href: '/services#networking' },
  { label: 'Professional Naming', href: '/services#naming' },
  { label: 'Branding & Promotion', href: '/services#branding' },
  { label: '2D Animation', href: '/services#animation' },
  { label: 'E-commerce Solutions', href: '/services#ecommerce' },
  { label: 'Website Redesign', href: '/services#redesign' },
  { label: 'Logo Design', href: '/services#logo-design' },
  { label: 'Social Media Marketing', href: '/services#social-media' },
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
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
      {/* Main Header */}
      <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 border-b ${scrolled ? 'border-slate-200 bg-white/97 shadow-md py-3' : 'border-transparent bg-white/90 py-4'} backdrop-blur-2xl`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div
            whileHover={{ rotateY: 15, rotateX: -10, scale: 1.03, perspective: 600 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
              <img src="/image.png" alt="Esland IT Solutions" className="h-16 w-auto object-contain" style={{ transform: 'translateZ(10px)' }} />
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item, index) => (
              item.hasDropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                    <button className="flex items-center gap-1 text-sm font-semibold tracking-wide text-slate-600 hover:text-sky-600 transition">
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </motion.div>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-3 w-[340px] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl backdrop-blur-xl"
                      >
                        <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-sky-600">Our Services</p>
                        <div className="grid grid-cols-2 gap-1">
                          {allServices.map((s) => (
                            <Link
                              key={s.label}
                              to={s.href}
                              onClick={() => setServicesOpen(false)}
                              className="rounded-xl px-3 py-2 text-xs text-slate-600 transition hover:bg-sky-50 hover:text-sky-600"
                            >
                              {s.label}
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3 border-t border-slate-100 pt-3">
                          <Link to="/services" onClick={() => setServicesOpen(false)} className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 transition">
                            View all services <ArrowRight size={12} />
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
                      `text-sm font-semibold tracking-wide transition ${isActive ? 'text-sky-600' : 'text-slate-600 hover:text-sky-600'} ${isActive ? 'after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-sky-600' : ''} relative`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <motion.a
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              href="tel:02038190333"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-sky-500 hover:bg-sky-50/50"
            >
              <Phone size={14} />
              Call Us
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
              >
                Get More
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.32, ease: 'easeInOut' }}
            className="fixed inset-0 z-30 flex flex-col bg-white pt-[64px] lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex w-full items-center justify-between rounded-2xl px-4 py-4 text-base font-semibold text-slate-700 hover:bg-slate-50"
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
                              className="block rounded-xl px-4 py-2.5 text-sm text-slate-500 hover:bg-slate-50 hover:text-sky-600 transition"
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
                      `block rounded-2xl px-4 py-4 text-base font-semibold transition ${isActive ? 'bg-sky-50 text-sky-600' : 'text-slate-700 hover:bg-slate-50 hover:text-sky-600'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="tel:02038190333"
                  className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700"
                >
                  <Phone size={15} />
                  Call 02038190333
                </a>
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-3 text-sm font-semibold text-white"
                >
                  Get More <ArrowRight size={15} />
                </Link>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="flex flex-col gap-2 text-sm text-slate-500">
                  <a href="tel:02038190333" className="flex items-center gap-2 hover:text-sky-600 transition"><Phone size={14} />02038190333</a>
                  <a href="mailto:info@eslanditsolutions.com" className="flex items-center gap-2 hover:text-sky-600 transition"><Mail size={14} />info@eslanditsolutions.com</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
