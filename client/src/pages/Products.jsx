import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Star, Search, Sparkles, ArrowRight, ShieldCheck, Truck, Headphones, PackageSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import { MagneticButton, SectionHeading, ParticleField, reveal } from '../components/ui/primitives';

const products = [
  { id: 1, title: 'Enterprise Server Pro', image: '/images/Product-1.jpg', badge: 'Popular', category: 'Computers', rating: 5, price: '£2,499' },
  { id: 2, title: 'Cloud Storage Unit', image: '/images/Product-2.jpeg', badge: 'New', category: 'Networking', rating: 4, price: '£899' },
  { id: 3, title: 'Secure Gateway Firewall', image: '/images/Product-3.jpeg', badge: 'Sale', category: 'Networking', rating: 5, price: '£1,250' },
  { id: 4, title: 'Esland ERP Suite', image: '/images/Product-7.jpg', badge: 'Top Rated', category: 'Software', rating: 5, price: 'Custom SLA' },
  { id: 5, title: 'Developer Workstation', image: '/images/Product-5.jpg', badge: 'Custom', category: 'Computers', rating: 4, price: '£1,850' },
  { id: 6, title: 'Wireless Access Point X', image: '/images/Product-6.jpg', badge: 'New', category: 'Networking', rating: 4, price: '£299' }
];

const categories = ['All', 'Computers', 'Networking', 'Software', 'Electronics'];

const assurances = [
  { icon: ShieldCheck, title: 'Enterprise warranty', desc: 'Every unit is configured, tested and covered before it ships.' },
  { icon: Truck, title: 'Deployed for you', desc: 'Our engineers install, harden and hand over on site or in the cloud.' },
  { icon: Headphones, title: '24/7 SLA support', desc: 'Named specialists on call across every timezone you operate in.' },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      p.id.toString() === searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-gray-700 overflow-x-clip">
      <PageHero
        eyebrow="Enterprise Catalog"
        title="Hardware & software"
        highlight="built for uptime."
        sub="Enterprise-grade hardware, firewall gateways, and cloud software infrastructure engineered for maximum performance."
      />

      {/* Main Content */}
      <section className="ui-section ui-section--tight mx-auto max-w-7xl">
        {/* Filter & Search Bar */}
        <motion.div {...reveal()} className="ui-glass sticky top-[60px] lg:top-[76px] z-20 mb-10 flex flex-col gap-4 rounded-3xl p-3 sm:p-4 md:flex-row md:items-center md:justify-between">
          <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 scrollbar-hide" role="group" aria-label="Filter by category">
            {categories.map((cat) => {
              const on = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={on}
                  className={`relative shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                    on ? 'text-white' : 'text-gray-500 hover:text-[#003087]'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="productCat"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#003087] to-[#0057D8] shadow-[0_8px_20px_-8px_rgba(0,87,216,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          <label className="relative w-full md:max-w-xs">
            <span className="sr-only">Search catalog</span>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0057D8]" size={16} />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#E4E9F0] bg-white py-2.5 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-[#0057D8] focus:outline-none focus:ring-4 focus:ring-[#0057D8]/10 transition"
            />
          </label>
        </motion.div>

        {/* Product Cards Grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p, i) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="ui-card ui-spot group flex flex-col justify-between overflow-hidden p-3"
              >
                <div>
                  <div className="relative mb-5 h-52 w-full overflow-hidden rounded-[16px] bg-gray-50">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050B18]/45 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute right-3 top-3 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      {p.badge}
                    </span>
                  </div>

                  <div className="px-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#0057D8]">{p.category}</span>
                      <div className="flex gap-0.5 text-amber-400" aria-label={`${p.rating} out of 5 stars`}>
                        {[...Array(p.rating)].map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" />
                        ))}
                      </div>
                    </div>

                    <h3 className="mb-2 font-display text-xl font-extrabold tracking-tight text-gray-900 transition-colors group-hover:text-[#003087]">
                      {p.title}
                    </h3>
                  </div>
                </div>

                <div className="mx-3 mb-2 mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="font-display text-lg font-extrabold text-gray-900">{p.price}</div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold text-[#003087] transition-all hover:border-transparent hover:bg-gradient-to-r hover:from-[#003087] hover:to-[#0057D8] hover:text-white hover:shadow-[0_8px_20px_-8px_rgba(0,87,216,0.8)]"
                  >
                    Talk to Expert <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="ui-card ui-card--static mx-auto max-w-md p-10 text-center">
            <PackageSearch className="mx-auto text-[#0057D8]" size={36} />
            <h3 className="mt-4 font-display text-lg font-extrabold text-gray-900">No products match that search</h3>
            <p className="mt-2 text-sm text-gray-500">Try another category, or ask us. We source and configure hardware to order.</p>
            <button
              type="button"
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="ui-btn ui-btn--ghost ui-btn--sm mt-6"
            >
              <span className="relative z-10">Clear filters</span>
            </button>
          </motion.div>
        )}
      </section>

      {/* Assurances */}
      <section className="ui-section ui-section--tight bg-[var(--color-bg-surface)] border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Why buy from Esland" title="More than a box on a pallet." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {assurances.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} {...reveal(i * 0.08)} className="ui-card ui-spot p-7">
                <span className="ui-icon-tile"><Icon size={20} /></span>
                <h3 className="mt-5 font-display text-lg font-extrabold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ui-section ui-dark relative isolate overflow-hidden text-center">
        <div className="ui-cta-aurora" aria-hidden="true" />
        <ParticleField density={0.00006} color="147,197,253" className="z-0 opacity-60" />
        <motion.div {...reveal()} className="relative z-10 mx-auto max-w-3xl">
          <span className="ui-eyebrow ui-eyebrow--dark"><Sparkles size={13} /> Custom builds</span>
          <h2 className="mt-6 font-display text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl">
            Need a spec that isn&apos;t listed? <span className="ui-gradient-text--dark">We&apos;ll build it.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-slate-300">Tell us your workload and we&apos;ll recommend, procure and deploy the right hardware and software stack.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <MagneticButton to="/contact" variant="light" wrapperClassName="w-full sm:w-auto" className="w-full sm:w-auto">
              Request a quote <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton href="tel:02038190333" variant="ghost-dark" wrapperClassName="w-full sm:w-auto" className="w-full sm:w-auto">
              <Phone size={15} /> 020 3819 0333
            </MagneticButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
