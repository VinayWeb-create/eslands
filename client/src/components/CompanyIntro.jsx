import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, Heart, Award, Users, Zap, Globe, Shield } from 'lucide-react';
import { useSpring, useTransform, useMotionValue } from 'framer-motion';

const stats = [
  { value: 15, label: 'Years Experience', icon: Award },
  { value: 500, label: 'Projects Delivered', icon: Target },
  { value: 50, label: 'Team Members', icon: Users },
  { value: 98, label: 'Client Satisfaction %', icon: Heart },
];

const values = [
  {
    icon: Zap,
    title: 'Innovation First',
    description: 'We embrace cutting-edge technologies and methodologies to deliver solutions that push boundaries.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Shield,
    title: 'Trust & Integrity',
    description: 'Building lasting relationships through transparency, reliability, and ethical business practices.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'Understanding diverse markets and cultures to deliver solutions that work worldwide.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Users,
    title: 'People-Centric',
    description: 'Our team and clients are at the heart of everything we do.',
    color: 'from-purple-500 to-pink-500'
  },
];

function AnimatedCounter({ value, label, icon: Icon }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 100, damping: 30 });
  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  if (isInView) {
    motionValue.set(value);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 text-primary-400">
        <Icon className="h-8 w-8" />
      </div>
      <motion.div className="text-5xl font-bold text-gradient-primary mb-2">
        {displayValue}
      </motion.div>
      <p className="text-slate-400">{label}</p>
    </motion.div>
  );
}

export default function CompanyIntro() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/30 to-slate-950" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-16 mb-32">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary-500/20 rounded-full blur-xl" />
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 mb-6"
              >
                <Target className="w-4 h-4 text-primary-400" />
                <span className="text-sm font-medium text-primary-300">Our Mission</span>
              </motion.span>
              
              <h2 className="text-4xl font-bold text-white mb-6">
                Empowering businesses through <span className="text-gradient-primary">digital excellence</span>
              </h2>
              
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                To be the trusted technology partner that transforms businesses through innovative software solutions, 
                cloud infrastructure, and digital experiences. We believe in creating technology that doesn't just work—it inspires.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {['Innovation', 'Quality', 'Partnership'].map((item) => (
                  <span key={item} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary-500/20 rounded-full blur-xl" />
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-secondary-500/30 bg-secondary-500/10 px-4 py-2 mb-6"
              >
                <Eye className="w-4 h-4 text-secondary-400" />
                <span className="text-sm font-medium text-secondary-300">Our Vision</span>
              </motion.span>
              
              <h2 className="text-4xl font-bold text-white mb-6">
                Shaping the <span className="text-gradient-secondary">future of technology</span>
              </h2>
              
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                To lead the digital transformation revolution by building solutions that anticipate tomorrow's needs today. 
                We envision a world where technology seamlessly enhances human potential and business growth.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {['Global Impact', 'Sustainable Growth', 'Continuous Learning'].map((item) => (
                  <span key={item} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AnimatedCounter key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Core <span className="text-gradient-primary">Values</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-primary-500/20">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${value.color} text-white shadow-lg`}
                  >
                    <value.icon className="h-7 w-7" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-secondary-400 transition-all duration-300">
                    {value.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
