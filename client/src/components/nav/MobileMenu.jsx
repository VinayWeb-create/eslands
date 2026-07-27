import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, X, Phone, Mail } from 'lucide-react';
import { useAccessibleAnimations } from '../../lib/animations';
import Logo from '../brand/Logo';

export default function MobileMenu({ 
  mobileOpen, setMobileOpen, 
  mobileServicesOpen, setMobileServicesOpen, 
  navItems, allServices, serviceIcons 
}) {
  const { prefersReducedMotion } = useAccessibleAnimations();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.06, delayChildren: prefersReducedMotion ? 0 : 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : 40, scale: 0.95 },
    show: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  if (!mobileOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setMobileOpen(false)}
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-md lg:hidden"
      />
      <motion.div
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: prefersReducedMotion ? 0 : '100%' }}
        transition={{ type: prefersReducedMotion ? false : 'spring', stiffness: 350, damping: 35 }}
        className="fixed inset-y-0 right-0 z-40 flex flex-col bg-slate-950/95 w-full lg:hidden overflow-y-auto shadow-2xl border-l border-white/[0.06]"
        style={{ backdropFilter: 'blur(30px) saturate(1.2)', WebkitBackdropFilter: 'blur(30px) saturate(1.2)' }}
      >
        {/* Header area */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/[0.06]">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <Logo variant="horizontal" iconSize={32} />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.1] active:scale-95 transition-all"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-4 py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-2"
          >
            {navItems.map((item) =>
              item.hasDropdown ? (
                <motion.div variants={itemVariants} key={item.label} className="w-full">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex w-full items-center justify-between rounded-[1.5rem] px-5 py-5 text-xl sm:text-2xl font-black text-slate-200 hover:bg-white/[0.06] active:bg-white/[0.08] transition-colors"
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-2xl text-sky-400">⚡</span>
                      {item.label}
                    </span>
                    <ChevronDown size={24} className={`transition-transform duration-300 text-slate-500 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-3 px-3 pb-3 pt-2">
                          {allServices.map((s) => {
                            const ServiceIcon = serviceIcons[s.icon];
                            return (
                              <Link
                                key={s.label}
                                to={s.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex flex-col items-center gap-3 rounded-[1.25rem] px-3 py-5 text-center bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.1] transition-all active:scale-[0.97]"
                              >
                                <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-gradient-to-br from-sky-500/15 to-indigo-500/15 text-sky-400">
                                  {ServiceIcon ? <ServiceIcon size={20} /> : <span className="text-sm font-bold">{s.label[0]}</span>}
                                </div>
                                <span className="text-xs sm:text-sm font-bold text-slate-300 leading-tight">{s.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="px-3 pb-4">
                          <Link
                            to="/services"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-center gap-2 rounded-[1.25rem] border border-sky-500/20 bg-sky-500/10 px-4 py-4 text-sm font-black text-sky-400 hover:bg-sky-500/20 transition-colors"
                          >
                            View All Services <ArrowRight size={16} />
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
                      `flex items-center gap-3 rounded-[1.5rem] px-5 py-5 text-xl sm:text-2xl font-black transition-all active:scale-[0.98] ${
                        isActive ? 'bg-gradient-to-r from-sky-500/20 to-indigo-500/10 text-sky-400 border border-sky-500/30 shadow-[inset_0_0_20px_rgba(56,189,248,0.1)]' : 'text-slate-200 hover:bg-white/[0.06] border border-transparent'
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

        {/* Bottom CTA (Safe area padding for modern phones) */}
        <div className="px-6 pb-12 pt-6 border-t border-white/[0.06] bg-slate-950">
          <div className="flex items-center justify-between mb-6">
            <a href="mailto:info@eslanditsolutions.com" className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors">
              <Mail size={16} className="text-sky-400" />
              info@eslanditsolutions.com
            </a>
          </div>
          {/* We removed the explicit Book Consultation button here because we have the new MobileStickyCTA, but we will leave a secondary 'Contact Us' link if needed, or just let MobileStickyCTA handle it. The sticky CTA covers the bottom. */}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full rounded-[1.25rem] bg-white/[0.05] border border-white/10 px-6 py-4 text-sm font-black text-white hover:bg-white/[0.1] transition-all active:scale-[0.98] uppercase tracking-wider"
          >
            Contact Support
          </Link>
        </div>
      </motion.div>
    </>
  );
}
