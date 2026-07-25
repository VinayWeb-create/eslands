import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, GraduationCap, ShoppingBag, Factory, 
  Building2, Plane, Construction, Car, 
  Smartphone, Briefcase, ArrowRight, ChevronRight
} from 'lucide-react';

const industries = [
  {
    icon: HeartPulse,
    title: 'Healthcare',
    description: 'HIPAA-compliant solutions for hospitals, clinics, and medical practices.',
    color: 'from-red-500 to-rose-500',
    projects: 45
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Learning management systems and educational technology platforms.',
    color: 'from-blue-500 to-cyan-500',
    projects: 38
  },
  {
    icon: ShoppingBag,
    title: 'Retail',
    description: 'E-commerce platforms and digital transformation for retail businesses.',
    color: 'from-purple-500 to-pink-500',
    projects: 62
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'IoT integration and automation solutions for smart manufacturing.',
    color: 'from-orange-500 to-amber-500',
    projects: 29
  },
  {
    icon: Building2,
    title: 'Finance',
    description: 'Secure fintech solutions and banking applications.',
    color: 'from-green-500 to-emerald-500',
    projects: 51
  },
  {
    icon: Plane,
    title: 'Hospitality',
    description: 'Booking systems and guest experience platforms.',
    color: 'from-indigo-500 to-violet-500',
    projects: 34
  },
  {
    icon: Construction,
    title: 'Construction',
    description: 'Project management and construction technology solutions.',
    color: 'from-yellow-500 to-orange-500',
    projects: 27
  },
  {
    icon: Car,
    title: 'Automotive',
    description: 'Connected car solutions and automotive software.',
    color: 'from-slate-500 to-gray-500',
    projects: 22
  },
  {
    icon: Smartphone,
    title: 'Telecom',
    description: 'Network management and telecommunications software.',
    color: 'from-teal-500 to-cyan-500',
    projects: 31
  },
  {
    icon: Briefcase,
    title: 'Professional Services',
    description: 'CRM and business solutions for service-based companies.',
    color: 'from-pink-500 to-rose-500',
    projects: 48
  },
];

function IndustryCard({ industry, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-primary-500/20 overflow-hidden">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
          className={`relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${industry.color} text-white shadow-lg`}
        >
          <industry.icon className="h-8 w-8" />
        </motion.div>
        
        {/* Content */}
        <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-secondary-400 transition-all duration-300">
          {industry.title}
        </h3>
        
        <p className="mb-6 text-slate-400 leading-relaxed">
          {industry.description}
        </p>
        
        {/* Stats */}
        <div className="mb-6 flex items-center gap-4">
          <div className="text-sm text-slate-500">
            <span className="text-2xl font-bold text-white">{industry.projects}</span>
            <span className="ml-1">Projects</span>
          </div>
        </div>
        
        {/* CTA */}
        <Link
          to="/industries"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors group-hover:translate-x-1"
        >
          View Case Studies <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function IndustriesSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      
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
            <Building2 className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-300">Industries</span>
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Serving <span className="text-gradient-primary">Diverse Industries</span>
          </h2>
          
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            From healthcare to manufacturing, we deliver tailored solutions that drive digital transformation across sectors.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <IndustryCard key={industry.title} industry={industry} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-xl">
            <div className="text-left">
              <p className="text-white font-semibold">Your industry not listed?</p>
              <p className="text-slate-400 text-sm">We adapt to any business domain</p>
            </div>
            <Link
              to="/contact"
              className="rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow"
            >
              Discuss Your Needs
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
