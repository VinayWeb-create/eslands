export default function About() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-32 sm:px-10 lg:px-14">
      <div className="space-y-8 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glow">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">About</p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">A technology partner built for ambitious teams.</h1>
          <p className="max-w-3xl text-base leading-8 text-slate-300">We help organizations define digital strategy, build secure systems, and scale product delivery with confidence.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-surfaceSoft/90 p-8">
            <h2 className="text-2xl font-semibold text-white">Our mission</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">Deliver enterprise-grade consulting and engineering with modern UX, strong security, and measurable outcomes.</p>
            <div className="mt-8 space-y-4">
              {['Customer-first thinking', 'Transparent delivery', 'Secure systems', 'Sustained growth'].map((item) => (
                <div key={item} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-slate-950/90 p-4">
                  <div className="mt-1 h-10 w-10 rounded-3xl bg-gradient-to-br from-sky-500 to-violet-500 text-center text-white">✓</div>
                  <p className="text-sm text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-surfaceSoft/90 p-8">
            <h2 className="text-2xl font-semibold text-white">Leadership and milestones</h2>
            <div className="mt-8 space-y-5">
              {[
                { year: '2021', text: 'Founded to serve enterprise digital transformation initiatives.' },
                { year: '2022', text: 'Expanded delivery with cloud-native solutions and security operations.' },
                { year: '2024', text: 'Scaled to support global clients across finance, healthcare, and logistics.' },
              ].map((item) => (
                <div key={item.year} className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{item.year}</p>
                  <p className="mt-3 text-base leading-7 text-slate-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
