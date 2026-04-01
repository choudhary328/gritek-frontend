import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ContactModal } from '../components/ContactModal';
import luxuryJewelleryImg from '../../assets/jewelleryshop.jpeg';
import healthcareImg from '../../assets/healthcare.jpeg';

import img1 from '../../assets/giftishop.jpeg';
import img2 from '../../assets/JEWELLERY.jpeg';

import { API_BASE_URL, BACKEND_URL } from '../config/api';

const projects = [
  {
    title: 'Gift Shop',
    category: 'E-Commerce',
    image: img1,
    description: 'A premium e-commerce platform designed for seamless gift discovery, featuring a curated UI and lightning-fast checkout.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    demoLink: 'https://gift-shop-ecru-kappa.vercel.app/',
  },
  {
    title: 'Travel Website',
    category: 'Websites',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
    description: "An immersive digital doorway to the world's finest destinations, blending stunning visuals with intuitive itinerary planning.",
    technologies: ['Next.js', 'Figma', 'Vercel'],
    demoLink: 'https://travelsite24.figma.site',
  },
  {
    title: 'Luxury Jewellery',
    category: 'Web Apps',
    image: luxuryJewelleryImg,
    description: 'A sophisticated digital boutique for high-end gems, emphasizing elegance through minimalist design and rich product storytelling.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    demoLink: 'https://luxuryjewellery.figma.site',
  },
  {
    title: 'Gift Shop Online',
    category: 'Websites',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
    description: 'A dynamic, growth-oriented online marketplace built for high-volume sales and robust customer engagement.',
    technologies: ['React', 'Tailwind', 'Lovable'],
    demoLink: 'https://giftishop.lovable.app',
  },
  {
    title: 'Kicks Footware',
    category: 'Mobile Apps',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    description: 'A trend-setting mobile shopping experience for sneaker enthusiasts, optimized for speed and seamless mobile payments.',
    technologies: ['Flutter', 'Firebase', 'Lovable'],
    demoLink: 'https://kicksfootware.lovable.app',
  },
  {
    title: 'Healthcare Dashboard',
    category: 'Web Apps',
    image: healthcareImg,
    description: 'A data-intelligent management portal for healthcare providers, simplifying complex medical analytics into actionable insights.',
    technologies: ['React', 'Chart.js', 'Node.js'],
    demoLink: '',
  },
  {
    title: 'Luxury Gems',
    category: 'Websites',
    image: img2,
    description: 'A dedicated brand showcase for exclusive jewellery collections, focusing on high-conversion visual aesthetics and luxury feel.',
    technologies: ['Figma', 'Next.js', 'Tailwind'],
    demoLink: 'https://luxuryjewellery.figma.site',
  },
];

const categories = ['All', 'Websites', 'E-Commerce', 'Mobile Apps', 'Design'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [dynamicProjects, setDynamicProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/projects`);
        const data = await res.json();
        if (Array.isArray(data)) {
          // Format dynamic data to match existing structure
          const formatted = data.map(p => ({
            title: p.title,
            category: p.category,
            image: `${BACKEND_URL}${p.image}`,
            technologies: p.technologies || [],
            demoLink: p.demoLink || '',
          }));
          setDynamicProjects(formatted);
        }
      } catch (err) {
        console.error('Failed to fetch dynamic projects', err);
      }
    };
    fetchProjects();
  }, []);

  const allProjects = [...dynamicProjects, ...projects];

  const filteredProjects =
    activeCategory === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

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
                Our Creative Portfolio
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#21362e] mb-4 tracking-tight leading-tight">
                Showcase Our <br />
                <span className="text-[#b8ea27]">
                  Demo Projects
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-[#21362e]/80 mb-6 sm:mb-10 max-w-xl leading-relaxed">
                We craft digital experiences that drive results, inspire users, and transform businesses through innovative design and cutting-edge technology.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="bg-[#b8ea27] text-[#21362e] px-6 py-3 rounded-xl font-bold text-base hover:shadow-[0_0_20px_rgba(184,234,39,0.5)] transition-all duration-300 transform hover:-translate-y-1"
                >
                  Start Your Project
                </button>
                <Link to="/services">
                  <button className="bg-[#21362e] text-[#b8ea27] px-6 py-3 rounded-xl font-bold text-base hover:bg-[#1a2b24] transition-all duration-300 shadow-lg">
                    View Services
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Enhanced 3 Image Overlap Showcase */}
            <div className="relative h-[280px] sm:h-[370px] lg:h-[460px] flex justify-center items-center w-full mt-10 lg:mt-0">

              {/* Decorative pulsing gradient orbs */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.45, 0.25] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-6 w-44 h-44 rounded-full bg-gradient-to-br from-[#b8ea27]/35 to-[#21362e]/10 blur-3xl z-0"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-6 -left-8 w-36 h-36 rounded-full bg-gradient-to-tr from-[#21362e]/15 to-[#b8ea27]/25 blur-3xl z-0"
              />

              {/* Subtle rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square rounded-full border border-dashed border-[#b8ea27]/20 z-0"
              />

              {/* Left Back Image */}
              <motion.div
                initial={{ opacity: 0, x: 80, rotateY: 25, scale: 0.8 }}
                animate={{ opacity: 1, x: -90, rotateY: 15, scale: 0.85 }}
                transition={{ duration: 1, delay: 0.2, type: "spring" }}
                whileHover={{ scale: 0.9, rotateY: 8 }}
                className="absolute z-10 w-[55%] md:w-[48%] rounded-2xl overflow-hidden origin-right"
                style={{ perspective: '1000px', transformStyle: 'preserve-3d', right: '50%' }}
              >
                <div className="rounded-2xl overflow-hidden shadow-[-8px_16px_35px_rgba(33,54,46,0.35)] border-[5px] md:border-[8px] border-white">
                  <div className="relative">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80"
                      alt="Mobile App Project"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#21362e]/50 via-transparent to-[#b8ea27]/10" />
                  </div>
                </div>
              </motion.div>

              {/* Right Back Image */}
              <motion.div
                initial={{ opacity: 0, x: -80, rotateY: -25, scale: 0.8 }}
                animate={{ opacity: 1, x: 90, rotateY: -15, scale: 0.85 }}
                transition={{ duration: 1, delay: 0.35, type: "spring" }}
                whileHover={{ scale: 0.9, rotateY: -8 }}
                className="absolute z-10 w-[55%] md:w-[48%] rounded-2xl overflow-hidden origin-left"
                style={{ perspective: '1000px', transformStyle: 'preserve-3d', left: '50%' }}
              >
                <div className="rounded-2xl overflow-hidden shadow-[8px_16px_35px_rgba(33,54,46,0.35)] border-[5px] md:border-[8px] border-white">
                  <div className="relative">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                      alt="Corporate Website Project"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#21362e]/50 via-transparent to-[#b8ea27]/10" />
                  </div>
                </div>
              </motion.div>

              {/* Center Main Image */}
              <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1.05 }}
                transition={{ duration: 0.9, delay: 0.55, type: "spring", bounce: 0.35 }}
                whileHover={{ scale: 1.08, y: -5 }}
                className="absolute z-30 w-[68%] md:w-[62%] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(33,54,46,0.45)]"
              >
                <div className="border-[6px] md:border-[10px] border-white rounded-2xl bg-white relative group overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80"
                    alt="E-Commerce Platform"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21362e]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="text-white font-bold text-xs sm:text-sm tracking-wide">E-Commerce Platform</span>
                    <span className="bg-[#b8ea27] text-[#21362e] text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">Featured</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating projects count badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring", bounce: 0.5 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-left-2 z-40 bg-[#21362e] text-white rounded-2xl px-5 py-3 shadow-[0_10px_40px_rgba(33,54,46,0.4)] flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#b8ea27] flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-[#21362e]" />
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight">9+ Projects</p>
                  <p className="text-white/60 text-xs">Delivered with excellence</p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-8 sm:py-12 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header & Filter */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#21362e] mb-3">All Projects</h2>
            <p className="text-[#21362e]/70 mb-8">{filteredProjects.length} projects found</p>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeCategory === category
                    ? 'bg-[#21362e] text-[#ffffff] shadow-lg shadow-[#21362e]/30'
                    : 'bg-[#f8fafc] text-[#21362e]/80 hover:bg-[#b8ea27]/30 border border-[#b8ea27]/30'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col group"
              >
                {/* Card Top - Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Decorative elements simulating UI components */}
                  <div className="absolute top-4 left-4 bg-[#21362e] text-[#ffffff] text-[10px] font-bold px-2 py-1 rounded-md tracking-wider uppercase">
                    Featured
                  </div>

                  {/* Hover Buttons */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button onClick={() => { setSelectedProject(project); setIsModalOpen(true); }} className="bg-[#ffffff] text-[#21362e] text-xs font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-[#f8fafc] transition-colors">
                      View Details
                    </button>
                    {project.demoLink && (
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="bg-[#21362e] text-[#ffffff] text-xs font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-[#21362e]/90 transition-colors flex items-center gap-1">
                        Live <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Body - Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-[#21362e] line-clamp-1">{project.title}</h3>
                  </div>
                  <div className="text-xs font-semibold text-[#21362e]/70 mb-3">{project.category}</div>

                  <p className="text-[#21362e]/60 text-sm mb-6 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[#b8ea27]/30">
                    {project.technologies.slice(0, 3).map((tech: string) => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium text-[#21362e] bg-[#f8fafc] px-2.5 py-1 rounded-md border border-[#b8ea27]/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[11px] font-medium text-[#64748B] bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 bg-white/50 hover:bg-white text-[#21362e] p-2 rounded-full backdrop-blur-md transition-colors shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="md:w-1/2 h-64 md:h-auto relative">
                <ImageWithFallback src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
              </div>

              <div className="p-6 sm:p-8 md:w-1/2 overflow-y-auto">
                <div className="text-sm font-semibold text-[#b8ea27] mb-2">{selectedProject.category}</div>
                <h3 className="text-2xl font-bold text-[#21362e] mb-4">{selectedProject.title}</h3>

                <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                  {selectedProject.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-bold text-[#21362e] mb-3 text-sm">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech: string) => (
                      <span key={tech} className="text-xs font-semibold text-[#21362e] bg-gray-100 px-3 py-1.5 rounded-lg border border-[#b8ea27]/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.demoLink && (
                  <a href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#b8ea27] text-[#21362e] px-6 py-3 rounded-lg font-bold hover:shadow-[0_0_15px_rgba(184,234,39,0.5)] transition-all transform hover:-translate-y-1">
                    View Live Demo <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
