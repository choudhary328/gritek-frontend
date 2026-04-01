import { FolderKanban, Briefcase, Mail, Star, ArrowRight, MessageSquare, Clock, Users, Plus, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { API_BASE_URL } from '../../config/api';

const chartData = [
  { name: 'Mon', inquiries: 4 },
  { name: 'Tue', inquiries: 7 },
  { name: 'Wed', inquiries: 5 },
  { name: 'Thu', inquiries: 12 },
  { name: 'Fri', inquiries: 9 },
  { name: 'Sat', inquiries: 15 },
  { name: 'Sun', inquiries: 10 },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    contacts: 0,
    reviews: 0,
    staff: 0,
    pendingReviews: 0,
  });
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const adminUser = localStorage.getItem('adminUser') || 'Admin';

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/dashboard`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        });
        const data = await res.json();
        setStats({
          projects: data.projects || 0,
          services: data.services || 0,
          contacts: data.contacts || 0,
          reviews: data.reviews || 0,
          staff: data.staff || 0,
          pendingReviews: data.pendingReviews || 0,
        });
        if (Array.isArray(data.recentMessages)) {
          setRecentMessages(data.recentMessages);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const cards = [
    { title: 'Projects', value: stats.projects, icon: FolderKanban, color: 'text-blue-500', bg: 'bg-blue-50', link: '/admin/projects' },
    { title: 'Services', value: stats.services, icon: Briefcase, color: 'text-primary', bg: 'bg-primary/10', link: '/admin/services' },
    { title: 'Messages', value: stats.contacts, icon: Mail, color: 'text-purple-500', bg: 'bg-purple-50', link: '/admin/messages' },
    { title: 'Reviews', value: stats.reviews, icon: Star, color: 'text-orange-500', bg: 'bg-orange-50', link: '/admin/reviews', badge: stats.pendingReviews },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-primary mb-1 uppercase tracking-widest">{getGreeting()}</p>
          <h1 className="text-3xl font-black text-slate-900">{adminUser} 👋</h1>
          <p className="text-slate-400 mt-1 font-medium text-sm">Here's what's happening with your platform today.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/admin/projects" className="flex items-center gap-2 bg-white text-slate-700 text-sm font-bold px-5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all border border-slate-200 shadow-sm">
            <Plus size={16} /> New Project
          </Link>
          <Link to="/admin/services" className="flex items-center gap-2 bg-black text-white text-sm px-5 py-2.5 rounded-2xl hover:bg-primary hover:text-black transition-all font-bold shadow-lg shadow-black/10">
            <Plus size={16} /> New Service
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link to={card.link} className="block bg-white p-5 md:p-6 rounded-3xl border border-slate-200 hover:border-primary/30 shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${card.bg} group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  {card.badge && card.badge > 0 ? (
                    <span className="text-[10px] font-black bg-orange-100 text-orange-600 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {card.badge} pending
                    </span>
                  ) : null}
                </div>
                <p className="text-3xl font-black text-slate-900 mb-1">{card.value}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.title}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Growth Chart */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black flex items-center gap-3 text-slate-900">
              <div className="w-2 h-6 bg-primary rounded-full" />
              Inquiry Trend
            </h2>
            <span className="text-[10px] font-black bg-slate-100 text-slate-400 px-3 py-1.5 rounded-full uppercase tracking-widest">Last 7 Days</span>
          </div>
          <div className="h-[280px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorInq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b8ea27" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#b8ea27" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#cbd5e1" fontSize={11} tickLine={false} axisLine={false} dy={10} fontWeight={600} />
                <YAxis stroke="#cbd5e1" fontSize={11} tickLine={false} axisLine={false} dx={-10} fontWeight={600} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.08)', padding: '12px 16px' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 'bold', fontSize: '13px' }}
                  labelStyle={{ color: '#94a3b8', fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="inquiries" stroke="#b8ea27" strokeWidth={3} fillOpacity={1} fill="url(#colorInq)" dot={{ r: 4, fill: '#b8ea27', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#b8ea27', stroke: '#fff', strokeWidth: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black flex items-center gap-3 text-slate-900">
              <div className="w-2 h-6 bg-purple-500 rounded-full" />
              Inbox
            </h2>
            <Link to="/admin/messages" className="text-[10px] font-black text-primary hover:text-black flex items-center gap-1 transition-colors uppercase tracking-widest">
              All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2 flex-1">
            {recentMessages.length > 0 ? (
              recentMessages.map((msg, i) => (
                <div key={i} className="group p-3.5 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 font-black text-xs shrink-0 group-hover:scale-110 transition-transform">
                      {msg.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-sm text-slate-900 truncate group-hover:text-primary transition-colors">{msg.name}</span>
                        <span className="text-[10px] font-bold text-slate-300 shrink-0 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5 font-medium">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-300 italic text-sm font-medium flex flex-col items-center gap-3">
                <MessageSquare className="w-8 h-8" />
                No recent messages.
              </div>
            )}
          </div>

          {recentMessages.length > 0 && (
            <Link to="/admin/messages" className="mt-4 text-center py-3 bg-slate-50 rounded-2xl text-sm font-bold text-slate-500 hover:bg-primary hover:text-black transition-all block">
              View all messages
            </Link>
          )}
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{stats.staff}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Team Members</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center">
            <Star className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{stats.pendingReviews}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending Reviews</p>
          </div>
        </div>
        <Link to="/admin/reviews" className="flex items-center gap-2 bg-slate-50 text-slate-600 text-sm font-bold px-5 py-3 rounded-2xl hover:bg-primary hover:text-black transition-all">
          Review Now <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
