import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Plus, Trash2, Save } from 'lucide-react';
import api from '../../lib/api';

export default function QuoteNew() {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [items, setItems] = useState([{ service: '', description: '', quantity: 1, unitPrice: 0 }]);
  const [taxRate, setTaxRate] = useState(20);
  const [notes, setNotes] = useState('');
  const [validDays, setValidDays] = useState(30);

  const token = localStorage.getItem('crm_token');
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const { data } = await api.get(`/api/crm/leads/${leadId}`, authHeaders);
        setLead(data);
        setItems([{ service: data.service || '', description: '', quantity: 1, unitPrice: 0 }]);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchLead();
  }, [leadId]);

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const addItem = () => setItems([...items, { service: '', description: '', quantity: 1, unitPrice: 0 }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const subtotal = items.reduce((sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0), 0);
  const taxAmount = Math.round((subtotal * taxRate) / 100 * 100) / 100;
  const total = Math.round((subtotal + taxAmount) * 100) / 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.some((item) => !item.service || !item.unitPrice)) {
      alert('Please fill in service name and unit price for all items.');
      return;
    }
    setSubmitting(true);
    try {
      const validUntil = new Date(Date.now() + validDays * 24 * 60 * 60 * 1000).toISOString();
      const processedItems = items.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
        total: Math.round((item.quantity || 1) * item.unitPrice * 100) / 100,
      }));
      const { data } = await api.post('/api/crm/quotes', {
        lead: leadId, items: processedItems, taxRate, notes, validUntil,
      }, authHeaders);
      navigate(`/admin-panel-xyz/quotes/${data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create quote.');
    } finally { setSubmitting(false); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={28} className="animate-spin text-sky-400" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all"><ArrowLeft size={18} /></button>
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wide">Create Quote</h1>
          <p className="text-sm text-slate-400 font-medium">For: {lead?.name} ({lead?.email})</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400">Line Items</h3>
            <button type="button" onClick={addItem} className="inline-flex items-center gap-1.5 rounded-xl bg-sky-500/15 border border-sky-400/30 px-3 py-1.5 text-[10px] font-bold text-sky-400 hover:bg-sky-500/25 transition-all uppercase tracking-wider">
              <Plus size={12} /> Add Item
            </button>
          </div>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="p-4 rounded-xl border border-white/5 bg-slate-950/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Item {index + 1}</span>
                  {items.length > 1 && (
                    <button type="button" onClick={() => removeItem(index)} className="text-red-400/60 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                  )}
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Service *</label>
                    <input type="text" value={item.service} onChange={(e) => updateItem(index, 'service', e.target.value)} required placeholder="e.g. Web Development" className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:border-sky-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Description</label>
                    <input type="text" value={item.description} onChange={(e) => updateItem(index, 'description', e.target.value)} placeholder="Optional detail" className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:border-sky-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Qty</label>
                    <input type="number" min="1" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)} className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-xs text-white focus:border-sky-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Unit Price (£) *</label>
                    <input type="number" min="0" step="0.01" value={item.unitPrice || ''} onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)} required placeholder="0.00" className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:border-sky-400 focus:outline-none" />
                  </div>
                </div>
                <p className="text-[10px] text-slate-600 text-right">Line total: £{((item.quantity || 0) * (item.unitPrice || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-4">Quote Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tax Rate (%)</label>
                <input type="number" min="0" max="100" value={taxRate} onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)} className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-xs text-white focus:border-sky-400 focus:outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Valid For (days)</label>
                <input type="number" min="1" value={validDays} onChange={(e) => setValidDays(parseInt(e.target.value) || 30)} className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-xs text-white focus:border-sky-400 focus:outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Notes</label>
                <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional notes for the client..." className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:border-sky-400 focus:outline-none resize-none" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-4">Totals</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span className="text-white font-semibold">£{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Tax ({taxRate}%)</span><span className="text-white font-semibold">£{taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
              <div className="flex justify-between border-t border-white/10 pt-3"><span className="text-white font-bold">Total</span><span className="text-white font-black text-lg">£{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
            </div>
            <button type="submit" disabled={submitting} className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-xl shadow-sky-500/20 hover:brightness-110 transition-all uppercase tracking-wider disabled:opacity-50">
              {submitting ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {submitting ? 'Creating...' : 'Create Quote'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
