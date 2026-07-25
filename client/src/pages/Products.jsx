import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

const products = [
  { id: 1, title: 'Web Starter Pack', version: 'Various Versions', description: 'Complete web hosting & domain package for small businesses.', badge: 'New', category: 'Web' },
  { id: 2, title: 'Business Email Suite', version: 'Various Versions', description: 'Professional email solution with 5-50 mailboxes.', badge: 'New', category: 'Email' },
  { id: 3, title: 'Cloud Backup Pro', version: 'Various Versions', description: 'Automated cloud backup for business-critical data.', badge: 'New', category: 'Cloud' },
  { id: 4, title: 'SSL Security Bundle', version: 'Various Versions', description: 'Enterprise-grade SSL certificate and security suite.', badge: 'New', category: 'Security' },
  { id: 5, title: 'SEO Toolkit', version: 'Various Versions', description: 'Advanced SEO tools for ranking and organic traffic growth.', badge: 'New', category: 'Marketing' },
  { id: 6, title: 'E-commerce Platform', version: 'Various Versions', description: 'Full-featured online store with payment gateway.', badge: 'New', category: 'E-Commerce' },
  { id: 7, title: 'CRM System', version: 'Various Versions', description: 'Customer relationship management for growing teams.', badge: 'New', category: 'Software' },
  { id: 8, title: 'Mobile App Starter', version: 'Various Versions', description: 'Cross-platform mobile app development framework.', badge: 'New', category: 'Mobile' },
  { id: 9, title: 'HR Management Suite', version: 'Various Versions', description: 'End-to-end HR software for staffing and payroll.', badge: 'New', category: 'Software' },
  { id: 10, title: 'Network Monitor Pro', version: 'Various Versions', description: 'Real-time network infrastructure monitoring and alerts.', badge: 'New', category: 'Networking' },
  { id: 11, title: 'Brand Identity Kit', version: 'Various Versions', description: 'Complete brand package including logo and design assets.', badge: 'New', category: 'Branding' },
  { id: 12, title: 'Social Media Manager', version: 'Various Versions', description: 'Schedule, publish, and analyze your social media content.', badge: 'New', category: 'Marketing' },
];

const categoryColors = {
  Web: 'bg-sky-500/20 text-sky-400',
  Email: 'bg-violet-500/20 text-violet-400',
  Cloud: 'bg-blue-500/20 text-blue-400',
  Security: 'bg-red-500/20 text-red-400',
  Marketing: 'bg-orange-500/20 text-orange-400',
  'E-Commerce': 'bg-emerald-500/20 text-emerald-400',
  Software: 'bg-amber-500/20 text-amber-400',
  Mobile: 'bg-pink-500/20 text-pink-400',
  Networking: 'bg-cyan-500/20 text-cyan-400',
  Branding: 'bg-purple-500/20 text-purple-400',
};

export default function Products() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-[65px]">
      {/* Background glows */}
      <div className="pointer-events-none fixed left-0 top-0 h-96 w-96 rounded-full bg-sky-500/8 blur-3xl" />
      <div className="pointer-events-none fixed right-0 bottom-0 h-96 w-96 rounded-full bg-sky-600/8 blur-3xl" />

      {/* Page Banner */}
      <section className="relative border-b border-white/10 bg-gradient-to-r from-sky-600/20 via-sky-500/10 to-transparent px-6 py-16 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs uppercase tracking-[0.35em] text-sky-400">Esland IT Solutions</p>
            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Our Products
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              View all our product listings on this page !! Explore our wide range of IT products and solutions tailored for businesses of all sizes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-14">
        <div className="mb-10 flex items-center justify-between">
          <p className="text-sm text-slate-400">{products.length} products available</p>
          <a
            href="tel:02038190333"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
          >
            <Phone size={15} />
            Call Us for Pricing
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-lg transition-all duration-300 hover:border-sky-500/40 hover:shadow-sky-500/10 hover:shadow-xl"
            >
              {/* New Badge */}
              <div className="absolute right-4 top-4">
                <span className="rounded-full bg-sky-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                  {product.badge}
                </span>
              </div>

              {/* Product Icon Area */}
              <div className="mb-5 flex h-20 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-sky-500/10 via-slate-900/50 to-sky-600/10 transition-all duration-300 group-hover:from-sky-500/20 group-hover:to-sky-600/20">
                <div className="flex flex-col items-center gap-1">
                  <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{product.title.charAt(0)}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{product.version}</span>
                </div>
              </div>

              {/* Category badge */}
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide mb-3 ${categoryColors[product.category] || 'bg-slate-700/50 text-slate-400'}`}>
                {product.category}
              </span>

              <h2 className="text-base font-semibold text-white leading-snug group-hover:text-sky-300 transition-colors duration-200">
                {product.title}
              </h2>
              <p className="mt-2 text-xs leading-6 text-slate-400">{product.description}</p>

              <div className="mt-5 flex items-center justify-between">
                <a
                  href="tel:02038190333"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 transition hover:text-sky-300 hover:gap-2"
                >
                  <Phone size={12} />
                  Call Us
                </a>
                <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-sky-500/40 hover:bg-sky-500/10 hover:text-sky-300">
                  Enquire
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-[2rem] border border-sky-500/20 bg-gradient-to-r from-sky-600/10 via-sky-500/5 to-transparent p-10 text-center"
        >
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Need a custom product or quote?</h2>
          <p className="mt-3 text-sm text-slate-400">Contact our team directly for bespoke IT solutions tailored for your business requirements.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="tel:02038190333"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
            >
              <Phone size={16} />
              Call 02038190333
            </a>
            <a
              href="mailto:info@eslanditsolutions.com"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-sky-400 hover:bg-white/10"
            >
              Email Us
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
