import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Phone, Mail, MapPin, Send, Check, Play,
  Globe, Smartphone, Code2, Network, Tag, Palette, Search,
  PlayCircle, Star, Quote, Laptop, Sparkles, ChevronLeft, ChevronRight, CheckCircle2
} from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../lib/api';

const heroSlides = [
  { src: '/ban-9.jpg', alt: 'London Tower Bridge background', title: 'Welcome to Esland IT Solution' },
  { src: '/ban-8.jpg', alt: 'Computer Network layout background', title: 'Esland IT Solutions', hasOverlay: true },
  { src: '/banner-3.jpg', alt: 'Corporate teamwork background', title: 'Innovative Technology Solutions' }
];

const oldServices = [
  {
    title: 'Web Development',
    desc: 'It has been a very positive part of us that, no one has given any pathetic feedback about the web Development of ours.',
    icon: Globe,
    color: '#0ea5e9',
    bg: 'from-sky-50 to-sky-100/50 border-sky-100 hover:border-sky-300'
  },
  {
    title: 'Mobile App Development',
    desc: 'Our expert mobile app developers understand your business that would help you integrate your business on the mobile.',
    icon: Smartphone,
    color: '#f97316',
    bg: 'from-orange-50 to-orange-100/50 border-orange-100 hover:border-orange-300'
  },
  {
    title: 'Software Development',
    desc: 'Software Application Development and Maintenance is a part of Esland IT Solutions Core activity.',
    icon: Code2,
    color: '#ef4444',
    bg: 'from-red-50 to-red-100/50 border-red-100 hover:border-red-300'
  },
  {
    title: 'Networking solutions',
    desc: 'We deliver simplistic yet consistent solutions that are flexible and can moulded in accordance to client requirements.',
    icon: Network,
    color: '#84cc16',
    bg: 'from-lime-50 to-lime-100/50 border-lime-100 hover:border-lime-300'
  },
  {
    title: 'Professional Naming',
    desc: 'Getting the right name is the first step towards successful company.',
    icon: Tag,
    color: '#f97316',
    bg: 'from-orange-50 to-orange-100/50 border-orange-100 hover:border-orange-300'
  },
  {
    title: 'Branding',
    desc: 'Your logo represents your brand, but your brand is everything that your business stands for.',
    icon: Palette,
    color: '#06b6d4',
    bg: 'from-cyan-50 to-cyan-100/50 border-cyan-100 hover:border-cyan-300'
  },
  {
    title: 'Seo and Marketing',
    desc: 'We have done extensive research in Search Engine Optimation (SEO) techniques.',
    icon: Search,
    color: '#ec4899',
    bg: 'from-pink-50 to-pink-100/50 border-pink-100 hover:border-pink-300'
  },
  {
    title: '2D animation',
    desc: '2D animation focuses on creating characters, storyboards, and backgrounds in two-dimensional environments.',
    icon: PlayCircle,
    color: '#6366f1',
    bg: 'from-indigo-50 to-indigo-100/50 border-indigo-100 hover:border-indigo-300'
  }
];

const testimonials = [
  {
    name: 'Usman',
    client: 'Mobile Bitz, Dartford',
    title: 'Friendly !!!',
    quote: 'A very friendly and helpful company that have looked for solutions to any problems. It is great to talk to the same person every time I phone up or e-mail. My site is at top of both Google and Bing and this brings me more customers. Every time I phone up or e-mail a change, it is done quickly and efficiently. They have helped me expand my customer base.'
  },
  {
    name: 'Sami',
    client: 'Kingsburry School',
    title: 'Genuine service !!!',
    quote: 'I like Esland, because they genuinely try to find solutions for your business, rather than just trying to sell new services all the time, which may or may not be useful. Nice people too - always helps!'
  },
  {
    name: 'Ukrani',
    client: 'Private Client',
    title: 'Fantastic !!!',
    quote: 'Fantastic service and website build from Esland, great input and help from them as we didn’t really know where to start.... Let them do their thing so we can get on with ours, worked for us! Thanks Esland IT Solutions'
  },
  {
    name: 'Rupeesh',
    client: 'Flower Paradise',
    title: 'Recommended !!!',
    quote: 'I am very happy with my new website and SEO services for my flower shop business and have already started to build my new clients! I would highly recommend Esland.'
  },
  {
    name: 'Gaurav',
    client: 'Ash Groove',
    title: 'Quick Respond !!!',
    quote: 'Esland IT services was very quick to respond to any query, and completed the task of transferring my website from joomla to WordPress, and transferring my blogger blog to within the website very quickly. I found this company very self-sufficient and easy to get along with.'
  },
  {
    name: 'Amdip Traders Ltd',
    client: 'Amdip Traders',
    title: 'Great job !!!',
    quote: 'Could not have been easier!!! They did great job . Am about to use them again. Very happy customer!'
  },
  {
    name: 'Pat',
    client: 'Ilford Kitchens',
    title: 'SEO-Satisfied !!!',
    quote: 'We are a very satisfied client of Eland. Our traffic has increased substantially as well as a significant increase in the quality of our leads. Their efforts have contributed to a 40% increase in our sales.'
  }
];

const pricingPlans = [
  {
    name: 'Standard',
    price: '2',
    features: ['2 GB Webspace', '1 Domain', '10 GB Bandwidth', 'Free Setup Support']
  },
  {
    name: 'Business',
    price: '3.99',
    features: ['3 GB Webspace', '2 Domains', '25 GB Bandwidth', '99.9% Uptime Guarantee'],
    popular: true
  },
  {
    name: 'Premium',
    price: '4.99',
    features: ['5 GB Webspace', '5 Domains', '50 GB Bandwidth', 'Enhanced Security Suite']
  },
  {
    name: 'Ultimate',
    price: '5.99',
    features: ['10 GB Webspace', '10 Domains', '100 GB Bandwidth', 'Dedicated Managed Server']
  }
];

const partners = [
  { name: 'NEX', logo: '/nex.png', isImg: true },
  { name: 'Mobile Bitz', isImg: false },
  { name: 'Kingsburry School', isImg: false },
  { name: 'Flower Paradise', isImg: false },
  { name: 'Ash Groove', isImg: false },
  { name: 'Amdip Traders', isImg: false },
  { name: 'Ilford Kitchens', isImg: false }
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);

  // Hero slideshow interval
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  // Testimonial auto-scroll
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/contact', form);
      toast.success('Thank you for contacting us! We have received your message and our representative will contact you shortly.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Sorry, something went wrong. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsLoading(true);
    try {
      await api.post('/api/newsletter', { email: newsletterEmail });
      toast.success('You have successfully subscribed to the Esland Newsletter!');
      setNewsletterEmail('');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to subscribe. Please try again.');
    } finally {
      setNewsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-700 overflow-x-hidden pt-[65px]">
      {/* 1. HERO CAROUSEL */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <img
                src={heroSlides[activeSlide].src}
                alt={heroSlides[activeSlide].alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/45 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full text-center lg:text-left">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] items-center w-full">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-450/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-sky-400 mb-6">
                  <Sparkles size={12} className="animate-pulse" />
                  ESTABLISHED SINCE 2013
                </div>
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 uppercase leading-tight">
                  Welcome to <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-100 to-sky-300 animate-gradient">
                    Esland IT Solution
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-200 font-medium max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0">
                  We Build creative, effective &amp; professional websites and affordable web design solutions !!!
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <a
                    href="#services"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-sky-500/20 hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <PlayCircle size={16} /> Get More
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <Phone size={15} /> Call us
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Slide Illustration for Mobile & Desktop */}
            <div className="flex justify-center items-center lg:justify-end">
              {activeSlide === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="z-10 pointer-events-none mt-6 lg:mt-0"
                >
                  <img
                    src="/Computer_India.png"
                    alt="Computer network visualization"
                    className="w-[200px] sm:w-[280px] lg:w-[420px] drop-shadow-[0_15px_30px_rgba(56,189,248,0.25)] animate-float"
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeSlide === index ? 'w-8 bg-sky-500' : 'w-2.5 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Partners Ticker */}
      <section className="border-y border-slate-100 bg-slate-50 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400 mb-8">
            Empowering Growth for Our Trusted Clients
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {partners.map((partner, index) => (
              <div key={index} className="grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition duration-300">
                {partner.isImg ? (
                  <img src={partner.logo} alt={partner.name} className="h-10 w-auto object-contain" />
                ) : (
                  <span className="text-xl font-bold tracking-tight text-slate-800 font-serif">{partner.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section id="about" className="py-24 px-6 relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-sky-500/5 blur-3xl" />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            {/* Left text */}
            <motion.div {...fadeUp}>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-600 mb-3">SOME WORDS ABOUT ESLAND</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
                Technology Partner Built For <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
                  Your Ambition
                </span>
              </h2>
              <p className="text-slate-600 text-base leading-8 mb-8 font-medium">
                Esland IT Solutions is a platform which lets you discover the best products across a wide array of categories that include Essential Electronics, Computers, Printers Appliances also software support. Esland IT Solutions was founded in 2013 by Naresh Pathi with the goal of creating Software development projects and the best online essential electronics shopping research and discovery destination. Whatever your budget or the size of your business we are here to support you and make technology simple.
              </p>

              {/* 3 Pill attributes */}
              <div className="grid grid-cols-3 gap-4">
                {['Creative', 'Impressive', 'Professional'].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-100 bg-slate-50 text-center transition hover:border-sky-500/20"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-sky-600 mb-2">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right image */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="relative flex justify-center"
            >
              <div className="relative rounded-[2.5rem] p-2 border border-slate-200/60 bg-white overflow-hidden max-w-md shadow-lg group">
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition duration-500" />
                <img
                  src="/about-image.jpg"
                  alt="Esland workspace environment"
                  className="rounded-[2.2rem] w-full object-cover aspect-[4/3] relative z-10 transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-24 px-6 relative bg-slate-50">
        <div className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-sky-500/5 blur-3xl" />
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-20">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-600 mb-3">OUR SERVICES</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Complete Customer Satisfaction
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">
              We leverage our expertise to build, protect, and optimize your business technology ecosystems.
            </p>
          </div>

          {/* Grid Layout (4 left cards, image in center, 4 right cards) */}
          <div className="grid gap-8 lg:grid-cols-[1fr_280px_1fr] items-center">
            {/* Left 4 cards */}
            <div className="space-y-6">
              {oldServices.slice(0, 4).map((service, index) => {
                const IconComp = service.icon;
                return (
                  <motion.div
                    key={index}
                    {...fadeUp}
                    className={`rounded-2xl border bg-white p-6 flex gap-5 hover:-translate-y-1 shadow-sm hover:shadow-md transition duration-300 group border-slate-100`}
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 group-hover:scale-110 transition duration-300">
                      <IconComp size={20} style={{ color: service.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{service.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Central aesthetic image banner */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="flex justify-center w-full lg:w-auto"
            >
              <div className="rounded-[2.5rem] border border-slate-200 bg-white p-2 overflow-hidden shadow-lg relative group">
                <div className="absolute inset-0 bg-slate-900/5 z-10" />
                <img
                  src="/woman-blue.jpg"
                  alt="Esland specialist support"
                  className="rounded-[2.2rem] h-[320px] sm:h-[400px] lg:h-[550px] w-full max-w-[280px] lg:w-[260px] object-cover relative z-0 transition duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Right 4 cards */}
            <div className="space-y-6">
              {oldServices.slice(4, 8).map((service, index) => {
                const IconComp = service.icon;
                return (
                  <motion.div
                    key={index}
                    {...fadeUp}
                    className={`rounded-2xl border bg-white p-6 flex gap-5 hover:-translate-y-1 shadow-sm hover:shadow-md transition duration-300 group border-slate-100`}
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 group-hover:scale-110 transition duration-300">
                      <IconComp size={20} style={{ color: service.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{service.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRANDING CTA SECTION (Dark accents to stand out) */}
      <section className="py-20 px-6 relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-y border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-sky-400 via-indigo-900 to-transparent" />
        <div className="mx-auto max-w-4xl relative z-10 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Want to <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">brand</span> your business?
            </h2>
            <p className="text-lg text-slate-350 mb-8 font-medium italic">
              &quot; we can help brand your business effectively !!! &quot;
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white hover:brightness-110 shadow-lg transition"
              >
                Get More <ArrowRight size={15} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Call us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. HAPPY CLIENTS TESTIMONIALS */}
      <section id="testimonials" className="py-24 px-6 relative bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-600 mb-3">TESTIMONIALS</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Some of Our Happy Clients
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-[280px_1fr] items-center">
            {/* Left client visual */}
            <motion.div
              {...fadeUp}
              className="flex justify-center w-full lg:w-auto"
            >
              <div className="rounded-[2.5rem] border border-slate-200 bg-white p-2 shadow-lg relative">
                <img
                  src="/chel-4.png"
                  alt="Happy customer representation"
                  className="rounded-[2.2rem] h-[260px] sm:h-[340px] w-full max-w-[280px] lg:w-[260px] object-cover opacity-95 transition duration-300"
                />
              </div>
            </motion.div>

            {/* Right testimonial slider */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-[2.5rem] border border-slate-200 bg-white p-8 sm:p-12 shadow-lg relative"
                >
                  <Quote size={40} className="text-sky-500/10 absolute right-8 top-8" />
                  <div className="flex gap-1 text-sky-400 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" className="text-amber-400" />
                    ))}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                    &quot;{testimonials[activeTestimonial].title}&quot;
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-8 mb-8 font-medium">
                    {testimonials[activeTestimonial].quote}
                  </p>
                  <div>
                    <h4 className="text-base font-bold text-slate-800">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className="text-xs text-sky-600 mt-1 uppercase tracking-wider font-semibold">
                      {testimonials[activeTestimonial].client}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider dots */}
              <div className="flex justify-center lg:justify-start gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeTestimonial === i ? 'w-6 bg-sky-500' : 'w-2 bg-slate-200 hover:bg-slate-350'
                    }`}
                    aria-label={`Testimonial slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING PLANS */}
      <section id="pricing" className="py-24 px-6 relative bg-slate-50 border-t border-slate-100">
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 h-96 w-96 rounded-full bg-sky-500/5 blur-3xl" />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-600 mb-3">OUR PRICING PLANS</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Simple &amp; Affordable Hosting
            </h2>
            <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
              Transparent, monthly rates with no hidden fees. Select a package that best fits your workspace.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...fadeUp}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`rounded-[2rem] border p-8 flex flex-col relative transition-all duration-300 group hover:-translate-y-2 bg-white ${
                  plan.popular
                    ? 'border-sky-500 shadow-xl'
                    : 'border-slate-200/80 hover:border-sky-500/30 shadow-sm'
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-4 right-4 rounded-full bg-sky-500 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                    POPULAR
                  </span>
                )}
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 my-6">
                  <span className="text-sm font-semibold text-slate-400">£</span>
                  <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-xs text-slate-500 font-medium">/Per Month</span>
                </div>
                <hr className="border-slate-100 mb-6" />
                <ul className="space-y-4 flex-1 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm text-slate-600">
                      <Check size={14} className="text-sky-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`w-full rounded-xl py-3 text-center text-xs font-bold uppercase tracking-wider transition duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:brightness-110 shadow-lg'
                      : 'border border-slate-200 text-slate-700 bg-slate-50 hover:bg-sky-50 hover:border-sky-500/30'
                  }`}
                >
                  Purchase
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT & MAP SECTION */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-sky-500/5 blur-3xl" />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-600 mb-3">GET IN TOUCH</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Have Your Say !!!
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Left column: Address & Google Maps Embed */}
            <motion.div {...fadeUp} className="space-y-6">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-md">
                <h3 className="text-xl font-bold text-slate-950 mb-6">Our Office Address</h3>
                <div className="space-y-5 text-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mailing Address</p>
                      <address className="mt-1 text-slate-650 leading-6 not-italic">
                        Suite-G, Weller House,<br />
                        58-60 Longbridge Rd,<br />
                        Barking, England, IG11 8RT.
                      </address>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone / Telephone</p>
                      <a href="tel:02038190333" className="mt-1 block text-slate-700 font-bold hover:text-sky-600 transition">
                        02038190333
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</p>
                      <a href="mailto:info@eslanditsolutions.com" className="mt-1 block text-slate-700 font-semibold hover:text-sky-600 transition break-all">
                        info@eslanditsolutions.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map IFrame */}
              <div className="rounded-[2rem] border border-slate-200 overflow-hidden h-[300px] shadow-md">
                <iframe
                  title="Esland IT Solutions Office Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.691646495486!2d0.07895821577108171!3d51.53721527964005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a66d4184d01d%3A0x4fc9c915675b5d4b!2sRadial+House%2C+3-5+Ripple+Rd%2C+Barking+IG11+7NP%2C+UK!5e0!3m2!1sen!2sin!4v1483707062936"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Right column: Message Form & girl.png layout */}
            <motion.div {...fadeUp} transition={{ delay: 0.12, duration: 0.6 }} className="space-y-6">
              <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 sm:p-10 shadow-md relative overflow-hidden">
                {/* Floating decorative image girl.png on wide screens */}
                <div className="absolute right-0 bottom-0 pointer-events-none opacity-10 w-[180px] hidden md:block">
                  <img src="/girl.png" alt="" className="w-full h-auto object-contain" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Mail className="text-sky-500" size={20} /> Drop Us a Message
                </h3>

                <form onSubmit={handleContactSubmit} className="space-y-5 relative z-10">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="form-name" className="sr-only">Name</label>
                      <input
                        id="form-name"
                        type="text"
                        required
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-2xl border border-slate-250 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-sky-500 focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="form-email" className="sr-only">Email</label>
                      <input
                        id="form-email"
                        type="email"
                        required
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-2xl border border-slate-250 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-sky-500 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="form-phone" className="sr-only">Phone Number</label>
                      <input
                        id="form-phone"
                        type="tel"
                        required
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full rounded-2xl border border-slate-250 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-sky-500 focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="form-subject" className="sr-only">Subject</label>
                      <input
                        id="form-subject"
                        type="text"
                        required
                        placeholder="Subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full rounded-2xl border border-slate-250 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-sky-500 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="form-message" className="sr-only">Message</label>
                    <textarea
                      id="form-message"
                      rows={5}
                      required
                      placeholder="Leave message here !!!"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full resize-none rounded-2xl border border-slate-250 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-sky-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={14} />
                    {loading ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER SUBSCRIBE BANNER (Dark slate overlay to contrast white layout) */}
      <section className="relative py-20 px-6 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 z-0">
          <img
            src="/banner-newsletter.jpg"
            alt="Stay updated with Esland background"
            className="w-full h-full object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <motion.div {...fadeUp}>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 flex items-center gap-3">
                <Mail className="text-sky-400" size={24} /> Stay updated with Esland
              </h2>
              <p className="text-slate-350 text-sm">Subscribe to receive the latest updates directly in your inbox.</p>
            </motion.div>

            <motion.form
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.6 }}
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md lg:ml-auto w-full"
            >
              <label htmlFor="newsletter-email" className="sr-only">Your Email Address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Your Email Address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={newsLoading}
                className="rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow hover:brightness-110 disabled:opacity-50"
              >
                {newsLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}
