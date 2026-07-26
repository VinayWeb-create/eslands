import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe, Smartphone, Search, Code2, Network, Tag,
  Palette, PlayCircle, ShoppingCart, RotateCcw, Aperture, Megaphone,
  ArrowRight, Check, Phone
} from 'lucide-react';

export const services = [
  {
    id: 'web-development',
    label: 'Web Development',
    icon: Globe,
    color: '#0ea5e9',
    colorClass: 'from-sky-50 to-sky-100/40 border-sky-200',
    iconBg: 'from-sky-500 to-sky-600',
    heading: 'Web development for big and small business',
    subheading: 'Creative, effective & professional websites built to convert.',
    image: '/images/web.png',
    body: 'It has been a very positive part of Esland IT Solutions that, no one has given any pathetic feedback about the web Development of ours. Esland has been making the things to fall on the right track and that has really resulted in a very positive manner.There are many customers with varying demands and we have been able to satisfy their needs in a very positive manner.\n\nOur specialty in the Development includes PHP, C#, Ruby, JavaScript and other latest languages has made us to grow well in a very positive manner. From WordPress to JavaScript world, our skilled team is able to deliver the best in a very positive manner. Esland IT Solutions has always kept the focus on the need of the customers and that has really made us to perform in a very favorable.',
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
    color: '#8b5cf6',
    colorClass: 'from-violet-50 to-violet-100/40 border-violet-200',
    iconBg: 'from-violet-500 to-violet-600',
    heading: 'Mobile Development to enhance interactive communications with clients',
    subheading: 'iOS & Android apps that deliver real business results.',
    image: '/images/mobile.png',
    body: 'Esland IT Solutions is one of the leading enterprise app development company, serves in Android and iPhone based mobile app development. We offer mobile application development services for iOS, Android, Windows and HTML5.\n\nOur expert mobile app developers understand your business and chalk out a design that would help you integrate your business on the mobile. We understand the current market trends and work on the two most in demand Operating Systems, the Android app development and the IOS app development.',
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
    color: '#0d9488',
    colorClass: 'from-teal-50 to-teal-100/40 border-teal-200',
    iconBg: 'from-teal-500 to-teal-600',
    heading: 'SEO & Marketing to enhance your site reputation and improve your rankings',
    subheading: 'Rank higher. Drive more traffic. Grow your revenue.',
    image: '/images/seo-c.png',
    body: 'If you own a web site, it is natural that you want to get listed in the first or second page of google. That way your website gets more visitors and you get potential business enquiries.\n\nEsland IT Solutions, we have done extensive research in Search Engine Optimation (SEO) techniques. Based on our findings we have been able to optimize the web sites of our clients and achieved significant organic ranking / listing in major search engines. This is NOT just a tall claim but we can show you that it is a definite possibility.',
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
    color: '#ea580c',
    colorClass: 'from-orange-50 to-orange-100/40 border-orange-200',
    iconBg: 'from-orange-500 to-orange-600',
    heading: 'software Development customized solutions and services',
    subheading: 'Custom enterprise software engineered to scale.',
    image: '/images/software.png',
    body: 'Software Application Development and Maintenance is a part of Esland IT Solutions Core activity. We offer clients innovative solutions to their software needs using PHP 5, ASP, .NET, JSP, J2EE, Java, Voice XML, XML-HTTP Messaging and AJAX technologies with MySQL, MS SQL, Oracle and MS ACCESS as databse. We also develop applications using Content Management Systems such as Joomla and Worpress to non-critical clients.\n\nWe offer solutions for integrating new or existing system with front and back-office applications. Provide end-to-end business solution to address the support and software maintenance services. Our company has proven experience in delivering quality offshore software application support to business solutions that run the business round the clock.',
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
    color: '#0ea5e9',
    colorClass: 'from-sky-50 to-sky-100/40 border-sky-200',
    iconBg: 'from-sky-500 to-sky-600',
    heading: 'Networking Solutions for all your Business Needs',
    subheading: 'Robust IT infrastructure for growing businesses.',
    image: '/images/network.png',
    body: 'Networking Solutions are highly mandatory for success of any organization. At Proactive we offer reliable stability and flexibility in our networking solutions; which is coupled with delivering robust performance. We deliver simplistic yet consistent solutions that are flexible and can moulded in accordance to client requirements. Proactive delivers single, scalable and secure IP network and which can be customized based on the changing business needs.\n\nNetworking solutions for small business can keep your employees connected and productive whether they are. Small business computer networks help you better compete against larger companies while lowering communications costs, enhancing efficiencies, and improving customer service.',
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
    color: '#7c3aed',
    colorClass: 'from-purple-50 to-purple-100/40 border-purple-200',
    iconBg: 'from-purple-500 to-purple-600',
    heading: 'Professional Naming the Right name for your start-up',
    subheading: 'The right name sets your brand apart from the start.',
    image: '/images/business_name.jpg',
    body: 'What\'s in a name? A lot, when it comes to small-business success. The right name can make your company the talk of the town. The wrong one can doom it to obscurity and failure. Ideally, your name should convey the expertise, value and uniqueness of the product or service you have developed.\n\nWhether naming a company, or branding a corporate division, the right brand identity makes all the difference. From the initial name development to the matching web site and collateral design, we will work with you and your team to create a cohesive brand that communicates your message.',
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
    color: '#dc2626',
    colorClass: 'from-red-50 to-red-100/40 border-red-200',
    iconBg: 'from-red-500 to-red-600',
    heading: 'Branding and Promotion moving your business forward by promoting it online',
    subheading: 'Build a brand identity that commands attention.',
    image: '/images/brand.jpg',
    body: 'What is Brand promotion? Meaning : Brand means a mark (symbol or sign) or design or some combination of these used to identify the products of one seller and to differentiate them from competitive products. A registered brand is known as trade mark.\n\nBrand promotion is that element of marketing mix which is designed to inform, remind, persuade and influence the customers so that they purchase the brands of the advertiser company. Brand promotion is applied and persuasive communication used for informing and reminding the customers of the company\'s brands.',
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
    color: '#0ea5e9',
    colorClass: 'from-sky-50 to-sky-100/40 border-sky-200',
    iconBg: 'from-sky-500 to-sky-600',
    heading: '2D Animation It transforms our idea in to design',
    subheading: 'Bring your brand story to life with compelling animation.',
    image: '/images/video.jpg',
    body: '2D animation focuses on creating characters, storyboards, and backgrounds in two-dimensional environments. Often thought of as traditional animation, the figures can move up and down, left, and right. They do not appear to move toward or away from the viewer, as they would in 3D animation.\n\n2D animation uses bitmap and vector graphics to create and edit the animated images and is created using computers and software programs, such as Adobe Photoshop, Flash, After Effects, and Encore. These animations may be used in advertisements, films, television shows, computer games, or websites.',
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
    color: '#0d9488',
    colorClass: 'from-teal-50 to-teal-100/40 border-teal-200',
    iconBg: 'from-teal-500 to-teal-600',
    heading: 'E-commerce Solutions Creating value for online stores',
    subheading: 'Online stores built to sell — beautifully and reliably.',
    image: '/images/ecom.png',
    body: 'E-commerce, a process of buying and selling of products and services on Internet through secure credit card processing. We are providing customized and flexible ecommerce website development solutions that best suits with your business objectives.\n\nEcommerce is a marketplace on the Internet. Ecommerce websites development are dynamic in nature and able to provide end-user the ability to shop by price, product type or by brand name, add / delete items in a shopping cart and purchase items in real-time using an online merchant account and payment gateway.',
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
    color: '#ea580c',
    colorClass: 'from-orange-50 to-orange-100/40 border-orange-200',
    iconBg: 'from-orange-500 to-orange-600',
    heading: 'Website Redesign Get the perfect website !!',
    subheading: 'Modernise your online presence and win more business.',
    image: '/images/re-1.png',
    body: 'Is your current website incapable of fulfilling all of your online marketing objectives? Whether it is new functionality, updated content, or a more sophisticated appearance, you need website redesign services.\n\nYour website is an extension of your business. For many customers, your website is the first point of contact with your company.\n\nThat is why website redesign services are so essential to modern businesses - they keep your storefront looking sleek, modern, and up-to-date. When you need to redesign a website, you can truly maximize the potential of your brand while growing your business bottom line. If you have ever wondered why you should redesign a website, that is your answer - to grow your business.',
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
    color: '#7c3aed',
    colorClass: 'from-purple-50 to-purple-100/40 border-purple-200',
    iconBg: 'from-purple-500 to-purple-600',
    heading: 'Logo Design Make Your website user friendly !!',
    subheading: 'Your logo is the face of your brand — make it iconic.',
    image: '/images/log-des.png',
    body: 'We offer a fast and simple logo design solution. To start, choose from thousands of high quality templates.\n\nThen, customize your logo by changing the color, shape, font. Our database offers 20 categories (agriculture, real estate, technology, etc.), so you can definitely create a logo that matches your needs.\n\nWhen it comes to developing your company\'s branding the logotype is the most important element of branding you will ever create. We offer creative and affordable packages which comes along with free corporate stationaries like business cards, letter heads etc. Write to us to know more.',
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
    color: '#dc2626',
    colorClass: 'from-red-50 to-red-100/40 border-red-200',
    iconBg: 'from-red-500 to-red-600',
    heading: 'Social Media Marketing Reach your customers in their own space',
    subheading: 'Build your audience, engage your community, drive sales.',
    image: '/images/social-2.png',
    body: 'With the popularity of social networking sites, there\'s no wonder that marketers have plunged into these site for exposure. In fact, with the social networking sites, marketers have reached their potential audience from all over the world.\n\nThousands of companies have already started their campaigns and are connected with their customers around the clock. With social media marketing, you can create brand awareness, increase your consumer base and get to know your customers better.',
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
    <div className="relative min-h-screen bg-white text-slate-700 overflow-x-hidden pt-[65px]">
      {/* Bg glow */}
      <div className="pointer-events-none fixed left-0 top-0 h-96 w-96 rounded-full bg-sky-500/5 blur-3xl" />

      {/* Page Banner using service.jpg */}
      <section className="relative h-[250px] flex items-center justify-center border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/service.jpg"
            alt="Services banner background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs uppercase tracking-[0.35em] text-sky-300 mb-2">Esland IT Solutions</p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4 uppercase">
              Services
            </h1>
            <p className="text-slate-200 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
              a range of services adapted to your needs !!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Layout */}
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-[98px] lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-4 px-2 text-[10px] uppercase tracking-[0.35em] text-slate-400">View Other Services</p>
              <nav className="space-y-1">
                {services.map((s) => (
                  <motion.button
                    key={s.id}
                    onClick={() => selectService(s.id)}
                    aria-current={activeId === s.id ? 'true' : undefined}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition-all duration-200 border ${
                      activeId === s.id
                        ? 'bg-sky-50 text-sky-600 border-sky-200'
                        : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.iconBg} text-white`}>
                      <s.icon size={13} />
                    </div>
                    <span>{s.label}</span>
                  </motion.button>
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
              className={`rounded-[2rem] border bg-gradient-to-b p-8 sm:p-10 shadow-sm ${active.colorClass}`}
            >
              {/* Service Icon + Title */}
              <div className="mb-8 flex items-start gap-5">
                <div className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${active.iconBg} text-white shadow-md`}>
                  <active.icon size={28} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em]" style={{ color: active.color }}>Esland IT Solutions</p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">{active.heading}</h2>
                  <p className="mt-2 text-sm font-medium" style={{ color: active.color }}>{active.subheading}</p>
                </div>
              </div>

              {/* Image & Description Grid */}
              <div className="grid gap-8 md:grid-cols-[1fr_2fr] items-start mt-6">
                {active.image ? (
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="rounded-2xl overflow-hidden border border-slate-100 bg-white p-4 shadow-sm flex items-center justify-center cursor-pointer"
                  >
                    <img src={active.image} alt={active.label} className="max-w-full h-auto object-contain max-h-[220px]" />
                  </motion.div>
                ) : null}
                <div className={active.image ? 'space-y-4' : 'md:col-span-2 space-y-4'}>
                  {active.body.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-sm leading-8 text-slate-650">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mt-8">
                <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-800">Key Features</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {active.features.map((feat) => (
                    <motion.div
                      key={feat}
                      whileHover={{ y: -3, scale: 1.01, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm cursor-pointer"
                    >
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: active.color + '15' }}>
                        <Check size={11} style={{ color: active.color }} />
                      </div>
                      <span className="text-sm text-slate-600">{feat}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  href="tel:02038190333"
                  whileHover={{ scale: 1.05, shadow: "0 10px 20px -10px rgba(14, 165, 233, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full py-3.5 px-8 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
                  style={{ backgroundColor: active.color }}
                >
                  <Phone size={15} /> Call Us Now
                </motion.a>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-350 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-md"
                  >
                    Book a Consultation <ArrowRight size={15} />
                  </Link>
                </motion.div>
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
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">All Services at a Glance</h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -6, scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { selectService(s.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-sky-500/30 shadow-sm hover:shadow-md"
              >
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.iconBg} text-white shadow`}>
                  <s.icon size={17} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{s.label}</p>
                  <p className="mt-0.5 text-xs text-slate-400">Click to learn more →</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
