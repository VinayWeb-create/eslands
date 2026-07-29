import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Sparkles, UserCheck } from 'lucide-react';
import Logo from '../brand/Logo';

export default function PortalLayout({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('portal_token');
  const userJson = localStorage.getItem('portal_user');
  const user = userJson ? JSON.parse(userJson) : null;

  useEffect(() => {
    if (!token || !user) {
      localStorage.removeItem('portal_token');
      localStorage.removeItem('portal_user');
      navigate('/portal/login');
    }
  }, [token, user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('portal_token');
    localStorage.removeItem('portal_user');
    navigate('/portal/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col md:flex-row">
      {/* Portal Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900/90 border-r border-white/10 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <Logo className="h-7 w-auto" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-400/20">Portal</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-sky-400 font-bold uppercase tracking-wider">
              <UserCheck size={14} /> Welcome
            </div>
            <p className="text-sm font-black text-white truncate">{user.name}</p>
            <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
            <span className="inline-block px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold uppercase text-slate-400 tracking-widest">{user.role}</span>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 space-y-4">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 hover:border-red-500/40 hover:text-red-400 bg-slate-950/30 hover:bg-red-500/10 px-4 py-2.5 text-xs font-bold transition-all uppercase tracking-wider"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
