import { motion } from 'motion/react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { API_BASE_URL } from '../config/api';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    try {
      const res = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err) {
      setStatus('error');
      setMessage('Server is unreachable. Please try again.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#21362e] relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#b8ea27]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#b8ea27]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#b8ea27]/10 mb-8 border border-[#b8ea27]/20"
          >
            <Mail className="w-8 h-8 text-[#b8ea27]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Stay Updated with <span className="text-[#b8ea27]">Latest News</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/70 text-lg mb-12 max-w-2xl mx-auto"
          >
            Subscribe to our newsletter and get the latest updates on digital trends, new projects, and exclusive insights delivered straight to your inbox.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-lg mx-auto"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 bg-[#b8ea27]/10 border border-[#b8ea27]/30 py-6 px-8 rounded-2xl"
              >
                <CheckCircle2 className="w-6 h-6 text-[#b8ea27]" />
                <span className="text-white font-bold text-lg">{message}</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#b8ea27] transition-colors" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-xl focus:border-[#b8ea27] focus:outline-none focus:ring-1 focus:ring-[#b8ea27] transition-all placeholder:text-white/30"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-[#b8ea27] text-[#21362e] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_25px_rgba(184,234,39,0.4)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {status === 'loading' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-[#21362e] border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-red-400 text-sm font-medium"
              >
                {message}
              </motion.p>
            )}
            
            <p className="mt-6 text-white/40 text-sm">
              We respect your privacy. No spam, only quality content.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
