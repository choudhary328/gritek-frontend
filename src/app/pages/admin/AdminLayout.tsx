import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { 
  LayoutDashboard, 
  Briefcase, 
  Settings, 
  MessageSquare, 
  Star, 
  LogOut,
  Menu,
  X,
  User,
  Users,
  ChevronRight,
  Wrench,
  Shield,
  Newspaper
} from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const adminUser = localStorage.getItem('adminUser') || 'Admin';

  useEffect(() => {
    // Fetch unread message count
    const fetchMessageCount = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/contacts`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        });
        const data = await res.json();
        if (Array.isArray(data)) setMessageCount(data.filter((m: any) => !m.read).length);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessageCount();
  }, [location.pathname]);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Briefcase, label: 'Projects', path: '/admin/projects' },
    { icon: Wrench, label: 'Services', path: '/admin/services' },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages', badge: messageCount },
    { icon: Star, label: 'Reviews', path: '/admin/reviews' },
    { icon: Newspaper, label: 'Subscribers', path: '/admin/subscribers' },
    { icon: Users, label: 'Staff', path: '/admin/staff' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
    { icon: User, label: 'Profile', path: '/admin/profile' },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className="p-5 flex items-center justify-between border-b border-slate-100">
        <div className={`${isSidebarOpen ? 'flex' : 'hidden'} items-center gap-3`}>
          <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center shadow-md shadow-slate-900/30">
            <Shield size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-black text-sm text-slate-900 uppercase tracking-wider">Gritek</h1>
            <p className="text-[10px] font-bold text-slate-400 -mt-0.5 uppercase tracking-widest">Admin</p>
          </div>
        </div>
        <button onClick={() => { setIsSidebarOpen(!isSidebarOpen); setIsMobileMenuOpen(false); }} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors hidden md:block">
          {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className={`${isSidebarOpen ? 'block' : 'hidden'} text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] px-3 mb-3`}>Navigation</p>
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center p-3 rounded-2xl transition-all relative group ${
                active 
                  ? 'bg-slate-900 text-white font-bold shadow-lg shadow-slate-900/20' 
                  : 'hover:bg-slate-50 text-slate-500 hover:text-slate-900'
              }`}
            >
              <item.icon size={20} className={active ? 'text-white' : 'group-hover:text-slate-900 transition-colors'} />
              {isSidebarOpen && (
                <>
                  <span className="ml-3 text-sm font-semibold">{item.label}</span>
                  {item.badge && item.badge > 0 ? (
                    <span className="ml-auto bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  ) : active ? (
                    <ChevronRight size={16} className="ml-auto opacity-50" />
                  ) : null}
                </>
              )}
              {!isSidebarOpen && item.badge && item.badge > 0 ? (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-white" />
              ) : null}
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-3 border-t border-slate-100 space-y-2">
        {isSidebarOpen && (
          <div className="px-3 py-3 bg-slate-50 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
              {adminUser.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{adminUser}</p>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Administrator</p>
            </div>
          </div>
        )}
        <button 
          onClick={handleLogout}
          className="flex items-center w-full p-3 rounded-2xl hover:bg-red-50 text-red-400 hover:text-red-600 transition-all text-sm font-semibold group"
        >
          <LogOut size={18} className="group-hover:scale-110 transition-transform" />
          {isSidebarOpen && <span className="ml-3">Sign Out</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-[260px]' : 'w-[72px]'} bg-white border-r border-slate-200/80 transition-all duration-300 flex-col shadow-sm hidden md:flex`}>
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-[280px] bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 flex flex-col md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-30">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors">
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center">
              <Shield size={14} className="text-white" />
            </div>
            <span className="font-black text-sm text-slate-900 uppercase tracking-wider">Gritek</span>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
