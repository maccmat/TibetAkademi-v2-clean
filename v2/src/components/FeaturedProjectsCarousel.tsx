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
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemWidthRef = useRef<number>(0);

  // Initialize carousel dimensions
  useEffect(() => {
    const initCarousel = () => {
      if (carouselRef.current && containerRef.current) {
        // Calculate item width based on container width
        const containerWidth = containerRef.current.clientWidth;
        const itemWidth = containerWidth / Math.min(3, projects.length);
        itemWidthRef.current = itemWidth;
        
        // Set initial position to show active item
        updateCarouselPosition(activeIndex);
      }
    };

    // Initialize carousel
    initCarousel();
    
    // Handle window resize
    window.addEventListener('resize', initCarousel);
    
    return () => {
      window.removeEventListener('resize', initCarousel);
    };
  }, [projects.length, activeIndex]);

  // Update carousel position based on active index
  const updateCarouselPosition = (index: number) => {
    if (carouselRef.current) {
      const position = -(index * itemWidthRef.current);
      carouselRef.current.style.transform = `translateX(${position}px)`;
    }
  };

  // Handle item hover
  const handleItemHover = (index: number) => {
    setHoverIndex(index);
  };

  // Handle item hover end
  const handleItemHoverEnd = () => {
    setHoverIndex(-1);
  };

  // Navigate to previous item
  const handlePrev = () => {
    const newIndex = (activeIndex - 1 + projects.length) % projects.length;
    setActiveIndex(newIndex);
    updateCarouselPosition(newIndex);
  };

  // Navigate to next item
  const handleNext = () => {
    const newIndex = (activeIndex + 1) % projects.length;
    setActiveIndex(newIndex);
    updateCarouselPosition(newIndex);
  };

  return (
    <div className="w-full py-8 unified-card rounded-lg">
      <div 
        className="relative overflow-hidden mx-auto max-w-7xl px-4"
        ref={containerRef}
      >
        {/* Static carousel container */}
        <div 
          ref={carouselRef}
          className="flex transition-transform duration-300 ease-out"
        >
          {projects.map((project, index) => {
            const isActive = activeIndex === index;
            const isHovered = hoverIndex === index;
            
            return (
              <div 
                key={project.id}
                className="flex-shrink-0 px-4 transition-all duration-300"
                style={{ 
                  width: `${100 / Math.min(3, projects.length)}%`,
                  transform: (isActive || isHovered) ? 'scale(1.05)' : 'scale(1)',
                  opacity: (isActive || isHovered) ? 1 : 0.7,
                  zIndex: (isActive || isHovered) ? 10 : 1,
                }}
                onMouseEnter={() => handleItemHover(index)}
                onMouseLeave={handleItemHoverEnd}
              >
                <div 
                  className="unified-card overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:shadow-glow-gray h-full flex flex-col"
                  style={{
                    transform: (isActive || isHovered) ? 'translateY(-5px)' : 'translateY(0)',
                  }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={project.imageUrl || '/placeholder-project-1.jpg'} 
                      alt={project.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${(isActive || isHovered) ? 'scale-110' : 'scale-100'}`}
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
                            (isActive || isHovered)
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
        
        {/* Navigation arrows with limited interaction area */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-24 flex items-center justify-center">
          <button 
            className="bg-black/80 text-white p-3 rounded-full opacity-80 hover:opacity-100 transition-all duration-300 z-20 border border-white/50 hover:bg-black hover:scale-110"
            onClick={handlePrev}
            aria-label="Önceki proje"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-24 flex items-center justify-center">
          <button 
            className="bg-black/80 text-white p-3 rounded-full opacity-80 hover:opacity-100 transition-all duration-300 z-20 border border-white/50 hover:bg-black hover:scale-110"
            onClick={handleNext}
            aria-label="Sonraki proje"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectsCarousel;
