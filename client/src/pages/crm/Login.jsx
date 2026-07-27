import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Loader2 } from 'lucide-react';
import api from '../../lib/api';

export default function CrmLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('crm_token');
  if (token) return <Navigate to="/admin-panel-xyz" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/api/crm/auth/login', { email, password });
      localStorage.setItem('crm_token', data.token);
      localStorage.setItem('crm_admin', JSON.stringify(data.admin));
      navigate('/admin-panel-xyz');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="pointer-events-none fixed left-0 top-0 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[160px]" />
      <div className="pointer-events-none fixed right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[160px]" />

      <div className="relative w-full max-w-md">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-xl shadow-sky-500/20 mb-4">
              <Shield size={24} />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-wide">CRM Access</h1>
            <p className="text-xs text-slate-400 mt-1 font-medium">Esland IT Solutions — Admin Panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="sr-only">Email</label>
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-2xl border border-white/15 bg-slate-950/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-white/15 bg-slate-950/80 px-4 py-3.5 pr-12 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none transition-colors"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-xs font-semibold bg-red-500/10 border border-red-400/20 rounded-xl p-3">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3.5 text-xs font-bold text-white shadow-xl shadow-sky-500/20 hover:brightness-110 transition-all uppercase tracking-wider disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? 'Authenticating...' : 'Access CRM'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
