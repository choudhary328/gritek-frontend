import { Link } from 'react-router';
import { Facebook, Linkedin, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import logoImg from '../../assets/new-logo.png';

import { API_BASE_URL } from '../config/api';

export function Footer() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/settings`);
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (err) {
        console.error('Failed to fetch settings', err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-[#21362e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoImg} alt="Gritek Solution Logo" className="h-16 sm:h-20 w-auto object-contain" />
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase whitespace-nowrap">
                {settings?.companyName || 'GRITEK SOLUTION'}
              </h3>
            </div>
            <p className="text-white/70 mb-4 text-sm leading-relaxed">
              Transforming ideas into powerful digital solutions. We help businesses grow with cutting-edge technology and innovative strategies.
            </p>
            <div className="flex gap-3">
              {settings?.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#b8ea27] hover:text-[#21362e] transition-all text-white">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings?.linkedin && (
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#b8ea27] hover:text-[#21362e] transition-all text-white">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#b8ea27] hover:text-[#21362e] transition-all text-white">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings?.twitter && (
                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#b8ea27] hover:text-[#21362e] transition-all text-white">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-[#b8ea27] font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">Home</Link></li>
              <li><Link to="/about" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">About</Link></li>
              <li><Link to="/services" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">Services</Link></li>
              <li><Link to="/portfolio" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">Portfolio</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 - Our Services */}
          <div>
            <h4 className="text-[#b8ea27] font-bold mb-4 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2.5">
              <li><Link to="/services" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">Web Development</Link></li>
              <li><Link to="/services" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">E-Commerce</Link></li>
              <li><Link to="/services" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">Mobile Apps</Link></li>
              <li><Link to="/services" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">Digital Marketing</Link></li>
              <li><Link to="/services" className="text-white/70 hover:text-[#b8ea27] transition-colors text-sm">Graphic Design</Link></li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h4 className="text-[#b8ea27] font-bold mb-4 text-sm uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#b8ea27]" />
                <span className="text-white/70 text-sm">{settings?.address || 'Baben, Bardoli, Surat – Gujarat, India'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#b8ea27]" />
                <span className="text-white/70 text-sm">{settings?.phoneNumber || '+91 77780 20756'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#b8ea27]" />
                <span className="text-white/70 text-sm break-all">{settings?.contactEmail || 'griteksolutions@gmail.com'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#b8ea27]" />
                <span className="text-white/70 text-sm">Mon–Sat: 9:00 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} {settings?.companyName || 'Gritek Solution'}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
