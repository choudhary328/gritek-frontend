import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LogIn, User, Lock, Loader2, Shield } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  // Auto-redirect if already authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      fetch(`${API_BASE_URL}/auth/verify`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => {
        if (res.ok) navigate('/admin', { replace: true });
        else setCheckingAuth(false);
      }).catch(() => setCheckingAuth(false));
    } else {
      setCheckingAuth(false);
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', data.user?.username || username);
        navigate('/admin');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Server is unreachable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
          {/* Accent top bar */}
          <div className="h-1.5 bg-gradient-to-r from-primary via-primary to-green-400" />
          
          <div className="p-10">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-xl shadow-primary/20 rotate-3 hover:rotate-0 transition-transform">
                <Shield className="text-black" size={36} />
              </div>
            </div>

            <h1 className="text-3xl font-black text-slate-900 text-center mb-2">Welcome Back</h1>
            <p className="text-slate-400 text-center mb-10 font-medium text-sm">Sign in to your administrative portal</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Username</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-medium flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-red-500 font-black text-xs">!</span>
                  </div>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-black hover:text-white text-black font-black py-5 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed group hover:shadow-2xl hover:shadow-black/10 active:scale-[0.98]"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : <LogIn size={22} className="group-hover:translate-x-1 transition-transform" />}
                <span className="text-lg">{loading ? 'Verifying...' : 'Sign In'}</span>
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6 font-medium">
          Gritek Solution — Admin Portal
        </p>
      </div>
    </div>
  );
};

export default Login;
