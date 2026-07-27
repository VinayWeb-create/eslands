import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, TrendingUp, PoundSterling, ArrowUpRight, Clock, Loader2 } from 'lucide-react';
import api from '../../lib/api';
import StatusBadge from '../../components/crm/StatusBadge';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('crm_token');
        const { data } = await api.get('/api/crm/dashboard/stats', { headers: { Authorization: `Bearer ${token}` } });
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={28} className="animate-spin text-sky-400" />
      </div>
    );
  }

  if (!stats) return <p className="text-red-400 text-sm">Failed to load dashboard data.</p>;

  const statCards = [
    { label: 'Total Leads', value: stats.leads.total, icon: Users, color: 'from-sky-500 to-blue-600', detail: `${stats.leads.new} new` },
    { label: 'Active Quotes', value: stats.quotes.total, icon: FileText, color: 'from-purple-500 to-indigo-600', detail: `${stats.quotes.sent} sent` },
    { label: 'Conversion Rate', value: `${stats.conversionRate}%`, icon: TrendingUp, color: 'from-emerald-500 to-teal-600', detail: `${stats.leads.converted} converted` },
    { label: 'Revenue Won', value: `£${stats.revenue.total.toLocaleString()}`, icon: PoundSterling, color: 'from-amber-500 to-orange-600', detail: `£${stats.revenue.pending.toLocaleString()} pending` },
  ];

  const statusBreakdown = [
    { key: 'new', count: stats.leads.new, color: 'bg-sky-500' },
    { key: 'contacted', count: stats.leads.contacted, color: 'bg-purple-500' },
    { key: 'qualified', count: stats.leads.qualified, color: 'bg-amber-500' },
    { key: 'proposal_sent', count: stats.leads.proposal, color: 'bg-cyan-500' },
    { key: 'converted', count: stats.leads.converted, color: 'bg-emerald-500' },
    { key: 'lost', count: stats.leads.lost, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1 font-medium">CRM overview and performance metrics</p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-white`}>
                <card.icon size={18} />
              </div>
              <ArrowUpRight size={14} className="text-slate-500" />
            </div>
            <p className="text-2xl font-black text-white">{card.value}</p>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{card.label}</p>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">{card.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Lead Status Breakdown */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-5">Lead Pipeline</h3>
          <div className="space-y-3">
            {statusBreakdown.map((item) => {
              const pct = stats.leads.total > 0 ? Math.round((item.count / stats.leads.total) * 100) : 0;
              return (
                <div key={item.key}>
                  <div className="flex items-center justify-between mb-1">
                    <StatusBadge status={item.key} />
                    <span className="text-xs font-bold text-white">{item.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className={`h-full rounded-full ${item.color} transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400">Recent Leads</h3>
            <Link to="/admin-panel-xyz/leads" className="text-[10px] font-bold text-sky-400 hover:text-sky-300 uppercase tracking-wider">View All</Link>
          </div>
          <div className="space-y-3">
            {stats.recentLeads.map((lead) => (
              <Link
                key={lead._id}
                to={`/admin-panel-xyz/leads/${lead._id}`}
                className="flex items-center justify-between p-3 rounded-xl border border-white/5 hover:bg-white/5 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{lead.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{lead.service}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={lead.status} />
                  <Clock size={12} className="text-slate-600" />
                </div>
              </Link>
            ))}
            {stats.recentLeads.length === 0 && <p className="text-xs text-slate-500 text-center py-4">No leads yet.</p>}
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400">Recent Quotes</h3>
            <Link to="/admin-panel-xyz/quotes" className="text-[10px] font-bold text-sky-400 hover:text-sky-300 uppercase tracking-wider">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 px-3 font-bold text-slate-400 uppercase tracking-wider">Quote #</th>
                  <th className="text-left py-2 px-3 font-bold text-slate-400 uppercase tracking-wider">Lead</th>
                  <th className="text-left py-2 px-3 font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                  <th className="text-left py-2 px-3 font-bold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentQuotes.map((q) => (
                  <tr key={q._id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-3 font-bold text-white">{q.quoteNumber}</td>
                    <td className="py-3 px-3 text-slate-300">{q.lead?.name || '—'}</td>
                    <td className="py-3 px-3 text-white font-semibold">£{q.total?.toLocaleString()}</td>
                    <td className="py-3 px-3"><StatusBadge status={q.status} /></td>
                  </tr>
                ))}
                {stats.recentQuotes.length === 0 && (
                  <tr><td colSpan={4} className="py-4 text-center text-slate-500">No quotes yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
