'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    // Set active link based on current path
    setActiveLink(window.location.pathname);

    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/about', label: 'Hakkımızda' },
    { href: '/projects', label: 'Projelerimiz' },
    { href: '/gallery', label: 'Galeri' },
    { href: '/contact', label: 'İletişim' }
  ];

  const socialLinks = [
    { href: '#', icon: <Facebook className="w-5 h-5" />, label: 'Facebook page' },
    { href: '#', icon: <Instagram className="w-5 h-5" />, label: 'Instagram page' },
    { href: '#', icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn profile' },
    { href: '#', icon: <Youtube className="w-5 h-5" />, label: 'YouTube channel' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-gradient-to-r from-gray-100/90 to-white/90 backdrop-blur-sm shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center p-4 m-0">
        {/* Logo with enhanced animation */}
        <Link 
          href="/" 
          className="text-2xl font-bold transition-all duration-300 text-black hover:text-black transform hover:scale-105"
        >
          <span className="text-black">
            tibetakademi.com
          </span>
        </Link>

        {/* Mobile Menu Button with enhanced animation */}
        <button 
          type="button" 
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm md:hidden focus:outline-none rounded-lg text-black hover:bg-gray-100/50 transition-all duration-300"
          onClick={toggleMenu}
          aria-controls="navbar-sticky-content" 
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Toggle menu</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={`lucide lucide-menu w-6 h-6 transition-transform duration-300 transform ${isMenuOpen ? 'rotate-90 scale-110' : ''}`}
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </button>

        {/* Desktop Navigation with enhanced animations */}
        <div 
          className={`hidden w-full md:flex md:items-center md:w-auto md:order-1`} 
          id="navbar-sticky-content"
        >
          <ul className="
            flex flex-col p-4 md:p-0 mt-4 md:mt-0 md:flex-row md:space-x-8 rtl:space-x-reverse items-center
            bg-transparent
          ">
            {navLinks.map((link) => (
              <li key={link.href} className="my-2 md:my-0">
                <Link 
                  href={link.href}
                  className={`relative block py-2 px-3 md:p-0 font-medium transition-all duration-300 ease-in-out hover:text-black 
                    after:absolute after:w-0 hover:after:w-full after:h-0.5 after:bg-black after:bottom-0 after:left-0 after:transition-all after:duration-300
                    ${activeLink === link.href ? 'text-black after:absolute after:w-full after:h-0.5 after:bg-black after:bottom-0 after:left-0' : 'text-gray-700'}`}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                  {(hoveredLink === link.href && activeLink !== link.href) && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full animate-ping"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social Icons with enhanced animations */}
          <div className="
            flex items-center space-x-4 rtl:space-x-reverse md:ms-6 mt-4 md:mt-0 
          ">
            {socialLinks.map((social, index) => (
              <Link 
                key={index} 
                href={social.href}
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-gray-700 hover:text-black transition-all duration-300 transform hover:scale-125"
              >
                {social.icon}
                <span className="sr-only">{social.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu with enhanced animations */}
      <div 
        className={`md:hidden fixed inset-0 bg-gradient-to-b from-gray-50/95 to-white/95 backdrop-blur-lg z-40 transition-all duration-500 ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <nav className="flex flex-col items-center space-y-6">
            {navLinks.map((link, index) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-2xl font-bold transition-all duration-300 transform ${
                  activeLink === link.href 
                    ? 'text-black scale-110' 
                    : 'text-gray-700 hover:text-black hover:scale-110'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                  animation: isMenuOpen ? `fadeInUp 0.5s ease-out ${index * 0.1}s forwards` : 'none'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative">
                  {link.label}
                  {activeLink === link.href && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-black"></span>
                  )}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-6 mt-12">
            {socialLinks.map((social, index) => (
              <Link 
                key={index} 
                href={social.href}
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-gray-700 hover:text-black transition-all duration-300 transform hover:scale-125"
                style={{ 
                  opacity: 0,
                  animation: isMenuOpen ? `fadeInUp 0.5s ease-out ${(navLinks.length + index) * 0.1}s forwards` : 'none'
                }}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
