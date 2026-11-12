import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe, Smartphone, Search, Code2, Network, Tag,
  Palette, PlayCircle, ShoppingCart, RotateCcw, Aperture, Megaphone,
  ArrowRight, Check, Phone, Mail
} from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import { MagneticButton } from '../components/ui/primitives';

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
    <div className="relative min-h-screen bg-[var(--color-bg)] text-gray-700 overflow-x-clip">
      <PageHero
        eyebrow="Esland Capabilities"
        title="Enterprise services,"
        highlight="engineered to scale."
        sub="Mission-critical technology solutions engineered to scale your business."
      >
        <div className="flex flex-wrap justify-center gap-2.5">
          {['12 capabilities', 'ISO 27001 aligned', '24/7 SLA support'].map((t) => (
            <span key={t} className="ui-tag"><Check size={14} /> {t}</span>
          ))}
        </div>
      </PageHero>

      {/* Main Layout */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-10 sm:py-16 lg:px-14 relative z-10">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">

          {/* Sidebar */}
          <aside className="sticky top-[60px] z-20 -mx-4 lg:mx-0 lg:top-[98px] lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
            <div className="ui-glass border-x-0 lg:border-x px-4 py-3 lg:rounded-3xl lg:p-4">
              <p className="mb-4 px-3 text-[10px] uppercase tracking-[0.25em] text-[#003087] font-bold hidden lg:block">Select Capability</p>
              <nav aria-label="Service capabilities" className="flex gap-2 overflow-x-auto scrollbar-hide lg:block lg:space-y-1.5">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => selectService(s.id)}
                    aria-pressed={activeId === s.id}
                    className={`flex shrink-0 lg:w-full items-center gap-3 rounded-full lg:rounded-2xl px-3 lg:px-3.5 py-2 lg:py-2.5 text-left text-xs font-bold transition-all duration-200 border ${
                      activeId === s.id
                        ? 'bg-gradient-to-r from-[#EEF4FF] to-white text-[#003087] border-[#C0D4FF] shadow-[0_8px_24px_-12px_rgba(0,87,216,0.6)]'
                        : 'border-[var(--color-border)] lg:border-transparent bg-[var(--color-bg)] lg:bg-transparent text-gray-500 hover:bg-gray-50 hover:text-[#003087] lg:hover:translate-x-1'
                    }`}
                  >
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full lg:rounded-xl bg-gradient-to-br ${s.iconBg} text-white`}>
                      <s.icon size={14} />
                    </div>
                    <span className="whitespace-nowrap lg:truncate">{s.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="ui-panel min-w-0"
            >
              <div className="ui-panel__shine" aria-hidden="true" />
              {/* Service Header */}
              <div className="relative mb-8 flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
                <div className="ui-icon-tile ui-icon-tile--lg !h-16 !w-16">
                  <active.icon size={30} />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#003087] block mb-1">Esland Capability</span>
                  <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-gray-900 leading-[1.1] tracking-[-0.03em]">{active.heading}</h2>
                  <p className="mt-2 text-sm font-semibold text-[#003087]">{active.subheading}</p>
                </div>
              </div>

              {/* Image & Description Grid */}
              <div className="relative grid gap-8 md:grid-cols-[1fr_2fr] items-start mt-8">
                {active.image && (
                  <div className="group rounded-3xl overflow-hidden border border-[#E4E9F0] bg-gradient-to-br from-[#F8FAFC] to-[#EEF4FF] p-5 flex items-center justify-center shadow-sm">
                    <img src={active.image} alt={active.label} loading="lazy" className="max-w-full h-auto object-contain max-h-[220px] transition-transform duration-700 group-hover:scale-105" />
                  </div>
                )}
                <div className={active.image ? 'space-y-4' : 'md:col-span-2 space-y-4'}>
                  {active.body.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 text-[15px] leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="relative mt-10 pt-8 border-t border-[#E4E9F0]">
                <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-[#003087]">Core Engineering Features</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {active.features.map((feat, i) => (
                    <motion.div
                      key={feat}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                      className="ui-spot flex items-center gap-3 rounded-2xl border border-[#E4E9F0] bg-[#F8FAFC] px-4 py-3.5 text-[13px] text-gray-700 font-semibold transition-colors hover:border-[#C0D4FF]"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100"><Check size={13} className="text-[#0C7A48]" /></span>
                      <span>{feat}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="relative mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <MagneticButton href="tel:02038190333" wrapperClassName="w-full sm:w-auto" className="w-full sm:w-auto">
                  <Phone size={15} /> Direct Line: 020 3819 0333
                </MagneticButton>
                <MagneticButton to={`/contact?service=${active.id}`} variant="ghost" wrapperClassName="w-full sm:w-auto" className="w-full sm:w-auto">
                  Book Free Consultation <ArrowRight size={15} />
                </MagneticButton>
              </div>

              <div className="relative mt-6 pt-6 border-t border-[#E4E9F0] flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-xs font-semibold text-gray-500">
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
