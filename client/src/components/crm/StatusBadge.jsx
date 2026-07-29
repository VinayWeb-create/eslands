const statusConfig = {
  new: { bg: 'bg-sky-500/15', text: 'text-sky-400', border: 'border-sky-400/30', label: 'New' },
  contacted: { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-400/30', label: 'Contacted' },
  qualified: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-400/30', label: 'Qualified' },
  proposal_sent: { bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: 'border-cyan-400/30', label: 'Proposal Sent' },
  converted: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-400/30', label: 'Converted' },
  lost: { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-400/30', label: 'Lost' },
  draft: { bg: 'bg-slate-500/15', text: 'text-slate-400', border: 'border-slate-400/30', label: 'Draft' },
  sent: { bg: 'bg-sky-500/15', text: 'text-sky-400', border: 'border-sky-400/30', label: 'Sent' },
  accepted: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-400/30', label: 'Accepted' },
  rejected: { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-400/30', label: 'Rejected' },
  expired: { bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-400/30', label: 'Expired' },
  
  // New workflow statuses
  demo_scheduled: { bg: 'bg-indigo-500/15', text: 'text-indigo-400', border: 'border-indigo-400/30', label: 'Demo Scheduled' },
  demo_completed: { bg: 'bg-teal-500/15', text: 'text-teal-400', border: 'border-teal-400/30', label: 'Demo Completed' },
  quote_sent: { bg: 'bg-sky-500/15', text: 'text-sky-400', border: 'border-sky-400/30', label: 'Quote Sent' },
  payment_pending: { bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-400/30', label: 'Payment Pending' },
  project_started: { bg: 'bg-indigo-500/15', text: 'text-indigo-400', border: 'border-indigo-400/30', label: 'Project Started' },
  project_completed: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-400/30', label: 'Project Completed' },
  enrolled: { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-400/30', label: 'Enrolled' },
  fees_paid: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-400/30', label: 'Fees Paid' },
  batch_assigned: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-400/30', label: 'Batch Assigned' },
  in_progress: { bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: 'border-cyan-400/30', label: 'In Progress' },
  completed: { bg: 'bg-green-500/15', text: 'text-green-400', border: 'border-green-400/30', label: 'Completed' },
  certificate_issued: { bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-400/30', label: 'Cert Issued' }
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.new;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${config.bg} ${config.text} ${config.border}`}>
      {config.label}
    </span>
  );
}
