import { motion } from 'motion/react';
import { Star, Shield, Award, Users } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <div ref={ref} className="text-2xl md:text-3xl font-bold text-[#ffffff] mb-2">
      {count}
      {suffix}
    </div>
  );
}

export function TrustBanner() {
  const stats = [
    { icon: Star, value: 4.9, label: 'Rating', suffix: '/5' },
    { icon: Shield, value: 100, label: 'Secure', suffix: '%' },
    { icon: Award, value: 50, label: 'Projects Delivered', suffix: '+' },
    { icon: Users, value: 35, label: 'Client Satisfaction', suffix: 'k+' },
  ];

  return (
    <section className="gradient-cta py-10 sm:py-16 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: 'linear-gradient(45deg, #21362e 25%, transparent 25%, transparent 75%, #b8ea27 75%, #b8ea27)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-[#ffffff] text-center mb-8 sm:mb-10"
        >
          Trusted by 35k+ People
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <motion.div
                  className="flex justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#b8ea27]/20 backdrop-blur-md flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[#ffffff]" />
                  </div>
                </motion.div>
                <Counter end={stat.value!} suffix={stat.suffix} />
                <div className="text-[#ffffff]/70 text-base">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}