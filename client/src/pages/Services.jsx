import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe, Smartphone, Search, Code2, Network, Tag,
  Palette, PlayCircle, ShoppingCart, RotateCcw, Aperture, Megaphone,
  ArrowRight, Check, Phone
} from 'lucide-react';

const services = [
  {
    id: 'web-development',
    label: 'Web Development',
    icon: Globe,
    color: '#00BFFF',
    colorClass: 'from-sky-500/20 to-sky-600/10 border-sky-500/40',
    iconBg: 'from-sky-500 to-sky-600',
    heading: 'Web Development',
    subheading: 'Creative, effective & professional websites built to convert.',
    body: 'We design and develop responsive, fast, and visually stunning websites tailored for your brand. From simple brochure sites to complex web applications, our team delivers clean code and elegant user experiences. We use modern stacks including HTML5, CSS3, JavaScript, React, and PHP to build websites that rank, engage, and convert.',
    features: [
      'Responsive Design for all screen sizes',
      'SEO-optimised clean HTML structure',
      'CMS integrations (WordPress, Joomla)',
      'Custom e-commerce and portal development',
      'Landing page and conversion optimisation',
      'Ongoing maintenance and support',
    ],
  },
  {
    id: 'mobile-development',
    label: 'Mobile Development',
    icon: Smartphone,
    color: '#6C63FF',
    colorClass: 'from-violet-500/20 to-violet-600/10 border-violet-500/40',
    iconBg: 'from-violet-500 to-violet-600',
    heading: 'Mobile Development',
    subheading: 'iOS & Android apps that deliver real business results.',
    body: 'From concept to launch, our mobile development team crafts high-performance apps for iOS and Android platforms. We leverage cross-platform frameworks like React Native and Flutter to reduce development costs while maintaining native performance and user experience.',
    features: [
      'iOS (Swift) & Android (Kotlin) native apps',
      'React Native & Flutter cross-platform',
      'UI/UX design and prototyping',
      'API integration and backend connectivity',
      'App Store & Google Play submission',
      'Ongoing app maintenance and updates',
    ],
  },
  {
    id: 'seo-marketing',
    label: 'SEO & Marketing',
    icon: Search,
    color: '#48CFAE',
    colorClass: 'from-teal-500/20 to-teal-600/10 border-teal-500/40',
    iconBg: 'from-teal-500 to-teal-600',
    heading: 'SEO & Marketing',
    subheading: 'Rank higher. Drive more traffic. Grow your revenue.',
    body: 'Our SEO and digital marketing specialists use data-driven strategies to increase your online visibility and attract qualified leads. From keyword research and on-page optimisation to backlink building and paid campaigns, we deliver measurable results for your business.',
    features: [
      'Comprehensive keyword research & strategy',
      'On-page & technical SEO optimisation',
      'Google Ads and PPC campaign management',
      'Content marketing and blog strategy',
      'Local SEO for UK businesses',
      'Monthly performance reporting',
    ],
  },
  {
    id: 'software-development',
    label: 'Software Development',
    icon: Code2,
    color: '#FF9800',
    colorClass: 'from-orange-500/20 to-orange-600/10 border-orange-500/40',
    iconBg: 'from-orange-500 to-orange-600',
    heading: 'Software Development',
    subheading: 'Custom enterprise software engineered to scale.',
    body: 'We build bespoke software solutions for businesses that need more than off-the-shelf products. Our development team delivers CRM systems, ERP platforms, SaaS applications, and internal tools — designed for scalability, security, and long-term value.',
    features: [
      'Custom CRM, ERP, and SaaS applications',
      'API design, development, and integration',
      'Legacy system modernisation',
      'Cloud-native architecture (AWS, Azure, GCP)',
      'Database design and optimisation',
      'DevOps, CI/CD pipelines, and deployment',
    ],
  },
  {
    id: 'networking',
    label: 'Networking Solutions',
    icon: Network,
    color: '#00BFFF',
    colorClass: 'from-sky-500/20 to-sky-600/10 border-sky-500/40',
    iconBg: 'from-sky-500 to-sky-600',
    heading: 'Networking Solutions',
    subheading: 'Robust IT infrastructure for growing businesses.',
    body: 'We design, implement, and manage secure and scalable network infrastructure for businesses of all sizes. From LAN/WAN setup to VPN, firewall configuration, and cloud networking, our engineers ensure your IT systems are reliable, secure, and optimised for performance.',
    features: [
      'LAN, WAN, and wireless network setup',
      'Firewall and network security configuration',
      'VPN and remote access solutions',
      'Network monitoring and proactive maintenance',
      'Cisco, Juniper, and HP equipment support',
      'IT infrastructure consulting',
    ],
  },
  {
    id: 'naming',
    label: 'Professional Naming',
    icon: Tag,
    color: '#AC92ED',
    colorClass: 'from-purple-500/20 to-purple-600/10 border-purple-500/40',
    iconBg: 'from-purple-500 to-purple-600',
    heading: 'Professional Naming',
    subheading: 'The right name sets your brand apart from the start.',
    body: 'A great business or product name is foundational to your brand. Our naming consultants help you develop memorable, market-relevant, and legally available brand names. We also assist with domain name acquisition, trademark guidance, and name testing for your target market.',
    features: [
      'Business and product naming strategy',
      'Brand name brainstorming and ideation',
      'Domain name availability research',
      'Trademark conflict checks',
      'Market testing and audience validation',
      'Name presentation and final report',
    ],
  },
  {
    id: 'branding',
    label: 'Branding & Promotion',
    icon: Palette,
    color: '#FB6E52',
    colorClass: 'from-red-500/20 to-red-600/10 border-red-500/40',
    iconBg: 'from-red-500 to-red-600',
    heading: 'Branding & Promotion',
    subheading: 'Build a brand identity that commands attention.',
    body: 'We create comprehensive brand identities that speak to your audience and reflect your values. From logo design and brand guidelines to promotional campaigns and marketing collateral, our creative team ensures your brand is consistent, professional, and memorable across all touchpoints.',
    features: [
      'Logo design and brand mark creation',
      'Brand identity guidelines and style guide',
      'Business card, letterhead, and stationery',
      'Social media graphics and templates',
      'Promotional materials (flyers, banners, ads)',
      'Brand strategy and positioning',
    ],
  },
  {
    id: 'animation',
    label: '2D Animation',
    icon: PlayCircle,
    color: '#00BFFF',
    colorClass: 'from-sky-500/20 to-sky-600/10 border-sky-500/40',
    iconBg: 'from-sky-500 to-sky-600',
    heading: '2D Animation',
    subheading: 'Bring your brand story to life with compelling animation.',
    body: 'Animated content captures attention and communicates complex ideas simply and memorably. Our 2D animation studio produces explainer videos, product demos, animated logos, and promotional motion graphics tailored for web, social media, and presentations.',
    features: [
      'Explainer and product demo videos',
      'Animated logo reveals and intros',
      'Motion graphics for social media',
      'Whiteboard and infographic animations',
      'Character design and 2D animation',
      'Voiceover and sound design coordination',
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-commerce Solutions',
    icon: ShoppingCart,
    color: '#48CFAE',
    colorClass: 'from-teal-500/20 to-teal-600/10 border-teal-500/40',
    iconBg: 'from-teal-500 to-teal-600',
    heading: 'E-commerce Solutions',
    subheading: 'Online stores built to sell — beautifully and reliably.',
    body: 'We build complete e-commerce solutions that give your customers an effortless shopping experience. From product catalog management and secure checkout to payment gateway integration and order management, we deliver robust online stores that grow with your business.',
    features: [
      'WooCommerce, Shopify, and custom stores',
      'Secure payment gateway integration',
      'Product catalog and inventory management',
      'Mobile-first e-commerce UX design',
      'Order, shipping, and returns management',
      'Analytics, reporting, and conversion optimisation',
    ],
  },
  {
    id: 'redesign',
    label: 'Website Redesign',
    icon: RotateCcw,
    color: '#FF9800',
    colorClass: 'from-orange-500/20 to-orange-600/10 border-orange-500/40',
    iconBg: 'from-orange-500 to-orange-600',
    heading: 'Website Redesign',
    subheading: 'Modernise your online presence and win more business.',
    body: 'If your current website feels outdated, slow, or fails to represent your brand, our redesign team will transform it into a high-performance, visually compelling digital asset. We focus on improved UX, mobile responsiveness, and SEO while preserving your domain authority.',
    features: [
      'Complete UI/UX redesign and refresh',
      'Mobile-first and responsive design',
      'Page speed and Core Web Vitals optimisation',
      'Content migration and restructuring',
      'SEO preservation during redesign',
      'CMS upgrade and training',
    ],
  },
  {
    id: 'logo-design',
    label: 'Logo Design',
    icon: Aperture,
    color: '#AC92ED',
    colorClass: 'from-purple-500/20 to-purple-600/10 border-purple-500/40',
    iconBg: 'from-purple-500 to-purple-600',
    heading: 'Logo Design',
    subheading: 'Your logo is the face of your brand — make it iconic.',
    body: 'Our graphic designers create unique, scalable, and professionally crafted logos that perfectly represent your business. Every logo is delivered in multiple formats (SVG, PNG, EPS) and comes with a style guide covering colour palettes, fonts, and usage rules.',
    features: [
      'Multiple initial concept designs',
      'Unlimited revisions until satisfied',
      'Vector formats (AI, EPS, SVG)',
      'Colour variations (full colour, mono, reverse)',
      'Brand colour palette selection',
      'Logo style guide and usage rules',
    ],
  },
  {
    id: 'social-media',
    label: 'Social Media Marketing',
    icon: Megaphone,
    color: '#FB6E52',
    colorClass: 'from-red-500/20 to-red-600/10 border-red-500/40',
    iconBg: 'from-red-500 to-red-600',
    heading: 'Social Media Marketing',
    subheading: 'Build your audience, engage your community, drive sales.',
    body: 'Our social media specialists develop and execute data-driven campaigns across Facebook, Instagram, LinkedIn, Twitter, and TikTok. From content creation and community management to paid advertising and performance analytics, we help you build a strong, engaged online community.',
    features: [
      'Social media strategy and content planning',
      'Facebook, Instagram, LinkedIn, and Twitter management',
      'Paid social advertising (Meta Ads, LinkedIn Ads)',
      'Content creation: copy, graphics, and video',
      'Community management and engagement',
      'Monthly analytics and performance reporting',
    ],
  },
];

export default function Services() {
  const [activeId, setActiveId] = useState('web-development');
  const active = services.find((s) => s.id === activeId) || services[0];

  return (
    <div className="relative min-h-screen overflow-hidden pt-[65px]">
      {/* Bg glow */}
      <div className="pointer-events-none fixed left-0 top-0 h-96 w-96 rounded-full bg-sky-500/6 blur-3xl" />

      {/* Page Banner */}
      <section className="border-b border-white/10 bg-gradient-to-r from-sky-600/20 via-sky-500/10 to-transparent px-6 py-14 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs uppercase tracking-[0.35em] text-sky-400">Esland IT Solutions</p>
            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Our Services</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              Comprehensive services for every technology domain — from web and mobile development to branding, SEO, and e-commerce.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Layout */}
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-[98px] lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-4">
              <p className="mb-4 px-2 text-[10px] uppercase tracking-[0.35em] text-slate-500">View Other Services</p>
              <nav className="space-y-1">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveId(s.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition-all duration-200 ${
                      activeId === s.id
                        ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.iconBg} text-white`}>
                      <s.icon size={13} />
                    </div>
                    <span>{s.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className={`rounded-[2rem] border bg-gradient-to-b p-8 sm:p-10 ${active.colorClass}`}
            >
              {/* Service Icon + Title */}
              <div className="mb-8 flex items-start gap-5">
                <div className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${active.iconBg} text-white shadow-xl`}>
                  <active.icon size={28} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em]" style={{ color: active.color }}>Esland IT Solutions</p>
                  <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{active.heading}</h2>
                  <p className="mt-2 text-sm font-medium" style={{ color: active.color }}>{active.subheading}</p>
                </div>
              </div>

              {/* Body Text */}
              <p className="text-sm leading-8 text-slate-300">{active.body}</p>

              {/* Features */}
              <div className="mt-8">
                <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">Key Features</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {active.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: active.color + '33' }}>
                        <Check size={11} style={{ color: active.color }} />
                      </div>
                      <span className="text-sm text-slate-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:02038190333"
                  className="inline-flex items-center justify-center gap-2 rounded-full py-3.5 px-8 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
                  style={{ backgroundColor: active.color }}
                >
                  <Phone size={15} /> Call Us Now
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
                >
                  Get a Quote <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* All services quick grid */}
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h2 className="text-2xl font-bold text-white sm:text-3xl">All Services at a Glance</h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => { setActiveId(s.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-left transition hover:border-sky-500/40"
              >
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.iconBg} text-white shadow`}>
                  <s.icon size={17} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{s.label}</p>
                  <p className="mt-0.5 text-xs text-slate-500">Click to learn more →</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
