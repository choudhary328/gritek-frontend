import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function HeroSection() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[85vh] flex flex-col pt-8 sm:pt-12 overflow-hidden bg-white">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-grow w-full flex items-center py-6 sm:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-8 items-center w-full">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-start pr-0 lg:pr-8 relative order-1"
          >
            {/* Top Label */}
            <motion.div
              className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#b8ea27] rounded-sm mr-1"></div>
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#21362e] rounded-sm"></div>
              </div>
              <span className="text-gray-500 text-[12px] sm:text-[14px] font-bold tracking-wide">Elevate Your Brand With Us</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-[28px] sm:text-[40px] md:text-[52px] lg:text-[64px] font-extrabold text-[#21362e] mb-4 sm:mb-6 leading-[1.1] sm:leading-[1.05] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Empowering Your
              <br />
              Success with
              <br />
              Digital Expertise
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="text-[13px] sm:text-[15px] md:text-[16px] text-gray-500 mb-6 sm:mb-9 leading-[1.7] sm:leading-[1.8] max-w-md font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              We blend creative sophisticated design with cutting-edge technical engineering to deliver high-performance digital solutions that scale your business and redefine your industry position.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-3 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link to="/contact">
                <motion.button
                  className="bg-[#21362e] text-[#b8ea27] px-5 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg transition-smooth font-bold text-[13px] sm:text-[15px] hover:scale-105 flex items-center gap-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore More
                  <ArrowRight className="w-4 h-4 text-[#b8ea27] group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button
                  className="text-gray-600 px-5 sm:px-8 py-3 rounded-full border-2 border-[#21362e]/10 transition-smooth font-bold text-[13px] sm:text-[15px] hover:text-[#21362e] hover:border-[#21362e]/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Services
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Image Grid & Badge */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-full w-full flex justify-center lg:justify-end items-center order-2"
          >
             {/* Satisfied badge - visible on all screens */}
             <div className="absolute -left-4 sm:-left-8 lg:-left-16 bottom-4 sm:bottom-10 z-30">
               <motion.div 
                 initial={{ scale: 0, rotate: -45 }}
                 animate={{ scale: 1, rotate: 0 }}
                 transition={{ type: "spring", stiffness: 200, delay: 0.9 }}
                 className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-[#21362e] rounded-full flex items-center justify-center relative shadow-xl border-4 sm:border-8 border-white p-1 sm:p-2"
               >
                 <div className="absolute inset-0 border-[2px] border-dashed border-[#b8ea27] rounded-full border-opacity-40 m-1 sm:m-2 rotate-animation"></div>
                 <div className="text-center z-10 flex flex-col items-center">
                   <div className="text-[#b8ea27] text-lg sm:text-xl lg:text-2xl font-bold font-serif mb-[-2px] sm:mb-[-4px]">100%</div>
                   <div className="text-white text-[7px] sm:text-[9px] lg:text-[10px] tracking-wider uppercase font-semibold">Satisfied</div>
                 </div>
                 <Star className="absolute top-2 sm:top-4 left-2 sm:left-4 w-2 h-2 sm:w-3 sm:h-3 text-[#b8ea27] fill-[#b8ea27]" />
                 <Star className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-1.5 h-1.5 sm:w-2 sm:h-2 text-[#b8ea27] fill-[#b8ea27]" />
               </motion.div>
             </div>

             <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[350px] sm:max-w-[450px] lg:max-w-[500px] relative z-20">
                {/* Left tall image */}
                <div className="row-span-2 overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] rounded-tr-[2.5rem] sm:rounded-tr-[4rem] rounded-bl-[2.5rem] sm:rounded-bl-[4rem] h-[250px] sm:h-[350px] lg:h-[400px] shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
                    alt="Digital Experts"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Right top image */}
                <div className="overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] rounded-tl-[2.5rem] sm:rounded-tl-[4rem] rounded-br-[2.5rem] sm:rounded-br-[4rem] h-[120px] sm:h-[168px] lg:h-[192px] shadow-lg">
                   <ImageWithFallback
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
                    alt="Team Meeting"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Right bottom image */}
                <div className="overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] rounded-tr-[2.5rem] sm:rounded-tr-[4rem] rounded-bl-[2.5rem] sm:rounded-bl-[4rem] h-[120px] sm:h-[168px] lg:h-[192px] shadow-lg bg-gray-100 flex items-center justify-center relative">
                   <ImageWithFallback
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
                    alt="Creative Process"
                    className="w-full h-full object-cover absolute inset-0 mix-blend-multiply opacity-80"
                  />
                  <Star className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-4 h-4 sm:w-6 sm:h-6 text-[#b8ea27] fill-[#b8ea27] rotate-12 z-10" />
                </div>
             </div>
             
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Service Banner */}
      <div className="w-full bg-[#21362e] mt-8 sm:mt-16 py-3 sm:py-4 overflow-hidden relative border-b-4 sm:border-b-[6px] border-[#b8ea27]">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(6).fill(
            ["Content Marketing", "Social Media Marketing", "Search Engine Optimization"]
          ).flat().map((service, index) => (
             <div key={index} className="flex items-center shrink-0 mx-4 sm:mx-8">
               <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#b8ea27] fill-[#b8ea27] mr-4 sm:mr-8" />
               <span className="text-white font-bold tracking-wide text-sm sm:text-lg">{service}</span>
             </div>
          ))}
        </div>
        <style>{`
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .rotate-animation {
            animation: rotate-slow 10s linear infinite;
          }
          @keyframes rotate-slow {
             from { transform: rotate(0deg); }
             to { transform: rotate(360deg); }
          }
        `}</style>
      </div>

    </section>
  );
}