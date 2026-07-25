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
    <section className="relative mx-auto max-w-7xl px-6 py-32 sm:px-10 lg:px-14 bg-white">
      <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-md">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600 font-bold">Careers</p>
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">Open roles for people shaping modern technology.</h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600">Join a team focused on secure digital platforms, cloud engineering, and transformative delivery models.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {departments.map((dept) => (
            <button key={dept} type="button" onClick={() => setSelected(dept)} className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${selected === dept ? 'border-sky-500 bg-sky-50 text-sky-600' : 'border-slate-200 text-slate-600 hover:border-sky-500/30 hover:text-slate-800 bg-white'}`}>
              {dept}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {loading ? Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-44 animate-pulse rounded-[1.75rem] bg-slate-100" />
          )) : filtered.length === 0 ? (
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 text-slate-500">No positions found for this department.</div>
          ) : filtered.map((job) => (
            <article key={job._id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:shadow-md hover:border-sky-500/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-sky-600 font-bold">{job.department}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">{job.title}</h2>
                </div>
                <span className="rounded-full border border-slate-200 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-600 bg-white">{job.type}</span>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-650">{job.location}</p>
              <p className="mt-6 text-sm leading-7 text-slate-600">{job.description}</p>
              <button type="button" className="mt-8 inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-6 py-3 text-sm font-semibold text-sky-600 transition hover:bg-sky-100/50">Apply Now</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
