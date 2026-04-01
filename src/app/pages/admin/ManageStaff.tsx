import { useState, useEffect } from 'react';
import { Plus, Trash2, Shield, Loader2, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE_URL } from '../../config/api';

export default function ManageStaff() {
  const [staff, setStaff] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/staff`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setStaff(data);
      } else {
        setStaff([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/staff`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (res.ok) {
        toast.success('Staff member added successfully!');
        setUsername('');
        setPassword('');
        fetchStaff();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Failed to add staff member');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error adding staff member');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this staff member?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/admin/staff/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (res.ok) { toast.success('Staff member removed'); fetchStaff(); }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Staff</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage administrative users and their access levels.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
          <div className="w-2 h-8 bg-primary rounded-full" />
          Add New Administrator
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
            <input required type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium" placeholder="E.g. admin_jdoe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Initial Password</label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium" placeholder="••••••••" />
          </div>
          <div className="flex items-end">
            <button disabled={isSubmitting} type="submit" className="w-full flex items-center justify-center gap-3 bg-primary text-black px-6 py-4 rounded-2xl font-black hover:bg-black hover:text-white transition-all disabled:opacity-50 shadow-xl shadow-primary/20">
              {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Plus className="w-6 h-6" />}
              Create Account
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
           <h2 className="text-xl font-black text-slate-900">Active Administrators</h2>
           <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full uppercase tracking-tighter">System Access</span>
        </div>
        {isLoading ? (
          <div className="text-center py-20"><Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" /></div>
        ) : (
          <div className="divide-y divide-slate-100">
            {staff.map(member => (
              <div key={member._id} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-primary font-black text-xl shadow-sm group-hover:scale-110 transition-transform">
                      {member.username.charAt(0).toUpperCase()}
                   </div>
                   <div>
                      <h3 className="font-black text-slate-900 text-lg">{member.username}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-bold">
                         <Shield className="w-3.5 h-3.5 text-blue-500" />
                         <span className="uppercase tracking-widest">{member.role}</span>
                         <span className="text-slate-300">•</span>
                         <span>Joined {new Date(member.createdAt).toLocaleDateString()}</span>
                      </div>
                   </div>
                </div>
                <button 
                  onClick={() => handleDelete(member._id)}
                  disabled={member.username === localStorage.getItem('adminUser')}
                  className="bg-white text-red-500 p-3.5 rounded-2xl hover:bg-red-500 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-sm border border-slate-100"
                  title={member.username === localStorage.getItem('adminUser') ? "You cannot delete yourself" : "Delete account"}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {staff.length === 0 && (
                <div className="p-20 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="text-slate-200" />
                    </div>
                    <p className="text-slate-400 font-bold italic">No administrators found.</p>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
