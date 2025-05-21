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
  
  // Mouse interaction tracking
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startScrollRef = useRef<number>(0);
  const lastMouseXRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const lastMoveTimeRef = useRef<number>(0);
  
  // Navigation lock to prevent rapid clicks
  const isNavigatingRef = useRef<boolean>(false);

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
    };
  }, [projects.length, isPaused]);

  // Animation function for smooth scrolling - Fixed with consistent speed
  const animate = (timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const elapsed = timestamp - lastTimeRef.current;
    
    // Limit to ~60fps and ensure we're not paused or navigating
    if (elapsed > 16 && !isPaused && !isNavigatingRef.current) { 
      lastTimeRef.current = timestamp;
      
      // Calculate new scroll position with fixed, stable speed
      // Using elapsed time to ensure consistent speed regardless of frame rate
      const scrollSpeed = 0.05; // Reduced from 0.15 to make it more stable and slower
      const pixelsToMove = scrollSpeed * elapsed;
      scrollPositionRef.current -= pixelsToMove;
      
      // Reset position for infinite loop
      if (Math.abs(scrollPositionRef.current) >= totalWidthRef.current) {
        scrollPositionRef.current = 0;
      }
      
      // Update scroll position with smooth transition
      if (scrollRef.current) {
        scrollRef.current.style.transition = 'transform 0.5s linear'; // Smoother transition
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
      lastTimeRef.current = 0; // Reset time reference for smooth start
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

  // Handle mouse interactions with guaranteed pause and position preservation
  const handleMouseEnter = () => {
    setIsPaused(true);
    stopAnimation(); // Immediately stop animation
  };

  const handleMouseLeave = () => {
    // Only restart animation if not dragging and not navigating
    if (!isDraggingRef.current && !isNavigatingRef.current) {
      setIsPaused(false);
      setHoverIndex(-1);
      
      // Add a small delay before restarting animation for smoother transition
      setTimeout(() => {
        startAnimation();
      }, 300);
    }
  };

  // Enhanced item hover with immediate visual feedback
  const handleItemHover = (index: number) => {
    // Only respond to hover if not dragging
    if (!isDraggingRef.current) {
      const realIndex = index % projects.length;
      setHoverIndex(realIndex);
      
      // Immediately adjust scroll position to center the hovered item
      if (scrollRef.current && isPaused) {
        const newPosition = -(realIndex * itemWidthRef.current);
        
        // Use smooth animation instead of immediate jump
        const startPosition = scrollPositionRef.current;
        const distance = newPosition - startPosition;
        const duration = 300; // ms
        const startTime = Date.now();
        
        const hoverAnimation = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2; // Smooth easing
          
          scrollPositionRef.current = startPosition + distance * easeProgress;
          if (scrollRef.current) {
            scrollRef.current.style.transform = `translateX(${scrollPositionRef.current}px)`;
          }
          
          if (progress < 1) {
            requestAnimationFrame(hoverAnimation);
          } else {
            // Animation complete
            setActiveIndex(realIndex);
          }
        };
        
        requestAnimationFrame(hoverAnimation);
      }
    }
  };

  // Fixed mouse drag handling with strict velocity control
  const handleMouseDown = (e: React.MouseEvent) => {
    // Stop any ongoing animations first
    stopAnimation();
    
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startScrollRef.current = scrollPositionRef.current;
    lastMouseXRef.current = e.clientX;
    lastMoveTimeRef.current = Date.now();
    velocityRef.current = 0;
    
    // Add event listeners for drag
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Prevent default to avoid text selection during drag
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDraggingRef.current && scrollRef.current) {
      const currentTime = Date.now();
      const deltaTime = Math.max(16, currentTime - lastMoveTimeRef.current); // Ensure minimum time delta
      
      // Calculate direct movement based on mouse position difference
      const deltaX = e.clientX - lastMouseXRef.current;
      
      // Calculate velocity with stronger dampening for stability
      if (deltaTime > 0) {
        // Apply stronger smoothing to velocity calculation
        const newVelocity = deltaX / deltaTime;
        velocityRef.current = velocityRef.current * 0.8 + newVelocity * 0.2; // More weighted average for stability
      }
      
      // Apply stricter velocity limiting to prevent erratic movement
      const maxVelocity = 0.5; // Further reduced maximum velocity for better control
      const limitedVelocity = Math.max(-maxVelocity, Math.min(maxVelocity, velocityRef.current));
      
      // Calculate movement with stronger dampening
      const movement = deltaX * 0.6; // More dampening for smoother control
      
      // Update position with bounds checking
      const newPosition = scrollPositionRef.current + movement;
      scrollPositionRef.current = newPosition;
      
      // Apply the transform with smoother transition
      scrollRef.current.style.transition = 'transform 0.2s ease-out'; // Increased duration for smoother feel
      scrollRef.current.style.transform = `translateX(${newPosition}px)`;
      
      // Update tracking variables
      lastMouseXRef.current = e.clientX;
      lastMoveTimeRef.current = currentTime;
      
      // Update active index
      const newActiveIndex = Math.floor(Math.abs(scrollPositionRef.current) / itemWidthRef.current) % projects.length;
      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    }
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    
    isDraggingRef.current = false;
    
    // Remove event listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    
    // Capture final velocity for inertia
    const finalVelocity = velocityRef.current;
    let inertiaFrameId: number | null = null;
    
    // Apply gentler inertia for natural stopping
    const inertiaAnimation = () => {
      // Apply stronger friction for quicker, more controlled stopping
      velocityRef.current *= 0.85; // Increased friction for faster stopping
      
      // Stop inertia animation when velocity is very low
      if (Math.abs(velocityRef.current) < 0.01) {
        if (inertiaFrameId !== null) {
          cancelAnimationFrame(inertiaFrameId);
        }
        
        // Snap to nearest project with smooth animation
        const nearestIndex = Math.round(Math.abs(scrollPositionRef.current) / itemWidthRef.current) % projects.length;
        scrollToIndex(nearestIndex);
        
        // Restart auto-scroll animation if not paused
        if (!isPaused) {
          setTimeout(() => {
            startAnimation();
          }, 800); // Longer delay before restarting for smoother transition
        }
        
        return;
      }
      
      // Apply movement based on current velocity with strict limiting
      if (scrollRef.current) {
        const movement = velocityRef.current * 8; // Reduced movement speed for more control
        scrollPositionRef.current += movement;
        
        // Apply smooth transition
        scrollRef.current.style.transition = 'transform 0.2s linear';
        scrollRef.current.style.transform = `translateX(${scrollPositionRef.current}px)`;
        
        // Update active index
        const newActiveIndex = Math.floor(Math.abs(scrollPositionRef.current) / itemWidthRef.current) % projects.length;
        if (newActiveIndex !== activeIndex) {
          setActiveIndex(newActiveIndex);
        }
      }
      
      inertiaFrameId = requestAnimationFrame(inertiaAnimation);
    };
    
    // Only start inertia if there was significant movement
    if (Math.abs(finalVelocity) > 0.03) { // Reduced threshold for smoother behavior
      inertiaFrameId = requestAnimationFrame(inertiaAnimation);
    } else {
      // For very small movements, just snap to nearest
      const nearestIndex = Math.round(Math.abs(scrollPositionRef.current) / itemWidthRef.current) % projects.length;
      scrollToIndex(nearestIndex);
      
      // Restart auto-scroll animation if not paused
      if (!isPaused) {
        setTimeout(() => {
          startAnimation();
        }, 800);
      }
    }
  };

  // Handle manual navigation with debounce to prevent rapid clicks
  const scrollToIndex = (index: number) => {
    if (scrollRef.current && !isNavigatingRef.current) {
      // Set navigating flag to prevent multiple rapid navigations
      isNavigatingRef.current = true;
      
      const newIndex = (index + projects.length) % projects.length;
      const newPosition = -(newIndex * itemWidthRef.current);
      
      // Animate to the new position smoothly
      const startPosition = scrollPositionRef.current;
      const distance = newPosition - startPosition;
      const duration = 500; // Increased from 300ms for smoother transition
      const startTime = Date.now();
      
      const scrollAnimation = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2; // Smooth easing
        
        scrollPositionRef.current = startPosition + distance * easeProgress;
        if (scrollRef.current) {
          scrollRef.current.style.transition = 'transform 0.3s ease-out';
          scrollRef.current.style.transform = `translateX(${scrollPositionRef.current}px)`;
        }
        
        if (progress < 1) {
          requestAnimationFrame(scrollAnimation);
        } else {
          // Animation complete
          setActiveIndex(newIndex);
          setHoverIndex(newIndex);
          
          // Release navigation lock after animation completes plus a small buffer
          setTimeout(() => {
            isNavigatingRef.current = false;
          }, 200); // Add buffer time to prevent too rapid consecutive clicks
        }
      };
      
      requestAnimationFrame(scrollAnimation);
    }
  };

  const handlePrev = () => {
    // Only process if not already navigating
    if (!isNavigatingRef.current) {
      stopAnimation(); // Stop any ongoing animation
      const newIndex = (activeIndex - 1 + projects.length) % projects.length;
      scrollToIndex(newIndex);
    }
  };

  const handleNext = () => {
    // Only process if not already navigating
    if (!isNavigatingRef.current) {
      stopAnimation(); // Stop any ongoing animation
      const newIndex = (activeIndex + 1) % projects.length;
      scrollToIndex(newIndex);
    }
  };

  return (
    <div className="w-full py-8 unified-card rounded-lg">
      {/* Removed duplicate heading as requested */}
      
      <div 
        className="relative overflow-hidden mx-auto max-w-7xl px-4"
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
      >
        {/* Carousel container */}
        <div 
          ref={scrollRef}
          className="flex transition-transform duration-500 ease-out" // Increased duration for smoother transitions
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
                className="flex-shrink-0 px-4 transition-all duration-500" // Increased duration
                style={{ 
                  width: `${100 / Math.min(3, projects.length)}%`,
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  opacity: isPaused && !isActive ? 0.7 : 1,
                  zIndex: isActive ? 10 : 1,
                }}
                onMouseEnter={() => handleItemHover(index)}
              >
                <div 
                  className="unified-card overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:shadow-glow-gray h-full flex flex-col" // Increased duration
                  style={{
                    transform: isActive ? 'translateY(-5px)' : 'translateY(0)',
                  }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={project.imageUrl || '/placeholder-project-1.jpg'} 
                      alt={project.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'scale-100'}`} // Increased duration
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
        
        {/* Navigation arrows with enhanced visibility and improved click handling */}
        <button 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/80 text-white p-3 rounded-full opacity-80 hover:opacity-100 transition-all duration-300 z-20 border border-white/50 hover:bg-black hover:scale-110"
          onClick={handlePrev}
          aria-label="Önceki proje"
          disabled={isNavigatingRef.current} // Disable during navigation
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/80 text-white p-3 rounded-full opacity-80 hover:opacity-100 transition-all duration-300 z-20 border border-white/50 hover:bg-black hover:scale-110"
          onClick={handleNext}
          aria-label="Sonraki proje"
          disabled={isNavigatingRef.current} // Disable during navigation
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedProjectsCarousel;
