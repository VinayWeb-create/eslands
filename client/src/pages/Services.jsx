import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe, Smartphone, Search, Code2, Network, Tag,
  Palette, PlayCircle, ShoppingCart, RotateCcw, Aperture, Megaphone,
  ArrowRight, Check, Phone, Mail
} from 'lucide-react';

export const services = [
  {
    id: 'web-development',
    label: 'Web Development',
    icon: Globe,
    color: '#003087',
    iconBg: 'from-[#003087] to-[#0057D8]',
    heading: 'Enterprise Web & Cloud Application Engineering',
    subheading: 'High-converting, resilient web platforms built to scale.',
    image: '/images/web.png',
    body: 'Esland IT Solutions architects enterprise web platforms engineered for speed, security, and conversion. Our engineering stack leverages React, Node.js, Next.js, and serverless cloud topology to ensure lightning-fast performance across global edge networks.\n\nFrom customer-facing portals to high-traffic e-commerce systems, our team handles end-to-end web architecture, API integrations, and continuous maintenance.',
    features: [
      'Responsive multi-device architecture',
      'SEO-optimized clean semantic structure',
      'CMS & Headless API integrations',
      'Custom enterprise portals & dashboards',
      'Conversion optimization & load speed tuning',
      '24/7 SLA maintenance and monitoring',
    ],
  },
  {
    id: 'mobile-development',
    label: 'Mobile Development',
    icon: Smartphone,
    color: '#003087',
    iconBg: 'from-[#003087] to-[#0057D8]',
    heading: 'Native & Cross-Platform Mobile Applications',
    subheading: 'iOS & Android mobile solutions for seamless client engagement.',
    image: '/images/mobile.png',
    body: 'We deliver high-performance mobile applications across iOS and Android ecosystems. Utilizing Swift, Kotlin, React Native, and Flutter, we construct intuitive mobile experiences integrated directly into corporate backend microservices.',
    features: [
      'iOS (Swift) & Android (Kotlin) native apps',
      'React Native & Flutter cross-platform',
      'Biometric authentication & encrypted storage',
      'Push notification & real-time telemetry',
      'App Store & Google Play publishing',
      'Offline sync & background processing',
    ],
  },
  {
    id: 'software-development',
    label: 'Software Development',
    icon: Code2,
    color: '#003087',
    iconBg: 'from-[#003087] to-[#0057D8]',
    heading: 'Bespoke Enterprise Software Engineering',
    subheading: 'Tailored software solutions designed around complex business workflows.',
    image: '/images/software-des.png',
    body: 'We build custom software systems engineered for corporate scale. Whether automating core operations, developing internal workflow engines, or creating secure API middleware, our solutions are built to last.',
    features: [
      'Microservices & event-driven architecture',
      'RESTful & GraphQL API gateways',
      'Database design & high-speed caching',
      'Role-based access control (RBAC)',
      'Legacy software migration & integration',
      'Automated testing & CI/CD deployment',
    ],
  },
  {
    id: 'networking',
    label: 'Networking & Infrastructure',
    icon: Network,
    color: '#003087',
    iconBg: 'from-[#003087] to-[#0057D8]',
    heading: 'Zero-Trust Network Infrastructure & Management',
    subheading: 'Robust stability, security, and flexibility for enterprise networks.',
    image: '/images/network.png',
    body: 'Enterprise networking solutions providing secure interconnectivity, proactive monitoring, and high-speed data transfer across cloud and multi-site environments.',
    features: [
      'LAN, WAN, and Zero-Trust Mesh configuration',
      'Firewall & automated threat monitoring',
      'VPN & remote secure workforce access',
      '99.99% Uptime monitoring SLAs',
      'Cisco, Juniper, and HP Enterprise support',
      'Infrastructure capacity planning',
    ],
  },
  {
    id: 'naming',
    label: 'Professional Naming',
    icon: Tag,
    color: '#003087',
    iconBg: 'from-[#003087] to-[#0057D8]',
    heading: 'Strategic Enterprise Brand Naming & Positioning',
    subheading: 'Establishing authoritative brand identities from day one.',
    image: null,
    body: 'We conduct trademark verification, linguistic checks, and brand positioning analysis to craft authoritative product and company names that command instant recognition in modern enterprise domains.',
    features: [
      'Linguistic & cultural validation checks',
      'Trademark availability screening',
      'Strategic market alignment analysis',
      'Complete corporate identity positioning',
    ],
  },
  {
    id: 'branding',
    label: 'Branding & Identity',
    icon: Palette,
    color: '#003087',
    iconBg: 'from-[#003087] to-[#0057D8]',
    heading: 'Cohesive Design Systems & Corporate Branding',
    subheading: 'Unified visual assets crafted for premium market authority.',
    image: '/images/brand.jpeg',
    body: 'We design complete corporate visual systems—encompassing corporate colors, typography scales, vector assets, and responsive UI components that project premium market quality across all endpoints.',
    features: [
      'Corporate color palette definition',
      'Typography systems & brand guidelines',
      'Responsive component libraries (Figma)',
      'Vector asset & collateral creation',
    ],
  },
  {
    id: 'animation',
    label: '2D & Motion Branding',
    icon: PlayCircle,
    color: '#003087',
    iconBg: 'from-[#003087] to-[#0057D8]',
    heading: 'Premium Explainer & System Motion Graphics',
    subheading: 'Simplifying complex enterprise processes with high-quality visual stories.',
    image: '/images/ani.png',
    body: 'From conceptual architectural breakdowns to software product demos, our custom motion graphics clearly translate advanced infrastructure designs into simple, engaging executive stories.',
    features: [
      'Storyboard conceptual development',
      'Professional explainer scripting',
      '2D vector character & flow animations',
      'Bespoke product demo overlays',
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-commerce Platforms',
    icon: ShoppingCart,
    color: '#003087',
    iconBg: 'from-[#003087] to-[#0057D8]',
    heading: 'Scalable Enterprise E-Commerce Engines',
    subheading: 'Omnichannel online storefronts designed for high transaction volume.',
    image: '/images/eco-mm.png',
    body: 'Custom e-commerce platforms featuring integrated payment gateways, automated inventory sync, PCI-DSS compliance, and frictionless checkout flows.',
    features: [
      'Custom Shopify, WooCommerce & Headless stores',
      'PCI-DSS compliant payment gateway setup',
      'ERP & inventory system sync',
      'High-concurrency checkout performance',
    ],
  },
  {
    id: 'seo-marketing',
    label: 'SEO & Growth Marketing',
    icon: Search,
    color: '#003087',
    iconBg: 'from-[#003087] to-[#0057D8]',
    heading: 'Search Engine Dominance & Growth Marketing',
    subheading: 'Organic search rankings and targeted B2B conversion engines.',
    image: '/images/s-1.png',
    body: 'Data-driven technical SEO, content strategy, and search optimization designed to capture qualified commercial intent keywords on Google and Bing.',
    features: [
      'Technical SEO audits & Core Web Vitals optimization',
      'Commercial keyword positioning',
      'Content strategy & authority building',
      'Analytics, lead tracking & CRM reporting',
    ],
  },
  {
    id: 'redesign',
    label: 'System Modernization',
    icon: RotateCcw,
    color: '#003087',
    iconBg: 'from-[#003087] to-[#0057D8]',
    heading: 'Zero-Downtime System & UX Modernization',
    subheading: 'Transform legacy applications into modern, cloud-native platforms.',
    image: '/images/re-1.png',
    body: 'Modernize legacy codebases, refactor user interfaces, and migrate data seamlessly with zero disruption to active business operations.',
    features: [
      'Full UI/UX refresh & responsive design',
      'Page speed & performance optimization',
      'Zero-downtime database migration',
      'SEO preservation during system redesign',
    ],
  },
  {
    id: 'logo-design',
    label: 'Logo & Brand Systems',
    icon: Aperture,
    color: '#003087',
    iconBg: 'from-[#003087] to-[#0057D8]',
    heading: 'Iconic Enterprise Logo & Vector Design',
    subheading: 'Crafting memorable visual identities for technology companies.',
    image: '/images/log-des.png',
    body: 'Vector-precision logo design engineered to look exceptional across digital app icons, website headers, and corporate collateral.',
    features: [
      'Multiple vector concept iterations',
      'Dark & light mode logo variants',
      'Scalable SVG, EPS, AI master files',
      'Logo usage & clear space guidelines',
    ],
  },
  {
    id: 'social-media',
    label: 'Social Media Marketing',
    icon: Megaphone,
    color: '#003087',
    iconBg: 'from-[#003087] to-[#0057D8]',
    heading: 'Enterprise B2B Social & Digital Campaigns',
    subheading: 'Expand brand reach and engage decision-makers across LinkedIn & social channels.',
    image: '/images/social-2.png',
    body: 'Targeted social media management, paid B2B campaigns, and content execution tailored for executive audiences.',
    features: [
      'LinkedIn & corporate social strategy',
      'B2B paid ad campaign management',
      'High-quality visual content creation',
      'Monthly performance telemetry reporting',
    ],
  },
];

export default function Services() {
  const [activeId, setActiveId] = useState('web-development');
  const location = useLocation();
  const active = services.find((s) => s.id === activeId) || services[0];

  useEffect(() => {
    const requested = location.hash.slice(1);
    if (services.some((service) => service.id === requested)) setActiveId(requested);
  }, [location.hash]);

  const selectService = (id) => {
    setActiveId(id);
    window.history.replaceState(null, '', `/services#${id}`);
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-700 overflow-x-hidden pt-[65px]">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-50/40 blur-[150px]" />

      {/* Page Banner */}
      <section className="relative h-[240px] flex items-center justify-center border-b border-[#E4E9F0] overflow-hidden bg-[#F8FAFC]">
        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full text-center">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="section-badge mb-3 inline-flex">
              Esland Capabilities
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-gray-900 mb-3 uppercase">
              Enterprise Services
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base leading-relaxed font-medium">
              Mission-critical technology solutions engineered to scale your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Layout */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-14 relative z-10">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-[98px] lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
            <div className="rounded-lg border border-[#E4E9F0] bg-white p-4 shadow-sm">
              <p className="mb-4 px-3 text-[10px] uppercase tracking-[0.25em] text-[#003087] font-bold">Select Capability</p>
              <nav className="space-y-1.5">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => selectService(s.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-xs font-bold transition-all duration-200 border ${
                      activeId === s.id
                        ? 'bg-blue-50 text-[#003087] border-[#DCE8FF]'
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-[#003087]'
                    }`}
                  >
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${s.iconBg} text-white`}>
                      <s.icon size={14} />
                    </div>
                    <span className="truncate">{s.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="rounded-lg border border-[#E4E9F0] bg-white p-8 sm:p-12 shadow-sm overflow-hidden"
            >
              {/* Service Header */}
              <div className="mb-8 flex items-start gap-6">
                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${active.iconBg} text-white`}>
                  <active.icon size={30} />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#003087] block mb-1">Esland Capability</span>
                  <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-gray-900 leading-tight">{active.heading}</h2>
                  <p className="mt-2 text-sm font-semibold text-[#003087]">{active.subheading}</p>
                </div>
              </div>

              {/* Image & Description Grid */}
              <div className="grid gap-8 md:grid-cols-[1fr_2fr] items-start mt-8">
                {active.image && (
                  <div className="rounded-lg overflow-hidden border border-[#E4E9F0] bg-[#F8FAFC] p-4 flex items-center justify-center shadow-sm">
                    <img src={active.image} alt={active.label} className="max-w-full h-auto object-contain max-h-[220px]" />
                  </div>
                )}
                <div className={active.image ? 'space-y-4' : 'md:col-span-2 space-y-4'}>
                  {active.body.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 text-sm leading-relaxed font-medium">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mt-10 pt-8 border-t border-[#E4E9F0]">
                <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-[#003087]">Core Engineering Features</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {active.features.map((feat) => (
                    <div
                      key={feat}
                      className="flex items-center gap-3 rounded-lg border border-[#E4E9F0] bg-[#F8FAFC] px-4 py-3 text-xs text-gray-700 font-semibold"
                    >
                      <Check size={14} className="text-[#0C7A48] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="tel:02038190333"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#003087] px-8 py-4 text-xs font-bold text-white shadow hover:bg-[#002068] transition-all uppercase tracking-wider"
                >
                  <Phone size={15} /> Direct Line: 020 3819 0333
                </a>
                <Link
                  to={`/contact?service=${active.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#C5D0E0] bg-white px-8 py-4 text-xs font-bold text-[#003087] hover:bg-gray-50 transition-all uppercase tracking-wider"
                >
                  Book Free Consultation <ArrowRight size={15} />
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-[#E4E9F0] flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-xs font-semibold text-gray-500">
                <a href="tel:02038190333" className="flex items-center gap-2 hover:text-[#003087] transition-colors">
                  <Phone size={14} className="text-[#003087]" />
                  020 3819 0333
                </a>
                <a href="mailto:info@eslanditsolutions.com" className="flex items-center gap-2 hover:text-[#003087] transition-colors">
                  <Mail size={14} className="text-[#003087]" />
                  info@eslanditsolutions.com
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
