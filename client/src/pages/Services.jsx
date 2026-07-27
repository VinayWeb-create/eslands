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
    color: '#38bdf8',
    colorClass: 'from-slate-900 via-slate-900 to-sky-950/40 border-sky-500/30',
    iconBg: 'from-sky-500 to-sky-600',
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
    color: '#a855f7',
    colorClass: 'from-slate-900 via-slate-900 to-purple-950/40 border-purple-500/30',
    iconBg: 'from-purple-500 to-indigo-600',
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
    color: '#38bdf8',
    colorClass: 'from-slate-900 via-slate-900 to-blue-950/40 border-blue-500/30',
    iconBg: 'from-sky-500 to-blue-600',
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
    color: '#34d399',
    colorClass: 'from-slate-900 via-slate-900 to-emerald-950/40 border-emerald-500/30',
    iconBg: 'from-emerald-500 to-teal-600',
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
    color: '#c084fc',
    colorClass: 'from-slate-900 via-slate-900 to-purple-950/40 border-purple-500/30',
    iconBg: 'from-purple-500 to-indigo-600',
    heading: 'Strategic Enterprise Brand Naming & Positioning',
    subheading: 'Establishing authoritative brand identities from day one.',
    image: '/images/business_name.jpg',
    body: 'Strategic brand naming and product architecture that communicates trust, innovation, and corporate identity across global markets.',
    features: [
      'Enterprise brand naming strategy',
      'Global domain & trademark validation',
      'Market positioning & messaging rules',
      'Target demographic resonance testing',
    ],
  },
  {
    id: 'branding',
    label: 'Branding & Identity',
    icon: Palette,
    color: '#f87171',
    colorClass: 'from-slate-900 via-slate-900 to-red-950/40 border-red-500/30',
    iconBg: 'from-red-500 to-rose-600',
    heading: 'Enterprise Brand Identity & Motion Systems',
    subheading: 'Command market authority with a modern digital brand system.',
    image: '/images/brand.jpg',
    body: 'Comprehensive brand identity design including vector logos, style guides, motion assets, and digital design systems engineered for consistency across all touchpoints.',
    features: [
      'Logo design & scalable vector assets',
      'Brand design token guidelines & typography',
      'Corporate stationery & presentation decks',
      'Digital collateral & social media design',
    ],
  },
  {
    id: 'animation',
    label: '2D Animation & Motion',
    icon: PlayCircle,
    color: '#38bdf8',
    colorClass: 'from-slate-900 via-slate-900 to-sky-950/40 border-sky-500/30',
    iconBg: 'from-sky-500 to-cyan-600',
    heading: 'High-Impact Motion Graphics & Product Demos',
    subheading: 'Transform complex technical concepts into engaging motion storytelling.',
    image: '/images/video.jpg',
    body: 'Explainer videos, 2D motion graphics, and animated product visualizers built to showcase enterprise software capabilities to executive buyers.',
    features: [
      'Explainer & architecture walk-through videos',
      'UI motion reveals & 2D animation',
      'Social media motion collateral',
      'Voiceover & sound design coordination',
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-commerce Platforms',
    icon: ShoppingCart,
    color: '#2dd4bf',
    colorClass: 'from-slate-900 via-slate-900 to-teal-950/40 border-teal-500/30',
    iconBg: 'from-teal-500 to-emerald-600',
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
    color: '#38bdf8',
    colorClass: 'from-slate-900 via-slate-900 to-sky-950/40 border-sky-500/30',
    iconBg: 'from-sky-500 to-indigo-600',
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
    color: '#38bdf8',
    colorClass: 'from-slate-900 via-slate-900 to-blue-950/40 border-blue-500/30',
    iconBg: 'from-sky-500 to-blue-600',
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
    color: '#c084fc',
    colorClass: 'from-slate-900 via-slate-900 to-purple-950/40 border-purple-500/30',
    iconBg: 'from-purple-500 to-indigo-600',
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
    color: '#f87171',
    colorClass: 'from-slate-900 via-slate-900 to-red-950/40 border-red-500/30',
    iconBg: 'from-red-500 to-rose-600',
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
    <div className="relative min-h-screen bg-slate-950 text-slate-300 overflow-x-hidden pt-[65px]">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed left-0 top-0 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[150px]" />
      <div className="pointer-events-none fixed right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[150px]" />

      {/* Page Banner */}
      <section className="relative h-[280px] flex items-center justify-center border-b border-white/10 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/service.jpg"
            alt="Services banner background"
            className="w-full h-full object-cover opacity-35 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-3 inline-block">
              Esland Capabilities
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-3 uppercase">
              Enterprise Services
            </h1>
            <p className="text-slate-300 max-w-lg mx-auto text-sm sm:text-base leading-relaxed font-medium">
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
            <div className="spotlight-card rounded-[2rem] border border-white/10 bg-slate-900/90 backdrop-blur-2xl p-4 shadow-xl">
              <p className="mb-4 px-3 text-[10px] uppercase tracking-[0.35em] text-sky-400 font-bold">Select Capability</p>
              <nav className="space-y-1.5">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => selectService(s.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-xs font-bold transition-all duration-200 border ${
                      activeId === s.id
                        ? 'bg-sky-500/20 text-sky-300 border-sky-400/40 shadow-lg shadow-sky-500/10'
                        : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
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
              className={`spotlight-card rounded-[2.5rem] border bg-slate-900/90 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl overflow-hidden ${active.colorClass}`}
            >
              {/* Service Header */}
              <div className="mb-8 flex items-start gap-6">
                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${active.iconBg} text-white shadow-xl shadow-sky-500/20`}>
                  <active.icon size={30} />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] font-bold text-sky-400 block mb-1">Esland Capability</span>
                  <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">{active.heading}</h2>
                  <p className="mt-2 text-sm font-semibold text-sky-300">{active.subheading}</p>
                </div>
              </div>

              {/* Image & Description Grid */}
              <div className="grid gap-8 md:grid-cols-[1fr_2fr] items-start mt-8">
                {active.image && (
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-950/80 p-4 flex items-center justify-center shadow-lg">
                    <img src={active.image} alt={active.label} className="max-w-full h-auto object-contain max-h-[220px]" />
                  </div>
                )}
                <div className={active.image ? 'space-y-4' : 'md:col-span-2 space-y-4'}>
                  {active.body.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-slate-300 text-sm leading-relaxed font-medium">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-sky-400">Core Engineering Features</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {active.features.map((feat) => (
                    <div
                      key={feat}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-xs text-slate-200 font-semibold"
                    >
                      <Check size={14} className="text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="tel:02038190333"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-4 text-xs font-bold text-white shadow-xl shadow-sky-500/20 hover:brightness-110 transition-all uppercase tracking-wider"
                >
                  <Phone size={15} /> Direct Line: 020 3819 0333
                </a>
                <Link
                  to={`/contact?service=${active.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-slate-950/80 px-8 py-4 text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all uppercase tracking-wider"
                >
                  Schedule Technical Demo <ArrowRight size={15} />
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-xs font-semibold text-slate-300">
                <a href="tel:02038190333" className="flex items-center gap-2 hover:text-sky-300 transition-colors">
                  <Phone size={14} className="text-sky-400" />
                  020 3819 0333
                </a>
                <a href="mailto:info@eslanditsolutions.com" className="flex items-center gap-2 hover:text-sky-300 transition-colors">
                  <Mail size={14} className="text-sky-400" />
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
