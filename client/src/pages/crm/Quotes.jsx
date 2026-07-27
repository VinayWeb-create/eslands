import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Loader2, ChevronLeft, ChevronRight, Filter, X, Trash2 } from 'lucide-react';
import api from '../../lib/api';
import StatusBadge from '../../components/crm/StatusBadge';

const statusOptions = ['draft', 'sent', 'accepted', 'rejected', 'expired'];

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchQuotes = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('crm_token');
      const params = new URLSearchParams({ page, limit: 15, sort: '-createdAt' });
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      const { data } = await api.get(`/api/crm/quotes?${params}`, { headers: { Authorization: `Bearer ${token}` } });
      setQuotes(data.quotes);
      setPagination({ page: data.page, pages: data.pages, total: data.total });
    } catch (err) { console.error(err); } finally { setLoading(false); }
  }, [search, statusFilter]);

  useEffect(() => { fetchQuotes(1); }, [fetchQuotes]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this quote?')) return;
    try {
      const token = localStorage.getItem('crm_token');
      await api.delete(`/api/crm/quotes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchQuotes(pagination.page);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">Quotes</h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">{pagination.total} total quotes</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl">
        <form onSubmit={(e) => { e.preventDefault(); fetchQuotes(1); }} className="flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search by quote number or lead name..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950/80 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none transition-colors" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-none">
            <option value="">All Statuses</option>
            {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </form>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/90 shadow-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40"><Loader2 size={24} className="animate-spin text-sky-400" /></div>
        ) : quotes.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-500">No quotes found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-slate-950/50">
                  <th className="text-left py-3 px-4 font-bold text-slate-400 uppercase tracking-wider">Quote #</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-400 uppercase tracking-wider">Lead</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Service</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-400 uppercase tracking-wider">Total</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((q) => (
                  <tr key={q._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4"><Link to={`/admin-panel-xyz/quotes/${q._id}`} className="font-bold text-white hover:text-sky-300 transition-colors">{q.quoteNumber}</Link></td>
                    <td className="py-3 px-4 text-slate-300">{q.lead?.name || '—'}</td>
                    <td className="py-3 px-4 text-slate-400 hidden sm:table-cell">{q.lead?.service || '—'}</td>
                    <td className="py-3 px-4 font-semibold text-white">£{q.total?.toLocaleString()}</td>
                    <td className="py-3 px-4"><StatusBadge status={q.status} /></td>
                    <td className="py-3 px-4 text-slate-500 hidden md:table-cell">{new Date(q.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Link to={`/admin-panel-xyz/quotes/${q._id}`} className="text-sky-400 hover:text-sky-300 font-bold text-[10px] uppercase">View</Link>
                        <button onClick={() => handleDelete(q._id)} className="text-red-400/60 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
            <span className="text-[10px] text-slate-500 font-bold">Page {pagination.page} of {pagination.pages}</span>
            <div className="flex gap-2">
              <button disabled={pagination.page <= 1} onClick={() => fetchQuotes(pagination.page - 1)} className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 transition-all"><ChevronLeft size={14} /></button>
              <button disabled={pagination.page >= pagination.pages} onClick={() => fetchQuotes(pagination.page + 1)} className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 transition-all"><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
