# Document 04: Frontend Development Workflow

## Frontend Developer Starts Building

The frontend developer picks up the "Home Page" task (SP1-001) from Sprint 1. This document walks through every step: branch setup, project configuration, component development, routing, API integration, and the daily workflow that repeats across all sprints.

---

## 4.1 Creating the Feature Branch

Every feature starts from the `dev` branch. Never work directly on `dev`, `qa`, `wa`, `uat`, or `prod`.

```bash
# Ensure you're on dev and up to date
git checkout dev
git pull origin dev

# Create and switch to the feature branch
git checkout -b feature/home-page
```

The branch name follows the pattern `feature/<short-description>`. Other patterns: `bugfix/`, `hotfix/`, `chore/`.

---

## 4.2 Setting Up the Project

### Installing Dependencies

```bash
cd client
npm install
```

### Key Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| react | UI library | 18.x |
| react-dom | DOM rendering | 18.x |
| react-router-dom | Client-side routing | 6.x |
| framer-motion | Animations (page transitions, hover effects) | 11.x |
| axios | HTTP client for API calls | 1.x |
| react-toastify | Toast notifications (success/error messages) | 9.x |
| react-helmet-async | SEO meta tags per page | 2.x |
| lucide-react | Icon library (replaces hardcoded SVGs) | Latest |
| tailwindcss | Utility-first CSS framework | 4.x |
| @tailwindcss/vite | Vite plugin for Tailwind CSS v4 | 4.x |

### Project Structure

```
client/src/
├── App.jsx                    — Route definitions + PageWrapper
├── main.jsx                   — Entry point, renders App
├── components/
│   ├── Navbar.jsx             — Fixed navigation bar + mobile hamburger drawer
│   ├── Footer.jsx             — Site-wide footer
│   ├── CookieBanner.jsx       — GDPR cookie consent
│   ├── MobileStickyCTA.jsx    — Sticky "Contact Us" button on mobile
│   ├── Seo.jsx                — Default SEO wrapper
│   ├── ScrollIndicator.jsx    — Scroll progress bar
│   ├── ScrollToTop.jsx        — Scrolls to top on route change
│   ├── ThemeContext.jsx        — Dark/light theme provider
│   ├── AuthContext.jsx         — CRM authentication state provider
│   ├── home/                  — Home page section components
│   │   ├── Hero.jsx           — Hero banner with service cards
│   │   ├── Hero.tsx           — TypeScript variant of Hero
│   │   ├── ServicesGrid.jsx   — Services overview grid
│   │   ├── WhyChooseUs.jsx    — Value proposition section
│   │   ├── Stats.jsx          — Animated number counters
│   │   ├── Testimonials.jsx   — Client review carousel
│   │   └── CTA.jsx            — Call to action section
│   └── crm/                   — Admin panel shared components
│       ├── CrmLayout.jsx      — Auth guard + sidebar wrapper
│       ├── CrmSidebar.jsx     — Collapsible navigation sidebar
│       └── StatusBadge.jsx    — Colored status pill component
├── pages/
│   ├── Home.jsx               — Assembles home sections
│   ├── Services.jsx           — Services listing
│   ├── About.jsx              — Company information
│   ├── Careers.jsx            — Job listings
│   ├── Contact.jsx            — Contact form
│   ├── Products.jsx           — Product showcase
│   ├── NotFound.jsx           — 404 page
│   └── crm/                   — Admin panel pages
│       ├── Login.jsx          — Admin login form
│       ├── Dashboard.jsx      — CRM overview dashboard
│       ├── Leads.jsx          — Lead management table
│       ├── LeadDetail.jsx     — Individual lead view
│       ├── Quotes.jsx         — Quote management table
│       ├── QuoteDetail.jsx    — Individual quote view
│       └── QuoteNew.jsx       — Create new quote form
├── hooks/
│   └── useScrollAnimation.js  — IntersectionObserver hook for scroll-triggered animations
├── lib/
│   └── api.js                 — Axios instance with interceptors
├── data/
│   ├── services.js            — Service definitions (id, name, description, features, pricing)
│   └── testimonials.js        — Client testimonial data
├── utils/
│   └── cn.js                  — Tailwind class merge utility
└── styles/
    └── index.css              — Tailwind directives + custom styles
```

---

## 4.3 Building the Home Page

The home page is assembled from six section components. Each component is responsible for one visual section of the page.

### File: `client/src/pages/Home.jsx`

This is the page component that imports and stacks all sections:

```jsx
import Hero from '../components/home/Hero';
import ServicesGrid from '../components/home/ServicesGrid';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Stats from '../components/home/Stats';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';

function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <CTA />
    </>
  );
}

export default Home;
```

### File: `client/src/components/home/Hero.jsx`

The hero section is the first thing visitors see. It displays a headline, subheadline, and clickable service cards that link to the services page.

```jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services } from '../../data/services';

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 min-h-screen flex items-center">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-950/30 to-slate-950" />

      {/* Glow blobs — decorative blurred circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold text-white text-center"
        >
          Esland IT Solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-xl text-slate-300 text-center mt-6 max-w-2xl mx-auto"
        >
          Transforming Ideas Into Digital Reality
        </motion.p>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <Link
                to={`/services?service=${service.id}`}
                className="block p-6 bg-white/5 backdrop-blur-sm border border-white/10
                           rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                <service.icon className="w-8 h-8 text-sky-400 mb-4" />
                <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                <p className="text-slate-400 text-sm mt-2">{service.shortDescription}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
```

### Mobile Visibility Fix

The hero had visibility issues on mobile devices. Dark gradients overwhelmed the content, and glow blobs were too intense on small screens.

**Problem:** On screens under 768px, the background gradient and glow blobs were opaque enough to obscure the service cards and text.

**Fix applied in `Hero.jsx`:**

```jsx
{/* Mobile-specific: reduced gradient opacity, dimmer glow blobs */}
<div className="absolute inset-0 bg-gradient-to-b from-sky-950/10 to-slate-950 md:from-sky-950/30" />

{/* Glow blobs — hidden or dimmed on mobile */}
<div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
<div className="hidden md:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
```

Additionally, mobile-specific image brightness was increased via CSS and text contrast ratios were improved.

### File: `client/src/components/home/ServicesGrid.jsx`

The services grid displays all services in a responsive 3-column layout with hover animations.

```jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services } from '../../data/services';

function ServicesGrid() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link
                to={`/services?service=${service.id}`}
                className="block p-8 bg-slate-800 border border-slate-700 rounded-2xl
                           hover:border-sky-500/50 transition-colors duration-300 h-full"
              >
                <service.icon className="w-12 h-12 text-sky-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-3">{service.name}</h3>
                <p className="text-slate-400 leading-relaxed">{service.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesGrid;
```

### File: `client/src/components/home/Stats.jsx`

Animated number counters that trigger when the section scrolls into view using the `useScrollAnimation` hook.

```jsx
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { motion } from 'framer-motion';

const stats = [
  { value: 150, label: 'Projects Completed' },
  { value: 50, label: 'Happy Clients' },
  { value: 10, label: 'Years Experience' },
  { value: 25, label: 'Team Members' },
];

function Stats() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-sky-400">
                {isVisible ? (
                  <CountUp end={stat.value} duration={2} />
                ) : (
                  '0'
                )}
                <span className="text-sky-400">+</span>
              </div>
              <p className="text-slate-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
```

The `useScrollAnimation` hook uses `IntersectionObserver` to detect when the element enters the viewport:

```javascript
// client/src/hooks/useScrollAnimation.js
import { useState, useEffect, useRef } from 'react';

export function useScrollAnimation(threshold = 0.2) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

### File: `client/src/components/home/Testimonials.jsx`

Client testimonials pulled from `data/testimonials.js`:

```jsx
import { testimonials } from '../../data/testimonials';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-16">What Our Clients Say</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800 rounded-2xl p-8 md:p-12"
          >
            <p className="text-slate-300 text-lg leading-relaxed italic">
              "{testimonials[current].quote}"
            </p>
            <div className="mt-6">
              <p className="text-white font-semibold">{testimonials[current].name}</p>
              <p className="text-slate-400 text-sm">{testimonials[current].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === current ? 'bg-sky-400' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
```

### File: `client/src/components/home/CTA.jsx`

Call-to-action section driving visitors to the contact page:

```jsx
import { Link } from 'react-router-dom';

function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-sky-600 to-indigo-700">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Start Your Project?
        </h2>
        <p className="text-sky-100 text-lg mb-10 max-w-2xl mx-auto">
          Let's discuss how we can help transform your business with the right technology solutions.
        </p>
        <Link
          to="/contact"
          className="inline-block px-8 py-4 bg-white text-sky-700 font-semibold rounded-lg
                     hover:bg-sky-50 transition-colors duration-300"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}

export default CTA;
```

---

## 4.4 Building the Contact Form

### File: `client/src/pages/Contact.jsx`

The contact form collects user inquiries and sends them to the backend, which auto-creates a CRM lead.

```jsx
import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../lib/api';
import { services } from '../data/services';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/api/contact', formData);
      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-4">Contact Us</h1>
        <p className="text-slate-400 text-center mb-12">
          Fill out the form below and we'll get back to you within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name — required */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg
                         text-white focus:border-sky-500 focus:outline-none transition-colors"
              placeholder="John Doe"
            />
          </div>

          {/* Email — required */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg
                         text-white focus:border-sky-500 focus:outline-none transition-colors"
              placeholder="john@example.com"
            />
          </div>

          {/* Phone — optional */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg
                         text-white focus:border-sky-500 focus:outline-none transition-colors"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Service dropdown — populated from data/services.js */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">Service Interested In</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg
                         text-white focus:border-sky-500 focus:outline-none transition-colors"
            >
              <option value="">Select a Service</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subject — optional */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg
                         text-white focus:border-sky-500 focus:outline-none transition-colors"
              placeholder="Project Inquiry"
            />
          </div>

          {/* Message — required */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg
                         text-white focus:border-sky-500 focus:outline-none transition-colors
                         resize-none"
              placeholder="Tell us about your project..."
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-700
                       text-white font-semibold rounded-lg transition-colors duration-300"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
```

### Form Data Flow

```
User fills form → handleSubmit() → api.post('/api/contact', formData)
                                          ↓
                                   Express receives request
                                          ↓
                                   Validates required fields
                                          ↓
                                   Creates Contact document in MongoDB
                                          ↓
                                   Auto-creates Lead document (status: "New")
                                          ↓
                                   Sends email notification to admin
                                          ↓
                                   Returns success response
                                          ↓
                                   Frontend shows toast.success('Message sent successfully!')
```

---

## 4.5 Routing Setup

### File: `client/src/App.jsx`

All routes are lazy-loaded for code splitting. Each page loads only when the user navigates to it.

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Seo from './components/Seo';
import ScrollToTop from './components/ScrollToTop';

// Lazy-loaded public pages
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const Products = lazy(() => import('./pages/Products'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy-loaded CRM pages
const CrmLogin = lazy(() => import('./pages/crm/Login'));
const CrmLayout = lazy(() => import('./components/crm/CrmLayout'));
const CrmDashboard = lazy(() => import('./pages/crm/Dashboard'));
const CrmLeads = lazy(() => import('./pages/crm/Leads'));
const CrmLeadDetail = lazy(() => import('./pages/crm/LeadDetail'));
const CrmQuotes = lazy(() => import('./pages/crm/Quotes'));
const CrmQuoteDetail = lazy(() => import('./pages/crm/QuoteDetail'));
const CrmQuoteNew = lazy(() => import('./pages/crm/QuoteNew'));

// Page wrapper with Framer Motion transitions
function PageWrapper({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Seo />

      <Suspense fallback={<div className="flex items-center justify-center h-screen bg-slate-950 text-white">Loading...</div>}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />

          {/* CRM routes — hidden at /admin-panel-xyz */}
          <Route path="/admin-panel-xyz/login" element={<CrmLogin />} />
          <Route path="/admin-panel-xyz" element={<CrmLayout />}>
            <Route index element={<CrmDashboard />} />
            <Route path="leads" element={<CrmLeads />} />
            <Route path="leads/:id" element={<CrmLeadDetail />} />
            <Route path="quotes" element={<CrmQuotes />} />
            <Route path="quotes/new" element={<CrmQuoteNew />} />
            <Route path="quotes/:id" element={<CrmQuoteDetail />} />
          </Route>

          {/* 404 catch-all */}
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
```

### Page Transitions with Framer Motion

Every public page is wrapped in `PageWrapper`, which animates the page in and out on route changes. The `AnimatePresence` component (used inside `PageWrapper` or at the `Routes` level) ensures exit animations play before the old component unmounts.

```jsx
// The transition: opacity 0 → 1, y 24 → 0, duration 0.45s
// This creates a subtle slide-up + fade-in effect on every page change
<motion.main
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -24 }}
  transition={{ duration: 0.45, ease: 'easeOut' }}
>
  {children}
</motion.main>
```

### Why Lazy Loading Matters

Without `React.lazy()`, every page component is loaded in the initial bundle. A user visiting the home page would download the CRM login code, the quotes page code, and the 404 page code — none of which they need.

With lazy loading:
- **Initial bundle:** Home page + shared components (Navbar, Footer)
- **On /services navigation:** Services page loads on demand
- **On /admin-panel-xyz/login navigation:** CRM login loads on demand
- **Bundle size reduction:** ~60-70% smaller initial load

---

## 4.6 API Integration

### File: `client/src/lib/api.js`

The API client is an Axios instance configured with the backend URL, JWT token injection, and 401 error handling.

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://eslands.onrender.com',
});

// Request interceptor: attach JWT token to every CRM request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('crm_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('crm_token');
      window.location.href = '/admin-panel-xyz/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### How the Interceptors Work

**Request interceptor** runs before every API call. If a CRM token exists in localStorage, it attaches it as a Bearer token in the Authorization header. This means the frontend developer never has to manually add the token to individual API calls — it's handled automatically.

**Response interceptor** runs after every API call. If the backend returns a 401 (token expired or invalid), it clears the token and redirects to the login page. This is a global error handler — no individual component needs to handle 401 errors.

### Environment Variables

The `baseURL` is configurable via Vite environment variables:

```bash
# .env.local (development — optional, falls back to Render URL)
VITE_API_BASE_URL=http://localhost:5000

# .env.production (Vercel — set in Vercel dashboard)
VITE_API_BASE_URL=https://eslands.onrender.com
```

### API Endpoints Used by Frontend

| Method | Endpoint | Used By | Purpose |
|--------|----------|---------|---------|
| POST | `/api/contact` | Contact.jsx | Submit contact form |
| POST | `/api/crm/auth/login` | Login.jsx | Admin login |
| GET | `/api/crm/leads` | Leads.jsx | List all leads |
| GET | `/api/crm/leads/:id` | LeadDetail.jsx | View single lead |
| POST | `/api/crm/leads` | LeadDetail.jsx | Create new lead |
| PUT | `/api/crm/leads/:id` | LeadDetail.jsx | Update lead |
| DELETE | `/api/crm/leads/:id` | LeadDetail.jsx | Delete lead |
| GET | `/api/crm/quotes` | Quotes.jsx | List all quotes |
| GET | `/api/crm/quotes/:id` | QuoteDetail.jsx | View single quote |
| POST | `/api/crm/quotes` | QuoteNew.jsx | Create new quote |
| PUT | `/api/crm/quotes/:id` | QuoteDetail.jsx | Update quote |

---

## 4.7 CRM Authentication Flow

### Login Flow

```
1. User visits /admin-panel-xyz/login
2. Login.jsx renders email + password form
3. User submits → api.post('/api/crm/auth/login', { email, password })
4. Backend validates credentials, returns JWT token
5. Frontend stores token: localStorage.setItem('crm_token', token)
6. AuthContext updates state: setUser(decodedUser)
7. Redirect to /admin-panel-xyz (dashboard)
```

### Auth Guard (CrmLayout.jsx)

```
1. User navigates to /admin-panel-xyz/* (any CRM route)
2. CrmLayout.jsx mounts
3. Checks AuthContext for a valid user
4. If no user → redirect to /admin-panel-xyz/login
5. If user exists → render CrmSidebar + Outlet (nested route)
```

```jsx
// CrmLayout.jsx (simplified)
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import CrmSidebar from './CrmSidebar';

function CrmLayout() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/admin-panel-xyz/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <CrmSidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
```

### Logout Flow

```
1. User clicks "Logout" in CrmSidebar
2. localStorage.removeItem('crm_token')
3. AuthContext updates state: setUser(null)
4. CrmLayout detects no user → redirects to /admin-panel-xyz/login
```

---

## 4.8 SEO Implementation

### File: `client/src/components/Seo.jsx`

Uses `react-helmet-async` to set meta tags per page:

```jsx
import { Helmet } from 'react-helmet-async';

function Seo({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title || 'Esland IT Solutions — IT Services & Consulting'}</title>
      <meta
        name="description"
        content={description || 'Professional IT services including web development, mobile apps, cloud solutions, and digital transformation.'}
      />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={title || 'Esland IT Solutions'} />
      <meta property="og:description" content={description || 'Transforming Ideas Into Digital Reality'} />
    </Helmet>
  );
}

export default Seo;
```

Each page passes its own SEO data:

```jsx
// In pages/Home.jsx
<Seo
  title="Esland IT Solutions — IT Services & Consulting"
  description="Professional IT services including web development, mobile apps, cloud solutions, and digital transformation."
  keywords="IT services, web development, mobile apps, cloud solutions, digital transformation"
/>
```

---

## 4.9 Building Navigation

### File: `client/src/components/Navbar.jsx`

The navbar is a fixed-position component with a mobile hamburger menu.

```jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/careers', label: 'Careers' },
  { path: '/contact', label: 'Contact' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white">
          Esland IT
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-sky-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
```

---

## 4.10 Building the CRM Sidebar

### File: `client/src/components/crm/CrmSidebar.jsx`

```jsx
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, LogOut } from 'lucide-react';
import { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';

const sidebarLinks = [
  { path: '/admin-panel-xyz', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin-panel-xyz/leads', label: 'Leads', icon: Users },
  { path: '/admin-panel-xyz/quotes', label: 'Quotes', icon: FileText },
];

function CrmSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-slate-900 border-r border-slate-800
                        flex flex-col transition-all duration-300`}>
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-4 text-slate-400 hover:text-white"
      >
        {collapsed ? '→' : '←'}
      </button>

      {/* Navigation links */}
      <nav className="flex-1 px-2">
        {sidebarLinks.map((link) => {
          const isActive = location.pathname === link.path ||
            (link.path !== '/admin-panel-xyz' && location.pathname.startsWith(link.path));

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-sky-600/20 text-sky-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <link.icon size={20} />
              {!collapsed && <span className="text-sm">{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout button */}
      <div className="px-2 pb-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg w-full
                     text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default CrmSidebar;
```

### File: `client/src/components/crm/StatusBadge.jsx`

```jsx
const statusColors = {
  New: 'bg-blue-500/20 text-blue-400',
  Contacted: 'bg-yellow-500/20 text-yellow-400',
  Qualified: 'bg-purple-500/20 text-purple-400',
  'Proposal Sent': 'bg-orange-500/20 text-orange-400',
  Won: 'bg-green-500/20 text-green-400',
  Lost: 'bg-red-500/20 text-red-400',
  Draft: 'bg-slate-500/20 text-slate-400',
  Sent: 'bg-blue-500/20 text-blue-400',
  Accepted: 'bg-green-500/20 text-green-400',
  Rejected: 'bg-red-500/20 text-red-400',
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-slate-500/20 text-slate-400'}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
```

---

## 4.11 Daily Development Workflow

### Every Day

```bash
# 1. Check current state
git status

# 2. Make sure you're on the right branch
git checkout feature/home-page

# 3. Pull latest changes from remote (in case of shared work)
git pull origin feature/home-page

# 4. Start the dev server
cd client
npm run dev

# 5. Code...

# 6. Save work — commit frequently with descriptive messages
git add .
git commit -m "feat: add hero section with service cards"

# 7. Push to remote
git push origin feature/home-page
```

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | When to Use | Example |
|--------|-------------|---------|
| `feat:` | New feature | `feat: add hero section with service cards` |
| `fix:` | Bug fix | `fix: improve mobile hero visibility` |
| `chore:` | Config, setup, maintenance | `chore: add Tailwind CSS configuration` |
| `refactor:` | Code restructuring, no behavior change | `refactor: extract Hero into smaller components` |
| `style:` | CSS/visual changes only | `style: adjust glow blob opacity on mobile` |
| `docs:` | Documentation only | `docs: update README with setup instructions` |

### Commit Examples from This Project

```
feat: add hero section with service cards
feat: add services grid section with hover animations
feat: add animated stats counters with IntersectionObserver
feat: add testimonials carousel with framer-motion
feat: add CTA section linking to contact page
feat: add responsive navbar with mobile drawer
feat: add page transitions with framer-motion
feat: add contact form with service dropdown
feat: add SEO meta tags with react-helmet-async
fix: improve mobile hero visibility by reducing gradient opacity
fix: reduce glow blob intensity on mobile screens
fix: improve text contrast ratios for accessibility
chore: initialize project with Vite + Tailwind CSS
chore: configure React.lazy() for code splitting
```

---

## 4.12 When Feature is Complete

### Final Commits and Push

```bash
# Make sure everything works
cd client
npm run dev
# Test: Home page loads, all sections visible, mobile responsive, no console errors

# Final commit
git add .
git commit -m "feat: complete home page with all sections"

# Push to remote
git push origin feature/home-page
```

### Opening the Pull Request

On GitHub (or your git platform), open a PR with this template:

```markdown
## PR: Complete Home Page — All Sections

### Changes
- Hero banner with service cards (mobile-optimized)
- Services grid section with hover effects
- Why Choose Us value proposition section
- Animated stats counters
- Testimonials carousel
- CTA section

### Files Changed
- components/home/Hero.jsx (new)
- components/home/Hero.tsx (new)
- components/home/ServicesGrid.jsx (new)
- components/home/WhyChooseUs.jsx (new)
- components/home/Stats.jsx (new)
- components/home/Testimonials.jsx (new)
- components/home/CTA.jsx (new)
- pages/Home.jsx (new)
- components/Navbar.jsx (new)
- components/Footer.jsx (new)
- App.jsx (modified — added routes)

### Testing
- [x] Desktop (1440px): all sections render correctly
- [x] Tablet (768px): responsive layout works
- [x] Mobile (375px): hero visibility fixed, all sections accessible
- [x] No console errors
- [x] Page transitions animate smoothly
```

### Review and Merge

The Tech Lead reviews the PR. After approval:

```bash
# On GitHub: Click "Merge pull request"
# Then locally:
git checkout dev
git pull origin dev
```

---

## 4.13 Files Created/Modified in Sprint 1 (Frontend)

### Feature: Home Page (`feature/home-page`)

| File | Type | Purpose |
|------|------|---------|
| `components/home/Hero.jsx` | New | Hero banner with service cards |
| `components/home/Hero.tsx` | New | TypeScript variant of Hero |
| `components/home/ServicesGrid.jsx` | New | Services overview grid |
| `components/home/WhyChooseUs.jsx` | New | Value proposition section |
| `components/home/Stats.jsx` | New | Animated number counters |
| `components/home/Testimonials.jsx` | New | Client review carousel |
| `components/home/CTA.jsx` | New | Call to action section |
| `pages/Home.jsx` | New | Page component assembling all sections |
| `components/Navbar.jsx` | New | Fixed navigation + mobile drawer |
| `components/Footer.jsx` | New | Site footer |
| `App.jsx` | Modified | Added route definitions with React.lazy() |

### Feature: Services Page (`feature/services-page`)

| File | Type | Purpose |
|------|------|---------|
| `pages/Services.jsx` | New | Services listing with query param support |

### Feature: About Page (`feature/about-page`)

| File | Type | Purpose |
|------|------|---------|
| `pages/About.jsx` | New | Company information page |

### Feature: Contact Form (`feature/contact-form`)

| File | Type | Purpose |
|------|------|---------|
| `pages/Contact.jsx` | New | Contact form with service dropdown |
| `lib/api.js` | Modified | Axios instance with base URL and interceptors |

### Feature: Admin Login (`feature/admin-login`)

| File | Type | Purpose |
|------|------|---------|
| `pages/crm/Login.jsx` | New | Admin login form |
| `components/crm/CrmLayout.jsx` | New | Auth guard + sidebar wrapper |
| `components/crm/CrmSidebar.jsx` | New | Collapsible CRM navigation |
| `components/crm/StatusBadge.jsx` | New | Colored status pill component |
| `AuthContext.jsx` | New | CRM authentication state provider |

### Shared / Cross-cutting

| File | Type | Purpose |
|------|------|---------|
| `components/CookieBanner.jsx` | New | GDPR cookie consent |
| `components/MobileStickyCTA.jsx` | New | Sticky contact button on mobile |
| `components/Seo.jsx` | New | SEO meta tag wrapper |
| `components/ScrollIndicator.jsx` | New | Scroll progress bar |
| `components/ScrollToTop.jsx` | New | Scroll to top on route change |
| `hooks/useScrollAnimation.js` | New | IntersectionObserver hook |
| `data/services.js` | New | Service definitions |
| `data/testimonials.js` | New | Client testimonial data |
| `utils/cn.js` | New | Tailwind class merge utility |
| `styles/index.css` | Modified | Tailwind directives + custom styles |
| `ThemeContext.jsx` | New | Dark/light theme provider |

---

## 4.14 Common Patterns Reference

### Pattern: Conditional Rendering Based on Auth State

```jsx
// In any CRM component
const { user } = useContext(AuthContext);

if (!user) {
  return <Navigate to="/admin-panel-xyz/login" replace />;
}

// Render CRM content
```

### Pattern: API Call with Loading and Error States

```jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await api.get('/api/crm/leads');
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

if (loading) return <div className="text-white">Loading...</div>;
if (error) return <div className="text-red-400">{error}</div>;
```

### Pattern: Form with Controlled Inputs

```jsx
const [formData, setFormData] = useState({ field1: '', field2: '' });

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

return (
  <form onSubmit={handleSubmit}>
    <input name="field1" value={formData.field1} onChange={handleChange} />
    <input name="field2" value={formData.field2} onChange={handleChange} />
    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  </form>
);
```

### Pattern: Responsive Grid Layout

```jsx
// Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <div key={item.id}>{/* card content */}</div>
  ))}
</div>
```

### Pattern: Framer Motion Hover Animation

```jsx
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ type: 'spring', stiffness: 300 }}
>
  <div className="p-6 bg-slate-800 rounded-2xl">
    {/* card content */}
  </div>
</motion.div>
```

### Pattern: Toast Notifications

```jsx
import { toast } from 'react-toastify';

// Success
toast.success('Lead created successfully!');

// Error
toast.error('Failed to save. Please try again.');

// Info
toast.info('Your quote has been sent.');
```

### Pattern: Query Parameter for Deep Linking

```jsx
import { useSearchParams } from 'react-router-dom';

function Services() {
  const [searchParams] = useSearchParams();
  const activeService = searchParams.get('service');
  // If URL is /services?service=web-development, activeService = 'web-development'
}
```
