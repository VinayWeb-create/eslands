import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Loader2, Save, Plus, FileText, 
  Calendar, CreditCard, ShieldCheck, Award, Link2 
} from 'lucide-react';
import api from '../../lib/api';
import StatusBadge from '../../components/crm/StatusBadge';
import { toast } from 'react-toastify';

const statusOptions = [
  'new', 'contacted', 'demo_scheduled', 'demo_completed', 'quote_sent', 'payment_pending', 
  'project_started', 'project_completed', 'enrolled', 'fees_paid', 'batch_assigned', 
  'in_progress', 'completed', 'certificate_issued', 'lost'
];
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

  // Sub-modules state
  const [schedulingDemo, setSchedulingDemo] = useState(false);
  const [demoForm, setDemoForm] = useState({
    demoDate: '',
    demoTime: '',
    meetingLink: '',
    trainer: '',
    salesPerson: '',
    notes: ''
  });

  const [loggingPayment, setLoggingPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    transactionId: '',
    method: 'Credit Card',
    notes: '',
    portalRole: 'student'
  });

  const [creatingPortal, setCreatingPortal] = useState(false);
  const [manualRole, setManualRole] = useState('student');

  const [issuingCert, setIssuingCert] = useState(false);
  const [certCourse, setCertCourse] = useState('');

  const token = localStorage.getItem('crm_token');
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const fetchLead = async () => {
    try {
      const { data } = await api.get(`/api/crm/leads/${id}`, authHeaders);
      setLead(data);
      setForm({ 
        name: data.name, 
        email: data.email, 
        phone: data.phone || '', 
        service: data.service, 
        subject: data.subject || '', 
        message: data.message || '', 
        priority: data.priority, 
        lostReason: data.lostReason || '',
        company: data.company || '',
        country: data.country || ''
      });
    } catch (err) {
      console.error(err);
      toast.error('Unable to fetch lead details.');
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
      toast.success('Lead updated successfully.');
    } catch (err) { 
      console.error(err); 
      toast.error('Failed to save lead.');
    } finally { 
      setSaving(false); 
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const body = { status: newStatus };
      if (newStatus === 'lost') body.lostReason = form.lostReason || 'Not specified';
      await api.put(`/api/crm/leads/${id}/status`, body, authHeaders);
      await fetchLead();
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) { 
      console.error(err); 
      toast.error('Failed to change status.');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setAddingNote(true);
    try {
      await api.post(`/api/crm/leads/${id}/notes`, { text: noteText }, authHeaders);
      setNoteText('');
      await fetchLead();
      toast.success('Note added.');
    } catch (err) { 
      console.error(err); 
    } finally { 
      setAddingNote(false); 
    }
  };

  const handleScheduleDemo = async (e) => {
    e.preventDefault();
    if (!demoForm.demoDate || !demoForm.demoTime) {
      toast.warning('Date and Time are required.');
      return;
    }
    setSchedulingDemo(true);
    try {
      await api.post('/api/crm/demos', { leadId: id, ...demoForm }, authHeaders);
      setDemoForm({ demoDate: '', demoTime: '', meetingLink: '', trainer: '', salesPerson: '', notes: '' });
      await fetchLead();
      toast.success('Demo scheduled successfully! Confirmation email sent.');
    } catch (err) {
      console.error(err);
      toast.error('Unable to schedule demo.');
    } finally {
      setSchedulingDemo(false);
    }
  };

  const handleUpdateDemoStatus = async (demoId, newStatus) => {
    try {
      await api.put(`/api/crm/demos/${demoId}/status`, { status: newStatus }, authHeaders);
      await fetchLead();
      toast.success(`Demo status updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update demo status.');
    }
  };

  const handleLogPayment = async (e) => {
    e.preventDefault();
    if (!paymentForm.amount || isNaN(paymentForm.amount)) {
      toast.warning('Please enter a valid numeric amount.');
      return;
    }
    setLoggingPayment(true);
    try {
      await api.post('/api/crm/payments', { leadId: id, ...paymentForm }, authHeaders);
      setPaymentForm({ amount: '', transactionId: '', method: 'Credit Card', notes: '', portalRole: 'student' });
      await fetchLead();
      toast.success('Payment recorded successfully! Invoice generated & portal credentials emailed.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to record payment.');
    } finally {
      setLoggingPayment(false);
    }
  };

  const handleCreatePortalManual = async () => {
    setCreatingPortal(true);
    try {
      await api.post(`/api/crm/leads/${id}/portal`, { role: manualRole }, authHeaders);
      await fetchLead();
      toast.success('Portal account created! Credentials sent to user.');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to create portal.');
    } finally {
      setCreatingPortal(false);
    }
  };

  const handleIssueCertificate = async (e) => {
    e.preventDefault();
    if (!certCourse.trim()) return;
    setIssuingCert(true);
    try {
      await api.post('/api/crm/certificates', { studentId: lead.portalUser._id, course: certCourse }, authHeaders);
      setCertCourse('');
      await fetchLead();
      toast.success('Certificate issued successfully and emailed to student!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to issue certificate.');
    } finally {
      setIssuingCert(false);
    }
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
          {/* Lead Information Card */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-5">Lead Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Name</label><input type="text" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} /></div>
              <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email</label><input type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} /></div>
              <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Phone</label><input type="text" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} /></div>
              <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Service/Course</label><input type="text" value={form.service || ''} onChange={(e) => setForm({ ...form, service: e.target.value })} className={inputCls} /></div>
              <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Company</label><input type="text" value={form.company || ''} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputCls} /></div>
              <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Country</label><input type="text" value={form.country || ''} onChange={(e) => setForm({ ...form, country: e.target.value })} className={inputCls} /></div>
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
              <textarea rows={2} value={form.message || ''} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-xs text-white focus:border-sky-400 focus:outline-none resize-none" />
            </div>
            <button onClick={handleSave} disabled={saving} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-500/15 border border-sky-400/30 px-5 py-2.5 text-xs font-bold text-sky-400 hover:bg-sky-500/25 transition-all uppercase tracking-wider disabled:opacity-50">
              <Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {/* Module 3: Demo Management Card */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl space-y-5">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <Calendar size={16} className="text-sky-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400">Demo Meeting Scheduler</h3>
            </div>
            
            {/* Scheduled Demos List */}
            {lead.demos && lead.demos.length > 0 && (
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scheduled Demos</p>
                {lead.demos.map((d) => (
                  <div key={d._id} className="p-3.5 rounded-xl border border-white/5 bg-slate-950/40 text-xs flex flex-wrap justify-between items-center gap-3">
                    <div>
                      <p className="font-bold text-white">Date: {d.demoDate} at {d.demoTime}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">Trainer: {d.trainer || 'TBD'} | Sales: {d.salesPerson || 'TBD'}</p>
                      {d.meetingLink && <a href={d.meetingLink} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline flex items-center gap-1 mt-1 text-[11px]"><Link2 size={12} /> Join Session</a>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${d.status === 'completed' ? 'bg-emerald-500/15 text-emerald-400' : d.status === 'cancelled' ? 'bg-red-500/15 text-red-400' : 'bg-amber-500/15 text-amber-400'}`}>{d.status}</span>
                      {d.status === 'scheduled' && (
                        <div className="flex gap-1.5">
                          <button onClick={() => handleUpdateDemoStatus(d._id, 'completed')} className="px-2 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[10px] transition-all uppercase tracking-wider">Complete</button>
                          <button onClick={() => handleUpdateDemoStatus(d._id, 'cancelled')} className="px-2 py-1 rounded bg-red-500/15 border border-red-500/30 hover:bg-red-500/25 text-red-400 font-bold text-[10px] transition-all uppercase tracking-wider">Cancel</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Schedule New Demo Form */}
            <form onSubmit={handleScheduleDemo} className="space-y-4 pt-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Schedule New Session</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div><label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Demo Date</label><input type="date" value={demoForm.demoDate} onChange={(e) => setDemoForm({ ...demoForm, demoDate: e.target.value })} className={inputCls} required /></div>
                <div><label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Demo Time</label><input type="time" value={demoForm.demoTime} onChange={(e) => setDemoForm({ ...demoForm, demoTime: e.target.value })} className={inputCls} required /></div>
                <div><label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Google Meet / Zoom Link</label><input type="url" placeholder="https://meet.google.com/..." value={demoForm.meetingLink} onChange={(e) => setDemoForm({ ...demoForm, meetingLink: e.target.value })} className={inputCls} /></div>
                <div><label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Assigned Trainer</label><input type="text" placeholder="Trainer Name" value={demoForm.trainer} onChange={(e) => setDemoForm({ ...demoForm, trainer: e.target.value })} className={inputCls} /></div>
              </div>
              <button type="submit" disabled={schedulingDemo} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:brightness-110 uppercase tracking-wider disabled:opacity-50">
                {schedulingDemo ? 'Scheduling...' : 'Schedule Demo'}
              </button>
            </form>
          </div>

          {/* Module 5: Payment Tracking Card */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl space-y-5">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <CreditCard size={16} className="text-sky-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400">Payment & Transaction Ledger</h3>
            </div>

            {/* Payments List */}
            {lead.payments && lead.payments.length > 0 && (
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Payment Records</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-500">
                        <th className="py-2">Amount</th>
                        <th className="py-2">Trans ID</th>
                        <th className="py-2">Method</th>
                        <th className="py-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lead.payments.map((p) => (
                        <tr key={p._id} className="border-b border-white/5 text-slate-300">
                          <td className="py-3 font-bold text-white">£{p.amount.toLocaleString()}</td>
                          <td className="py-3 font-mono text-[11px]">{p.transactionId}</td>
                          <td className="py-3">{p.method}</td>
                          <td className="py-3 text-right">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${p.status === 'paid' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>{p.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Record New Payment Form */}
            <form onSubmit={handleLogPayment} className="space-y-4 pt-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Log Transaction Payment</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div><label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Amount (£)</label><input type="text" placeholder="1250" value={paymentForm.amount} onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })} className={inputCls} required /></div>
                <div><label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Transaction Reference ID (optional)</label><input type="text" placeholder="TXN-98213" value={paymentForm.transactionId} onChange={(e) => setPaymentForm({ ...paymentForm, transactionId: e.target.value })} className={inputCls} /></div>
                <div>
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Payment Method</label>
                  <select value={paymentForm.method} onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })} className={inputCls}>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="PayPal">PayPal</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Portal Access Role</label>
                  <select value={paymentForm.portalRole} onChange={(e) => setPaymentForm({ ...paymentForm, portalRole: e.target.value })} className={inputCls}>
                    <option value="student">Student Portal</option>
                    <option value="client">Client Portal</option>
                  </select>
                </div>
              </div>
              <button type="submit" disabled={loggingPayment} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:brightness-110 uppercase tracking-wider disabled:opacity-50">
                {loggingPayment ? 'Logging...' : 'Confirm & Log Payment'}
              </button>
            </form>
          </div>

          {/* Module 7 & 8: Portal Access & Certificate Manager Card */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl space-y-5">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <ShieldCheck size={16} className="text-sky-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400">Portal Credentials & Certificates</h3>
            </div>

            {lead.portalUser ? (
              <div className="space-y-6">
                {/* Portal account exists */}
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10 text-xs space-y-2">
                  <p className="font-bold text-emerald-400 flex items-center gap-1.5"><ShieldCheck size={14} /> Active Client/Student Account Linked</p>
                  <p className="text-slate-300"><strong>Portal Email:</strong> {lead.portalUser.email}</p>
                  <p className="text-slate-300"><strong>Assigned Role:</strong> <span className="capitalize font-bold text-white">{lead.portalUser.role}</span></p>
                  <p className="text-slate-300"><strong>User Status:</strong> <span className="capitalize text-emerald-400 font-semibold">{lead.portalUser.status}</span></p>
                </div>

                {/* If role is student: Certificate Issuer */}
                {lead.portalUser.role === 'student' && (
                  <div className="space-y-4 border-t border-white/5 pt-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400"><Award size={15} /> Academic Certificates Manager</div>
                    
                    {/* Certificates Issued List */}
                    {lead.certificates && lead.certificates.length > 0 && (
                      <div className="space-y-2.5">
                        {lead.certificates.map((c) => (
                          <div key={c._id} className="p-3 rounded-xl border border-white/5 bg-slate-950/40 text-xs flex justify-between items-center">
                            <div>
                              <p className="font-bold text-white">{c.course}</p>
                              <p className="text-slate-500 text-[10px] mt-0.5">Ref: {c.certificateNumber} | Issued: {new Date(c.issuedDate).toLocaleDateString()}</p>
                            </div>
                            <a 
                              href={`${api.defaults.baseURL || ''}/api/crm/certificates/${c._id}/pdf?token=${token}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-400/30 text-sky-400 font-bold text-[10px] transition-all uppercase tracking-wider flex items-center gap-1"
                            >
                              View PDF
                            </a>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Generate Certificate Form */}
                    <form onSubmit={handleIssueCertificate} className="space-y-3 pt-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Issue New Certificate</p>
                      <div className="flex gap-3">
                        <input 
                          type="text" 
                          placeholder="e.g. Masterclass in Cyber Security & ISO Auditing" 
                          value={certCourse} 
                          onChange={(e) => setCertCourse(e.target.value)} 
                          className="flex-1 rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none" 
                          required 
                        />
                        <button type="submit" disabled={issuingCert || !certCourse.trim()} className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:brightness-110 transition-all disabled:opacity-50 uppercase tracking-wider shrink-0">
                          <Plus size={14} /> Issue Cert
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              // No portal account exists
              <div className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">No portal user credentials exist for this client email yet. Create account access manually below, or it will be generated automatically when a payment is processed.</p>
                <div className="flex flex-wrap items-end gap-3 pt-2">
                  <div className="w-44">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Select Portal Role</label>
                    <select value={manualRole} onChange={(e) => setManualRole(e.target.value)} className={inputCls}>
                      <option value="student">Student Portal</option>
                      <option value="client">Client Portal</option>
                    </select>
                  </div>
                  <button onClick={handleCreatePortalManual} disabled={creatingPortal} className="inline-flex items-center gap-2 rounded-xl bg-sky-500/15 border border-sky-400/30 px-5 py-2.5 text-xs font-bold text-sky-400 hover:bg-sky-500/25 transition-all uppercase tracking-wider disabled:opacity-50">
                    {creatingPortal ? 'Creating Access...' : 'Create Portal Access'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Activity Notes Card */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-5">Activity Notes Log</h3>
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

        {/* Right Column details */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-4">Pipeline Status</h3>
            <div className="mb-4"><StatusBadge status={lead.status} /></div>
            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
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
