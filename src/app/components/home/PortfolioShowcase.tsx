import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useState } from 'react';
import { ContactModal } from '../ContactModal';

import img1 from '../../../assets/gift shop online.png';
import img3 from '../../../assets/giftishop.jpeg';
import img4 from '../../../assets/jewelleryshop.jpeg';
import img5 from '../../../assets/JEWELLERY.jpeg';

const portfolioProjects = [
  {
    title: 'Gift Shop',
    image: img1,
    category: 'E-Commerce',
    description: 'A premium e-commerce platform designed for seamless gift discovery, featuring a curated UI and lightning-fast checkout.',
    demoLink: 'https://gift-shop-ecru-kappa.vercel.app/',
  },

  {
    title: 'Healthcare Dashboard',
    image: img3,
    category: 'Web App',
    description: 'A data-intelligent management portal for healthcare providers, simplifying complex medical analytics into actionable insights.',
    demoLink: '',
  },
  {
    title: 'Luxury Jewellery',
    image: img4,
    category: 'Web App',
    description: 'A sophisticated digital boutique for high-end gems, emphasizing elegance through minimalist design and rich product storytelling.',
    demoLink: 'https://luxuryjewellery.figma.site',
  },
  {
    title: 'Gift Shop Online',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
    category: 'Website',
    description: 'A dynamic, growth-oriented online marketplace built for high-volume sales and robust customer engagement.',
    demoLink: 'https://giftishop.lovable.app',
  },
  {
    title: 'Kicks Footware',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    category: 'Mobile App',
    description: 'A trend-setting mobile shopping experience for sneaker enthusiasts, optimized for speed and seamless mobile payments.',
    demoLink: 'https://kicksfootware.lovable.app',
  },
  {
    title: 'Luxury Gems',
    image: img5,
    category: 'Website',
    description: 'A dedicated brand showcase for exclusive jewellery collections, focusing on high-conversion visual aesthetics and luxury feel.',
    demoLink: 'https://luxuryjewellery.figma.site',
  },
];

export function PortfolioShowcase() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <section className="py-8 sm:py-12 bg-white">
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
              Our Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-[#21362e] mb-4"
            >
              Showcasing Our Passion for Innovation and Quality
            </motion.h2>
          </div>

          {/* Swiper Carousel */}
          <div className="mb-12 relative">
            <Swiper
              modules={[Navigation, Autoplay, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              initialSlide={3}
              loop={true}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              coverflowEffect={{
                rotate: 5,
                stretch: 0,
                depth: 300,
                modifier: 2,
                slideShadows: true,
              }}
              className="portfolio-swiper !pb-8"
            >
              {portfolioProjects.map((project, index) => (
                <SwiperSlide key={index} className="!w-[260px] sm:!w-[380px] lg:!w-[480px]">
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group bg-white shadow-2xl border-[4px] sm:border-[6px] border-white/90">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[300px] sm:h-[420px] lg:h-[520px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#21362e]/90 via-[#21362e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-8 rounded-xl sm:rounded-2xl">
                      <div className="text-xs sm:text-sm font-semibold text-[#b8ea27] mb-1 sm:mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.category}</div>
                      <div className="flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        <h3 className="text-lg sm:text-2xl font-bold text-[#ffffff]">{project.title}</h3>
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#b8ea27] text-[#21362e] p-2 rounded-lg hover:scale-110 transition-transform"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button className="swiper-button-prev-custom w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#21362e] text-[#ffffff] flex items-center justify-center hover:bg-[#b8ea27] hover:text-[#21362e] transition-colors shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="swiper-button-next-custom w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#21362e] text-[#ffffff] flex items-center justify-center hover:bg-[#b8ea27] hover:text-[#21362e] transition-colors shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsContactOpen(true)}
              className="bg-[#21362e] text-[#b8ea27] text-sm px-6 py-2.5 rounded-lg transition-colors hover:bg-[#1a2b24] font-semibold shadow-lg"
            >
              Request A Quote
            </motion.button>
            <Link to="/portfolio">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#b8ea27] text-[#21362e] text-sm px-6 py-2.5 rounded-lg transition-colors hover:bg-[#a6d420] font-semibold shadow-lg"
              >
                Check Our Portfolio
              </motion.button>
            </Link>
          </div>
        </div>

        <style>{`
          .portfolio-swiper .swiper-slide-shadow-left,
          .portfolio-swiper .swiper-slide-shadow-right {
            border-radius: 1rem;
            background: linear-gradient(to right, rgba(0,0,0,0.35), transparent);
          }
          .portfolio-swiper .swiper-slide-shadow-right {
            background: linear-gradient(to left, rgba(0,0,0,0.35), transparent);
          }
          .portfolio-swiper .swiper-slide:not(.swiper-slide-active) {
              opacity: 0.7;
              filter: blur(1.5px);
              transform-origin: center;
          }
          .portfolio-swiper .swiper-slide-active {
              opacity: 1;
              filter: blur(0px);
              z-index: 10;
          }
        `}</style>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}