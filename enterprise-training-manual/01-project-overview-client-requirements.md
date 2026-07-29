# Document 01: Project Overview & Client Requirements

## The Client Brief

> "I need a MERN Stack Company Website with an Admin Panel."
> — Client, Esland IT Solutions

This document covers how a professional software company handles the project from initial client conversation to final requirements document.

## 1.1 Project Overview

| Detail | Value |
|--------|-------|
| Project Name | Esland IT Solutions Corporate Website |
| Codename | eslands |
| Client | Esland IT Solutions |
| Repository | github.com/VinayWeb-create/eslands |
| Industry | IT Services (web dev, mobile, digital marketing, cloud, AI/ML, cybersecurity) |

## 1.2 Client Requirements

The client approached the company with these requirements:

### Functional Requirements
1. **Home Page** — Hero section, services overview, why choose us, stats, testimonials, CTA
2. **About Page** — Company information, team, mission
3. **Services Page** — Detailed service listings with individual service views
4. **Careers Page** — Job postings fetched from API
5. **Contact Form** — Name, email, phone, service selection, subject, message → auto-creates CRM leads
6. **Admin Panel (CRM)** — Login, dashboard, lead management, quote generation, pipeline tracking
7. **Newsletter Subscription** — Email subscription form

### Non-Functional Requirements
1. **SEO** — Meta tags, semantic HTML, Open Graph
2. **Mobile Responsive** — All pages work on mobile
3. **Performance** — Lazy loading, code splitting
4. **Security** — JWT auth, rate limiting, CORS, Helmet
5. **Animations** — Page transitions, scroll animations

## 1.3 Technology Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React 18 + Vite | Fast builds, component model |
| Styling | Tailwind CSS v4 | Rapid UI development |
| Animations | Framer Motion | Declarative animations |
| Routing | React Router v6 | Client-side routing |
| HTTP | Axios | Interceptors, error handling |
| Backend | Express.js | Lightweight, flexible |
| Database | MongoDB + Mongoose | Flexible schema for CRM |
| Auth | JWT + bcryptjs | Stateless auth |
| Hosting | Vercel (client) + Render (server) | Free tier, auto-deploy |
| Database Host | MongoDB Atlas | Managed, free tier |
| Version Control | Git + GitHub | Team collaboration |

## 1.4 Team Structure

| Role | Responsibility | Our Project |
|------|---------------|-------------|
| Client | Gives requirements, UAT | Esland IT Solutions stakeholders |
| Project Manager | Creates project plan, manages sprints | Assigns tasks, tracks progress |
| UI/UX Designer | Creates Figma designs | Designs hero, services, CRM dashboard |
| Frontend Developer | React development | Components, pages, CRM UI |
| Backend Developer | Node.js APIs | Express routes, controllers, models |
| QA Engineer | Tests features | Manual + automated testing |
| DevOps Engineer | Deployment | Vercel, Render, CI/CD setup |

## 1.5 SRS Document Summary

### Module 1: Public Website
| Feature | Description | Priority |
|---------|-------------|----------|
| Home Page | Hero, services grid, stats, testimonials, CTA | High |
| About Page | Company info | Medium |
| Services Page | Service list + detail view with ?service= param | High |
| Careers Page | Job listings from API | Medium |
| Contact Form | Multi-field form with service dropdown | High |
| Newsletter | Email subscription | Low |

### Module 2: Admin Panel (CRM)
| Feature | Description | Priority |
|---------|-------------|----------|
| Admin Login | JWT authentication | High |
| Dashboard | Stats cards, pipeline, recent activity | High |
| Lead Management | CRUD, search, filter, pagination, notes | High |
| Lead Pipeline | Status tracking (new→contacted→qualified→proposal→negotiation→won/lost) | High |
| Quote Generation | Line items, auto-totals, tax, quote numbers | High |
| Quote Management | Status tracking (draft→sent→viewed→accepted/rejected) | Medium |

### Module 3: Cross-Cutting
| Feature | Description | Priority |
|---------|-------------|----------|
| SEO | Meta tags, semantic HTML, Open Graph | High |
| Mobile Responsive | All pages responsive | High |
| Animations | Page transitions, scroll effects | Medium |
| Security | JWT, CORS, Helmet, rate limiting | High |
| Error Handling | Graceful degradation, toast notifications | Medium |

## 1.6 What the Final Product Looks Like

### Public Website Routes
```
/           → Home (Hero, Services, Why Choose Us, Stats, Testimonials, CTA)
/services   → Service list + detail (?service= query param)
/products   → Product showcase
/about      → About page
/careers    → Job listings (API)
/contact    → Contact form (creates CRM leads)
```

### CRM Routes (hidden at /admin-panel-xyz/*)
```
/admin-panel-xyz/login              → Login page
/admin-panel-xyz                    → Dashboard
/admin-panel-xyz/leads              → Leads list
/admin-panel-xyz/leads/:id          → Lead detail
/admin-panel-xyz/quotes             → Quotes list
/admin-panel-xyz/quotes/:id         → Quote detail
/admin-panel-xyz/quotes/new/:leadId → Create quote
```

## 1.7 Data Flow: Contact Form → CRM Pipeline

This is the key business flow connecting the public website to the admin panel:

```
1. Visitor fills contact form at /contact
2. POST /api/contact → Server validates
3. Contact document saved to MongoDB
4. System checks for existing Lead (same email)
5. If new: Lead created (source='contact-form')
6. Admin logs into CRM → Sees new lead
7. Admin moves lead through pipeline
8. Admin creates quote → Sends to client
9. Client accepts → Deal won
10. Dashboard updates: revenue, conversion rate
```

## 1.8 Sprint Overview

| Sprint | Features | Files |
|--------|----------|-------|
| Sprint 1 | Home, About, Services, Contact, Admin Login | ~15 files |
| Sprint 2 | CRM Dashboard, Leads CRUD, Lead Pipeline | ~10 files |
| Sprint 3 | Quotes, Quote Generation, Dashboard Stats | ~8 files |
| Sprint 4 | Deployment, Bug Fixes, Mobile Fixes | Config files |
| Sprint 5 | Final QA, Client UAT, Production Launch | Git merges |

## 1.9 Success Criteria

- [ ] All pages render correctly on desktop and mobile
- [ ] Contact form submits and auto-creates CRM leads
- [ ] CRM login works with JWT
- [ ] Leads can be created, edited, searched, filtered
- [ ] Quotes can be generated with auto-totals
- [ ] Dashboard shows accurate statistics
- [ ] SEO meta tags present on all pages
- [ ] Deployed to Vercel (client) and Render (server)
- [ ] Client approves in UAT
