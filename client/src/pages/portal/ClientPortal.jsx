import { useState, useEffect } from 'react';
import { Loader2, FileDown, Phone, Mail, FolderKanban, CheckCircle2, CreditCard } from 'lucide-react';
import api from '../../lib/api';
import { toast } from 'react-toastify';
import PortalLayout from '../../components/portal/PortalLayout';

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

export default function ClientPortal() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadingQuoteId, setDownloadingQuoteId] = useState(null);
  const [downloadingInvId, setDownloadingInvId] = useState(null);
  const [paying, setPaying] = useState(false);
  const [acceptingQuoteId, setAcceptingQuoteId] = useState(null);

  const token = localStorage.getItem('portal_token');

  const fetchDashboard = async () => {
    try {
      const response = await api.get('/api/portal/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data);
    } catch (err) {
      console.error(err);
      toast.error('Unable to fetch client portal stats.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  const handleDownloadQuote = async (quoteId, quoteNumber) => {
    setDownloadingQuoteId(quoteId);
    try {
      const response = await api.get(`/api/portal/quotes/${quoteId}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Quote_${quoteNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Quote proposal downloaded.');
    } catch (err) {
      console.error(err);
      toast.error('Unable to download Quote PDF.');
    } finally {
      setDownloadingQuoteId(null);
    }
  };

  const handleDownloadInvoice = async (invoiceId, invoiceNumber) => {
    setDownloadingInvId(invoiceId);
    try {
      const response = await api.get(`/api/portal/invoices/${invoiceId}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Invoice_${invoiceNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Invoice downloaded.');
    } catch (err) {
      console.error(err);
      toast.error('Unable to download Invoice PDF.');
    } finally {
      setDownloadingInvId(null);
    }
  };

  const handleAcceptQuote = async (quoteId) => {
    setAcceptingQuoteId(quoteId);
    try {
      await api.put(`/api/portal/quotes/${quoteId}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Proposal accepted! Checkout link has been emailed to you.');
      fetchDashboard();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to accept proposal.');
    } finally {
      setAcceptingQuoteId(null);
    }
  };

  const handlePayOnline = async (amount, quoteNumber) => {
    setPaying(true);
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error('Failed to load Razorpay checkout script.');
      setPaying(false);
      return;
    }

    try {
      // 1. Initialize Razorpay order on backend
      const { data: orderData } = await api.post('/api/crm/payments/razorpay/order', {
        leadId: data.user.leadId,
        amount
      });

      // 2. Open Razorpay payment checkout popup modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Esland IT Solutions',
        description: `Quote payment - ${quoteNumber}`,
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            await api.post('/api/crm/payments/razorpay/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              leadId: data.user.leadId,
              amount,
              portalRole: 'client'
            });
            toast.success('Payment completed successfully! Invoice generated.');
            fetchDashboard();
          } catch (err) {
            console.error(err);
            toast.error('Payment signature verification failed.');
          }
        },
        prefill: {
          name: orderData.lead.name,
          email: orderData.lead.email,
          contact: orderData.lead.phone || ''
        },
        theme: {
          color: '#0ea5e9' // custom brand sky color
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
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <Loader2 size={32} className="animate-spin text-sky-400" />
      </div>
    );
  }

  if (!data) return <p className="text-red-400 text-sm text-center py-10 bg-slate-950 min-h-screen">Failed to load portal data.</p>;

  // Project progress mapping
  const steps = [
    { key: 'quote_sent', label: 'Proposal Sent' },
    { key: 'payment_pending', label: 'Payment Review' },
    { key: 'project_started', label: 'Project Active' },
    { key: 'project_completed', label: 'Completed' }
  ];

  const currentStepIndex = steps.findIndex(s => s.key === data.user.status);

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">Client Workspace</h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">Manage your active contracts, quotes, and billing</p>
        </div>

        {/* Project Pipeline Card */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <FolderKanban size={16} className="text-sky-400" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400">Project Telemetry: {data.user.project}</h3>
          </div>

          {/* Progress Timeline Nodes */}
          <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2">
            {steps.map((step, idx) => {
              const isPast = idx <= currentStepIndex;
              const isActive = idx === currentStepIndex;
              return (
                <div key={step.key} className="flex items-center gap-3 sm:flex-col sm:text-center flex-1 w-full">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center border font-bold text-xs transition-all ${
                    isActive ? 'bg-sky-500 border-sky-400 text-slate-950 shadow-lg shadow-sky-500/20' : 
                    isPast ? 'bg-slate-950 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-white/10 text-slate-500'
                  }`}>
                    {isPast && !isActive ? <CheckCircle2 size={14} /> : idx + 1}
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${isActive ? 'text-sky-400' : isPast ? 'text-slate-200' : 'text-slate-500'}`}>{step.label}</p>
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">{step.key.replace('_', ' ')}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quotes Section */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-5">Proposals & Quotations</h3>
            <div className="space-y-3">
              {data.quotes && data.quotes.map((q) => (
                <div key={q._id} className="p-4 rounded-xl border border-white/5 bg-slate-950/40 text-xs flex justify-between items-center gap-3">
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate">{q.quoteNumber}</p>
                    <p className="text-slate-400 mt-1 font-semibold">£{q.total?.toLocaleString()}</p>
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider mt-1.5 ${q.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-400'}`}>{q.status}</span>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button 
                      onClick={() => handleDownloadQuote(q._id, q.quoteNumber)}
                      disabled={downloadingQuoteId === q._id}
                      className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400 hover:bg-sky-500 hover:text-slate-950 hover:border-transparent transition-all flex items-center gap-1 font-bold uppercase text-[10px]"
                    >
                      {downloadingQuoteId === q._id ? <Loader2 size={12} className="animate-spin" /> : <FileDown size={12} />}
                      Proposal
                    </button>
                    {q.status === 'sent' && (
                      <button
                        onClick={() => handleAcceptQuote(q._id)}
                        disabled={acceptingQuoteId === q._id}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[10px] transition-all uppercase tracking-wider flex items-center gap-1.5"
                      >
                        {acceptingQuoteId === q._id ? <Loader2 size={12} className="animate-spin" /> : 'Accept Proposal'}
                      </button>
                    )}
                    {q.status === 'accepted' && data.user.status === 'payment_pending' && (
                      <button
                        onClick={() => handlePayOnline(q.total, q.quoteNumber)}
                        disabled={paying}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 hover:brightness-110 text-white font-bold text-[10px] transition-all uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-sky-500/10"
                      >
                        <CreditCard size={12} /> Pay Online
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {(!data.quotes || data.quotes.length === 0) && (
                <p className="text-xs text-slate-500 text-center py-6">No proposals generated yet.</p>
              )}
            </div>
          </div>

          {/* Invoices Section */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-5">Billing Invoices</h3>
            <div className="space-y-3">
              {data.invoices && data.invoices.map((inv) => (
                <div key={inv._id} className="p-4 rounded-xl border border-white/5 bg-slate-950/40 text-xs flex justify-between items-center gap-3">
                  <div>
                    <p className="font-bold text-white">{inv.invoiceNumber}</p>
                    <p className="text-slate-400 mt-1 font-semibold">Total Paid: £{inv.total?.toLocaleString()}</p>
                    <p className="text-slate-500 text-[10px] mt-1.5">Issued: {new Date(inv.issuedAt).toLocaleDateString()}</p>
                  </div>
                  <button 
                    onClick={() => handleDownloadInvoice(inv._id, inv.invoiceNumber)}
                    disabled={downloadingInvId === inv._id}
                    className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 hover:border-transparent transition-all flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]"
                  >
                    {downloadingInvId === inv._id ? <Loader2 size={13} className="animate-spin" /> : <FileDown size={13} />}
                    Download Receipt
                  </button>
                </div>
              ))}
              {(!data.invoices || data.invoices.length === 0) && (
                <p className="text-xs text-slate-500 text-center py-6">No invoices registered yet.</p>
              )}
            </div>
          </div>

          {/* Support Info Card */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400">Technical Project Support</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Need modifications to your current service deliverables or want to schedule a check-in call with your software developer lead? Get in touch with our helpdesk team directly:</p>
            <div className="flex flex-wrap gap-5 text-xs text-slate-300">
              <div className="flex items-center gap-2 font-bold"><Mail size={14} className="text-sky-400" /> {data.supportContact.email}</div>
              <div className="flex items-center gap-2 font-bold"><Phone size={14} className="text-sky-400" /> {data.supportContact.phone}</div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
