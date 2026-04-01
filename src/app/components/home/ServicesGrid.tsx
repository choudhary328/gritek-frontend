import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Code2, ShoppingCart, Smartphone, TrendingUp, PenTool, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'We deliver complete web solutions including high-performance websites and a custom Admin Panel for full control over your digital assets.',
    color: '#b8ea27',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Development',
    description: 'Scalable online stores with automated inventory, secure payments, and data-driven insights to maximize your sales growth.',
    color: '#b8ea27',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native-feel iOS and Android applications engineered for speed, security, and exceptional user engagement.',
    color: '#b8ea27',
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Accelerating brand visibility through strategic, data-orchestrated marketing campaigns that deliver measurable ROI.',
    color: '#b8ea27',
  },
  {
    icon: PenTool,
    title: 'Graphic Design',
    description: 'Defining your visual identity through sophisticated design that resonates with your audience and elevates your brand.',
    color: '#b8ea27',
  },
];

export function ServicesGrid() {
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
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-[#21362e] mb-3"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base text-[#21362e]/70"
          >
            End-to-end digital solutions tailored to your business needs
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-[#ffffff] p-6 rounded-2xl border border-[#b8ea27]/20 card-shadow transition-smooth hover:card-shadow-hover group cursor-pointer"
              >
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-smooth"
                  style={{ backgroundColor: service.color }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-[#21362e] mb-3">{service.title}</h3>
                <p className="text-sm text-[#21362e]/70 mb-4">{service.description}</p>
                <Link to="/services" className="inline-flex items-center gap-2 font-semibold transition-smooth group-hover:gap-3" style={{ color: service.color }}>
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link to="/services">
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#b8ea27] text-[#21362e] text-sm px-6 py-3 rounded-lg btn-glow transition-smooth font-semibold"
            >
              View All Services
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}