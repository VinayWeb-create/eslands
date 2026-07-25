export default function About() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-32 sm:px-10 lg:px-14 bg-white">
      <div className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-md">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600">About</p>
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">A technology partner built for ambitious teams.</h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600">We help organizations define digital strategy, build secure systems, and scale product delivery with confidence.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Our mission</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">Deliver enterprise-grade consulting and engineering with modern UX, strong security, and measurable outcomes.</p>
            <div className="mt-8 space-y-4">
              {['Customer-first thinking', 'Transparent delivery', 'Secure systems', 'Sustained growth'].map((item) => (
                <div key={item} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-500 text-center text-white font-bold">✓</div>
                  <p className="text-sm text-slate-700 font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Leadership and milestones</h2>
            <div className="mt-8 space-y-5">
              {[
                { year: '2013', text: 'Founded by Naresh Pathi to deliver practical technology solutions for businesses.' },
                { year: '2022', text: 'Expanded delivery with cloud-native solutions and security operations.' },
                { year: '2024', text: 'Scaled to support global clients across finance, healthcare, and logistics.' },
              ].map((item) => (
                <div key={item.year} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.35em] text-sky-600 font-bold">{item.year}</p>
                  <p className="mt-3 text-base leading-7 text-slate-650">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
