import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookieConsent');
    if (!accepted) setVisible(true);
  }, []);

  const handleDecision = (value: string) => {
    localStorage.setItem('cookieConsent', value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-3xl border border-white/10 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-xl sm:left-8 sm:right-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-sm leading-6 text-slate-200">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
          <a href="https://eslanditsolutions.com/privacy-policy" target="_blank" rel="noreferrer" className="text-sky-300 underline hover:text-sky-100">
            Learn more
          </a>
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => handleDecision('decline')} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-300 hover:text-white">
            Decline
          </button>
          <button type="button" onClick={() => handleDecision('accept')} className="rounded-full bg-gradient-to-r from-sky-400 to-indigo-600 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
