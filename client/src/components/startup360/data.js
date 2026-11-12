/**
 * Startup360 — single source of truth for page content.
 * Components render from this file only; no copy is hard-coded in UI.
 */
import {
  Lightbulb, Search, FlaskConical, FileText, Landmark, Coins, Palette, Cpu, Rocket,
  Megaphone, Workflow, TrendingUp, Cloud, Brain, Users, ShieldCheck, Contact, BarChart3,
  Globe, Smartphone, Server, Boxes, Briefcase, MessageCircle, IndianRupee, Code2,
  HeartPulse, GraduationCap, ShoppingBag, Factory, HardHat, LineChart, Building2, Hospital, Plane,
} from 'lucide-react';

export const BRAND = 'Esland';
export const PRODUCT = 'Startup360';

export const CTA = {
  start: '/contact?mode=proposal',
  consult: '/contact?mode=consultation',
};

/* ── 1. Hero ─────────────────────────────────────────────── */
export const heroOrbit = [
  { label: 'Strategy', icon: Lightbulb },
  { label: 'Brand', icon: Palette },
  { label: 'Product', icon: Code2 },
  { label: 'AI', icon: Brain },
  { label: 'Cloud', icon: Cloud },
  { label: 'Growth', icon: TrendingUp },
  { label: 'Funding', icon: Coins },
  { label: 'Automation', icon: Workflow },
];

export const heroPhases = ['Idea', 'Validate', 'Build', 'Launch', 'Grow', 'Scale'];

export const demoSlides = [
  { title: 'Tell us the idea', body: 'A discovery call turns a rough idea into a written problem statement, audience and success metric.', icon: Lightbulb },
  { title: 'We validate it with real users', body: 'Competitor mapping, landing-page tests and founder interviews show whether people will pay before any code is written.', icon: FlaskConical },
  { title: 'Brand, entity and plan land together', body: 'Company registration, name, identity system and a funding-ready business plan run in parallel, not one after another.', icon: Palette },
  { title: 'One team builds the product', body: 'Web, mobile, cloud and AI engineers ship an MVP in fortnightly releases you can click through.', icon: Cpu },
  { title: 'Launch with growth already wired', body: 'CRM, WhatsApp journeys, analytics and campaigns go live with the product, so the first users are tracked from day one.', icon: Rocket },
  { title: 'Scale on the same foundation', body: 'Automation, security and hiring support grow with you. Nothing has to be rebuilt when traction arrives.', icon: TrendingUp },
];

/* ── 2. Startup Journey ──────────────────────────────────── */
export const journey = [
  { id: 'idea', title: 'Idea', icon: Lightbulb, time: 'Week 0', summary: 'Turn a spark into a sharp problem statement.', detail: 'We run a structured discovery workshop to define the problem, the customer and the one metric that proves you are right.', deliverables: ['Problem statement', 'Ideal customer profile', 'North-star metric'] },
  { id: 'research', title: 'Research', icon: Search, time: 'Week 1', summary: 'Know the market better than anyone in it.', detail: 'Market sizing, competitor teardown and pricing benchmarks, compiled into a brief you can hand to investors.', deliverables: ['TAM / SAM / SOM', 'Competitor matrix', 'Pricing benchmarks'] },
  { id: 'validation', title: 'Validation', icon: FlaskConical, time: 'Week 2', summary: 'Prove demand before you spend on build.', detail: 'Clickable prototypes, smoke-test landing pages and user interviews measure real intent, not polite interest.', deliverables: ['Clickable prototype', 'Smoke-test page', 'Interview synthesis'] },
  { id: 'plan', title: 'Business Plan', icon: FileText, time: 'Week 3', summary: 'A plan that reads like a decision, not a wish.', detail: 'Unit economics, a three-year financial model and go-to-market sequencing, built to survive investor diligence.', deliverables: ['Financial model', 'GTM plan', 'Pitch narrative'] },
  { id: 'registration', title: 'Registration', icon: Landmark, time: 'Week 3', summary: 'Your company, legally real and compliant.', detail: 'Entity selection, incorporation, tax registration and founder agreements handled with our compliance partners.', deliverables: ['Incorporation', 'Tax registration', 'Founder agreements'] },
  { id: 'funding', title: 'Funding', icon: Coins, time: 'Week 4+', summary: 'Investor-ready, with the right rooms open.', detail: 'Pitch deck, data room and grant applications, plus warm introductions to angels, accelerators and schemes that fit your stage.', deliverables: ['Pitch deck', 'Data room', 'Grant & investor pipeline'] },
  { id: 'brand', title: 'Brand', icon: Palette, time: 'Week 4', summary: 'An identity people remember after one look.', detail: 'Naming support, logo, design system, tone of voice and launch assets that stay consistent across every touchpoint.', deliverables: ['Logo & identity', 'Design system', 'Brand guidelines'] },
  { id: 'technology', title: 'Technology', icon: Cpu, time: 'Week 5–10', summary: 'Your MVP, engineered to scale from the start.', detail: 'Web and mobile apps on cloud infrastructure with CI/CD, testing and security built in, released every two weeks.', deliverables: ['Web & mobile MVP', 'Cloud infrastructure', 'CI/CD pipeline'] },
  { id: 'launch', title: 'Launch', icon: Rocket, time: 'Week 12', summary: 'A launch that is planned to the hour.', detail: 'Store submissions, launch campaigns, PR moments and a war-room checklist so day one goes the way you planned.', deliverables: ['Launch runbook', 'Store listings', 'Launch campaign'] },
  { id: 'marketing', title: 'Marketing', icon: Megaphone, time: 'Month 3+', summary: 'Acquisition channels that compound.', detail: 'SEO, performance ads, content and social, with every rupee attributed to the customers it actually brought in.', deliverables: ['SEO foundation', 'Paid campaigns', 'Content engine'] },
  { id: 'automation', title: 'Automation', icon: Workflow, time: 'Month 4+', summary: 'The busywork runs itself.', detail: 'CRM workflows, WhatsApp journeys, invoicing and AI agents remove the manual steps between a lead and revenue.', deliverables: ['CRM workflows', 'WhatsApp journeys', 'AI assistants'] },
  { id: 'scale', title: 'Scale', icon: TrendingUp, time: 'Month 6+', summary: 'Grow without rebuilding.', detail: 'Performance tuning, security hardening, hiring support and new markets, all on the foundation you already own.', deliverables: ['Scale architecture', 'Security audit', 'Hiring support'] },
];

/* ── 3. Operating System ─────────────────────────────────── */
export const osModules = [
  { id: 'technology', label: 'Technology', icon: Code2, color: '#4080FF', desc: 'Web, mobile and backend engineering with fortnightly releases.' },
  { id: 'cloud', label: 'Cloud', icon: Cloud, color: '#0EA5E9', desc: 'AWS, Azure and GCP infrastructure with cost controls from day one.' },
  { id: 'ai', label: 'AI', icon: Brain, color: '#8B5CF6', desc: 'LLM assistants, recommendation engines and document intelligence.' },
  { id: 'branding', label: 'Branding', icon: Palette, color: '#EC4899', desc: 'Identity, design systems and launch creative that stay consistent.' },
  { id: 'marketing', label: 'Marketing', icon: Megaphone, color: '#F59E0B', desc: 'SEO, performance ads and content tied to attributed revenue.' },
  { id: 'hiring', label: 'Hiring', icon: Users, color: '#14B8A6', desc: 'Dedicated engineers and pre-vetted talent when you are ready to grow the team.' },
  { id: 'security', label: 'Security', icon: ShieldCheck, color: '#10B981', desc: 'Secure-by-default builds, audits and compliance readiness.' },
  { id: 'funding', label: 'Funding', icon: Coins, color: '#EAB308', desc: 'Pitch decks, data rooms, grants and investor introductions.' },
  { id: 'crm', label: 'CRM', icon: Contact, color: '#6366F1', desc: 'Pipeline, quotes and customer history in one connected system.' },
  { id: 'automation', label: 'Automation', icon: Workflow, color: '#F97316', desc: 'Workflows and agents that remove manual work between teams.' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, color: '#22D3EE', desc: 'Dashboards that show what drives growth, updated in real time.' },
];

/* ── 4. Agencies vs Startup360 ───────────────────────────── */
export const fragmentedVendors = [
  { label: 'Design agency', x: 18, y: 20 },
  { label: 'Dev shop', x: 74, y: 16 },
  { label: 'Marketing firm', x: 82, y: 62 },
  { label: 'Accountant', x: 22, y: 74 },
  { label: 'Freelancer', x: 50, y: 88 },
  { label: 'Hosting vendor', x: 50, y: 44 },
];

export const fragmentedPains = [
  { text: 'Invoice #4 overdue', x: 6, y: 44 },
  { text: 'Delay +3 weeks', x: 60, y: 32 },
  { text: '"Not our scope"', x: 34, y: 58 },
  { text: 'Who owns the code?', x: 60, y: 78 },
];

export const comparisonPoints = [
  { label: 'Contracts to manage', before: '6–8', after: '1' },
  { label: 'Hand-offs between teams', before: '20+', after: '0' },
  { label: 'Time to first launch', before: '9–12 mo', after: '~12 wks' },
  { label: 'Single roadmap', before: 'No', after: 'Yes' },
];

/* ── 5. Services ─────────────────────────────────────────── */
export const services = [
  { id: 'web', name: 'Web', icon: Globe, tagline: 'Websites and web apps that convert and scale.', features: ['Next.js & React builds', 'Headless CMS', 'Core Web Vitals tuned', 'Multilingual & accessible'], benefits: ['Faster first impressions', 'SEO-ready from launch', 'Edit content without developers'], stack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind'], caseStudy: { title: 'D2C storefront', outcome: 'Launch-ready storefront with checkout, CMS and analytics in 8 weeks.' } },
  { id: 'mobile', name: 'Mobile', icon: Smartphone, tagline: 'Native-feeling iOS and Android apps from one codebase.', features: ['React Native & Flutter', 'Offline-first sync', 'Push & in-app messaging', 'Store submission'], benefits: ['One codebase, two stores', 'Weekly test builds', 'Crash and usage analytics'], stack: ['React Native', 'Flutter', 'Firebase', 'Expo'], caseStudy: { title: 'Field-service app', outcome: 'Offline job tracking for technicians, shipped to both stores in 10 weeks.' } },
  { id: 'ai', name: 'AI', icon: Brain, tagline: 'AI features your customers actually use.', features: ['LLM assistants & copilots', 'Retrieval over your data', 'Document extraction', 'Recommendation engines'], benefits: ['Automate repetitive support', 'Personalise every journey', 'Guardrails and evaluation built in'], stack: ['Claude', 'OpenAI', 'LangGraph', 'pgvector', 'Python'], caseStudy: { title: 'Support copilot', outcome: 'Answers drafted from the help centre, reviewed by agents before sending.' } },
  { id: 'cloud', name: 'Cloud', icon: Cloud, tagline: 'Infrastructure that is cheap at ten users and calm at ten million.', features: ['AWS / Azure / GCP', 'Infrastructure as code', 'Autoscaling', 'Cost dashboards'], benefits: ['Predictable bills', 'No single point of failure', 'Environments on demand'], stack: ['AWS', 'Terraform', 'Docker', 'Kubernetes'], caseStudy: { title: 'Seed-stage SaaS', outcome: 'Moved from a single VM to autoscaling containers with zero downtime.' } },
  { id: 'devops', name: 'DevOps', icon: Server, tagline: 'Ship daily without fear.', features: ['CI/CD pipelines', 'Preview environments', 'Monitoring & alerting', 'Automated testing'], benefits: ['Releases in minutes', 'Issues caught before users see them', 'Rollback in one click'], stack: ['GitHub Actions', 'ArgoCD', 'Grafana', 'Sentry'], caseStudy: { title: 'Release pipeline', outcome: 'Release time cut from a full day of manual steps to an automated pipeline.' } },
  { id: 'automation', name: 'Automation', icon: Workflow, tagline: 'Every repetitive task, removed.', features: ['Workflow orchestration', 'WhatsApp & email journeys', 'Invoice & payment flows', 'AI agents'], benefits: ['Fewer manual errors', 'Teams focus on customers', 'Processes documented by default'], stack: ['n8n', 'Zapier', 'WhatsApp API', 'Node.js'], caseStudy: { title: 'Lead-to-invoice', outcome: 'Form submission to quote to invoice, connected without manual re-entry.' } },
  { id: 'crm', name: 'CRM', icon: Contact, tagline: 'Your pipeline, finally in one place.', features: ['Lead capture & scoring', 'Quotes & e-sign', 'Customer portal', 'Custom pipelines'], benefits: ['No lead falls through', 'Forecast with confidence', 'Shared customer history'], stack: ['Custom CRM', 'HubSpot', 'Zoho', 'Salesforce'], caseStudy: { title: 'Sales pipeline', outcome: 'Leads, quotes and payments tracked in one dashboard for a 6-person sales team.' } },
  { id: 'erp', name: 'ERP', icon: Boxes, tagline: 'Operations, inventory and finance in sync.', features: ['Inventory & procurement', 'Accounting integration', 'Multi-location', 'Role-based access'], benefits: ['One version of the truth', 'Real-time stock levels', 'Audit-ready records'], stack: ['Odoo', 'ERPNext', 'Tally integration', 'Custom'], caseStudy: { title: 'Multi-store retail', outcome: 'Stock, purchase orders and accounts unified across locations.' } },
  { id: 'security', name: 'Cyber Security', icon: ShieldCheck, tagline: 'Security investors and customers can trust.', features: ['Penetration testing', 'Secure SDLC', 'Compliance readiness', 'Zero-trust access'], benefits: ['Pass enterprise security reviews', 'Lower breach risk', 'Clear remediation plans'], stack: ['OWASP', 'ISO 27001', 'SOC 2', 'Cloudflare'], caseStudy: { title: 'Enterprise readiness', outcome: 'Security questionnaire and remediation completed ahead of a first enterprise deal.' } },
  { id: 'marketing', name: 'Marketing', icon: Megaphone, tagline: 'Growth you can attribute, not guess.', features: ['SEO & content', 'Performance ads', 'Social media', 'Conversion optimisation'], benefits: ['Lower acquisition cost', 'Compounding organic traffic', 'Weekly growth reports'], stack: ['Google Ads', 'Meta Ads', 'GA4', 'Search Console'], caseStudy: { title: 'Organic growth', outcome: 'Content and technical SEO programme built around high-intent search terms.' } },
  { id: 'branding', name: 'Branding', icon: Palette, tagline: 'A brand that looks funded before you are.', features: ['Naming support', 'Logo & identity', 'Design system', 'Motion & launch assets'], benefits: ['Instant credibility', 'Consistency at every touchpoint', 'Faster creative production'], stack: ['Figma', 'After Effects', 'Illustrator'], caseStudy: { title: 'Rebrand for launch', outcome: 'Identity, guidelines and launch kit delivered in 4 weeks.' } },
  { id: 'staffing', name: 'Staffing', icon: Users, tagline: 'Senior talent, without the hiring lag.', features: ['Dedicated developers', 'Team extension', 'Technical interviews', 'Flexible contracts'], benefits: ['Start in days, not months', 'Scale up or down monthly', 'Vetted senior engineers'], stack: ['Frontend', 'Backend', 'Mobile', 'DevOps', 'QA'], caseStudy: { title: 'Team extension', outcome: 'Two senior engineers embedded into a founder-led team within a week.' } },
  { id: 'funding', name: 'Funding', icon: IndianRupee, tagline: 'Investor-ready, from deck to data room.', features: ['Pitch deck design', 'Financial modelling', 'Grant applications', 'Investor introductions'], benefits: ['Sharper investor story', 'Diligence-ready documents', 'Access to the right networks'], stack: ['Pitch deck', 'Data room', 'Cap table', 'Grants'], caseStudy: { title: 'Pre-seed round', outcome: 'Deck, model and data room prepared before the first investor meeting.' } },
  { id: 'consulting', name: 'Business Consulting', icon: Briefcase, tagline: 'A strategy partner on speed dial.', features: ['Go-to-market strategy', 'Pricing & packaging', 'Process design', 'Fractional CTO'], benefits: ['Fewer costly detours', 'Decisions backed by data', 'Senior advice on demand'], stack: ['GTM', 'Pricing', 'OKRs', 'Fractional CTO'], caseStudy: { title: 'Pricing reset', outcome: 'Tiered pricing designed and tested ahead of a public launch.' } },
];

/* ── 6. Growth Engine ────────────────────────────────────── */
export const growthStations = [
  { id: 'website', label: 'Website', icon: Globe, metric: 'Visitors', base: 12480, step: 7 },
  { id: 'crm', label: 'CRM', icon: Contact, metric: 'Leads', base: 1864, step: 2 },
  { id: 'marketing', label: 'Marketing', icon: Megaphone, metric: 'Campaigns', base: 42, step: 0 },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, metric: 'Conversations', base: 3210, step: 3 },
  { id: 'ai', label: 'AI', icon: Brain, metric: 'Auto-replies', base: 9530, step: 5 },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, metric: 'Events', base: 84200, step: 23 },
  { id: 'revenue', label: 'Revenue', icon: TrendingUp, metric: 'MRR (₹)', base: 482000, step: 140 },
];

/* ── 7. Industries ───────────────────────────────────────── */
export const industries = [
  { id: 'healthcare', name: 'Healthcare', icon: HeartPulse, color: '#EF4444', pitch: 'Telehealth, patient apps and records that stay compliant.', kpis: [['Consultations', '1,284'], ['Avg wait', '6 min'], ['Satisfaction', '4.8']], chart: [30, 42, 38, 55, 61, 58, 72], chartType: 'line' },
  { id: 'education', name: 'Education', icon: GraduationCap, color: '#8B5CF6', pitch: 'Learning platforms, student portals and live classrooms.', kpis: [['Active learners', '8,940'], ['Completion', '78%'], ['Live classes', '126']], chart: [20, 34, 48, 52, 64, 70, 82], chartType: 'bar' },
  { id: 'retail', name: 'Retail', icon: ShoppingBag, color: '#F59E0B', pitch: 'Storefronts, POS and loyalty that share one customer view.', kpis: [['Orders today', '642'], ['AOV', '₹1,840'], ['Repeat rate', '34%']], chart: [44, 40, 52, 48, 66, 74, 70], chartType: 'bar' },
  { id: 'manufacturing', name: 'Manufacturing', icon: Factory, color: '#64748B', pitch: 'Production tracking, IoT telemetry and supplier portals.', kpis: [['OEE', '86%'], ['Units / hr', '412'], ['Downtime', '-18%']], chart: [60, 62, 58, 70, 72, 76, 80], chartType: 'line' },
  { id: 'construction', name: 'Construction', icon: HardHat, color: '#EA580C', pitch: 'Site progress, material tracking and contractor coordination.', kpis: [['Active sites', '14'], ['On schedule', '92%'], ['Material alerts', '3']], chart: [10, 22, 35, 48, 58, 71, 84], chartType: 'progress' },
  { id: 'finance', name: 'Finance', icon: LineChart, color: '#10B981', pitch: 'Fintech apps, lending workflows and secure onboarding.', kpis: [['KYC completed', '2,316'], ['Approval time', '4 hrs'], ['Fraud flags', '0.3%']], chart: [48, 52, 46, 60, 57, 68, 74], chartType: 'candle' },
  { id: 'realestate', name: 'Real Estate', icon: Building2, color: '#0EA5E9', pitch: 'Listings, virtual tours and CRM for brokers and builders.', kpis: [['Listings', '1,120'], ['Site visits', '286'], ['Bookings', '41']], chart: [26, 30, 44, 40, 56, 62, 69], chartType: 'bar' },
  { id: 'hospital', name: 'Hospital', icon: Hospital, color: '#06B6D4', pitch: 'Bed management, OPD queues and pharmacy inventory.', kpis: [['Bed occupancy', '81%'], ['OPD today', '412'], ['Discharges', '37']], chart: [70, 76, 72, 81, 78, 84, 81], chartType: 'line' },
  { id: 'travel', name: 'Travel', icon: Plane, color: '#6366F1', pitch: 'Booking engines, itinerary apps and dynamic pricing.', kpis: [['Bookings', '958'], ['Conversion', '5.4%'], ['Refund time', '24 hrs']], chart: [32, 45, 40, 58, 66, 61, 77], chartType: 'line' },
];

/* ── 8. Roadmap ──────────────────────────────────────────── */
export const roadmap = [
  { when: 'Day 1', title: 'Kick-off', body: 'Discovery workshop, goals, success metrics and a shared roadmap everyone signs off.', outcome: 'Clarity on what to build first' },
  { when: 'Week 2', title: 'Validated', body: 'Prototype tested with real users and a go / no-go decision backed by evidence.', outcome: 'Evidence of demand' },
  { when: 'Week 4', title: 'Company & brand', body: 'Entity registered, identity system ready and the business plan finalised.', outcome: 'A real, recognisable company' },
  { when: 'Week 8', title: 'MVP in hand', body: 'Core product live on staging with analytics, CRM and payments connected.', outcome: 'Something customers can use' },
  { when: 'Week 12', title: 'Public launch', body: 'Production launch, store listings and the first acquisition campaigns running.', outcome: 'First paying customers' },
  { when: 'Month 6', title: 'Growth loops', body: 'Automation, SEO and retention journeys compounding month over month.', outcome: 'Predictable growth' },
  { when: 'Month 12', title: 'Scale-ready', body: 'Hardened architecture, a security audit and a team plan for the next stage.', outcome: 'Ready for the next round' },
];

/* ── 9. Why Esland ───────────────────────────────────────── */
export const whyMetrics = [
  { value: 10, suffix: '+', label: 'Years building digital products' },
  { value: 500, suffix: '+', label: 'Projects delivered' },
  { value: 200, suffix: '+', label: 'Clients served' },
  { value: 99.9, suffix: '%', decimals: 1, label: 'Uptime on managed cloud' },
];

/* ── 10. FAQ ─────────────────────────────────────────────── */
export const faqCategories = ['All', 'Getting started', 'Pricing', 'Technology', 'Funding', 'Ownership'];

export const faqs = [
  { cat: 'Getting started', q: 'What exactly is Startup360?', a: 'Startup360 is a single programme that takes a founder from idea to a scaling company. Research, registration, branding, product engineering, AI, marketing, automation and funding support run under one team and one roadmap.' },
  { cat: 'Getting started', q: 'I only have an idea. Is that too early?', a: 'No. Most founders join at the idea stage. The first two weeks are designed to validate the idea with real users before you commit budget to building.' },
  { cat: 'Getting started', q: 'Can I join mid-way if I already have a product?', a: 'Yes. We audit what exists and plug in at the right stage, whether that is rebuilding the tech, launching marketing or setting up automation.' },
  { cat: 'Pricing', q: 'How is Startup360 priced?', a: 'You choose the stages you need. Each stage has a fixed scope and price agreed before work starts, and many founders begin with a short validation sprint.' },
  { cat: 'Pricing', q: 'Do you offer equity or deferred payment models?', a: 'For selected early-stage startups we discuss blended models. This is decided case by case after the discovery workshop.' },
  { cat: 'Technology', q: 'Which technologies do you build with?', a: 'Typically React, Next.js, Node.js, React Native or Flutter, PostgreSQL and AWS, Azure or GCP. We choose based on your product, not habit.' },
  { cat: 'Technology', q: 'How fast can you deliver an MVP?', a: 'A focused MVP usually reaches staging in 8 weeks and public launch around week 12, with releases you can review every two weeks.' },
  { cat: 'Technology', q: 'Can you add AI to my product?', a: 'Yes. We build assistants, retrieval over your own data, document extraction and recommendation features, with evaluation and guardrails included.' },
  { cat: 'Funding', q: 'Do you guarantee investment?', a: 'No one honestly can. We prepare your deck, financial model and data room, and introduce you to investors, accelerators and grant schemes that match your stage.' },
  { cat: 'Funding', q: 'Do you help with government startup schemes and grants?', a: 'Yes. We identify relevant schemes, prepare applications and supporting documents, and track deadlines for you.' },
  { cat: 'Ownership', q: 'Who owns the code and the brand?', a: 'You do. All source code, designs, domains and accounts are created in or transferred to your company.' },
  { cat: 'Ownership', q: 'What happens after launch?', a: 'You can keep us on for growth, automation and support, take everything in-house with a full handover, or anything in between.' },
];
