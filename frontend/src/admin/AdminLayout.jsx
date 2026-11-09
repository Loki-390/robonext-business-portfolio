import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Inbox, 
  BookOpen, 
  Layers, 
  Cpu, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  Sparkles, 
  Activity,
  ShieldCheck,
  Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <Cpu className="w-8 h-8 text-cyan-400 animate-spin" />
          <span className="font-semibold text-lg">Loading Administration Portal...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'School Enquiries', path: '/admin/enquiries', icon: Inbox },
    { name: 'Programmes Manager', path: '/admin/programmes', icon: BookOpen },
    { name: 'Project Portfolio', path: '/admin/projects', icon: Layers },
    { name: 'Automations & Logs', path: '/admin/automations', icon: Activity }
  ];

  const isCurrent = (p) => {
    if (p === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(p);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-800">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-navy-950 border-r border-navy-850 text-white shrink-0">
        
        {/* Brand */}
        <div className="p-6 border-b border-navy-850 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-md">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white block">RoboNext Admin</span>
            <span className="text-[10px] text-cyan-300 font-mono uppercase tracking-wider">Control Center</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrent(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active 
                    ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30' 
                    : 'text-slate-400 hover:text-white hover:bg-navy-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-navy-850 bg-navy-900/60 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-xs font-bold text-cyan-300">
              {user?.username ? user.username[0].toUpperCase() : 'A'}
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-semibold text-white block truncate">{user?.username || 'Administrator'}</span>
              <span className="text-[10px] text-slate-400 block truncate">{user?.email || 'admin@robonext.com'}</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs">
            <a 
              href="/" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </a>

            <button
              onClick={handleLogout}
              className="text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="text-xs text-slate-500 font-medium hidden sm:block">
              School Partnerships Management &bull; <span className="text-emerald-600 font-semibold">System Operational</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/enquiries"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Manage Enquiries</span>
            </Link>
            <button
              onClick={handleLogout}
              className="lg:hidden p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
              title="Log Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Mobile Sidebar Dropdown */}
        {sidebarOpen && (
          <div className="lg:hidden bg-navy-950 border-b border-navy-850 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                    isCurrent(item.path)
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-300 hover:bg-navy-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-navy-850 flex justify-between text-xs text-slate-300">
              <a href="/" target="_blank" rel="noreferrer" className="text-cyan-300">View Public Site &rarr;</a>
              <button onClick={handleLogout} className="text-rose-400">Log Out</button>
            </div>
          </div>
        )}

        {/* Outlet for Dashboard views */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
