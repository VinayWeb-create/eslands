import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Cloud, Code, Shield, Zap, Globe, Smartphone, Brain, 
  Server, Palette, TrendingUp, Users, Briefcase, ArrowRight 
} from 'lucide-react';

const services = [
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'AWS, Azure, GCP migration, architecture, and optimization for scalable infrastructure.',
    color: 'from-blue-500 to-cyan-500',
    features: ['Cloud Migration', 'Serverless Architecture', 'Cost Optimization', 'Multi-cloud Strategy']
  },
  {
    icon: Brain,
    title: 'AI & Automation',
    description: 'Machine learning models, process automation, and AI agents that transform operations.',
    color: 'from-purple-500 to-pink-500',
    features: ['ML Models', 'Process Automation', 'AI Agents', 'Data Analytics']
  },
  {
    icon: Code,
    title: 'Software Development',
    description: 'Custom applications, APIs, and enterprise software built with modern technologies.',
    color: 'from-orange-500 to-red-500',
    features: ['Custom Apps', 'API Development', 'Enterprise Software', 'Legacy Modernization']
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Zero-trust architecture, threat detection, and compliance frameworks.',
    color: 'from-green-500 to-emerald-500',
    features: ['Zero-trust Design', 'Threat Detection', 'SOC 2 Compliance', 'Security Audits']
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'iOS and Android applications with cross-platform frameworks.',
    color: 'from-indigo-500 to-blue-500',
    features: ['iOS Development', 'Android Apps', 'Cross-platform', 'App Store Optimization']
  },
  {
    icon: Server,
    title: 'DevOps & CI/CD',
    description: 'Automated pipelines, infrastructure as code, and continuous deployment.',
    color: 'from-teal-500 to-cyan-500',
    features: ['CI/CD Pipelines', 'Infrastructure as Code', 'Container Orchestration', 'Monitoring']
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design, prototyping, and digital experiences.',
    color: 'from-pink-500 to-rose-500',
    features: ['User Research', 'UI Design', 'UX Prototyping', 'Design Systems']
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'SEO, PPC, social media, and content marketing strategies.',
    color: 'from-yellow-500 to-orange-500',
    features: ['SEO Optimization', 'PPC Campaigns', 'Social Media', 'Content Strategy']
  },
  {
    icon: Users,
    title: 'IT Staffing',
    description: 'Skilled professionals for your technology projects and teams.',
    color: 'from-violet-500 to-purple-500',
    features: ['Tech Talent', 'Team Augmentation', 'Managed Services', 'Consulting']
  },
  {
    icon: Globe,
    title: 'Digital Transformation',
    description: 'End-to-end digital transformation for modern enterprises.',
    color: 'from-sky-500 to-blue-500',
    features: ['Strategy', 'Implementation', 'Change Management', 'Training']
  },
];

function ServiceCard({ service, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
  
  const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);
  
  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }
  
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-primary-500/20"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }}
        />
        
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
          className={`relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg`}
        >
          <service.icon className="h-8 w-8" />
        </motion.div>
        
        {/* Content */}
        <h3 className="mb-3 text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-secondary-400 transition-all duration-300">
          {service.title}
        </h3>
        
        <p className="mb-6 text-slate-400 leading-relaxed">
          {service.description}
        </p>
        
        {/* Features */}
        <ul className="mb-6 space-y-2">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
              <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
              {feature}
            </li>
          ))}
        </ul>
        
        {/* CTA */}
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors group-hover:translate-x-1"
        >
          Learn more <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 mb-6"
          >
            <Zap className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-300">Our Services</span>
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            End-to-End <span className="text-gradient-primary">Technology Solutions</span>
          </h2>
          
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Strategy, build, and run—with clear outcomes, fewer surprises, and a single team that stays accountable.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:shadow-primary-500/40 hover:scale-105"
          >
            Explore All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
