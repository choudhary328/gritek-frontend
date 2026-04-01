import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { Code2, ShoppingCart, Smartphone, TrendingUp, PenTool, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ContactModal } from '../components/ContactModal';
import { API_BASE_URL, BACKEND_URL } from '../config/api';

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'We architect high-performance, scalable websites and web applications, delivering a complete package that includes both the user-facing platform and a powerful, custom Admin Panel for seamless content and data management.',
    fullDescription: 'We build robust, high-performance web ecosystems that serve as the technical foundation for your digital growth. Our focus is on delivering secure architectures with a custom-engineered Admin Panel for seamless management.',
    detailedBenefit: 'Our full-stack methodology covers everything from responsive frontend experiences to complex backend integrations, ensuring your platform is efficient and future-proof.',
    accent: '#21362e',
    features: ['Web + Admin Panel', 'Custom UI/UX Design', 'CMS Integration', 'SEO Optimization', 'Performance Tuning', 'Responsive Layout'],
    process: ['Discovery', 'Design', 'Development', 'Testing', 'Launch'],
    technologies: ['React', 'Next.js', 'Node.js', 'WordPress', 'TailwindCSS'],
    pricing: 'Custom Quote',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Development',
    description: 'Engineering conversion-centric shopping experiences that blend intuitive UI with robust backend performance.',
    fullDescription: 'Scale your retail operations with our conversion-centric e-commerce solutions. We prioritize user experience and automated backend logic to drive revenue and customer loyalty.',
    detailedBenefit: 'We implement sophisticated inventory systems, secure high-volume payment processing, and real-time analytics to give you full visibility over your store performance.',
    accent: '#b8ea27',
    features: ['Product Management', 'Payment Gateway', 'Inventory System', 'Order Tracking', 'Multi-currency'],
    process: ['Discovery', 'Design', 'Development', 'Testing', 'Launch'],
    technologies: ['Shopify', 'WooCommerce', 'Laravel', 'Stripe', 'Razorpay'],
    pricing: 'Custom Quote',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: "We craft fluid, native-feel mobile experiences for both Android and iOS, focusing on high-end performance and seamless integration with your existing business ecosystems.",
    fullDescription: 'Reach your audience anywhere with native-feel applications built for the modern mobile landscape. We specialize in high-performance iOS and Android development.',
    detailedBenefit: 'Our mobile strategy focuses on intuitive touch-point design, offline robustness, and seamless API synchronization to keep your users engaged on the go.',
    accent: '#b8ea27',
    features: ['Cross-platform (Android & iOS)', 'Push Notifications', 'Offline Support', 'API Integration', 'App Store Submission'],
    process: ['Discovery', 'Wireframe', 'Development', 'QA', 'Deployment'],
    technologies: ['Flutter', 'React Native', 'Firebase', 'REST API'],
    pricing: 'Custom Quote',
    image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&q=80',
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Accelerating brand visibility through strategic, data-orchestrated marketing campaigns that deliver measurable ROI.',
    fullDescription: 'Maximize your market penetration through data-orchestrated marketing strategies. We focus on measurable KPI growth and high-impact brand visibility.',
    detailedBenefit: 'From SEO and content orchestration to precisely targeted social and search advertising, we deliver a multi-channel approach to capture and convert high-quality leads.',
    accent: '#21362e',
    features: ['SEO Optimization', 'Google Ads', 'Social Media Management', 'Content Marketing', 'Analytics'],
    process: ['Audit', 'Strategy', 'Execution', 'Monitor', 'Optimize'],
    technologies: ['Google Analytics', 'SEMrush', 'Meta Ads', 'HubSpot'],
    pricing: 'Custom Quote',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
  },
  {
    icon: PenTool,
    title: 'Graphic Design',
    description: 'Defining your visual identity through sophisticated design that resonates with your audience and elevates your brand.',
    fullDescription: "Define your brand narrative with sophisticated design that resonates. We blend aesthetic excellence with functional UI principles to elevate your identity.",
    detailedBenefit: 'Our design studio delivers everything from core brand identity kits and logos to high-fidelity UI designs that provide a premium feel across all digital touchpoints.',
    accent: '#b8ea27',
    features: ['Logo Design', 'Brand Identity Kit', 'Social Media Graphics', 'UI Design', 'Print Materials'],
    process: ['Brief', 'Concept', 'Design', 'Revisions', 'Delivery'],
    technologies: ['Figma', 'Adobe Illustrator', 'Photoshop', 'After Effects'],
    pricing: 'Custom Quote',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  },
];

const features = [
  'Responsive Design',
  'SEO Friendly',
  'Custom Theme Design',
  'Hosting & Domain Setup',
  'Admin Panel',
  'Live Chat Integration',
  'Payment Gateway',
  'WhatsApp Integration',
  'SSL Security',
  'Business Email',
  'Support & Maintenance',
  'Performance Optimized',
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [dynamicServices, setDynamicServices] = useState<any[]>([]);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/services`);
        const data = await res.json();
        if (Array.isArray(data)) {
          const formatted = data.map(s => {
            // Dynamically get icon from LucideIcons based on the string name
            const IconComponent = (LucideIcons as any)[s.icon] || Code2;
            return {
              ...s,
              icon: IconComponent,
              image: `${BACKEND_URL}${s.image}`,
            };
          });
          setDynamicServices(formatted);
        }
      } catch (err) {
        console.error('Failed to fetch dynamic services', err);
      }
    };
    fetchServices();
  }, []);

  const allServices = [...dynamicServices, ...services];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#ffffff] to-[#f8fafc] pt-8 sm:pt-12 pb-10 sm:pb-16 overflow-hidden">
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
                What We Do
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#21362e] mb-4 tracking-tight leading-tight">
                Our Expert <br />
                <span className="text-[#b8ea27]">
                  Digital Services
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-[#21362e]/80 mb-6 sm:mb-10 max-w-xl leading-relaxed">
                We provide comprehensive digital solutions tailored to accelerate your business growth, from custom web development to strategic digital marketing.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                   onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
                   className="bg-[#b8ea27] text-[#21362e] px-6 py-3 rounded-xl font-bold text-base hover:shadow-[0_0_20px_rgba(184,234,39,0.5)] transition-all duration-300 transform hover:-translate-y-1"
                >
                  Explore Services
                </button>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="bg-[#21362e] text-[#b8ea27] px-6 py-3 rounded-xl font-bold text-base hover:bg-[#1a2b24] transition-all duration-300 shadow-lg"
                >
                  Request a Quote
                </button>
              </div>
            </motion.div>

            {/* Right Column - Staggered Mosaic Grid */}
            <div className="relative w-full mt-10 lg:mt-0">

              {/* Decorative pulsing orbs */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 right-10 w-36 h-36 rounded-full bg-gradient-to-br from-[#b8ea27]/30 to-[#21362e]/10 blur-3xl z-0"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-0 -left-4 w-28 h-28 rounded-full bg-gradient-to-tr from-[#21362e]/15 to-[#b8ea27]/25 blur-3xl z-0"
              />

              <div className="grid grid-cols-2 gap-3 sm:gap-4 h-[300px] sm:h-[380px] lg:h-[440px]">

                {/* Top-left — tall image */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
                  className="row-span-2 relative rounded-[20px] overflow-hidden group shadow-[0_8px_30px_rgba(33,54,46,0.25)] z-10"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
                    alt="Web Development"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21362e]/80 via-[#21362e]/20 to-transparent" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <span className="inline-block bg-[#b8ea27] text-[#21362e] text-xs font-bold px-3 py-1.5 rounded-lg">Web Development</span>
                  </div>
                </motion.div>

                {/* Top-right — short image */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
                  className="relative rounded-[20px] overflow-hidden group shadow-[0_8px_30px_rgba(33,54,46,0.2)] z-10"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80"
                    alt="Graphic Design"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21362e]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block bg-white/90 text-[#21362e] text-xs font-bold px-2.5 py-1 rounded-md">Design</span>
                  </div>
                </motion.div>

                {/* Bottom-right — short image */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6, type: "spring" }}
                  className="relative rounded-[20px] overflow-hidden group shadow-[0_8px_30px_rgba(33,54,46,0.2)] z-10"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80"
                    alt="Digital Marketing"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21362e]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block bg-white/90 text-[#21362e] text-xs font-bold px-2.5 py-1 rounded-md">Marketing</span>
                  </div>
                </motion.div>
              </div>

              {/* Floating service count badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1, type: "spring", bounce: 0.5 }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-left-3 z-20 bg-[#21362e] text-white rounded-2xl px-5 py-3 shadow-[0_10px_40px_rgba(33,54,46,0.35)] flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#b8ea27] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-[#21362e]" />
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight">5+ Services</p>
                  <p className="text-white/60 text-xs">End-to-end solutions</p>
                </div>
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-8 sm:py-12 section-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-[#21362e] text-center mb-10"
          >
            Everything You Need to Succeed Online
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-[#ffffff] p-4 rounded-lg card-shadow flex items-center gap-3 border border-[#b8ea27]/30"
              >
                <CheckCircle className="w-5 h-5 text-[#b8ea27] flex-shrink-0" />
                <span className="text-sm font-medium text-[#21362e]">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Cards (Alternating Layout) */}
      <section className="py-8 sm:py-12 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
          {allServices.map((service, index) => {
            const Icon = service.icon;
            const isReversed = index % 2 !== 0;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Text Content Block */}
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8fafc] text-[#21362e] text-sm font-semibold mb-2">
                    <Icon className="w-4 h-4" />
                    <span>{service.title.split(' ')[0]} Solutions</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#21362e] leading-tight flex-wrap">
                    {service.title}
                  </h2>
                  <p className="text-lg text-[#21362e]/80 leading-relaxed">
                    {service.fullDescription || `Elevate your digital footprint with our bespoke ${service.title.toLowerCase()} solutions. We engineer secure, highly-performant architectures designed to scale with your ambition and captivate your target audience.`}
                  </p>
                  <p className="text-[#21362e]/70 leading-relaxed">
                    {service.detailedBenefit || `Our end-to-end framework encompasses everything from strategic discovery and deep technical execution to long-term lifecycle management and ${service.features[0].toLowerCase() === 'custom ui/ux design' ? 'experience optimization' : service.features[0].toLowerCase()}.`}
                  </p>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="px-6 py-2.5 rounded-lg bg-[#b8ea27] text-[#21362e] font-semibold hover:bg-[#a6d420] transition-all duration-300 shadow-lg"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => setIsContactOpen(true)}
                      className="px-6 py-2.5 rounded-lg bg-[#21362e] text-[#ffffff] font-semibold hover:bg-[#21362e]/90 shadow-lg shadow-[#21362e]/30 hover:shadow-[#21362e]/50 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      Get Started
                    </button>
                  </div>
                </div>

                {/* Image Block */}
                <div className="flex-1 w-full">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 border-[8px] border-black/5 rounded-2xl pointer-events-none"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Service Details Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedService.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedService.features.map((feature: string) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#b8ea27] mt-0.5 flex-shrink-0" />
                        <span className="text-[#21362e]/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">Pricing</h4>
                  <p className="text-2xl font-bold" style={{ color: selectedService.accent }}>
                    {selectedService.pricing}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Process</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.process.map((step: string, idx: number) => (
                      <div
                        key={step}
                        className="px-4 py-2 rounded-lg text-[#ffffff] font-medium"
                        style={{ background: selectedService.accent }}
                      >
                        {idx + 1}. {step}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.technologies.map((tech: string) => (
                      <div
                        key={tech}
                        className="px-4 py-2 rounded-lg border-2"
                        style={{ borderColor: selectedService.accent, color: selectedService.accent }}
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => { setSelectedService(null); setIsContactOpen(true); }}
                  className="w-full py-3 rounded-lg text-[#ffffff] font-semibold"
                  style={{ background: selectedService.accent }}
                >
                  Get Started Now
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
