'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fadeIn' | 'slideInFromLeft' | 'slideInFromRight' | 'zoomIn' | 'fadeInUp' | 'fadeInDown' | 'rotateIn' | 'blurIn';
}

const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0,
  animation = 'fadeIn'
}: AnimatedSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  const getInitialTransform = () => {
    switch(animation) {
      case 'slideInFromLeft': return 'translateX(-30px)';
      case 'slideInFromRight': return 'translateX(30px)';
      case 'zoomIn': return 'scale(0.95)';
      case 'fadeInUp': return 'translateY(20px)';
      case 'fadeInDown': return 'translateY(-20px)';
      case 'rotateIn': return 'rotate(-5deg) scale(0.95)';
      case 'blurIn': return 'none'; // blur is handled via filter
      default: return 'translateY(20px)';
    }
  };
  
  return (
    <section 
      ref={ref} 
      className={`${className} transition-all duration-1000 ease-out`}
      style={{ 
        opacity: inView ? 1 : 0,
        transform: !inView ? getInitialTransform() : 'none',
        filter: !inView && animation === 'blurIn' ? 'blur(10px)' : 'none',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;
