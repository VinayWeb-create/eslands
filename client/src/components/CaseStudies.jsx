import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, TrendingUp, Users, Clock, Award, 
  ChevronRight, ExternalLink, Play
} from 'lucide-react';

const caseStudies = [
  {
    title: 'Healthcare Platform Transformation',
    client: 'MediCare Plus',
    industry: 'Healthcare',
    challenge: 'Legacy systems causing data silos and poor patient experience',
    solution: 'Built unified cloud-based platform with AI-powered diagnostics',
    technology: ['React', 'Node.js', 'AWS', 'TensorFlow'],
    results: {
      efficiency: '+340%',
      satisfaction: '+85%',
      cost: '-45%'
    },
    image: '/portfolio1.jpg',
    featured: true
  },
  {
    title: 'E-commerce Scale-Up',
    client: 'RetailMax',
    industry: 'Retail',
    challenge: 'Unable to handle peak traffic during sales events',
    solution: 'Microservices architecture with auto-scaling infrastructure',
    technology: ['Next.js', 'Kubernetes', 'PostgreSQL', 'Redis'],
    results: {
      efficiency: '+280%',
      satisfaction: '+72%',
      cost: '-35%'
    },
    image: '/portfolio2.jpg',
    featured: true
  },
  {
    title: 'Fintech Security Overhaul',
    client: 'SecureBank',
    industry: 'Finance',
    challenge: 'Compliance requirements and security vulnerabilities',
    solution: 'Zero-trust architecture with real-time threat detection',
    technology: ['Python', 'Docker', 'AWS', 'ML'],
    results: {
      efficiency: '+195%',
      satisfaction: '+91%',
      cost: '-52%'
    },
    image: '/portfolio3.jpg',
    featured: false
  },
  {
    title: 'EdTech Learning Platform',
    client: 'LearnSphere',
    industry: 'Education',
    challenge: 'Outdated LMS with poor user engagement',
    solution: 'Modern learning platform with gamification and analytics',
    technology: ['React', 'Node.js', 'MongoDB', 'WebRTC'],
    results: {
      efficiency: '+220%',
      satisfaction: '+78%',
      cost: '-40%'
    },
    image: '/portfolio4.jpg',
    featured: false
  },
  {
    title: 'Manufacturing IoT Integration',
    client: 'SmartFactory',
    industry: 'Manufacturing',
    challenge: 'Manual processes and lack of real-time data',
    solution: 'IoT platform with predictive maintenance and automation',
    technology: ['Python', 'AWS IoT', 'TimeSeries DB', 'React'],
    results: {
      efficiency: '+310%',
      satisfaction: '+88%',
      cost: '-48%'
    },
    image: '/portfolio5.jpg',
    featured: false
  },
  {
    title: 'Hospitality Booking System',
    client: 'LuxStay Hotels',
    industry: 'Hospitality',
    challenge: 'Fragmented booking systems across properties',
    solution: 'Unified booking platform with dynamic pricing',
    technology: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis'],
    results: {
      efficiency: '+175%',
      satisfaction: '+82%',
      cost: '-38%'
    },
    image: '/portfolio6.jpg',
    featured: false
  },
];

function CaseStudyCard({ study, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-primary-500/20">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          
          {/* Featured badge */}
          {study.featured && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-3 py-1 text-xs font-semibold text-white">
                <Award className="h-3 w-3" />
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm text-primary-400 mb-1">{study.client}</p>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-secondary-400 transition-all duration-300">
              {study.title}
            </h3>
            <p className="text-sm text-slate-400">{study.industry}</p>
          </div>

          {/* Results */}
          <div className="mb-4 grid grid-cols-3 gap-2">
            {Object.entries(study.results).map(([key, value]) => (
              <div key={key} className="text-center">
                <p className="text-lg font-bold text-white">{value}</p>
                <p className="text-xs text-slate-500 capitalize">{key}</p>
              </div>
            ))}
          </div>

          {/* Technology tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {study.technology.slice(0, 3).map((tech) => (
              <span key={tech} className="px-2 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-slate-300">
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors group-hover:translate-x-1"
          >
            View Case Study <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
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
            <Award className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-300">Case Studies</span>
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Real <span className="text-gradient-primary">Success Stories</span>
          </h2>
          
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Discover how we've helped businesses transform their digital presence and achieve remarkable results.
          </p>
        </motion.div>

        {/* Featured Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="relative rounded-3xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-xl">
            <div className="grid lg:grid-cols-2">
              {/* Image side */}
              <div className="relative h-64 lg:h-auto">
                <img
                  src={caseStudies[0].image}
                  alt={caseStudies[0].title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950 lg:hidden" />
              </div>

              {/* Content side */}
              <div className="p-8 lg:p-12">
                <div className="mb-6">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-3 py-1 text-xs font-semibold text-white mb-4">
                    <Award className="h-3 w-3" />
                    Featured Project
                  </span>
                  <p className="text-sm text-primary-400 mb-2">{caseStudies[0].client}</p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                    {caseStudies[0].title}
                  </h3>
                  <p className="text-slate-400 mb-6">{caseStudies[0].challenge}</p>
                </div>

                {/* Results */}
                <div className="mb-6 grid grid-cols-3 gap-4">
                  {Object.entries(caseStudies[0].results).map(([key, value]) => (
                    <div key={key} className="text-center p-4 rounded-2xl bg-white/5">
                      <p className="text-2xl font-bold text-gradient-primary">{value}</p>
                      <p className="text-xs text-slate-500 capitalize mt-1">{key}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/case-studies"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow"
                  >
                    Read Full Case Study <ChevronRight className="h-5 w-5" />
                  </Link>
                  <button className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-white font-semibold hover:bg-white/10 transition-colors">
                    <Play className="h-5 w-5" />
                    Watch Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Case Studies */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.slice(1).map((study, index) => (
            <CaseStudyCard key={study.title} study={study} index={index} />
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
              <p className="text-white font-semibold">Want similar results?</p>
              <p className="text-slate-400 text-sm">Let's discuss your project</p>
            </div>
            <Link
              to="/contact"
              className="rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow"
            >
              Start Your Project
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
