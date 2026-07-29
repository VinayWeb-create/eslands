# Document 03: Sprint Planning & Task Breakdown

## Project Manager Creates Tasks

After the client approves requirements and the repository is set up, the Project Manager breaks the work into sprints.

For the **Esland IT Solutions Corporate Website** project, the work is divided into 5 sprints over 7 weeks. Each sprint delivers working, reviewable software. The branch strategy is `feature/* → dev → qa → wa → uat → prod`.

---

## 3.1 Sprint 1 — Foundation (Week 1–2)

Sprint 1 delivers the public-facing pages and the entry point to the admin panel. This is the highest-risk sprint because it establishes every convention the team will follow: folder structure, component patterns, routing, API contract, and deployment pipeline.

### Task Board

| Task ID | Task | Assigned To | Branch | Priority |
|---------|------|-------------|--------|----------|
| SP1-001 | Home Page | Frontend Dev | `feature/home-page` | High |
| SP1-002 | About Page | Frontend Dev | `feature/about-page` | Medium |
| SP1-003 | Services Page | Frontend Dev | `feature/services-page` | High |
| SP1-004 | Contact Form + API | Full-stack Dev | `feature/contact-form` | High |
| SP1-005 | Admin Login | Full-stack Dev | `feature/admin-login` | High |
| SP1-006 | Project Setup & Config | DevOps | `chore/project-setup` | High |

### What Gets Built in Sprint 1

**Home Page (`feature/home-page`):**

The home page is built from six discrete components under `client/src/components/home/`. Each component is independently reviewable and deployable.

- **Hero.jsx / Hero.tsx** — Full-width banner with service cards. Mobile-specific gradients, reduced glow blobs, brighter images on small screens. Uses `framer-motion` for entrance animations.
- **ServicesGrid.jsx** — 3-column responsive grid of service cards with hover scale effect via `motion.div`.
- **WhyChooseUs.jsx** — Value proposition section highlighting the company's differentiators.
- **Stats.jsx** — Animated number counters using `useScrollAnimation` hook (IntersectionObserver). Numbers count up from 0 when the section enters the viewport.
- **Testimonials.jsx** — Client review carousel pulled from `data/testimonials.js`.
- **CTA.jsx** — Call-to-action section linking to the contact page.

Supporting files: `Navbar.jsx` (fixed nav + mobile drawer), `Footer.jsx` (site footer), `App.jsx` (routing with `React.lazy()` and `PageWrapper`), `styles/index.css` (Tailwind directives).

**Services Page (`feature/services-page`):**

- Service listing page at `/services`
- Query parameter support: `/services?service=web-development` deep-links to a specific service
- Individual service detail views with descriptions, features, and pricing tiers
- Phone and email contact info display

**About Page (`feature/about-page`):**

- Company story, mission, and vision
- Team section
- Company values and milestones

**Contact Form (`feature/contact-form`):**

- **Frontend:** `Contact.jsx` — Form with six fields: name, email, phone, service dropdown (populated from `data/services.js`), subject, message. Submit button shows loading state. Success/failure feedback via `react-toastify`.
- **Backend:** `POST /api/contact` endpoint on Express. Validates required fields (name, email, message). Returns JSON success/error response.
- **Auto-lead creation:** When a contact form is submitted, the backend automatically creates a Lead record in the CRM database. This means every inquiry becomes trackable without manual data entry.
- **Email notification:** Sends an email to the admin on new submission. Gracefully handles email service failures — the contact is still saved even if the email doesn't send.

**Admin Login (`feature/admin-login`):**

- **Frontend:** `Login.jsx` — Email and password fields. On successful auth, JWT token is stored in `localStorage` under the key `crm_token`. The `AuthContext` updates state to reflect the logged-in user.
- **Backend:** `POST /api/crm/auth/login` — Validates credentials against the `User` model in MongoDB. Returns a signed JWT with the user's ID and role.
- **Auth middleware:** Two middleware functions protect CRM routes:
  - `protect` — Verifies the JWT token. Attaches `req.user` to the request.
  - `adminOnly` — Checks `req.user.role === 'admin'`. Returns 403 if not.
- **Database seeder:** Seeds an initial admin user (`admin@esland.com` / `admin123`) and default career listings so the admin panel has data on first login.

---

## 3.2 Sprint 2 — CRM Core (Week 3–4)

Sprint 2 builds the admin panel internals. By the end of this sprint, the team has a functional CRM that real employees could use day-to-day.

| Task ID | Task | Assigned To | Branch | Priority |
|---------|------|-------------|--------|----------|
| SP2-001 | CRM Dashboard | Frontend Dev | `feature/crm-dashboard` | High |
| SP2-002 | Lead Management (CRUD) | Full-stack Dev | `feature/lead-management` | High |
| SP2-003 | Lead Pipeline & Status | Full-stack Dev | `feature/lead-pipeline` | High |
| SP2-004 | CRM Navigation & Layout | Frontend Dev | `feature/crm-layout` | High |

### What Gets Built in Sprint 2

**CRM Layout (`feature/crm-layout`):**

- `CrmLayout.jsx` — Auth guard wrapper. Checks `AuthContext` for a valid user. If no user is found, redirects to `/admin-panel-xyz/login`. Renders `CrmSidebar` + `<Outlet />` for nested routes.
- `CrmSidebar.jsx` — Collapsible sidebar navigation. Links to Dashboard, Leads, Quotes. Active route highlighting. Collapse/expand toggle for smaller screens.
- `StatusBadge.jsx` — Reusable colored pill component. Maps status strings (New, Contacted, Qualified, Proposal Sent, Won, Lost) to background/text color classes.

**CRM Dashboard (`feature/crm-dashboard`):**

- Summary statistics: total leads, leads by status, conversion rate, revenue this month
- Recent activity feed
- Quick actions: add lead, view all leads

**Lead Management (`feature/lead-management`):**

- `Leads.jsx` — Table view of all leads with search, filter by status, sort by date/name
- `LeadDetail.jsx` — Full lead profile: contact info, status history, notes, associated quotes
- CRUD operations: create, read, update, delete leads
- Status changes are logged with timestamps

**Lead Pipeline (`feature/lead-pipeline`):**

- Visual pipeline view (Kanban-style or status-grouped)
- Drag-and-drop or click-to-advance status transitions
- Status flow: New → Contacted → Qualified → Proposal Sent → Won / Lost

---

## 3.3 Sprint 3 — Quotes & Polish (Week 5)

Sprint 3 adds the quoting system and polishes the existing features.

| Task ID | Task | Assigned To | Branch | Priority |
|---------|------|-------------|--------|----------|
| SP3-001 | Quote Generation | Full-stack Dev | `feature/quote-generation` | High |
| SP3-002 | Quote Management | Full-stack Dev | `feature/quote-management` | High |
| SP3-003 | Dashboard Stats | Frontend Dev | `feature/dashboard-stats` | Medium |

### What Gets Built in Sprint 3

**Quote Generation (`feature/quote-generation`):**

- `QuoteNew.jsx` — Form to create a new quote. Select an existing lead, add line items (service, description, quantity, unit price), calculate totals with tax.
- Backend: `POST /api/crm/quotes` — Creates a quote document linked to a lead. Generates a unique quote number (e.g., `Q-2026-001`).

**Quote Management (`feature/quote-management`):**

- `Quotes.jsx` — Table of all quotes with status filter (Draft, Sent, Accepted, Rejected)
- `QuoteDetail.jsx` — View/edit a quote. Status transitions: Draft → Sent → Accepted/Rejected. Print/PDF export.
- Backend endpoints: `GET /api/crm/quotes`, `GET /api/crm/quotes/:id`, `PUT /api/crm/quotes/:id`, `DELETE /api/crm/quotes/:id`

**Dashboard Stats (`feature/dashboard-stats`):**

- Enhanced dashboard with chart data: leads over time, revenue by service, pipeline velocity
- Date range filter

---

## 3.4 Sprint 4 — Deployment & Fixes (Week 6)

Sprint 4 gets everything running in a real environment and fixes the bugs that surface once you leave localhost.

| Task ID | Task | Assigned To | Branch | Priority |
|---------|------|-------------|--------|----------|
| SP4-001 | Deployment (Vercel + Render) | DevOps | `chore/deployment` | Critical |
| SP4-002 | Mobile Hero Fix | Frontend Dev | `feature/mobile-hero-fix` | High |
| SP4-003 | API URL Fix | Full-stack Dev | `bugfix/api-url` | Critical |
| SP4-004 | CORS Configuration | Full-stack Dev | `hotfix/cors-origin` | Critical |

### What Gets Built in Sprint 4

**Deployment (`chore/deployment`):**

- **Vercel** (Frontend): `vercel.json` with SPA rewrites — `{"source": "/(.*)", "destination": "/index.html"}` — handles client-side routing including `/admin-panel-xyz/*` paths.
- **Render** (Backend): Express server with MongoDB connection, API routes, CORS configuration.
- Environment variables configured on both platforms.

**Mobile Hero Fix (`feature/mobile-hero-fix`):**

The hero section had visibility issues on mobile devices. Dark gradients overwhelmed the content and glow blobs were too intense on small screens.

- Reduced gradient opacity on mobile breakpoints
- Reduced glow blob intensity
- Added mobile-specific image brightness via CSS
- Improved text contrast ratios for readability

**API URL Fix (`bugfix/api-url`):**

The frontend API client needed a configurable base URL for different environments.

- `client/src/lib/api.js` updated: `baseURL: import.meta.env.VITE_API_BASE_URL || 'https://eslands.onrender.com'`
- Local development uses the environment variable, production falls back to the Render URL.

**CORS Configuration (`hotfix/cors-origin`):**

- Express CORS middleware configured to allow the Vercel frontend origin
- Removed overly permissive `origin: '*'` in production

---

## 3.5 Sprint 5 — QA, UAT & Launch (Week 7)

Sprint 5 is not a feature sprint. It is a quality gate. No new code is written. The team validates what already exists.

| Task ID | Task | Assigned To | Branch | Priority |
|---------|------|-------------|--------|----------|
| SP5-001 | QA Testing | QA Engineer | `qa` branch | Critical |
| SP5-002 | Business Validation | Product Owner | `wa` branch | Critical |
| SP5-003 | Client UAT | Client | `uat` branch | Critical |
| SP5-004 | Production Launch | DevOps + PM | `prod` branch | Critical |

### QA Testing (`qa` branch)

The `dev` branch is merged into `qa`. QA runs a full regression:

- All pages render correctly (Home, About, Services, Careers, Contact, Products)
- Contact form submits and creates a lead in CRM
- Admin login works with seeded credentials
- CRM: create, update, delete leads
- CRM: create, send, accept/reject quotes
- Mobile responsive checks (iOS Safari, Android Chrome)
- Cross-browser (Chrome, Firefox, Edge, Safari)
- SEO meta tags present on all public pages
- Console errors: zero
- API error handling: network failures, 401s, 500s

### Business Validation (`wa` branch)

The `qa` branch is merged into `wa` (work acceptance). The Product Owner validates:

- All client requirements are met
- Content is accurate and complete
- Business flows make sense end-to-end
- UI/UX matches approved designs

### Client UAT (`uat` branch)

The `wa` branch is merged into `uat`. The client performs User Acceptance Testing:

- Tests every feature with real-world scenarios
- Provides sign-off or lists required changes
- If changes are needed, they go back to `dev`, re-pass `qa` and `wa`, then return to `uat`

### Production Launch (`prod` branch)

Once UAT is signed off:

```bash
git checkout prod
git merge uat
git push origin prod
```

Vercel and Render auto-deploy from `prod`. DNS is pointed to the production URLs. SSL certificates are verified. Monitoring is enabled.

---

## 3.6 How a Developer Picks Up a Task

Every task follows the same branching pattern. The developer always starts from `dev`, creates a feature branch, works in isolation, and merges back via PR.

### Example: Frontend Developer picks up "Home Page" (SP1-001)

```bash
# Step 1: Start from dev
git checkout dev
git pull origin dev

# Step 2: Create feature branch
git checkout -b feature/home-page

# Step 3: Start coding
# Files: components/home/Hero.jsx, components/home/ServicesGrid.jsx,
#        components/home/WhyChooseUs.jsx, components/home/Stats.jsx,
#        components/home/Testimonials.jsx, components/home/CTA.jsx,
#        pages/Home.jsx, components/Navbar.jsx, components/Footer.jsx

# Step 4: Test locally
cd client && npm run dev

# Step 5: Commit frequently
git add .
git commit -m "feat: add hero section with service cards"

# Step 6: Push and create PR
git push origin feature/home-page
# Open PR: feature/home-page → dev
```

### Example: Full-stack Developer picks up "Contact Form API" (SP1-004)

```bash
# Step 1: Start from dev
git checkout dev
git pull origin dev

# Step 2: Create feature branch
git checkout -b feature/contact-form

# Step 3: Build both sides
# Frontend: client/src/pages/Contact.jsx
# Backend: server/routes/contact.js, server/controllers/contactController.js

# Step 4: Test the full flow
# Submit form → check network tab → verify lead created in DB → check email sent

# Step 5: Commit
git commit -m "feat: add contact form with auto-lead creation and email notification"

# Step 6: Push and create PR
git push origin feature/contact-form
# Open PR: feature/contact-form → dev
```

### Example: Full-stack Developer picks up "Admin Login" (SP1-005)

```bash
# Step 1: Start from dev
git checkout dev
git pull origin dev

# Step 2: Create feature branch
git checkout -b feature/admin-login

# Step 3: Build
# Frontend: client/src/pages/crm/Login.jsx, client/src/components/crm/CrmLayout.jsx
# Backend: server/routes/crm/auth.js, server/middleware/auth.js
# Database: server/seeder.js (admin user + careers)

# Step 4: Test login flow
# Visit /admin-panel-xyz/login → enter credentials → verify JWT stored → verify redirect to dashboard

# Step 5: Commit
git commit -m "feat: add admin login with JWT auth and CRM layout guard"

# Step 6: Push and create PR
git push origin feature/admin-login
# Open PR: feature/admin-login → dev
```

### Example: DevOps picks up "Project Setup" (SP1-006)

```bash
# Step 1: Start from dev
git checkout dev
git pull origin dev

# Step 2: Create branch
git checkout -b chore/project-setup

# Step 3: Set up infrastructure
# client/package.json, client/vite.config.js, client/tailwind.config.js
# server/package.json, server/.env.example
# vercel.json, .gitignore, README.md

# Step 4: Commit
git commit -m "chore: initialize project with Vite + Tailwind + Express boilerplate"

# Step 5: Push and create PR
git push origin chore/project-setup
# Open PR: chore/project-setup → dev
```

---

## 3.7 Sprint Board

The sprint board is a living document. It updates as developers move tasks through columns.

### Sprint 1 — Board Snapshot

```
┌──────────────────────┬──────────────────────┬──────────────────────┬──────────────────────┐
│       TO DO          │    IN PROGRESS       │     IN REVIEW        │        DONE          │
├──────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ SP1-002              │ SP1-001              │                      │ SP1-006              │
│ About Page           │ Home Page            │                      │ Project Setup        │
│ (Frontend Dev)       │ (Frontend Dev)       │                      │ (DevOps)             │
│                      │                      │                      │                      │
│ SP1-003              │ SP1-004              │                      │                      │
│ Services Page        │ Contact Form + API   │                      │                      │
│ (Frontend Dev)       │ (Full-stack Dev)     │                      │                      │
│                      │                      │                      │                      │
│                      │ SP1-005              │                      │                      │
│                      │ Admin Login          │                      │                      │
│                      │ (Full-stack Dev)     │                      │                      │
└──────────────────────┴──────────────────────┴──────────────────────┴──────────────────────┘
```

### Sprint 2 — Board Snapshot

```
┌──────────────────────┬──────────────────────┬──────────────────────┬──────────────────────┐
│       TO DO          │    IN PROGRESS       │     IN REVIEW        │        DONE          │
├──────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ SP2-003              │ SP2-001              │                      │                      │
│ Lead Pipeline        │ CRM Dashboard        │                      │                      │
│                      │                      │                      │                      │
│                      │ SP2-002              │                      │                      │
│                      │ Lead Management      │                      │                      │
│                      │                      │                      │                      │
│                      │ SP2-004              │                      │                      │
│                      │ CRM Layout           │                      │                      │
└──────────────────────┴──────────────────────┴──────────────────────┴──────────────────────┘
```

### Sprint 3 — Board Snapshot

```
┌──────────────────────┬──────────────────────┬──────────────────────┬──────────────────────┐
│       TO DO          │    IN PROGRESS       │     IN REVIEW        │        DONE          │
├──────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│                      │ SP3-001              │                      │                      │
│                      │ Quote Generation     │                      │                      │
│                      │                      │                      │                      │
│                      │ SP3-002              │                      │                      │
│                      │ Quote Management     │                      │                      │
│                      │                      │                      │                      │
│                      │ SP3-003              │                      │                      │
│                      │ Dashboard Stats      │                      │                      │
└──────────────────────┴──────────────────────┴──────────────────────┴──────────────────────┘
```

### Sprint 4 — Board Snapshot

```
┌──────────────────────┬──────────────────────┬──────────────────────┬──────────────────────┐
│       TO DO          │    IN PROGRESS       │     IN REVIEW        │        DONE          │
├──────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│                      │ SP4-001              │                      │                      │
│                      │ Deployment           │                      │                      │
│                      │                      │                      │                      │
│                      │ SP4-002              │                      │                      │
│                      │ Mobile Hero Fix      │                      │                      │
│                      │                      │                      │                      │
│                      │ SP4-003              │                      │                      │
│                      │ API URL Fix          │                      │                      │
│                      │                      │                      │                      │
│                      │ SP4-004              │                      │                      │
│                      │ CORS Configuration   │                      │                      │
└──────────────────────┴──────────────────────┴──────────────────────┴──────────────────────┘
```

---

## 3.8 Definition of Done

A task is **not done** when the developer finishes coding. A task is done when every checkbox below is checked. No exceptions.

- [ ] Code is written and works locally (`npm run dev` shows expected behavior)
- [ ] No console errors or warnings in browser DevTools
- [ ] Mobile responsive — tested at 375px, 768px, 1024px, 1440px widths
- [ ] Code reviewed by Tech Lead (at least one approval on the PR)
- [ ] All CI checks pass (lint, build, type-check if applicable)
- [ ] Merged to `dev` branch with no merge conflicts
- [ ] Deployed to dev server and verified (Vercel preview for frontend, Render preview for backend)
- [ ] Passes basic QA checklist:
  - Happy path works (primary user flow succeeds)
  - Error path works (invalid input, network failure, unauthorized access)
  - Loading states display correctly
  - No visual regressions on existing pages

### Why "Done" Matters

If a developer says "I'm done" but the code hasn't been reviewed, it isn't done. If it's reviewed but hasn't been merged, it isn't done. If it's merged but breaks on the dev server, it isn't done.

The Definition of Done is a **contract between the team and the client**. When every task hits "Done", the sprint is complete and the client can see working software.

---

## 3.9 Sprint Retrospective Template

At the end of each sprint, the team answers three questions:

1. **What went well?** — Keep doing these things.
2. **What didn't go well?** — Stop or fix these things.
3. **What can we improve?** — Try these new things next sprint.

### Example Retrospective (Sprint 1)

| Category | Item | Action |
|----------|------|--------|
| Went well | Feature branches kept code isolated | Continue using feature branches for all tasks |
| Went well | Contact form + auto-lead integration worked first time | Document the API contract for future features |
| Didn't go well | Mobile hero visibility was broken on real devices | Add mobile testing to Definition of Done |
| Didn't go well | CORS error delayed deployment by half a day | Set up CORS config in project-setup, not deployment |
| Improve | No automated tests | Add at least one integration test per API endpoint in Sprint 2 |

---

## 3.10 Velocity Tracking

Track how many story points the team completes per sprint to plan future sprints more accurately.

| Sprint | Planned Points | Completed Points | Carry Over |
|--------|---------------|-----------------|------------|
| Sprint 1 | 21 | — | — |
| Sprint 2 | 18 | — | — |
| Sprint 3 | 13 | — | — |
| Sprint 4 | 10 | — | — |
| Sprint 5 | 5 (QA/UAT) | — | — |

Story point reference for this project:
- **1 point** — Small fix, config change, documentation
- **2 points** — Single component or single API endpoint
- **3 points** — Page with multiple components or full CRUD feature
- **5 points** — Complex feature spanning frontend + backend + database
- **8 points** — Major feature requiring design, implementation, testing, and deployment

---

## 3.11 Risk Register

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| MongoDB connection issues on Render | High | Medium | Use connection pooling, add retry logic, set up health check endpoint |
| Vercel SPA routing breaks for `/admin-panel-xyz/*` | High | Low | Verify `vercel.json` rewrites early in Sprint 4 |
| CORS misconfiguration blocks frontend-backend communication | High | High | Document allowed origins in project-setup, test in dev before deploying |
| Mobile responsiveness issues discovered late | Medium | Medium | Add viewport testing to Definition of Done from Sprint 1 |
| Client changes requirements mid-sprint | High | Medium | Lock scope at sprint planning, changes go to next sprint backlog |
| Developer unavailable mid-sprint | Medium | Medium | Cross-train on critical path tasks, document code patterns |
