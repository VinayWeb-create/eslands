export const site = {
  name: 'Onebridge Infotech',
  legalName: 'Onebridge Infotech Pvt Ltd',
  product: 'Startup360',
  url: 'https://www.onebridgeinfotech.com',
  path: '/startup360',
  email: 'info@onebridgeinfotech.com',
  phone: '+91 939835 5196',
  phoneE164: '+919398355196',
  whatsapp: 'https://wa.me/919398355196',
  foundingYear: 2017,
  address: {
    street: '202, Sathyabama Complex, Bhagya Nagar Colony, KPHB',
    locality: 'Hyderabad',
    region: 'Telangana',
    postalCode: '500072',
    country: 'IN',
  },
  links: {
    home: '/',
    about: '/about',
    services: '/services',
    caseStudies: '/case-studies',
    contact: '/contact',
    careers: '/careers',
    blog: '/blog',
  },
} as const;

export const pageUrl = `${site.url}${site.path}`;

export const consultationHref = `mailto:${site.email}?subject=${encodeURIComponent(
  'Startup360 consultation request',
)}`;
