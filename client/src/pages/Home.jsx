import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Bot, Check, ChevronRight, Cloud, Code2, Database,
  Globe2, Layers3, LockKeyhole, Play, ShieldCheck, Sparkles,
  Smartphone, Workflow, Zap
} from 'lucide-react';

const services = [
  { icon: Code2, number: '01', title: 'Digital products', copy: 'Web platforms and customer experiences designed to be useful, fast, and unmistakably yours.' },
  { icon: Bot, number: '02', title: 'Applied AI', copy: 'Intelligent workflows and assistants that turn your operational data into an advantage.' },
  { icon: Cloud, number: '03', title: 'Cloud & engineering', copy: 'Resilient infrastructure, modern architecture, and delivery systems built to scale.' },
  { icon: ShieldCheck, number: '04', title: 'Security & trust', copy: 'Practical security that protects your organisation without slowing it down.' },
];

const technologies = ['React', 'Next.js', 'Node.js', 'Python', 'AWS', 'Azure', 'Docker', 'PostgreSQL'];

const fadeUp = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.55 } };

export default function Home() {
  return (
    <div className="enterprise-home">
      <section className="enterprise-hero">
        <div className="hero-grid" />
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="hero-noise" />
        <div className="enterprise-container hero-inner">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="hero-copy">
            <div className="eyebrow"><span className="pulse-dot" /> Independent technology partner</div>
            <h1>Engineering<br /><span>digital excellence.</span></h1>
            <p>We help ambitious organisations design, build, and scale the digital systems that move business forward.</p>
            <div className="hero-actions">
              <Link className="button-primary" to="/contact">Start a project <ArrowRight size={17} /></Link>
              <a className="button-quiet" href="#work"><span className="play-dot"><Play size={13} fill="currentColor" /></span> See our approach</a>
            </div>
            <div className="hero-proof"><div className="avatars"><i>RK</i><i>AJ</i><i>SK</i><i>+2</i></div><span>Trusted by teams building what&apos;s next</span></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.18, duration: 0.9 }} className="hero-visual" aria-hidden="true">
            <div className="orbit orbit-a" /><div className="orbit orbit-b" />
            <div className="globe"><div className="globe-lines" /><div className="globe-shine" /></div>
            <div className="float-card card-insight"><span className="mini-icon"><Sparkles size={15} /></span><div><small>AI impact</small><strong>4.8× faster</strong></div></div>
            <div className="float-card card-uptime"><span className="status-dot" /><div><small>System health</small><strong>99.99% uptime</strong></div></div>
            <div className="signal signal-one" /><div className="signal signal-two" />
          </motion.div>
        </div>
        <div className="enterprise-container hero-bottom"><span>Scroll to explore</span><div className="scroll-line" /><span>EST. 2015 · LONDON / GLOBAL</span></div>
      </section>

      <section className="logo-strip"><div className="enterprise-container"><span>Trusted expertise across</span><div className="logo-list"><b>FINANCE</b><b>HEALTHCARE</b><b>RETAIL</b><b>EDUCATION</b><b>MANUFACTURING</b></div></div></section>

      <section className="enterprise-section intro-section">
        <div className="enterprise-container split-intro">
          <motion.div {...fadeUp}><div className="eyebrow blue">Built for meaningful progress</div><h2>Complexity is where our best work begins.</h2></motion.div>
          <motion.div {...fadeUp} transition={{ duration: .55, delay: .12 }}><p className="lead">Esland combines product thinking, deep engineering and a human way of working to solve the problems that matter to your business.</p><Link className="text-link" to="/about">Meet Esland <ArrowRight size={16} /></Link></motion.div>
        </div>
        <div className="enterprise-container metrics"><div><strong>10<span>+</span></strong><p>years of delivery</p></div><div><strong>500<span>+</span></strong><p>projects completed</p></div><div><strong>200<span>+</span></strong><p>long-term clients</p></div><div><strong>24<span>/7</span></strong><p>support mindset</p></div></div>
      </section>

      <section className="enterprise-section services-section"><div className="enterprise-container"><motion.div {...fadeUp} className="section-heading"><div><div className="eyebrow blue">What we do</div><h2>Capabilities for<br />the next horizon.</h2></div><p>From first idea to sustained impact, our multi-disciplinary teams make progress feel clear.</p></motion.div><div className="services-grid">{services.map(({ icon: Icon, ...service }, index) => <motion.article {...fadeUp} transition={{ duration: .45, delay: index * .08 }} className="service-card" key={service.number}><div className="service-top"><span>{service.number}</span><Icon size={22} /></div><h3>{service.title}</h3><p>{service.copy}</p><Link to="/services" aria-label={`Explore ${service.title}`}><ArrowRight size={19} /></Link></motion.article>)}</div></div></section>

      <section id="work" className="enterprise-section process-section"><div className="enterprise-container"><motion.div {...fadeUp} className="process-lead"><div className="eyebrow">A better way to build</div><h2>Progress, made visible.</h2><p>Big ideas are only valuable when they arrive in the real world. Our process balances creative momentum with the discipline enterprises need.</p></motion.div><div className="process-track">{['Discover', 'Define', 'Design', 'Develop', 'Evolve'].map((step, i) => <motion.div {...fadeUp} transition={{ duration: .4, delay: i * .08 }} className="process-step" key={step}><span>0{i + 1}</span><div className="process-node" /><h3>{step}</h3><p>{['Align on the opportunity.', 'Create a focused roadmap.', 'Prototype the experience.', 'Ship with confidence.', 'Learn and improve.'][i]}</p></motion.div>)}</div></div></section>

      <section className="enterprise-section tech-section"><div className="enterprise-container tech-wrap"><motion.div {...fadeUp}><div className="eyebrow blue">Technology, selected with purpose</div><h2>Serious engineering.<br />No unnecessary noise.</h2><p className="lead">We choose proven tools, flexible architectures and intelligent automation to keep you ready for what comes next.</p><Link className="button-outline" to="/services">Explore our capabilities <ChevronRight size={16} /></Link></motion.div><motion.div {...fadeUp} transition={{ duration: .55, delay: .12 }} className="tech-orbit"><div className="tech-core"><Layers3 size={34} /><span>ESLAND<br />SYSTEMS</span></div>{technologies.map((tech, i) => <span className={`tech-pill pill-${i}`} key={tech}>{tech}</span>)}</motion.div></div></section>

      <section className="enterprise-section case-section"><div className="enterprise-container"><motion.div {...fadeUp} className="section-heading case-head"><div><div className="eyebrow blue">Selected work</div><h2>Results that<br />speak clearly.</h2></div><Link className="text-link" to="/products">View all case studies <ArrowRight size={16} /></Link></motion.div><div className="case-grid"><article className="case-card case-main"><div className="case-tag">Health technology</div><div className="dashboard-art"><div className="dash-nav" /><div className="dash-chart"><i /><i /><i /><i /><i /><i /></div><div className="dash-data"><b>Live insights</b><span>+38.4%</span></div></div><div className="case-content"><h3>Connecting care with a more intelligent patient platform.</h3><p>Product strategy · UX · Engineering</p><a href="#contact">Read case study <ArrowRight size={16} /></a></div></article><article className="case-card case-side"><div className="case-tag">Commerce</div><div className="commerce-art"><div className="commerce-box" /><div className="commerce-ring" /><span>01</span></div><div className="case-content"><h3>A retail ecosystem, designed around real behaviour.</h3><p>Digital transformation · Data</p><a href="#contact">Read case study <ArrowRight size={16} /></a></div></article></div></div></section>

      <section id="contact" className="enterprise-section contact-cta"><div className="enterprise-container"><div className="cta-panel"><div className="cta-glow" /><motion.div {...fadeUp}><div className="eyebrow">Your next move starts here</div><h2>Let&apos;s make your<br /><em>ambition tangible.</em></h2><p>Tell us where you want to go. We&apos;ll bring the strategy, people, and technology to get you there.</p><Link className="button-light" to="/contact">Book a consultation <ArrowRight size={17} /></Link></motion.div><div className="cta-mark"><Globe2 size={150} strokeWidth={.55} /><span>ESLAND<br />IT SOLUTIONS</span></div></div></div></section>
    </div>
  );
}
