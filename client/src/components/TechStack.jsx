import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Code, Database, Cloud, Server, Cpu, Shield, 
  Globe, Smartphone, Brain, Git, Terminal, Layers
} from 'lucide-react';

const technologies = [
  { name: 'React', icon: Code, color: 'from-cyan-400 to-blue-500', orbit: 1 },
  { name: 'Node.js', icon: Terminal, color: 'from-green-400 to-emerald-500', orbit: 2 },
  { name: 'Python', icon: Brain, color: 'from-yellow-400 to-orange-500', orbit: 3 },
  { name: 'AWS', icon: Cloud, color: 'from-orange-400 to-red-500', orbit: 1 },
  { name: 'Docker', icon: Layers, color: 'from-blue-400 to-indigo-500', orbit: 2 },
  { name: 'Kubernetes', icon: Server, color: 'from-purple-400 to-pink-500', orbit: 3 },
  { name: 'PostgreSQL', icon: Database, color: 'from-indigo-400 to-blue-500', orbit: 1 },
  { name: 'MongoDB', icon: Database, color: 'from-green-400 to-teal-500', orbit: 2 },
  { name: 'TensorFlow', icon: Brain, color: 'from-orange-400 to-yellow-500', orbit: 3 },
  { name: 'OpenAI', icon: Brain, color: 'from-purple-400 to-violet-500', orbit: 1 },
  { name: 'GraphQL', icon: Code, color: 'from-pink-400 to-rose-500', orbit: 2 },
  { name: 'Redis', icon: Database, color: 'from-red-400 to-orange-500', orbit: 3 },
];

function TechOrbit({ tech, index, total, centerRef }) {
  const [hovered, setHovered] = useState(false);
  const orbitRadius = 120 + (tech.orbit * 60);
  const angle = (index / total) * 2 * Math.PI;
  
  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="absolute"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <motion.div
        animate={{
          scale: hovered ? 1.2 : 1,
          rotate: hovered ? 360 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="relative group cursor-pointer"
      >
        {/* Glow effect */}
        <motion.div
          animate={{
            scale: hovered ? 1.5 : 1,
            opacity: hovered ? 0.6 : 0.3,
          }}
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${tech.color} blur-xl`}
        />
        
        {/* Icon container */}
        <div className={`relative h-14 w-14 rounded-full bg-gradient-to-br ${tech.color} flex items-center justify-center text-white shadow-lg`}>
          <tech.icon className="h-7 w-7" />
        </div>
        
        {/* Tooltip */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white shadow-xl border border-white/10"
          >
            {tech.name}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function TechStack() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      
      {/* Glow effects */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-[128px]" />

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
            <Cpu className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-300">Technology Stack</span>
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Built with <span className="text-gradient-primary">Modern Technologies</span>
          </h2>
          
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            We leverage the latest and most powerful technologies to build scalable, secure, and high-performance solutions.
          </p>
        </motion.div>

        {/* 3D Orbit Animation */}
        <div className="relative h-[500px] flex items-center justify-center">
          {/* Orbit rings */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              ref={centerRef}
              animate={{ rotate: rotate }}
              style={{
                width: `${(ring * 60 + 120) * 2}px`,
                height: `${(ring * 60 + 120) * 2}px`,
              }}
              className="absolute rounded-full border border-white/5"
              transition={{ duration: 0.1 }}
            />
          ))}

          {/* Center hub */}
          <motion.div
            ref={centerRef}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-10"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 blur-2xl opacity-50" />
              
              {/* Center circle */}
              <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-2xl">
                <Code className="h-16 w-16" />
              </div>
            </div>
          </motion.div>

          {/* Technology icons */}
          {technologies.map((tech, index) => (
            <TechOrbit
              key={tech.name}
              tech={tech}
              index={index}
              total={technologies.length}
              centerRef={centerRef}
            />
          ))}
        </div>

        {/* Technology Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { title: 'Frontend', count: 5, icon: Globe },
            { title: 'Backend', count: 4, icon: Server },
            { title: 'Cloud & DevOps', count: 3, icon: Cloud },
            { title: 'AI & ML', count: 3, icon: Brain },
          ].map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-primary-500/20">
                <category.icon className="h-8 w-8 text-primary-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                <p className="text-slate-400 text-sm">{category.count} Technologies</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-xl">
            <div className="text-left">
              <p className="text-white font-semibold">Want to learn more?</p>
              <p className="text-slate-400 text-sm">Explore our technical expertise</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 text-white font-semibold shadow-lg shadow-primary-500/25"
            >
              View Stack
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
