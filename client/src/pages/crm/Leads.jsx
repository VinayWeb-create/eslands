import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Loader2, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';
import api from '../../lib/api';
import StatusBadge from '../../components/crm/StatusBadge';

const priorityColors = { low: 'text-slate-400', medium: 'text-sky-400', high: 'text-amber-400', urgent: 'text-red-400' };
const statusOptions = ['new', 'contacted', 'qualified', 'proposal_sent', 'converted', 'lost'];
const priorityOptions = ['low', 'medium', 'high', 'urgent'];

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchLeads = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('crm_token');
      const params = new URLSearchParams({ page, limit: 15, sort: '-createdAt' });
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      if (priorityFilter) params.set('priority', priorityFilter);
      const { data } = await api.get(`/api/crm/leads?${params}`, { headers: { Authorization: `Bearer ${token}` } });
      setLeads(data.leads);
      setPagination({ page: data.page, pages: data.pages, total: data.total });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, priorityFilter]);

  useEffect(() => { fetchLeads(1); }, [fetchLeads]);

  const handleSearch = (e) => { e.preventDefault(); fetchLeads(1); };
  const clearFilters = () => { setSearch(''); setStatusFilter(''); setPriorityFilter(''); };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">Leads</h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">{pagination.total} total leads</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-sky-500/20 hover:brightness-110 transition-all uppercase tracking-wider"
        >
          <Plus size={15} /> New Lead
        </button>
      </div>

      {/* Search & Filters */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950/80 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none transition-colors"
            />
          </div>
          <button type="button" onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${showFilters ? 'border-sky-400/40 bg-sky-500/10 text-sky-400' : 'border-white/10 bg-slate-950/80 text-slate-400 hover:text-white'}`}>
            <Filter size={14} /> Filters
          </button>
        </form>
        {showFilters && (
          <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-white/10">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-none">
              <option value="">All Statuses</option>
              {statusOptions.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
            </select>
            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-none">
              <option value="">All Priorities</option>
              {priorityOptions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            {(statusFilter || priorityFilter || search) && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-bold"><X size={13} /> Clear</button>
            )}
          </div>
        )}
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/90 shadow-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40"><Loader2 size={24} className="animate-spin text-sky-400" /></div>
        ) : leads.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-500">No leads found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-slate-950/50">
                  <th className="text-left py-3 px-4 font-bold text-slate-400 uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Service</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell">Priority</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Source</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <Link to={`/admin-panel-xyz/leads/${lead._id}`} className="block">
                        <p className="font-bold text-white hover:text-sky-300 transition-colors">{lead.name}</p>
                        <p className="text-slate-500 text-[10px] truncate max-w-[200px]">{lead.email}</p>
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-slate-300 hidden sm:table-cell">{lead.service}</td>
                    <td className="py-3 px-4"><StatusBadge status={lead.status} /></td>
                    <td className="py-3 px-4 hidden md:table-cell"><span className={`font-bold capitalize ${priorityColors[lead.priority]}`}>{lead.priority}</span></td>
                    <td className="py-3 px-4 text-slate-500 capitalize hidden lg:table-cell">{lead.source.replace('_', ' ')}</td>
                    <td className="py-3 px-4 text-slate-500 hidden lg:table-cell">{new Date(lead.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
            <span className="text-[10px] text-slate-500 font-bold">Page {pagination.page} of {pagination.pages}</span>
            <div className="flex gap-2">
              <button disabled={pagination.page <= 1} onClick={() => fetchLeads(pagination.page - 1)} className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"><ChevronLeft size={14} /></button>
              <button disabled={pagination.page >= pagination.pages} onClick={() => fetchLeads(pagination.page + 1)} className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </div>

      {showCreateModal && <CreateLeadModal onClose={() => setShowCreateModal(false)} onCreated={() => { setShowCreateModal(false); fetchLeads(1); }} />}
    </div>
  );
}

function CreateLeadModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: 'General Inquiry', subject: '', message: '', priority: 'medium' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('crm_token');
      await api.post('/api/crm/leads', form, { headers: { Authorization: `Bearer ${token}` } });
      onCreated();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create lead.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-black text-white uppercase tracking-wide mb-4">Create New Lead</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input type="text" placeholder="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none" />
            <input type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input type="text" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none" />
            <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-xs text-white focus:border-sky-400 focus:outline-none">
              <option>General Inquiry</option>
              <option>Web Development</option>
              <option>Mobile Development</option>
              <option>Software Development</option>
              <option>Networking & Infrastructure</option>
              <option>Professional Naming</option>
              <option>Branding & Identity</option>
              <option>2D Animation & Motion</option>
              <option>E-commerce Platforms</option>
              <option>SEO & Growth Marketing</option>
              <option>System Modernization</option>
              <option>Logo & Brand Systems</option>
              <option>Social Media Marketing</option>
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input type="text" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none" />
            <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-xs text-white focus:border-sky-400 focus:outline-none">
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <textarea placeholder="Message" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none resize-none" />
          {error && <p className="text-red-400 text-xs font-semibold bg-red-500/10 border border-red-400/20 rounded-xl p-3">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-white/15 bg-slate-950/80 px-4 py-3 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all uppercase tracking-wider">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-3 text-xs font-bold text-white shadow-lg hover:brightness-110 transition-all uppercase tracking-wider disabled:opacity-50">{loading ? 'Creating...' : 'Create Lead'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
