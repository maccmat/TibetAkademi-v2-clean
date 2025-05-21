'use client';

import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  detailsLink: string;
  category?: string;
}

interface FeaturedProjectsCarouselProps {
  projects: Project[];
}

const FeaturedProjectsCarousel: React.FC<FeaturedProjectsCarouselProps> = ({ projects }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const scrollPositionRef = useRef<number>(0);
  const totalWidthRef = useRef<number>(0);
  const itemWidthRef = useRef<number>(0);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Timer for auto-resume after scroll pause
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clone projects for infinite scroll effect
  const extendedProjects = [...projects, ...projects, ...projects];

  // Initialize carousel dimensions and start animation
  useEffect(() => {
    const initCarousel = () => {
      if (scrollRef.current && containerRef.current) {
        // Calculate item width based on container width
        const containerWidth = containerRef.current.clientWidth;
        const itemWidth = containerWidth / Math.min(3, projects.length);
        itemWidthRef.current = itemWidth;
        
        // Set total width for the scrolling container
        totalWidthRef.current = itemWidth * projects.length;
        
        // Set initial scroll position to show the first set of projects
        if (scrollRef.current) {
          scrollRef.current.style.transform = `translateX(${scrollPositionRef.current}px)`;
        }
      }
    };

    // Initialize carousel
    initCarousel();
    
    // Handle window resize
    window.addEventListener('resize', initCarousel);
    
    // Start animation only if not paused
    if (!isPaused) {
      startAnimation();
    }
    
    return () => {
      window.removeEventListener('resize', initCarousel);
      stopAnimation();
      clearAutoResumeTimer();
    };
  }, [projects.length, isPaused]);

  // Animation function for smooth scrolling with consistent speed
  const animate = (timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const elapsed = timestamp - lastTimeRef.current;
    
    if (elapsed > 16 && !isPaused) { // Limit to ~60fps
      lastTimeRef.current = timestamp;
      
      // Calculate new scroll position - consistent scroll speed
      scrollPositionRef.current -= 0.3; // Consistent scroll speed
      
      // Reset position for infinite loop
      if (Math.abs(scrollPositionRef.current) >= totalWidthRef.current) {
        scrollPositionRef.current = 0;
      }
      
      // Update scroll position
      if (scrollRef.current) {
        scrollRef.current.style.transform = `translateX(${scrollPositionRef.current}px)`;
      }
      
      // Update active index based on scroll position
      const newActiveIndex = Math.floor(Math.abs(scrollPositionRef.current) / itemWidthRef.current) % projects.length;
      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    }
    
    // Continue animation only if not paused
    if (!isPaused) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // Start animation
  const startAnimation = () => {
    if (animationRef.current === null && !isPaused) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // Stop animation
  const stopAnimation = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  // Clear auto-resume timer
  const clearAutoResumeTimer = () => {
    if (resumeTimerRef.current !== null) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  // Set auto-resume timer
  const setAutoResumeTimer = () => {
    // Clear any existing timer first
    clearAutoResumeTimer();
    
    // Set new timer to resume animation after 500ms (0.5 seconds)
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
      startAnimation();
      resumeTimerRef.current = null;
    }, 500);
  };

  // Handle mouse interactions with guaranteed pause and position preservation
  const handleMouseEnter = () => {
    setIsPaused(true);
    stopAnimation(); // Immediately stop animation
    clearAutoResumeTimer(); // Clear any pending auto-resume
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
    // Set timer to resume animation after delay
    setAutoResumeTimer();
  };

  // Enhanced item hover with immediate visual feedback
  const handleItemHover = (index: number) => {
    const realIndex = index % projects.length;
    setHoverIndex(realIndex);
    
    // Immediately adjust scroll position to center the hovered item
    if (scrollRef.current && isPaused) {
      const newPosition = -(realIndex * itemWidthRef.current);
      scrollPositionRef.current = newPosition;
      scrollRef.current.style.transform = `translateX(${newPosition}px)`;
      setActiveIndex(realIndex);
    }
  };

  // Handle manual navigation with improved behavior
  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      // Ensure we're paused during manual navigation
      setIsPaused(true);
      stopAnimation();
      clearAutoResumeTimer();
      
      const newIndex = (index + projects.length) % projects.length;
      const newPosition = -(newIndex * itemWidthRef.current);
      
      // Animate to the new position smoothly
      const startPosition = scrollPositionRef.current;
      const distance = newPosition - startPosition;
      const duration = 300; // ms
      const startTime = Date.now();
      
      const scrollAnimation = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2; // Smooth easing
        
        scrollPositionRef.current = startPosition + distance * easeProgress;
        if (scrollRef.current) {
          scrollRef.current.style.transform = `translateX(${scrollPositionRef.current}px)`;
        }
        
        if (progress < 1) {
          requestAnimationFrame(scrollAnimation);
        } else {
          // Animation complete
          setActiveIndex(newIndex);
          setHoverIndex(newIndex);
          
          // Set timer to resume animation after delay
          setAutoResumeTimer();
        }
      };
      
      requestAnimationFrame(scrollAnimation);
    }
  };

  const handlePrev = () => {
    const newIndex = (activeIndex - 1 + projects.length) % projects.length;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % projects.length;
    scrollToIndex(newIndex);
  };

  return (
    <div className="w-full py-8 unified-card rounded-lg">
      <div 
        className="relative overflow-hidden mx-auto max-w-7xl px-4"
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Carousel container */}
        <div 
          ref={scrollRef}
          className="flex transition-transform duration-300 ease-out"
          style={{ willChange: 'transform' }}
        >
          {extendedProjects.map((project, index) => {
            const realIndex = index % projects.length;
            const isActive = hoverIndex === realIndex || (hoverIndex === -1 && activeIndex === realIndex);
            
            return (
              <div 
                key={`${project.id}-${index}`}
                ref={el => {
                  if (index < projects.length) {
                    projectRefs.current[realIndex] = el;
                  }
                }}
                className="flex-shrink-0 px-4 transition-all duration-300"
                style={{ 
                  width: `${100 / Math.min(3, projects.length)}%`,
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  opacity: isPaused && !isActive ? 0.7 : 1,
                  zIndex: isActive ? 10 : 1,
                }}
                onMouseEnter={() => handleItemHover(index)}
              >
                <div 
                  className="unified-card overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:shadow-glow-gray h-full flex flex-col"
                  style={{
                    transform: isActive ? 'translateY(-5px)' : 'translateY(0)',
                  }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={project.imageUrl || '/placeholder-project-1.jpg'} 
                      alt={project.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? 'scale-110' : 'scale-100'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70"></div>
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold mb-2 text-black">{project.title}</h3>
                    <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span 
                          key={i} 
                          className={`px-2 py-1 text-xs rounded-full transition-all duration-300 ${
                            isActive 
                              ? 'bg-gray-200 text-black' 
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <a 
                      href={project.detailsLink} 
                      className="btn-enhanced inline-block text-center py-2 px-4 mt-auto"
                    >
                      Detayları Gör
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Navigation arrows with enhanced visibility */}
        <button 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/80 text-white p-3 rounded-full opacity-80 hover:opacity-100 transition-all duration-300 z-20 border border-white/50 hover:bg-black hover:scale-110"
          onClick={handlePrev}
          aria-label="Önceki proje"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/80 text-white p-3 rounded-full opacity-80 hover:opacity-100 transition-all duration-300 z-20 border border-white/50 hover:bg-black hover:scale-110"
          onClick={handleNext}
          aria-label="Sonraki proje"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedProjectsCarousel;
