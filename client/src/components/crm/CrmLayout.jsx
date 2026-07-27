import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import CrmSidebar from './CrmSidebar';

export default function CrmLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const token = localStorage.getItem('crm_token');

  if (!token) return <Navigate to="/admin-panel-xyz/login" replace />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <CrmSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`transition-all duration-300 ${collapsed ? 'ml-[68px]' : 'ml-60'}`}>
        <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
