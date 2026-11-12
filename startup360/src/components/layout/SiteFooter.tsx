import { site } from '@/lib/site';

const columns = [
  {
    title: 'Startup360',
    links: [
      { href: '#journey', label: 'Startup journey' },
      { href: '#ecosystem', label: 'Operating system' },
      { href: '#services', label: 'Services' },
      { href: '#roadmap', label: 'Success roadmap' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: site.links.about, label: 'About Onebridge' },
      { href: site.links.services, label: 'All services' },
      { href: site.links.caseStudies, label: 'Case studies' },
      { href: site.links.careers, label: 'Careers' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { href: `mailto:${site.email}`, label: site.email },
      { href: `tel:${site.phoneE164}`, label: site.phone },
      { href: site.whatsapp, label: 'WhatsApp the founder line' },
      { href: site.links.contact, label: 'Contact page' },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">{site.legalName}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Technology consulting and services from Hyderabad since {site.foundingYear}. Startup360 is a commercial service — not a
            government programme. Regulated filings are completed by licensed professionals.
          </p>
          <address className="mt-5 text-sm not-italic leading-relaxed text-subtle">
            {site.address.street},<br />
            {site.address.locality}, {site.address.region} {site.address.postalCode}
          </address>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted transition hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-subtle sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
