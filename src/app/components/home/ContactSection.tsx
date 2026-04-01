import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';
import { useState } from 'react';
import { SuccessModal } from '../SuccessModal';

export function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    setShowSuccessModal(true);
    setFormData({ fullName: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <section className="py-8 sm:py-12 section-soft-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[#b8ea27] font-semibold mb-3 text-sm uppercase tracking-wider"
          >
            Contact Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-[#21362e] mb-4"
          >
            Initiate Your Success Story
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-[#21362e] mb-3">Consult with Our Experts</h3>
            <p className="text-[#21362e]/70 mb-6 text-base">
              Ready to redefine your digital presence? Share your vision with us, and let's architect a solution that drives measurable impact for your organization.
            </p>

            <div className="space-y-6">
              {[
                { icon: Phone, title: 'Phone', content: '+91 77780 20756' },
                { icon: Mail, title: 'Email', content: 'ritikakumawat2028@gmail.com' },
                { icon: MapPin, title: 'Address', content: 'Baben, Bardoli, Surat – Gujarat, India' },
                { icon: Clock, title: 'Business Hours', content: 'Mon–Sat: 9:00 AM – 6:00 PM' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-10 h-10 rounded-lg bg-[#b8ea27] flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="w-5 h-5 text-[#ffffff]" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-[#21362e] mb-1">{item.title}</h4>
                      <p className="text-[#21362e]/70">{item.content}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div 
              className="flex gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[Facebook, Linkedin, Instagram, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg border border-[#b8ea27]/30 flex items-center justify-center hover:border-[#21362e] hover:text-[#21362e] transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#ffffff] p-6 rounded-2xl border border-[#b8ea27]/30 card-shadow"
          >
            <h3 className="text-xl font-bold text-[#21362e] mb-4">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#b8ea27]/30 bg-[#f8fafc]/50 focus:border-[#21362e] focus:outline-none transition-colors text-[#21362e]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#b8ea27]/30 bg-[#f8fafc]/50 focus:border-[#21362e] focus:outline-none transition-colors text-[#21362e]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#b8ea27]/30 bg-[#f8fafc]/50 focus:border-[#21362e] focus:outline-none transition-colors text-[#21362e]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#b8ea27]/30 bg-[#f8fafc]/50 focus:border-[#21362e] focus:outline-none transition-colors text-[#21362e]"
                >
                  <option value="">Service Interested In</option>
                  <option value="web">Web Development</option>
                  <option value="ecommerce">E-Commerce</option>
                  <option value="mobile">Mobile App</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="design">Graphic Design</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#b8ea27]/30 bg-[#f8fafc]/50 focus:border-[#21362e] focus:outline-none transition-colors resize-none text-[#21362e]"
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-[#b8ea27] text-[#21362e] text-sm px-6 py-3 rounded-lg btn-glow transition-smooth font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </section>
  );
}