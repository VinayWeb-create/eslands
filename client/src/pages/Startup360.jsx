import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import '../components/startup360/startup360.css';
import Hero from '../components/startup360/Hero';
import Journey from '../components/startup360/Journey';
import OperatingSystem from '../components/startup360/OperatingSystem';
import Comparison from '../components/startup360/Comparison';
import Services from '../components/startup360/Services';
import GrowthEngine from '../components/startup360/GrowthEngine';
import Industries from '../components/startup360/Industries';
import Roadmap from '../components/startup360/Roadmap';
import WhyBento from '../components/startup360/WhyBento';
import Faq from '../components/startup360/Faq';
import FinalCta from '../components/startup360/FinalCta';
import { faqs, services } from '../components/startup360/data';

const SITE = 'https://eslanditsolutions.com';
const URL = `${SITE}/startup360`;

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Startup360',
    serviceType: 'Startup development and growth programme',
    url: URL,
    provider: { '@type': 'Organization', name: 'Esland IT Solutions', url: SITE },
    description: 'An end-to-end startup programme covering validation, registration, branding, product engineering, AI, marketing, automation and funding support.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Startup360 services',
      itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, description: s.tagline } })),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Startup360', item: URL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
];

export default function Startup360() {
  return (
    <div className="s360">
      {/* Title, description, canonical, OG and Twitter tags come from <Seo />; page-specific structured data lives here. */}
      <Helmet>
        <meta property="og:type" content="website" />
        <meta name="twitter:image" content={`${SITE}/og-image.svg`} />
        {schema.map((s) => (
          <script key={s['@type']} type="application/ld+json">{JSON.stringify(s)}</script>
        ))}
      </Helmet>

      <nav aria-label="Breadcrumb" className="sr-only">
        <ol><li><Link to="/">Home</Link></li><li aria-current="page">Startup360</li></ol>
      </nav>

      <Hero />
      <Journey />
      <OperatingSystem />
      <Comparison />
      <Services />
      <GrowthEngine />
      <Industries />
      <Roadmap />
      <WhyBento />
      <Faq />
      <FinalCta />
    </div>
  );
}
