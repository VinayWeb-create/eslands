import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Mail, Rocket, GraduationCap, HeartHandshake, Globe2 } from 'lucide-react';
import api from '../lib/api';
import PageHero from '../components/ui/PageHero';
import { SectionHeading, reveal } from '../components/ui/primitives';

const departments = ['All', 'Engineering', 'Product', 'Security', 'Operations'];

const perks = [
  { icon: Rocket, title: 'Real enterprise scale', desc: 'Ship zero-trust platforms and microservices that run critical client operations.' },
  { icon: GraduationCap, title: 'Certification budget', desc: 'AWS, Azure and Google Cloud certifications funded and scheduled into your sprint.' },
  { icon: Globe2, title: 'Hybrid & global', desc: 'Work from London or remotely with a team spread across timezones.' },
  { icon: HeartHandshake, title: 'Senior mentorship', desc: 'Pair with principal architects on discovery, design reviews and incident drills.' },
];

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

  const list = Array.isArray(jobs) ? jobs : [];
  const filtered = selected === 'All' ? list : list.filter((job) => job.department === selected);

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-gray-700 overflow-x-clip">
      <PageHero
        eyebrow="Join Esland Engineering"
        title="Build modern enterprise"
        highlight="software systems."
        sub="Join an elite team focused on zero-trust cloud platforms, high-concurrency microservices, and digital transformation."
      />

      {/* Perks */}
      <section className="ui-section ui-section--tight bg-[var(--color-bg-surface)] border-b border-[var(--color-border)]">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} {...reveal(i * 0.07)} className="ui-card ui-spot p-6">
              <span className="ui-icon-tile"><Icon size={20} /></span>
              <h2 className="mt-5 font-display text-base font-extrabold text-gray-900">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="ui-section mx-auto max-w-7xl">
        <SectionHeading eyebrow="Open roles" title="Find your next mission." />

        {/* Department Pill Selector */}
        <div className="mt-10 mb-10 flex justify-center">
          <div className="ui-glass -mx-1 flex max-w-full gap-1 overflow-x-auto rounded-full p-1.5 scrollbar-hide" role="group" aria-label="Filter by department">
            {departments.map((dept) => {
              const on = selected === dept;
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelected(dept)}
                  aria-pressed={on}
                  className={`relative shrink-0 rounded-full px-4 sm:px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                    on ? 'text-white' : 'text-gray-500 hover:text-[#003087]'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="careerDept"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#003087] to-[#0057D8] shadow-[0_8px_20px_-8px_rgba(0,87,216,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{dept}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="ui-card ui-card--static h-56 overflow-hidden p-8">
                <div className="h-5 w-24 animate-pulse rounded-full bg-gray-100" />
                <div className="mt-6 h-7 w-2/3 animate-pulse rounded-lg bg-gray-100" />
                <div className="mt-4 h-4 w-full animate-pulse rounded bg-gray-100" />
                <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-gray-100" />
              </div>
            ))
          ) : filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="ui-card ui-card--static md:col-span-2 px-6 py-14 text-center">
              <span className="ui-icon-tile mx-auto"><Mail size={20} /></span>
              <p className="mx-auto mt-5 max-w-lg font-semibold text-gray-600">
                No active open positions in this department right now. Email your CV to{' '}
                <a href="mailto:hr@eslanditsolutions.com" className="text-[#0057D8] underline-offset-4 hover:underline">hr@eslanditsolutions.com</a>
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filtered.map((job, i) => (
                <motion.article
                  layout
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  className="ui-card ui-spot group flex flex-col justify-between p-6 sm:p-8"
                >
                  <div>
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#003087]">
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1 rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        <Clock size={12} /> {job.type}
                      </span>
                    </div>

                    <h2 className="mb-2 font-display text-2xl font-extrabold tracking-tight text-gray-900 transition-colors group-hover:text-[#003087]">{job.title}</h2>
                    <p className="mb-4 flex items-center gap-1 text-xs font-semibold text-[#0057D8]">
                      <MapPin size={13} /> {job.location}
                    </p>
                    <p className="mb-6 text-sm leading-relaxed text-gray-600">
                      {job.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">
                    <span className="text-xs font-semibold text-gray-500">Full Benefits Package</span>
                    <a
                      href={`mailto:hr@eslanditsolutions.com?subject=Application for ${job.title}`}
                      className="ui-btn ui-btn--primary ui-btn--sm"
                    >
                      <span className="relative z-10 inline-flex items-center gap-2">Apply Now <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" /></span>
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
