import React, { useState } from 'react';
import { User, Lock, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE_URL } from '../../config/api';

export default function AdminProfile() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: localStorage.getItem('adminUser') || 'admin',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          username: formData.username,
          newPassword: formData.newPassword || undefined,
        }),
      });

      if (res.ok) {
        toast.success('Profile updated successfully');
        if (formData.username) localStorage.setItem('adminUser', formData.username);
        setFormData(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to update profile');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Profile</h1>
          <p className="text-slate-500 mt-1 font-medium">Update your account credentials and security settings.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
              <User className="w-4 h-4 text-primary" /> Username
            </label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium"
            />
          </div>

          <div className="border-t border-slate-100 pt-8 space-y-6">
            <div className="flex items-center gap-3 mb-2">
               <div className="w-1.5 h-6 bg-primary rounded-full" />
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Security Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-400" /> New Password
                </label>
                <input
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium placeholder:text-slate-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-400" /> Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-3 bg-primary text-black px-10 py-4 rounded-2xl font-black hover:bg-black hover:text-white disabled:opacity-50 transition-all shadow-xl shadow-primary/20 scale-100 hover:scale-105 active:scale-95"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
