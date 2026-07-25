import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Star, Search, Sparkles, MessageSquare, Tag } from 'lucide-react';

const products = [
  { id: 1, title: 'Various Versions', image: '/images/Product-1.jpg', badge: 'New', category: 'Electronics', rating: 4 },
  { id: 2, title: 'Various Versions', image: '/images/Product-2.jpeg', badge: 'New', category: 'Computers', rating: 4 },
  { id: 3, title: 'Various Versions', image: '/images/Product-3.jpeg', badge: 'New', category: 'Computers', rating: 4 },
  { id: 4, title: 'Various Versions', image: '/images/Product-4.png', badge: 'New', category: 'Networking', rating: 4 },
  { id: 5, title: 'Various Versions', image: '/images/Product-5.jpg', badge: 'New', category: 'Networking', rating: 4 },
  { id: 6, title: 'Various Versions', image: '/images/Product-6.jpg', badge: 'New', category: 'Networking', rating: 4 },
  { id: 7, title: 'Various Versions', image: '/images/Product-7.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 8, title: 'Various Versions', image: '/images/Product-8.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 9, title: 'Various Versions', image: '/images/Product-9.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 10, title: 'Various Versions', image: '/images/Product-10.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 11, title: 'Various Versions', image: '/images/Product-11.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 12, title: 'Various Versions', image: '/images/Product-12.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 13, title: 'Various Versions', image: '/images/Product-13.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 14, title: 'Various Versions', image: '/images/Product-14.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 15, title: 'Various Versions', image: '/images/Product-15.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 16, title: 'Various Versions', image: '/images/Product-16.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 17, title: 'Various Versions', image: '/images/Product-17.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 18, title: 'Various Versions', image: '/images/Product-18.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 19, title: 'Various Versions', image: '/images/Product-19.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 20, title: 'Various Versions', image: '/images/Product-20.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 21, title: 'Various Versions', image: '/images/Product-21.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 22, title: 'Various Versions', image: '/images/Product-22.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 23, title: 'Various Versions', image: '/images/Product-23.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 24, title: 'Various Versions', image: '/images/Product-24.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 25, title: 'Various Versions', image: '/images/Product-25.jpg', badge: 'New', category: 'Software', rating: 4 },
  { id: 26, title: 'Various Versions', image: '/images/Product-26.png', badge: 'New', category: 'Software', rating: 4 },
  { id: 27, title: 'Various Versions', image: '/images/Product-27.png', badge: 'New', category: 'Software', rating: 4 },
  { id: 28, title: 'Various Versions', image: '/images/Product-28.png', badge: 'New', category: 'Software', rating: 4 },
  { id: 29, title: 'Various Versions', image: '/images/Product-29.png', badge: 'New', category: 'Software', rating: 4 },
  { id: 30, title: 'Various Versions', image: '/images/Product-30.png', badge: 'New', category: 'Software', rating: 4 },
  { id: 31, title: 'Various Versions', image: '/images/Product-31.png', badge: 'New', category: 'Software', rating: 4 },
  { id: 32, title: 'Various Versions', image: '/images/Product-32.png', badge: 'New', category: 'Software', rating: 4 },
  { id: 33, title: 'Various Versions', image: '/images/Product-33.png', badge: 'New', category: 'Software', rating: 4 },
  { id: 34, title: 'Various Versions', image: '/images/Product-34.png', badge: 'New', category: 'Software', rating: 4 },
  { id: 35, title: 'Various Versions', image: '/images/Product-35.png', badge: 'New', category: 'Software', rating: 4 },
  { id: 36, title: 'Various Versions', image: '/images/Product-36.png', badge: 'New', category: 'Software', rating: 4 },
  { id: 37, title: 'Various Versions', image: '/images/Product-37.png', badge: 'New', category: 'Software', rating: 4 },
  { id: 38, title: 'Various Versions', image: '/images/Product-38.png', badge: 'New', category: 'Software', rating: 4 },
  { id: 39, title: 'Various Versions', image: '/images/Product-39.png', badge: 'New', category: 'Software', rating: 4 },
  { id: 40, title: 'Various Versions', image: '/images/Product-40.png', badge: 'New', category: 'Software', rating: 4 }
];

const categories = ['All', 'Computers', 'Networking', 'Software', 'Electronics'];

const categoryColors = {
  Computers: 'bg-sky-50 text-sky-600 border-sky-100',
  Networking: 'bg-orange-50 text-orange-600 border-orange-100',
  Software: 'bg-purple-50 text-purple-600 border-purple-100',
  Electronics: 'bg-emerald-50 text-emerald-600 border-emerald-100'
};

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query & selected category
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      p.id.toString() === searchQuery.trim() ||
      `Product ${p.id}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-white text-slate-700 overflow-x-hidden pt-[65px]">
      {/* Background Glows */}
      <div className="pointer-events-none fixed left-0 top-0 h-[400px] w-[400px] rounded-full bg-sky-500/5 blur-3xl" />
      <div className="pointer-events-none fixed right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-3xl" />

      {/* 1. Page Header with ban-4.jpg Background */}
      <section className="relative h-[300px] flex items-center justify-center border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/ban-4.jpg"
            alt="Products banner background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs uppercase tracking-[0.35em] text-sky-300 mb-2">Esland IT Solutions</p>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4 uppercase">
              Products
            </h1>
            <p className="text-slate-200 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
              View all our product listings on this page !!
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main content section */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-14">
        {/* Filtering & Search panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 rounded-[2rem] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-5 py-2.5 text-xs font-bold transition duration-300 border ${
                  selectedCategory === cat
                    ? 'bg-sky-500 border-sky-400 text-white shadow-lg'
                    : 'border-slate-200 text-slate-650 hover:border-slate-350 hover:text-slate-900 bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search products by ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Head Inner */}
        <div className="mb-10 text-center lg:text-left">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Our Extensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">Products</span> Showcase
          </h2>
          <p className="text-xs text-slate-500 tracking-wider">
            Showing {filteredProducts.length} premium tech items
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: (idx % 8) * 0.04 }}
                whileHover={{ y: -6 }}
                className="group rounded-3xl border border-slate-200/60 bg-white hover:border-sky-500/30 p-5 flex flex-col relative transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
              >
                {/* Badge "New" */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="rounded-full bg-sky-500 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                    {p.badge}
                  </span>
                </div>

                {/* Product ID Label */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="text-[10px] font-bold text-slate-400">
                    ID: #{String(p.id).padStart(2, '0')}
                  </span>
                </div>

                {/* Image frame (Light grey fill to pop images cleanly) */}
                <div className="h-44 w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 flex items-center justify-center overflow-hidden mb-5">
                  <img
                    src={p.image}
                    alt={`Product ${p.id}`}
                    className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Product details */}
                <div className="flex-1 flex flex-col">
                  {/* Category */}
                  <span className={`inline-block border self-start rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider mb-3 ${
                    categoryColors[p.category] || 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    {p.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-slate-800 mb-2 group-hover:text-sky-600 transition duration-200">
                    Product {p.id} ({p.title})
                  </h3>

                  {/* Pricing / Call Us */}
                  <div className="my-3 flex items-center justify-between">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Pricing</span>
                    <span className="text-sm font-black text-sky-600">{p.price}</span>
                  </div>

                  {/* Rating (Warm Gold color) */}
                  <div className="flex gap-0.5 text-amber-400 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        fill={i < p.rating ? 'currentColor' : 'none'}
                        className={i < p.rating ? 'text-amber-400' : 'text-slate-200'}
                      />
                    ))}
                  </div>

                  {/* CTA Area */}
                  <div className="mt-5 grid grid-cols-2 gap-2 pt-4 border-t border-slate-100">
                    <a
                      href="tel:02038190333"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-[10px] font-bold text-slate-700 hover:bg-slate-100 transition-all duration-300"
                    >
                      <Phone size={10} /> Call Us
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 py-2.5 text-[10px] font-bold text-white hover:brightness-110 shadow-lg shadow-sky-500/10 transition-all duration-300"
                    >
                      <MessageSquare size={10} /> Enquire
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 border border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50">
            <Tag className="mx-auto text-slate-400 mb-4" size={40} />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No products found</h3>
            <p className="text-sm text-slate-500">Try adjusting your search query or selected category.</p>
          </div>
        )}

        {/* Bottom Procurement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-[2.5rem] border border-sky-200 bg-gradient-to-r from-sky-50 to-indigo-50/50 p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden shadow-sm"
        >
          <div className="absolute -right-24 -top-24 h-60 w-60 rounded-full bg-sky-500/5 blur-3xl" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-600">
              <Sparkles size={10} /> CUSTOM HARDWARE PROCUREMENT
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Need a customized product or bulk quote?</h3>
            <p className="text-sm text-slate-600 max-w-xl">
              Our hardware procurement specialists work with top tier vendors to source custom specifications for servers, storage, enterprise networking, and workstations.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3">
            <a
              href="tel:02038190333"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:brightness-110 transition"
            >
              <Phone size={14} /> Call 02038190333
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Request Quote
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
