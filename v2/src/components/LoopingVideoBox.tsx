'use client';

import { useEffect, useRef } from 'react';

interface LoopingVideoBoxProps {
  videoSrc: string;
  className?: string;
  title?: string;
}

const LoopingVideoBox: React.FC<LoopingVideoBoxProps> = ({ videoSrc, className = '', title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays on mount, might be restricted by browser policies if not muted
    if (videoRef.current) {
      videoRef.current.play().catch(error => console.warn("Video autoplay failed:", error));
    }
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-lg shadow-soft hover:shadow-elevated transition-all duration-300 ${className}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        muted // Autoplay usually requires video to be muted
        playsInline // Important for iOS Safari
        className="w-full h-full object-cover"
        preload="metadata"
      >
        Tarayıcınız video etiketini desteklemiyor.
      </video>
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/70 to-transparent p-3">
          <p className="text-white text-sm font-medium">{title}</p>
        </div>
      )}
    </div>
  );
};

export default LoopingVideoBox;
