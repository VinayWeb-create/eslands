import { ArrowRight, CloudCog, Cpu, ShieldCheck, Sparkles, Server, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import IndustryCard from '../components/IndustryCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import PartnersMarquee from '../components/PartnersMarquee';

const services = [
  { icon: CloudCog, title: 'Cloud Solutions', text: 'Lower costs and scale confidently with AWS, Azure, and GCP—migration, architecture, and ongoing optimization so you focus on business, not servers.' },
  { icon: Sparkles, title: 'AI & Automation', text: 'Turn data into decisions: ML models, process automation, and AI use cases that cut manual work and improve accuracy across operations.' },
  { icon: Cpu, title: 'DevOps & CI/CD', text: 'Ship features faster and safer with automated pipelines, Infrastructure as Code, and practices that reduce deployment risk and mean-time-to-recovery.' },
  { icon: ShieldCheck, title: 'Cybersecurity', text: 'Stay compliant and resilient: zero-trust design, threat detection, and frameworks (SOC 2, HIPAA, GDPR) so security supports growth, not blocks it.' },
  { icon: Server, title: 'Software Development', text: 'Custom apps and platforms built right: scalable APIs, modern stacks, and clean code so your product evolves without costly rewrites.' },
  { icon: Users, title: 'Staffing', text: 'IT, Pharma, Engineering, Media, and more—plus offshore-friendly engagement for US, UK, EU, and Middle East clients hiring India-based talent with clear MSAs, overlap hours, and governance.' },
];

const industries = ['Banking & Finance', 'Healthcare', 'Retail', 'Manufacturing', 'EdTech', 'Real Estate'];

export {
  ArrowRight,
  services,
  industries,
  ServiceCard,
  IndustryCard,
  TestimonialCarousel,
  PartnersMarquee,
};
