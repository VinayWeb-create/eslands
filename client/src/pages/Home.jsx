import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Phone, Mail, CheckCircle2, Shield, TrendingUp, Award,
  Sparkles, ChevronDown, HelpCircle, Layers, Cpu, Globe2, Lock
} from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../lib/api';
import CountUp from '../components/CountUp';
import { Link } from 'react-router-dom';
import { services } from './Services';
import Hero from '../components/home/Hero';
import Partners from '../components/home/Partners';
import Testimonials from '../components/home/Testimonials';
import TechVisualizer from '../components/home/TechVisualizer';
import TransformationJourney from '../components/home/TransformationJourney';
import IndustriesBento from '../components/home/IndustriesBento';
import AttributedProofGrid from '../components/home/AttributedProofGrid';
import DigitalEcosystem from '../components/home/DigitalEcosystem';
import EnterpriseStandard from '../components/home/EnterpriseStandard';
import EnterpriseCapabilityEcosystem from '../components/home/EnterpriseCapabilityEcosystem';
import ServiceCard from '../components/ServiceCard';
import { useAccessibleAnimations } from '../lib/animations';

const faqs = [
  {
    q: 'How does Esland ensure enterprise cybersecurity and compliance?',
    a: 'We strictly follow ISO 27001:2022, SOC 2 Type II, and PCI-DSS standards across all software and cloud projects, incorporating automated security scanning and zero-trust mesh networks.',
  },
  {
    q: 'What is Esland’s typical enterprise project timeline and SLA guarantee?',
    a: 'Timelines range from 4 to 16 weeks depending on architectural complexity. All managed services carry a guaranteed 99.99% uptime SLA with 24/7 dedicated support.',
  },
  {
    q: 'Can Esland modernize legacy IT systems without operational disruption?',
    a: 'Yes. We specialize in zero-downtime microservice migration, incremental API wrapping, and cloud hybrid deployment to ensure continuous business operations.',
  },
  {
    q: 'What technologies and frameworks does your engineering team specialize in?',
    a: 'Our core expertise includes Cloud Infrastructure (AWS, Azure, GCP), React, Node.js, Python, Swift, Kotlin, Docker, Kubernetes, and enterprise SQL/NoSQL databases.',
  },
];

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsLoading, setNewsLoading] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const { fadeUp, staggerContainer, staggerItem } = useAccessibleAnimations();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsLoading(true);
    try {
      await api.post('/api/newsletter', { email: newsletterEmail });
      toast.success('Thank you for subscribing to Esland Enterprise Insights!');
      setNewsletterEmail('');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to subscribe. Please try again.');
    } finally {
      setNewsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-300 overflow-x-hidden pt-[65px]">
      {/* 1. EDITORIAL NEWSROOM HERO */}
      <Hero />

      {/* 2. ENTERPRISE TRUST & CERTIFICATIONS MARQUEE */}
      <Partners />

      {/* 3. ABOUT ESLAND */}
      <section id="about" className="py-28 px-6 relative overflow-hidden bg-slate-950">
        <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[150px]" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid gap-16 lg:grid-cols-12 items-center">
            {/* Left Narrative */}
            <motion.div {...fadeUp} className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-4">
                Corporate Excellence Since 2013
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
                Global Technology Partner Built For <br />
                <span className="animate-text-shimmer">
                  Enterprise Ambition
                </span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 font-medium">
                Founded in 2013 by Naresh Pathi, Esland IT Solutions empowers Fortune-caliber enterprises and growth businesses with resilient cloud architecture, custom software development, and 24/7 managed IT operations.
              </p>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  { value: 10, suffix: '+', label: 'Years Built', icon: Award },
                  { value: 500, suffix: '+', label: 'Projects Delivered', icon: TrendingUp },
                  { value: 200, suffix: '+', label: 'Global Clients', icon: CheckCircle2 },
                  { value: 99.9, suffix: '%', label: 'Uptime SLA', icon: Shield },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center justify-center p-5 rounded-2xl border border-white/10 bg-slate-900/80 text-center hover:border-sky-400/40 hover:bg-slate-900 transition-all duration-300"
                  >
                    <stat.icon size={20} className="text-sky-400 mb-2" />
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      <CountUp end={stat.value} suffix={stat.suffix} decimals={stat.value % 1 !== 0 ? 1 : 0} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-400 hover:text-white transition group"
              >
                Learn About Our Engineering Culture <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Right Interactive Image Showcase */}
            <motion.div {...fadeUp} transition={{ delay: 0.15, duration: 0.6 }} className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-[2.5rem] p-2 border border-white/15 bg-slate-900/90 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
                <img
                  src="/about-image.jpg"
                  alt="Esland IT Enterprise Headquarters"
                  className="rounded-[2.2rem] w-full object-cover aspect-[4/3] relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. ATTRIBUTED PROOF & CAPABILITY GRID (IBM PATTERN) */}
      <AttributedProofGrid />

      {/* 5. INTERACTIVE TRANSFORMATION ENGINE STAGE */}
      <TransformationJourney />

      {/* 6. ENTERPRISE CAPABILITY ECOSYSTEM NETWORK (13 SERVICES RADIAL HUB) */}
      <EnterpriseCapabilityEcosystem />

      {/* 7. THE ESLAND ENTERPRISE STANDARD (FLAGSHIP EXPERIENCE) */}
      <EnterpriseStandard />

      {/* 8. INTERACTIVE TECH VISUALIZER */}
      <TechVisualizer />

      {/* 9. SERVICES BENTO GRID */}
      <section id="services" className="py-28 px-6 relative bg-slate-950 overflow-hidden border-t border-white/5">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-4">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Enterprise Services & Solutions
            </h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.slice(0, 8).map((service, index) => (
              <ServiceCard key={index} item={service} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* 10. INDUSTRY VERTICALS */}
      <IndustriesBento />

      {/* 11. PROVEN ENTERPRISE PROCESS TIMELINE */}
      <section className="py-28 px-6 relative bg-slate-950 overflow-hidden border-t border-white/5">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-4">
              DELIVERY FRAMEWORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Our Enterprise Delivery Process
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-4 relative">
            {[
              { num: '01', title: 'Discovery & Architecture', desc: 'Requirements analysis, threat modeling, cloud topology design, and technical roadmap.' },
              { num: '02', title: 'Agile Engineering', desc: 'Iterative sprint execution with CI/CD automation, clean code standards, and security scans.' },
              { num: '03', title: 'Deployment & Testing', desc: 'Automated testing, load testing, penetration audits, and zero-downtime production deployment.' },
              { num: '04', title: '24/7 Managed Ops', desc: 'Proactive telemetry monitoring, incident response SLAs, and continuous system optimization.' },
            ].map((step) => (
              <div
                key={step.num}
                className="spotlight-card relative rounded-[2.2rem] border border-white/10 bg-slate-900/80 backdrop-blur-xl p-8 hover:border-sky-400/40 transition-all duration-300 group"
              >
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500 mb-4">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. PROVEN IMPACT / CASE STUDIES */}
      <section className="py-28 px-6 relative bg-slate-900/60 overflow-hidden border-t border-white/5">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-4">
              Proven Business Impact
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Measurable Enterprise Outcomes
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                client: 'Global Logistics Provider',
                result: '40% Downtime Reduction',
                desc: 'Migrated legacy infrastructure to a high-availability multi-region AWS cloud setup with automated failover.',
                metrics: ['99.99% Availability', '10x Speed', 'Zero Data Loss'],
              },
              {
                client: 'Fintech & Digital Banking',
                result: 'PCI-DSS & SOC 2 Compliance in 30 Days',
                desc: 'Implemented zero-trust security mesh, encrypted data vault, and automated compliance auditing pipelines.',
                metrics: ['100% Audit Score', 'Real-time Telemetry', 'Zero Vulnerabilities'],
              },
            ].map((cs) => (
              <div
                key={cs.client}
                className="spotlight-card p-10 rounded-[2.5rem] border border-white/10 bg-slate-900/90 backdrop-blur-2xl hover:border-sky-400/40 transition-all duration-500 group"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-2 block">{cs.client}</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 group-hover:text-sky-300 transition-colors">{cs.result}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">{cs.desc}</p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {cs.metrics.map((m) => (
                    <span key={m} className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/20 text-xs font-semibold">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. TESTIMONIALS */}
      <Testimonials />

      {/* 14. FAQ ACCORDION */}
      <section className="py-28 px-6 relative bg-slate-950 overflow-hidden border-t border-white/5">
        <div className="mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-4">
              <HelpCircle size={14} /> Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Enterprise Inquiry Center
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-bold text-white">{faq.q}</span>
                    <ChevronDown size={20} className={`text-sky-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-white/5 pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 15. HIGH-CONVERSION CONSULTATION CTA & NEWSLETTER */}
      <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border-t border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-sky-500/15 via-transparent to-transparent" />

        <div className="mx-auto max-w-5xl relative z-10 text-center">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs font-bold uppercase tracking-[0.25em] text-sky-300 mb-6 backdrop-blur-xl shadow-lg shadow-sky-500/10">
              <Sparkles size={14} className="animate-pulse text-sky-400" /> READY TO ELEVATE YOUR IT ARCHITECTURE?
            </span>
            <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Architect Your Digital Future With <br />
              <span className="animate-text-shimmer">
                Esland IT Solutions
              </span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 font-medium">
              Schedule a strategic discovery session with our senior solution architects to evaluate your technology infrastructure, security compliance, and custom software requirements.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:brightness-110 transition-all uppercase tracking-wider"
              >
                Schedule Consultation <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-slate-900/80 backdrop-blur-xl px-8 py-4 text-sm font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all uppercase tracking-wider"
              >
                Explore Solutions
              </Link>
            </div>

            {/* Newsletter Subscription Row */}
            <div className="max-w-xl mx-auto pt-8 border-t border-white/10">
              <h3 className="text-sm font-bold text-white mb-3">Subscribe to Esland Enterprise Insights</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter business email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 rounded-2xl border border-white/15 bg-slate-900/90 backdrop-blur-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={newsLoading}
                  className="rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-6 py-3 text-sm transition shadow disabled:opacity-50"
                >
                  {newsLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
