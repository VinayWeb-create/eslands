import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Briefcase, MapPin, Clock } from 'lucide-react';
import api from '../lib/api';

const departments = ['All', 'Engineering', 'Product', 'Security', 'Operations'];

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [selected, setSelected] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        const response = await api.get('/api/careers');
        setJobs(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const filtered = selected === 'All' ? jobs : jobs.filter((job) => job.department === selected);

  return (
    <div className="relative min-h-screen bg-white text-gray-700 overflow-x-hidden pt-[90px] pb-24">
      {/* Soft Glow Backdrop */}
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-50/50 blur-[160px]" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-badge mb-4 inline-flex">
            <Briefcase size={14} /> Join Esland Engineering
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-gray-900 tracking-tight leading-tight">
            Build Modern Enterprise <br />
            <span className="text-shimmer">
              Software Systems
            </span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed mt-4 font-medium">
            Join an elite team focused on zero-trust cloud platforms, high-concurrency microservices, and digital transformation.
          </p>
        </div>

        {/* Department Pill Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setSelected(dept)}
              className={`rounded-lg px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                selected === dept
                  ? 'border-[#003087] bg-[#003087] text-white shadow-sm'
                  : 'border-[#E4E9F0] bg-white text-gray-500 hover:text-[#003087] hover:border-[#003087]'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="h-48 animate-pulse rounded-lg bg-gray-50 border border-[#E4E9F0]" />
            ))
          ) : filtered.length === 0 ? (
            <div className="md:col-span-2 text-center py-16 rounded-lg border border-[#E4E9F0] bg-gray-50 text-gray-500 font-semibold">
              No active open positions in this department right now. Email your CV to hr@eslanditsolutions.com
            </div>
          ) : (
            filtered.map((job) => (
              <motion.article
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-lg border border-[#E4E9F0] bg-white p-8 hover:border-[#003087] transition-all duration-300 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold text-[#003087] uppercase tracking-widest">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                      <Clock size={12} /> {job.type}
                    </span>
                  </div>

                  <h2 className="text-2xl font-display font-extrabold text-gray-900 mb-2">{job.title}</h2>
                  <p className="text-xs text-[#003087] font-semibold flex items-center gap-1 mb-4">
                    <MapPin size={13} /> {job.location}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                    {job.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-semibold">Full Benefits Package</span>
                  <a
                    href={`mailto:hr@eslanditsolutions.com?subject=Application for ${job.title}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#003087] hover:bg-[#002068] text-white font-bold px-5 py-2.5 text-xs transition uppercase tracking-wider shadow"
                  >
                    Apply Now <ArrowRight size={14} />
                  </a>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
