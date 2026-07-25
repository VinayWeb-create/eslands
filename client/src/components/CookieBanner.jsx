import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookieConsent');
    if (!accepted) setVisible(true);
  }, []);

  const handleDecision = (value) => {
    localStorage.setItem('cookieConsent', value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-3xl border border-white/10 bg-surface/95 p-5 shadow-glow backdrop-blur-xl sm:left-8 sm:right-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-sm leading-6 text-slate-200">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
          <a href="https://eslanditsolutions.com/privacy-policy" target="_blank" rel="noreferrer" className="text-cyan-300 underline hover:text-cyan-100">
            Learn more
          </a>
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => handleDecision('decline')} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-white">
            Decline
          </button>
          <button type="button" onClick={() => handleDecision('accept')} className="rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
