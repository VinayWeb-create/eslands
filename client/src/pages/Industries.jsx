import { motion } from 'framer-motion';
import { ArrowRight, Building2, Heart, ShoppingBag, Factory, GraduationCap, Home as HomeIcon, Mail, Phone, MapPin, Award, Cloud, CheckCircle } from 'lucide-react';

const industries = [
  {
    icon: Building2,
    title: 'Banking & Finance',
    description: 'You need to innovate while staying compliant. We help with core and channel modernization, real-time fraud detection, regulatory reporting, and digital payments—so you can move fast without missing an audit.',
    solutions: [
      'Core banking and channel modernization',
      'Real-time fraud and AML detection',
      'Regulatory reporting and compliance automation',
      'Digital wallets and payment platforms'
    ]
  },
  {
    icon: Heart,
    title: 'Healthcare',
    description: 'Patient care and data security can\'t be an either/or. We deliver EHR/EMR integration, telemedicine, HIPAA-ready cloud, and clinical AI—so clinicians get better tools and your organization stays compliant.',
    solutions: [
      'EHR/EMR integration and interoperability',
      'Telemedicine and patient engagement platforms',
      'HIPAA-compliant cloud and identity',
      'Clinical decision support and analytics'
    ]
  },
  {
    icon: ShoppingBag,
    title: 'Retail',
    description: 'Silos between stores, web, and mobile hurt conversion and margin. We build unified commerce, smart inventory, and customer analytics so you can offer one experience and optimize every channel.',
    solutions: [
      'Unified commerce and omnichannel platforms',
      'Demand forecasting and inventory optimization',
      'Personalization and recommendation engines',
      'Supply chain visibility and fulfillment'
    ]
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'Downtime and reactive maintenance are expensive. We implement IoT, predictive maintenance, and digital twins so you see issues before they stop the line and plan capacity with data.',
    solutions: [
      'IoT sensors and smart factory platforms',
      'Predictive maintenance and asset health',
      'Digital twin and simulation',
      'Supply chain and production planning'
    ]
  },
  {
    icon: GraduationCap,
    title: 'EdTech',
    description: 'Learners and instructors need tools that work everywhere. We build LMS, virtual classrooms, and assessment and analytics platforms that scale and integrate with your existing systems.',
    solutions: [
      'LMS and learning experience platforms',
      'Virtual classroom and collaboration tools',
      'Assessment, proctoring, and credentialing',
      'Learning analytics and outcomes dashboards'
    ]
  },
  {
    icon: HomeIcon,
    title: 'Real Estate',
    description: 'From listing to lease, technology can shorten cycles and improve experience. We deliver property and asset management systems, virtual tours, valuation models, and tenant apps—so operations and revenue both improve.',
    solutions: [
      'Property and asset management systems',
      'Virtual tours and 3D visualization',
      'Valuation and market analytics',
      'Tenant and resident experience apps'
    ]
  }
];

const certifications = [
  { name: 'ISO 27001 Certified', icon: Award },
  { name: 'AWS Partner', icon: Cloud },
  { name: 'Microsoft Gold Partner', icon: CheckCircle },
  { name: 'Google Cloud Partner', icon: Cloud }
];

export default function Industries() {
  return (
    <div className="relative overflow-hidden px-6 pb-24 pt-28 sm:px-10 lg:px-14">
      <div className="pointer-events-none absolute left-0 top-24 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-orange-600/10 blur-3xl" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-white/10 bg-surface/90 px-6 py-16 shadow-glow backdrop-blur-xl sm:px-10 lg:px-14">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl animate-pulse-glow" />
        <div className="absolute -right-24 top-28 h-80 w-80 rounded-full bg-orange-600/15 blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex rounded-full border border-orange-300/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-orange-200 animate-gradient bg-gradient-to-r from-orange-200/20 to-orange-400/20"
          >
            Industries
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 mb-6 text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl"
          >
            Deep Domain Expertise
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg leading-8 text-slate-300 sm:text-xl"
          >
            Regulations, workflows, and customer expectations differ by sector. We bring domain knowledge so solutions fit your industry from day one—faster adoption and fewer surprises.
          </motion.p>
        </motion.div>
      </section>

      {/* Industries Grid */}
      <section className="mx-auto mt-28 max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl transition-all duration-300 hover:border-orange-300/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              
              <div className="relative">
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-glow"
                >
                  <industry.icon className="h-7 w-7" />
                </motion.div>
                
                <h2 className="mb-4 text-2xl font-semibold text-white">{industry.title}</h2>
                <p className="mb-6 leading-7 text-slate-300">{industry.description}</p>
                
                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Key Solutions</h3>
                  <ul className="space-y-2">
                    {industry.solutions.map((solution, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-400">
                        <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <motion.a
                  whileHover={{ x: 4 }}
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 transition-colors hover:text-orange-300"
                >
                  Discuss Your Needs
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <section className="mx-auto mt-28 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glow backdrop-blur-xl"
        >
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6 flex items-center gap-3">
                <img src="/logo.png" alt="Onebridge Infotech" className="h-10 w-auto object-contain" />
              </div>
              <p className="mb-6 text-sm leading-6 text-slate-400">
                Onebridge Infotech is a premier tech consulting and software solutions provider, empowering businesses with industry-led technology solutions and hands-on consulting since 2017.
              </p>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400">
                    <cert.icon className="h-3 w-3 text-orange-400" />
                    {cert.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Services</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer">Cloud Solutions</li>
                <li className="hover:text-white transition-colors cursor-pointer">AI & Automation</li>
                <li className="hover:text-white transition-colors cursor-pointer">DevOps & CI/CD</li>
                <li className="hover:text-white transition-colors cursor-pointer">Cybersecurity</li>
                <li className="hover:text-white transition-colors cursor-pointer">Software Development</li>
                <li className="hover:text-white transition-colors cursor-pointer">Staffing</li>
                <li className="hover:text-white transition-colors cursor-pointer">Digital Transformation</li>
                <li className="hover:text-white transition-colors cursor-pointer">AI Agents</li>
                <li className="hover:text-white transition-colors cursor-pointer">Marketing Cloud</li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Quick Links</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-white transition-colors cursor-pointer">Case Studies</li>
                <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Contact Info</h3>
              <div className="space-y-4 text-sm text-slate-400">
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-4 w-4 text-orange-400 flex-shrink-0" />
                  <a href="mailto:info@onebridgeinfotech.com" className="hover:text-white transition-colors">
                    info@onebridgeinfotech.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-4 w-4 text-orange-400 flex-shrink-0" />
                  <a href="tel:+919398355196" className="hover:text-white transition-colors">
                    +91 939835 5196
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-orange-400 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Corporate Office</p>
                    <p className="text-xs">202, Sathyabama complex, Bhagya Nagar Colony, KPHB, Hyderabad, Telangana 500072</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-orange-400 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Reg. Office</p>
                    <p className="text-xs">Plot No. 1583 & 1584, Flat No.102, Ushodaya Residency, Bachupally Village, Dundigal Gandimaisamma Mandal, Ranga Reddy, Telangana – 500090, India</p>
                  </div>
                </div>
                <p className="text-xs">CIN: U85500TS2024PTC186604</p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
            © 2025 Onebridge Infotech. All rights reserved.
          </div>
        </motion.div>
      </section>
    </div>
  );
}
