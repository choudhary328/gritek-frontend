import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';
import { ContactModal } from './ContactModal';
import logoImg from '../../assets/new-logo.png';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/portfolio' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:flex w-full bg-[#21362e] text-white text-[13px] font-medium py-3 px-4 sm:px-6 lg:px-8 justify-between items-center relative overflow-hidden">
        <div className="flex gap-8 z-10 ml-8">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#b8ea27] fill-[#b8ea27]" />
            <span>+91 9624657989</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#b8ea27] fill-[#b8ea27]" />
            <span>griteksolutions@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#b8ea27] fill-[#b8ea27]" />
            <span>Badoli - 394601, Surat, Gujarat, India </span>
          </div>
        </div>

        {/* Right side social block */}
        <div className="absolute right-0 top-0 bottom-0 bg-[#b8ea27] px-12 flex items-center gap-5 z-0" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}>
          <div className="w-[18px] h-[18px] ml-8 cursor-pointer text-[#21362e] hover:opacity-80 transition-opacity">
            <Facebook className="w-full h-full fill-[#21362e]" />
          </div>
          <div className="w-[18px] h-[18px] cursor-pointer text-[#21362e] hover:opacity-80 transition-opacity">
            <Twitter className="w-full h-full fill-[#21362e]" />
          </div>
          <div className="w-[18px] h-[18px] cursor-pointer text-[#21362e] hover:opacity-80 transition-opacity">
            <Youtube className="w-full h-full" />
          </div>
          <div className="w-[18px] h-[18px] cursor-pointer text-[#21362e] hover:opacity-80 transition-opacity">
            <Linkedin className="w-full h-full fill-[#21362e]" />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'py-2 shadow-md' : 'py-4 shadow-sm'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 py-1">
              <img src={logoImg} alt="Gritek Solution Logo" className="h-16 sm:h-20 w-auto object-contain" />
              <span className="text-xl sm:text-2xl font-extrabold text-[#21362e] tracking-tight whitespace-nowrap">
                GRITEK SOLUTION
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[15px] text-[#21362e]/80 hover:text-[#21362e] font-bold transition-colors relative ${location.pathname === link.path
                    ? 'text-[#21362e] font-extrabold'
                    : ''
                    }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#b8ea27] rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button
                onClick={() => setIsContactOpen(true)}
                className="bg-[#21362e] text-[#b8ea27] text-[15px] font-bold px-7 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-md"
              >
                Get Free Consulting
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#21362e]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-100 bg-white rounded-b-2xl shadow-lg absolute left-0 right-0 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 text-sm text-[#21362e]/80 hover:text-[#21362e] transition-colors ${location.pathname === link.path ? 'text-[#21362e] font-bold bg-gray-50 rounded-lg' : ''
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-4 pt-4 mt-2 border-t border-gray-100">
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setIsContactOpen(true); }}
                  className="bg-[#21362e] text-[#b8ea27] text-sm font-bold px-6 py-3 rounded-full w-full hover:bg-opacity-90 shadow-md"
                >
                  Get Free Consulting
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}