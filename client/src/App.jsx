import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const Products = lazy(() => import('./pages/Products'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CrmLogin = lazy(() => import('./pages/crm/Login'));
const CrmLayout = lazy(() => import('./components/crm/CrmLayout'));
const CrmDashboard = lazy(() => import('./pages/crm/Dashboard'));
const CrmLeads = lazy(() => import('./pages/crm/Leads'));
const CrmLeadDetail = lazy(() => import('./pages/crm/LeadDetail'));
const CrmQuotes = lazy(() => import('./pages/crm/Quotes'));
const CrmQuoteDetail = lazy(() => import('./pages/crm/QuoteDetail'));
const CrmQuoteNew = lazy(() => import('./pages/crm/QuoteNew'));

// Portal Views
const PortalLogin = lazy(() => import('./pages/portal/PortalLogin'));
const StudentPortal = lazy(() => import('./pages/portal/StudentPortal'));
const ClientPortal = lazy(() => import('./pages/portal/ClientPortal'));
const PublicPay = lazy(() => import('./pages/portal/PublicPay'));
const PublicAcceptQuote = lazy(() => import('./pages/crm/PublicAcceptQuote'));

import Seo from './components/Seo';
import ScrollIndicator from './components/ScrollIndicator';
import ScrollToTop from './components/ScrollToTop';
import CookieBanner from './components/CookieBanner';
import MobileStickyCTA from './components/MobileStickyCTA';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  const hideNavFooter = location.pathname.startsWith('/admin-panel-xyz') || location.pathname.startsWith('/portal') || location.pathname.startsWith('/pay') || location.pathname.includes('/public-accept');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 selection:bg-sky-500/20 selection:text-sky-300">
      <a href="#main-content" className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white focus:not-sr-only">Skip to content</a>
      <Seo />
      <ScrollIndicator />
      <ScrollToTop />
      {!hideNavFooter && <Navbar />}
      <MotionConfig reducedMotion="user">
        <AnimatePresence mode="wait">
          <Suspense fallback={<div className="flex h-screen items-center justify-center text-white">Loading...</div>}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
              <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />

              {/* Admin Panel */}
              <Route path="/admin-panel-xyz/login" element={<CrmLogin />} />
              <Route path="/admin-panel-xyz" element={<CrmLayout />}>
                <Route index element={<CrmDashboard />} />
                <Route path="leads" element={<CrmLeads />} />
                <Route path="leads/:id" element={<CrmLeadDetail />} />
                <Route path="quotes" element={<CrmQuotes />} />
                <Route path="quotes/:id" element={<CrmQuoteDetail />} />
                <Route path="quotes/new/:leadId" element={<CrmQuoteNew />} />
              </Route>

              {/* Student & Client Portals */}
              <Route path="/portal/login" element={<PortalLogin />} />
              <Route path="/portal/student" element={<StudentPortal />} />
              <Route path="/portal/client" element={<ClientPortal />} />

              {/* Public Checkout Funnel */}
              <Route path="/pay/:leadId" element={<PublicPay />} />
              <Route path="/quotes/public-accept/:quoteId" element={<PublicAcceptQuote />} />

              <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </MotionConfig>
      {!hideNavFooter && <Footer />}
      {!hideNavFooter && <MobileStickyCTA />}
      <ToastContainer position="top-right" theme="light" />
      <CookieBanner />
    </div>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      id="main-content" className="relative overflow-hidden"
    >
      {children}
    </motion.main>
  );
}

export default App;
