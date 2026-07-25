import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const pages = {
  '/': ['Engineering Digital Excellence | Esland IT Solutions', 'Enterprise software, AI solutions, cloud infrastructure and digital transformation services from Esland IT Solutions.'],
  '/services': ['Technology Services | Esland IT Solutions', 'Explore Esland IT Solutions services spanning product engineering, AI, cloud, security, design and digital transformation.'],
  '/products': ['Technology Solutions | Esland IT Solutions', 'Explore tailored technology solutions from Esland IT Solutions.'],
  '/about': ['About Esland IT Solutions', 'Meet the technology partner helping ambitious organisations build secure, scalable digital systems.'],
  '/careers': ['Careers | Esland IT Solutions', 'Explore opportunities to build meaningful technology with Esland IT Solutions.'],
  '/contact': ['Start a Project | Esland IT Solutions', 'Talk with Esland IT Solutions about your next digital product, AI, cloud or technology transformation initiative.'],
};

export default function Seo() {
  const { pathname } = useLocation();
  const [title, description] = pages[pathname] || pages['/'];
  const canonical = `https://eslanditsolutions.com${pathname === '/' ? '' : pathname}`;
  const organization = { '@context': 'https://schema.org', '@type': 'Organization', name: 'Esland IT Solutions', url: 'https://eslanditsolutions.com', email: 'info@eslanditsolutions.com', telephone: '+442038190333', foundingDate: '2013', address: { '@type': 'PostalAddress', streetAddress: 'Suite-G, Weller House, 58-60 Longbridge Rd', addressLocality: 'Barking', addressRegion: 'London', postalCode: 'IG11 8RT', addressCountry: 'GB' } };
  return <Helmet><title>{title}</title><meta name="description" content={description} /><link rel="canonical" href={canonical} /><meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:image" content="https://eslanditsolutions.com/og-image.svg" /><meta property="og:url" content={canonical} /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={title} /><meta name="twitter:description" content={description} /><script type="application/ld+json">{JSON.stringify(organization)}</script></Helmet>;
}
