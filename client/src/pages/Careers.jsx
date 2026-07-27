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
    <div className="relative min-h-screen bg-slate-950 text-slate-300 overflow-x-hidden pt-[90px] pb-24">
      {/* Glow Backdrop */}
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[160px]" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-4">
            <Briefcase size={14} /> Join Esland Engineering
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Build Modern Enterprise <br />
            <span className="animate-text-shimmer">
              Software Systems
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mt-4 font-medium">
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
              className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                selected === dept
                  ? 'border-sky-400 bg-sky-500/20 text-sky-300 shadow-lg shadow-sky-500/10'
                  : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-white hover:border-white/20'
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
              <div key={idx} className="h-48 animate-pulse rounded-[2rem] bg-slate-900/60 border border-white/5" />
            ))
          ) : filtered.length === 0 ? (
            <div className="md:col-span-2 text-center py-16 rounded-[2rem] border border-white/10 bg-slate-900/60 text-slate-400 font-semibold">
              No active open positions in this department right now. Email your CV to hr@eslanditsolutions.com
            </div>
          ) : (
            filtered.map((job) => (
              <motion.article
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="spotlight-card rounded-[2.5rem] border border-white/10 bg-slate-900/90 backdrop-blur-2xl p-8 hover:border-sky-400/40 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-[10px] font-bold text-sky-300 uppercase tracking-widest">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Clock size={12} /> {job.type}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-2">{job.title}</h2>
                  <p className="text-xs text-sky-400 font-semibold flex items-center gap-1 mb-4">
                    <MapPin size={13} /> {job.location}
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                    {job.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-semibold">Full Benefits Package</span>
                  <a
                    href={`mailto:hr@eslanditsolutions.com?subject=Application for ${job.title}`}
                    className="inline-flex items-center gap-2 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-5 py-2.5 text-xs transition shadow uppercase tracking-wider"
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
