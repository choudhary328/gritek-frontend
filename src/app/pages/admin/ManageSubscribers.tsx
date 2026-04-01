import { useState, useEffect } from 'react';
import { Trash2, Loader2, Mail, Search, UserCheck, UserX, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE_URL } from '../../config/api';

export default function ManageSubscribers() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/newsletter/subscribers`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setSubscribers(data);
      } else {
        setSubscribers([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this subscriber?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/newsletter/subscribers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (res.ok) {
        toast.success('Subscriber removed');
        fetchSubscribers();
      }
    } catch (err) {
      toast.error('Failed to remove subscriber');
    }
  };

  const activeCount = subscribers.filter(s => s.active).length;

  const filtered = subscribers.filter(sub => {
    if (!searchQuery) return true;
    return sub.email?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Subscribers</h1>
          <p className="text-slate-400 mt-1 font-medium text-sm">
            {subscribers.length} total • <span className="text-green-600 font-bold">{activeCount} active</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-2xl text-sm font-bold border border-green-100">
            <UserCheck className="w-4 h-4" /> {activeCount} Active
          </div>
          <div className="flex items-center gap-2 bg-slate-50 text-slate-500 px-4 py-2 rounded-2xl text-sm font-bold border border-slate-200">
            <UserX className="w-4 h-4" /> {subscribers.length - activeCount} Inactive
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by email..."
          className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-5 py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium text-sm shadow-sm"
        />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="text-center py-20"><Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" /></div>
        ) : (
          <>
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <div className="col-span-5">Email</div>
              <div className="col-span-3">Subscribed</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            <div className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map(sub => (
                  <div key={sub._id} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 md:px-8 py-5 items-center hover:bg-slate-50/50 transition-colors group">
                    <div className="col-span-5 flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm text-slate-900 truncate group-hover:text-primary transition-colors">{sub.email}</span>
                    </div>
                    <div className="col-span-3 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(sub.subscribedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="col-span-2">
                      {sub.active ? (
                        <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border border-green-100">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-slate-50 text-slate-400 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border border-slate-200">
                          <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" /> Inactive
                        </span>
                      )}
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <button onClick={() => handleDelete(sub._id)} className="bg-white text-red-400 p-2 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm border border-slate-200 opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-slate-200 w-8 h-8" />
                  </div>
                  <p className="text-slate-400 font-bold">{searchQuery ? 'No subscribers match your search.' : 'No subscribers yet.'}</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
