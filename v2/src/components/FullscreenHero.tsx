'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import MarqueeText from './MarqueeText';

const FullscreenHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<React.ReactNode[]>([]);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
    
    // Mouse move parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { clientX, clientY } = e;
        const { width, height } = heroRef.current.getBoundingClientRect();
        
        // Calculate mouse position relative to the center of the section
        const x = (clientX / width - 0.5) * 2; // -1 to 1
        const y = (clientY / height - 0.5) * 2; // -1 to 1
        
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Generate particles only on client-side to avoid hydration mismatch
    setParticles(generateParticles(20));
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Generate random particles with different colors and animations
  const generateParticles = (count: number) => {
    return [...Array(count)].map((_, i) => {
      const size = Math.random() * 10 + 5;
      const delay = Math.random() * 2;
      const duration = Math.random() * 5 + 3;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const opacity = Math.random() * 0.5 + 0.3;
      
      return (
        <div 
          key={i}
          className="absolute rounded-full bg-gray-300"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size * 0.7}px`,
            opacity: opacity,
            animation: `float ${duration}s ease-in-out infinite`,
            animationDelay: `${delay}s`
          }}
        ></div>
      );
    });
  };

  return (
    <section 
      ref={heroRef}
      className="h-screen w-full flex flex-col justify-center items-center text-center text-gray-800 relative overflow-hidden m-0 p-0"
    >
      {/* Light gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/95 via-white/90 to-gray-50/95 z-0"></div>
      
      {/* Animated background particles with parallax effect */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full">
          {particles}
        </div>
      </div>

      <div className={`relative z-10 p-6 w-full transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} mt-[-100px]`}>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight heading-shadow animate-glow">
          <span className="text-black">
            Erasmus Projeleriyle Geleceğe
          </span>
          <br />
          <span className="text-black animate-float">
            Köprü Kuruyoruz
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-10 w-full max-w-5xl mx-auto animate-fadeIn" style={{animationDelay: '0.3s'}}>
          Sosyal yardım ve dayanışma projelerimizle Avrupa'dan katılımcılarla birlikte çalışıyor, fark yaratıyoruz.
        </p>

        {/* Marquee Slogan Section - removed static background layer */}
        <div className="w-full mx-auto my-8 animate-fadeIn" style={{animationDelay: '0.6s'}}>
          <MarqueeText 
            text="Avrupa Fırsatları • Kültürlerarası Etkileşim • Sosyal Sorumluluk • Gönüllülük Projeleri • Gençlik Değişimleri • Yenilikçi Yaklaşımlar"
            className="text-black font-medium"
            speed="normal"
          />
        </div>

        {/* Enhanced CTA buttons with light theme */}
        <div className="space-x-4 animate-fadeIn" style={{animationDelay: '0.9s'}}>
          <Link 
            href="/projects"
            className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
          >
            Projelerimizi Keşfedin
          </Link>
          <Link 
            href="/contact"
            className="bg-transparent border-2 border-black hover:border-gray-800 hover:bg-gray-50 text-black hover:text-gray-800 font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Bize Ulaşın
          </Link>
        </div>
      </div>
      
      {/* Enhanced scroll indicator with animation */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-8 h-8 text-black" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default FullscreenHero;
