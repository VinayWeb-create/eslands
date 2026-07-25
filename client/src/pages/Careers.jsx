import { useEffect, useState } from 'react';
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
    <section className="relative mx-auto max-w-7xl px-6 py-32 sm:px-10 lg:px-14">
      <div className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glow">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Careers</p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">Open roles for people shaping modern technology.</h1>
          <p className="max-w-3xl text-base leading-8 text-slate-300">Join a team focused on secure digital platforms, cloud engineering, and transformative delivery models.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {departments.map((dept) => (
            <button key={dept} type="button" onClick={() => setSelected(dept)} className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${selected === dept ? 'border-cyan-300 bg-cyan-400/10 text-cyan-300' : 'border-white/10 text-slate-300 hover:border-cyan-300 hover:text-white'}`}>
              {dept}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {loading ? Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-44 animate-pulse rounded-[1.75rem] bg-surfaceSoft/90" />
          )) : filtered.length === 0 ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-surfaceSoft/90 p-8 text-slate-300">No positions found for this department.</div>
          ) : filtered.map((job) => (
            <article key={job._id} className="rounded-[1.75rem] border border-white/10 bg-surfaceSoft/90 p-8 transition hover:-translate-y-1 hover:shadow-glow">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{job.department}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{job.title}</h2>
                </div>
                <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">{job.type}</span>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-300">{job.location}</p>
              <p className="mt-6 text-sm leading-7 text-slate-300">{job.description}</p>
              <button type="button" className="mt-8 inline-flex items-center rounded-full border border-cyan-300/20 bg-white/5 px-6 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10">Apply Now</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
