'use client';

import React, { useState } from 'react';

interface MarqueeTextProps {
  text: string;
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
  reverse?: boolean;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({ 
  text, 
  className = '',
  speed = 'normal',
  reverse = false
}) => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Determine animation duration based on speed - significantly slowed down
  const getDuration = () => {
    switch(speed) {
      case 'slow': return '90s';
      case 'fast': return '50s';
      default: return '70s';
    }
  };

  const duration = getDuration();
  
  return (
    <div 
      className={`relative flex overflow-x-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Only one instance of the marquee text with slower animation */}
      <div 
        className={`whitespace-nowrap py-2`}
        style={{ 
          animationName: 'marquee',
          animationDuration: duration,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: 'normal',
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
      >
        <span className="text-lg md:text-xl font-medium mx-4">{text}</span>
        <span className="text-lg md:text-xl font-medium mx-4">{text}</span>
        <span className="text-lg md:text-xl font-medium mx-4">{text}</span>
        <span className="text-lg md:text-xl font-medium mx-4">{text}</span>
        <span className="text-lg md:text-xl font-medium mx-4">{text}</span>
        <span className="text-lg md:text-xl font-medium mx-4">{text}</span>
      </div>
    </div>
  );
};

export default MarqueeText;
