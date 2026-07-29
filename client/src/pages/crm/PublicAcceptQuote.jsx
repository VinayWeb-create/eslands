import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Loader2, CheckCircle2, ShieldAlert } from 'lucide-react';
import api from '../../lib/api';
import Logo from '../../components/brand/Logo';

export default function PublicAcceptQuote() {
  const { quoteId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing'); // processing, success, error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const acceptQuote = async () => {
      try {
        const { data } = await api.put(`/api/crm/quotes/public-accept/${quoteId}`);
        setStatus('success');
        setTimeout(() => {
          navigate(`/pay/${data.leadId}`);
        }, 1500);
      } catch (err) {
        console.error(err);
        setStatus('error');
        setErrorMsg(err.response?.data?.message || 'Unable to confirm proposal.');
      }
    };
    acceptQuote();
  }, [quoteId, navigate]);

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center p-6 overflow-hidden">
      {/* Background aura */}
      <div className="pointer-events-none absolute h-[450px] w-[450px] rounded-full bg-gradient-to-br from-sky-500/10 to-indigo-500/10 blur-[130px] -top-20 -left-20" />

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl relative z-10 text-center space-y-6">
        <div className="flex flex-col items-center">
          <Logo className="h-10 w-auto mb-4" />
        </div>

        {status === 'processing' && (
          <div className="py-6 space-y-4">
            <Loader2 size={36} className="animate-spin text-sky-400 mx-auto" />
            <h2 className="text-base font-bold text-white uppercase tracking-wide">Confirming Proposal Acceptance</h2>
            <p className="text-slate-400 text-xs">Please hold on while we register your confirmation and set up your payment details...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="py-6 space-y-4">
            <CheckCircle2 size={38} className="text-emerald-400 mx-auto animate-pulse" />
            <h2 className="text-base font-bold text-white uppercase tracking-wide">Proposal Accepted!</h2>
            <p className="text-slate-400 text-xs">Redirecting you to secure payment checkout gateway...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="py-6 space-y-4">
            <ShieldAlert size={38} className="text-red-400 mx-auto" />
            <h2 className="text-base font-bold text-white uppercase tracking-wide">Acceptance Failed</h2>
            <p className="text-slate-400 text-xs">{errorMsg || 'This link may have expired or is invalid.'}</p>
            <div className="pt-2">
              <Link to="/" className="text-sky-400 font-bold hover:underline text-xs">Go to Home Page</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
