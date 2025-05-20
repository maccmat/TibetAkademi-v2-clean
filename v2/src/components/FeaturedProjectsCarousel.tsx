import React, { useRef } from 'react';
import ProjectCard from './ProjectCard';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative w-full overflow-hidden">
      <h2 className="text-3xl font-bold mb-6 text-center">Öne Çıkan Projelerimiz</h2>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center"
        >
          ◀
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-12 py-4 snap-x snap-mandatory scrollbar-hide"
        >
          {projects.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="shrink-0 w-[300px] snap-start transform transition-transform duration-300 hover:scale-105"
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center"
        >
          ▶
        </button>
      </div>

      <div className="mt-6 text-center">
        <a
          href="#projects"
          className="inline-block px-6 py-2 bg-black text-white font-semibold rounded-lg shadow hover:bg-gray-800 transition"
        >
          Tüm Projeleri Gör
        </a>
      </div>
    </div>
  );
};

export default FeaturedProjectsCarousel;