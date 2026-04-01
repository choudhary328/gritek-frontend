import { useState, useEffect } from 'react';
import { Mail, Calendar, Trash2, Loader2, Phone, Search, ExternalLink, MessageSquare, CheckCheck, Circle } from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE_URL } from '../../config/api';

export default function ContactMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/contacts`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleRead = async (id: string, currentlyRead: boolean) => {
    try {
      const res = await fetch(`${API_BASE_URL}/contacts/${id}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (res.ok) {
        toast.success(currentlyRead ? 'Marked as unread' : 'Marked as read');
        fetchMessages();
      }
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message permanently?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (res.ok) {
        toast.success('Message deleted');
        fetchMessages();
      } else {
        toast.error('Failed to delete message');
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  const filtered = messages
    .filter(msg => {
      if (filterTab === 'unread') return !msg.read;
      if (filterTab === 'read') return msg.read;
      return true;
    })
    .filter(msg => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return msg.name?.toLowerCase().includes(q) || msg.email?.toLowerCase().includes(q) || msg.message?.toLowerCase().includes(q);
    });

  const tabs = [
    { key: 'all' as const, label: 'All', count: messages.length },
    { key: 'unread' as const, label: 'Unread', count: unreadCount },
    { key: 'read' as const, label: 'Read', count: messages.length - unreadCount },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Messages</h1>
          <p className="text-slate-400 mt-1 font-medium text-sm">
            {messages.length} total • {unreadCount > 0 && <span className="text-blue-600 font-bold">{unreadCount} unread</span>}
          </p>
        </div>
      </div>

      {/* Filter Tabs + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-1.5 bg-white rounded-2xl p-1.5 border border-slate-200 shadow-sm">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilterTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                filterTab === tab.key
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.label}
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                filterTab === tab.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium text-sm shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="text-center py-20"><Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" /></div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.length > 0 ? (
              filtered.map(msg => (
                <div key={msg._id} className={`p-6 md:p-8 hover:bg-slate-50/50 transition-colors group ${!msg.read ? 'border-l-4 border-l-blue-500 bg-blue-50/20' : ''}`}>
                  <div className="flex justify-between items-start mb-5 flex-wrap gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shrink-0 ${!msg.read ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                        {msg.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`text-lg font-black group-hover:text-primary transition-colors ${!msg.read ? 'text-slate-900' : 'text-slate-500'}`}>{msg.name}</h3>
                          {!msg.read && <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full"><Mail className="w-3.5 h-3.5 text-blue-400" /> {msg.email}</span>
                          {msg.phone && <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full"><Phone className="w-3.5 h-3.5 text-green-400" /> {msg.phone}</span>}
                          <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full"><Calendar className="w-3.5 h-3.5 text-orange-400" /> {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleRead(msg._id, msg.read)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-bold transition-all shadow-sm border ${
                          msg.read
                            ? 'bg-white text-slate-500 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                            : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {msg.read ? <Circle className="w-3.5 h-3.5" /> : <CheckCheck className="w-3.5 h-3.5" />}
                        {msg.read ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <a href={`mailto:${msg.email}?subject=Re: Gritek Solution Inquiry&body=Hi ${msg.name},%0D%0A%0D%0AThank you for reaching out.%0D%0A%0D%0A`} className="flex items-center gap-1.5 bg-white text-blue-600 px-4 py-2 rounded-xl text-[11px] font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-slate-200">
                        <ExternalLink className="w-3.5 h-3.5" /> Reply
                      </a>
                      <button onClick={() => handleDelete(msg._id)} className="bg-white text-red-400 p-2 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm border border-slate-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {msg.services && msg.services.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {msg.services.map((srv: string) => (
                        <span key={srv} className="bg-primary/10 text-black text-[10px] uppercase tracking-widest font-black px-3 py-1 rounded-full border border-primary/20">
                          {srv}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className={`border p-5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap font-medium ${!msg.read ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                    {msg.message}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-20 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="text-slate-200 w-8 h-8" />
                </div>
                <p className="text-slate-400 font-bold">{searchQuery ? 'No messages match your search.' : filterTab === 'unread' ? 'All caught up!' : 'No messages yet.'}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
