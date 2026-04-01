import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';
import { useState } from 'react';
import { SuccessModal } from './SuccessModal';
import emailjs from '@emailjs/browser';
import { API_BASE_URL } from '../config/api';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>({});

  const handleNameChange = (value: string) => {
    const cleaned = value.replace(/[0-9]/g, '');
    setFormData({ ...formData, fullName: cleaned });
    if (/[0-9]/.test(value)) {
      setErrors(prev => ({ ...prev, fullName: 'Numbers are not allowed in name' }));
    } else {
      setErrors(prev => ({ ...prev, fullName: undefined }));
    }
  };

  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: digitsOnly });
    if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
      setErrors(prev => ({ ...prev, phone: 'Phone number must be 10 digits' }));
    } else {
      setErrors(prev => ({ ...prev, phone: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone && formData.phone.length !== 10) {
      setErrors(prev => ({ ...prev, phone: 'Phone number must be 10 digits' }));
      return;
    }
    setIsSubmitting(true);

    try {
      await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          services: formData.service ? [formData.service] : [],
          message: formData.message,
        }),
      });

      const serviceId = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      if (serviceId !== 'YOUR_SERVICE_ID') {
        await emailjs.send(serviceId, templateId, {
          to_email: 'griteksolutions@gmail.com',
          from_name: formData.fullName,
          from_email: formData.email,
          phone: formData.phone || 'Not Provided',
          service: formData.service || 'Not Specified',
          message: formData.message,
        }, publicKey);
      }

      setFormData({ fullName: '', email: '', phone: '', service: '', message: '' });
      onClose();
      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-[#21362e]/70 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="bg-[#21362e] px-6 sm:px-8 py-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#b8ea27]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors rounded-xl hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-2xl font-bold text-white relative z-10">Get In Touch</h3>
                <p className="text-white/60 text-sm mt-1 relative z-10">Fill out the form and we'll get back to you within 24 hours.</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#21362e] mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 focus:ring-2 focus:outline-none transition-all text-[#21362e] font-medium ${errors.fullName ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-[#b8ea27] focus:ring-[#b8ea27]/20'}`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs font-medium mt-1.5">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#21362e] mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:border-[#b8ea27] focus:ring-2 focus:ring-[#b8ea27]/20 focus:outline-none transition-all text-[#21362e] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#21362e] mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      maxLength={10}
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 focus:ring-2 focus:outline-none transition-all text-[#21362e] font-medium ${errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-[#b8ea27] focus:ring-[#b8ea27]/20'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs font-medium mt-1.5">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#21362e] mb-2">Service Interested In</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:border-[#b8ea27] focus:ring-2 focus:ring-[#b8ea27]/20 focus:outline-none transition-all text-[#21362e] font-medium"
                  >
                    <option value="">Select a service</option>
                    <option value="web">Web Development</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="mobile">Mobile App</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="design">Graphic Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#21362e] mb-2">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:border-[#b8ea27] focus:ring-2 focus:ring-[#b8ea27]/20 focus:outline-none transition-all resize-none text-[#21362e] font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#b8ea27] text-[#21362e] py-4 rounded-2xl font-bold text-lg hover:shadow-[0_0_25px_rgba(184,234,39,0.4)] transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-6 h-6 border-2 border-[#21362e] border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom accent */}
              <div className="h-1.5 bg-gradient-to-r from-[#b8ea27] via-[#21362e] to-[#b8ea27]" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </>
  );
}
