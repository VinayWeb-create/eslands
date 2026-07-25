import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const serviceLinks = [
  { label: 'Web Development', href: '/services#web-development' },
  { label: 'Mobile Development', href: '/services#mobile-development' },
  { label: 'Software Development', href: '/services#software-development' },
  { label: 'SEO & Marketing', href: '/services#seo-marketing' },
  { label: 'Website Redesign', href: '/services#redesign' },
  { label: 'Logo Design', href: '/services#logo-design' },
  { label: 'E-commerce Solutions', href: '/services#ecommerce' },
  { label: 'Social Media Marketing', href: '/services#social-media' },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600">
      {/* Main Footer Columns */}
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 sm:px-10 lg:grid-cols-4 lg:px-14">
        {/* Col 1: About */}
        <div className="space-y-5">
          <div className="flex items-center">
            <img src="/image.png" alt="Esland IT Solutions" className="h-16 w-auto object-contain" />
          </div>
          <p className="text-sm leading-7 text-slate-600">
            Esland IT Solutions was founded in 2013 by Naresh Pathi, providing software development, web design, and the best online IT solutions for businesses worldwide.
          </p>
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
               className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-500 transition hover:border-sky-500/40 hover:bg-sky-50 hover:text-sky-600">
              <Facebook size={14} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
               className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-500 transition hover:border-sky-500/40 hover:bg-sky-50 hover:text-sky-600">
              <Twitter size={14} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
               className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-500 transition hover:border-sky-500/40 hover:bg-sky-50 hover:text-sky-600">
              <Linkedin size={14} />
            </a>
          </div>
        </div>

        {/* Col 2: Services */}
        <div>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Our Services</h3>
          <ul className="space-y-3 text-sm">
            {serviceLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.href} className="transition hover:text-sky-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Quick Links */}
        <div>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.href} className="transition hover:text-sky-600">
                  {item.label}
                </Link>
              </li>
            ))}
            <li><a href="#" className="transition hover:text-sky-600">Privacy Policy</a></li>
            <li><a href="#" className="transition hover:text-sky-600">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Col 4: Contact + Newsletter */}
        <div className="space-y-6">
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-sky-600" />
                <span>Suite-G, Weller House,<br />58-60 Longbridge Rd,<br />Barking, London, IG11 8RT.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="flex-shrink-0 text-sky-600" />
                <a href="tel:02038190333" className="transition hover:text-sky-600">02038190333</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="flex-shrink-0 text-sky-600" />
                <a href="mailto:info@eslanditsolutions.com" className="break-all transition hover:text-sky-600">info@eslanditsolutions.com</a>
              </div>
            </div>
          </div>

          {/* Newsletter micro-form */}
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Newsletter</h4>
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); e.target.reset(); }}>
              <input
                type="email"
                required
                placeholder="Your email"
                className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:brightness-110"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 py-4 text-center text-xs text-slate-600 sm:flex-row sm:justify-between sm:px-10 lg:px-14">
          <p>copyright &copy; Esland IT Solutions. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#" className="transition hover:text-slate-900">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="transition hover:text-slate-900">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
