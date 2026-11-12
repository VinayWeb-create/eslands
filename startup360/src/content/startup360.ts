/**
 * Startup360 content — single source of truth.
 * Copy is derived from the live onebridgeinfotech.com/startup360 page.
 * Sections import from here; SEO schema (FAQ, Breadcrumb) is generated from it too.
 */
import type { LucideIcon } from 'lucide-react';
import {
  Lightbulb,
  Search,
  BadgeCheck,
  FileText,
  Landmark,
  Coins,
  Palette,
  Code2,
  Rocket,
  Megaphone,
  Workflow,
  TrendingUp,
  Cloud,
  BrainCircuit,
  Users,
  ShieldCheck,
  Contact,
  BarChart3,
  Globe,
  Smartphone,
  Server,
  Boxes,
  Briefcase,
  MessageCircle,
  IndianRupee,
  Database,
} from 'lucide-react';

export type Accent = 'brand' | 'violet' | 'teal';

/* ── Hero ─────────────────────────────────────────────── */
export const hero = {
  eyebrow: 'Startup360 · by Onebridge Infotech',
  title: ['Your idea.', 'Our entire ecosystem.'],
  description:
    'Startup360 is one coordinated team for founders across Hyderabad and India — strategy, registration support, funding readiness, brand, product engineering, AI, marketing and automation, moving in one rhythm from idea to scale.',
  orbit: ['Idea', 'Strategy', 'Design', 'Full-Stack', 'Mobile', 'Launch', 'Marketing', 'Automation', 'Cloud', 'Scale'],
  proof: [
    { value: '1', label: 'team, strategy → scale' },
    { value: '16+', label: 'connected capabilities' },
    { value: '4–12', label: 'weeks for a focused MVP' },
  ],
} as const;

/* ── Startup journey (scroll-driven) ──────────────────── */
export interface JourneyStage {
  id: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  outputs: string[];
}

export const journey: JourneyStage[] = [
  { id: 'idea', title: 'Idea', icon: Lightbulb, summary: 'Clarify the problem, audience and value proposition so the opportunity is concrete — not just a concept.', outputs: ['Problem statement', 'Ideal customer profile', 'Value proposition canvas'] },
  { id: 'research', title: 'Research', icon: Search, summary: 'Market sizing, competitor scans and founder interviews map the terrain before money is spent.', outputs: ['Competitor map', 'Market sizing', 'Customer interviews'] },
  { id: 'validation', title: 'Validation', icon: BadgeCheck, summary: 'Test demand with landing pages, waitlists and early conversations before heavy build spend.', outputs: ['Smoke-test landing page', 'Waitlist funnel', 'Demand signals report'] },
  { id: 'plan', title: 'Business Plan', icon: FileText, summary: 'Define the model, pricing, go-to-market approach and a roadmap founders can actually execute.', outputs: ['Business model', 'Pricing strategy', 'GTM roadmap'] },
  { id: 'registration', title: 'Registration', icon: Landmark, summary: 'Coordinated setup for Pvt Ltd, LLP, GST and MSME/Udyam — licensed CA/legal professionals complete statutory filings.', outputs: ['Entity setup coordination', 'GST & Udyam support', 'DPIIT guidance'] },
  { id: 'funding', title: 'Funding', icon: Coins, summary: 'Projections, pitch narrative and documentation so you can approach capital responsibly. No funding is guaranteed.', outputs: ['Pitch deck', '5-year projections', 'Data-room checklist'] },
  { id: 'brand', title: 'Brand', icon: Palette, summary: 'Identity, messaging and a visual system that makes the startup recognisable to customers and investors.', outputs: ['Logo & identity', 'Voice & messaging', 'Design tokens'] },
  { id: 'technology', title: 'Technology', icon: Code2, summary: 'MVP, SaaS, web and mobile apps, APIs and AI features on cloud foundations that scale without rewrites.', outputs: ['MVP architecture', 'Web & mobile apps', 'Cloud + CI/CD'] },
  { id: 'launch', title: 'Launch', icon: Rocket, summary: 'Ship a stable first release with hosting, analytics, support workflows and a clear launch checklist.', outputs: ['Production release', 'Analytics & tracking', 'Launch playbook'] },
  { id: 'marketing', title: 'Marketing', icon: Megaphone, summary: 'SEO, GEO/AEO, content, Google & Meta ads, email and WhatsApp — aligned to the offer and budget.', outputs: ['SEO foundation', 'Paid funnels', 'Content engine'] },
  { id: 'automation', title: 'Automation', icon: Workflow, summary: 'CRM, sales and marketing automation plus AI workflows so the team stops doing repetitive work by hand.', outputs: ['CRM pipelines', 'WhatsApp flows', 'AI agents'] },
  { id: 'scale', title: 'Scale', icon: TrendingUp, summary: 'Harden architecture, add talent, sharpen analytics and growth systems as product and revenue expand.', outputs: ['Auto-scaling infra', 'Engineering pods', 'BI dashboards'] },
];

/* ── Operating system (hub & spokes) ─────────────────── */
export interface OsModule {
  id: string;
  label: string;
  icon: LucideIcon;
  detail: string;
  accent: Accent;
}

export const osModules: OsModule[] = [
  { id: 'technology', label: 'Technology', icon: Code2, detail: 'Full-stack web, SaaS and mobile engineering on Next.js, Node and React Native.', accent: 'violet' },
  { id: 'cloud', label: 'Cloud', icon: Cloud, detail: 'AWS / Azure foundations, IaC and auto-scaling built for 99.99% reliability targets.', accent: 'teal' },
  { id: 'ai', label: 'AI', icon: BrainCircuit, detail: 'Agents, RAG search and support bots wired into your real workflows.', accent: 'brand' },
  { id: 'branding', label: 'Branding', icon: Palette, detail: 'Identity, design systems and pitch-ready product surfaces.', accent: 'violet' },
  { id: 'marketing', label: 'Marketing', icon: Megaphone, detail: 'SEO, GEO/AEO, Google & Meta funnels and content that compounds.', accent: 'brand' },
  { id: 'hiring', label: 'Hiring', icon: Users, detail: 'Pre-vetted engineering pods and technical recruitment on demand.', accent: 'teal' },
  { id: 'security', label: 'Security', icon: ShieldCheck, detail: 'Zero-trust posture, backups, monitoring and SOC2 readiness.', accent: 'violet' },
  { id: 'funding', label: 'Funding', icon: Coins, detail: 'Pitch decks, financial models and investor-readiness coaching.', accent: 'brand' },
  { id: 'crm', label: 'CRM', icon: Contact, detail: 'One customer hub — leads, pipelines, quotes and follow-ups in sync.', accent: 'teal' },
  { id: 'automation', label: 'Automation', icon: Workflow, detail: 'WhatsApp, email and workflow automation that saves 20+ hrs a week.', accent: 'violet' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, detail: 'Real-time telemetry and executive dashboards from day one.', accent: 'brand' },
];

/* ── Agencies vs Startup360 ──────────────────────────── */
export const fragmentedVendors = [
  'Website agency',
  'Marketing agency',
  'Freelance designer',
  'CRM vendor',
  'Security firm',
  'Cloud partner',
  'Recruiter',
  'AI consultant',
] as const;

export const comparison = [
  { pillar: 'Partner model', traditional: '4–7 disconnected vendors — web agency, SEO firm, freelance designer, dev shop.', startup360: 'One technology & growth partner managing the whole lifecycle end-to-end.' },
  { pillar: 'Accountability', traditional: 'Designer blames developer, marketer blames site speed when leads don’t convert.', startup360: 'A single point of accountability for design, code, uptime and outcomes.' },
  { pillar: 'Time-to-market', traditional: '6–12 months of handover delays, miscommunication and rework.', startup360: '3–8 weeks using reusable component systems, agile sprints and CI/CD.' },
  { pillar: 'Cost', traditional: 'Duplicate retainers, stacked management margins and hidden maintenance fees.', startup360: 'Bundled multidisciplinary capability that removes vendor fragmentation.' },
  { pillar: 'Architecture', traditional: 'Template shortcuts that need costly rewrites at 10,000 users.', startup360: 'Cloud-ready architecture designed from day one to grow with usage.' },
  { pillar: 'AI & automation', traditional: 'Manual handoffs and static websites that need constant upkeep.', startup360: 'Built-in AI agents, WhatsApp automation and intelligent workflows.' },
  { pillar: 'After launch', traditional: 'Deliver and disappear — hourly rate spikes for every tweak.', startup360: 'Long-term partnership with ongoing growth support and telemetry.' },
] as const;

/* ── Services (3D panels) ────────────────────────────── */
export interface Service {
  id: string;
  name: string;
  icon: LucideIcon;
  tagline: string;
  features: string[];
  benefits: string[];
  stack: string[];
  pattern: { problem: string; solution: string; result: string };
}

export const services: Service[] = [
  { id: 'web', name: 'Web', icon: Globe, tagline: 'High-converting full-stack web platforms and SaaS.', features: ['Marketing sites & landing pages', 'SaaS dashboards', 'Headless commerce', 'CRM-connected lead capture'], benefits: ['Sub-second loads', 'SEO-ready structure', 'Analytics wired in'], stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'PostgreSQL'], pattern: { problem: 'A founder had a brochure site that generated no enquiries.', solution: 'Rebuilt as a fast, SEO-structured site with forms synced to CRM and WhatsApp.', result: 'Every visitor action now lands in a tracked pipeline.' } },
  { id: 'mobile', name: 'Mobile', icon: Smartphone, tagline: 'iOS, Android and cross-platform apps users keep.', features: ['React Native & Flutter apps', 'Offline-first sync', 'Push & in-app messaging', 'Store release management'], benefits: ['One codebase, two stores', 'Native performance', 'Faster iteration'], stack: ['React Native', 'Flutter', 'Expo', 'Firebase', 'GraphQL'], pattern: { problem: 'Customers wanted to order and track on their phones.', solution: 'Cross-platform app sharing APIs with the web product.', result: 'One backlog, one team, two app stores.' } },
  { id: 'ai', name: 'AI', icon: BrainCircuit, tagline: 'Agents, RAG and AI features grounded in real workflows.', features: ['AI support agents', 'RAG knowledge search', 'Document extraction', 'Predictive insights'], benefits: ['24/7 response', 'Lower support load', 'Smarter decisions'], stack: ['LLM APIs', 'LangChain', 'Vector DBs', 'Python', 'Node.js'], pattern: { problem: 'Support team buried in repeated product questions.', solution: 'RAG-powered assistant on the website and WhatsApp with human handoff.', result: 'Routine questions answered instantly, humans focus on edge cases.' } },
  { id: 'cloud', name: 'Cloud', icon: Cloud, tagline: 'Cost-aware AWS & Azure foundations that scale.', features: ['Cloud architecture', 'Migration', 'Auto-scaling', 'Cost optimisation'], benefits: ['High availability', 'Predictable spend', 'No rewrite at scale'], stack: ['AWS', 'Azure', 'Terraform', 'CloudFront', 'RDS'], pattern: { problem: 'Flash sales crashed a shared-hosting store.', solution: 'Moved to auto-scaling AWS (Mumbai) with CDN and managed DB.', result: 'Built to absorb traffic spikes without downtime.' } },
  { id: 'devops', name: 'DevOps', icon: Server, tagline: 'Release pipelines and infrastructure as code.', features: ['CI/CD pipelines', 'Containerisation', 'Observability', 'Preview environments'], benefits: ['Ship daily', 'Fewer regressions', 'Fast rollbacks'], stack: ['GitHub Actions', 'Docker', 'Kubernetes', 'Terraform', 'Grafana'], pattern: { problem: 'Manual FTP deploys broke production weekly.', solution: 'Automated tests, preview builds and one-click rollbacks.', result: 'Feedback to deployed feature in days, not weeks.' } },
  { id: 'automation', name: 'Automation', icon: Workflow, tagline: 'Workflows that remove repetitive work.', features: ['Lead routing', 'Email & WhatsApp sequences', 'Approval workflows', 'Report generation'], benefits: ['20+ hrs/week saved', 'Faster response', 'Fewer errors'], stack: ['n8n', 'Zapier', 'Meta Cloud API', 'Webhooks', 'Node.js'], pattern: { problem: 'Sales team copied web leads into spreadsheets by hand.', solution: 'Webform → CRM record → assignment → welcome email, automatically.', result: 'Every lead contacted the same day.' } },
  { id: 'crm', name: 'CRM', icon: Contact, tagline: 'A single customer hub for sales and service.', features: ['Pipeline setup', 'Quotes & invoices', 'Lead scoring', 'WhatsApp inbox sync'], benefits: ['No lost leads', 'Visible pipeline', 'Faster closes'], stack: ['HubSpot', 'Zoho', 'Custom CRM', 'REST APIs', 'Postgres'], pattern: { problem: 'Leads scattered across inboxes, phones and sheets.', solution: 'Centralised CRM fed by web, ads and WhatsApp.', result: 'One live view of every customer conversation.' } },
  { id: 'erp', name: 'ERP', icon: Database, tagline: 'Operations, inventory and finance connected.', features: ['Inventory & orders', 'HRMS & attendance', 'Accounting sync', 'Executive dashboards'], benefits: ['Single source of truth', 'Real-time stock', 'Automated reporting'], stack: ['ERPNext', 'Odoo', 'Tally sync', 'Power BI', 'APIs'], pattern: { problem: 'Multi-outlet retailer reconciling stock manually.', solution: 'ERP with POS sync and automated daily reports.', result: 'Live inventory across every outlet.' } },
  { id: 'security', name: 'Cyber Security', icon: ShieldCheck, tagline: 'Protection proportional to startup risk.', features: ['Security audits', 'Role-based access', 'Encrypted backups', '24/7 monitoring'], benefits: ['Customer trust', 'Compliance readiness', 'Fewer incidents'], stack: ['Zero-trust', 'WAF', 'SIEM', 'OWASP', 'SOC2 prep'], pattern: { problem: 'Enterprise prospect asked for a security questionnaire.', solution: 'Hardened access, backups and monitoring, documented for SOC2 readiness.', result: 'Security answers ready for enterprise deals.' } },
  { id: 'marketing', name: 'Marketing', icon: Megaphone, tagline: 'Search, social and owned channels that compound.', features: ['SEO, GEO & AEO', 'Google & Meta ads', 'LinkedIn & content', 'Email & WhatsApp'], benefits: ['Consistent pipeline', 'Lower CAC over time', 'Measurable ROI'], stack: ['GA4', 'Search Console', 'Meta Ads', 'Google Ads', 'HubSpot'], pattern: { problem: 'Local business relying on walk-ins only.', solution: 'Local SEO, Google & Meta funnels connected to CRM.', result: 'A predictable, measured flow of qualified leads.' } },
  { id: 'branding', name: 'Branding', icon: Palette, tagline: 'Identity that earns trust at first glance.', features: ['Logo & identity', 'Brand guidelines', 'Pitch deck design', 'Product UI/UX'], benefits: ['Instant credibility', 'Consistent voice', 'Investor-ready'], stack: ['Figma', 'Design tokens', 'Motion', 'Illustrator'], pattern: { problem: 'Startup looked different on every channel.', solution: 'Identity system with tokens shared by web, app and deck.', result: 'One recognisable brand everywhere.' } },
  { id: 'staffing', name: 'Staffing', icon: Users, tagline: 'Dedicated engineering and growth pods.', features: ['Developer hiring', 'AI & DevOps talent', 'Team augmentation', 'Training & internships'], benefits: ['Scale on demand', 'Zero HR overhead', 'Time-zone overlap'], stack: ['Vetted engineers', 'Agile sprints', 'PM support'], pattern: { problem: 'Product roadmap outpaced the founding team.', solution: 'Dedicated pod of vetted engineers and a PM.', result: 'Velocity scaled without a hiring spree.' } },
  { id: 'funding', name: 'Funding', icon: IndianRupee, tagline: 'Investor readiness — without overclaiming.', features: ['Pitch deck & narrative', 'Financial projections', 'Government scheme research', 'Data-room preparation'], benefits: ['Sharper story', 'Credible numbers', 'Faster diligence'], stack: ['Deck systems', 'Model templates', 'Cap table'], pattern: { problem: 'Founder needed funding readiness without hype.', solution: 'Pitch narrative, projections support and documentation coordination.', result: 'A readiness checklist and iteratively refined pitch. Funding is never guaranteed.' } },
  { id: 'consulting', name: 'Business Consulting', icon: Briefcase, tagline: 'Strategy before and during the build.', features: ['Idea validation', 'Business model', 'Go-to-market', 'Growth strategy'], benefits: ['Less wasted build', 'Clear priorities', 'Aligned team'], stack: ['Workshops', 'Market research', 'Roadmapping'], pattern: { problem: 'Idea without technical or GTM clarity.', solution: 'Validation workshops, business planning and MVP scoping.', result: 'Discovery → blueprint → build → measure.' } },
];

/* ── Growth engine ───────────────────────────────────── */
export const growthEngine = [
  { id: 'website', label: 'Website', icon: Globe, stat: 'Visitors' },
  { id: 'crm', label: 'CRM', icon: Contact, stat: 'Leads' },
  { id: 'marketing', label: 'Marketing', icon: Megaphone, stat: 'Nurture' },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, stat: 'Conversations' },
  { id: 'ai', label: 'AI', icon: BrainCircuit, stat: 'Qualified' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, stat: 'Insights' },
  { id: 'revenue', label: 'Revenue', icon: TrendingUp, stat: 'Growth' },
] as const;

/* ── Industries ──────────────────────────────────────── */
export type IndustryId =
  | 'healthcare'
  | 'education'
  | 'retail'
  | 'manufacturing'
  | 'construction'
  | 'finance'
  | 'realestate'
  | 'hospital'
  | 'travel';

export interface Industry {
  id: IndustryId;
  name: string;
  headline: string;
  solutions: string[];
  kpis: { label: string; value: string }[];
  series: number[];
}

export const industries: Industry[] = [
  { id: 'healthcare', name: 'Healthcare', headline: 'Patient portals, doctor scheduling and telehealth apps with compliance built in.', solutions: ['Telehealth', 'Appointment engine', 'Patient app'], kpis: [{ label: 'Appointments', value: '1,284' }, { label: 'No-show rate', value: '4.1%' }, { label: 'Avg. wait', value: '6 min' }], series: [32, 40, 38, 52, 49, 61, 70, 66, 78] },
  { id: 'education', name: 'Education', headline: 'Learning platforms, gamified quizzes and student portals that keep learners engaged.', solutions: ['LMS', 'Live classes', 'Student portal'], kpis: [{ label: 'Active learners', value: '8,420' }, { label: 'Completion', value: '73%' }, { label: 'Quiz streak', value: '12 d' }], series: [20, 28, 35, 33, 45, 52, 58, 64, 71] },
  { id: 'retail', name: 'Retail', headline: 'Omnichannel stores, POS sync, real-time inventory and loyalty programmes.', solutions: ['Headless store', 'POS sync', 'Loyalty'], kpis: [{ label: 'Orders today', value: '642' }, { label: 'Basket size', value: '₹1,920' }, { label: 'Repeat rate', value: '38%' }], series: [44, 39, 51, 58, 55, 67, 74, 70, 86] },
  { id: 'manufacturing', name: 'Manufacturing', headline: 'Vendor portals, supply-chain visibility, IoT telemetry and quotation bots.', solutions: ['Supplier portal', 'IoT telemetry', 'Quote bot'], kpis: [{ label: 'OEE', value: '84%' }, { label: 'Open POs', value: '57' }, { label: 'Downtime', value: '-22%' }], series: [60, 62, 58, 65, 70, 68, 74, 79, 82] },
  { id: 'construction', name: 'Construction', headline: 'Site progress tracking, material planning and contractor coordination in one place.', solutions: ['Site tracker', 'BOQ planner', 'Contractor app'], kpis: [{ label: 'Sites live', value: '14' }, { label: 'On schedule', value: '91%' }, { label: 'Material waste', value: '-17%' }], series: [10, 18, 27, 33, 41, 50, 58, 69, 77] },
  { id: 'finance', name: 'Finance', headline: 'Secure payment gateways, wealth dashboards and lending workflows.', solutions: ['Payments', 'Wealth dashboard', 'Loan workflow'], kpis: [{ label: 'Txn volume', value: '₹2.4 Cr' }, { label: 'Approval time', value: '18 min' }, { label: 'Fraud flags', value: '0.03%' }], series: [50, 47, 55, 53, 62, 60, 68, 73, 79] },
  { id: 'realestate', name: 'Real Estate', headline: 'Interactive listing portals, virtual tours and CRM lead capture.', solutions: ['Listing portal', 'Virtual tours', 'Lead CRM'], kpis: [{ label: 'Site visits', value: '326' }, { label: 'Leads', value: '1,140' }, { label: 'Units booked', value: '42' }], series: [25, 30, 29, 41, 46, 44, 57, 63, 69] },
  { id: 'hospital', name: 'Hospital', headline: 'Hospital operations — bed management, pharmacy, billing and staff rosters.', solutions: ['Bed management', 'Pharmacy', 'Billing'], kpis: [{ label: 'Bed occupancy', value: '82%' }, { label: 'Discharges', value: '37' }, { label: 'Billing TAT', value: '9 min' }], series: [70, 74, 72, 78, 81, 79, 83, 80, 82] },
  { id: 'travel', name: 'Travel', headline: 'Direct booking engines, availability calendars and WhatsApp concierge bots.', solutions: ['Booking engine', 'Availability', 'Concierge bot'], kpis: [{ label: 'Direct bookings', value: '+46%' }, { label: 'Occupancy', value: '88%' }, { label: 'Bot replies', value: '2.1k' }], series: [30, 42, 39, 55, 61, 58, 72, 80, 84] },
];

/* ── Success roadmap (growth partnership stages) ────── */
export interface Milestone {
  id: string;
  title: string;
  quote: string;
  deliverables: string[];
  outcome: string;
}

export const roadmap: Milestone[] = [
  { id: 'start', title: 'Start your digital journey', quote: 'I have a business, but no professional online presence.', deliverables: ['Business consultation', 'Digital roadmap', 'Domain & hosting guidance', 'Technology planning'], outcome: 'A clear 4-week launch plan with a senior consultant assigned.' },
  { id: 'presence', title: 'Build your digital presence', quote: 'Customers can’t easily find or trust us online.', deliverables: ['Website & mobile app', 'UI/UX design', 'Branding', 'SEO-ready structure'], outcome: 'A professional identity that builds credibility.' },
  { id: 'connect', title: 'Connect with customers', quote: 'I have a website, but I’m not getting enquiries.', deliverables: ['Contact & booking forms', 'WhatsApp integration', 'Live chat', 'CRM setup'], outcome: 'Visitors turn into qualified leads.' },
  { id: 'leads', title: 'Generate leads', quote: 'I need more customers.', deliverables: ['SEO & local SEO', 'Google Ads', 'Meta Ads', 'Content marketing'], outcome: 'Consistent lead generation and visibility.' },
  { id: 'automate', title: 'Automate your business', quote: 'My team spends too much time on repetitive work.', deliverables: ['CRM automation', 'Email & WhatsApp automation', 'AI chatbots', 'Workflow automation'], outcome: 'Hours saved every week, faster responses.' },
  { id: 'unify', title: 'Manage everything in one place', quote: 'Our data is scattered across different tools.', deliverables: ['CRM & ERP', 'HRMS', 'Inventory', 'Executive dashboards'], outcome: 'Complete control of operations.' },
  { id: 'secure', title: 'Secure your business', quote: 'Customer data and systems need protection.', deliverables: ['SSL hardening', 'Cloud security', 'Daily backups', 'Monitoring'], outcome: 'Reliable, trusted infrastructure.' },
  { id: 'scale', title: 'Scale without limits', quote: 'We’re growing, but our systems aren’t.', deliverables: ['Cloud migration', 'Performance tuning', 'Load balancing', 'Enterprise architecture'], outcome: 'A platform ready for thousands of users.' },
  { id: 'ai', title: 'Grow smarter with AI', quote: 'I want the business to work smarter, not harder.', deliverables: ['AI agents', 'AI support', 'AI analytics', 'Predictive insights'], outcome: 'Higher productivity, sharper decisions.' },
  { id: 'partner', title: 'Long-term growth partner', quote: 'I need a reliable tech partner as we evolve.', deliverables: ['Dedicated support', 'Quarterly feature rollouts', 'Monthly strategy syncs', 'Priority support'], outcome: 'A partnership that grows with you.' },
];

/* ── Why Onebridge (bento) ───────────────────────────── */
export const whyMetrics = [
  { value: 2017, suffix: '', label: 'Building technology since', format: 'plain' as const },
  { value: 16, suffix: '+', label: 'Capabilities under one roof', format: 'plain' as const },
  { value: 12, suffix: '', label: 'Lifecycle stages covered', format: 'plain' as const },
  { value: 2, suffix: ' hr', label: 'WhatsApp response target', format: 'plain' as const },
];

export const trustBadges = ['ISO 27001 Certified', 'AWS Partner', 'Microsoft Partner', 'Google Cloud Partner', 'Mutual NDA'] as const;

export const cities = ['Hyderabad', 'Bengaluru', 'Chennai', 'Pune', 'Mumbai', 'Delhi NCR', 'Gurugram', 'Noida', 'Ahmedabad', 'Jaipur', 'Kochi', 'Kolkata', 'Chandigarh', 'Indore', 'Coimbatore', 'Visakhapatnam', 'Vijayawada', 'Lucknow', 'Surat', 'Nagpur'] as const;

/* ── FAQ ─────────────────────────────────────────────── */
export const faqCategories = ['All', 'Getting started', 'Registration & funding', 'Technology', 'Growth', 'Working together'] as const;
export type FaqCategory = Exclude<(typeof faqCategories)[number], 'All'>;

export interface Faq {
  q: string;
  a: string;
  category: FaqCategory;
}

export const faqs: Faq[] = [
  { category: 'Getting started', q: 'What is Startup 360?', a: 'Startup 360 is Onebridge Infotech’s coordinated startup-support ecosystem. It connects strategy, business-setup assistance, funding readiness, technology, branding, marketing, talent and automation so founders move from idea to launch and scale with fewer fragmented vendors. It is a commercial service, not a government programme.' },
  { category: 'Getting started', q: 'What startup services does Onebridge Infotech provide in Hyderabad?', a: 'Strategy and consulting, business-setup assistance, funding readiness, government-scheme research, branding, MVP and technology development, AI, cloud, DevOps, cybersecurity, digital marketing, staffing and growth automation — tailored to your stage, in person or remote.' },
  { category: 'Getting started', q: 'How can I start a startup in Hyderabad?', a: 'Validate the problem and market, draft a business model and plan, register the company with qualified professionals, scope an MVP, build brand and digital presence, then launch with measurement and customer acquisition. Startup 360 helps you sequence and connect these steps.' },
  { category: 'Registration & funding', q: 'Can Onebridge help with startup registration?', a: 'Yes — we coordinate and prepare documentation for Private Limited, LLP, GST and MSME/Udyam pathways. Filings and regulated advice are handled by licensed CA/legal professionals. We are not a registrar or statutory authority.' },
  { category: 'Registration & funding', q: 'Can Onebridge help startups with funding?', a: 'We support funding readiness: business-plan and projection assistance, pitch decks, investor-readiness coaching and research into government or debt options. We do not guarantee funding, investment or loan approvals.' },
  { category: 'Registration & funding', q: 'What is DPIIT startup recognition?', a: 'A Government of India framework recognising eligible entities as startups, which can unlock certain benefits subject to official rules. Onebridge guides documentation and readiness; decisions are made by the competent authority.' },
  { category: 'Registration & funding', q: 'What startup funding options are available in Telangana?', a: 'Founders commonly explore angel and VC capital, incubators and accelerators, bank or NBFC debt, and central/state scheme pathways. Onebridge researches options and prepares documentation; approvals rest with the respective programmes and financiers.' },
  { category: 'Technology', q: 'How much does it cost to develop a startup MVP?', a: 'It depends on scope, platforms, integrations, AI features, design depth and compliance needs. After a scoping call we provide an estimate aligned to your requirements rather than a one-size price.' },
  { category: 'Technology', q: 'How long does it take to build an MVP?', a: 'Many focused MVPs land in roughly 4–12 weeks once scope is clear; multi-platform or AI-heavy builds can take longer. Up-front discovery matters as much as coding speed.' },
  { category: 'Technology', q: 'Can Onebridge build an AI startup MVP?', a: 'Yes. We combine product engineering with generative AI features, AI agents, RAG applications, APIs and automation — on solid foundations like authentication, data models and cloud deployment. Scope follows real user workflows, not AI for its own sake.' },
  { category: 'Technology', q: 'Does Onebridge provide startup technology consulting?', a: 'Yes — architecture choices, MVP scope, cloud/DevOps posture, security basics, AI feasibility and build-vs-buy decisions, matched to commercial priorities and delivery capacity.' },
  { category: 'Growth', q: 'Does Onebridge provide startup digital marketing?', a: 'Yes: SEO, local SEO, GEO/AEO content structure, Google and Meta ads, LinkedIn, content, email and WhatsApp marketing — connected to your website, landing pages and CRM, paced to stage and budget.' },
  { category: 'Growth', q: 'Can Onebridge help automate startup operations?', a: 'Yes — CRM setup, marketing and sales automation, WhatsApp/email workflows, AI-assisted support, analytics and process optimisation, so teams spend less time on repetitive tasks.' },
  { category: 'Working together', q: 'Can Onebridge support startups outside Hyderabad?', a: 'Yes. We are based in Hyderabad and work with founders across Telangana and India, in person and/or remotely. We don’t claim local offices in every city; collaboration models are agreed per project.' },
  { category: 'Working together', q: 'How can I get a startup consultation?', a: 'Call or WhatsApp +91 939835 5196, or email info@onebridgeinfotech.com. Share your stage, goals and requirements and the team will schedule a discovery conversation.' },
];
