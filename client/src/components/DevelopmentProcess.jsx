import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Search, Layout, Code, Test, Rocket, Headphones, ChevronRight, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Discovery',
    description: 'Understanding your business goals, requirements, and target audience to create a solid foundation.',
    duration: '1-2 weeks',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Layout,
    title: 'Planning',
    description: 'Creating detailed project plans, timelines, and technical specifications for successful execution.',
    duration: '1-2 weeks',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Building your solution with clean, scalable code using modern technologies and best practices.',
    duration: '4-8 weeks',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Test,
    title: 'Testing',
    description: 'Rigorous quality assurance including unit testing, integration testing, and user acceptance testing.',
    duration: '1-2 weeks',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Rocket,
    title: 'Deployment',
    description: 'Seamless deployment to production with monitoring, backup, and rollback strategies.',
    duration: '1 week',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: Headphones,
    title: 'Support',
    description: 'Ongoing maintenance, updates, and dedicated support to ensure long-term success.',
    duration: 'Ongoing',
    color: 'from-yellow-500 to-orange-500'
  },
];

function ProcessStep({ step, index, total }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="relative flex-shrink-0 w-80 md:w-96"
    >
      {/* Connection Line */}
      {index < total - 1 && (
        <div className="absolute top-8 left-80 md:left-96 w-16 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
      )}

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative"
      >
        {/* Step Number */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg shadow-lg"
        >
          {index + 1}
        </motion.div>

        {/* Card */}
        <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-primary-500/20">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
            className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-lg`}
          >
            <step.icon className="h-8 w-8" />
          </motion.div>

          {/* Content */}
          <h3 className="mb-3 text-2xl font-bold text-white">
            {step.title}
          </h3>

          <p className="mb-6 text-slate-400 leading-relaxed">
            {step.description}
          </p>

          {/* Duration Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <Clock className="h-4 w-4 text-primary-400" />
            <span className="text-sm text-slate-300">{step.duration}</span>
          </div>

          {/* Checkmark */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="absolute top-6 right-6 h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
          >
            <CheckCircle className="h-5 w-5 text-white" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Clock({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export default function DevelopmentProcess() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
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
            <Rocket className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-300">Our Process</span>
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            From <span className="text-gradient-primary">Idea to Launch</span>
          </h2>
          
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            A proven methodology that ensures quality, efficiency, and successful project delivery every time.
          </p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto pb-8 scrollbar-hide">
          <div className="flex gap-8 px-4">
            {steps.map((step, index) => (
              <ProcessStep
                key={step.title}
                step={step}
                index={index}
                total={steps.length}
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8"
        >
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>Scroll horizontally</span>
            <ChevronRight className="h-4 w-4 animate-pulse" />
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-xl">
            <div className="text-left">
              <p className="text-white font-semibold">Ready to start your project?</p>
              <p className="text-slate-400 text-sm">Let's build something amazing together</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 text-white font-semibold shadow-lg shadow-primary-500/25"
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
