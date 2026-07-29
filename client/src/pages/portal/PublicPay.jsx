import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, CreditCard, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import api from '../../lib/api';
import { toast } from 'react-toastify';
import Logo from '../../components/brand/Logo';

// Dynamically inject the Razorpay Checkout script in the client
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function PublicPay() {
  const { leadId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchCheckout = async () => {
    try {
      const response = await api.get(`/api/crm/payments/public-checkout/${leadId}`);
      setData(response.data);
    } catch (err) {
      console.error(err);
      toast.error('Unable to retrieve payment information.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCheckout(); }, [leadId]);

  const handlePayOnline = async () => {
    if (!data) return;
    setPaying(true);
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error('Failed to load Razorpay checkout script.');
      setPaying(false);
      return;
    }

    try {
      // 1. Create order on backend
      const { data: orderData } = await api.post('/api/crm/payments/razorpay/order', {
        leadId: data.lead.id,
        amount: data.quote.total
      });

      // Automatically resolve role (student or client)
      const resolvedRole = (data.lead.service && (
        data.lead.service.toLowerCase().includes('course') || 
        data.lead.service.toLowerCase().includes('training') ||
        data.lead.service.toLowerCase().includes('academy')
      )) ? 'student' : 'client';

      // 2. Open checkout modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Esland IT Solutions',
        description: `Enrollment - ${data.lead.service}`,
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            await api.post('/api/crm/payments/razorpay/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              leadId: data.lead.id,
              amount: data.quote.total,
              portalRole: resolvedRole
            });
            toast.success('Payment completed successfully!');
            setSuccess(true);
          } catch (err) {
            console.error(err);
            toast.error('Payment signature validation failed.');
          }
        },
        prefill: {
          name: orderData.lead.name,
          email: orderData.lead.email,
          contact: orderData.lead.phone || ''
        },
        theme: {
          color: '#0ea5e9'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      toast.error('Unable to initialize payment checkout.');
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-sky-400" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
        <div className="max-w-md p-8 rounded-3xl border border-white/10 bg-slate-900/90 text-xs space-y-4">
          <ShieldAlert size={36} className="text-red-400 mx-auto" />
          <h2 className="text-lg font-black text-white uppercase tracking-wide">Invalid Payment Request</h2>
          <p className="text-slate-400">The link you followed is invalid, or the corresponding quotation is no longer active.</p>
          <Link to="/" className="inline-block mt-4 text-sky-400 font-bold hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  const isAlreadyPaid = data.lead.status !== 'payment_pending';

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center p-6 overflow-hidden">
      {/* Background aura */}
      <div className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-gradient-to-r from-sky-500/10 to-indigo-500/10 blur-[120px] -top-20 -left-20" />
      <div className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-[120px] -bottom-20 -right-20" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl relative z-10 space-y-6"
      >
        <div className="flex flex-col items-center border-b border-white/5 pb-5">
          <Logo className="h-10 w-auto mb-4" />
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-[10px] font-bold uppercase tracking-wider text-sky-400">
            <Sparkles size={11} /> Secure Checkout Gate
          </span>
        </div>

        {success || isAlreadyPaid ? (
          <div className="text-center space-y-4 py-4">
            <CheckCircle2 size={42} className="text-emerald-400 mx-auto animate-bounce" />
            <h2 className="text-xl font-black text-white uppercase tracking-wide">Payment Completed</h2>
            <p className="text-slate-300 text-xs leading-relaxed max-w-sm mx-auto">
              Thank you! Your payment of <strong>£{data.quote.total.toLocaleString()}</strong> was verified. Your tax invoice receipt and portal account details have been emailed to <strong>{data.lead.email}</strong>.
            </p>
            <div className="pt-4">
              <Link 
                to="/portal/login" 
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-xl shadow-sky-500/25 hover:brightness-110 transition-all uppercase tracking-wider"
              >
                Log In to Portal
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400">Order Summary</h3>
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2.5 text-xs text-slate-300">
                <p><strong>Customer Name:</strong> {data.lead.name}</p>
                <p><strong>Service / Course:</strong> {data.lead.service}</p>
                <p><strong>Quotation Ref:</strong> {data.quote.quoteNumber}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400">Pricing Breakdown</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span className="text-white font-semibold">£{data.quote.subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Tax</span><span className="text-white font-semibold">£{data.quote.taxAmount.toLocaleString()}</span></div>
                <div className="flex justify-between border-t border-white/10 pt-2.5"><span className="text-white font-bold">Total Due</span><span className="text-sky-400 font-black text-lg">£{data.quote.total.toLocaleString()}</span></div>
              </div>
            </div>

            <button 
              onClick={handlePayOnline} 
              disabled={paying}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-4 text-xs font-bold text-white shadow-xl shadow-sky-500/20 hover:brightness-110 transition-all uppercase tracking-wider disabled:opacity-50 mt-6"
            >
              {paying ? <Loader2 size={15} className="animate-spin" /> : <CreditCard size={15} />}
              Authorize & Pay Online
            </button>

            <p className="text-[10px] text-slate-500 text-center">Protected by secure 256-bit SSL transaction encryption</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
