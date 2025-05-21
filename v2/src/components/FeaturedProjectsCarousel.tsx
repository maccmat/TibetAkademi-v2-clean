'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  // State for tracking current slide and interaction modes
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Refs for DOM elements and timers
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Constants for better control
  const TRANSITION_DURATION = 500; // ms
  const AUTO_PLAY_INTERVAL = 5000; // ms
  const SLIDES_TO_SHOW = Math.min(3, projects.length);
  
  // Initialize and clean up autoplay
  useEffect(() => {
    startAutoPlay();
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, []);
  
  // Simple autoplay function with clear interval management
  const startAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        if (!isTransitioning) {
          goToNextSlide();
        }
      }, AUTO_PLAY_INTERVAL);
    }
  };
  
  // Reset autoplay when autoplay state changes
  useEffect(() => {
    startAutoPlay();
  }, [isAutoPlaying]);
  
  // Simple navigation functions with transition state management
  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  };
  
  const goToNextSlide = () => {
    const nextIndex = (currentIndex + 1) % projects.length;
    goToSlide(nextIndex);
  };
  
  const goToPrevSlide = () => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    goToSlide(prevIndex);
  };
  
  // Mouse interaction handlers
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };
  
  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };
  
  // Calculate transform for slide container
  const getSlideContainerStyle = () => {
    const slideWidth = 100 / SLIDES_TO_SHOW;
    const translateX = -(currentIndex * slideWidth);
    
    return {
      transform: `translateX(${translateX}%)`,
      transition: `transform ${TRANSITION_DURATION}ms ease-in-out`,
      width: `${(projects.length * 100) / SLIDES_TO_SHOW}%`,
    };
  };
  
  // Calculate individual slide width
  const getSlideStyle = () => {
    return {
      width: `${100 / projects.length}%`,
    };
  };
  
  return (
    <div className="w-full py-8 unified-card rounded-lg">
      <div 
        className="relative overflow-hidden mx-auto max-w-7xl px-4"
        ref={carouselRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Slide container with simple transform-based animation */}
        <div 
          ref={slideContainerRef}
          className="flex"
          style={getSlideContainerStyle()}
        >
          {projects.map((project, index) => {
            const isActive = index === currentIndex;
            
            return (
              <div 
                key={project.id}
                className="flex-shrink-0 px-4 transition-all duration-500"
                style={getSlideStyle()}
              >
                <div 
                  className={`unified-card overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:shadow-glow-gray h-full flex flex-col ${
                    isActive ? 'scale-105 -translate-y-2' : 'scale-100'
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={project.imageUrl || '/placeholder-project-1.jpg'} 
                      alt={project.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'scale-100'}`}
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
        
        {/* Simple, reliable navigation buttons */}
        <button 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/80 text-white p-3 rounded-full opacity-80 hover:opacity-100 transition-all duration-300 z-20 border border-white/50 hover:bg-black hover:scale-110"
          onClick={goToPrevSlide}
          disabled={isTransitioning}
          aria-label="Önceki proje"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/80 text-white p-3 rounded-full opacity-80 hover:opacity-100 transition-all duration-300 z-20 border border-white/50 hover:bg-black hover:scale-110"
          onClick={goToNextSlide}
          disabled={isTransitioning}
          aria-label="Sonraki proje"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        {/* Optional: Slide indicators */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-black w-4' : 'bg-gray-400'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Proje ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectsCarousel;
