import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Star, Search, Sparkles, MessageSquare, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, title: 'Enterprise Server Pro', image: '/images/Product-1.jpg', badge: 'Popular', category: 'Computers', rating: 5, price: '£2,499' },
  { id: 2, title: 'Cloud Storage Unit', image: '/images/Product-2.jpeg', badge: 'New', category: 'Networking', rating: 4, price: '£899' },
  { id: 3, title: 'Secure Gateway Firewall', image: '/images/Product-3.jpeg', badge: 'Sale', category: 'Networking', rating: 5, price: '£1,250' },
  { id: 4, title: 'Esland ERP Suite', image: '/images/Product-7.jpg', badge: 'Top Rated', category: 'Software', rating: 5, price: 'Custom SLA' },
  { id: 5, title: 'Developer Workstation', image: '/images/Product-5.jpg', badge: 'Custom', category: 'Computers', rating: 4, price: '£1,850' },
  { id: 6, title: 'Wireless Access Point X', image: '/images/Product-6.jpg', badge: 'New', category: 'Networking', rating: 4, price: '£299' }
];

const categories = ['All', 'Computers', 'Networking', 'Software', 'Electronics'];

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
    <div className="relative min-h-screen bg-white text-gray-700 overflow-x-hidden pt-[65px]">
      {/* Background Glows */}
      <div className="pointer-events-none fixed left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-50/40 blur-[150px]" />

      {/* Hero Header */}
      <section className="relative py-20 px-6 border-b border-[#E4E9F0] overflow-hidden bg-[#F8FAFC]">
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="section-badge mb-4 inline-flex">
              <Sparkles size={14} /> Enterprise Catalog
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-gray-900 mb-4 uppercase">
              Hardware & Software Solutions
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-medium">
              Enterprise-grade hardware, firewall gateways, and cloud software infrastructure engineered for maximum performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 rounded-lg border border-[#E4E9F0] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-5 py-2 text-xs font-bold uppercase tracking-wider transition duration-200 border ${
                  selectedCategory === cat
                    ? 'bg-[#003087] border-[#003087] text-white shadow'
                    : 'border-[#E4E9F0] text-gray-500 hover:text-[#003087] hover:border-[#003087] bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#003087]" size={16} />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#E4E9F0] bg-white py-2.5 pl-11 pr-4 text-xs text-gray-700 placeholder-gray-400 focus:border-[#003087] focus:outline-none transition"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-lg border border-[#E4E9F0] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#003087] hover:shadow-md overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full rounded-lg overflow-hidden mb-6 bg-gray-50 border border-[#E4E9F0]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-md bg-[#003087] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                      {p.badge}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#003087]">{p.category}</span>
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(p.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-extrabold text-gray-900 mb-2 group-hover:text-[#003087] transition-colors">
                    {p.title}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-lg font-black text-gray-900">{p.price}</div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 text-xs font-bold text-[#003087] hover:bg-[#003087] hover:text-white transition-all"
                  >
                    Talk to Expert <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
