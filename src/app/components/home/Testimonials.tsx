import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Star } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ReviewModal } from './ReviewModal';
import { API_BASE_URL } from '../../config/api';

const staticTestimonials = [
  {
    name: 'Rajesh Kumar',
    company: 'Tech Innovations Pvt Ltd',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    rating: 5,
    review: 'Gritek Solution engineered our enterprise platform with remarkable precision. Their technical stewardship and post-deployment support have been definitive factors in our digital success.',
    verified: true,
  },
  {
    name: 'Priya Sharma',
    company: 'Fashion Hub',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    rating: 5,
    review: 'The design-first methodology at Gritek transformed our digital identity. We saw a subatantial increase in user engagement and conversion metrics immediately following the new site launch.',
    verified: true,
  },
  {
    name: 'Amit Patel',
    company: 'Digital Marketing Agency',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    rating: 5,
    review: 'Our mobile ecosystem, developed by the Gritek team, is both sophisticated and robust. Their ability to translate complex business logic into intuitive mobile experiences is unparalleled.',
    verified: true,
  },
  {
    name: 'Sneha Desai',
    company: 'Wellness Studio',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    rating: 5,
    review: 'From the initial architecture to the final deployment, Gritek maintained a level of professionalism and technical rigor that is rare in the industry. They are true strategic partners.',
    verified: true,
  },
];

export function Testimonials() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dynamicReviews, setDynamicReviews] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/reviews/approved`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setDynamicReviews(data);
        }
      })
      .catch(err => console.error('Failed to fetch reviews', err));
  }, []);

  const allTestimonials = [
    ...(Array.isArray(dynamicReviews) ? dynamicReviews.map(r => ({
      name: r.name,
      company: r.company || r.role,
      photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=21362e&color=fff`,
      rating: r.rating,
      review: r.comment,
      verified: true,
    })) : []),
    ...staticTestimonials
  ];

  return (
    <section className="py-8 sm:py-12 bg-[#f8fafc]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Left Side Content */}
          <div className="text-left">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[#b8ea27] font-semibold mb-3 text-sm tracking-wider"
            >
              Testimonials
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-[#21362e] mb-4 sm:mb-5 leading-tight"
            >
              We Have Worked with<br />Hundreds of Amazing People
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base text-[#21362e]/80 mb-10 max-w-lg leading-relaxed"
            >
              Our clients' satisfaction speaks volumes. Their positive feedback and loyalty are a testament to our dedication and expertise.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button onClick={() => setIsModalOpen(true)} className="border border-[#21362e] text-[#21362e] px-5 py-2.5 rounded-md hover:bg-[#21362e]/10 transition-colors font-semibold text-sm">
                Leave a Review
              </button>
              <Link to="/portfolio">
                <button className="bg-[#b8ea27] text-[#21362e] px-5 py-2.5 rounded-md hover:bg-[#b8ea27]/80 transition-colors font-semibold text-sm">
                  Check Our Portfolio
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right Side Testimonials Swiper */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Swiper
              key={allTestimonials.length} // Force re-render when dynamic reviews arrive
              modules={[Navigation, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              navigation={{
                nextEl: '.testi-next',
                prevEl: '.testi-prev',
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="testimonials-custom-swiper rounded-xl"
            >
              {allTestimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-[#ffffff] p-5 sm:p-8 md:p-10 rounded-xl h-full shadow-2xl relative border border-[#b8ea27]/30 flex flex-col min-h-[300px]">
                    <p className="text-[#21362e] text-base sm:text-lg md:text-xl font-medium italic leading-relaxed mb-6 sm:mb-10 flex-1">
                      "{testimonial.review}"
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-4">
                        <ImageWithFallback
                          src={testimonial.photo}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover shadow-md"
                        />
                        <div>
                          <h4 className="font-bold text-base sm:text-xl text-[#21362e] mb-1">{testimonial.name}</h4>
                          <p className="text-sm text-[#21362e]/70 mb-2">{testimonial.company}</p>
                          <div className="flex gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-[#b8ea27] fill-[#b8ea27]" />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="hidden sm:flex w-12 h-12 rounded-full bg-[#b8ea27]/50 items-center justify-center text-[#21362e]">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-[#21362e] rounded-full"></span>
                          <span className="w-1.5 h-1.5 bg-[#21362e] rounded-full"></span>
                          <span className="w-1.5 h-1.5 bg-[#21362e] opacity-50 rounded-full"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:-left-6 z-10">
              <button className="testi-prev w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#21362e] text-white flex items-center justify-center hover:bg-[#b8ea27] hover:text-[#21362e] shadow-lg transition-all hover:scale-105">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-6 z-10">
              <button className="testi-next w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#21362e] text-white flex items-center justify-center hover:bg-[#b8ea27] hover:text-[#21362e] shadow-lg transition-all hover:scale-105">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

          </motion.div>
        </div>
      </div>
      
      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}