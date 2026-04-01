import { HeroSection } from '../components/home/HeroSection';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { TrustBanner } from '../components/home/TrustBanner';
import { PortfolioShowcase } from '../components/home/PortfolioShowcase';
import { Testimonials } from '../components/home/Testimonials';
import { FAQ } from '../components/home/FAQ';
import { CTABanner } from '../components/home/CTABanner';
import { ContactSection } from '../components/home/ContactSection';
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <TrustBanner />
      <PortfolioShowcase />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <ContactSection />
      
      {/* Scroll to Top Button for Home Page */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[#21362e] text-[#b8ea27] shadow-lg shadow-[#21362e]/30 hover:shadow-[#21362e]/50 hover:scale-110 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
