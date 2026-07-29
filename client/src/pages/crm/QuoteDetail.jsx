import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Save, FileDown, Mail } from 'lucide-react';
import api from '../../lib/api';
import StatusBadge from '../../components/crm/StatusBadge';
import { toast } from 'react-toastify';

const statusOptions = ['draft', 'sent', 'accepted', 'rejected', 'expired'];

export default function QuoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [emailing, setEmailing] = useState(false);

  const token = localStorage.getItem('crm_token');
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const fetchQuote = async () => {
    try {
      const { data } = await api.get(`/api/crm/quotes/${id}`, authHeaders);
      setQuote(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchQuote(); }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      await api.put(`/api/crm/quotes/${id}/status`, { status: newStatus }, authHeaders);
      await fetchQuote();
      toast.success(`Quote status updated to ${newStatus}`);
    } catch (err) { console.error(err); }
  };

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const response = await api.get(`/api/crm/quotes/${id}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Quote_${quote.quoteNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Quote PDF downloaded.');
    } catch (err) {
      console.error(err);
      toast.error('Unable to download PDF.');
    } finally {
      setDownloading(false);
    }
  };

  const handleEmailQuote = async () => {
    setEmailing(true);
    try {
      await api.post(`/api/crm/quotes/${id}/email`, {}, authHeaders);
      toast.success('Proposal emailed successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Unable to email proposal.');
    } finally {
      setEmailing(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={28} className="animate-spin text-sky-400" /></div>;
  if (!quote) return <p className="text-red-400 text-sm">Quote not found.</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all"><ArrowLeft size={18} /></button>
        <div className="flex-1">
          <h1 className="text-2xl font-black text-white uppercase tracking-wide">{quote.quoteNumber}</h1>
          <p className="text-sm text-slate-400 font-medium">Lead: {quote.lead?.name || '—'} | {quote.lead?.email || ''}</p>
        </div>
        <StatusBadge status={quote.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-5">Quote Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 font-bold text-slate-400 uppercase tracking-wider">Service</th>
                    <th className="text-left py-2 px-3 font-bold text-slate-400 uppercase tracking-wider">Description</th>
                    <th className="text-right py-2 px-3 font-bold text-slate-400 uppercase tracking-wider">Qty</th>
                    <th className="text-right py-2 px-3 font-bold text-slate-400 uppercase tracking-wider">Unit Price</th>
                    <th className="text-right py-2 px-3 font-bold text-slate-400 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {quote.items.map((item, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-3 px-3 text-white font-semibold">{item.service}</td>
                      <td className="py-3 px-3 text-slate-400">{item.description || '—'}</td>
                      <td className="py-3 px-3 text-right text-slate-300">{item.quantity}</td>
                      <td className="py-3 px-3 text-right text-slate-300">£{item.unitPrice?.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right text-white font-semibold">£{item.total?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-4">Notes</h3>
            <p className="text-xs text-slate-300 whitespace-pre-wrap">{quote.notes || 'No notes.'}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-4">Summary</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span className="text-white font-semibold">£{quote.subtotal?.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Tax ({quote.taxRate}%)</span><span className="text-white font-semibold">£{quote.taxAmount?.toLocaleString()}</span></div>
              <div className="flex justify-between border-t border-white/10 pt-3"><span className="text-white font-bold">Total</span><span className="text-white font-black text-lg">£{quote.total?.toLocaleString()}</span></div>
            </div>
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Created</span><span className="text-white font-semibold">{new Date(quote.createdAt).toLocaleDateString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Valid Until</span><span className="text-white font-semibold">{quote.validUntil ? new Date(quote.validUntil).toLocaleDateString() : '—'}</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400">Actions</h3>
            <button
              onClick={handleDownloadPDF}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:brightness-110 uppercase tracking-wider"
              disabled={downloading}
            >
              {downloading ? <Loader2 size={14} className="animate-spin" /> : <FileDown size={14} />}
              Download PDF
            </button>
            <button
              onClick={handleEmailQuote}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 transition-all uppercase tracking-wider"
              disabled={emailing}
            >
              {emailing ? <Loader2 size={14} className="animate-spin" /> : <Mail size={14} />}
              Email Proposal
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-4">Update Status</h3>
            <div className="space-y-2">
              {statusOptions.map((s) => (
                <button key={s} onClick={() => handleStatusChange(s)} className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all border ${quote.status === s ? 'bg-sky-500/15 text-sky-400 border-sky-400/30' : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
