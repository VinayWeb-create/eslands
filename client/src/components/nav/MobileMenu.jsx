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
        className="fixed inset-0 z-30 bg-black/40 dark:bg-black/70 backdrop-blur-md lg:hidden"
      />
      <motion.div
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: prefersReducedMotion ? 0 : '100%' }}
        transition={{ type: prefersReducedMotion ? false : 'spring', stiffness: 350, damping: 35 }}
        className="fixed inset-y-0 right-0 z-40 flex flex-col bg-white/95 dark:bg-slate-950/95 w-full lg:hidden overflow-y-auto shadow-2xl border-l border-gray-200 dark:border-white/[0.06]"
        style={{ backdropFilter: 'blur(30px) saturate(1.2)', WebkitBackdropFilter: 'blur(30px) saturate(1.2)' }}
      >
        {/* Header area */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-white/[0.06]">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <Logo variant="horizontal" iconSize={32} />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:bg-white/[0.06] dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.1] active:scale-95 transition-all"
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
                    className={`flex w-full items-center justify-between rounded-2xl px-5 py-4 text-xl sm:text-2xl font-black transition-colors ${
                      mobileServicesOpen ? 'text-[#003087] bg-blue-50 border-blue-100 dark:text-white dark:bg-white/[0.03] border dark:border-white/[0.05]' : 'text-gray-700 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      {item.label}
                    </span>
                    <ChevronDown size={24} className={`transition-transform duration-300 text-gray-400 dark:text-slate-500 ${mobileServicesOpen ? 'rotate-180 text-[#003087] dark:text-slate-300' : ''}`} />
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
                                className="flex flex-col items-center gap-3 rounded-[1.25rem] px-3 py-5 text-center bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:border-gray-200 dark:bg-white/[0.03] dark:border-white/[0.04] dark:hover:bg-white/[0.08] dark:hover:border-white/[0.1] transition-all active:scale-[0.97]"
                              >
                                <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-blue-100 text-[#003087] dark:bg-gradient-to-br dark:from-sky-500/15 dark:to-indigo-500/15 dark:text-sky-400">
                                  {ServiceIcon ? <ServiceIcon size={20} /> : <span className="text-sm font-bold">{s.label[0]}</span>}
                                </div>
                                <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-slate-300 leading-tight">{s.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="px-3 pb-4">
                          <Link
                            to="/services"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-center gap-2 rounded-[1.25rem] border border-[#003087]/20 bg-[#003087]/5 px-4 py-4 text-sm font-black text-[#003087] hover:bg-[#003087]/10 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 transition-colors"
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
                      `relative flex items-center gap-4 rounded-2xl px-5 py-4 text-xl sm:text-2xl font-black transition-all active:scale-[0.98] ${
                        isActive ? 'text-[#003087] bg-blue-50 border border-blue-100 shadow-sm dark:text-white dark:bg-white/[0.05] dark:border-white/[0.1] dark:shadow-xl' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-white/[0.02] border border-transparent'
                      }`
                    }
                  >
                    {({ isActive }) => (
                       <>
                         {isActive && <div className="absolute left-0 w-[4px] h-6 bg-[#003087] dark:bg-emerald-400 rounded-r-full shadow-[0_0_12px_rgba(0,48,135,0.3)] dark:shadow-[0_0_12px_rgba(52,211,153,0.8)]" />}
                         {item.label}
                       </>
                    )}
                  </NavLink>
                </motion.div>
              )
            )}
          </motion.div>
        </nav>

        {/* Bottom CTA (Safe area padding for modern phones) */}
        <div className="px-6 pb-12 pt-6 border-t border-gray-100 dark:border-white/[0.06] bg-gray-50 dark:bg-slate-950">
          <div className="flex items-center justify-between mb-6">
            <a href="mailto:info@eslanditsolutions.com" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#003087] dark:text-slate-400 dark:hover:text-white transition-colors">
              <Mail size={16} className="text-[#003087] dark:text-sky-400" />
              info@eslanditsolutions.com
            </a>
          </div>
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full rounded-[1.25rem] bg-white border border-gray-200 px-6 py-4 text-sm font-black text-gray-900 hover:bg-gray-50 dark:bg-white/[0.05] dark:border-white/10 dark:text-white dark:hover:bg-white/[0.1] transition-all active:scale-[0.98] uppercase tracking-wider shadow-sm dark:shadow-none"
          >
            Contact Support
          </Link>
        </div>
      </motion.div>
    </>
  );
}
