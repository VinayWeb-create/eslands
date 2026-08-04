import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, Mail, Loader2, Sparkles } from 'lucide-react';
import api from '../../lib/api';
import { toast } from 'react-toastify';
import Logo from '../../components/brand/Logo';

export default function PortalLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      const { data } = await api.post('/api/portal/login', { email, password });
      localStorage.setItem('portal_token', data.token);
      localStorage.setItem('portal_user', JSON.stringify(data.user));
      
      toast.success(`Welcome back, ${data.user.name}!`);
      
      navigate('/portal/client');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full rounded-xl border border-white/10 bg-slate-950/60 pl-11 pr-4 py-3 text-xs text-white focus:border-sky-400 focus:outline-none transition-all placeholder-slate-500";

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center p-6 overflow-hidden">
      {/* Background radial aura */}
      <div className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-gradient-to-r from-sky-500/10 to-indigo-500/10 blur-[120px] -top-20 -left-20" />
      <div className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-[120px] -bottom-20 -right-20" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <Logo className="h-10 w-auto mb-4" />
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-[10px] font-bold uppercase tracking-wider text-sky-400">
            <Sparkles size={11} /> Client Portal
          </span>
          <h2 className="text-xl font-black text-white uppercase tracking-wide mt-3 text-center">Log In</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
            <input 
              type="email" 
              placeholder="Portal Username / Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className={inputCls} 
              required 
            />
          </div>

          <div className="relative">
            <KeyRound className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={inputCls} 
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-3.5 text-xs font-bold text-white shadow-xl shadow-sky-500/20 hover:brightness-110 transition-all uppercase tracking-wider disabled:opacity-50 mt-6"
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : 'Log In to Portal'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
