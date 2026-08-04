import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, Shield, TrendingUp, Award, Clock,
  Sparkles, ChevronDown, HelpCircle, Users, DollarSign, Headphones,
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
import AttributedProofGrid from '../components/home/AttributedProofGrid';
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
    q: "What is Esland's typical enterprise project timeline and SLA guarantee?",
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

const whyChooseUs = [
  { icon: Award,       label: '12+ Years Experience',    desc: 'Over a decade building enterprise-grade solutions across 25+ industries globally.' },
  { icon: CheckCircle2,label: 'Certified Developers',     desc: 'AWS, Azure, and Google Cloud certified engineers with deep technical expertise.' },
  { icon: TrendingUp,  label: 'Agile Delivery',           desc: 'Sprint-based delivery with CI/CD pipelines ensuring rapid, quality releases.' },
  { icon: Shield,      label: 'Enterprise Security',      desc: 'ISO 27001, SOC 2, and PCI-DSS compliant architecture for every engagement.' },
  { icon: Headphones,  label: '24×7 Support',             desc: 'Dedicated SLA-backed support team across all timezones with sub-hour response.' },
  { icon: DollarSign,  label: 'Transparent Pricing',      desc: 'No hidden fees — clear statements of work, milestones, and cost breakdown.' },
];

const processSteps = [
  { num: '01', title: 'Discovery',   desc: 'Requirements analysis, threat modeling, cloud topology design, and technical roadmap creation.' },
  { num: '02', title: 'Planning',    desc: 'Architecture planning, sprint mapping, UX wireframing, and stakeholder alignment sessions.' },
  { num: '03', title: 'UI/UX',       desc: 'Design system creation, interactive prototypes, accessibility audits, and usability testing.' },
  { num: '04', title: 'Development', desc: 'Iterative sprint execution with clean code standards, automated testing, and security scans.' },
  { num: '05', title: 'Testing',     desc: 'Automated QA, load testing, penetration audits, and cross-platform compatibility validation.' },
  { num: '06', title: 'Deployment',  desc: 'Zero-downtime production deployment with blue-green strategy and full rollback capability.' },
  { num: '07', title: 'Support',     desc: 'Proactive telemetry monitoring, incident response SLAs, and continuous system optimization.' },
];



export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsLoading, setNewsLoading]         = useState(false);
  const [activeFaq, setActiveFaq]             = useState(null);
  const { fadeUp, scaleIn, slideInLeft, slideInRight, staggerContainer, staggerItem, prefersReducedMotion } = useAccessibleAnimations();

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

  /* ── Shared section header helper ── */
  const SectionHeader = ({ badge, title, subtitle, center = true }) => (
    <div className={`max-w-3xl mb-6 ${center ? 'mx-auto text-center' : ''}`}>
      <motion.span {...fadeUp} className="section-badge mb-4 inline-flex">
        {badge}
      </motion.span>
      <motion.h2
        {...fadeUp}
        transition={{ delay: 0.08, duration: 0.65, ease: [0.22,1,0.36,1] }}
        className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          {...fadeUp}
          transition={{ delay: 0.16, duration: 0.65, ease: [0.22,1,0.36,1] }}
          className="mt-4 text-base sm:text-lg text-gray-500 dark:text-slate-400 font-medium leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );

  const sectionCls = 'py-0 px-6 relative overflow-hidden';
  const sectionBorder = { borderTop: '1px solid var(--color-border)' };
  const bgPrimary = 'bg-[var(--color-bg)]';
  const bgAlt = 'bg-[var(--color-bg-surface)]';

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] overflow-x-hidden pt-[56px]">

      {/* 1. HERO */}
      <Hero />

      {/* 2. PARTNERS / TRUST STRIP */}
      <Partners />



      {/* 4. ATTRIBUTED PROOF GRID */}
      <AttributedProofGrid />

      {/* 5. TRANSFORMATION JOURNEY */}
      <TransformationJourney />

      {/* 6. ENTERPRISE CAPABILITY ECOSYSTEM */}
      <EnterpriseCapabilityEcosystem />

      {/* 7. ENTERPRISE STANDARD */}
      <EnterpriseStandard />

      {/* 8. TECH VISUALIZER */}
      <TechVisualizer />

      {/* 9. SERVICES GRID */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        id="services" className={`${sectionCls} ${bgAlt}`} style={sectionBorder}
      >
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50" />
        <div className="mx-auto max-w-7xl relative z-10">
          <SectionHeader
            badge="Core Capabilities"
            title="Enterprise Services & Solutions"
            subtitle="From cloud infrastructure to AI-powered applications, we deliver end-to-end digital transformation across every layer of your technology stack."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.slice(0, 8).map((service, i) => (
              <motion.div key={i} variants={staggerItem}>
                <ServiceCard item={service} index={i} />
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary inline-flex">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.section>



      {/* 11. WHY CHOOSE US */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className={`${sectionCls} ${bgPrimary}`} style={sectionBorder}
      >
        <div className="mx-auto max-w-7xl relative z-10">
          <SectionHeader
            badge="Why Esland IT Solutions"
            title="Why Global Businesses Choose Us"
            subtitle="We combine technical depth, strategic thinking, and enterprise-grade processes to deliver outcomes that matter."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {whyChooseUs.map((item, i) => {
              const hoverStyle = [
                { b: 'hover:border-blue-500', s: 'hover:shadow-blue-500/20 dark:hover:shadow-blue-500/20', ibg: 'group-hover:bg-blue-600', ib: 'group-hover:border-blue-600', it: 'group-hover:text-blue-600 dark:group-hover:text-blue-400' },
                { b: 'hover:border-purple-500', s: 'hover:shadow-purple-500/20 dark:hover:shadow-purple-500/20', ibg: 'group-hover:bg-purple-600', ib: 'group-hover:border-purple-600', it: 'group-hover:text-purple-600 dark:group-hover:text-purple-400' },
                { b: 'hover:border-emerald-500', s: 'hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/20', ibg: 'group-hover:bg-emerald-600', ib: 'group-hover:border-emerald-600', it: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400' },
                { b: 'hover:border-amber-500', s: 'hover:shadow-amber-500/20 dark:hover:shadow-amber-500/20', ibg: 'group-hover:bg-amber-500', ib: 'group-hover:border-amber-500', it: 'group-hover:text-amber-600 dark:group-hover:text-amber-400' },
                { b: 'hover:border-rose-500', s: 'hover:shadow-rose-500/20 dark:hover:shadow-rose-500/20', ibg: 'group-hover:bg-rose-600', ib: 'group-hover:border-rose-600', it: 'group-hover:text-rose-600 dark:group-hover:text-rose-400' },
                { b: 'hover:border-cyan-500', s: 'hover:shadow-cyan-500/20 dark:hover:shadow-cyan-500/20', ibg: 'group-hover:bg-cyan-600', ib: 'group-hover:border-cyan-600', it: 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400' },
              ][i % 6];

              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className={`group flex gap-5 p-7 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-all duration-300 hover:-translate-y-1 ${hoverStyle.b} ${hoverStyle.s}`}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,48,135,0.06)] dark:bg-[rgba(64,128,255,0.09)] border border-[rgba(0,48,135,0.12)] dark:border-[rgba(64,128,255,0.16)] text-[#003087] dark:text-[#7ABAFF] group-hover:text-white dark:group-hover:text-white transition-all duration-250 ${hoverStyle.ibg} ${hoverStyle.ib}`}>
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h3 className={`font-display font-bold text-gray-900 dark:text-white mb-1.5 transition-colors ${hoverStyle.it}`}>
                      {item.label}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* 12. DEVELOPMENT PROCESS */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className={`${sectionCls} ${bgAlt}`} style={sectionBorder}
      >
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30" />
        <div className="mx-auto max-w-7xl relative z-10">
          <SectionHeader
            badge="Delivery Framework"
            title="Our Enterprise Delivery Process"
            subtitle="A proven seven-stage methodology that delivers on time, on budget, and at the highest quality standard."
          />

          {/* Horizontal timeline */}
          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-200 dark:via-primary-800 to-transparent mx-16">
               {/* Traveling data packet 1 */}
               <motion.div
                 className="absolute top-1/2 -translate-y-1/2 h-[3px] w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full shadow-[0_0_15px_3px_rgba(59,130,246,0.6)]"
                 animate={!prefersReducedMotion ? { left: ['-10%', '110%'] } : {}}
                 transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
               />
               {/* Traveling data packet 2 */}
               <motion.div
                 className="absolute top-1/2 -translate-y-1/2 h-[2px] w-16 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full shadow-[0_0_12px_2px_rgba(52,211,153,0.8)]"
                 animate={!prefersReducedMotion ? { left: ['-20%', '120%'] } : {}}
                 transition={{ repeat: Infinity, duration: 3.2, ease: 'linear', delay: 1.5 }}
               />
               {/* Traveling data packet 3 */}
               <motion.div
                 className="absolute top-1/2 -translate-y-1/2 h-[4px] w-40 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full blur-[1px] shadow-[0_0_20px_4px_rgba(168,85,247,0.7)]"
                 animate={!prefersReducedMotion ? { left: ['-5%', '115%'] } : {}}
                 transition={{ repeat: Infinity, duration: 5.5, ease: 'linear', delay: 2.8 }}
               />
            </div>

            {/* Connector line (mobile vertical) */}
            <div className="lg:hidden absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-primary-200 dark:via-primary-800 to-transparent">
               {/* Traveling data packet 1 (vertical) */}
               <motion.div
                 className="absolute left-1/2 -translate-x-1/2 w-[3px] h-32 bg-gradient-to-b from-transparent via-blue-500 to-transparent rounded-full shadow-[0_0_15px_3px_rgba(59,130,246,0.6)]"
                 animate={!prefersReducedMotion ? { top: ['-10%', '110%'] } : {}}
                 transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
               />
               {/* Traveling data packet 2 (vertical) */}
               <motion.div
                 className="absolute left-1/2 -translate-x-1/2 w-[2px] h-16 bg-gradient-to-b from-transparent via-emerald-400 to-transparent rounded-full shadow-[0_0_12px_2px_rgba(52,211,153,0.8)]"
                 animate={!prefersReducedMotion ? { top: ['-20%', '120%'] } : {}}
                 transition={{ repeat: Infinity, duration: 3.2, ease: 'linear', delay: 1.5 }}
               />
               {/* Traveling data packet 3 (vertical) */}
               <motion.div
                 className="absolute left-1/2 -translate-x-1/2 w-[4px] h-40 bg-gradient-to-b from-transparent via-purple-500 to-transparent rounded-full blur-[1px] shadow-[0_0_20px_4px_rgba(168,85,247,0.7)]"
                 animate={!prefersReducedMotion ? { top: ['-5%', '115%'] } : {}}
                 transition={{ repeat: Infinity, duration: 5.5, ease: 'linear', delay: 2.8 }}
               />
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              className="grid gap-6 md:grid-cols-4 lg:grid-cols-7"
            >
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  variants={staggerItem}
                  className="group relative text-center"
                >
                  {/* Number circle */}
                  <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-dark-800 border-2 border-primary-200 dark:border-primary-800 group-hover:border-primary-500 dark:group-hover:border-primary-400 group-hover:bg-primary-600 dark:group-hover:bg-primary-600 transition-all duration-300 shadow-card z-10">
                    <span className="text-sm font-extrabold text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2 text-sm group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[12px] text-gray-500 dark:text-slate-400 leading-relaxed block">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>



      {/* 14. TESTIMONIALS */}
      <Testimonials />

      {/* 15. FAQ */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className={`${sectionCls} ${bgAlt}`} style={sectionBorder}
      >
        <div className="mx-auto max-w-4xl relative z-10">
          <SectionHeader
            badge="FAQ"
            title="Enterprise Inquiry Center"
            subtitle="Answers to the most common questions from technology leaders and business decision-makers."
          />
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              
              // Distinct colors for each FAQ
              const fC = [
                { b: 'border-blue-500', bg: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400', glow: 'shadow-[0_0_24px_rgba(59,130,246,0.2)]', grad: 'from-blue-500/10' },
                { b: 'border-emerald-500', bg: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', glow: 'shadow-[0_0_24px_rgba(16,185,129,0.2)]', grad: 'from-emerald-500/10' },
                { b: 'border-purple-500', bg: 'bg-purple-500', text: 'text-purple-600 dark:text-purple-400', glow: 'shadow-[0_0_24px_rgba(168,85,247,0.2)]', grad: 'from-purple-500/10' },
                { b: 'border-amber-500', bg: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', glow: 'shadow-[0_0_24px_rgba(245,158,11,0.2)]', grad: 'from-amber-500/10' },
              ][idx % 4];

              return (
                <motion.div
                  key={idx}
                  {...scaleIn}
                  transition={{ delay: idx * 0.07 }}
                  className={`group relative rounded-xl border transition-all duration-500 overflow-hidden ${
                    isOpen 
                      ? `border-transparent ${fC.glow} bg-white dark:bg-[#0a0f1e] scale-[1.02] z-10 my-4` 
                      : 'border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg'
                  }`}
                >
                  {/* Colorful Left Accent Line (Animated) */}
                  <div className={`absolute left-0 top-0 bottom-0 w-[4px] transition-all duration-500 ${isOpen ? `${fC.bg} opacity-100` : 'bg-transparent opacity-0 group-hover:opacity-40'} group-hover:${fC.bg}`} />
                  
                  {/* Subtle Background Gradient on Active */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${fC.grad} to-transparent opacity-0 transition-opacity duration-500 pointer-events-none ${isOpen ? 'opacity-100' : ''}`} />

                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 sm:px-8 sm:py-6 text-left flex items-center justify-between gap-4 focus:outline-none relative z-10"
                    aria-expanded={isOpen}
                  >
                    <span className={`text-base sm:text-lg font-display font-bold transition-colors duration-300 ${
                      isOpen ? fC.text : 'text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200'
                    }`}>
                      {faq.q}
                    </span>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                      isOpen
                        ? `${fC.bg} border-transparent text-white rotate-180 shadow-md`
                        : 'border-[var(--color-border)] text-gray-500 dark:text-slate-400 group-hover:bg-gray-50 dark:group-hover:bg-gray-800'
                    }`}>
                      <ChevronDown size={16} className="transition-transform duration-500" />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 px-6 pb-6 sm:px-8 sm:pb-8 text-gray-600 dark:text-slate-300 text-sm leading-relaxed border-t border-[var(--color-border)] pt-5 font-medium"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 16. CTA BANNER */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden py-0 px-6"
        style={{
          background: 'linear-gradient(160deg, #071829 0%, #0A2040 45%, #071524 100%)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        {/* Subtle ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(0,87,216,0.09), transparent 65%)' }}
        />

        <div className="mx-auto max-w-5xl relative z-10 text-center">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] mb-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderLeft: '3px solid #4080FF', color: 'rgba(200,220,255,0.85)', borderRadius: '3px' }}>
              <Sparkles size={13} className="text-blue-400" />
              Ready to Build Your Next Digital Product?
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight mb-6 leading-tight">
              Architect Your Digital Future{' '}<br className="hidden sm:block" />
              With{' '}
              <span className="text-shimmer">Esland IT Solutions</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
              Schedule a strategic discovery session with our senior solution architects to evaluate your technology infrastructure, security compliance, and custom software requirements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white uppercase tracking-wider transition-all"
                style={{
                  background: '#003087',
                  borderRadius: '5px',
                  border: '1px solid rgba(64,128,255,0.3)',
                  boxShadow: '0 4px 16px rgba(0,48,135,0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0045C0';
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,48,135,0.55)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#003087';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,48,135,0.4)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Schedule Free Consultation <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-md border px-8 py-4 text-sm font-bold text-slate-200 hover:text-white transition-all uppercase tracking-wider"
                style={{ borderColor: 'rgba(255,255,255,0.20)', background: 'rgba(255,255,255,0.06)' }}
              >
                Explore Solutions
              </Link>
            </div>

            {/* Newsletter */}
            <div className="max-w-xl mx-auto pt-8 border-t border-white/10">
              <h3 className="text-sm font-bold text-white mb-3">Subscribe to Esland Enterprise Insights</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter business email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-[#4080FF] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={newsLoading}
                  className="rounded-md text-white font-bold px-6 py-3 text-sm transition-all disabled:opacity-50"
                  style={{
                    background: '#003087',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#002068'}
                  onMouseLeave={e => e.currentTarget.style.background = '#003087'}
                >
                  {newsLoading ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
