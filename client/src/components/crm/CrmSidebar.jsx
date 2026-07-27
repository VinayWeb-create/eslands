import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, LogOut, ChevronLeft, Shield } from 'lucide-react';

const links = [
  { to: '/admin-panel-xyz', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin-panel-xyz/leads', icon: Users, label: 'Leads' },
  { to: '/admin-panel-xyz/quotes', icon: FileText, label: 'Quotes' },
];

export default function CrmSidebar({ collapsed, setCollapsed }) {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('crm_token');
    localStorage.removeItem('crm_admin');
    window.location.href = '/admin-panel-xyz/login';
  };

  return (
    <aside className={`fixed left-0 top-0 h-full z-40 bg-slate-950 border-r border-white/10 transition-all duration-300 flex flex-col ${collapsed ? 'w-[68px]' : 'w-60'}`}>
      <div className={`flex items-center gap-3 px-4 h-16 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 text-white">
          <Shield size={16} />
        </div>
        {!collapsed && <span className="text-sm font-bold text-white tracking-wide">CRM Panel</span>}
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              } ${collapsed ? 'justify-center' : ''}`
            }
          >
            <link.icon size={17} />
            {!collapsed && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="px-2 pb-4 space-y-2">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-400/20 transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={17} />
          {!collapsed && <span>Logout</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all"
        >
          <ChevronLeft size={16} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </aside>
  );
}
