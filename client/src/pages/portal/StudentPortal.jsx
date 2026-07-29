import { useState, useEffect } from 'react';
import { Loader2, FileDown, BookOpen, Video, FileEdit, Award, Link2, CreditCard } from 'lucide-react';
import api from '../../lib/api';
import { toast } from 'react-toastify';
import PortalLayout from '../../components/portal/PortalLayout';

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

export default function StudentPortal() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadingCertId, setDownloadingCertId] = useState(null);
  const [paying, setPaying] = useState(false);

  const token = localStorage.getItem('portal_token');

  const fetchDashboard = async () => {
    try {
      const response = await api.get('/api/portal/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data);
    } catch (err) {
      console.error(err);
      toast.error('Unable to fetch student portal stats.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  const handleDownloadCertificate = async (certId, certNumber) => {
    setDownloadingCertId(certId);
    try {
      const response = await api.get(`/api/portal/certificates/${certId}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Certificate_${certNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Certificate downloaded successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Unable to download Certificate PDF.');
    } finally {
      setDownloadingCertId(null);
    }
  };

  const handlePayOnline = async (amount) => {
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
        leadId: data.user.leadId,
        amount
      });

      // 2. Open checkout popup modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Esland IT Solutions',
        description: `Enrollment Fees - ${data.user.course}`,
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            await api.post('/api/crm/payments/razorpay/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              leadId: data.user.leadId,
              amount,
              portalRole: 'student'
            });
            toast.success('Enrollment payment successful! Verification email sent.');
            fetchDashboard();
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
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <Loader2 size={32} className="animate-spin text-sky-400" />
      </div>
    );
  }

  if (!data) return <p className="text-red-400 text-sm text-center py-10 bg-slate-950 min-h-screen">Failed to load portal data.</p>;

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">Student Academy Portal</h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">Access your curriculum, recorded videos, assignments, and certificates</p>
        </div>

        {/* Outstanding Payment Notice banner */}
        {data.user.outstandingAmount > 0 && data.user.status === 'payment_pending' && (
          <div className="rounded-3xl border border-rose-500/20 bg-rose-950/10 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-red-500/5 pointer-events-none" />
            <div className="space-y-1 relative z-10">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-[10px] font-black uppercase text-rose-400 tracking-wider mb-1 animate-pulse">Payment Action Required</span>
              <h2 className="text-lg font-black text-white">Outstanding Enrollment Fees: £{data.user.outstandingAmount.toLocaleString()}</h2>
              <p className="text-xs text-slate-400 font-semibold">Please complete your payment online to confirm your batch allocation and activate course modules.</p>
            </div>
            <button
              onClick={() => handlePayOnline(data.user.outstandingAmount)}
              disabled={paying}
              className="relative z-10 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-xl shadow-sky-500/25 hover:brightness-110 transition-all uppercase tracking-wider disabled:opacity-50"
            >
              <CreditCard size={14} /> Pay Fees Online
            </button>
          </div>
        )}

        {/* Live Classroom Banner */}
        {data.user.status !== 'payment_pending' && (
          <div className="rounded-3xl border border-sky-400/20 bg-slate-900/60 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 pointer-events-none" />
            <div className="space-y-1 relative z-10">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-black uppercase text-emerald-400 tracking-wider mb-1 animate-pulse">Class is Active</span>
              <h2 className="text-lg font-black text-white">{data.user.course}</h2>
              <p className="text-xs text-slate-400 font-semibold">Batch: {data.user.batch} | Trainer: {data.user.trainer}</p>
            </div>
            <a 
              href={data.user.classLink} 
              target="_blank" 
              rel="noreferrer" 
              className="relative z-10 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-xl shadow-sky-500/25 hover:brightness-110 transition-all uppercase tracking-wider"
            >
              <Link2 size={14} /> Enter Virtual Classroom
            </a>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Study Materials */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <BookOpen size={16} className="text-sky-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400">Study Materials</h3>
            </div>
            <div className="space-y-2.5">
              {data.studyMaterial.map((mat, i) => (
                <div key={i} className="p-3 rounded-xl border border-white/5 bg-slate-950/40 text-xs flex justify-between items-center">
                  <div className="min-w-0">
                    <p className="font-bold text-slate-200 truncate">{mat.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{mat.type} Document</p>
                  </div>
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"><FileDown size={13} /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Recorded Sessions */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <Video size={16} className="text-sky-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400">Recorded Sessions</h3>
            </div>
            <div className="space-y-2.5">
              {data.recordedVideos.map((vid, i) => (
                <div key={i} className="p-3 rounded-xl border border-white/5 bg-slate-950/40 text-xs flex justify-between items-center">
                  <div className="min-w-0">
                    <p className="font-bold text-slate-200 truncate">{vid.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Duration: {vid.duration}</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400 text-[10px] font-bold uppercase tracking-wider hover:bg-sky-500 hover:text-slate-950 hover:border-transparent transition-all">Play</button>
                </div>
              ))}
            </div>
          </div>

          {/* Assignments */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl space-y-4 md:col-span-2">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <FileEdit size={16} className="text-sky-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400">Class Assignments</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-white/10 text-slate-500">
                    <th className="py-2">Assignment</th>
                    <th className="py-2">Status</th>
                    <th className="py-2 text-right">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {data.assignments.map((ass, i) => (
                    <tr key={i} className="border-b border-white/5 text-slate-300">
                      <td className="py-3 font-bold text-white">{ass.title}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${ass.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>{ass.status}</span>
                      </td>
                      <td className="py-3 text-right font-black text-white">{ass.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Certificates Issued Section */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl space-y-4 md:col-span-2">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <Award size={16} className="text-sky-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400">Academic Certificates of Completion</h3>
            </div>
            <div className="space-y-3">
              {data.certificates && data.certificates.map((c) => (
                <div key={c._id} className="p-4 rounded-xl border border-white/5 bg-slate-950/40 text-xs flex justify-between items-center gap-3">
                  <div>
                    <p className="font-bold text-white">{c.course}</p>
                    <p className="text-slate-500 text-[10px] mt-0.5">Ref: {c.certificateNumber} | Issued: {new Date(c.issuedDate).toLocaleDateString()}</p>
                  </div>
                  <button 
                    onClick={() => handleDownloadCertificate(c._id, c.certificateNumber)}
                    disabled={downloadingCertId === c._id}
                    className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400 hover:bg-sky-500 hover:text-slate-950 hover:border-transparent transition-all flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]"
                  >
                    {downloadingCertId === c._id ? <Loader2 size={13} className="animate-spin" /> : <FileDown size={13} />}
                    Download Certificate
                  </button>
                </div>
              ))}
              {(!data.certificates || data.certificates.length === 0) && (
                <p className="text-xs text-slate-500 text-center py-6">No academic certificates issued yet. Certificates will be generated upon full curriculum completion.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
