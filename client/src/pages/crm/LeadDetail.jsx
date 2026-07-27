import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Save, Plus, FileText } from 'lucide-react';
import api from '../../lib/api';
import StatusBadge from '../../components/crm/StatusBadge';

const statusOptions = ['new', 'contacted', 'qualified', 'proposal_sent', 'converted', 'lost'];
const priorityOptions = ['low', 'medium', 'high', 'urgent'];

export default function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [form, setForm] = useState({});

  const token = localStorage.getItem('crm_token');
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const fetchLead = async () => {
    try {
      const { data } = await api.get(`/api/crm/leads/${id}`, authHeaders);
      setLead(data);
      setForm({ name: data.name, email: data.email, phone: data.phone || '', service: data.service, subject: data.subject || '', message: data.message || '', priority: data.priority, lostReason: data.lostReason || '' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLead(); }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/api/crm/leads/${id}`, form, authHeaders);
      await fetchLead();
    } catch (err) { console.error(err); } finally { setSaving(false); }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const body = { status: newStatus };
      if (newStatus === 'lost') body.lostReason = form.lostReason || 'Not specified';
      await api.put(`/api/crm/leads/${id}/status`, body, authHeaders);
      await fetchLead();
    } catch (err) { console.error(err); }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setAddingNote(true);
    try {
      await api.post(`/api/crm/leads/${id}/notes`, { text: noteText }, authHeaders);
      setNoteText('');
      await fetchLead();
    } catch (err) { console.error(err); } finally { setAddingNote(false); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={28} className="animate-spin text-sky-400" /></div>;
  if (!lead) return <p className="text-red-400 text-sm">Lead not found.</p>;

  const inputCls = "mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-xs text-white focus:border-sky-400 focus:outline-none";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all"><ArrowLeft size={18} /></button>
        <div className="flex-1">
          <h1 className="text-2xl font-black text-white uppercase tracking-wide">{lead.name}</h1>
          <p className="text-sm text-slate-400 font-medium">{lead.email}</p>
        </div>
        <Link to={`/admin-panel-xyz/quotes/new/${lead._id}`} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-sky-500/20 hover:brightness-110 transition-all uppercase tracking-wider">
          <FileText size={14} /> Create Quote
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-5">Lead Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Name</label><input type="text" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} /></div>
              <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email</label><input type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} /></div>
              <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Phone</label><input type="text" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} /></div>
              <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Service</label><input type="text" value={form.service || ''} onChange={(e) => setForm({ ...form, service: e.target.value })} className={inputCls} /></div>
              <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Subject</label><input type="text" value={form.subject || ''} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputCls} /></div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Priority</label>
                <select value={form.priority || 'medium'} onChange={(e) => setForm({ ...form, priority: e.target.value })} className={inputCls}>
                  {priorityOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Message</label>
              <textarea rows={3} value={form.message || ''} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-xs text-white focus:border-sky-400 focus:outline-none resize-none" />
            </div>
            <button onClick={handleSave} disabled={saving} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-500/15 border border-sky-400/30 px-5 py-2.5 text-xs font-bold text-sky-400 hover:bg-sky-500/25 transition-all uppercase tracking-wider disabled:opacity-50">
              <Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-5">Activity Notes</h3>
            <form onSubmit={handleAddNote} className="flex gap-3 mb-5">
              <input type="text" placeholder="Add a note..." value={noteText} onChange={(e) => setNoteText(e.target.value)} className="flex-1 rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none" />
              <button type="submit" disabled={addingNote || !noteText.trim()} className="inline-flex items-center gap-1.5 rounded-xl bg-sky-500/15 border border-sky-400/30 px-4 py-2.5 text-xs font-bold text-sky-400 hover:bg-sky-500/25 transition-all disabled:opacity-50">
                <Plus size={14} /> Add
              </button>
            </form>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {[...lead.notes].reverse().map((note, i) => (
                <div key={i} className="p-3 rounded-xl border border-white/5 bg-slate-950/40">
                  <p className="text-xs text-slate-300">{note.text}</p>
                  <p className="text-[10px] text-slate-600 mt-1.5">{new Date(note.createdAt).toLocaleString()}</p>
                </div>
              ))}
              {lead.notes.length === 0 && <p className="text-xs text-slate-500 text-center py-4">No notes yet.</p>}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-4">Status</h3>
            <div className="mb-4"><StatusBadge status={lead.status} /></div>
            <div className="space-y-2">
              {statusOptions.map((s) => (
                <button key={s} onClick={() => handleStatusChange(s)} className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all border ${lead.status === s ? 'bg-sky-500/15 text-sky-400 border-sky-400/30' : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'}`}>
                  {s.replace('_', ' ')}
                </button>
              ))}
            </div>
            {lead.status === 'lost' && (
              <div className="mt-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lost Reason</label>
                <textarea rows={2} value={form.lostReason || ''} onChange={(e) => setForm({ ...form, lostReason: e.target.value })} className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-xs text-white focus:border-sky-400 focus:outline-none resize-none" />
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-4">Details</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Source</span><span className="text-white font-semibold capitalize">{lead.source.replace('_', ' ')}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Created</span><span className="text-white font-semibold">{new Date(lead.createdAt).toLocaleDateString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Updated</span><span className="text-white font-semibold">{new Date(lead.updatedAt).toLocaleDateString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
