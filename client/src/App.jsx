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
import Seo from './components/Seo';
import ScrollIndicator from './components/ScrollIndicator';
import ScrollToTop from './components/ScrollToTop';
import CookieBanner from './components/CookieBanner';
import MobileStickyCTA from './components/MobileStickyCTA';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 selection:bg-sky-500/20 selection:text-sky-300">
      <a href="#main-content" className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white focus:not-sr-only">Skip to content</a>
      <Seo />
      <ScrollIndicator />
      <ScrollToTop />
      <Navbar />
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
              <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </MotionConfig>
      <Footer />
      <MobileStickyCTA />
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
