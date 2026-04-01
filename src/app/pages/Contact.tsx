import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { SuccessModal } from '../components/SuccessModal';
import emailjs from '@emailjs/browser';
import { API_BASE_URL } from '../config/api';

export default function Contact() {
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/settings`);
        if (res.ok) {
          const data = await res.json();
          setSiteSettings(data);
        }
      } catch (err) {
        console.error('Failed to fetch settings', err);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone && formData.phone.length !== 10) {
      setErrors(prev => ({ ...prev, phone: 'Phone number must be 10 digits' }));
      return;
    }
    setIsSubmitting(true);

    try {
      // 1. Save to Database for the Admin Panel
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

      // 2. Send email via EmailJS
      const templateParams = {
        to_email: siteSettings?.contactEmail || 'griteksolutions@gmail.com',
        from_name: formData.fullName,
        from_email: formData.email,
        phone: formData.phone || 'Not Provided',
        service: formData.service || 'Not Specified',
        message: formData.message,
      };

      const serviceId = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      if (serviceId !== 'YOUR_SERVICE_ID') {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      }

      setShowSuccessModal(true);
      setFormData({ fullName: '', email: '', phone: '', service: '', message: '' });

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#ffffff] to-[#f8fafc] pt-10 sm:pt-20 pb-12 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">

            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left z-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#21362e]/10 border border-[#21362e]/20 text-[#21362e] text-sm font-semibold mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#b8ea27] animate-pulse"></span>
                Get In Touch
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#21362e] mb-4 sm:mb-6 tracking-tight leading-tight">
                Initiate Your <br />
                <span className="text-[#b8ea27]">
                  Digital Transformation
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-[#21362e]/80 mb-6 sm:mb-10 max-w-xl leading-relaxed">
                Whether you're looking to disrupt your industry or scales your existing operations, our team of strategists and engineers is ready to architect your success.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                  className="bg-[#b8ea27] text-[#21362e] px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg hover:shadow-[0_0_20px_rgba(184,234,39,0.5)] transition-all duration-300 transform hover:-translate-y-1"
                >
                  Send a Message
                </button>
                <a href="tel:+919624657989">
                  <button className="bg-[#21362e] text-[#b8ea27] px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg hover:bg-[#1a2b24] transition-all duration-300 shadow-lg">
                    Call Us Now
                  </button>
                </a>
              </div>
            </motion.div>

            {/* Right Column - Contact Visual Showcase */}
            <div className="relative w-full mt-10 lg:mt-0 h-[320px] sm:h-[400px] lg:h-[470px]">

              {/* Decorative pulsing rings */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] aspect-square rounded-full border-2 border-[#b8ea27]/25 z-0"
              />
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] aspect-square rounded-full border border-[#21362e]/10 z-0"
              />

              {/* Gradient orbs */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 right-4 w-32 h-32 rounded-full bg-gradient-to-br from-[#b8ea27]/40 to-transparent blur-3xl z-0"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-4 -left-6 w-28 h-28 rounded-full bg-gradient-to-tr from-[#21362e]/20 to-[#b8ea27]/20 blur-3xl z-0"
              />

              {/* Main large image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                className="absolute inset-x-[8%] top-[5%] bottom-[8%] rounded-[32px] overflow-hidden group shadow-[0_16px_50px_rgba(33,54,46,0.3)] z-10 border-4 border-white/80"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1000&q=80"
                  alt="Team Collaboration"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21362e]/80 via-[#21362e]/20 to-transparent" />

                {/* Bottom overlay content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute bottom-5 left-5 right-5 flex items-end justify-between"
                >
                  <div>
                    <p className="text-white/70 text-xs font-medium mb-1">Ready to collaborate?</p>
                    <p className="text-white font-bold text-base sm:text-lg">Let's Build Together</p>
                  </div>
                  <span className="bg-[#b8ea27] text-[#21362e] text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                    Partner With Us
                  </span>
                </motion.div>
              </motion.div>

              {/* Floating phone card */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.7, type: "spring", bounce: 0.4 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="absolute top-[8%] -left-2 sm:-left-4 z-30 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(33,54,46,0.18)] border border-[#b8ea27]/15 flex items-center gap-3 cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-[#21362e] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#b8ea27]" />
                </div>
                <div>
                  <p className="text-[#21362e] font-bold text-xs leading-tight">Call Us</p>
                  <p className="text-[#21362e]/55 text-[11px]">{siteSettings?.phoneNumber || '+91 9624657989'}</p>
                </div>
              </motion.div>

              {/* Floating email card */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.9, type: "spring", bounce: 0.4 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="absolute top-[35%] -right-2 sm:-right-4 z-30 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(33,54,46,0.18)] border border-[#b8ea27]/15 flex items-center gap-3 cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-[#b8ea27] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#21362e]" />
                </div>
                <div>
                  <p className="text-[#21362e] font-bold text-xs leading-tight">Email Us</p>
                  <p className="text-[#21362e]/55 text-[11px]">{siteSettings?.contactEmail || 'griteksolutions@gmail.com'}</p>
                </div>
              </motion.div>

              {/* Floating 24hr response badge - bottom */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, type: "spring", bounce: 0.5 }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-30 bg-[#21362e] text-white rounded-full px-5 py-2.5 shadow-[0_8px_30px_rgba(33,54,46,0.35)] flex items-center gap-2.5"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#b8ea27] animate-pulse" />
                <span className="font-bold text-xs tracking-wide">24hr Response Time</span>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 sm:py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#21362e] mb-4 sm:mb-6">Get In Touch</h2>
              <p className="text-[#21362e]/70 mb-8 text-lg">
                Have a project in mind? Let's discuss how we can help you achieve your digital goals.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-[#b8ea27] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#ffffff]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#21362e] mb-1 text-lg">Phone</h4>
                    <p className="text-[#21362e]/70">{siteSettings?.phoneNumber || '+91 77780 20756'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-[#b8ea27] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#ffffff]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#21362e] mb-1 text-lg">Email</h4>
                    <p className="text-[#21362e]/70">{siteSettings?.contactEmail || 'griteksolutions@gmail.com'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-[#b8ea27] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#ffffff]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#21362e] mb-1 text-lg">Address</h4>
                    <p className="text-[#21362e]/70">{siteSettings?.address || 'Baben, Bardoli, Surat – Gujarat, India'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-[#b8ea27] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#ffffff]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#21362e] mb-1 text-lg">Business Hours</h4>
                    <p className="text-[#21362e]/70">Monday – Saturday: 9:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="mt-8 rounded-2xl overflow-hidden card-shadow">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41709515107!2d72.83837824335938!3d21.170240300000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f184b4e15b7%3A0x7f1d6f0e0b6b2b0!2sBardoli%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#ffffff] p-5 sm:p-8 rounded-2xl border border-[#b8ea27]/30 card-shadow"
            >
              <h3 className="text-2xl font-bold text-[#21362e] mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-[#21362e] mb-2">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border bg-[#f8fafc]/50 focus:outline-none transition-colors text-[#21362e] ${errors.fullName ? 'border-red-400' : 'border-[#b8ea27]/30 focus:border-[#21362e]'}`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs font-medium mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#21362e] mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#b8ea27]/30 bg-[#f8fafc]/50 focus:border-[#21362e] focus:outline-none transition-colors text-[#21362e]"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#21362e] mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    maxLength={10}
                    className={`w-full px-4 py-3 rounded-lg border bg-[#f8fafc]/50 focus:outline-none transition-colors text-[#21362e] ${errors.phone ? 'border-red-400' : 'border-[#b8ea27]/30 focus:border-[#21362e]'}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs font-medium mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-[#21362e] mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#b8ea27]/30 bg-[#f8fafc]/50 focus:border-[#21362e] focus:outline-none transition-colors text-[#21362e]"
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
                  <label htmlFor="message" className="block text-sm font-medium text-[#21362e] mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#b8ea27]/30 bg-[#f8fafc]/50 focus:border-[#21362e] focus:outline-none transition-colors resize-none text-[#21362e]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#b8ea27] text-[#21362e] px-8 py-4 rounded-lg btn-glow transition-smooth hover:scale-105 font-semibold disabled:opacity-50 flex justify-center items-center"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>


      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
}
