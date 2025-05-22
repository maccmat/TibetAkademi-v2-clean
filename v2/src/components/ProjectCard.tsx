'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  detailsLink: string;
  category?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  tags,
  detailsLink,
  category
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 transform h-full border border-white/10 bg-black/30 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${isHovered ? 'scale-105 shadow-xl' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        {/* Image with dark overlay */}
        <div className="absolute inset-0 img-dark-overlay">
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-700"
            style={{ 
              backgroundImage: `url(${imageUrl})`,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          />
        </div>
        
        {/* Category badge */}
        {category && (
          <span className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full border border-white/20 z-10">
            {category}
          </span>
        )}
      </div>
      
      <div className="p-4 relative z-10">
        <h3 className="text-xl font-bold mb-2 text-white transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="text-xs bg-white/10 text-white px-2 py-1 rounded-full transition-all duration-300 hover:bg-white/20"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <Link 
          href={detailsLink}
          className="inline-block mt-2 text-white font-medium relative group"
        >
          <span className="relative z-10 transition-all duration-300 group-hover:text-gray-300">
            Detayları Gör
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>
      
      {/* Animated overlay on hover */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 transition-opacity duration-300 ${
          isHovered ? 'opacity-90' : 'opacity-70'
        }`}
      />
    </div>
  );
};

export default ProjectCard;
