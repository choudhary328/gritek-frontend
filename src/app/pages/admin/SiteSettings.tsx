import React, { useState, useEffect } from 'react';
import { Save, Loader2, Globe, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { API_BASE_URL } from '../../config/api';

export default function SiteSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    companyName: 'Gritek Solution',
    contactEmail: 'griteksolutions@gmail.com',
    phoneNumber: '+91 00000 00000',
    address: '123 Tech Street, City, Country',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/settings`);
        if (res.ok) {
          const data = await res.json();
          setSettings(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error('Failed to fetch settings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        toast.success('Settings updated successfully');
      } else {
        toast.error('Failed to update settings');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Settings</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage global website information and contact details.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Info */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 space-y-8">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <div className="w-2 h-8 bg-primary rounded-full" />
            General Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Company Name</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  name="companyName"
                  value={settings.companyName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Contact Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  name="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  name="phoneNumber"
                  value={settings.phoneNumber}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Physical Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 space-y-8">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <div className="w-2 h-8 bg-blue-500 rounded-full" />
            Social Presence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                <Facebook className="w-4 h-4 text-blue-600" /> Facebook URL
              </label>
              <input
                name="facebook"
                value={settings.facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-600" /> Instagram URL
              </label>
              <input
                name="instagram"
                value={settings.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                <Twitter className="w-4 h-4 text-blue-400" /> Twitter URL
              </label>
              <input
                name="twitter"
                value={settings.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-blue-800" /> LinkedIn URL
              </label>
              <input
                name="linkedin"
                value={settings.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 font-medium"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-3 bg-primary text-black px-10 py-4 rounded-2xl font-black hover:bg-black hover:text-white disabled:opacity-50 transition-all shadow-xl shadow-primary/20 scale-100 hover:scale-105 active:scale-95"
          >
            {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
            Save Site Settings
          </button>
        </div>
      </form>
    </div>
  );
}

// Simple internal helper for TrendingUp since it was imported but not defined locally if Lucide changes
function TrendingUp({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
