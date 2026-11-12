import type { Metadata } from 'next';
import { faqs, services } from '@/content/startup360';
import { pageUrl, site } from '@/lib/site';

export const startup360Seo = {
  title: 'Startup Services in Hyderabad & India | Startup360 by Onebridge Infotech',
  description:
    'Startup360 is Onebridge Infotech’s complete startup ecosystem in Hyderabad — idea validation, business planning, registration assistance, funding readiness, branding, MVP development, AI, cloud, marketing and automation from one team.',
  keywords: [
    'startup services Hyderabad',
    'startup consulting India',
    'MVP development Hyderabad',
    'startup registration assistance',
    'funding readiness pitch deck',
    'AI startup development',
    'Startup360',
    'Onebridge Infotech',
  ],
};

export const startup360Metadata: Metadata = {
  title: startup360Seo.title,
  description: startup360Seo.description,
  keywords: startup360Seo.keywords,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'website',
    url: pageUrl,
    siteName: site.name,
    title: startup360Seo.title,
    description: startup360Seo.description,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: startup360Seo.title,
    description: startup360Seo.description,
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
};

const orgId = `${site.url}/#organization`;

export const breadcrumbItems = [
  { name: 'Home', url: site.url },
  { name: 'Startup Services', url: `${site.url}${site.links.services}` },
  { name: 'Startup360', url: pageUrl },
] as const;

/** One @graph so crawlers resolve Organization / WebPage / Service / FAQ / Breadcrumb together. */
export function startup360JsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        email: site.email,
        telephone: site.phoneE164,
        foundingDate: String(site.foundingYear),
        logo: `${site.url}/logo.png`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        areaServed: [{ '@type': 'Country', name: 'India' }],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: site.phoneE164,
          contactType: 'sales',
          areaServed: 'IN',
          availableLanguage: ['en', 'hi', 'te'],
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: startup360Seo.title,
        description: startup360Seo.description,
        isPartOf: { '@type': 'WebSite', url: site.url, name: site.name },
        about: { '@id': `${pageUrl}#service` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: 'Startup360',
        serviceType: 'Startup support ecosystem',
        provider: { '@id': orgId },
        areaServed: { '@type': 'Country', name: 'India' },
        description: startup360Seo.description,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Startup360 services',
          itemListElement: services.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: `${s.name} — Startup360`, description: s.tagline },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: breadcrumbItems.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: b.url })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}
